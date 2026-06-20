<template>
  <article class="material-card" :data-material="material.nom.toLowerCase()">
    <div class="card-top">
      <h3 class="material-name">{{ material.nom }}</h3>
      <span class="rarity-badge" :class="`rarity-${material.rarity}`">
        <Star :size="12" :stroke-width="2.5" />
        <span class="rarity-text">{{ rarityLabel }}</span>
      </span>
    </div>

    <p class="material-type">
      {{ typeLabel }} • Tier {{ material.tier }}
      <span
        v-if="material.tendance && material.tendance !== 'stable'"
        :class="['tendance', `tendance-${material.tendance}`]"
      >
        <TrendingUp v-if="material.tendance === 'hausse'" :size="13" :stroke-width="2.5" />
        <TrendingDown v-else :size="13" :stroke-width="2.5" />
      </span>
    </p>

    <div class="prices">
      <span class="price-value buy">
        <Coins :size="15" :stroke-width="2" /> {{ material.prixAchat }}
      </span>
      <span class="price-value sell">
        <DollarSign :size="15" :stroke-width="2" /> {{ material.prixVente }}
      </span>
    </div>

    <div class="qty-selector" role="group" aria-label="Quantité">
      <button
        v-for="q in quantites"
        :key="q"
        type="button"
        class="qty-btn"
        :class="{ active: qte === q }"
        @click="qte = q"
      >
        ×{{ q }}
      </button>
    </div>

    <div class="card-actions">
      <button class="action-btn buy-btn" @click="$emit('acheter', material, qte)">Acheter</button>
      <button
        class="action-btn sell-btn"
        :disabled="quantitePossedee === 0"
        @click="$emit('vendre', material, Math.min(qte, quantitePossedee))"
      >
        Vendre
      </button>
    </div>

    <div class="stock">
      <span class="stock-text">
        {{ quantitePossedee > 0 ? `Vous possédez: ${quantitePossedee}` : "Disponible" }}
      </span>
    </div>
  </article>
</template>

<script>
import { useInventoryStore } from "@/stores/inventory";
import { getRarityLabel } from "@/shared/utils/rarity";
import { Star, Coins, DollarSign, TrendingUp, TrendingDown } from "@lucide/vue";

export default {
  name: "ShopCard",
  components: { Star, Coins, DollarSign, TrendingUp, TrendingDown },
  props: {
    material: {
      type: Object,
      required: true,
    },
  },
  emits: ["acheter", "vendre"],
  data() {
    return {
      qte: 1,
      quantites: [1, 10, 50],
    };
  },
  computed: {
    quantitePossedee() {
      return useInventoryStore().getQuantite(this.material.id);
    },
    rarityLabel() {
      return getRarityLabel(this.material.rarity);
    },
    typeLabel() {
      const labels = {
        metal: "Métal",
        bois: "Bois",
        pierre: "Pierre",
        gemme: "Gemme",
        special: "Spécial",
      };
      return labels[this.material.type] || this.material.type;
    },
  },
};
</script>

<style scoped>
.material-card {
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  padding: 1.4rem;
  background: linear-gradient(135deg, rgba(25, 25, 25, 0.95), rgba(13, 10, 8, 0.95));
  border: 1px solid rgba(161, 152, 130, 0.2);
  transition: border-color var(--t-base) ease, transform var(--t-base) ease;
}

.material-card:hover {
  transform: translateY(-3px);
  border-color: rgba(212, 175, 55, 0.5);
}

.card-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 0.5rem;
}

.material-name {
  font-size: 1.35rem;
  font-weight: 700;
  color: #d4af37;
  margin: 0;
  font-family: "Georgia", serif;
  overflow-wrap: anywhere;
}

.rarity-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.2rem 0.5rem;
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 700;
  white-space: nowrap;
  flex-shrink: 0;
}

.material-type {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.8rem;
  color: rgba(161, 152, 130, 0.8);
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.tendance {
  display: inline-flex;
  align-items: center;
}

.tendance-hausse {
  color: #e0564b;
}

.tendance-baisse {
  color: var(--sea-green);
}

.prices {
  display: flex;
  gap: 0.5rem;
}

.price-value {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem;
  font-size: 1.25rem;
  font-weight: 800;
  font-family: "Georgia", serif;
  background: rgba(25, 25, 25, 0.5);
  border: 1px solid rgba(161, 152, 130, 0.12);
}

.price-value.buy {
  color: var(--auburn);
}

.price-value.sell {
  color: var(--sea-green);
}

.qty-selector {
  display: flex;
  gap: 0.35rem;
}

.qty-btn {
  flex: 1;
  padding: 0.5rem;
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--dun);
  background: rgba(25, 25, 25, 0.6);
  border: 1px solid rgba(161, 152, 130, 0.2);
  cursor: pointer;
  transition: all var(--t-fast) ease;
}

.qty-btn.active {
  color: white;
  background: linear-gradient(135deg, rgba(161, 152, 130, 0.3), rgba(50, 93, 68, 0.3));
  border-color: var(--dun);
}

.card-actions {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  flex: 1;
  padding: 0.75rem;
  font-size: 0.9rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  color: white;
  border: none;
  cursor: pointer;
  transition: transform var(--t-fast) ease;
}

.action-btn:hover:not(:disabled) {
  transform: translateY(-2px);
}

.buy-btn {
  background: linear-gradient(135deg, var(--sea-green), var(--viridian));
}

.sell-btn {
  background: linear-gradient(135deg, var(--auburn), #942525);
}

.sell-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.stock {
  font-size: 0.75rem;
  color: rgba(161, 152, 130, 0.7);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
</style>
