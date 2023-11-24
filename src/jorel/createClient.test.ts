import * as Vitest from "vitest";
import * as Jorel from "../jorel";
import * as Kalel from "../kalel";
import { createClient } from "./createClient";

Vitest.describe("createClient", () => {
  Vitest.test("It should return the correct shape", async () => {
    global.fetch = Vitest.vi.fn().mockImplementation(() => {
      return new Promise((resolve) => {
        resolve(new Response(JSON.stringify(null), {
          status: 200,
          headers: {
            "Content-Type": "application/json"
          }
        }));
      });
    });

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

    const client = createClient({
      server: "",
      routes,
    });

    const response = await client.getUsers({
      parameters: null,
      options: {}
    });

    Vitest.expect(response).toEqual(null);
  });

  Vitest.test("It should return an error when the schema for the request is incorrect (from the server)", async () => {
    global.fetch = Vitest.vi.fn().mockImplementation(() => {
      return new Promise((resolve) => {
        resolve(new Response(JSON.stringify([{path: "", message: "none"}]), {
          status: 400,
          headers: {
            "Content-Type": "application/json"
          }
        }));
      });
    });

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

    const client = createClient({
      server: "",
      routes,
    });

    try {
      await client.getUsers({
        parameters: null,
        options: {}
      });

      throw new Error("Unexpected success");
    } catch (error) {
      if (!(error instanceof Jorel.BadRequestError)) {
        throw new Error("Expected response to be a BadRequestError");
      }

      Vitest.expect(error.name).toEqual("BadRequestError");
      Vitest.expect(error.message).toEqual("BadRequestError");

      Vitest.expect(error.errors).toEqual([
        {
          path: "",
          message: "none"
        }
      ]);
    }
  });

  Vitest.test("It should return an error when the schema for the request is incorrect (from the client)", async () => {
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

    const client = createClient({
      server: "",
      routes,
    });

    try {
      await client.getUsers({
        // @ts-expect-error This is for our JavaScript users, TypeScript users won't be able to pass a wrong schema
        parameters: 123,
        options: {}
      });

      throw new Error("Unexpected success");
    } catch (error) {
      if (!(error instanceof Jorel.BadRequestError)) {
        throw new Error("Expected response to be a BadRequestError");
      }

      Vitest.expect(error.name).toEqual("BadRequestError");
      Vitest.expect(error.message).toEqual("BadRequestError");

      Vitest.expect(error.errors).toEqual([
        {
          path: "",
          message: "none"
        }
      ]);
    }
  });

  Vitest.test("It should return an error when the schema for the response is incorrect", async () => {
    global.fetch = Vitest.vi.fn().mockImplementation(() => {
      return new Promise((resolve) => {
        resolve(new Response(JSON.stringify(123), {
          status: 200,
          headers: {
            "Content-Type": "application/json"
          }
        }));
      });
    });

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

    const client = createClient({
      server: "",
      routes,
    });

    try {
      await client.getUsers({
        parameters: null,
        options: {}
      });

      throw new Error("Unexpected success");
    } catch (error) {
      if (!(error instanceof Jorel.BadResponseError)) {
        throw new Error("Expected response to be a BadResponseError");
      }

      Vitest.expect(error.name).toEqual("BadResponseError");
      Vitest.expect(error.message).toEqual("BadResponseError");

      Vitest.expect(error.errors).toEqual([
        {
          path: "",
          message: "none"
        }
      ]);
    }
  });

  Vitest.test("It should return an error when an unhandled error occurs", async () => {
    global.fetch = Vitest.vi.fn().mockImplementation(() => {
      return new Promise((resolve) => {
        resolve(new Response("Unknown error", {
          status: 405,
          headers: {
            "Content-Type": "application/json"
          }
        }));
      });
    });

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

    const client = createClient({
      server: "",
      routes,
    });

    try {
      await client.getUsers({
        parameters: null,
        options: {}
      });

      throw new Error("Unexpected success");
    } catch (error) {
      Vitest.expect(error.name).toEqual("Error");
      Vitest.expect(error.message).toEqual("Unknown error");
    }
  });
});