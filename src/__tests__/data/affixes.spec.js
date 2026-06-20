import { describe, it, expect } from "vitest";
import { roulerAffixe, AFFIXES } from "@/data/affixes";

describe("affixes", () => {
  it("ne retourne aucun affixe si le tirage dépasse la chance", () => {
    // rng renvoie 1 → > chance quelle que soit la qualité
    expect(roulerAffixe(5, () => 1)).toBeNull();
  });

  it("retourne un affixe valide quand le tirage réussit", () => {
    // premier rng = 0 (réussite), second = 0 (premier affixe)
    const valeurs = [0, 0];
    let i = 0;
    const affixe = roulerAffixe(3, () => valeurs[i++]);
    expect(AFFIXES).toContain(affixe);
  });

  it("plafonne l'index d'affixe à la longueur de la liste", () => {
    const valeurs = [0, 0.99];
    let i = 0;
    const affixe = roulerAffixe(5, () => valeurs[i++]);
    expect(AFFIXES).toContain(affixe);
  });

  it("la qualité 1 ne peut tirer que le premier affixe", () => {
    const valeurs = [0, 0.99];
    let i = 0;
    const affixe = roulerAffixe(1, () => valeurs[i++]);
    expect(affixe).toBe(AFFIXES[0]);
  });
});
