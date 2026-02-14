<script>
import { CheckCircle, Coins, Award, TrendingUp } from "lucide-vue-next";

export default {
  name: "QuestCard",
  components: { CheckCircle, Coins, Award, TrendingUp },
  props: {
    quest: {
      type: Object,
      required: true,
    },
  },
};
</script>

<template>
  <article class="quest-card" :class="{ completed: quest.terminee }">
    <div class="quest-header">
      <h3 class="quest-name">{{ quest.nom }}</h3>
      <CheckCircle
        v-if="quest.terminee"
        :size="24"
        :stroke-width="2"
        class="check-icon"
      />
    </div>

    <div class="quest-progress">
      <div class="progress-info">
        <span class="progress-text"
          >{{ quest.progression }}/{{ quest.objectif }}</span
        >
        <span class="progress-percent"
          >{{ Math.round((quest.progression / quest.objectif) * 100) }}%</span
        >
      </div>
      <div class="quest-progress-bar">
        <div
          class="quest-progress-fill"
          :style="{
            width: (quest.progression / quest.objectif) * 100 + '%',
          }"
        ></div>
      </div>
    </div>

    <div class="quest-rewards">
      <span class="rewards-label">Récompenses:</span>
      <div class="rewards-list">
        <span v-if="quest.recompense.ecus" class="reward-item">
          <Coins :size="16" :stroke-width="2" />
          {{ quest.recompense.ecus }} écus
        </span>
        <span v-if="quest.recompense.or" class="reward-item">
          <Award :size="16" :stroke-width="2" />
          {{ quest.recompense.or }} or
        </span>
        <span v-if="quest.recompense.experience" class="reward-item">
          <TrendingUp :size="16" :stroke-width="2" />
          {{ quest.recompense.experience }} XP
        </span>
      </div>
    </div>
  </article>
</template>

<style scoped>
.quest-card {
  background: linear-gradient(
    135deg,
    rgba(26, 22, 18, 0.95),
    rgba(15, 13, 10, 0.95)
  );
  border: 2px solid rgba(161, 152, 130, 0.2);
  border-radius: 1rem;
  padding: 1.5rem;
  transition: all 0.3s ease;
}

.quest-card:hover {
  border-color: rgba(161, 152, 130, 0.4);
  transform: translateY(-4px);
}

.quest-card.completed {
  border-color: rgba(0, 114, 87, 0.5);
  background: linear-gradient(
    135deg,
    rgba(0, 114, 87, 0.1),
    rgba(15, 13, 10, 0.95)
  );
}

.quest-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.quest-name {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--dun);
  margin: 0;
}

.check-icon {
  color: var(--sea-green);
  flex-shrink: 0;
}

.quest-progress {
  margin-bottom: 1rem;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.progress-text {
  font-size: 0.9rem;
  font-weight: 600;
  color: rgba(161, 152, 130, 0.9);
}

.progress-percent {
  font-size: 0.9rem;
  font-weight: 700;
  color: var(--viridian);
}

.quest-progress-bar {
  height: 12px;
  background: rgba(25, 25, 25, 0.8);
  border-radius: 1rem;
  overflow: hidden;
}

.quest-progress-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--viridian), var(--sea-green));
  border-radius: 1rem;
  transition: width 0.5s ease;
}

.quest-rewards {
  padding-top: 1rem;
  border-top: 1px solid rgba(161, 152, 130, 0.2);
}

.rewards-label {
  font-size: 0.85rem;
  color: rgba(161, 152, 130, 0.7);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 600;
  display: block;
  margin-bottom: 0.5rem;
}

.rewards-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.reward-item {
  display: flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.5rem 0.75rem;
  background: rgba(212, 175, 55, 0.1);
  border: 1px solid rgba(212, 175, 55, 0.3);
  border-radius: 0.5rem;
  font-size: 0.85rem;
  font-weight: 600;
  color: #d4af37;
}
</style>
