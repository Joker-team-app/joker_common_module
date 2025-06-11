import { defineConfig } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/main.ts"),
      name: "JokerCommonModule",
      fileName: "joker-common-module",
      formats: ["es"], // You could also add "cjs" if needed
    },
    rollupOptions: {
      // ✅ Externalize common/shared deps so they’re not bundled
      external: [
        "react",
        "react-dom",
        "redux",
        "react-redux",
        "react-router-dom",
        "@reduxjs/toolkit",
        "redux-persist",
        "axios",
        "crypto-js",
      ],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          redux: "Redux",
          "react-redux": "ReactRedux",
          "react-router-dom": "ReactRouterDOM",
          "@reduxjs/toolkit": "RTK",
          "redux-persist": "ReduxPersist",
          axios: "axios",
          "crypto-js": "CryptoJS",
        },
      },
    },
  },
  envDir: path.resolve(__dirname, "../../"), // for monorepo env support
});
