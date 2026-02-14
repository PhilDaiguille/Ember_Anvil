<template>
  <div class="blog-layout">
    <PageHeader />
    <main id="main-content" class="blog-main" role="main">
      <article
        class="blog-container max-w-4xl mx-auto px-6 py-16"
        itemscope
        itemtype="https://schema.org/Article"
      >
        <!-- Breadcrumb -->
        <nav class="breadcrumb mb-8" aria-label="Fil d'Ariane">
          <ol class="flex items-center gap-2 text-sm text-gray-500">
            <li>
              <router-link to="/" class="hover:text-amber-400 transition-colors"
                >Accueil</router-link
              >
            </li>
            <li class="text-gray-600">/</li>
            <li class="text-gray-400">Guides</li>
            <li class="text-gray-600">/</li>
            <li class="text-gray-300">Guide débutant</li>
          </ol>
        </nav>

        <!-- Article Header -->
        <header class="mb-12">
          <div class="flex items-center gap-3 mb-4">
            <span
              class="tag-badge bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs uppercase tracking-widest font-semibold px-3 py-1 rounded-full"
            >
              Guide
            </span>
            <span class="text-gray-500 text-sm">Lecture : ~8 min</span>
          </div>
          <h1
            class="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
            itemprop="headline"
          >
            Comment débuter dans la forge virtuelle : guide complet
          </h1>
          <p
            class="text-xl text-gray-300 leading-relaxed max-w-2xl"
            itemprop="description"
          >
            Premiers pas, mécaniques essentielles, conseils d'expert — tout ce
            qu'il faut savoir pour bien démarrer votre aventure à Ember Anvil.
          </p>
        </header>

        <!-- Table des matières -->
        <nav
          class="toc-block bg-black/40 border border-white/10 rounded-xl p-6 mb-12"
          aria-label="Table des matières"
        >
          <h2
            class="text-sm uppercase tracking-widest text-gray-500 font-semibold mb-4"
          >
            Table des matières
          </h2>
          <ol class="space-y-2">
            <li v-for="(section, i) in sections" :key="section.id">
              <a
                :href="'#' + section.id"
                class="toc-link text-gray-300 hover:text-amber-400 transition-colors text-sm flex items-center gap-2"
              >
                <span class="text-amber-600 font-bold">{{ i + 1 }}.</span>
                {{ section.label }}
              </a>
            </li>
          </ol>
        </nav>

        <!-- Corps de l'article -->
        <div class="article-body space-y-16">
          <!-- Introduction -->
          <section id="introduction">
            <h2 class="section-heading text-3xl font-bold text-amber-100 mb-6">
              Introduction
            </h2>
            <div
              class="prose-content space-y-4 text-gray-300 leading-relaxed text-lg"
            >
              <p>
                <strong class="text-white">Ember Anvil</strong> est une forge
                virtuelle où vous incarnez un forgeron qui construit sa
                réputation à partir de rien. Le jeu mêle gestion de ressources,
                artisanat progressif et découverte de recettes dans une
                atmosphère sombre et immersive.
              </p>
              <p>
                Que vous n'ayez jamais joué à un jeu de crafting ou que vous
                veniez d'autres titres du genre, ce guide vous accompagnera pas
                à pas pour prendre en main toutes les mécaniques fondamentales
                d'Ember Anvil.
              </p>
            </div>
          </section>

          <!-- Premiers pas -->
          <section id="premiers-pas">
            <h2 class="section-heading text-3xl font-bold text-amber-100 mb-6">
              Premiers Pas
            </h2>
            <div
              class="prose-content space-y-4 text-gray-300 leading-relaxed text-lg"
            >
              <p>
                À votre arrivée dans Ember Anvil, vous disposez d'un atelier de
                base équipé des outils essentiels : une enclume, un soufflet et
                un marteau. Ces trois composants forment le cœur de votre forge.
              </p>
              <p>
                La première chose à faire est de visiter le
                <strong class="text-amber-300">Marché</strong>. Vous y trouverez
                les matériaux de base — fer, cuivre et charbon — disponibles à
                petits prix. Achetez-en en quantité raisonnable pour ne pas
                vider vos écus dès le départ.
              </p>
              <div
                class="tip-block bg-amber-900/20 border-l-4 border-amber-500 rounded-r-xl p-5 my-6"
              >
                <p
                  class="text-amber-100 font-semibold mb-1 flex items-center gap-2"
                >
                  <Lightbulb :size="16" :stroke-width="2" />
                  Conseil débutant
                </p>
                <p class="text-amber-200/80 text-base">
                  Commencez par acheter 10 unités de Fer et 5 de Charbon. C'est
                  suffisant pour forger vos premières créations et gagner vos
                  premiers points d'expérience.
                </p>
              </div>
            </div>
          </section>

          <!-- Comprendre les matériaux -->
          <section id="materiaux">
            <h2 class="section-heading text-3xl font-bold text-amber-100 mb-6">
              Comprendre les Matériaux
            </h2>
            <div
              class="prose-content space-y-4 text-gray-300 leading-relaxed text-lg"
            >
              <p>
                Chaque matériau dans Ember Anvil possède plusieurs attributs :
                une <strong class="text-white">rareté</strong>, une
                <strong class="text-white">catégorie</strong> et une
                <strong class="text-white">valeur</strong>. La rareté détermine
                la puissance des objets que vous pouvez créer avec ce matériau.
              </p>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6">
                <div
                  v-for="mat in materialTypes"
                  :key="mat.name"
                  class="mat-card bg-black/30 rounded-lg p-4 border border-white/10"
                >
                  <div class="font-bold text-white mb-1">{{ mat.name }}</div>
                  <div class="text-sm text-gray-400">{{ mat.description }}</div>
                  <div class="text-xs text-gray-500 mt-2">
                    Exemples : {{ mat.examples }}
                  </div>
                </div>
              </div>
              <p>
                Les matériaux
                <strong class="text-purple-300">Épiques</strong> et
                <strong class="text-yellow-300">Légendaires</strong> ne
                s'achètent pas — ils se débloquent en progressant et en
                accomplissant des quêtes spéciales.
              </p>
            </div>
          </section>

          <!-- Première forge -->
          <section id="premiere-forge">
            <h2 class="section-heading text-3xl font-bold text-amber-100 mb-6">
              Votre Première Forge
            </h2>
            <div
              class="prose-content space-y-4 text-gray-300 leading-relaxed text-lg"
            >
              <p>
                Rendez-vous dans l'onglet
                <strong class="text-amber-300">Forge</strong>. Vous verrez
                toutes les recettes disponibles selon vos matériaux actuels. Les
                recettes verrouillées s'affichent en grisé — elles nécessitent
                soit plus d'expérience, soit des matériaux que vous n'avez pas
                encore.
              </p>
              <ol class="space-y-4 mt-4">
                <li
                  v-for="(step, i) in forgeSteps"
                  :key="i"
                  class="flex items-start gap-4"
                >
                  <span
                    class="step-num flex-shrink-0 w-8 h-8 rounded-full bg-amber-600/30 border border-amber-500/40 flex items-center justify-center text-amber-300 font-bold text-sm"
                  >
                    {{ i + 1 }}
                  </span>
                  <div>
                    <div class="font-semibold text-white mb-1">
                      {{ step.title }}
                    </div>
                    <div class="text-gray-400 text-base">
                      {{ step.description }}
                    </div>
                  </div>
                </li>
              </ol>
            </div>
          </section>

          <!-- Progression -->
          <section id="progression">
            <h2 class="section-heading text-3xl font-bold text-amber-100 mb-6">
              La Progression
            </h2>
            <div
              class="prose-content space-y-4 text-gray-300 leading-relaxed text-lg"
            >
              <p>
                Ember Anvil propose un système de progression sur plusieurs
                axes. Chaque forge rapporte de l'<strong class="text-white"
                  >expérience (XP)</strong
                >
                proportionnelle à la complexité de la recette et à la rareté des
                matériaux utilisés.
              </p>
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
                <div
                  v-for="prog in progressionAxes"
                  :key="prog.title"
                  class="prog-card bg-black/30 rounded-xl p-5 border border-white/10 text-center"
                >
                  <component
                    :is="prog.icon"
                    :size="32"
                    :stroke-width="1.5"
                    class="mx-auto mb-3"
                    :class="prog.iconClass"
                  />
                  <div class="font-bold text-white mb-2">{{ prog.title }}</div>
                  <div class="text-sm text-gray-400 leading-relaxed">
                    {{ prog.description }}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Conseils d'expert -->
          <section id="conseils">
            <h2 class="section-heading text-3xl font-bold text-amber-100 mb-6">
              Conseils d'Expert
            </h2>
            <div
              class="prose-content space-y-4 text-gray-300 leading-relaxed text-lg"
            >
              <p>
                Ces conseils vous permettront de progresser deux fois plus vite
                que la moyenne des joueurs.
              </p>
              <ul class="space-y-4 mt-4">
                <li
                  v-for="tip in expertTips"
                  :key="tip.title"
                  class="flex items-start gap-4 bg-black/20 rounded-xl p-5 border border-white/8"
                >
                  <CheckCircle
                    :size="20"
                    :stroke-width="2"
                    class="text-emerald-400 flex-shrink-0 mt-0.5"
                  />
                  <div>
                    <div class="font-semibold text-white mb-1">
                      {{ tip.title }}
                    </div>
                    <div class="text-gray-400 text-base">
                      {{ tip.description }}
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </section>

          <!-- Erreurs fréquentes -->
          <section id="erreurs">
            <h2 class="section-heading text-3xl font-bold text-amber-100 mb-6">
              Erreurs Fréquentes à Éviter
            </h2>
            <div
              class="prose-content space-y-4 text-gray-300 leading-relaxed text-lg"
            >
              <p>
                Même les forgerons expérimentés font des erreurs au début. Voici
                les plus courantes et comment les éviter.
              </p>
              <ul class="space-y-4 mt-4">
                <li
                  v-for="err in commonErrors"
                  :key="err.title"
                  class="flex items-start gap-4 bg-red-900/10 rounded-xl p-5 border border-red-900/30"
                >
                  <XCircle
                    :size="20"
                    :stroke-width="2"
                    class="text-red-400 flex-shrink-0 mt-0.5"
                  />
                  <div>
                    <div class="font-semibold text-white mb-1">
                      {{ err.title }}
                    </div>
                    <div class="text-gray-400 text-base">
                      {{ err.description }}
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </section>
        </div>

        <!-- Navigation articles -->
        <footer class="mt-16 pt-10 border-t border-white/10">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p class="text-xs uppercase tracking-widest text-gray-500 mb-2">
                Article suivant
              </p>
              <router-link
                to="/guides/glossaire-forge"
                class="next-article-link block bg-black/30 rounded-xl p-5 border border-white/10 hover:border-amber-500/40 transition-all duration-200 group"
              >
                <div
                  class="font-semibold text-white group-hover:text-amber-300 transition-colors mb-1"
                >
                  Glossaire de la forge →
                </div>
                <div class="text-sm text-gray-500">
                  Maîtrisez le vocabulaire complet
                </div>
              </router-link>
            </div>
            <div class="text-right">
              <p class="text-xs uppercase tracking-widest text-gray-500 mb-2">
                Retour à l'accueil
              </p>
              <router-link
                to="/"
                class="next-article-link block bg-black/30 rounded-xl p-5 border border-white/10 hover:border-amber-500/40 transition-all duration-200 group"
              >
                <div
                  class="font-semibold text-white group-hover:text-amber-300 transition-colors mb-1"
                >
                  ← Ember Anvil
                </div>
                <div class="text-sm text-gray-500">Retour à la forge</div>
              </router-link>
            </div>
          </div>
        </footer>
      </article>
    </main>
    <PageFooter />
  </div>
</template>

<script>
import PageHeader from "@/shared/layout/PageHeader.vue";
import PageFooter from "@/shared/layout/PageFooter.vue";
import {
  Lightbulb,
  CheckCircle,
  XCircle,
  Star,
  Hammer,
  TrendingUp,
} from "lucide-vue-next";

export default {
  name: "GuideDebutantView",
  components: {
    PageHeader,
    PageFooter,
    Lightbulb,
    CheckCircle,
    XCircle,
    Star,
    Hammer,
    TrendingUp,
  },
  mounted() {
    this.addSchema();
  },
  methods: {
    addSchema() {
      const schema = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Comment débuter dans la forge virtuelle : guide complet",
        description:
          "Guide complet pour débutants : premiers pas dans Ember Anvil, comprendre les matériaux, forger vos premiers objets et progresser rapidement.",
        author: {
          "@type": "Organization",
          name: "Ember Anvil",
        },
        publisher: {
          "@type": "Organization",
          name: "Ember Anvil",
        },
        breadcrumb: {
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Accueil",
              item: "https://emberanvil.fr/",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Guides",
              item: "https://emberanvil.fr/guides",
            },
            {
              "@type": "ListItem",
              position: 3,
              name: "Guide débutant",
              item: "https://emberanvil.fr/guides/debuter-dans-la-forge",
            },
          ],
        },
      };
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.text = JSON.stringify(schema);
      document.head.appendChild(script);
    },
  },
  data() {
    return {
      sections: [
        { id: "introduction", label: "Introduction" },
        { id: "premiers-pas", label: "Premiers Pas" },
        { id: "materiaux", label: "Comprendre les Matériaux" },
        { id: "premiere-forge", label: "Votre Première Forge" },
        { id: "progression", label: "La Progression" },
        { id: "conseils", label: "Conseils d'Expert" },
        { id: "erreurs", label: "Erreurs Fréquentes à Éviter" },
      ],
      materialTypes: [
        {
          name: "Métaux Communs",
          description:
            "Abondants et peu coûteux. Parfaits pour les premières forges.",
          examples: "Fer, Cuivre, Aluminium",
        },
        {
          name: "Métaux Précieux",
          description:
            "Plus rares, utilisés pour les objets de qualité supérieure.",
          examples: "Or, Argent, Platine",
        },
        {
          name: "Alliages",
          description:
            "Résultent de la fusion de deux métaux. Propriétés améliorées.",
          examples: "Bronze, Acier, Électrum",
        },
        {
          name: "Matériaux Rares",
          description: "Issus de quêtes et de niveaux avancés. Très puissants.",
          examples: "Mithril, Obsidienne, Adamantine",
        },
      ],
      forgeSteps: [
        {
          title: "Sélectionnez une recette",
          description:
            "Dans l'onglet Forge, parcourez les recettes disponibles. Les icônes vertes indiquent que vous avez tous les matériaux nécessaires.",
        },
        {
          title: "Vérifiez vos matériaux",
          description:
            "Le panneau de droite affiche les ingrédients requis et vos stocks actuels. Manquez-vous de quelque chose ? Direction le Marché.",
        },
        {
          title: "Lancez la forge",
          description:
            "Cliquez sur « Forger ». Une animation de forge se joue, puis l'objet est ajouté à votre inventaire avec sa rareté et ses propriétés.",
        },
        {
          title: "Consultez le résultat",
          description:
            "Rendez-vous dans l'Inventaire pour voir votre création. Chaque objet affiche sa rareté, sa valeur et les statistiques de forge.",
        },
      ],
      progressionAxes: [
        {
          title: "Niveaux",
          description:
            "Gagnez de l'XP à chaque forge. Débloquez de nouvelles recettes et améliorations d'atelier.",
          icon: "TrendingUp",
          iconClass: "text-amber-400",
        },
        {
          title: "Badges",
          description:
            "Accomplissez des exploits pour obtenir des badges de maîtrise. Ils améliorent vos statistiques.",
          icon: "Star",
          iconClass: "text-yellow-400",
        },
        {
          title: "Atelier",
          description:
            "Investissez dans vos outils. Un meilleur marteau réduit le temps de forge. Une meilleure enclume améliore la qualité.",
          icon: "Hammer",
          iconClass: "text-orange-400",
        },
      ],
      expertTips: [
        {
          title: "Faites les quêtes quotidiennes en priorité",
          description:
            "Elles rapportent des récompenses hors du commun et sont réinitialisées chaque jour. C'est la voie la plus rapide vers les matériaux rares.",
        },
        {
          title: "Investissez dans l'atelier tôt",
          description:
            "Améliorer le soufflet en premier réduit le temps de forge de 20%. Sur le long terme, c'est un énorme gain de temps.",
        },
        {
          title: "Consultez le Codex avant d'acheter",
          description:
            "Avant de dépenser vos écus, vérifiez dans le Codex quelles recettes utilisent les matériaux que vous envisagez d'acheter.",
        },
        {
          title: "Diversifiez vos créations",
          description:
            "Forger toujours le même objet rapporte de moins en moins d'XP. Variez les recettes pour maximiser votre gain d'expérience.",
        },
      ],
      commonErrors: [
        {
          title: "Dépenser tous ses écus d'un coup",
          description:
            "Gardez toujours une réserve d'écus. Certains matériaux rares apparaissent en édition limitée et disparaissent si vous n'avez pas les fonds.",
        },
        {
          title: "Ignorer les synergies d'atelier",
          description:
            "Certaines combinaisons d'outils débloquent des bonus cachés. Lisez attentivement les descriptions de chaque outil avant d'investir.",
        },
        {
          title: "Négliger les recettes basiques",
          description:
            "Les recettes communes semblent peu intéressantes mais elles sont nécessaires pour débloquer les recettes épiques et légendaires.",
        },
      ],
    };
  },
};
</script>

<style scoped>
.blog-layout {
  min-height: 100vh;
  background: linear-gradient(to bottom, #0f0d0a 0%, #1a1612 50%, #0f0d0a 100%);
}

.blog-main {
  padding-top: 2rem;
}

.toc-link {
  text-decoration: none;
}

.section-heading {
  border-left: 3px solid #92400e;
  padding-left: 1rem;
}

.tip-block {
  font-size: 0.95rem;
}

.step-num {
  font-family: "Caesar Dressing", serif;
}
</style>
