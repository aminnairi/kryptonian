import * as Vitest from "vitest";
import { createRoutes } from "./createRoutes";
import * as Kalel from "../kalel";

Vitest.describe("createRoutes", () => {
  Vitest.test("It should return the correct routes", () => {
    const routes = createRoutes({
      getUsers: {
        request: Kalel.none({
          message: "none"
        }),
        response: Kalel.none({
          message: "none"
        })
      }
    });

    Vitest.expect(routes).toEqual({
      getUsers: {
        request: {
          type: "none",
          message: "none"
        },
        response: {
          type: "none",
          message: "none"
        }
      }
    });
  });
});