import { describe, it, expect, beforeEach, vi } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useWorkshopStore } from "@/stores/workshop";
import { usePlayerStore } from "@/stores/player";
import { useNotificationsStore } from "@/stores/notifications";
import { TOOLS, TOOLS_ARRAY } from "@/data/tools";
import { FACILITIES, FACILITIES_ARRAY } from "@/data/facilities";

describe("Workshop Store", () => {
  let workshopStore;
  let playerStore;
  let notificationsStore;

  beforeEach(() => {
    setActivePinia(createPinia());
    workshopStore = useWorkshopStore();
    playerStore = usePlayerStore();
    notificationsStore = useNotificationsStore();

    // Initialize workshop
    workshopStore.initialize();

    // Setup player with resources
    playerStore.ecus = 10000;
    playerStore.or = 1000;
  });

  // ========== INITIALIZATION ==========

  describe("Initialization", () => {
    it("should initialize tools with default values", () => {
      expect(workshopStore.tools).toBeDefined();
      expect(Object.keys(workshopStore.tools).length).toBe(TOOLS_ARRAY.length);

      TOOLS_ARRAY.forEach((toolData) => {
        const tool = workshopStore.tools[toolData.id];
        expect(tool).toBeDefined();
        expect(tool.niveau).toBe(toolData.niveauInitial);
        expect(tool.pouvoir).toBe(toolData.pouvoirInitial);
        expect(tool.coutUpgrade).toBe(toolData.coutUpgradeBase);
      });
    });

    it("should initialize facilities with default values", () => {
      expect(workshopStore.facilities).toBeDefined();
      expect(Object.keys(workshopStore.facilities).length).toBe(
        FACILITIES_ARRAY.length,
      );

      FACILITIES_ARRAY.forEach((facilityData) => {
        const facility = workshopStore.facilities[facilityData.id];
        expect(facility).toBeDefined();
        expect(facility.niveau).toBe(facilityData.niveauInitial);
        expect(facility.actif).toBe(facilityData.actifParDefaut);
        expect(facility.bonusProductivite).toBe(
          facilityData.bonusProductiviteBase,
        );
        expect(facility.coutUpgrade).toBe(facilityData.coutUpgradeBase);
      });
    });

    it("should initialize quests with zero progression", () => {
      expect(workshopStore.quests).toBeDefined();
      expect(workshopStore.quests.length).toBeGreaterThan(0);

      workshopStore.quests.forEach((quest) => {
        expect(quest.progression).toBe(0);
        expect(quest.terminee).toBe(false);
      });
    });

    it("should set initialized flag to true", () => {
      expect(workshopStore.initialized).toBe(true);
    });

    it("should not reinitialize if already initialized", () => {
      const initialTools = { ...workshopStore.tools };
      workshopStore.initialize();
      expect(workshopStore.tools).toEqual(initialTools);
    });
  });

  // ========== TOOLS GETTERS ==========

  describe("Tools Getters", () => {
    it("getTool() should return tool with full data", () => {
      const tool = workshopStore.getTool("marteau");
      expect(tool).toBeDefined();
      expect(tool.id).toBe("marteau");
      expect(tool.nom).toBe(TOOLS.marteau.nom);
      expect(tool.niveau).toBe(1);
      expect(tool.pouvoir).toBeDefined();
    });

    it("getTool() should return null for invalid toolId", () => {
      const tool = workshopStore.getTool("invalid_tool");
      expect(tool).toBeNull();
    });

    it("allTools should return array of all tools", () => {
      const tools = workshopStore.allTools;
      expect(Array.isArray(tools)).toBe(true);
      expect(tools.length).toBe(TOOLS_ARRAY.length);
      expect(tools[0].id).toBeDefined();
      expect(tools[0].nom).toBeDefined();
    });

    it("canUpgradeTool() should return true if upgrade is possible", () => {
      const canUpgrade = workshopStore.canUpgradeTool("marteau");
      expect(canUpgrade).toBe(true);
    });

    it("canUpgradeTool() should return false if insufficient funds", () => {
      playerStore.ecus = 0;
      const canUpgrade = workshopStore.canUpgradeTool("marteau");
      expect(canUpgrade).toBe(false);
    });

    it("canUpgradeTool() should return false if max level reached", () => {
      const toolData = TOOLS.marteau;
      workshopStore.tools.marteau.niveau = toolData.niveauMax;
      const canUpgrade = workshopStore.canUpgradeTool("marteau");
      expect(canUpgrade).toBe(false);
    });
  });

  // ========== FACILITIES GETTERS ==========

  describe("Facilities Getters", () => {
    it("getFacility() should return facility with full data", () => {
      const facility = workshopStore.getFacility("trempage");
      expect(facility).toBeDefined();
      expect(facility.id).toBe("trempage");
      expect(facility.nom).toBe(FACILITIES.trempage.nom);
    });

    it("getFacility() should return null for invalid facilityId", () => {
      const facility = workshopStore.getFacility("invalid_facility");
      expect(facility).toBeNull();
    });

    it("allFacilities should return array of all facilities", () => {
      const facilities = workshopStore.allFacilities;
      expect(Array.isArray(facilities)).toBe(true);
      expect(facilities.length).toBe(FACILITIES_ARRAY.length);
    });

    it("activeFacilitiesCount should return correct count", () => {
      expect(workshopStore.activeFacilitiesCount).toBe(0);

      workshopStore.facilities.trempage.actif = true;
      expect(workshopStore.activeFacilitiesCount).toBe(1);

      workshopStore.facilities.enchantement.actif = true;
      expect(workshopStore.activeFacilitiesCount).toBe(2);
    });

    it("canActivateFacility() should return true if activation is possible", () => {
      const canActivate = workshopStore.canActivateFacility("trempage");
      expect(canActivate).toBe(true);
    });

    it("canActivateFacility() should return false if already active", () => {
      workshopStore.facilities.trempage.actif = true;
      const canActivate = workshopStore.canActivateFacility("trempage");
      expect(canActivate).toBe(false);
    });

    it("canActivateFacility() should return false if insufficient funds", () => {
      playerStore.ecus = 0;
      const canActivate = workshopStore.canActivateFacility("trempage");
      expect(canActivate).toBe(false);
    });

    it("canUpgradeFacility() should return true if upgrade is possible", () => {
      const canUpgrade = workshopStore.canUpgradeFacility("trempage");
      expect(canUpgrade).toBe(true);
    });

    it("canUpgradeFacility() should return false if insufficient gold", () => {
      playerStore.or = 0;
      const canUpgrade = workshopStore.canUpgradeFacility("trempage");
      expect(canUpgrade).toBe(false);
    });

    it("canUpgradeFacility() should return false if max level reached", () => {
      const facilityData = FACILITIES.trempage;
      workshopStore.facilities.trempage.niveau = facilityData.niveauMax;
      const canUpgrade = workshopStore.canUpgradeFacility("trempage");
      expect(canUpgrade).toBe(false);
    });
  });

  // ========== SYNERGIES GETTERS ==========

  describe("Synergies", () => {
    it("hasSynergy() should return false if facility not active", () => {
      const hasSyn = workshopStore.hasSynergy("marteau");
      expect(hasSyn).toBe(false);
    });

    it("hasSynergy() should return true if facility is active", () => {
      // Marteau has synergy with trempage
      workshopStore.facilities.trempage.actif = true;
      const hasSyn = workshopStore.hasSynergy("marteau");
      expect(hasSyn).toBe(true);
    });

    it("activeSynergiesCount should count active synergies", () => {
      expect(workshopStore.activeSynergiesCount).toBe(0);

      // Activate trempage (synergy with marteau)
      workshopStore.facilities.trempage.actif = true;
      expect(workshopStore.activeSynergiesCount).toBeGreaterThan(0);
    });

    it("hasActiveSynergy should return true if any synergy active", () => {
      expect(workshopStore.hasActiveSynergy).toBe(false);

      workshopStore.facilities.trempage.actif = true;
      expect(workshopStore.hasActiveSynergy).toBe(true);
    });
  });

  // ========== PRODUCTIVITY GETTERS ==========

  describe("Productivity", () => {
    it("productiviteGlobale should calculate global productivity", () => {
      const productivity = workshopStore.productiviteGlobale;
      expect(productivity).toBeGreaterThan(0);
      expect(productivity).toBeLessThanOrEqual(100);
    });

    it("productiviteGlobale should increase when facilities are active", () => {
      const initial = workshopStore.productiviteGlobale;

      workshopStore.facilities.trempage.actif = true;
      const withFacility = workshopStore.productiviteGlobale;

      expect(withFacility).toBeGreaterThan(initial);
    });

    it("bonusActifs should count active facilities", () => {
      expect(workshopStore.bonusActifs).toBe(0);

      workshopStore.facilities.trempage.actif = true;
      expect(workshopStore.bonusActifs).toBe(1);

      workshopStore.facilities.enchantement.actif = true;
      expect(workshopStore.bonusActifs).toBe(2);
    });
  });

  // ========== QUESTS GETTERS ==========

  describe("Quests", () => {
    it("activeQuests should return only non-completed quests", () => {
      const active = workshopStore.activeQuests;
      expect(active.every((q) => !q.terminee)).toBe(true);
    });

    it("completedQuests should return only completed quests", () => {
      // Complete a quest
      if (workshopStore.quests[0]) {
        workshopStore.quests[0].terminee = true;
        const completed = workshopStore.completedQuests;
        expect(completed.length).toBe(1);
        expect(completed[0].terminee).toBe(true);
      }
    });

    it("getQuest() should return quest by ID", () => {
      const firstQuest = workshopStore.quests[0];
      if (firstQuest) {
        const quest = workshopStore.getQuest(firstQuest.id);
        expect(quest).toEqual(firstQuest);
      }
    });
  });

  // ========== TOOLS ACTIONS ==========

  describe("Tool Upgrade", () => {
    it("upgradeTool() should upgrade tool successfully", () => {
      const initialLevel = workshopStore.tools.marteau.niveau;
      const initialPower = workshopStore.tools.marteau.pouvoir;
      const cost = workshopStore.tools.marteau.coutUpgrade;
      const initialEcus = playerStore.ecus;

      const result = workshopStore.upgradeTool("marteau");

      expect(result).toBe(true);
      expect(workshopStore.tools.marteau.niveau).toBe(initialLevel + 1);
      expect(workshopStore.tools.marteau.pouvoir).toBeGreaterThan(initialPower);
      expect(playerStore.ecus).toBe(initialEcus - cost);
    });

    it("upgradeTool() should increase upgrade cost progressively", () => {
      const initialCost = workshopStore.tools.marteau.coutUpgrade;
      workshopStore.upgradeTool("marteau");
      const newCost = workshopStore.tools.marteau.coutUpgrade;

      expect(newCost).toBeGreaterThan(initialCost);
    });

    it("upgradeTool() should add entry to history", () => {
      const initialHistoryLength = workshopStore.historique.length;
      workshopStore.upgradeTool("marteau");

      expect(workshopStore.historique.length).toBe(initialHistoryLength + 1);
      expect(workshopStore.historique[0].type).toBe("upgrade");
    });

    it("upgradeTool() should grant XP to player", () => {
      const initialXP = playerStore.experience;
      workshopStore.upgradeTool("marteau");
      expect(playerStore.experience).toBeGreaterThan(initialXP);
    });

    it("upgradeTool() should update quest progress", () => {
      const upgradeQuest = workshopStore.quests.find(
        (q) => q.type === "upgrade",
      );
      if (upgradeQuest) {
        const initialProgress = upgradeQuest.progression;
        workshopStore.upgradeTool("marteau");
        expect(upgradeQuest.progression).toBeGreaterThan(initialProgress);
      }
    });

    it("upgradeTool() should fail if insufficient funds", () => {
      playerStore.ecus = 0;
      const result = workshopStore.upgradeTool("marteau");
      expect(result).toBe(false);
    });

    it("upgradeTool() should fail if max level reached", () => {
      const toolData = TOOLS.marteau;
      workshopStore.tools.marteau.niveau = toolData.niveauMax;
      const result = workshopStore.upgradeTool("marteau");
      expect(result).toBe(false);
    });

    it("upgradeTool() should show notification on success", () => {
      workshopStore.upgradeTool("marteau");
      expect(notificationsStore.notifications.length).toBeGreaterThan(0);
    });

    it("upgradeTool() should cap power at 100", () => {
      // Upgrade multiple times to reach power cap
      workshopStore.tools.marteau.pouvoir = 95;
      workshopStore.upgradeTool("marteau");
      expect(workshopStore.tools.marteau.pouvoir).toBeLessThanOrEqual(100);
    });
  });

  // ========== FACILITIES ACTIONS ==========

  describe("Facility Toggle", () => {
    it("toggleFacility() should activate facility", () => {
      const cost = FACILITIES.trempage.coutActivation;
      const initialEcus = playerStore.ecus;

      const result = workshopStore.toggleFacility("trempage");

      expect(result).toBe(true);
      expect(workshopStore.facilities.trempage.actif).toBe(true);
      expect(playerStore.ecus).toBe(initialEcus - cost);
    });

    it("toggleFacility() should deactivate facility", () => {
      workshopStore.facilities.trempage.actif = true;
      const initialEcus = playerStore.ecus;

      const result = workshopStore.toggleFacility("trempage");

      expect(result).toBe(true);
      expect(workshopStore.facilities.trempage.actif).toBe(false);
      expect(playerStore.ecus).toBe(initialEcus); // No cost for deactivation
    });

    it("toggleFacility() should update quest progress on activation", () => {
      const activateQuest = workshopStore.quests.find(
        (q) => q.type === "activate",
      );
      if (activateQuest) {
        workshopStore.toggleFacility("trempage");
        expect(activateQuest.progression).toBeGreaterThan(0);
      }
    });

    it("toggleFacility() should fail if insufficient funds", () => {
      playerStore.ecus = 0;
      const result = workshopStore.toggleFacility("trempage");
      expect(result).toBe(false);
    });
  });

  describe("Facility Upgrade", () => {
    it("upgradeFacility() should upgrade facility successfully", () => {
      const initialLevel = workshopStore.facilities.trempage.niveau;
      const initialBonus = workshopStore.facilities.trempage.bonusProductivite;
      const cost = Math.floor(
        workshopStore.facilities.trempage.coutUpgrade / 10,
      );
      const initialOr = playerStore.or;

      const result = workshopStore.upgradeFacility("trempage");

      expect(result).toBe(true);
      expect(workshopStore.facilities.trempage.niveau).toBe(initialLevel + 1);
      expect(
        workshopStore.facilities.trempage.bonusProductivite,
      ).toBeGreaterThan(initialBonus);
      expect(playerStore.or).toBe(initialOr - cost);
    });

    it("upgradeFacility() should increase upgrade cost progressively", () => {
      const initialCost = workshopStore.facilities.trempage.coutUpgrade;
      workshopStore.upgradeFacility("trempage");
      const newCost = workshopStore.facilities.trempage.coutUpgrade;

      expect(newCost).toBeGreaterThan(initialCost);
    });

    it("upgradeFacility() should add entry to history", () => {
      const initialHistoryLength = workshopStore.historique.length;
      workshopStore.upgradeFacility("trempage");

      expect(workshopStore.historique.length).toBe(initialHistoryLength + 1);
      expect(workshopStore.historique[0].type).toBe("facility");
      expect(workshopStore.historique[0].devise).toBe("or");
    });

    it("upgradeFacility() should fail if insufficient gold", () => {
      playerStore.or = 0;
      const result = workshopStore.upgradeFacility("trempage");
      expect(result).toBe(false);
    });

    it("upgradeFacility() should fail if max level reached", () => {
      const facilityData = FACILITIES.trempage;
      workshopStore.facilities.trempage.niveau = facilityData.niveauMax;
      const result = workshopStore.upgradeFacility("trempage");
      expect(result).toBe(false);
    });
  });

  // ========== QUESTS ACTIONS ==========

  describe("Quest Progress", () => {
    it("updateQuestProgress() should update upgrade quests", () => {
      const upgradeQuest = workshopStore.quests.find(
        (q) => q.type === "upgrade",
      );
      if (upgradeQuest) {
        const initial = upgradeQuest.progression;
        workshopStore.updateQuestProgress("upgrade", 1);
        expect(upgradeQuest.progression).toBe(initial + 1);
      }
    });

    it("updateQuestProgress() should cap progression at objective", () => {
      const upgradeQuest = workshopStore.quests.find(
        (q) => q.type === "upgrade",
      );
      if (upgradeQuest) {
        workshopStore.updateQuestProgress("upgrade", 9999);
        expect(upgradeQuest.progression).toBeLessThanOrEqual(
          upgradeQuest.objectif,
        );
      }
    });

    it("completeQuest() should mark quest as completed", () => {
      const quest = workshopStore.quests[0];
      if (quest) {
        workshopStore.completeQuest(quest.id);
        expect(quest.terminee).toBe(true);
        expect(quest.dateCompletee).toBeDefined();
      }
    });

    it("completeQuest() should grant rewards", () => {
      const quest = workshopStore.quests.find((q) => q.recompense.ecus > 0);
      if (quest) {
        const initialEcus = playerStore.ecus;
        workshopStore.completeQuest(quest.id);
        expect(playerStore.ecus).toBeGreaterThan(initialEcus);
      }
    });

    it("completeQuest() should grant gold rewards", () => {
      const quest = workshopStore.quests.find((q) => q.recompense.or > 0);
      if (quest) {
        const initialOr = playerStore.or;
        workshopStore.completeQuest(quest.id);
        expect(playerStore.or).toBeGreaterThan(initialOr);
      }
    });

    it("completeQuest() should grant XP rewards", () => {
      const quest = workshopStore.quests.find((q) => q.recompense.experience);
      if (quest) {
        const initialXP = playerStore.experience;
        workshopStore.completeQuest(quest.id);
        expect(playerStore.experience).toBeGreaterThan(initialXP);
      }
    });
  });

  // ========== HISTORY ACTIONS ==========

  describe("History", () => {
    it("ajouterHistorique() should add entry to history", () => {
      const entry = {
        type: "upgrade",
        nom: "Test",
        details: "Level 1 → 2",
        cout: 100,
        devise: "écus",
        timestamp: Date.now(),
      };

      workshopStore.ajouterHistorique(entry);
      expect(workshopStore.historique.length).toBeGreaterThan(0);
      expect(workshopStore.historique[0].nom).toBe("Test");
      expect(workshopStore.historique[0].time).toBeDefined();
    });

    it("ajouterHistorique() should keep only last 5 entries", () => {
      // Add 10 entries
      for (let i = 0; i < 10; i++) {
        workshopStore.ajouterHistorique({
          type: "upgrade",
          nom: `Entry ${i}`,
          details: "Test",
          cout: 100,
          devise: "écus",
          timestamp: Date.now(),
        });
      }

      expect(workshopStore.historique.length).toBe(5);
    });

    it("ajouterHistorique() should add newest entry at the beginning", () => {
      workshopStore.ajouterHistorique({
        type: "upgrade",
        nom: "First",
        details: "Test",
        cout: 100,
        devise: "écus",
        timestamp: Date.now(),
      });

      workshopStore.ajouterHistorique({
        type: "upgrade",
        nom: "Second",
        details: "Test",
        cout: 100,
        devise: "écus",
        timestamp: Date.now(),
      });

      expect(workshopStore.historique[0].nom).toBe("Second");
      expect(workshopStore.historique[1].nom).toBe("First");
    });
  });

  // ========== RESET ==========

  describe("Reset", () => {
    it("reset() should reset all state and reinitialize", () => {
      // Modify state
      workshopStore.upgradeTool("marteau");
      workshopStore.facilities.trempage.actif = true;

      // Reset
      workshopStore.reset();

      // Verify reset
      expect(workshopStore.tools.marteau.niveau).toBe(
        TOOLS.marteau.niveauInitial,
      );
      expect(workshopStore.facilities.trempage.actif).toBe(false);
      expect(workshopStore.historique.length).toBe(0);
    });
  });
});
