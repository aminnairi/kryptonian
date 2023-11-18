import { defineConfig } from "rollup";
import typescript from "@rollup/plugin-typescript";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import run from "@rollup/plugin-run";

export default defineConfig({
  input: "index.ts",
  plugins: [
    typescript(),
    nodeResolve(),
    commonjs(),
    process.env.NODE_ENV === "development" && run()
  ],
  output: {
    format: "esm",
    file: "dist/index.js"
  }
});