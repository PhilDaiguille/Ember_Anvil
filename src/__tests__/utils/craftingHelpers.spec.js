import { describe, it, expect, beforeEach } from "vitest";
import { getMaterialNom, peutCrafter } from "@/shared/utils/craftingHelpers";

describe("craftingHelpers", () => {
  // ========== getMaterialNom ==========

  describe("getMaterialNom", () => {
    it("should return the material name for a known material id", () => {
      // "aluminium" is defined in the materials data
      const nom = getMaterialNom("aluminium");
      expect(typeof nom).toBe("string");
      expect(nom.length).toBeGreaterThan(0);
      expect(nom).not.toBe("aluminium");
    });

    it("should return the materialId itself when the id is unknown", () => {
      const unknown = "matiere_inconnue_xyz";
      expect(getMaterialNom(unknown)).toBe(unknown);
    });
  });

  // ========== peutCrafter ==========

  describe("peutCrafter", () => {
    const makeInventory = (quantities = {}) => ({
      hasEnough: (materialId, quantite) =>
        (quantities[materialId] || 0) >= quantite,
    });

    const recipe = {
      niveauRequis: 5,
      ingredients: [
        { materialId: "fer_brut", quantite: 3 },
        { materialId: "charbon", quantite: 2 },
      ],
    };

    it("should return possible: true when level and materials are sufficient", () => {
      const inventory = makeInventory({ fer_brut: 5, charbon: 4 });
      const result = peutCrafter(recipe, 5, inventory);
      expect(result.possible).toBe(true);
    });

    it("should return possible: false with raison when level is too low", () => {
      const inventory = makeInventory({ fer_brut: 5, charbon: 4 });
      const result = peutCrafter(recipe, 4, inventory);
      expect(result.possible).toBe(false);
      expect(result.raison).toBe("Niveau insuffisant");
    });

    it("should return possible: false with raison when materials are missing", () => {
      const inventory = makeInventory({ fer_brut: 1, charbon: 4 });
      const result = peutCrafter(recipe, 10, inventory);
      expect(result.possible).toBe(false);
      expect(result.raison).toBe("Matériaux insuffisants");
    });

    it("should return possible: false when all materials are missing", () => {
      const inventory = makeInventory({});
      const result = peutCrafter(recipe, 10, inventory);
      expect(result.possible).toBe(false);
      expect(result.raison).toBe("Matériaux insuffisants");
    });

    it("should accept exact required quantities", () => {
      const inventory = makeInventory({ fer_brut: 3, charbon: 2 });
      const result = peutCrafter(recipe, 5, inventory);
      expect(result.possible).toBe(true);
    });
  });
});
