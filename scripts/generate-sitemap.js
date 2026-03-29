/**
 * Génère dist/sitemap.xml à partir des routes définies dans sitemap-routes.js.
 * Utilisé par : npm run sitemap  (et donc npm run build:sitemap)
 */

import { SitemapStream, streamToPromise } from "sitemap";
import { Readable } from "stream";
import { writeFileSync, mkdirSync } from "fs";
import { SITE_URL, sitemapRoutes } from "./sitemap-routes.js";

const OUTPUT_PATH = "./dist/sitemap.xml";

async function generateSitemap() {
  try {
    console.log("Génération du sitemap...");

    const stream = new SitemapStream({ hostname: SITE_URL });
    const xml = await streamToPromise(
      Readable.from(sitemapRoutes).pipe(stream),
    );

    mkdirSync("./dist", { recursive: true });
    writeFileSync(OUTPUT_PATH, xml.toString());

    console.log(`Sitemap généré : ${OUTPUT_PATH}`);
    console.log(`${sitemapRoutes.length} routes — ${SITE_URL}`);
  } catch (error) {
    console.error("Erreur génération sitemap :", error);
    process.exit(1);
  }
}

generateSitemap();
