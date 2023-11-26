import * as Jorel from "../jorel";

export interface CreateServerRouteOptions<GenericRoutes extends Jorel.Routes, GenericRouteName extends keyof GenericRoutes> {
  routes: GenericRoutes,
  route: GenericRouteName,
  response: Jorel.Spaceship<GenericRoutes[GenericRouteName]>
}

export const createServerRoute = <GenericRoutes extends Jorel.Routes, GenericRouteName extends keyof GenericRoutes>({response: implementation}: CreateServerRouteOptions<GenericRoutes, GenericRouteName>) => {
  return implementation;
};