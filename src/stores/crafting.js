/**
 * CRAFTING STORE - Gestion du système de forge
 */

import { defineStore } from "pinia";
import { usePlayerStore } from "./player";
import { useInventoryStore } from "./inventory";
import { useNotificationsStore } from "./notifications";
import { useCodexStore } from "./codex";
import { getRecipeById } from "@/data/recipes";

export const useCraftingStore = defineStore("crafting", {
  state: () => ({
    // État de la forge
    estEnCoursDeForge: false,
    recetteEnCours: null,
    progressionForge: 0, // 0-100
    tempsDebut: null,
    tempsFin: null,

    // Historique de crafting
    historique: [], // { recipeId, timestamp, qualite, xpGagne }

    // Statistiques
    stats: {
      totalObjetsForges: 0,
      meilleureQualite: 0,
      tempsForgeTotal: 0, // en secondes
      recettesFavorites: {}, // { recipeId: count }
    },
  }),

  getters: {
    /**
     * Temps restant en secondes
     */
    tempsRestant(state) {
      if (!state.estEnCoursDeForge || !state.tempsFin) return 0;
      const reste = Math.max(0, state.tempsFin - Date.now());
      return Math.ceil(reste / 1000);
    },

    /**
     * Recette la plus forgée
     */
    recetteFavorite(state) {
      if (Object.keys(state.stats.recettesFavorites).length === 0) return null;

      const [recipeId] = Object.entries(state.stats.recettesFavorites).sort(
        (a, b) => b[1] - a[1],
      )[0];

      return getRecipeById(recipeId);
    },

    /**
     * Historique récent (10 derniers)
     */
    historiqueRecent(state) {
      return state.historique.slice(-10).reverse();
    },

    /**
     * Peut démarrer un craft
     */
    peutDemarrerCraft(state) {
      return !state.estEnCoursDeForge;
    },
  },

  actions: {
    /**
     * Démarre le forgeage d'une recette
     */
    demarrerForge(recipeId) {
      const recipe = getRecipeById(recipeId);
      if (!recipe) {
        const notifStore = useNotificationsStore();
        notifStore.ajouterNotification({
          type: "error",
          message: "Recette introuvable",
        });
        return false;
      }

      // Vérifier si déjà en cours de forge
      if (this.estEnCoursDeForge) {
        const notifStore = useNotificationsStore();
        notifStore.ajouterNotification({
          type: "error",
          message: "Une forge est déjà en cours !",
        });
        return false;
      }

      const playerStore = usePlayerStore();
      const inventoryStore = useInventoryStore();

      // Vérifier le niveau
      if (playerStore.niveau < recipe.niveauRequis) {
        const notifStore = useNotificationsStore();
        notifStore.ajouterNotification({
          type: "error",
          message: `Niveau ${recipe.niveauRequis} requis (vous êtes niveau ${playerStore.niveau})`,
        });
        return false;
      }

      // Vérifier les matériaux
      for (const ingredient of recipe.ingredients) {
        if (
          !inventoryStore.hasEnough(ingredient.materialId, ingredient.quantite)
        ) {
          const notifStore = useNotificationsStore();
          notifStore.ajouterNotification({
            type: "error",
            message: `Matériau insuffisant : ${ingredient.materialId}`,
          });
          return false;
        }
      }

      // Retirer les matériaux
      for (const ingredient of recipe.ingredients) {
        inventoryStore.retirerMaterial(
          ingredient.materialId,
          ingredient.quantite,
        );
      }

      // Démarrer le forge
      const maintenant = Date.now();
      this.estEnCoursDeForge = true;
      this.recetteEnCours = recipe;
      this.progressionForge = 0;
      this.tempsDebut = maintenant;
      this.tempsFin = maintenant + recipe.tempsForge * 1000;

      const notifStore = useNotificationsStore();
      notifStore.ajouterNotification({
        type: "info",
        message: `Forgeage de ${recipe.nom} commencé !`,
      });

      // Démarrer la progression automatique
      this._demarrerProgression();

      return true;
    },

    /**
     * Met à jour la progression du forge (appelé par un interval)
     */
    _demarrerProgression() {
      const interval = setInterval(() => {
        if (!this.estEnCoursDeForge) {
          clearInterval(interval);
          return;
        }

        const maintenant = Date.now();
        const tempsEcoule = maintenant - this.tempsDebut;
        const tempTotal = this.tempsFin - this.tempsDebut;

        this.progressionForge = Math.min(100, (tempsEcoule / tempTotal) * 100);

        // Vérifier si terminé
        if (maintenant >= this.tempsFin) {
          clearInterval(interval);
          this.terminerForge();
        }
      }, 100); // Mise à jour toutes les 100ms
    },

    /**
     * Termine le forgeage et ajoute l'objet à l'inventaire
     */
    terminerForge() {
      if (!this.estEnCoursDeForge || !this.recetteEnCours) return;

      const recipe = this.recetteEnCours;
      const playerStore = usePlayerStore();
      const inventoryStore = useInventoryStore();
      const notifStore = useNotificationsStore();
      const codexStore = useCodexStore();

      // Calculer la qualité (base + bonus aléatoire + bonus niveau)
      const bonusNiveau = Math.floor(playerStore.niveau / 5); // +1 qualité tous les 5 niveaux
      const bonusAleatoire = Math.random() > 0.7 ? 1 : 0; // 30% de chance de +1
      const qualite = Math.min(
        5,
        recipe.qualiteBase + bonusNiveau + bonusAleatoire,
      );

      // Créer l'objet forgé
      const objetForge = {
        recipeId: recipe.id,
        nom: recipe.nom,
        categorie: recipe.categorie,
        qualite: qualite,
        valeur: Math.floor(recipe.valeurVente * (qualite / recipe.qualiteBase)),
        dateCreation: Date.now(),
        rarity: recipe.rarity,
      };

      // Ajouter à l'inventaire
      inventoryStore.ajouterObjetForge(objetForge);

      // Gagner XP
      const xpGagne = Math.floor(recipe.xpGain * (1 + qualite * 0.1));
      playerStore.ajouterXP(xpGagne);

      // Mettre à jour les stats du joueur
      playerStore.incrementerStat("objetsCrees");
      playerStore.incrementerStat("valeurCreations", objetForge.valeur);
      playerStore.incrementerStat("recettesDebloquees");

      // Découvrir la recette et ses ingrédients dans le codex
      codexStore.autoDiscoverFromCraft(recipe.id);

      // Mettre à jour les stats
      this.stats.totalObjetsForges++;
      this.stats.meilleureQualite = Math.max(
        this.stats.meilleureQualite,
        qualite,
      );
      this.stats.tempsForgeTotal += recipe.tempsForge;
      this.stats.recettesFavorites[recipe.id] =
        (this.stats.recettesFavorites[recipe.id] || 0) + 1;

      // Ajouter à l'historique
      this.historique.push({
        recipeId: recipe.id,
        nom: recipe.nom,
        timestamp: Date.now(),
        qualite: qualite,
        xpGagne: xpGagne,
      });

      // Notification de succès
      const etoiles = "⭐".repeat(qualite);
      notifStore.ajouterNotification({
        type: "success",
        message: `${recipe.nom} forgé ! Qualité: ${etoiles} (+${xpGagne} XP)`,
      });

      // Notification de découverte codex
      notifStore.ajouterNotification({
        type: "info",
        message: `📖 Recette ajoutée au Codex : ${recipe.nom}`,
      });

      // Réinitialiser l'état
      this.estEnCoursDeForge = false;
      this.recetteEnCours = null;
      this.progressionForge = 0;
      this.tempsDebut = null;
      this.tempsFin = null;
    },

    /**
     * Annule le forgeage en cours (perd les matériaux)
     */
    annulerForge() {
      if (!this.estEnCoursDeForge) return;

      const notifStore = useNotificationsStore();
      notifStore.ajouterNotification({
        type: "warning",
        message: "Forgeage annulé. Matériaux perdus.",
      });

      this.estEnCoursDeForge = false;
      this.recetteEnCours = null;
      this.progressionForge = 0;
      this.tempsDebut = null;
      this.tempsFin = null;
    },

    /**
     * Réinitialise les statistiques
     */
    reinitialiserStats() {
      this.stats = {
        totalObjetsForges: 0,
        meilleureQualite: 0,
        tempsForgeTotal: 0,
        recettesFavorites: {},
      };
      this.historique = [];
    },
  },

  persist: {
    key: "emberanvil.crafting",
    storage: localStorage,
    paths: ["historique", "stats"],
  },
});
