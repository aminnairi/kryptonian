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
    terser()
  ],
  output: {
    format: "esm",
    dir: tsconfig.compilerOptions.outDir,
  }
});