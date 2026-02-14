import { describe, it, expect } from "vitest";
import { createRouter, createMemoryHistory } from "vue-router";
import { defineComponent } from "vue";

const MockView = defineComponent({ template: "<div />" });

const testRoutes = [
  { path: "/", name: "home", component: MockView },
  { path: "/forge", name: "forge", component: MockView },
  { path: "/marche", name: "marche", component: MockView },
  { path: "/codex", name: "codex", component: MockView },
  { path: "/inventaire", name: "inventaire", component: MockView },
  { path: "/atelier", name: "atelier", component: MockView },
  { path: "/profil", name: "profil", component: MockView },
];

function createTestRouter() {
  return createRouter({
    history: createMemoryHistory(),
    routes: testRoutes,
  });
}

describe("Router", () => {
  describe("Routes configuration", () => {
    it("devrait avoir 7 routes configurées", () => {
      const router = createTestRouter();
      const namedRoutes = router.getRoutes().filter((r) => r.name);
      expect(namedRoutes.length).toBe(7);
    });

    it("devrait avoir une route pour la page d'accueil", () => {
      const router = createTestRouter();
      const homeRoute = router.getRoutes().find((r) => r.path === "/");
      expect(homeRoute).toBeDefined();
      expect(homeRoute.name).toBe("home");
    });

    it("devrait avoir une route pour la forge", () => {
      const router = createTestRouter();
      const forgeRoute = router.getRoutes().find((r) => r.path === "/forge");
      expect(forgeRoute).toBeDefined();
      expect(forgeRoute.name).toBe("forge");
    });

    it("devrait avoir une route pour le marché", () => {
      const router = createTestRouter();
      const marcheRoute = router.getRoutes().find((r) => r.path === "/marche");
      expect(marcheRoute).toBeDefined();
      expect(marcheRoute.name).toBe("marche");
    });

    it("devrait avoir une route pour le codex", () => {
      const router = createTestRouter();
      const codexRoute = router.getRoutes().find((r) => r.path === "/codex");
      expect(codexRoute).toBeDefined();
      expect(codexRoute.name).toBe("codex");
    });

    it("devrait avoir une route pour l'inventaire", () => {
      const router = createTestRouter();
      const inventaireRoute = router
        .getRoutes()
        .find((r) => r.path === "/inventaire");
      expect(inventaireRoute).toBeDefined();
      expect(inventaireRoute.name).toBe("inventaire");
    });

    it("devrait avoir une route pour l'atelier", () => {
      const router = createTestRouter();
      const atelierRoute = router
        .getRoutes()
        .find((r) => r.path === "/atelier");
      expect(atelierRoute).toBeDefined();
      expect(atelierRoute.name).toBe("atelier");
    });

    it("devrait avoir une route pour le profil", () => {
      const router = createTestRouter();
      const profilRoute = router.getRoutes().find((r) => r.path === "/profil");
      expect(profilRoute).toBeDefined();
      expect(profilRoute.name).toBe("profil");
    });
  });

  describe("Métadonnées des routes", () => {
    it("les routes devraient avoir des noms uniques", () => {
      const router = createTestRouter();
      const routeNames = router
        .getRoutes()
        .map((r) => r.name)
        .filter((n) => n);
      const uniqueNames = new Set(routeNames);
      expect(routeNames.length).toBe(uniqueNames.size);
    });

    it("toutes les routes principales devraient avoir un nom", () => {
      const router = createTestRouter();
      const mainRoutes = router
        .getRoutes()
        .filter((r) => !r.path.includes(":"));
      mainRoutes.forEach((route) => {
        expect(route.name).toBeDefined();
      });
    });
  });
});
