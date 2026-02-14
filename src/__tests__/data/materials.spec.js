import { describe, it, expect } from "vitest";
import { MATERIALS, MATERIALS_ARRAY } from "@/data/materials";

describe("Materials Data", () => {
  // ========== EXPORTS ==========

  describe("Exports", () => {
    it("should export MATERIALS as an object", () => {
      expect(MATERIALS).toBeDefined();
      expect(typeof MATERIALS).toBe("object");
      expect(Array.isArray(MATERIALS)).toBe(false);
    });

    it("should export MATERIALS_ARRAY as an array", () => {
      expect(MATERIALS_ARRAY).toBeDefined();
      expect(Array.isArray(MATERIALS_ARRAY)).toBe(true);
    });

    it("MATERIALS_ARRAY should contain 30 materials", () => {
      expect(MATERIALS_ARRAY.length).toBe(30);
    });

    it("MATERIALS_ARRAY should match MATERIALS object entries", () => {
      const objectCount = Object.keys(MATERIALS).length;
      expect(MATERIALS_ARRAY.length).toBe(objectCount);
    });
  });

  // ========== STRUCTURE VALIDATION ==========

  describe("Material Structure", () => {
    it("every material should have required fields", () => {
      MATERIALS_ARRAY.forEach((material) => {
        expect(material).toHaveProperty("id");
        expect(material).toHaveProperty("nom");
        expect(material).toHaveProperty("type");
        expect(material).toHaveProperty("rarity");
        expect(material).toHaveProperty("tier");
        expect(material).toHaveProperty("prixAchat");
        expect(material).toHaveProperty("prixVente");
        expect(material).toHaveProperty("description");
        expect(material).toHaveProperty("proprietes");
      });
    });

    it("every material should have valid type", () => {
      const validTypes = ["metal", "bois", "pierre", "gemme", "special"];
      MATERIALS_ARRAY.forEach((material) => {
        expect(validTypes).toContain(material.type);
      });
    });

    it("every material should have valid rarity", () => {
      const validRarities = ["common", "uncommon", "rare", "epic", "legendary"];
      MATERIALS_ARRAY.forEach((material) => {
        expect(validRarities).toContain(material.rarity);
      });
    });

    it("every material should have valid tier (1-5)", () => {
      MATERIALS_ARRAY.forEach((material) => {
        expect(material.tier).toBeGreaterThanOrEqual(1);
        expect(material.tier).toBeLessThanOrEqual(5);
      });
    });

    it("every material should have prixAchat > prixVente", () => {
      MATERIALS_ARRAY.forEach((material) => {
        expect(material.prixAchat).toBeGreaterThan(material.prixVente);
      });
    });

    it("every material should have proprietes object", () => {
      MATERIALS_ARRAY.forEach((material) => {
        expect(material.proprietes).toBeDefined();
        expect(typeof material.proprietes).toBe("object");
        expect(material.proprietes).toHaveProperty("resistance");
        expect(material.proprietes).toHaveProperty("conductivite");
        expect(material.proprietes).toHaveProperty("malleabilite");
      });
    });

    it("proprietes should have values between 0 and 100", () => {
      MATERIALS_ARRAY.forEach((material) => {
        const props = material.proprietes;
        expect(props.resistance).toBeGreaterThanOrEqual(0);
        expect(props.resistance).toBeLessThanOrEqual(100);
        expect(props.conductivite).toBeGreaterThanOrEqual(0);
        expect(props.conductivite).toBeLessThanOrEqual(100);
        expect(props.malleabilite).toBeGreaterThanOrEqual(0);
        expect(props.malleabilite).toBeLessThanOrEqual(100);
      });
    });
  });

  // ========== CATEGORY VALIDATION ==========

  describe("Material Categories", () => {
    it("should have exactly 8 métaux", () => {
      const metaux = MATERIALS_ARRAY.filter((m) => m.type === "metal");
      expect(metaux.length).toBe(8);
    });

    it("should have exactly 5 bois", () => {
      const bois = MATERIALS_ARRAY.filter((m) => m.type === "bois");
      expect(bois.length).toBe(5);
    });

    it("should have exactly 5 pierres", () => {
      const pierres = MATERIALS_ARRAY.filter((m) => m.type === "pierre");
      expect(pierres.length).toBe(5);
    });

    it("should have exactly 7 gemmes", () => {
      const gemmes = MATERIALS_ARRAY.filter((m) => m.type === "gemme");
      expect(gemmes.length).toBe(7);
    });

    it("should have exactly 5 spéciaux", () => {
      const speciaux = MATERIALS_ARRAY.filter((m) => m.type === "special");
      expect(speciaux.length).toBe(5);
    });
  });

  // ========== SPECIFIC MATERIALS ==========

  describe("Specific Metals", () => {
    const expectedMetals = [
      "aluminium",
      "cuivre",
      "fer",
      "etain",
      "bronze",
      "acier",
      "titane",
      "adamantium",
    ];

    it("should contain all 8 expected metals", () => {
      expectedMetals.forEach((metalId) => {
        expect(MATERIALS[metalId]).toBeDefined();
        expect(MATERIALS[metalId].type).toBe("metal");
      });
    });

    it("aluminium should be tier 1 common", () => {
      expect(MATERIALS.aluminium.tier).toBe(1);
      expect(MATERIALS.aluminium.rarity).toBe("common");
    });

    it("adamantium should be tier 5 legendary", () => {
      expect(MATERIALS.adamantium.tier).toBe(5);
      expect(MATERIALS.adamantium.rarity).toBe("legendary");
    });
  });

  describe("Specific Bois", () => {
    const expectedBois = ["chene", "erable", "pin", "ebene", "acajou"];

    it("should contain all 5 expected bois", () => {
      expectedBois.forEach((boisId) => {
        expect(MATERIALS[boisId]).toBeDefined();
        expect(MATERIALS[boisId].type).toBe("bois");
      });
    });
  });

  describe("Specific Pierres", () => {
    const expectedPierres = [
      "granit",
      "marbre",
      "basalte",
      "obsidienne",
      "jade",
    ];

    it("should contain all 5 expected pierres", () => {
      expectedPierres.forEach((pierreId) => {
        expect(MATERIALS[pierreId]).toBeDefined();
        expect(MATERIALS[pierreId].type).toBe("pierre");
      });
    });
  });

  describe("Specific Gemmes", () => {
    const expectedGemmes = [
      "quartz",
      "amethyste",
      "saphir",
      "rubis",
      "emeraude",
      "opale",
      "diamant",
    ];

    it("should contain all 7 expected gemmes", () => {
      expectedGemmes.forEach((gemmeId) => {
        expect(MATERIALS[gemmeId]).toBeDefined();
        expect(MATERIALS[gemmeId].type).toBe("gemme");
      });
    });

    it("quartz should be tier 1 common", () => {
      expect(MATERIALS.quartz.tier).toBe(1);
      expect(MATERIALS.quartz.rarity).toBe("common");
    });

    it("diamant should be tier 5 legendary", () => {
      expect(MATERIALS.diamant.tier).toBe(5);
      expect(MATERIALS.diamant.rarity).toBe("legendary");
    });
  });

  describe("Specific Spéciaux", () => {
    const expectedSpeciaux = [
      "cuir",
      "soie",
      "mithril",
      "orichalque",
      "eternium",
    ];

    it("should contain all 5 expected spéciaux", () => {
      expectedSpeciaux.forEach((specialId) => {
        expect(MATERIALS[specialId]).toBeDefined();
        expect(MATERIALS[specialId].type).toBe("special");
      });
    });

    it("mithril should be rare", () => {
      expect(MATERIALS.mithril.rarity).toBe("rare");
    });

    it("eternium should be legendary", () => {
      expect(MATERIALS.eternium.rarity).toBe("legendary");
    });
  });

  // ========== TIER/RARITY COHERENCE ==========

  describe("Tier and Rarity Coherence", () => {
    it("tier 1 materials should be common", () => {
      const tier1 = MATERIALS_ARRAY.filter((m) => m.tier === 1);
      tier1.forEach((material) => {
        expect(material.rarity).toBe("common");
      });
    });

    it("tier 2 materials should be uncommon", () => {
      const tier2 = MATERIALS_ARRAY.filter((m) => m.tier === 2);
      tier2.forEach((material) => {
        expect(material.rarity).toBe("uncommon");
      });
    });

    it("tier 3 materials should be rare", () => {
      const tier3 = MATERIALS_ARRAY.filter((m) => m.tier === 3);
      tier3.forEach((material) => {
        expect(material.rarity).toBe("rare");
      });
    });

    it("tier 4 materials should be epic", () => {
      const tier4 = MATERIALS_ARRAY.filter((m) => m.tier === 4);
      tier4.forEach((material) => {
        expect(material.rarity).toBe("epic");
      });
    });

    it("tier 5 materials should be legendary", () => {
      const tier5 = MATERIALS_ARRAY.filter((m) => m.tier === 5);
      tier5.forEach((material) => {
        expect(material.rarity).toBe("legendary");
      });
    });
  });

  // ========== PRICING VALIDATION ==========

  describe("Pricing", () => {
    it("higher tier materials should have higher prices", () => {
      for (let tier = 1; tier < 5; tier++) {
        const currentTier = MATERIALS_ARRAY.filter((m) => m.tier === tier);
        const nextTier = MATERIALS_ARRAY.filter((m) => m.tier === tier + 1);

        if (currentTier.length > 0 && nextTier.length > 0) {
          const avgCurrentPrice =
            currentTier.reduce((sum, m) => sum + m.prixAchat, 0) /
            currentTier.length;
          const avgNextPrice =
            nextTier.reduce((sum, m) => sum + m.prixAchat, 0) / nextTier.length;

          expect(avgNextPrice).toBeGreaterThan(avgCurrentPrice);
        }
      }
    });

    it("all materials should have positive prices", () => {
      MATERIALS_ARRAY.forEach((material) => {
        expect(material.prixAchat).toBeGreaterThan(0);
        expect(material.prixVente).toBeGreaterThan(0);
      });
    });
  });

  // ========== UNIQUE IDS ==========

  describe("Unique Identifiers", () => {
    it("all material IDs should be unique", () => {
      const ids = MATERIALS_ARRAY.map((m) => m.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it("material ID should match object key", () => {
      Object.keys(MATERIALS).forEach((key) => {
        expect(MATERIALS[key].id).toBe(key);
      });
    });
  });

  // ========== DESCRIPTIONS ==========

  describe("Descriptions", () => {
    it("all materials should have non-empty descriptions", () => {
      MATERIALS_ARRAY.forEach((material) => {
        expect(material.description).toBeDefined();
        expect(material.description.length).toBeGreaterThan(0);
        expect(typeof material.description).toBe("string");
      });
    });
  });
});
