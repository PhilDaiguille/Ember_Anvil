/**
 * Source unique de vérité pour les routes du sitemap.
 * Doit rester synchronisé avec src/infrastructure/router/index.js.
 * Les routes sans path fixe (ex: /:pathMatch(.*)*) sont exclues.
 */

export const SITE_URL =
  process.env.VITE_SITE_URL || "https://ember-anvil.vercel.app/";

// changefreq : always | hourly | daily | weekly | monthly | yearly | never
// priority   : 0.0 – 1.0
export const sitemapRoutes = [
  // Pages principales
  { url: "/", changefreq: "weekly", priority: 1.0 },
  { url: "/forge", changefreq: "daily", priority: 0.9 },
  { url: "/marche", changefreq: "daily", priority: 0.8 },
  { url: "/codex", changefreq: "weekly", priority: 0.8 },
  { url: "/inventaire", changefreq: "daily", priority: 0.7 },
  { url: "/atelier", changefreq: "weekly", priority: 0.7 },
  { url: "/profil", changefreq: "monthly", priority: 0.5 },

  // Blog / guides
  { url: "/changelog", changefreq: "monthly", priority: 0.6 },
  {
    url: "/guides/debuter-dans-la-forge",
    changefreq: "monthly",
    priority: 0.8,
  },
  { url: "/guides/glossaire-forge", changefreq: "monthly", priority: 0.7 },
  {
    url: "/guides/meilleurs-jeux-de-forge",
    changefreq: "monthly",
    priority: 0.7,
  },
];
