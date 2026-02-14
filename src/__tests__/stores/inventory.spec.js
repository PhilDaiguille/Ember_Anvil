import { describe, it, expect, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useInventoryStore } from "@/stores/inventory";

describe("InventoryStore", () => {
  let store;

  beforeEach(() => {
    setActivePinia(createPinia());
    store = useInventoryStore();
  });

  describe("État initial", () => {
    it("devrait avoir un objet materials", () => {
      expect(store.materials).toBeDefined();
      expect(typeof store.materials).toBe("object");
    });

    it("devrait avoir une liste d'objets forgés", () => {
      expect(Array.isArray(store.craftedItems)).toBe(true);
    });

    it("devrait avoir une capacité maximale", () => {
      expect(store.capaciteMax).toBeGreaterThan(0);
    });
  });

  describe("Gestion des matériaux", () => {
    it("devrait ajouter un matériau", () => {
      store.ajouterMaterial("fer", 10);
      expect(store.materials.fer).toBe(10);
    });

    it("devrait accumuler les quantités lors d'ajouts multiples", () => {
      store.ajouterMaterial("fer", 5);
      store.ajouterMaterial("fer", 3);
      expect(store.materials.fer).toBe(8);
    });

    it("devrait retirer un matériau", () => {
      store.ajouterMaterial("cuivre", 20);
      const result = store.retirerMaterial("cuivre", 5);
      expect(result).toBe(true);
      expect(store.materials.cuivre).toBe(15);
    });

    it("ne devrait pas retirer plus que disponible", () => {
      store.ajouterMaterial("bronze", 10);
      const result = store.retirerMaterial("bronze", 20);
      expect(result).toBe(false);
      expect(store.materials.bronze).toBe(10);
    });

    it("hasEnough devrait vérifier la quantité disponible", () => {
      store.ajouterMaterial("or", 50);
      expect(store.hasEnough("or", 30)).toBe(true);
      expect(store.hasEnough("or", 100)).toBe(false);
    });

    it("getQuantite devrait retourner la quantité d'un matériau", () => {
      store.ajouterMaterial("argent", 25);
      expect(store.getQuantite("argent")).toBe(25);
      expect(store.getQuantite("inexistant")).toBe(0);
    });
  });

  describe("Objets forgés", () => {
    it("devrait ajouter un objet forgé avec ajouterObjet", () => {
      const item = {
        nom: "Épée de fer",
        categorie: "arme",
        qualite: 3,
        valeur: 150,
      };

      const result = store.ajouterObjet(item);
      expect(result).toBe(true);
      expect(store.craftedItems).toContainEqual(
        expect.objectContaining({ nom: "Épée de fer" }),
      );
    });

    it("devrait ajouter un objet forgé avec ajouterObjetForge (alias)", () => {
      const item = {
        nom: "Hache de bataille",
        categorie: "arme",
        qualite: 4,
        valeur: 200,
      };

      const result = store.ajouterObjetForge(item);
      expect(result).toBe(true);
      expect(store.craftedItems).toContainEqual(
        expect.objectContaining({ nom: "Hache de bataille" }),
      );
    });

    it("devrait supprimer un objet forgé", () => {
      const item = {
        nom: "Bouclier de bronze",
        categorie: "armure",
        qualite: 2,
        valeur: 100,
      };

      store.ajouterObjet(item);
      const addedItem = store.craftedItems.find(
        (i) => i.nom === "Bouclier de bronze",
      );
      const result = store.supprimerObjet(addedItem.id);
      expect(result).toBe(true);
      expect(store.craftedItems.find((i) => i.id === addedItem.id)).toBe(
        undefined,
      );
    });
  });

  describe("Getters", () => {
    it("capaciteUtilisee devrait calculer l'espace utilisé", () => {
      store.ajouterMaterial("fer", 10);
      store.ajouterMaterial("cuivre", 5);

      expect(store.capaciteUtilisee).toBeGreaterThanOrEqual(0);
    });

    it("pourcentageRemplissage devrait calculer le pourcentage", () => {
      const percentage = store.pourcentageRemplissage;
      expect(percentage).toBeGreaterThanOrEqual(0);
      expect(percentage).toBeLessThanOrEqual(100);
    });

    it("valeurTotale devrait calculer la valeur totale", () => {
      expect(store.valeurTotale).toBeGreaterThanOrEqual(0);
    });

    it("materialsList devrait retourner un array", () => {
      expect(Array.isArray(store.materialsList)).toBe(true);
    });

    it("craftedItemsSorted devrait retourner les objets triés", () => {
      const sorted = store.craftedItemsSorted;
      expect(Array.isArray(sorted)).toBe(true);
    });
  });

  describe("Capacité", () => {
    it("devrait calculer correctement la capacité utilisée", () => {
      const capacite = store.capaciteMax;
      expect(capacite).toBeGreaterThan(0);

      // Ajouter des matériaux
      store.ajouterMaterial("fer", 50);
      store.ajouterMaterial("cuivre", 30);

      // La capacité utilisée devrait être égale à la somme
      const utilisation = store.capaciteUtilisee;
      expect(utilisation).toBe(80);

      // Le pourcentage devrait être calculé correctement
      expect(store.pourcentageRemplissage).toBeGreaterThan(0);
      expect(store.pourcentageRemplissage).toBeLessThanOrEqual(100);
    });

    it("isFull devrait indiquer si l'inventaire est plein", () => {
      expect(typeof store.isFull).toBe("boolean");

      // Ajouter jusqu'à la capacité max
      store.ajouterMaterial("fer", store.capaciteMax);
      expect(store.isFull).toBe(true);
    });
  });
});
