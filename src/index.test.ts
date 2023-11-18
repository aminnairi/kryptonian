import { createServer } from "http";
import * as Kryptonian from ".";

const routes = Kryptonian.Jorel.createRoutes({
  createUser: {
    request: Kryptonian.record({
      message: "This should be a record",
      rules: [],
      fields: {
        email: Kryptonian.text({
          message: "Email is not a string",
          rules: []
        }),
        password: Kryptonian.text({
          message: "Password is not a string",
          rules: []
        }),
        confirmation: Kryptonian.text({
          message: "Confirmation is not a string",
          rules: []
        })
      }
    }),
    response: Kryptonian.text({
      rules: [],
      message: "Expected a string as the response"
    })
  }
});

const serverRouter = Kryptonian.Jorel.createRouter(routes, {
  createUser: async () => {
    return "Successfully created the user";
  }
});

const server = createServer(serverRouter);

server.listen(8000, "0.0.0.0", () => {
  console.log("Kryptonian spaceship launched");
});

const clientRouter = Kryptonian.Jorel.getClient(routes);

setTimeout(() => {
  clientRouter.createUser({
    confirmation: "",
    email: "",
    password: ""
  }).then(response => {
    console.log(response);
  }).catch(() => {
    console.error("Error")
  });
}, 2000);