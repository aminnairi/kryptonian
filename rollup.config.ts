import { defineConfig } from "rollup";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import remove from "rollup-plugin-delete";
import tsconfig from "./tsconfig.json" assert { type: "json" };

export default defineConfig({
  input: "src/index.ts",
  plugins: [
    remove({
      targets: `${tsconfig.compilerOptions.outDir}/*`,
      verbose: true
    }),
    typescript(),
    process.env.NODE_ENV === "production" && terser()
  ],
  output: {
    format: "esm",
    dir: tsconfig.compilerOptions.outDir,
  }
});