import * as Kryptonian from "kryptonian";
import { routes } from "@template/shared";

export const getKryptonians = Kryptonian.Jorel.createServerRoute({
  routes,
  route: "getKryptonians",
  response: async () => {
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
});