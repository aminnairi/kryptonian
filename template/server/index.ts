import * as Kryptonian from "../../"
import * as Http from "http";
import { routes } from "@template/shared";

const router = Kryptonian.Jorel.createRouter({
  client: "http://localhost:5173",
  routes,
  spaceships: {
    getKryptonians: async () => {
      return [
        {
          name: "Kalel",
          success: true as const,
          createdAt: new Date()
        },
        {
          name: "Jorel",
          success: true as const,
          createdAt: new Date()
        },
        {
          name: "Zorel",
          success: true as const,
          createdAt: new Date()
        }
      ];
    }
  }
});

const server = Http.createServer(router);

server.listen(8000, "0.0.0.0", () => {
  console.log("Spaceship launched and ready for communications");
});