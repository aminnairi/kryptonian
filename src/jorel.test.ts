import { describe, test, expect, beforeAll, afterAll } from "vitest";
import * as Jorel from "./jorel";
import * as Kalel from "./kalel";
import * as Http from "http";

const settings = {
  server: {
    port: 8000,
    host: "127.0.0.1"
  }
}

const routes = Jorel.createRoutes({
  getUsers: {
    request: Kalel.none({
      message: "none"
    }),
    response: Kalel.array({
      message: "array",
      rules: [],
      schema: Kalel.text({
        message: "text",
        rules: []
      })
    })
  },
  incorrectGetUsers: {
    request: Kalel.none({
      message: "none"
    }),
    response: Kalel.array({
      message: "array",
      rules: [],
      schema: Kalel.text({
        message: "text",
        rules: []
      })
    })
  }
});

const client = Jorel.createClient({
  server: `http://${settings.server.host}:${settings.server.port}`,
  routes
});

const router = Jorel.createRouter({
  clients: ["http://127.0.0.1:8000"],
  routes,
  spaceships: {
    getUsers: async () => {
      return [
        "First",
        "Second",
        "Third"
      ];
    },
    // @ts-expect-error
    incorrectGetUsers: async () => {
      return null;
    }
  }
});

const server = Http.createServer(router);

beforeAll(() => {
  server.listen(settings.server.port, settings.server.host, () => {
    console.log("Spaceship launched!");
  });
});

afterAll(() => {
  server.close();
});


describe("jorel", () => {
  test("It should return the routes correctly", () => {
    expect(routes).toEqual({
      getUsers: {
        request: {
          type: "none",
          message: "none"
        },
        response: {
          type: "array",
          rules: [],
          message: "array",
          schema: {
            type: "text",
            message: "text",
            rules: []
          }
        }
      },
      incorrectGetUsers: {
        request: {
          type: "none",
          message: "none"
        },
        response: {
          type: "array",
          rules: [],
          message: "array",
          schema: {
            type: "text",
            message: "text",
            rules: []
          }
        }
      }
    });
  });

  test("It should return the data correctly", async () => {
    const response = await client.getUsers({
      parameters: null,
      options: {}
    });

    expect(response).toEqual([
      "First",
      "Second",
      "Third"
    ]);
  });

  test("It should return an error when the request body is incorrect", async () => {
    try {
      await client.getUsers({
        // @ts-expect-error
        parameters: 123,
        options: {}
      });

      throw new Error("Unexpected successful response");
    } catch (error) {
      expect(error).toEqual([
        {
          message: "none",
          path: ""
        }
      ]);
    }
  });

  test("It should return an error when the response body is incorrect", async () => {
    try {
      await client.incorrectGetUsers({
        parameters: null,
        options: {}
      });

      throw new Error("Unexpected success response");
    } catch (error) {
      expect(error).toEqual([
        {
          path: "",
          message: "array"
        }
      ])
    }
  });
});