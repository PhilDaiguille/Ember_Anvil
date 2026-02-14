import { describe, it, expect, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import MainCard from "../ui/MainCard.vue";

const mockMaterial = {
  id: "fer",
  nom: "Fer",
  type: "metal",
  rarity: "common",
  tier: 1,
  prixAchat: 10,
  prixVente: 5,
  description: "Un métal commun et résistant.",
  categorie: "metaux",
};

const mockRecipe = {
  id: "epee-fer",
  nom: "Épée en Fer",
  description: "Une épée simple mais efficace.",
  categorie: "arme",
  rarity: "common",
  niveauRequis: 1,
  tempsForge: 10,
  xpGain: 15,
  valeurVente: 50,
  qualiteBase: 3,
  ingredients: [{ materialId: "fer", quantite: 3 }],
};

describe("MainCard (PageMainCard)", () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  describe("Rendu matériau", () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(MainCard, {
        props: {
          item: mockMaterial,
          index: 0,
          itemType: "materials",
        },
        global: {
          stubs: {
            FlaskConical: true,
            ScrollText: true,
            Scale: true,
            Coins: true,
            TrendingUp: true,
            Star: true,
            Package: true,
            Trophy: true,
            Award: true,
            Check: true,
            Hammer: true,
            Shield: true,
            Wrench: true,
            Gem: true,
            Sparkles: true,
          },
        },
      });
    });

    it("devrait afficher le nom du matériau", () => {
      expect(wrapper.text()).toContain("Fer");
    });

    it("devrait afficher la description", () => {
      expect(wrapper.text()).toContain("Un métal commun et résistant.");
    });

    it("devrait afficher le type", () => {
      expect(wrapper.text()).toContain("metal");
    });

    it("devrait afficher le prix d'achat", () => {
      expect(wrapper.text()).toContain("10 écus");
    });

    it("devrait afficher le numéro d'index", () => {
      expect(wrapper.text()).toContain("01");
    });

    it("devrait avoir la classe codex-entry", () => {
      expect(wrapper.find(".codex-entry").exists()).toBe(true);
    });

    it("devrait afficher le label de rareté", () => {
      expect(wrapper.text()).toContain("Commun");
    });
  });

  describe("Rendu recette", () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(MainCard, {
        props: {
          item: mockRecipe,
          index: 2,
          itemType: "recipes",
        },
        global: {
          stubs: {
            FlaskConical: true,
            ScrollText: true,
            Scale: true,
            Coins: true,
            TrendingUp: true,
            Star: true,
            Package: true,
            Trophy: true,
            Award: true,
            Check: true,
            Hammer: true,
            Shield: true,
            Wrench: true,
            Gem: true,
            Sparkles: true,
          },
        },
      });
    });

    it("devrait afficher le nom de la recette", () => {
      expect(wrapper.text()).toContain("Épée en Fer");
    });

    it("devrait afficher le niveau requis", () => {
      expect(wrapper.text()).toContain("Niveau 1");
    });

    it("devrait afficher le temps de forge", () => {
      expect(wrapper.text()).toContain("10s");
    });

    it("devrait afficher l'XP gagnée", () => {
      expect(wrapper.text()).toContain("15 XP");
    });

    it("devrait afficher les ingrédients", () => {
      expect(wrapper.text()).toContain("Ingrédients Requis");
    });

    it("devrait afficher le numéro d'index correct", () => {
      expect(wrapper.text()).toContain("03");
    });
  });

  describe("Méthodes", () => {
    let wrapper;

    beforeEach(() => {
      wrapper = mount(MainCard, {
        props: {
          item: mockMaterial,
          index: 0,
          itemType: "materials",
        },
        global: {
          stubs: {
            FlaskConical: true,
            ScrollText: true,
            Scale: true,
            Coins: true,
            TrendingUp: true,
            Star: true,
            Package: true,
            Trophy: true,
            Award: true,
            Check: true,
            Hammer: true,
            Shield: true,
            Wrench: true,
            Gem: true,
            Sparkles: true,
          },
        },
      });
    });

    it("getRarityLabel devrait retourner les bons labels", () => {
      expect(wrapper.vm.getRarityLabel("common")).toBe("Commun");
      expect(wrapper.vm.getRarityLabel("rare")).toBe("Rare");
      expect(wrapper.vm.getRarityLabel("legendary")).toBe("Légendaire");
    });

    it("getCurrentYear devrait retourner l'année courante", () => {
      expect(wrapper.vm.getCurrentYear()).toBe(new Date().getFullYear());
    });

    it("getCategoryLabel devrait retourner le label de catégorie", () => {
      const label = wrapper.vm.getCategoryLabel();
      expect(typeof label).toBe("string");
      expect(label.length).toBeGreaterThan(0);
    });
  });
});
