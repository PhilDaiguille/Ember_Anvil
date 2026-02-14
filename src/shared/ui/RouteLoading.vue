<template>
  <div class="route-loading" role="status" aria-label="Chargement de la page">
    <div class="loading-grid">
      <SkeletonCard v-for="n in count" :key="n" />
    </div>
    <p class="loading-text">Chargement...</p>
  </div>
</template>

<script>
import SkeletonCard from "./SkeletonCard.vue";

export default {
  name: "RouteLoading",
  components: { SkeletonCard },
  props: {
    count: {
      type: Number,
      default: 3,
    },
  },
};
</script>

<style scoped>
.route-loading {
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  gap: 1.5rem;
}

.loading-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
  width: 100%;
  max-width: 1200px;
  opacity: 0.6;
}

.loading-text {
  color: var(--dun);
  font-size: 0.9rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  animation: pulse 1.5s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .loading-text {
    animation: none;
  }
}

@keyframes pulse {
  0%,
  100% {
    opacity: 0.5;
  }
  50% {
    opacity: 1;
  }
}
</style>
