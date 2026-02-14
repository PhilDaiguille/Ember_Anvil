import { describe, it, expect, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import { createPinia, setActivePinia } from "pinia";
import ProfileComponent from "../components/Profile.vue";
import { usePlayerStore } from "@/stores/player";

describe("ProfileComponent", () => {
  let wrapper;
  let playerStore;
  let pinia;

  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);

    playerStore = usePlayerStore();

    playerStore.$patch({
      nom: "Maître Forgeron",
      niveau: 10,
      experience: 2500,
      experienceMax: 5000,
      ecus: 5000,
      or: 150,
      titre: "Forgeron Confirmé",
    });

    wrapper = mount(ProfileComponent, {
      global: {
        plugins: [pinia],
        stubs: {
          Swords: true,
          Calendar: true,
          BarChart3: true,
          Hammer: true,
          Coins: true,
          Clock: true,
          Trophy: true,
          Package: true,
          ScrollText: true,
          Medal: true,
          ShieldCheck: true,
          Settings: true,
          Gem: true,
          Crown: true,
          Target: true,
          Sparkles: true,
          Lock: true,
        },
      },
    });
  });

  describe("Rendu initial", () => {
    it("devrait afficher le conteneur de profil", () => {
      expect(wrapper.find(".profile-page").exists()).toBe(true);
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

    it("devrait afficher l'expérience max", () => {
      expect(wrapper.vm.experienceMax).toBe(5000);
    });

    it("devrait calculer le pourcentage de progression", () => {
      expect(wrapper.vm.progressionNiveau).toBe(50);
    });
  });

  describe("Niveau", () => {
    it("devrait afficher le niveau du joueur", () => {
      expect(wrapper.vm.niveau).toBe(10);
    });

    it("devrait retourner le niveau suivant", () => {
      expect(wrapper.vm.niveauSuivant).toBe(11);
    });

    it("devrait retourner le titre actuel", () => {
      expect(typeof wrapper.vm.titreActuel).toBe("string");
      expect(wrapper.vm.titreActuel.length).toBeGreaterThan(0);
    });
  });

  describe("Statistiques", () => {
    it("devrait mapper les stats du store", () => {
      expect(wrapper.vm.stats).toBeDefined();
      expect(wrapper.vm.stats).toHaveProperty("objetsCrees");
      expect(wrapper.vm.stats).toHaveProperty("valeurCreations");
    });
  });

  describe("Réactivité", () => {
    it("devrait réagir aux changements du niveau", async () => {
      playerStore.$patch({ niveau: 15 });
      await wrapper.vm.$nextTick();

      expect(wrapper.vm.niveau).toBe(15);
    });

    it("devrait réagir aux changements de l'expérience", async () => {
      playerStore.$patch({ experience: 4000 });
      await wrapper.vm.$nextTick();

      expect(wrapper.vm.experience).toBe(4000);
    });

    it("devrait réagir aux changements d'écus", async () => {
      playerStore.$patch({ ecus: 10000 });
      await wrapper.vm.$nextTick();

      expect(wrapper.vm.ecus).toBe(10000);
    });
  });
});
