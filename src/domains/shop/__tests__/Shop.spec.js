import { describe, it, expect, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import ShopComponent from "../components/Shop.vue";
import { usePlayerStore } from "@/stores/player";
import { useInventoryStore } from "@/stores/inventory";
import { useNotificationsStore } from "@/stores/notifications";

describe("ShopComponent", () => {
  let wrapper;
  let playerStore;
  let inventoryStore;
  let notificationsStore;

  beforeEach(() => {
    const pinia = createPinia();
    setActivePinia(pinia);

    playerStore = usePlayerStore();
    inventoryStore = useInventoryStore();
    notificationsStore = useNotificationsStore();

    wrapper = mount(ShopComponent, {
      global: {
        plugins: [pinia],
        stubs: {
          ShopCardVue: true,
          Wallet: true,
          Search: true,
        },
      },
    });
  });

  describe("Rendu initial", () => {
    it("devrait afficher le titre du marché", () => {
      expect(wrapper.text()).toContain("Le Comptoir");
    });

    it("devrait afficher le solde d'écus du joueur", () => {
      const walletAmount = wrapper.find(".wallet-amount");
      expect(walletAmount.exists()).toBe(true);
      expect(walletAmount.text()).toContain("1");
    });
  });

  describe("Filtres de rareté", () => {
    it("devrait avoir 'all' comme rareté par défaut", () => {
      expect(wrapper.vm.selectedRarity).toBe("all");
    });

    it("devrait afficher uniquement les matériaux communs quand la rareté 'common' est choisie", async () => {
      wrapper.vm.selectedRarity = "common";
      await wrapper.vm.$nextTick();

      const filtered = wrapper.vm.filteredMaterials;
      expect(filtered.length).toBeGreaterThan(0);
      filtered.forEach((mat) => {
        expect(mat.rarity).toBe("common");
      });
    });

    it("devrait afficher uniquement les matériaux rares quand la rareté 'rare' est choisie", async () => {
      wrapper.vm.selectedRarity = "rare";
      await wrapper.vm.$nextTick();

      const filtered = wrapper.vm.filteredMaterials;
      filtered.forEach((mat) => {
        expect(mat.rarity).toBe("rare");
      });
    });
  });

  describe("Tri", () => {
    it("devrait trier par prix d'achat croissant", async () => {
      wrapper.vm.sortBy = "prix-asc";
      await wrapper.vm.$nextTick();

      const prix = wrapper.vm.filteredMaterials.map((m) => m.prixAchat);
      const trie = [...prix].sort((a, b) => a - b);
      expect(prix).toEqual(trie);
    });

    it("devrait trier par nom (A-Z)", async () => {
      wrapper.vm.sortBy = "nom";
      await wrapper.vm.$nextTick();

      const noms = wrapper.vm.filteredMaterials.map((m) => m.nom);
      const trie = [...noms].sort((a, b) => a.localeCompare(b));
      expect(noms).toEqual(trie);
    });
  });

  describe("Recherche de matériaux", () => {
    it("devrait filtrer les matériaux par nom", async () => {
      const searchInput = wrapper.find(".search-input");
      await searchInput.setValue("fer");

      const filtered = wrapper.vm.filteredMaterials;
      filtered.forEach((mat) => {
        expect(
          mat.nom.toLowerCase().includes("fer") || mat.type.toLowerCase().includes("fer"),
        ).toBe(true);
      });
    });

    it("devrait être insensible à la casse", async () => {
      const searchInput = wrapper.find(".search-input");
      await searchInput.setValue("FER");

      const filtered = wrapper.vm.filteredMaterials;
      expect(filtered.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe("Combinaison filtres et recherche", () => {
    it("devrait appliquer la rareté ET la recherche", async () => {
      wrapper.vm.selectedRarity = "common";
      wrapper.vm.searchQuery = "fer";
      await wrapper.vm.$nextTick();

      const filtered = wrapper.vm.filteredMaterials;
      filtered.forEach((mat) => {
        expect(mat.rarity).toBe("common");
      });
    });
  });

  describe("Achat de matériaux", () => {
    it("devrait acheter un matériau si le joueur a assez d'écus", () => {
      const mockMaterial = { id: "fer", nom: "Fer", prixAchat: 100, prixVente: 50 };
      const ecusAvant = playerStore.ecus;
      wrapper.vm.acheterMaterial(mockMaterial, 2);

      expect(playerStore.ecus).toBeLessThanOrEqual(ecusAvant);
      expect(inventoryStore.materials["fer"]).toBe(2);
      expect(notificationsStore.notifications.length).toBeGreaterThanOrEqual(1);
    });

    it("devrait afficher une erreur si le joueur n'a pas assez d'écus", () => {
      playerStore.$patch({ ecus: 0 });
      const mockMaterial = { id: "adamantium", nom: "Adamantium", prixAchat: 2000, prixVente: 1000 };
      wrapper.vm.acheterMaterial(mockMaterial, 1);

      const errorNotif = notificationsStore.notifications.find((n) => n.type === "error");
      expect(errorNotif).toBeTruthy();
      expect(errorNotif.message).toContain("Fonds insuffisants");
    });

    it("devrait notifier quand un nouveau matériau est découvert dans le codex", () => {
      const mockMaterial = { id: "mithril", nom: "Mithril", prixAchat: 10, prixVente: 5 };
      wrapper.vm.acheterMaterial(mockMaterial, 1);

      const infoNotif = notificationsStore.notifications.find((n) => n.type === "info");
      expect(infoNotif).toBeTruthy();
      expect(infoNotif.message).toContain("Nouveau matériau découvert");
    });

    it("devrait acheter 1 unité par défaut si la quantité n'est pas spécifiée", () => {
      const mockMaterial = { id: "cuivre", nom: "Cuivre", prixAchat: 50, prixVente: 25 };
      wrapper.vm.acheterMaterial(mockMaterial);

      expect(inventoryStore.materials["cuivre"]).toBe(1);
    });
  });

  describe("Vente de matériaux", () => {
    it("devrait vendre un matériau si le joueur en a assez", () => {
      inventoryStore.ajouterMaterial("fer", 5);
      const ecusAvant = playerStore.ecus;
      const mockMaterial = { id: "fer", nom: "Fer", prixAchat: 100, prixVente: 50 };

      wrapper.vm.vendreMaterial(mockMaterial, 3);

      expect(inventoryStore.materials["fer"]).toBe(2);
      expect(playerStore.ecus).toBeGreaterThanOrEqual(ecusAvant + 150);
    });

    it("devrait afficher une erreur si le joueur n'a pas assez de matériau", () => {
      const mockMaterial = { id: "diamant", nom: "Diamant", prixAchat: 1000, prixVente: 500 };
      wrapper.vm.vendreMaterial(mockMaterial, 5);

      const errorNotif = notificationsStore.notifications.find((n) => n.type === "error");
      expect(errorNotif).toBeTruthy();
      expect(errorNotif.message).toContain("n'avez pas assez");
    });

    it("devrait vendre 1 unité par défaut si la quantité n'est pas spécifiée", () => {
      inventoryStore.ajouterMaterial("bronze", 3);
      const mockMaterial = { id: "bronze", nom: "Bronze", prixAchat: 75, prixVente: 37 };

      wrapper.vm.vendreMaterial(mockMaterial);

      expect(inventoryStore.materials["bronze"]).toBe(2);
    });
  });

  describe("Interface utilisateur", () => {
    it("devrait afficher l'icône de recherche", () => {
      expect(wrapper.find(".search-icon").exists()).toBe(true);
    });

    it("le champ de recherche devrait avoir un placeholder", () => {
      const searchInput = wrapper.find(".search-input");
      expect(searchInput.attributes("placeholder")).toContain("Rechercher");
    });
  });

  describe("Computed properties", () => {
    it("ecus devrait être mappé depuis le playerStore", () => {
      expect(wrapper.vm.ecus).toBe(1250);

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
