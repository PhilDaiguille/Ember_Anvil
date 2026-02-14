import { describe, it, expect, beforeEach, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import ShopCard from "@/domains/shop/components/ShopCard.vue";
import { useInventoryStore } from "@/stores/inventory";

describe("ShopCard.vue", () => {
  let pinia;
  let inventoryStore;

  const mockMaterial = {
    id: "fer",
    nom: "Fer",
    type: "metal",
    rarity: "common",
    tier: 1,
    prixAchat: 10,
    prixVente: 5,
  };

  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);
    inventoryStore = useInventoryStore();
  });

  describe("Props", () => {
    it("should render with required material prop", () => {
      const wrapper = mount(ShopCard, {
        props: { material: mockMaterial },
        global: { plugins: [pinia] },
      });

      expect(wrapper.find(".material-name").text()).toBe("Fer");
    });

    it("should display material name correctly", () => {
      const wrapper = mount(ShopCard, {
        props: { material: mockMaterial },
        global: { plugins: [pinia] },
      });

      expect(wrapper.find(".material-name").text()).toBe(mockMaterial.nom);
    });

    it("should display buy and sell prices", () => {
      const wrapper = mount(ShopCard, {
        props: { material: mockMaterial },
        global: { plugins: [pinia] },
      });

      const prices = wrapper.findAll(".price-value");
      expect(prices[0].text()).toBe("10");
      expect(prices[1].text()).toBe("5");
    });

    it("should display tier information", () => {
      const wrapper = mount(ShopCard, {
        props: { material: mockMaterial },
        global: { plugins: [pinia] },
      });

      expect(wrapper.find(".material-type").text()).toContain("Tier 1");
    });
  });

  describe("Computed - Rarity Label", () => {
    it("should display 'Commun' for common rarity", () => {
      const wrapper = mount(ShopCard, {
        props: { material: { ...mockMaterial, rarity: "common" } },
        global: { plugins: [pinia] },
      });

      expect(wrapper.find(".rarity-text").text()).toBe("Commun");
    });

    it("should display 'Rare' for rare rarity", () => {
      const wrapper = mount(ShopCard, {
        props: { material: { ...mockMaterial, rarity: "rare" } },
        global: { plugins: [pinia] },
      });

      expect(wrapper.find(".rarity-text").text()).toBe("Rare");
    });

    it("should display 'Légendaire' for legendary rarity", () => {
      const wrapper = mount(ShopCard, {
        props: { material: { ...mockMaterial, rarity: "legendary" } },
        global: { plugins: [pinia] },
      });

      expect(wrapper.find(".rarity-text").text()).toBe("Légendaire");
    });

    it("should apply correct rarity CSS class", () => {
      const wrapper = mount(ShopCard, {
        props: { material: { ...mockMaterial, rarity: "epic" } },
        global: { plugins: [pinia] },
      });

      expect(wrapper.find(".rarity-badge").classes()).toContain("rarity-epic");
    });
  });

  describe("Computed - Type Label", () => {
    it("should display 'Métal' for metal type", () => {
      const wrapper = mount(ShopCard, {
        props: { material: { ...mockMaterial, type: "metal" } },
        global: { plugins: [pinia] },
      });

      expect(wrapper.find(".material-type").text()).toContain("Métal");
    });

    it("should display 'Bois' for bois type", () => {
      const wrapper = mount(ShopCard, {
        props: { material: { ...mockMaterial, type: "bois" } },
        global: { plugins: [pinia] },
      });

      expect(wrapper.find(".material-type").text()).toContain("Bois");
    });

    it("should display 'Gemme' for gemme type", () => {
      const wrapper = mount(ShopCard, {
        props: { material: { ...mockMaterial, type: "gemme" } },
        global: { plugins: [pinia] },
      });

      expect(wrapper.find(".material-type").text()).toContain("Gemme");
    });
  });

  describe("Inventory Integration", () => {
    it("should show 'Disponible' when quantity is 0", () => {
      inventoryStore.materials = {}; // No materials in inventory

      const wrapper = mount(ShopCard, {
        props: { material: mockMaterial },
        global: { plugins: [pinia] },
      });

      expect(wrapper.find(".stock-text").text()).toBe("Disponible");
    });

    it("should show quantity when material is in inventory", () => {
      inventoryStore.materials = { fer: 5 };

      const wrapper = mount(ShopCard, {
        props: { material: mockMaterial },
        global: { plugins: [pinia] },
      });

      expect(wrapper.find(".stock-text").text()).toBe("Vous possédez: 5");
    });

    it("should disable sell button when quantity is 0", () => {
      inventoryStore.materials = {}; // No materials

      const wrapper = mount(ShopCard, {
        props: { material: mockMaterial },
        global: { plugins: [pinia] },
      });

      const sellBtn = wrapper.findAll(".action-btn")[1];
      expect(sellBtn.attributes("disabled")).toBeDefined();
    });

    it("should enable sell button when quantity is > 0", async () => {
      inventoryStore.materials = { fer: 3 };

      const wrapper = mount(ShopCard, {
        props: { material: mockMaterial },
        global: { plugins: [pinia] },
      });

      await wrapper.vm.$nextTick();
      const sellBtn = wrapper.findAll(".action-btn")[1];
      expect(sellBtn.attributes("disabled")).toBeUndefined();
    });
  });

  describe("Events", () => {
    it("should emit 'acheter' event with material when buy button clicked", async () => {
      const wrapper = mount(ShopCard, {
        props: { material: mockMaterial },
        global: { plugins: [pinia] },
      });

      const buyBtn = wrapper.findAll(".action-btn")[0];
      await buyBtn.trigger("click");

      expect(wrapper.emitted()).toHaveProperty("acheter");
      expect(wrapper.emitted("acheter")[0]).toEqual([mockMaterial]);
    });

    it("should emit 'vendre' event with material when sell button clicked", async () => {
      inventoryStore.materials = { fer: 5 }; // Ensure button is enabled

      const wrapper = mount(ShopCard, {
        props: { material: mockMaterial },
        global: { plugins: [pinia] },
      });

      await wrapper.vm.$nextTick();
      const sellBtn = wrapper.findAll(".action-btn")[1];
      await sellBtn.trigger("click");

      expect(wrapper.emitted()).toHaveProperty("vendre");
      expect(wrapper.emitted("vendre")[0]).toEqual([mockMaterial]);
    });
  });

  describe("Accessibility", () => {
    it("should use semantic HTML article element", () => {
      const wrapper = mount(ShopCard, {
        props: { material: mockMaterial },
        global: { plugins: [pinia] },
      });

      expect(wrapper.find("article").exists()).toBe(true);
    });

    it("should have data-material attribute for identification", () => {
      const wrapper = mount(ShopCard, {
        props: { material: mockMaterial },
        global: { plugins: [pinia] },
      });

      expect(wrapper.find("article").attributes("data-material")).toBe("fer");
    });
  });
});
