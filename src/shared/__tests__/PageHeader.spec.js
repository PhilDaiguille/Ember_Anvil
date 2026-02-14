import { describe, it, expect, beforeEach, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { createRouter, createWebHistory } from "vue-router";
import PageHeader from "../../layout/PageHeader.vue";

describe("PageHeader", () => {
  let wrapper;
  let router;

  beforeEach(async () => {
    // Créer un router minimal pour les tests
    router = createRouter({
      history: createWebHistory(),
      routes: [
        { path: "/", name: "home", component: { template: "<div>Home</div>" } },
        {
          path: "/forge",
          name: "forge",
          component: { template: "<div>Forge</div>" },
        },
        {
          path: "/marche",
          name: "marche",
          component: { template: "<div>Marché</div>" },
        },
        {
          path: "/codex",
          name: "codex",
          component: { template: "<div>Codex</div>" },
        },
        {
          path: "/inventaire",
          name: "inventaire",
          component: { template: "<div>Inventaire</div>" },
        },
        {
          path: "/atelier",
          name: "atelier",
          component: { template: "<div>Atelier</div>" },
        },
        {
          path: "/profil",
          name: "profil",
          component: { template: "<div>Profil</div>" },
        },
      ],
    });

    router.push("/");
    await router.isReady();

    wrapper = mount(PageHeader, {
      global: {
        plugins: [router],
        stubs: {
          RouterLink: false,
          Flame: true,
          Menu: true,
          X: true,
        },
      },
    });
  });

  describe("Rendu initial", () => {
    it("devrait afficher le logo/titre", () => {
      expect(wrapper.text()).toContain("EmberAnvil");
    });

    it("devrait afficher le menu de navigation", () => {
      const nav = wrapper.find("nav");
      expect(nav.exists()).toBe(true);
    });

    it("devrait afficher les liens de navigation", () => {
      const links = wrapper.findAll("a");
      expect(links.length).toBeGreaterThan(0);
    });
  });

  describe("Navigation", () => {
    it("devrait contenir un lien vers la forge", () => {
      expect(wrapper.html()).toContain("forge");
    });

    it("devrait contenir un lien vers le marché", () => {
      expect(wrapper.html()).toContain("marche");
    });

    it("devrait contenir un lien vers le codex", () => {
      expect(wrapper.html()).toContain("codex");
    });

    it("devrait contenir un lien vers l'inventaire", () => {
      expect(wrapper.html()).toContain("inventaire");
    });

    it("devrait contenir un lien vers l'atelier", () => {
      expect(wrapper.html()).toContain("atelier");
    });

    it("devrait contenir un lien vers le profil", () => {
      expect(wrapper.html()).toContain("profil");
    });
  });

  describe("Responsive", () => {
    it("devrait avoir une classe header", () => {
      expect(wrapper.classes()).toContain("header");
    });
  });
});
