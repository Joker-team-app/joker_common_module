import { defineConfig } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/main.ts"), // Only this is exposed
      name: "JokerCommonModule",
      fileName: "joker-common-module", // Will generate: joker-common-module.mjs
      formats: ["es"], // You’ll get dist/joker-common-module.mjs
    },
    rollupOptions: {
      external: ["react", "react-dom", "redux", "react-redux", "axios"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          axios: "axios",
        },
      },
    },
  },
  envDir: path.resolve(__dirname, "../../"), // ✅ root env support in monorepo
});
