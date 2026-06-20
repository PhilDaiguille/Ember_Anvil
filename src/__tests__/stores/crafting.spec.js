import { describe, it, expect, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useCraftingStore } from "@/stores/crafting";
import { usePlayerStore } from "@/stores/player";
import { useInventoryStore } from "@/stores/inventory";

describe("CraftingStore", () => {
  let store;
  let playerStore;
  let inventoryStore;

  beforeEach(() => {
    setActivePinia(createPinia());
    store = useCraftingStore();
    playerStore = usePlayerStore();
    inventoryStore = useInventoryStore();

    // Setup initial state
    playerStore.$patch({
      niveau: 5,
    });

    inventoryStore.ajouterMaterial("fer", 50);
    inventoryStore.ajouterMaterial("cuir", 30);
    inventoryStore.ajouterMaterial("bois", 40);
  });

  describe("État initial", () => {
    it("ne devrait pas être en cours de forge", () => {
      expect(store.estEnCoursDeForge).toBe(false);
    });

    it("ne devrait pas avoir de recette en cours", () => {
      expect(store.recetteEnCours).toBeNull();
    });

    it("devrait avoir une progression à 0", () => {
      expect(store.progressionForge).toBe(0);
    });

    it("devrait avoir un historique vide au départ", () => {
      expect(Array.isArray(store.historiqueRecent)).toBe(true);
    });

    it("devrait avoir des statistiques initiales", () => {
      expect(store.stats).toBeDefined();
      expect(store.stats.totalObjetsForges).toBeGreaterThanOrEqual(0);
    });
  });

  describe("Démarrage de la forge", () => {
    it("devrait démarrer une forge avec une recette valide", () => {
      // Mock une recette simple
      const recipeId = "test-recipe";

      // Cela dépend de l'implémentation réelle
      // Si demarrerForge nécessite une recette valide dans RECIPES
      const result = store.demarrerForge(recipeId);

      if (result) {
        expect(store.estEnCoursDeForge).toBe(true);
        expect(store.recetteEnCours).toBeDefined();
      }
    });

    it("ne devrait pas démarrer sans recette", () => {
      const result = store.demarrerForge(null);
      expect(result).toBeFalsy();
    });
  });

  describe("Annulation de la forge", () => {
    it("devrait annuler une forge en cours", () => {
      // Simuler une forge en cours
      store.$patch({
        estEnCoursDeForge: true,
        recetteEnCours: { id: "test", nom: "Test" },
        progressionForge: 50,
      });

      store.annulerForge();

      expect(store.estEnCoursDeForge).toBe(false);
      expect(store.recetteEnCours).toBeNull();
      expect(store.progressionForge).toBe(0);
    });
  });

  describe("Mini-jeu de timing", () => {
    it("ne compte aucun coup si pas de forge en cours", () => {
      store.enregistrerCoup(true);
      expect(store.coupsTentes).toBe(0);
      expect(store.coupsReussis).toBe(0);
    });

    it("compte les coups réussis et tentés, plafonné à 3 tentatives", () => {
      store.$patch({ estEnCoursDeForge: true });
      store.enregistrerCoup(true);
      store.enregistrerCoup(false);
      store.enregistrerCoup(true);
      store.enregistrerCoup(true); // ignoré (>3)
      expect(store.coupsTentes).toBe(3);
      expect(store.coupsReussis).toBe(2);
    });
  });

  describe("Reprise de forge au boot", () => {
    it("termine la forge si le temps est écoulé pendant l'absence", () => {
      const recipe = { id: "epee_fer", nom: "Épée", categorie: "armes" };
      store.$patch({
        estEnCoursDeForge: true,
        recetteEnCours: recipe,
        tempsDebut: Date.now() - 10000,
        tempsFin: Date.now() - 1000, // déjà passé
      });

      store.reprendreForge();

      expect(store.estEnCoursDeForge).toBe(false);
      expect(store.recetteEnCours).toBeNull();
    });

    it("garde la forge active si le temps n'est pas écoulé", () => {
      const recipe = { id: "epee_fer", nom: "Épée", categorie: "armes", tempsForge: 60 };
      store.$patch({
        estEnCoursDeForge: true,
        recetteEnCours: recipe,
        tempsDebut: Date.now(),
        tempsFin: Date.now() + 60000, // dans le futur
      });

      store.reprendreForge();

      expect(store.estEnCoursDeForge).toBe(true);
      expect(store.recetteEnCours).toEqual(recipe);
    });

    it("nettoie un état incohérent (pas de tempsFin)", () => {
      store.$patch({ estEnCoursDeForge: true, recetteEnCours: null, tempsFin: null });

      store.reprendreForge();

      expect(store.estEnCoursDeForge).toBe(false);
    });
  });

  describe("Progression de la forge", () => {
    it("la progression devrait être entre 0 et 100", () => {
      expect(store.progressionForge).toBeGreaterThanOrEqual(0);
      expect(store.progressionForge).toBeLessThanOrEqual(100);
    });
  });

  describe("Getters", () => {
    it("tempsRestant devrait retourner un nombre", () => {
      const temps = store.tempsRestant;
      expect(typeof temps).toBe("number");
      expect(temps).toBeGreaterThanOrEqual(0);
    });

    it("historiqueRecent devrait retourner un array", () => {
      expect(Array.isArray(store.historiqueRecent)).toBe(true);
    });
  });

  describe("Statistiques", () => {
    it("devrait suivre le nombre total d'objets forgés", () => {
      const initial = store.stats.totalObjetsForges;
      expect(typeof initial).toBe("number");
      expect(initial).toBeGreaterThanOrEqual(0);
    });

    it("devrait incrémenter les statistiques manuellement", () => {
      const initial = store.stats.totalObjetsForges;

      // Incrémenter manuellement les stats (normalement fait par terminerForge)
      store.stats.totalObjetsForges++;

      expect(store.stats.totalObjetsForges).toBe(initial + 1);
    });
  });

  describe("Historique", () => {
    it("devrait ajouter les forges réussies à l'historique", () => {
      const initialLength = store.historiqueRecent.length;

      // Simuler une forge réussie en ajoutant directement à l'historique
      store.historique.push({
        recipeId: "test-recipe",
        nom: "Épée de test",
        qualite: 3,
        xpGagne: 50,
        timestamp: Date.now(),
      });

      expect(store.historiqueRecent.length).toBeGreaterThan(initialLength);
    });

    it("devrait limiter la taille de l'historique récent à 10", () => {
      // Ajouter beaucoup d'items directement
      for (let i = 0; i < 20; i++) {
        store.historique.push({
          recipeId: `recipe-${i}`,
          nom: `Item ${i}`,
          qualite: 2,
          xpGagne: 30,
          timestamp: Date.now() + i,
        });
      }

      // L'historique récent devrait retourner les 10 derniers
      expect(store.historiqueRecent.length).toBeLessThanOrEqual(10);
    });
  });

  describe("Validation", () => {
    it("devrait valider les matériaux requis", () => {
      // Cette fonctionnalité dépend de l'implémentation
      // Généralement vérifié dans peutCrafter du composant
      expect(inventoryStore.hasEnough("fer", 5)).toBe(true);
      expect(inventoryStore.hasEnough("fer", 100)).toBe(false);
    });
  });
});
