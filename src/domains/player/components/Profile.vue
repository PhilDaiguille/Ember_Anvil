<script>
import { mapState, mapGetters, mapActions } from "pinia";
import { usePlayerStore } from "@/stores/player";
import { useGameStore } from "@/stores/game";
import { usePrestigeStore } from "@/stores/prestige";
import { useCraftingStore } from "@/stores/crafting";
import { getRecipeById } from "@/data/recipes";
import {
  Swords,
  Calendar,
  BarChart3,
  Hammer,
  Coins,
  Clock,
  Trophy,
  Package,
  ScrollText,
  Medal,
  ShieldCheck,
  Settings,
  Gem,
  Crown,
  Target,
  Sparkles,
  Lock,
  CheckCircle,
  ShoppingCart,
  BookOpen,
  Award,
  TrendingUp,
  Wrench,
  Zap,
  Star,
  Flame,
} from "@lucide/vue";

export default {
  name: "ProfileComponent",
  components: {
    Swords,
    Calendar,
    BarChart3,
    Hammer,
    Coins,
    Clock,
    Trophy,
    Package,
    ScrollText,
    Medal,
    ShieldCheck,
    Settings,
    Gem,
    Crown,
    Target,
    Sparkles,
    Lock,
    CheckCircle,
    Flame,
  },
  data() {
    return {
      selectedAchievementCategory: "all",
    };
  },
  computed: {
    ...mapState(usePlayerStore, [
      "nom",
      "titre",
      "niveau",
      "experience",
      "experienceMax",
      "avatar",
      "membreDepuis",
      "stats",
      "ecus",
      "or",
    ]),
    ...mapGetters(usePlayerStore, ["progressionNiveau", "niveauSuivant", "titreActuel"]),
    ...mapState(useGameStore, ["achievementsProgress"]),
    ...mapGetters(useGameStore, [
      "allAchievementsWithStatus",
      "achievementsDebloquesCount",
      "totalAchievements",
    ]),

    // Profile pour le template
    profile() {
      return {
        nom: this.nom,
        titre: this.titre,
        niveau: this.niveau,
        experience: this.experience,
        experienceMax: this.experienceMax,
        avatar: "Swords",
        membre_depuis: this.formatMembreDepuis(),
      };
    },

    // Stats pour le template avec formatage
    statsFormatted() {
      return {
        objets_crees: this.stats.objetsCrees,
        valeur_creations: this.stats.valeurCreations,
        heures_forge: Math.floor(this.stats.heuresJeu),
        rang_mondial: this.stats.rangMondial,
        materiel_utilise: this.stats.materielUtilise,
        recettes_debloquees: this.stats.recettesDebloquees,
      };
    },

    // Achievements filtrés par catégorie
    filteredAchievements() {
      if (this.selectedAchievementCategory === "all") {
        return this.allAchievementsWithStatus;
      }
      return this.allAchievementsWithStatus.filter(
        (a) => a.categorie === this.selectedAchievementCategory,
      );
    },

    // Badges (alias pour compatibilité template)
    badgesWithStatus() {
      return this.allAchievementsWithStatus;
    },

    // ===== Statistiques de forge =====
    topRecettes() {
      const stats = useCraftingStore().stats.recettesFavorites || {};
      const entrees = Object.entries(stats)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);
      const max = entrees.length ? entrees[0][1] : 1;
      return entrees.map(([id, count]) => ({
        nom: getRecipeById(id)?.nom ?? id,
        count,
        pct: Math.round((count / max) * 100),
      }));
    },
    distributionQualite() {
      const historique = useCraftingStore().historique || [];
      const counts = [0, 0, 0, 0, 0];
      for (const h of historique) {
        if (h.qualite >= 1 && h.qualite <= 5) counts[h.qualite - 1]++;
      }
      const max = Math.max(1, ...counts);
      return counts.map((c, i) => ({ qualite: i + 1, count: c, pct: Math.round((c / max) * 100) }));
    },

    // ===== Prestige =====
    ...mapState(usePrestigeStore, ["essence", "renaissances", "bonus"]),
    prestige() {
      const p = usePrestigeStore();
      return {
        essenceGagnable: p.essenceGagnable(this.niveau),
        peutRenaitre: p.peutRenaitre(this.niveau),
        bonusVitesse: Math.round((1 - p.multiplicateurVitesse) * 100),
        bonusQualite: p.bonusQualite,
        bonusGain: Math.round((p.multiplicateurGain - 1) * 100),
        coutVitesse: p.coutBonus("vitesse"),
        coutQualite: p.coutBonus("qualite"),
        coutGain: p.coutBonus("gain"),
      };
    },
  },
  methods: {
    ...mapActions(usePrestigeStore, ["renaitre", "ameliorerBonus"]),
    confirmerRenaissance() {
      if (!this.prestige.peutRenaitre) return;
      const ok = window.confirm(
        `Renaître réinitialise votre niveau, vos écus et votre inventaire, mais vous gagnez ${this.prestige.essenceGagnable} essence et conservez vos bonus permanents. Continuer ?`,
      );
      if (ok) this.renaitre();
    },
    formatMembreDepuis() {
      if (!this.membreDepuis) return "Récemment";
      const date = new Date(this.membreDepuis);
      const options = { year: "numeric", month: "long" };
      return date.toLocaleDateString("fr-FR", options);
    },
    getExperiencePercentage() {
      return this.progressionNiveau;
    },
    getAchievementIcon(iconName) {
      const iconMap = {
        Hammer,
        Crown,
        Star,
        Sparkles,
        TrendingUp,
        ShoppingCart,
        Coins,
        Gem,
        Wrench,
        Award,
        Zap,
        Target,
        CheckCircle,
        BookOpen,
        ScrollText,
      };
      return iconMap[iconName] || Trophy;
    },
  },
};
</script>

<template>
  <main class="profile-page" id="main-content" aria-label="Profil du joueur">
    <div class="profile-container">
      <!-- Profile Header Card -->
      <section class="profile-header-card">
        <div class="profile-banner">
          <div class="banner-decoration"></div>
        </div>

        <div class="profile-main">
          <div class="avatar-section">
            <div class="avatar-wrapper">
              <div class="avatar-circle">
                <component :is="profile.avatar" :size="80" :stroke-width="2" class="avatar-icon" />
              </div>
              <div class="avatar-level">{{ profile.niveau }}</div>
            </div>
          </div>

          <div class="profile-info">
            <h1 class="profile-name">{{ profile.nom }}</h1>
            <p class="profile-title">{{ profile.titre }}</p>
            <div class="profile-meta">
              <span class="meta-item">
                <Calendar :size="18" :stroke-width="2" class="meta-icon" />
                Membre depuis {{ profile.membre_depuis }}
              </span>
            </div>

            <div class="experience-section">
              <div class="exp-header">
                <span class="exp-label">Expérience</span>
                <span class="exp-value"
                  >{{ profile.experience }} / {{ profile.experienceMax }} XP</span
                >
              </div>
              <div class="exp-bar">
                <div class="exp-fill" :style="{ width: getExperiencePercentage() + '%' }"></div>
              </div>
              <div class="exp-next">
                {{ profile.experienceMax - profile.experience }} XP avant le niveau
                {{ profile.niveau + 1 }}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div class="profile-content-grid">
        <!-- Stats Section -->
        <section class="stats-section">
          <h2 class="section-title">
            <BarChart3 :size="28" :stroke-width="2" class="title-icon" />
            Statistiques
          </h2>

          <div class="stats-grid">
            <div class="stat-item">
              <Hammer :size="40" :stroke-width="2" class="stat-icon" />
              <div class="stat-content">
                <div class="stat-value">{{ statsFormatted.objets_crees }}</div>
                <div class="stat-label">Objets Créés</div>
              </div>
            </div>

            <div class="stat-item">
              <Coins :size="40" :stroke-width="2" class="stat-icon" />
              <div class="stat-content">
                <div class="stat-value">
                  {{ statsFormatted.valeur_creations.toLocaleString() }}
                </div>
                <div class="stat-label">Valeur des Créations</div>
              </div>
            </div>

            <div class="stat-item">
              <Clock :size="40" :stroke-width="2" class="stat-icon" />
              <div class="stat-content">
                <div class="stat-value">{{ statsFormatted.heures_forge }}h</div>
                <div class="stat-label">Heures de Forge</div>
              </div>
            </div>

            <div class="stat-item">
              <Trophy :size="40" :stroke-width="2" class="stat-icon" />
              <div class="stat-content">
                <div class="stat-value">#{{ statsFormatted.rang_mondial }}</div>
                <div class="stat-label">Rang Mondial</div>
              </div>
            </div>

            <div class="stat-item">
              <Package :size="40" :stroke-width="2" class="stat-icon" />
              <div class="stat-content">
                <div class="stat-value">
                  {{ statsFormatted.materiel_utilise }}
                </div>
                <div class="stat-label">Matériel Utilisé</div>
              </div>
            </div>

            <div class="stat-item">
              <ScrollText :size="40" :stroke-width="2" class="stat-icon" />
              <div class="stat-content">
                <div class="stat-value">
                  {{ statsFormatted.recettes_debloquees }}
                </div>
                <div class="stat-label">Recettes Débloquées</div>
              </div>
            </div>
          </div>
        </section>

        <!-- Badges Section -->
        <section class="badges-section">
          <h2 class="section-title">
            <Medal :size="28" :stroke-width="2" class="title-icon" />
            Succès ({{ achievementsDebloquesCount }}/{{ totalAchievements }})
          </h2>

          <div class="badges-grid">
            <div
              v-for="badge in badgesWithStatus"
              :key="badge.id"
              class="badge-item"
              :class="{ locked: !badge.unlocked }"
            >
              <component
                :is="getAchievementIcon(badge.icone)"
                :size="40"
                :stroke-width="2"
                class="badge-icon"
              />
              <div class="badge-info">
                <h3 class="badge-name">{{ badge.nom }}</h3>
                <p class="badge-description">{{ badge.description }}</p>
              </div>
              <Lock v-if="!badge.unlocked" :size="24" :stroke-width="2" class="badge-lock" />
              <CheckCircle v-else :size="24" :stroke-width="2" class="badge-check" />
            </div>
          </div>
        </section>
      </div>

      <!-- Progression Section -->
      <section class="achievements-section">
        <h2 class="section-title">
          <Target :size="28" :stroke-width="2" class="title-icon" />
          Progression des Succès
        </h2>

        <div class="progress-overview">
          <div class="progress-ring">
            <span class="progress-value">{{ achievementsProgress }}%</span>
          </div>
          <p class="progress-text">
            {{ achievementsDebloquesCount }} succès débloqués sur
            {{ totalAchievements }}
          </p>
        </div>
      </section>

      <!-- Statistiques de forge -->
      <section class="forgestats-section">
        <h2 class="section-title">
          <BarChart3 :size="28" :stroke-width="2" class="title-icon" />
          Statistiques de Forge
        </h2>

        <div class="forgestats-grid">
          <div class="forgestats-block">
            <h3 class="forgestats-subtitle">Recettes favorites</h3>
            <p v-if="topRecettes.length === 0" class="forgestats-empty">
              Aucune forge pour l'instant.
            </p>
            <div v-for="r in topRecettes" :key="r.nom" class="bar-row">
              <span class="bar-label">{{ r.nom }}</span>
              <div class="bar-track">
                <div class="bar-fill" :style="{ width: r.pct + '%' }"></div>
              </div>
              <span class="bar-count">{{ r.count }}</span>
            </div>
          </div>

          <div class="forgestats-block">
            <h3 class="forgestats-subtitle">Répartition des qualités</h3>
            <div v-for="q in distributionQualite" :key="q.qualite" class="bar-row">
              <span class="bar-label">{{ "⭐".repeat(q.qualite) }}</span>
              <div class="bar-track">
                <div class="bar-fill bar-fill-gold" :style="{ width: q.pct + '%' }"></div>
              </div>
              <span class="bar-count">{{ q.count }}</span>
            </div>
          </div>
        </div>
      </section>

      <!-- Prestige Section -->
      <section class="prestige-section">
        <h2 class="section-title">
          <Flame :size="28" :stroke-width="2" class="title-icon" />
          Renaissance de la Forge
        </h2>

        <div class="prestige-overview">
          <div class="prestige-stat">
            <div class="prestige-value">{{ essence }}</div>
            <div class="prestige-label">Essence</div>
          </div>
          <div class="prestige-stat">
            <div class="prestige-value">{{ renaissances }}</div>
            <div class="prestige-label">Renaissances</div>
          </div>
        </div>

        <p class="prestige-text">
          Recommencez à zéro (niveau, écus, inventaire) pour gagner de l'essence et acheter des
          bonus permanents. Renaissance possible dès le niveau 20.
        </p>

        <button
          class="prestige-btn"
          :disabled="!prestige.peutRenaitre"
          @click="confirmerRenaissance"
        >
          {{
            prestige.peutRenaitre
              ? `Renaître (+${prestige.essenceGagnable} essence)`
              : "Niveau 20 requis"
          }}
        </button>

        <div class="prestige-bonuses">
          <div class="prestige-bonus">
            <span class="bonus-name">⚡ Vitesse de forge −{{ prestige.bonusVitesse }}%</span>
            <button
              class="bonus-btn"
              :disabled="essence < prestige.coutVitesse"
              @click="ameliorerBonus('vitesse')"
            >
              {{ prestige.coutVitesse }} essence
            </button>
          </div>
          <div class="prestige-bonus">
            <span class="bonus-name">⭐ Qualité +{{ prestige.bonusQualite }}</span>
            <button
              class="bonus-btn"
              :disabled="essence < prestige.coutQualite"
              @click="ameliorerBonus('qualite')"
            >
              {{ prestige.coutQualite }} essence
            </button>
          </div>
          <div class="prestige-bonus">
            <span class="bonus-name">💰 Rentabilité +{{ prestige.bonusGain }}%</span>
            <button
              class="bonus-btn"
              :disabled="essence < prestige.coutGain"
              @click="ameliorerBonus('gain')"
            >
              {{ prestige.coutGain }} essence
            </button>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<style scoped>
.forgestats-section {
  margin-top: 2rem;
  padding: 2rem;
  background: linear-gradient(135deg, rgba(50, 93, 68, 0.1), rgba(25, 25, 25, 0.4));
  border: 2px solid rgba(0, 114, 87, 0.25);
}

.forgestats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 1rem;
}

.forgestats-subtitle {
  font-size: 1rem;
  font-weight: 700;
  color: var(--dun);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0 0 1rem 0;
}

.forgestats-empty {
  color: rgba(161, 152, 130, 0.7);
}

.bar-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.6rem;
}

.bar-label {
  flex: 0 0 40%;
  font-size: 0.85rem;
  color: white;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.bar-track {
  flex: 1;
  height: 12px;
  background: rgba(25, 25, 25, 0.8);
  border: 1px solid rgba(161, 152, 130, 0.2);
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--sea-green), var(--viridian));
  transition: width var(--t-base) ease;
}

.bar-fill-gold {
  background: linear-gradient(90deg, #ff6420, #ffed4e);
}

.bar-count {
  flex: 0 0 auto;
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--dun);
  min-width: 1.5rem;
  text-align: right;
}

.prestige-section {
  margin-top: 2rem;
  padding: 2rem;
  background: linear-gradient(135deg, rgba(255, 100, 32, 0.08), rgba(25, 25, 25, 0.4));
  border: 2px solid rgba(255, 100, 32, 0.3);
}

.prestige-overview {
  display: flex;
  gap: 2rem;
  margin: 1rem 0;
}

.prestige-stat {
  text-align: center;
}

.prestige-value {
  font-size: 2.5rem;
  font-weight: 900;
  color: #ff6420;
  font-family: "Impact", sans-serif;
}

.prestige-label {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--dun);
}

.prestige-text {
  color: rgba(161, 152, 130, 0.85);
  line-height: 1.6;
  max-width: 60ch;
  margin: 0 0 1.5rem 0;
}

.prestige-btn {
  padding: 1rem 2rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: white;
  background: linear-gradient(135deg, #ff6420, #942525);
  border: none;
  cursor: pointer;
  transition: transform var(--t-fast) ease;
}

.prestige-btn:hover:not(:disabled) {
  transform: translateY(-2px);
}

.prestige-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.prestige-bonuses {
  display: grid;
  gap: 0.75rem;
  margin-top: 1.5rem;
}

.prestige-bonus {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.75rem 1rem;
  background: rgba(25, 25, 25, 0.5);
  border: 1px solid rgba(161, 152, 130, 0.2);
}

.bonus-name {
  font-weight: 600;
  color: white;
}

.bonus-btn {
  padding: 0.5rem 1rem;
  font-weight: 700;
  color: white;
  background: linear-gradient(135deg, var(--sea-green), var(--viridian));
  border: none;
  cursor: pointer;
  transition: transform var(--t-fast) ease;
}

.bonus-btn:hover:not(:disabled) {
  transform: translateY(-2px);
}

.bonus-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.profile-page {
  min-height: 95dvh;
  background: linear-gradient(135deg, #0d0a08 0%, #1a1410 50%, #0f0d0a 100%);
  padding: 2rem;
}

.profile-container {
  max-width: 1400px;
  margin: 0 auto;
}

/* Profile Header Card */
.profile-header-card {
  background: linear-gradient(135deg, rgba(26, 22, 18, 0.95), rgba(15, 13, 10, 0.95));
  border: 2px solid rgba(161, 152, 130, 0.3);

  overflow: hidden;
  margin-bottom: 3rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.5);
}

.profile-banner {
  height: 160px;
  background: linear-gradient(135deg, var(--auburn) 0%, var(--viridian) 100%);
  position: relative;
  overflow: hidden;
}

.banner-decoration {
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(
    45deg,
    transparent,
    transparent 20px,
    rgba(0, 0, 0, 0.1) 20px,
    rgba(0, 0, 0, 0.1) 40px
  );
}

.profile-main {
  padding: 0 3rem 3rem;
  position: relative;
}

.avatar-section {
  display: flex;
  justify-content: center;
  margin-top: -80px;
  margin-bottom: 2rem;
}

.avatar-wrapper {
  position: relative;
}

.avatar-circle {
  width: 160px;
  height: 160px;

  background: linear-gradient(135deg, var(--auburn), var(--viridian));
  border: 6px solid rgba(26, 22, 18, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.5),
    inset 0 2px 8px rgba(255, 255, 255, 0.1);
}

.avatar-icon {
  color: white;
}

.avatar-level {
  position: absolute;
  bottom: 0;
  right: -10px;
  width: 50px;
  height: 50px;

  background: var(--auburn);
  border: 4px solid rgba(26, 22, 18, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  font-weight: 900;
  color: white;
  font-family: "Georgia", serif;
  box-shadow: 0 4px 16px rgba(133, 50, 51, 0.5);
}

.profile-info {
  text-align: center;
}

.profile-name {
  font-size: 2.5rem;
  font-weight: 900;
  color: var(--dun);
  margin: 0 0 0.5rem 0;
  font-family: "Georgia", serif;
}

.profile-title {
  font-size: 1.25rem;
  color: var(--auburn);
  margin: 0 0 1rem 0;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.profile-meta {
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: rgba(161, 152, 130, 0.8);
  font-size: 0.95rem;
}

.meta-icon {
  color: var(--dun);
}

/* Experience Section */
.experience-section {
  max-width: 600px;
  margin: 0 auto;
}

.exp-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.exp-label {
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(161, 152, 130, 0.7);
  font-weight: 600;
}

.exp-value {
  font-size: 1rem;
  font-weight: 700;
  color: var(--dun);
}

.exp-bar {
  height: 32px;
  background: rgba(25, 25, 25, 0.8);

  overflow: hidden;
  border: 2px solid rgba(161, 152, 130, 0.2);
  margin-bottom: 0.5rem;
}

.exp-fill {
  height: 100%;
  background: linear-gradient(90deg, #d4af37, #f4e5c3);

  transition: width 0.5s ease;
  box-shadow: 0 0 16px rgba(212, 175, 55, 0.6);
}

.exp-next {
  text-align: center;
  font-size: 0.85rem;
  color: rgba(161, 152, 130, 0.7);
  font-style: italic;
}

/* Content Grid */
.profile-content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 3rem;
}

@media (max-width: 1024px) {
  .profile-content-grid {
    grid-template-columns: 1fr;
  }
}

/* Section Title */
.section-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.75rem;
  font-weight: 800;
  color: var(--dun);
  margin: 0 0 1.5rem 0;
  font-family: "Georgia", serif;
}

.title-icon {
  color: var(--auburn);
}

/* Stats Section */
.stats-section {
  background: linear-gradient(135deg, rgba(26, 22, 18, 0.95), rgba(15, 13, 10, 0.95));
  border: 2px solid rgba(161, 152, 130, 0.2);

  padding: 2rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.25rem;
  background: rgba(25, 25, 25, 0.5);

  border: 1px solid rgba(161, 152, 130, 0.15);
  transition: all 0.3s ease;
}

.stat-item:hover {
  background: rgba(25, 25, 25, 0.7);
  border-color: rgba(161, 152, 130, 0.3);
  transform: translateY(-2px);
}

.stat-icon {
  color: var(--viridian);
  flex-shrink: 0;
}

.stat-content {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.stat-value {
  font-size: 1.75rem;
  font-weight: 900;
  color: var(--dun);
  font-family: "Georgia", serif;
  line-height: 1;
}

.stat-label {
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgba(161, 152, 130, 0.7);
  font-weight: 600;
}

/* Badges Section */
.badges-section {
  background: linear-gradient(135deg, rgba(26, 22, 18, 0.95), rgba(15, 13, 10, 0.95));
  border: 2px solid rgba(161, 152, 130, 0.2);

  padding: 2rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
}

.badges-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.badge-item {
  display: flex;
  align-items: center;
  gap: 1.25rem;
  padding: 1.25rem;
  background: rgba(25, 25, 25, 0.5);

  border: 1px solid rgba(161, 152, 130, 0.15);
  position: relative;
  transition: all 0.3s ease;
}

.badge-item:not(.locked):hover {
  background: rgba(25, 25, 25, 0.7);
  border-color: var(--sea-green);
  transform: translateX(4px);
}

.badge-item.locked {
  opacity: 0.5;
  filter: grayscale(0.7);
}

.badge-icon {
  color: #d4af37;
  flex-shrink: 0;
}

.badge-item.locked .badge-icon {
  color: rgba(161, 152, 130, 0.5);
}

.badge-info {
  flex: 1;
}

.badge-name {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--dun);
  margin: 0 0 0.25rem 0;
}

.badge-description {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.7);
  margin: 0;
}

.badge-lock {
  color: rgba(161, 152, 130, 0.5);
  opacity: 0.5;
}

.badge-check {
  color: var(--sea-green);
}

/* Progress Overview */
.progress-overview {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
}

.progress-ring {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 4px solid rgba(161, 152, 130, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(0, 114, 87, 0.1), rgba(50, 93, 68, 0.05));
}

.progress-value {
  font-size: 1.75rem;
  font-weight: 700;
  color: var(--sea-green);
  font-family: "Georgia", serif;
}

.progress-text {
  color: var(--dun);
  font-size: 0.95rem;
}

/* Achievements Section */
.achievements-section {
  background: linear-gradient(135deg, rgba(26, 22, 18, 0.95), rgba(15, 13, 10, 0.95));
  border: 2px solid rgba(161, 152, 130, 0.2);

  padding: 2rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
}

.achievements-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}

.achievement-item {
  padding: 1.25rem;
  background: rgba(25, 25, 25, 0.5);

  border: 1px solid rgba(161, 152, 130, 0.15);
}

.achievement-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.75rem;
}

.achievement-name {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--dun);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.achievement-progress {
  font-size: 0.9rem;
  font-weight: 700;
  color: rgba(161, 152, 130, 0.8);
  font-family: "Georgia", serif;
}

.achievement-bar {
  height: 12px;
  background: rgba(25, 25, 25, 0.8);

  overflow: hidden;
  border: 1px solid rgba(161, 152, 130, 0.2);
}

.achievement-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--viridian), var(--sea-green));

  transition: width 0.5s ease;
}

/* Responsive */
@media (max-width: 768px) {
  .profile-main {
    padding: 0 1.5rem 2rem;
  }

  .profile-name {
    font-size: 2rem;
  }

  .stats-grid,
  .achievements-grid {
    grid-template-columns: 1fr;
  }

  .avatar-circle {
    width: 120px;
    height: 120px;
  }

  .avatar-icon {
    color: white;
  }
}
</style>
