import { createServer } from "http";
import * as Kryptonian from ".";

const kryptonians: Array<string> = [];

const routes = Kryptonian.Jorel.createRoutes({
  createKryptonian: {
    request: Kryptonian.record({
      message: "This should be a record",
      rules: [],
      fields: {
        name: Kryptonian.text({
          message: "Name is not a string",
          rules: []
        })
      }
    }),
    response: Kryptonian.text({
      rules: [],
      message: "Expected a string as the response"
    })
  },
  getKryptonians: {
    request: Kryptonian.none({
      message: "Expected nothing except null"
    }),
    response: Kryptonian.list({
      message: "Response is not a list",
      rules: [],
      schema: Kryptonian.text({
        message: "Response is not a list of text",
        rules: []
      })
    })
  }
});

// Server code

const serverRouter = Kryptonian.Jorel.createRouter(routes, {
  createKryptonian: async ({ name }) => {
    kryptonians.push(name);
    return "Successfully created the user";
  },
  getKryptonians: async () => {
    return [
      ...kryptonians
    ];
  }
});

const serverPort = 8000;
const serverOrigin = "localhost";
const serverProtocol = "http";
const serverUrl = `${serverProtocol}://${serverOrigin}:${serverPort}`

const server = createServer(serverRouter);

server.listen(serverPort, serverOrigin, () => {
  console.log("Kryptonian spaceship launched");
});

// Client code

const clientRouter = Kryptonian.Jorel.createClient(serverUrl, routes);

setTimeout(() => {
  clientRouter.createKryptonian({
    name: "Kal-el"
  }).then(() => {
    console.log("Kal-el saved from krypton explosion");
  }).catch(() => {
    console.error("Error")
  });
}, 1000);

setTimeout(() => {
  clientRouter.createKryptonian({
    name: "Zor-el"
  }).then(() => {
    console.log("Zor-el saved from krypton explosion");
  }).catch(() => {
    console.error("Error")
  });
}, 2000);

setTimeout(() => {
  clientRouter.createKryptonian({
    name: "Jor-el"
  }).then(() => {
    console.log("Jor-el saved from krypton explosion");
  }).catch(() => {
    console.error("Error")
  });
}, 3000);

setTimeout(() => {
  clientRouter.getKryptonians(null).then(kryptonians => {
    kryptonians.forEach(kryptonian => {
      console.log(`Found a kryptonian alive: ${kryptonian}`);
    })
  }).catch(error => {
    console.error(String(error));
  })
}, 4000);

setTimeout(() => {
  server.close();
}, 5000);

// Kryptonian spaceship launched
// Kal-el saved from krypton explosion
// Zor-el saved from krypton explosion
// Jor-el saved from krypton explosion
// Found a kryptonian alive: Kal-el
// Found a kryptonian alive: Zor-el
// Found a kryptonian alive: Jor-el