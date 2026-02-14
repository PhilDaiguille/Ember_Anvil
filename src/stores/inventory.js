import { defineStore } from "pinia";
import { MATERIALS } from "@/data/materials";

export const useInventoryStore = defineStore("inventory", {
  state: () => ({
    // Matériaux bruts : { materialId: quantite }
    materials: {},

    // Objets forgés : array d'objets
    craftedItems: [],

    // Capacité
    capaciteMax: 500,

    // Historique des transactions (50 dernières)
    transactions: [],
  }),

  getters: {
    // Capacité utilisée
    capaciteUtilisee: (state) => {
      const materialsCount = Object.values(state.materials).reduce(
        (sum, qty) => sum + qty,
        0,
      );
      const itemsCount = state.craftedItems.length;
      return materialsCount + itemsCount;
    },

    // Pourcentage de remplissage
    pourcentageRemplissage() {
      return (this.capaciteUtilisee / this.capaciteMax) * 100;
    },

    // Inventaire plein ?
    isFull() {
      return this.capaciteUtilisee >= this.capaciteMax;
    },

    // Valeur totale de l'inventaire
    valeurTotale: (state) => {
      // Valeur des matériaux (prix de vente)
      const valeursMateriaux = Object.entries(state.materials).reduce(
        (sum, [id, qty]) => {
          const material = MATERIALS[id];
          return sum + (material?.prixVente || 0) * qty;
        },
        0,
      );

      // Valeur des objets forgés
      const valeursObjets = state.craftedItems.reduce(
        (sum, item) => sum + (item.valeur || 0),
        0,
      );

      return valeursMateriaux + valeursObjets;
    },

    // Obtenir quantité d'un matériau
    getQuantite: (state) => (materialId) => {
      return state.materials[materialId] || 0;
    },

    // Vérifier si assez de matériaux
    hasEnough: (state) => (materialId, quantite) => {
      return (state.materials[materialId] || 0) >= quantite;
    },

    // Liste des matériaux possédés (pour affichage)
    materialsList: (state) => {
      return Object.entries(state.materials)
        .filter(([id, qty]) => qty > 0)
        .map(([id, qty]) => ({
          ...MATERIALS[id],
          quantite: qty,
        }))
        .sort((a, b) => {
          // Trier par tier puis nom
          if (a.tier !== b.tier) return b.tier - a.tier;
          return a.nom.localeCompare(b.nom);
        });
    },

    // Objets forgés triés par qualité
    craftedItemsSorted: (state) => {
      return [...state.craftedItems].sort((a, b) => {
        if (b.qualite !== a.qualite) return b.qualite - a.qualite;
        return b.dateCreation - a.dateCreation;
      });
    },
  },

  actions: {
    // ========== GESTION DES MATÉRIAUX ==========

    ajouterMaterial(materialId, quantite = 1) {
      if (!this.materials[materialId]) {
        this.materials[materialId] = 0;
      }
      this.materials[materialId] += quantite;

      // Historique
      this.ajouterTransaction({
        type: "material_add",
        materialId,
        quantite,
        timestamp: Date.now(),
      });
    },

    retirerMaterial(materialId, quantite = 1) {
      if (this.hasEnough(materialId, quantite)) {
        this.materials[materialId] -= quantite;

        // Supprimer si quantité = 0
        if (this.materials[materialId] === 0) {
          delete this.materials[materialId];
        }

        this.ajouterTransaction({
          type: "material_remove",
          materialId,
          quantite,
          timestamp: Date.now(),
        });

        return true;
      }
      return false;
    },

    // ========== GESTION DES OBJETS FORGÉS ==========

    ajouterObjet(objet) {
      // Vérifier capacité
      if (this.isFull) {
        console.warn("⚠️ Inventaire plein!");
        return false;
      }

      // Générer ID unique
      const id = `item_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      this.craftedItems.push({
        ...objet,
        id,
        dateCreation: Date.now(),
      });

      this.ajouterTransaction({
        type: "item_craft",
        itemId: id,
        timestamp: Date.now(),
      });

      return true;
    },

    // Alias pour compatibilité avec crafting store
    ajouterObjetForge(objet) {
      return this.ajouterObjet(objet);
    },

    supprimerObjet(itemId) {
      const index = this.craftedItems.findIndex((item) => item.id === itemId);
      if (index !== -1) {
        this.craftedItems.splice(index, 1);

        this.ajouterTransaction({
          type: "item_delete",
          itemId,
          timestamp: Date.now(),
        });

        return true;
      }
      return false;
    },

    // ========== HISTORIQUE ==========

    ajouterTransaction(transaction) {
      this.transactions.unshift(transaction);
      // Garder seulement les 50 dernières
      if (this.transactions.length > 50) {
        this.transactions = this.transactions.slice(0, 50);
      }
    },

    // ========== UTILITAIRES ==========

    // Augmenter capacité (via quête ou achat)
    augmenterCapacite(montant) {
      this.capaciteMax += montant;
    },
  },

  persist: {
    key: "emberanvil.inventory",
  },
});
