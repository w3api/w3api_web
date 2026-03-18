// @ts-check
import { defineConfig } from "astro/config";
import expressiveCode from "astro-expressive-code";

export default defineConfig({
  site: process.env.SITE_URL || 'http://localhost:3000',
  integrations: [expressiveCode()],
});