import * as Kryptonian from "kryptonian";
import * as Http from "http";
import * as Path from "path";

export type CreateHttpServerOptions = {
  router: Kryptonian.Jorel.Router,
  clients: Array<string>
}

export const createHttpServer = ({ clients, router }: CreateHttpServerOptions) => {

  const getJsonBody = (request: Http.IncomingMessage) => {
    return new Promise<JSON>((resolve, reject) => {
      let body = "";

      request.on("data", chunk => {
        body += chunk;
      });

      request.on("end", () => {
        try {
          const parsedBody = JSON.parse(body);
          resolve(parsedBody);
        } catch (error) {
          resolve(undefined);
        }
      });

      request.on("error", (error) => {
        reject(new Error(String(error)));
      });
    });
  };

  return Http.createServer(async (request, response) => {
    const url = new URL(Path.join("http://localhost/", request.url ?? ""));
    const origin = request.headers.origin ?? "";
    const path = url.pathname;
    const method = request.method ?? "GET";
    const foundClient = clients.find(client => origin === client) ?? "";

    const baseHeaders = {
      "Content-Type": "application/json",
      "Access-Control-Allow-Headers": "Content-Type",
      "Access-Control-Allow-Methods": "POST,OPTIONS",
      "Access-Control-Allow-Origin": foundClient
    };

    try {
      const body = await getJsonBody(request);

      const routerResponse = await router({
        body,
        origin,
        method,
        path
      });

      const routerResponseHeadersWithBaseHeaders = {
        ...routerResponse.headers,
        ...baseHeaders
      };

      response
        .writeHead(routerResponse.status, routerResponseHeadersWithBaseHeaders)
        .end(JSON.stringify(routerResponse.body));
    } catch (error) {
      response
        .writeHead(500, baseHeaders)
        .end(JSON.stringify({
          success: false,
          errors: [
            {
              path: "",
              message: String(error)
            }
          ]
        }));
    }
  });
};