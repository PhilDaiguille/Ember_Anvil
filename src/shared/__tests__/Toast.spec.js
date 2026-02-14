import { describe, it, expect, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import Toast from "../ui/Toast.vue";
import { useNotificationsStore } from "@/stores/notifications";

describe("Toast", () => {
  let wrapper;
  let notificationsStore;
  let pinia;

  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);
    notificationsStore = useNotificationsStore();

    wrapper = mount(Toast, {
      global: {
        plugins: [pinia],
        stubs: {
          CheckCircle: true,
          AlertCircle: true,
          Info: true,
          AlertTriangle: true,
          X: true,
        },
      },
    });
  });

  describe("Rendu initial", () => {
    it("devrait afficher le conteneur de toasts", () => {
      expect(wrapper.find(".toast-container").exists()).toBe(true);
    });

    it("ne devrait afficher aucun toast par défaut", () => {
      expect(wrapper.findAll(".toast").length).toBe(0);
    });
  });

  describe("Types de toast", () => {
    it("devrait afficher un toast de succès", async () => {
      notificationsStore.show("Opération réussie !", "success");
      await wrapper.vm.$nextTick();

      expect(wrapper.find(".toast-success").exists()).toBe(true);
      expect(wrapper.text()).toContain("Opération réussie !");
    });

    it("devrait afficher un toast d'erreur", async () => {
      notificationsStore.show("Une erreur est survenue", "error");
      await wrapper.vm.$nextTick();

      expect(wrapper.find(".toast-error").exists()).toBe(true);
      expect(wrapper.text()).toContain("Une erreur est survenue");
    });

    it("devrait afficher un toast d'information", async () => {
      notificationsStore.show("Information importante", "info");
      await wrapper.vm.$nextTick();

      expect(wrapper.find(".toast-info").exists()).toBe(true);
      expect(wrapper.text()).toContain("Information importante");
    });

    it("devrait afficher un toast d'avertissement", async () => {
      notificationsStore.show("Attention !", "warning");
      await wrapper.vm.$nextTick();

      expect(wrapper.find(".toast-warning").exists()).toBe(true);
      expect(wrapper.text()).toContain("Attention !");
    });
  });

  describe("Fermeture", () => {
    it("devrait fermer un toast quand on clique sur le bouton", async () => {
      notificationsStore.show("Test", "info");
      await wrapper.vm.$nextTick();

      expect(wrapper.findAll(".toast").length).toBe(1);

      await wrapper.find(".toast-close").trigger("click");
      await wrapper.vm.$nextTick();

      expect(wrapper.findAll(".toast").length).toBe(0);
    });
  });

  describe("Multiples toasts", () => {
    it("devrait afficher plusieurs toasts simultanément", async () => {
      notificationsStore.show("Toast 1", "success");
      notificationsStore.show("Toast 2", "error");
      notificationsStore.show("Toast 3", "info");
      await wrapper.vm.$nextTick();

      expect(wrapper.findAll(".toast").length).toBe(3);
    });
  });

  describe("getIcon", () => {
    it("devrait retourner le bon type d'icône", () => {
      expect(wrapper.vm.getIcon("success")).toBe("CheckCircle");
      expect(wrapper.vm.getIcon("error")).toBe("AlertCircle");
      expect(wrapper.vm.getIcon("info")).toBe("Info");
      expect(wrapper.vm.getIcon("warning")).toBe("AlertTriangle");
      expect(wrapper.vm.getIcon("unknown")).toBe("Info");
    });
  });
});
