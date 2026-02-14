import { describe, it, expect, beforeEach, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import CraftingComponent from "../components/Crafting.vue";
import { useCraftingStore } from "@/stores/crafting";
import { usePlayerStore } from "@/stores/player";
import { useInventoryStore } from "@/stores/inventory";

describe("CraftingComponent", () => {
  let wrapper;
  let craftingStore;
  let playerStore;
  let inventoryStore;
  let pinia;

  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);

    craftingStore = useCraftingStore();
    playerStore = usePlayerStore();
    inventoryStore = useInventoryStore();

    playerStore.$patch({ niveau: 5 });

    inventoryStore.ajouterMaterial("fer", 10);
    inventoryStore.ajouterMaterial("cuir", 5);
    inventoryStore.ajouterMaterial("bois", 8);

    wrapper = mount(CraftingComponent, {
      global: {
        plugins: [pinia],
        stubs: {
          Swords: true,
          Hammer: true,
          Sparkles: true,
          Flame: true,
          Shield: true,
          Gem: true,
          FlaskConical: true,
          Wrench: true,
          Star: true,
          Lock: true,
          CheckCircle: true,
          Clock: true,
        },
      },
    });
  });

  describe("Rendu initial", () => {
    it("devrait afficher le titre de la forge", () => {
      expect(wrapper.text()).toContain("L'ATELIER");
      expect(wrapper.text()).toContain("DE FORGE");
    });

    it("devrait afficher le compteur de forges réalisées", () => {
      expect(wrapper.find(".counter-label").text()).toBe("Forges réalisées");
      expect(wrapper.find(".counter-value").exists()).toBe(true);
    });

    it("devrait afficher les catégories disponibles", () => {
      const categories = wrapper.findAll(".category-btn");
      expect(categories.length).toBe(5);
      expect(wrapper.text()).toContain("Armes");
      expect(wrapper.text()).toContain("Armures");
      expect(wrapper.text()).toContain("Outils");
      expect(wrapper.text()).toContain("Bijoux");
      expect(wrapper.text()).toContain("Consommables");
    });

    it("devrait avoir 'arme' comme catégorie sélectionnée par défaut", () => {
      expect(wrapper.vm.categorieSelectionnee).toBe("arme");
      const activeBtn = wrapper.find(".category-btn.active");
      expect(activeBtn.exists()).toBe(true);
      expect(activeBtn.text()).toContain("Armes");
    });
  });

  describe("Sélection de catégorie", () => {
    it("devrait changer la catégorie sélectionnée quand on clique sur un bouton", async () => {
      const armureBtn = wrapper.findAll(".category-btn")[1];
      await armureBtn.trigger("click");

      expect(wrapper.vm.categorieSelectionnee).toBe("armure");
      expect(armureBtn.classes()).toContain("active");
    });

    it("devrait réinitialiser la recette sélectionnée lors du changement de catégorie", async () => {
      wrapper.vm.recetteSelectionnee = { id: "test", nom: "Test" };
      const outilBtn = wrapper.findAll(".category-btn")[2];
      await outilBtn.trigger("click");

      expect(wrapper.vm.recetteSelectionnee).toBeNull();
    });
  });

  describe("État idle (pas de forge en cours)", () => {
    it("devrait afficher le message de sélection si aucune recette n'est sélectionnée", () => {
      expect(wrapper.find(".no-recipe").exists()).toBe(true);
      expect(wrapper.text()).toContain(
        "Sélectionnez une recette pour commencer",
      );
    });

    it("devrait afficher l'enclume en état idle", () => {
      const anvil = wrapper.find(".anvil-idle");
      expect(anvil.exists()).toBe(true);
    });
  });

  describe("Sélection de recette", () => {
    it("devrait afficher les détails de la recette sélectionnée", async () => {
      const mockRecette = {
        id: "test-epee",
        nom: "Épée de fer",
        description: "Une épée solide en fer",
        ingredients: [
          { materialId: "fer", quantite: 3 },
          { materialId: "cuir", quantite: 1 },
        ],
        niveauRequis: 1,
        tempsForge: 10,
        rarity: "common",
      };

      wrapper.vm.selectionnerRecette(mockRecette);
      await wrapper.vm.$nextTick();

      expect(wrapper.find(".recipe-details").exists()).toBe(true);
      expect(wrapper.text()).toContain("Épée de fer");
      expect(wrapper.text()).toContain("Une épée solide en fer");
    });

    it("devrait afficher les ingrédients requis", async () => {
      const mockRecette = {
        id: "test-epee",
        nom: "Épée de fer",
        description: "Une épée solide en fer",
        ingredients: [
          { materialId: "fer", quantite: 3 },
          { materialId: "cuir", quantite: 1 },
        ],
        niveauRequis: 1,
        tempsForge: 10,
        rarity: "common",
      };

      wrapper.vm.selectionnerRecette(mockRecette);
      await wrapper.vm.$nextTick();

      const ingredientsList = wrapper.find(".ingredients-list");
      expect(ingredientsList.exists()).toBe(true);
      expect(wrapper.text()).toContain("Ingrédients requis");
    });
  });

  describe("Vérification des conditions de craft", () => {
    it("devrait retourner false si le niveau est insuffisant", () => {
      const recipe = { niveauRequis: 10, ingredients: [] };

      const result = wrapper.vm.peutCrafter(recipe);
      expect(result.possible).toBe(false);
      expect(result.raison).toBe("Niveau insuffisant");
    });

    it("devrait retourner false si les matériaux sont insuffisants", () => {
      const recipe = {
        niveauRequis: 1,
        ingredients: [{ materialId: "fer", quantite: 100 }],
      };

      const result = wrapper.vm.peutCrafter(recipe);
      expect(result.possible).toBe(false);
      expect(result.raison).toBe("Matériaux insuffisants");
    });

    it("devrait retourner true si toutes les conditions sont remplies", () => {
      const recipe = {
        niveauRequis: 1,
        ingredients: [{ materialId: "fer", quantite: 5 }],
      };

      const result = wrapper.vm.peutCrafter(recipe);
      expect(result.possible).toBe(true);
    });
  });

  describe("Démarrage de la forge", () => {
    it("devrait ne rien faire si aucune recette n'est sélectionnée", () => {
      const demarrerForgeSpy = vi.spyOn(craftingStore, "demarrerForge");
      wrapper.vm.commencerForge();

      expect(demarrerForgeSpy).not.toHaveBeenCalled();
    });

    it("devrait appeler demarrerForge avec l'id de la recette", () => {
      const mockRecette = {
        id: "test-epee",
        nom: "Épée de fer",
        niveauRequis: 1,
        ingredients: [],
      };

      wrapper.vm.recetteSelectionnee = mockRecette;
      craftingStore.demarrerForge = vi.fn(() => true);

      wrapper.vm.commencerForge();

      expect(craftingStore.demarrerForge).toHaveBeenCalledWith("test-epee");
    });
  });

  describe("Utilitaires", () => {
    it("getMaterialNom devrait retourner le nom d'un matériau", () => {
      const nom = wrapper.vm.getMaterialNom("fer");
      expect(nom).toBeDefined();
      expect(typeof nom).toBe("string");
    });

    it("getRarityClass devrait retourner la classe CSS pour une rareté", () => {
      expect(wrapper.vm.getRarityClass("common")).toBe("rarity-common");
      expect(wrapper.vm.getRarityClass("rare")).toBe("rarity-rare");
      expect(wrapper.vm.getRarityClass("legendary")).toBe("rarity-legendary");
    });

    it("getRarityLabel devrait retourner le label pour une rareté", () => {
      expect(wrapper.vm.getRarityLabel("common")).toBe("Commun");
      expect(wrapper.vm.getRarityLabel("rare")).toBe("Rare");
      expect(wrapper.vm.getRarityLabel("legendary")).toBe("Légendaire");
      expect(wrapper.vm.getRarityLabel("unknown")).toBe("Commun");
    });
  });

  describe("Responsive et accessibilité", () => {
    it("devrait avoir les classes CSS appropriées pour le responsive", () => {
      expect(wrapper.find(".forge-container").exists()).toBe(true);
      expect(wrapper.find(".forge-content").exists()).toBe(true);
    });

    it("les boutons devraient être accessibles", () => {
      const buttons = wrapper.findAll("button");
      buttons.forEach((button) => {
        expect(button.element.tagName).toBe("BUTTON");
      });
    });
  });
});
