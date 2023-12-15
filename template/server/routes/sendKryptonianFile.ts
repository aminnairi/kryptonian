import { routes } from "@template/shared";
import * as Kryptonian from "kryptonian";
import * as FileSystem from "fs/promises";

export const sendKryptonianFile = Kryptonian.Jorel.createServerRoute({
  routes,
  route: "sendKryptonianFile",
  response: async ({ file, message }) => {
    await FileSystem.writeFile(`/tmp/${file.name}`, file.toBuffer());

    console.log({ message: `Message from the client: ${message}` });

    return null;
  }
});
