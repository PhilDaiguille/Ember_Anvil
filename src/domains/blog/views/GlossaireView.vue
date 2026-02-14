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
            <li class="text-gray-300">Glossaire</li>
          </ol>
        </nav>

        <!-- Article Header -->
        <header class="mb-12">
          <div class="flex items-center gap-3 mb-4">
            <span
              class="tag-badge bg-blue-500/20 text-blue-300 border border-blue-500/30 text-xs uppercase tracking-widest font-semibold px-3 py-1 rounded-full"
            >
              Référence
            </span>
            <span class="text-gray-500 text-sm"
              >{{ totalTerms }} termes définis</span
            >
          </div>
          <h1
            class="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
            itemprop="headline"
          >
            Glossaire de la forge et de l'artisanat virtuel
          </h1>
          <p
            class="text-xl text-gray-300 leading-relaxed max-w-2xl"
            itemprop="description"
          >
            Tous les termes essentiels pour maîtriser le vocabulaire d'Ember
            Anvil — de l'alliage à la trempe, chaque concept expliqué
            clairement.
          </p>
        </header>

        <!-- Navigation alphabétique -->
        <nav
          class="alpha-nav bg-black/40 border border-white/10 rounded-xl p-5 mb-12"
          aria-label="Navigation alphabétique"
        >
          <div class="flex flex-wrap gap-2">
            <a
              v-for="letter in availableLetters"
              :key="letter"
              :href="'#letter-' + letter"
              class="alpha-link w-9 h-9 flex items-center justify-center rounded-lg bg-black/30 border border-white/10 text-gray-300 hover:bg-amber-600/20 hover:border-amber-500/40 hover:text-amber-300 transition-all duration-200 font-semibold text-sm"
              :aria-label="'Termes commençant par ' + letter"
            >
              {{ letter }}
            </a>
          </div>
        </nav>

        <!-- Termes groupés par lettre -->
        <div class="glossary-content space-y-12">
          <div
            v-for="group in groupedTerms"
            :key="group.letter"
            :id="'letter-' + group.letter"
            class="letter-group"
          >
            <div class="letter-header flex items-center gap-4 mb-6">
              <span
                class="letter-badge text-3xl font-bold text-amber-600/60 font-['Caesar_Dressing'] w-12"
              >
                {{ group.letter }}
              </span>
              <div class="flex-1 h-px bg-white/10"></div>
            </div>

            <dl class="terms-list space-y-4">
              <div
                v-for="term in group.terms"
                :key="term.name"
                class="term-item bg-black/30 rounded-xl border border-white/10 p-6 hover:border-white/20 transition-all duration-200"
              >
                <dt
                  class="term-name text-xl font-bold text-white mb-2 flex items-center gap-3"
                >
                  {{ term.name }}
                  <span
                    v-if="term.category"
                    class="term-category text-xs font-normal px-2 py-0.5 rounded-full border"
                    :class="categoryClasses[term.category]"
                  >
                    {{ term.category }}
                  </span>
                </dt>
                <dd class="term-definition text-gray-300 leading-relaxed">
                  {{ term.definition }}
                </dd>
                <div
                  v-if="term.seeAlso && term.seeAlso.length"
                  class="mt-3 text-sm text-gray-500"
                >
                  Voir aussi :
                  <span v-for="(ref, i) in term.seeAlso" :key="ref">
                    <span class="text-amber-400/70">{{ ref }}</span
                    ><span v-if="i < term.seeAlso.length - 1">, </span>
                  </span>
                </div>
              </div>
            </dl>
          </div>
        </div>

        <!-- Navigation articles -->
        <footer class="mt-16 pt-10 border-t border-white/10">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p class="text-xs uppercase tracking-widest text-gray-500 mb-2">
                Article précédent
              </p>
              <router-link
                to="/guides/debuter-dans-la-forge"
                class="next-article-link block bg-black/30 rounded-xl p-5 border border-white/10 hover:border-amber-500/40 transition-all duration-200 group"
              >
                <div
                  class="font-semibold text-white group-hover:text-amber-300 transition-colors mb-1"
                >
                  ← Guide débutant
                </div>
                <div class="text-sm text-gray-500">Commencer dans la forge</div>
              </router-link>
            </div>
            <div class="text-right">
              <p class="text-xs uppercase tracking-widest text-gray-500 mb-2">
                Article suivant
              </p>
              <router-link
                to="/guides/meilleurs-jeux-de-forge"
                class="next-article-link block bg-black/30 rounded-xl p-5 border border-white/10 hover:border-amber-500/40 transition-all duration-200 group"
              >
                <div
                  class="font-semibold text-white group-hover:text-amber-300 transition-colors mb-1"
                >
                  Comparatif jeux de forge →
                </div>
                <div class="text-sm text-gray-500">
                  Quel jeu choisir en 2026 ?
                </div>
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

const ALL_TERMS = [
  {
    name: "Alliage",
    definition:
      "Matériau obtenu par la fusion de deux métaux ou plus. Les alliages possèdent des propriétés supérieures à leurs composants individuels. Le Bronze (cuivre + étain) et l'Acier (fer + carbone) sont les alliages les plus courants dans Ember Anvil.",
    category: "Matériau",
    seeAlso: ["Bronze", "Acier", "Fusion"],
  },
  {
    name: "Artisanat",
    definition:
      "L'ensemble des activités de création manuelle dans Ember Anvil. L'artisanat englobe la forge, l'assemblage, la trempe et le polissage d'objets. Plus votre niveau d'artisanat est élevé, meilleures sont vos créations.",
    category: "Mécanique",
    seeAlso: ["Forge", "Crafting"],
  },
  {
    name: "Atelier",
    definition:
      "Votre espace de travail personnel dans Ember Anvil. L'atelier contient vos outils, vos installations et votre historique de forge. Il peut être amélioré progressivement pour débloquer de nouvelles capacités.",
    category: "Interface",
    seeAlso: ["Outil", "Installation"],
  },
  {
    name: "Badge",
    definition:
      "Récompense visuelle obtenue en accomplissant des exploits particuliers. Les badges peuvent améliorer certaines statistiques de votre forgeron ou débloquer des recettes exclusives.",
    category: "Progression",
    seeAlso: ["Progression", "Quête"],
  },
  {
    name: "Bronze",
    definition:
      "Alliage de cuivre et d'étain. L'un des premiers alliages disponibles dans Ember Anvil, le Bronze est utilisé dans de nombreuses recettes intermédiaires et offre un bon équilibre solidité/maniabilité.",
    category: "Matériau",
    seeAlso: ["Alliage", "Cuivre"],
  },
  {
    name: "Codex",
    definition:
      "L'encyclopédie complète d'Ember Anvil. Le Codex répertorie tous les matériaux, leurs propriétés, origines et usages. C'est la ressource de référence indispensable pour planifier vos créations.",
    category: "Interface",
    seeAlso: ["Matériau", "Recette"],
  },
  {
    name: "Crafting",
    definition:
      "Terme anglais désignant l'artisanat virtuel. Dans Ember Anvil, le crafting correspond à l'acte de combiner des matériaux selon une recette pour créer un nouvel objet.",
    category: "Mécanique",
    seeAlso: ["Forge", "Recette"],
  },
  {
    name: "Écus",
    definition:
      "La monnaie virtuelle d'Ember Anvil. Les écus s'obtiennent en vendant vos créations à la boutique ou en complétant des quêtes. Ils servent à acheter des matériaux et à améliorer votre atelier.",
    category: "Économie",
    seeAlso: ["Boutique", "Marché"],
  },
  {
    name: "Épique",
    definition:
      "Quatrième niveau de rareté, juste en dessous du Légendaire. Les objets épiques nécessitent des matériaux avancés et un niveau de forgeron élevé. Ils sont très recherchés pour leurs propriétés puissantes.",
    category: "Rareté",
    seeAlso: ["Rareté", "Légendaire"],
  },
  {
    name: "Expérience",
    definition:
      "Points (XP) gagnés à chaque forge. L'expérience fait progresser votre niveau de forgeron, ce qui débloque de nouvelles recettes et améliorations. Les recettes complexes et les matériaux rares donnent plus d'XP.",
    category: "Progression",
    seeAlso: ["Niveau", "Badge"],
  },
  {
    name: "Forge",
    definition:
      "L'atelier central d'Ember Anvil où se déroule la création d'objets. Par extension, le terme désigne aussi l'acte de fabriquer un objet selon une recette.",
    category: "Interface",
    seeAlso: ["Recette", "Atelier"],
  },
  {
    name: "Fusion",
    definition:
      "Procédé par lequel deux matériaux sont mélangés à haute température pour créer un alliage. La fusion est la première étape dans la création de nombreux matériaux composites.",
    category: "Mécanique",
    seeAlso: ["Alliage", "Trempe"],
  },
  {
    name: "Installation",
    definition:
      "Équipement fixe de votre atelier (fourneau, forge, établi, enclume). Les installations peuvent être améliorées pour augmenter la vitesse de production et la qualité des créations.",
    category: "Atelier",
    seeAlso: ["Atelier", "Outil"],
  },
  {
    name: "Inventaire",
    definition:
      "Espace de stockage où sont conservés tous vos objets forgés et matériaux non utilisés. L'inventaire affiche la rareté, la valeur et les propriétés de chaque objet.",
    category: "Interface",
    seeAlso: ["Atelier", "Matériau"],
  },
  {
    name: "Légendaire",
    definition:
      "Le niveau de rareté le plus élevé dans Ember Anvil. Les objets légendaires nécessitent des matériaux extrêmement rares, un niveau de forgeron maximal et parfois des quêtes spéciales. Ce sont les créations les plus précieuses du jeu.",
    category: "Rareté",
    seeAlso: ["Rareté", "Épique", "Mithril"],
  },
  {
    name: "Marché",
    definition:
      "La boutique d'Ember Anvil où vous pouvez acheter des matériaux et vendre vos créations. Le marché propose des matériaux communs en permanence et des matériaux rares en édition limitée.",
    category: "Interface",
    seeAlso: ["Écus", "Matériau"],
  },
  {
    name: "Matériau",
    definition:
      "Ressource de base utilisée dans les recettes de forge. Chaque matériau possède une rareté, une catégorie (métal, pierre, organique) et des propriétés qui influencent les objets créés.",
    category: "Général",
    seeAlso: ["Alliage", "Rareté", "Codex"],
  },
  {
    name: "Mithril",
    definition:
      "Matériau légendaire d'Ember Anvil. Le Mithril est un métal fictif d'une légèreté et d'une résistance extraordinaires. Il ne s'obtient que par des quêtes avancées et est utilisé exclusivement dans les recettes légendaires.",
    category: "Matériau",
    seeAlso: ["Légendaire", "Adamantine"],
  },
  {
    name: "Niveau",
    definition:
      "Indicateur de la progression globale de votre forgeron. Chaque niveau débloque de nouvelles recettes, améliore vos capacités de base et peut ouvrir l'accès à des zones et matériaux exclusifs.",
    category: "Progression",
    seeAlso: ["Expérience", "Badge"],
  },
  {
    name: "Outil",
    definition:
      "Équipement mobile de votre atelier (marteau, burin, pinces, soufflet). Les outils influencent directement la qualité et la vitesse de vos forges. Ils peuvent être améliorés avec des matériaux spécifiques.",
    category: "Atelier",
    seeAlso: ["Installation", "Atelier"],
  },
  {
    name: "Qualité",
    definition:
      "Mesure de la perfection d'un objet forgé, distincte de sa rareté. La qualité dépend de votre niveau, de vos outils et de la complexité de la recette. Un objet commun peut avoir une qualité exceptionnelle.",
    category: "Mécanique",
    seeAlso: ["Rareté", "Niveau"],
  },
  {
    name: "Quête",
    definition:
      "Mission assignée à votre forgeron, renouvelée quotidiennement ou déclenchée par des événements spéciaux. Les quêtes offrent des récompenses uniques — matériaux rares, écus bonus et déblocages exclusifs.",
    category: "Progression",
    seeAlso: ["Badge", "Récompense"],
  },
  {
    name: "Rareté",
    definition:
      "Système de classification des matériaux et objets en cinq niveaux : Commun, Peu Commun, Rare, Épique et Légendaire. La rareté détermine la puissance, la valeur et la difficulté d'obtention d'un objet.",
    category: "Général",
    seeAlso: ["Commun", "Légendaire", "Épique"],
  },
  {
    name: "Recette",
    definition:
      "Formule de fabrication indiquant les matériaux nécessaires et leurs quantités pour créer un objet. Les recettes sont répertoriées dans le Codex et se débloquent progressivement selon votre niveau.",
    category: "Mécanique",
    seeAlso: ["Codex", "Forge", "Matériau"],
  },
  {
    name: "Synergie",
    definition:
      "Bonus spécial activé lorsque certaines combinaisons d'outils ou d'installations sont réunies dans l'atelier. Les synergies peuvent augmenter la vitesse de forge, la qualité des créations ou réduire la consommation de matériaux.",
    category: "Mécanique",
    seeAlso: ["Installation", "Outil"],
  },
  {
    name: "Tier",
    definition:
      "Niveau de difficulté et de puissance d'une recette ou d'un matériau, souvent noté de I à V. Les tiers élevés requièrent plus d'expérience et des matériaux plus rares mais produisent des objets bien plus précieux.",
    category: "Général",
    seeAlso: ["Niveau", "Rareté"],
  },
  {
    name: "Trempe",
    definition:
      "Traitement thermique appliqué à un objet forgé pour renforcer sa dureté. La trempe est une étape avancée qui améliore les propriétés d'un objet déjà forgé, le faisant potentiellement changer de niveau de rareté.",
    category: "Mécanique",
    seeAlso: ["Forge", "Qualité"],
  },
];

export default {
  name: "GlossaireView",
  components: {
    PageHeader,
    PageFooter,
  },
  mounted() {
    this.addSchema();
  },
  methods: {
    addSchema() {
      const schema = {
        "@context": "https://schema.org",
        "@type": "Article",
        headline: "Glossaire de la forge et de l'artisanat virtuel",
        description:
          "Glossaire complet des termes de la forge virtuelle : alliage, rareté, trempe, codex et plus de 20 définitions pour maîtriser Ember Anvil.",
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
              name: "Glossaire",
              item: "https://emberanvil.fr/guides/glossaire-forge",
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
  computed: {
    totalTerms() {
      return ALL_TERMS.length;
    },
    availableLetters() {
      const letters = new Set(ALL_TERMS.map((t) => t.name[0].toUpperCase()));
      return [...letters].sort();
    },
    groupedTerms() {
      const groups = {};
      for (const term of ALL_TERMS) {
        const letter = term.name[0].toUpperCase();
        if (!groups[letter]) groups[letter] = { letter, terms: [] };
        groups[letter].terms.push(term);
      }
      return Object.values(groups).sort((a, b) =>
        a.letter.localeCompare(b.letter),
      );
    },
    categoryClasses() {
      return {
        Matériau: "text-amber-300 border-amber-600/40 bg-amber-900/20",
        Mécanique: "text-blue-300 border-blue-600/40 bg-blue-900/20",
        Interface: "text-purple-300 border-purple-600/40 bg-purple-900/20",
        Progression: "text-green-300 border-green-600/40 bg-green-900/20",
        Économie: "text-yellow-300 border-yellow-600/40 bg-yellow-900/20",
        Rareté: "text-rose-300 border-rose-600/40 bg-rose-900/20",
        Atelier: "text-orange-300 border-orange-600/40 bg-orange-900/20",
        Général: "text-gray-300 border-gray-600/40 bg-gray-900/20",
      };
    },
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

.alpha-link {
  text-decoration: none;
  font-family: "Caesar Dressing", serif;
}

.letter-badge {
  line-height: 1;
}

.term-name {
  flex-wrap: wrap;
}
</style>
