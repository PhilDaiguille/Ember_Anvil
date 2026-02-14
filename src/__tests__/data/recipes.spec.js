import { describe, it, expect } from "vitest";
import {
  RECIPES,
  RECIPES_BY_ID,
  RECIPES_PAR_CATEGORIE,
  getRecipeById,
  getRecipesByCategorie,
  getRecipesByNiveau,
  getRecipesByRarity,
  peutCrafter,
} from "@/data/recipes.js";
import { MATERIALS } from "@/data/materials.js";

describe("Recipes Data", () => {
  // ========== EXPORTS ==========

  describe("Exports", () => {
    it("should export RECIPES as an array", () => {
      expect(RECIPES).toBeDefined();
      expect(Array.isArray(RECIPES)).toBe(true);
    });

    it("should export RECIPES_BY_ID as an object", () => {
      expect(RECIPES_BY_ID).toBeDefined();
      expect(typeof RECIPES_BY_ID).toBe("object");
      expect(Array.isArray(RECIPES_BY_ID)).toBe(false);
    });

    it("should export RECIPES_PAR_CATEGORIE as an object", () => {
      expect(RECIPES_PAR_CATEGORIE).toBeDefined();
      expect(typeof RECIPES_PAR_CATEGORIE).toBe("object");
      expect(RECIPES_PAR_CATEGORIE).toHaveProperty("arme");
      expect(RECIPES_PAR_CATEGORIE).toHaveProperty("armure");
      expect(RECIPES_PAR_CATEGORIE).toHaveProperty("outil");
      expect(RECIPES_PAR_CATEGORIE).toHaveProperty("bijou");
      expect(RECIPES_PAR_CATEGORIE).toHaveProperty("consommable");
    });

    it("RECIPES should contain 45 recipes", () => {
      expect(RECIPES.length).toBe(45);
    });

    it("RECIPES_BY_ID should match RECIPES array entries", () => {
      const objectCount = Object.keys(RECIPES_BY_ID).length;
      expect(RECIPES.length).toBe(objectCount);
    });
  });

  // ========== STRUCTURE VALIDATION ==========

  describe("Recipe Structure", () => {
    it("every recipe should have required fields", () => {
      RECIPES.forEach((recipe) => {
        expect(recipe).toHaveProperty("id");
        expect(recipe).toHaveProperty("nom");
        expect(recipe).toHaveProperty("description");
        expect(recipe).toHaveProperty("categorie");
        expect(recipe).toHaveProperty("ingredients");
        expect(recipe).toHaveProperty("tempsForge");
        expect(recipe).toHaveProperty("xpGain");
        expect(recipe).toHaveProperty("niveauRequis");
        expect(recipe).toHaveProperty("valeurVente");
        expect(recipe).toHaveProperty("qualiteBase");
        expect(recipe).toHaveProperty("rarity");
      });
    });

    it("every recipe should have valid categorie", () => {
      const validCategories = [
        "arme",
        "armure",
        "outil",
        "bijou",
        "consommable",
      ];
      RECIPES.forEach((recipe) => {
        expect(validCategories).toContain(recipe.categorie);
      });
    });

    it("every recipe should have valid rarity", () => {
      const validRarities = ["common", "uncommon", "rare", "epic", "legendary"];
      RECIPES.forEach((recipe) => {
        expect(validRarities).toContain(recipe.rarity);
      });
    });

    it("every recipe should have valid qualiteBase (1-5)", () => {
      RECIPES.forEach((recipe) => {
        expect(recipe.qualiteBase).toBeGreaterThanOrEqual(1);
        expect(recipe.qualiteBase).toBeLessThanOrEqual(5);
      });
    });

    it("every recipe should have positive values", () => {
      RECIPES.forEach((recipe) => {
        expect(recipe.tempsForge).toBeGreaterThan(0);
        expect(recipe.xpGain).toBeGreaterThan(0);
        expect(recipe.niveauRequis).toBeGreaterThanOrEqual(1);
        expect(recipe.valeurVente).toBeGreaterThan(0);
      });
    });

    it("every recipe should have at least one ingredient", () => {
      RECIPES.forEach((recipe) => {
        expect(Array.isArray(recipe.ingredients)).toBe(true);
        expect(recipe.ingredients.length).toBeGreaterThan(0);
      });
    });

    it("every ingredient should have materialId and quantite", () => {
      RECIPES.forEach((recipe) => {
        recipe.ingredients.forEach((ingredient) => {
          expect(ingredient).toHaveProperty("materialId");
          expect(ingredient).toHaveProperty("quantite");
          expect(typeof ingredient.materialId).toBe("string");
          expect(ingredient.quantite).toBeGreaterThan(0);
        });
      });
    });
  });

  // ========== RECIPES_BY_ID VALIDATION ==========

  describe("RECIPES_BY_ID", () => {
    it("should contain all recipes indexed by id", () => {
      RECIPES.forEach((recipe) => {
        expect(RECIPES_BY_ID[recipe.id]).toBeDefined();
        expect(RECIPES_BY_ID[recipe.id]).toEqual(recipe);
      });
    });

    it("should allow direct access to specific recipes", () => {
      expect(RECIPES_BY_ID["epee_fer"]).toBeDefined();
      expect(RECIPES_BY_ID["epee_fer"].nom).toBe("Épée en Fer");
      expect(RECIPES_BY_ID["excalibur"]).toBeDefined();
      expect(RECIPES_BY_ID["excalibur"].rarity).toBe("legendary");
    });
  });

  // ========== RECIPES_PAR_CATEGORIE VALIDATION ==========

  describe("RECIPES_PAR_CATEGORIE", () => {
    it("arme category should have 15 recipes", () => {
      expect(RECIPES_PAR_CATEGORIE.arme.length).toBe(15);
    });

    it("armure category should have 12 recipes", () => {
      expect(RECIPES_PAR_CATEGORIE.armure.length).toBe(12);
    });

    it("outil category should have 8 recipes", () => {
      expect(RECIPES_PAR_CATEGORIE.outil.length).toBe(8);
    });

    it("bijou category should have 7 recipes", () => {
      expect(RECIPES_PAR_CATEGORIE.bijou.length).toBe(7);
    });

    it("consommable category should have 3 recipes", () => {
      expect(RECIPES_PAR_CATEGORIE.consommable.length).toBe(3);
    });

    it("all category arrays should match recipe categories", () => {
      Object.entries(RECIPES_PAR_CATEGORIE).forEach(([categorie, recipes]) => {
        recipes.forEach((recipe) => {
          expect(recipe.categorie).toBe(categorie);
        });
      });
    });
  });

  // ========== SPECIFIC RECIPES VALIDATION ==========

  describe("Specific Recipes", () => {
    it("should have Excalibur as legendary weapon", () => {
      const excalibur = RECIPES_BY_ID["excalibur"];
      expect(excalibur).toBeDefined();
      expect(excalibur.nom).toBe("Excalibur");
      expect(excalibur.categorie).toBe("arme");
      expect(excalibur.rarity).toBe("legendary");
      expect(excalibur.qualiteBase).toBe(5);
      expect(excalibur.niveauRequis).toBeGreaterThanOrEqual(15);
    });

    it("should have Mjölnir as legendary weapon", () => {
      const mjolnir = RECIPES_BY_ID["mjolnir"];
      expect(mjolnir).toBeDefined();
      expect(mjolnir.nom).toBe("Mjölnir");
      expect(mjolnir.rarity).toBe("legendary");
      expect(mjolnir.qualiteBase).toBe(5);
    });

    it("should have basic starting recipes with niveau 1", () => {
      const niveau1Recipes = RECIPES.filter((r) => r.niveauRequis === 1);
      expect(niveau1Recipes.length).toBeGreaterThan(0);

      const epeeFer = RECIPES_BY_ID["epee_fer"];
      expect(epeeFer.niveauRequis).toBe(1);
      expect(epeeFer.rarity).toBe("common");
    });

    it("legendary items should require high levels", () => {
      const legendaryRecipes = RECIPES.filter((r) => r.rarity === "legendary");
      legendaryRecipes.forEach((recipe) => {
        expect(recipe.niveauRequis).toBeGreaterThanOrEqual(12);
        expect(recipe.qualiteBase).toBe(5);
      });
    });
  });

  // ========== HELPER FUNCTIONS ==========

  describe("getRecipeById", () => {
    it("should return recipe when found", () => {
      const recipe = getRecipeById("epee_fer");
      expect(recipe).toBeDefined();
      expect(recipe.id).toBe("epee_fer");
    });

    it("should return undefined when not found", () => {
      const recipe = getRecipeById("invalid_id");
      expect(recipe).toBeUndefined();
    });
  });

  describe("getRecipesByCategorie", () => {
    it("should return all arme recipes", () => {
      const armes = getRecipesByCategorie("arme");
      expect(armes.length).toBe(15);
      armes.forEach((recipe) => {
        expect(recipe.categorie).toBe("arme");
      });
    });

    it("should return empty array for invalid category", () => {
      const invalid = getRecipesByCategorie("invalid");
      expect(invalid).toEqual([]);
    });
  });

  describe("getRecipesByNiveau", () => {
    it("should return all recipes accessible at niveau 1", () => {
      const recipes = getRecipesByNiveau(1);
      expect(recipes.length).toBeGreaterThan(0);
      recipes.forEach((recipe) => {
        expect(recipe.niveauRequis).toBeLessThanOrEqual(1);
      });
    });

    it("should return more recipes for higher levels", () => {
      const niveau1 = getRecipesByNiveau(1);
      const niveau5 = getRecipesByNiveau(5);
      const niveau10 = getRecipesByNiveau(10);

      expect(niveau5.length).toBeGreaterThan(niveau1.length);
      expect(niveau10.length).toBeGreaterThan(niveau5.length);
    });

    it("should return all recipes at max level", () => {
      const allRecipes = getRecipesByNiveau(100);
      expect(allRecipes.length).toBe(RECIPES.length);
    });
  });

  describe("getRecipesByRarity", () => {
    it("should return common recipes", () => {
      const common = getRecipesByRarity("common");
      expect(common.length).toBeGreaterThan(0);
      common.forEach((recipe) => {
        expect(recipe.rarity).toBe("common");
      });
    });

    it("should return legendary recipes", () => {
      const legendary = getRecipesByRarity("legendary");
      expect(legendary.length).toBeGreaterThan(0);
      legendary.forEach((recipe) => {
        expect(recipe.rarity).toBe("legendary");
      });
    });

    it("should return empty array for invalid rarity", () => {
      const invalid = getRecipesByRarity("invalid");
      expect(invalid).toEqual([]);
    });
  });

  describe("peutCrafter", () => {
    it("should return false if player level is too low", () => {
      const excalibur = RECIPES_BY_ID["excalibur"];
      const result = peutCrafter(excalibur, 1, {});
      expect(result.possible).toBe(false);
      expect(result.raison).toBe("Niveau insuffisant");
    });

    it("should return false if materials are missing", () => {
      const epeeFer = RECIPES_BY_ID["epee_fer"];
      const result = peutCrafter(epeeFer, 10, {});
      expect(result.possible).toBe(false);
      expect(result.raison).toContain("insuffisant");
    });

    it("should return true if requirements are met", () => {
      const epeeFer = RECIPES_BY_ID["epee_fer"];
      const inventory = {
        fer: 10,
        chene: 5,
      };
      const result = peutCrafter(epeeFer, 1, inventory);
      expect(result.possible).toBe(true);
    });

    it("should return false if materials are insufficient", () => {
      const epeeFer = RECIPES_BY_ID["epee_fer"];
      const inventory = {
        fer: 1, // needs 3
        chene: 1,
      };
      const result = peutCrafter(epeeFer, 1, inventory);
      expect(result.possible).toBe(false);
      expect(result.raison).toContain("fer insuffisant");
    });
  });

  // ========== RARITY DISTRIBUTION ==========

  describe("Rarity Distribution", () => {
    it("should have proper progression of rarities", () => {
      const common = RECIPES.filter((r) => r.rarity === "common");
      const uncommon = RECIPES.filter((r) => r.rarity === "uncommon");
      const rare = RECIPES.filter((r) => r.rarity === "rare");
      const epic = RECIPES.filter((r) => r.rarity === "epic");
      const legendary = RECIPES.filter((r) => r.rarity === "legendary");

      expect(common.length).toBeGreaterThan(0);
      expect(uncommon.length).toBeGreaterThan(0);
      expect(rare.length).toBeGreaterThan(0);
      expect(epic.length).toBeGreaterThan(0);
      expect(legendary.length).toBeGreaterThan(0);

      // Should have fewer legendary than common
      expect(legendary.length).toBeLessThan(common.length + uncommon.length);
    });

    it("higher rarity should correlate with higher level requirements", () => {
      const commonAvgLevel =
        RECIPES.filter((r) => r.rarity === "common").reduce(
          (sum, r) => sum + r.niveauRequis,
          0,
        ) / RECIPES.filter((r) => r.rarity === "common").length;

      const legendaryAvgLevel =
        RECIPES.filter((r) => r.rarity === "legendary").reduce(
          (sum, r) => sum + r.niveauRequis,
          0,
        ) / RECIPES.filter((r) => r.rarity === "legendary").length;

      expect(legendaryAvgLevel).toBeGreaterThan(commonAvgLevel);
    });
  });

  // ========== ECONOMIC BALANCE ==========

  describe("Economic Balance", () => {
    it("higher level recipes should have higher sell values", () => {
      const lowLevelRecipes = RECIPES.filter((r) => r.niveauRequis <= 3);
      const highLevelRecipes = RECIPES.filter((r) => r.niveauRequis >= 10);

      const lowAvgValue =
        lowLevelRecipes.reduce((sum, r) => sum + r.valeurVente, 0) /
        lowLevelRecipes.length;
      const highAvgValue =
        highLevelRecipes.reduce((sum, r) => sum + r.valeurVente, 0) /
        highLevelRecipes.length;

      expect(highAvgValue).toBeGreaterThan(lowAvgValue);
    });

    it("legendary items should have very high value", () => {
      const legendary = RECIPES.filter((r) => r.rarity === "legendary");
      legendary.forEach((recipe) => {
        expect(recipe.valeurVente).toBeGreaterThan(5000);
      });
    });
  });
});
