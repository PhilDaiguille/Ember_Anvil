<template>
  <main class="mainbackground" role="main">
    <section
      class="hero-section min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16"
    >
      <div
        class="hero-content max-w-4xl mx-auto backdrop-blur-sm bg-black/40 rounded-2xl p-8 md:p-12 shadow-2xl border border-white/10"
      >
        <h1
          class="hero-title text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-lg font-['Caesar_Dressing']"
        >
          Bienvenue à Ember Anvil
        </h1>
        <p
          class="hero-subtitle text-xl md:text-2xl mb-4 text-amber-100 font-light"
        >
          La Forge Virtuelle de vos Rêves
        </p>
        <p
          class="hero-description text-base md:text-lg mb-8 text-gray-200 max-w-2xl mx-auto leading-relaxed"
        >
          Plongez dans l'art ancestral de la forge. Créez, affinez et
          perfectionnez vos créations dans un univers où le feu, le métal et
          l'artisanat se rencontrent.
        </p>

        <div
          class="cta-buttons flex flex-wrap gap-4 justify-center items-center"
        >
          <router-link
            to="/Crafting"
            class="cta-primary bg-linear-to-r from-amber-600 to-orange-700 hover:from-amber-500 hover:to-orange-600 text-white font-bold py-4 px-8 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center gap-2 justify-center"
            aria-label="Commencer à forger maintenant"
          >
            <Flame :size="20" :stroke-width="2" />
            Commencer à Forger
          </router-link>
          <router-link
            to="/Wiki"
            class="cta-secondary bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-semibold py-4 px-8 rounded-lg border-2 border-white/30 shadow-lg transform transition-all duration-300 hover:scale-105 flex items-center gap-2 justify-center"
            aria-label="Explorer l'encyclopédie"
          >
            <BookOpen :size="20" :stroke-width="2" />
            Explorer le Wiki
          </router-link>
        </div>
      </div>
    </section>

    <section
      class="features-section py-16 px-4"
      aria-labelledby="features-heading"
    >
      <div class="max-w-6xl mx-auto">
        <h2 id="features-heading" class="sr-only">Nos Fonctionnalités</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <article
            class="feature-card bg-linear-to-br from-orange-900/60 to-red-900/60 backdrop-blur-md rounded-xl p-8 shadow-xl border border-white/10 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <div
              class="feature-icon text-6xl mb-4 text-center flex justify-center"
            >
              <Hammer :size="64" :stroke-width="2" class="text-amber-400" />
            </div>
            <h3
              class="feature-title text-2xl font-bold mb-4 text-amber-100 text-center"
            >
              Crafting
            </h3>
            <p
              class="feature-description text-gray-200 text-center leading-relaxed mb-4"
            >
              Forgez des objets uniques en combinant différents matériaux.
              Maîtrisez l'art de la création et développez vos compétences
              d'artisan.
            </p>
            <div class="text-center">
              <router-link
                to="/Crafting"
                class="inline-block text-amber-300 hover:text-amber-100 font-semibold underline underline-offset-4 transition-colors"
                aria-label="Accéder à l'atelier de crafting"
              >
                Accéder à l'atelier →
              </router-link>
            </div>
          </article>

          <article
            class="feature-card bg-linear-to-br from-emerald-900/60 to-teal-900/60 backdrop-blur-md rounded-xl p-8 shadow-xl border border-white/10 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <div
              class="feature-icon text-6xl mb-4 text-center flex justify-center"
            >
              <Store :size="64" :stroke-width="2" class="text-emerald-400" />
            </div>
            <h3
              class="feature-title text-2xl font-bold mb-4 text-emerald-100 text-center"
            >
              Boutique
            </h3>
            <p
              class="feature-description text-gray-200 text-center leading-relaxed mb-4"
            >
              Découvrez notre collection de matériaux rares et d'outils de
              qualité. Équipez-vous pour devenir le meilleur forgeron.
            </p>
            <div class="text-center">
              <router-link
                to="/Shop"
                class="inline-block text-emerald-300 hover:text-emerald-100 font-semibold underline underline-offset-4 transition-colors"
                aria-label="Visiter la boutique"
              >
                Visiter la boutique →
              </router-link>
            </div>
          </article>

          <!-- Feature Card 3 - Wiki -->
          <article
            class="feature-card bg-linear-to-br from-blue-900/60 to-indigo-900/60 backdrop-blur-md rounded-xl p-8 shadow-xl border border-white/10 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <div
              class="feature-icon text-6xl mb-4 text-center flex justify-center"
            >
              <BookOpen :size="64" :stroke-width="2" class="text-blue-400" />
            </div>
            <h3
              class="feature-title text-2xl font-bold mb-4 text-blue-100 text-center"
            >
              Wiki
            </h3>
            <p
              class="feature-description text-gray-200 text-center leading-relaxed mb-4"
            >
              Consultez notre encyclopédie complète des matériaux, techniques et
              recettes. Le savoir est la clé de la maîtrise.
            </p>
            <div class="text-center">
              <router-link
                to="/Wiki"
                class="inline-block text-blue-300 hover:text-blue-100 font-semibold underline underline-offset-4 transition-colors"
                aria-label="Consulter le wiki"
              >
                Consulter le wiki →
              </router-link>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section
      class="about-section py-16 px-4 bg-black/30 backdrop-blur-sm rounded-2xl max-w-6xl mx-auto my-12"
      aria-labelledby="about-heading"
    >
      <div class="max-w-4xl mx-auto text-center">
        <h2
          id="about-heading"
          class="text-4xl md:text-5xl font-bold mb-8 text-amber-100 py-6"
        >
          Pourquoi Ember Anvil ?
        </h2>
        <div class="space-y-6 text-gray-200 text-lg leading-relaxed">
          <p>
            <strong class="text-amber-300">Ember Anvil</strong> est plus qu'une
            simple forge virtuelle. C'est un univers où la passion de
            l'artisanat rencontre la technologie moderne.
          </p>
          <p>
            Que vous soyez un forgeron débutant ou un maître artisan, vous
            trouverez ici tous les outils et connaissances nécessaires pour
            créer des objets extraordinaires.
          </p>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6 p-12 text-center">
            <div class="stat-card">
              <div class="text-5xl font-bold text-amber-400 mb-2">100+</div>
              <div class="text-sm uppercase tracking-wide text-gray-300">
                Matériaux
              </div>
            </div>
            <div class="stat-card">
              <div class="text-5xl font-bold text-orange-400 mb-2">500+</div>
              <div class="text-sm uppercase tracking-wide text-gray-300">
                Recettes
              </div>
            </div>
            <div class="stat-card">
              <div class="text-5xl font-bold text-red-400 mb-2">∞</div>
              <div class="text-sm uppercase tracking-wide text-gray-300">
                Possibilités
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="final-cta py-16 px-4 text-center">
      <div
        class="max-w-3xl mx-auto bg-linear-to-r from-orange-600/40 to-red-600/40 backdrop-blur-md rounded-2xl p-12 border border-white/20 shadow-2xl"
      >
        <h2 class="text-3xl md:text-4xl font-bold mb-6 text-white">
          Prêt à Allumer Votre Forge ?
        </h2>
        <p class="text-lg mb-8 text-gray-100">
          Rejoignez notre communauté de forgerons passionnés et commencez votre
          aventure artisanale dès aujourd'hui.
        </p>
        <router-link
          to="/Crafting"
          class="inline-block bg-white text-orange-900 font-bold py-4 px-10 rounded-lg shadow-xl transform transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:bg-amber-50 flex items-center gap-2 justify-center max-w-xs mx-auto"
          aria-label="Commencer votre aventure maintenant"
        >
          <Hammer :size="20" :stroke-width="2" />
          Commencer Maintenant
        </router-link>
      </div>
    </section>
  </main>
</template>

<script>
import { Flame, BookOpen, Store, Hammer } from "lucide-vue-next";

export default {
  name: "PageMain",
  components: {
    Flame,
    BookOpen,
    Store,
    Hammer,
  },
  mounted() {
    this.updateMetaTags();
  },

  methods: {
    updateMetaTags() {
      document.title =
        "Ember Anvil - Forge Virtuelle & Artisanat | Crafting, Wiki & Boutique";
      this.updateMetaTag(
        "name",
        "description",
        "Ember Anvil : votre forge virtuelle pour créer des objets uniques. Découvrez plus de 500 recettes de crafting, 100+ matériaux et une encyclopédie complète. Commencez à forger dès maintenant !",
      );
      this.updateMetaTag(
        "name",
        "keywords",
        "ember anvil, forge virtuelle, crafting, artisanat, métallurgie, création objets, jeu forge, wiki matériaux, boutique forge, recettes crafting",
      );
      this.updateMetaTag(
        "property",
        "og:title",
        "Ember Anvil - Forge Virtuelle & Artisanat",
      );
      this.updateMetaTag(
        "property",
        "og:description",
        "Plongez dans l'art ancestral de la forge. Créez, affinez et perfectionnez vos créations dans un univers artisanal unique.",
      );
      this.updateMetaTag(
        "property",
        "twitter:title",
        "Ember Anvil - Forge Virtuelle & Artisanat",
      );
      this.updateMetaTag(
        "property",
        "twitter:description",
        "Plongez dans l'art ancestral de la forge. Plus de 500 recettes et 100+ matériaux vous attendent.",
      );
    },

    updateMetaTag(attribute, key, content) {
      let element = document.querySelector(`meta[${attribute}="${key}"]`);
      if (element) {
        element.setAttribute("content", content);
      } else {
        element = document.createElement("meta");
        element.setAttribute(attribute, key);
        element.setAttribute("content", content);
        document.head.appendChild(element);
      }
    },
  },
};
</script>

<style scoped>
.mainbackground {
  background: url(../assets/bg.avif) no-repeat center center / cover;
  margin: 2rem auto;
  padding: 1rem;
  max-width: 140rem;
  border-radius: 0.75rem;
  position: relative;
}

/* Animation subtile pour les cards */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.feature-card {
  animation: fadeInUp 0.6s ease-out forwards;
  animation-delay: calc(var(--card-index, 0) * 0.1s);
}

.feature-card:nth-child(1) {
  --card-index: 1;
}

.feature-card:nth-child(2) {
  --card-index: 2;
}

.feature-card:nth-child(3) {
  --card-index: 3;
}

.cta-primary {
  position: relative;
  overflow: hidden;
}

.cta-primary::before {
  content: "";
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
  height: 200%;
  background: linear-gradient(
    45deg,
    transparent,
    rgba(255, 255, 255, 0.1),
    transparent
  );
  transform: rotate(45deg);
  animation: shine 3s infinite;
}

@keyframes shine {
  0% {
    transform: translateX(-100%) translateY(-100%) rotate(45deg);
  }
  100% {
    transform: translateX(100%) translateY(100%) rotate(45deg);
  }
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .hero-title {
    font-size: 2.5rem;
  }

  .hero-subtitle {
    font-size: 1.25rem;
  }

  .hero-description {
    font-size: 1rem;
  }
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}

.feature-card:hover .feature-icon {
  animation: bounce 0.5s ease;
}

@keyframes bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
</style>
