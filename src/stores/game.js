/**
 * GAME STORE
 *
 * Global game state management:
 * - Achievement tracking and unlocking
 * - Game settings
 * - Aggregated statistics
 */

import { defineStore } from "pinia";
import { ACHIEVEMENTS, getDefaultAchievementsState } from "@/data/achievements";
import { usePlayerStore } from "./player";
import { useCraftingStore } from "./crafting";
import { useWorkshopStore } from "./workshop";
import { useCodexStore } from "./codex";
import { useNotificationsStore } from "./notifications";

export const useGameStore = defineStore("game", {
  state: () => ({
    // Achievement unlock state: { achievementId: { unlocked: bool, date: string|null } }
    achievements: getDefaultAchievementsState(),

    // Game settings
    settings: {
      animationsEnabled: true,
      soundEnabled: true,
      autoSaveEnabled: true,
    },

    // Stats tracking for achievements
    stats: {
      totalAchats: 0,
      totalVentes: 0,
      gainsVentes: 0,
      maxEcus: 1250,
      toolUpgrades: 0,
      uniqueToolsUpgraded: [],
      facilitiesActivated: 0,
      quetesCompletees: 0,
    },

    initialized: false,
  }),

  getters: {
    // List of unlocked achievements
    achievementsDebloques: (state) => {
      return ACHIEVEMENTS.filter((a) => state.achievements[a.id]?.unlocked);
    },

    // List of locked achievements
    achievementsVerrouilles: (state) => {
      return ACHIEVEMENTS.filter((a) => !state.achievements[a.id]?.unlocked);
    },

    // Total achievements count
    totalAchievements: () => ACHIEVEMENTS.length,

    // Unlocked count
    achievementsDebloquesCount: (state) => {
      return Object.values(state.achievements).filter((a) => a.unlocked).length;
    },

    // Completion percentage
    achievementsProgress: (state) => {
      const total = ACHIEVEMENTS.length;
      const unlocked = Object.values(state.achievements).filter(
        (a) => a.unlocked,
      ).length;
      return total > 0 ? Math.round((unlocked / total) * 100) : 0;
    },

    // Get achievement with unlock status
    getAchievementStatus: (state) => (achievementId) => {
      const achievement = ACHIEVEMENTS.find((a) => a.id === achievementId);
      if (!achievement) return null;
      return {
        ...achievement,
        unlocked: state.achievements[achievementId]?.unlocked || false,
        date: state.achievements[achievementId]?.date || null,
      };
    },

    // All achievements with status
    allAchievementsWithStatus: (state) => {
      return ACHIEVEMENTS.map((a) => ({
        ...a,
        unlocked: state.achievements[a.id]?.unlocked || false,
        date: state.achievements[a.id]?.date || null,
      }));
    },
  },

  actions: {
    initialize() {
      if (this.initialized) return;

      // Ensure all achievements have state entries
      ACHIEVEMENTS.forEach((a) => {
        if (!this.achievements[a.id]) {
          this.achievements[a.id] = { unlocked: false, date: null };
        }
      });

      this.initialized = true;
    },

    // Check and unlock achievements based on current game state
    checkAchievements() {
      const playerStore = usePlayerStore();
      const craftingStore = useCraftingStore();
      const workshopStore = useWorkshopStore();
      const codexStore = useCodexStore();

      // Build current values map
      const values = {
        items_forged: craftingStore.stats?.totalForges || 0,
        quality_reached: craftingStore.stats?.meilleureQualite || 0,
        niveau: playerStore.niveau,
        achats: this.stats.totalAchats,
        ventes: this.stats.totalVentes,
        gains_ventes: this.stats.gainsVentes,
        ecus_max: this.stats.maxEcus,
        tool_upgrades: this.stats.toolUpgrades,
        tool_maxed:
          workshopStore.allTools?.filter((t) => t.niveau >= t.niveauMax)
            .length || 0,
        unique_tools_upgraded: this.stats.uniqueToolsUpgraded.length,
        facilities_activated: this.stats.facilitiesActivated,
        synergies_active: workshopStore.activeSynergiesCount || 0,
        productivite: workshopStore.productiviteGlobale || 0,
        materials_discovered: codexStore.discoveredMaterials?.length || 0,
        recipes_unlocked: codexStore.discoveredRecipes?.length || 0,
        quetes_completees: this.stats.quetesCompletees,
      };

      // Update max ecus tracking
      if (playerStore.ecus > this.stats.maxEcus) {
        this.stats.maxEcus = playerStore.ecus;
      }
      values.ecus_max = this.stats.maxEcus;

      // Check each achievement
      ACHIEVEMENTS.forEach((achievement) => {
        if (this.achievements[achievement.id]?.unlocked) return;

        const { type, seuil } = achievement.condition;
        const currentValue = values[type] || 0;

        if (currentValue >= seuil) {
          this.unlockAchievement(achievement.id);
        }
      });
    },

    // Unlock a specific achievement
    unlockAchievement(achievementId) {
      if (this.achievements[achievementId]?.unlocked) return;

      const achievement = ACHIEVEMENTS.find((a) => a.id === achievementId);
      if (!achievement) return;

      this.achievements[achievementId] = {
        unlocked: true,
        date: new Date().toISOString(),
      };

      // Grant rewards
      const playerStore = usePlayerStore();
      const notificationsStore = useNotificationsStore();

      if (achievement.recompense) {
        if (achievement.recompense.ecus) {
          playerStore.ajouterEcus(achievement.recompense.ecus);
        }
        if (achievement.recompense.or) {
          playerStore.ajouterOr(achievement.recompense.or);
        }
        if (achievement.recompense.experience) {
          playerStore.ajouterExperience(achievement.recompense.experience);
        }
      }

      // Show notification
      notificationsStore.ajouterNotification({
        type: "success",
        message: `Succès débloqué : ${achievement.nom} !`,
      });
    },

    // Track stat events
    trackAchat() {
      this.stats.totalAchats++;
      this.checkAchievements();
    },

    trackVente(gain) {
      this.stats.totalVentes++;
      this.stats.gainsVentes += gain;
      this.checkAchievements();
    },

    trackToolUpgrade(toolId) {
      this.stats.toolUpgrades++;
      if (!this.stats.uniqueToolsUpgraded.includes(toolId)) {
        this.stats.uniqueToolsUpgraded.push(toolId);
      }
      this.checkAchievements();
    },

    trackFacilityActivation() {
      this.stats.facilitiesActivated++;
      this.checkAchievements();
    },

    trackQueteCompletee() {
      this.stats.quetesCompletees++;
      this.checkAchievements();
    },

    // Reset all game data
    reset() {
      this.achievements = getDefaultAchievementsState();
      this.stats = {
        totalAchats: 0,
        totalVentes: 0,
        gainsVentes: 0,
        maxEcus: 1250,
        toolUpgrades: 0,
        uniqueToolsUpgraded: [],
        facilitiesActivated: 0,
        quetesCompletees: 0,
      };
      this.initialized = false;
    },
  },

  persist: true,
});
