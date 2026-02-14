import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/shared/layout/HomeView.vue";

const CraftingView = () => import("@/domains/crafting/views/CraftingView.vue");
const ShopView = () => import("@/domains/shop/views/ShopView.vue");
const WikiView = () => import("@/domains/wiki/views/WikiView.vue");
const InventoryView = () =>
  import("@/domains/inventory/views/InventoryView.vue");
const WorkshopView = () => import("@/domains/workshop/views/WorkshopView.vue");
const ProfileView = () => import("@/domains/player/views/ProfileView.vue");

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
router.beforeEach((to, from, next) => {
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

  next();
});

export default router;
