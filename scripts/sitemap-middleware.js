/**
 * Middleware Express pour servir le sitemap dynamiquement
 * Usage avec Express.js
 *
 * IMPORTANT: Ce fichier est un EXEMPLE pour un serveur Node.js/Express
 * Il n'est PAS utilisé actuellement car EmberAnvil utilise un build statique
 *
 * Pour l'utiliser, vous aurez besoin de:
 * 1. npm install express
 * 2. Créer un serveur Express
 * 3. Importer ce middleware
 */

import { SitemapStream, streamToPromise } from "sitemap";
import { Readable } from "stream";

/**
 * Crée un middleware Express pour servir le sitemap.xml dynamiquement
 *
 * @param {Object} options - Configuration
 * @param {string} options.hostname - URL du site
 * @param {Function} options.getRoutes - Fonction qui retourne les routes (peut être async)
 * @returns {Function} Middleware Express
 *
 * @example
 * import express from 'express';
 * import { sitemapMiddleware } from './scripts/sitemap-middleware.js';
 *
 * const app = express();
 *
 * app.get('/sitemap.xml', sitemapMiddleware({
 *   hostname: 'https://ember-anvil.vercel.app/',
 *   getRoutes: async () => {
 *     // Retourner les routes depuis une base de données, API, etc.
 *     return [
 *       { url: '/', changefreq: 'daily', priority: 1.0 },
 *       { url: '/forge', changefreq: 'daily', priority: 0.9 },
 *     ];
 *   }
 * }));
 */
export function sitemapMiddleware(options = {}) {
  const { hostname = "https://ember-anvil.vercel.app/", getRoutes } = options;

  // Routes par défaut
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

  return async (req, res) => {
    try {
      // Récupérer les routes (depuis une fonction custom ou utiliser les routes par défaut)
      const routes = getRoutes ? await getRoutes() : defaultRoutes;

      // Créer le stream sitemap
      const stream = new SitemapStream({ hostname });

      // Générer le sitemap
      const xml = await streamToPromise(Readable.from(routes).pipe(stream));

      // Définir les headers
      res.header("Content-Type", "application/xml");
      res.header("Cache-Control", "public, max-age=3600"); // Cache 1h

      // Envoyer le XML
      res.send(xml.toString());
    } catch (error) {
      console.error("Erreur génération sitemap:", error);
      res.status(500).send("Erreur serveur");
    }
  };
}

/**
 * Exemple de cache pour éviter de régénérer le sitemap à chaque requête
 */
export function cachedSitemapMiddleware(options = {}) {
  const { hostname, getRoutes, cacheDuration = 3600000 } = options; // 1h par défaut

  let cachedXml = null;
  let lastGenerated = 0;

  return async (req, res) => {
    try {
      const now = Date.now();

      // Vérifier si le cache est valide
      if (!cachedXml || now - lastGenerated > cacheDuration) {
        console.log("♻️  Régénération du sitemap (cache expiré)");

        const routes = getRoutes ? await getRoutes() : [];
        const stream = new SitemapStream({ hostname });
        const xml = await streamToPromise(Readable.from(routes).pipe(stream));

        cachedXml = xml.toString();
        lastGenerated = now;
      } else {
        console.log("✅ Sitemap servi depuis le cache");
      }

      res.header("Content-Type", "application/xml");
      res.header("Cache-Control", "public, max-age=3600");
      res.send(cachedXml);
    } catch (error) {
      console.error("Erreur génération sitemap:", error);
      res.status(500).send("Erreur serveur");
    }
  };
}

/**
 * Exemple d'utilisation avec Express
 */
export function setupSitemapRoutes(app, options = {}) {
  const { hostname = "https://ember-anvil.vercel.app/" } = options;

  // Route sitemap simple
  app.get(
    "/sitemap.xml",
    sitemapMiddleware({
      hostname,
    }),
  );

  // Route sitemap avec cache (recommandé pour la production)
  app.get(
    "/sitemap-cached.xml",
    cachedSitemapMiddleware({
      hostname,
      cacheDuration: 3600000, // 1h
    }),
  );

  console.log("✅ Routes sitemap configurées");
}

/**
 * Exemple de serveur Express complet
 */
export function createExampleServer() {
  // Ceci est un EXEMPLE - pas utilisé actuellement
  /*
  import express from 'express';
  import { setupSitemapRoutes } from './scripts/sitemap-middleware.js';

  const app = express();
  const PORT = process.env.PORT || 3000;

  // Setup sitemap routes
  setupSitemapRoutes(app, {
    hostname: 'https://ember-anvil.vercel.app/'
  });

  // Servir les fichiers statiques
  app.use(express.static('dist'));

  // Démarrer le serveur
  app.listen(PORT, () => {
    console.log(`🚀 Serveur démarré sur http://localhost:${PORT}`);
    console.log(`🗺️  Sitemap disponible sur http://localhost:${PORT}/sitemap.xml`);
  });
  */
}
