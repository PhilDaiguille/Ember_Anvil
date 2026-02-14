<template>
  <header class="forge-header">
    <div class="header-container">
      <!-- Logo Section -->
      <router-link to="/" class="logo-section">
        <div class="logo-icon">
          <Flame :size="32" :stroke-width="2.5" />
        </div>
        <div class="logo-text">
          <span class="logo-title">Ember Anvil</span>
          <span class="logo-tagline">Forge Virtuelle</span>
        </div>
      </router-link>

      <!-- Navigation -->
      <nav class="main-nav" :class="{ 'nav-open': menuOpen }">
        <ul class="nav-list">
          <li class="nav-item">
            <router-link to="/forge" class="nav-link" @click="closeMenu">
              <Hammer class="nav-icon" :size="20" :stroke-width="2" />
              <span class="nav-text">Forge</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/marche" class="nav-link" @click="closeMenu">
              <Store class="nav-icon" :size="20" :stroke-width="2" />
              <span class="nav-text">Marché</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/codex" class="nav-link" @click="closeMenu">
              <BookOpen class="nav-icon" :size="20" :stroke-width="2" />
              <span class="nav-text">Codex</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/inventaire" class="nav-link" @click="closeMenu">
              <Package class="nav-icon" :size="20" :stroke-width="2" />
              <span class="nav-text">Inventaire</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/atelier" class="nav-link" @click="closeMenu">
              <Wrench class="nav-icon" :size="20" :stroke-width="2" />
              <span class="nav-text">Atelier</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/profil" class="nav-link" @click="closeMenu">
              <User class="nav-icon" :size="20" :stroke-width="2" />
              <span class="nav-text">Profil</span>
            </router-link>
          </li>
        </ul>
      </nav>

      <!-- User Section -->
      <div class="user-section">
        <!-- Écus -->
        <div class="currency-display ecus">
          <Coins class="currency-icon" :size="20" :stroke-width="2" />
          <span class="currency-value">{{ ecus.toLocaleString() }}</span>
        </div>

        <!-- Or (Gold) - Only if > 0 -->
        <div v-if="or > 0" class="currency-display gold">
          <Gem class="currency-icon" :size="20" :stroke-width="2" />
          <span class="currency-value">{{ or.toLocaleString() }}</span>
        </div>

        <!-- Player Level Badge -->
        <div
          class="level-badge"
          @mouseenter="showXpBar = true"
          @mouseleave="showXpBar = false"
        >
          <span class="level-text">Niv. {{ niveau }}</span>

          <!-- XP Progress Bar (shown on hover) -->
          <transition name="xp-slide">
            <div v-if="showXpBar" class="xp-progress-container">
              <div
                class="xp-progress-bar"
                :style="{ width: xpPourcentage + '%' }"
              ></div>
              <span class="xp-text">{{ xp }} / {{ xpRequis }} XP</span>
            </div>
          </transition>
        </div>

        <button class="user-avatar" aria-label="Menu utilisateur">
          <Sword class="avatar-icon" :size="22" :stroke-width="2.5" />
        </button>
      </div>

      <!-- Mobile Menu Toggle -->
      <button
        class="mobile-menu-toggle"
        @click="toggleMenu"
        aria-label="Toggle menu"
      >
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
        <span class="hamburger-line"></span>
      </button>
    </div>
  </header>
</template>

<script>
import { mapState } from "pinia";
import { usePlayerStore } from "@/stores/player";
import {
  Flame,
  Hammer,
  Store,
  BookOpen,
  Package,
  Wrench,
  User,
  Coins,
  Gem,
  Sword,
} from "lucide-vue-next";

export default {
  name: "PageHeader",
  components: {
    Flame,
    Hammer,
    Store,
    BookOpen,
    Package,
    Wrench,
    User,
    Coins,
    Gem,
    Sword,
  },
  data() {
    return {
      menuOpen: false,
      showXpBar: false,
    };
  },
  computed: {
    ...mapState(usePlayerStore, [
      "ecus",
      "or",
      "niveau",
      "experience",
      "experienceMax",
    ]),
    xp() {
      return this.experience;
    },
    xpRequis() {
      return this.experienceMax;
    },
    xpPourcentage() {
      return Math.min((this.xp / this.xpRequis) * 100, 100);
    },
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    closeMenu() {
      this.menuOpen = false;
    },
  },
};
</script>

<style scoped>
.forge-header {
  position: sticky;
  top: 0;
  z-index: 1000;
  background: linear-gradient(
    135deg,
    rgba(26, 22, 18, 0.98),
    rgba(15, 13, 10, 0.98)
  );
  backdrop-filter: blur(12px);
  border-bottom: 2px solid rgba(161, 152, 130, 0.3);
  box-shadow:
    0 4px 24px rgba(0, 0, 0, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
}

.header-container {
  max-width: 1800px;
  margin: 0 auto;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
}

/* Logo Section */
.logo-section {
  display: flex;
  align-items: center;
  gap: 1rem;
  text-decoration: none;
  transition: all 0.3s ease;
  z-index: 1001;
}

.logo-section:hover {
  transform: translateY(-2px);
}

.logo-icon {
  font-size: 2.5rem;
  animation: logoFlame 2s ease-in-out infinite;
}

@keyframes logoFlame {
  0%,
  100% {
    filter: brightness(1);
    transform: scale(1);
  }
  50% {
    filter: brightness(1.3);
    transform: scale(1.05);
  }
}

.logo-text {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

.logo-title {
  font-size: 1.5rem;
  font-weight: 900;
  color: var(--dun);
  font-family: "Caesar Dressing", cursive;
  letter-spacing: 0.02em;
  line-height: 1;
  background: linear-gradient(135deg, var(--dun), rgba(161, 152, 130, 0.8));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.logo-tagline {
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  color: rgba(161, 152, 130, 0.6);
  font-weight: 600;
}

/* Navigation */
.main-nav {
  flex: 1;
  display: flex;
  justify-content: center;
}

.nav-list {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-item {
  position: relative;
}

.nav-link {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.25rem;
  text-decoration: none;
  color: rgba(255, 255, 255, 0.8);
  font-weight: 600;
  font-size: 0.95rem;

  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.nav-link::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    135deg,
    rgba(133, 50, 51, 0.2),
    rgba(50, 93, 68, 0.2)
  );
  opacity: 0;
  transition: opacity 0.3s ease;
}

.nav-link:hover {
  color: white;
  transform: translateY(-2px);
}

.nav-link:hover::before {
  opacity: 1;
}

.nav-link.router-link-active {
  background: linear-gradient(135deg, var(--auburn), rgba(133, 50, 51, 0.8));
  color: white;
  box-shadow:
    0 4px 12px rgba(133, 50, 51, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.nav-link.router-link-active::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  height: 2px;
  background: white;
}

.nav-icon {
  font-size: 1.1rem;
}

.nav-text {
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* User Section */
.user-section {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.currency-display {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid rgba(212, 175, 55, 0.3);
  font-weight: 700;
  font-size: 0.95rem;
  transition: all 0.3s ease;
}

.currency-display.ecus {
  background: linear-gradient(
    135deg,
    rgba(212, 175, 55, 0.15),
    rgba(161, 152, 130, 0.1)
  );
  color: #d4af37;
}

.currency-display.gold {
  background: linear-gradient(
    135deg,
    rgba(255, 128, 0, 0.15),
    rgba(255, 165, 0, 0.1)
  );
  border-color: rgba(255, 128, 0, 0.3);
  color: #ff8c00;
}

.currency-display:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.currency-icon {
  font-size: 1.1rem;
  animation: currencyFloat 2s ease-in-out infinite;
}

@keyframes currencyFloat {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-3px);
  }
}

.level-badge {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, var(--auburn), var(--viridian));
  border: 2px solid rgba(161, 152, 130, 0.4);
  font-weight: 800;
  font-size: 0.9rem;
  color: white;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.level-badge:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
  border-color: var(--dun);
}

.level-text {
  position: relative;
  z-index: 2;
}

.xp-progress-container {
  position: absolute;
  top: calc(100% + 0.5rem);
  right: 0;
  width: 200px;
  background: rgba(25, 25, 25, 0.95);
  border: 2px solid rgba(161, 152, 130, 0.3);
  padding: 0.75rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(10px);
  z-index: 1100;
}

.xp-progress-bar {
  height: 8px;
  background: linear-gradient(90deg, var(--sea-green), var(--viridian));
  transition: width 0.4s ease;
  box-shadow:
    0 0 10px rgba(0, 114, 87, 0.5),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
  position: relative;
  overflow: hidden;
}

.xp-progress-bar::after {
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
  animation: xpShine 2s ease-in-out infinite;
}

@keyframes xpShine {
  0% {
    left: -100%;
  }
  100% {
    left: 100%;
  }
}

.xp-text {
  display: block;
  margin-top: 0.5rem;
  font-size: 0.8rem;
  color: var(--dun);
  text-align: center;
  font-weight: 600;
}

/* XP Bar Transition */
.xp-slide-enter-active,
.xp-slide-leave-active {
  transition: all 0.3s ease;
}

.xp-slide-enter-from {
  opacity: 0;
  transform: translateY(-10px);
}

.xp-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

.user-avatar {
  width: 44px;
  height: 44px;

  background: linear-gradient(135deg, var(--auburn), var(--viridian));
  border: 2px solid rgba(161, 152, 130, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.user-avatar:hover {
  transform: scale(1.1);
  border-color: var(--dun);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.4);
}

.avatar-icon {
  font-size: 1.3rem;
}

/* Mobile Menu Toggle */
.mobile-menu-toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  z-index: 1003;
}

.hamburger-line {
  width: 28px;
  height: 3px;
  background: var(--dun);

  transition: all 0.3s ease;
}

/* Responsive */
@media (max-width: 1200px) {
  .nav-text {
    display: none;
  }

  .nav-link {
    padding: 0.75rem;
  }

  .nav-icon {
    font-size: 1.3rem;
  }
}

@media (max-width: 768px) {
  .header-container {
    padding: 1rem 1.5rem;
  }

  .mobile-menu-toggle {
    display: flex;
  }

  .main-nav {
    position: fixed;
    top: 0;
    right: -100%;
    width: 280px;
    height: 100vh;
    background: linear-gradient(
      135deg,
      rgba(26, 22, 18, 0.98),
      rgba(15, 13, 10, 0.98)
    );
    backdrop-filter: blur(12px);
    padding: 6rem 2rem 2rem;
    transition: right 0.4s ease;
    border-left: 2px solid rgba(161, 152, 130, 0.3);
    box-shadow: -4px 0 24px rgba(0, 0, 0, 0.5);
    z-index: 1002;
  }

  .main-nav.nav-open {
    right: 0;
  }

  .nav-list {
    flex-direction: column;
    align-items: stretch;
    gap: 0.5rem;
  }

  .nav-link {
    justify-content: flex-start;
    padding: 1rem 1.5rem;
  }

  .nav-text {
    display: block;
  }

  .currency-display {
    display: none;
  }

  .level-badge {
    padding: 0.4rem 0.75rem;
    font-size: 0.8rem;
  }

  .xp-progress-container {
    width: 160px;
  }

  .user-avatar {
    width: 40px;
    height: 40px;
  }

  .logo-title {
    font-size: 1.3rem;
  }

  .logo-icon {
    font-size: 2rem;
  }
}

/* Overlay for mobile menu */
@media (max-width: 768px) {
  .main-nav::before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: rgba(0, 0, 0, 0.7);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.4s ease;
  }

  .main-nav.nav-open::before {
    opacity: 1;
    pointer-events: auto;
  }
}
</style>
