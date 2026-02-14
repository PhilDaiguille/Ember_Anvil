/**
 * TESTS for Codex Store (src/stores/codex.js)
 *
 * Tests de la logique du store Codex/Wiki:
 * - État initial
 * - Découverte de matériaux et recettes
 * - Filtrage et recherche
 * - Statistiques de découverte
 * - Gestion des catégories
 */

import { describe, it, expect, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useCodexStore } from "@/stores/codex";

describe("Codex Store", () => {
  let codexStore;

  beforeEach(() => {
    setActivePinia(createPinia());
    codexStore = useCodexStore();
  });

  // ========================================
  // INITIALIZATION TESTS
  // ========================================

  describe("État initial", () => {
    it("devrait avoir un état initial correct", () => {
      expect(codexStore.discoveredMaterials).toEqual([]);
      expect(codexStore.discoveredRecipes).toEqual([]);
      expect(codexStore.selectedTab).toBe("materials");
      expect(codexStore.selectedCategory).toBe("all");
      expect(codexStore.searchQuery).toBe("");
      expect(codexStore.selectedItemId).toBeNull();
      expect(codexStore.initialized).toBe(false);
    });

    it("devrait initialiser avec des matériaux tier 1 découverts", () => {
      codexStore.initialize();

      expect(codexStore.initialized).toBe(true);
      expect(codexStore.discoveredMaterials.length).toBeGreaterThan(0);
      // Tier 1 materials should be auto-discovered (aluminium, cuivre, fer, etc.)
      expect(codexStore.discoveredMaterials).toContain("aluminium");
      expect(codexStore.discoveredMaterials).toContain("cuivre");
      expect(codexStore.discoveredMaterials).toContain("fer");
    });

    it("ne devrait pas réinitialiser si déjà initialisé", () => {
      codexStore.initialize();
      const firstCount = codexStore.discoveredMaterials.length;

      codexStore.initialize(); // Second call

      expect(codexStore.discoveredMaterials.length).toBe(firstCount);
    });
  });

  // ========================================
  // MATERIAL DISCOVERY TESTS
  // ========================================

  describe("Découverte de matériaux", () => {
    beforeEach(() => {
      codexStore.initialize();
    });

    it("devrait découvrir un nouveau matériau", () => {
      const initialCount = codexStore.discoveredMaterials.length;

      const result = codexStore.discoverMaterial("acier");

      expect(result).toBe(true);
      expect(codexStore.discoveredMaterials).toContain("acier");
      expect(codexStore.discoveredMaterials.length).toBe(initialCount + 1);
    });

    it("ne devrait pas redécouvrir un matériau déjà découvert", () => {
      codexStore.discoverMaterial("acier");
      const countAfterFirst = codexStore.discoveredMaterials.length;

      const result = codexStore.discoverMaterial("acier");

      expect(result).toBe(false);
      expect(codexStore.discoveredMaterials.length).toBe(countAfterFirst);
    });

    it("devrait découvrir plusieurs matériaux à la fois", () => {
      const initialCount = codexStore.discoveredMaterials.length;

      codexStore.discoverMaterials(["acier", "bronze", "titane"]);

      expect(codexStore.discoveredMaterials).toContain("acier");
      expect(codexStore.discoveredMaterials).toContain("bronze");
      expect(codexStore.discoveredMaterials).toContain("titane");
      expect(codexStore.discoveredMaterials.length).toBe(initialCount + 3);
    });

    it("devrait auto-découvrir un matériau lors d'un achat", () => {
      const result = codexStore.autoDiscoverFromPurchase("or");

      expect(result).toBe(true);
      expect(codexStore.discoveredMaterials).toContain("or");
    });
  });

  // ========================================
  // RECIPE DISCOVERY TESTS
  // ========================================

  describe("Découverte de recettes", () => {
    it("devrait découvrir une nouvelle recette", () => {
      const result = codexStore.discoverRecipe("epee_fer");

      expect(result).toBe(true);
      expect(codexStore.discoveredRecipes).toContain("epee_fer");
    });

    it("ne devrait pas redécouvrir une recette déjà découverte", () => {
      codexStore.discoverRecipe("epee_fer");

      const result = codexStore.discoverRecipe("epee_fer");

      expect(result).toBe(false);
      expect(codexStore.discoveredRecipes.length).toBe(1);
    });

    it("devrait découvrir plusieurs recettes à la fois", () => {
      codexStore.discoverRecipes(["epee_fer", "dague_cuivre", "hache_acier"]);

      expect(codexStore.discoveredRecipes).toContain("epee_fer");
      expect(codexStore.discoveredRecipes).toContain("dague_cuivre");
      expect(codexStore.discoveredRecipes).toContain("hache_acier");
      expect(codexStore.discoveredRecipes.length).toBe(3);
    });

    it("devrait auto-découvrir une recette et ses ingrédients lors du craft", () => {
      codexStore.autoDiscoverFromCraft("epee_fer");

      // Recipe should be discovered
      expect(codexStore.discoveredRecipes).toContain("epee_fer");

      // Ingredients should also be discovered (fer, chene)
      expect(codexStore.discoveredMaterials).toContain("fer");
      expect(codexStore.discoveredMaterials).toContain("chene");
    });
  });

  // ========================================
  // GETTERS TESTS - MATERIALS
  // ========================================

  describe("Getters pour matériaux", () => {
    beforeEach(() => {
      codexStore.initialize();
    });

    it("allMaterialsWithStatus devrait inclure le statut de découverte", () => {
      codexStore.discoverMaterial("acier");

      const materials = codexStore.allMaterialsWithStatus;
      const acier = materials.find((m) => m.id === "acier");
      const adamantium = materials.find((m) => m.id === "adamantium");

      expect(acier.discovered).toBe(true);
      expect(adamantium.discovered).toBe(false);
    });

    it("discoveredMaterialsList devrait retourner uniquement les matériaux découverts", () => {
      codexStore.discoverMaterials(["acier", "bronze"]);

      const discovered = codexStore.discoveredMaterialsList;

      expect(discovered.some((m) => m.id === "acier")).toBe(true);
      expect(discovered.some((m) => m.id === "bronze")).toBe(true);
      expect(discovered.some((m) => m.id === "adamantium")).toBe(false);
    });

    it("discoveredMaterialsList devrait être trié par tier puis nom", () => {
      codexStore.unlockAll(); // Unlock all for sorting test

      const discovered = codexStore.discoveredMaterialsList;

      // Check that tier ordering is respected
      for (let i = 1; i < discovered.length; i++) {
        const prev = discovered[i - 1];
        const curr = discovered[i];

        if (prev.tier === curr.tier) {
          // Same tier: should be alphabetically sorted
          expect(prev.nom.localeCompare(curr.nom)).toBeLessThanOrEqual(0);
        } else {
          // Different tiers: should be ascending
          expect(prev.tier).toBeLessThan(curr.tier);
        }
      }
    });

    it("filteredMaterials devrait filtrer par catégorie (type)", () => {
      codexStore.unlockAll();
      codexStore.setCategory("metal");

      const filtered = codexStore.filteredMaterials;

      // All filtered materials should have type 'metal'
      filtered.forEach((m) => {
        expect(m.type).toBe("metal");
      });
    });

    it("filteredMaterials devrait filtrer par recherche", () => {
      codexStore.unlockAll();
      codexStore.setSearchQuery("fer");

      const filtered = codexStore.filteredMaterials;

      // All filtered materials should contain 'fer' in name, type, or description
      filtered.forEach((m) => {
        const matchesSearch =
          m.nom.toLowerCase().includes("fer") ||
          m.type.toLowerCase().includes("fer") ||
          m.description.toLowerCase().includes("fer");

        expect(matchesSearch).toBe(true);
      });
    });

    it("filteredMaterials devrait combiner catégorie et recherche", () => {
      codexStore.unlockAll();
      codexStore.setCategory("metal");
      codexStore.setSearchQuery("acier");

      const filtered = codexStore.filteredMaterials;

      filtered.forEach((m) => {
        expect(m.type).toBe("metal");
        expect(m.nom.toLowerCase().includes("acier")).toBe(true);
      });
    });

    it("materialsDiscoveryStats devrait calculer les statistiques correctement", () => {
      codexStore.initialize(); // Discovers tier 1 materials

      const stats = codexStore.materialsDiscoveryStats;

      expect(stats.discovered).toBeGreaterThan(0);
      expect(stats.total).toBeGreaterThan(0);
      expect(stats.discovered).toBeLessThanOrEqual(stats.total);
      expect(stats.percentage).toBeGreaterThanOrEqual(0);
      expect(stats.percentage).toBeLessThanOrEqual(100);
      expect(stats.remaining).toBe(stats.total - stats.discovered);
    });

    it("materialsByCategory devrait grouper les matériaux par type", () => {
      codexStore.unlockAll();

      const byCategory = codexStore.materialsByCategory;

      // Should have categories like 'metal', 'wood', etc.
      expect(Object.keys(byCategory).length).toBeGreaterThan(0);

      // Each category should have materials of that type
      Object.entries(byCategory).forEach(([type, materials]) => {
        materials.forEach((m) => {
          expect(m.type).toBe(type);
        });
      });
    });

    it("availableCategories devrait retourner les catégories des matériaux découverts", () => {
      codexStore.setTab("materials");
      codexStore.discoverMaterial("fer"); // type: metal
      codexStore.discoverMaterial("chene"); // type: wood

      const categories = codexStore.availableCategories;

      expect(categories).toContain("all");
      expect(categories).toContain("metal");
      expect(categories).toContain("wood");
    });

    it("availableCategories ne devrait pas contenir undefined", () => {
      codexStore.initialize();
      codexStore.setTab("materials");

      const categories = codexStore.availableCategories;

      expect(categories).not.toContain(undefined);
      expect(categories).not.toContain(null);
      expect(categories.every((cat) => typeof cat === "string")).toBe(true);
    });
  });

  // ========================================
  // GETTERS TESTS - RECIPES
  // ========================================

  describe("Getters pour recettes", () => {
    it("allRecipesWithStatus devrait inclure le statut de découverte", () => {
      codexStore.discoverRecipe("epee_fer");

      const recipes = codexStore.allRecipesWithStatus;
      const epeeFer = recipes.find((r) => r.id === "epee_fer");
      const dagueCuivre = recipes.find((r) => r.id === "dague_cuivre");

      expect(epeeFer.discovered).toBe(true);
      expect(dagueCuivre.discovered).toBe(false);
    });

    it("discoveredRecipesList devrait retourner uniquement les recettes découvertes", () => {
      codexStore.discoverRecipes(["epee_fer", "dague_cuivre"]);

      const discovered = codexStore.discoveredRecipesList;

      expect(discovered.some((r) => r.id === "epee_fer")).toBe(true);
      expect(discovered.some((r) => r.id === "dague_cuivre")).toBe(true);
    });

    it("filteredRecipes devrait filtrer par catégorie", () => {
      codexStore.unlockAll();
      codexStore.setTab("recipes");
      codexStore.setCategory("arme");

      const filtered = codexStore.filteredRecipes;

      // All filtered recipes should have categorie 'arme'
      filtered.forEach((r) => {
        expect(r.categorie).toBe("arme");
      });
    });

    it("filteredRecipes devrait filtrer par recherche", () => {
      codexStore.unlockAll();
      codexStore.setTab("recipes");
      codexStore.setSearchQuery("épée");

      const filtered = codexStore.filteredRecipes;

      // All filtered recipes should contain 'épée' in name, description, or category
      filtered.forEach((r) => {
        const matchesSearch =
          r.nom.toLowerCase().includes("épée") ||
          r.description.toLowerCase().includes("épée") ||
          r.categorie.toLowerCase().includes("épée");

        expect(matchesSearch).toBe(true);
      });
    });

    it("recipesDiscoveryStats devrait calculer les statistiques correctement", () => {
      codexStore.discoverRecipes(["epee_fer", "dague_cuivre"]);

      const stats = codexStore.recipesDiscoveryStats;

      expect(stats.discovered).toBe(2);
      expect(stats.total).toBeGreaterThan(0);
      expect(stats.percentage).toBeGreaterThanOrEqual(0);
      expect(stats.percentage).toBeLessThanOrEqual(100);
      expect(stats.remaining).toBe(stats.total - 2);
    });

    it("recipesByCategory devrait grouper les recettes par catégorie", () => {
      codexStore.unlockAll();

      const byCategory = codexStore.recipesByCategory;

      // Should have categories like 'arme', 'armure', etc.
      expect(Object.keys(byCategory).length).toBeGreaterThan(0);

      // Each category should have recipes of that type
      Object.entries(byCategory).forEach(([categorie, recipes]) => {
        recipes.forEach((r) => {
          expect(r.categorie).toBe(categorie);
        });
      });
    });

    it("availableCategories devrait retourner les catégories des recettes découvertes", () => {
      codexStore.setTab("recipes");
      codexStore.discoverRecipe("epee_fer"); // categorie: arme
      codexStore.discoverRecipe("plastron_cuivre"); // categorie: armure

      const categories = codexStore.availableCategories;

      expect(categories).toContain("all");
      expect(categories).toContain("arme");
      expect(categories).toContain("armure");
    });

    it("availableCategories ne devrait pas contenir undefined pour les recettes", () => {
      codexStore.setTab("recipes");
      codexStore.discoverRecipes(["epee_fer", "dague_cuivre", "hache_acier"]);

      const categories = codexStore.availableCategories;

      expect(categories).not.toContain(undefined);
      expect(categories).not.toContain(null);
      expect(categories.every((cat) => typeof cat === "string")).toBe(true);
    });
  });

  // ========================================
  // GLOBAL GETTERS TESTS
  // ========================================

  describe("Getters globaux", () => {
    it("globalCompletionRate devrait calculer le taux global", () => {
      codexStore.initialize(); // Discovers some materials

      const rate = codexStore.globalCompletionRate;

      expect(rate).toBeGreaterThan(0);
      expect(rate).toBeLessThanOrEqual(100);
    });

    it("globalCompletionRate devrait être 100% quand tout est débloqué", () => {
      codexStore.unlockAll();

      const rate = codexStore.globalCompletionRate;

      expect(rate).toBe(100);
    });

    it("selectedItem devrait retourner null si aucun item sélectionné", () => {
      expect(codexStore.selectedItem).toBeNull();
    });

    it("selectedItem devrait retourner le matériau sélectionné", () => {
      codexStore.setTab("materials");
      codexStore.discoverMaterial("fer"); // Discover the material first
      codexStore.selectItem("fer");

      const item = codexStore.selectedItem;

      expect(item).toBeDefined();
      expect(item).not.toBeNull();
      expect(item.id).toBe("fer");
    });

    it("selectedItem devrait retourner la recette sélectionnée", () => {
      codexStore.setTab("recipes");
      codexStore.discoverRecipe("epee_fer"); // Discover the recipe first
      codexStore.selectItem("epee_fer");

      const item = codexStore.selectedItem;

      expect(item).toBeDefined();
      expect(item).not.toBeNull();
      expect(item.id).toBe("epee_fer");
    });

    it("isDiscovered devrait vérifier si un matériau est découvert", () => {
      codexStore.discoverMaterial("fer");

      expect(codexStore.isDiscovered("fer", "material")).toBe(true);
      expect(codexStore.isDiscovered("adamantium", "material")).toBe(false);
    });

    it("isDiscovered devrait vérifier si une recette est découverte", () => {
      codexStore.discoverRecipe("epee_fer");

      expect(codexStore.isDiscovered("epee_fer", "recipe")).toBe(true);
      expect(codexStore.isDiscovered("dague_cuivre", "recipe")).toBe(false);
    });
  });

  // ========================================
  // ACTIONS TESTS - VIEW MANAGEMENT
  // ========================================

  describe("Actions de gestion de vue", () => {
    it("setTab devrait changer l'onglet", () => {
      codexStore.setTab("recipes");

      expect(codexStore.selectedTab).toBe("recipes");
    });

    it("setTab devrait réinitialiser les filtres", () => {
      codexStore.setCategory("metal");
      codexStore.setSearchQuery("fer");
      codexStore.selectItem("fer");

      codexStore.setTab("recipes");

      expect(codexStore.selectedCategory).toBe("all");
      expect(codexStore.searchQuery).toBe("");
      expect(codexStore.selectedItemId).toBeNull();
    });

    it("setCategory devrait changer la catégorie", () => {
      codexStore.setCategory("metal");

      expect(codexStore.selectedCategory).toBe("metal");
    });

    it("setSearchQuery devrait définir la requête de recherche", () => {
      codexStore.setSearchQuery("acier");

      expect(codexStore.searchQuery).toBe("acier");
    });

    it("selectItem devrait sélectionner un item", () => {
      codexStore.selectItem("fer");

      expect(codexStore.selectedItemId).toBe("fer");
    });

    it("clearSelection devrait désélectionner l'item", () => {
      codexStore.selectItem("fer");
      codexStore.clearSelection();

      expect(codexStore.selectedItemId).toBeNull();
    });
  });

  // ========================================
  // ACTIONS TESTS - UTILITY
  // ========================================

  describe("Actions utilitaires", () => {
    it("unlockAll devrait tout débloquer", () => {
      codexStore.unlockAll();

      expect(codexStore.discoveredMaterials.length).toBeGreaterThan(0);
      expect(codexStore.discoveredRecipes.length).toBeGreaterThan(0);
    });

    it("resetDiscoveries devrait réinitialiser les découvertes", () => {
      codexStore.discoverMaterial("acier");
      codexStore.discoverRecipe("epee_fer");

      codexStore.resetDiscoveries();

      // Should only have tier 1 materials (re-initialized)
      expect(codexStore.discoveredMaterials.length).toBeGreaterThan(0);
      expect(codexStore.discoveredRecipes.length).toBe(0);
    });

    it("reset devrait réinitialiser tout le store", () => {
      codexStore.discoverMaterial("acier");
      codexStore.setTab("recipes");
      codexStore.setCategory("arme");

      codexStore.reset();

      expect(codexStore.selectedTab).toBe("materials");
      expect(codexStore.selectedCategory).toBe("all");
      expect(codexStore.initialized).toBe(true); // Re-initialized
    });
  });
});
