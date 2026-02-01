/**
 * Script avancé pour générer un sitemap avec pages dynamiques
 * Usage: node scripts/generate-sitemap-advanced.js
 */

import { SitemapStream, streamToPromise } from "sitemap";
import { Readable } from "stream";
import { writeFileSync, mkdirSync, readFileSync } from "fs";

const SITE_URL = process.env.VITE_SITE_URL || "https://ember-anvil.vercel.app/";
const OUTPUT_PATH = "./dist/sitemap.xml";

// Routes statiques
const staticRoutes = [
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

/**
 * Génère des routes dynamiques à partir de données
 * Exemple: Ajouter des pages pour chaque matériau du codex
 */
function generateDynamicRoutes() {
  const dynamicRoutes = [];

  try {
    // Exemple: Charger Material.json et créer des pages pour chaque matériau
    const materials = JSON.parse(
      readFileSync("./src/shared/Material.json", "utf-8"),
    );

    // Décommenter pour ajouter des pages de matériaux individuelles
    /*
    materials.forEach(material => {
      dynamicRoutes.push({
        url: `/codex/${material.name.toLowerCase().replace(/\s+/g, '-')}`,
        changefreq: 'monthly',
        priority: 0.5,
        lastmod: new Date().toISOString(),
      });
    });
    */

    // Exemple: Ajouter des pages de catégories
    const categories = [...new Set(materials.map((m) => m.category))];
    categories.forEach((category) => {
      const slug = category.toLowerCase().replace(/\s+/g, "-");
      dynamicRoutes.push({
        url: `/codex/categorie/${slug}`,
        changefreq: "weekly",
        priority: 0.6,
        lastmod: new Date().toISOString(),
      });
    });
  } catch (error) {
    console.warn("⚠️  Impossible de charger Material.json:", error.message);
  }

  return dynamicRoutes;
}

/**
 * Génère le sitemap complet
 */
async function generateSitemap() {
  try {
    console.log("🗺️  Génération du sitemap avancé...");

    // Combiner routes statiques et dynamiques
    const dynamicRoutes = generateDynamicRoutes();
    const allRoutes = [...staticRoutes, ...dynamicRoutes];

    console.log(`📊 Routes statiques: ${staticRoutes.length}`);
    console.log(`📊 Routes dynamiques: ${dynamicRoutes.length}`);
    console.log(`📊 Total: ${allRoutes.length}`);

    // Créer le stream sitemap
    const stream = new SitemapStream({ hostname: SITE_URL });

    // Générer le sitemap
    const xml = await streamToPromise(Readable.from(allRoutes).pipe(stream));

    // Créer le dossier dist s'il n'existe pas
    mkdirSync("./dist", { recursive: true });

    // Écrire le fichier
    writeFileSync(OUTPUT_PATH, xml.toString());

    console.log("✅ Sitemap généré avec succès :", OUTPUT_PATH);
    console.log(`🌐 URL du site : ${SITE_URL}`);

    // Afficher un aperçu
    console.log("\n📋 Aperçu des routes :");
    allRoutes.slice(0, 10).forEach((route) => {
      console.log(`  - ${SITE_URL}${route.url} (priority: ${route.priority})`);
    });
    if (allRoutes.length > 10) {
      console.log(`  ... et ${allRoutes.length - 10} autres routes`);
    }
  } catch (error) {
    console.error("❌ Erreur lors de la génération du sitemap :", error);
    process.exit(1);
  }
}

// Exécuter
generateSitemap();
