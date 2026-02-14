import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import PageFooter from "@/shared/layout/PageFooter.vue";

describe("PageFooter.vue", () => {
  describe("Rendering", () => {
    it("should render footer element", () => {
      const wrapper = mount(PageFooter);
      expect(wrapper.find("footer").exists()).toBe(true);
    });

    it("should display copyright text", () => {
      const wrapper = mount(PageFooter);
      const text = wrapper.find("p").text();
      expect(text).toContain("Copyright © 2023");
      expect(text).toContain("Philippe DELENTE");
    });

    it("should display 'Tous droits réservés'", () => {
      const wrapper = mount(PageFooter);
      expect(wrapper.find("p").text()).toContain("Tous droits réservés");
    });
  });

  describe("Accessibility", () => {
    it("should use semantic footer element", () => {
      const wrapper = mount(PageFooter);
      expect(wrapper.element.tagName.toLowerCase()).toBe("footer");
    });
  });

  describe("Structure", () => {
    it("should contain a paragraph element", () => {
      const wrapper = mount(PageFooter);
      expect(wrapper.find("p").exists()).toBe(true);
    });
  });
});
