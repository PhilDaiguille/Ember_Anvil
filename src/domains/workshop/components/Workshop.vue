<script>
import { mapState, mapActions, mapGetters } from "pinia";
import { usePlayerStore } from "@/stores/player";
import { useWorkshopStore } from "@/stores/workshop";
import { useGameStore } from "@/stores/game";
import { Hammer, Building2, Target } from "lucide-vue-next";
import WorkshopHeader from "./WorkshopHeader.vue";
import ToolCard from "./ToolCard.vue";
import FacilityCard from "./FacilityCard.vue";
import QuestCard from "./QuestCard.vue";
import WorkshopHistory from "./WorkshopHistory.vue";
import UpgradeOverlay from "./UpgradeOverlay.vue";

export default {
  name: "WorkshopComponent",
  components: {
    Hammer,
    Building2,
    Target,
    WorkshopHeader,
    ToolCard,
    FacilityCard,
    QuestCard,
    WorkshopHistory,
    UpgradeOverlay,
  },
  data() {
    return {
      selectedTool: null,
      upgrading: false,
    };
  },
  computed: {
    ...mapState(usePlayerStore, ["ecus", "or", "experience"]),
    ...mapState(useWorkshopStore, [
      "allTools",
      "allFacilities",
      "activeQuests",
      "historique",
      "productiviteGlobale",
      "bonusActifs",
      "hasActiveSynergy",
      "activeSynergiesCount",
    ]),
    ...mapGetters(useWorkshopStore, [
      "hasSynergy",
      "canUpgradeTool",
      "canUpgradeFacility",
      "canActivateFacility",
    ]),

    playerResources() {
      return {
        ecus: this.ecus,
        or: this.or,
        experience: this.experience,
      };
    },

    // Aliases to keep tests working with previous names
    tools() {
      return this.allTools;
    },
    facilities() {
      return this.allFacilities;
    },
    quetes() {
      return this.activeQuests;
    },
  },
  mounted() {
    const workshopStore = useWorkshopStore();
    workshopStore.initialize();
  },
  methods: {
    ...mapActions(useWorkshopStore, [
      "upgradeTool",
      "toggleFacility",
      "upgradeFacility",
    ]),

    getProgressPercentage(progression, objectif) {
      if (!objectif || objectif === 0) return 0;
      return Math.min(100, Math.round((progression / objectif) * 100));
    },

    selectTool(tool) {
      this.selectedTool = tool;
    },

    async handleUpgradeTool(tool) {
      this.upgrading = true;
      setTimeout(() => {
        this.upgradeTool(tool.id);
        this.upgrading = false;
        useGameStore().trackToolUpgrade(tool.id);
      }, 2000);
    },

    handleToggleFacility(facility) {
      const wasInactive = !facility.actif;
      this.toggleFacility(facility.id);
      if (wasInactive) {
        useGameStore().trackFacilityActivation();
      }
    },

    handleUpgradeFacility(facility) {
      this.upgradeFacility(facility.id);
    },
  },
};
</script>

<template>
  <main
    class="workshop-page"
    id="main-content"
    aria-label="Atelier du forgeron"
  >
    <div class="workshop-container">
      <WorkshopHeader
        :resources="playerResources"
        :productivite-globale="productiviteGlobale"
        :bonus-actifs="bonusActifs"
        :facilities-count="allFacilities.length"
        :has-active-synergy="hasActiveSynergy"
      />

      <section class="tools-section">
        <div class="section-header">
          <h2 class="section-title">
            <Hammer :size="32" :stroke-width="2" class="section-icon" />
            Outils de Forge
          </h2>
          <p class="section-subtitle">
            Améliorez vos équipements pour augmenter leur efficacité
          </p>
        </div>

        <div class="tools-grid">
          <ToolCard
            v-for="tool in allTools"
            :key="tool.id"
            :tool="tool"
            :selected="selectedTool && selectedTool.id === tool.id"
            :has-synergy="hasSynergy(tool)"
            :can-upgrade="canUpgradeTool(tool)"
            :upgrading="upgrading"
            @select="selectTool"
            @upgrade="handleUpgradeTool"
          />
        </div>
      </section>

      <section class="facilities-section">
        <div class="section-header">
          <h2 class="section-title">
            <Building2 :size="32" :stroke-width="2" class="section-icon" />
            Installations d'Atelier
          </h2>
          <p class="section-subtitle">
            Débloquez et gérez vos stations spécialisées
          </p>
        </div>

        <div class="facilities-grid">
          <FacilityCard
            v-for="facility in allFacilities"
            :key="facility.id"
            :facility="facility"
            :can-activate="canActivateFacility(facility)"
            :can-upgrade="canUpgradeFacility(facility)"
            @toggle="handleToggleFacility"
            @upgrade="handleUpgradeFacility"
          />
        </div>
      </section>

      <section class="quests-section">
        <div class="section-header">
          <h2 class="section-title">
            <Target :size="32" :stroke-width="2" class="section-icon" />
            Objectifs Quotidiens
          </h2>
          <p class="section-subtitle">
            Complétez des objectifs pour gagner des récompenses
          </p>
        </div>

        <div class="quests-grid">
          <QuestCard
            v-for="quest in activeQuests"
            :key="quest.id"
            :quest="quest"
          />
        </div>
      </section>

      <WorkshopHistory :historique="historique" />
    </div>

    <UpgradeOverlay :upgrading="upgrading" />
  </main>
</template>

<style scoped>
.workshop-page {
  min-height: 95dvh;
  background: linear-gradient(135deg, #0a0e0d 0%, #1a1612 50%, #0d1310 100%);
  padding: 2rem;
  position: relative;
}

.workshop-page::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    radial-gradient(
      circle at 20% 30%,
      rgba(133, 50, 51, 0.08),
      transparent 50%
    ),
    radial-gradient(circle at 80% 70%, rgba(0, 114, 87, 0.08), transparent 50%);
  pointer-events: none;
}

.workshop-container {
  max-width: 1600px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}

.section-header {
  margin-bottom: 2rem;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 2rem;
  font-weight: 800;
  color: var(--dun);
  margin: 0 0 0.5rem 0;
  font-family: "Georgia", serif;
}

.section-icon {
  color: var(--auburn);
}

.section-subtitle {
  font-size: 1rem;
  color: rgba(161, 152, 130, 0.7);
  margin: 0;
}

.tools-section {
  margin-bottom: 4rem;
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
}

.facilities-section {
  margin-bottom: 4rem;
}

.facilities-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 2rem;
}

.quests-section {
  margin-bottom: 4rem;
}

.quests-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 1.5rem;
}

@media (max-width: 768px) {
  .tools-grid,
  .facilities-grid {
    grid-template-columns: 1fr;
  }
}
</style>
