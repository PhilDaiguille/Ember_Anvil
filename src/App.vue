<script>
import Toast from "@/shared/ui/Toast.vue";
import { usePlayerStore } from "@/stores/player";
import { useGameStore } from "@/stores/game";

export default {
  name: "App",
  components: {
    Toast,
  },

  mounted() {
    const playerStore = usePlayerStore();
    playerStore.demarrerSession();
    const gameStore = useGameStore();
    gameStore.initialize();
  },

  beforeUnmount() {
    const playerStore = usePlayerStore();
    playerStore.terminerSession();
  },
};
</script>

<template>
  <a href="#main-content" class="skip-nav">Aller au contenu principal</a>
  <router-view v-slot="{ Component, route }">
    <transition name="page-slide">
      <div :key="route.path" class="page-wrapper">
        <component :is="Component" />
      </div>
    </transition>
  </router-view>
  <Toast />
</template>

<style>
.skip-nav {
  position: absolute;
  top: -100%;
  left: 1rem;
  z-index: 10000;
  padding: 0.75rem 1.5rem;
  background: var(--sea-green);
  color: white;
  font-weight: 600;
  text-decoration: none;
  border-radius: 0 0 8px 8px;
  transition: top 0.2s ease;
}

.skip-nav:focus {
  top: 0;
  outline: 3px solid var(--dun);
  outline-offset: 2px;
}

/* Page transitions — smooth fade */
.page-slide-enter-active {
  transition: opacity 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.page-slide-leave-active {
  transition: opacity 0.15s cubic-bezier(0.4, 0, 0.2, 1);
}

.page-slide-enter-from,
.page-slide-leave-to {
  opacity: 0;
}

@media (prefers-reduced-motion: reduce) {
  .page-slide-enter-active,
  .page-slide-leave-active {
    transition: none;
  }
}
</style>
