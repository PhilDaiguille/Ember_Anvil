import { describe, it, expect } from "vitest";
import { filterMaterials } from "@/shared/utils/filterHelpers";

const materials = [
  { nom: "Fer brut", type: "métal", rarity: "common" },
  { nom: "Acier fin", type: "métal", rarity: "uncommon" },
  { nom: "Mithril", type: "métal", rarity: "rare" },
  { nom: "Gemme rouge", type: "gemme", rarity: "epic" },
  { nom: "Éclat légendaire", type: "cristal", rarity: "legendary" },
];

describe("filterHelpers", () => {
  describe("filterMaterials", () => {
    it("should return all materials when filter is 'all' and query is empty", () => {
      expect(filterMaterials(materials, "all", "")).toHaveLength(5);
    });

    it("should filter by rarity", () => {
      const result = filterMaterials(materials, "common", "");
      expect(result).toHaveLength(1);
      expect(result[0].nom).toBe("Fer brut");
    });

    it("should filter by search query on nom", () => {
      const result = filterMaterials(materials, "all", "acier");
      expect(result).toHaveLength(1);
      expect(result[0].nom).toBe("Acier fin");
    });

    it("should filter by search query on type", () => {
      const result = filterMaterials(materials, "all", "gemme");
      expect(result).toHaveLength(1);
      expect(result[0].nom).toBe("Gemme rouge");
    });

    it("should combine rarity and search filters", () => {
      const result = filterMaterials(materials, "uncommon", "acier");
      expect(result).toHaveLength(1);
      expect(result[0].nom).toBe("Acier fin");
    });

    it("should return empty array when no materials match", () => {
      const result = filterMaterials(materials, "rare", "gemme");
      expect(result).toHaveLength(0);
    });

    it("should be case-insensitive for search query", () => {
      const result = filterMaterials(materials, "all", "FER");
      expect(result).toHaveLength(1);
      expect(result[0].nom).toBe("Fer brut");
    });

    it("should trim whitespace from search query", () => {
      const result = filterMaterials(materials, "all", "  fer  ");
      expect(result).toHaveLength(1);
      expect(result[0].nom).toBe("Fer brut");
    });

    it("should return empty array for empty input array", () => {
      expect(filterMaterials([], "all", "fer")).toHaveLength(0);
    });

    it("should not mutate the original array", () => {
      const original = [...materials];
      filterMaterials(materials, "rare", "mithril");
      expect(materials).toHaveLength(original.length);
    });
  });
});
