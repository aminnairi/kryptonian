import * as Jorel from "../jorel";

/**
 * Options for creating a server route
 */
export interface CreateServerRouteOptions<GenericRoutes extends Jorel.Routes, GenericRouteName extends keyof GenericRoutes> {
  /**
   * The routes that have been created with `createRoute`
   */
  routes: GenericRoutes,
  /**
   * The name of the route to implement
   */
  route: GenericRouteName,
  /**
   * The implementation of the route's response that should match the defined route response schema, you'll also get access to the route parameters if defined
   */
  response: Jorel.ServerImplementation<GenericRoutes[GenericRouteName]>
}

/**
 * Useful for creating one single route's implementation, allowing your to isolate this route's implementation in its own file
 */
export const createServerRoute = <GenericRoutes extends Jorel.Routes, GenericRouteName extends keyof GenericRoutes>({response: implementation}: CreateServerRouteOptions<GenericRoutes, GenericRouteName>) => {
  return implementation;
};
