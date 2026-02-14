import { describe, it, expect } from "vitest";
import { TOOLS, TOOLS_ARRAY } from "@/data/tools";

describe("Tools Data", () => {
  // ========== EXPORTS ==========

  describe("Exports", () => {
    it("should export TOOLS as an object", () => {
      expect(TOOLS).toBeDefined();
      expect(typeof TOOLS).toBe("object");
      expect(Array.isArray(TOOLS)).toBe(false);
    });

    it("should export TOOLS_ARRAY as an array", () => {
      expect(TOOLS_ARRAY).toBeDefined();
      expect(Array.isArray(TOOLS_ARRAY)).toBe(true);
    });

    it("TOOLS_ARRAY should contain 4 tools", () => {
      expect(TOOLS_ARRAY.length).toBe(4);
    });

    it("TOOLS_ARRAY should match TOOLS object entries", () => {
      const objectCount = Object.keys(TOOLS).length;
      expect(TOOLS_ARRAY.length).toBe(objectCount);
    });
  });

  // ========== STRUCTURE VALIDATION ==========

  describe("Tool Structure", () => {
    it("every tool should have required fields", () => {
      TOOLS_ARRAY.forEach((tool) => {
        expect(tool).toHaveProperty("id");
        expect(tool).toHaveProperty("nom");
        expect(tool).toHaveProperty("icone");
        expect(tool).toHaveProperty("description");
        expect(tool).toHaveProperty("niveauMax");
        expect(tool).toHaveProperty("niveauInitial");
        expect(tool).toHaveProperty("pouvoirInitial");
        expect(tool).toHaveProperty("pouvoirParNiveau");
        expect(tool).toHaveProperty("coutUpgradeBase");
        expect(tool).toHaveProperty("multiplicateurCout");
        expect(tool).toHaveProperty("bonusFacilite");
      });
    });

    it("every tool should have niveauMax of 10", () => {
      TOOLS_ARRAY.forEach((tool) => {
        expect(tool.niveauMax).toBe(10);
      });
    });

    it("every tool should have niveauInitial of 1", () => {
      TOOLS_ARRAY.forEach((tool) => {
        expect(tool.niveauInitial).toBe(1);
      });
    });

    it("every tool should have pouvoirParNiveau of 5", () => {
      TOOLS_ARRAY.forEach((tool) => {
        expect(tool.pouvoirParNiveau).toBe(5);
      });
    });

    it("every tool should have multiplicateurCout of 1.5", () => {
      TOOLS_ARRAY.forEach((tool) => {
        expect(tool.multiplicateurCout).toBe(1.5);
      });
    });

    it("pouvoirInitial should be positive", () => {
      TOOLS_ARRAY.forEach((tool) => {
        expect(tool.pouvoirInitial).toBeGreaterThan(0);
        expect(tool.pouvoirInitial).toBeLessThanOrEqual(100);
      });
    });

    it("coutUpgradeBase should be positive", () => {
      TOOLS_ARRAY.forEach((tool) => {
        expect(tool.coutUpgradeBase).toBeGreaterThan(0);
      });
    });

    it("bonusFacilite should be string or null", () => {
      TOOLS_ARRAY.forEach((tool) => {
        expect(
          typeof tool.bonusFacilite === "string" || tool.bonusFacilite === null,
        ).toBe(true);
      });
    });
  });

  // ========== SPECIFIC TOOLS ==========

  describe("Specific Tools", () => {
    const expectedTools = ["marteau", "enclume", "forge", "soufflet"];

    it("should contain all 4 expected tools", () => {
      expectedTools.forEach((toolId) => {
        expect(TOOLS[toolId]).toBeDefined();
      });
    });

    it("marteau should have correct properties", () => {
      expect(TOOLS.marteau.id).toBe("marteau");
      expect(TOOLS.marteau.nom).toBe("Marteau Lourd");
      expect(TOOLS.marteau.icone).toBe("Hammer");
      expect(TOOLS.marteau.pouvoirInitial).toBe(45);
      expect(TOOLS.marteau.coutUpgradeBase).toBe(500);
      expect(TOOLS.marteau.bonusFacilite).toBe("trempage");
    });

    it("enclume should have correct properties", () => {
      expect(TOOLS.enclume.id).toBe("enclume");
      expect(TOOLS.enclume.nom).toBe("Enclume Renforcée");
      expect(TOOLS.enclume.icone).toBe("Anvil");
      expect(TOOLS.enclume.pouvoirInitial).toBe(40);
      expect(TOOLS.enclume.coutUpgradeBase).toBe(800);
      expect(TOOLS.enclume.bonusFacilite).toBe("elementaire");
    });

    it("forge should have correct properties", () => {
      expect(TOOLS.forge.id).toBe("forge");
      expect(TOOLS.forge.nom).toBe("Four à Forge");
      expect(TOOLS.forge.icone).toBe("Flame");
      expect(TOOLS.forge.pouvoirInitial).toBe(50);
      expect(TOOLS.forge.coutUpgradeBase).toBe(1200);
      expect(TOOLS.forge.bonusFacilite).toBeNull();
    });

    it("soufflet should have correct properties", () => {
      expect(TOOLS.soufflet.id).toBe("soufflet");
      expect(TOOLS.soufflet.nom).toBe("Soufflet Magique");
      expect(TOOLS.soufflet.icone).toBe("Wind");
      expect(TOOLS.soufflet.pouvoirInitial).toBe(35);
      expect(TOOLS.soufflet.coutUpgradeBase).toBe(400);
      expect(TOOLS.soufflet.bonusFacilite).toBe("enchantement");
    });
  });

  // ========== SYNERGIES ==========

  describe("Synergies", () => {
    it("marteau should have synergy with trempage", () => {
      expect(TOOLS.marteau.bonusFacilite).toBe("trempage");
    });

    it("enclume should have synergy with elementaire", () => {
      expect(TOOLS.enclume.bonusFacilite).toBe("elementaire");
    });

    it("soufflet should have synergy with enchantement", () => {
      expect(TOOLS.soufflet.bonusFacilite).toBe("enchantement");
    });

    it("forge should have no synergy", () => {
      expect(TOOLS.forge.bonusFacilite).toBeNull();
    });

    it("at least 3 tools should have synergies", () => {
      const toolsWithSynergy = TOOLS_ARRAY.filter(
        (t) => t.bonusFacilite !== null,
      );
      expect(toolsWithSynergy.length).toBeGreaterThanOrEqual(3);
    });
  });

  // ========== COST PROGRESSION ==========

  describe("Cost Progression", () => {
    it("upgrade costs should be in ascending order", () => {
      const costs = [
        TOOLS.soufflet.coutUpgradeBase,
        TOOLS.marteau.coutUpgradeBase,
        TOOLS.enclume.coutUpgradeBase,
        TOOLS.forge.coutUpgradeBase,
      ];

      for (let i = 0; i < costs.length - 1; i++) {
        expect(costs[i]).toBeLessThanOrEqual(costs[i + 1]);
      }
    });

    it("cheapest tool should be soufflet (400)", () => {
      const minCost = Math.min(...TOOLS_ARRAY.map((t) => t.coutUpgradeBase));
      expect(minCost).toBe(400);
      expect(TOOLS.soufflet.coutUpgradeBase).toBe(minCost);
    });

    it("most expensive tool should be forge (1200)", () => {
      const maxCost = Math.max(...TOOLS_ARRAY.map((t) => t.coutUpgradeBase));
      expect(maxCost).toBe(1200);
      expect(TOOLS.forge.coutUpgradeBase).toBe(maxCost);
    });
  });

  // ========== POWER PROGRESSION ==========

  describe("Power Progression", () => {
    it("initial power should vary between tools", () => {
      const powers = TOOLS_ARRAY.map((t) => t.pouvoirInitial);
      const uniquePowers = new Set(powers);
      expect(uniquePowers.size).toBeGreaterThan(1);
    });

    it("forge should have highest initial power (50)", () => {
      const maxPower = Math.max(...TOOLS_ARRAY.map((t) => t.pouvoirInitial));
      expect(maxPower).toBe(50);
      expect(TOOLS.forge.pouvoirInitial).toBe(maxPower);
    });

    it("soufflet should have lowest initial power (35)", () => {
      const minPower = Math.min(...TOOLS_ARRAY.map((t) => t.pouvoirInitial));
      expect(minPower).toBe(35);
      expect(TOOLS.soufflet.pouvoirInitial).toBe(minPower);
    });

    it("all tools should reach reasonable max power at level 10", () => {
      TOOLS_ARRAY.forEach((tool) => {
        const maxPower =
          tool.pouvoirInitial + (tool.niveauMax - 1) * tool.pouvoirParNiveau;
        expect(maxPower).toBeGreaterThanOrEqual(80); // Min is soufflet at 80
        expect(maxPower).toBeLessThanOrEqual(95); // Max is forge at 95
      });
    });
  });

  // ========== UNIQUE IDS ==========

  describe("Unique Identifiers", () => {
    it("all tool IDs should be unique", () => {
      const ids = TOOLS_ARRAY.map((t) => t.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it("tool ID should match object key", () => {
      Object.keys(TOOLS).forEach((key) => {
        expect(TOOLS[key].id).toBe(key);
      });
    });
  });

  // ========== DESCRIPTIONS ==========

  describe("Descriptions", () => {
    it("all tools should have non-empty descriptions", () => {
      TOOLS_ARRAY.forEach((tool) => {
        expect(tool.description).toBeDefined();
        expect(tool.description.length).toBeGreaterThan(0);
        expect(typeof tool.description).toBe("string");
      });
    });

    it("all tools should have non-empty names", () => {
      TOOLS_ARRAY.forEach((tool) => {
        expect(tool.nom).toBeDefined();
        expect(tool.nom.length).toBeGreaterThan(0);
        expect(typeof tool.nom).toBe("string");
      });
    });

    it("all tools should have valid icons", () => {
      const validIcons = ["Hammer", "Anvil", "Flame", "Wind"];
      TOOLS_ARRAY.forEach((tool) => {
        expect(validIcons).toContain(tool.icone);
      });
    });
  });
});
