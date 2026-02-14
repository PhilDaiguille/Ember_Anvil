/**
 * FACILITIES DATA
 *
 * 3 facilities available in the workshop
 * Each facility has 5 levels with activation/deactivation mechanics
 */

export const FACILITIES = {
  trempage: {
    id: "trempage",
    nom: "Station de Trempage",
    icone: "Droplet",
    description: "Améliore la qualité des armes",
    niveauMax: 5,
    niveauInitial: 1,
    bonusProductiviteBase: 15,
    bonusParNiveau: 5, // +5% productivity per level
    coutUpgradeBase: 1000, // Coût en écus / 10 = coût en or
    multiplicateurCout: 1.5,
    coutActivation: 50, // Coût en écus pour activer
    actifParDefaut: false,
  },
  enchantement: {
    id: "enchantement",
    nom: "Table d'Enchantement",
    icone: "Sparkles",
    description: "Ajoute des propriétés magiques",
    niveauMax: 5,
    niveauInitial: 1,
    bonusProductiviteBase: 25,
    bonusParNiveau: 5,
    coutUpgradeBase: 1500,
    multiplicateurCout: 1.5,
    coutActivation: 75,
    actifParDefaut: false,
  },
  elementaire: {
    id: "elementaire",
    nom: "Forge Élémentaire",
    icone: "Zap",
    description: "Travaille les métaux rares",
    niveauMax: 5,
    niveauInitial: 1,
    bonusProductiviteBase: 30,
    bonusParNiveau: 5,
    coutUpgradeBase: 2000,
    multiplicateurCout: 1.5,
    coutActivation: 100,
    actifParDefaut: false,
  },
};

// Export as array for iteration
export const FACILITIES_ARRAY = Object.values(FACILITIES);
