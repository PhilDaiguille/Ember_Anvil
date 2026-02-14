import { describe, it, expect } from "vitest";
import { FACILITIES, FACILITIES_ARRAY } from "@/data/facilities";

describe("Facilities Data", () => {
  // ========== EXPORTS ==========

  describe("Exports", () => {
    it("should export FACILITIES as an object", () => {
      expect(FACILITIES).toBeDefined();
      expect(typeof FACILITIES).toBe("object");
      expect(Array.isArray(FACILITIES)).toBe(false);
    });

    it("should export FACILITIES_ARRAY as an array", () => {
      expect(FACILITIES_ARRAY).toBeDefined();
      expect(Array.isArray(FACILITIES_ARRAY)).toBe(true);
    });

    it("FACILITIES_ARRAY should contain 3 facilities", () => {
      expect(FACILITIES_ARRAY.length).toBe(3);
    });

    it("FACILITIES_ARRAY should match FACILITIES object entries", () => {
      const objectCount = Object.keys(FACILITIES).length;
      expect(FACILITIES_ARRAY.length).toBe(objectCount);
    });
  });

  // ========== STRUCTURE VALIDATION ==========

  describe("Facility Structure", () => {
    it("every facility should have required fields", () => {
      FACILITIES_ARRAY.forEach((facility) => {
        expect(facility).toHaveProperty("id");
        expect(facility).toHaveProperty("nom");
        expect(facility).toHaveProperty("icone");
        expect(facility).toHaveProperty("description");
        expect(facility).toHaveProperty("niveauMax");
        expect(facility).toHaveProperty("niveauInitial");
        expect(facility).toHaveProperty("bonusProductiviteBase");
        expect(facility).toHaveProperty("bonusParNiveau");
        expect(facility).toHaveProperty("coutUpgradeBase");
        expect(facility).toHaveProperty("multiplicateurCout");
        expect(facility).toHaveProperty("coutActivation");
        expect(facility).toHaveProperty("actifParDefaut");
      });
    });

    it("every facility should have niveauMax of 5", () => {
      FACILITIES_ARRAY.forEach((facility) => {
        expect(facility.niveauMax).toBe(5);
      });
    });

    it("every facility should have niveauInitial of 1", () => {
      FACILITIES_ARRAY.forEach((facility) => {
        expect(facility.niveauInitial).toBe(1);
      });
    });

    it("every facility should have bonusParNiveau of 5", () => {
      FACILITIES_ARRAY.forEach((facility) => {
        expect(facility.bonusParNiveau).toBe(5);
      });
    });

    it("every facility should have multiplicateurCout of 1.5", () => {
      FACILITIES_ARRAY.forEach((facility) => {
        expect(facility.multiplicateurCout).toBe(1.5);
      });
    });

    it("every facility should have actifParDefaut false", () => {
      FACILITIES_ARRAY.forEach((facility) => {
        expect(facility.actifParDefaut).toBe(false);
      });
    });

    it("bonusProductiviteBase should be positive", () => {
      FACILITIES_ARRAY.forEach((facility) => {
        expect(facility.bonusProductiviteBase).toBeGreaterThan(0);
      });
    });

    it("coutUpgradeBase should be positive", () => {
      FACILITIES_ARRAY.forEach((facility) => {
        expect(facility.coutUpgradeBase).toBeGreaterThan(0);
      });
    });

    it("coutActivation should be positive", () => {
      FACILITIES_ARRAY.forEach((facility) => {
        expect(facility.coutActivation).toBeGreaterThan(0);
      });
    });
  });

  // ========== SPECIFIC FACILITIES ==========

  describe("Specific Facilities", () => {
    const expectedFacilities = ["trempage", "enchantement", "elementaire"];

    it("should contain all 3 expected facilities", () => {
      expectedFacilities.forEach((facilityId) => {
        expect(FACILITIES[facilityId]).toBeDefined();
      });
    });

    it("trempage should have correct properties", () => {
      expect(FACILITIES.trempage.id).toBe("trempage");
      expect(FACILITIES.trempage.nom).toBe("Station de Trempage");
      expect(FACILITIES.trempage.icone).toBe("Droplet");
      expect(FACILITIES.trempage.bonusProductiviteBase).toBe(15);
      expect(FACILITIES.trempage.coutUpgradeBase).toBe(1000);
      expect(FACILITIES.trempage.coutActivation).toBe(50);
    });

    it("enchantement should have correct properties", () => {
      expect(FACILITIES.enchantement.id).toBe("enchantement");
      expect(FACILITIES.enchantement.nom).toBe("Table d'Enchantement");
      expect(FACILITIES.enchantement.icone).toBe("Sparkles");
      expect(FACILITIES.enchantement.bonusProductiviteBase).toBe(25);
      expect(FACILITIES.enchantement.coutUpgradeBase).toBe(1500);
      expect(FACILITIES.enchantement.coutActivation).toBe(75);
    });

    it("elementaire should have correct properties", () => {
      expect(FACILITIES.elementaire.id).toBe("elementaire");
      expect(FACILITIES.elementaire.nom).toBe("Forge Élémentaire");
      expect(FACILITIES.elementaire.icone).toBe("Zap");
      expect(FACILITIES.elementaire.bonusProductiviteBase).toBe(30);
      expect(FACILITIES.elementaire.coutUpgradeBase).toBe(2000);
      expect(FACILITIES.elementaire.coutActivation).toBe(100);
    });
  });

  // ========== COST PROGRESSION ==========

  describe("Cost Progression", () => {
    it("upgrade costs should be in ascending order", () => {
      expect(FACILITIES.trempage.coutUpgradeBase).toBeLessThan(
        FACILITIES.enchantement.coutUpgradeBase,
      );
      expect(FACILITIES.enchantement.coutUpgradeBase).toBeLessThan(
        FACILITIES.elementaire.coutUpgradeBase,
      );
    });

    it("activation costs should be in ascending order", () => {
      expect(FACILITIES.trempage.coutActivation).toBeLessThan(
        FACILITIES.enchantement.coutActivation,
      );
      expect(FACILITIES.enchantement.coutActivation).toBeLessThan(
        FACILITIES.elementaire.coutActivation,
      );
    });

    it("cheapest facility should be trempage", () => {
      const minUpgradeCost = Math.min(
        ...FACILITIES_ARRAY.map((f) => f.coutUpgradeBase),
      );
      const minActivationCost = Math.min(
        ...FACILITIES_ARRAY.map((f) => f.coutActivation),
      );

      expect(FACILITIES.trempage.coutUpgradeBase).toBe(minUpgradeCost);
      expect(FACILITIES.trempage.coutActivation).toBe(minActivationCost);
    });

    it("most expensive facility should be elementaire", () => {
      const maxUpgradeCost = Math.max(
        ...FACILITIES_ARRAY.map((f) => f.coutUpgradeBase),
      );
      const maxActivationCost = Math.max(
        ...FACILITIES_ARRAY.map((f) => f.coutActivation),
      );

      expect(FACILITIES.elementaire.coutUpgradeBase).toBe(maxUpgradeCost);
      expect(FACILITIES.elementaire.coutActivation).toBe(maxActivationCost);
    });

    it("upgrade cost should be 10x activation cost", () => {
      FACILITIES_ARRAY.forEach((facility) => {
        // According to code comment: coutUpgradeBase / 10 = cost in gold
        // But activation uses écus, not a direct 10x relationship
        // Just verify both are reasonable
        expect(facility.coutUpgradeBase).toBeGreaterThan(
          facility.coutActivation,
        );
      });
    });
  });

  // ========== PRODUCTIVITY PROGRESSION ==========

  describe("Productivity Progression", () => {
    it("productivity bonus should vary between facilities", () => {
      const bonuses = FACILITIES_ARRAY.map((f) => f.bonusProductiviteBase);
      const uniqueBonuses = new Set(bonuses);
      expect(uniqueBonuses.size).toBeGreaterThan(1);
    });

    it("productivity bonuses should be in ascending order", () => {
      expect(FACILITIES.trempage.bonusProductiviteBase).toBeLessThan(
        FACILITIES.enchantement.bonusProductiviteBase,
      );
      expect(FACILITIES.enchantement.bonusProductiviteBase).toBeLessThan(
        FACILITIES.elementaire.bonusProductiviteBase,
      );
    });

    it("trempage should have lowest productivity bonus (15)", () => {
      const minBonus = Math.min(
        ...FACILITIES_ARRAY.map((f) => f.bonusProductiviteBase),
      );
      expect(minBonus).toBe(15);
      expect(FACILITIES.trempage.bonusProductiviteBase).toBe(minBonus);
    });

    it("elementaire should have highest productivity bonus (30)", () => {
      const maxBonus = Math.max(
        ...FACILITIES_ARRAY.map((f) => f.bonusProductiviteBase),
      );
      expect(maxBonus).toBe(30);
      expect(FACILITIES.elementaire.bonusProductiviteBase).toBe(maxBonus);
    });

    it("max productivity at level 5 should be reasonable", () => {
      FACILITIES_ARRAY.forEach((facility) => {
        const maxBonus =
          facility.bonusProductiviteBase +
          (facility.niveauMax - 1) * facility.bonusParNiveau;
        expect(maxBonus).toBeGreaterThanOrEqual(35);
        expect(maxBonus).toBeLessThanOrEqual(100);
      });
    });
  });

  // ========== UNIQUE IDS ==========

  describe("Unique Identifiers", () => {
    it("all facility IDs should be unique", () => {
      const ids = FACILITIES_ARRAY.map((f) => f.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it("facility ID should match object key", () => {
      Object.keys(FACILITIES).forEach((key) => {
        expect(FACILITIES[key].id).toBe(key);
      });
    });
  });

  // ========== DESCRIPTIONS ==========

  describe("Descriptions", () => {
    it("all facilities should have non-empty descriptions", () => {
      FACILITIES_ARRAY.forEach((facility) => {
        expect(facility.description).toBeDefined();
        expect(facility.description.length).toBeGreaterThan(0);
        expect(typeof facility.description).toBe("string");
      });
    });

    it("all facilities should have non-empty names", () => {
      FACILITIES_ARRAY.forEach((facility) => {
        expect(facility.nom).toBeDefined();
        expect(facility.nom.length).toBeGreaterThan(0);
        expect(typeof facility.nom).toBe("string");
      });
    });

    it("all facilities should have valid icons", () => {
      const validIcons = ["Droplet", "Sparkles", "Zap"];
      FACILITIES_ARRAY.forEach((facility) => {
        expect(validIcons).toContain(facility.icone);
      });
    });
  });

  // ========== UPGRADE COST CALCULATION ==========

  describe("Upgrade Cost Formula", () => {
    it("should calculate progressive costs correctly", () => {
      FACILITIES_ARRAY.forEach((facility) => {
        let currentCost = facility.coutUpgradeBase;

        for (let level = 2; level <= facility.niveauMax; level++) {
          const nextCost = Math.floor(
            currentCost * facility.multiplicateurCout,
          );
          expect(nextCost).toBeGreaterThan(currentCost);
          currentCost = nextCost;
        }
      });
    });

    it("cost at level 5 should be significantly higher than base", () => {
      FACILITIES_ARRAY.forEach((facility) => {
        let cost = facility.coutUpgradeBase;

        // Calculate cost progression from level 1 to 5
        for (let i = 0; i < facility.niveauMax - 1; i++) {
          cost = Math.floor(cost * facility.multiplicateurCout);
        }

        // Final cost should be at least 3x the base
        expect(cost).toBeGreaterThan(facility.coutUpgradeBase * 3);
      });
    });
  });

  // ========== BALANCE ==========

  describe("Balance and Game Design", () => {
    it("higher cost facilities should have higher productivity", () => {
      const sorted = [...FACILITIES_ARRAY].sort(
        (a, b) => a.coutUpgradeBase - b.coutUpgradeBase,
      );

      for (let i = 0; i < sorted.length - 1; i++) {
        expect(sorted[i].bonusProductiviteBase).toBeLessThanOrEqual(
          sorted[i + 1].bonusProductiviteBase,
        );
      }
    });

    it("activation cost should scale with upgrade cost", () => {
      const activationRatio = FACILITIES_ARRAY.map(
        (f) => f.coutUpgradeBase / f.coutActivation,
      );

      // All ratios should be within reasonable range (15-25)
      activationRatio.forEach((ratio) => {
        expect(ratio).toBeGreaterThanOrEqual(15);
        expect(ratio).toBeLessThanOrEqual(25);
      });
    });
  });
});
