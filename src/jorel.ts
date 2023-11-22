import { IncomingMessage, ServerResponse } from "http";
import * as Kryptonian from ".";

export interface Route {
  request: Kryptonian.Schema,
  response: Kryptonian.Schema
}

export type Routes = {
  [key: string]: Route
}

export type Pathway<R extends Route> = (parameters: Kryptonian.InferType<R["request"]>) => Promise<Kryptonian.InferType<R["response"]>>;

export type Pathways<R extends Routes> = {
  [Key in keyof R]: Pathway<R[Key]>
}

export type Spaceship<R extends Route> = (parameters: Kryptonian.InferType<R["request"]>) => Promise<Kryptonian.InferType<R["response"]>>

export type Spaceships<R extends Routes> = {
  [Key in keyof R]: Spaceship<R[Key]>
}

export interface CreateClientOptions<R extends Routes> {
  /**
   * The url to the server exposing the endpoints
   */
  server: string,
  /**
   * The implementation of all available routes that have been defined in the
   * createRoutes function call
   */
  routes: R 
}

/**
 * Create a set of routes to be implemented later by the server, and consumed by
 * the client
 */
export const createRoutes = <R extends Routes>(routes: R): R => {
  return routes;
}

/**
 * Create a client that will send request to the server and use the routes as
 * the source of truth for all things related to request input
 */
export const createClient = <R extends Routes>({ server, routes }: CreateClientOptions<R>): Pathways<R> => {
  const routeWithCallbacks = Object.fromEntries(Object.entries(routes).map(([routeName, route]) => {
    const callback = async (body: unknown) => {
      const protectBody = Kryptonian.createProtector(route.request);
      const bodyProtection = protectBody(body);

      if (!bodyProtection.success) {
        return Promise.reject(bodyProtection.errors);
      }


      return fetch(`${server}/${routeName}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(body)
      }).then(response => {
        if (response.ok) {
          return response.json();
        }

        return response.json().then(response => {
          return Promise.reject(response);
        })
      }).then(response => {
        const protectResponse = Kryptonian.createProtector(route.response);
        const responseProtection = protectResponse(response);

        if (!responseProtection.success) {
          return Promise.reject(responseProtection.errors);
        }

        return responseProtection.data;
      });
    }

    return [routeName, callback]
  }));

  return routeWithCallbacks as Pathways<R>;
};

export const createRouter = <R extends Routes>({ client, routes, spaceships }: { client: string, routes: R, spaceships: Spaceships<R> }) => {
  const headers = {
    "Content-Type": "application/json",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST,OPTIONS",
    "Access-Control-Allow-Origin": client
  }

  return async (request: IncomingMessage, response: ServerResponse) => {
    try {
      if (request.method === "OPTIONS") {
        return response.writeHead(200, headers).end();
      }

      if (request.method !== "POST") {
        return response.writeHead(405, headers).end(JSON.stringify({
          success: false,
          errors: [
            {
              path: "",
              message: "Method not allowed"
            }
          ]
        }));
      }

      const foundRoute = Object.entries(routes).find(([routeName]) => {
        if (!request.url) {
          return false;
        }

        const requestUrl = request.url.replace(/^\//, "").replace(/\/$/, "");

        return routeName === requestUrl;
      });

      if (!foundRoute) {
        return response.writeHead(412, headers).end(JSON.stringify({
          success: false,
          error: {
            path: "",
            message: "Route not found"
          }
        }));
      }

      const [routeName, route] = foundRoute;
      const spaceship = spaceships[routeName];

      if (!spaceship) {
        return response.writeHead(412, headers).end(JSON.stringify({
          success: false,
          error: {
            path: "",
            message: "Router not found"
          }
        }));
      }

      const getBody = (request: IncomingMessage) => {
        return new Promise((resolve, reject) => {
          let body = '';

          // Listen for the 'data' event to accumulate chunks
          request.on('data', (chunk) => {
            body += chunk;
          });

          // Listen for the 'end' event to resolve the promise when all data is received
          request.on('end', () => {
            try {
              const json = JSON.parse(body);

              resolve(json);
            } catch (error) {
              resolve(undefined);
            }
          });

          // Listen for any 'error' events
          request.on('error', (error) => {
            reject(error);
          });
        });
      }

      const body = await getBody(request);
      const protectBody = Kryptonian.createProtector(route.request);
      const bodyProtection = protectBody(body);


      if (!bodyProtection.success) {
        return response.writeHead(400, headers).end(JSON.stringify(bodyProtection.errors));
      }

      const spaceshipResponse = await spaceship(bodyProtection.data);

      const protectSpaceshipResponse = Kryptonian.createProtector(route.response);
      const spaceshipResponseProtection = protectSpaceshipResponse(spaceshipResponse);

      if (!spaceshipResponseProtection.success) {
        return response.writeHead(400, headers).end(JSON.stringify(spaceshipResponseProtection.errors));
      }

      return response.writeHead(200, headers).end(JSON.stringify(spaceshipResponseProtection.data));

    } catch (error) {
      return response.writeHead(500, { "Content-Type": "application/json" }).end(JSON.stringify({
        success: false,
        errors: [
          {
            path: "",
            message: String(error)
          }
        ]
      }));
    }
  };
};