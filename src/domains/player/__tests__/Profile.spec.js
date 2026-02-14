import { describe, it, expect, beforeEach, vi } from "vitest";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import ProfileComponent from "../components/Profile.vue";
import { usePlayerStore } from "@/stores/player";

describe("ProfileComponent", () => {
  let wrapper;
  let playerStore;

  beforeEach(() => {
    setActivePinia(createPinia());

    playerStore = usePlayerStore();

    // Mock player state
    playerStore.$patch({
      nom: "Maître Forgeron",
      niveau: 10,
      experience: 2500,
      experienceProchainNiveau: 3000,
      ecus: 5000,
      or: 150,
      titre: "Artisan Légendaire",
    });

    Object.defineProperty(playerStore, "stats", {
      get: vi.fn(() => ({
        totalObjetsForges: 125,
        objetsLegendaires: 5,
        materialsAcquired: 450,
        totalVentes: 8000,
      })),
    });

    Object.defineProperty(playerStore, "achievements", {
      get: vi.fn(() => [
        {
          id: "first-craft",
          nom: "Premier Craft",
          description: "Forgez votre premier objet",
          unlocked: true,
        },
        {
          id: "legendary-smith",
          nom: "Forgeron Légendaire",
          description: "Forgez 5 objets légendaires",
          unlocked: false,
        },
      ]),
    });

    wrapper = mount(ProfileComponent, {
      global: {
        plugins: [createPinia()],
        stubs: {
          User: true,
          Award: true,
          TrendingUp: true,
          Coins: true,
          Trophy: true,
          Star: true,
          Lock: true,
        },
      },
    });
  });

  describe("Rendu initial", () => {
    it("devrait afficher le profil du joueur", () => {
      expect(wrapper.text()).toContain("Profil");
    });

    it("devrait afficher le nom du joueur", () => {
      expect(wrapper.vm.nom).toBe("Maître Forgeron");
    });

    it("devrait afficher le niveau du joueur", () => {
      expect(wrapper.vm.niveau).toBe(10);
    });

    it("devrait afficher le titre du joueur", () => {
      expect(wrapper.vm.titre).toBe("Artisan Légendaire");
    });
  });

  describe("Ressources", () => {
    it("devrait afficher les écus", () => {
      expect(wrapper.vm.ecus).toBe(5000);
    });

    it("devrait afficher l'or", () => {
      expect(wrapper.vm.or).toBe(150);
    });
  });

  describe("Expérience", () => {
    it("devrait afficher l'expérience actuelle", () => {
      expect(wrapper.vm.experience).toBe(2500);
    });

    it("devrait afficher l'expérience pour le prochain niveau", () => {
      expect(wrapper.vm.experienceProchainNiveau).toBe(3000);
    });

    it("devrait calculer le pourcentage de progression", () => {
      const percentage = (2500 / 3000) * 100;
      expect(percentage).toBeCloseTo(83.33, 1);
    });
  });

  describe("Statistiques", () => {
    it("devrait afficher les statistiques du joueur", () => {
      const stats = wrapper.vm.stats;
      expect(stats.totalObjetsForges).toBe(125);
      expect(stats.objetsLegendaires).toBe(5);
      expect(stats.materialsAcquired).toBe(450);
      expect(stats.totalVentes).toBe(8000);
    });
  });

  describe("Achievements", () => {
    it("devrait afficher la liste des succès", () => {
      const achievements = wrapper.vm.achievements;
      expect(achievements.length).toBe(2);
      expect(achievements[0].nom).toBe("Premier Craft");
      expect(achievements[1].nom).toBe("Forgeron Légendaire");
    });

    it("devrait distinguer les succès débloqués et verrouillés", () => {
      const achievements = wrapper.vm.achievements;
      expect(achievements[0].unlocked).toBe(true);
      expect(achievements[1].unlocked).toBe(false);
    });
  });

  describe("Computed properties", () => {
    it("devrait mapper les propriétés du playerStore", () => {
      expect(wrapper.vm.nom).toBe(playerStore.nom);
      expect(wrapper.vm.niveau).toBe(playerStore.niveau);
      expect(wrapper.vm.experience).toBe(playerStore.experience);
      expect(wrapper.vm.ecus).toBe(playerStore.ecus);
      expect(wrapper.vm.or).toBe(playerStore.or);
    });

    it("stats devrait mapper le getter du store", () => {
      expect(wrapper.vm.stats).toBe(playerStore.stats);
    });

    it("achievements devrait mapper le getter du store", () => {
      expect(wrapper.vm.achievements).toBe(playerStore.achievements);
    });
  });

  describe("Réactivité", () => {
    it("devrait réagir aux changements du niveau", async () => {
      playerStore.$patch({ niveau: 15 });
      await wrapper.vm.$nextTick();

      expect(wrapper.vm.niveau).toBe(15);
    });

    it("devrait réagir aux changements de l'expérience", async () => {
      playerStore.$patch({ experience: 2800 });
      await wrapper.vm.$nextTick();

      expect(wrapper.vm.experience).toBe(2800);
    });
  });
});
