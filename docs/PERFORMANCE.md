# Optimisations de Performance - EmberAnvil

Ce document décrit toutes les optimisations de performance mises en place dans le projet EmberAnvil.

## 🚀 Optimisations Vite 7.x

### 1. Configuration du Plugin Vue

- **Hoisting statique** : Active le hoisting des éléments statiques pour réduire le nombre de re-rendus
- **Cache des handlers** : Met en cache les gestionnaires d'événements pour améliorer les performances

### 2. Optimisation des Dépendances

- **Include explicite** : Pré-bundle les dépendances critiques (vue, vue-router, lucide-vue-next)
- **holdUntilCrawlEnd: false** : Améliore le temps de démarrage à froid pour les grands projets

### 3. Server Warmup

Pré-transforme les fichiers fréquemment utilisés au démarrage du serveur :

- Fichiers d'entrée (main.js, App.vue, router)
- Layout communs (Header, Footer, HomeView)
- Toutes les vues des domaines

### 4. Build Optimizations

- **Code Splitting Manuel** :
  - Chunk `vendor` : Vue + Vue Router
  - Chunk `icons` : Lucide Vue Next
- **CSS Code Splitting** : Extraction automatique du CSS des chunks async
- **Assets Inlining** : Les assets < 4KB sont inlinés en base64
- **Minification** : ESBuild pour une minification ultra-rapide

## 🎯 Optimisations Vue Router 5.x

### 1. Lazy Loading des Routes

Toutes les vues sont chargées de manière lazy (sauf HomeView pour le critical path) :

```javascript
const CraftingView = () => import("@/domains/crafting/views/CraftingView.vue");
```

### 2. Scroll Behavior

Comportement de scroll fluide avec sauvegarde de position pour navigation back/forward.

### 3. Route 404

Redirection automatique vers la page d'accueil pour les routes inexistantes.

## 📦 Gestion des Assets

### 1. OptimizedImage Component

Composant `OptimizedImage.vue` pour lazy loading des images :

- `loading="lazy"` par défaut
- `decoding="async"` pour un décodage asynchrone
- Events `@load` et `@error` pour la gestion d'état
- Width et height pour éviter les layout shifts

### 2. Asset Loader Utils

Utilitaires dans `assetLoader.js` pour :

- Préchargement d'images critiques
- Préchargement de CSS
- Préchargement de fonts
- Préchargement de modules JS
- IntersectionObserver pour lazy loading avancé

## 🔒 PWA & Caching

### 1. Service Worker

Fichier `service-worker.js` avec stratégie **Network First** :

- Cache statique pour les assets critiques
- Cache dynamique avec limite de 50 éléments
- Fallback sur le cache si le réseau échoue
- Nettoyage automatique des anciens caches

### 2. Service Worker Registration

Enregistrement automatique en production :

- Vérification des mises à jour toutes les heures
- Notification utilisateur pour les nouvelles versions
- Rechargement automatique après mise à jour

### 3. Cache Strategies

- **Assets statiques** : Cache immédiat lors de l'installation
- **Pages** : Network First avec fallback sur cache
- **API** : Pas de cache (requêtes non-GET ignorées)

## 🌐 Configuration Vercel (vercel.json)

### 1. Headers de Sécurité

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy` : Désactivation caméra, micro, géolocalisation

### 2. Cache HTTP

- **Assets** (`/assets/*`) : Cache immutable 1 an
- **Images** (jpg, png, webp, avif, svg) : Cache immutable 1 an
- **JS/CSS** : Cache immutable 1 an
- **Fonts** (woff, woff2) : Cache immutable 1 an
- **HTML** : Pas de cache, must-revalidate
- **Manifest** : Cache 24h

### 3. Rewrites

Toutes les routes redirigées vers `index.html` pour SPA routing.

## 📊 Compression

### Vite Plugin Compression

Compression multi-algorithme :

- **Gzip** : Niveau 9 (maximum)
- **Brotli** : Niveau 11 (maximum)
- **Zstandard** : Niveau 22 (maximum)
- Seuil : 1KB (compression si fichier > 1KB)
- Conservation des fichiers originaux

## 🎨 Optimisations CSS

### 1. Tailwind CSS 4.x

- Extraction automatique des classes utilisées
- PurgeCSS intégré
- CSS moderne avec custom properties

### 2. CSS Code Splitting

Extraction automatique du CSS par chunk pour réduire le CSS du critical path.

## 📈 Mesures de Performance Attendues

### Métriques Lighthouse (cibles)

- **Performance** : > 90
- **Accessibility** : > 95
- **Best Practices** : > 95
- **SEO** : > 95

### Core Web Vitals (cibles)

- **LCP** (Largest Contentful Paint) : < 2.5s
- **FID** (First Input Delay) : < 100ms
- **CLS** (Cumulative Layout Shift) : < 0.1

### Bundle Size

- **Initial Bundle** : < 100KB (gzipped)
- **Chunks** : < 50KB each (gzipped)

## 🔧 Commandes de Test

### Test de performance local

```bash
npm run build
npm run preview
```

### Analyser le bundle

```bash
npm run build -- --mode=analyze
```

### Tester le service worker

1. Build production : `npm run build`
2. Preview : `npm run preview`
3. DevTools > Application > Service Workers

## 📝 Prochaines Optimisations Possibles

1. **Image Optimization Plugin** : Convertir automatiquement les images en WebP/AVIF
2. **Prefetch Strategy** : Précharger les routes probables (liens visibles)
3. **Virtual Scrolling** : Pour les longues listes (inventaire, shop)
4. **State Management** : Pinia avec persistance localStorage
5. **Bundle Analysis** : Vite Bundle Analyzer pour identifier les gros modules
6. **Critical CSS** : Extraction du CSS critical path inline dans HTML

## 🎯 Best Practices Appliquées

- ✅ Code splitting par route
- ✅ Lazy loading des images
- ✅ Compression multi-algorithme
- ✅ Cache HTTP optimisé
- ✅ Service Worker avec stratégie réseau
- ✅ Headers de sécurité
- ✅ PWA ready
- ✅ SEO optimisé
- ✅ Vite 7 server warmup
- ✅ Tree-shaking automatique
- ✅ Minification ESBuild

---

**Date de création** : $(date)
**Dernière mise à jour** : $(date)
