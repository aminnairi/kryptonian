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
