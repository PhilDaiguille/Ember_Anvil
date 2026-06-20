import { describe, it, expect, beforeEach } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useOrdersStore } from "@/stores/orders";
import { usePlayerStore } from "@/stores/player";
import { useInventoryStore } from "@/stores/inventory";

describe("OrdersStore", () => {
  let orders;
  let player;
  let inventory;

  beforeEach(() => {
    setActivePinia(createPinia());
    orders = useOrdersStore();
    player = usePlayerStore();
    inventory = useInventoryStore();
    player.niveau = 10;
  });

  it("rafraichir génère jusqu'à 3 commandes", () => {
    orders.rafraichir();
    expect(orders.commandes.length).toBe(3);
    for (const c of orders.commandes) {
      expect(c.recipeId).toBeTruthy();
      expect(c.qualiteMin).toBeGreaterThanOrEqual(1);
      expect(c.recompenseEcus).toBeGreaterThan(0);
    }
  });

  it("rafraichir retire les commandes expirées", () => {
    orders.commandes = [
      {
        id: "vieux",
        recipeId: "x",
        qualiteMin: 1,
        recompenseEcus: 1,
        recompenseXp: 1,
        expiration: Date.now() - 1000,
      },
    ];
    orders.rafraichir();
    expect(orders.commandes.find((c) => c.id === "vieux")).toBeUndefined();
  });

  it("livrer échoue sans objet correspondant", () => {
    orders.rafraichir();
    const cmd = orders.commandes[0];
    expect(orders.livrer(cmd.id)).toBe(false);
  });

  it("livrer consomme l'objet et récompense le joueur", () => {
    orders.commandes = [
      {
        id: "c1",
        recipeId: "epee_courte",
        qualiteMin: 2,
        recompenseEcus: 200,
        recompenseXp: 50,
        expiration: Date.now() + 100000,
      },
    ];
    inventory.ajouterObjetForge({
      recipeId: "epee_courte",
      nom: "Épée courte",
      qualite: 3,
      valeur: 100,
    });
    const ecusAvant = player.ecus;

    expect(orders.livrer("c1")).toBe(true);
    expect(player.ecus).toBe(ecusAvant + 200);
    expect(inventory.craftedItems.length).toBe(0);
    // commande honorée remplacée → toujours 3 commandes
    expect(orders.commandes.find((c) => c.id === "c1")).toBeUndefined();
  });
});
