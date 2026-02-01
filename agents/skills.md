# 🔥 Ember Anvil - Documentation Technique & Compétences

## 📋 Table des Matières

1. [Vue d'ensemble du projet](#vue-densemble-du-projet)
2. [Stack Technique](#stack-technique)
3. [Architecture](#architecture)
4. [Palette de Couleurs & Design System](#palette-de-couleurs--design-system)
5. [Composants Principaux](#composants-principaux)
6. [Routing & Navigation](#routing--navigation)
7. [SEO & Optimisation](#seo--optimisation)
8. [Tailwind CSS v4](#tailwind-css-v4)
9. [Bonnes Pratiques](#bonnes-pratiques)
10. [Fonctionnalités à Développer](#fonctionnalités-à-développer)

---

## 🎯 Vue d'ensemble du projet

**Ember Anvil** est une forge virtuelle interactive où les utilisateurs peuvent :

- ⚒️ **Créer des objets** via un système de crafting avancé
- 🛒 **Acheter des matériaux** dans la boutique
- 📖 **Consulter le wiki** pour apprendre les recettes et propriétés des matériaux
- 🎨 **Expérimenter** avec plus de 100 matériaux et 500+ recettes

### Concept & Vision

- Univers médiéval/artisanal avec une ambiance chaleureuse
- Interface moderne avec des effets visuels subtils
- Expérience immersive combinant tradition et technologie

---

## 🛠 Stack Technique

### Frontend

```json
{
  "vue": "^3.6.0-beta.5",
  "vue-router": "^5.0.1",
  "tailwindcss": "^4.1.11",
  "@tailwindcss/vite": "^4.1.15",
  "vite": "^8.0.0-beta.11"
}
```

### Outils de Développement

- **Vite** : Build tool ultra-rapide
- **ESLint** : Linting avec plugin Vue
- **Prettier** : Formatage du code
- **Oxlint** : Linter performant
- **Vitest** : Framework de tests

### Commandes Importantes

```bash
npm run dev      # Serveur de développement
npm run build    # Build de production
npm run preview  # Prévisualiser le build
npm run lint     # Linter le code
npm run format   # Formater le code
```

---

## 🏗 Architecture

### Structure des Dossiers

```
Ember_Anvil/
├── public/
│   └── assets/           # Assets statiques
│       ├── bg.jpg        # Background principal
│       └── Material/     # Images des matériaux
├── src/
│   ├── assets/
│   │   ├── bg.jpg
│   │   ├── materials/    # Images matériaux
│   │   └── style/
│   │       ├── base.css  # Styles de base + CSS vars
│   │       └── main.css  # Import Tailwind + fonts
│   ├── components/
│   │   ├── PageHeader.vue    # Navigation principale
│   │   ├── PageMain.vue      # Page d'accueil (Hero + Features)
│   │   ├── PageFooter.vue    # Footer
│   │   ├── Crafting.vue      # Système de crafting
│   │   ├── Shop.vue          # Boutique
│   │   ├── ShopCard.vue      # Carte produit
│   │   ├── Wiki.vue          # Encyclopédie
│   │   └── Material.json     # Données des matériaux
│   ├── router/
│   │   └── index.js          # Configuration Vue Router
│   ├── views/
│   │   ├── Home.vue          # Vue Home
│   │   ├── MenuCraft.vue     # Vue Crafting
│   │   ├── MenuShop.vue      # Vue Shop
│   │   └── Wiki.vue          # Vue Wiki
│   ├── App.vue               # Composant racine
│   └── main.js               # Point d'entrée
├── index.html                # HTML principal (SEO optimisé)
├── package.json
└── vite.config.js
```

### Pattern d'Architecture

- **Composition API** : Vue 3 moderne
- **Single File Components (SFC)**
- **Router-based navigation**
- **Component-driven design**

---

## 🎨 Palette de Couleurs & Design System

### Variables CSS (base.css)

```css
:root {
  --jet: rgb(25, 25, 25); /* Noir profond - Background */
  --auburn: rgb(133, 50, 51); /* Rouge brique - Accent principal */
  --dun: rgb(161, 152, 130); /* Beige clair */
  --khaki: rgb(150, 137, 123); /* Beige foncé */
  --viridian: rgb(50, 93, 68); /* Vert forêt - Footer */
  --sea-green: rgb(0, 114, 87); /* Vert émeraude */
}
```

### Palette Tailwind Équivalente

```
Noir : bg-black, text-black
Auburn : bg-red-900, text-red-900
Ambre/Orange : from-amber-600 to-orange-700
Émeraude : from-emerald-900 to-teal-900
Bleu/Indigo : from-blue-900 to-indigo-900
```

### Typographie

```css
/* Fonts */
- "Caesar Dressing" : Logo et titres principaux (font-['Caesar_Dressing'])
- "Labrada" : Corps de texte (serif élégant)

/* Import */
@import url("https://fonts.googleapis.com/css2?family=Caesar+Dressing&family=Labrada:wght@100;200;300;400;500;600;700;800;900&display=swap");
```

### Effets Visuels

- **Backdrop blur** : `backdrop-blur-sm`, `backdrop-blur-md`
- **Gradients** : `bg-linear-to-r`, `bg-linear-to-br`
- **Ombres** : `shadow-xl`, `shadow-2xl`
- **Transitions** : `transition-all duration-300`
- **Hover effects** : `hover:scale-105`, `hover:scale-110`

---

## 🧩 Composants Principaux

### PageHeader.vue

**Rôle** : Navigation principale avec logo central

**Structure** :

```vue
<header>
  <nav>
    <ul class="flex justify-around">
      <li>Crafting</li>
      <li>Logo (Ember Anvil)</li>
      <li>Shop</li>
      <li>Wiki</li>
    </ul>
  </nav>
</header>
```

**Style** :

- Logo avec font "Caesar Dressing"
- Background auburn sur le logo
- Font-weight bold sur les liens

---

### PageMain.vue

**Rôle** : Page d'accueil complète avec SEO optimisé

**Sections** :

1. **Hero Section**
   - Titre principal avec effet drop-shadow
   - Sous-titre et description
   - 2 CTA buttons (Commencer à Forger, Explorer le Wiki)
   - Background blur + overlay noir transparent

2. **Features Section**
   - 3 cards (Crafting, Boutique, Wiki)
   - Gradients colorés distincts (orange/red, emerald/teal, blue/indigo)
   - Icônes emoji (⚒️, 🛒, 📖)
   - Animation fadeInUp avec délai séquentiel

3. **About Section**
   - Présentation d'Ember Anvil
   - 3 statistiques (100+ matériaux, 500+ recettes, ∞ possibilités)
   - Background noir semi-transparent

4. **Call to Action Final**
   - CTA principal "Prêt à Allumer Votre Forge ?"
   - Bouton prominent avec hover effect

**SEO Features** :

```javascript
mounted() {
  this.updateMetaTags();
}

methods: {
  updateMetaTags() {
    // Met à jour dynamiquement :
    // - document.title
    // - meta description
    // - meta keywords
    // - Open Graph tags
    // - Twitter Card tags
  }
}
```

**Animations CSS** :

```css
/* Fade in cards */
@keyframes fadeInUp { ... }

/* Shine effect sur CTA */
@keyframes shine { ... }

/* Bounce effect sur icônes */
@keyframes bounce { ... }
```

**Accessibilité** :

- Attributs `role="main"`, `aria-label`, `aria-labelledby`
- Classe `.sr-only` pour les titres cachés
- Sémantique HTML5 (`<section>`, `<article>`, `<h2>`, etc.)

---

### PageFooter.vue

**Rôle** : Footer avec informations de copyright

**Style** :

- Background viridian (vert forêt)
- Centré
- Padding confortable

---

### Crafting.vue

**Rôle** : Système de crafting d'objets

**À développer** :

- Interface drag & drop
- Combinaison de matériaux
- Affichage des résultats
- Système de recettes

---

### Shop.vue & ShopCard.vue

**Rôle** : Boutique de matériaux

**À développer** :

- Grille de produits
- Filtres par catégorie
- Système de panier
- Prix et monnaie virtuelle

---

### Wiki.vue

**Rôle** : Encyclopédie des matériaux et recettes

**À développer** :

- Liste des matériaux
- Fiches détaillées
- Recettes associées
- Système de recherche

---

### Material.json

**Rôle** : Base de données des matériaux

**Structure attendue** :

```json
[
  {
    "id": "fer",
    "name": "Fer",
    "image": "fer.png",
    "rarity": "common",
    "description": "Métal robuste...",
    "price": 10,
    "properties": {
      "durability": 7,
      "sharpness": 5,
      "weight": 8
    },
    "recipes": ["épée_fer", "armure_fer"]
  }
]
```

---

## 🧭 Routing & Navigation

### Configuration (router/index.js)

```javascript
import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/Crafting",
    name: "Crafting",
    component: () => import("../views/MenuCraft.vue"),
  },
  {
    path: "/Shop",
    name: "Shop",
    component: () => import("../views/MenuShop.vue"),
  },
  {
    path: "/Wiki",
    name: "Wiki",
    component: () => import("../views/Wiki.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
```

### Navigation

```vue
<!-- Utiliser router-link -->
<router-link to="/Crafting">Crafting</router-link>

<!-- Ou navigation programmatique -->
this.$router.push('/Shop')
```

---

## 🔍 SEO & Optimisation

### Meta Tags (index.html)

```html
<!-- Primary Meta Tags -->
<title>
  Ember Anvil - Forge Virtuelle & Artisanat | Crafting, Wiki & Boutique
</title>
<meta name="description" content="..." />
<meta name="keywords" content="ember anvil, forge virtuelle, crafting..." />
<meta name="robots" content="index, follow, max-image-preview:large..." />

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:title" content="..." />
<meta property="og:description" content="..." />
<meta
  property="og:image"
  content="https://ember-anvil.vercel.app//src/assets/og-image.jpg"
/>

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="..." />
```

### Données Structurées (JSON-LD)

```html
<!-- WebSite Schema -->
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Ember Anvil",
    "url": "https://ember-anvil.vercel.app/",
    "description": "Forge virtuelle pour l'artisanat...",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://ember-anvil.vercel.app//search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }
</script>

<!-- WebApplication Schema -->
<script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Ember Anvil",
    "applicationCategory": "Game",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "1250"
    }
  }
</script>
```

### Checklist SEO

- ✅ Titre unique et descriptif
- ✅ Meta description optimisée (150-160 caractères)
- ✅ URL canonical
- ✅ Balises Open Graph
- ✅ Twitter Cards
- ✅ Données structurées JSON-LD
- ✅ Images optimisées avec alt text
- ✅ Sémantique HTML5
- ✅ Accessibilité (ARIA labels)
- ✅ Performance (Vite build optimisé)

---

## 🎨 Tailwind CSS v4

### Différences avec v3

```css
/* ❌ Tailwind v3 */
bg-gradient-to-r
bg-gradient-to-br

/* ✅ Tailwind v4 */
bg-linear-to-r
bg-linear-to-br
```

### Configuration (main.css)

```css
@import url("https://fonts.googleapis.com/css2?family=...");
@import url("base.css");
@import "tailwindcss";
```

### Classes Fréquentes

```css
/* Layout */
flex, grid, max-w-6xl, mx-auto

/* Spacing */
p-8, py-16, px-4, gap-8, space-y-6

/* Colors */
text-white, text-amber-100, bg-black/40

/* Effects */
backdrop-blur-md, shadow-xl, rounded-xl

/* Transitions */
transition-all duration-300, hover:scale-105

/* Typography */
text-5xl, font-bold, leading-relaxed

/* Responsive */
md:text-7xl, md:grid-cols-3
```

---

## ✅ Bonnes Pratiques

### Vue 3 Composition API

```javascript
// Préférer Composition API pour les nouveaux composants
<script setup>
import { ref, computed, onMounted } from 'vue'

const count = ref(0)
const double = computed(() => count.value * 2)

onMounted(() => {
  console.log('Component mounted')
})
</script>
```

### Organisation du Code

1. **Structure claire** : imports → data → computed → methods → lifecycle
2. **Composants réutilisables** : DRY (Don't Repeat Yourself)
3. **Props & Events** : Communication parent-enfant
4. **Composables** : Logique réutilisable (useCart, useCrafting, etc.)

### Performance

- **Lazy loading** : Routes avec `import()`
- **Code splitting** : Vite le fait automatiquement
- **Image optimization** : Utiliser WebP quand possible
- **CSS scoped** : Éviter les conflits de styles

### Accessibilité

- **Sémantique HTML** : `<header>`, `<main>`, `<footer>`, `<article>`
- **ARIA labels** : `aria-label`, `aria-labelledby`, `role`
- **Contraste** : Texte lisible sur tous les backgrounds
- **Navigation clavier** : Tous les éléments interactifs accessibles

---

## 🚀 Fonctionnalités à Développer

### 1. Système de Crafting Complet

**Priorité** : 🔴 Haute

**Features** :

- [ ] Interface drag & drop pour combiner matériaux
- [ ] Système de recettes (prérequis, résultat)
- [ ] Animation de forge (feu, marteau, etc.)
- [ ] Feedback visuel (succès, échec)
- [ ] Inventaire personnel
- [ ] Niveau de compétence (XP, déblocage recettes)

**Technologies** :

- VueDraggable ou @vueuse/gesture
- Animations CSS/GSAP
- Pinia pour state management

**Structure suggérée** :

```javascript
// useCrafting.js
export function useCrafting() {
  const inventory = ref([]);
  const selectedMaterials = ref([]);
  const recipes = ref([]);

  const canCraft = computed(() => {
    // Vérifie si les matériaux sélectionnés matchent une recette
  });

  const craft = () => {
    // Logique de crafting
  };

  return { inventory, selectedMaterials, canCraft, craft };
}
```

---

### 2. Boutique Interactive

**Priorité** : 🟠 Moyenne

**Features** :

- [ ] Grille de produits (ShopCard components)
- [ ] Filtres (type, rareté, prix)
- [ ] Système de monnaie virtuelle
- [ ] Panier d'achat
- [ ] Historique d'achats
- [ ] Animations d'ajout au panier

**Structure suggérée** :

```vue
<!-- Shop.vue -->
<template>
  <div class="shop-container">
    <ShopFilters @filter="filterProducts" />
    <div class="products-grid">
      <ShopCard
        v-for="product in filteredProducts"
        :key="product.id"
        :product="product"
        @add-to-cart="addToCart"
      />
    </div>
    <ShoppingCart :items="cartItems" />
  </div>
</template>
```

---

### 3. Wiki Dynamique

**Priorité** : 🟡 Moyenne-Basse

**Features** :

- [ ] Liste des matériaux avec images
- [ ] Fiches détaillées (propriétés, recettes)
- [ ] Barre de recherche
- [ ] Filtres par catégorie
- [ ] Favoris
- [ ] Progression de découverte (% matériaux découverts)

**Structure de données** :

```javascript
// materials.js
export const materials = [
  {
    id: "fer",
    name: "Fer",
    image: "/assets/materials/fer.png",
    category: "metal",
    rarity: "common",
    description: "Métal robuste utilisé dans de nombreuses créations",
    properties: {
      durability: 7,
      sharpness: 5,
      weight: 8,
      fireResistance: 6,
    },
    price: 10,
    recipes: [
      { id: "epee_fer", result: "Épée en Fer" },
      { id: "armure_fer", result: "Armure en Fer" },
    ],
    lore: "Le fer est extrait des mines profondes...",
  },
];
```

---

### 4. Système de Progression

**Priorité** : 🟢 Basse

**Features** :

- [ ] Niveaux de forgeron (1-100)
- [ ] Expérience (XP) par craft
- [ ] Déblocage de recettes progressif
- [ ] Achievements / Trophées
- [ ] Leaderboard (si multijoueur)
- [ ] Sauvegarde locale (localStorage/IndexedDB)

---

### 5. Animations & Polish

**Priorité** : 🟢 Basse (mais impact visuel fort)

**Ideas** :

- [ ] Particules de feu sur la page d'accueil
- [ ] Animation de marteau qui frappe (crafting)
- [ ] Effet de fusion/forge des matériaux
- [ ] Transitions de page fluides
- [ ] Sound effects (optionnel, avec toggle)
- [ ] Mode sombre/clair (optionnel)

---

## 🔧 State Management

### Option 1 : Pinia (Recommandé)

```bash
npm install pinia
```

```javascript
// stores/gameStore.js
import { defineStore } from "pinia";

export const useGameStore = defineStore("game", {
  state: () => ({
    playerLevel: 1,
    playerXP: 0,
    gold: 100,
    inventory: [],
    unlockedRecipes: [],
  }),

  getters: {
    inventoryCount: (state) => state.inventory.length,
    canAfford: (state) => (price) => state.gold >= price,
  },

  actions: {
    addToInventory(item) {
      this.inventory.push(item);
    },

    spendGold(amount) {
      if (this.canAfford(amount)) {
        this.gold -= amount;
        return true;
      }
      return false;
    },

    addXP(amount) {
      this.playerXP += amount;
      // Logique de level up
      while (this.playerXP >= this.xpForNextLevel) {
        this.levelUp();
      }
    },
  },
});
```

### Option 2 : Composables (pour logique simple)

```javascript
// composables/useInventory.js
import { ref } from "vue";

const inventory = ref([]);

export function useInventory() {
  const addItem = (item) => {
    inventory.value.push(item);
  };

  const removeItem = (itemId) => {
    const index = inventory.value.findIndex((i) => i.id === itemId);
    if (index !== -1) inventory.value.splice(index, 1);
  };

  return { inventory, addItem, removeItem };
}
```

---

## 📊 Données du Jeu

### Structure Material.json

```json
{
  "materials": [
    {
      "id": "fer",
      "name": "Fer",
      "image": "fer.png",
      "category": "metal",
      "rarity": "common",
      "description": "Métal robuste et polyvalent",
      "price": 10,
      "sellPrice": 5,
      "properties": {
        "durability": 7,
        "sharpness": 5,
        "weight": 8,
        "fireResistance": 6,
        "magicAffinity": 2
      }
    },
    {
      "id": "cuivre",
      "name": "Cuivre",
      "image": "cuivre.png",
      "category": "metal",
      "rarity": "common",
      "description": "Métal malléable et conducteur",
      "price": 8,
      "sellPrice": 4,
      "properties": {
        "durability": 5,
        "sharpness": 3,
        "weight": 6,
        "fireResistance": 4,
        "magicAffinity": 6
      }
    },
    {
      "id": "aluminium",
      "name": "Aluminium",
      "image": "aluminium.png",
      "category": "metal",
      "rarity": "uncommon",
      "description": "Métal léger et résistant",
      "price": 15,
      "sellPrice": 8,
      "properties": {
        "durability": 6,
        "sharpness": 4,
        "weight": 3,
        "fireResistance": 5,
        "magicAffinity": 4
      }
    }
  ],

  "recipes": [
    {
      "id": "epee_fer",
      "name": "Épée en Fer",
      "category": "weapon",
      "requiredLevel": 1,
      "materials": [
        { "id": "fer", "quantity": 3 },
        { "id": "bois", "quantity": 1 }
      ],
      "result": {
        "id": "epee_fer_item",
        "name": "Épée en Fer",
        "type": "weapon",
        "stats": {
          "attack": 10,
          "durability": 50
        }
      },
      "xpGain": 25,
      "craftTime": 3000
    }
  ]
}
```

---

## 🎮 Game Mechanics

### Système de Rareté

```javascript
const rarities = {
  common: { color: "text-gray-400", dropRate: 0.6 },
  uncommon: { color: "text-green-400", dropRate: 0.25 },
  rare: { color: "text-blue-400", dropRate: 0.1 },
  epic: { color: "text-purple-400", dropRate: 0.04 },
  legendary: { color: "text-orange-400", dropRate: 0.01 },
};
```

### Formule d'XP

```javascript
function calculateXPForLevel(level) {
  return Math.floor(100 * Math.pow(1.5, level - 1));
}

function calculateCraftXP(recipe) {
  const baseXP = 25;
  const rarityMultiplier = getRarityMultiplier(recipe.rarity);
  return baseXP * rarityMultiplier;
}
```

### Système de Qualité

```javascript
// Qualité aléatoire lors du craft
function calculateQuality() {
  const roll = Math.random();
  if (roll < 0.05) return "legendary"; // 5%
  if (roll < 0.2) return "excellent"; // 15%
  if (roll < 0.5) return "good"; // 30%
  return "normal"; // 50%
}
```

---

## 🐛 Debug & Tests

### Console Debugging

```javascript
// Activer les dev tools Vue
if (process.env.NODE_ENV === "development") {
  window.__VUE_DEVTOOLS_GLOBAL_HOOK__ = true;
}

// Logger pour debug
const debug = {
  log: (...args) => {
    if (import.meta.env.DEV) {
      console.log("[Ember Anvil]", ...args);
    }
  },
};
```

### Tests Unitaires (Vitest)

```javascript
// tests/useCrafting.test.js
import { describe, it, expect } from "vitest";
import { useCrafting } from "@/composables/useCrafting";

describe("useCrafting", () => {
  it("should craft item when materials are sufficient", () => {
    const { craft, inventory } = useCrafting();

    inventory.value = [{ id: "fer", quantity: 5 }];

    const result = craft("epee_fer");

    expect(result.success).toBe(true);
    expect(result.item.name).toBe("Épée en Fer");
  });
});
```

---

## 📱 Responsive Design

### Breakpoints Tailwind

```css
/* Mobile first approach */
sm: '640px'   /* Tablet */
md: '768px'   /* Desktop petit */
lg: '1024px'  /* Desktop */
xl: '1280px'  /* Large desktop */
2xl: '1536px' /* Extra large */

/* Utilisation */
<div class="text-base md:text-lg xl:text-xl">
```

### Tests Responsive

- iPhone SE (375px)
- iPad (768px)
- Desktop (1920px)

---

## 🚀 Déploiement

### Build de Production

```bash
npm run build
# Génère le dossier dist/
```

### Optimisations Vite

```javascript
// vite.config.js
export default {
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ["vue", "vue-router"],
          ui: ["@headlessui/vue"],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
};
```

### Hosting

- **Vercel** : Auto-deploy depuis GitHub
- **Netlify** : Drag & drop ou Git
- **GitHub Pages** : Gratuit
- **Firebase Hosting** : Rapide

---

## 🔐 Sécurité

### Bonnes Pratiques

```javascript
// ❌ Ne JAMAIS stocker de secrets dans le code
const API_KEY = "abc123"; // Mauvais

// ✅ Utiliser les variables d'environnement
const API_KEY = import.meta.env.VITE_API_KEY;
```

### Validation des Données

```javascript
// Valider les inputs utilisateur
function validateCraft(recipe, inventory) {
  if (!recipe || !recipe.materials) {
    throw new Error("Invalid recipe");
  }

  for (const material of recipe.materials) {
    const userMaterial = inventory.find((m) => m.id === material.id);
    if (!userMaterial || userMaterial.quantity < material.quantity) {
      return { valid: false, error: "Insufficient materials" };
    }
  }

  return { valid: true };
}
```

---

## 📚 Ressources Utiles

### Documentation

- [Vue 3](https://vuejs.org/)
- [Vue Router 5](https://router.vuejs.org/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
- [Pinia](https://pinia.vuejs.org/)

### Design Inspiration

- [Dribbble - Game UI](https://dribbble.com/tags/game-ui)
- [Awwwards](https://www.awwwards.com/)

### Assets

- [Heroicons](https://heroicons.com/) - Icônes SVG
- [Unsplash](https://unsplash.com/) - Images libres
- [Flaticon](https://www.flaticon.com/) - Icônes

---

## 🎯 Roadmap Suggérée

### Phase 1 : MVP (Minimum Viable Product)

- [x] Page d'accueil SEO optimisée
- [ ] Système de crafting basique (3-5 recettes)
- [ ] Boutique avec 10 matériaux
- [ ] Wiki avec fiches matériaux
- [ ] Sauvegarde localStorage

### Phase 2 : Gameplay

- [ ] Système d'XP et de niveaux
- [ ] 50+ recettes
- [ ] Système de qualité des objets
- [ ] Achievements

### Phase 3 : Polish

- [ ] Animations avancées
- [ ] Sound effects
- [ ] Tutoriel interactif
- [ ] Mode histoire (quêtes)

### Phase 4 : Social (Optionnel)

- [ ] Leaderboard global
- [ ] Partage de créations
- [ ] Mode compétition
- [ ] Backend (Firebase/Supabase)

---

## 💡 Tips & Tricks

### Performance

```javascript
// Utiliser v-show pour toggle fréquents, v-if pour render conditionnel
<div v-show="isVisible">Fast toggle</div>
<div v-if="shouldRender">Conditional render</div>

// Lazy load images
<img loading="lazy" :src="imageUrl" />
```

### DX (Developer Experience)

```javascript
// Utiliser les Vue DevTools
// Installer l'extension Chrome/Firefox

// Hot Module Replacement (HMR) avec Vite
// Modifications instantanées sans refresh
```

### Debugging Vue

```javascript
// Accéder aux composants dans la console
const app = document.querySelector("#app").__vueParentComponent;

// Logger tous les events
onMounted(() => {
  console.log("Component mounted:", getCurrentInstance());
});
```

---

## 🎨 Conventions de Code

### Naming

```javascript
// Components : PascalCase
(PageHeader.vue, ShopCard.vue);

// Composables : camelCase avec prefix "use"
(useCrafting.js, useInventory.js);

// Constants : UPPER_SNAKE_CASE
const MAX_INVENTORY_SIZE = 50;

// Variables : camelCase
const playerLevel = 10;
```

### Structure de Composant

```vue
<script setup>
// 1. Imports
import { ref, computed } from "vue";

// 2. Props
const props = defineProps({
  item: Object,
});

// 3. Emits
const emit = defineEmits(["update", "delete"]);

// 4. Refs & Reactive
const count = ref(0);

// 5. Computed
const double = computed(() => count.value * 2);

// 6. Methods
function increment() {
  count.value++;
}

// 7. Lifecycle
onMounted(() => {
  // ...
});
</script>

<template>
  <!-- Template -->
</template>

<style scoped>
/* Styles */
</style>
```

---

## ✨ Conclusion

Ce document compile tout le savoir acquis sur **Ember Anvil**. Il servira de référence pour :

1. **Onboarding** de nouveaux développeurs
2. **Maintenance** et évolution du projet
3. **Décisions techniques** futures
4. **Documentation** vivante du projet

N'hésite pas à enrichir ce document au fur et à mesure du développement ! 🔥

---

**Dernière mise à jour** : 30 janvier 2026  
**Auteur** : AI Senior Developer  
**Version** : 1.0.0
