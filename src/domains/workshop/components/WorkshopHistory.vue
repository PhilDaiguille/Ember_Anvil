<script>
import { Hammer, Building2, Clock } from "lucide-vue-next";

export default {
  name: "WorkshopHistory",
  components: { Hammer, Building2, Clock },
  props: {
    historique: {
      type: Array,
      required: true,
    },
  },
};
</script>

<template>
  <section v-if="historique.length > 0" class="history-section">
    <div class="section-header">
      <h2 class="section-title">
        <Clock :size="32" :stroke-width="2" class="section-icon" />
        Historique Récent
      </h2>
      <p class="section-subtitle">Vos dernières améliorations</p>
    </div>

    <div class="history-list">
      <div
        v-for="(item, index) in historique"
        :key="index"
        class="history-item"
      >
        <div class="history-icon">
          <Hammer v-if="item.type === 'upgrade'" :size="20" :stroke-width="2" />
          <Building2 v-else :size="20" :stroke-width="2" />
        </div>
        <div class="history-content">
          <span class="history-name">{{ item.nom }}</span>
          <span class="history-details">{{ item.details }}</span>
        </div>
        <div class="history-meta">
          <span class="history-cost">-{{ item.cout }} {{ item.devise }}</span>
          <span class="history-time">{{ item.time }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.history-section {
  margin-bottom: 4rem;
}

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
  color: var(--auburn);
}

.section-subtitle {
  font-size: 1rem;
  color: rgba(161, 152, 130, 0.7);
  margin: 0;
}

.history-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.history-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.5rem;
  background: linear-gradient(
    135deg,
    rgba(26, 22, 18, 0.9),
    rgba(15, 13, 10, 0.9)
  );
  border: 1px solid rgba(161, 152, 130, 0.15);
  border-radius: 0.75rem;
  transition: all 0.3s ease;
}

.history-item:hover {
  border-color: rgba(161, 152, 130, 0.3);
  transform: translateX(4px);
}

.history-icon {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(133, 50, 51, 0.2);
  border-radius: 0.5rem;
  color: var(--auburn);
  flex-shrink: 0;
}

.history-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.history-name {
  font-size: 1rem;
  font-weight: 700;
  color: var(--dun);
}

.history-details {
  font-size: 0.85rem;
  color: rgba(161, 152, 130, 0.7);
}

.history-meta {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 0.25rem;
}

.history-cost {
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--auburn);
}

.history-time {
  font-size: 0.75rem;
  color: rgba(161, 152, 130, 0.6);
}
</style>
