import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        secure: false,
      },
    },
  }, // this is adding a proxy, this means that whenever we call any route with /api, it will be appended with http://localhost:3000
  plugins: [react()],
});
