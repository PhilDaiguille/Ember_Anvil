/**
 * Plugin Vite qui génère automatiquement dist/sitemap.xml à la fin du build.
 * Utilisé dans vite.config.js — s'exécute lors de chaque `vite build`.
 */

import { SitemapStream, streamToPromise } from "sitemap";
import { Readable } from "stream";
import { writeFileSync, mkdirSync } from "fs";
import { SITE_URL, sitemapRoutes } from "./sitemap-routes.js";

export default function vitePluginSitemap(options = {}) {
  const { outDir = "dist" } = options;

  return {
    name: "vite-plugin-sitemap",
    apply: "build",
    async closeBundle() {
      try {
        const stream = new SitemapStream({ hostname: SITE_URL });
        const xml = await streamToPromise(
          Readable.from(sitemapRoutes).pipe(stream),
        );

        mkdirSync(`./${outDir}`, { recursive: true });
        writeFileSync(`./${outDir}/sitemap.xml`, xml.toString());

        console.log(
          `\nSitemap : ${sitemapRoutes.length} routes → ${outDir}/sitemap.xml`,
        );
      } catch (error) {
        console.error("Erreur génération sitemap :", error);
      }
    },
  };
}
