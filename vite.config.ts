import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import svgr from "vite-plugin-svgr";

export default defineConfig({
  server: {
    port: process.env.PORT ? parseInt(process.env.PORT) : 4173,
    host: true, // needed for docker
  },
  preview: {
    host: true,
    allowedHosts: process.env.VITE_ALLOWED_HOSTS ? 
      process.env.VITE_ALLOWED_HOSTS.split(',') : 
      ['.ondigitalocean.app']
  },
  build: {
    outDir: "build",
  },
  plugins: [react(), svgr()],
});
