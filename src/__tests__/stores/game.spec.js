import { describe, it, expect, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useGameStore } from "@/stores/game";
import { usePlayerStore } from "@/stores/player";
import { ACHIEVEMENTS } from "@/data/achievements";

describe("Game Store", () => {
  let gameStore;
  let playerStore;

  beforeEach(() => {
    setActivePinia(createPinia());
    gameStore = useGameStore();
    playerStore = usePlayerStore();
    gameStore.initialize();
  });

  describe("Initialization", () => {
    it("devrait initialiser avec tous les achievements verrouillés", () => {
      ACHIEVEMENTS.forEach((a) => {
        expect(gameStore.achievements[a.id]).toBeDefined();
        expect(gameStore.achievements[a.id].unlocked).toBe(false);
      });
    });

    it("devrait marquer initialized à true après initialize()", () => {
      expect(gameStore.initialized).toBe(true);
    });

    it("devrait avoir les paramètres par défaut", () => {
      expect(gameStore.settings.animationsEnabled).toBe(true);
      expect(gameStore.settings.soundEnabled).toBe(true);
      expect(gameStore.settings.autoSaveEnabled).toBe(true);
    });
  });

  describe("Getters", () => {
    it("achievementsDebloques devrait retourner les achievements débloqués", () => {
      expect(gameStore.achievementsDebloques).toEqual([]);
    });

    it("achievementsVerrouilles devrait retourner tous les achievements", () => {
      expect(gameStore.achievementsVerrouilles.length).toBe(
        ACHIEVEMENTS.length,
      );
    });

    it("achievementsProgress devrait retourner 0% initialement", () => {
      expect(gameStore.achievementsProgress).toBe(0);
    });

    it("achievementsDebloquesCount devrait retourner 0 initialement", () => {
      expect(gameStore.achievementsDebloquesCount).toBe(0);
    });

    it("totalAchievements devrait retourner le nombre total", () => {
      expect(gameStore.totalAchievements).toBe(ACHIEVEMENTS.length);
    });

    it("allAchievementsWithStatus devrait retourner tous les achievements avec status", () => {
      const result = gameStore.allAchievementsWithStatus;
      expect(result.length).toBe(ACHIEVEMENTS.length);
      result.forEach((a) => {
        expect(a).toHaveProperty("unlocked");
        expect(a).toHaveProperty("date");
      });
    });
  });

  describe("unlockAchievement", () => {
    it("devrait débloquer un achievement", () => {
      gameStore.unlockAchievement("first_forge");
      expect(gameStore.achievements.first_forge.unlocked).toBe(true);
      expect(gameStore.achievements.first_forge.date).toBeTruthy();
    });

    it("devrait accorder les récompenses en écus", () => {
      const ecusAvant = playerStore.ecus;
      gameStore.unlockAchievement("first_forge");
      expect(playerStore.ecus).toBe(ecusAvant + 50);
    });

    it("devrait accorder les récompenses en expérience", () => {
      const xpAvant = playerStore.experience;
      gameStore.unlockAchievement("first_forge");
      expect(playerStore.experience).toBeGreaterThan(xpAvant);
    });

    it("ne devrait pas débloquer un achievement déjà débloqué", () => {
      gameStore.unlockAchievement("first_forge");
      const ecus = playerStore.ecus;
      gameStore.unlockAchievement("first_forge");
      expect(playerStore.ecus).toBe(ecus);
    });

    it("devrait ignorer un ID inexistant", () => {
      gameStore.unlockAchievement("nonexistent");
      expect(gameStore.achievementsDebloquesCount).toBe(0);
    });
  });

  describe("Tracking", () => {
    it("trackAchat devrait incrémenter totalAchats", () => {
      gameStore.trackAchat();
      expect(gameStore.stats.totalAchats).toBe(1);
    });

    it("trackVente devrait incrémenter totalVentes et gainsVentes", () => {
      gameStore.trackVente(100);
      expect(gameStore.stats.totalVentes).toBe(1);
      expect(gameStore.stats.gainsVentes).toBe(100);
    });

    it("trackToolUpgrade devrait incrémenter toolUpgrades", () => {
      gameStore.trackToolUpgrade("marteau");
      expect(gameStore.stats.toolUpgrades).toBe(1);
      expect(gameStore.stats.uniqueToolsUpgraded).toContain("marteau");
    });

    it("trackFacilityActivation devrait incrémenter facilitiesActivated", () => {
      gameStore.trackFacilityActivation();
      expect(gameStore.stats.facilitiesActivated).toBe(1);
    });

    it("trackQueteCompletee devrait incrémenter quetesCompletees", () => {
      gameStore.trackQueteCompletee();
      expect(gameStore.stats.quetesCompletees).toBe(1);
    });
  });

  describe("Reset", () => {
    it("devrait réinitialiser tous les achievements", () => {
      gameStore.unlockAchievement("first_forge");
      gameStore.reset();
      expect(gameStore.achievements.first_forge.unlocked).toBe(false);
    });

    it("devrait réinitialiser les stats", () => {
      gameStore.trackAchat();
      gameStore.trackVente(100);
      gameStore.reset();
      expect(gameStore.stats.totalAchats).toBe(0);
      expect(gameStore.stats.totalVentes).toBe(0);
    });
  });
});
