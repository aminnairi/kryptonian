import { defineConfig } from "rollup";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import remove from "rollup-plugin-delete";
import tsconfig from "./tsconfig.json" assert { type: "json" };
import json from "@rollup/plugin-json";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default defineConfig({
  input: "src/index.ts",
  plugins: [
    remove({
      targets: `${tsconfig.compilerOptions.outDir}/*`,
      verbose: true
    }),
    json(),
    typescript(),
    commonjs(),
    nodeResolve(),
    process.env.NODE_ENV === "production" && terser()
  ],
  output: {
    format: "esm",
    dir: tsconfig.compilerOptions.outDir,
  }
});