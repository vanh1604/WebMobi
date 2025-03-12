import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api/v1": {
        target: "https://nodejs-api-tk2t.onrender.com",
        changeOrigin: true,
        secure: false,
      },
    },
    port: 3000,
  },
});
