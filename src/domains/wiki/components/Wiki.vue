<template>
  <main class="codex-page">
    <div class="codex-container">
      <!-- Sidebar Navigation -->
      <aside class="codex-sidebar">
        <div class="sidebar-header">
          <div class="codex-emblem">
            <BookOpen :size="48" :stroke-width="2" />
          </div>
          <h2 class="sidebar-title">{{ tabTitle }}</h2>
          <p class="sidebar-subtitle">{{ tabSubtitle }}</p>
        </div>

        <!-- Tab Switcher -->
        <div class="tab-switcher">
          <button
            class="tab-button"
            :class="{ active: selectedTab === 'materials' }"
            @click="switchTab('materials')"
          >
            <Filter :size="16" :stroke-width="2" />
            Matériaux
          </button>
          <button
            class="tab-button"
            :class="{ active: selectedTab === 'recipes' }"
            @click="switchTab('recipes')"
          >
            <Hammer :size="16" :stroke-width="2" />
            Recettes
          </button>
        </div>

        <!-- Search & Filter Controls -->
        <div class="controls-section">
          <!-- Search Input -->
          <div class="search-box">
            <Search :size="16" :stroke-width="2" class="search-icon" />
            <input
              type="text"
              class="search-input"
              placeholder="Rechercher..."
              :value="localSearchQuery"
              @input="handleSearchInput"
            />
          </div>

          <!-- Category Filter -->
          <div class="filter-box">
            <Filter :size="16" :stroke-width="2" class="filter-icon" />
            <select
              class="filter-select"
              :value="selectedCategory"
              @change="handleCategoryChange"
            >
              <option
                v-for="category in availableCategories"
                :key="category"
                :value="category"
              >
                {{
                  category === "all"
                    ? "Toutes catégories"
                    : category.charAt(0).toUpperCase() + category.slice(1)
                }}
              </option>
            </select>
          </div>
        </div>

        <nav class="codex-nav">
          <div class="nav-section">
            <h3 class="nav-section-title">
              {{ categoryDisplayName }} ({{ displayedItems.length }})
            </h3>
            <ul v-if="displayedItems.length > 0" class="nav-list">
              <li
                v-for="(item, index) in displayedItems"
                :key="item.id"
                class="nav-item"
                :class="{ active: selectedItemIndex === index }"
                @click="scrollToItem(index)"
              >
                <span class="nav-number">{{
                  String(index + 1).padStart(2, "0")
                }}</span>
                <span class="nav-text">{{ item.nom }}</span>
                <span class="nav-arrow">→</span>
              </li>
            </ul>
            <div v-else class="empty-state">
              <p class="empty-text">Aucun élément découvert</p>
              <p class="empty-hint">
                {{
                  selectedTab === "materials"
                    ? "Achetez des matériaux pour les découvrir"
                    : "Forgez des objets pour découvrir des recettes"
                }}
              </p>
            </div>
          </div>

          <div class="sidebar-footer">
            <div class="progress-indicator">
              <div class="progress-label">Documentation ({{ statsText }})</div>
              <div class="progress-bar-mini">
                <div
                  class="progress-fill-mini"
                  :style="{ width: completionRate + '%' }"
                ></div>
              </div>
              <div class="progress-text">
                {{ Math.floor(completionRate) }}% complété
              </div>
            </div>
          </div>
        </nav>
      </aside>

      <!-- Main Content -->
      <div class="codex-content">
        <header class="content-header">
          <div class="header-ornament-top">
            <span class="ornament-dot"></span>
            <span class="ornament-dot"></span>
            <span class="ornament-dot"></span>
          </div>
          <h1 class="content-title">
            <span class="title-ornament">◆</span>
            {{ contentTitle }}
            <span class="title-ornament">◆</span>
          </h1>
          <p class="content-description">
            {{ contentDescription }}
          </p>
          <div class="header-ornament-bottom">
            <Hammer :size="16" :stroke-width="2" class="ornament-icon" />
            <Hammer :size="16" :stroke-width="2" class="ornament-icon" />
            <Hammer :size="16" :stroke-width="2" class="ornament-icon" />
          </div>
        </header>

        <div v-if="displayedItems.length > 0" class="materials-list">
          <Card
            :ref="'item-' + index"
            v-for="(item, index) in displayedItems"
            :key="item.id"
            :item="item"
            :index="index"
            :item-type="selectedTab"
          />
        </div>

        <div v-else class="content-empty-state">
          <div class="empty-icon">
            <BookOpen :size="64" :stroke-width="1.5" />
          </div>
          <h2 class="empty-title">Aucune entrée découverte</h2>
          <p class="empty-description">
            {{
              selectedTab === "materials"
                ? "Explorez le marché et achetez des matériaux pour les ajouter au codex."
                : "Forgez vos premières créations pour découvrir de nouvelles recettes."
            }}
          </p>
        </div>

        <footer v-if="displayedItems.length > 0" class="content-footer">
          <div class="footer-ornament">◆</div>
          <p class="footer-text">
            {{
              selectedTab === "materials"
                ? `Chapitre ${categoryDisplayName} : ${displayedItems.length} entrée(s)`
                : `Recettes ${categoryDisplayName} : ${displayedItems.length} formule(s)`
            }}
          </p>
          <p class="footer-subtext">
            Pour plus d'informations, consultez les maîtres forgerons de la
            guilde
          </p>
        </footer>
      </div>
    </div>
  </main>
</template>

<script>
import Card from "@/shared/ui/MainCard.vue";
import { mapState, mapActions } from "pinia";
import { useCodexStore } from "@/stores/codex";
import { BookOpen, Hammer, Search, Filter } from "lucide-vue-next";

export default {
  name: "WikiCodex",
  components: {
    Card,
    BookOpen,
    Hammer,
    Search,
    Filter,
  },
  data() {
    return {
      selectedItemIndex: 0,
      localSearchQuery: "",
    };
  },
  computed: {
    ...mapState(useCodexStore, [
      "filteredMaterials",
      "filteredRecipes",
      "selectedTab",
      "selectedCategory",
      "materialsDiscoveryStats",
      "recipesDiscoveryStats",
      "globalCompletionRate",
      "availableCategories",
    ]),

    // Switch between materials and recipes based on tab
    displayedItems() {
      return this.selectedTab === "materials"
        ? this.filteredMaterials
        : this.filteredRecipes;
    },

    // Dynamic completion rate
    completionRate() {
      return this.selectedTab === "materials"
        ? this.materialsDiscoveryStats.percentage
        : this.recipesDiscoveryStats.percentage;
    },

    // Dynamic stats text
    statsText() {
      const stats =
        this.selectedTab === "materials"
          ? this.materialsDiscoveryStats
          : this.recipesDiscoveryStats;
      return `${stats.discovered} / ${stats.total}`;
    },

    // Tab title
    tabTitle() {
      return this.selectedTab === "materials"
        ? "Codex des Matériaux"
        : "Codex des Recettes";
    },

    // Tab subtitle
    tabSubtitle() {
      return this.selectedTab === "materials"
        ? "Index Alchimique"
        : "Recueil des Créations";
    },

    // Content title
    contentTitle() {
      return this.selectedTab === "materials"
        ? "Encyclopédie des Matériaux Nobles"
        : "Encyclopédie des Créations Légendaires";
    },

    // Content description
    contentDescription() {
      return this.selectedTab === "materials"
        ? "Recueil exhaustif des métaux, alliages et matériaux précieux utilisés dans l'art ancestral de la forge. Chaque entrée détaille les propriétés, origines et applications légendaires de ces ressources exceptionnelles."
        : "Collection complète des recettes de forge, des armes communes aux artefacts légendaires. Chaque recette détaille les matériaux requis, le niveau nécessaire et les propriétés exceptionnelles des créations.";
    },

    // Category display name
    categoryDisplayName() {
      const categoryNames = {
        all: "Toutes",
        // Materials
        metaux: "Métaux",
        bois: "Bois",
        pierres: "Pierres",
        gemmes: "Gemmes",
        speciaux: "Spéciaux",
        // Recipes
        armes: "Armes",
        armures: "Armures",
        outils: "Outils",
        bijoux: "Bijoux",
        consommables: "Consommables",
      };
      return categoryNames[this.selectedCategory] || this.selectedCategory;
    },
  },
  methods: {
    ...mapActions(useCodexStore, [
      "setTab",
      "setCategory",
      "setSearchQuery",
      "initialize",
    ]),

    scrollToItem(index) {
      this.selectedItemIndex = index;
      const element = this.$refs["item-" + index];
      if (element && element[0]) {
        element[0].$el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },

    handleSearchInput(event) {
      this.localSearchQuery = event.target.value;
      this.setSearchQuery(this.localSearchQuery);
    },

    handleCategoryChange(event) {
      this.setCategory(event.target.value);
    },

    switchTab(tab) {
      this.setTab(tab);
      this.selectedItemIndex = 0;
      this.localSearchQuery = "";
    },
  },
  mounted() {
    const codexStore = useCodexStore();
    codexStore.initialize(); // Auto-discover tier 1 materials
  },
};
</script>

<style scoped>
.codex-page {
  min-height: 95dvh;
  background: linear-gradient(to bottom, #1a1612 0%, #0f0d0a 100%);
  position: relative;
}

.codex-page::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(161, 152, 130, 0.03) 2px,
    rgba(161, 152, 130, 0.03) 4px
  );
  pointer-events: none;
  opacity: 0.5;
}

.codex-container {
  display: flex;
  max-width: 1800px;
  margin: 0 auto;
  gap: 2rem;
  position: relative;
  z-index: 1;
}

/* Sidebar */
.codex-sidebar {
  width: 320px;
  min-width: 320px;
  background: linear-gradient(
    135deg,
    rgba(26, 22, 18, 0.95),
    rgba(15, 13, 10, 0.95)
  );
  border-right: 3px solid rgba(161, 152, 130, 0.3);
  position: sticky;
  top: 0;
  height: 100vh;
  overflow-y: auto;
  box-shadow: 4px 0 24px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
}

.sidebar-header {
  padding: 2.5rem 2rem;
  border-bottom: 2px solid rgba(161, 152, 130, 0.2);
  background: linear-gradient(
    to bottom,
    rgba(161, 152, 130, 0.08),
    transparent
  );
  text-align: center;
}

.codex-emblem {
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--dun);
  margin-bottom: 1rem;
  animation: bookFloat 3s ease-in-out infinite;
}

@keyframes bookFloat {
  0%,
  100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-8px) rotate(3deg);
  }
}

.sidebar-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--dun);
  margin: 0 0 0.5rem 0;
  font-family: "Palatino", "Book Antiqua", serif;
  letter-spacing: 0.02em;
}

.sidebar-subtitle {
  font-size: 0.85rem;
  color: rgba(161, 152, 130, 0.7);
  text-transform: uppercase;
  letter-spacing: 0.15em;
  margin: 0;
  font-weight: 300;
}

/* Tab Switcher */
.tab-switcher {
  display: flex;
  gap: 0.5rem;
  padding: 1rem 1.5rem;
  border-bottom: 2px solid rgba(161, 152, 130, 0.2);
}

.tab-button {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75rem 1rem;
  background: rgba(25, 25, 25, 0.5);
  border: 1px solid rgba(161, 152, 130, 0.3);
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: all 0.3s ease;
}

.tab-button:hover {
  background: rgba(161, 152, 130, 0.15);
  color: white;
  border-color: var(--auburn);
}

.tab-button.active {
  background: linear-gradient(135deg, var(--auburn), rgba(133, 50, 51, 0.8));
  color: white;
  border-color: var(--auburn);
  box-shadow: 0 2px 8px rgba(133, 50, 51, 0.4);
}

/* Controls Section */
.controls-section {
  padding: 1rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  border-bottom: 2px solid rgba(161, 152, 130, 0.2);
}

.search-box,
.filter-box {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(25, 25, 25, 0.5);
  border: 1px solid rgba(161, 152, 130, 0.3);
  padding: 0.5rem 0.75rem;
  transition: all 0.3s ease;
}

.search-box:focus-within,
.filter-box:focus-within {
  border-color: var(--viridian);
  background: rgba(25, 25, 25, 0.7);
}

.search-icon,
.filter-icon {
  color: var(--dun);
  flex-shrink: 0;
}

.search-input,
.filter-select {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: white;
  font-size: 0.9rem;
  font-family: inherit;
}

.search-input::placeholder {
  color: rgba(255, 255, 255, 0.4);
}

.filter-select {
  cursor: pointer;
  font-weight: 500;
}

.filter-select option {
  background: var(--jet);
  color: white;
}

/* Navigation */
.codex-nav {
  padding: 1.5rem 0;
}

.nav-section {
  padding: 0 1.5rem;
}

.nav-section-title {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: rgba(161, 152, 130, 0.6);
  margin: 0 0 1rem 0;
  font-weight: 600;
  padding-left: 0.5rem;
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.875rem 1rem;
  margin-bottom: 0.5rem;
  background: rgba(25, 25, 25, 0.3);
  border-left: 3px solid transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.95rem;
  color: rgba(255, 255, 255, 0.8);
}

.nav-item:hover {
  background: rgba(161, 152, 130, 0.15);
  border-left-color: var(--auburn);
  transform: translateX(4px);
  color: white;
}

.nav-item.active {
  background: linear-gradient(
    90deg,
    rgba(133, 50, 51, 0.3),
    rgba(133, 50, 51, 0.1)
  );
  border-left-color: var(--auburn);
  color: white;
  box-shadow: 0 2px 8px rgba(133, 50, 51, 0.2);
}

.nav-number {
  font-size: 0.75rem;
  color: var(--auburn);
  font-weight: 700;
  font-family: "Courier New", monospace;
  min-width: 24px;
}

.nav-text {
  flex: 1;
  font-weight: 500;
}

.nav-arrow {
  opacity: 0;
  transform: translateX(-8px);
  transition: all 0.3s ease;
  color: var(--auburn);
}

.nav-item:hover .nav-arrow,
.nav-item.active .nav-arrow {
  opacity: 1;
  transform: translateX(0);
}

/* Empty States */
.empty-state {
  padding: 2rem 1rem;
  text-align: center;
}

.empty-text {
  font-size: 0.95rem;
  color: rgba(161, 152, 130, 0.6);
  margin: 0 0 0.5rem 0;
  font-style: italic;
}

.empty-hint {
  font-size: 0.8rem;
  color: rgba(161, 152, 130, 0.4);
  margin: 0;
  line-height: 1.4;
}

.content-empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  padding: 3rem;
  text-align: center;
  background: rgba(25, 25, 25, 0.3);
  border: 2px dashed rgba(161, 152, 130, 0.3);
  margin: 2rem 0;
}

.empty-icon {
  color: rgba(161, 152, 130, 0.3);
  margin-bottom: 1.5rem;
}

.empty-title {
  font-size: 1.5rem;
  font-weight: 600;
  color: var(--dun);
  margin: 0 0 1rem 0;
  font-family: "Palatino", serif;
}

.empty-description {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.6);
  max-width: 500px;
  line-height: 1.6;
  margin: 0;
}

/* Sidebar Footer */
.sidebar-footer {
  padding: 1.5rem;
  border-top: 2px solid rgba(161, 152, 130, 0.2);
  margin-top: 2rem;
}

.progress-indicator {
  background: rgba(25, 25, 25, 0.5);
  padding: 1.25rem;
  border: 1px solid rgba(161, 152, 130, 0.15);
}

.progress-label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--dun);
  margin-bottom: 0.75rem;
  font-weight: 600;
}

.progress-bar-mini {
  height: 8px;
  background: rgba(25, 25, 25, 0.8);
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.progress-fill-mini {
  height: 100%;
  background: linear-gradient(90deg, var(--auburn), var(--viridian));
  transition: width 0.5s ease;
  box-shadow: 0 0 8px rgba(133, 50, 51, 0.5);
}

.progress-text {
  font-size: 0.85rem;
  color: rgba(161, 152, 130, 0.8);
  text-align: center;
  font-weight: 600;
}

/* Main Content */
.codex-content {
  flex: 1;
  padding: 0rem 2rem 3rem 0;
  max-width: 1200px;
}

.content-header {
  padding: 3rem 2rem;
  background: linear-gradient(
    135deg,
    rgba(161, 152, 130, 0.08),
    rgba(50, 93, 68, 0.05)
  );
  border: 2px solid rgba(161, 152, 130, 0.2);
  margin-bottom: 3rem;
  text-align: center;
  position: relative;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
}

.content-header::before,
.content-header::after {
  content: "";
  position: absolute;
  left: 2rem;
  right: 2rem;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(161, 152, 130, 0.3),
    transparent
  );
}

.content-header::before {
  top: 1rem;
}

.content-header::after {
  bottom: 1rem;
}

.header-ornament-top,
.header-ornament-bottom {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  color: var(--auburn);
  opacity: 0.6;
  margin: 1rem 0;
}

.ornament-dot {
  width: 6px;
  height: 6px;
  background: var(--auburn);
  opacity: 0.6;
}

.ornament-icon {
  opacity: 0.6;
}

.content-title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 700;
  color: var(--dun);
  margin: 1.5rem 0;
  font-family: "Palatino", "Book Antiqua", serif;
  letter-spacing: 0.02em;
  line-height: 1.2;
}

.title-ornament {
  color: var(--auburn);
  font-size: 0.7em;
  opacity: 0.8;
  margin: 0 1rem;
}

.content-description {
  font-size: 1.05rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.75);
  max-width: 800px;
  margin: 0 auto;
  text-align: justify;
}

.materials-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

/* Footer */
.content-footer {
  margin-top: 4rem;
  padding: 2.5rem;
  text-align: center;
  border-top: 2px solid rgba(161, 152, 130, 0.2);
  border-bottom: 2px solid rgba(161, 152, 130, 0.2);
}

.footer-ornament {
  font-size: 2rem;
  color: var(--auburn);
  margin-bottom: 1rem;
  opacity: 0.7;
}

.footer-text {
  font-size: 1.1rem;
  font-style: italic;
  color: var(--dun);
  margin: 0 0 0.5rem 0;
  font-family: "Georgia", serif;
}

.footer-subtext {
  font-size: 0.9rem;
  color: rgba(161, 152, 130, 0.6);
  margin: 0;
}

/* Scrollbar Styling */
.codex-sidebar::-webkit-scrollbar {
  width: 8px;
}

.codex-sidebar::-webkit-scrollbar-track {
  background: rgba(25, 25, 25, 0.5);
}

.codex-sidebar::-webkit-scrollbar-thumb {
  background: rgba(161, 152, 130, 0.3);
}

.codex-sidebar::-webkit-scrollbar-thumb:hover {
  background: rgba(161, 152, 130, 0.5);
}

/* Responsive */
@media (max-width: 1024px) {
  .codex-container {
    flex-direction: column;
  }

  .codex-sidebar {
    width: 100%;
    min-width: unset;
    position: relative;
    height: auto;
    border-right: none;
    border-bottom: 3px solid rgba(161, 152, 130, 0.3);
  }

  .codex-content {
    padding: 2rem;
  }
}
</style>
