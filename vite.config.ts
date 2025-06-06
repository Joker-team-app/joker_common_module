import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "ApiCore",
      fileName: "api-core",
    },
    rollupOptions: {
      external: ["react", "axios"],
      output: {
        globals: {
          react: "React",
          axios: "axios",
        },
      },
    },
  },
});
