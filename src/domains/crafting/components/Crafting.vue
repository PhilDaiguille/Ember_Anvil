<script>
import { Swords, Hammer, Sparkles, Flame } from "lucide-vue-next";

export default {
  name: "CraftingComponent",
  components: {
    Swords,
    Hammer,
    Sparkles,
    Flame,
  },
  data() {
    return {
      crafting: false,
      progress: 0,
      sparks: [],
      craftCount: 0,
    };
  },
  methods: {
    startCrafting() {
      this.crafting = true;
      this.progress = 0;
      this.craftCount++;
      this.generateSparks();

      const interval = setInterval(() => {
        this.progress += 1.45;
        if (this.progress >= 100) {
          this.progress = 100;
          clearInterval(interval);
          setTimeout(() => {
            this.crafting = false;
            this.sparks = [];
          }, 800);
        }
      }, 100);
    },
    stopCrafting() {
      this.crafting = false;
      this.progress = 0;
      this.sparks = [];
    },
    generateSparks() {
      if (!this.crafting) return;
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
      if (this.crafting) {
        setTimeout(() => this.generateSparks(), 400);
      }
    },
  },
};
</script>
<template>
  <main class="forge-workshop">
    <div class="forge-container">
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
          <div class="counter-value">{{ craftCount }}</div>
        </div>
      </div>

      <div class="forge-content">
        <div class="description-panel">
          <div class="panel-inner">
            <h2 class="section-title">Maîtrisez l'Art Ancestral</h2>
            <p class="description-text">
              Dans cet atelier séculaire, le feu et le métal ne font qu'un.
              Chaque coup de marteau résonne comme un écho des forgerons
              d'antan. Créez des armes légendaires, forgez des outils
              indestructibles, sculptez des œuvres qui traverseront les âges.
            </p>
            <div class="craft-features">
              <div class="feature-item">
                <Swords class="feature-icon" :size="24" :stroke-width="2" />
                <span>Armes légendaires</span>
              </div>
              <div class="feature-item">
                <Hammer class="feature-icon" :size="24" :stroke-width="2" />
                <span>Outils perfectionnés</span>
              </div>
              <div class="feature-item">
                <Sparkles class="feature-icon" :size="24" :stroke-width="2" />
                <span>Créations uniques</span>
              </div>
            </div>
          </div>
        </div>

        <div class="forge-station">
          <div v-if="!crafting" class="station-idle">
            <div class="anvil-display">
              <img
                src="https://cdn-icons-png.flaticon.com/512/453/453558.png"
                alt="anvil"
                class="anvil-idle"
              />
              <div class="heat-waves"></div>
            </div>
            <button class="forge-button" @click="startCrafting">
              <span class="button-text">Commencer la Forge</span>
              <Hammer class="button-icon" :size="24" :stroke-width="2.5" />
            </button>
          </div>

          <div v-else class="station-active">
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
                <span class="progress-label">Forge en cours</span>
                <span class="progress-percent"
                  >{{ Math.floor(progress) }}%</span
                >
              </div>
              <div class="progress-bar">
                <div class="progress-track"></div>
                <div
                  class="progress-fill"
                  :style="{ width: progress + '%' }"
                ></div>
                <div
                  class="progress-glow"
                  :style="{ width: progress + '%' }"
                ></div>
              </div>
              <div class="temperature-indicator">
                <Flame class="temp-icon" :size="22" :stroke-width="2" />
                <span class="temp-text"
                  >{{ Math.floor(800 + progress * 4) }}°C</span
                >
              </div>
            </div>

            <button class="stop-button" @click="stopCrafting">
              <span>Arrêter</span>
            </button>
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
  font-family: "Impact", "Arial Black", sans-serif;
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
  border-radius: 1rem;
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
  border-radius: 0.5rem;
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
  border-radius: 0.5rem;
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
  border-radius: 1rem;
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
  border-radius: 0.75rem;
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
  border-radius: 50%;
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
  border-radius: 50%;
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
  border-radius: 16px;
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
  border-radius: 16px;
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
  border-radius: 16px;
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
  border-radius: 0.5rem;
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
</style>
