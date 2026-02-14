/**
 * ACHIEVEMENTS DATA
 *
 * Achievement definitions for the game.
 * Each achievement has a condition type and threshold.
 * The game store checks conditions against player/crafting/inventory/workshop state.
 */

export const ACHIEVEMENTS = [
  // ========== CRAFTING ==========
  {
    id: "first_forge",
    nom: "Première Forge",
    description: "Forgez votre premier objet",
    categorie: "crafting",
    icone: "Hammer",
    condition: { type: "items_forged", seuil: 1 },
    recompense: { ecus: 50, experience: 25 },
  },
  {
    id: "apprenti_forgeron",
    nom: "Apprenti Forgeron",
    description: "Forgez 10 objets",
    categorie: "crafting",
    icone: "Hammer",
    condition: { type: "items_forged", seuil: 10 },
    recompense: { ecus: 200, experience: 100 },
  },
  {
    id: "maitre_forgeron",
    nom: "Maître Forgeron",
    description: "Forgez 50 objets",
    categorie: "crafting",
    icone: "Hammer",
    condition: { type: "items_forged", seuil: 50 },
    recompense: { ecus: 1000, experience: 500 },
  },
  {
    id: "legende_forge",
    nom: "Légende de la Forge",
    description: "Forgez 100 objets",
    categorie: "crafting",
    icone: "Crown",
    condition: { type: "items_forged", seuil: 100 },
    recompense: { ecus: 5000, experience: 2000 },
  },
  {
    id: "premiere_qualite",
    nom: "Qualité Supérieure",
    description: "Forgez un objet avec une qualité de 4 ou plus",
    categorie: "crafting",
    icone: "Star",
    condition: { type: "quality_reached", seuil: 4 },
    recompense: { ecus: 300, experience: 150 },
  },
  {
    id: "perfection",
    nom: "Perfection",
    description: "Forgez un objet avec une qualité de 5",
    categorie: "crafting",
    icone: "Sparkles",
    condition: { type: "quality_reached", seuil: 5 },
    recompense: { ecus: 1000, experience: 500 },
  },

  // ========== PROGRESSION ==========
  {
    id: "niveau_5",
    nom: "Forgeron Confirmé",
    description: "Atteignez le niveau 5",
    categorie: "progression",
    icone: "TrendingUp",
    condition: { type: "niveau", seuil: 5 },
    recompense: { ecus: 500, or: 10 },
  },
  {
    id: "niveau_10",
    nom: "Forgeron Expert",
    description: "Atteignez le niveau 10",
    categorie: "progression",
    icone: "TrendingUp",
    condition: { type: "niveau", seuil: 10 },
    recompense: { ecus: 1000, or: 25 },
  },
  {
    id: "niveau_25",
    nom: "Maître Artisan",
    description: "Atteignez le niveau 25",
    categorie: "progression",
    icone: "Crown",
    condition: { type: "niveau", seuil: 25 },
    recompense: { ecus: 5000, or: 100 },
  },

  // ========== ÉCONOMIE ==========
  {
    id: "premier_achat",
    nom: "Premier Achat",
    description: "Achetez un matériau au marché",
    categorie: "economie",
    icone: "ShoppingCart",
    condition: { type: "achats", seuil: 1 },
    recompense: { ecus: 25, experience: 10 },
  },
  {
    id: "gros_acheteur",
    nom: "Gros Acheteur",
    description: "Achetez 50 matériaux au total",
    categorie: "economie",
    icone: "ShoppingCart",
    condition: { type: "achats", seuil: 50 },
    recompense: { ecus: 500, experience: 200 },
  },
  {
    id: "premiere_vente",
    nom: "Première Vente",
    description: "Vendez un objet forgé",
    categorie: "economie",
    icone: "Coins",
    condition: { type: "ventes", seuil: 1 },
    recompense: { ecus: 50, experience: 20 },
  },
  {
    id: "marchand",
    nom: "Marchand Prospère",
    description: "Gagnez 5000 écus grâce aux ventes",
    categorie: "economie",
    icone: "Coins",
    condition: { type: "gains_ventes", seuil: 5000 },
    recompense: { ecus: 1000, experience: 300 },
  },
  {
    id: "tresor",
    nom: "Trésor Accumulé",
    description: "Possédez 10000 écus en même temps",
    categorie: "economie",
    icone: "Gem",
    condition: { type: "ecus_max", seuil: 10000 },
    recompense: { or: 50, experience: 500 },
  },

  // ========== ATELIER ==========
  {
    id: "premiere_amelioration",
    nom: "Première Amélioration",
    description: "Améliorez un outil pour la première fois",
    categorie: "atelier",
    icone: "Wrench",
    condition: { type: "tool_upgrades", seuil: 1 },
    recompense: { ecus: 100, experience: 50 },
  },
  {
    id: "outil_max",
    nom: "Outil Parfait",
    description: "Maximisez un outil au niveau 10",
    categorie: "atelier",
    icone: "Award",
    condition: { type: "tool_maxed", seuil: 1 },
    recompense: { ecus: 2000, experience: 1000 },
  },
  {
    id: "tous_outils",
    nom: "Collection Complète",
    description: "Améliorez les 4 outils au moins une fois",
    categorie: "atelier",
    icone: "Wrench",
    condition: { type: "unique_tools_upgraded", seuil: 4 },
    recompense: { ecus: 500, experience: 250 },
  },
  {
    id: "premiere_facilite",
    nom: "Installation Active",
    description: "Activez une installation pour la première fois",
    categorie: "atelier",
    icone: "Zap",
    condition: { type: "facilities_activated", seuil: 1 },
    recompense: { ecus: 200, experience: 100 },
  },
  {
    id: "synergie",
    nom: "Synergie Parfaite",
    description: "Activez une synergie outil-installation",
    categorie: "atelier",
    icone: "Sparkles",
    condition: { type: "synergies_active", seuil: 1 },
    recompense: { ecus: 300, experience: 150 },
  },
  {
    id: "productivite_max",
    nom: "Productivité Maximale",
    description: "Atteignez 80% de productivité globale",
    categorie: "atelier",
    icone: "Target",
    condition: { type: "productivite", seuil: 80 },
    recompense: { ecus: 3000, or: 50 },
  },

  // ========== COLLECTION ==========
  {
    id: "decouverte",
    nom: "Première Découverte",
    description: "Découvrez un nouveau matériau dans le codex",
    categorie: "collection",
    icone: "BookOpen",
    condition: { type: "materials_discovered", seuil: 1 },
    recompense: { ecus: 25, experience: 15 },
  },
  {
    id: "collectionneur",
    nom: "Collectionneur",
    description: "Découvrez 15 matériaux différents",
    categorie: "collection",
    icone: "BookOpen",
    condition: { type: "materials_discovered", seuil: 15 },
    recompense: { ecus: 500, experience: 250 },
  },
  {
    id: "encyclopedie",
    nom: "Encyclopédie Vivante",
    description: "Découvrez tous les 30 matériaux",
    categorie: "collection",
    icone: "Crown",
    condition: { type: "materials_discovered", seuil: 30 },
    recompense: { ecus: 5000, or: 100 },
  },
  {
    id: "recettes_5",
    nom: "Recettes Débloquées",
    description: "Débloquez 5 recettes de forge",
    categorie: "collection",
    icone: "ScrollText",
    condition: { type: "recipes_unlocked", seuil: 5 },
    recompense: { ecus: 200, experience: 100 },
  },

  // ========== QUÊTES ==========
  {
    id: "premiere_quete",
    nom: "Première Quête",
    description: "Complétez votre première quête",
    categorie: "quetes",
    icone: "CheckCircle",
    condition: { type: "quetes_completees", seuil: 1 },
    recompense: { ecus: 100, experience: 50 },
  },
  {
    id: "queteur",
    nom: "Quêteur Assidu",
    description: "Complétez 10 quêtes",
    categorie: "quetes",
    icone: "Target",
    condition: { type: "quetes_completees", seuil: 10 },
    recompense: { ecus: 1000, experience: 500 },
  },
];

// Categories for UI filtering
export const ACHIEVEMENT_CATEGORIES = [
  { id: "all", nom: "Tous" },
  { id: "crafting", nom: "Forge" },
  { id: "progression", nom: "Progression" },
  { id: "economie", nom: "Économie" },
  { id: "atelier", nom: "Atelier" },
  { id: "collection", nom: "Collection" },
  { id: "quetes", nom: "Quêtes" },
];

// Helper: get achievement by ID
export function getAchievementById(id) {
  return ACHIEVEMENTS.find((a) => a.id === id);
}

// Helper: get achievements by category
export function getAchievementsByCategorie(categorie) {
  return ACHIEVEMENTS.filter((a) => a.categorie === categorie);
}

// Default state for all achievements (unlocked: false)
export function getDefaultAchievementsState() {
  const state = {};
  ACHIEVEMENTS.forEach((a) => {
    state[a.id] = { unlocked: false, date: null };
  });
  return state;
}
