import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/shared/layout/HomeView.vue";

const CraftingView = () => import("@/domains/crafting/views/CraftingView.vue");
const ShopView = () => import("@/domains/shop/views/ShopView.vue");
const WikiView = () => import("@/domains/wiki/views/WikiView.vue");
const InventoryView = () =>
  import("@/domains/inventory/views/InventoryView.vue");
const WorkshopView = () => import("@/domains/workshop/views/WorkshopView.vue");
const ProfileView = () => import("@/domains/player/views/ProfileView.vue");
const ChangelogView = () => import("@/domains/blog/views/ChangelogView.vue");
const GuideDebutantView = () =>
  import("@/domains/blog/views/GuideDebutantView.vue");
const GlossaireView = () => import("@/domains/blog/views/GlossaireView.vue");
const ComparatifView = () => import("@/domains/blog/views/ComparatifView.vue");

export const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
    meta: {
      title: "Ember Anvil - Forge Virtuelle",
      description:
        "Bienvenue dans Ember Anvil, votre forge virtuelle pour créer des objets légendaires",
    },
  },
  {
    path: "/forge",
    name: "forge",
    component: CraftingView,
    meta: {
      title: "Forge - Créer vos objets | Ember Anvil",
      description:
        "Forgez des objets uniques en combinant différents matériaux",
    },
  },
  {
    path: "/marche",
    name: "marche",
    component: ShopView,
    meta: {
      title: "Marché - Acheter des matériaux | Ember Anvil",
      description: "Achetez des matériaux rares pour vos créations",
    },
  },
  {
    path: "/codex",
    name: "codex",
    component: WikiView,
    meta: {
      title: "Codex - Encyclopédie de la forge | Ember Anvil",
      description: "Découvrez tous les matériaux et recettes disponibles",
    },
  },
  {
    path: "/inventaire",
    name: "inventaire",
    component: InventoryView,
    meta: {
      title: "Inventaire - Vos objets | Ember Anvil",
      description: "Gérez votre inventaire d'objets forgés",
    },
  },
  {
    path: "/atelier",
    name: "atelier",
    component: WorkshopView,
    meta: {
      title: "Atelier - Votre espace de travail | Ember Anvil",
      description: "Personnalisez votre atelier de forgeron",
    },
  },
  {
    path: "/profil",
    name: "profil",
    component: ProfileView,
    meta: {
      title: "Profil - Votre forgeron | Ember Anvil",
      description: "Consultez votre profil et vos statistiques",
    },
  },
  {
    path: "/changelog",
    name: "changelog",
    component: ChangelogView,
    meta: {
      title: "Changelog - Historique des mises à jour | Ember Anvil",
      description:
        "Découvrez toutes les nouveautés et mises à jour d'Ember Anvil : nouvelles recettes, fonctionnalités, corrections et améliorations.",
    },
  },
  {
    path: "/guides/debuter-dans-la-forge",
    name: "guide-debutant",
    component: GuideDebutantView,
    meta: {
      title:
        "Comment débuter dans la forge virtuelle : guide complet | Ember Anvil",
      description:
        "Guide complet pour débutants : premiers pas dans Ember Anvil, comprendre les matériaux, forger vos premiers objets et progresser rapidement.",
    },
  },
  {
    path: "/guides/glossaire-forge",
    name: "glossaire",
    component: GlossaireView,
    meta: {
      title: "Glossaire de la forge et de l'artisanat virtuel | Ember Anvil",
      description:
        "Glossaire complet des termes de la forge virtuelle : alliage, rareté, trempe, codex et plus de 20 définitions pour maîtriser Ember Anvil.",
    },
  },
  {
    path: "/guides/meilleurs-jeux-de-forge",
    name: "comparatif",
    component: ComparatifView,
    meta: {
      title:
        "Meilleurs jeux de forge en ligne 2026 : comparatif complet | Ember Anvil",
      description:
        "Comparatif des meilleurs jeux de forge : Ember Anvil, Minecraft, Valheim, Little Alchemy 2, Stardew Valley. Quel jeu choisir en 2026 ?",
    },
  },
  // Route 404 - Redirection vers la page d'accueil
  {
    path: "/:pathMatch(.*)*",
    redirect: "/",
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // Comportement de scroll pour une meilleure UX
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0, behavior: "smooth" };
    }
  },
  routes,
});

// Gestion des meta tags pour le SEO
router.beforeEach((to) => {
  // Update document title
  if (to.meta.title) {
    document.title = to.meta.title;
  }

  // Update meta description
  if (to.meta.description) {
    let descriptionTag = document.querySelector('meta[name="description"]');
    if (!descriptionTag) {
      descriptionTag = document.createElement("meta");
      descriptionTag.setAttribute("name", "description");
      document.head.appendChild(descriptionTag);
    }
    descriptionTag.setAttribute("content", to.meta.description);
  }
});

export default router;
