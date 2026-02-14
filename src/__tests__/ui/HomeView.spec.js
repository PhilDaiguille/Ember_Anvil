import { describe, it, expect } from "vitest";
import { mount } from "@vue/test-utils";
import HomeView from "@/shared/layout/HomeView.vue";
import PageHeader from "@/shared/layout/PageHeader.vue";
import PageMain from "@/shared/layout/PageMain.vue";
import PageFooter from "@/shared/layout/PageFooter.vue";

describe("HomeView.vue", () => {
  describe("Component Registration", () => {
    it("should render PageHeader component", () => {
      const wrapper = mount(HomeView, {
        global: {
          stubs: {
            PageHeader: true,
            PageMain: true,
            PageFooter: true,
          },
        },
      });

      expect(wrapper.findComponent({ name: "PageHeader" }).exists()).toBe(true);
    });

    it("should render PageMain component", () => {
      const wrapper = mount(HomeView, {
        global: {
          stubs: {
            PageHeader: true,
            PageMain: true,
            PageFooter: true,
          },
        },
      });

      expect(wrapper.findComponent({ name: "PageMain" }).exists()).toBe(true);
    });

    it("should render PageFooter component", () => {
      const wrapper = mount(HomeView, {
        global: {
          stubs: {
            PageHeader: true,
            PageMain: true,
            PageFooter: true,
          },
        },
      });

      expect(wrapper.findComponent({ name: "PageFooter" }).exists()).toBe(true);
    });
  });

  describe("Component Order", () => {
    it("should render components in correct order: Header, Main, Footer", () => {
      const wrapper = mount(HomeView, {
        global: {
          stubs: {
            PageHeader: { template: '<header class="test-header" />' },
            PageMain: { template: '<main class="test-main" />' },
            PageFooter: { template: '<footer class="test-footer" />' },
          },
        },
      });

      const html = wrapper.html();
      const headerIndex = html.indexOf('class="test-header"');
      const mainIndex = html.indexOf('class="test-main"');
      const footerIndex = html.indexOf('class="test-footer"');

      expect(headerIndex).toBeLessThan(mainIndex);
      expect(mainIndex).toBeLessThan(footerIndex);
    });
  });

  describe("Structure", () => {
    it("should have exactly 3 child components", () => {
      const wrapper = mount(HomeView, {
        global: {
          stubs: {
            PageHeader: true,
            PageMain: true,
            PageFooter: true,
          },
        },
      });

      const header = wrapper.findComponent({ name: "PageHeader" });
      const main = wrapper.findComponent({ name: "PageMain" });
      const footer = wrapper.findComponent({ name: "PageFooter" });

      expect(header.exists()).toBe(true);
      expect(main.exists()).toBe(true);
      expect(footer.exists()).toBe(true);
    });

    it("should not have any additional wrapper elements", () => {
      const wrapper = mount(HomeView, {
        global: {
          stubs: {
            PageHeader: { template: "<header />" },
            PageMain: { template: "<main />" },
            PageFooter: { template: "<footer />" },
          },
        },
      });

      // The wrapper should contain only the 3 direct child elements
      const directChildren = wrapper.element.children;
      expect(directChildren.length).toBe(3);
    });
  });

  describe("Props Passing", () => {
    it("should not pass any props to child components", () => {
      const wrapper = mount(HomeView, {
        global: {
          stubs: {
            PageHeader: true,
            PageMain: true,
            PageFooter: true,
          },
        },
      });

      const header = wrapper.findComponent({ name: "PageHeader" });
      const main = wrapper.findComponent({ name: "PageMain" });
      const footer = wrapper.findComponent({ name: "PageFooter" });

      expect(Object.keys(header.props())).toHaveLength(0);
      expect(Object.keys(main.props())).toHaveLength(0);
      expect(Object.keys(footer.props())).toHaveLength(0);
    });
  });
});
