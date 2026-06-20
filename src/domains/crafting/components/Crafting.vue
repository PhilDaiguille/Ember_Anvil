<script>
import { mapState, mapActions, mapGetters } from "pinia";
import { useCraftingStore } from "@/stores/crafting";
import { usePlayerStore } from "@/stores/player";
import { useInventoryStore } from "@/stores/inventory";
import { useGameStore } from "@/stores/game";
import { getRecipesByCategorie } from "@/data/recipes";
import { getRarityClass, getRarityLabel } from "@/shared/utils/rarity";
import { getMaterialNom, peutCrafter } from "@/shared/utils/craftingHelpers";

import CategoryBar from "./CategoryBar.vue";
import RecipeList from "./RecipeList.vue";
import ForgeStation from "./ForgeStation.vue";
import CraftingHistory from "./CraftingHistory.vue";
import OrdersPanel from "./OrdersPanel.vue";
import EventBanner from "./EventBanner.vue";

export default {
  name: "CraftingComponent",
  components: {
    CategoryBar,
    RecipeList,
    ForgeStation,
    CraftingHistory,
    OrdersPanel,
    EventBanner,
  },
  data() {
    return {
      categorieSelectionnee: "arme",
      recetteSelectionnee: null,
      sparks: [],
      sparkTimeoutId: null,
    };
  },
  computed: {
    ...mapState(useCraftingStore, [
      "estEnCoursDeForge",
      "recetteEnCours",
      "progressionForge",
      "coupsReussis",
      "coupsTentes",
    ]),
    ...mapGetters(useCraftingStore, ["tempsRestant", "historiqueRecent"]),
    ...mapState(usePlayerStore, ["niveau"]),
    ...mapState(useGameStore, ["onboardingVu"]),

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

    categorieNom() {
      const cat = this.categoriesDisponibles.find((c) => c.id === this.categorieSelectionnee);
      return cat ? cat.nom : "";
    },

    totalObjetsForges() {
      const craftingStore = useCraftingStore();
      return craftingStore.stats.totalObjetsForges;
    },
  },
  methods: {
    ...mapActions(useCraftingStore, ["demarrerForge", "annulerForge", "enregistrerCoup"]),
    ...mapActions(useGameStore, ["marquerOnboardingVu"]),

    getRarityClass,
    getRarityLabel,
    getMaterialNom,

    peutCrafter(recipe) {
      return peutCrafter(recipe, this.niveau, useInventoryStore());
    },

    selectionnerCategorie(categorieId) {
      this.categorieSelectionnee = categorieId;
      this.recetteSelectionnee = null;
    },

    selectionnerRecette(recipe) {
      this.recetteSelectionnee = recipe;
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
        this._sparkTimeoutId = setTimeout(() => this.genererEtincelles(), 400);
      }
    },
  },

  beforeUnmount() {
    if (this._sparkTimeoutId !== null) {
      clearTimeout(this._sparkTimeoutId);
      this._sparkTimeoutId = null;
    }
  },
};
</script>

<template>
  <main class="forge-workshop" id="main-content" aria-label="Forge - Création d'objets">
    <div class="forge-container">
      <div v-if="!onboardingVu" class="onboarding-banner">
        <div class="onboarding-text">
          <strong>Bienvenue à la forge !</strong>
          Achetez des matériaux au Marché, sélectionnez une recette, puis forgez. Réussissez les
          frappes parfaites pour améliorer la qualité, et honorez les commandes clients pour des
          récompenses bonus.
        </div>
        <div class="onboarding-actions">
          <RouterLink to="/guides/debuter-dans-la-forge" class="onboarding-link"
            >Guide débutant</RouterLink
          >
          <button class="onboarding-close" @click="marquerOnboardingVu">Compris</button>
        </div>
      </div>

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

      <EventBanner />

      <CategoryBar
        :categories="categoriesDisponibles"
        :selected="categorieSelectionnee"
        @select="selectionnerCategorie"
      />

      <div class="forge-content">
        <RecipeList
          :recipes="recettesFiltrees"
          :selected="recetteSelectionnee"
          :category-name="categorieNom"
          :player-level="niveau"
          @select="selectionnerRecette"
        />

        <ForgeStation
          :est-en-cours-de-forge="estEnCoursDeForge"
          :recette-selectionnee="recetteSelectionnee"
          :recette-en-cours="recetteEnCours"
          :progression-forge="progressionForge"
          :temps-restant="tempsRestant"
          :sparks="sparks"
          :coups-reussis="coupsReussis"
          :coups-tentes="coupsTentes"
          @forge="commencerForge"
          @cancel="annulerForge"
          @strike="enregistrerCoup"
        />
      </div>

      <OrdersPanel />

      <CraftingHistory :historique-recent="historiqueRecent" />
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
    radial-gradient(circle at 30% 50%, rgba(255, 100, 30, 0.03) 0%, transparent 50%),
    radial-gradient(circle at 70% 60%, rgba(255, 80, 20, 0.02) 0%, transparent 40%);
  pointer-events: none;
}

.forge-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 3rem 2rem;
  position: relative;
  z-index: 1;
}

.onboarding-banner {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1.5rem;
  flex-wrap: wrap;
  padding: 1.25rem 1.5rem;
  margin-bottom: 2rem;
  background: linear-gradient(135deg, rgba(0, 114, 87, 0.18), rgba(25, 25, 25, 0.5));
  border: 2px solid rgba(0, 114, 87, 0.4);
}

.onboarding-text {
  color: rgba(255, 255, 255, 0.85);
  line-height: 1.5;
  flex: 1;
  min-width: 280px;
}

.onboarding-text strong {
  color: #ffed4e;
}

.onboarding-actions {
  display: flex;
  gap: 0.75rem;
  align-items: center;
}

.onboarding-link {
  color: var(--dun);
  text-decoration: underline;
  font-weight: 600;
}

.onboarding-close {
  padding: 0.6rem 1.25rem;
  font-weight: 700;
  color: white;
  background: linear-gradient(135deg, var(--sea-green), var(--viridian));
  border: none;
  cursor: pointer;
  transition: transform var(--t-fast) ease;
}

.onboarding-close:hover {
  transform: translateY(-2px);
}

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
}

.subtitle {
  font-size: 1.1rem;
  color: var(--dun);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  font-weight: 300;
}

.craft-counter {
  background: linear-gradient(135deg, rgba(50, 93, 68, 0.2), rgba(25, 25, 25, 0.4));
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

@media (max-width: 768px) {
  .forge-container {
    padding: 2rem 1rem;
  }

  .forge-header {
    margin-bottom: 2rem;
  }
}
</style>
