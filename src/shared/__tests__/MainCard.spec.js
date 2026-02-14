import { describe, it, expect, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import MainCard from "../../ui/MainCard.vue";

describe("MainCard", () => {
  let wrapper;

  describe("Props par défaut", () => {
    beforeEach(() => {
      wrapper = mount(MainCard, {
        slots: {
          default: "<p>Test content</p>",
        },
      });
    });

    it("devrait afficher le contenu du slot", () => {
      expect(wrapper.html()).toContain("Test content");
    });

    it("devrait avoir la classe main-card", () => {
      expect(wrapper.classes()).toContain("main-card");
    });
  });

  describe("Props personnalisées", () => {
    it("devrait accepter une classe personnalisée", () => {
      wrapper = mount(MainCard, {
        props: {
          class: "custom-class",
        },
      });

      expect(wrapper.classes()).toContain("custom-class");
    });

    it("devrait accepter un titre via prop", () => {
      wrapper = mount(MainCard, {
        props: {
          title: "Test Title",
        },
      });

      expect(wrapper.text()).toContain("Test Title");
    });
  });

  describe("Slots", () => {
    it("devrait supporter le slot header", () => {
      wrapper = mount(MainCard, {
        slots: {
          header: "<h2>Custom Header</h2>",
          default: "<p>Content</p>",
        },
      });

      expect(wrapper.html()).toContain("Custom Header");
      expect(wrapper.html()).toContain("Content");
    });

    it("devrait supporter le slot footer", () => {
      wrapper = mount(MainCard, {
        slots: {
          default: "<p>Content</p>",
          footer: "<div>Footer content</div>",
        },
      });

      expect(wrapper.html()).toContain("Footer content");
    });
  });
});
