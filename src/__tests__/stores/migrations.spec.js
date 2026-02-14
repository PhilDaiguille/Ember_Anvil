import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import {
  GAME_VERSION,
  migrateLocalStorage,
  resetGame,
} from "@/stores/migrations";

// Mock console methods
const consoleSpy = {
  log: vi.spyOn(console, "log").mockImplementation(() => {}),
  warn: vi.spyOn(console, "warn").mockImplementation(() => {}),
};

describe("Migrations", () => {
  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();
    consoleSpy.log.mockClear();
    consoleSpy.warn.mockClear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  // ========== GAME_VERSION ==========

  describe("GAME_VERSION", () => {
    it("should export GAME_VERSION constant", () => {
      expect(GAME_VERSION).toBeDefined();
      expect(typeof GAME_VERSION).toBe("string");
    });

    it("should follow semantic versioning", () => {
      expect(GAME_VERSION).toMatch(/^\d+\.\d+\.\d+$/);
    });
  });

  // ========== FIRST INSTALLATION ==========

  describe("First Installation", () => {
    it("should initialize default data on first installation", () => {
      // No version in localStorage = first installation
      expect(localStorage.getItem("emberanvil.version")).toBeNull();

      migrateLocalStorage();

      expect(localStorage.getItem("emberanvil.version")).toBe(GAME_VERSION);
      expect(consoleSpy.log).toHaveBeenCalledWith(
        "🎮 Première installation d'EmberAnvil",
      );
      expect(consoleSpy.log).toHaveBeenCalledWith(
        "✨ Nouveau joueur initialisé avec succès!",
      );
    });

    it("should set version to current GAME_VERSION", () => {
      migrateLocalStorage();

      const savedVersion = localStorage.getItem("emberanvil.version");
      expect(savedVersion).toBe(GAME_VERSION);
    });
  });

  // ========== VERSION UP TO DATE ==========

  describe("Version Up to Date", () => {
    it("should not migrate if version matches", () => {
      localStorage.setItem("emberanvil.version", GAME_VERSION);

      migrateLocalStorage();

      expect(consoleSpy.log).toHaveBeenCalledWith("✅ LocalStorage à jour");
      expect(consoleSpy.warn).not.toHaveBeenCalled();
    });

    it("should preserve localStorage when version matches", () => {
      localStorage.setItem("emberanvil.version", GAME_VERSION);
      localStorage.setItem("emberanvil.player", '{"ecus": 500}');

      migrateLocalStorage();

      expect(localStorage.getItem("emberanvil.player")).toBe('{"ecus": 500}');
    });
  });

  // ========== MIGRATION FROM v0.0.0 to v1.0.0 ==========

  describe("Migration v0.0.0 → v1.0.0", () => {
    beforeEach(() => {
      localStorage.setItem("emberanvil.version", "0.0.0");
    });

    it("should trigger migration when version differs", () => {
      migrateLocalStorage();

      expect(consoleSpy.warn).toHaveBeenCalledWith(
        expect.stringContaining("⚠️ Version sauvegardée"),
      );
      expect(consoleSpy.log).toHaveBeenCalledWith(
        expect.stringContaining("🔄 Migration"),
      );
      expect(consoleSpy.log).toHaveBeenCalledWith(
        "✅ Migration terminée avec succès!",
      );
    });

    it("should add 'or' field to player data if missing", () => {
      localStorage.setItem("emberanvil.player", '{"ecus": 1000}');

      migrateLocalStorage();

      const playerData = JSON.parse(
        localStorage.getItem("emberanvil.player") || "{}",
      );
      expect(playerData.or).toBe(0);
      expect(playerData.ecus).toBe(1000); // Preserve existing data
    });

    it("should not overwrite existing 'or' field", () => {
      localStorage.setItem("emberanvil.player", '{"ecus": 1000, "or": 50}');

      migrateLocalStorage();

      const playerData = JSON.parse(
        localStorage.getItem("emberanvil.player") || "{}",
      );
      expect(playerData.or).toBe(50); // Unchanged
    });

    it("should convert materials array to object format", () => {
      localStorage.setItem(
        "emberanvil.inventory",
        JSON.stringify({
          materials: [
            { id: "fer", quantite: 10 },
            { id: "cuivre", quantite: 5 },
          ],
        }),
      );

      migrateLocalStorage();

      const inventoryData = JSON.parse(
        localStorage.getItem("emberanvil.inventory") || "{}",
      );
      expect(inventoryData.materials).toEqual({
        fer: 10,
        cuivre: 5,
      });
    });

    it("should handle empty inventory data", () => {
      localStorage.setItem("emberanvil.inventory", "{}");

      migrateLocalStorage();

      const inventoryData = JSON.parse(
        localStorage.getItem("emberanvil.inventory") || "{}",
      );
      expect(inventoryData).toBeDefined();
    });

    it("should update version after migration", () => {
      migrateLocalStorage();

      const savedVersion = localStorage.getItem("emberanvil.version");
      expect(savedVersion).toBe(GAME_VERSION);
    });
  });

  // ========== RESET GAME ==========

  describe("resetGame()", () => {
    beforeEach(() => {
      // Mock window.confirm and window.location.reload
      vi.stubGlobal("confirm", vi.fn());
      vi.stubGlobal("location", { reload: vi.fn() });
    });

    afterEach(() => {
      vi.unstubAllGlobals();
    });

    it("should remove all emberanvil.* keys when confirmed", () => {
      localStorage.setItem("emberanvil.version", "1.0.0");
      localStorage.setItem("emberanvil.player", "{}");
      localStorage.setItem("emberanvil.inventory", "{}");
      localStorage.setItem("other.key", "should remain");

      window.confirm.mockReturnValue(true);

      resetGame();

      expect(localStorage.getItem("emberanvil.version")).toBeNull();
      expect(localStorage.getItem("emberanvil.player")).toBeNull();
      expect(localStorage.getItem("emberanvil.inventory")).toBeNull();
      expect(localStorage.getItem("other.key")).toBe("should remain");
    });

    it("should reload page after reset", () => {
      window.confirm.mockReturnValue(true);

      resetGame();

      expect(window.location.reload).toHaveBeenCalled();
    });

    it("should log success message", () => {
      window.confirm.mockReturnValue(true);

      resetGame();

      expect(consoleSpy.log).toHaveBeenCalledWith(
        "🗑️ Jeu réinitialisé avec succès!",
      );
    });

    it("should not reset if user cancels confirmation", () => {
      localStorage.setItem("emberanvil.version", "1.0.0");
      localStorage.setItem("emberanvil.player", "{}");

      window.confirm.mockReturnValue(false);

      resetGame();

      expect(localStorage.getItem("emberanvil.version")).toBe("1.0.0");
      expect(localStorage.getItem("emberanvil.player")).toBe("{}");
      expect(window.location.reload).not.toHaveBeenCalled();
    });

    it("should show confirmation dialog with warning", () => {
      window.confirm.mockReturnValue(false);

      resetGame();

      expect(window.confirm).toHaveBeenCalledWith(
        expect.stringContaining("⚠️ ATTENTION"),
      );
    });
  });

  // ========== EDGE CASES ==========

  describe("Edge Cases", () => {
    it("should handle missing player data during migration", () => {
      localStorage.setItem("emberanvil.version", "0.0.0");
      // No player data

      expect(() => migrateLocalStorage()).not.toThrow();

      const playerData = JSON.parse(
        localStorage.getItem("emberanvil.player") || "{}",
      );
      expect(playerData.or).toBe(0);
    });

    it("should throw on invalid JSON in player data", () => {
      localStorage.setItem("emberanvil.version", "0.0.0");
      localStorage.setItem("emberanvil.player", "invalid json");

      // Migration will throw on invalid JSON
      // This is expected behavior - localStorage should contain valid JSON
      expect(() => migrateLocalStorage()).toThrow();
    });

    it("should handle materials already in object format", () => {
      localStorage.setItem("emberanvil.version", "0.0.0");
      localStorage.setItem(
        "emberanvil.inventory",
        JSON.stringify({
          materials: { fer: 10, cuivre: 5 },
        }),
      );

      migrateLocalStorage();

      const inventoryData = JSON.parse(
        localStorage.getItem("emberanvil.inventory") || "{}",
      );
      expect(inventoryData.materials).toEqual({ fer: 10, cuivre: 5 });
    });

    it("should handle multiple consecutive migrations", () => {
      localStorage.setItem("emberanvil.version", "0.0.0");

      migrateLocalStorage();

      expect(localStorage.getItem("emberanvil.version")).toBe(GAME_VERSION);

      // Run again - should not migrate
      consoleSpy.log.mockClear();
      migrateLocalStorage();

      expect(consoleSpy.log).toHaveBeenCalledWith("✅ LocalStorage à jour");
    });

    it("should handle partial localStorage data", () => {
      localStorage.setItem("emberanvil.version", "0.0.0");
      localStorage.setItem("emberanvil.player", '{"ecus": 100}');
      // Missing inventory

      expect(() => migrateLocalStorage()).not.toThrow();
    });
  });
});
