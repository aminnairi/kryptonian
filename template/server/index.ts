import * as Kryptonian from "kryptonian";
import { routes } from "@template/shared";
import { getKryptonians } from "./routes/getKryptonians";
import { createExpressServer } from "./adapters/createExpressServer";

const router = Kryptonian.Jorel.createRouter({
  routes,
  spaceships: {
    getKryptonians
  }
});

const server = createExpressServer({
  router,
  clients: ["http://localhost:5173"]
});

server.listen(8000, "0.0.0.0", () => {
  console.log("Spaceship launched and ready for communications");
});