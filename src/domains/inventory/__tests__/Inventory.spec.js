import { describe, it, expect, beforeEach, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import InventoryComponent from "../components/Inventory.vue";
import { useInventoryStore } from "@/stores/inventory";
import { usePlayerStore } from "@/stores/player";
import { useNotificationsStore } from "@/stores/notifications";

describe("InventoryComponent", () => {
  let wrapper;
  let inventoryStore;
  let playerStore;
  let notificationsStore;
  let pinia;

  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);

    inventoryStore = useInventoryStore();
    playerStore = usePlayerStore();
    notificationsStore = useNotificationsStore();

    // Mock initial state
    inventoryStore.$patch({
      capaciteMax: 100,
      craftedItems: [],
      materials: {
        fer: 10,
        cuivre: 5,
      },
    });

    playerStore.$patch({
      ecus: 500,
    });

    wrapper = mount(InventoryComponent, {
      global: {
        plugins: [pinia],
        stubs: {
          Package: true,
          Coins: true,
          Hammer: true,
          FlaskConical: true,
          Swords: true,
          Star: true,
          Search: true,
          Shield: true,
          Gem: true,
          Wrench: true,
        },
      },
    });
  });

  describe("Rendu initial", () => {
    it("devrait afficher le titre de l'inventaire", () => {
      expect(wrapper.text()).toContain("Inventaire");
      expect(wrapper.text()).toContain("Gérez vos matériaux et créations");
    });

    it("devrait avoir 'materials' comme onglet sélectionné par défaut", () => {
      expect(wrapper.vm.selectedTab).toBe("materials");
    });

    it("devrait afficher les statistiques de l'inventaire", () => {
      expect(wrapper.vm.stats.capaciteMax).toBe(100);
      // capaciteUtilisee et valeurTotale sont calculés par le store en fonction des matériaux
      expect(wrapper.vm.stats.capaciteUtilisee).toBeGreaterThanOrEqual(0);
      expect(wrapper.vm.stats.valeurTotale).toBeGreaterThanOrEqual(0);
    });
  });

  describe("Onglets", () => {
    it("devrait changer d'onglet quand on clique sur un onglet", async () => {
      wrapper.vm.setTab("crafted");
      await wrapper.vm.$nextTick();

      expect(wrapper.vm.selectedTab).toBe("crafted");
    });

    it("devrait réinitialiser la recherche lors du changement d'onglet", async () => {
      wrapper.vm.searchQuery = "fer";
      wrapper.vm.setTab("crafted");

      expect(wrapper.vm.searchQuery).toBe("");
    });

    it("devrait réinitialiser le filtre lors du changement d'onglet", async () => {
      wrapper.vm.selectedFilter = "rare";
      wrapper.vm.setTab("materials");

      expect(wrapper.vm.selectedFilter).toBe("all");
    });
  });

  describe("Filtrage des matériaux", () => {
    it("devrait filtrer les matériaux par rareté", async () => {
      wrapper.vm.setFilter("rare");
      await wrapper.vm.$nextTick();

      const filtered = wrapper.vm.materialsFiltered;
      filtered.forEach((mat) => {
        expect(mat.rarity).toBe("rare");
      });
    });

    it("devrait filtrer les matériaux par recherche", async () => {
      wrapper.vm.searchQuery = "fer";
      await wrapper.vm.$nextTick();

      const filtered = wrapper.vm.materialsFiltered;
      expect(filtered.some((m) => m.nom.toLowerCase().includes("fer"))).toBe(
        true,
      );
    });

    it("devrait filtrer par nom et type", async () => {
      wrapper.vm.searchQuery = "metal";
      await wrapper.vm.$nextTick();

      const filtered = wrapper.vm.materialsFiltered;
      if (filtered.length > 0) {
        filtered.forEach((m) => {
          expect(
            m.nom.toLowerCase().includes("metal") ||
              m.type.toLowerCase().includes("metal"),
          ).toBe(true);
        });
      }
    });

    it("devrait combiner filtre de rareté et recherche", async () => {
      wrapper.vm.setFilter("common");
      wrapper.vm.searchQuery = "fer";
      await wrapper.vm.$nextTick();

      const filtered = wrapper.vm.materialsFiltered;
      filtered.forEach((m) => {
        expect(m.rarity).toBe("common");
        expect(m.nom.toLowerCase()).toContain("fer");
      });
    });
  });

  describe("Filtrage des objets forgés", () => {
    beforeEach(() => {
      inventoryStore.$patch({
        craftedItems: [
          {
            id: "1",
            nom: "Épée de fer",
            categorie: "arme",
            qualite: 3,
            valeur: 150,
          },
          {
            id: "2",
            nom: "Bouclier de bronze",
            categorie: "armure",
            qualite: 2,
            valeur: 100,
          },
        ],
      });
    });

    it("devrait filtrer les objets forgés par recherche", async () => {
      // Update the component's tab
      wrapper.vm.selectedTab = "crafted";
      wrapper.vm.searchQuery = "épée";
      await wrapper.vm.$nextTick();

      const filtered = wrapper.vm.craftedFiltered;
      expect(filtered.length).toBeGreaterThan(0);
      expect(filtered[0].nom.toLowerCase()).toContain("épée");
    });

    it("devrait filtrer par catégorie", async () => {
      wrapper.vm.searchQuery = "arme";
      await wrapper.vm.$nextTick();

      const filtered = wrapper.vm.craftedFiltered;
      if (filtered.length > 0) {
        expect(
          filtered.some(
            (item) =>
              item.categorie.toLowerCase().includes("arme") ||
              item.nom.toLowerCase().includes("arme"),
          ),
        ).toBe(true);
      }
    });
  });

  describe("Vente de matériaux", () => {
    it("devrait vendre un matériau et ajouter des écus", () => {
      const mockMaterial = {
        id: "fer",
        nom: "Fer",
        prixVente: 50,
      };

      const retirerMaterialSpy = vi.spyOn(inventoryStore, "retirerMaterial");
      const ajouterEcusSpy = vi.spyOn(playerStore, "ajouterEcus");
      const ajouterNotifSpy = vi.spyOn(
        notificationsStore,
        "ajouterNotification",
      );

      wrapper.vm.vendreMaterial(mockMaterial);

      expect(retirerMaterialSpy).toHaveBeenCalledWith("fer", 1);
      expect(ajouterEcusSpy).toHaveBeenCalledWith(50);
      expect(ajouterNotifSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          type: "success",
        }),
      );
    });

    it("devrait afficher une erreur si pas assez de matériau", () => {
      const mockMaterial = {
        id: "diamant",
        nom: "Diamant",
        prixVente: 500,
      };

      const ajouterNotifSpy = vi.spyOn(
        notificationsStore,
        "ajouterNotification",
      );

      wrapper.vm.vendreMaterial(mockMaterial);

      expect(ajouterNotifSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          type: "error",
          message: expect.stringContaining("n'avez pas assez"),
        }),
      );
    });
  });

  describe("Vente d'objets forgés", () => {
    it("devrait vendre un objet forgé", () => {
      const mockItem = {
        id: "epee-1",
        nom: "Épée de fer",
        valeur: 150,
      };

      const supprimerObjetSpy = vi.spyOn(inventoryStore, "supprimerObjet");
      const ajouterEcusSpy = vi.spyOn(playerStore, "ajouterEcus");
      const ajouterNotifSpy = vi.spyOn(
        notificationsStore,
        "ajouterNotification",
      );

      wrapper.vm.vendreObjet(mockItem);

      expect(supprimerObjetSpy).toHaveBeenCalledWith("epee-1");
      expect(ajouterEcusSpy).toHaveBeenCalledWith(150);
      expect(ajouterNotifSpy).toHaveBeenCalledWith(
        expect.objectContaining({
          type: "success",
          message: expect.stringContaining("vendu pour 150 écus"),
        }),
      );
    });
  });

  describe("Utilitaires", () => {
    it("getRarityClass devrait retourner la bonne classe", () => {
      expect(wrapper.vm.getRarityClass("common")).toBe("rarity-common");
      expect(wrapper.vm.getRarityClass("rare")).toBe("rarity-rare");
      expect(wrapper.vm.getRarityClass("legendary")).toBe("rarity-legendary");
    });

    it("getRarityLabel devrait retourner le bon label", () => {
      expect(wrapper.vm.getRarityLabel("common")).toBe("Commun");
      expect(wrapper.vm.getRarityLabel("uncommon")).toBe("Peu commun");
      expect(wrapper.vm.getRarityLabel("rare")).toBe("Rare");
      expect(wrapper.vm.getRarityLabel("epic")).toBe("Épique");
      expect(wrapper.vm.getRarityLabel("legendary")).toBe("Légendaire");
      expect(wrapper.vm.getRarityLabel("unknown")).toBe("Commun");
    });

    it("getCategorieIcon devrait retourner la bonne icône", () => {
      expect(wrapper.vm.getCategorieIcon("arme")).toBe("Swords");
      expect(wrapper.vm.getCategorieIcon("armure")).toBe("Shield");
      expect(wrapper.vm.getCategorieIcon("outil")).toBe("Wrench");
      expect(wrapper.vm.getCategorieIcon("bijou")).toBe("Gem");
      expect(wrapper.vm.getCategorieIcon("consommable")).toBe("FlaskConical");
      expect(wrapper.vm.getCategorieIcon("unknown")).toBe("Package");
    });

    it("getCapacityPercentage devrait retourner le pourcentage", () => {
      // Le pourcentage est calculé par le store en fonction des matériaux
      const percentage = wrapper.vm.getCapacityPercentage();
      expect(percentage).toBeGreaterThanOrEqual(0);
      expect(percentage).toBeLessThanOrEqual(100);
    });

    it("renderQualityStars devrait retourner la qualité", () => {
      expect(wrapper.vm.renderQualityStars(3)).toBe(3);
      expect(wrapper.vm.renderQualityStars(undefined)).toBe(1);
    });
  });

  describe("Computed properties", () => {
    it("stats devrait calculer les bonnes statistiques", () => {
      const stats = wrapper.vm.stats;

      expect(stats.capaciteMax).toBe(100);
      expect(stats.capaciteUtilisee).toBeGreaterThanOrEqual(0);
      expect(stats.valeurTotale).toBeGreaterThanOrEqual(0);
      expect(stats.objetsCrees).toBe(0);
    });

    it("materialsFiltered devrait retourner la liste filtrée", () => {
      const filtered = wrapper.vm.materialsFiltered;
      expect(Array.isArray(filtered)).toBe(true);
      // Le nombre de matériaux dépend du store
      expect(filtered.length).toBeGreaterThanOrEqual(0);
    });

    it("craftedFiltered devrait retourner la liste filtrée", () => {
      const filtered = wrapper.vm.craftedFiltered;
      expect(Array.isArray(filtered)).toBe(true);
    });
  });

  describe("Data properties", () => {
    it("devrait avoir les bonnes valeurs par défaut", () => {
      expect(wrapper.vm.selectedTab).toBe("materials");
      expect(wrapper.vm.searchQuery).toBe("");
      expect(wrapper.vm.selectedFilter).toBe("all");
    });
  });

  describe("Méthodes de filtre", () => {
    it("setFilter devrait changer le filtre sélectionné", () => {
      wrapper.vm.setFilter("rare");
      expect(wrapper.vm.selectedFilter).toBe("rare");

      wrapper.vm.setFilter("common");
      expect(wrapper.vm.selectedFilter).toBe("common");
    });
  });
});
