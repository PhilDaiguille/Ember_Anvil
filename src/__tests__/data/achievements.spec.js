import { describe, it, expect } from "vitest";
import {
  ACHIEVEMENTS,
  ACHIEVEMENT_CATEGORIES,
  getAchievementById,
  getAchievementsByCategorie,
  getDefaultAchievementsState,
} from "@/data/achievements";

describe("Achievements Data", () => {
  describe("ACHIEVEMENTS", () => {
    it("devrait exporter un tableau d'achievements", () => {
      expect(Array.isArray(ACHIEVEMENTS)).toBe(true);
    });

    it("devrait avoir au moins 20 achievements", () => {
      expect(ACHIEVEMENTS.length).toBeGreaterThanOrEqual(20);
    });

    it("chaque achievement devrait avoir les propriétés requises", () => {
      ACHIEVEMENTS.forEach((achievement) => {
        expect(achievement).toHaveProperty("id");
        expect(achievement).toHaveProperty("nom");
        expect(achievement).toHaveProperty("description");
        expect(achievement).toHaveProperty("categorie");
        expect(achievement).toHaveProperty("icone");
        expect(achievement).toHaveProperty("condition");
        expect(achievement).toHaveProperty("recompense");
      });
    });

    it("les IDs devraient être uniques", () => {
      const ids = ACHIEVEMENTS.map((a) => a.id);
      const uniqueIds = new Set(ids);
      expect(ids.length).toBe(uniqueIds.size);
    });

    it("les conditions devraient avoir type et seuil", () => {
      ACHIEVEMENTS.forEach((achievement) => {
        expect(achievement.condition).toHaveProperty("type");
        expect(achievement.condition).toHaveProperty("seuil");
        expect(typeof achievement.condition.seuil).toBe("number");
        expect(achievement.condition.seuil).toBeGreaterThan(0);
      });
    });

    it("les récompenses devraient avoir au moins une valeur", () => {
      ACHIEVEMENTS.forEach((achievement) => {
        const hasReward =
          achievement.recompense.ecus > 0 ||
          achievement.recompense.or > 0 ||
          achievement.recompense.experience > 0;
        expect(hasReward).toBe(true);
      });
    });
  });

  describe("ACHIEVEMENT_CATEGORIES", () => {
    it("devrait contenir les catégories principales", () => {
      const categoryIds = ACHIEVEMENT_CATEGORIES.map((c) => c.id);
      expect(categoryIds).toContain("all");
      expect(categoryIds).toContain("crafting");
      expect(categoryIds).toContain("progression");
      expect(categoryIds).toContain("economie");
      expect(categoryIds).toContain("atelier");
    });

    it("chaque catégorie devrait avoir id et nom", () => {
      ACHIEVEMENT_CATEGORIES.forEach((cat) => {
        expect(cat).toHaveProperty("id");
        expect(cat).toHaveProperty("nom");
      });
    });
  });

  describe("getAchievementById", () => {
    it("devrait retourner l'achievement correspondant", () => {
      const result = getAchievementById("first_forge");
      expect(result).toBeDefined();
      expect(result.nom).toBe("Première Forge");
    });

    it("devrait retourner undefined pour un ID inexistant", () => {
      const result = getAchievementById("nonexistent");
      expect(result).toBeUndefined();
    });
  });

  describe("getAchievementsByCategorie", () => {
    it("devrait filtrer par catégorie", () => {
      const craftingAchievements = getAchievementsByCategorie("crafting");
      expect(craftingAchievements.length).toBeGreaterThan(0);
      craftingAchievements.forEach((a) => {
        expect(a.categorie).toBe("crafting");
      });
    });

    it("devrait retourner un tableau vide pour une catégorie inexistante", () => {
      const result = getAchievementsByCategorie("nonexistent");
      expect(result).toEqual([]);
    });
  });

  describe("getDefaultAchievementsState", () => {
    it("devrait retourner un objet avec toutes les clés d'achievement", () => {
      const state = getDefaultAchievementsState();
      ACHIEVEMENTS.forEach((a) => {
        expect(state).toHaveProperty(a.id);
      });
    });

    it("tous les achievements devraient être verrouillés par défaut", () => {
      const state = getDefaultAchievementsState();
      Object.values(state).forEach((s) => {
        expect(s.unlocked).toBe(false);
        expect(s.date).toBeNull();
      });
    });
  });
});
