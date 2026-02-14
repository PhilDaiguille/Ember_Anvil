<template>
  <main id="main-content" class="mainbackground" role="main">
    <!-- Hero Section -->
    <section
      class="hero-section min-h-[90vh] flex flex-col items-center justify-center text-center px-4 py-16"
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
          La forge virtuelle de vos rêves
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
            to="/forge"
            class="cta-primary bg-linear-to-r from-amber-600 to-orange-700 hover:from-amber-500 hover:to-orange-600 text-white font-bold py-4 px-8 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center gap-2 justify-center"
            aria-label="Commencer à forger maintenant"
          >
            <Flame :size="20" :stroke-width="2" />
            Commencer à Forger
          </router-link>
          <router-link
            to="/guides/debuter-dans-la-forge"
            class="cta-secondary bg-white/10 hover:bg-white/20 backdrop-blur-md text-white font-semibold py-4 px-8 rounded-lg border-2 border-white/30 shadow-lg transform transition-all duration-300 hover:scale-105 flex items-center gap-2 justify-center"
            aria-label="Lire le guide débutant"
          >
            <BookOpen :size="20" :stroke-width="2" />
            Guide Débutant
          </router-link>
        </div>
      </div>
    </section>

    <!-- Stats Band -->
    <section class="stats-band py-10 px-4" aria-label="Statistiques du jeu">
      <div class="max-w-5xl mx-auto">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div class="stat-item">
            <div class="text-4xl font-bold text-amber-400 mb-1">100+</div>
            <div class="text-sm uppercase tracking-widest text-gray-400">
              Matériaux
            </div>
          </div>
          <div class="stat-item">
            <div class="text-4xl font-bold text-orange-400 mb-1">500+</div>
            <div class="text-sm uppercase tracking-widest text-gray-400">
              Recettes
            </div>
          </div>
          <div class="stat-item">
            <div class="text-4xl font-bold text-red-400 mb-1">5</div>
            <div class="text-sm uppercase tracking-widest text-gray-400">
              Catégories
            </div>
          </div>
          <div class="stat-item">
            <div class="text-4xl font-bold text-yellow-300 mb-1">∞</div>
            <div class="text-sm uppercase tracking-widest text-gray-400">
              Possibilités
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Comment jouer - 3 étapes -->
    <section
      class="howtoplay-section py-16 px-4"
      aria-labelledby="howtoplay-heading"
    >
      <div class="max-w-5xl mx-auto text-center">
        <h2
          id="howtoplay-heading"
          class="text-3xl md:text-4xl font-bold mb-3 text-amber-100"
        >
          Comment Jouer ?
        </h2>
        <p class="text-gray-400 mb-12 text-lg">
          Trois étapes pour maîtriser l'art de la forge
        </p>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            class="step-card bg-black/40 rounded-xl p-8 border border-white/10 relative"
          >
            <div
              class="step-number text-6xl font-bold text-amber-600/30 absolute top-4 right-6 font-['Caesar_Dressing']"
            >
              1
            </div>
            <div class="flex justify-center mb-4">
              <Store :size="48" :stroke-width="1.5" class="text-amber-400" />
            </div>
            <h3 class="text-xl font-bold text-amber-100 mb-3">Achetez</h3>
            <p class="text-gray-300 leading-relaxed">
              Rendez-vous au Marché pour acquérir des matériaux bruts : métaux,
              pierres précieuses, alliages rares. Constituez votre stock de
              ressources.
            </p>
          </div>
          <div
            class="step-card bg-black/40 rounded-xl p-8 border border-white/10 relative"
          >
            <div
              class="step-number text-6xl font-bold text-orange-600/30 absolute top-4 right-6 font-['Caesar_Dressing']"
            >
              2
            </div>
            <div class="flex justify-center mb-4">
              <BookOpen
                :size="48"
                :stroke-width="1.5"
                class="text-orange-400"
              />
            </div>
            <h3 class="text-xl font-bold text-amber-100 mb-3">Choisissez</h3>
            <p class="text-gray-300 leading-relaxed">
              Consultez le Codex pour trouver la recette idéale. Plus de 500
              recettes classées par difficulté, catégorie et rareté vous
              attendent.
            </p>
          </div>
          <div
            class="step-card bg-black/40 rounded-xl p-8 border border-white/10 relative"
          >
            <div
              class="step-number text-6xl font-bold text-red-600/30 absolute top-4 right-6 font-['Caesar_Dressing']"
            >
              3
            </div>
            <div class="flex justify-center mb-4">
              <Hammer :size="48" :stroke-width="1.5" class="text-red-400" />
            </div>
            <h3 class="text-xl font-bold text-amber-100 mb-3">Forgez</h3>
            <p class="text-gray-300 leading-relaxed">
              Lancez la forge ! Chaque création améliore vos compétences,
              débloque de nouvelles recettes et fait progresser votre atelier.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section (6 cartes) -->
    <section
      class="features-section py-16 px-4"
      aria-labelledby="features-heading"
    >
      <div class="max-w-6xl mx-auto">
        <h2
          id="features-heading"
          class="text-3xl md:text-4xl font-bold text-center mb-3 text-amber-100"
        >
          Tout ce qu'il vous Faut
        </h2>
        <p class="text-gray-400 text-center mb-12 text-lg">
          Six espaces pour vivre pleinement l'expérience Ember Anvil
        </p>
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
                to="/forge"
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
                to="/marche"
                class="inline-block text-emerald-300 hover:text-emerald-100 font-semibold underline underline-offset-4 transition-colors"
                aria-label="Visiter la boutique"
              >
                Visiter la boutique →
              </router-link>
            </div>
          </article>

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
              Codex
            </h3>
            <p
              class="feature-description text-gray-200 text-center leading-relaxed mb-4"
            >
              Consultez notre encyclopédie complète des matériaux, techniques et
              recettes. Le savoir est la clé de la maîtrise.
            </p>
            <div class="text-center">
              <router-link
                to="/codex"
                class="inline-block text-blue-300 hover:text-blue-100 font-semibold underline underline-offset-4 transition-colors"
                aria-label="Consulter le codex"
              >
                Consulter le codex →
              </router-link>
            </div>
          </article>

          <article
            class="feature-card bg-linear-to-br from-purple-900/60 to-violet-900/60 backdrop-blur-md rounded-xl p-8 shadow-xl border border-white/10 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <div
              class="feature-icon text-6xl mb-4 text-center flex justify-center"
            >
              <Wrench :size="64" :stroke-width="2" class="text-purple-400" />
            </div>
            <h3
              class="feature-title text-2xl font-bold mb-4 text-purple-100 text-center"
            >
              Atelier
            </h3>
            <p
              class="feature-description text-gray-200 text-center leading-relaxed mb-4"
            >
              Personnalisez votre espace de travail. Améliorez vos outils et
              installations pour forger plus vite et mieux.
            </p>
            <div class="text-center">
              <router-link
                to="/atelier"
                class="inline-block text-purple-300 hover:text-purple-100 font-semibold underline underline-offset-4 transition-colors"
                aria-label="Accéder à l'atelier"
              >
                Gérer l'atelier →
              </router-link>
            </div>
          </article>

          <article
            class="feature-card bg-linear-to-br from-rose-900/60 to-pink-900/60 backdrop-blur-md rounded-xl p-8 shadow-xl border border-white/10 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <div
              class="feature-icon text-6xl mb-4 text-center flex justify-center"
            >
              <TrendingUp :size="64" :stroke-width="2" class="text-rose-400" />
            </div>
            <h3
              class="feature-title text-2xl font-bold mb-4 text-rose-100 text-center"
            >
              Progression
            </h3>
            <p
              class="feature-description text-gray-200 text-center leading-relaxed mb-4"
            >
              Suivez votre évolution : niveaux de forgeron, badges de maîtrise,
              statistiques et historique de vos meilleures créations.
            </p>
            <div class="text-center">
              <router-link
                to="/profil"
                class="inline-block text-rose-300 hover:text-rose-100 font-semibold underline underline-offset-4 transition-colors"
                aria-label="Voir mon profil"
              >
                Voir mon profil →
              </router-link>
            </div>
          </article>

          <article
            class="feature-card bg-linear-to-br from-yellow-900/60 to-amber-900/60 backdrop-blur-md rounded-xl p-8 shadow-xl border border-white/10 transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <div
              class="feature-icon text-6xl mb-4 text-center flex justify-center"
            >
              <ScrollText
                :size="64"
                :stroke-width="2"
                class="text-yellow-400"
              />
            </div>
            <h3
              class="feature-title text-2xl font-bold mb-4 text-yellow-100 text-center"
            >
              Quêtes
            </h3>
            <p
              class="feature-description text-gray-200 text-center leading-relaxed mb-4"
            >
              Relevez des défis quotidiens et des missions spéciales. Chaque
              quête complétée rapporte des récompenses exclusives.
            </p>
            <div class="text-center">
              <router-link
                to="/atelier"
                class="inline-block text-yellow-300 hover:text-yellow-100 font-semibold underline underline-offset-4 transition-colors"
                aria-label="Voir les quêtes"
              >
                Voir les quêtes →
              </router-link>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- About + Stats -->
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
        </div>
      </div>
    </section>

    <!-- Système de raretés -->
    <section class="rarity-section py-16 px-4" aria-labelledby="rarity-heading">
      <div class="max-w-5xl mx-auto text-center">
        <h2
          id="rarity-heading"
          class="text-3xl md:text-4xl font-bold mb-3 text-amber-100"
        >
          Système de Raretés
        </h2>
        <p class="text-gray-400 mb-12 text-lg">
          Cinq niveaux de maîtrise — de l'humble commun au légendaire absolu
        </p>
        <div class="grid grid-cols-1 sm:grid-cols-5 gap-4">
          <div
            v-for="rarity in rarities"
            :key="rarity.key"
            class="rarity-tier rounded-xl p-6 border text-center transition-all duration-300 hover:scale-105"
            :class="rarity.cardClass"
          >
            <div class="mb-3 flex justify-center">
              <Circle
                :size="28"
                fill="currentColor"
                :stroke-width="0"
                :class="rarity.textClass"
              />
            </div>
            <div class="font-bold text-lg mb-2" :class="rarity.textClass">
              {{ rarity.label }}
            </div>
            <div class="text-xs text-gray-400 leading-relaxed">
              {{ rarity.description }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Articles / Guides Preview -->
    <section
      class="articles-section py-16 px-4"
      aria-labelledby="articles-heading"
    >
      <div class="max-w-5xl mx-auto">
        <div class="text-center mb-12">
          <h2
            id="articles-heading"
            class="text-3xl md:text-4xl font-bold mb-3 text-amber-100"
          >
            Guides & Ressources
          </h2>
          <p class="text-gray-400 text-lg">
            Tout ce que vous devez savoir pour maîtriser Ember Anvil
          </p>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <article
            v-for="article in articles"
            :key="article.slug"
            class="article-card bg-black/40 rounded-xl border border-white/10 overflow-hidden hover:border-amber-500/40 transition-all duration-300 hover:shadow-xl hover:shadow-amber-900/20"
          >
            <div class="p-2">
              <div
                class="article-banner rounded-lg h-24 flex items-center justify-center mb-0"
                :class="article.bannerClass"
              >
                <component
                  :is="article.icon"
                  :size="40"
                  :stroke-width="1.5"
                  class="text-white/80"
                />
              </div>
            </div>
            <div class="p-6 pt-4">
              <span
                class="text-xs uppercase tracking-widest font-semibold mb-2 inline-block"
                :class="article.tagClass"
              >
                {{ article.tag }}
              </span>
              <h3 class="text-lg font-bold text-white mb-3 leading-snug">
                {{ article.title }}
              </h3>
              <p class="text-gray-400 text-sm leading-relaxed mb-4">
                {{ article.excerpt }}
              </p>
              <router-link
                :to="article.href"
                class="text-amber-400 hover:text-amber-200 font-semibold text-sm transition-colors flex items-center gap-1"
                :aria-label="'Lire : ' + article.title"
              >
                Lire l'article
                <ChevronRight :size="16" :stroke-width="2" />
              </router-link>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section
      class="faq-section py-16 px-4 max-w-4xl mx-auto"
      aria-labelledby="faq-heading"
    >
      <div class="text-center mb-12">
        <h2
          id="faq-heading"
          class="text-4xl md:text-5xl font-bold mb-4 text-amber-100"
        >
          Questions Fréquentes
        </h2>
        <p class="text-lg text-gray-300">
          Tout ce que vous devez savoir sur Ember Anvil
        </p>
      </div>

      <div class="faq-container space-y-4">
        <article
          v-for="(faq, index) in faqs"
          :key="index"
          class="faq-item bg-black/40 backdrop-blur-md rounded-xl border border-white/10 overflow-hidden transition-all duration-300 hover:border-white/30"
        >
          <button
            @click="toggleFaq(index)"
            class="faq-question w-full text-left p-6 flex justify-between items-center gap-4"
            :aria-expanded="faq.open"
            :aria-controls="'faq-answer-' + index"
          >
            <h3 class="text-xl font-bold text-amber-100">
              {{ faq.question }}
            </h3>
            <ChevronDown
              :size="24"
              :stroke-width="2"
              class="text-amber-400 transition-transform duration-300 flex-shrink-0"
              :class="{ 'rotate-180': faq.open }"
            />
          </button>
          <div
            :id="'faq-answer-' + index"
            class="faq-answer overflow-hidden transition-all duration-300"
            :class="faq.open ? 'max-h-96' : 'max-h-0'"
          >
            <div class="p-6 text-gray-200 leading-relaxed">
              {{ faq.answer }}
            </div>
          </div>
        </article>
      </div>
    </section>

    <!-- Final CTA -->
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
          to="/forge"
          class="inline-flex bg-white text-orange-900 font-bold py-4 px-10 rounded-lg shadow-xl transform transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:bg-amber-50 items-center gap-2 justify-center max-w-xs mx-auto"
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
import {
  Flame,
  BookOpen,
  Store,
  Hammer,
  ChevronDown,
  ChevronRight,
  Wrench,
  TrendingUp,
  ScrollText,
  Circle,
} from "lucide-vue-next";

export default {
  name: "PageMain",
  components: {
    Flame,
    BookOpen,
    Store,
    Hammer,
    ChevronDown,
    ChevronRight,
    Wrench,
    TrendingUp,
    ScrollText,
    Circle,
  },
  data() {
    return {
      rarities: [
        {
          key: "commun",
          label: "Commun",
          description: "Matériaux de base, accessibles à tous les forgerons.",
          cardClass: "bg-gray-900/60 border-gray-600/40",
          textClass: "text-gray-400",
        },
        {
          key: "peu-commun",
          label: "Peu Commun",
          description:
            "Ressources de qualité, nécessitent un peu d'expérience.",
          cardClass: "bg-green-900/40 border-green-600/40",
          textClass: "text-green-400",
        },
        {
          key: "rare",
          label: "Rare",
          description: "Matériaux difficiles à obtenir, créations prisées.",
          cardClass: "bg-blue-900/40 border-blue-600/40",
          textClass: "text-blue-400",
        },
        {
          key: "epique",
          label: "Épique",
          description:
            "Ressources exceptionnelles, forgerons experts seulement.",
          cardClass: "bg-purple-900/40 border-purple-600/40",
          textClass: "text-purple-400",
        },
        {
          key: "legendaire",
          label: "Légendaire",
          description: "Le summum de l'artisanat. Objets de légende.",
          cardClass: "bg-yellow-900/40 border-yellow-500/50",
          textClass: "text-yellow-400",
        },
      ],
      articles: [
        {
          slug: "guide-debutant",
          tag: "Guide",
          tagClass: "text-amber-400",
          title: "Comment débuter dans la forge virtuelle : guide complet",
          excerpt:
            "Premiers pas, mécaniques de base, conseils d'expert — tout ce qu'il faut pour bien démarrer votre aventure à Ember Anvil.",
          href: "/guides/debuter-dans-la-forge",
          bannerClass: "bg-linear-to-br from-amber-900/80 to-orange-900/80",
          icon: "Hammer",
        },
        {
          slug: "glossaire",
          tag: "Référence",
          tagClass: "text-blue-400",
          title: "Glossaire de la forge et de l'artisanat virtuel",
          excerpt:
            "Alliage, rareté, trempe, codex… Maîtrisez le vocabulaire de la forge avec notre glossaire complet de plus de 20 termes.",
          href: "/guides/glossaire-forge",
          bannerClass: "bg-linear-to-br from-blue-900/80 to-indigo-900/80",
          icon: "BookOpen",
        },
        {
          slug: "comparatif",
          tag: "Comparatif",
          tagClass: "text-emerald-400",
          title: "Meilleurs jeux de forge en ligne 2026 : comparatif complet",
          excerpt:
            "Ember Anvil face à Minecraft, Valheim, Little Alchemy 2… Quel jeu de forge choisir selon votre style de jeu ?",
          href: "/guides/meilleurs-jeux-de-forge",
          bannerClass: "bg-linear-to-br from-emerald-900/80 to-teal-900/80",
          icon: "TrendingUp",
        },
      ],
      faqs: [
        {
          question: "Qu'est-ce qu'Ember Anvil ?",
          answer:
            "Ember Anvil est une forge virtuelle interactive où vous pouvez créer des objets uniques en combinant différents matériaux. C'est une expérience de crafting immersive qui combine artisanat traditionnel et technologie moderne, avec plus de 500 recettes et 100+ matériaux disponibles.",
          open: false,
        },
        {
          question: "Comment fonctionne le système de crafting ?",
          answer:
            "Le système de crafting d'Ember Anvil est simple et intuitif. Sélectionnez vos matériaux dans votre inventaire, choisissez une recette dans le codex, et forgez votre création. Chaque objet créé améliore vos compétences de forgeron et débloque de nouvelles possibilités.",
          open: false,
        },
        {
          question: "Quels types de matériaux puis-je utiliser ?",
          answer:
            "Vous pouvez utiliser une vaste gamme de matériaux : métaux précieux (or, argent), métaux communs (fer, cuivre, aluminium), alliages spéciaux, et matériaux rares. Chaque matériau possède des propriétés uniques qui influencent la qualité et les caractéristiques de vos créations.",
          open: false,
        },
        {
          question: "Y a-t-il un système de progression ?",
          answer:
            "Oui ! Ember Anvil propose un système de progression complet avec des niveaux de forgeron, des badges à débloquer, et des améliorations d'atelier. Plus vous forgez, plus vous gagnez d'expérience et débloquent de nouvelles recettes et outils avancés.",
          open: false,
        },
        {
          question: "Puis-je vendre mes créations ?",
          answer:
            "Absolument ! La boutique Ember Anvil vous permet d'acheter des matériaux rares et de vendre vos créations. Le prix de vente dépend de la qualité de votre travail, des matériaux utilisés, et de votre niveau de maîtrise.",
          open: false,
        },
        {
          question: "Le Codex contient-il toutes les recettes ?",
          answer:
            "Le Codex (Wiki) d'Ember Anvil est une encyclopédie exhaustive contenant toutes les informations sur les matériaux, leurs propriétés, origines, et applications. Il s'enrichit au fur et à mesure de votre progression et de vos découvertes.",
          open: false,
        },
        {
          question: "Que sont les quêtes quotidiennes ?",
          answer:
            "Les quêtes quotidiennes sont des défis renouvelés chaque jour qui vous poussent à explorer différentes techniques de forge. Elles rapportent des récompenses exclusives : matériaux rares, écus bonus, et déblocages spéciaux.",
          open: false,
        },
        {
          question: "Qu'est-ce que le système de raretés ?",
          answer:
            "Ember Anvil dispose de cinq niveaux de rareté : Commun, Peu Commun, Rare, Épique et Légendaire. La rareté d'un objet dépend des matériaux utilisés, de la recette choisie et de votre niveau de maîtrise. Les objets légendaires sont les plus difficiles à forger et les plus précieux.",
          open: false,
        },
        {
          question: "Comment améliorer mon atelier ?",
          answer:
            "L'atelier se développe en forgeant des objets et en accomplissant des quêtes. Vous pouvez investir vos écus pour améliorer vos outils (enclume, soufflet, marteau) et vos installations (fourneau, forge, établi). Chaque amélioration augmente votre efficacité et débloque de nouvelles recettes.",
          open: false,
        },
        {
          question: "Le jeu est-il gratuit ?",
          answer:
            "Oui, Ember Anvil est entièrement gratuit. Vous avez accès à toutes les fonctionnalités : crafting, boutique, codex, atelier et quêtes, sans aucun frais cachés ni achats in-app. Profitez de l'expérience complète dès le premier jour.",
          open: false,
        },
      ],
    };
  },
  mounted() {
    this.updateMetaTags();
    this.addSchemas();
  },

  methods: {
    toggleFaq(index) {
      this.faqs[index].open = !this.faqs[index].open;
    },
    addSchemas() {
      const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: this.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer,
          },
        })),
      };

      const webAppSchema = {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Ember Anvil",
        description:
          "Forge virtuelle interactive avec plus de 500 recettes de crafting et 100+ matériaux. Forgez des objets uniques, gérez votre atelier et relevez des quêtes.",
        applicationCategory: "GameApplication",
        operatingSystem: "Web",
        offers: {
          "@type": "Offer",
          price: "0",
          priceCurrency: "EUR",
        },
        featureList: [
          "500+ recettes de crafting",
          "100+ matériaux disponibles",
          "Système de raretés en 5 niveaux",
          "Atelier personnalisable",
          "Quêtes quotidiennes",
          "Encyclopédie complète",
        ],
      };

      [faqSchema, webAppSchema].forEach((schema) => {
        const script = document.createElement("script");
        script.type = "application/ld+json";
        script.text = JSON.stringify(schema);
        document.head.appendChild(script);
      });
    },
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
  padding: 0;
  max-width: 140rem;

  position: relative;
  background: linear-gradient(to bottom, #0f0d0a 0%, #1a1612 50%, #0f0d0a 100%);
}

/* Hero Section avec Background */
.hero-section {
  background: url(../../assets/bg.avif) no-repeat center center / cover;

  position: relative;
  margin: 0 1rem;
}

.hero-section::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0.3) 0%,
    rgba(0, 0, 0, 0.5) 70%,
    rgba(15, 13, 10, 1) 100%
  );

  pointer-events: none;
}

.hero-content {
  position: relative;
  z-index: 1;
}

/* Stats Band */
.stats-band {
  background: linear-gradient(
    to right,
    rgba(133, 50, 51, 0.15),
    rgba(0, 114, 87, 0.15)
  );
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.stat-item {
  padding: 1rem;
}

/* How to play */
.howtoplay-section {
  padding: 4rem 2rem;
}

.step-card {
  position: relative;
  overflow: hidden;
}

.step-number {
  user-select: none;
  pointer-events: none;
}

/* Features Section */
.features-section {
  padding: 4rem 2rem;
  margin: 0;
}

/* About Section */
.about-section {
  /* uses mx-auto from HTML */
}

/* Rarity Section */
.rarity-section {
  padding: 4rem 2rem;
}

.rarity-tier {
  cursor: default;
}

/* Articles Section */
.articles-section {
  padding: 4rem 2rem;
}

.article-banner {
  background-size: cover;
}

/* FAQ Section */
.faq-section {
  max-width: 80rem;
  margin: 0 auto;
  padding: 4rem 2rem;
  animation: fadeInUp 0.8s ease-out;
}

.final-cta {
  margin: 0;
  padding: 4rem 2rem 6rem;
}

/* Animations */
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
.feature-card:nth-child(4) {
  --card-index: 4;
}
.feature-card:nth-child(5) {
  --card-index: 5;
}
.feature-card:nth-child(6) {
  --card-index: 6;
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

/* FAQ */
.faq-item {
  transition: all 0.3s ease;
}

.faq-item:hover {
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
  transform: translateY(-2px);
}

.faq-question {
  cursor: pointer;
  transition: all 0.3s ease;
}

.faq-question:hover {
  background: rgba(255, 255, 255, 0.05);
}

.faq-question:focus {
  outline: 2px solid rgba(251, 191, 36, 0.5);
  outline-offset: -2px;
}

.faq-answer {
  transition:
    max-height 0.3s ease,
    opacity 0.3s ease;
}

.faq-answer.max-h-0 {
  opacity: 0;
}

.faq-answer.max-h-96 {
  opacity: 1;
}
</style>
