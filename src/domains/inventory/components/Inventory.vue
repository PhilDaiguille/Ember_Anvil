<script>
import { Package, Coins, Hammer, FlaskConical, Swords } from "lucide-vue-next";

export default {
  name: "InventoryComponent",
  components: {
    Package,
    Coins,
    Hammer,
    FlaskConical,
    Swords,
  },
  data() {
    return {
      selectedTab: "materials",
      materials: [
        {
          id: 1,
          nom: "Aluminium",
          quantite: 45,
          image: "./assets/Material/aluminium.png",
          rarete: "Commun",
        },
        {
          id: 2,
          nom: "Cuivre",
          quantite: 32,
          image: "./assets/Material/cuivre.png",
          rarete: "Rare",
        },
        {
          id: 3,
          nom: "Fer",
          quantite: 78,
          image: "./assets/Material/fer.png",
          rarete: "Commun",
        },
        {
          id: 4,
          nom: "Étain",
          quantite: 12,
          image: "./assets/Material/fer.png",
          rarete: "Rare",
        },
      ],
      craftedItems: [
        {
          id: 1,
          nom: "Épée de Fer",
          type: "Arme",
          qualite: "Excellente",
          valeur: 350,
        },
        {
          id: 2,
          nom: "Marteau de Cuivre",
          type: "Outil",
          qualite: "Bonne",
          valeur: 180,
        },
        {
          id: 3,
          nom: "Armure d'Aluminium",
          type: "Protection",
          qualite: "Supérieure",
          valeur: 520,
        },
      ],
      stats: {
        capaciteMax: 500,
        capaciteUtilisee: 167,
        valeursTotal: 8940,
        objetsCrees: 23,
      },
    };
  },
  methods: {
    setTab(tab) {
      this.selectedTab = tab;
    },
    getCapacityPercentage() {
      return (this.stats.capaciteUtilisee / this.stats.capaciteMax) * 100;
    },
    getRarityColor(rarete) {
      const colors = {
        Commun: "#a19880",
        Rare: "#d4af37",
        Légendaire: "#ff6420",
      };
      return colors[rarete] || "#a19880";
    },
    getQualityColor(qualite) {
      const colors = {
        Bonne: "#007257",
        Excellente: "#d4af37",
        Supérieure: "#ff6420",
      };
      return colors[qualite] || "#007257";
    },
  },
};
</script>

<template>
  <main class="inventory-page">
    <div class="inventory-container">
      <!-- Header -->
      <header class="inventory-header">
        <div class="header-content">
          <h1 class="page-title">
            <Package :size="48" :stroke-width="2" class="title-icon" />
            Inventaire
          </h1>
          <p class="page-subtitle">Gérez vos matériaux et créations</p>
        </div>

        <!-- Stats Cards -->
        <div class="stats-grid">
          <div class="stat-card">
            <Package :size="40" :stroke-width="2" class="stat-icon" />
            <div class="stat-info">
              <div class="stat-label">Capacité</div>
              <div class="stat-value">
                {{ stats.capaciteUtilisee }}/{{ stats.capaciteMax }}
              </div>
            </div>
          </div>
          <div class="stat-card">
            <Coins :size="40" :stroke-width="2" class="stat-icon" />
            <div class="stat-info">
              <div class="stat-label">Valeur Totale</div>
              <div class="stat-value">{{ stats.valeursTotal }} écus</div>
            </div>
          </div>
          <div class="stat-card">
            <Hammer :size="40" :stroke-width="2" class="stat-icon" />
            <div class="stat-info">
              <div class="stat-label">Objets Créés</div>
              <div class="stat-value">{{ stats.objetsCrees }}</div>
            </div>
          </div>
        </div>

        <!-- Capacity Bar -->
        <div class="capacity-bar-container">
          <div class="capacity-header">
            <span class="capacity-label">Espace d'Inventaire</span>
            <span class="capacity-percentage"
              >{{ Math.floor(getCapacityPercentage()) }}%</span
            >
          </div>
          <div class="capacity-bar">
            <div
              class="capacity-fill"
              :style="{ width: getCapacityPercentage() + '%' }"
            ></div>
          </div>
        </div>
      </header>

      <!-- Tabs -->
      <div class="inventory-tabs">
        <button
          :class="['tab-button', { active: selectedTab === 'materials' }]"
          @click="setTab('materials')"
        >
          <FlaskConical :size="20" :stroke-width="2" class="tab-icon" />
          <span class="tab-text">Matériaux</span>
          <span class="tab-count">{{ materials.length }}</span>
        </button>
        <button
          :class="['tab-button', { active: selectedTab === 'crafted' }]"
          @click="setTab('crafted')"
        >
          <Swords :size="20" :stroke-width="2" class="tab-icon" />
          <span class="tab-text">Créations</span>
          <span class="tab-count">{{ craftedItems.length }}</span>
        </button>
      </div>

      <!-- Materials Tab -->
      <div v-if="selectedTab === 'materials'" class="tab-content">
        <div class="items-grid">
          <div
            v-for="material in materials"
            :key="material.id"
            class="inventory-item material-item"
          >
            <div class="item-header">
              <span
                class="item-rarity"
                :style="{ color: getRarityColor(material.rarete) }"
              >
                {{ material.rarete }}
              </span>
              <span class="item-quantity">×{{ material.quantite }}</span>
            </div>
            <div class="item-image-wrapper">
              <img
                :src="material.image"
                :alt="material.nom"
                class="item-image"
              />
            </div>
            <div class="item-info">
              <h3 class="item-name">{{ material.nom }}</h3>
              <div class="item-actions">
                <button class="action-btn use-btn">Utiliser</button>
                <button class="action-btn sell-btn">Vendre</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Crafted Items Tab -->
      <div v-if="selectedTab === 'crafted'" class="tab-content">
        <div class="items-grid crafted-grid">
          <div
            v-for="item in craftedItems"
            :key="item.id"
            class="inventory-item crafted-item"
          >
            <div class="crafted-header">
              <span class="item-type">{{ item.type }}</span>
              <span
                class="item-quality"
                :style="{ color: getQualityColor(item.qualite) }"
              >
                {{ item.qualite }}
              </span>
            </div>
            <div class="crafted-body">
              <h3 class="crafted-name">{{ item.nom }}</h3>
              <div class="crafted-value">
                <Coins :size="18" :stroke-width="2" class="value-icon" />
                <span class="value-amount">{{ item.valeur }} écus</span>
              </div>
            </div>
            <div class="crafted-actions">
              <button class="action-btn equip-btn">Équiper</button>
              <button class="action-btn sell-btn">Vendre</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.inventory-page {
  min-height: 95dvh;
  background: linear-gradient(to bottom, #0f0d0a 0%, #1a1612 50%, #0f0d0a 100%);
  padding: 2rem;
}

.inventory-container {
  max-width: 1400px;
  margin: 0 auto;
}

/* Header */
.inventory-header {
  margin-bottom: 3rem;
}

.header-content {
  margin-bottom: 2rem;
}

.page-title {
  display: flex;
  align-items: center;
  gap: 1rem;
  font-size: 3rem;
  font-weight: 900;
  color: var(--dun);
  margin: 0 0 0.5rem 0;
  font-family: "Impact", sans-serif;
}

.title-icon {
  color: var(--dun);
}

.page-subtitle {
  font-size: 1.1rem;
  color: rgba(161, 152, 130, 0.7);
  margin: 0;
  letter-spacing: 0.05em;
}

/* Stats Grid */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem;
  background: linear-gradient(
    135deg,
    rgba(26, 22, 18, 0.8),
    rgba(15, 13, 10, 0.8)
  );
  border: 2px solid rgba(161, 152, 130, 0.2);
  border-radius: 1rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
}

.stat-card:hover {
  border-color: rgba(161, 152, 130, 0.4);
  transform: translateY(-4px);
}

.stat-icon {
  color: var(--auburn);
}

.stat-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.stat-label {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(161, 152, 130, 0.7);
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 900;
  color: var(--dun);
  font-family: "Georgia", serif;
}

/* Capacity Bar */
.capacity-bar-container {
  background: rgba(25, 25, 25, 0.5);
  padding: 1.5rem;
  border-radius: 1rem;
  border: 1px solid rgba(161, 152, 130, 0.15);
}

.capacity-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.capacity-label {
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--dun);
  font-weight: 600;
}

.capacity-percentage {
  font-size: 1.25rem;
  font-weight: 900;
  color: var(--viridian);
  font-family: "Georgia", serif;
}

.capacity-bar {
  height: 24px;
  background: rgba(25, 25, 25, 0.8);
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid rgba(161, 152, 130, 0.2);
}

.capacity-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--viridian), var(--sea-green));
  border-radius: 12px;
  transition: width 0.5s ease;
  box-shadow: 0 0 16px rgba(0, 114, 87, 0.5);
}

/* Tabs */
.inventory-tabs {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  border-bottom: 2px solid rgba(161, 152, 130, 0.2);
}

.tab-button {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 2rem;
  background: transparent;
  border: none;
  border-bottom: 3px solid transparent;
  color: rgba(255, 255, 255, 0.6);
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.tab-button:hover {
  color: var(--dun);
  background: rgba(161, 152, 130, 0.05);
}

.tab-button.active {
  color: white;
  border-bottom-color: var(--auburn);
  background: rgba(133, 50, 51, 0.1);
}

.tab-icon {
  color: inherit;
}

.tab-count {
  padding: 0.25rem 0.75rem;
  background: rgba(161, 152, 130, 0.2);
  border-radius: 1rem;
  font-size: 0.85rem;
  font-weight: 900;
}

.tab-button.active .tab-count {
  background: var(--auburn);
}

/* Items Grid */
.items-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1.5rem;
}

.crafted-grid {
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
}

/* Inventory Item */
.inventory-item {
  background: linear-gradient(
    135deg,
    rgba(26, 22, 18, 0.9),
    rgba(15, 13, 10, 0.9)
  );
  border: 2px solid rgba(161, 152, 130, 0.2);
  border-radius: 1rem;
  padding: 1.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
}

.inventory-item:hover {
  border-color: rgba(161, 152, 130, 0.5);
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.item-rarity {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: 700;
}

.item-quantity {
  font-size: 1.25rem;
  font-weight: 900;
  color: var(--dun);
  font-family: "Georgia", serif;
}

.item-image-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 140px;
  margin-bottom: 1rem;
  background: radial-gradient(circle, rgba(161, 152, 130, 0.1), transparent);
}

.item-image {
  max-width: 120px;
  max-height: 120px;
  object-fit: contain;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.5));
}

.item-info {
  text-align: center;
}

.item-name {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--dun);
  margin: 0 0 1rem 0;
  font-family: "Georgia", serif;
}

/* Crafted Items */
.crafted-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(161, 152, 130, 0.2);
}

.item-type {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(161, 152, 130, 0.7);
  font-weight: 600;
}

.item-quality {
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.crafted-body {
  margin-bottom: 1.5rem;
}

.crafted-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--dun);
  margin: 0 0 1rem 0;
  font-family: "Georgia", serif;
}

.crafted-value {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.1rem;
  color: #d4af37;
  font-weight: 700;
}

.value-icon {
  color: #d4af37;
}

/* Actions */
.item-actions,
.crafted-actions {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  flex: 1;
  padding: 0.75rem;
  border: none;
  border-radius: 0.5rem;
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: all 0.3s ease;
}

.use-btn,
.equip-btn {
  background: linear-gradient(135deg, var(--viridian), var(--sea-green));
  color: white;
  box-shadow: 0 2px 8px rgba(0, 114, 87, 0.3);
}

.use-btn:hover,
.equip-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 114, 87, 0.4);
}

.sell-btn {
  background: linear-gradient(
    135deg,
    rgba(133, 50, 51, 0.8),
    rgba(148, 37, 37, 0.8)
  );
  color: white;
  border: 1px solid rgba(133, 50, 51, 0.4);
  box-shadow: 0 2px 8px rgba(133, 50, 51, 0.2);
}

.sell-btn:hover {
  background: linear-gradient(135deg, var(--auburn), #a03c3e);
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .page-title {
    font-size: 2rem;
  }

  .items-grid,
  .crafted-grid {
    grid-template-columns: 1fr;
  }

  .inventory-tabs {
    overflow-x: auto;
  }
}
</style>
