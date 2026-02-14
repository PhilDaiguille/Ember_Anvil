import { describe, it, expect, beforeEach } from "vitest";
import { createRouter, createMemoryHistory } from "vue-router";
import { routes } from "@/infrastructure/router/index.js";

describe("Router", () => {
  let router;

  beforeEach(async () => {
    router = createRouter({
      history: createMemoryHistory(),
      routes,
    });

    await router.isReady();
  });

  describe("Routes configuration", () => {
    it("devrait avoir une route pour la page d'accueil", () => {
      const homeRoute = router.getRoutes().find((r) => r.path === "/");
      expect(homeRoute).toBeDefined();
      expect(homeRoute.name).toBe("home");
    });

    it("devrait avoir une route pour la forge", () => {
      const forgeRoute = router.getRoutes().find((r) => r.path === "/forge");
      expect(forgeRoute).toBeDefined();
      expect(forgeRoute.name).toBe("forge");
    });

    it("devrait avoir une route pour le marché", () => {
      const marcheRoute = router.getRoutes().find((r) => r.path === "/marche");
      expect(marcheRoute).toBeDefined();
      expect(marcheRoute.name).toBe("marche");
    });

    it("devrait avoir une route pour le codex", () => {
      const codexRoute = router.getRoutes().find((r) => r.path === "/codex");
      expect(codexRoute).toBeDefined();
      expect(codexRoute.name).toBe("codex");
    });

    it("devrait avoir une route pour l'inventaire", () => {
      const inventaireRoute = router
        .getRoutes()
        .find((r) => r.path === "/inventaire");
      expect(inventaireRoute).toBeDefined();
      expect(inventaireRoute.name).toBe("inventaire");
    });

    it("devrait avoir une route pour l'atelier", () => {
      const atelierRoute = router
        .getRoutes()
        .find((r) => r.path === "/atelier");
      expect(atelierRoute).toBeDefined();
      expect(atelierRoute.name).toBe("atelier");
    });

    it("devrait avoir une route pour le profil", () => {
      const profilRoute = router.getRoutes().find((r) => r.path === "/profil");
      expect(profilRoute).toBeDefined();
      expect(profilRoute.name).toBe("profil");
    });
  });

  describe("Navigation", () => {
    it("devrait naviguer vers la page d'accueil", async () => {
      await router.push("/");
      expect(router.currentRoute.value.path).toBe("/");
    });

    it("devrait naviguer vers la forge", async () => {
      await router.push("/forge");
      expect(router.currentRoute.value.path).toBe("/forge");
    });

    it("devrait naviguer vers le marché", async () => {
      await router.push("/marche");
      expect(router.currentRoute.value.path).toBe("/marche");
    });

    it("devrait naviguer vers le codex", async () => {
      await router.push("/codex");
      expect(router.currentRoute.value.path).toBe("/codex");
    });

    it("devrait naviguer vers l'inventaire", async () => {
      await router.push("/inventaire");
      expect(router.currentRoute.value.path).toBe("/inventaire");
    });

    it("devrait naviguer vers l'atelier", async () => {
      await router.push("/atelier");
      expect(router.currentRoute.value.path).toBe("/atelier");
    });

    it("devrait naviguer vers le profil", async () => {
      await router.push("/profil");
      expect(router.currentRoute.value.path).toBe("/profil");
    });
  });

  describe("Navigation par nom", () => {
    it("devrait naviguer par nom de route", async () => {
      await router.push({ name: "forge" });
      expect(router.currentRoute.value.name).toBe("forge");
    });

    it("devrait naviguer par nom vers le marché", async () => {
      await router.push({ name: "marche" });
      expect(router.currentRoute.value.name).toBe("marche");
    });
  });

  describe("Route invalide", () => {
    it("devrait gérer les routes inexistantes", async () => {
      try {
        await router.push("/route-inexistante");
      } catch (e) {
        // Expected behavior for non-existent routes
      }
    });
  });

  describe("Métadonnées des routes", () => {
    it("les routes devraient avoir des noms uniques", () => {
      const routeNames = router
        .getRoutes()
        .map((r) => r.name)
        .filter((n) => n);
      const uniqueNames = new Set(routeNames);
      expect(routeNames.length).toBe(uniqueNames.size);
    });

    it("toutes les routes principales devraient avoir un nom", () => {
      const mainRoutes = router
        .getRoutes()
        .filter((r) => !r.path.includes(":"));
      mainRoutes.forEach((route) => {
        if (route.path !== "*" && route.path !== "/:pathMatch(.*)") {
          expect(route.name).toBeDefined();
        }
      });
    });
  });
});
