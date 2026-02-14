import { describe, it, expect, vi } from "vitest";
import { mount } from "@vue/test-utils";
import OptimizedImage from "@/shared/ui/OptimizedImage.vue";

describe("OptimizedImage.vue", () => {
  // ========== PROPS VALIDATION ==========

  describe("Props", () => {
    it("should render with required props (src and alt)", () => {
      const wrapper = mount(OptimizedImage, {
        props: {
          src: "/test-image.jpg",
          alt: "Test image description",
        },
      });

      const img = wrapper.find("img");
      expect(img.exists()).toBe(true);
      expect(img.attributes("src")).toBe("/test-image.jpg");
      expect(img.attributes("alt")).toBe("Test image description");
    });

    it("should use lazy loading by default", () => {
      const wrapper = mount(OptimizedImage, {
        props: {
          src: "/test.jpg",
          alt: "Test",
        },
      });

      expect(wrapper.find("img").attributes("loading")).toBe("lazy");
    });

    it("should accept eager loading prop", () => {
      const wrapper = mount(OptimizedImage, {
        props: {
          src: "/test.jpg",
          alt: "Test",
          loading: "eager",
        },
      });

      expect(wrapper.find("img").attributes("loading")).toBe("eager");
    });

    it("should use async decoding by default", () => {
      const wrapper = mount(OptimizedImage, {
        props: {
          src: "/test.jpg",
          alt: "Test",
        },
      });

      expect(wrapper.find("img").attributes("decoding")).toBe("async");
    });

    it("should accept custom decoding prop (sync, async, auto)", () => {
      const wrapperSync = mount(OptimizedImage, {
        props: {
          src: "/test.jpg",
          alt: "Test",
          decoding: "sync",
        },
      });

      expect(wrapperSync.find("img").attributes("decoding")).toBe("sync");
    });
  });

  // ========== WIDTH & HEIGHT ==========

  describe("Dimensions", () => {
    it("should accept width and height as numbers", () => {
      const wrapper = mount(OptimizedImage, {
        props: {
          src: "/test.jpg",
          alt: "Test",
          width: 800,
          height: 600,
        },
      });

      const img = wrapper.find("img");
      expect(img.attributes("width")).toBe("800");
      expect(img.attributes("height")).toBe("600");
    });

    it("should accept width and height as strings", () => {
      const wrapper = mount(OptimizedImage, {
        props: {
          src: "/test.jpg",
          alt: "Test",
          width: "100%",
          height: "auto",
        },
      });

      const img = wrapper.find("img");
      expect(img.attributes("width")).toBe("100%");
      expect(img.attributes("height")).toBe("auto");
    });

    it("should render without width and height if not provided", () => {
      const wrapper = mount(OptimizedImage, {
        props: {
          src: "/test.jpg",
          alt: "Test",
        },
      });

      const img = wrapper.find("img");
      expect(img.attributes("width")).toBeUndefined();
      expect(img.attributes("height")).toBeUndefined();
    });
  });

  // ========== CUSTOM CLASSES ==========

  describe("Custom Classes", () => {
    it("should accept custom CSS classes via imageClass prop", () => {
      const wrapper = mount(OptimizedImage, {
        props: {
          src: "/test.jpg",
          alt: "Test",
          imageClass: "rounded-lg shadow-md",
        },
      });

      const img = wrapper.find("img");
      expect(img.classes()).toContain("rounded-lg");
      expect(img.classes()).toContain("shadow-md");
    });

    it("should render without classes if imageClass not provided", () => {
      const wrapper = mount(OptimizedImage, {
        props: {
          src: "/test.jpg",
          alt: "Test",
        },
      });

      const img = wrapper.find("img");
      expect(img.attributes("class")).toBe("");
    });
  });

  // ========== EVENTS ==========

  describe("Events", () => {
    it("should emit 'load' event when image loads", async () => {
      const wrapper = mount(OptimizedImage, {
        props: {
          src: "/test.jpg",
          alt: "Test",
        },
      });

      const img = wrapper.find("img");

      // Simuler le chargement de l'image
      await img.trigger("load");

      // Vérifier que l'event a été émis (peut être émis plusieurs fois selon le comportement du navigateur)
      expect(wrapper.emitted()).toHaveProperty("load");
      expect(wrapper.emitted("load").length).toBeGreaterThanOrEqual(1);
    });

    it("should emit 'error' event when image fails to load", async () => {
      const wrapper = mount(OptimizedImage, {
        props: {
          src: "/non-existent-image.jpg",
          alt: "Test",
        },
      });

      const img = wrapper.find("img");

      // Simuler une erreur de chargement
      await img.trigger("error");

      // Vérifier que l'event error a été émis (peut être émis plusieurs fois selon le comportement du navigateur)
      expect(wrapper.emitted()).toHaveProperty("error");
      expect(wrapper.emitted("error").length).toBeGreaterThanOrEqual(1);
    });

    it("should pass event object when emitting load", async () => {
      const wrapper = mount(OptimizedImage, {
        props: {
          src: "/test.jpg",
          alt: "Test",
        },
      });

      const img = wrapper.find("img");
      await img.trigger("load");

      const loadEvents = wrapper.emitted("load");
      expect(loadEvents[0][0]).toBeInstanceOf(Event);
    });

    it("should pass event object when emitting error", async () => {
      const wrapper = mount(OptimizedImage, {
        props: {
          src: "/test.jpg",
          alt: "Test",
        },
      });

      const img = wrapper.find("img");
      await img.trigger("error");

      const errorEvents = wrapper.emitted("error");
      expect(errorEvents[0][0]).toBeInstanceOf(Event);
    });
  });

  // ========== ACCESSIBILITY ==========

  describe("Accessibility", () => {
    it("should always have alt attribute for screen readers", () => {
      const wrapper = mount(OptimizedImage, {
        props: {
          src: "/test.jpg",
          alt: "Descriptive text for screen readers",
        },
      });

      const img = wrapper.find("img");
      expect(img.attributes("alt")).toBe("Descriptive text for screen readers");
    });

    it("should accept empty alt for decorative images", () => {
      const wrapper = mount(OptimizedImage, {
        props: {
          src: "/decorative.jpg",
          alt: "",
        },
      });

      const img = wrapper.find("img");
      expect(img.attributes("alt")).toBe("");
    });
  });

  // ========== PERFORMANCE OPTIMIZATIONS ==========

  describe("Performance", () => {
    it("should use lazy loading for performance by default", () => {
      const wrapper = mount(OptimizedImage, {
        props: {
          src: "/large-image.jpg",
          alt: "Large image",
        },
      });

      expect(wrapper.find("img").attributes("loading")).toBe("lazy");
    });

    it("should use async decoding for better performance", () => {
      const wrapper = mount(OptimizedImage, {
        props: {
          src: "/image.jpg",
          alt: "Image",
        },
      });

      expect(wrapper.find("img").attributes("decoding")).toBe("async");
    });

    it("should allow eager loading for above-the-fold images", () => {
      const wrapper = mount(OptimizedImage, {
        props: {
          src: "/hero-image.jpg",
          alt: "Hero",
          loading: "eager",
        },
      });

      expect(wrapper.find("img").attributes("loading")).toBe("eager");
    });
  });

  // ========== EDGE CASES ==========

  describe("Edge Cases", () => {
    it("should handle very long src URLs", () => {
      const longUrl = "https://example.com/" + "a".repeat(500) + ".jpg";
      const wrapper = mount(OptimizedImage, {
        props: {
          src: longUrl,
          alt: "Long URL image",
        },
      });

      expect(wrapper.find("img").attributes("src")).toBe(longUrl);
    });

    it("should handle special characters in alt text", () => {
      const wrapper = mount(OptimizedImage, {
        props: {
          src: "/test.jpg",
          alt: "Image avec des caractères spéciaux: é à ç & < >",
        },
      });

      expect(wrapper.find("img").attributes("alt")).toBe(
        "Image avec des caractères spéciaux: é à ç & < >",
      );
    });

    it("should handle multiple CSS classes", () => {
      const wrapper = mount(OptimizedImage, {
        props: {
          src: "/test.jpg",
          alt: "Test",
          imageClass: "class1 class2 class3 class4",
        },
      });

      const img = wrapper.find("img");
      expect(img.classes()).toContain("class1");
      expect(img.classes()).toContain("class2");
      expect(img.classes()).toContain("class3");
      expect(img.classes()).toContain("class4");
    });
  });
});
