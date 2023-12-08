import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      reporter: ["text", "lcov"],
      all: false,
      thresholds: {
        100: true 
      }
    }
  }
});
