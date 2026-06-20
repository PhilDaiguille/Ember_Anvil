import { describe, it, expect } from "vitest";
import { getMarketModifier, getPrixAchat, getPrixVente, getTendance } from "@/shared/utils/market";

describe("market", () => {
  const date = new Date("2026-06-20T12:00:00Z");

  it("le modificateur reste dans [0.8, 1.2]", () => {
    for (const id of ["fer", "cuir", "bois", "or", "diamant"]) {
      const m = getMarketModifier(id, date);
      expect(m).toBeGreaterThanOrEqual(0.8);
      expect(m).toBeLessThanOrEqual(1.2);
    }
  });

  it("est déterministe le même jour", () => {
    expect(getMarketModifier("fer", date)).toBe(getMarketModifier("fer", date));
  });

  it("change d'un jour à l'autre", () => {
    const demain = new Date("2026-06-21T12:00:00Z");
    expect(getMarketModifier("fer", date)).not.toBe(getMarketModifier("fer", demain));
  });

  it("les prix ajustés sont des entiers >= 1", () => {
    const mat = { id: "fer", prixAchat: 6, prixVente: 4 };
    const a = getPrixAchat(mat, date);
    const v = getPrixVente(mat, date);
    expect(Number.isInteger(a)).toBe(true);
    expect(Number.isInteger(v)).toBe(true);
    expect(a).toBeGreaterThanOrEqual(1);
    expect(v).toBeGreaterThanOrEqual(1);
  });

  it("retourne une tendance valide", () => {
    expect(["hausse", "baisse", "stable"]).toContain(getTendance("fer", date));
  });
});
