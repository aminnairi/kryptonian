import * as Kryptonian from "kryptonian";
import * as Http from "http";
import { routes } from "@template/shared";

const router = Kryptonian.Jorel.createRouter({
  clients: ["http://localhost:5173"],
  routes,
  spaceships: {
    getKryptonians: async () => {
      return {
        success: true as const,
        kryptonians: [
          {
            name: "Kalel",
            createdAt: new Date()
          },
          {
            name: "Jorel",
            createdAt: new Date()
          },
          {
            name: "Zorel",
            createdAt: new Date()
          }
        ]
      };
    }
  }
});

const server = Http.createServer(router);

server.listen(8000, "0.0.0.0", () => {
  console.log("Spaceship launched and ready for communications");
});