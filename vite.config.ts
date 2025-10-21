import { defineConfig } from "vite";

export default defineConfig({
  server: {
    host: "::",
    port: 8080,
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
  },
  publicDir: "public",
});
