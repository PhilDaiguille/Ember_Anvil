// Base de données des matériaux du jeu

export const MATERIALS = {
  // ========== MÉTAUX (8) ==========

  aluminium: {
    id: "aluminium",
    nom: "Aluminium",
    type: "metal",
    rarity: "common",
    tier: 1,
    prixAchat: 6,
    prixVente: 4,
    image: "./assets/materials/aluminium.png",
    description:
      "Métal léger et résistant à la corrosion, idéal pour les débutants en forge.",
    proprietes: {
      resistance: 60,
      conductivite: 70,
      malleabilite: 80,
    },
  },

  cuivre: {
    id: "cuivre",
    nom: "Cuivre",
    type: "metal",
    rarity: "common",
    tier: 1,
    prixAchat: 8,
    prixVente: 5,
    image: "./assets/materials/cuivre.png",
    description:
      "Métal rougeâtre excellent conducteur, utilisé depuis l'Antiquité.",
    proprietes: {
      resistance: 50,
      conductivite: 95,
      malleabilite: 85,
    },
  },

  fer: {
    id: "fer",
    nom: "Fer",
    type: "metal",
    rarity: "common",
    tier: 1,
    prixAchat: 10,
    prixVente: 7,
    image: "./assets/materials/fer.png",
    description:
      "Le fer, matériau de base de tout forgeron respectable. Robuste et polyvalent.",
    proprietes: {
      resistance: 75,
      conductivite: 60,
      malleabilite: 70,
    },
  },

  etain: {
    id: "etain",
    nom: "Étain",
    type: "metal",
    rarity: "common",
    tier: 1,
    prixAchat: 7,
    prixVente: 5,
    image: "./assets/materials/etain.png",
    description:
      "Métal argenté malléable, souvent utilisé en alliage avec le cuivre.",
    proprietes: {
      resistance: 40,
      conductivite: 50,
      malleabilite: 90,
    },
  },

  bronze: {
    id: "bronze",
    nom: "Bronze",
    type: "metal",
    rarity: "uncommon",
    tier: 2,
    prixAchat: 25,
    prixVente: 18,
    image: "./assets/materials/bronze.png",
    description:
      "Alliage noble de cuivre et d'étain, résistant et prisé des artisans.",
    proprietes: {
      resistance: 80,
      conductivite: 75,
      malleabilite: 75,
    },
  },

  acier: {
    id: "acier",
    nom: "Acier",
    type: "metal",
    rarity: "uncommon",
    tier: 2,
    prixAchat: 35,
    prixVente: 25,
    image: "./assets/materials/acier.png",
    description:
      "Alliage de fer et de carbone, base des armes et armures de qualité.",
    proprietes: {
      resistance: 90,
      conductivite: 55,
      malleabilite: 65,
    },
  },

  titane: {
    id: "titane",
    nom: "Titane",
    type: "metal",
    rarity: "rare",
    tier: 3,
    prixAchat: 110,
    prixVente: 80,
    image: "./assets/materials/titane.png",
    description:
      "Métal léger et extrêmement résistant, utilisé pour les équipements de haute technologie.",
    proprietes: {
      resistance: 92,
      conductivite: 60,
      malleabilite: 70,
    },
  },

  adamantium: {
    id: "adamantium",
    nom: "Adamantium",
    type: "metal",
    rarity: "legendary",
    tier: 5,
    prixAchat: 800,
    prixVente: 600,
    image: "./assets/materials/adamantium.png",
    description:
      "Le métal le plus dur connu, pratiquement indestructible. Forgé par les dieux.",
    proprietes: {
      resistance: 100,
      conductivite: 70,
      malleabilite: 40,
    },
  },

  // ========== BOIS (5) ==========

  chene: {
    id: "chene",
    nom: "Chêne",
    type: "bois",
    rarity: "common",
    tier: 1,
    prixAchat: 3,
    prixVente: 2,
    image: "./assets/materials/chene.png",
    description: "Bois robuste et durable, parfait pour les manches d'armes.",
    proprietes: {
      resistance: 40,
      conductivite: 60,
      malleabilite: 50,
    },
  },

  erable: {
    id: "erable",
    nom: "Érable",
    type: "bois",
    rarity: "common",
    tier: 1,
    prixAchat: 4,
    prixVente: 2,
    image: "./assets/materials/erable.png",
    description:
      "Bois clair et élégant, prisé pour sa beauté et sa résistance.",
    proprietes: {
      resistance: 45,
      conductivite: 55,
      malleabilite: 60,
    },
  },

  pin: {
    id: "pin",
    nom: "Pin",
    type: "bois",
    rarity: "common",
    tier: 1,
    prixAchat: 2,
    prixVente: 1,
    image: "./assets/materials/pin.png",
    description: "Bois léger et accessible, utilisé pour les constructions.",
    proprietes: {
      resistance: 30,
      conductivite: 70,
      malleabilite: 65,
    },
  },

  ebene: {
    id: "ebene",
    nom: "Ébène",
    type: "bois",
    rarity: "uncommon",
    tier: 2,
    prixAchat: 30,
    prixVente: 20,
    image: "./assets/materials/ebene.png",
    description:
      "Bois noir profond, dense et précieux, symbole de luxe et de raffinement.",
    proprietes: {
      resistance: 70,
      conductivite: 40,
      malleabilite: 55,
    },
  },

  acajou: {
    id: "acajou",
    nom: "Acajou",
    type: "bois",
    rarity: "uncommon",
    tier: 2,
    prixAchat: 32,
    prixVente: 22,
    image: "./assets/materials/acajou.png",
    description:
      "Bois rouge noble et résistant, symbole de qualité et de durabilité.",
    proprietes: {
      resistance: 75,
      conductivite: 45,
      malleabilite: 58,
    },
  },

  // ========== PIERRES (5) ==========

  granit: {
    id: "granit",
    nom: "Granit",
    type: "pierre",
    rarity: "common",
    tier: 1,
    prixAchat: 5,
    prixVente: 3,
    image: "./assets/materials/granit.png",
    description:
      "Pierre robuste et abondante, utilisée pour les fondations et les enclumes.",
    proprietes: {
      resistance: 85,
      conductivite: 30,
      malleabilite: 20,
    },
  },

  marbre: {
    id: "marbre",
    nom: "Marbre",
    type: "pierre",
    rarity: "uncommon",
    tier: 2,
    prixAchat: 28,
    prixVente: 20,
    image: "./assets/materials/marbre.png",
    description:
      "Pierre blanche noble et élégante, symbole de prestige et de beauté.",
    proprietes: {
      resistance: 70,
      conductivite: 35,
      malleabilite: 25,
    },
  },

  basalte: {
    id: "basalte",
    nom: "Basalte",
    type: "pierre",
    rarity: "uncommon",
    tier: 2,
    prixAchat: 30,
    prixVente: 21,
    image: "./assets/materials/basalte.png",
    description:
      "Pierre volcanique noire et dense, formée par le refroidissement de la lave.",
    proprietes: {
      resistance: 75,
      conductivite: 40,
      malleabilite: 22,
    },
  },

  obsidienne: {
    id: "obsidienne",
    nom: "Obsidienne",
    type: "pierre",
    rarity: "rare",
    tier: 3,
    prixAchat: 100,
    prixVente: 70,
    image: "./assets/materials/obsidienne.png",
    description:
      "Verre volcanique noir comme la nuit, tranchant comme un rasoir.",
    proprietes: {
      resistance: 75,
      conductivite: 45,
      malleabilite: 30,
    },
  },

  jade: {
    id: "jade",
    nom: "Jade",
    type: "pierre",
    rarity: "rare",
    tier: 3,
    prixAchat: 110,
    prixVente: 75,
    image: "./assets/materials/jade.png",
    description:
      "Pierre verte précieuse, symbole de pureté et de sagesse dans les cultures anciennes.",
    proprietes: {
      resistance: 80,
      conductivite: 50,
      malleabilite: 35,
    },
  },

  // ========== GEMMES (7) ==========

  quartz: {
    id: "quartz",
    nom: "Quartz",
    type: "gemme",
    rarity: "common",
    tier: 1,
    prixAchat: 12,
    prixVente: 8,
    image: "./assets/materials/quartz.png",
    description:
      "Gemme cristalline transparente, abondante et facile à travailler.",
    proprietes: {
      resistance: 50,
      conductivite: 75,
      malleabilite: 40,
    },
  },

  amethyste: {
    id: "amethyste",
    nom: "Améthyste",
    type: "gemme",
    rarity: "uncommon",
    tier: 2,
    prixAchat: 45,
    prixVente: 32,
    image: "./assets/materials/amethyste.png",
    description:
      "Gemme violette mystique, favorisant la concentration et la clarté d'esprit.",
    proprietes: {
      resistance: 65,
      conductivite: 80,
      malleabilite: 45,
    },
  },

  opale: {
    id: "opale",
    nom: "Opale",
    type: "gemme",
    rarity: "uncommon",
    tier: 2,
    prixAchat: 38,
    prixVente: 26,
    image: "./assets/materials/opale.png",
    description:
      "Gemme iridescente aux reflets changeants, capturant toutes les couleurs de l'arc-en-ciel.",
    proprietes: {
      resistance: 55,
      conductivite: 78,
      malleabilite: 42,
    },
  },

  rubis: {
    id: "rubis",
    nom: "Rubis",
    type: "gemme",
    rarity: "rare",
    tier: 3,
    prixAchat: 250,
    prixVente: 180,
    image: "./assets/materials/rubis.png",
    description:
      "Gemme rouge écarlate, symbole de passion et de puissance. Confère des propriétés de feu.",
    proprietes: {
      resistance: 85,
      conductivite: 90,
      malleabilite: 50,
    },
  },

  saphir: {
    id: "saphir",
    nom: "Saphir",
    type: "gemme",
    rarity: "rare",
    tier: 3,
    prixAchat: 260,
    prixVente: 185,
    image: "./assets/materials/saphir.png",
    description:
      "Gemme bleue profonde comme l'océan, associée à la sagesse et à l'eau.",
    proprietes: {
      resistance: 85,
      conductivite: 88,
      malleabilite: 52,
    },
  },

  emeraude: {
    id: "emeraude",
    nom: "Émeraude",
    type: "gemme",
    rarity: "rare",
    tier: 3,
    prixAchat: 270,
    prixVente: 190,
    image: "./assets/materials/emeraude.png",
    description:
      "Gemme verte éclatante, liée à la nature et aux forces vitales.",
    proprietes: {
      resistance: 80,
      conductivite: 87,
      malleabilite: 48,
    },
  },

  diamant: {
    id: "diamant",
    nom: "Diamant",
    type: "gemme",
    rarity: "legendary",
    tier: 5,
    prixAchat: 500,
    prixVente: 360,
    image: "./assets/materials/diamant.png",
    description:
      "La gemme la plus dure et la plus pure, symbole ultime de perfection et d'éternité.",
    proprietes: {
      resistance: 100,
      conductivite: 95,
      malleabilite: 30,
    },
  },

  // ========== RESSOURCES SPÉCIALES (5) ==========

  cuir: {
    id: "cuir",
    nom: "Cuir",
    type: "special",
    rarity: "common",
    tier: 1,
    prixAchat: 8,
    prixVente: 5,
    image: "./assets/materials/cuir.png",
    description:
      "Matériau organique résistant, idéal pour les armures légères et les manches.",
    proprietes: {
      resistance: 55,
      conductivite: 30,
      malleabilite: 85,
    },
  },

  soie: {
    id: "soie",
    nom: "Soie",
    type: "special",
    rarity: "uncommon",
    tier: 2,
    prixAchat: 35,
    prixVente: 25,
    image: "./assets/materials/soie.png",
    description:
      "Fibre précieuse et résistante, parfaite pour les enchantements et les protections magiques.",
    proprietes: {
      resistance: 45,
      conductivite: 85,
      malleabilite: 90,
    },
  },

  mithril: {
    id: "mithril",
    nom: "Mithril",
    type: "special",
    rarity: "rare",
    tier: 3,
    prixAchat: 150,
    prixVente: 110,
    image: "./assets/materials/mithril.png",
    description:
      "Métal légendaire d'un blanc argenté, léger comme une plume et dur comme le diamant.",
    proprietes: {
      resistance: 95,
      conductivite: 88,
      malleabilite: 75,
    },
  },

  orichalque: {
    id: "orichalque",
    nom: "Orichalque",
    type: "special",
    rarity: "epic",
    tier: 4,
    prixAchat: 420,
    prixVente: 300,
    image: "./assets/materials/orichalque.png",
    description:
      "Métal mythique aux reflets cuivrés dorés, utilisé par les civilisations perdues.",
    proprietes: {
      resistance: 92,
      conductivite: 93,
      malleabilite: 70,
    },
  },

  eternium: {
    id: "eternium",
    nom: "Éternium",
    type: "special",
    rarity: "legendary",
    tier: 5,
    prixAchat: 1500,
    prixVente: 1100,
    image: "./assets/materials/eternium.png",
    description:
      "Matière primordiale existant hors du temps, forgée au commencement de l'univers.",
    proprietes: {
      resistance: 98,
      conductivite: 97,
      malleabilite: 65,
    },
  },
};

// ========== EXPORTS ==========

/**
 * Exporter MATERIALS comme tableau pour faciliter les itérations
 */
export const MATERIALS_ARRAY = Object.values(MATERIALS);

// ========== HELPERS ==========

/**
 * Obtenir tous les matériaux d'un type
 * @param {string} type - metal, bois, pierre, gemme, special
 * @returns {Array} Tableau de matériaux
 */
export function getMaterialsByType(type) {
  return Object.values(MATERIALS).filter((m) => m.type === type);
}

/**
 * Obtenir tous les matériaux d'une rareté
 * @param {string} rarity - common, uncommon, rare, epic, legendary
 * @returns {Array} Tableau de matériaux
 */
export function getMaterialsByRarity(rarity) {
  return Object.values(MATERIALS).filter((m) => m.rarity === rarity);
}

/**
 * Obtenir tous les matériaux d'un tier
 * @param {number} tier - 1 à 5
 * @returns {Array} Tableau de matériaux
 */
export function getMaterialsByTier(tier) {
  return Object.values(MATERIALS).filter((m) => m.tier === tier);
}

/**
 * Obtenir un matériau par son ID
 * @param {string} id - ID du matériau
 * @returns {Object|null} Matériau ou null
 */
export function getMaterialById(id) {
  return MATERIALS[id] || null;
}

/**
 * Rechercher des matériaux par nom ou description
 * @param {string} query - Terme de recherche
 * @returns {Array} Tableau de matériaux correspondants
 */
export function searchMaterials(query) {
  const lowerQuery = query.toLowerCase();
  return Object.values(MATERIALS).filter(
    (m) =>
      m.nom.toLowerCase().includes(lowerQuery) ||
      m.description.toLowerCase().includes(lowerQuery),
  );
}

/**
 * Obtenir le nombre total de matériaux
 * @returns {number} Nombre de matériaux
 */
export function getTotalMaterialsCount() {
  return Object.keys(MATERIALS).length;
}

/**
 * Obtenir les statistiques des matériaux
 * @returns {Object} Stats par type et rareté
 */
export function getMaterialsStats() {
  const stats = {
    total: getTotalMaterialsCount(),
    byType: {},
    byRarity: {},
    byTier: {},
  };

  Object.values(MATERIALS).forEach((m) => {
    // Par type
    stats.byType[m.type] = (stats.byType[m.type] || 0) + 1;

    // Par rareté
    stats.byRarity[m.rarity] = (stats.byRarity[m.rarity] || 0) + 1;

    // Par tier
    stats.byTier[m.tier] = (stats.byTier[m.tier] || 0) + 1;
  });

  return stats;
}
