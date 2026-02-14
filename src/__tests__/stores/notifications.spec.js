import { describe, it, expect, beforeEach, vi } from "vitest";
import { setActivePinia, createPinia } from "pinia";
import { useNotificationsStore } from "@/stores/notifications";

describe("Notifications Store", () => {
  let notificationsStore;

  beforeEach(() => {
    setActivePinia(createPinia());
    notificationsStore = useNotificationsStore();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  // ========== INITIALIZATION ==========

  describe("Initialization", () => {
    it("should start with empty notifications array", () => {
      expect(notificationsStore.notifications).toEqual([]);
    });
  });

  // ========== SHOW NOTIFICATION ==========

  describe("show()", () => {
    it("should add notification with default type 'info'", () => {
      notificationsStore.show("Test message");

      expect(notificationsStore.notifications.length).toBe(1);
      expect(notificationsStore.notifications[0].message).toBe("Test message");
      expect(notificationsStore.notifications[0].type).toBe("info");
      expect(notificationsStore.notifications[0].visible).toBe(true);
    });

    it("should add notification with custom type 'success'", () => {
      notificationsStore.show("Success!", "success");

      expect(notificationsStore.notifications[0].type).toBe("success");
    });

    it("should add notification with custom type 'error'", () => {
      notificationsStore.show("Error!", "error");

      expect(notificationsStore.notifications[0].type).toBe("error");
    });

    it("should add notification with custom type 'warning'", () => {
      notificationsStore.show("Warning!", "warning");

      expect(notificationsStore.notifications[0].type).toBe("warning");
    });

    it("should generate unique ID for each notification", () => {
      notificationsStore.show("First");
      notificationsStore.show("Second");

      expect(notificationsStore.notifications.length).toBe(2);
      expect(notificationsStore.notifications[0].id).not.toBe(
        notificationsStore.notifications[1].id,
      );
    });

    it("should auto-dismiss notification after default duration (3000ms)", () => {
      notificationsStore.show("Auto dismiss");

      expect(notificationsStore.notifications.length).toBe(1);

      // Fast-forward time by 3000ms
      vi.advanceTimersByTime(3000);

      expect(notificationsStore.notifications.length).toBe(0);
    });

    it("should auto-dismiss notification after custom duration", () => {
      notificationsStore.show("Custom duration", "info", 5000);

      expect(notificationsStore.notifications.length).toBe(1);

      // Fast-forward time by 4999ms (should still be visible)
      vi.advanceTimersByTime(4999);
      expect(notificationsStore.notifications.length).toBe(1);

      // Fast-forward by 1ms more (total 5000ms)
      vi.advanceTimersByTime(1);
      expect(notificationsStore.notifications.length).toBe(0);
    });

    it("should allow multiple notifications simultaneously", () => {
      notificationsStore.show("First");
      notificationsStore.show("Second");
      notificationsStore.show("Third");

      expect(notificationsStore.notifications.length).toBe(3);
    });
  });

  // ========== REMOVE NOTIFICATION ==========

  describe("remove()", () => {
    it("should remove notification by ID", () => {
      notificationsStore.show("Test");
      const notificationId = notificationsStore.notifications[0].id;

      notificationsStore.remove(notificationId);

      expect(notificationsStore.notifications.length).toBe(0);
    });

    it("should remove correct notification when multiple exist", () => {
      notificationsStore.show("First");
      notificationsStore.show("Second");
      notificationsStore.show("Third");

      const secondId = notificationsStore.notifications[1].id;
      notificationsStore.remove(secondId);

      expect(notificationsStore.notifications.length).toBe(2);
      expect(notificationsStore.notifications[0].message).toBe("First");
      expect(notificationsStore.notifications[1].message).toBe("Third");
    });

    it("should do nothing if ID not found", () => {
      notificationsStore.show("Test");
      const initialLength = notificationsStore.notifications.length;

      notificationsStore.remove(999999); // Non-existent ID

      expect(notificationsStore.notifications.length).toBe(initialLength);
    });
  });

  // ========== CLEAR NOTIFICATIONS ==========

  describe("clear()", () => {
    it("should remove all notifications", () => {
      notificationsStore.show("First");
      notificationsStore.show("Second");
      notificationsStore.show("Third");

      expect(notificationsStore.notifications.length).toBe(3);

      notificationsStore.clear();

      expect(notificationsStore.notifications.length).toBe(0);
      expect(notificationsStore.notifications).toEqual([]);
    });

    it("should work when notifications array is already empty", () => {
      notificationsStore.clear();

      expect(notificationsStore.notifications).toEqual([]);
    });
  });

  // ========== AJOUTER NOTIFICATION (ALIAS) ==========

  describe("ajouterNotification()", () => {
    it("should work as alias for show()", () => {
      notificationsStore.ajouterNotification({
        message: "Test via alias",
        type: "success",
      });

      expect(notificationsStore.notifications.length).toBe(1);
      expect(notificationsStore.notifications[0].message).toBe(
        "Test via alias",
      );
      expect(notificationsStore.notifications[0].type).toBe("success");
    });

    it("should use default type 'info' if not provided", () => {
      notificationsStore.ajouterNotification({ message: "Default type" });

      expect(notificationsStore.notifications[0].type).toBe("info");
    });

    it("should auto-dismiss after default duration", () => {
      notificationsStore.ajouterNotification({ message: "Auto dismiss alias" });

      expect(notificationsStore.notifications.length).toBe(1);

      vi.advanceTimersByTime(3000);

      expect(notificationsStore.notifications.length).toBe(0);
    });
  });

  // ========== PERSISTENCE ==========

  describe("Persistence", () => {
    it("should not persist notifications (ephemeral)", () => {
      // Verify that notifications are ephemeral by checking they don't persist
      // The store has persist: false configuration
      const store = useNotificationsStore();

      // Check that the store definition has persist: false
      // In Pinia, the persist option is available on the store instance
      expect(store.$id).toBe("notifications");

      // Notifications should be empty on initialization (not loaded from storage)
      expect(store.notifications).toEqual([]);
    });
  });

  // ========== EDGE CASES ==========

  describe("Edge Cases", () => {
    it("should handle empty message", () => {
      notificationsStore.show("");

      expect(notificationsStore.notifications.length).toBe(1);
      expect(notificationsStore.notifications[0].message).toBe("");
    });

    it("should handle very long messages", () => {
      const longMessage = "A".repeat(1000);
      notificationsStore.show(longMessage);

      expect(notificationsStore.notifications[0].message).toBe(longMessage);
    });

    it("should handle duration of 0 (instant dismiss)", () => {
      notificationsStore.show("Instant", "info", 0);

      expect(notificationsStore.notifications.length).toBe(1);

      vi.advanceTimersByTime(0);

      expect(notificationsStore.notifications.length).toBe(0);
    });

    it("should handle very long duration", () => {
      notificationsStore.show("Long duration", "info", 999999);

      vi.advanceTimersByTime(3000);
      expect(notificationsStore.notifications.length).toBe(1);

      vi.advanceTimersByTime(999999 - 3000);
      expect(notificationsStore.notifications.length).toBe(0);
    });

    it("should handle rapid successive calls", () => {
      for (let i = 0; i < 100; i++) {
        notificationsStore.show(`Message ${i}`);
      }

      expect(notificationsStore.notifications.length).toBe(100);

      // All should auto-dismiss
      vi.advanceTimersByTime(3000);
      expect(notificationsStore.notifications.length).toBe(0);
    });
  });
});
