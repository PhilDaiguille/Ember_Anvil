import { describe, it, expect, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import { createRouter, createMemoryHistory } from "vue-router";
import PageHeader from "../layout/PageHeader.vue";

const mockRoutes = [
  { path: "/", name: "home", component: { template: "<div />" } },
  { path: "/forge", name: "forge", component: { template: "<div />" } },
  { path: "/marche", name: "marche", component: { template: "<div />" } },
  { path: "/codex", name: "codex", component: { template: "<div />" } },
  {
    path: "/inventaire",
    name: "inventaire",
    component: { template: "<div />" },
  },
  { path: "/atelier", name: "atelier", component: { template: "<div />" } },
  { path: "/profil", name: "profil", component: { template: "<div />" } },
];

describe("PageHeader", () => {
  let wrapper;
  let router;
  let pinia;

  beforeEach(async () => {
    pinia = createPinia();
    setActivePinia(pinia);

    router = createRouter({
      history: createMemoryHistory(),
      routes: mockRoutes,
    });

    await router.push("/");
    await router.isReady();

    wrapper = mount(PageHeader, {
      global: {
        plugins: [pinia, router],
        stubs: {
          Flame: true,
          Menu: true,
          X: true,
          Coins: true,
          Gem: true,
          TrendingUp: true,
        },
      },
    });
  });

  describe("Rendu initial", () => {
    it("devrait afficher le header", () => {
      expect(wrapper.find("header").exists()).toBe(true);
    });

    it("devrait afficher le logo/titre", () => {
      expect(wrapper.text()).toContain("Ember");
    });

    it("devrait afficher le menu de navigation", () => {
      const nav = wrapper.find("nav");
      expect(nav.exists()).toBe(true);
    });
  });

  describe("Navigation", () => {
    it("devrait contenir des liens de navigation", () => {
      const links = wrapper.findAll("a");
      expect(links.length).toBeGreaterThan(0);
    });

    it("devrait contenir un lien vers la forge", () => {
      expect(wrapper.html()).toContain("/forge");
    });

    it("devrait contenir un lien vers le marché", () => {
      expect(wrapper.html()).toContain("/marche");
    });
  });

  describe("Responsive", () => {
    it("devrait avoir une balise header", () => {
      expect(wrapper.element.tagName).toBe("HEADER");
    });
  });
});
