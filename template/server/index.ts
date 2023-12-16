import * as Kryptonian from "kryptonian";
import { routes } from "@template/shared";
import { getKryptonians } from "./routes/getKryptonians";
import { createExpressServer } from "./adapters/createExpressServer";

const router = Kryptonian.Jorel.createServerRouter({
  routes,
  implementations: {
    getKryptonians
  }
});

const server = createExpressServer({
  router,
  clients: ["http://localhost:5173"]
});

server.listen(8001, "0.0.0.0", () => {
  console.log("Server launched and ready for communications");
});
