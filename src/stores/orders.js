/**
 * ORDERS STORE — Commandes clients (objectifs dynamiques)
 *
 * Des clients demandent un objet précis (recette + qualité minimale) contre une
 * récompense bonifiée. Génère un objectif court terme renouvelable. 100 % local :
 * les commandes sont tirées des recettes accessibles au niveau du joueur.
 */

import { defineStore } from "pinia";
import { usePlayerStore } from "./player";
import { useInventoryStore } from "./inventory";
import { useNotificationsStore } from "./notifications";
import { getRecipesByNiveau, getRecipeById } from "@/data/recipes";

const MAX_COMMANDES = 3;
const DUREE_MS = 24 * 60 * 60 * 1000; // 24 h

function tirerAleatoire(liste) {
  return liste[Math.floor(Math.random() * liste.length)];
}

export const useOrdersStore = defineStore("orders", {
  state: () => ({
    commandes: [], // { id, recipeId, qualiteMin, recompenseEcus, recompenseXp, expiration }
  }),

  getters: {
    // Une commande est livrable si l'inventaire contient un objet correspondant
    estLivrable: () => (commande) => {
      const inv = useInventoryStore();
      return inv.craftedItems.some(
        (item) => item.recipeId === commande.recipeId && item.qualite >= commande.qualiteMin,
      );
    },
  },

  actions: {
    _creerCommande() {
      const playerStore = usePlayerStore();
      const recettesDispo = getRecipesByNiveau(playerStore.niveau);
      if (!recettesDispo.length) return null;

      const recipe = tirerAleatoire(recettesDispo);
      // Qualité demandée : base, parfois +1 pour un défi (plafonnée à 5)
      const qualiteMin = Math.min(5, recipe.qualiteBase + (Math.random() > 0.6 ? 1 : 0));

      return {
        id: `cmd_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`,
        recipeId: recipe.id,
        qualiteMin,
        // Récompense bonifiée vs vente directe (+50 % écus, double XP)
        recompenseEcus: Math.floor(recipe.valeurVente * 1.5 * (qualiteMin / recipe.qualiteBase)),
        recompenseXp: recipe.xpGain * 2,
        expiration: Date.now() + DUREE_MS,
      };
    },

    // Retire les commandes expirées puis complète jusqu'à MAX_COMMANDES
    rafraichir() {
      const maintenant = Date.now();
      this.commandes = this.commandes.filter((c) => c.expiration > maintenant);
      while (this.commandes.length < MAX_COMMANDES) {
        const c = this._creerCommande();
        if (!c) break;
        this.commandes.push(c);
      }
    },

    livrer(commandeId) {
      const commande = this.commandes.find((c) => c.id === commandeId);
      if (!commande) return false;

      const inv = useInventoryStore();
      const notifStore = useNotificationsStore();
      const item = inv.craftedItems.find(
        (i) => i.recipeId === commande.recipeId && i.qualite >= commande.qualiteMin,
      );
      if (!item) {
        notifStore.ajouterNotification({
          type: "error",
          message: "Aucun objet correspondant dans l'inventaire.",
        });
        return false;
      }

      inv.supprimerObjet(item.id);
      const playerStore = usePlayerStore();
      playerStore.ajouterEcus(commande.recompenseEcus);
      playerStore.ajouterXP(commande.recompenseXp);

      const recipe = getRecipeById(commande.recipeId);
      notifStore.ajouterNotification({
        type: "success",
        message: `📦 Commande livrée (${recipe?.nom ?? ""}) : +${commande.recompenseEcus} écus, +${commande.recompenseXp} XP !`,
      });

      // Remplace la commande honorée
      this.commandes = this.commandes.filter((c) => c.id !== commandeId);
      this.rafraichir();
      return true;
    },
  },

  persist: {
    key: "emberanvil.orders",
    storage: localStorage,
    paths: ["commandes"],
  },
});
