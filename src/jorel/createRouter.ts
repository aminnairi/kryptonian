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
   * Route that have been created using the createRoute function
   */
  routes: R,
  /**
   * The concrete implementations of the routes's schema
   */
  spaceships: Spaceships<R>
}

export type AdapterRequest = {
  path: string,
  origin: string,
  body: JSON,
  method: string
}

export type RouterResponse = {
  status: number,
  headers: Record<string, string>,
  body: string
}

export type Router = (request: AdapterRequest) => Promise<RouterResponse>;

/**
 * Create a router that can later be used with the http built-in module or express for instance
 */
export const createRouter = <R extends Routes>({ routes, spaceships }: CreateRouterOptions<R>) => {
  return async (request: AdapterRequest) => {
    try {
      if (request.method === "OPTIONS") {
        return {
          status: 200,
          headers: {},
          body: null
        };
      }

      if (request.method !== "POST") {
        return {
          status: 405,
          headers: {},
          body: {
            success: false,
            errors: [
              {
                path: "",
                message: "Method not allowed"
              }
            ]
          }
        };
      }

      const foundRoute = Object.entries(routes).find(([routeName]) => {
        const normalizedPathname = request.path.replace(/^\//, "").replace(/\/$/, "");

        return routeName === normalizedPathname;
      });

      if (!foundRoute) {
        return {
          status: 412,
          headers: {},
          body: {
            success: false,
            error: {
              path: "",
              message: "Route not found"
            }
          }
        };
      }

      const [routeName, route] = foundRoute;
      const spaceship = spaceships[routeName];

      if (!spaceship) {
        return {
          status: 412,
          headers: {},
          body: {
            success: false,
            error: {
              path: "",
              message: "Router not found"
            }
          }
        };
      }

      const protectBody = Kalel.createProtector(route.request);
      const bodyProtection = protectBody(request.body);

      if (!bodyProtection.success) {
        return {
          status: 400,
          headers: {},
          body: bodyProtection.errors
        };
      }

      const spaceshipResponse = await spaceship(bodyProtection.data);

      const protectSpaceshipResponse = Kalel.createProtector(route.response);
      const spaceshipResponseProtection = protectSpaceshipResponse(spaceshipResponse);

      if (!spaceshipResponseProtection.success) {
        return {
          status: 400,
          headers: {},
          body: spaceshipResponseProtection.errors
        };
      }

      return {
        status: 200,
        headers: {},
        body: spaceshipResponseProtection.data
      };
    } catch (error) {
      return {
        status: 500,
        headers: {},
        body: {
          success: false,
          errors: [
            {
              path: "",
              message: String(error)
            }
          ]
        }
      };
    }
  };
};