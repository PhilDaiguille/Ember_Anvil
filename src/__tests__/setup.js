import { config } from "@vue/test-utils";
import { vi } from "vitest";

// Configuration globale pour Vue Test Utils
config.global.mocks = {
  $router: {
    push: vi.fn(),
    replace: vi.fn(),
    go: vi.fn(),
    back: vi.fn(),
  },
  $route: {
    path: "/",
    params: {},
    query: {},
  },
};

// Mock pour les icons Lucide
vi.mock("lucide-vue-next", () => {
  const mockIcon = {
    name: "MockIcon",
    template: '<span class="mock-icon"></span>',
  };

  return {
    Hammer: mockIcon,
    Anvil: mockIcon,
    Flame: mockIcon,
    Wind: mockIcon,
    Swords: mockIcon,
    Sparkles: mockIcon,
    Crown: mockIcon,
    Wallet: mockIcon,
    Package: mockIcon,
    Coins: mockIcon,
    Circle: mockIcon,
    Gem: mockIcon,
    Search: mockIcon,
    Shield: mockIcon,
    FlaskConical: mockIcon,
    Wrench: mockIcon,
    Building2: mockIcon,
    ArrowUp: mockIcon,
    Award: mockIcon,
    TrendingUp: mockIcon,
    Droplet: mockIcon,
    Zap: mockIcon,
    Target: mockIcon,
    Clock: mockIcon,
    CheckCircle: mockIcon,
    X: mockIcon,
  };
});
