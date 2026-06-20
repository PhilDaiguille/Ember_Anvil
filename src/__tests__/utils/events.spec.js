import { describe, it, expect } from "vitest";
import {
  getEvenementDuJour,
  getMultiplicateurXP,
  getBonusQualiteEvent,
  getMultiplicateurRemise,
  EVENEMENTS,
} from "@/shared/utils/events";

describe("events", () => {
  it("retourne un événement valide et déterministe pour une date donnée", () => {
    const date = new Date("2026-06-20T12:00:00Z");
    const e = getEvenementDuJour(date);
    expect(EVENEMENTS).toContain(e);
    expect(getEvenementDuJour(date)).toBe(e);
  });

  it("les multiplicateurs correspondent à l'effet du jour", () => {
    // Cherche une date pour chaque type d'effet et vérifie la cohérence
    for (let j = 0; j < EVENEMENTS.length; j++) {
      const date = new Date(j * 86400000 + 86400000 / 2);
      const e = getEvenementDuJour(date);
      if (e.effet.type === "xp") expect(getMultiplicateurXP(date)).toBe(e.effet.valeur);
      else expect(getMultiplicateurXP(date)).toBe(1);

      if (e.effet.type === "qualite") expect(getBonusQualiteEvent(date)).toBe(e.effet.valeur);
      else expect(getBonusQualiteEvent(date)).toBe(0);

      if (e.effet.type === "remise") expect(getMultiplicateurRemise(date)).toBe(e.effet.valeur);
      else expect(getMultiplicateurRemise(date)).toBe(1);
    }
  });
});
