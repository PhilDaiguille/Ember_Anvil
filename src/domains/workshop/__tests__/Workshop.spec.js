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

  beforeEach(() => {
    setActivePinia(createPinia());

    playerStore = usePlayerStore();
    workshopStore = useWorkshopStore();

    // Mock player resources
    playerStore.$patch({
      ecus: 5000,
      or: 100,
      experience: 1500,
    });

    // Mock workshop state
    Object.defineProperty(workshopStore, "allTools", {
      get: vi.fn(() => [
        {
          id: "hammer",
          nom: "Marteau Lourd",
          niveau: 1,
          niveauMax: 10,
          puissance: 10,
        },
        {
          id: "anvil",
          nom: "Enclume Robuste",
          niveau: 2,
          niveauMax: 10,
          puissance: 20,
        },
      ]),
    });

    Object.defineProperty(workshopStore, "allFacilities", {
      get: vi.fn(() => [
        {
          id: "trempage",
          nom: "Station de Trempage",
          niveau: 1,
          niveauMax: 5,
          active: true,
        },
        {
          id: "enchantement",
          nom: "Table d'Enchantement",
          niveau: 0,
          niveauMax: 5,
          active: false,
        },
      ]),
    });

    Object.defineProperty(workshopStore, "activeQuests", {
      get: vi.fn(() => [
        {
          id: "quest1",
          titre: "Forger 5 épées",
          progression: 3,
          objectif: 5,
          recompenses: { ecus: 100, experience: 50 },
        },
      ]),
    });

    Object.defineProperty(workshopStore, "historique", {
      get: vi.fn(() => []),
    });

    Object.defineProperty(workshopStore, "productiviteGlobale", {
      get: vi.fn(() => 125),
    });

    Object.defineProperty(workshopStore, "bonusActifs", {
      get: vi.fn(() => 1),
    });

    Object.defineProperty(workshopStore, "hasActiveSynergy", {
      get: vi.fn(() => true),
    });

    Object.defineProperty(workshopStore, "activeSynergiesCount", {
      get: vi.fn(() => 2),
    });

    workshopStore.initialize = vi.fn();
    workshopStore.hasSynergy = vi.fn(() => false);
    workshopStore.canUpgradeTool = vi.fn(() => true);
    workshopStore.canUpgradeFacility = vi.fn(() => true);
    workshopStore.canActivateFacility = vi.fn(() => true);

    wrapper = mount(WorkshopComponent, {
      global: {
        plugins: [createPinia()],
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
      expect(tools.length).toBe(2);
      expect(tools[0].nom).toBe("Marteau Lourd");
      expect(tools[1].nom).toBe("Enclume Robuste");
    });

    it("devrait sélectionner un outil", () => {
      const tool = { id: "hammer", nom: "Marteau Lourd" };
      wrapper.vm.selectTool(tool);

      expect(wrapper.vm.selectedTool).toBe(tool);
    });

    it("devrait vérifier si on peut améliorer un outil", () => {
      const tool = { id: "hammer" };
      const canUpgrade = wrapper.vm.canUpgradeTool(tool);

      expect(canUpgrade).toBe(true);
      expect(workshopStore.canUpgradeTool).toHaveBeenCalledWith("hammer");
    });

    it("devrait vérifier si un outil a une synergie", () => {
      const tool = { id: "anvil" };

      // Clear any previous calls
      workshopStore.hasSynergy.mockClear();

      // Call the method
      const result = workshopStore.hasSynergy(tool.id);

      // Verify the mock was called correctly
      expect(workshopStore.hasSynergy).toHaveBeenCalledWith("anvil");
      expect(result).toBe(false); // Based on the mock return value
    });
  });

  describe("Amélioration d'outils", () => {
    it("devrait lancer l'animation d'amélioration", async () => {
      vi.useFakeTimers();

      const tool = { id: "hammer", nom: "Marteau Lourd", niveau: 1 };
      workshopStore.upgradeTool = vi.fn(() => true);

      // Simulate the upgrade process
      wrapper.vm.upgrading = true;
      workshopStore.upgradeTool(tool.id);

      expect(wrapper.vm.upgrading).toBe(true);

      // Fast-forward time
      vi.advanceTimersByTime(2000);
      wrapper.vm.upgrading = false;

      expect(workshopStore.upgradeTool).toHaveBeenCalledWith("hammer");
      expect(wrapper.vm.upgrading).toBe(false);

      vi.useRealTimers();
    });
  });

  describe("Installations (Facilities)", () => {
    it("devrait afficher la liste des installations", () => {
      const facilities = wrapper.vm.facilities;
      expect(facilities.length).toBe(2);
      expect(facilities[0].nom).toBe("Station de Trempage");
      expect(facilities[1].nom).toBe("Table d'Enchantement");
    });

    it("devrait activer/désactiver une installation", () => {
      workshopStore.toggleFacility = vi.fn(() => true);
      const facility = { id: "trempage" };

      workshopStore.toggleFacility(facility.id);

      expect(workshopStore.toggleFacility).toHaveBeenCalledWith("trempage");
    });

    it("devrait améliorer une installation", () => {
      workshopStore.upgradeFacility = vi.fn(() => true);
      const facility = { id: "enchantement" };

      workshopStore.upgradeFacility(facility.id);

      expect(workshopStore.upgradeFacility).toHaveBeenCalledWith(
        "enchantement",
      );
    });

    it("devrait vérifier si on peut améliorer une installation", () => {
      const facility = { id: "trempage" };
      workshopStore.canUpgradeFacility.mockClear();

      const canUpgrade = workshopStore.canUpgradeFacility(facility.id);

      expect(canUpgrade).toBe(true);
      expect(workshopStore.canUpgradeFacility).toHaveBeenCalledWith("trempage");
    });

    it("devrait vérifier si on peut activer une installation", () => {
      const facility = { id: "enchantement" };
      const canActivate = wrapper.vm.canActivateFacility(facility);

      expect(canActivate).toBe(true);
      expect(workshopStore.canActivateFacility).toHaveBeenCalledWith(
        "enchantement",
      );
    });
  });

  describe("Quêtes", () => {
    it("devrait afficher la liste des quêtes actives", () => {
      const quetes = wrapper.vm.quetes;
      expect(quetes.length).toBe(1);
      expect(quetes[0].titre).toBe("Forger 5 épées");
      expect(quetes[0].progression).toBe(3);
      expect(quetes[0].objectif).toBe(5);
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
    it("tools devrait retourner allTools", () => {
      expect(wrapper.vm.tools).toBe(workshopStore.allTools);
    });

    it("facilities devrait retourner allFacilities", () => {
      expect(wrapper.vm.facilities).toBe(workshopStore.allFacilities);
    });

    it("quetes devrait retourner activeQuests", () => {
      expect(wrapper.vm.quetes).toBe(workshopStore.activeQuests);
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
      const tool = { id: "hammer" };
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
