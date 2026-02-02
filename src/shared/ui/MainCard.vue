<template>
  <article class="codex-entry" :data-index="index">
    <div class="entry-header">
      <div class="entry-number">
        <span class="number-prefix">N°</span>
        <span class="number-value">{{
          String(index + 1).padStart(2, "0")
        }}</span>
      </div>
      <div class="entry-category">
        <FlaskConical :size="16" :stroke-width="2" class="category-icon" />
        <span class="category-text">Métal {{ getRarity(item.nom) }}</span>
      </div>
    </div>

    <div class="entry-body">
      <div class="entry-visual">
        <div class="visual-frame">
          <div class="frame-corner tl"></div>
          <div class="frame-corner tr"></div>
          <div class="frame-corner bl"></div>
          <div class="frame-corner br"></div>

          <div class="image-wrapper">
            <div class="image-glow"></div>
            <img :src="item.image" :alt="item.nom" class="entry-image" />
          </div>
        </div>

        <div class="visual-label">Spécimen Authentifié</div>
      </div>

      <div class="entry-content">
        <div class="content-header">
          <h2 class="entry-title">{{ item.nom }}</h2>
          <div class="title-underline">
            <div class="underline-ornament">◆</div>
          </div>
        </div>

        <div class="content-body">
          <div class="classification-block">
            <div class="classification-item">
              <span class="class-label">Origine</span>
              <span class="class-value">{{ getOrigin(item.nom) }}</span>
            </div>
            <div class="classification-item">
              <span class="class-label">État</span>
              <span class="class-value">Solide Métallique</span>
            </div>
            <div class="classification-item">
              <span class="class-label">Disponibilité</span>
              <span class="class-value">{{ getAvailability(item.nom) }}</span>
            </div>
          </div>

          <div class="description-section">
            <h3 class="section-title">
              <ScrollText :size="20" :stroke-width="2" class="section-icon" />
              Description Alchimique
            </h3>
            <p class="entry-description">{{ item.description }}</p>
          </div>

          <div class="properties-section">
            <h3 class="section-title">
              <Scale :size="20" :stroke-width="2" class="section-icon" />
              Propriétés & Applications
            </h3>
            <div class="properties-grid">
              <div class="property-card">
                <Flame :size="28" :stroke-width="2" class="prop-icon" />
                <div class="prop-text">
                  <div class="prop-label">Résistance</div>
                  <div class="prop-value">{{ getResistance(item.nom) }}</div>
                </div>
              </div>
              <div class="property-card">
                <Zap :size="28" :stroke-width="2" class="prop-icon" />
                <div class="prop-text">
                  <div class="prop-label">Conductivité</div>
                  <div class="prop-value">{{ getConductivity(item.nom) }}</div>
                </div>
              </div>
              <div class="property-card">
                <Sparkles :size="28" :stroke-width="2" class="prop-icon" />
                <div class="prop-text">
                  <div class="prop-label">Malléabilité</div>
                  <div class="prop-value">{{ getMalleability(item.nom) }}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="entry-footer">
      <div class="footer-seal">
        <Check :size="16" :stroke-width="3" class="seal-icon" />
        <span class="seal-text">Certifié par la Guilde des Forgerons</span>
      </div>
      <div class="footer-date">Dernière révision : {{ getCurrentYear() }}</div>
    </div>
  </article>
</template>

<script>
import {
  FlaskConical,
  ScrollText,
  Scale,
  Flame,
  Zap,
  Sparkles,
  Check,
} from "lucide-vue-next";

export default {
  name: "PageMainCard",
  components: {
    FlaskConical,
    ScrollText,
    Scale,
    Flame,
    Zap,
    Sparkles,
    Check,
  },
  props: {
    item: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
  },
  methods: {
    getRarity(nom) {
      const rarities = {
        Aluminium: "Commun",
        Cuivre: "Rare",
        Fer: "Fondamental",
        Etain: "Commun",
      };
      return rarities[nom] || "Rare";
    },
    getOrigin(nom) {
      const origins = {
        Aluminium: "Mines Célestes",
        Cuivre: "Veines Volcaniques",
        Fer: "Montagnes Naines",
        Etain: "Vallées Profondes",
      };
      return origins[nom] || "Diverses Régions";
    },
    getAvailability(nom) {
      const availability = {
        Aluminium: "Abondante",
        Cuivre: "Modérée",
        Fer: "Très Abondante",
        Etain: "Limitée",
      };
      return availability[nom] || "Modérée";
    },
    getResistance(nom) {
      const resistance = {
        Aluminium: "Élevée",
        Cuivre: "Moyenne",
        Fer: "Très Élevée",
        Etain: "Faible",
      };
      return resistance[nom] || "Moyenne";
    },
    getConductivity(nom) {
      const conductivity = {
        Aluminium: "Bonne",
        Cuivre: "Excellente",
        Fer: "Faible",
        Etain: "Moyenne",
      };
      return conductivity[nom] || "Moyenne";
    },
    getMalleability(nom) {
      const malleability = {
        Aluminium: "Très Élevée",
        Cuivre: "Élevée",
        Fer: "Moyenne",
        Etain: "Élevée",
      };
      return malleability[nom] || "Moyenne";
    },
    getCurrentYear() {
      return new Date().getFullYear();
    },
  },
};
</script>

<style scoped>
.codex-entry {
  background: linear-gradient(
    135deg,
    rgba(26, 22, 18, 0.95),
    rgba(15, 13, 10, 0.95)
  );
  border: 2px solid rgba(161, 152, 130, 0.3);
  padding: 2rem;
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.4),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
  transition: all 0.4s ease;
  position: relative;
  animation: entryFadeIn 0.6s ease-out backwards;
}

.codex-entry:nth-child(1) {
  animation-delay: 0.1s;
}
.codex-entry:nth-child(2) {
  animation-delay: 0.2s;
}
.codex-entry:nth-child(3) {
  animation-delay: 0.3s;
}
.codex-entry:nth-child(4) {
  animation-delay: 0.4s;
}

@keyframes entryFadeIn {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.codex-entry:hover {
  border-color: rgba(161, 152, 130, 0.6);
  box-shadow:
    0 12px 48px rgba(0, 0, 0, 0.6),
    0 0 0 1px rgba(161, 152, 130, 0.2);
}

/* Entry Header */
.entry-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid rgba(161, 152, 130, 0.2);
}

.entry-number {
  display: flex;
  align-items: baseline;
  gap: 0.3rem;
  font-family: "Palatino", serif;
}

.number-prefix {
  font-size: 0.8rem;
  color: rgba(161, 152, 130, 0.6);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.number-value {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--auburn);
  font-family: "Georgia", serif;
}

.entry-category {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 1rem;
  background: rgba(133, 50, 51, 0.15);
  border: 1px solid rgba(133, 50, 51, 0.3);
}

.category-icon {
  color: var(--auburn);
}

.category-text {
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--auburn);
  font-weight: 600;
}

/* Entry Body */
.entry-body {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 2.5rem;
  margin-bottom: 2rem;
}

@media (max-width: 768px) {
  .entry-body {
    grid-template-columns: 1fr;
  }
}

/* Visual Section */
.entry-visual {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.visual-frame {
  position: relative;
  padding: 1.5rem;
  background: linear-gradient(
    135deg,
    rgba(161, 152, 130, 0.08),
    rgba(50, 93, 68, 0.05)
  );
  border: 2px solid rgba(161, 152, 130, 0.3);
}

.frame-corner {
  position: absolute;
  width: 16px;
  height: 16px;
  border: 2px solid var(--auburn);
}

.frame-corner.tl {
  top: -2px;
  left: -2px;
  border-right: none;
  border-bottom: none;
}

.frame-corner.tr {
  top: -2px;
  right: -2px;
  border-left: none;
  border-bottom: none;
}

.frame-corner.bl {
  bottom: -2px;
  left: -2px;
  border-right: none;
  border-top: none;
}

.frame-corner.br {
  bottom: -2px;
  right: -2px;
  border-left: none;
  border-top: none;
}

.image-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 200px;
}

.image-glow {
  position: absolute;
  width: 150px;
  height: 150px;
  background: radial-gradient(
    circle,
    rgba(161, 152, 130, 0.2),
    transparent 70%
  );
  filter: blur(30px);
  animation: imageGlowPulse 4s ease-in-out infinite;
}

@keyframes imageGlowPulse {
  0%,
  100% {
    opacity: 0.5;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.1);
  }
}

.entry-image {
  width: 180px;
  height: 180px;
  object-fit: contain;
  position: relative;
  z-index: 2;
  filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.5));
  transition: transform 0.4s ease;
}

.codex-entry:hover .entry-image {
  transform: scale(1.05);
}

.visual-label {
  text-align: center;
  font-size: 0.75rem;
  color: rgba(161, 152, 130, 0.6);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-style: italic;
}

/* Content Section */
.content-header {
  margin-bottom: 1.5rem;
}

.entry-title {
  font-size: 2.25rem;
  font-weight: 700;
  color: var(--dun);
  margin: 0;
  font-family: "Palatino", "Book Antiqua", serif;
  letter-spacing: 0.02em;
}

.title-underline {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-top: 0.75rem;
}

.title-underline::before,
.title-underline::after {
  content: "";
  flex: 1;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(161, 152, 130, 0.4),
    transparent
  );
}

.underline-ornament {
  color: var(--auburn);
  font-size: 0.7rem;
  opacity: 0.8;
}

/* Classification Block */
.classification-block {
  display: flex;
  gap: 1.5rem;
  margin-bottom: 2rem;
  padding: 1.25rem;
  background: rgba(25, 25, 25, 0.5);
  border: 1px solid rgba(161, 152, 130, 0.15);
  flex-wrap: wrap;
}

.classification-item {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  flex: 1;
  min-width: 120px;
}

.class-label {
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: rgba(161, 152, 130, 0.6);
  font-weight: 600;
}

.class-value {
  font-size: 0.95rem;
  color: var(--dun);
  font-weight: 600;
}

/* Description Section */
.description-section {
  margin-bottom: 2rem;
}

.section-title {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--dun);
  margin: 0 0 1rem 0;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.section-icon {
  color: var(--dun);
}

.entry-description {
  font-size: 1rem;
  line-height: 1.8;
  color: rgba(255, 255, 255, 0.8);
  text-align: justify;
  margin: 0;
  padding: 1.25rem;
  background: rgba(25, 25, 25, 0.3);
  border-left: 3px solid var(--viridian);
}

/* Properties Section */
.properties-section {
  margin-top: 2rem;
}

.properties-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 1rem;
}

.property-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: linear-gradient(
    135deg,
    rgba(50, 93, 68, 0.15),
    rgba(25, 25, 25, 0.3)
  );
  border: 1px solid rgba(161, 152, 130, 0.2);
  transition: all 0.3s ease;
}

.property-card:hover {
  background: linear-gradient(
    135deg,
    rgba(50, 93, 68, 0.25),
    rgba(25, 25, 25, 0.4)
  );
  border-color: var(--viridian);
  transform: translateY(-2px);
}

.prop-icon {
  color: var(--auburn);
  flex-shrink: 0;
}

.prop-text {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.prop-label {
  font-size: 0.75rem;
  color: rgba(161, 152, 130, 0.7);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.prop-value {
  font-size: 0.95rem;
  color: var(--sea-green);
  font-weight: 700;
}

/* Entry Footer */
.entry-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1.5rem;
  border-top: 1px solid rgba(161, 152, 130, 0.2);
  flex-wrap: wrap;
  gap: 1rem;
}

.footer-seal {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.85rem;
  color: var(--sea-green);
}

.seal-icon {
  color: var(--sea-green);
  font-weight: 700;
}

.footer-date {
  font-size: 0.8rem;
  color: rgba(161, 152, 130, 0.6);
  font-style: italic;
}
</style>
