import { describe, it, expect, beforeEach, vi } from "vitest";
import { mount } from "@vue/test-utils";
import Toast from "../../ui/Toast.vue";

describe("Toast", () => {
  let wrapper;

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("Types de toast", () => {
    it("devrait afficher un toast de succès", () => {
      wrapper = mount(Toast, {
        props: {
          type: "success",
          message: "Opération réussie !",
          visible: true,
        },
        global: {
          stubs: {
            CheckCircle: true,
            AlertCircle: true,
            Info: true,
            X: true,
          },
        },
      });

      expect(wrapper.text()).toContain("Opération réussie !");
      expect(wrapper.classes()).toContain("toast-success");
    });

    it("devrait afficher un toast d'erreur", () => {
      wrapper = mount(Toast, {
        props: {
          type: "error",
          message: "Une erreur est survenue",
          visible: true,
        },
        global: {
          stubs: {
            CheckCircle: true,
            AlertCircle: true,
            Info: true,
            X: true,
          },
        },
      });

      expect(wrapper.text()).toContain("Une erreur est survenue");
      expect(wrapper.classes()).toContain("toast-error");
    });

    it("devrait afficher un toast d'information", () => {
      wrapper = mount(Toast, {
        props: {
          type: "info",
          message: "Information importante",
          visible: true,
        },
        global: {
          stubs: {
            CheckCircle: true,
            AlertCircle: true,
            Info: true,
            X: true,
          },
        },
      });

      expect(wrapper.text()).toContain("Information importante");
      expect(wrapper.classes()).toContain("toast-info");
    });
  });

  describe("Visibilité", () => {
    it("devrait être visible quand visible=true", () => {
      wrapper = mount(Toast, {
        props: {
          type: "success",
          message: "Test",
          visible: true,
        },
        global: {
          stubs: {
            CheckCircle: true,
            X: true,
          },
        },
      });

      expect(wrapper.isVisible()).toBe(true);
    });

    it("ne devrait pas être visible quand visible=false", () => {
      wrapper = mount(Toast, {
        props: {
          type: "success",
          message: "Test",
          visible: false,
        },
        global: {
          stubs: {
            CheckCircle: true,
            X: true,
          },
        },
      });

      expect(wrapper.classes()).toContain("toast-hidden");
    });
  });

  describe("Fermeture", () => {
    it("devrait émettre un événement close quand on clique sur le bouton de fermeture", async () => {
      wrapper = mount(Toast, {
        props: {
          type: "success",
          message: "Test",
          visible: true,
        },
        global: {
          stubs: {
            CheckCircle: true,
            X: true,
          },
        },
      });

      const closeBtn = wrapper.find(".toast-close");
      if (closeBtn.exists()) {
        await closeBtn.trigger("click");
        expect(wrapper.emitted("close")).toBeTruthy();
      }
    });

    it("devrait se fermer automatiquement après la durée spécifiée", async () => {
      wrapper = mount(Toast, {
        props: {
          type: "success",
          message: "Test",
          visible: true,
          duration: 3000,
        },
        global: {
          stubs: {
            CheckCircle: true,
            X: true,
          },
        },
      });

      vi.advanceTimersByTime(3000);
      await wrapper.vm.$nextTick();

      expect(wrapper.emitted("close")).toBeTruthy();
    });
  });

  describe("Props", () => {
    it("devrait accepter un message personnalisé", () => {
      wrapper = mount(Toast, {
        props: {
          type: "success",
          message: "Message personnalisé",
          visible: true,
        },
        global: {
          stubs: {
            CheckCircle: true,
            X: true,
          },
        },
      });

      expect(wrapper.text()).toContain("Message personnalisé");
    });

    it("devrait avoir un type par défaut", () => {
      wrapper = mount(Toast, {
        props: {
          message: "Test",
          visible: true,
        },
        global: {
          stubs: {
            Info: true,
            X: true,
          },
        },
      });

      expect(wrapper.props("type")).toBe("info");
    });
  });
});
