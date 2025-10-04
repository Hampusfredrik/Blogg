// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import rehypeSidenotes from '@jrsinclair/rehype-sidenotes';

// https://astro.build/config
export default defineConfig({
  integrations: [mdx()],
  markdown: {
    rehypePlugins: [rehypeSidenotes],
  },
  vite: {
    plugins: [tailwindcss()]
  }
});