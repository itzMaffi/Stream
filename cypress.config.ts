import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:3000"
  },
  component: {
    devServer: {
      framework: "next",
      bundler: "webpack"
    }
  },
  env: {
    DATABASE_URL: "mysql://root@localhost:3306/stream"
  }
});
