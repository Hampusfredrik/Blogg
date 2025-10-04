// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel/serverless';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import rehypeSidenotes from '@jrsinclair/rehype-sidenotes';

// https://astro.build/config
export default defineConfig({
  output: 'server',
  adapter: vercel(),
  integrations: [mdx()],
  markdown: {
    rehypePlugins: [rehypeSidenotes],
  },
  vite: {
    plugins: [tailwindcss()]
  }
});