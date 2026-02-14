import { describe, it, expect, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import WikiComponent from "../components/Wiki.vue";
import { useCodexStore } from "@/stores/codex";

describe("WikiComponent", () => {
  let wrapper;
  let codexStore;
  let pinia;

  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);

    codexStore = useCodexStore();
    codexStore.initialize();

    wrapper = mount(WikiComponent, {
      global: {
        plugins: [pinia],
        stubs: {
          BookOpen: true,
          Hammer: true,
          Search: true,
          Filter: true,
          Card: true,
        },
      },
    });
  });

  describe("Rendu initial", () => {
    it("devrait afficher le titre du codex", () => {
      expect(wrapper.text()).toContain("Codex");
    });

    it("devrait afficher le container principal", () => {
      expect(wrapper.find(".codex-page").exists()).toBe(true);
    });
  });

  describe("Onglets", () => {
    it("devrait avoir 'materials' comme onglet par défaut", () => {
      expect(wrapper.vm.selectedTab).toBe("materials");
    });

    it("devrait changer d'onglet vers recettes", async () => {
      codexStore.setTab("recipes");
      await wrapper.vm.$nextTick();

      expect(wrapper.vm.selectedTab).toBe("recipes");
    });
  });

  describe("Recherche", () => {
    it("devrait avoir une query de recherche vide par défaut", () => {
      expect(wrapper.vm.localSearchQuery).toBe("");
    });

    it("devrait mettre à jour la recherche locale", async () => {
      wrapper.vm.localSearchQuery = "fer";
      await wrapper.vm.$nextTick();

      expect(wrapper.vm.localSearchQuery).toBe("fer");
    });
  });

  describe("Données du store", () => {
    it("devrait mapper filteredMaterials depuis le store", () => {
      expect(Array.isArray(wrapper.vm.filteredMaterials)).toBe(true);
    });

    it("devrait mapper filteredRecipes depuis le store", () => {
      expect(Array.isArray(wrapper.vm.filteredRecipes)).toBe(true);
    });

    it("devrait mapper availableCategories depuis le store", () => {
      expect(Array.isArray(wrapper.vm.availableCategories)).toBe(true);
    });
  });
});
