<script>
import ShopCardVue from "./ShopCard.vue";
export default {
  name: "ShopPage",
  components: { ShopCardVue },
  data() {
    return {
      selectedFilter: "all",
      walletBalance: 1250,
      searchQuery: "",
    };
  },
  methods: {
    setFilter(filter) {
      this.selectedFilter = filter;
    },
  },
};
</script>
<template>
  <main class="marketplace">
    <div class="marketplace-container">
      <!-- Hero Section -->
      <div class="marketplace-hero">
        <div class="hero-content">
          <div class="hero-badge">
            <span class="badge-icon">⚜️</span>
            <span>Marché Premium</span>
          </div>
          <h1 class="marketplace-title">
            <span class="title-line-1">LE COMPTOIR</span>
            <span class="title-line-2">des Métaux Rares</span>
          </h1>
          <p class="marketplace-tagline">
            Matériaux d'exception • Prix justes • Qualité légendaire
          </p>
        </div>
        <div class="hero-wallet">
          <div class="wallet-card">
            <div class="wallet-icon">💰</div>
            <div class="wallet-info">
              <div class="wallet-label">Votre Trésor</div>
              <div class="wallet-amount">{{ walletBalance }} écus</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Description Section -->
      <div class="marketplace-description">
        <div class="description-content">
          <h2 class="description-title">
            Un Bazar d'Excellence au Cœur de la Forge
          </h2>
          <p class="description-text">
            Franchissez le seuil de notre comptoir et découvrez une sélection
            raffinée de matériaux forgés par les meilleurs artisans du royaume.
            Chaque métal est certifié, chaque transaction garantie. Du cuivre
            ancestral aux alliages rares, nous proposons les ressources dont les
            légendes sont faites.
          </p>
        </div>
      </div>

      <!-- Filters & Search -->
      <div class="marketplace-controls">
        <div class="controls-filters">
          <button
            :class="['filter-btn', { active: selectedFilter === 'all' }]"
            @click="setFilter('all')"
          >
            <span class="filter-icon">📦</span>
            <span>Tous</span>
          </button>
          <button
            :class="['filter-btn', { active: selectedFilter === 'common' }]"
            @click="setFilter('common')"
          >
            <span class="filter-icon">⚪</span>
            <span>Commun</span>
          </button>
          <button
            :class="['filter-btn', { active: selectedFilter === 'rare' }]"
            @click="setFilter('rare')"
          >
            <span class="filter-icon">💎</span>
            <span>Rare</span>
          </button>
        </div>
        <div class="controls-search">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Rechercher un matériau..."
            class="search-input"
          />
          <span class="search-icon">🔍</span>
        </div>
      </div>

      <!-- Shop Cards Grid -->
      <div class="marketplace-grid">
        <ShopCardVue />
      </div>

      <!-- Footer Banner -->
      <div class="marketplace-footer-banner">
        <div class="banner-content">
          <div class="banner-icon">🛡️</div>
          <div class="banner-text">
            <h3>Garantie du Maître Forgeron</h3>
            <p>
              Tous nos matériaux sont testés et certifiés • Échange sous 7 jours
            </p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<style scoped>
.marketplace {
  min-height: 95dvh;
  background: linear-gradient(
    to bottom,
    #0a0e0d 0%,
    #121a16 30%,
    #0d1310 70%,
    #0a0e0d 100%
  );
  position: relative;
  overflow: hidden;
}

.marketplace::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 500px;
  background: radial-gradient(
    ellipse at top,
    rgba(0, 114, 87, 0.1) 0%,
    transparent 70%
  );
  pointer-events: none;
}

.marketplace-container {
  max-width: 1600px;
  margin: 0 auto;
  padding: 3rem 2rem;
  position: relative;
  z-index: 1;
}

/* Hero Section */
.marketplace-hero {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3rem;
  gap: 2rem;
  flex-wrap: wrap;
}

.hero-content {
  flex: 1;
  min-width: 300px;
}

.hero-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1.25rem;
  background: linear-gradient(
    135deg,
    rgba(161, 152, 130, 0.15),
    rgba(50, 93, 68, 0.15)
  );
  border: 1px solid rgba(161, 152, 130, 0.3);
  border-radius: 2rem;
  font-size: 0.85rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--dun);
  margin-bottom: 1.5rem;
  font-weight: 600;
}

.badge-icon {
  font-size: 1rem;
}

.marketplace-title {
  font-size: clamp(2.5rem, 5vw, 4.5rem);
  font-weight: 700;
  line-height: 1.1;
  margin: 0 0 1rem 0;
  font-family: "Palatino", "Georgia", serif;
  letter-spacing: -0.02em;
}

.title-line-1 {
  display: block;
  font-size: 0.5em;
  color: var(--dun);
  font-weight: 400;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  margin-bottom: 0.2rem;
}

.title-line-2 {
  display: block;
  background: linear-gradient(135deg, #d4af37 0%, #f4e5c3 50%, #d4af37 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 4px 20px rgba(212, 175, 55, 0.3);
  animation: goldShimmer 3s ease-in-out infinite;
}

@keyframes goldShimmer {
  0%,
  100% {
    filter: brightness(1);
  }
  50% {
    filter: brightness(1.15);
  }
}

.marketplace-tagline {
  font-size: 1rem;
  color: var(--dun);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-weight: 300;
  opacity: 0.9;
}

.hero-wallet {
  flex-shrink: 0;
}

.wallet-card {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem 2rem;
  background: linear-gradient(
    135deg,
    rgba(212, 175, 55, 0.1),
    rgba(161, 152, 130, 0.1)
  );
  border: 2px solid rgba(212, 175, 55, 0.3);
  border-radius: 1rem;
  box-shadow:
    0 8px 32px rgba(212, 175, 55, 0.15),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  min-width: 240px;
}

.wallet-icon {
  font-size: 2.5rem;
  animation: walletBounce 2s ease-in-out infinite;
}

@keyframes walletBounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-5px);
  }
}

.wallet-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.wallet-label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--dun);
  opacity: 0.8;
}

.wallet-amount {
  font-size: 1.75rem;
  font-weight: 900;
  color: #d4af37;
  font-family: "Georgia", serif;
  text-shadow: 0 2px 10px rgba(212, 175, 55, 0.4);
}

/* Description Section */
.marketplace-description {
  margin-bottom: 3rem;
  padding: 2.5rem;
  background: linear-gradient(
    135deg,
    rgba(50, 93, 68, 0.15),
    rgba(25, 25, 25, 0.3)
  );
  border-left: 4px solid var(--sea-green);
  border-radius: 0.75rem;
  backdrop-filter: blur(10px);
}

.description-title {
  font-size: 1.75rem;
  font-weight: 600;
  color: var(--dun);
  margin: 0 0 1rem 0;
  font-family: "Georgia", serif;
  letter-spacing: -0.01em;
}

.description-text {
  font-size: 1.05rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.8);
  margin: 0;
  max-width: 900px;
}

/* Controls */
.marketplace-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
}

.controls-filters {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.filter-btn {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  background: rgba(25, 25, 25, 0.6);
  border: 2px solid rgba(161, 152, 130, 0.2);
  border-radius: 0.5rem;
  color: var(--dun);
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.filter-btn:hover {
  background: rgba(50, 93, 68, 0.3);
  border-color: var(--viridian);
  transform: translateY(-2px);
}

.filter-btn.active {
  background: linear-gradient(135deg, var(--sea-green), var(--viridian));
  border-color: var(--sea-green);
  color: white;
  box-shadow: 0 4px 16px rgba(0, 114, 87, 0.3);
}

.filter-icon {
  font-size: 1.1rem;
}

.controls-search {
  position: relative;
  flex: 1;
  max-width: 400px;
  min-width: 250px;
}

.search-input {
  width: 100%;
  padding: 0.875rem 3rem 0.875rem 1.25rem;
  background: rgba(25, 25, 25, 0.6);
  border: 2px solid rgba(161, 152, 130, 0.2);
  border-radius: 0.5rem;
  color: white;
  font-size: 0.95rem;
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: var(--sea-green);
  background: rgba(25, 25, 25, 0.8);
  box-shadow: 0 0 0 3px rgba(0, 114, 87, 0.1);
}

.search-input::placeholder {
  color: rgba(161, 152, 130, 0.5);
}

.search-icon {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 1.1rem;
  opacity: 0.6;
  pointer-events: none;
}

/* Grid */
.marketplace-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 2rem;
  margin-bottom: 4rem;
}

/* Footer Banner */
.marketplace-footer-banner {
  margin-top: 4rem;
  padding: 2rem;
  background: linear-gradient(
    135deg,
    rgba(212, 175, 55, 0.1),
    rgba(161, 152, 130, 0.05)
  );
  border: 2px solid rgba(212, 175, 55, 0.2);
  border-radius: 1rem;
  box-shadow: 0 4px 20px rgba(212, 175, 55, 0.1);
}

.banner-content {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  max-width: 800px;
  margin: 0 auto;
}

.banner-icon {
  font-size: 3rem;
  flex-shrink: 0;
  animation: bannerPulse 2s ease-in-out infinite;
}

@keyframes bannerPulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.banner-text h3 {
  font-size: 1.25rem;
  font-weight: 700;
  color: #d4af37;
  margin: 0 0 0.25rem 0;
  font-family: "Georgia", serif;
}

.banner-text p {
  font-size: 0.95rem;
  color: var(--dun);
  margin: 0;
  opacity: 0.9;
}

@media (max-width: 768px) {
  .marketplace-hero {
    flex-direction: column;
    align-items: flex-start;
  }

  .marketplace-controls {
    flex-direction: column;
    align-items: stretch;
  }

  .controls-search {
    max-width: 100%;
  }

  .banner-content {
    flex-direction: column;
    text-align: center;
  }
}
</style>
