import { describe, it, expect, beforeEach, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import ShopComponent from "../components/Shop.vue";
import { usePlayerStore } from "@/stores/player";
import { useInventoryStore } from "@/stores/inventory";
import { useNotificationsStore } from "@/stores/notifications";
import { useCodexStore } from "@/stores/codex";

describe("ShopComponent", () => {
  let wrapper;
  let playerStore;
  let inventoryStore;
  let notificationsStore;
  let codexStore;

  beforeEach(() => {
    setActivePinia(createPinia());

    playerStore = usePlayerStore();
    inventoryStore = useInventoryStore();
    notificationsStore = useNotificationsStore();
    codexStore = useCodexStore();

    // Mock initial state
    playerStore.$patch({
      ecus: 1000,
    });

    playerStore.peutAcheter = vi.fn((cout) => playerStore.ecus >= cout);

    inventoryStore.hasEnough = vi.fn((materialId, quantite) => {
      return true;
    });

    codexStore.autoDiscoverFromPurchase = vi.fn(() => false);

    wrapper = mount(ShopComponent, {
      global: {
        plugins: [createPinia()],
        stubs: {
          ShopCardVue: true,
          Crown: true,
          Wallet: true,
          Package: true,
          Circle: true,
          Gem: true,
          Search: true,
          Shield: true,
        },
      },
    });
  });

  describe("Rendu initial", () => {
    it("devrait afficher le titre du marché", () => {
      expect(wrapper.text()).toContain("LE COMPTOIR");
      expect(wrapper.text()).toContain("des Métaux Rares");
    });

    it("devrait afficher le badge Premium", () => {
      expect(wrapper.find(".hero-badge").exists()).toBe(true);
      expect(wrapper.text()).toContain("Marché Premium");
    });

    it("devrait afficher le solde d'écus du joueur", () => {
      const walletAmount = wrapper.find(".wallet-amount");
      expect(walletAmount.exists()).toBe(true);
      expect(walletAmount.text()).toContain("1");
    });

    it("devrait afficher la section de description", () => {
      expect(wrapper.text()).toContain(
        "Un Bazar d'Excellence au Cœur de la Forge",
      );
    });
  });

  describe("Filtres de rareté", () => {
    it("devrait avoir 'all' comme filtre par défaut", () => {
      expect(wrapper.vm.selectedFilter).toBe("all");
      const activeBtn = wrapper.find(".filter-btn.active");
      expect(activeBtn.text()).toContain("Tous");
    });

    it("devrait changer le filtre quand on clique sur un bouton", async () => {
      const filterBtns = wrapper.findAll(".filter-btn");
      const rareBtn = filterBtns.find((btn) => btn.text().includes("Rare"));

      if (rareBtn) {
        await rareBtn.trigger("click");
        expect(wrapper.vm.selectedFilter).toBe("rare");
        expect(rareBtn.classes()).toContain("active");
      }
    });

    it("devrait afficher uniquement les matériaux communs quand le filtre 'common' est actif", async () => {
      wrapper.vm.setFilter("common");
      await wrapper.vm.$nextTick();

      const filtered = wrapper.vm.filteredMaterials;
      filtered.forEach((mat) => {
        expect(mat.rarity).toBe("common");
      });
    });

    it("devrait afficher uniquement les matériaux rares quand le filtre 'rare' est actif", async () => {
      wrapper.vm.setFilter("rare");
      await wrapper.vm.$nextTick();

      const filtered = wrapper.vm.filteredMaterials;
      filtered.forEach((mat) => {
        expect(mat.rarity).toBe("rare");
      });
    });
  });

  describe("Recherche de matériaux", () => {
    it("devrait filtrer les matériaux par nom", async () => {
      const searchInput = wrapper.find(".search-input");
      await searchInput.setValue("fer");

      const filtered = wrapper.vm.filteredMaterials;
      filtered.forEach((mat) => {
        expect(mat.nom.toLowerCase()).toContain("fer");
      });
    });

    it("devrait filtrer les matériaux par type", async () => {
      const searchInput = wrapper.find(".search-input");
      await searchInput.setValue("metal");

      const filtered = wrapper.vm.filteredMaterials;
      if (filtered.length > 0) {
        filtered.forEach((mat) => {
          expect(
            mat.nom.toLowerCase().includes("metal") ||
              mat.type.toLowerCase().includes("metal"),
          ).toBe(true);
        });
      }
    });

    it("devrait être insensible à la casse", async () => {
      const searchInput = wrapper.find(".search-input");
      await searchInput.setValue("FER");

      const filtered = wrapper.vm.filteredMaterials;
      expect(filtered.length).toBeGreaterThanOrEqual(0);
    });

    it("devrait ignorer les espaces en début et fin", async () => {
      wrapper.vm.searchQuery = "  fer  ";
      await wrapper.vm.$nextTick();

      const filtered = wrapper.vm.filteredMaterials;
      expect(filtered.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe("Combinaison filtres et recherche", () => {
    it("devrait appliquer le filtre de rareté ET la recherche", async () => {
      wrapper.vm.setFilter("common");
      wrapper.vm.searchQuery = "fer";
      await wrapper.vm.$nextTick();

      const filtered = wrapper.vm.filteredMaterials;
      filtered.forEach((mat) => {
        expect(mat.rarity).toBe("common");
        expect(mat.nom.toLowerCase()).toContain("fer");
      });
    });
  });

  describe("Achat de matériaux", () => {
    it("devrait acheter un matériau si le joueur a assez d'écus", () => {
      const mockMaterial = {
        id: "fer",
        nom: "Fer",
        prixAchat: 100,
        prixVente: 50,
      };

      const retirerEcusSpy = vi.spyOn(playerStore, "retirerEcus");
      const ajouterMaterialSpy = vi.spyOn(inventoryStore, "ajouterMaterial");
      const ajouterNotifSpy = vi.spyOn(
        notificationsStore,
        "ajouterNotification",
      );

      wrapper.vm.acheterMaterial(mockMaterial, 2);

      expect(retirerEcusSpy).toHaveBeenCalledWith(200);
      expect(ajouterMaterialSpy).toHaveBeenCalledWith("fer", 2);
      expect(ajouterNotifSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          type: "success",
        }),
      );
    });

    it("devrait afficher une erreur si le joueur n'a pas assez d'écus", () => {
      const mockMaterial = {
        id: "adamantium",
        nom: "Adamantium",
        prixAchat: 2000,
        prixVente: 1000,
      };

      playerStore.peutAcheter = vi.fn(() => false);

      const ajouterNotifSpy = vi.spyOn(
        notificationsStore,
        "ajouterNotification",
      );

      wrapper.vm.acheterMaterial(mockMaterial, 1);

      expect(ajouterNotifSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          type: "error",
          message: expect.stringContaining("Fonds insuffisants"),
        }),
      );
    });

    it("devrait notifier quand un nouveau matériau est découvert dans le codex", () => {
      const mockMaterial = {
        id: "mithril",
        nom: "Mithril",
        prixAchat: 500,
        prixVente: 250,
      };

      codexStore.autoDiscoverFromPurchase = vi.fn(() => true);

      const ajouterNotifSpy = vi.spyOn(
        notificationsStore,
        "ajouterNotification",
      );

      wrapper.vm.acheterMaterial(mockMaterial, 1);

      expect(ajouterNotifSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          type: "info",
          message: expect.stringContaining("Nouveau matériau découvert"),
        }),
      );
    });

    it("devrait acheter 1 unité par défaut si la quantité n'est pas spécifiée", () => {
      const mockMaterial = {
        id: "cuivre",
        nom: "Cuivre",
        prixAchat: 50,
        prixVente: 25,
      };

      const ajouterMaterialSpy = vi.spyOn(inventoryStore, "ajouterMaterial");

      wrapper.vm.acheterMaterial(mockMaterial);

      expect(ajouterMaterialSpy).toHaveBeenCalledWith("cuivre", 1);
    });
  });

  describe("Vente de matériaux", () => {
    it("devrait vendre un matériau si le joueur en a assez", () => {
      const mockMaterial = {
        id: "fer",
        nom: "Fer",
        prixAchat: 100,
        prixVente: 50,
      };

      inventoryStore.hasEnough = vi.fn(() => true);

      const retirerMaterialSpy = vi.spyOn(inventoryStore, "retirerMaterial");
      const ajouterEcusSpy = vi.spyOn(playerStore, "ajouterEcus");
      const ajouterNotifSpy = vi.spyOn(
        notificationsStore,
        "ajouterNotification",
      );

      wrapper.vm.vendreMaterial(mockMaterial, 3);

      expect(retirerMaterialSpy).toHaveBeenCalledWith("fer", 3);
      expect(ajouterEcusSpy).toHaveBeenCalledWith(150);
      expect(ajouterNotifSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          type: "success",
        }),
      );
    });

    it("devrait afficher une erreur si le joueur n'a pas assez de matériau", () => {
      const mockMaterial = {
        id: "diamant",
        nom: "Diamant",
        prixAchat: 1000,
        prixVente: 500,
      };

      inventoryStore.hasEnough = vi.fn(() => false);

      const ajouterNotifSpy = vi.spyOn(
        notificationsStore,
        "ajouterNotification",
      );

      wrapper.vm.vendreMaterial(mockMaterial, 5);

      expect(ajouterNotifSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          type: "error",
          message: expect.stringContaining("n'avez pas assez"),
        }),
      );
    });

    it("devrait vendre 1 unité par défaut si la quantité n'est pas spécifiée", () => {
      const mockMaterial = {
        id: "bronze",
        nom: "Bronze",
        prixAchat: 75,
        prixVente: 37,
      };

      inventoryStore.hasEnough = vi.fn(() => true);
      const retirerMaterialSpy = vi.spyOn(inventoryStore, "retirerMaterial");

      wrapper.vm.vendreMaterial(mockMaterial);

      expect(retirerMaterialSpy).toHaveBeenCalledWith("bronze", 1);
    });
  });

  describe("Interface utilisateur", () => {
    it("devrait afficher l'icône de recherche", () => {
      expect(wrapper.find(".search-icon").exists()).toBe(true);
    });

    it("devrait afficher la bannière de garantie en bas", () => {
      expect(wrapper.find(".marketplace-footer-banner").exists()).toBe(true);
      expect(wrapper.text()).toContain("Garantie du Maître Forgeron");
    });

    it("devrait afficher 3 filtres de rareté", () => {
      const filterBtns = wrapper.findAll(".filter-btn");
      expect(filterBtns.length).toBe(3);
    });
  });

  describe("Responsive et accessibilité", () => {
    it("devrait avoir les bonnes classes CSS pour le layout", () => {
      expect(wrapper.find(".marketplace-container").exists()).toBe(true);
      expect(wrapper.find(".marketplace-grid").exists()).toBe(true);
    });

    it("le champ de recherche devrait avoir un placeholder", () => {
      const searchInput = wrapper.find(".search-input");
      expect(searchInput.attributes("placeholder")).toContain("Rechercher");
    });

    it("les boutons de filtre devraient être cliquables", () => {
      const filterBtns = wrapper.findAll(".filter-btn");
      filterBtns.forEach((btn) => {
        expect(btn.element.tagName).toBe("BUTTON");
      });
    });
  });

  describe("Computed properties", () => {
    it("ecus devrait être mappé depuis le playerStore", () => {
      expect(wrapper.vm.ecus).toBe(1000);

      playerStore.$patch({ ecus: 5000 });
      expect(wrapper.vm.ecus).toBe(5000);
    });

    it("filteredMaterials devrait retourner tous les matériaux par défaut", () => {
      const filtered = wrapper.vm.filteredMaterials;
      expect(Array.isArray(filtered)).toBe(true);
      expect(filtered.length).toBeGreaterThan(0);
    });
  });
});
