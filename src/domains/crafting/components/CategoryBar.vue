<script>
import { Swords, Shield, Wrench, Gem, FlaskConical } from "lucide-vue-next";

export default {
  name: "CategoryBar",
  components: { Swords, Shield, Wrench, Gem, FlaskConical },
  props: {
    categories: {
      type: Array,
      required: true,
    },
    selected: {
      type: String,
      required: true,
    },
  },
  emits: ["select"],
};
</script>

<template>
  <div class="categories-bar">
    <button
      v-for="cat in categories"
      :key="cat.id"
      :class="['category-btn', { active: selected === cat.id }]"
      @click="$emit('select', cat.id)"
    >
      <component :is="cat.icon" class="cat-icon" :size="20" :stroke-width="2" />
      <span>{{ cat.nom }}</span>
    </button>
  </div>
</template>

<style scoped>
.categories-bar {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  justify-content: center;
}

.category-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: rgba(25, 25, 25, 0.6);
  border: 2px solid rgba(161, 152, 130, 0.2);
  color: var(--dun);
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.95rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.category-btn:hover {
  background: rgba(161, 152, 130, 0.1);
  border-color: rgba(161, 152, 130, 0.4);
  transform: translateY(-2px);
}

.category-btn.active {
  background: linear-gradient(135deg, var(--auburn), #942525);
  border-color: var(--auburn);
  color: white;
  box-shadow: 0 4px 16px rgba(133, 50, 51, 0.4);
}

.cat-icon {
  flex-shrink: 0;
}

@media (max-width: 768px) {
  .categories-bar {
    gap: 0.5rem;
  }

  .category-btn {
    padding: 0.6rem 1rem;
    font-size: 0.85rem;
  }
}
</style>
