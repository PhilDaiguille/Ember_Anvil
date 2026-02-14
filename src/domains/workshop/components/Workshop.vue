<script>
import { mapState, mapActions, mapWritableState } from "pinia";
import { usePlayerStore } from "@/stores/player";
import { useWorkshopStore } from "@/stores/workshop";
import {
  Wrench,
  Hammer,
  Anvil,
  Flame,
  Wind,
  Droplet,
  Sparkles,
  Zap,
  Building2,
  ArrowUp,
  Coins,
  TrendingUp,
  Target,
  Clock,
  CheckCircle,
  Award,
} from "lucide-vue-next";

export default {
  name: "WorkshopComponent",
  components: {
    Wrench,
    Hammer,
    Anvil,
    Flame,
    Wind,
    Droplet,
    Sparkles,
    Zap,
    Building2,
    ArrowUp,
    Coins,
    TrendingUp,
    Target,
    Clock,
    CheckCircle,
    Award,
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

    // Player resources for display
    playerResources() {
      return {
        ecus: this.ecus,
        or: this.or,
        experience: this.experience,
      };
    },

    // Tools for iteration
    tools() {
      return this.allTools;
    },

    // Facilities for iteration
    facilities() {
      return this.allFacilities;
    },

    // Quests for iteration
    quetes() {
      return this.activeQuests;
    },
  },
  mounted() {
    // Initialize workshop on mount
    const workshopStore = useWorkshopStore();
    workshopStore.initialize();
  },
  methods: {
    ...mapActions(useWorkshopStore, [
      "upgradeTool",
      "toggleFacility",
      "upgradeFacility",
    ]),

    selectTool(tool) {
      this.selectedTool = tool;
    },

    async handleUpgradeTool(tool) {
      this.upgrading = true;

      // Wait 2 seconds for animation
      setTimeout(() => {
        this.upgradeTool(tool.id);
        this.upgrading = false;
      }, 2000);
    },

    handleToggleFacility(facility) {
      this.toggleFacility(facility.id);
    },

    handleUpgradeFacility(facility) {
      this.upgradeFacility(facility.id);
    },

    getProgressPercentage(niveau, niveauMax) {
      return (niveau / niveauMax) * 100;
    },

    hasSynergy(tool) {
      const workshopStore = useWorkshopStore();
      return workshopStore.hasSynergy(tool.id);
    },

    canUpgradeTool(tool) {
      const workshopStore = useWorkshopStore();
      return workshopStore.canUpgradeTool(tool.id);
    },

    canUpgradeFacility(facility) {
      const workshopStore = useWorkshopStore();
      return workshopStore.canUpgradeFacility(facility.id);
    },

    canActivateFacility(facility) {
      const workshopStore = useWorkshopStore();
      return workshopStore.canActivateFacility(facility.id);
    },
  },
};
</script>

<template>
  <main class="workshop-page">
    <div class="workshop-container">
      <!-- Header -->
      <header class="workshop-header">
        <div class="header-hero">
          <h1 class="page-title">
            <span class="title-decoration">╔═══</span>
            <span class="title-text">
              <Wrench :size="48" :stroke-width="2" class="title-icon" />
              L'Atelier du Maître
            </span>
            <span class="title-decoration">═══╗</span>
          </h1>
          <p class="page-description">
            Améliorez vos outils et débloquez de nouvelles installations pour
            devenir le plus grand forgeron du royaume
          </p>
        </div>

        <!-- Resources Panel -->
        <div class="resources-panel">
          <div class="resource-card">
            <Coins
              :size="28"
              :stroke-width="2"
              class="resource-icon ecus-icon"
            />
            <div class="resource-info">
              <span class="resource-label">Écus</span>
              <span class="resource-value">{{
                playerResources.ecus.toLocaleString()
              }}</span>
            </div>
          </div>
          <div class="resource-card">
            <Award
              :size="28"
              :stroke-width="2"
              class="resource-icon gold-icon"
            />
            <div class="resource-info">
              <span class="resource-label">Or</span>
              <span class="resource-value">{{ playerResources.or }}</span>
            </div>
          </div>
          <div class="resource-card">
            <TrendingUp
              :size="28"
              :stroke-width="2"
              class="resource-icon exp-icon"
            />
            <div class="resource-info">
              <span class="resource-label">Expérience</span>
              <span class="resource-value">{{
                playerResources.experience
              }}</span>
            </div>
          </div>
        </div>

        <!-- Workshop Stats -->
        <div class="stats-panel">
          <div class="stat-item">
            <div class="stat-icon-wrapper">
              <TrendingUp :size="32" :stroke-width="2" class="stat-icon" />
            </div>
            <div class="stat-content">
              <span class="stat-label">Productivité Globale</span>
              <span class="stat-value">{{ productiviteGlobale }}%</span>
            </div>
          </div>
          <div class="stat-item">
            <div class="stat-icon-wrapper">
              <Building2 :size="32" :stroke-width="2" class="stat-icon" />
            </div>
            <div class="stat-content">
              <span class="stat-label">Bonus Actifs</span>
              <span class="stat-value"
                >{{ bonusActifs }}/{{ facilities.length }}</span
              >
            </div>
          </div>
          <div
            class="stat-item"
            :class="{ 'synergy-active': hasActiveSynergy }"
          >
            <div class="stat-icon-wrapper">
              <Sparkles :size="32" :stroke-width="2" class="stat-icon" />
            </div>
            <div class="stat-content">
              <span class="stat-label">Synergie</span>
              <span class="stat-value">{{
                hasActiveSynergy ? "Active" : "Inactive"
              }}</span>
            </div>
          </div>
        </div>
      </header>

      <!-- Tools Section -->
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
          <article
            v-for="tool in tools"
            :key="tool.id"
            class="tool-card"
            :class="{
              selected: selectedTool && selectedTool.id === tool.id,
              'has-synergy': hasSynergy(tool),
            }"
            @click="selectTool(tool)"
          >
            <div v-if="hasSynergy(tool)" class="synergy-badge">
              <Sparkles :size="16" :stroke-width="2" />
              Synergie
            </div>

            <div class="tool-icon-wrapper">
              <component
                :is="tool.icone"
                :size="64"
                :stroke-width="2"
                class="tool-icon"
              />
              <div class="tool-level-badge">Niv. {{ tool.niveau }}</div>
            </div>

            <div class="tool-content">
              <h3 class="tool-name">{{ tool.nom }}</h3>

              <div class="tool-stats">
                <div class="stat-row">
                  <span class="stat-label">Niveau</span>
                  <span class="stat-value"
                    >{{ tool.niveau }}/{{ tool.niveauMax }}</span
                  >
                </div>
                <div class="progress-bar-small">
                  <div
                    class="progress-fill-small"
                    :style="{
                      width:
                        getProgressPercentage(tool.niveau, tool.niveauMax) +
                        '%',
                    }"
                  ></div>
                </div>
              </div>

              <div class="tool-power">
                <span class="power-label">Pouvoir</span>
                <div class="power-bar">
                  <div
                    class="power-fill"
                    :style="{ width: tool.pouvoir + '%' }"
                  ></div>
                  <span class="power-text">{{ tool.pouvoir }}%</span>
                </div>
              </div>

              <button
                class="upgrade-btn"
                :disabled="!canUpgradeTool(tool) || upgrading"
                @click.stop="handleUpgradeTool(tool)"
              >
                <span v-if="tool.niveau >= tool.niveauMax" class="btn-text"
                  >MAX</span
                >
                <span v-else class="btn-content">
                  <ArrowUp :size="18" :stroke-width="2" class="btn-icon" />
                  <span class="btn-text"
                    >Améliorer ({{ tool.coutUpgrade }} écus)</span
                  >
                </span>
              </button>
            </div>
          </article>
        </div>
      </section>

      <!-- Facilities Section -->
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
          <article
            v-for="facility in facilities"
            :key="facility.id"
            class="facility-card"
            :class="{ inactive: !facility.actif }"
          >
            <div class="facility-header">
              <div class="facility-icon-wrapper">
                <component
                  :is="facility.icone"
                  :size="40"
                  :stroke-width="2"
                  class="facility-icon"
                />
              </div>
              <div class="facility-status">
                <span
                  class="status-dot"
                  :class="{ active: facility.actif }"
                ></span>
                <span class="status-text">{{
                  facility.actif ? "Actif" : "Inactif"
                }}</span>
              </div>
            </div>

            <div class="facility-content">
              <h3 class="facility-name">{{ facility.nom }}</h3>
              <p class="facility-description">{{ facility.description }}</p>

              <div class="facility-level">
                <span class="level-label"
                  >Niveau {{ facility.niveau }}/{{ facility.niveauMax }}</span
                >
                <div class="level-stars">
                  <span
                    v-for="i in facility.niveauMax"
                    :key="i"
                    class="star"
                    :class="{ filled: i <= facility.niveau }"
                  >
                    ★
                  </span>
                </div>
              </div>

              <div class="facility-bonus">
                <span class="bonus-label">Bonus Productivité</span>
                <span class="bonus-value"
                  >+{{ facility.bonusProductivite }}%</span
                >
              </div>

              <div class="facility-actions">
                <button
                  v-if="facility.actif"
                  class="facility-btn deactivate-btn"
                  @click="handleToggleFacility(facility)"
                >
                  Désactiver
                </button>
                <button
                  v-else
                  class="facility-btn activate-btn"
                  :disabled="!canActivateFacility(facility)"
                  @click="handleToggleFacility(facility)"
                >
                  Activer ({{ facility.coutActivation }} écus)
                </button>
                <button
                  class="facility-btn upgrade-facility-btn"
                  :disabled="!canUpgradeFacility(facility)"
                  @click="handleUpgradeFacility(facility)"
                >
                  <span v-if="facility.niveau >= facility.niveauMax">MAX</span>
                  <span v-else
                    >Améliorer ({{
                      Math.floor(facility.coutUpgrade / 10)
                    }}
                    or)</span
                  >
                </button>
              </div>
            </div>
          </article>
        </div>
      </section>

      <!-- Quests Section -->
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
          <article
            v-for="quete in quetes"
            :key="quete.id"
            class="quest-card"
            :class="{ completed: quete.terminee }"
          >
            <div class="quest-header">
              <h3 class="quest-name">{{ quete.nom }}</h3>
              <CheckCircle
                v-if="quete.terminee"
                :size="24"
                :stroke-width="2"
                class="check-icon"
              />
            </div>

            <div class="quest-progress">
              <div class="progress-info">
                <span class="progress-text"
                  >{{ quete.progression }}/{{ quete.objectif }}</span
                >
                <span class="progress-percent"
                  >{{
                    Math.round((quete.progression / quete.objectif) * 100)
                  }}%</span
                >
              </div>
              <div class="quest-progress-bar">
                <div
                  class="quest-progress-fill"
                  :style="{
                    width: (quete.progression / quete.objectif) * 100 + '%',
                  }"
                ></div>
              </div>
            </div>

            <div class="quest-rewards">
              <span class="rewards-label">Récompenses:</span>
              <div class="rewards-list">
                <span v-if="quete.recompense.ecus" class="reward-item">
                  <Coins :size="16" :stroke-width="2" />
                  {{ quete.recompense.ecus }} écus
                </span>
                <span v-if="quete.recompense.or" class="reward-item">
                  <Award :size="16" :stroke-width="2" />
                  {{ quete.recompense.or }} or
                </span>
                <span v-if="quete.recompense.experience" class="reward-item">
                  <TrendingUp :size="16" :stroke-width="2" />
                  {{ quete.recompense.experience }} XP
                </span>
              </div>
            </div>
          </article>
        </div>
      </section>

      <!-- History Section -->
      <section v-if="historique.length > 0" class="history-section">
        <div class="section-header">
          <h2 class="section-title">
            <Clock :size="32" :stroke-width="2" class="section-icon" />
            Historique Récent
          </h2>
          <p class="section-subtitle">Vos dernières améliorations</p>
        </div>

        <div class="history-list">
          <div
            v-for="(item, index) in historique"
            :key="index"
            class="history-item"
          >
            <div class="history-icon">
              <Hammer
                v-if="item.type === 'upgrade'"
                :size="20"
                :stroke-width="2"
              />
              <Building2 v-else :size="20" :stroke-width="2" />
            </div>
            <div class="history-content">
              <span class="history-name">{{ item.nom }}</span>
              <span class="history-details">{{ item.details }}</span>
            </div>
            <div class="history-meta">
              <span class="history-cost"
                >-{{ item.cout }} {{ item.devise }}</span
              >
              <span class="history-time">{{ item.time }}</span>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Upgrade Animation Overlay -->
    <Teleport to="body">
      <div v-if="upgrading" class="upgrade-overlay">
        <div class="upgrade-animation">
          <Hammer :size="96" :stroke-width="2" class="hammer-strike" />
          <div class="sparks">
            <Sparkles :size="32" :stroke-width="2" />
            <Sparkles :size="32" :stroke-width="2" />
            <Sparkles :size="32" :stroke-width="2" />
          </div>
          <p class="upgrade-text">Amélioration en cours...</p>
        </div>
      </div>
    </Teleport>
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

/* Header */
.workshop-header {
  margin-bottom: 4rem;
  text-align: center;
}

.header-hero {
  padding: 3rem 2rem;
  background: linear-gradient(
    135deg,
    rgba(26, 22, 18, 0.8),
    rgba(15, 13, 10, 0.8)
  );
  border: 2px solid rgba(161, 152, 130, 0.3);
  border-radius: 1rem;
  position: relative;
  overflow: hidden;
  margin-bottom: 2rem;
}

.header-hero::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(
    90deg,
    transparent,
    var(--auburn),
    var(--viridian),
    transparent
  );
}

/* Resources Panel */
.resources-panel {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.resource-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: linear-gradient(
    135deg,
    rgba(26, 22, 18, 0.9),
    rgba(15, 13, 10, 0.9)
  );
  border: 2px solid rgba(161, 152, 130, 0.2);
  border-radius: 0.75rem;
  transition: all 0.3s ease;
}

.resource-card:hover {
  border-color: rgba(161, 152, 130, 0.4);
  transform: translateY(-2px);
}

.resource-icon {
  flex-shrink: 0;
}

.ecus-icon {
  color: #d4af37;
}

.gold-icon {
  color: #ffd700;
}

.exp-icon {
  color: var(--viridian);
}

.resource-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.resource-label {
  font-size: 0.85rem;
  color: rgba(161, 152, 130, 0.7);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 600;
}

.resource-value {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--dun);
}

/* Stats Panel */
.stats-panel {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: linear-gradient(
    135deg,
    rgba(26, 22, 18, 0.9),
    rgba(15, 13, 10, 0.9)
  );
  border: 2px solid rgba(161, 152, 130, 0.2);
  border-radius: 0.75rem;
  transition: all 0.3s ease;
}

.stat-item:hover {
  border-color: rgba(161, 152, 130, 0.4);
}

.stat-item.synergy-active {
  border-color: rgba(212, 175, 55, 0.5);
  background: linear-gradient(
    135deg,
    rgba(212, 175, 55, 0.1),
    rgba(26, 22, 18, 0.9)
  );
}

.stat-icon-wrapper {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle, rgba(161, 152, 130, 0.15), transparent);
  border-radius: 0.5rem;
}

.stat-icon {
  color: var(--viridian);
}

.synergy-active .stat-icon {
  color: #d4af37;
}

.stat-content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.stat-label {
  font-size: 0.85rem;
  color: rgba(161, 152, 130, 0.7);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 600;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--dun);
}

.synergy-active .stat-value {
  color: #d4af37;
}

.page-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 900;
  color: var(--dun);
  margin: 0 0 1rem 0;
  font-family: "Georgia", serif;
}

.title-decoration {
  font-size: 0.5em;
  color: var(--auburn);
  opacity: 0.6;
}

.title-text {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.title-icon {
  color: var(--dun);
}

.page-description {
  font-size: 1.1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.75);
  max-width: 800px;
  margin: 0 auto;
}

/* Section Header */
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

/* Tools Section */
.tools-section {
  margin-bottom: 4rem;
}

.tools-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
}

.tool-card {
  background: linear-gradient(
    135deg,
    rgba(26, 22, 18, 0.95),
    rgba(15, 13, 10, 0.95)
  );
  border: 2px solid rgba(161, 152, 130, 0.2);
  border-radius: 1rem;
  padding: 2rem;
  transition: all 0.4s ease;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.tool-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
  background: linear-gradient(135deg, rgba(133, 50, 51, 0.1), transparent);
  opacity: 0;
  transition: opacity 0.4s ease;
}

.tool-card:hover::before,
.tool-card.selected::before {
  opacity: 1;
}

.tool-card:hover {
  border-color: rgba(161, 152, 130, 0.5);
  transform: translateY(-8px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.5);
}

.tool-card.selected {
  border-color: var(--auburn);
  box-shadow: 0 0 0 3px rgba(133, 50, 51, 0.3);
}

.tool-card.has-synergy {
  border-color: rgba(212, 175, 55, 0.5);
}

.tool-card.has-synergy::before {
  background: linear-gradient(135deg, rgba(212, 175, 55, 0.15), transparent);
  opacity: 1;
}

.synergy-badge {
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem 0.75rem;
  background: linear-gradient(
    135deg,
    rgba(212, 175, 55, 0.9),
    rgba(255, 215, 0, 0.9)
  );
  border-radius: 2rem;
  font-size: 0.75rem;
  font-weight: 700;
  color: rgb(25, 25, 25);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  z-index: 2;
  animation: synergyPulse 2s ease-in-out infinite;
}

@keyframes synergyPulse {
  0%,
  100% {
    box-shadow: 0 0 10px rgba(212, 175, 55, 0.5);
  }
  50% {
    box-shadow: 0 0 20px rgba(212, 175, 55, 0.8);
  }
}

.tool-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 1;
}

.tool-icon {
  color: var(--auburn);
  filter: drop-shadow(0 4px 12px rgba(133, 50, 51, 0.5));
}

.tool-level-badge {
  padding: 0.5rem 1rem;
  background: var(--auburn);
  font-size: 0.85rem;
  font-weight: 700;
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.tool-content {
  position: relative;
  z-index: 1;
}

.tool-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--dun);
  margin: 0 0 1.5rem 0;
  font-family: "Georgia", serif;
}

.tool-stats {
  margin-bottom: 1rem;
}

.stat-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
}

.stat-label {
  color: rgba(161, 152, 130, 0.7);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: 600;
}

.stat-value {
  color: var(--dun);
  font-weight: 700;
}

.progress-bar-small {
  height: 8px;
  background: rgba(25, 25, 25, 0.8);
  overflow: hidden;
  margin-bottom: 1rem;
}

.progress-fill-small {
  height: 100%;
  background: linear-gradient(90deg, var(--auburn), var(--viridian));
  transition: width 0.5s ease;
}

.tool-power {
  margin-bottom: 1.5rem;
}

.power-label {
  display: block;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgba(161, 152, 130, 0.7);
  margin-bottom: 0.5rem;
  font-weight: 600;
}

.power-bar {
  position: relative;
  height: 32px;
  background: rgba(25, 25, 25, 0.8);
  overflow: hidden;
  border: 1px solid rgba(161, 152, 130, 0.2);
}

.power-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--viridian), var(--sea-green));
  transition: width 0.5s ease;
  box-shadow: 0 0 12px rgba(0, 114, 87, 0.5);
}

.power-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 0.9rem;
  font-weight: 900;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
}

.upgrade-btn {
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, var(--sea-green), var(--viridian));
  border: none;
  color: white;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 114, 87, 0.3);
}

.upgrade-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 114, 87, 0.4);
}

.upgrade-btn:disabled {
  background: rgba(161, 152, 130, 0.3);
  cursor: not-allowed;
  box-shadow: none;
}

.btn-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

/* Facilities Section */
.facilities-section {
  margin-bottom: 4rem;
}

.facilities-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  gap: 2rem;
}

.facility-card {
  background: linear-gradient(
    135deg,
    rgba(26, 22, 18, 0.95),
    rgba(15, 13, 10, 0.95)
  );
  border: 2px solid rgba(161, 152, 130, 0.2);
  border-radius: 1rem;
  padding: 2rem;
  transition: all 0.4s ease;
}

.facility-card:hover {
  border-color: rgba(161, 152, 130, 0.5);
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
}

.facility-card.inactive {
  opacity: 0.6;
}

.facility-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.facility-icon-wrapper {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle, rgba(161, 152, 130, 0.2), transparent);
  border-radius: 0.5rem;
}

.facility-icon {
  color: var(--sea-green);
}

.facility-status {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(25, 25, 25, 0.5);
  border-radius: 2rem;
  font-size: 0.85rem;
  font-weight: 600;
}

.status-dot {
  width: 8px;
  height: 8px;
  background: rgba(161, 152, 130, 0.5);
  border-radius: 50%;
  animation: statusPulse 2s ease-in-out infinite;
}

.status-dot.active {
  background: var(--sea-green);
  box-shadow: 0 0 8px rgba(0, 114, 87, 0.6);
}

@keyframes statusPulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

.facility-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--dun);
  margin: 0 0 0.75rem 0;
  font-family: "Georgia", serif;
}

.facility-description {
  font-size: 0.95rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.75);
  margin: 0 0 1.5rem 0;
}

.facility-level {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.level-label {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--dun);
}

.level-stars {
  display: flex;
  gap: 0.25rem;
}

.star {
  font-size: 1.2rem;
  color: rgba(161, 152, 130, 0.3);
  transition: color 0.3s ease;
}

.star.filled {
  color: #d4af37;
  text-shadow: 0 0 8px rgba(212, 175, 55, 0.6);
}

.facility-bonus {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem;
  background: rgba(0, 114, 87, 0.1);
  border-radius: 0.5rem;
  margin-bottom: 1.5rem;
  border: 1px solid rgba(0, 114, 87, 0.2);
}

.bonus-label {
  font-size: 0.85rem;
  color: rgba(161, 152, 130, 0.7);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 600;
}

.bonus-value {
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--sea-green);
}

.facility-actions {
  display: flex;
  gap: 0.75rem;
}

.facility-btn {
  flex: 1;
  padding: 0.875rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  cursor: pointer;
  transition: all 0.3s ease;
}

.facility-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.activate-btn {
  background: linear-gradient(135deg, var(--viridian), var(--sea-green));
  color: white;
}

.activate-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 114, 87, 0.4);
}

.deactivate-btn {
  background: linear-gradient(
    135deg,
    rgba(133, 50, 51, 0.8),
    rgba(148, 37, 37, 0.8)
  );
  color: white;
  border: 1px solid rgba(133, 50, 51, 0.4);
}

.deactivate-btn:hover {
  background: linear-gradient(135deg, var(--auburn), #a03c3e);
  transform: translateY(-2px);
}

.upgrade-facility-btn {
  background: rgba(161, 152, 130, 0.2);
  color: var(--dun);
  border: 1px solid rgba(161, 152, 130, 0.3);
}

.upgrade-facility-btn:hover:not(:disabled) {
  background: rgba(161, 152, 130, 0.3);
  transform: translateY(-2px);
}

/* Quests Section */
.quests-section {
  margin-bottom: 4rem;
}

.quests-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
  gap: 1.5rem;
}

.quest-card {
  background: linear-gradient(
    135deg,
    rgba(26, 22, 18, 0.95),
    rgba(15, 13, 10, 0.95)
  );
  border: 2px solid rgba(161, 152, 130, 0.2);
  border-radius: 1rem;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.quest-card:hover {
  border-color: rgba(161, 152, 130, 0.4);
  transform: translateY(-4px);
}

.quest-card.completed {
  border-color: rgba(0, 114, 87, 0.5);
  background: linear-gradient(
    135deg,
    rgba(0, 114, 87, 0.1),
    rgba(15, 13, 10, 0.95)
  );
}

.quest-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.quest-name {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--dun);
  margin: 0;
}

.check-icon {
  color: var(--sea-green);
  flex-shrink: 0;
}

.quest-progress {
  margin-bottom: 1rem;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.progress-text {
  font-size: 0.9rem;
  font-weight: 600;
  color: rgba(161, 152, 130, 0.9);
}

.progress-percent {
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--viridian);
}

.quest-progress-bar {
  height: 12px;
  background: rgba(25, 25, 25, 0.8);
  border-radius: 1rem;
  overflow: hidden;
}

.quest-progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--viridian), var(--sea-green));
  border-radius: 1rem;
  transition: width 0.5s ease;
}

.quest-rewards {
  padding-top: 1rem;
  border-top: 1px solid rgba(161, 152, 130, 0.2);
}

.rewards-label {
  font-size: 0.85rem;
  color: rgba(161, 152, 130, 0.7);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 600;
  display: block;
  margin-bottom: 0.5rem;
}

.rewards-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.reward-item {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem 0.75rem;
  background: rgba(212, 175, 55, 0.1);
  border: 1px solid rgba(212, 175, 55, 0.3);
  border-radius: 0.5rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: #d4af37;
}

/* History Section */
.history-section {
  margin-bottom: 4rem;
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.history-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  background: linear-gradient(
    135deg,
    rgba(26, 22, 18, 0.9),
    rgba(15, 13, 10, 0.9)
  );
  border: 1px solid rgba(161, 152, 130, 0.15);
  border-radius: 0.75rem;
  transition: all 0.3s ease;
}

.history-item:hover {
  border-color: rgba(161, 152, 130, 0.3);
  transform: translateX(4px);
}

.history-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(133, 50, 51, 0.2);
  border-radius: 0.5rem;
  color: var(--auburn);
  flex-shrink: 0;
}

.history-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.history-name {
  font-size: 1rem;
  font-weight: 700;
  color: var(--dun);
}

.history-details {
  font-size: 0.85rem;
  color: rgba(161, 152, 130, 0.7);
}

.history-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.25rem;
}

.history-cost {
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--auburn);
}

.history-time {
  font-size: 0.75rem;
  color: rgba(161, 152, 130, 0.6);
}

/* Upgrade Overlay */
.upgrade-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9998;
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.upgrade-animation {
  text-align: center;
}

.hammer-strike {
  color: var(--auburn);
  animation: hammerHit 0.6s ease-in-out infinite;
}

@keyframes hammerHit {
  0%,
  100% {
    transform: rotate(-45deg) translateY(0);
  }
  50% {
    transform: rotate(0deg) translateY(20px);
  }
}

.sparks {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 1rem;
  color: #d4af37;
  animation: sparksFly 1s ease-in-out infinite;
}

@keyframes sparksFly {
  0%,
  100% {
    opacity: 0;
    transform: scale(0.8);
  }
  50% {
    opacity: 1;
    transform: scale(1.2);
  }
}

.upgrade-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--dun);
  margin-top: 2rem;
  animation: textPulse 1s ease-in-out infinite;
}

@keyframes textPulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

/* Responsive */
@media (max-width: 768px) {
  .page-title {
    flex-direction: column;
    gap: 0.5rem;
  }

  .title-decoration {
    display: none;
  }

  .tools-grid,
  .facilities-grid {
    grid-template-columns: 1fr;
  }
}
</style>
