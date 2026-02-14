<script>
import { Building2 } from "lucide-vue-next";

export default {
  name: "FacilityCard",
  components: { Building2 },
  props: {
    facility: {
      type: Object,
      required: true,
    },
    canActivate: {
      type: Boolean,
      default: false,
    },
    canUpgrade: {
      type: Boolean,
      default: false,
    },
  },
  emits: ["toggle", "upgrade"],
};
</script>

<template>
  <article class="facility-card" :class="{ inactive: !facility.actif }">
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
        <span class="status-dot" :class="{ active: facility.actif }"></span>
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
        <span class="bonus-value">+{{ facility.bonusProductivite }}%</span>
      </div>

      <div class="facility-actions">
        <button
          v-if="facility.actif"
          class="facility-btn deactivate-btn"
          @click="$emit('toggle', facility)"
        >
          Désactiver
        </button>
        <button
          v-else
          class="facility-btn activate-btn"
          :disabled="!canActivate"
          @click="$emit('toggle', facility)"
        >
          Activer ({{ facility.coutActivation }} écus)
        </button>
        <button
          class="facility-btn upgrade-facility-btn"
          :disabled="!canUpgrade"
          @click="$emit('upgrade', facility)"
        >
          <span v-if="facility.niveau >= facility.niveauMax">MAX</span>
          <span v-else
            >Améliorer ({{ Math.floor(facility.coutUpgrade / 10) }} or)</span
          >
        </button>
      </div>
    </div>
  </article>
</template>

<style scoped>
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
</style>
