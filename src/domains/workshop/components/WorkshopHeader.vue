<script>
import {
  Coins,
  Award,
  TrendingUp,
  Building2,
  Sparkles,
  Wrench,
} from "lucide-vue-next";

export default {
  name: "WorkshopHeader",
  components: { Coins, Award, TrendingUp, Building2, Sparkles, Wrench },
  props: {
    resources: {
      type: Object,
      required: true,
    },
    productiviteGlobale: {
      type: Number,
      required: true,
    },
    bonusActifs: {
      type: Number,
      required: true,
    },
    facilitiesCount: {
      type: Number,
      required: true,
    },
    hasActiveSynergy: {
      type: Boolean,
      required: true,
    },
  },
};
</script>

<template>
  <header class="workshop-header">
    <div class="header-hero">
      <h1 class="page-title">
        <span class="title-decoration">&#9556;&#9552;&#9552;&#9552;</span>
        <span class="title-text">
          <Wrench :size="48" :stroke-width="2" class="title-icon" />
          L'Atelier du Maître
        </span>
        <span class="title-decoration">&#9552;&#9552;&#9552;&#9557;</span>
      </h1>
      <p class="page-description">
        Améliorez vos outils et débloquez de nouvelles installations pour
        devenir le plus grand forgeron du royaume
      </p>
    </div>

    <div class="resources-panel">
      <div class="resource-card">
        <Coins :size="28" :stroke-width="2" class="resource-icon ecus-icon" />
        <div class="resource-info">
          <span class="resource-label">Écus</span>
          <span class="resource-value">{{
            resources.ecus.toLocaleString()
          }}</span>
        </div>
      </div>
      <div class="resource-card">
        <Award :size="28" :stroke-width="2" class="resource-icon gold-icon" />
        <div class="resource-info">
          <span class="resource-label">Or</span>
          <span class="resource-value">{{ resources.or }}</span>
        </div>
      </div>
      <div class="resource-card">
        <TrendingUp
          :size="28"
          :stroke-width="2"
          class="resource-icon exp-icon"
        />
        <div class="resource-info">
          <span class="resource-label">Expérience</span>
          <span class="resource-value">{{ resources.experience }}</span>
        </div>
      </div>
    </div>

    <div class="stats-panel">
      <div class="stat-item">
        <div class="stat-icon-wrapper">
          <TrendingUp :size="32" :stroke-width="2" class="stat-icon" />
        </div>
        <div class="stat-content">
          <span class="stat-label">Productivité Globale</span>
          <span class="stat-value">{{ productiviteGlobale }}%</span>
        </div>
      </div>
      <div class="stat-item">
        <div class="stat-icon-wrapper">
          <Building2 :size="32" :stroke-width="2" class="stat-icon" />
        </div>
        <div class="stat-content">
          <span class="stat-label">Bonus Actifs</span>
          <span class="stat-value"
            >{{ bonusActifs }}/{{ facilitiesCount }}</span
          >
        </div>
      </div>
      <div class="stat-item" :class="{ 'synergy-active': hasActiveSynergy }">
        <div class="stat-icon-wrapper">
          <Sparkles :size="32" :stroke-width="2" class="stat-icon" />
        </div>
        <div class="stat-content">
          <span class="stat-label">Synergie</span>
          <span class="stat-value">{{
            hasActiveSynergy ? "Active" : "Inactive"
          }}</span>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.workshop-header {
  margin-bottom: 4rem;
  text-align: center;
}

.header-hero {
  padding: 3rem 2rem;
  background: linear-gradient(
    135deg,
    rgba(26, 22, 18, 0.8),
    rgba(15, 13, 10, 0.8)
  );
  border: 2px solid rgba(161, 152, 130, 0.3);
  border-radius: 1rem;
  position: relative;
  overflow: hidden;
  margin-bottom: 2rem;
}

.header-hero::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(
    90deg,
    transparent,
    var(--auburn),
    var(--viridian),
    transparent
  );
}

.page-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 900;
  color: var(--dun);
  margin: 0 0 1rem 0;
  font-family: "Georgia", serif;
}

.title-decoration {
  font-size: 0.5em;
  color: var(--auburn);
  opacity: 0.6;
}

.title-text {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.title-icon {
  color: var(--dun);
}

.page-description {
  font-size: 1.1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.75);
  max-width: 800px;
  margin: 0 auto;
}

.resources-panel {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
}

.resource-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: linear-gradient(
    135deg,
    rgba(26, 22, 18, 0.9),
    rgba(15, 13, 10, 0.9)
  );
  border: 2px solid rgba(161, 152, 130, 0.2);
  border-radius: 0.75rem;
  transition: all 0.3s ease;
}

.resource-card:hover {
  border-color: rgba(161, 152, 130, 0.4);
  transform: translateY(-2px);
}

.ecus-icon {
  color: #d4af37;
}

.gold-icon {
  color: #ffd700;
}

.exp-icon {
  color: var(--viridian);
}

.resource-info {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.resource-label {
  font-size: 0.85rem;
  color: rgba(161, 152, 130, 0.7);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 600;
}

.resource-value {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--dun);
}

.stats-panel {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.5rem;
  background: linear-gradient(
    135deg,
    rgba(26, 22, 18, 0.9),
    rgba(15, 13, 10, 0.9)
  );
  border: 2px solid rgba(161, 152, 130, 0.2);
  border-radius: 0.75rem;
  transition: all 0.3s ease;
}

.stat-item:hover {
  border-color: rgba(161, 152, 130, 0.4);
}

.stat-item.synergy-active {
  border-color: rgba(212, 175, 55, 0.5);
  background: linear-gradient(
    135deg,
    rgba(212, 175, 55, 0.1),
    rgba(26, 22, 18, 0.9)
  );
}

.stat-icon-wrapper {
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: radial-gradient(circle, rgba(161, 152, 130, 0.15), transparent);
  border-radius: 0.5rem;
}

.stat-icon {
  color: var(--viridian);
}

.synergy-active .stat-icon {
  color: #d4af37;
}

.stat-content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.stat-label {
  font-size: 0.85rem;
  color: rgba(161, 152, 130, 0.7);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 600;
}

.stat-value {
  font-size: 1.5rem;
  font-weight: 800;
  color: var(--dun);
}

.synergy-active .stat-value {
  color: #d4af37;
}

@media (max-width: 768px) {
  .page-title {
    flex-direction: column;
    gap: 0.5rem;
  }

  .title-decoration {
    display: none;
  }
}
</style>
