<script>
import { Hammer, CheckCircle, Flame, Clock } from "lucide-vue-next";
import { usePlayerStore } from "@/stores/player";
import { useInventoryStore } from "@/stores/inventory";
import { getMaterialNom, peutCrafter } from "@/shared/utils/craftingHelpers";

export default {
  name: "ForgeStation",
  components: { Hammer, CheckCircle, Flame, Clock },
  props: {
    estEnCoursDeForge: {
      type: Boolean,
      required: true,
    },
    recetteSelectionnee: {
      type: Object,
      default: null,
    },
    recetteEnCours: {
      type: Object,
      default: null,
    },
    progressionForge: {
      type: Number,
      default: 0,
    },
    tempsRestant: {
      type: Number,
      default: 0,
    },
    sparks: {
      type: Array,
      default: () => [],
    },
  },
  emits: ["forge", "cancel"],
  computed: {
    canForgeResult() {
      if (!this.recetteSelectionnee) return { possible: false, raison: "" };
      return peutCrafter(
        this.recetteSelectionnee,
        usePlayerStore().niveau,
        useInventoryStore(),
      );
    },
  },
  methods: {
    getMaterialNom,
    getQuantitePossedee(materialId) {
      return useInventoryStore().getQuantite(materialId);
    },
  },
};
</script>

<template>
  <div class="forge-station">
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

        <button
          class="forge-button"
          :disabled="!canForgeResult.possible"
          @click="$emit('forge')"
        >
          <span class="button-text">
            {{
              canForgeResult.possible ? "Forger" : canForgeResult.raison
            }}
          </span>
          <Hammer class="button-icon" :size="24" :stroke-width="2.5" />
        </button>
      </div>
    </div>

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

      <button class="stop-button" @click="$emit('cancel')">
        <span>Annuler</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
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

.idle-text {
  font-size: 1.2rem;
  color: rgba(161, 152, 130, 0.8);
}

.recipe-details {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding: 2rem;
  width: 100%;
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
  justify-content: center;
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

.station-active {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.5rem;
  width: 100%;
}

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

@media (max-width: 768px) {
  .recipe-details {
    padding: 1rem;
  }

  .detail-title {
    font-size: 1.5rem;
  }
}
</style>
