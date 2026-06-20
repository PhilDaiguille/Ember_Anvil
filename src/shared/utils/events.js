/**
 * Événements temporels — un événement par jour, déterministe (seedé par la date).
 *
 * Aucun état à persister : le même jour donne le même événement pour tout le monde,
 * et il change chaque jour. Les effets sont lus par le craft et la boutique.
 *
 * effet.type : "xp" (multiplicateur XP) | "qualite" (bonus plat) | "remise" (multiplicateur
 *              prix d'achat) | "aucun"
 */

export const EVENEMENTS = [
  {
    id: "aucun",
    nom: "Journée ordinaire",
    description: "Rien de spécial aujourd'hui à la forge.",
    icone: "Sun",
    effet: { type: "aucun", valeur: 1 },
  },
  {
    id: "double_xp",
    nom: "Inspiration du Maître",
    description: "Expérience de forge doublée toute la journée.",
    icone: "Sparkles",
    effet: { type: "xp", valeur: 2 },
  },
  {
    id: "main_sure",
    nom: "Main Sûre",
    description: "Toutes vos créations gagnent +1 qualité.",
    icone: "Star",
    effet: { type: "qualite", valeur: 1 },
  },
  {
    id: "foire",
    nom: "Foire aux Matériaux",
    description: "Prix d'achat réduits de 20 % au Marché.",
    icone: "Tag",
    effet: { type: "remise", valeur: 0.8 },
  },
];

function numeroJour(date) {
  return Math.floor(date.getTime() / 86400000);
}

/** Événement du jour, déterministe. */
export function getEvenementDuJour(date = new Date()) {
  return EVENEMENTS[numeroJour(date) % EVENEMENTS.length];
}

/** Multiplicateur XP du jour. */
export function getMultiplicateurXP(date = new Date()) {
  const e = getEvenementDuJour(date);
  return e.effet.type === "xp" ? e.effet.valeur : 1;
}

/** Bonus de qualité plat du jour. */
export function getBonusQualiteEvent(date = new Date()) {
  const e = getEvenementDuJour(date);
  return e.effet.type === "qualite" ? e.effet.valeur : 0;
}

/** Multiplicateur de prix d'achat du jour (remise). */
export function getMultiplicateurRemise(date = new Date()) {
  const e = getEvenementDuJour(date);
  return e.effet.type === "remise" ? e.effet.valeur : 1;
}
