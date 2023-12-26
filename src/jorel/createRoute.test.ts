import * as Vitest from "vitest";
import * as Kalel from "../kalel";
import { createRoute } from "./createRoute";

Vitest.describe("createRoutes", () => {
  Vitest.test("It should return the correct routes", () => {
    const route = createRoute({
      request: Kalel.none({
        message: "none"
      }),
      response: Kalel.none({
        message: "none"
      })
    });

    Vitest.expect(route).toEqual({
      request: {
        type: "none",
        message: "none"
      },
      response: {
        type: "none",
        message: "none"
      }
    });
  });
});
