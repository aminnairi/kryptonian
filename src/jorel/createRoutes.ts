import { Routes } from "./Routes";

/**
 * Create a set of routes to be implemented later by the server, and consumed by
 * the client
 */
export const createRoutes = <GenericRoutes extends Routes>(routes: GenericRoutes): GenericRoutes => {
  return routes;
};
