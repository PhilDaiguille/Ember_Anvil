<script>
import { Sun, Sparkles, Star, Tag } from "@lucide/vue";
import { getEvenementDuJour } from "@/shared/utils/events";

export default {
  name: "EventBanner",
  components: { Sun, Sparkles, Star, Tag },
  computed: {
    evenement() {
      return getEvenementDuJour();
    },
  },
};
</script>

<template>
  <div v-if="evenement.id !== 'aucun'" class="event-banner">
    <component :is="evenement.icone" :size="24" :stroke-width="2" class="event-icon" />
    <div class="event-text">
      <strong>Événement du jour : {{ evenement.nom }}</strong>
      <span>{{ evenement.description }}</span>
    </div>
  </div>
</template>

<style scoped>
.event-banner {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  margin-bottom: 2rem;
  background: linear-gradient(135deg, rgba(255, 100, 32, 0.15), rgba(255, 237, 78, 0.08));
  border: 2px solid rgba(255, 100, 32, 0.4);
}

.event-icon {
  color: #ffed4e;
  flex-shrink: 0;
}

.event-text {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.event-text strong {
  color: #ffed4e;
}

.event-text span {
  color: rgba(255, 255, 255, 0.8);
  font-size: 0.9rem;
}
</style>
