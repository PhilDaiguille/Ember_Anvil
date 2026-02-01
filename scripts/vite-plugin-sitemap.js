import { SitemapStream, streamToPromise } from "sitemap";
import { Readable } from "stream";
import { writeFileSync, mkdirSync } from "fs";

/**
 * Plugin Vite pour générer automatiquement le sitemap.xml
 * @param {Object} options - Configuration du plugin
 * @param {string} options.hostname - URL du site (ex: https://ember-anvil.vercel.app/)
 * @param {Array} options.routes - Liste des routes à inclure
 * @param {boolean} options.dynamicRoutes - Activer la génération automatique depuis le router
 */
export default function vitePluginSitemap(options = {}) {
  const {
    hostname = "https://ember-anvil.vercel.app/",
    routes = [],
    outDir = "dist",
  } = options;

  return {
    name: "vite-plugin-sitemap",
    apply: "build",
    async closeBundle() {
      try {
        console.log("\n🗺️  Génération du sitemap...");

        // Routes par défaut si non fournies
        const defaultRoutes = [
          {
            url: "/",
            changefreq: "weekly",
            priority: 1.0,
            lastmod: new Date().toISOString(),
          },
          {
            url: "/forge",
            changefreq: "daily",
            priority: 0.9,
            lastmod: new Date().toISOString(),
          },
          {
            url: "/marche",
            changefreq: "daily",
            priority: 0.8,
            lastmod: new Date().toISOString(),
          },
          {
            url: "/codex",
            changefreq: "weekly",
            priority: 0.8,
            lastmod: new Date().toISOString(),
          },
          {
            url: "/inventaire",
            changefreq: "daily",
            priority: 0.7,
            lastmod: new Date().toISOString(),
          },
          {
            url: "/atelier",
            changefreq: "weekly",
            priority: 0.7,
            lastmod: new Date().toISOString(),
          },
          {
            url: "/profil",
            changefreq: "monthly",
            priority: 0.6,
            lastmod: new Date().toISOString(),
          },
        ];

        const sitemapRoutes = routes.length > 0 ? routes : defaultRoutes;

        // Créer le stream sitemap
        const stream = new SitemapStream({ hostname });

        // Générer le sitemap
        const xml = await streamToPromise(
          Readable.from(sitemapRoutes).pipe(stream),
        );

        // Créer le dossier de sortie s'il n'existe pas
        mkdirSync(`./${outDir}`, { recursive: true });

        // Écrire le fichier
        const outputPath = `./${outDir}/sitemap.xml`;
        writeFileSync(outputPath, xml.toString());

        console.log("✅ Sitemap généré :", outputPath);
        console.log(`📍 ${sitemapRoutes.length} pages ajoutées`);
        console.log(`🌐 ${hostname}\n`);
      } catch (error) {
        console.error("❌ Erreur génération sitemap :", error);
      }
    },
  };
}
