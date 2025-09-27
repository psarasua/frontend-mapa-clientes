import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://managerial-teresa-pablo-sarasua-df7cefa1.koyeb.app",
        changeOrigin: true,
        secure: true,
      },
    },
  },
});
