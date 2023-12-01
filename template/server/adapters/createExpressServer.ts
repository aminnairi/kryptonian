import * as Kryptonian from "kryptonian";
import * as Path from "path";
import bodyParser from "body-parser";
import cors from "cors";
import express from "express";

export type CreateExpressServerOptions = {
  router: Kryptonian.Jorel.Router,
  clients: Array<string>
}

export const createExpressServer = ({ clients, router }: CreateExpressServerOptions) => {
  const server = express();

  server.use(cors({
    origin: clients
  }));

  server.post("*", bodyParser.json({ strict: false }), async (request, response) => {
    const url = new URL(Path.join("http://localhost:8000", request.url));
    const origin = request.headers.origin ?? "";
    const method = "POST";
    const path = url.pathname;
    const body = request.body;

    try {
      const routerResponse = await router({
        body,
        origin,
        method,
        path
      });

      response.status(routerResponse.status).set(routerResponse.headers).json(routerResponse.body);
    } catch (error) {
      response.status(500).json({
        success: false,
        errors: [
          {
            path: "",
            message: String(error)
          }
        ]
      });
    }
  });

  return server;
};