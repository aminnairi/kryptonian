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
      routes,
      spaceships: {
        getUsers: async () => {
          return null;
        }
      }
    });

    Vitest.expect(router).toBeTypeOf("function");
  });

  Vitest.test("It should return the correct response when an OPTIONS request has been received", async () => {
    const routes = Jorel.createRoutes({
      getUsers: {
        request: Kalel.none({
          message: "none"
        }),
        response: Kalel.none({
          message: "none"
        })
      }
    });

    const router = Jorel.createRouter({
      routes,
      spaceships: {
        getUsers: async () => {
          return null;
        }
      }
    });

    const response = await router({
      body: JSON.parse("null"),
      method: "OPTIONS",
      origin: "http://localhost",
      path: "/getUsers"
    });

    Vitest.expect(response.status).toEqual(200);
    Vitest.expect(response.headers).toEqual({});
    Vitest.expect(response.body).toEqual(null);
  });

  Vitest.test("It should return the correct response when a non-POST request has been made", async () => {
    const routes = Jorel.createRoutes({
      getUsers: {
        request: Kalel.none({
          message: "none"
        }),
        response: Kalel.none({
          message: "none"
        })
      }
    });

    const router = Jorel.createRouter({
      routes,
      spaceships: {
        getUsers: async () => {
          return null;
        }
      }
    });

    const response = await router({
      body: JSON.parse("null"),
      method: "GET",
      origin: "http://localhost",
      path: "/getUsers"
    });

    Vitest.expect(response.status).toEqual(405);
    Vitest.expect(response.headers).toEqual({});
    Vitest.expect(response.body).toEqual({
      success: false,
      errors: [
        {
          path: "",
          message: "Method not allowed"
        }
      ]
    });
  });

  Vitest.test("It should return the correct response when a route has not been found", async () => {
    const routes = Jorel.createRoutes({
      getUsers: {
        request: Kalel.none({
          message: "none"
        }),
        response: Kalel.none({
          message: "none"
        })
      }
    });

    const router = Jorel.createRouter({
      routes,
      spaceships: {
        getUsers: async () => {
          return null;
        }
      }
    });

    const response = await router({
      body: JSON.parse("null"),
      method: "POST",
      origin: "http://localhost",
      path: "/getKryptonians"
    });

    Vitest.expect(response.status).toEqual(412);
    Vitest.expect(response.headers).toEqual({});
    Vitest.expect(response.body).toEqual({
      success: false,
      errors: [
        {
          path: "",
          message: "Route not found"
        }
      ]
    });
  });

  Vitest.test("It should return the correct response when a route has no implementation", async () => {
    const routes = Jorel.createRoutes({
      getUsers: {
        request: Kalel.none({
          message: "none"
        }),
        response: Kalel.none({
          message: "none"
        })
      }
    });

    const router = Jorel.createRouter({
      routes,
      // @ts-expect-error This should never happen when using TypeScript
      spaceships: {}
    });

    const response = await router({
      body: JSON.parse("null"),
      method: "POST",
      origin: "http://localhost",
      path: "/getUsers"
    });

    Vitest.expect(response.status).toEqual(412);
    Vitest.expect(response.headers).toEqual({});
    Vitest.expect(response.body).toEqual({
      success: false,
      errors: [
        {
          path: "",
          message: "Implementation not found"
        }
      ]
    });
  });

  Vitest.test("It should return an error when the request does not respect the schema", async () => {
    const routes = Jorel.createRoutes({
      getUsers: {
        request: Kalel.string({
          message: "string",
          rules: []
        }),
        response: Kalel.none({
          message: "none"
        })
      }
    });

    const router = Jorel.createRouter({
      routes,
      spaceships: {
        getUsers: async () => {
          return null;
        }
      }
    });

    const response = await router({
      body: JSON.parse("null"),
      method: "POST",
      origin: "http://localhost",
      path: "/getUsers"
    });

    Vitest.expect(response.status).toEqual(400);
    Vitest.expect(response.headers).toEqual({});
    Vitest.expect(response.body).toEqual([
      {
        path: "",
        message: "string"
      }
    ]);
  });

  Vitest.test("It should return an error when the response does not respect the schema", async () => {
    const routes = Jorel.createRoutes({
      getUsers: {
        request: Kalel.string({
          message: "string",
          rules: []
        }),
        response: Kalel.none({
          message: "none"
        })
      }
    });

    const router = Jorel.createRouter({
      routes,
      spaceships: {
        // @ts-expect-error This should never happen when using TypeScript
        getUsers: async () => {
          return 123;
        }
      }
    });

    const response = await router({
      body: JSON.parse(JSON.stringify("")),
      method: "POST",
      origin: "http://localhost",
      path: "/getUsers"
    });

    Vitest.expect(response.status).toEqual(400);
    Vitest.expect(response.headers).toEqual({});
    Vitest.expect(response.body).toEqual([
      {
        path: "",
        message: "none"
      }
    ]);
  });

  Vitest.test("It should return the correct response no errors occurs", async () => {
    const routes = Jorel.createRoutes({
      getUsers: {
        request: Kalel.string({
          message: "string",
          rules: []
        }),
        response: Kalel.array({
          message: "none",
          rules: [],
          schema: Kalel.string({
            message: "string",
            rules: []
          })
        })
      }
    });

    const router = Jorel.createRouter({
      routes,
      spaceships: {
        getUsers: async () => {
          return [
            "first",
            "second",
            "third"
          ];
        }
      }
    });

    const response = await router({
      body: JSON.parse(JSON.stringify("")),
      method: "POST",
      origin: "http://localhost",
      path: "/getUsers"
    });

    Vitest.expect(response.status).toEqual(200);
    Vitest.expect(response.headers).toEqual({});
    Vitest.expect(response.body).toEqual([ "first", "second", "third" ]);
  });

  Vitest.test("It should return the correct response when an unexpected error occurs", async () => {
    const routes = Jorel.createRoutes({
      getUsers: {
        request: Kalel.string({
          message: "string",
          rules: []
        }),
        response: Kalel.array({
          message: "none",
          rules: [],
          schema: Kalel.string({
            message: "string",
            rules: []
          })
        })
      }
    });

    const router = Jorel.createRouter({
      routes,
      spaceships: {
        getUsers: async () => {
          throw new Error("Oops!");
        }
      }
    });

    const response = await router({
      body: JSON.parse(JSON.stringify("")),
      method: "POST",
      origin: "http://localhost",
      path: "/getUsers"
    });

    Vitest.expect(response.status).toEqual(500);
    Vitest.expect(response.headers).toEqual({});
    Vitest.expect(response.body).toEqual({
      success: false,
      errors: [
        {
          path: "",
          message: "Oops!"
        }
      ]
    });
  });

  Vitest.test("It should return the correct response when an unexpected error occurs and it has been thrown without using an Error class", async () => {
    const routes = Jorel.createRoutes({
      getUsers: {
        request: Kalel.string({
          message: "string",
          rules: []
        }),
        response: Kalel.array({
          message: "none",
          rules: [],
          schema: Kalel.string({
            message: "string",
            rules: []
          })
        })
      }
    });

    const router = Jorel.createRouter({
      routes,
      spaceships: {
        getUsers: async () => {
          throw "Uncommon";
        }
      }
    });

    const response = await router({
      body: JSON.parse(JSON.stringify("")),
      method: "POST",
      origin: "http://localhost",
      path: "/getUsers"
    });

    Vitest.expect(response.status).toEqual(500);
    Vitest.expect(response.headers).toEqual({});
    Vitest.expect(response.body).toEqual({
      success: false,
      errors: [
        {
          path: "",
          message: "Uncommon"
        }
      ]
    });
  });
});