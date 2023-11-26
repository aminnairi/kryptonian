import * as Kryptonian from "kryptonian";
import * as Http from "http";
import { routes } from "@template/shared";
import { getKryptonians } from "./routes/getKryptonians";

const router = Kryptonian.Jorel.createRouter({
  clients: ["http://localhost:5173"],
  routes,
  spaceships: {
    getKryptonians
  }
});

const server = Http.createServer(router);

server.listen(8000, "0.0.0.0", () => {
  console.log("Spaceship launched and ready for communications");
});