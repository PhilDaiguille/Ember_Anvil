/**
 * WORKSHOP STORE
 *
 * Manages workshop state including:
 * - Tools upgrades (4 tools with 10 levels each)
 * - Facilities activation/upgrades (3 facilities with 5 levels each)
 * - Quests tracking and completion
 * - Synergies between tools and facilities
 * - Activity history
 */

import { defineStore } from "pinia";
import { TOOLS, TOOLS_ARRAY } from "@/data/tools";
import { FACILITIES, FACILITIES_ARRAY } from "@/data/facilities";
import { getAllQuestsInitialState } from "@/data/quests";
import { usePlayerStore } from "./player";
import { useNotificationsStore } from "./notifications";

export const useWorkshopStore = defineStore("workshop", {
  state: () => ({
    // Tools state: { toolId: { niveau, pouvoir, coutUpgrade } }
    tools: {},

    // Facilities state: { facilityId: { niveau, actif, bonusProductivite, coutUpgrade } }
    facilities: {},

    // Quests state (array of quest objects with progression)
    quests: [],

    // Activity history (last 5 upgrades)
    historique: [],

    // First time initialization flag
    initialized: false,
  }),

  getters: {
    // ========== TOOLS GETTERS ==========

    // Get tool by ID with full data
    getTool: (state) => (toolId) => {
      if (!state.tools[toolId]) return null;
      const toolData = TOOLS[toolId];
      return {
        ...toolData,
        ...state.tools[toolId],
      };
    },

    // Get all tools as array
    allTools: (state) => {
      return TOOLS_ARRAY.map((toolData) => ({
        ...toolData,
        ...state.tools[toolData.id],
      }));
    },

    // Check if tool can be upgraded
    canUpgradeTool: (state) => (toolId) => {
      const tool = state.tools[toolId];
      const toolData = TOOLS[toolId];
      const playerStore = usePlayerStore();

      if (!tool || !toolData) return false;
      if (tool.niveau >= toolData.niveauMax) return false;
      if (playerStore.ecus < tool.coutUpgrade) return false;

      return true;
    },

    // ========== FACILITIES GETTERS ==========

    // Get facility by ID with full data
    getFacility: (state) => (facilityId) => {
      if (!state.facilities[facilityId]) return null;
      const facilityData = FACILITIES[facilityId];
      return {
        ...facilityData,
        ...state.facilities[facilityId],
      };
    },

    // Get all facilities as array
    allFacilities: (state) => {
      return FACILITIES_ARRAY.map((facilityData) => ({
        ...facilityData,
        ...state.facilities[facilityData.id],
      }));
    },

    // Get active facilities count
    activeFacilitiesCount: (state) => {
      return Object.values(state.facilities).filter((f) => f.actif).length;
    },

    // Check if facility can be activated
    canActivateFacility: (state) => (facilityId) => {
      const facility = state.facilities[facilityId];
      const facilityData = FACILITIES[facilityId];
      const playerStore = usePlayerStore();

      if (!facility || !facilityData) return false;
      if (facility.actif) return false; // Already active
      if (playerStore.ecus < facilityData.coutActivation) return false;

      return true;
    },

    // Check if facility can be upgraded
    canUpgradeFacility: (state) => (facilityId) => {
      const facility = state.facilities[facilityId];
      const facilityData = FACILITIES[facilityId];
      const playerStore = usePlayerStore();

      if (!facility || !facilityData) return false;
      if (facility.niveau >= facilityData.niveauMax) return false;

      const coutOr = Math.floor(facility.coutUpgrade / 10);
      if (playerStore.or < coutOr) return false;

      return true;
    },

    // ========== SYNERGIES GETTERS ==========

    // Check if a tool has active synergy with a facility
    hasSynergy: (state) => (toolId) => {
      const toolData = TOOLS[toolId];
      if (!toolData || !toolData.bonusFacilite) return false;

      const facility = state.facilities[toolData.bonusFacilite];
      return facility && facility.actif;
    },

    // Get active synergies count
    activeSynergiesCount: (state) => {
      let count = 0;
      TOOLS_ARRAY.forEach((toolData) => {
        if (toolData.bonusFacilite) {
          const facility = state.facilities[toolData.bonusFacilite];
          if (facility && facility.actif) {
            count++;
          }
        }
      });
      return count;
    },

    // Check if any synergy is active
    hasActiveSynergy: (state) => {
      return TOOLS_ARRAY.some((toolData) => {
        if (!toolData.bonusFacilite) return false;
        const facility = state.facilities[toolData.bonusFacilite];
        return facility && facility.actif;
      });
    },

    // ========== PRODUCTIVITY GETTERS ==========

    // Calculate global productivity (0-100%)
    productiviteGlobale: (state) => {
      let total = 0;

      // Add tool power
      Object.values(state.tools).forEach((tool) => {
        total += tool.pouvoir;
      });

      // Add active facilities bonus
      Object.values(state.facilities).forEach((facility) => {
        if (facility.actif) {
          total += facility.bonusProductivite;
        }
      });

      // Calculate average (divide by tools count + 1 for facilities)
      const average = Math.round(total / (TOOLS_ARRAY.length + 1));
      return Math.min(100, average);
    },

    // Get bonus count (active facilities)
    bonusActifs: (state) => {
      return Object.values(state.facilities).filter((f) => f.actif).length;
    },

    // ========== QUESTS GETTERS ==========

    // Get active quests (not completed)
    activeQuests: (state) => {
      return state.quests.filter((q) => !q.terminee);
    },

    // Get completed quests
    completedQuests: (state) => {
      return state.quests.filter((q) => q.terminee);
    },

    // Get quest by ID
    getQuest: (state) => (questId) => {
      return state.quests.find((q) => q.id === questId);
    },
  },

  actions: {
    // ========== INITIALIZATION ==========

    initialize() {
      if (this.initialized) return;

      // Initialize tools
      TOOLS_ARRAY.forEach((toolData) => {
        if (!this.tools[toolData.id]) {
          this.tools[toolData.id] = {
            niveau: toolData.niveauInitial,
            pouvoir: toolData.pouvoirInitial,
            coutUpgrade: toolData.coutUpgradeBase,
          };
        }
      });

      // Initialize facilities
      FACILITIES_ARRAY.forEach((facilityData) => {
        if (!this.facilities[facilityData.id]) {
          this.facilities[facilityData.id] = {
            niveau: facilityData.niveauInitial,
            actif: facilityData.actifParDefaut,
            bonusProductivite: facilityData.bonusProductiviteBase,
            coutUpgrade: facilityData.coutUpgradeBase,
          };
        }
      });

      // Initialize quests
      if (this.quests.length === 0) {
        this.quests = getAllQuestsInitialState();
      }

      this.initialized = true;
    },

    // ========== TOOLS ACTIONS ==========

    upgradeTool(toolId) {
      const playerStore = usePlayerStore();
      const notificationsStore = useNotificationsStore();

      if (!this.canUpgradeTool(toolId)) {
        const tool = this.tools[toolId];
        const toolData = TOOLS[toolId];

        if (tool.niveau >= toolData.niveauMax) {
          notificationsStore.ajouterNotification({
            type: "error",
            message: "Outil déjà au niveau maximum!",
          });
        } else {
          notificationsStore.ajouterNotification({
            type: "error",
            message: "Pas assez d'écus!",
          });
        }
        return false;
      }

      const tool = this.tools[toolId];
      const toolData = TOOLS[toolId];
      const oldCost = tool.coutUpgrade;
      const oldLevel = tool.niveau;

      // Deduct cost
      playerStore.depenser(oldCost);

      // Upgrade tool
      tool.niveau++;
      tool.pouvoir = Math.min(100, tool.pouvoir + toolData.pouvoirParNiveau);
      tool.coutUpgrade = Math.floor(
        tool.coutUpgrade * toolData.multiplicateurCout,
      );

      // Add to history
      this.ajouterHistorique({
        type: "upgrade",
        nom: toolData.nom,
        details: `Niveau ${oldLevel} → ${tool.niveau}`,
        cout: oldCost,
        devise: "écus",
        timestamp: Date.now(),
      });

      // Grant XP
      playerStore.ajouterXP(50);

      // Update quests
      this.updateQuestProgress("upgrade", 1);

      // Check if tool reached max level
      if (tool.niveau === toolData.niveauMax) {
        this.updateQuestProgress("max_level", 1);
      }

      // Update synergy count
      this.updateSynergyQuest();

      notificationsStore.ajouterNotification({
        type: "success",
        message: `${toolData.nom} amélioré avec succès!`,
      });

      return true;
    },

    // ========== FACILITIES ACTIONS ==========

    toggleFacility(facilityId) {
      const playerStore = usePlayerStore();
      const notificationsStore = useNotificationsStore();
      const facility = this.facilities[facilityId];
      const facilityData = FACILITIES[facilityId];

      if (!facility || !facilityData) return false;

      // Deactivate
      if (facility.actif) {
        facility.actif = false;
        this.updateSynergyQuest();
        notificationsStore.ajouterNotification({
          type: "info",
          message: `${facilityData.nom} désactivé`,
        });
        return true;
      }

      // Activate
      if (!this.canActivateFacility(facilityId)) {
        notificationsStore.ajouterNotification({
          type: "error",
          message: "Pas assez d'écus!",
        });
        return false;
      }

      playerStore.depenser(facilityData.coutActivation);
      facility.actif = true;

      // Update quests
      this.updateQuestProgress("activate", this.activeFacilitiesCount);
      this.updateSynergyQuest();
      this.updateProductivityQuest();

      notificationsStore.ajouterNotification({
        type: "success",
        message: `${facilityData.nom} activé!`,
      });

      return true;
    },

    upgradeFacility(facilityId) {
      const playerStore = usePlayerStore();
      const notificationsStore = useNotificationsStore();

      if (!this.canUpgradeFacility(facilityId)) {
        const facility = this.facilities[facilityId];
        const facilityData = FACILITIES[facilityId];

        if (facility.niveau >= facilityData.niveauMax) {
          notificationsStore.ajouterNotification({
            type: "error",
            message: "Installation déjà au niveau maximum!",
          });
        } else {
          notificationsStore.ajouterNotification({
            type: "error",
            message: "Pas assez d'or!",
          });
        }
        return false;
      }

      const facility = this.facilities[facilityId];
      const facilityData = FACILITIES[facilityId];
      const coutOr = Math.floor(facility.coutUpgrade / 10);
      const oldLevel = facility.niveau;

      // Deduct cost (in gold)
      playerStore.depenser(coutOr, "or");

      // Upgrade facility
      facility.niveau++;
      facility.bonusProductivite += facilityData.bonusParNiveau;
      facility.coutUpgrade = Math.floor(
        facility.coutUpgrade * facilityData.multiplicateurCout,
      );

      // Add to history
      this.ajouterHistorique({
        type: "facility",
        nom: facilityData.nom,
        details: `Niveau ${oldLevel} → ${facility.niveau}`,
        cout: coutOr,
        devise: "or",
        timestamp: Date.now(),
      });

      // Update productivity quest
      this.updateProductivityQuest();

      notificationsStore.ajouterNotification({
        type: "success",
        message: `${facilityData.nom} amélioré!`,
      });

      return true;
    },

    // ========== QUESTS ACTIONS ==========

    updateQuestProgress(type, value) {
      this.quests.forEach((quest) => {
        if (quest.terminee || quest.type !== type) return;

        // For "upgrade" and "max_level" types, increment
        if (type === "upgrade" || type === "max_level") {
          quest.progression = Math.min(
            quest.progression + value,
            quest.objectif,
          );
        }
        // For "activate" type, set absolute value
        else if (type === "activate") {
          quest.progression = Math.min(value, quest.objectif);
        }

        // Check if quest completed
        if (quest.progression >= quest.objectif && !quest.terminee) {
          this.completeQuest(quest.id);
        }
      });
    },

    updateProductivityQuest() {
      const productivite = this.productiviteGlobale;
      this.quests.forEach((quest) => {
        if (quest.terminee || quest.type !== "productivity") return;

        quest.progression = productivite;

        if (quest.progression >= quest.objectif && !quest.terminee) {
          this.completeQuest(quest.id);
        }
      });
    },

    updateSynergyQuest() {
      const synergies = this.activeSynergiesCount;
      this.quests.forEach((quest) => {
        if (quest.terminee || quest.type !== "synergy") return;

        quest.progression = synergies;

        if (quest.progression >= quest.objectif && !quest.terminee) {
          this.completeQuest(quest.id);
        }
      });
    },

    completeQuest(questId) {
      const playerStore = usePlayerStore();
      const notificationsStore = useNotificationsStore();

      const quest = this.quests.find((q) => q.id === questId);
      if (!quest || quest.terminee) return;

      quest.terminee = true;
      quest.dateCompletee = Date.now();

      // Grant rewards
      if (quest.recompense.ecus) {
        playerStore.gagner(quest.recompense.ecus);
      }
      if (quest.recompense.or) {
        playerStore.gagner(quest.recompense.or, "or");
      }
      if (quest.recompense.experience) {
        playerStore.ajouterXP(quest.recompense.experience);
      }

      notificationsStore.ajouterNotification({
        type: "success",
        message: `Quête terminée: ${quest.nom}!`,
      });
    },

    // ========== HISTORY ACTIONS ==========

    ajouterHistorique(entry) {
      this.historique.unshift({
        ...entry,
        time: new Date(entry.timestamp).toLocaleTimeString("fr-FR", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      });

      // Keep only last 5 entries
      if (this.historique.length > 5) {
        this.historique = this.historique.slice(0, 5);
      }
    },

    // ========== UTILITY ACTIONS ==========

    reset() {
      this.$reset();
      this.initialize();
    },
  },

  persist: true,
});
