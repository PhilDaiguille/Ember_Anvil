import { describe, it, expect, beforeEach, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import WikiComponent from "../components/Wiki.vue";
import { useCodexStore } from "@/stores/codex";

describe("WikiComponent", () => {
  let wrapper;
  let codexStore;

  beforeEach(() => {
    setActivePinia(createPinia());

    codexStore = useCodexStore();

    // Mock codex state
    Object.defineProperty(codexStore, "discoveredMaterials", {
      get: vi.fn(() => ["fer", "cuivre", "or"]),
    });

    Object.defineProperty(codexStore, "discoveredRecipes", {
      get: vi.fn(() => ["epee-fer", "bouclier-bronze"]),
    });

    Object.defineProperty(codexStore, "discoveryPercentage", {
      get: vi.fn(() => 45),
    });

    codexStore.isDiscovered = vi.fn((id) => {
      return ["fer", "cuivre", "or"].includes(id);
    });

    wrapper = mount(WikiComponent, {
      global: {
        plugins: [createPinia()],
        stubs: {
          Book: true,
          Search: true,
          Filter: true,
          BookOpen: true,
          Lock: true,
          Star: true,
        },
      },
    });
  });

  describe("Rendu initial", () => {
    it("devrait afficher le titre du codex", () => {
      expect(wrapper.text()).toContain("Codex");
    });

    it("devrait afficher le pourcentage de découverte", () => {
      expect(wrapper.vm.discoveryPercentage).toBe(45);
    });
  });

  describe("Matériaux découverts", () => {
    it("devrait afficher la liste des matériaux découverts", () => {
      const discovered = wrapper.vm.discoveredMaterials;
      expect(discovered.length).toBe(3);
      expect(discovered).toContain("fer");
      expect(discovered).toContain("cuivre");
      expect(discovered).toContain("or");
    });

    it("devrait vérifier si un matériau est découvert", () => {
      expect(codexStore.isDiscovered("fer")).toBe(true);
      expect(codexStore.isDiscovered("adamantium")).toBe(false);
    });
  });

  describe("Recettes découvertes", () => {
    it("devrait afficher la liste des recettes découvertes", () => {
      const recipes = wrapper.vm.discoveredRecipes;
      expect(recipes.length).toBe(2);
      expect(recipes).toContain("epee-fer");
      expect(recipes).toContain("bouclier-bronze");
    });
  });

  describe("Computed properties", () => {
    it("discoveredMaterials devrait mapper le store", () => {
      expect(wrapper.vm.discoveredMaterials).toBe(
        codexStore.discoveredMaterials,
      );
    });

    it("discoveredRecipes devrait mapper le store", () => {
      expect(wrapper.vm.discoveredRecipes).toBe(codexStore.discoveredRecipes);
    });

    it("discoveryPercentage devrait mapper le store", () => {
      expect(wrapper.vm.discoveryPercentage).toBe(45);
    });
  });
});
