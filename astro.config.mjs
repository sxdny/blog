import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  markdown: {
    shikiConfig: {
      theme: 'min-dark'
    },
  },
  site: 'https://blog.sxdny.dev',
  integrations: [mdx(), sitemap(), tailwind()]
});