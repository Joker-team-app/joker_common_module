import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
  envDir: path.resolve(__dirname, "../../"), // ✅ root env support in monorepo
});
