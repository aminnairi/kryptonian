import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "happy-dom",
    coverage: {
      reporter: ["text", "lcov"],
      all: false,
      thresholds: {
        100: true 
      }
    }
  }
});
