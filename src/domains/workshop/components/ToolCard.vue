<script>
import { Hammer, ArrowUp, Sparkles } from "lucide-vue-next";

export default {
  name: "ToolCard",
  components: { Hammer, ArrowUp, Sparkles },
  props: {
    tool: {
      type: Object,
      required: true,
    },
    selected: {
      type: Boolean,
      default: false,
    },
    hasSynergy: {
      type: Boolean,
      default: false,
    },
    canUpgrade: {
      type: Boolean,
      default: false,
    },
    upgrading: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["select", "upgrade"],
  methods: {
    getProgressPercentage(niveau, niveauMax) {
      return (niveau / niveauMax) * 100;
    },
  },
};
</script>

<template>
  <article
    class="tool-card"
    :class="{
      selected,
      'has-synergy': hasSynergy,
    }"
    @click="$emit('select', tool)"
  >
    <div v-if="hasSynergy" class="synergy-badge">
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
          <span class="stat-value">{{ tool.niveau }}/{{ tool.niveauMax }}</span>
        </div>
        <div class="progress-bar-small">
          <div
            class="progress-fill-small"
            :style="{
              width: getProgressPercentage(tool.niveau, tool.niveauMax) + '%',
            }"
          ></div>
        </div>
      </div>

      <div class="tool-power">
        <span class="power-label">Pouvoir</span>
        <div class="power-bar">
          <div class="power-fill" :style="{ width: tool.pouvoir + '%' }"></div>
          <span class="power-text">{{ tool.pouvoir }}%</span>
        </div>
      </div>

      <button
        class="upgrade-btn"
        :disabled="!canUpgrade || upgrading"
        @click.stop="$emit('upgrade', tool)"
      >
        <span v-if="tool.niveau >= tool.niveauMax" class="btn-text">MAX</span>
        <span v-else class="btn-content">
          <ArrowUp :size="18" :stroke-width="2" class="btn-icon" />
          <span class="btn-text">Améliorer ({{ tool.coutUpgrade }} écus)</span>
        </span>
      </button>
    </div>
  </article>
</template>

<style scoped>
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
</style>
