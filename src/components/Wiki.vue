<template>
  <main class="codex-page">
    <div class="codex-container">
      <!-- Sidebar Navigation -->
      <aside class="codex-sidebar">
        <div class="sidebar-header">
          <div class="codex-emblem">
            <BookOpen :size="48" :stroke-width="2" />
          </div>
          <h2 class="sidebar-title">Codex des Métaux</h2>
          <p class="sidebar-subtitle">Index Alchimique</p>
        </div>

        <nav class="codex-nav">
          <div class="nav-section">
            <h3 class="nav-section-title">Table des Matières</h3>
            <ul class="nav-list">
              <li
                v-for="(item, index) in bdd.metaux"
                :key="item.id"
                class="nav-item"
                :class="{ active: selectedMaterial === index }"
                @click="scrollToMaterial(index)"
              >
                <span class="nav-number">{{
                  String(index + 1).padStart(2, "0")
                }}</span>
                <span class="nav-text">{{ item.nom }}</span>
                <span class="nav-arrow">→</span>
              </li>
            </ul>
          </div>

          <div class="sidebar-footer">
            <div class="progress-indicator">
              <div class="progress-label">Documentation</div>
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
            Encyclopédie des Matériaux Nobles
            <span class="title-ornament">◆</span>
          </h1>
          <p class="content-description">
            Recueil exhaustif des métaux, alliages et matériaux précieux
            utilisés dans l'art ancestral de la forge. Chaque entrée détaille
            les propriétés, origines et applications légendaires de ces
            ressources exceptionnelles.
          </p>
          <div class="header-ornament-bottom">
            <Hammer :size="16" :stroke-width="2" class="ornament-icon" />
            <Hammer :size="16" :stroke-width="2" class="ornament-icon" />
            <Hammer :size="16" :stroke-width="2" class="ornament-icon" />
          </div>
        </header>

        <div class="materials-list">
          <Card
            :ref="'material-' + index"
            v-for="(item, index) in bdd.metaux"
            :key="item.id"
            :item="item"
            :index="index"
          />
        </div>

        <footer class="content-footer">
          <div class="footer-ornament">◆</div>
          <p class="footer-text">Fin du Chapitre I : Les Métaux Fondamentaux</p>
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
import Card from "./MainCard.vue";
import bdd from "./Material.json";
import { BookOpen, Hammer } from "lucide-vue-next";

export default {
  name: "WikiCodex",
  components: {
    Card,
    BookOpen,
    Hammer,
  },
  data() {
    return {
      bdd: bdd,
      selectedMaterial: 0,
      completionRate: 100,
    };
  },
  methods: {
    scrollToMaterial(index) {
      this.selectedMaterial = index;
      const element = this.$refs["material-" + index];
      if (element && element[0]) {
        element[0].$el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    },
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
  border-radius: 0.5rem;
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

.sidebar-footer {
  padding: 1.5rem;
  border-top: 2px solid rgba(161, 152, 130, 0.2);
  margin-top: 2rem;
}

.progress-indicator {
  background: rgba(25, 25, 25, 0.5);
  padding: 1.25rem;
  border-radius: 0.75rem;
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
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.progress-fill-mini {
  height: 100%;
  background: linear-gradient(90deg, var(--auburn), var(--viridian));
  border-radius: 4px;
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
  padding: 3rem 2rem 3rem 0;
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
  border-radius: 1rem;
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
  border-radius: 50%;
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
  border-radius: 4px;
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
