/**
 * QUESTS DATA
 *
 * Daily objectives for the workshop
 * Quests can be tracked and completed for rewards
 */

export const QUESTS = {
  upgrade_tools: {
    id: "upgrade_tools",
    nom: "Améliorer 3 outils",
    description: "Améliorez n'importe quels outils 3 fois",
    objectif: 3,
    type: "upgrade", // Type pour tracking
    recompense: {
      ecus: 1000,
      experience: 200,
    },
    renouvelable: true, // Se renouvelle quotidiennement
  },
  activate_facilities: {
    id: "activate_facilities",
    nom: "Activer toutes les installations",
    description: "Activez les 3 installations disponibles",
    objectif: 3,
    type: "activate",
    recompense: {
      ecus: 1500,
      or: 50,
    },
    renouvelable: true,
  },
  reach_productivity: {
    id: "reach_productivity",
    nom: "Atteindre 80% de productivité",
    description: "Augmentez votre productivité globale à 80%",
    objectif: 80,
    type: "productivity",
    recompense: {
      ecus: 2000,
      or: 100,
      experience: 300,
    },
    renouvelable: false, // Objectif unique
  },
  max_tool: {
    id: "max_tool",
    nom: "Maximiser un outil",
    description: "Améliorez un outil au niveau maximum (10)",
    objectif: 1,
    type: "max_level",
    recompense: {
      ecus: 5000,
      or: 200,
      experience: 500,
    },
    renouvelable: false,
  },
  unlock_synergies: {
    id: "unlock_synergies",
    nom: "Débloquer 2 synergies",
    description: "Activez 2 synergies outil-installation",
    objectif: 2,
    type: "synergy",
    recompense: {
      ecus: 3000,
      or: 150,
      experience: 400,
    },
    renouvelable: false,
  },
};

// Export as array for iteration
export const QUESTS_ARRAY = Object.values(QUESTS);

// Helper function to get initial quest state
export function getInitialQuestState(questId) {
  const quest = QUESTS[questId];
  if (!quest) return null;

  return {
    ...quest,
    progression: 0,
    terminee: false,
    dateDebut: Date.now(),
    dateCompletee: null,
  };
}

// Get all quests as initial state
export function getAllQuestsInitialState() {
  return QUESTS_ARRAY.map((quest) => ({
    ...quest,
    progression: 0,
    terminee: false,
    dateDebut: Date.now(),
    dateCompletee: null,
  }));
}
