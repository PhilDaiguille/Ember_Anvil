<script>
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
} from "lucide-vue-next";

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
  },
  data() {
    return {
      profile: {
        nom: "Thorin Forgepierre",
        titre: "Maître Forgeron",
        niveau: 42,
        experience: 78540,
        experienceMax: 100000,
        avatar: "Swords",
        membre_depuis: "Janvier 2024",
      },
      stats: {
        objets_crees: 487,
        valeur_creations: 125600,
        heures_forge: 156,
        rang_mondial: 284,
        materiel_utilise: 3420,
        recettes_debloquees: 87,
      },
      badges: [
        {
          id: 1,
          nom: "Premier Forgeron",
          description: "Créer votre premier objet",
          icone: "ShieldCheck",
          obtenu: true,
        },
        {
          id: 2,
          nom: "Maître du Fer",
          description: "Forger 100 objets en fer",
          icone: "Settings",
          obtenu: true,
        },
        {
          id: 3,
          nom: "Collectionneur",
          description: "Obtenir 50 matériaux différents",
          icone: "Gem",
          obtenu: true,
        },
        {
          id: 4,
          nom: "Artisan Légendaire",
          description: "Créer un objet légendaire",
          icone: "Crown",
          obtenu: false,
        },
        {
          id: 5,
          nom: "Économiste",
          description: "Amasser 100,000 écus",
          icone: "Coins",
          obtenu: true,
        },
        {
          id: 6,
          nom: "Perfectionniste",
          description: "Créer 10 objets de qualité parfaite",
          icone: "Sparkles",
          obtenu: false,
        },
      ],
      achievements: [
        { nom: "Forge Débutante", valeur: 100, max: 100 },
        { nom: "Maître Artisan", valeur: 487, max: 1000 },
        { nom: "Roi du Commerce", valeur: 68, max: 100 },
        { nom: "Explorateur", valeur: 87, max: 150 },
      ],
    };
  },
  methods: {
    getExperiencePercentage() {
      return (this.profile.experience / this.profile.experienceMax) * 100;
    },
    getAchievementPercentage(achievement) {
      return (achievement.valeur / achievement.max) * 100;
    },
  },
};
</script>

<template>
  <main class="profile-page">
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
                <component
                  :is="profile.avatar"
                  :size="80"
                  :stroke-width="2"
                  class="avatar-icon"
                />
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
                  >{{ profile.experience }} /
                  {{ profile.experienceMax }} XP</span
                >
              </div>
              <div class="exp-bar">
                <div
                  class="exp-fill"
                  :style="{ width: getExperiencePercentage() + '%' }"
                ></div>
              </div>
              <div class="exp-next">
                {{ profile.experienceMax - profile.experience }} XP avant le
                niveau {{ profile.niveau + 1 }}
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
                <div class="stat-value">{{ stats.objets_crees }}</div>
                <div class="stat-label">Objets Créés</div>
              </div>
            </div>

            <div class="stat-item">
              <Coins :size="40" :stroke-width="2" class="stat-icon" />
              <div class="stat-content">
                <div class="stat-value">
                  {{ stats.valeur_creations.toLocaleString() }}
                </div>
                <div class="stat-label">Valeur des Créations</div>
              </div>
            </div>

            <div class="stat-item">
              <Clock :size="40" :stroke-width="2" class="stat-icon" />
              <div class="stat-content">
                <div class="stat-value">{{ stats.heures_forge }}h</div>
                <div class="stat-label">Heures de Forge</div>
              </div>
            </div>

            <div class="stat-item">
              <Trophy :size="40" :stroke-width="2" class="stat-icon" />
              <div class="stat-content">
                <div class="stat-value">#{{ stats.rang_mondial }}</div>
                <div class="stat-label">Rang Mondial</div>
              </div>
            </div>

            <div class="stat-item">
              <Package :size="40" :stroke-width="2" class="stat-icon" />
              <div class="stat-content">
                <div class="stat-value">{{ stats.materiel_utilise }}</div>
                <div class="stat-label">Matériel Utilisé</div>
              </div>
            </div>

            <div class="stat-item">
              <ScrollText :size="40" :stroke-width="2" class="stat-icon" />
              <div class="stat-content">
                <div class="stat-value">{{ stats.recettes_debloquees }}</div>
                <div class="stat-label">Recettes Débloquées</div>
              </div>
            </div>
          </div>
        </section>

        <!-- Badges Section -->
        <section class="badges-section">
          <h2 class="section-title">
            <Medal :size="28" :stroke-width="2" class="title-icon" />
            Badges
          </h2>

          <div class="badges-grid">
            <div
              v-for="badge in badges"
              :key="badge.id"
              class="badge-item"
              :class="{ locked: !badge.obtenu }"
            >
              <component
                :is="badge.icone"
                :size="40"
                :stroke-width="2"
                class="badge-icon"
              />
              <div class="badge-info">
                <h3 class="badge-name">{{ badge.nom }}</h3>
                <p class="badge-description">{{ badge.description }}</p>
              </div>
              <Lock
                v-if="!badge.obtenu"
                :size="24"
                :stroke-width="2"
                class="badge-lock"
              />
            </div>
          </div>
        </section>
      </div>

      <!-- Achievements Section -->
      <section class="achievements-section">
        <h2 class="section-title">
          <Target :size="28" :stroke-width="2" class="title-icon" />
          Progression des Succès
        </h2>

        <div class="achievements-grid">
          <div
            v-for="(achievement, index) in achievements"
            :key="index"
            class="achievement-item"
          >
            <div class="achievement-header">
              <span class="achievement-name">{{ achievement.nom }}</span>
              <span class="achievement-progress"
                >{{ achievement.valeur }}/{{ achievement.max }}</span
              >
            </div>
            <div class="achievement-bar">
              <div
                class="achievement-fill"
                :style="{ width: getAchievementPercentage(achievement) + '%' }"
              ></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<style scoped>
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
  background: linear-gradient(
    135deg,
    rgba(26, 22, 18, 0.95),
    rgba(15, 13, 10, 0.95)
  );
  border: 2px solid rgba(161, 152, 130, 0.3);
  border-radius: 1.5rem;
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
  border-radius: 50%;
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
  border-radius: 50%;
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
  border-radius: 16px;
  overflow: hidden;
  border: 2px solid rgba(161, 152, 130, 0.2);
  margin-bottom: 0.5rem;
}

.exp-fill {
  height: 100%;
  background: linear-gradient(90deg, #d4af37, #f4e5c3);
  border-radius: 16px;
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
  background: linear-gradient(
    135deg,
    rgba(26, 22, 18, 0.95),
    rgba(15, 13, 10, 0.95)
  );
  border: 2px solid rgba(161, 152, 130, 0.2);
  border-radius: 1.25rem;
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
  border-radius: 0.75rem;
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
  background: linear-gradient(
    135deg,
    rgba(26, 22, 18, 0.95),
    rgba(15, 13, 10, 0.95)
  );
  border: 2px solid rgba(161, 152, 130, 0.2);
  border-radius: 1.25rem;
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
  border-radius: 0.75rem;
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

/* Achievements Section */
.achievements-section {
  background: linear-gradient(
    135deg,
    rgba(26, 22, 18, 0.95),
    rgba(15, 13, 10, 0.95)
  );
  border: 2px solid rgba(161, 152, 130, 0.2);
  border-radius: 1.25rem;
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
  border-radius: 0.75rem;
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
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid rgba(161, 152, 130, 0.2);
}

.achievement-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--viridian), var(--sea-green));
  border-radius: 6px;
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
