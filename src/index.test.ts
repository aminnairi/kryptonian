import * as Kryptonian from ".";
import * as Http from "http";

const kryptonians: Array<string> = [
  "Jorel",
  "Kalel",
  "Zorel"
];

const routes = Kryptonian.Jorel.createRoutes({
  getKryptonians: {
    request: Kryptonian.none({
      message: "Request is not null"
    }),
    response: Kryptonian.list({
      message: "kryptonians in response is not an array",
      rules: [],
      schema: Kryptonian.text({
        message: "kryptonians in response is not a list of strings",
        rules: []
      })
    })
  }
});

const router = Kryptonian.Jorel.createRouter(routes, {
  getKryptonians: async () => {
    return kryptonians;
  }
});

const server = Http.createServer(router);

server.listen(8000, "0.0.0.0");

const client = Kryptonian.Jorel.createClient("http://localhost:8000", routes);

setTimeout(() => {
  client.getKryptonians(null).then(() => {
    console.log(kryptonians);
  }).catch(error => {
    console.error(error);
  }).finally(() => {
    server.close();
  });
}, 1000);