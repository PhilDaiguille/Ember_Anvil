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

  mithril: {
    id: "mithril",
    nom: "Mithril",
    type: "metal",
    rarity: "rare",
    tier: 3,
    prixAchat: 120,
    prixVente: 85,
    image: "./assets/materials/mithril.png",
    description:
      "Métal légendaire d'un blanc argenté, léger comme une plume et dur comme le diamant.",
    proprietes: {
      resistance: 95,
      conductivite: 85,
      malleabilite: 80,
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
    type: "wood",
    rarity: "common",
    tier: 1,
    prixAchat: 3,
    prixVente: 2,
    image: "./assets/materials/chene.png",
    description: "Bois robuste et durable, parfait pour les manches d'armes.",
    proprietes: {
      resistance: 40,
      flexibilite: 60,
      durete: 50,
    },
  },

  pin: {
    id: "pin",
    nom: "Pin",
    type: "wood",
    rarity: "common",
    tier: 1,
    prixAchat: 2,
    prixVente: 1,
    image: "./assets/materials/pin.png",
    description: "Bois léger et accessible, utilisé pour les constructions.",
    proprietes: {
      resistance: 30,
      flexibilite: 70,
      durete: 35,
    },
  },

  ebene: {
    id: "ebene",
    nom: "Ébène",
    type: "wood",
    rarity: "uncommon",
    tier: 2,
    prixAchat: 30,
    prixVente: 20,
    image: "./assets/materials/ebene.png",
    description:
      "Bois noir profond, dense et précieux, symbole de luxe et de raffinement.",
    proprietes: {
      resistance: 70,
      flexibilite: 40,
      durete: 85,
    },
  },

  bois_ancestral: {
    id: "bois_ancestral",
    nom: "Bois Ancestral",
    type: "wood",
    rarity: "rare",
    tier: 3,
    prixAchat: 90,
    prixVente: 65,
    image: "./assets/materials/bois_ancestral.png",
    description:
      "Bois millénaire imprégné de magie ancienne, récolté dans les forêts sacrées.",
    proprietes: {
      resistance: 80,
      flexibilite: 75,
      durete: 70,
    },
  },

  bois_petrifie: {
    id: "bois_petrifie",
    nom: "Bois Pétrifié",
    type: "wood",
    rarity: "epic",
    tier: 4,
    prixAchat: 350,
    prixVente: 250,
    image: "./assets/materials/bois_petrifie.png",
    description:
      "Bois transformé en pierre après des millénaires, combinant les propriétés des deux.",
    proprietes: {
      resistance: 90,
      flexibilite: 20,
      durete: 95,
    },
  },

  // ========== PIERRES (5) ==========

  granite: {
    id: "granite",
    nom: "Granite",
    type: "stone",
    rarity: "common",
    tier: 1,
    prixAchat: 5,
    prixVente: 3,
    image: "./assets/materials/granite.png",
    description:
      "Pierre robuste et abondante, utilisée pour les fondations et les enclumes.",
    proprietes: {
      resistance: 85,
      durete: 75,
      poids: 90,
    },
  },

  marbre: {
    id: "marbre",
    nom: "Marbre",
    type: "stone",
    rarity: "uncommon",
    tier: 2,
    prixAchat: 28,
    prixVente: 20,
    image: "./assets/materials/marbre.png",
    description:
      "Pierre blanche noble et élégante, symbole de prestige et de beauté.",
    proprietes: {
      resistance: 70,
      durete: 65,
      poids: 85,
    },
  },

  obsidienne: {
    id: "obsidienne",
    nom: "Obsidienne",
    type: "stone",
    rarity: "rare",
    tier: 3,
    prixAchat: 100,
    prixVente: 70,
    image: "./assets/materials/obsidienne.png",
    description:
      "Verre volcanique noir comme la nuit, tranchant comme un rasoir.",
    proprietes: {
      resistance: 75,
      durete: 90,
      poids: 70,
    },
  },

  pierre_runique: {
    id: "pierre_runique",
    nom: "Pierre Runique",
    type: "stone",
    rarity: "epic",
    tier: 4,
    prixAchat: 400,
    prixVente: 280,
    image: "./assets/materials/pierre_runique.png",
    description:
      "Pierre gravée de runes anciennes, résonant d'une énergie mystique.",
    proprietes: {
      resistance: 85,
      durete: 80,
      poids: 75,
    },
  },

  cristal_draconique: {
    id: "cristal_draconique",
    nom: "Cristal Draconique",
    type: "stone",
    rarity: "legendary",
    tier: 5,
    prixAchat: 1200,
    prixVente: 900,
    image: "./assets/materials/cristal_draconique.png",
    description:
      "Cristal formé dans le cœur des volcans draconiques, pulsant de pouvoir primordial.",
    proprietes: {
      resistance: 95,
      durete: 98,
      poids: 60,
    },
  },

  // ========== GEMMES (7) ==========

  rubis: {
    id: "rubis",
    nom: "Rubis",
    type: "gem",
    rarity: "rare",
    tier: 3,
    prixAchat: 250,
    prixVente: 180,
    image: "./assets/materials/rubis.png",
    description:
      "Gemme rouge écarlate, symbole de passion et de puissance. Confère des propriétés de feu.",
    proprietes: {
      pouvoir_magique: 85,
      eclat: 95,
      purete: 80,
    },
  },

  saphir: {
    id: "saphir",
    nom: "Saphir",
    type: "gem",
    rarity: "rare",
    tier: 3,
    prixAchat: 260,
    prixVente: 185,
    image: "./assets/materials/saphir.png",
    description:
      "Gemme bleue profonde comme l'océan, associée à la sagesse et à l'eau.",
    proprietes: {
      pouvoir_magique: 85,
      eclat: 90,
      purete: 85,
    },
  },

  emeraude: {
    id: "emeraude",
    nom: "Émeraude",
    type: "gem",
    rarity: "rare",
    tier: 3,
    prixAchat: 270,
    prixVente: 190,
    image: "./assets/materials/emeraude.png",
    description:
      "Gemme verte éclatante, liée à la nature et aux forces vitales.",
    proprietes: {
      pouvoir_magique: 80,
      eclat: 92,
      purete: 82,
    },
  },

  amethyste: {
    id: "amethyste",
    nom: "Améthyste",
    type: "gem",
    rarity: "uncommon",
    tier: 2,
    prixAchat: 45,
    prixVente: 32,
    image: "./assets/materials/amethyste.png",
    description:
      "Gemme violette mystique, favorisant la concentration et la clarté d'esprit.",
    proprietes: {
      pouvoir_magique: 65,
      eclat: 75,
      purete: 70,
    },
  },

  topaze: {
    id: "topaze",
    nom: "Topaze",
    type: "gem",
    rarity: "uncommon",
    tier: 2,
    prixAchat: 40,
    prixVente: 28,
    image: "./assets/materials/topaze.png",
    description: "Gemme dorée lumineuse, symbole de richesse et de prospérité.",
    proprietes: {
      pouvoir_magique: 60,
      eclat: 85,
      purete: 68,
    },
  },

  opale: {
    id: "opale",
    nom: "Opale",
    type: "gem",
    rarity: "uncommon",
    tier: 2,
    prixAchat: 38,
    prixVente: 26,
    image: "./assets/materials/opale.png",
    description:
      "Gemme iridescente aux reflets changeants, capturant toutes les couleurs de l'arc-en-ciel.",
    proprietes: {
      pouvoir_magique: 55,
      eclat: 80,
      purete: 65,
    },
  },

  diamant: {
    id: "diamant",
    nom: "Diamant",
    type: "gem",
    rarity: "epic",
    tier: 4,
    prixAchat: 500,
    prixVente: 360,
    image: "./assets/materials/diamant.png",
    description:
      "La gemme la plus dure et la plus pure, symbole ultime de perfection et d'éternité.",
    proprietes: {
      pouvoir_magique: 90,
      eclat: 100,
      purete: 95,
    },
  },

  // ========== RESSOURCES SPÉCIALES (5) ==========

  poussiere_magique: {
    id: "poussiere_magique",
    nom: "Poussière Magique",
    type: "special",
    rarity: "rare",
    tier: 3,
    prixAchat: 150,
    prixVente: 110,
    image: "./assets/materials/poussiere_magique.png",
    description:
      "Particules scintillantes imprégnées de mana pur, essence de la magie elle-même.",
    proprietes: {
      pouvoir_magique: 95,
      purete: 85,
      volatilite: 70,
    },
  },

  essence_elementaire: {
    id: "essence_elementaire",
    nom: "Essence Élémentaire",
    type: "special",
    rarity: "epic",
    tier: 4,
    prixAchat: 420,
    prixVente: 300,
    image: "./assets/materials/essence_elementaire.png",
    description:
      "Concentration pure des quatre éléments primordiaux : feu, eau, terre et air.",
    proprietes: {
      pouvoir_magique: 92,
      purete: 90,
      volatilite: 80,
    },
  },

  fragment_ame: {
    id: "fragment_ame",
    nom: "Fragment d'Âme",
    type: "special",
    rarity: "legendary",
    tier: 5,
    prixAchat: 1500,
    prixVente: 1100,
    image: "./assets/materials/fragment_ame.png",
    description:
      "Éclat d'essence vitale cristallisée, contenant la mémoire d'êtres disparus.",
    proprietes: {
      pouvoir_magique: 98,
      purete: 95,
      volatilite: 90,
    },
  },

  cristal_temporel: {
    id: "cristal_temporel",
    nom: "Cristal Temporel",
    type: "special",
    rarity: "legendary",
    tier: 5,
    prixAchat: 1800,
    prixVente: 1300,
    image: "./assets/materials/cristal_temporel.png",
    description:
      "Fragment du tissu même du temps, permettant de voir passé et futur.",
    proprietes: {
      pouvoir_magique: 100,
      purete: 98,
      volatilite: 95,
    },
  },

  coeur_forge: {
    id: "coeur_forge",
    nom: "Cœur de Forge",
    type: "special",
    rarity: "legendary",
    tier: 5,
    prixAchat: 2000,
    prixVente: 1500,
    image: "./assets/materials/coeur_forge.png",
    description:
      "Noyau ardent d'une forge ancestrale, contenant le savoir de mille générations de forgerons.",
    proprietes: {
      pouvoir_magique: 95,
      purete: 92,
      volatilite: 50,
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
 * @param {string} type - metal, wood, stone, gem, special
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
