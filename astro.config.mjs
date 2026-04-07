// @ts-check
import { defineConfig } from 'astro/config';
import svelte from '@astrojs/svelte';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

// https://astro.build/config
export default defineConfig({
  integrations: [svelte()],

  vite: {
    // @ts-ignore
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve("./src"),
        "@icons": path.resolve("./src/assets/icons"),
        "@lib": path.resolve("./src/lib"),
      },
    },
  }
});