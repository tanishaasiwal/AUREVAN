import { fileURLToPath, URL } from "node:url";
import base44 from "@base44/vite-plugin";
import { cloudflare } from "@cloudflare/vite-plugin";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import packageJson from "./package.json" with { type: "json" };

const NOT_PREBUNDLED = new Set([
  "react",
  "react-dom",
  "@base44/vite-plugin",
  "@tanstack/react-start",
  "@tanstack/react-router",
  "@tanstack/react-router-ssr-query",
  "tailwindcss-animate",
]);

const { dependencies } = packageJson;
const PREBUNDLE = Object.keys(dependencies).filter(
  (name) => !NOT_PREBUNDLED.has(name),
);

// TanStack Vite 8 URL Fix
const tanstackVirtualUrlShim = () => ({
  name: "tanstack-start:virtual-url-shim",
  enforce: "pre",
  configureServer(server) {
    server.middlewares.use((req, _res, next) => {
      if (req.url?.startsWith("/@id/virtual:tanstack-")) {
        req.url = req.url.replace("/@id/virtual:", "/@id/__x00__virtual:");
      }
      next();
    });
  },
});

export default defineConfig({
  resolve: {
    alias: {
      // Ye '@' ko tumhare 'src' folder se jodega (100% sahi tarika)
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  optimizeDeps: { include: PREBUNDLE },
  environments: {
    ssr: {
      optimizeDeps: { include: PREBUNDLE },
      build: {
        sourcemap: true,
        rolldownOptions: { output: { sourcemapExcludeSources: true } },
      },
    },
  },
  plugins: [
    tanstackVirtualUrlShim(),
    // Base44 ke original options wapas add kar diye hain
    base44({
      hmrNotifier: true,
      navigationNotifier: true,
      analyticsTracker: true,
      visualEditAgent: true,
    }),
    cloudflare({ viteEnvironment: { name: "ssr" }, inspectorPort: false }),
    tanstackStart({ srcDirectory: "src" }),
    react(),
  ],
});
