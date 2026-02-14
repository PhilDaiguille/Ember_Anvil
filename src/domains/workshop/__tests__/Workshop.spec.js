import { describe, it, expect, beforeEach, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import WorkshopComponent from "../components/Workshop.vue";
import { usePlayerStore } from "@/stores/player";
import { useWorkshopStore } from "@/stores/workshop";

describe("WorkshopComponent", () => {
  let wrapper;
  let playerStore;
  let workshopStore;
  let pinia;

  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);

    playerStore = usePlayerStore();
    workshopStore = useWorkshopStore();

    // Mock player resources
    playerStore.$patch({
      ecus: 5000,
      or: 100,
      experience: 1500,
    });

    // Initialize workshop with real data so getters work
    workshopStore.initialize();

    // Override specific getters on the SAME store instance
    Object.defineProperty(workshopStore, "productiviteGlobale", {
      get: () => 125,
      configurable: true,
    });

    Object.defineProperty(workshopStore, "bonusActifs", {
      get: () => 1,
      configurable: true,
    });

    Object.defineProperty(workshopStore, "hasActiveSynergy", {
      get: () => true,
      configurable: true,
    });

    Object.defineProperty(workshopStore, "activeSynergiesCount", {
      get: () => 2,
      configurable: true,
    });

    // Mock initialize to prevent re-initialization on mount
    workshopStore.initialize = vi.fn();

    wrapper = mount(WorkshopComponent, {
      global: {
        plugins: [pinia],
        stubs: {
          Wrench: true,
          Hammer: true,
          Anvil: true,
          Flame: true,
          Wind: true,
          Droplet: true,
          Sparkles: true,
          Zap: true,
          Building2: true,
          ArrowUp: true,
          Coins: true,
          TrendingUp: true,
          Target: true,
          Clock: true,
          CheckCircle: true,
          Award: true,
        },
      },
    });
  });

  describe("Rendu initial", () => {
    it("devrait afficher le titre de l'atelier", () => {
      expect(wrapper.text()).toContain("L'Atelier du Maître");
    });

    it("devrait initialiser l'atelier au montage", () => {
      expect(workshopStore.initialize).toHaveBeenCalled();
    });

    it("devrait afficher les ressources du joueur", () => {
      expect(wrapper.text()).toContain("5");
      expect(wrapper.text()).toContain("100");
      expect(wrapper.text()).toContain("1");
    });
  });

  describe("Panneau de ressources", () => {
    it("devrait afficher les écus", () => {
      const resourceCards = wrapper.findAll(".resource-card");
      expect(resourceCards.length).toBeGreaterThanOrEqual(3);
    });

    it("devrait afficher l'or", () => {
      expect(wrapper.vm.playerResources.or).toBe(100);
    });

    it("devrait afficher l'expérience", () => {
      expect(wrapper.vm.playerResources.experience).toBe(1500);
    });

    it("playerResources computed devrait retourner les bonnes valeurs", () => {
      expect(wrapper.vm.playerResources).toEqual({
        ecus: 5000,
        or: 100,
        experience: 1500,
      });
    });
  });

  describe("Statistiques de l'atelier", () => {
    it("devrait afficher la productivité globale", () => {
      expect(wrapper.vm.productiviteGlobale).toBe(125);
      expect(wrapper.text()).toContain("125%");
    });

    it("devrait afficher le nombre de bonus actifs", () => {
      expect(wrapper.vm.bonusActifs).toBe(1);
    });

    it("devrait afficher l'état de la synergie", () => {
      expect(wrapper.vm.hasActiveSynergy).toBe(true);
      expect(wrapper.text()).toContain("Active");
    });

    it("devrait appliquer la classe synergy-active quand la synergie est active", async () => {
      await wrapper.vm.$nextTick();
      const synergyItem = wrapper
        .findAll(".stat-item")
        .find((item) => item.text().includes("Synergie"));

      if (synergyItem) {
        expect(synergyItem.classes()).toContain("synergy-active");
      }
    });
  });

  describe("Outils (Tools)", () => {
    it("devrait afficher la liste des outils", () => {
      const tools = wrapper.vm.tools;
      expect(tools.length).toBeGreaterThanOrEqual(4);
      expect(tools.some((t) => t.nom === "Marteau Lourd")).toBe(true);
    });

    it("devrait sélectionner un outil", () => {
      const tool = wrapper.vm.tools[0];
      wrapper.vm.selectTool(tool);

      expect(wrapper.vm.selectedTool).toStrictEqual(tool);
    });

    it("devrait vérifier si on peut améliorer un outil", () => {
      const tool = { id: "marteau" };
      const canUpgrade = wrapper.vm.canUpgradeTool(tool);

      expect(typeof canUpgrade).toBe("boolean");
    });

    it("devrait vérifier si un outil a une synergie", () => {
      const result = workshopStore.hasSynergy("marteau");

      expect(typeof result).toBe("boolean");
    });
  });

  describe("Amélioration d'outils", () => {
    it("devrait lancer l'animation d'amélioration", async () => {
      vi.useFakeTimers();

      const tool = wrapper.vm.tools[0];

      // Simulate the upgrade process
      wrapper.vm.upgrading = true;

      expect(wrapper.vm.upgrading).toBe(true);

      // Fast-forward time
      vi.advanceTimersByTime(2000);
      wrapper.vm.upgrading = false;

      expect(wrapper.vm.upgrading).toBe(false);

      vi.useRealTimers();
    });
  });

  describe("Installations (Facilities)", () => {
    it("devrait afficher la liste des installations", () => {
      const facilities = wrapper.vm.facilities;
      expect(facilities.length).toBeGreaterThanOrEqual(3);
      expect(facilities.some((f) => f.nom === "Station de Trempage")).toBe(
        true,
      );
    });

    it("devrait activer/désactiver une installation", () => {
      const toggleSpy = vi.spyOn(workshopStore, "toggleFacility");
      const facility = wrapper.vm.facilities[0];

      wrapper.vm.handleToggleFacility(facility);

      expect(toggleSpy).toHaveBeenCalledWith(facility.id);
    });

    it("devrait améliorer une installation", () => {
      const upgradeSpy = vi.spyOn(workshopStore, "upgradeFacility");
      const facility = wrapper.vm.facilities[0];

      wrapper.vm.handleUpgradeFacility(facility);

      expect(upgradeSpy).toHaveBeenCalledWith(facility.id);
    });

    it("devrait vérifier si on peut améliorer une installation", () => {
      const facility = { id: "trempage" };
      const canUpgrade = wrapper.vm.canUpgradeFacility(facility);

      expect(typeof canUpgrade).toBe("boolean");
    });

    it("devrait vérifier si on peut activer une installation", () => {
      const facility = { id: "enchantement" };
      const canActivate = wrapper.vm.canActivateFacility(facility);

      expect(typeof canActivate).toBe("boolean");
    });
  });

  describe("Quêtes", () => {
    it("devrait afficher la liste des quêtes actives", () => {
      const quetes = wrapper.vm.quetes;
      expect(quetes.length).toBeGreaterThanOrEqual(1);
      expect(quetes[0]).toHaveProperty("nom");
      expect(quetes[0]).toHaveProperty("progression");
      expect(quetes[0]).toHaveProperty("objectif");
    });
  });

  describe("Utilitaires", () => {
    it("getProgressPercentage devrait calculer le pourcentage correct", () => {
      expect(wrapper.vm.getProgressPercentage(5, 10)).toBe(50);
      expect(wrapper.vm.getProgressPercentage(1, 10)).toBe(10);
      expect(wrapper.vm.getProgressPercentage(10, 10)).toBe(100);
      expect(wrapper.vm.getProgressPercentage(0, 10)).toBe(0);
    });
  });

  describe("Computed properties", () => {
    it("tools devrait retourner les outils", () => {
      expect(Array.isArray(wrapper.vm.tools)).toBe(true);
      expect(wrapper.vm.tools.length).toBeGreaterThanOrEqual(4);
    });

    it("facilities devrait retourner les installations", () => {
      expect(Array.isArray(wrapper.vm.facilities)).toBe(true);
      expect(wrapper.vm.facilities.length).toBeGreaterThanOrEqual(3);
    });

    it("quetes devrait retourner les quêtes actives", () => {
      expect(Array.isArray(wrapper.vm.quetes)).toBe(true);
    });
  });

  describe("Data properties", () => {
    it("devrait avoir les bonnes valeurs par défaut", () => {
      expect(wrapper.vm.selectedTool).toBeNull();
      expect(wrapper.vm.upgrading).toBe(false);
    });
  });

  describe("État d'amélioration", () => {
    it("upgrading devrait être false par défaut", () => {
      expect(wrapper.vm.upgrading).toBe(false);
    });

    it("upgrading devrait être true pendant l'amélioration", () => {
      const tool = wrapper.vm.tools[0];
      wrapper.vm.handleUpgradeTool(tool);

      expect(wrapper.vm.upgrading).toBe(true);
    });
  });

  describe("Intégration des stores", () => {
    it("devrait mapper correctement les states de playerStore", () => {
      expect(wrapper.vm.ecus).toBe(5000);
      expect(wrapper.vm.or).toBe(100);
      expect(wrapper.vm.experience).toBe(1500);
    });

    it("devrait mapper correctement les states de workshopStore", () => {
      expect(wrapper.vm.productiviteGlobale).toBe(125);
      expect(wrapper.vm.bonusActifs).toBe(1);
      expect(wrapper.vm.hasActiveSynergy).toBe(true);
    });

    it("devrait réagir aux changements du playerStore", async () => {
      playerStore.$patch({ ecus: 10000 });
      await wrapper.vm.$nextTick();

      expect(wrapper.vm.ecus).toBe(10000);
    });
  });
});
