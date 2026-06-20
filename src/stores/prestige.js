/**
 * PRESTIGE STORE — « Renaissance de la forge »
 *
 * Permet de réinitialiser la progression (niveau, écus, inventaire) en échange
 * d'« essence », une monnaie méta qui achète des bonus permanents :
 *  - vitesse : forge plus rapide
 *  - qualite : meilleure qualité de base
 *  - gain    : objets forgés plus rentables
 */

import { defineStore } from "pinia";
import { usePlayerStore } from "./player";
import { useInventoryStore } from "./inventory";
import { useCraftingStore } from "./crafting";
import { useNotificationsStore } from "./notifications";

// Niveau minimum requis pour renaître
const NIVEAU_MIN_RENAISSANCE = 20;
// Coût d'un niveau de bonus = base * (niveau actuel + 1)
const COUT_BONUS_BASE = 3;

export const usePrestigeStore = defineStore("prestige", {
  state: () => ({
    renaissances: 0,
    essence: 0,
    bonus: {
      vitesse: 0,
      qualite: 0,
      gain: 0,
    },
  }),

  getters: {
    // Essence gagnée en renaissant maintenant : +1 par tranche de 5 niveaux au-dessus du seuil
    essenceGagnable: () => (niveau) => {
      if (niveau < NIVEAU_MIN_RENAISSANCE) return 0;
      return 1 + Math.floor((niveau - NIVEAU_MIN_RENAISSANCE) / 5);
    },

    peutRenaitre: () => (niveau) => niveau >= NIVEAU_MIN_RENAISSANCE,

    // Coût du prochain niveau d'un bonus donné
    coutBonus(state) {
      return (type) => COUT_BONUS_BASE * (state.bonus[type] + 1);
    },

    // Forge plus rapide : -4 % par niveau, plancher à 50 %
    multiplicateurVitesse(state) {
      return Math.max(0.5, 1 - state.bonus.vitesse * 0.04);
    },

    // Bonus plat de qualité (+1 tous les 3 niveaux de bonus)
    bonusQualite(state) {
      return Math.floor(state.bonus.qualite / 3);
    },

    // Gain : +5 % de valeur par niveau
    multiplicateurGain(state) {
      return 1 + state.bonus.gain * 0.05;
    },
  },

  actions: {
    renaitre() {
      const playerStore = usePlayerStore();
      const notifStore = useNotificationsStore();

      if (playerStore.niveau < NIVEAU_MIN_RENAISSANCE) {
        notifStore.ajouterNotification({
          type: "error",
          message: `Niveau ${NIVEAU_MIN_RENAISSANCE} requis pour renaître (vous êtes niveau ${playerStore.niveau}).`,
        });
        return false;
      }

      const gain = this.essenceGagnable(playerStore.niveau);
      this.essence += gain;
      this.renaissances++;

      // Réinitialise la progression du joueur, l'inventaire et la forge en cours
      playerStore.reinitialiserProgression();
      useInventoryStore().viderInventaire();
      useCraftingStore().annulerForgeSilencieux();

      notifStore.ajouterNotification({
        type: "success",
        message: `🔥 Renaissance ! +${gain} essence (total ${this.essence}).`,
      });
      return true;
    },

    ameliorerBonus(type) {
      const notifStore = useNotificationsStore();
      if (!(type in this.bonus)) return false;

      const cout = this.coutBonus(type);
      if (this.essence < cout) {
        notifStore.ajouterNotification({
          type: "error",
          message: `Essence insuffisante (${cout} requise).`,
        });
        return false;
      }

      this.essence -= cout;
      this.bonus[type]++;
      notifStore.ajouterNotification({
        type: "success",
        message: `Bonus ${type} amélioré (niveau ${this.bonus[type]}).`,
      });
      return true;
    },
  },

  persist: {
    key: "emberanvil.prestige",
    storage: localStorage,
    paths: ["renaissances", "essence", "bonus"],
  },
});
