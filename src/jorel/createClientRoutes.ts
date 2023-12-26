import * as Kalel from "../kalel";
import { Route } from "./Route";
import { Routes } from "./Routes";

/**
 * Error return whenever the request does not respect the schema imposed for the parameters, this can happen even when using TypeScript, especially when using rules
 */
export class BadRequestError extends Error {
  public errors: Array<Kalel.ValidationError>;

  public constructor(errors: Array<Kalel.ValidationError>) {
    super("BadRequestError");

    this.errors = errors;
    this.name = "BadRequestError";
  }
}

/**
 * Error returned whenever the response does not respect the schema defined in the routes, this should not happen when using this library and for now, request to foreign origins are not allowed
 */
export class BadResponseError extends Error {
  public errors: Array<Kalel.ValidationError>;

  public constructor(errors: Array<Kalel.ValidationError>) {
    super("BadResponseError");

    this.errors = errors;
    this.name = "BadResponseError";
  }
}

/**
 * Define what arguments are necessary to send a client request to get a server response
 */
export interface ClientImplementationOptions<GenericRoute extends Route> {
  /**
   * The parameters defined in the routes for this particular route
   */
  parameters: Kalel.InferType<GenericRoute["request"]>,
  /**
   * The options used by the Web API Fetch that you can augment here, note that the headers will always contain the "Content-Type" and the "Accept" headers and cannot be overriden for practicality purposes
   */
  options: RequestInit
}

/**
 * Implementation of the callback that will be used to respond to clients requesting for this particular route
 */
export type ClientImplementation<GenericRoute extends Route> = (options: ClientImplementationOptions<GenericRoute>) => Promise<Kalel.InferType<GenericRoute["response"]>>;

/**
 * The whole implementations of the callbacks that will be used to respond to clients requesting for this particular route
 */
export type ClientImplementations<GenericRoute extends Routes> = {
  [GenericRouteKey in keyof GenericRoute]: ClientImplementation<GenericRoute[GenericRouteKey]>
}

/**
 * Options used for create a new client to send requests to the server
 */
export interface CreateClientRoutesOptions<GenericRoutes extends Routes> {
  /**
   * The url to the server exposing the endpoints
   */
  server: string,
  /**
   * The implementation of all available routes that have been defined in the
   * createRoutes function call
   */
  routes: GenericRoutes 
}

/**
 * Create a client that will send request to the server and use the routes as
 * the source of truth for all things related to request input
 */
export const createClientRoutes = <GenericRoutes extends Routes>({ server, routes }: CreateClientRoutesOptions<GenericRoutes>): ClientImplementations<GenericRoutes> => {
  const routeWithCallbacks = Object.fromEntries(Object.entries(routes).map(([routeName, route]) => {
    const callback = async ({parameters, options}: { parameters: unknown, options: RequestInit}) => {
      const protectBody = Kalel.createProtector(route.request);
      const bodyProtection = protectBody(parameters);

      if (!bodyProtection.success) {
        return Promise.reject(new BadRequestError(bodyProtection.errors));
      }

      return fetch(`${server}/${routeName}`, {
        ...options,
        method: "POST",
        headers: {
          ...options.headers,
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(bodyProtection.data)
      }).then(response => {
        if (response.ok) {
          return response.json();
        }

        if (response.status === 400) {
          return response.json().then(response => {
            return Promise.reject(new BadRequestError(response));
          });
        }

        return response.text().then(response => {
          return Promise.reject(new Error(response));
        });
      }).then(response => {
        const protectResponse = Kalel.createProtector(route.response);
        const responseProtection = protectResponse(response);

        if (!responseProtection.success) {
          return Promise.reject(new BadResponseError(responseProtection.errors));
        }

        return responseProtection.data;
      });
    };

    return [routeName, callback];
  }));

  return routeWithCallbacks as ClientImplementations<GenericRoutes>;
};
