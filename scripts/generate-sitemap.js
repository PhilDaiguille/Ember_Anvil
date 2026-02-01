import { SitemapStream, streamToPromise } from "sitemap";
import { Readable } from "stream";
import { writeFileSync, mkdirSync } from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration du site
const SITE_URL = process.env.VITE_SITE_URL || "https://ember-anvil.vercel.app/";
const OUTPUT_PATH = "./dist/sitemap.xml";

// Définition des routes avec leurs métadonnées SEO
const routes = [
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

// Fonction de génération du sitemap
async function generateSitemap() {
  try {
    console.log("🗺️  Génération du sitemap...");

    // Créer le stream sitemap
    const stream = new SitemapStream({ hostname: SITE_URL });

    // Générer le sitemap à partir des routes
    const xml = await streamToPromise(Readable.from(routes).pipe(stream));

    // Créer le dossier dist s'il n'existe pas
    mkdirSync("./dist", { recursive: true });

    // Écrire le fichier sitemap.xml
    writeFileSync(OUTPUT_PATH, xml.toString());

    console.log("✅ Sitemap généré avec succès :", OUTPUT_PATH);
    console.log(`📍 ${routes.length} pages ajoutées au sitemap`);
    console.log(`🌐 URL du site : ${SITE_URL}`);
  } catch (error) {
    console.error("❌ Erreur lors de la génération du sitemap :", error);
    process.exit(1);
  }
}

// Exécuter la génération
generateSitemap();
