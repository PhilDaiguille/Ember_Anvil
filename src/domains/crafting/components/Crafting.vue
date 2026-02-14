<script>
import { mapState, mapActions, mapGetters } from "pinia";
import { useCraftingStore } from "@/stores/crafting";
import { usePlayerStore } from "@/stores/player";
import { useInventoryStore } from "@/stores/inventory";
import { RECIPES, getRecipesByCategorie } from "@/data/recipes";
import { MATERIALS } from "@/data/materials";
import {
  Swords,
  Hammer,
  Sparkles,
  Flame,
  Shield,
  Gem,
  FlaskConical,
  Wrench,
  Star,
  Lock,
  CheckCircle,
  Clock,
} from "lucide-vue-next";

export default {
  name: "CraftingComponent",
  components: {
    Swords,
    Hammer,
    Sparkles,
    Flame,
    Shield,
    Gem,
    FlaskConical,
    Wrench,
    Star,
    Lock,
    CheckCircle,
    Clock,
  },
  data() {
    return {
      categorieSelectionnee: "arme",
      recetteSelectionnee: null,
      sparks: [],
    };
  },
  computed: {
    ...mapState(useCraftingStore, [
      "estEnCoursDeForge",
      "recetteEnCours",
      "progressionForge",
    ]),
    ...mapGetters(useCraftingStore, ["tempsRestant", "historiqueRecent"]),
    ...mapState(usePlayerStore, ["niveau"]),
    ...mapState(useInventoryStore, ["materiaux"]),

    categoriesDisponibles() {
      return [
        { id: "arme", nom: "Armes", icon: "Swords" },
        { id: "armure", nom: "Armures", icon: "Shield" },
        { id: "outil", nom: "Outils", icon: "Wrench" },
        { id: "bijou", nom: "Bijoux", icon: "Gem" },
        { id: "consommable", nom: "Consommables", icon: "FlaskConical" },
      ];
    },

    recettesFiltrees() {
      return getRecipesByCategorie(this.categorieSelectionnee);
    },

    totalObjetsForges() {
      const craftingStore = useCraftingStore();
      return craftingStore.stats.totalObjetsForges;
    },
  },
  methods: {
    ...mapActions(useCraftingStore, ["demarrerForge", "annulerForge"]),

    selectionnerCategorie(categorieId) {
      this.categorieSelectionnee = categorieId;
      this.recetteSelectionnee = null;
    },

    selectionnerRecette(recipe) {
      this.recetteSelectionnee = recipe;
    },

    peutCrafter(recipe) {
      // Vérifier le niveau
      if (this.niveau < recipe.niveauRequis) {
        return { possible: false, raison: "Niveau insuffisant" };
      }

      // Vérifier les matériaux
      const inventoryStore = useInventoryStore();
      for (const ingredient of recipe.ingredients) {
        if (
          !inventoryStore.hasEnough(ingredient.materialId, ingredient.quantite)
        ) {
          return { possible: false, raison: "Matériaux insuffisants" };
        }
      }

      return { possible: true };
    },

    commencerForge() {
      if (!this.recetteSelectionnee) return;

      const succes = this.demarrerForge(this.recetteSelectionnee.id);
      if (succes) {
        this.genererEtincelles();
      }
    },

    genererEtincelles() {
      if (!this.estEnCoursDeForge) return;

      const sparkCount = Math.floor(Math.random() * 3) + 2;
      for (let i = 0; i < sparkCount; i++) {
        const spark = {
          id: Date.now() + i,
          left: Math.random() * 60 + 20,
          animationDuration: Math.random() * 0.5 + 0.5,
          delay: Math.random() * 0.3,
        };
        this.sparks.push(spark);
        setTimeout(
          () => {
            this.sparks = this.sparks.filter((s) => s.id !== spark.id);
          },
          (spark.animationDuration + spark.delay) * 1000,
        );
      }

      if (this.estEnCoursDeForge) {
        setTimeout(() => this.genererEtincelles(), 400);
      }
    },

    getMaterialNom(materialId) {
      const material = MATERIALS[materialId];
      return material ? material.nom : materialId;
    },

    getQuantitePossedee(materialId) {
      const inventoryStore = useInventoryStore();
      return inventoryStore.getQuantite(materialId);
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

    getIconComponent(iconName) {
      return iconName;
    },
  },
};
</script>
<template>
  <main class="forge-workshop">
    <div class="forge-container">
      <!-- Header -->
      <div class="forge-header">
        <div class="title-block">
          <h1 class="forge-title">
            <span class="title-accent">L'ATELIER</span>
            <span class="title-main">DE FORGE</span>
          </h1>
          <div class="subtitle">Façonnez le métal • Créez la légende</div>
        </div>
        <div class="craft-counter">
          <div class="counter-label">Forges réalisées</div>
          <div class="counter-value">{{ totalObjetsForges }}</div>
        </div>
      </div>

      <!-- Catégories -->
      <div class="categories-bar">
        <button
          v-for="cat in categoriesDisponibles"
          :key="cat.id"
          :class="[
            'category-btn',
            { active: categorieSelectionnee === cat.id },
          ]"
          @click="selectionnerCategorie(cat.id)"
        >
          <component
            :is="cat.icon"
            class="cat-icon"
            :size="20"
            :stroke-width="2"
          />
          <span>{{ cat.nom }}</span>
        </button>
      </div>

      <!-- Content Grid -->
      <div class="forge-content">
        <!-- Recipe Selection Panel -->
        <div class="recipes-panel">
          <h2 class="panel-title">
            {{
              categoriesDisponibles.find((c) => c.id === categorieSelectionnee)
                ?.nom
            }}
          </h2>
          <div class="recipes-list">
            <div
              v-for="recipe in recettesFiltrees"
              :key="recipe.id"
              :class="[
                'recipe-card',
                {
                  selected: recetteSelectionnee?.id === recipe.id,
                  locked: niveau < recipe.niveauRequis,
                },
              ]"
              @click="selectionnerRecette(recipe)"
            >
              <div class="recipe-header">
                <div :class="['recipe-rarity', getRarityClass(recipe.rarity)]">
                  <Star class="rarity-star" :size="12" :stroke-width="2.5" />
                  <span>{{ getRarityLabel(recipe.rarity) }}</span>
                </div>
                <div v-if="niveau < recipe.niveauRequis" class="recipe-lock">
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

        <!-- Forge Station -->
        <div class="forge-station">
          <!-- Idle / Recipe Selected -->
          <div v-if="!estEnCoursDeForge" class="station-idle">
            <div v-if="!recetteSelectionnee" class="no-recipe">
              <div class="anvil-display">
                <img
                  src="https://cdn-icons-png.flaticon.com/512/453/453558.png"
                  alt="anvil"
                  class="anvil-idle"
                />
                <div class="heat-waves"></div>
              </div>
              <p class="idle-text">Sélectionnez une recette pour commencer</p>
            </div>

            <div v-else class="recipe-details">
              <h2 class="detail-title">{{ recetteSelectionnee.nom }}</h2>
              <p class="detail-desc">{{ recetteSelectionnee.description }}</p>

              <!-- Ingredients Required -->
              <div class="ingredients-section">
                <h3 class="ingredients-title">Ingrédients requis</h3>
                <div class="ingredients-list">
                  <div
                    v-for="ing in recetteSelectionnee.ingredients"
                    :key="ing.materialId"
                    :class="[
                      'ingredient-item',
                      {
                        insufficient:
                          getQuantitePossedee(ing.materialId) < ing.quantite,
                      },
                    ]"
                  >
                    <span class="ingredient-name">{{
                      getMaterialNom(ing.materialId)
                    }}</span>
                    <span class="ingredient-quantity">
                      {{ getQuantitePossedee(ing.materialId) }} /
                      {{ ing.quantite }}
                    </span>
                    <CheckCircle
                      v-if="getQuantitePossedee(ing.materialId) >= ing.quantite"
                      class="check-icon"
                      :size="16"
                      :stroke-width="2.5"
                    />
                  </div>
                </div>
              </div>

              <!-- Craft Button -->
              <button
                class="forge-button"
                :disabled="!peutCrafter(recetteSelectionnee).possible"
                @click="commencerForge"
              >
                <span class="button-text">
                  {{
                    peutCrafter(recetteSelectionnee).possible
                      ? "Forger"
                      : peutCrafter(recetteSelectionnee).raison
                  }}
                </span>
                <Hammer class="button-icon" :size="24" :stroke-width="2.5" />
              </button>
            </div>
          </div>

          <!-- Active Forging -->
          <div v-else class="station-active">
            <div class="forging-info">
              <h2 class="forging-title">{{ recetteEnCours.nom }}</h2>
              <p class="forging-subtitle">Forge en cours...</p>
            </div>

            <div class="forging-animation">
              <img
                src="https://cdn-icons-png.flaticon.com/512/3615/3615934.png"
                alt="hammer"
                class="hammer-active"
              />
              <img
                src="https://cdn-icons-png.flaticon.com/512/453/453558.png"
                alt="anvil"
                class="anvil-active"
              />
              <div
                v-for="spark in sparks"
                :key="spark.id"
                class="spark"
                :style="{
                  left: spark.left + '%',
                  animationDuration: spark.animationDuration + 's',
                  animationDelay: spark.delay + 's',
                }"
              ></div>
              <div class="impact-zone"></div>
            </div>

            <div class="progress-container">
              <div class="progress-header">
                <span class="progress-label">Progression</span>
                <span class="progress-percent"
                  >{{ Math.floor(progressionForge) }}%</span
                >
              </div>
              <div class="progress-bar">
                <div class="progress-track"></div>
                <div
                  class="progress-fill"
                  :style="{ width: progressionForge + '%' }"
                ></div>
                <div
                  class="progress-glow"
                  :style="{ width: progressionForge + '%' }"
                ></div>
              </div>
              <div class="temperature-indicator">
                <Flame class="temp-icon" :size="22" :stroke-width="2" />
                <span class="temp-text"
                  >{{ Math.floor(800 + progressionForge * 4) }}°C</span
                >
                <Clock class="time-icon" :size="18" :stroke-width="2" />
                <span class="time-text">{{ tempsRestant }}s</span>
              </div>
            </div>

            <button class="stop-button" @click="annulerForge">
              <span>Annuler</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Crafting History -->
      <div v-if="historiqueRecent.length > 0" class="history-section">
        <h2 class="history-title">Dernières créations</h2>
        <div class="history-grid">
          <div
            v-for="item in historiqueRecent"
            :key="item.timestamp"
            class="history-item"
          >
            <div class="history-name">{{ item.nom }}</div>
            <div class="history-quality">
              <Star
                v-for="i in item.qualite"
                :key="i"
                class="quality-star"
                :size="14"
                :stroke-width="2.5"
              />
            </div>
            <div class="history-xp">+{{ item.xpGagne }} XP</div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
<style scoped>
.forge-workshop {
  min-height: 95dvh;
  background: linear-gradient(135deg, #1a1410 0%, #0d0a08 50%, #1a1410 100%);
  position: relative;
  overflow: hidden;
}

.forge-workshop::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background:
    radial-gradient(
      circle at 30% 50%,
      rgba(255, 100, 30, 0.03) 0%,
      transparent 50%
    ),
    radial-gradient(
      circle at 70% 60%,
      rgba(255, 80, 20, 0.02) 0%,
      transparent 40%
    );
  pointer-events: none;
}

.forge-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 3rem 2rem;
  position: relative;
  z-index: 1;
}

/* Header Styles */
.forge-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 4rem;
  flex-wrap: wrap;
  gap: 2rem;
}

.title-block {
  flex: 1;
  min-width: 300px;
}

.forge-title {
  font-size: clamp(2.5rem, 6vw, 5rem);
  font-weight: 900;
  line-height: 0.9;
  margin: 0 0 1rem 0;
  letter-spacing: -0.03em;
  text-transform: uppercase;
  font-family: "Palatino", "Georgia", serif;
}

.title-accent {
  display: block;
  color: var(--dun);
  font-size: 0.4em;
  letter-spacing: 0.15em;
  margin-bottom: 0.3rem;
  opacity: 0.8;
}

.title-main {
  display: block;
  background: linear-gradient(135deg, #ff6420 0%, #ff9d5c 50%, #ff6420 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 0 40px rgba(255, 100, 32, 0.3);
  animation: titlePulse 4s ease-in-out infinite;
}

@keyframes titlePulse {
  0%,
  100% {
    filter: brightness(1);
  }
  50% {
    filter: brightness(1.2);
  }
}

.subtitle {
  font-size: 1.1rem;
  color: var(--dun);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 300;
}

.craft-counter {
  background: linear-gradient(
    135deg,
    rgba(50, 93, 68, 0.2),
    rgba(25, 25, 25, 0.4)
  );
  border: 2px solid var(--viridian);

  padding: 1.5rem 2rem;
  text-align: center;
  min-width: 180px;
  box-shadow: 0 4px 20px rgba(0, 114, 87, 0.2);
}

.counter-label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: var(--dun);
  margin-bottom: 0.5rem;
}

.counter-value {
  font-size: 3rem;
  font-weight: 900;
  color: var(--sea-green);
  font-family: "Impact", sans-serif;
  text-shadow: 0 0 20px rgba(0, 114, 87, 0.5);
}

/* Content Grid */
.forge-content {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 3rem;
  align-items: start;
}

@media (max-width: 968px) {
  .forge-content {
    grid-template-columns: 1fr;
  }
}

/* Description Panel */
.description-panel {
  background: linear-gradient(
    135deg,
    rgba(161, 152, 130, 0.08),
    rgba(50, 93, 68, 0.08)
  );
  border-left: 4px solid var(--auburn);

  padding: 0.5rem;
  backdrop-filter: blur(10px);
}

.panel-inner {
  padding: 2rem;
}

.section-title {
  font-size: 2rem;
  font-weight: 800;
  color: var(--dun);
  margin: 0 0 1.5rem 0;
  letter-spacing: -0.02em;
  font-family: "Georgia", serif;
}

.description-text {
  font-size: 1.05rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.85);
  margin: 0 0 2rem 0;
  text-align: justify;
}

.craft-features {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.feature-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1rem;
  background: rgba(25, 25, 25, 0.5);

  font-size: 0.95rem;
  color: var(--dun);
  transition: all 0.3s ease;
}

.feature-item:hover {
  background: rgba(133, 50, 51, 0.2);
  transform: translateX(8px);
}

.feature-icon {
  font-size: 1.5rem;
  filter: grayscale(0.3);
}

/* Forge Station */
.forge-station {
  background: linear-gradient(
    135deg,
    rgba(25, 25, 25, 0.8),
    rgba(13, 10, 8, 0.9)
  );
  border: 2px solid rgba(161, 152, 130, 0.2);

  padding: 3rem 2rem;
  box-shadow:
    0 20px 60px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
  min-height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* Idle State */
.station-idle {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3rem;
  width: 100%;
}

.anvil-display {
  position: relative;
  width: 280px;
  height: 280px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.anvil-idle {
  width: 240px;
  height: auto;
  filter: drop-shadow(0 10px 30px rgba(0, 0, 0, 0.6));
  animation: anvilFloat 3s ease-in-out infinite;
}

@keyframes anvilFloat {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
}

.heat-waves {
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  height: 80px;
  background: linear-gradient(
    to top,
    rgba(255, 100, 30, 0.1),
    rgba(255, 157, 92, 0.05),
    transparent
  );
  filter: blur(20px);
  animation: heatWave 2s ease-in-out infinite;
}

@keyframes heatWave {
  0%,
  100% {
    opacity: 0.4;
    transform: translateX(-50%) scaleY(1);
  }
  50% {
    opacity: 0.7;
    transform: translateX(-50%) scaleY(1.2);
  }
}

.forge-button {
  padding: 1.5rem 3rem;
  font-size: 1.25rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--sea-green), var(--viridian));
  color: white;
  border: none;

  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 1rem;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  box-shadow:
    0 8px 24px rgba(0, 114, 87, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;
}

.forge-button::before {
  content: "";
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

.forge-button:hover::before {
  left: 100%;
}

.forge-button:hover {
  transform: translateY(-2px);
  box-shadow:
    0 12px 32px rgba(0, 114, 87, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
}

.forge-button:active {
  transform: translateY(0);
}

.button-icon {
  font-size: 1.5rem;
}

/* Active State */
.station-active {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;
  width: 100%;
}

.forging-animation {
  position: relative;
  width: 100%;
  max-width: 400px;
  height: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.hammer-active {
  position: absolute;
  width: 180px;
  height: auto;
  z-index: 3;
  filter: drop-shadow(0 8px 24px rgba(0, 0, 0, 0.5));
  animation: hammerStrike 1.2s ease-in-out infinite;
  transform-origin: bottom right;
}

@keyframes hammerStrike {
  0%,
  100% {
    transform: rotate(-110deg) translate(-100px, -40px);
  }
  40% {
    transform: rotate(-10deg) translate(80px, 60px);
  }
  45% {
    transform: rotate(-5deg) translate(85px, 65px);
  }
  55% {
    transform: rotate(-10deg) translate(80px, 60px);
  }
}

.anvil-active {
  width: 260px;
  height: auto;
  z-index: 2;
  filter: drop-shadow(0 15px 40px rgba(0, 0, 0, 0.7));
}

.impact-zone {
  position: absolute;
  top: 40%;
  left: 58%;
  width: 60px;
  height: 60px;
  background: radial-gradient(circle, rgba(255, 100, 30, 0.4), transparent);

  animation: impactFlash 1.2s ease-in-out infinite;
  z-index: 1;
  filter: blur(8px);
}

@keyframes impactFlash {
  0%,
  39%,
  56%,
  100% {
    opacity: 0;
    transform: scale(0.5);
  }
  40%,
  55% {
    opacity: 1;
    transform: scale(1.5);
  }
}

.spark {
  position: absolute;
  top: 45%;
  width: 6px;
  height: 6px;
  background: radial-gradient(circle, #ffed4e, #ff9d5c, #ff6420);

  box-shadow: 0 0 10px rgba(255, 237, 78, 0.8);
  animation: sparkFly 1s ease-out forwards;
  z-index: 4;
}

@keyframes sparkFly {
  0% {
    transform: translate(0, 0) scale(1);
    opacity: 1;
  }
  100% {
    transform: translate(
        calc((var(--random-x, 0) - 0.5) * 150px),
        calc((var(--random-y, 0) - 0.5) * -120px)
      )
      scale(0);
    opacity: 0;
  }
}

/* Progress Bar */
.progress-container {
  width: 100%;
  max-width: 500px;
}

.progress-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.progress-label {
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--dun);
  font-weight: 600;
}

.progress-percent {
  font-size: 1.5rem;
  font-weight: 900;
  color: #ff6420;
  font-family: "Impact", sans-serif;
  text-shadow: 0 0 15px rgba(255, 100, 32, 0.5);
}

.progress-bar {
  position: relative;
  width: 100%;
  height: 32px;
  background: rgba(25, 25, 25, 0.8);

  overflow: hidden;
  border: 2px solid rgba(161, 152, 130, 0.3);
  box-shadow: inset 0 2px 8px rgba(0, 0, 0, 0.5);
}

.progress-track {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: repeating-linear-gradient(
    90deg,
    transparent,
    transparent 20px,
    rgba(161, 152, 130, 0.05) 20px,
    rgba(161, 152, 130, 0.05) 40px
  );
}

.progress-fill {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  background: linear-gradient(90deg, #942525 0%, #ff6420 50%, #ffed4e 100%);
  transition: width 0.1s linear;

  box-shadow: 0 0 20px rgba(255, 100, 32, 0.6);
}

.progress-glow {
  position: absolute;
  top: -4px;
  left: 0;
  height: calc(100% + 8px);
  background: radial-gradient(
    ellipse at center,
    rgba(255, 237, 78, 0.4),
    transparent
  );
  transition: width 0.1s linear;

  filter: blur(10px);
  pointer-events: none;
}

.temperature-indicator {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-top: 1rem;
  font-size: 1.1rem;
  color: var(--dun);
  font-weight: 600;
}

.temp-icon {
  font-size: 1.3rem;
  animation: fireFlicker 0.5s ease-in-out infinite alternate;
}

@keyframes fireFlicker {
  0% {
    transform: scale(1);
    filter: brightness(1);
  }
  100% {
    transform: scale(1.1);
    filter: brightness(1.3);
  }
}

.stop-button {
  padding: 1rem 2.5rem;
  font-size: 1rem;
  font-weight: 700;
  background: linear-gradient(135deg, var(--auburn), #942525);
  color: white;
  border: none;

  cursor: pointer;
  transition: all 0.3s ease;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  box-shadow:
    0 6px 20px rgba(133, 50, 51, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  margin-top: 0.5rem;
}

.stop-button:hover {
  background: linear-gradient(135deg, #942525, var(--auburn));
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(133, 50, 51, 0.5);
}

.stop-button:active {
  transform: translateY(0);
}

/* Categories Bar */
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

/* Forge Content Grid */
.forge-content {
  display: grid;
  grid-template-columns: 400px 1fr;
  gap: 2rem;
  margin-bottom: 3rem;
}

@media (max-width: 1024px) {
  .forge-content {
    grid-template-columns: 1fr;
  }
}

/* Recipes Panel */
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

/* Recipe Card */
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

/* Recipe Details */
.recipe-details {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
}

.detail-title {
  font-size: 2rem;
  font-weight: 800;
  color: white;
  margin: 0;
  text-align: center;
}

.detail-desc {
  font-size: 1rem;
  color: rgba(161, 152, 130, 0.9);
  margin: 0;
  text-align: center;
  line-height: 1.5;
}

/* Ingredients Section */
.ingredients-section {
  background: rgba(25, 25, 25, 0.6);
  border: 2px solid rgba(161, 152, 130, 0.2);
  padding: 1.5rem;
}

.ingredients-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--dun);
  margin: 0 0 1rem 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.ingredients-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.ingredient-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background: rgba(161, 152, 130, 0.05);
  border: 1px solid rgba(161, 152, 130, 0.15);
  transition: all 0.2s ease;
}

.ingredient-item.insufficient {
  background: rgba(133, 50, 51, 0.1);
  border-color: rgba(133, 50, 51, 0.3);
}

.ingredient-name {
  font-size: 0.95rem;
  color: white;
  font-weight: 600;
}

.ingredient-quantity {
  font-size: 0.9rem;
  color: var(--dun);
  margin-left: auto;
  margin-right: 0.75rem;
}

.ingredient-item.insufficient .ingredient-quantity {
  color: var(--auburn);
}

.check-icon {
  color: var(--viridian);
  flex-shrink: 0;
}

.forge-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.forge-button:disabled:hover {
  transform: none;
  box-shadow:
    0 8px 24px rgba(0, 114, 87, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

/* Forging Info */
.forging-info {
  text-align: center;
  margin-bottom: 1rem;
}

.forging-title {
  font-size: 1.8rem;
  font-weight: 800;
  color: white;
  margin: 0 0 0.5rem 0;
}

.forging-subtitle {
  font-size: 1rem;
  color: var(--dun);
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

/* History Section */
.history-section {
  background: linear-gradient(
    135deg,
    rgba(25, 25, 25, 0.8),
    rgba(30, 25, 20, 0.8)
  );
  border: 2px solid rgba(161, 152, 130, 0.2);
  padding: 2rem;
  margin-top: 3rem;
}

.history-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--dun);
  margin: 0 0 1.5rem 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  text-align: center;
}

.history-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

.history-item {
  background: rgba(25, 25, 25, 0.6);
  border: 2px solid rgba(161, 152, 130, 0.15);
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.3s ease;
}

.history-item:hover {
  background: rgba(161, 152, 130, 0.05);
  border-color: rgba(161, 152, 130, 0.3);
  transform: translateY(-2px);
}

.history-name {
  font-size: 0.95rem;
  font-weight: 700;
  color: white;
  text-align: center;
}

.history-quality {
  display: flex;
  gap: 0.25rem;
}

.quality-star {
  color: #fbbf24;
  fill: #fbbf24;
}

.history-xp {
  font-size: 0.85rem;
  color: var(--viridian);
  font-weight: 600;
}

/* Responsive */
@media (max-width: 768px) {
  .forge-container {
    padding: 2rem 1rem;
  }

  .forge-header {
    margin-bottom: 2rem;
  }

  .categories-bar {
    gap: 0.5rem;
  }

  .category-btn {
    padding: 0.6rem 1rem;
    font-size: 0.85rem;
  }

  .recipes-panel {
    max-height: 500px;
  }

  .recipe-details {
    padding: 1rem;
  }

  .detail-title {
    font-size: 1.5rem;
  }

  .history-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
}
</style>
