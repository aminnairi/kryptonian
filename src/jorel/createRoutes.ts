import * as Kalel from "../kalel";

export interface Route {
  request: Kalel.Schema,
  response: Kalel.Schema
}

export type Routes = {
  [key: string]: Route
}

/**
 * Create a set of routes to be implemented later by the server, and consumed by
 * the client
 */
export const createRoutes = <R extends Routes>(routes: R): R => {
  return routes;
}