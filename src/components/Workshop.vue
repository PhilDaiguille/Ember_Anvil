<script>
export default {
  name: "WorkshopComponent",
  data() {
    return {
      tools: [
        {
          id: 1,
          nom: "Marteau Lourd",
          niveau: 5,
          niveauMax: 10,
          pouvoir: 85,
          icone: "🔨",
          coutUpgrade: 500,
        },
        {
          id: 2,
          nom: "Enclume Renforcée",
          niveau: 3,
          niveauMax: 10,
          pouvoir: 60,
          icone: "⚒️",
          coutUpgrade: 800,
        },
        {
          id: 3,
          nom: "Four à Forge",
          niveau: 7,
          niveauMax: 10,
          pouvoir: 92,
          icone: "🔥",
          coutUpgrade: 1200,
        },
        {
          id: 4,
          nom: "Soufflet Magique",
          niveau: 2,
          niveauMax: 10,
          pouvoir: 45,
          icone: "💨",
          coutUpgrade: 400,
        },
      ],
      facilities: [
        {
          id: 1,
          nom: "Station de Trempage",
          niveau: 4,
          description: "Améliore la qualité des armes",
          icone: "💧",
          actif: true,
        },
        {
          id: 2,
          nom: "Table d'Enchantement",
          niveau: 2,
          description: "Ajoute des propriétés magiques",
          icone: "✨",
          actif: false,
        },
        {
          id: 3,
          nom: "Forge Élémentaire",
          niveau: 1,
          description: "Travaille les métaux rares",
          icone: "⚡",
          actif: true,
        },
      ],
      selectedTool: null,
      upgrading: false,
    };
  },
  methods: {
    selectTool(tool) {
      this.selectedTool = tool;
    },
    upgradeTool(tool) {
      if (tool.niveau < tool.niveauMax) {
        this.upgrading = true;
        setTimeout(() => {
          tool.niveau++;
          tool.pouvoir = Math.min(100, tool.pouvoir + 5);
          tool.coutUpgrade = Math.floor(tool.coutUpgrade * 1.5);
          this.upgrading = false;
        }, 2000);
      }
    },
    getProgressPercentage(niveau, niveauMax) {
      return (niveau / niveauMax) * 100;
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
              <span class="title-icon">🔧</span>
              L'Atelier du Maître
            </span>
            <span class="title-decoration">═══╗</span>
          </h1>
          <p class="page-description">
            Améliorez vos outils et débloquez de nouvelles installations pour
            devenir le plus grand forgeron du royaume
          </p>
        </div>
      </header>

      <!-- Tools Section -->
      <section class="tools-section">
        <div class="section-header">
          <h2 class="section-title">
            <span class="section-icon">🛠️</span>
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
            :class="{ selected: selectedTool && selectedTool.id === tool.id }"
            @click="selectTool(tool)"
          >
            <div class="tool-icon-wrapper">
              <span class="tool-icon">{{ tool.icone }}</span>
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
                :disabled="tool.niveau >= tool.niveauMax || upgrading"
                @click.stop="upgradeTool(tool)"
              >
                <span v-if="tool.niveau >= tool.niveauMax" class="btn-text"
                  >MAX</span
                >
                <span v-else class="btn-content">
                  <span class="btn-icon">⬆️</span>
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
            <span class="section-icon">🏛️</span>
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
                <span class="facility-icon">{{ facility.icone }}</span>
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
                <span class="level-label">Niveau {{ facility.niveau }}</span>
                <div class="level-stars">
                  <span
                    v-for="i in 5"
                    :key="i"
                    class="star"
                    :class="{ filled: i <= facility.niveau }"
                  >
                    ★
                  </span>
                </div>
              </div>

              <div class="facility-actions">
                <button
                  v-if="facility.actif"
                  class="facility-btn deactivate-btn"
                >
                  Désactiver
                </button>
                <button v-else class="facility-btn activate-btn">
                  Activer
                </button>
                <button class="facility-btn upgrade-facility-btn">
                  Améliorer
                </button>
              </div>
            </div>
          </article>
        </div>
      </section>

      <!-- Upgrade Animation Overlay -->
      <div v-if="upgrading" class="upgrade-overlay">
        <div class="upgrade-animation">
          <div class="hammer-strike">🔨</div>
          <div class="sparks">✨✨✨</div>
          <p class="upgrade-text">Amélioration en cours...</p>
        </div>
      </div>
    </div>
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
  border-radius: 1.5rem;
  position: relative;
  overflow: hidden;
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
  font-size: 1.2em;
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
  font-size: 2rem;
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
  border-radius: 1.25rem;
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

.tool-icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  position: relative;
  z-index: 1;
}

.tool-icon {
  font-size: 4rem;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.5));
}

.tool-level-badge {
  padding: 0.5rem 1rem;
  background: var(--auburn);
  border-radius: 2rem;
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
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 1rem;
}

.progress-fill-small {
  height: 100%;
  background: linear-gradient(90deg, var(--auburn), var(--viridian));
  border-radius: 4px;
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
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(161, 152, 130, 0.2);
}

.power-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--viridian), var(--sea-green));
  border-radius: 16px;
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
  border-radius: 0.75rem;
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
  border-radius: 1.25rem;
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
  border-radius: 50%;
}

.facility-icon {
  font-size: 2.5rem;
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
  margin-bottom: 1.5rem;
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

.activate-btn {
  background: linear-gradient(135deg, var(--viridian), var(--sea-green));
  color: white;
}

.activate-btn:hover {
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

.upgrade-facility-btn:hover {
  background: rgba(161, 152, 130, 0.3);
  transform: translateY(-2px);
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
  z-index: 1000;
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
  font-size: 6rem;
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
  font-size: 2rem;
  letter-spacing: 2rem;
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
