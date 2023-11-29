import { IncomingMessage, ServerResponse } from "http";
import * as Kalel from "../kalel";
import { Route, Routes } from "./createRoutes";

/**
 * Implementation of a route, essentially just an asynchronous function that must respect the schema when returning a value
 */
export type Spaceship<R extends Route> = (parameters: Kalel.InferType<R["request"]>) => Promise<Kalel.InferType<R["response"]>>

/**
 * The list of all implementations for a route
 */
export type Spaceships<R extends Routes> = {
  [Key in keyof R]: Spaceship<R[Key]>
}

/**
 * Options for creating a router
 */
export interface CreateRouterOptions<R extends Routes> {
  /**
   * Clients that must be allowed using the Access-Control-Allow-Origin header
   */
  clients: Array<string>,
  /**
   * Route that have been created using the createRoute function
   */
  routes: R,
  /**
   * The concrete implementations of the routes's schema
   */
  spaceships: Spaceships<R>
}

/**
 * Create a router that can later be used with the http built-in module or express for instance
 */
export const createRouter = <R extends Routes>({ clients, routes, spaceships }: CreateRouterOptions<R>) => {
  return async (request: IncomingMessage, response: ServerResponse) => {
    const url = new URL(`http://127.0.0.1${String(request.url)}`);
    const origin = request.headers.origin ?? "";
    const pathname = url.pathname;

    const allowedOrigin = clients.find(client => {
      return client === origin;
    });

    const baseHeaders = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "POST,OPTIONS",
    };

    const headers = (() => {
      switch (typeof allowedOrigin) {
      case "string":
        return {
          ...baseHeaders,
          "Access-Control-Allow-Origin": allowedOrigin
        }; 

      default:
        return baseHeaders;
      }
    })();

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
        const normalizedPathname = pathname.replace(/^\//, "").replace(/\/$/, "");

        return routeName === normalizedPathname;
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
          let body = "";

          // Listen for the 'data' event to accumulate chunks
          request.on("data", (chunk) => {
            body += chunk;
          });

          // Listen for the 'end' event to resolve the promise when all data is received
          request.on("end", () => {
            try {
              const json = JSON.parse(body);

              resolve(json);
            } catch (error) {
              resolve(undefined);
            }
          });

          // Listen for any 'error' events
          request.on("error", (error) => {
            reject(error);
          });
        });
      };

      const body = await getBody(request);
      const protectBody = Kalel.createProtector(route.request);
      const bodyProtection = protectBody(body);

      if (!bodyProtection.success) {
        return response.writeHead(400, headers).end(JSON.stringify(bodyProtection.errors));
      }

      const spaceshipResponse = await spaceship(bodyProtection.data);

      const protectSpaceshipResponse = Kalel.createProtector(route.response);
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
