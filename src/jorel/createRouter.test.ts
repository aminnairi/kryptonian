import * as Vitest from "vitest";
import * as Jorel from "../jorel";
import * as Kalel from "../kalel";
import { createRouter } from "./createRouter";

Vitest.describe("createRouter", () => {
  Vitest.test("It should return a function", () => {
    const routes = Jorel.createRoutes({
      getUsers: {
        request: Kalel.none({
          message: "noe"
        }),
        response: Kalel.none({
          message: "none"
        })
      }
    });

    const router = createRouter({
      clients: [""],
      routes,
      spaceships: {
        getUsers: async () => {
          return null;
        }
      }
    });

    Vitest.expect(router).toBeTypeOf("function");
  });
});