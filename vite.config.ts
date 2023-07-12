import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { BASE_API_URL } from "./src/webAPI/constants";

const API_REGEX = `^${BASE_API_URL}/.*`;
const PROXY_TARGET = "http://localhost:5000/";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  server: {
    proxy: {
      [API_REGEX]: {
        target: PROXY_TARGET,
        changeOrigin: true,
        rewrite: (path) => path.replace(BASE_API_URL, "")
      }
    }
  }
});
