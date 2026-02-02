<template>
  <article
    v-for="item in bdd.metaux"
    :key="item.id"
    class="material-card"
    :data-material="item.nom.toLowerCase()"
  >
    <div class="card-header">
      <div class="rarity-badge">
        <Star class="rarity-icon" :size="14" :stroke-width="2.5" />
        <span class="rarity-text">Premium</span>
      </div>
      <Crown class="card-ornament" :size="20" :stroke-width="2" />
    </div>

    <div class="card-image-container">
      <div class="image-glow"></div>
      <img :src="item.image" :alt="item.nom" class="material-image" />
      <div class="image-overlay"></div>
    </div>

    <div class="card-content">
      <h3 class="material-name">{{ item.nom }}</h3>
      <p class="material-description">{{ item.description }}</p>

      <div class="pricing-section">
        <div class="price-box buy-price">
          <div class="price-label">
            <Coins class="price-icon" :size="18" :stroke-width="2" />
            <span>Achat</span>
          </div>
          <div class="price-value">{{ item.achat }}</div>
        </div>
        <div class="price-divider"></div>
        <div class="price-box sell-price">
          <div class="price-label">
            <DollarSign class="price-icon" :size="18" :stroke-width="2" />
            <span>Vente</span>
          </div>
          <div class="price-value">{{ item.vente }}</div>
        </div>
      </div>

      <div class="card-actions">
        <button class="action-btn buy-btn">
          <ShoppingCart class="btn-icon" :size="18" :stroke-width="2" />
          <span class="btn-text">Acheter</span>
          <span class="btn-shine"></span>
        </button>
        <button class="action-btn sell-btn">
          <TrendingUp class="btn-icon" :size="18" :stroke-width="2" />
          <span class="btn-text">Vendre</span>
        </button>
      </div>
    </div>

    <div class="card-footer">
      <div class="stock-indicator">
        <span class="stock-dot"></span>
        <span class="stock-text">En stock</span>
      </div>
    </div>
  </article>
</template>

<script>
import bdd from "@/shared/Material.json";
import {
  Star,
  Crown,
  Coins,
  DollarSign,
  ShoppingCart,
  TrendingUp,
} from "lucide-vue-next";

export default {
  name: "ShopCard",
  components: {
    Star,
    Crown,
    Coins,
    DollarSign,
    ShoppingCart,
    TrendingUp,
  },
  data() {
    return {
      bdd: bdd,
    };
  },
};
</script>

<style scoped>
.material-card {
  position: relative;
  background: linear-gradient(
    135deg,
    rgba(25, 25, 25, 0.95),
    rgba(13, 10, 8, 0.95)
  );
  border: 2px solid rgba(161, 152, 130, 0.2);
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
  display: flex;
  flex-direction: column;
  animation: cardFadeIn 0.6s ease-out backwards;
}

.material-card:nth-child(1) {
  animation-delay: 0.1s;
}
.material-card:nth-child(2) {
  animation-delay: 0.2s;
}
.material-card:nth-child(3) {
  animation-delay: 0.3s;
}
.material-card:nth-child(4) {
  animation-delay: 0.4s;
}

@keyframes cardFadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.material-card:hover {
  transform: translateY(-8px);
  border-color: rgba(212, 175, 55, 0.5);
  box-shadow:
    0 16px 48px rgba(0, 0, 0, 0.5),
    0 0 0 1px rgba(212, 175, 55, 0.2),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.material-card::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 200px;
  background: radial-gradient(
    ellipse at top,
    rgba(212, 175, 55, 0.08),
    transparent
  );
  opacity: 0;
  transition: opacity 0.4s ease;
  pointer-events: none;
}

.material-card:hover::before {
  opacity: 1;
}

/* Card Header */
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1.25rem;
  background: linear-gradient(to bottom, rgba(50, 93, 68, 0.15), transparent);
}

.rarity-badge {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.75rem;
  background: linear-gradient(
    135deg,
    rgba(212, 175, 55, 0.2),
    rgba(161, 152, 130, 0.15)
  );
  border: 1px solid rgba(212, 175, 55, 0.3);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-weight: 700;
  color: #d4af37;
}

.rarity-icon {
  font-size: 0.85rem;
  animation: starTwinkle 2s ease-in-out infinite;
}

@keyframes starTwinkle {
  0%,
  100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.6;
    transform: scale(0.9);
  }
}

.card-ornament {
  font-size: 1.25rem;
  opacity: 0.4;
  filter: grayscale(0.5);
}

/* Image Section */
.card-image-container {
  position: relative;
  padding: 2rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  background: linear-gradient(
    to bottom,
    rgba(25, 25, 25, 0.3),
    rgba(50, 93, 68, 0.1)
  );
}

.image-glow {
  position: absolute;
  width: 150px;
  height: 150px;
  background: radial-gradient(
    circle,
    rgba(212, 175, 55, 0.15),
    transparent 70%
  );
  filter: blur(30px);
  animation: glowPulse 3s ease-in-out infinite;
}

@keyframes glowPulse {
  0%,
  100% {
    transform: scale(1);
    opacity: 0.5;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.8;
  }
}

.material-image {
  width: 140px;
  height: 140px;
  object-fit: contain;
  position: relative;
  z-index: 2;
  filter: drop-shadow(0 8px 24px rgba(0, 0, 0, 0.4));
  transition: transform 0.4s ease;
}

.material-card:hover .material-image {
  transform: scale(1.08) rotate(5deg);
}

.image-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(25, 25, 25, 0.5) 100%
  );
  pointer-events: none;
}

/* Card Content */
.card-content {
  padding: 1.5rem 1.25rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.material-name {
  font-size: 1.75rem;
  font-weight: 700;
  color: #d4af37;
  margin: 0;
  font-family: "Georgia", serif;
  letter-spacing: -0.01em;
  text-shadow: 0 2px 10px rgba(212, 175, 55, 0.3);
}

.material-description {
  font-size: 0.9rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.75);
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Pricing Section */
.pricing-section {
  display: flex;
  align-items: stretch;
  gap: 0.75rem;
  padding: 1rem;
  background: rgba(25, 25, 25, 0.5);
  border: 1px solid rgba(161, 152, 130, 0.15);
}

.price-box {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: center;
}

.price-label {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--dun);
  font-weight: 600;
}

.price-icon {
  font-size: 1rem;
}

.price-value {
  font-size: 1.5rem;
  font-weight: 900;
  font-family: "Georgia", serif;
}

.buy-price .price-value {
  color: var(--auburn);
  text-shadow: 0 2px 8px rgba(133, 50, 51, 0.3);
}

.sell-price .price-value {
  color: var(--sea-green);
  text-shadow: 0 2px 8px rgba(0, 114, 87, 0.3);
}

.price-divider {
  width: 2px;
  background: linear-gradient(
    to bottom,
    transparent,
    rgba(161, 152, 130, 0.3),
    transparent
  );
}

/* Card Actions */
.card-actions {
  display: flex;
  gap: 0.75rem;
  margin-top: auto;
}

.action-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.875rem 1.25rem;
  border: none;
  font-size: 0.95rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.buy-btn {
  background: linear-gradient(135deg, var(--sea-green), var(--viridian));
  color: white;
  box-shadow:
    0 4px 16px rgba(0, 114, 87, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.buy-btn:hover {
  transform: translateY(-2px);
  box-shadow:
    0 6px 20px rgba(0, 114, 87, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
}

.btn-shine {
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.3),
    transparent
  );
  transition: left 0.5s ease;
}

.buy-btn:hover .btn-shine {
  left: 100%;
}

.sell-btn {
  background: linear-gradient(
    135deg,
    rgba(133, 50, 51, 0.8),
    rgba(148, 37, 37, 0.8)
  );
  color: white;
  box-shadow:
    0 4px 16px rgba(133, 50, 51, 0.25),
    inset 0 1px 0 rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(133, 50, 51, 0.4);
}

.sell-btn:hover {
  background: linear-gradient(135deg, var(--auburn), #a03c3e);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(133, 50, 51, 0.35);
}

.btn-icon {
  font-size: 1.1rem;
}

.action-btn:active {
  transform: translateY(0);
}

/* Card Footer */
.card-footer {
  padding: 0.75rem 1.25rem;
  background: linear-gradient(to top, rgba(50, 93, 68, 0.1), transparent);
  border-top: 1px solid rgba(161, 152, 130, 0.1);
}

.stock-indicator {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8rem;
  color: var(--dun);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.stock-dot {
  width: 8px;
  height: 8px;
  background: var(--sea-green);
  animation: stockPulse 2s ease-in-out infinite;
  box-shadow: 0 0 8px rgba(0, 114, 87, 0.6);
}

@keyframes stockPulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

/* Responsive */
@media (max-width: 480px) {
  .material-name {
    font-size: 1.5rem;
  }

  .card-actions {
    flex-direction: column;
  }

  .action-btn {
    width: 100%;
  }
}
</style>
