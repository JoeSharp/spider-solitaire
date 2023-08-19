import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/spider-solitaire/",
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./tests/setup.js",
  },
});
