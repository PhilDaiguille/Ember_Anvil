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
            <li class="text-gray-300">Comparatif jeux de forge</li>
          </ol>
        </nav>

        <!-- Article Header -->
        <header class="mb-12">
          <div class="flex items-center gap-3 mb-4">
            <span
              class="tag-badge bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-xs uppercase tracking-widest font-semibold px-3 py-1 rounded-full"
            >
              Comparatif
            </span>
            <span class="text-gray-500 text-sm">Mis à jour : Mars 2026</span>
          </div>
          <h1
            class="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
            itemprop="headline"
          >
            Meilleurs jeux de forge en ligne 2026 : comparatif complet
          </h1>
          <p
            class="text-xl text-gray-300 leading-relaxed max-w-2xl"
            itemprop="description"
          >
            Ember Anvil, Minecraft, Valheim, Little Alchemy 2, Stardew Valley —
            quel jeu de forge choisir selon votre style de jeu et vos attentes ?
          </p>
        </header>

        <!-- Introduction -->
        <section class="mb-12">
          <div
            class="prose-content space-y-4 text-gray-300 leading-relaxed text-lg"
          >
            <p>
              Les jeux de
              <strong class="text-white">forge et d'artisanat</strong>
              connaissent un engouement croissant. Entre simulateurs purs, RPG
              ouverts et puzzles alchimiques, l'offre est vaste. Ce comparatif
              vous aide à choisir le titre le mieux adapté à vos préférences.
            </p>
            <p>
              Nous avons évalué chaque jeu selon cinq critères : profondeur du
              crafting, accessibilité, progression, richesse du contenu et
              liberté du joueur.
            </p>
          </div>
        </section>

        <!-- Tableau comparatif -->
        <section class="mb-16">
          <h2
            class="text-3xl font-bold text-amber-100 mb-8 border-l-4 border-amber-700 pl-4"
          >
            Tableau Comparatif
          </h2>
          <div class="overflow-x-auto rounded-xl border border-white/10">
            <table class="comparison-table w-full text-sm">
              <thead>
                <tr class="bg-black/60 border-b border-white/10">
                  <th
                    class="text-left p-4 text-gray-400 font-semibold uppercase tracking-wider"
                  >
                    Jeu
                  </th>
                  <th
                    class="text-center p-4 text-gray-400 font-semibold uppercase tracking-wider"
                  >
                    Crafting
                  </th>
                  <th
                    class="text-center p-4 text-gray-400 font-semibold uppercase tracking-wider"
                  >
                    Accessibilité
                  </th>
                  <th
                    class="text-center p-4 text-gray-400 font-semibold uppercase tracking-wider"
                  >
                    Progression
                  </th>
                  <th
                    class="text-center p-4 text-gray-400 font-semibold uppercase tracking-wider"
                  >
                    Contenu
                  </th>
                  <th
                    class="text-center p-4 text-gray-400 font-semibold uppercase tracking-wider"
                  >
                    Gratuit
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="game in games"
                  :key="game.name"
                  class="border-b border-white/5 transition-colors hover:bg-white/3"
                  :class="{ 'highlighted-row': game.highlighted }"
                >
                  <td class="p-4">
                    <div class="flex items-center gap-3">
                      <span class="text-2xl">{{ game.emoji }}</span>
                      <div>
                        <div class="font-bold text-white text-base">
                          {{ game.name }}
                        </div>
                        <div class="text-gray-500 text-xs">
                          {{ game.genre }}
                        </div>
                      </div>
                      <span
                        v-if="game.highlighted"
                        class="ml-2 bg-amber-500 text-black text-xs font-bold px-2 py-0.5 rounded"
                      >
                        Notre choix
                      </span>
                    </div>
                  </td>
                  <td class="p-4 text-center">
                    <div class="score-stars flex justify-center gap-0.5">
                      <span
                        v-for="i in 5"
                        :key="i"
                        class="text-lg"
                        :class="
                          i <= game.scores.crafting
                            ? 'text-amber-400'
                            : 'text-gray-700'
                        "
                        >★</span
                      >
                    </div>
                  </td>
                  <td class="p-4 text-center">
                    <div class="score-stars flex justify-center gap-0.5">
                      <span
                        v-for="i in 5"
                        :key="i"
                        class="text-lg"
                        :class="
                          i <= game.scores.accessibility
                            ? 'text-amber-400'
                            : 'text-gray-700'
                        "
                        >★</span
                      >
                    </div>
                  </td>
                  <td class="p-4 text-center">
                    <div class="score-stars flex justify-center gap-0.5">
                      <span
                        v-for="i in 5"
                        :key="i"
                        class="text-lg"
                        :class="
                          i <= game.scores.progression
                            ? 'text-amber-400'
                            : 'text-gray-700'
                        "
                        >★</span
                      >
                    </div>
                  </td>
                  <td class="p-4 text-center">
                    <div class="score-stars flex justify-center gap-0.5">
                      <span
                        v-for="i in 5"
                        :key="i"
                        class="text-lg"
                        :class="
                          i <= game.scores.content
                            ? 'text-amber-400'
                            : 'text-gray-700'
                        "
                        >★</span
                      >
                    </div>
                  </td>
                  <td class="p-4 text-center">
                    <span
                      :class="game.free ? 'text-emerald-400' : 'text-red-400'"
                      class="font-semibold"
                    >
                      {{ game.free ? "Oui" : "Non" }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <!-- Fiches détaillées -->
        <section class="space-y-12 mb-16">
          <h2
            class="text-3xl font-bold text-amber-100 mb-8 border-l-4 border-amber-700 pl-4"
          >
            Analyse Détaillée
          </h2>

          <div
            v-for="game in games"
            :key="game.name + '-detail'"
            class="game-card bg-black/30 rounded-xl border p-8"
            :class="
              game.highlighted ? 'border-amber-500/40' : 'border-white/10'
            "
          >
            <div class="flex items-start gap-4 mb-6">
              <span class="text-4xl">{{ game.emoji }}</span>
              <div class="flex-1">
                <h3
                  class="text-2xl font-bold text-white mb-1 flex items-center gap-3 flex-wrap"
                >
                  {{ game.name }}
                  <span
                    v-if="game.highlighted"
                    class="bg-amber-500 text-black text-xs font-bold px-2 py-0.5 rounded"
                  >
                    Notre recommandation
                  </span>
                </h3>
                <p class="text-gray-400 text-sm">
                  {{ game.genre }} · {{ game.platform }}
                </p>
              </div>
            </div>

            <p class="text-gray-300 leading-relaxed mb-6">
              {{ game.description }}
            </p>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4
                  class="text-sm font-semibold text-emerald-400 uppercase tracking-wider mb-3 flex items-center gap-2"
                >
                  <ThumbsUp :size="14" :stroke-width="2.5" />
                  Points forts
                </h4>
                <ul class="space-y-2">
                  <li
                    v-for="pro in game.pros"
                    :key="pro"
                    class="flex items-start gap-2 text-sm text-gray-300"
                  >
                    <span class="text-emerald-400 flex-shrink-0 mt-0.5">+</span>
                    {{ pro }}
                  </li>
                </ul>
              </div>
              <div>
                <h4
                  class="text-sm font-semibold text-red-400 uppercase tracking-wider mb-3 flex items-center gap-2"
                >
                  <ThumbsDown :size="14" :stroke-width="2.5" />
                  Points faibles
                </h4>
                <ul class="space-y-2">
                  <li
                    v-for="con in game.cons"
                    :key="con"
                    class="flex items-start gap-2 text-sm text-gray-300"
                  >
                    <span class="text-red-400 flex-shrink-0 mt-0.5">−</span>
                    {{ con }}
                  </li>
                </ul>
              </div>
            </div>

            <div class="mt-6 bg-black/30 rounded-lg p-4 border border-white/8">
              <p class="text-sm text-gray-400">
                <strong class="text-gray-200">Verdict :</strong>
                {{ game.verdict }}
              </p>
            </div>
          </div>
        </section>

        <!-- Quel jeu pour quel profil ? -->
        <section class="mb-16">
          <h2
            class="text-3xl font-bold text-amber-100 mb-8 border-l-4 border-amber-700 pl-4"
          >
            Quel Jeu pour Quel Profil ?
          </h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              v-for="profile in profiles"
              :key="profile.type"
              class="profile-card bg-black/30 rounded-xl p-6 border border-white/10"
            >
              <div class="flex items-center gap-3 mb-3">
                <span class="text-2xl">{{ profile.icon }}</span>
                <h3 class="font-bold text-white">{{ profile.type }}</h3>
              </div>
              <p class="text-sm text-gray-400 mb-3">
                {{ profile.description }}
              </p>
              <p class="text-sm font-semibold text-amber-300">
                → {{ profile.recommendation }}
              </p>
            </div>
          </div>
        </section>

        <!-- Conclusion -->
        <section
          class="mb-12 bg-amber-900/10 border border-amber-700/30 rounded-xl p-8"
        >
          <h2 class="text-2xl font-bold text-white mb-4">Notre Conclusion</h2>
          <p class="text-gray-300 leading-relaxed mb-4">
            Pour les amateurs de forge virtuelle pure et accessible,
            <strong class="text-amber-300">Ember Anvil</strong>
            s'impose comme le choix évident en 2026. Sa profondeur de crafting,
            son système de progression structuré et son accès gratuit en font
            une référence du genre.
          </p>
          <p class="text-gray-300 leading-relaxed">
            Si vous cherchez un open-world complet, Minecraft ou Valheim
            répondront mieux à vos attentes. Pour une expérience détendue et
            poétique, Little Alchemy 2 reste un classique indémodable.
          </p>
          <div class="mt-6">
            <router-link
              to="/forge"
              class="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-500 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-200"
            >
              <Hammer :size="18" :stroke-width="2" />
              Essayer Ember Anvil gratuitement
            </router-link>
          </div>
        </section>

        <!-- Navigation articles -->
        <footer class="mt-16 pt-10 border-t border-white/10">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p class="text-xs uppercase tracking-widest text-gray-500 mb-2">
                Article précédent
              </p>
              <router-link
                to="/guides/glossaire-forge"
                class="block bg-black/30 rounded-xl p-5 border border-white/10 hover:border-amber-500/40 transition-all duration-200 group"
              >
                <div
                  class="font-semibold text-white group-hover:text-amber-300 transition-colors mb-1"
                >
                  ← Glossaire de la forge
                </div>
                <div class="text-sm text-gray-500">
                  Tous les termes expliqués
                </div>
              </router-link>
            </div>
            <div class="text-right">
              <p class="text-xs uppercase tracking-widest text-gray-500 mb-2">
                Retour à l'accueil
              </p>
              <router-link
                to="/"
                class="block bg-black/30 rounded-xl p-5 border border-white/10 hover:border-amber-500/40 transition-all duration-200 group"
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
import { ThumbsUp, ThumbsDown, Hammer } from "lucide-vue-next";

export default {
  name: "ComparatifView",
  components: {
    PageHeader,
    PageFooter,
    ThumbsUp,
    ThumbsDown,
    Hammer,
  },
  mounted() {
    this.addSchema();
  },
  methods: {
    addSchema() {
      const schema = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Meilleurs jeux de forge en ligne 2026 : comparatif complet",
        description:
          "Comparatif des meilleurs jeux de forge : Ember Anvil, Minecraft, Valheim, Little Alchemy 2, Stardew Valley. Quel jeu choisir en 2026 ?",
        author: {
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
            },
            {
              "@type": "ListItem",
              position: 3,
              name: "Comparatif jeux de forge",
              item: "https://emberanvil.fr/guides/meilleurs-jeux-de-forge",
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
      games: [
        {
          name: "Ember Anvil",
          emoji: "🔥",
          genre: "Forge virtuelle",
          platform: "Navigateur web · Gratuit",
          highlighted: true,
          free: true,
          scores: {
            crafting: 5,
            accessibility: 5,
            progression: 5,
            content: 4,
          },
          description:
            "Ember Anvil est un simulateur de forge virtuelle dédié à l'artisanat. Avec plus de 500 recettes, un système de raretés en 5 niveaux et des quêtes quotidiennes, il offre la profondeur de crafting la plus complète parmi les jeux gratuits du genre.",
          pros: [
            "Crafting le plus approfondi du comparatif",
            "Entièrement gratuit, sans achats in-app",
            "Interface claire et accessible",
            "Progression structurée avec quêtes quotidiennes",
            "100+ matériaux avec propriétés détaillées",
          ],
          cons: [
            "Focalisé uniquement sur la forge — pas d'exploration",
            "Pas de mode multijoueur",
            "Graphismes épurés (navigateur web)",
          ],
          verdict:
            "Le meilleur choix pour qui veut se concentrer sur l'artisanat pur. Profond, gratuit et accessible dès la première minute.",
        },
        {
          name: "Minecraft",
          emoji: "⛏️",
          genre: "Sandbox / Survie",
          platform: "PC, Console, Mobile · Payant",
          highlighted: false,
          free: false,
          scores: {
            crafting: 3,
            accessibility: 3,
            progression: 3,
            content: 5,
          },
          description:
            "Minecraft est le roi des jeux sandbox avec un système de crafting simple mais vaste. La forge y est une composante parmi d'autres dans un univers de survie et d'exploration infini.",
          pros: [
            "Monde infini à explorer et construire",
            "Communauté et mods gigantesques",
            "Contenu régulièrement mis à jour",
            "Multijoueur très développé",
          ],
          cons: [
            "Crafting peu profond comparé aux simulateurs dédiés",
            "Courbe d'apprentissage initiale pour les débutants",
            "Nécessite un achat (~27€)",
            "Forge secondaire par rapport à l'exploration",
          ],
          verdict:
            "Idéal si vous voulez construire et explorer en plus de crafter. Pas le meilleur choix si la forge est votre priorité absolue.",
        },
        {
          name: "Valheim",
          emoji: "🪓",
          genre: "Survie / RPG nordique",
          platform: "PC · Payant",
          highlighted: false,
          free: false,
          scores: {
            crafting: 4,
            accessibility: 2,
            progression: 4,
            content: 4,
          },
          description:
            "Valheim propose l'un des systèmes de forge les plus immersifs des jeux de survie. La forge y est centrale : vous devez construire et améliorer votre atelier pour progresser dans le monde viking.",
          pros: [
            "Forge très immersive et importante pour la progression",
            "Atmosphère nordique unique",
            "Excellent en coopération jusqu'à 10 joueurs",
            "Contenu régulièrement enrichi",
          ],
          cons: [
            "Courbe d'apprentissage abrupte",
            "Nécessite un PC de jeu et un achat (~20€)",
            "Moins accessible que les jeux navigateur",
            "Beaucoup de farming pour progresser",
          ],
          verdict:
            "Le meilleur pour une expérience de forge dans un RPG de survie. Pour joueurs chevronnés cherchant une vraie aventure.",
        },
        {
          name: "Little Alchemy 2",
          emoji: "⚗️",
          genre: "Puzzle / Alchimie",
          platform: "Navigateur web · Gratuit",
          highlighted: false,
          free: true,
          scores: {
            crafting: 2,
            accessibility: 5,
            progression: 2,
            content: 3,
          },
          description:
            "Little Alchemy 2 est un jeu de combinaisons et de découvertes où vous mélangez des éléments pour en créer de nouveaux. C'est plus un puzzle d'alchimie qu'un véritable simulateur de forge.",
          pros: [
            "Extrêmement accessible — jouable en un clic",
            "Gratuit et disponible sur tous les appareils",
            "Créatif et surprenant",
            "Parfait pour des sessions courtes",
          ],
          cons: [
            "Pas de vrai système de progression",
            "Crafting très simplifié (combinaisons aléatoires)",
            "Pas de gestion de ressources",
            "Lassant sur le long terme",
          ],
          verdict:
            "Un excellent jeu de détente, mais pas un simulateur de forge. À essayer pour son côté ludique et décontracté.",
        },
        {
          name: "Stardew Valley",
          emoji: "🌾",
          genre: "Simulation agricole / RPG",
          platform: "PC, Console, Mobile · Payant",
          highlighted: false,
          free: false,
          scores: {
            crafting: 3,
            accessibility: 4,
            progression: 4,
            content: 5,
          },
          description:
            "Stardew Valley intègre un système de forge et d'artisanat dans un simulateur de vie agricole. La forge est présente mais reste secondaire face à l'agriculture, la pêche et les relations sociales.",
          pros: [
            "Jeu extrêmement riche et complet",
            "Ambiance relaxante et attachante",
            "Forge intégrée dans un univers cohérent",
            "Excellente durée de vie (100h+)",
          ],
          cons: [
            "La forge est une activité parmi 20 autres",
            "Payant (~15€)",
            "Peu profond sur l'aspect artisanat pur",
            "Progression lente au début",
          ],
          verdict:
            "Parfait si vous voulez un jeu de vie complet avec un aspect forge. Pas adapté si l'artisanat est votre seul intérêt.",
        },
      ],
      profiles: [
        {
          icon: "🔥",
          type: "Amateur de forge pure",
          description:
            "Vous voulez des centaines de recettes, un système de raretés et une progression dédiée à l'artisanat.",
          recommendation:
            "Ember Anvil — le simulateur de forge le plus complet et gratuit.",
        },
        {
          icon: "⚔️",
          type: "Joueur RPG / Survie",
          description:
            "Vous aimez explorer, combattre et forger dans un univers ouvert immersif.",
          recommendation:
            "Valheim pour une aventure nordique, Minecraft pour la liberté totale.",
        },
        {
          icon: "🧩",
          type: "Joueur casual",
          description:
            "Sessions courtes, pas de prise de tête, juste le plaisir de combiner des éléments.",
          recommendation:
            "Little Alchemy 2 — simple, gratuit, parfait pour 10 minutes de pause.",
        },
        {
          icon: "🌻",
          type: "Simulateur de vie",
          description:
            "Vous voulez gérer une ferme, tisser des liens et forger dans un univers charmant.",
          recommendation:
            "Stardew Valley — un chef-d'œuvre de simulation avec une touche de forge.",
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

.comparison-table th,
.comparison-table td {
  white-space: nowrap;
}

.highlighted-row {
  background: rgba(133, 50, 51, 0.1);
}

.highlighted-row:hover {
  background: rgba(133, 50, 51, 0.15);
}
</style>
