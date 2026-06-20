/**
 * CRAFTING STORE - Gestion du système de forge
 */

import { defineStore } from "pinia";
import { usePlayerStore } from "./player";
import { useInventoryStore } from "./inventory";
import { useNotificationsStore } from "./notifications";
import { useCodexStore } from "./codex";
import { useWorkshopStore } from "./workshop";
import { usePrestigeStore } from "./prestige";
import { useCollectionsStore } from "./collections";
import { getBonusQualiteEvent, getMultiplicateurXP } from "@/shared/utils/events";
import { roulerAffixe } from "@/data/affixes";
import { getRecipeById } from "@/data/recipes";

export const useCraftingStore = defineStore("crafting", {
  state: () => ({
    // État de la forge
    estEnCoursDeForge: false,
    recetteEnCours: null,
    progressionForge: 0, // 0-100
    tempsDebut: null,
    tempsFin: null,

    // Mini-jeu de timing (frappes parfaites) — optionnel, améliore la qualité
    coupsReussis: 0,
    coupsTentes: 0,

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
     * Reprend une forge persistée au démarrage de l'app.
     * Si le temps est écoulé (ex: onglet fermé pendant le craft) → on termine.
     * Sinon on relance la boucle de progression.
     */
    reprendreForge() {
      if (!this.estEnCoursDeForge || !this.recetteEnCours || !this.tempsFin) {
        // État incohérent : on nettoie par sécurité
        this.estEnCoursDeForge = false;
        this.recetteEnCours = null;
        this.progressionForge = 0;
        this.tempsDebut = null;
        this.tempsFin = null;
        this.coupsReussis = 0;
        this.coupsTentes = 0;
        return;
      }

      if (Date.now() >= this.tempsFin) {
        this.terminerForge();
      } else {
        this._demarrerProgression();
      }
    },

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
        if (!inventoryStore.hasEnough(ingredient.materialId, ingredient.quantite)) {
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
        inventoryStore.retirerMaterial(ingredient.materialId, ingredient.quantite);
      }

      // Démarrer le forge
      // Bonus prestige + collections : forge plus rapide
      const tempsForge =
        recipe.tempsForge *
        usePrestigeStore().multiplicateurVitesse *
        useCollectionsStore().multiplicateurVitesse;

      const maintenant = Date.now();
      this.estEnCoursDeForge = true;
      this.recetteEnCours = recipe;
      this.progressionForge = 0;
      this.tempsDebut = maintenant;
      this.tempsFin = maintenant + tempsForge * 1000;
      this.coupsReussis = 0;
      this.coupsTentes = 0;

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
     * Enregistre une frappe du mini-jeu de timing.
     * Max 3 frappes comptabilisées par forge ; chaque réussite améliore la qualité
     * et réduit le risque d'échec. Entièrement optionnel.
     */
    enregistrerCoup(reussi) {
      if (!this.estEnCoursDeForge) return;
      if (this.coupsTentes >= 3) return;
      this.coupsTentes++;
      if (reussi) this.coupsReussis++;
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

      // Calculer la qualité (base + bonus niveau + bonus timing + aléatoire)
      const bonusNiveau = Math.floor(playerStore.niveau / 5); // +1 qualité tous les 5 niveaux
      const bonusAleatoire = Math.random() > 0.7 ? 1 : 0; // 30% de chance de +1
      const bonusTiming = this.coupsReussis >= 3 ? 2 : this.coupsReussis >= 1 ? 1 : 0;

      // Risque d'échec : recettes plus dures (qualité de base élevée) ratent plus souvent.
      // Atténué par les frappes parfaites et la Station de Trempage active.
      const workshopStore = useWorkshopStore();
      const trempageActive = workshopStore.facilities?.trempage?.actif ? 0.1 : 0;
      const chanceEchec = Math.max(
        0,
        (recipe.qualiteBase - 1) * 0.05 - this.coupsReussis * 0.06 - trempageActive,
      );
      const echec = Math.random() < chanceEchec;
      const malusEchec = echec ? -2 : 0;

      // Bonus prestige + collections : qualité plate + rentabilité
      const prestigeStore = usePrestigeStore();
      const collectionsStore = useCollectionsStore();
      const qualite = Math.max(
        1,
        Math.min(
          5,
          recipe.qualiteBase +
            bonusNiveau +
            bonusAleatoire +
            bonusTiming +
            malusEchec +
            prestigeStore.bonusQualite +
            collectionsStore.bonusQualite +
            getBonusQualiteEvent(),
        ),
      );

      // Affixe aléatoire (modifie la valeur)
      const affixe = roulerAffixe(qualite);
      const multiplicateurAffixe = affixe ? affixe.multiplicateurValeur : 1;

      // Créer l'objet forgé
      const objetForge = {
        recipeId: recipe.id,
        nom: recipe.nom,
        categorie: recipe.categorie,
        qualite: qualite,
        affixe: affixe ? { id: affixe.id, nom: affixe.nom } : null,
        valeur: Math.floor(
          recipe.valeurVente *
            (qualite / recipe.qualiteBase) *
            prestigeStore.multiplicateurGain *
            collectionsStore.multiplicateurGain *
            multiplicateurAffixe,
        ),
        dateCreation: Date.now(),
        rarity: recipe.rarity,
      };

      // Ajouter à l'inventaire
      inventoryStore.ajouterObjetForge(objetForge);

      // Gagner XP (événement du jour : multiplicateur éventuel)
      const xpGagne = Math.floor(recipe.xpGain * (1 + qualite * 0.1) * getMultiplicateurXP());
      playerStore.ajouterXP(xpGagne);

      // Mettre à jour les stats du joueur
      playerStore.incrementerStat("objetsCrees");
      playerStore.incrementerStat("valeurCreations", objetForge.valeur);
      playerStore.incrementerStat("recettesDebloquees");

      // Découvrir la recette et ses ingrédients dans le codex
      codexStore.autoDiscoverFromCraft(recipe.id);

      // Mettre à jour les stats
      this.stats.totalObjetsForges++;
      this.stats.meilleureQualite = Math.max(this.stats.meilleureQualite, qualite);
      this.stats.tempsForgeTotal += recipe.tempsForge;
      this.stats.recettesFavorites[recipe.id] = (this.stats.recettesFavorites[recipe.id] || 0) + 1;

      // Ajouter à l'historique
      this.historique.push({
        recipeId: recipe.id,
        nom: recipe.nom,
        timestamp: Date.now(),
        qualite: qualite,
        xpGagne: xpGagne,
      });

      // Notification de résultat (une seule, découverte codex incluse)
      const etoiles = "⭐".repeat(qualite);
      const prefixe = echec
        ? "⚠️ Forge ratée :"
        : bonusTiming > 0
          ? `🔨 Frappes parfaites (+${bonusTiming}) !`
          : `${recipe.nom} forgé !`;
      const mentionAffixe = affixe ? ` · ✨ ${affixe.nom}` : "";
      notifStore.ajouterNotification({
        type: echec ? "warning" : "success",
        message: `${prefixe} ${recipe.nom} · Qualité: ${etoiles}${mentionAffixe} (+${xpGagne} XP) · 📖 ajouté au Codex`,
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
     * Annule la forge sans notification ni perte signalée (utilisé par le prestige).
     */
    annulerForgeSilencieux() {
      this.estEnCoursDeForge = false;
      this.recetteEnCours = null;
      this.progressionForge = 0;
      this.tempsDebut = null;
      this.tempsFin = null;
      this.coupsReussis = 0;
      this.coupsTentes = 0;
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
    paths: [
      "historique",
      "stats",
      // État de la forge persisté pour survivre au refresh / progression hors-ligne
      "estEnCoursDeForge",
      "recetteEnCours",
      "progressionForge",
      "tempsDebut",
      "tempsFin",
    ],
  },
});
