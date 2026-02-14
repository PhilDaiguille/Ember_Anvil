<script>
import { Hammer, Sparkles } from "lucide-vue-next";

export default {
  name: "UpgradeOverlay",
  components: { Hammer, Sparkles },
  props: {
    upgrading: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<template>
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
</template>

<style scoped>
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
</style>
