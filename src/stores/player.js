import { defineStore } from "pinia";
import { useNotificationsStore } from "./notifications";

export const usePlayerStore = defineStore("player", {
  state: () => ({
    // Identité
    nom: "Thorin Forgepierre",
    titre: "Apprenti Forgeron",
    avatar: "swords",
    membreDepuis: new Date().toISOString(),

    // Progression
    niveau: 1,
    experience: 0,
    experienceMax: 1000,

    // Ressources
    ecus: 1250, // Monnaie principale
    or: 0, // Monnaie rare (pour upgrades facilities)

    // Statistiques
    stats: {
      objetsCrees: 0,
      valeurCreations: 0,
      heuresJeu: 0,
      rangMondial: 9999,
      materielUtilise: 0,
      recettesDebloquees: 0,
    },

    // Session (non persisté)
    _sessionStartTime: null,
  }),

  getters: {
    // Progression niveau en %
    progressionNiveau: (state) =>
      (state.experience / state.experienceMax) * 100,

    // Peut acheter quelque chose ?
    peutAcheter: (state) => (cout) => state.ecus >= cout,

    // Niveau suivant
    niveauSuivant: (state) => state.niveau + 1,

    // XP requise pour niveau suivant (formule exponentielle)
    experiencePourNiveauSuivant: (state) => {
      return Math.floor(1000 * Math.pow(1.5, state.niveau - 1));
    },

    // Titre selon niveau
    titreActuel: (state) => {
      if (state.niveau >= 50) return "Grand Maître Forgeron";
      if (state.niveau >= 40) return "Maître Forgeron";
      if (state.niveau >= 30) return "Forgeron Expert";
      if (state.niveau >= 20) return "Forgeron Confirmé";
      if (state.niveau >= 10) return "Forgeron";
      return "Apprenti Forgeron";
    },
  },

  actions: {
    // ========== GESTION DES ÉCUS ==========

    ajouterEcus(montant) {
      this.ecus += montant;
    },

    retirerEcus(montant) {
      if (this.ecus >= montant) {
        this.ecus -= montant;
        return true;
      }
      return false;
    },

    // ========== GESTION DE L'OR ==========

    ajouterOr(montant) {
      this.or += montant;
    },

    retirerOr(montant) {
      if (this.or >= montant) {
        this.or -= montant;
        return true;
      }
      return false;
    },

    // ========== UNIFIED CURRENCY METHODS ==========

    // Gagner de l'argent (écus ou or)
    gagner(montant, devise = "ecus") {
      if (devise === "or") {
        this.ajouterOr(montant);
      } else {
        this.ajouterEcus(montant);
      }
    },

    // Dépenser de l'argent (écus ou or)
    depenser(montant, devise = "ecus") {
      if (devise === "or") {
        return this.retirerOr(montant);
      } else {
        return this.retirerEcus(montant);
      }
    },

    // ========== GESTION DE L'XP ==========

    // Alias for consistency
    ajouterXP(montant) {
      this.ajouterExperience(montant);
    },

    ajouterExperience(montant) {
      this.experience += montant;
      this.verifierNiveauSuivant();
    },

    verifierNiveauSuivant() {
      while (this.experience >= this.experienceMax) {
        this.monterNiveau();
      }
    },

    monterNiveau() {
      this.niveau++;
      this.experience -= this.experienceMax;
      this.experienceMax = this.experiencePourNiveauSuivant;
      this.titre = this.titreActuel;

      // Récompenses de niveau
      const recompenseEcus = 100 * this.niveau;
      const recompenseOr = Math.floor(this.niveau / 5);

      this.ajouterEcus(recompenseEcus);
      if (recompenseOr > 0) {
        this.ajouterOr(recompenseOr);
      }

      // Notification de level up
      const notifications = useNotificationsStore();
      let recompenseText = `+${recompenseEcus} écus`;
      if (recompenseOr > 0) {
        recompenseText += `, +${recompenseOr} or`;
      }

      notifications.show(
        `🎉 Niveau ${this.niveau} ! ${this.titre} - ${recompenseText}`,
        "success",
        5000,
      );

      console.log(
        `🎉 NIVEAU ${this.niveau} ! +${recompenseEcus} écus, +${recompenseOr} or`,
      );
    },

    // ========== STATISTIQUES ==========

    incrementerStat(statName, montant = 1) {
      if (this.stats[statName] !== undefined) {
        this.stats[statName] += montant;
      }
    },

    // ========== TEMPS DE JEU ==========

    demarrerSession() {
      this._sessionStartTime = Date.now();
    },

    terminerSession() {
      if (this._sessionStartTime) {
        const duree = Date.now() - this._sessionStartTime;
        this.stats.heuresJeu += duree / (1000 * 60 * 60); // En heures
        delete this._sessionStartTime;
      }
    },
  },

  persist: {
    key: "emberanvil.player",
    paths: [
      "nom",
      "titre",
      "avatar",
      "membreDepuis",
      "niveau",
      "experience",
      "experienceMax",
      "ecus",
      "or",
      "stats",
    ], // Ne pas persister _sessionStartTime
  },
});
