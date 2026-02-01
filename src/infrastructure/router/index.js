import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/shared/layout/HomeView.vue";
import CraftingView from "@/domains/crafting/views/CraftingView.vue";
import ShopView from "@/domains/shop/views/ShopView.vue";
import WikiView from "@/domains/wiki/views/WikiView.vue";
import InventoryView from "@/domains/inventory/views/InventoryView.vue";
import WorkshopView from "@/domains/workshop/views/WorkshopView.vue";
import ProfileView from "@/domains/player/views/ProfileView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
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
      name: "crafting",
      component: CraftingView,
      meta: {
        title: "Forge - Créer vos objets | Ember Anvil",
        description:
          "Forgez des objets uniques en combinant différents matériaux",
      },
    },
    {
      path: "/marche",
      name: "shop",
      component: ShopView,
      meta: {
        title: "Marché - Acheter des matériaux | Ember Anvil",
        description: "Achetez des matériaux rares pour vos créations",
      },
    },
    {
      path: "/codex",
      name: "wiki",
      component: WikiView,
      meta: {
        title: "Codex - Encyclopédie de la forge | Ember Anvil",
        description: "Découvrez tous les matériaux et recettes disponibles",
      },
    },
    {
      path: "/inventaire",
      name: "inventory",
      component: InventoryView,
      meta: {
        title: "Inventaire - Vos objets | Ember Anvil",
        description: "Gérez votre inventaire d'objets forgés",
      },
    },
    {
      path: "/atelier",
      name: "workshop",
      component: WorkshopView,
      meta: {
        title: "Atelier - Votre espace de travail | Ember Anvil",
        description: "Personnalisez votre atelier de forgeron",
      },
    },
    {
      path: "/profil",
      name: "profile",
      component: ProfileView,
      meta: {
        title: "Profil - Votre forgeron | Ember Anvil",
        description: "Consultez votre profil et vos statistiques",
      },
    },
  ],
});

// Gestion des meta tags pour le SEO
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
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
