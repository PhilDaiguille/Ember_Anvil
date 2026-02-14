/**
 * CODEX/WIKI STORE
 *
 * Manages encyclopedia/codex state:
 * - Discovery tracking for materials and recipes
 * - Search and filter functionality
 * - Detailed view management
 * - Completion tracking
 */

import { defineStore } from "pinia";
import { MATERIALS, MATERIALS_ARRAY } from "@/data/materials";
import { RECIPES_BY_ID, RECIPES } from "@/data/recipes";

export const useCodexStore = defineStore("codex", {
  state: () => ({
    // Discovery tracking
    discoveredMaterials: [], // Array of material IDs
    discoveredRecipes: [], // Array of recipe IDs

    // View state
    selectedTab: "materials", // "materials" | "recipes"
    selectedCategory: "all", // For filtering
    searchQuery: "",
    selectedItemId: null, // For detailed view

    // First time initialization
    initialized: false,
  }),

  getters: {
    // ========== MATERIALS GETTERS ==========

    // All materials with discovery status
    allMaterialsWithStatus: (state) => {
      return MATERIALS_ARRAY.map((material) => ({
        ...material,
        discovered: state.discoveredMaterials.includes(material.id),
      }));
    },

    // Discovered materials only
    discoveredMaterialsList: (state) => {
      return MATERIALS_ARRAY.filter((material) =>
        state.discoveredMaterials.includes(material.id),
      ).sort((a, b) => {
        // Sort by tier then name
        if (a.tier !== b.tier) return a.tier - b.tier;
        return a.nom.localeCompare(b.nom);
      });
    },

    // Filtered and searched materials
    filteredMaterials: (state) => {
      let materials = state.discoveredMaterialsList;

      // Filter by category (materials use 'type' property)
      if (state.selectedCategory !== "all") {
        materials = materials.filter((m) => m.type === state.selectedCategory);
      }

      // Search filter
      if (state.searchQuery) {
        const query = state.searchQuery.toLowerCase();
        materials = materials.filter(
          (m) =>
            m.nom.toLowerCase().includes(query) ||
            m.type.toLowerCase().includes(query) ||
            m.description.toLowerCase().includes(query),
        );
      }

      return materials;
    },

    // Materials discovery stats
    materialsDiscoveryStats: (state) => {
      const total = MATERIALS_ARRAY.length;
      const discovered = state.discoveredMaterials.length;
      const percentage = total > 0 ? Math.round((discovered / total) * 100) : 0;

      return {
        discovered,
        total,
        percentage,
        remaining: total - discovered,
      };
    },

    // Materials by category (for discovered ones) - uses 'type' property
    materialsByCategory: (state) => {
      const categories = {};
      state.discoveredMaterialsList.forEach((material) => {
        const cat = material.type;
        if (!categories[cat]) {
          categories[cat] = [];
        }
        categories[cat].push(material);
      });
      return categories;
    },

    // ========== RECIPES GETTERS ==========

    // All recipes with discovery status
    allRecipesWithStatus: (state) => {
      return RECIPES.map((recipe) => ({
        ...recipe,
        discovered: state.discoveredRecipes.includes(recipe.id),
      }));
    },

    // Discovered recipes only
    discoveredRecipesList: (state) => {
      return RECIPES.filter((recipe) =>
        state.discoveredRecipes.includes(recipe.id),
      ).sort((a, b) => {
        // Sort by level requirement then name
        if (a.niveauRequis !== b.niveauRequis)
          return a.niveauRequis - b.niveauRequis;
        return a.nom.localeCompare(b.nom);
      });
    },

    // Filtered and searched recipes
    filteredRecipes: (state) => {
      let recipes = state.discoveredRecipesList;

      // Filter by category
      if (state.selectedCategory !== "all") {
        recipes = recipes.filter((r) => r.categorie === state.selectedCategory);
      }

      // Search filter
      if (state.searchQuery) {
        const query = state.searchQuery.toLowerCase();
        recipes = recipes.filter(
          (r) =>
            r.nom.toLowerCase().includes(query) ||
            r.description.toLowerCase().includes(query) ||
            r.categorie.toLowerCase().includes(query),
        );
      }

      return recipes;
    },

    // Recipes discovery stats
    recipesDiscoveryStats: (state) => {
      const total = RECIPES.length;
      const discovered = state.discoveredRecipes.length;
      const percentage = total > 0 ? Math.round((discovered / total) * 100) : 0;

      return {
        discovered,
        total,
        percentage,
        remaining: total - discovered,
      };
    },

    // Recipes by category (for discovered ones)
    recipesByCategory: (state) => {
      const categories = {};
      state.discoveredRecipesList.forEach((recipe) => {
        const cat = recipe.categorie;
        if (!categories[cat]) {
          categories[cat] = [];
        }
        categories[cat].push(recipe);
      });
      return categories;
    },

    // ========== GLOBAL GETTERS ==========

    // Overall completion percentage
    globalCompletionRate: (state) => {
      const totalItems = MATERIALS_ARRAY.length + RECIPES.length;
      const discoveredItems =
        state.discoveredMaterials.length + state.discoveredRecipes.length;
      return totalItems > 0
        ? Math.round((discoveredItems / totalItems) * 100)
        : 0;
    },

    // Get selected item (material or recipe)
    selectedItem: (state) => {
      if (!state.selectedItemId) return null;

      if (state.selectedTab === "materials") {
        return MATERIALS[state.selectedItemId] || null;
      } else {
        return RECIPES_BY_ID[state.selectedItemId] || null;
      }
    },

    // Check if item is discovered
    isDiscovered:
      (state) =>
      (itemId, type = "material") => {
        if (type === "material") {
          return state.discoveredMaterials.includes(itemId);
        } else {
          return state.discoveredRecipes.includes(itemId);
        }
      },

    // Available categories for current tab
    availableCategories: (state) => {
      if (state.selectedTab === "materials") {
        // Get unique categories from discovered materials (uses 'type' property)
        const categories = new Set();
        state.discoveredMaterialsList.forEach((m) => {
          if (m.type) categories.add(m.type);
        });
        return ["all", ...Array.from(categories)];
      } else {
        // Get unique categories from discovered recipes (uses 'categorie' property)
        const categories = new Set();
        state.discoveredRecipesList.forEach((r) => {
          if (r.categorie) categories.add(r.categorie);
        });
        return ["all", ...Array.from(categories)];
      }
    },
  },

  actions: {
    // ========== INITIALIZATION ==========

    initialize() {
      if (this.initialized) return;

      // Auto-discover basic materials (tier 1) on first launch
      if (this.discoveredMaterials.length === 0) {
        MATERIALS_ARRAY.filter((m) => m.tier === 1).forEach((material) => {
          this.discoverMaterial(material.id);
        });
      }

      this.initialized = true;
    },

    // ========== DISCOVERY ACTIONS ==========

    discoverMaterial(materialId) {
      if (!this.discoveredMaterials.includes(materialId)) {
        this.discoveredMaterials.push(materialId);
        return true;
      }
      return false;
    },

    discoverRecipe(recipeId) {
      if (!this.discoveredRecipes.includes(recipeId)) {
        this.discoveredRecipes.push(recipeId);
        return true;
      }
      return false;
    },

    // Discover multiple items at once
    discoverMaterials(materialIds) {
      materialIds.forEach((id) => this.discoverMaterial(id));
    },

    discoverRecipes(recipeIds) {
      recipeIds.forEach((id) => this.discoverRecipe(id));
    },

    // Auto-discover based on game actions
    autoDiscoverFromPurchase(materialId) {
      return this.discoverMaterial(materialId);
    },

    autoDiscoverFromCraft(recipeId) {
      this.discoverRecipe(recipeId);

      // Also discover all ingredients used
      const recipe = RECIPES_BY_ID[recipeId];
      if (recipe && recipe.ingredients) {
        recipe.ingredients.forEach((ingredient) => {
          this.discoverMaterial(ingredient.materialId);
        });
      }
    },

    // ========== VIEW ACTIONS ==========

    setTab(tab) {
      this.selectedTab = tab;
      this.selectedCategory = "all";
      this.searchQuery = "";
      this.selectedItemId = null;
    },

    setCategory(category) {
      this.selectedCategory = category;
    },

    setSearchQuery(query) {
      this.searchQuery = query;
    },

    selectItem(itemId) {
      this.selectedItemId = itemId;
    },

    clearSelection() {
      this.selectedItemId = null;
    },

    // ========== UTILITY ACTIONS ==========

    // Unlock all (for testing/debugging)
    unlockAll() {
      this.discoveredMaterials = MATERIALS_ARRAY.map((m) => m.id);
      this.discoveredRecipes = RECIPES.map((r) => r.id);
    },

    // Reset all discoveries
    resetDiscoveries() {
      this.discoveredMaterials = [];
      this.discoveredRecipes = [];
      this.selectedItemId = null;
      this.initialize(); // Re-discover tier 1 materials
    },

    reset() {
      this.$reset();
      this.initialize();
    },
  },

  persist: true,
});
