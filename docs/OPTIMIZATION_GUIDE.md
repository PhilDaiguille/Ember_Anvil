# Guide d'Utilisation des Optimisations

## 🎯 Composant OptimizedImage

Utilisez le composant `OptimizedImage` pour charger efficacement vos images :

```vue
<template>
  <OptimizedImage
    src="/assets/materials/fer.png"
    alt="Minerai de fer"
    :width="64"
    :height="64"
    loading="lazy"
    class="material-icon"
    @load="handleImageLoad"
    @error="handleImageError"
  />
</template>

<script>
import OptimizedImage from "@/shared/ui/OptimizedImage.vue";

export default {
  components: {
    OptimizedImage,
  },
  methods: {
    handleImageLoad() {
      console.log("Image chargée");
    },
    handleImageError() {
      console.error("Erreur de chargement");
    },
  },
};
</script>
```

### Props disponibles :

- `src` (required) : URL de l'image
- `alt` (required) : Texte alternatif
- `loading` : "lazy" (défaut) ou "eager"
- `decoding` : "async" (défaut), "sync" ou "auto"
- `width` : Largeur en pixels
- `height` : Hauteur en pixels
- `imageClass` : Classes CSS à appliquer

## 📦 Asset Loader Utils

### Précharger des images critiques

```javascript
import { preloadImages } from "@/shared/utils/assetLoader";

export default {
  mounted() {
    // Précharger les images importantes au démarrage
    preloadImages([
      "/assets/bg.avif",
      "/assets/materials/fer.png",
      "/assets/materials/cuivre.png",
    ]);
  },
};
```

### Lazy loading avec IntersectionObserver

```javascript
import { createLazyObserver } from "@/shared/utils/assetLoader";

export default {
  mounted() {
    const observer = createLazyObserver(
      (entry) => {
        // Charger le contenu quand l'élément est visible
        this.loadHeavyContent();
        observer.disconnect(); // Arrêter l'observation
      },
      { rootMargin: "100px" }, // Charger 100px avant d'être visible
    );

    observer.observe(this.$refs.lazySection);
  },
};
```

## 🔄 Service Worker

Le service worker est automatiquement enregistré en production. Pour le gérer manuellement :

```javascript
import {
  registerServiceWorker,
  unregisterServiceWorker,
  clearAllCaches,
} from "@/shared/utils/serviceWorkerRegistration";

// Forcer le rechargement du service worker
registerServiceWorker();

// Désinstaller (utile en développement)
unregisterServiceWorker();

// Vider tous les caches
clearAllCaches();
```

## 🚀 Commandes de Build

### Build de production

```bash
npm run build
```

### Preview du build

```bash
npm run preview
```

### Build avec sitemap

```bash
npm run build:sitemap
```

## 📊 Analyser les Performances

### 1. Lighthouse

- Build production : `npm run build`
- Preview : `npm run preview`
- Ouvrir Chrome DevTools > Lighthouse
- Lancer un audit

### 2. Network Analysis

- Preview : `npm run preview`
- Chrome DevTools > Network
- Activer "Disable cache"
- Recharger la page
- Vérifier :
  - Taille des chunks
  - Temps de chargement
  - Waterfall des requêtes

### 3. Bundle Analysis

```bash
# Installer vite-plugin-visualizer
npm install -D rollup-plugin-visualizer

# Ajouter au vite.config.js (optionnel)
import { visualizer } from 'rollup-plugin-visualizer';

plugins: [
  // ... autres plugins
  visualizer({ open: true })
]

# Build pour voir l'analyse
npm run build
```

## 🎨 Utiliser le Lazy Loading des Routes

Les routes sont déjà configurées avec lazy loading. Pour ajouter une nouvelle route :

```javascript
// router/index.js
const NewView = () => import("@/domains/new/views/NewView.vue");

routes: [
  {
    path: "/new",
    name: "new",
    component: NewView,
    meta: {
      title: "Nouveau - EmberAnvil",
      description: "Description de la nouvelle page",
    },
  },
];
```

## 🔧 Développement

### Désactiver le service worker en dev

Le service worker est automatiquement désactivé en développement (`import.meta.env.PROD`).

Si vous voulez le tester en dev :

```javascript
// main.js
if (import.meta.env.DEV) {
  registerServiceWorker();
}
```

### Hot Module Replacement (HMR)

Vite 7 offre un HMR ultra-rapide. Les modifications sont reflétées instantanément sans rechargement complet.

## 📈 Résultats Attendus

### Avant optimisations

- Bundle principal : ~150KB
- Temps de chargement initial : ~2-3s
- Score Lighthouse : 70-80

### Après optimisations

- Bundle principal : ~60KB (gzipped: ~40KB)
- Chunks lazy : ~5-15KB chacun
- Temps de chargement initial : <1s
- Score Lighthouse : >90

## 🐛 Debugging

### Service Worker ne se met pas à jour

```javascript
// Console navigateur
navigator.serviceWorker.getRegistrations().then((registrations) => {
  registrations.forEach((registration) => {
    registration.unregister();
  });
});
location.reload();
```

### Cache problématique

```javascript
// Console navigateur
caches.keys().then((names) => {
  names.forEach((name) => caches.delete(name));
});
```

### Vérifier le cache HTTP

```bash
curl -I https://ember-anvil.vercel.app/assets/index.js
# Chercher le header Cache-Control
```

## 🎯 Checklist de Déploiement

Avant de déployer en production :

- [ ] `npm run build` fonctionne sans erreur
- [ ] `npm run preview` affiche le site correctement
- [ ] Service worker s'enregistre (DevTools > Application)
- [ ] Toutes les routes fonctionnent
- [ ] Images se chargent correctement
- [ ] Score Lighthouse > 90
- [ ] Pas d'erreurs dans la console
- [ ] vercel.json est présent
- [ ] Headers de sécurité configurés

## 📚 Ressources

- [Vite 7 Documentation](https://vitejs.dev/)
- [Vue 3 Performance](https://vuejs.org/guide/best-practices/performance.html)
- [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Web Vitals](https://web.dev/vitals/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)

---

Pour plus de détails techniques, consultez [PERFORMANCE.md](./PERFORMANCE.md)
