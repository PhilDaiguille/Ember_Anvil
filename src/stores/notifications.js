import { defineStore } from "pinia";

export const useNotificationsStore = defineStore("notifications", {
  state: () => ({
    notifications: [],
  }),

  actions: {
    /**
     * Afficher une notification toast
     * @param {string} message - Message à afficher
     * @param {string} type - success, error, info, warning
     * @param {number} duration - Durée en ms avant auto-dismiss (défaut: 3000)
     */
    show(message, type = "info", duration = 3000) {
      const id = Date.now() + Math.random();

      this.notifications.push({
        id,
        message,
        type, // success, error, info, warning
        visible: true,
      });

      // Auto-dismiss après duration
      setTimeout(() => {
        this.remove(id);
      }, duration);
    },

    /**
     * Retirer une notification
     * @param {number} id - ID de la notification
     */
    remove(id) {
      const index = this.notifications.findIndex((n) => n.id === id);
      if (index !== -1) {
        this.notifications.splice(index, 1);
      }
    },

    /**
     * Retirer toutes les notifications
     */
    clear() {
      this.notifications = [];
    },

    /**
     * Alias pour show() - pour compatibilité avec le code existant
     * @param {Object} options - { type, message }
     */
    ajouterNotification({ type = "info", message }) {
      this.show(message, type);
    },
  },

  persist: false, // Ne pas persister (éphémère)
});
