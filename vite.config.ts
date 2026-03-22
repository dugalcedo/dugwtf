import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  plugins: [sveltekit()],
  resolve: {
    alias: {
      "@c": path.resolve(process.cwd(), "src/components"),
    },
  },
  server: {
    watch: {
      usePolling: true,
      interval: 500,
    },
  },
});
