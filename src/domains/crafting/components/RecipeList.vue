<script>
import { Star, Lock, Sparkles, Clock } from "lucide-vue-next";
import { getRarityClass, getRarityLabel } from "@/shared/utils/rarity";

export default {
  name: "RecipeList",
  components: { Star, Lock, Sparkles, Clock },
  props: {
    recipes: {
      type: Array,
      required: true,
    },
    selected: {
      type: Object,
      default: null,
    },
    categoryName: {
      type: String,
      required: true,
    },
    playerLevel: {
      type: Number,
      required: true,
    },
  },
  emits: ["select"],
  methods: {
    getRarityClass,
    getRarityLabel,
  },
};
</script>

<template>
  <div class="recipes-panel">
    <h2 class="panel-title">{{ categoryName }}</h2>
    <div class="recipes-list">
      <div
        v-for="recipe in recipes"
        :key="recipe.id"
        :class="[
          'recipe-card',
          {
            selected: selected?.id === recipe.id,
            locked: playerLevel < recipe.niveauRequis,
          },
        ]"
        @click="$emit('select', recipe)"
      >
        <div class="recipe-header">
          <div :class="['recipe-rarity', getRarityClass(recipe.rarity)]">
            <Star class="rarity-star" :size="12" :stroke-width="2.5" />
            <span>{{ getRarityLabel(recipe.rarity) }}</span>
          </div>
          <div v-if="playerLevel < recipe.niveauRequis" class="recipe-lock">
            <Lock :size="16" :stroke-width="2" />
            <span>Niv. {{ recipe.niveauRequis }}</span>
          </div>
        </div>
        <h3 class="recipe-name">{{ recipe.nom }}</h3>
        <p class="recipe-desc">{{ recipe.description }}</p>
        <div class="recipe-meta">
          <div class="meta-item">
            <Clock :size="14" :stroke-width="2" />
            <span>{{ recipe.tempsForge }}s</span>
          </div>
          <div class="meta-item">
            <Sparkles :size="14" :stroke-width="2" />
            <span>+{{ recipe.xpGain }} XP</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.recipes-panel {
  background: linear-gradient(
    135deg,
    rgba(25, 25, 25, 0.95),
    rgba(30, 25, 20, 0.95)
  );
  border: 2px solid rgba(161, 152, 130, 0.2);
  padding: 1.5rem;
  height: fit-content;
  max-height: 700px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.panel-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--dun);
  margin: 0 0 1.5rem 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-bottom: 2px solid rgba(161, 152, 130, 0.2);
  padding-bottom: 0.75rem;
}

.recipes-list {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow-y: auto;
  padding-right: 0.5rem;
}

.recipes-list::-webkit-scrollbar {
  width: 6px;
}

.recipes-list::-webkit-scrollbar-track {
  background: rgba(25, 25, 25, 0.5);
}

.recipes-list::-webkit-scrollbar-thumb {
  background: rgba(161, 152, 130, 0.3);
  border-radius: 3px;
}

.recipes-list::-webkit-scrollbar-thumb:hover {
  background: rgba(161, 152, 130, 0.5);
}

.recipe-card {
  background: rgba(25, 25, 25, 0.6);
  border: 2px solid rgba(161, 152, 130, 0.15);
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.recipe-card:hover {
  background: rgba(161, 152, 130, 0.05);
  border-color: rgba(161, 152, 130, 0.3);
  transform: translateX(4px);
}

.recipe-card.selected {
  background: linear-gradient(
    135deg,
    rgba(0, 114, 87, 0.2),
    rgba(50, 93, 68, 0.2)
  );
  border-color: var(--viridian);
  box-shadow: 0 4px 16px rgba(0, 114, 87, 0.3);
}

.recipe-card.locked {
  opacity: 0.5;
  cursor: not-allowed;
}

.recipe-card.locked:hover {
  transform: none;
  background: rgba(25, 25, 25, 0.6);
}

.recipe-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.recipe-rarity {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.rarity-star {
  flex-shrink: 0;
  fill: currentColor;
}

.recipe-lock {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  color: var(--auburn);
  font-size: 0.75rem;
  font-weight: 600;
}

.recipe-name {
  font-size: 1.1rem;
  font-weight: 700;
  color: white;
  margin: 0 0 0.5rem 0;
}

.recipe-desc {
  font-size: 0.85rem;
  color: rgba(161, 152, 130, 0.8);
  margin: 0 0 0.75rem 0;
  line-height: 1.4;
}

.recipe-meta {
  display: flex;
  gap: 1rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.8rem;
  color: var(--dun);
}

@media (max-width: 768px) {
  .recipes-panel {
    max-height: 500px;
  }
}
</style>
