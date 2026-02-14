<script>
import { Star } from "lucide-vue-next";

export default {
  name: "CraftingHistory",
  components: { Star },
  props: {
    historiqueRecent: {
      type: Array,
      required: true,
    },
  },
};
</script>

<template>
  <div v-if="historiqueRecent.length > 0" class="history-section">
    <h2 class="history-title">Dernières créations</h2>
    <div class="history-grid">
      <div
        v-for="item in historiqueRecent"
        :key="item.timestamp"
        class="history-item"
      >
        <div class="history-name">{{ item.nom }}</div>
        <div class="history-quality">
          <Star
            v-for="i in item.qualite"
            :key="i"
            class="quality-star"
            :size="14"
            :stroke-width="2.5"
          />
        </div>
        <div class="history-xp">+{{ item.xpGagne }} XP</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.history-section {
  background: linear-gradient(
    135deg,
    rgba(25, 25, 25, 0.8),
    rgba(30, 25, 20, 0.8)
  );
  border: 2px solid rgba(161, 152, 130, 0.2);
  padding: 2rem;
  margin-top: 3rem;
}

.history-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--dun);
  margin: 0 0 1.5rem 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  text-align: center;
}

.history-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

.history-item {
  background: rgba(25, 25, 25, 0.6);
  border: 2px solid rgba(161, 152, 130, 0.15);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.history-item:hover {
  background: rgba(161, 152, 130, 0.05);
  border-color: rgba(161, 152, 130, 0.3);
  transform: translateY(-2px);
}

.history-name {
  font-size: 0.95rem;
  font-weight: 700;
  color: white;
  text-align: center;
}

.history-quality {
  display: flex;
  gap: 0.25rem;
}

.quality-star {
  color: #fbbf24;
  fill: #fbbf24;
}

.history-xp {
  font-size: 0.85rem;
  color: var(--viridian);
  font-weight: 600;
}

@media (max-width: 768px) {
  .history-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
}
</style>
