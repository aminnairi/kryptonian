import * as Vitest from "vitest";
import { createServerRoute } from "./createServerRoute";

Vitest.describe("createServerRoute", () => {
  Vitest.test("It should return an implementation of a route", async () => {
    const routes = {
      getText: {
        request: {
          type: "text" as const,
          message: "text",
          rules: []
        },
        response: {
          type: "text" as const,
          message: "text",
          rules: []
        }
      }
    };

    const getTextRoute = createServerRoute({
      routes,
      route: "getText",
      response: async (text) => {
        return text;
      }
    });

    const output = await getTextRoute("getText");

    Vitest.expect(output).toEqual("getText");
  });
});