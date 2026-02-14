/**
 * RECIPES.JS - Recettes de crafting pour EmberAnvil
 *
 * Structure d'une recette:
 * {
 *   id: string (unique)
 *   nom: string
 *   description: string
 *   categorie: 'arme' | 'armure' | 'outil' | 'bijou' | 'consommable'
 *   ingredients: [{ materialId: string, quantite: number }]
 *   tempsForge: number (en secondes)
 *   xpGain: number
 *   niveauRequis: number
 *   valeurVente: number
 *   qualiteBase: number (1-5, modifié par les outils)
 *   rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary'
 * }
 */

// ========================================
// ARMES (15 recettes)
// ========================================

const ARMES = [
  // Tier 1 - Armes de base
  {
    id: "epee_fer",
    nom: "Épée en Fer",
    description: "Une lame robuste pour les apprentis guerriers",
    categorie: "arme",
    ingredients: [
      { materialId: "fer", quantite: 3 },
      { materialId: "chene", quantite: 1 },
    ],
    tempsForge: 5,
    xpGain: 25,
    niveauRequis: 1,
    valeurVente: 150,
    qualiteBase: 2,
    rarity: "common",
  },
  {
    id: "dague_cuivre",
    nom: "Dague en Cuivre",
    description: "Rapide et légère, parfaite pour les débutants",
    categorie: "arme",
    ingredients: [
      { materialId: "cuivre", quantite: 2 },
      { materialId: "chene", quantite: 1 },
    ],
    tempsForge: 3,
    xpGain: 15,
    niveauRequis: 1,
    valeurVente: 80,
    qualiteBase: 1,
    rarity: "common",
  },
  {
    id: "hache_fer",
    nom: "Hache de Guerre en Fer",
    description: "Lourde et dévastatrice",
    categorie: "arme",
    ingredients: [
      { materialId: "fer", quantite: 4 },
      { materialId: "ebene", quantite: 1 },
    ],
    tempsForge: 8,
    xpGain: 35,
    niveauRequis: 2,
    valeurVente: 220,
    qualiteBase: 2,
    rarity: "common",
  },

  // Tier 2 - Armes intermédiaires
  {
    id: "epee_acier",
    nom: "Épée en Acier",
    description: "Forgée avec précision, tranchante et durable",
    categorie: "arme",
    ingredients: [
      { materialId: "acier", quantite: 3 },
      { materialId: "ebene", quantite: 1 },
      { materialId: "quartz", quantite: 1 },
    ],
    tempsForge: 12,
    xpGain: 60,
    niveauRequis: 3,
    valeurVente: 400,
    qualiteBase: 3,
    rarity: "uncommon",
  },
  {
    id: "lance_bronze",
    nom: "Lance en Bronze",
    description: "Longue portée, équilibre parfait",
    categorie: "arme",
    ingredients: [
      { materialId: "bronze", quantite: 3 },
      { materialId: "cedre", quantite: 2 },
    ],
    tempsForge: 10,
    xpGain: 50,
    niveauRequis: 3,
    valeurVente: 320,
    qualiteBase: 2,
    rarity: "uncommon",
  },
  {
    id: "marteau_granite",
    nom: "Marteau de Granite",
    description: "Puissance brute incarnée dans la pierre",
    categorie: "arme",
    ingredients: [
      { materialId: "granite", quantite: 4 },
      { materialId: "fer", quantite: 2 },
      { materialId: "ebene", quantite: 1 },
    ],
    tempsForge: 15,
    xpGain: 70,
    niveauRequis: 4,
    valeurVente: 500,
    qualiteBase: 3,
    rarity: "uncommon",
  },

  // Tier 3 - Armes rares
  {
    id: "epee_titane",
    nom: "Lame de Titane",
    description: "Légère comme l'air, solide comme la montagne",
    categorie: "arme",
    ingredients: [
      { materialId: "titane", quantite: 4 },
      { materialId: "obsidienne", quantite: 2 },
      { materialId: "saphir", quantite: 1 },
    ],
    tempsForge: 20,
    xpGain: 120,
    niveauRequis: 6,
    valeurVente: 1200,
    qualiteBase: 4,
    rarity: "rare",
  },
  {
    id: "arc_bois_antique",
    nom: "Arc en Bois Antique",
    description: "Béni par les anciens forestiers",
    categorie: "arme",
    ingredients: [
      { materialId: "bois_antique", quantite: 2 },
      { materialId: "mithril", quantite: 1 },
      { materialId: "emeraude", quantite: 1 },
    ],
    tempsForge: 18,
    xpGain: 100,
    niveauRequis: 5,
    valeurVente: 950,
    qualiteBase: 4,
    rarity: "rare",
  },
  {
    id: "katana_mithril",
    nom: "Katana de Mithril",
    description: "Finesse et élégance, tranchant divin",
    categorie: "arme",
    ingredients: [
      { materialId: "mithril", quantite: 3 },
      { materialId: "bois_antique", quantite: 1 },
      { materialId: "rubis", quantite: 1 },
    ],
    tempsForge: 25,
    xpGain: 150,
    niveauRequis: 7,
    valeurVente: 1800,
    qualiteBase: 4,
    rarity: "rare",
  },

  // Tier 4 - Armes épiques
  {
    id: "epee_adamantium",
    nom: "Épée d'Adamantium",
    description: "Indestructible, forgée dans les flammes éternelles",
    categorie: "arme",
    ingredients: [
      { materialId: "adamantium", quantite: 5 },
      { materialId: "bois_petrifie", quantite: 1 },
      { materialId: "cristal_draconique", quantite: 2 },
      { materialId: "diamant", quantite: 1 },
    ],
    tempsForge: 40,
    xpGain: 300,
    niveauRequis: 10,
    valeurVente: 5000,
    qualiteBase: 5,
    rarity: "epic",
  },
  {
    id: "masse_obsidienne",
    nom: "Masse d'Obsidienne Pure",
    description: "Chaque coup résonne comme un tremblement de terre",
    categorie: "arme",
    ingredients: [
      { materialId: "obsidienne", quantite: 6 },
      { materialId: "adamantium", quantite: 2 },
      { materialId: "amethyste", quantite: 2 },
    ],
    tempsForge: 35,
    xpGain: 250,
    niveauRequis: 9,
    valeurVente: 4200,
    qualiteBase: 5,
    rarity: "epic",
  },

  // Tier 5 - Armes légendaires
  {
    id: "excalibur",
    nom: "Excalibur",
    description: "L'épée des rois, forgée par les dieux eux-mêmes",
    categorie: "arme",
    ingredients: [
      { materialId: "adamantium", quantite: 8 },
      { materialId: "cristal_draconique", quantite: 4 },
      { materialId: "diamant", quantite: 3 },
      { materialId: "coeur_forge", quantite: 1 },
    ],
    tempsForge: 60,
    xpGain: 500,
    niveauRequis: 15,
    valeurVente: 15000,
    qualiteBase: 5,
    rarity: "legendary",
  },
  {
    id: "mjolnir",
    nom: "Mjölnir",
    description: "Le marteau du tonnerre, seuls les dignes peuvent le soulever",
    categorie: "arme",
    ingredients: [
      { materialId: "adamantium", quantite: 10 },
      { materialId: "obsidienne", quantite: 5 },
      { materialId: "bois_petrifie", quantite: 2 },
      { materialId: "essence_elementaire", quantite: 3 },
    ],
    tempsForge: 70,
    xpGain: 600,
    niveauRequis: 18,
    valeurVente: 20000,
    qualiteBase: 5,
    rarity: "legendary",
  },
  {
    id: "arc_chasseur_etoiles",
    nom: "Arc du Chasseur d'Étoiles",
    description: "Ses flèches percent le ciel lui-même",
    categorie: "arme",
    ingredients: [
      { materialId: "bois_petrifie", quantite: 3 },
      { materialId: "mithril", quantite: 5 },
      { materialId: "saphir", quantite: 4 },
      { materialId: "poussiere_magique", quantite: 5 },
    ],
    tempsForge: 55,
    xpGain: 450,
    niveauRequis: 14,
    valeurVente: 12000,
    qualiteBase: 5,
    rarity: "legendary",
  },
  {
    id: "faux_ombre",
    nom: "Faux de l'Ombre",
    description: "Elle moissonne les âmes dans un silence absolu",
    categorie: "arme",
    ingredients: [
      { materialId: "adamantium", quantite: 6 },
      { materialId: "obsidienne", quantite: 4 },
      { materialId: "amethyste", quantite: 3 },
      { materialId: "essence_vie", quantite: 2 },
    ],
    tempsForge: 65,
    xpGain: 550,
    niveauRequis: 16,
    valeurVente: 18000,
    qualiteBase: 5,
    rarity: "legendary",
  },
];

// ========================================
// ARMURES (12 recettes)
// ========================================

const ARMURES = [
  // Tier 1
  {
    id: "casque_fer",
    nom: "Casque en Fer",
    description: "Protection basique pour la tête",
    categorie: "armure",
    ingredients: [{ materialId: "fer", quantite: 3 }],
    tempsForge: 6,
    xpGain: 20,
    niveauRequis: 1,
    valeurVente: 120,
    qualiteBase: 2,
    rarity: "common",
  },
  {
    id: "plastron_cuivre",
    nom: "Plastron en Cuivre",
    description: "Léger mais offre une protection décente",
    categorie: "armure",
    ingredients: [
      { materialId: "cuivre", quantite: 5 },
      { materialId: "chene", quantite: 2 },
    ],
    tempsForge: 8,
    xpGain: 30,
    niveauRequis: 2,
    valeurVente: 180,
    qualiteBase: 2,
    rarity: "common",
  },
  {
    id: "bottes_bronze",
    nom: "Bottes en Bronze",
    description: "Solides et confortables",
    categorie: "armure",
    ingredients: [{ materialId: "bronze", quantite: 3 }],
    tempsForge: 5,
    xpGain: 25,
    niveauRequis: 2,
    valeurVente: 140,
    qualiteBase: 2,
    rarity: "common",
  },

  // Tier 2
  {
    id: "armure_acier",
    nom: "Armure Complète en Acier",
    description: "Protection solide pour les guerriers aguerris",
    categorie: "armure",
    ingredients: [
      { materialId: "acier", quantite: 8 },
      { materialId: "marbre", quantite: 2 },
    ],
    tempsForge: 18,
    xpGain: 80,
    niveauRequis: 4,
    valeurVente: 600,
    qualiteBase: 3,
    rarity: "uncommon",
  },
  {
    id: "bouclier_granite",
    nom: "Bouclier de Granite",
    description: "Inébranlable comme la montagne",
    categorie: "armure",
    ingredients: [
      { materialId: "granite", quantite: 5 },
      { materialId: "fer", quantite: 2 },
    ],
    tempsForge: 12,
    xpGain: 50,
    niveauRequis: 3,
    valeurVente: 350,
    qualiteBase: 3,
    rarity: "uncommon",
  },
  {
    id: "heaume_basalte",
    nom: "Heaume de Basalte",
    description: "Taillé dans la pierre volcanique",
    categorie: "armure",
    ingredients: [
      { materialId: "basalte", quantite: 4 },
      { materialId: "acier", quantite: 2 },
    ],
    tempsForge: 14,
    xpGain: 60,
    niveauRequis: 4,
    valeurVente: 420,
    qualiteBase: 3,
    rarity: "uncommon",
  },

  // Tier 3
  {
    id: "armure_titane",
    nom: "Armure de Titane",
    description: "Légèreté et résistance exceptionnelle",
    categorie: "armure",
    ingredients: [
      { materialId: "titane", quantite: 10 },
      { materialId: "obsidienne", quantite: 3 },
      { materialId: "topaze", quantite: 2 },
    ],
    tempsForge: 30,
    xpGain: 150,
    niveauRequis: 7,
    valeurVente: 2000,
    qualiteBase: 4,
    rarity: "rare",
  },
  {
    id: "bouclier_mithril",
    nom: "Bouclier de Mithril",
    description: "Reflète la lumière et les sorts",
    categorie: "armure",
    ingredients: [
      { materialId: "mithril", quantite: 6 },
      { materialId: "saphir", quantite: 3 },
    ],
    tempsForge: 25,
    xpGain: 130,
    niveauRequis: 6,
    valeurVente: 1600,
    qualiteBase: 4,
    rarity: "rare",
  },

  // Tier 4
  {
    id: "armure_adamantium",
    nom: "Armure d'Adamantium",
    description: "Invulnérable aux attaques mortelles",
    categorie: "armure",
    ingredients: [
      { materialId: "adamantium", quantite: 12 },
      { materialId: "cristal_draconique", quantite: 4 },
      { materialId: "emeraude", quantite: 3 },
    ],
    tempsForge: 45,
    xpGain: 320,
    niveauRequis: 11,
    valeurVente: 6000,
    qualiteBase: 5,
    rarity: "epic",
  },
  {
    id: "bouclier_dragon",
    nom: "Bouclier Écaille de Dragon",
    description: "Forgé avec les écailles d'un dragon ancien",
    categorie: "armure",
    ingredients: [
      { materialId: "cristal_draconique", quantite: 6 },
      { materialId: "adamantium", quantite: 5 },
      { materialId: "rubis", quantite: 4 },
    ],
    tempsForge: 50,
    xpGain: 400,
    niveauRequis: 13,
    valeurVente: 8500,
    qualiteBase: 5,
    rarity: "epic",
  },

  // Tier 5
  {
    id: "armure_celestiale",
    nom: "Armure Célestiale",
    description: "Bénie par les anges, portée par les héros",
    categorie: "armure",
    ingredients: [
      { materialId: "adamantium", quantite: 15 },
      { materialId: "diamant", quantite: 5 },
      { materialId: "essence_elementaire", quantite: 4 },
      { materialId: "coeur_forge", quantite: 1 },
    ],
    tempsForge: 80,
    xpGain: 700,
    niveauRequis: 20,
    valeurVente: 25000,
    qualiteBase: 5,
    rarity: "legendary",
  },
  {
    id: "aegis",
    nom: "Égide",
    description: "Le bouclier ultime, symbole de protection divine",
    categorie: "armure",
    ingredients: [
      { materialId: "adamantium", quantite: 10 },
      { materialId: "cristal_draconique", quantite: 8 },
      { materialId: "saphir", quantite: 6 },
      { materialId: "poussiere_magique", quantite: 5 },
    ],
    tempsForge: 75,
    xpGain: 650,
    niveauRequis: 19,
    valeurVente: 22000,
    qualiteBase: 5,
    rarity: "legendary",
  },
];

// ========================================
// OUTILS (8 recettes)
// ========================================

const OUTILS = [
  {
    id: "pioche_fer",
    nom: "Pioche en Fer",
    description: "Pour extraire les minerais basiques",
    categorie: "outil",
    ingredients: [
      { materialId: "fer", quantite: 3 },
      { materialId: "chene", quantite: 2 },
    ],
    tempsForge: 5,
    xpGain: 20,
    niveauRequis: 1,
    valeurVente: 100,
    qualiteBase: 2,
    rarity: "common",
  },
  {
    id: "hache_bucheron",
    nom: "Hache de Bûcheron",
    description: "Coupe le bois avec efficacité",
    categorie: "outil",
    ingredients: [
      { materialId: "acier", quantite: 2 },
      { materialId: "ebene", quantite: 2 },
    ],
    tempsForge: 7,
    xpGain: 25,
    niveauRequis: 2,
    valeurVente: 130,
    qualiteBase: 2,
    rarity: "common",
  },
  {
    id: "marteau_forgeron",
    nom: "Marteau de Forgeron",
    description: "L'outil essentiel du maître artisan",
    categorie: "outil",
    ingredients: [
      { materialId: "acier", quantite: 4 },
      { materialId: "granite", quantite: 2 },
    ],
    tempsForge: 10,
    xpGain: 40,
    niveauRequis: 3,
    valeurVente: 250,
    qualiteBase: 3,
    rarity: "uncommon",
  },
  {
    id: "pioche_titane",
    nom: "Pioche de Titane",
    description: "Perce même les roches les plus dures",
    categorie: "outil",
    ingredients: [
      { materialId: "titane", quantite: 5 },
      { materialId: "bois_antique", quantite: 1 },
    ],
    tempsForge: 15,
    xpGain: 80,
    niveauRequis: 5,
    valeurVente: 800,
    qualiteBase: 4,
    rarity: "rare",
  },
  {
    id: "enclume_mithril",
    nom: "Enclume de Mithril",
    description: "Améliore la qualité de tous vos ouvrages",
    categorie: "outil",
    ingredients: [
      { materialId: "mithril", quantite: 8 },
      { materialId: "obsidienne", quantite: 4 },
    ],
    tempsForge: 20,
    xpGain: 120,
    niveauRequis: 6,
    valeurVente: 1500,
    qualiteBase: 4,
    rarity: "rare",
  },
  {
    id: "marteau_titan",
    nom: "Marteau du Titan",
    description: "Seuls les plus forts peuvent le manier",
    categorie: "outil",
    ingredients: [
      { materialId: "adamantium", quantite: 6 },
      { materialId: "cristal_draconique", quantite: 2 },
      { materialId: "bois_petrifie", quantite: 1 },
    ],
    tempsForge: 35,
    xpGain: 250,
    niveauRequis: 10,
    valeurVente: 4000,
    qualiteBase: 5,
    rarity: "epic",
  },
  {
    id: "forge_portable",
    nom: "Forge Portable",
    description: "Forgez n'importe où, n'importe quand",
    categorie: "outil",
    ingredients: [
      { materialId: "adamantium", quantite: 10 },
      { materialId: "obsidienne", quantite: 8 },
      { materialId: "rubis", quantite: 5 },
      { materialId: "coeur_forge", quantite: 1 },
    ],
    tempsForge: 60,
    xpGain: 500,
    niveauRequis: 15,
    valeurVente: 12000,
    qualiteBase: 5,
    rarity: "legendary",
  },
  {
    id: "enclume_eternelle",
    nom: "Enclume Éternelle",
    description: "Forgée dans les flammes de la création",
    categorie: "outil",
    ingredients: [
      { materialId: "adamantium", quantite: 20 },
      { materialId: "diamant", quantite: 10 },
      { materialId: "essence_elementaire", quantite: 5 },
      { materialId: "coeur_forge", quantite: 2 },
    ],
    tempsForge: 90,
    xpGain: 800,
    niveauRequis: 25,
    valeurVente: 30000,
    qualiteBase: 5,
    rarity: "legendary",
  },
];

// ========================================
// BIJOUX (7 recettes)
// ========================================

const BIJOUX = [
  {
    id: "anneau_bronze",
    nom: "Anneau de Bronze",
    description: "Simple mais élégant",
    categorie: "bijou",
    ingredients: [
      { materialId: "bronze", quantite: 1 },
      { materialId: "quartz", quantite: 1 },
    ],
    tempsForge: 4,
    xpGain: 15,
    niveauRequis: 1,
    valeurVente: 90,
    qualiteBase: 2,
    rarity: "common",
  },
  {
    id: "collier_argent",
    nom: "Collier en Argent",
    description: "Brille doucement à la lumière",
    categorie: "bijou",
    ingredients: [
      { materialId: "aluminium", quantite: 2 },
      { materialId: "amethyste", quantite: 1 },
    ],
    tempsForge: 6,
    xpGain: 30,
    niveauRequis: 2,
    valeurVente: 200,
    qualiteBase: 2,
    rarity: "uncommon",
  },
  {
    id: "bague_saphir",
    nom: "Bague au Saphir",
    description: "Bleue comme l'océan profond",
    categorie: "bijou",
    ingredients: [
      { materialId: "mithril", quantite: 2 },
      { materialId: "saphir", quantite: 2 },
    ],
    tempsForge: 12,
    xpGain: 70,
    niveauRequis: 5,
    valeurVente: 1000,
    qualiteBase: 4,
    rarity: "rare",
  },
  {
    id: "couronne_rubis",
    nom: "Couronne de Rubis",
    description: "Digne d'un roi",
    categorie: "bijou",
    ingredients: [
      { materialId: "mithril", quantite: 5 },
      { materialId: "rubis", quantite: 5 },
      { materialId: "diamant", quantite: 2 },
    ],
    tempsForge: 25,
    xpGain: 180,
    niveauRequis: 8,
    valeurVente: 3500,
    qualiteBase: 4,
    rarity: "epic",
  },
  {
    id: "amulette_emeraude",
    nom: "Amulette d'Émeraude",
    description: "Protège son porteur des maléfices",
    categorie: "bijou",
    ingredients: [
      { materialId: "adamantium", quantite: 3 },
      { materialId: "emeraude", quantite: 4 },
      { materialId: "poussiere_magique", quantite: 2 },
    ],
    tempsForge: 20,
    xpGain: 150,
    niveauRequis: 7,
    valeurVente: 2800,
    qualiteBase: 4,
    rarity: "epic",
  },
  {
    id: "diademe_diamant",
    nom: "Diadème de Diamant",
    description: "Éclat aveuglant de mille feux",
    categorie: "bijou",
    ingredients: [
      { materialId: "adamantium", quantite: 4 },
      { materialId: "diamant", quantite: 8 },
      { materialId: "essence_elementaire", quantite: 2 },
    ],
    tempsForge: 40,
    xpGain: 350,
    niveauRequis: 12,
    valeurVente: 8000,
    qualiteBase: 5,
    rarity: "legendary",
  },
  {
    id: "anneau_omnipotence",
    nom: "Anneau d'Omnipotence",
    description: "Un anneau pour les gouverner tous",
    categorie: "bijou",
    ingredients: [
      { materialId: "adamantium", quantite: 5 },
      { materialId: "diamant", quantite: 3 },
      { materialId: "essence_vie", quantite: 3 },
      { materialId: "coeur_forge", quantite: 1 },
    ],
    tempsForge: 50,
    xpGain: 600,
    niveauRequis: 20,
    valeurVente: 20000,
    qualiteBase: 5,
    rarity: "legendary",
  },
];

// ========================================
// CONSOMMABLES (3 recettes)
// ========================================

const CONSOMMABLES = [
  {
    id: "potion_vie",
    nom: "Potion de Vie",
    description: "Restaure la santé instantanément",
    categorie: "consommable",
    ingredients: [
      { materialId: "essence_vie", quantite: 1 },
      { materialId: "quartz", quantite: 1 },
    ],
    tempsForge: 3,
    xpGain: 20,
    niveauRequis: 1,
    valeurVente: 150,
    qualiteBase: 2,
    rarity: "common",
  },
  {
    id: "elixir_force",
    nom: "Élixir de Force",
    description: "Augmente temporairement la puissance",
    categorie: "consommable",
    ingredients: [
      { materialId: "essence_elementaire", quantite: 1 },
      { materialId: "topaze", quantite: 1 },
      { materialId: "poussiere_magique", quantite: 2 },
    ],
    tempsForge: 8,
    xpGain: 50,
    niveauRequis: 5,
    valeurVente: 400,
    qualiteBase: 3,
    rarity: "rare",
  },
  {
    id: "philtre_immortalite",
    nom: "Philtre d'Immortalité",
    description: "Trompe la mort pour quelques instants",
    categorie: "consommable",
    ingredients: [
      { materialId: "essence_vie", quantite: 5 },
      { materialId: "essence_elementaire", quantite: 3 },
      { materialId: "diamant", quantite: 2 },
      { materialId: "coeur_forge", quantite: 1 },
    ],
    tempsForge: 30,
    xpGain: 400,
    niveauRequis: 15,
    valeurVente: 10000,
    qualiteBase: 5,
    rarity: "legendary",
  },
];

// ========================================
// EXPORTS & HELPERS
// ========================================

export const RECIPES = [
  ...ARMES,
  ...ARMURES,
  ...OUTILS,
  ...BIJOUX,
  ...CONSOMMABLES,
];

export const RECIPES_PAR_CATEGORIE = {
  arme: ARMES,
  armure: ARMURES,
  outil: OUTILS,
  bijou: BIJOUX,
  consommable: CONSOMMABLES,
};

/**
 * Récupère une recette par son ID
 */
export function getRecipeById(id) {
  return RECIPES.find((recipe) => recipe.id === id);
}

/**
 * Récupère toutes les recettes d'une catégorie
 */
export function getRecipesByCategorie(categorie) {
  return RECIPES.filter((recipe) => recipe.categorie === categorie);
}

/**
 * Récupère les recettes accessibles selon le niveau du joueur
 */
export function getRecipesByNiveau(niveau) {
  return RECIPES.filter((recipe) => recipe.niveauRequis <= niveau);
}

/**
 * Récupère les recettes par rareté
 */
export function getRecipesByRarity(rarity) {
  return RECIPES.filter((recipe) => recipe.rarity === rarity);
}

/**
 * Vérifie si le joueur peut crafter une recette (niveau + matériaux)
 */
export function peutCrafter(recipe, playerNiveau, inventory) {
  // Vérifier le niveau
  if (playerNiveau < recipe.niveauRequis) {
    return { possible: false, raison: "Niveau insuffisant" };
  }

  // Vérifier les matériaux
  for (const ingredient of recipe.ingredients) {
    const quantitePossedee = inventory[ingredient.materialId] || 0;
    if (quantitePossedee < ingredient.quantite) {
      return {
        possible: false,
        raison: `${ingredient.materialId} insuffisant (${quantitePossedee}/${ingredient.quantite})`,
      };
    }
  }

  return { possible: true };
}

export default RECIPES;
