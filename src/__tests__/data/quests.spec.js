import { describe, it, expect, beforeEach } from "vitest";
import {
  QUESTS,
  QUESTS_ARRAY,
  getInitialQuestState,
  getAllQuestsInitialState,
} from "@/data/quests";

describe("Quests Data", () => {
  // ========== EXPORTS ==========

  describe("Exports", () => {
    it("should export QUESTS as an object", () => {
      expect(QUESTS).toBeDefined();
      expect(typeof QUESTS).toBe("object");
      expect(Array.isArray(QUESTS)).toBe(false);
    });

    it("should export QUESTS_ARRAY as an array", () => {
      expect(QUESTS_ARRAY).toBeDefined();
      expect(Array.isArray(QUESTS_ARRAY)).toBe(true);
    });

    it("QUESTS_ARRAY should contain 5 quests", () => {
      expect(QUESTS_ARRAY.length).toBe(5);
    });

    it("QUESTS_ARRAY should match QUESTS object entries", () => {
      const objectCount = Object.keys(QUESTS).length;
      expect(QUESTS_ARRAY.length).toBe(objectCount);
    });

    it("should export getInitialQuestState function", () => {
      expect(getInitialQuestState).toBeDefined();
      expect(typeof getInitialQuestState).toBe("function");
    });

    it("should export getAllQuestsInitialState function", () => {
      expect(getAllQuestsInitialState).toBeDefined();
      expect(typeof getAllQuestsInitialState).toBe("function");
    });
  });

  // ========== STRUCTURE VALIDATION ==========

  describe("Quest Structure", () => {
    it("every quest should have required fields", () => {
      QUESTS_ARRAY.forEach((quest) => {
        expect(quest).toHaveProperty("id");
        expect(quest).toHaveProperty("nom");
        expect(quest).toHaveProperty("description");
        expect(quest).toHaveProperty("objectif");
        expect(quest).toHaveProperty("type");
        expect(quest).toHaveProperty("recompense");
        expect(quest).toHaveProperty("renouvelable");
      });
    });

    it("every quest should have valid type", () => {
      const validTypes = [
        "upgrade",
        "activate",
        "productivity",
        "max_level",
        "synergy",
      ];
      QUESTS_ARRAY.forEach((quest) => {
        expect(validTypes).toContain(quest.type);
      });
    });

    it("objectif should be positive", () => {
      QUESTS_ARRAY.forEach((quest) => {
        expect(quest.objectif).toBeGreaterThan(0);
      });
    });

    it("renouvelable should be boolean", () => {
      QUESTS_ARRAY.forEach((quest) => {
        expect(typeof quest.renouvelable).toBe("boolean");
      });
    });

    it("recompense should be an object", () => {
      QUESTS_ARRAY.forEach((quest) => {
        expect(quest.recompense).toBeDefined();
        expect(typeof quest.recompense).toBe("object");
      });
    });

    it("recompense should have at least one reward type", () => {
      QUESTS_ARRAY.forEach((quest) => {
        const hasReward =
          quest.recompense.ecus ||
          quest.recompense.or ||
          quest.recompense.experience;
        expect(hasReward).toBeTruthy();
      });
    });
  });

  // ========== SPECIFIC QUESTS ==========

  describe("Specific Quests", () => {
    const expectedQuests = [
      "upgrade_tools",
      "activate_facilities",
      "reach_productivity",
      "max_tool",
      "unlock_synergies",
    ];

    it("should contain all 5 expected quests", () => {
      expectedQuests.forEach((questId) => {
        expect(QUESTS[questId]).toBeDefined();
      });
    });

    it("upgrade_tools should have correct properties", () => {
      expect(QUESTS.upgrade_tools.id).toBe("upgrade_tools");
      expect(QUESTS.upgrade_tools.type).toBe("upgrade");
      expect(QUESTS.upgrade_tools.objectif).toBe(3);
      expect(QUESTS.upgrade_tools.renouvelable).toBe(true);
      expect(QUESTS.upgrade_tools.recompense.ecus).toBe(1000);
      expect(QUESTS.upgrade_tools.recompense.experience).toBe(200);
    });

    it("activate_facilities should have correct properties", () => {
      expect(QUESTS.activate_facilities.id).toBe("activate_facilities");
      expect(QUESTS.activate_facilities.type).toBe("activate");
      expect(QUESTS.activate_facilities.objectif).toBe(3);
      expect(QUESTS.activate_facilities.renouvelable).toBe(true);
      expect(QUESTS.activate_facilities.recompense.ecus).toBe(1500);
      expect(QUESTS.activate_facilities.recompense.or).toBe(50);
    });

    it("reach_productivity should have correct properties", () => {
      expect(QUESTS.reach_productivity.id).toBe("reach_productivity");
      expect(QUESTS.reach_productivity.type).toBe("productivity");
      expect(QUESTS.reach_productivity.objectif).toBe(80);
      expect(QUESTS.reach_productivity.renouvelable).toBe(false);
    });

    it("max_tool should have correct properties", () => {
      expect(QUESTS.max_tool.id).toBe("max_tool");
      expect(QUESTS.max_tool.type).toBe("max_level");
      expect(QUESTS.max_tool.objectif).toBe(1);
      expect(QUESTS.max_tool.renouvelable).toBe(false);
    });

    it("unlock_synergies should have correct properties", () => {
      expect(QUESTS.unlock_synergies.id).toBe("unlock_synergies");
      expect(QUESTS.unlock_synergies.type).toBe("synergy");
      expect(QUESTS.unlock_synergies.objectif).toBe(2);
      expect(QUESTS.unlock_synergies.renouvelable).toBe(false);
    });
  });

  // ========== RENEWABLE VS NON-RENEWABLE ==========

  describe("Quest Types", () => {
    it("should have both renewable and non-renewable quests", () => {
      const renewable = QUESTS_ARRAY.filter((q) => q.renouvelable);
      const nonRenewable = QUESTS_ARRAY.filter((q) => !q.renouvelable);

      expect(renewable.length).toBeGreaterThan(0);
      expect(nonRenewable.length).toBeGreaterThan(0);
    });

    it("daily quests should be renewable", () => {
      expect(QUESTS.upgrade_tools.renouvelable).toBe(true);
      expect(QUESTS.activate_facilities.renouvelable).toBe(true);
    });

    it("milestone quests should not be renewable", () => {
      expect(QUESTS.reach_productivity.renouvelable).toBe(false);
      expect(QUESTS.max_tool.renouvelable).toBe(false);
      expect(QUESTS.unlock_synergies.renouvelable).toBe(false);
    });
  });

  // ========== REWARDS VALIDATION ==========

  describe("Rewards", () => {
    it("all rewards should be positive numbers", () => {
      QUESTS_ARRAY.forEach((quest) => {
        if (quest.recompense.ecus) {
          expect(quest.recompense.ecus).toBeGreaterThan(0);
        }
        if (quest.recompense.or) {
          expect(quest.recompense.or).toBeGreaterThan(0);
        }
        if (quest.recompense.experience) {
          expect(quest.recompense.experience).toBeGreaterThan(0);
        }
      });
    });

    it("non-renewable quests should have higher rewards", () => {
      const renewable = QUESTS_ARRAY.filter((q) => q.renouvelable);
      const nonRenewable = QUESTS_ARRAY.filter((q) => !q.renouvelable);

      const avgRenewableEcus =
        renewable.reduce((sum, q) => sum + (q.recompense.ecus || 0), 0) /
        renewable.length;
      const avgNonRenewableEcus =
        nonRenewable.reduce((sum, q) => sum + (q.recompense.ecus || 0), 0) /
        nonRenewable.length;

      expect(avgNonRenewableEcus).toBeGreaterThan(avgRenewableEcus);
    });

    it("all quests should reward écus", () => {
      QUESTS_ARRAY.forEach((quest) => {
        expect(quest.recompense.ecus).toBeDefined();
        expect(quest.recompense.ecus).toBeGreaterThan(0);
      });
    });

    it("some quests should reward gold (or)", () => {
      const goldQuests = QUESTS_ARRAY.filter((q) => q.recompense.or);
      expect(goldQuests.length).toBeGreaterThan(0);
    });

    it("some quests should reward experience", () => {
      const xpQuests = QUESTS_ARRAY.filter((q) => q.recompense.experience);
      expect(xpQuests.length).toBeGreaterThan(0);
    });
  });

  // ========== OBJECTIVES VALIDATION ==========

  describe("Objectives", () => {
    it("objectives should be reasonable numbers", () => {
      QUESTS_ARRAY.forEach((quest) => {
        expect(quest.objectif).toBeGreaterThanOrEqual(1);
        expect(quest.objectif).toBeLessThanOrEqual(100);
      });
    });

    it("activate_facilities objective should match facility count", () => {
      expect(QUESTS.activate_facilities.objectif).toBe(3); // 3 facilities
    });

    it("productivity objective should be achievable", () => {
      expect(QUESTS.reach_productivity.objectif).toBe(80);
      expect(QUESTS.reach_productivity.objectif).toBeLessThanOrEqual(100);
    });
  });

  // ========== UNIQUE IDS ==========

  describe("Unique Identifiers", () => {
    it("all quest IDs should be unique", () => {
      const ids = QUESTS_ARRAY.map((q) => q.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it("quest ID should match object key", () => {
      Object.keys(QUESTS).forEach((key) => {
        expect(QUESTS[key].id).toBe(key);
      });
    });
  });

  // ========== DESCRIPTIONS ==========

  describe("Descriptions", () => {
    it("all quests should have non-empty descriptions", () => {
      QUESTS_ARRAY.forEach((quest) => {
        expect(quest.description).toBeDefined();
        expect(quest.description.length).toBeGreaterThan(0);
        expect(typeof quest.description).toBe("string");
      });
    });

    it("all quests should have non-empty names", () => {
      QUESTS_ARRAY.forEach((quest) => {
        expect(quest.nom).toBeDefined();
        expect(quest.nom.length).toBeGreaterThan(0);
        expect(typeof quest.nom).toBe("string");
      });
    });
  });

  // ========== HELPER FUNCTIONS ==========

  describe("getInitialQuestState()", () => {
    it("should return quest with initial state fields", () => {
      const questState = getInitialQuestState("upgrade_tools");

      expect(questState).toBeDefined();
      expect(questState.id).toBe("upgrade_tools");
      expect(questState.progression).toBe(0);
      expect(questState.terminee).toBe(false);
      expect(questState.dateDebut).toBeDefined();
      expect(questState.dateCompletee).toBeNull();
    });

    it("should preserve original quest properties", () => {
      const questState = getInitialQuestState("upgrade_tools");

      expect(questState.nom).toBe(QUESTS.upgrade_tools.nom);
      expect(questState.description).toBe(QUESTS.upgrade_tools.description);
      expect(questState.objectif).toBe(QUESTS.upgrade_tools.objectif);
      expect(questState.type).toBe(QUESTS.upgrade_tools.type);
    });

    it("should return null for invalid questId", () => {
      const questState = getInitialQuestState("invalid_quest");
      expect(questState).toBeNull();
    });

    it("dateDebut should be a valid timestamp", () => {
      const questState = getInitialQuestState("upgrade_tools");
      expect(typeof questState.dateDebut).toBe("number");
      expect(questState.dateDebut).toBeGreaterThan(0);
    });
  });

  describe("getAllQuestsInitialState()", () => {
    it("should return array of all quests with initial state", () => {
      const allQuests = getAllQuestsInitialState();

      expect(Array.isArray(allQuests)).toBe(true);
      expect(allQuests.length).toBe(QUESTS_ARRAY.length);
    });

    it("every quest should have initial state fields", () => {
      const allQuests = getAllQuestsInitialState();

      allQuests.forEach((quest) => {
        expect(quest.progression).toBe(0);
        expect(quest.terminee).toBe(false);
        expect(quest.dateDebut).toBeDefined();
        expect(quest.dateCompletee).toBeNull();
      });
    });

    it("should preserve all original quest properties", () => {
      const allQuests = getAllQuestsInitialState();

      allQuests.forEach((quest, index) => {
        const original = QUESTS_ARRAY[index];
        expect(quest.id).toBe(original.id);
        expect(quest.nom).toBe(original.nom);
        expect(quest.type).toBe(original.type);
        expect(quest.objectif).toBe(original.objectif);
      });
    });

    it("all quests should have same dateDebut", () => {
      const allQuests = getAllQuestsInitialState();
      const timestamps = allQuests.map((q) => q.dateDebut);
      const uniqueTimestamps = new Set(timestamps);

      // All should be very close (within same millisecond in most cases)
      expect(uniqueTimestamps.size).toBeLessThanOrEqual(2);
    });
  });
});
