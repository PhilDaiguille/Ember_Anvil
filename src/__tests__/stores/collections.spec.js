import { describe, it, expect, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useCollectionsStore } from "@/stores/collections";
import { useCodexStore } from "@/stores/codex";
import { COLLECTIONS } from "@/data/collections";

describe("CollectionsStore", () => {
  let collections;
  let codex;

  beforeEach(() => {
    setActivePinia(createPinia());
    collections = useCollectionsStore();
    codex = useCodexStore();
  });

  it("aucune collection complète au départ → multiplicateurs neutres", () => {
    expect(collections.collectionsCompletes.length).toBe(0);
    expect(collections.multiplicateurGain).toBe(1);
    expect(collections.multiplicateurVitesse).toBe(1);
    expect(collections.bonusQualite).toBe(0);
  });

  it("marque une collection complète quand toutes ses recettes sont découvertes", () => {
    const col = COLLECTIONS.find((c) => c.bonus.type === "gain");
    codex.discoveredRecipes = [...col.recipeIds];
    const statut = collections.collectionsAvecStatut.find((c) => c.id === col.id);
    expect(statut.complete).toBe(true);
    expect(statut.obtenues).toBe(col.recipeIds.length);
    expect(collections.multiplicateurGain).toBeCloseTo(1 + col.bonus.valeur);
  });

  it("progression partielle ne complète pas", () => {
    const col = COLLECTIONS[0];
    codex.discoveredRecipes = [col.recipeIds[0]];
    const statut = collections.collectionsAvecStatut.find((c) => c.id === col.id);
    expect(statut.complete).toBe(false);
    expect(statut.obtenues).toBe(1);
  });

  it("le bonus vitesse reste plafonné à 0.5", () => {
    // Complète toutes les collections vitesse
    const ids = COLLECTIONS.filter((c) => c.bonus.type === "vitesse").flatMap((c) => c.recipeIds);
    codex.discoveredRecipes = ids;
    expect(collections.multiplicateurVitesse).toBeGreaterThanOrEqual(0.5);
  });
});
