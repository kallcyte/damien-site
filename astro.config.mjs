// @ts-check
import { defineConfig } from "astro/config";

import alpinejs from "@astrojs/alpinejs";
import tailwindcss from "@tailwindcss/vite";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  image: {
    layout: "full-width",
  },

  integrations: [alpinejs({ entrypoint: "/src/utils/script.ts" })],
  adapter: cloudflare(),
});