<script>
import Toast from "@/shared/ui/Toast.vue";
import { usePlayerStore } from "@/stores/player";

export default {
  name: "App",
  components: {
    Toast,
  },

  mounted() {
    // Démarrer la session de jeu pour tracking du temps
    const playerStore = usePlayerStore();
    playerStore.demarrerSession();
  },

  beforeUnmount() {
    // Terminer la session avant de quitter
    const playerStore = usePlayerStore();
    playerStore.terminerSession();
  },
};
</script>

<template>
  <router-view></router-view>
  <Toast />
</template>

<style></style>
