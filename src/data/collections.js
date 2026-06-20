/**
 * COLLECTIONS — Panoplies à compléter
 *
 * Chaque collection regroupe des recettes. Lorsqu'elles ont toutes été forgées
 * (découvertes dans le codex), un bonus passif permanent s'active.
 *
 * bonus.type : "gain" (% valeur de vente) | "vitesse" (% temps de forge en moins)
 *            | "qualite" (bonus plat de qualité)
 */

export const COLLECTIONS = [
  {
    id: "forgeron_debutant",
    nom: "Premiers Pas du Forgeron",
    description: "Les créations de base de tout apprenti.",
    recipeIds: ["epee_fer", "dague_cuivre", "hache_fer", "casque_fer"],
    bonus: { type: "gain", valeur: 0.05 },
  },
  {
    id: "outils_forgeron",
    nom: "L'Établi Complet",
    description: "Tous les outils du métier.",
    recipeIds: ["pioche_fer", "hache_bucheron", "marteau_forgeron", "enclume_mithril"],
    bonus: { type: "vitesse", valeur: 0.05 },
  },
  {
    id: "maitre_armurier",
    nom: "Maître Armurier",
    description: "Une protection digne des plus grands chevaliers.",
    recipeIds: ["armure_acier", "bouclier_granite", "heaume_basalte", "armure_titane"],
    bonus: { type: "qualite", valeur: 1 },
  },
  {
    id: "joaillier_royal",
    nom: "Joaillier Royal",
    description: "Les parures des cours les plus fastueuses.",
    recipeIds: ["couronne_rubis", "diademe_diamant", "amulette_emeraude", "anneau_omnipotence"],
    bonus: { type: "gain", valeur: 0.1 },
  },
  {
    id: "armes_legendaires",
    nom: "Arsenal Légendaire",
    description: "Les armes dont les bardes chantent les exploits.",
    recipeIds: ["excalibur", "mjolnir", "arc_chasseur_etoiles", "faux_ombre"],
    bonus: { type: "vitesse", valeur: 0.1 },
  },
];

export function getCollectionById(id) {
  return COLLECTIONS.find((c) => c.id === id);
}
