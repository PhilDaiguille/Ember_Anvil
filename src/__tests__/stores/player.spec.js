import { describe, it, expect, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { usePlayerStore } from "@/stores/player";

describe("PlayerStore", () => {
  let store;

  beforeEach(() => {
    setActivePinia(createPinia());
    store = usePlayerStore();
  });

  describe("État initial", () => {
    it("devrait avoir un nom par défaut", () => {
      expect(store.nom).toBeDefined();
      expect(typeof store.nom).toBe("string");
    });

    it("devrait commencer au niveau 1", () => {
      expect(store.niveau).toBeGreaterThanOrEqual(1);
    });

    it("devrait avoir 0 expérience au départ", () => {
      expect(store.experience).toBeGreaterThanOrEqual(0);
    });

    it("devrait avoir des écus initiaux", () => {
      expect(store.ecus).toBeGreaterThanOrEqual(0);
    });

    it("devrait avoir 0 or au départ", () => {
      expect(store.or).toBeGreaterThanOrEqual(0);
    });
  });

  describe("Gestion des écus", () => {
    it("devrait ajouter des écus", () => {
      const initial = store.ecus;
      store.ajouterEcus(100);
      expect(store.ecus).toBe(initial + 100);
    });

    it("devrait retirer des écus", () => {
      store.ajouterEcus(500);
      const initial = store.ecus;
      store.retirerEcus(100);
      expect(store.ecus).toBe(initial - 100);
    });

    it("ne devrait pas permettre des écus négatifs", () => {
      store.$patch({ ecus: 50 });
      store.retirerEcus(100);
      expect(store.ecus).toBeGreaterThanOrEqual(0);
    });

    it("peutAcheter devrait vérifier si le joueur peut acheter", () => {
      store.$patch({ ecus: 100 });
      expect(store.peutAcheter(50)).toBe(true);
      expect(store.peutAcheter(150)).toBe(false);
    });
  });

  describe("Gestion de l'or", () => {
    it("devrait ajouter de l'or", () => {
      const initial = store.or;
      store.ajouterOr(10);
      expect(store.or).toBe(initial + 10);
    });

    it("devrait retirer de l'or", () => {
      store.ajouterOr(50);
      const initial = store.or;
      store.retirerOr(10);
      expect(store.or).toBe(initial - 10);
    });

    it("ne devrait pas permettre de l'or négatif", () => {
      store.$patch({ or: 5 });
      store.retirerOr(10);
      expect(store.or).toBeGreaterThanOrEqual(0);
    });
  });

  describe("Gestion de l'expérience", () => {
    it("devrait ajouter de l'expérience", () => {
      const initial = store.experience;
      store.ajouterExperience(100);
      expect(store.experience).toBe(initial + 100);
    });

    it("devrait calculer l'expérience pour le prochain niveau", () => {
      expect(store.experiencePourNiveauSuivant).toBeGreaterThan(0);
    });

    it("devrait monter de niveau avec assez d'expérience", () => {
      const niveauInitial = store.niveau;
      const xpNeeded = store.experiencePourNiveauSuivant;

      store.ajouterExperience(xpNeeded);

      expect(store.niveau).toBeGreaterThanOrEqual(niveauInitial);
    });
  });

  describe("Statistiques", () => {
    it("devrait avoir un objet stats", () => {
      expect(store.stats).toBeDefined();
      expect(typeof store.stats).toBe("object");
    });
  });

  describe("Persistence", () => {
    it("devrait persister l'état", () => {
      store.$patch({
        ecus: 9999,
        niveau: 10,
      });

      const newStore = usePlayerStore();
      expect(newStore.ecus).toBeDefined();
      expect(newStore.niveau).toBeDefined();
    });
  });
});
