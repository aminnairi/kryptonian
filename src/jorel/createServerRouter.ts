import * as Kalel from "../kalel";
import { Route } from "./Route";
import { Routes } from "./Routes";

/**
 * Implementation of a route, essentially just an asynchronous function that must respect the schema when returning a value
 */
export type ServerImplementation<GenericRoute extends Route> = (parameters: Kalel.InferType<GenericRoute["request"]>) => Promise<Kalel.InferType<GenericRoute["response"]>>

/**
 * The list of all implementations for a route
 */
export type ServerImplementations<GenericRoutes extends Routes> = {
  [GenericRouteKey in keyof GenericRoutes]: ServerImplementation<GenericRoutes[GenericRouteKey]>
}

/**
 * Options for creating a router
 */
export interface CreateServerRouterOptions<GenericRoutes extends Routes> {
  /**
   * Route that have been created using the createRoute function
   */
  routes: GenericRoutes,
  /**
   * The concrete implementations of the routes's schema
   */
  implementations: ServerImplementations<GenericRoutes>
}

/**
 * Abstraction of a request that must be adapted for the adapter used
 */
export type AdapterRequest = {
  /**
   * The path of the route that has been requested by an HTTP client, for instance /users/123
   */
  path: string,
  /**
   * The origin of the request, this refers to the HTTP header "Origin" that must be tested against the allowed clients, for instance https://my.domain.com
   */
  origin: string,
  /**
   * The body of the request parsed as JSON
   */
  body: JSON,
  /**
   * The HTTP method inherent to a particular request
   */
  method: string
}

/**
 * The abstraction of a response returned by a matching route's implementation
 */
export type RouterResponse = {
  /**
   * The status code that must be used in the HTTP response
   */
  status: number,
  /**
   * The headers that must be sent along with the HTTP response
   */
  headers: Record<string, string>,
  /**
   * The body of the response as a string
   */
  body: string
}

/**
 * A function that when used should return the response of the matching route's implementation
 */
export type Router = (request: AdapterRequest) => Promise<RouterResponse>;

/**
 * Create a router that can later be used with the http built-in module or express for instance
 */
export const createServerRouter = <GenericRoutes extends Routes>({ routes, implementations }: CreateServerRouterOptions<GenericRoutes>) => {
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
            errors: [
              {
                path: "",
                message: "Route not found"
              }
            ]
          }
        };
      }

      const [routeName, route] = foundRoute;
      const implementation = implementations[routeName];

      if (!implementation) {
        return {
          status: 412,
          headers: {},
          body: {
            success: false,
            errors: [
              {
                path: "",
                message: "Implementation not found"
              }
            ]
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

      const response = await implementation(bodyProtection.data);

      const protectResponse = Kalel.createProtector(route.response);
      const responseProtection = protectResponse(response);

      if (!responseProtection.success) {
        return {
          status: 400,
          headers: {},
          body: responseProtection.errors
        };
      }

      return {
        status: 200,
        headers: {},
        body: responseProtection.data
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
              message: error instanceof Error ? error.message : String(error)
            }
          ]
        }
      };
    }
  };
};
