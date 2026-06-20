<script>
import { mapState } from "pinia";
import { Layers, CheckCircle, Lock } from "@lucide/vue";
import { useCollectionsStore } from "@/stores/collections";

export default {
  name: "CollectionsPanel",
  components: { Layers, CheckCircle, Lock },
  computed: {
    ...mapState(useCollectionsStore, ["collectionsAvecStatut"]),
  },
  methods: {
    libelleBonus(bonus) {
      if (bonus.type === "gain") return `+${Math.round(bonus.valeur * 100)}% de valeur de vente`;
      if (bonus.type === "vitesse") return `−${Math.round(bonus.valeur * 100)}% de temps de forge`;
      if (bonus.type === "qualite") return `+${bonus.valeur} qualité`;
      return "";
    },
  },
};
</script>

<template>
  <section class="collections-panel" aria-label="Collections">
    <h2 class="collections-title">
      <Layers :size="26" :stroke-width="2" />
      Collections
    </h2>
    <p class="collections-intro">
      Forgez toutes les pièces d'une panoplie pour débloquer son bonus passif permanent.
    </p>

    <div class="collections-grid">
      <article
        v-for="col in collectionsAvecStatut"
        :key="col.id"
        class="collection-card"
        :class="{ complete: col.complete }"
      >
        <div class="collection-header">
          <h3 class="collection-name">{{ col.nom }}</h3>
          <CheckCircle v-if="col.complete" :size="20" :stroke-width="2.5" class="icon-complete" />
          <Lock v-else :size="18" :stroke-width="2" class="icon-locked" />
        </div>
        <p class="collection-desc">{{ col.description }}</p>
        <div class="collection-progress">
          <div class="progress-bar">
            <div
              class="progress-fill"
              :style="{ width: (col.obtenues / col.total) * 100 + '%' }"
            ></div>
          </div>
          <span class="progress-count">{{ col.obtenues }}/{{ col.total }}</span>
        </div>
        <div class="collection-bonus">🎁 {{ libelleBonus(col.bonus) }}</div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.collections-panel {
  max-width: 1400px;
  margin: 0 auto;
  padding: 3rem 2rem;
}

.collections-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.75rem;
  font-weight: 800;
  color: var(--dun);
  margin: 0 0 0.5rem 0;
}

.collections-intro {
  color: rgba(161, 152, 130, 0.8);
  margin: 0 0 2rem 0;
}

.collections-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.collection-card {
  padding: 1.5rem;
  background: linear-gradient(135deg, rgba(25, 25, 25, 0.6), rgba(13, 10, 8, 0.7));
  border: 2px solid rgba(161, 152, 130, 0.2);
}

.collection-card.complete {
  border-color: rgba(0, 114, 87, 0.6);
  background: linear-gradient(135deg, rgba(0, 114, 87, 0.15), rgba(13, 10, 8, 0.7));
}

.collection-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.collection-name {
  font-size: 1.15rem;
  font-weight: 700;
  color: white;
  margin: 0;
}

.icon-complete {
  color: var(--sea-green);
}

.icon-locked {
  color: rgba(161, 152, 130, 0.5);
}

.collection-desc {
  font-size: 0.9rem;
  color: rgba(161, 152, 130, 0.85);
  margin: 0 0 1rem 0;
  line-height: 1.5;
}

.collection-progress {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.progress-bar {
  flex: 1;
  height: 10px;
  background: rgba(25, 25, 25, 0.8);
  border: 1px solid rgba(161, 152, 130, 0.2);
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--sea-green), var(--viridian));
  transition: width var(--t-base) ease;
}

.progress-count {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--dun);
}

.collection-bonus {
  font-size: 0.9rem;
  font-weight: 600;
  color: #ffed4e;
}
</style>
