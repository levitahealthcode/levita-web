import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import Sitemap from 'vite-plugin-sitemap';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    Sitemap({
      hostname: 'https://levitahealth.com',
      // list the client routes you want indexed
      dynamicRoutes: ['/', '/about', '/contact', '/services', '/blog'],
      // optional: customize robots.txt (defaults to allow all)
      robots: [{ userAgent: '*', allow: '/' }],
      // generateRobotsTxt: true, // (default)
    }),
  ],
});
