/**
 * TOOLS DATA
 *
 * 4 tools available for upgrade in the workshop
 * Each tool has 10 levels with progressive cost increases
 */

export const TOOLS = {
  marteau: {
    id: "marteau",
    nom: "Marteau Lourd",
    icone: "Hammer",
    description: "Un marteau robuste pour forger les métaux",
    niveauMax: 10,
    niveauInitial: 1,
    pouvoirInitial: 45,
    pouvoirParNiveau: 5, // +5 pouvoir par niveau
    coutUpgradeBase: 500,
    multiplicateurCout: 1.5, // Coût * 1.5 à chaque niveau
    bonusFacilite: "trempage", // Synergy with Station de Trempage
  },
  enclume: {
    id: "enclume",
    nom: "Enclume Renforcée",
    icone: "Anvil",
    description: "Une enclume solide pour façonner les créations",
    niveauMax: 10,
    niveauInitial: 1,
    pouvoirInitial: 40,
    pouvoirParNiveau: 5,
    coutUpgradeBase: 800,
    multiplicateurCout: 1.5,
    bonusFacilite: "elementaire", // Synergy with Forge Élémentaire
  },
  forge: {
    id: "forge",
    nom: "Four à Forge",
    icone: "Flame",
    description: "Un four puissant pour chauffer les métaux",
    niveauMax: 10,
    niveauInitial: 1,
    pouvoirInitial: 50,
    pouvoirParNiveau: 5,
    coutUpgradeBase: 1200,
    multiplicateurCout: 1.5,
    bonusFacilite: null, // No synergy
  },
  soufflet: {
    id: "soufflet",
    nom: "Soufflet Magique",
    icone: "Wind",
    description: "Un soufflet enchanté pour attiser les flammes",
    niveauMax: 10,
    niveauInitial: 1,
    pouvoirInitial: 35,
    pouvoirParNiveau: 5,
    coutUpgradeBase: 400,
    multiplicateurCout: 1.5,
    bonusFacilite: "enchantement", // Synergy with Table d'Enchantement
  },
};

// Export as array for iteration
export const TOOLS_ARRAY = Object.values(TOOLS);
