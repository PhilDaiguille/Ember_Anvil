import { describe, it, expect, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { usePrestigeStore } from "@/stores/prestige";
import { usePlayerStore } from "@/stores/player";
import { useInventoryStore } from "@/stores/inventory";

describe("PrestigeStore", () => {
  let prestige;
  let player;
  let inventory;

  beforeEach(() => {
    setActivePinia(createPinia());
    prestige = usePrestigeStore();
    player = usePlayerStore();
    inventory = useInventoryStore();
  });

  describe("essenceGagnable", () => {
    it("est 0 sous le niveau 20", () => {
      expect(prestige.essenceGagnable(19)).toBe(0);
    });
    it("vaut 1 au niveau 20, puis +1 tous les 5 niveaux", () => {
      expect(prestige.essenceGagnable(20)).toBe(1);
      expect(prestige.essenceGagnable(25)).toBe(2);
      expect(prestige.essenceGagnable(30)).toBe(3);
    });
  });

  describe("renaitre", () => {
    it("refuse sous le niveau requis", () => {
      player.niveau = 10;
      expect(prestige.renaitre()).toBe(false);
      expect(prestige.renaissances).toBe(0);
    });

    it("gagne de l'essence et réinitialise la progression", () => {
      player.niveau = 25;
      player.ecus = 99999;
      inventory.ajouterMaterial("fer", 10);

      expect(prestige.renaitre()).toBe(true);
      expect(prestige.essence).toBe(2);
      expect(prestige.renaissances).toBe(1);
      expect(player.niveau).toBe(1);
      expect(player.ecus).toBe(1250);
      expect(inventory.getQuantite("fer")).toBe(0);
    });
  });

  describe("ameliorerBonus", () => {
    it("refuse sans assez d'essence", () => {
      expect(prestige.ameliorerBonus("vitesse")).toBe(false);
      expect(prestige.bonus.vitesse).toBe(0);
    });

    it("achète un bonus et déduit l'essence", () => {
      prestige.essence = 10;
      expect(prestige.ameliorerBonus("vitesse")).toBe(true);
      expect(prestige.bonus.vitesse).toBe(1);
      expect(prestige.essence).toBe(7); // coût = 3 * 1
    });

    it("applique les multiplicateurs", () => {
      prestige.essence = 100;
      prestige.ameliorerBonus("vitesse");
      expect(prestige.multiplicateurVitesse).toBeCloseTo(0.96);
      prestige.bonus.qualite = 3;
      expect(prestige.bonusQualite).toBe(1);
      prestige.bonus.gain = 2;
      expect(prestige.multiplicateurGain).toBeCloseTo(1.1);
    });
  });
});
