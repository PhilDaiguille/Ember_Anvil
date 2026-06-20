<script>
import { mapState, mapActions } from "pinia";
import { ClipboardList, Coins, Star } from "@lucide/vue";
import { useOrdersStore } from "@/stores/orders";
import { getRecipeById } from "@/data/recipes";

export default {
  name: "OrdersPanel",
  components: { ClipboardList, Coins, Star },
  computed: {
    ...mapState(useOrdersStore, ["commandes"]),
  },
  methods: {
    ...mapActions(useOrdersStore, ["livrer", "estLivrable"]),
    nomRecette(recipeId) {
      return getRecipeById(recipeId)?.nom ?? recipeId;
    },
  },
};
</script>

<template>
  <section class="orders-panel" aria-label="Commandes clients">
    <h2 class="orders-title">
      <ClipboardList :size="22" :stroke-width="2" />
      Commandes clients
    </h2>
    <div class="orders-list">
      <article v-for="cmd in commandes" :key="cmd.id" class="order-card">
        <div class="order-info">
          <h3 class="order-name">{{ nomRecette(cmd.recipeId) }}</h3>
          <div class="order-req">
            Qualité min :
            <span class="order-stars">
              <Star
                v-for="n in cmd.qualiteMin"
                :key="n"
                :size="13"
                :stroke-width="2.5"
                class="star-on"
              />
            </span>
          </div>
          <div class="order-reward">
            <Coins :size="15" :stroke-width="2" />
            +{{ cmd.recompenseEcus }} écus · +{{ cmd.recompenseXp }} XP
          </div>
        </div>
        <button class="order-btn" :disabled="!estLivrable(cmd)" @click="livrer(cmd.id)">
          {{ estLivrable(cmd) ? "Livrer" : "Indisponible" }}
        </button>
      </article>
    </div>
  </section>
</template>

<style scoped>
.orders-panel {
  background: linear-gradient(135deg, rgba(50, 93, 68, 0.12), rgba(25, 25, 25, 0.4));
  border: 2px solid rgba(0, 114, 87, 0.3);
  padding: 1.5rem;
  margin-bottom: 3rem;
}

.orders-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.25rem;
  font-weight: 800;
  color: var(--dun);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0 0 1rem 0;
}

.orders-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1rem;
}

.order-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(25, 25, 25, 0.5);
  border: 1px solid rgba(161, 152, 130, 0.2);
}

.order-name {
  font-size: 1rem;
  font-weight: 700;
  color: white;
  margin: 0 0 0.4rem 0;
}

.order-req {
  font-size: 0.8rem;
  color: var(--dun);
  display: flex;
  align-items: center;
  gap: 0.3rem;
  margin-bottom: 0.3rem;
}

.order-stars {
  display: inline-flex;
}

.star-on {
  color: #ffed4e;
}

.order-reward {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.85rem;
  color: var(--sea-green);
  font-weight: 600;
}

.order-btn {
  padding: 0.6rem 1.1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: white;
  background: linear-gradient(135deg, var(--sea-green), var(--viridian));
  border: none;
  cursor: pointer;
  flex-shrink: 0;
  transition: transform var(--t-fast) ease;
}

.order-btn:hover:not(:disabled) {
  transform: translateY(-2px);
}

.order-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>
