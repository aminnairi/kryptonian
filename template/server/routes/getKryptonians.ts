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
          rank: "soldier",
          createdAt: new Date()
        },
        {
          name: "Jorel",
          rank: "protector",
          createdAt: new Date()
        },
        {
          name: "Zorel",
          rank: "guardian",
          createdAt: new Date()
        }
      ]
    };
  }
});