import * as Kalel from "../kalel";

/**
 * A definition for a route's input (request) and output (response) schema
 */
export interface Route {
  /**
   * The schema that a route should receive
   */
  request: Kalel.Schema,
  /**
   * The schema that a route must return
   */
  response: Kalel.Schema
}

/**
 * A definition of all routes
 */
export type Routes = {
  [key: string]: Route
}

/**
 * Create a set of routes to be implemented later by the server, and consumed by
 * the client
 */
 export const createRoutes = <R extends Routes>(routes: R): R => {
  return routes;
};
