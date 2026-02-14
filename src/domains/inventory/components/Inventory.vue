<script>
import { mapState, mapGetters, mapActions } from "pinia";
import { useInventoryStore } from "@/stores/inventory";
import { usePlayerStore } from "@/stores/player";
import { useNotificationsStore } from "@/stores/notifications";
import {
  Package,
  Coins,
  Hammer,
  FlaskConical,
  Swords,
  Star,
  Search,
  Shield,
  Gem,
  Wrench,
} from "lucide-vue-next";

export default {
  name: "InventoryComponent",
  components: {
    Package,
    Coins,
    Hammer,
    FlaskConical,
    Swords,
    Star,
    Search,
    Shield,
    Gem,
    Wrench,
  },
  data() {
    return {
      selectedTab: "materials",
      searchQuery: "",
      selectedFilter: "all", // all, common, uncommon, rare, epic, legendary
    };
  },
  computed: {
    ...mapState(useInventoryStore, ["capaciteMax", "craftedItems"]),
    ...mapGetters(useInventoryStore, [
      "capaciteUtilisee",
      "pourcentageRemplissage",
      "valeurTotale",
      "materialsList",
      "craftedItemsSorted",
      "hasEnough",
    ]),
    ...mapState(usePlayerStore, ["ecus"]),

    // Matériaux filtrés
    materialsFiltered() {
      let filtered = this.materialsList;

      // Filtrer par rareté
      if (this.selectedFilter !== "all") {
        filtered = filtered.filter((m) => m.rarity === this.selectedFilter);
      }

      // Filtrer par recherche
      if (this.searchQuery.trim()) {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter(
          (m) =>
            m.nom.toLowerCase().includes(query) ||
            m.type.toLowerCase().includes(query),
        );
      }

      return filtered;
    },

    // Objets forgés filtrés
    craftedFiltered() {
      let filtered = this.craftedItemsSorted;

      // Filtrer par recherche
      if (this.searchQuery.trim()) {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter(
          (item) =>
            item.nom.toLowerCase().includes(query) ||
            item.categorie.toLowerCase().includes(query),
        );
      }

      return filtered;
    },

    // Statistiques
    stats() {
      return {
        capaciteMax: this.capaciteMax,
        capaciteUtilisee: this.capaciteUtilisee,
        valeurTotale: this.valeurTotale,
        objetsCrees: this.craftedItems.length,
      };
    },
  },
  methods: {
    ...mapActions(useInventoryStore, ["retirerMaterial", "supprimerObjet"]),
    ...mapActions(usePlayerStore, ["ajouterEcus"]),
    ...mapActions(useNotificationsStore, ["ajouterNotification"]),

    setTab(tab) {
      this.selectedTab = tab;
      this.searchQuery = "";
      this.selectedFilter = "all";
    },

    setFilter(filter) {
      this.selectedFilter = filter;
    },

    getCapacityPercentage() {
      return this.pourcentageRemplissage;
    },

    getRarityClass(rarity) {
      return `rarity-${rarity}`;
    },

    getRarityLabel(rarity) {
      const labels = {
        common: "Commun",
        uncommon: "Peu commun",
        rare: "Rare",
        epic: "Épique",
        legendary: "Légendaire",
      };
      return labels[rarity] || "Commun";
    },

    getCategorieIcon(categorie) {
      const icons = {
        arme: "Swords",
        armure: "Shield",
        outil: "Wrench",
        bijou: "Gem",
        consommable: "FlaskConical",
      };
      return icons[categorie] || "Package";
    },

    vendreMaterial(material) {
      const quantite = 1;

      // Vérifier quantité
      if (!this.hasEnough(material.id, quantite)) {
        this.ajouterNotification({
          type: "error",
          message: `Vous n'avez pas assez de ${material.nom}.`,
        });
        return;
      }

      // Effectuer vente
      const gain = material.prixVente * quantite;
      this.retirerMaterial(material.id, quantite);
      this.ajouterEcus(gain);

      this.ajouterNotification({
        type: "success",
        message: `${material.nom} vendu pour ${gain} écus !`,
      });
    },

    vendreObjet(item) {
      // Vendre objet forgé
      const gain = item.valeur;
      this.supprimerObjet(item.id);
      this.ajouterEcus(gain);

      this.ajouterNotification({
        type: "success",
        message: `${item.nom} vendu pour ${gain} écus !`,
      });
    },

    renderQualityStars(qualite) {
      return qualite || 1;
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
              <div class="stat-value">
                {{ Math.floor(stats.valeurTotale) }} écus
              </div>
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
          <span class="tab-count">{{ materialsList.length }}</span>
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

      <!-- Search & Filters -->
      <div class="filters-bar">
        <div class="search-box">
          <Search :size="20" :stroke-width="2" class="search-icon" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Rechercher..."
            class="search-input"
          />
        </div>

        <div v-if="selectedTab === 'materials'" class="filter-buttons">
          <button
            :class="['filter-btn', { active: selectedFilter === 'all' }]"
            @click="setFilter('all')"
          >
            Tous
          </button>
          <button
            :class="['filter-btn', { active: selectedFilter === 'common' }]"
            @click="setFilter('common')"
          >
            Commun
          </button>
          <button
            :class="['filter-btn', { active: selectedFilter === 'uncommon' }]"
            @click="setFilter('uncommon')"
          >
            Peu commun
          </button>
          <button
            :class="['filter-btn', { active: selectedFilter === 'rare' }]"
            @click="setFilter('rare')"
          >
            Rare
          </button>
          <button
            :class="['filter-btn', { active: selectedFilter === 'epic' }]"
            @click="setFilter('epic')"
          >
            Épique
          </button>
          <button
            :class="['filter-btn', { active: selectedFilter === 'legendary' }]"
            @click="setFilter('legendary')"
          >
            Légendaire
          </button>
        </div>
      </div>

      <!-- Materials Tab -->
      <div v-if="selectedTab === 'materials'" class="tab-content">
        <div v-if="materialsFiltered.length === 0" class="empty-state">
          <Package :size="64" :stroke-width="1.5" class="empty-icon" />
          <p class="empty-text">Aucun matériau trouvé</p>
          <p class="empty-hint">
            Achetez des matériaux au Marché pour commencer à forger !
          </p>
        </div>

        <div v-else class="items-grid">
          <div
            v-for="material in materialsFiltered"
            :key="material.id"
            class="inventory-item material-item"
          >
            <div class="item-header">
              <span :class="['item-rarity', getRarityClass(material.rarity)]">
                {{ getRarityLabel(material.rarity) }}
              </span>
              <span class="item-quantity">×{{ material.quantite }}</span>
            </div>
            <div class="item-body">
              <h3 class="item-name">{{ material.nom }}</h3>
              <p class="item-type">{{ material.type }}</p>
              <div class="item-value">
                <Coins :size="16" :stroke-width="2" class="value-icon" />
                <span>{{ material.prixVente }} écus</span>
              </div>
            </div>
            <div class="item-actions">
              <button
                class="action-btn sell-btn"
                @click="vendreMaterial(material)"
              >
                Vendre (×1)
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Crafted Items Tab -->
      <div v-if="selectedTab === 'crafted'" class="tab-content">
        <div v-if="craftedFiltered.length === 0" class="empty-state">
          <Hammer :size="64" :stroke-width="1.5" class="empty-icon" />
          <p class="empty-text">Aucune création</p>
          <p class="empty-hint">
            Forgez des objets à l'Atelier de Forge pour remplir votre inventaire
            !
          </p>
        </div>

        <div v-else class="items-grid crafted-grid">
          <div
            v-for="item in craftedFiltered"
            :key="item.id"
            class="inventory-item crafted-item"
          >
            <div class="crafted-header">
              <div class="header-left">
                <component
                  :is="getCategorieIcon(item.categorie)"
                  :size="20"
                  :stroke-width="2"
                  class="categorie-icon"
                />
                <span class="item-type">{{ item.categorie }}</span>
              </div>
              <span :class="['item-rarity-badge', getRarityClass(item.rarity)]">
                {{ getRarityLabel(item.rarity) }}
              </span>
            </div>
            <div class="crafted-body">
              <h3 class="crafted-name">{{ item.nom }}</h3>
              <div class="quality-stars">
                <Star
                  v-for="i in renderQualityStars(item.qualite)"
                  :key="i"
                  :size="18"
                  :stroke-width="2"
                  class="quality-star filled"
                />
                <Star
                  v-for="i in 5 - renderQualityStars(item.qualite)"
                  :key="'empty-' + i"
                  :size="18"
                  :stroke-width="2"
                  class="quality-star empty"
                />
              </div>
              <div class="crafted-value">
                <Coins :size="18" :stroke-width="2" class="value-icon" />
                <span class="value-amount">{{ item.valeur }} écus</span>
              </div>
            </div>
            <div class="crafted-actions">
              <button class="action-btn sell-btn" @click="vendreObjet(item)">
                Vendre
              </button>
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
  font-family: "Palatino", "Georgia", serif;
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
  border-radius: 8px;
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
  border-radius: 8px;
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
  border-radius: 12px;
  font-size: 0.85rem;
  font-weight: 900;
}

.tab-button.active .tab-count {
  background: var(--auburn);
}

/* Filters Bar */
.filters-bar {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.search-box {
  flex: 1;
  min-width: 250px;
  position: relative;
}

.search-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(161, 152, 130, 0.5);
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 3rem;
  background: rgba(25, 25, 25, 0.6);
  border: 2px solid rgba(161, 152, 130, 0.2);
  border-radius: 8px;
  color: white;
  font-size: 0.95rem;
  transition: all 0.3s ease;
}

.search-input:focus {
  outline: none;
  border-color: var(--auburn);
  background: rgba(25, 25, 25, 0.8);
}

.search-input::placeholder {
  color: rgba(161, 152, 130, 0.5);
}

.filter-buttons {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 0.75rem 1.25rem;
  background: rgba(25, 25, 25, 0.6);
  border: 2px solid rgba(161, 152, 130, 0.2);
  border-radius: 8px;
  color: var(--dun);
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.filter-btn:hover {
  background: rgba(161, 152, 130, 0.1);
  border-color: rgba(161, 152, 130, 0.4);
}

.filter-btn.active {
  background: var(--auburn);
  border-color: var(--auburn);
  color: white;
}

/* Empty State */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
}

.empty-icon {
  color: rgba(161, 152, 130, 0.3);
  margin-bottom: 1.5rem;
}

.empty-text {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--dun);
  margin: 0 0 0.5rem 0;
}

.empty-hint {
  font-size: 1rem;
  color: rgba(161, 152, 130, 0.6);
  margin: 0;
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
  border-radius: 8px;
  padding: 1.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
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
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-weight: 700;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
}

.rarity-common {
  background: rgba(156, 163, 175, 0.2);
  color: #9ca3af;
}

.rarity-uncommon {
  background: rgba(34, 197, 94, 0.2);
  color: #22c55e;
}

.rarity-rare {
  background: rgba(59, 130, 246, 0.2);
  color: #3b82f6;
}

.rarity-epic {
  background: rgba(168, 85, 247, 0.2);
  color: #a855f7;
}

.rarity-legendary {
  background: rgba(251, 191, 36, 0.2);
  color: #fbbf24;
}

.item-quantity {
  font-size: 1.25rem;
  font-weight: 900;
  color: var(--dun);
  font-family: "Georgia", serif;
}

.item-body {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.item-name {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--dun);
  margin: 0;
  font-family: "Georgia", serif;
}

.item-type {
  font-size: 0.85rem;
  color: rgba(161, 152, 130, 0.7);
  text-transform: capitalize;
  margin: 0;
}

.item-value {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.95rem;
  color: #d4af37;
  font-weight: 600;
  margin-top: auto;
}

.value-icon {
  color: #d4af37;
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

.header-left {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.categorie-icon {
  color: var(--auburn);
}

.item-type {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(161, 152, 130, 0.7);
  font-weight: 600;
}

.item-rarity-badge {
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
}

.crafted-body {
  flex: 1;
  margin-bottom: 1.5rem;
}

.crafted-name {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--dun);
  margin: 0 0 1rem 0;
  font-family: "Georgia", serif;
}

.quality-stars {
  display: flex;
  gap: 0.25rem;
  margin-bottom: 1rem;
}

.quality-star {
  transition: all 0.2s ease;
}

.quality-star.filled {
  color: #fbbf24;
  fill: #fbbf24;
}

.quality-star.empty {
  color: rgba(161, 152, 130, 0.3);
  fill: none;
}

.crafted-value {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.1rem;
  color: #d4af37;
  font-weight: 700;
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
  border-radius: 6px;
  font-size: 0.85rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: all 0.3s ease;
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
  .inventory-page {
    padding: 1rem;
  }

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

  .filters-bar {
    flex-direction: column;
  }

  .filter-buttons {
    justify-content: flex-start;
  }
}
</style>
