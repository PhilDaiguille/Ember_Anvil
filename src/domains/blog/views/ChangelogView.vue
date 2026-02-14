<template>
  <div class="blog-layout">
    <PageHeader />
    <main id="main-content" class="blog-main" role="main">
      <div class="blog-container max-w-4xl mx-auto px-6 py-16">
        <!-- Breadcrumb -->
        <nav class="breadcrumb mb-8" aria-label="Fil d'Ariane">
          <ol class="flex items-center gap-2 text-sm text-gray-500">
            <li>
              <router-link to="/" class="hover:text-amber-400 transition-colors"
                >Accueil</router-link
              >
            </li>
            <li class="text-gray-600">/</li>
            <li class="text-gray-300">Changelog</li>
          </ol>
        </nav>

        <!-- Header -->
        <header class="mb-12">
          <div class="flex items-center gap-3 mb-4">
            <span
              class="tag-badge bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs uppercase tracking-widest font-semibold px-3 py-1 rounded-full"
            >
              Nouveautés
            </span>
          </div>
          <h1
            class="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight font-['Caesar_Dressing']"
          >
            Changelog
          </h1>
          <p class="text-xl text-gray-300 leading-relaxed max-w-2xl">
            Toutes les nouveautés, améliorations et corrections d'Ember Anvil —
            mis à jour à chaque version.
          </p>
        </header>

        <!-- Versions -->
        <div class="changelog-list space-y-12">
          <!-- v1.3.0 -->
          <article class="version-card">
            <div class="version-header flex items-start gap-4 mb-6">
              <div class="version-badge">
                <span
                  class="text-lg font-bold text-amber-300 font-['Caesar_Dressing']"
                  >v1.3.0</span
                >
                <span class="text-xs text-gray-500 block mt-0.5"
                  >Mars 2026</span
                >
              </div>
              <div class="version-tag latest-badge">
                <span
                  class="bg-amber-500 text-black text-xs font-bold px-2 py-0.5 rounded"
                  >DERNIÈRE VERSION</span
                >
              </div>
            </div>
            <div
              class="version-content bg-black/30 rounded-xl border border-white/10 p-8"
            >
              <h2 class="text-2xl font-bold text-white mb-6">
                Quêtes Quotidiennes & Interface
              </h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3
                    class="text-sm font-semibold text-amber-400 uppercase tracking-wider mb-3 flex items-center gap-2"
                  >
                    <Plus :size="14" :stroke-width="2.5" />
                    Nouveautés
                  </h3>
                  <ul class="space-y-2">
                    <li
                      v-for="item in v130.additions"
                      :key="item"
                      class="changelog-item text-gray-300 text-sm flex items-start gap-2"
                    >
                      <span class="text-amber-500 mt-0.5 flex-shrink-0">+</span>
                      {{ item }}
                    </li>
                  </ul>
                </div>
                <div>
                  <h3
                    class="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-3 flex items-center gap-2"
                  >
                    <Pencil :size="14" :stroke-width="2.5" />
                    Améliorations
                  </h3>
                  <ul class="space-y-2">
                    <li
                      v-for="item in v130.improvements"
                      :key="item"
                      class="changelog-item text-gray-300 text-sm flex items-start gap-2"
                    >
                      <span class="text-blue-400 mt-0.5 flex-shrink-0">~</span>
                      {{ item }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </article>

          <!-- v1.2.0 -->
          <article class="version-card">
            <div class="version-header flex items-start gap-4 mb-6">
              <div class="version-badge">
                <span
                  class="text-lg font-bold text-gray-300 font-['Caesar_Dressing']"
                  >v1.2.0</span
                >
                <span class="text-xs text-gray-500 block mt-0.5"
                  >Février 2026</span
                >
              </div>
            </div>
            <div
              class="version-content bg-black/30 rounded-xl border border-white/10 p-8"
            >
              <h2 class="text-2xl font-bold text-white mb-6">
                Recettes Légendaires & Synergies
              </h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3
                    class="text-sm font-semibold text-amber-400 uppercase tracking-wider mb-3 flex items-center gap-2"
                  >
                    <Plus :size="14" :stroke-width="2.5" />
                    Nouveautés
                  </h3>
                  <ul class="space-y-2">
                    <li
                      v-for="item in v120.additions"
                      :key="item"
                      class="changelog-item text-gray-300 text-sm flex items-start gap-2"
                    >
                      <span class="text-amber-500 mt-0.5 flex-shrink-0">+</span>
                      {{ item }}
                    </li>
                  </ul>
                </div>
                <div>
                  <h3
                    class="text-sm font-semibold text-blue-400 uppercase tracking-wider mb-3 flex items-center gap-2"
                  >
                    <Pencil :size="14" :stroke-width="2.5" />
                    Améliorations
                  </h3>
                  <ul class="space-y-2">
                    <li
                      v-for="item in v120.improvements"
                      :key="item"
                      class="changelog-item text-gray-300 text-sm flex items-start gap-2"
                    >
                      <span class="text-blue-400 mt-0.5 flex-shrink-0">~</span>
                      {{ item }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </article>

          <!-- v1.1.0 -->
          <article class="version-card">
            <div class="version-header flex items-start gap-4 mb-6">
              <div class="version-badge">
                <span
                  class="text-lg font-bold text-gray-300 font-['Caesar_Dressing']"
                  >v1.1.0</span
                >
                <span class="text-xs text-gray-500 block mt-0.5"
                  >Janvier 2026</span
                >
              </div>
            </div>
            <div
              class="version-content bg-black/30 rounded-xl border border-white/10 p-8"
            >
              <h2 class="text-2xl font-bold text-white mb-6">
                Codex Complet & Filtres
              </h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3
                    class="text-sm font-semibold text-amber-400 uppercase tracking-wider mb-3 flex items-center gap-2"
                  >
                    <Plus :size="14" :stroke-width="2.5" />
                    Nouveautés
                  </h3>
                  <ul class="space-y-2">
                    <li
                      v-for="item in v110.additions"
                      :key="item"
                      class="changelog-item text-gray-300 text-sm flex items-start gap-2"
                    >
                      <span class="text-amber-500 mt-0.5 flex-shrink-0">+</span>
                      {{ item }}
                    </li>
                  </ul>
                </div>
                <div>
                  <h3
                    class="text-sm font-semibold text-green-400 uppercase tracking-wider mb-3 flex items-center gap-2"
                  >
                    <Bug :size="14" :stroke-width="2.5" />
                    Corrections
                  </h3>
                  <ul class="space-y-2">
                    <li
                      v-for="item in v110.fixes"
                      :key="item"
                      class="changelog-item text-gray-300 text-sm flex items-start gap-2"
                    >
                      <span class="text-green-400 mt-0.5 flex-shrink-0">✓</span>
                      {{ item }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </article>

          <!-- v1.0.0 -->
          <article class="version-card">
            <div class="version-header flex items-start gap-4 mb-6">
              <div class="version-badge">
                <span
                  class="text-lg font-bold text-gray-300 font-['Caesar_Dressing']"
                  >v1.0.0</span
                >
                <span class="text-xs text-gray-500 block mt-0.5"
                  >Décembre 2025</span
                >
              </div>
              <div>
                <span
                  class="bg-emerald-600/80 text-white text-xs font-bold px-2 py-0.5 rounded"
                  >LANCEMENT OFFICIEL</span
                >
              </div>
            </div>
            <div
              class="version-content bg-black/30 rounded-xl border border-white/10 p-8"
            >
              <h2 class="text-2xl font-bold text-white mb-4">
                Lancement Officiel d'Ember Anvil
              </h2>
              <p class="text-gray-300 leading-relaxed mb-6">
                Bienvenue dans Ember Anvil ! La forge virtuelle ouvre
                officiellement ses portes avec toutes les fonctionnalités
                fondamentales.
              </p>
              <ul class="space-y-2">
                <li
                  v-for="item in v100.features"
                  :key="item"
                  class="changelog-item text-gray-300 text-sm flex items-start gap-2"
                >
                  <span class="text-emerald-400 mt-0.5 flex-shrink-0">★</span>
                  {{ item }}
                </li>
              </ul>
            </div>
          </article>
        </div>

        <!-- CTA bas de page -->
        <div
          class="mt-16 text-center bg-black/30 rounded-xl border border-white/10 p-10"
        >
          <h2 class="text-2xl font-bold text-white mb-3">Prêt à jouer ?</h2>
          <p class="text-gray-400 mb-6">
            Découvrez toutes les nouveautés en jeu dès maintenant.
          </p>
          <router-link
            to="/forge"
            class="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-500 text-white font-bold py-3 px-8 rounded-lg transition-colors duration-200"
          >
            <Hammer :size="18" :stroke-width="2" />
            Lancer la forge
          </router-link>
        </div>
      </div>
    </main>
    <PageFooter />
  </div>
</template>

<script>
import PageHeader from "@/shared/layout/PageHeader.vue";
import PageFooter from "@/shared/layout/PageFooter.vue";
import { Plus, Pencil, Bug, Hammer } from "lucide-vue-next";

export default {
  name: "ChangelogView",
  components: {
    PageHeader,
    PageFooter,
    Plus,
    Pencil,
    Bug,
    Hammer,
  },
  data() {
    return {
      v130: {
        additions: [
          "Système de quêtes quotidiennes renouvelées chaque jour",
          "15 nouvelles quêtes spéciales à durée limitée",
          "Récompenses exclusives : matériaux rares et écus bonus",
          "Indicateur de progression des quêtes en temps réel",
        ],
        improvements: [
          "Interface de la forge entièrement repensée",
          "Navigation plus fluide entre les sections",
          "Affichage amélioré des raretés avec badges colorés",
          "Performances optimisées sur mobile",
          "Animations de forge plus immersives",
        ],
      },
      v120: {
        additions: [
          "25 nouvelles recettes de niveau Légendaire",
          "Système de synergies entre installations d'atelier",
          "Bonus de production selon les combinaisons d'outils",
          "3 nouveaux matériaux rares : Obsidienne, Mithril, Adamantine",
        ],
        improvements: [
          "Équilibrage général des recettes épiques",
          "Temps de forge réduit pour les niveaux débutants",
          "Descriptions enrichies dans le Codex",
          "Meilleure gestion de l'inventaire en fin de partie",
        ],
      },
      v110: {
        additions: [
          "Codex entièrement complété avec 100+ matériaux documentés",
          "Filtres avancés dans l'inventaire (rareté, type, nom)",
          "Tri par valeur, date de forge et nombre de créations",
          "Statistiques détaillées par catégorie de matériau",
        ],
        fixes: [
          "Correction d'un bug d'affichage des prix en boutique",
          "Fix de la synchronisation de progression dans l'atelier",
          "Résolution d'un crash occasionnel lors de la forge en série",
          "Correction des doublons dans l'historique de forge",
        ],
      },
      v100: {
        features: [
          "Système de crafting complet avec plus de 500 recettes",
          "100+ matériaux répartis en 5 catégories",
          "Boutique de matériaux avec prix dynamiques",
          "Codex encyclopédique des ressources",
          "Atelier personnalisable avec outils et installations",
          "Système de progression : niveaux, badges, expérience",
          "Inventaire avec gestion complète des objets forgés",
          "Profil forgeron avec statistiques détaillées",
        ],
      },
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

.version-card {
  position: relative;
}

.version-badge {
  min-width: 90px;
}

.changelog-item {
  line-height: 1.6;
}
</style>
