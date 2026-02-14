import { describe, it, expect, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import PageMain from "@/shared/layout/PageMain.vue";

describe("PageMain.vue", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(PageMain, {
      global: {
        stubs: {
          RouterLink: {
            template: "<a><slot /></a>",
          },
        },
      },
    });
  });

  describe("Rendering", () => {
    it("should render main element with role='main'", () => {
      const main = wrapper.find("main");
      expect(main.exists()).toBe(true);
      expect(main.attributes("role")).toBe("main");
    });

    it("should render hero section with title", () => {
      expect(wrapper.find(".hero-title").text()).toBe(
        "Bienvenue à Ember Anvil",
      );
    });

    it("should render hero subtitle", () => {
      expect(wrapper.find(".hero-subtitle").text()).toBe(
        "La Forge Virtuelle de vos Rêves",
      );
    });

    it("should render 3 feature cards", () => {
      const featureCards = wrapper.findAll(".feature-card");
      expect(featureCards).toHaveLength(3);
    });

    it("should render FAQ section with 6 questions", () => {
      const faqItems = wrapper.findAll(".faq-item");
      expect(faqItems).toHaveLength(6);
    });

    it("should render final CTA section", () => {
      expect(wrapper.find(".final-cta").exists()).toBe(true);
    });
  });

  describe("FAQ Functionality", () => {
    it("should have all FAQs closed by default", () => {
      wrapper.vm.faqs.forEach((faq) => {
        expect(faq.open).toBe(false);
      });
    });

    it("should toggle FAQ open/close when clicked", async () => {
      const faqButton = wrapper.findAll(".faq-question")[0];
      expect(wrapper.vm.faqs[0].open).toBe(false);

      await faqButton.trigger("click");
      expect(wrapper.vm.faqs[0].open).toBe(true);

      await faqButton.trigger("click");
      expect(wrapper.vm.faqs[0].open).toBe(false);
    });

    it("should apply correct aria-expanded attribute", async () => {
      const faqButton = wrapper.findAll(".faq-question")[0];

      expect(faqButton.attributes("aria-expanded")).toBe("false");

      await faqButton.trigger("click");
      await wrapper.vm.$nextTick();

      expect(faqButton.attributes("aria-expanded")).toBe("true");
    });

    it("should have aria-controls attribute on FAQ buttons", () => {
      const faqButtons = wrapper.findAll(".faq-question");
      faqButtons.forEach((button, index) => {
        expect(button.attributes("aria-controls")).toBe(`faq-answer-${index}`);
      });
    });
  });

  describe("Accessibility", () => {
    it("should use semantic main element", () => {
      expect(wrapper.element.tagName.toLowerCase()).toBe("main");
    });

    it("should have aria-labelledby on features section", () => {
      const featuresSection = wrapper.find(".features-section");
      expect(featuresSection.attributes("aria-labelledby")).toBe(
        "features-heading",
      );
    });

    it("should have aria-labelledby on about section", () => {
      const aboutSection = wrapper.find(".about-section");
      expect(aboutSection.attributes("aria-labelledby")).toBe("about-heading");
    });

    it("should have aria-labelledby on FAQ section", () => {
      const faqSection = wrapper.find(".faq-section");
      expect(faqSection.attributes("aria-labelledby")).toBe("faq-heading");
    });

    it("should have aria-label on CTA links", () => {
      const ctaLinks = wrapper.findAll("[aria-label]");
      expect(ctaLinks.length).toBeGreaterThan(0);
    });
  });

  describe("Structure", () => {
    it("should contain hero, features, about, FAQ, and CTA sections", () => {
      expect(wrapper.find(".hero-section").exists()).toBe(true);
      expect(wrapper.find(".features-section").exists()).toBe(true);
      expect(wrapper.find(".about-section").exists()).toBe(true);
      expect(wrapper.find(".faq-section").exists()).toBe(true);
      expect(wrapper.find(".final-cta").exists()).toBe(true);
    });

    it("should use article elements for feature cards", () => {
      const articles = wrapper.findAll(".feature-card");
      articles.forEach((article) => {
        expect(article.element.tagName.toLowerCase()).toBe("article");
      });
    });
  });
});
