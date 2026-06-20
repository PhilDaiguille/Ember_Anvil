/**
 * COLLECTIONS STORE — Suivi des panoplies et de leurs bonus passifs.
 *
 * L'état de complétion se déduit du codex (recettes découvertes = forgées au moins
 * une fois) : aucun état propre à persister.
 */

import { defineStore } from "pinia";
import { useCodexStore } from "./codex";
import { COLLECTIONS } from "@/data/collections";

export const useCollectionsStore = defineStore("collections", {
  getters: {
    // Chaque collection enrichie de sa progression et de son statut
    collectionsAvecStatut() {
      const codex = useCodexStore();
      return COLLECTIONS.map((c) => {
        const obtenues = c.recipeIds.filter((id) => codex.discoveredRecipes.includes(id));
        return {
          ...c,
          obtenues: obtenues.length,
          total: c.recipeIds.length,
          complete: obtenues.length === c.recipeIds.length,
        };
      });
    },

    collectionsCompletes() {
      return this.collectionsAvecStatut.filter((c) => c.complete);
    },

    // Bonus agrégés des collections complétées
    multiplicateurGain() {
      return this.collectionsCompletes
        .filter((c) => c.bonus.type === "gain")
        .reduce((m, c) => m + c.bonus.valeur, 1);
    },

    multiplicateurVitesse() {
      const reduction = this.collectionsCompletes
        .filter((c) => c.bonus.type === "vitesse")
        .reduce((r, c) => r + c.bonus.valeur, 0);
      return Math.max(0.5, 1 - reduction);
    },

    bonusQualite() {
      return this.collectionsCompletes
        .filter((c) => c.bonus.type === "qualite")
        .reduce((b, c) => b + c.bonus.valeur, 0);
    },
  },
});
