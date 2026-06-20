/**
 * AFFIXES — modificateurs aléatoires sur les objets forgés.
 *
 * À la fin d'une forge, l'objet peut « rouler » un affixe qui modifie sa valeur.
 * Plus la qualité est haute, plus la chance d'un affixe rare augmente.
 */

export const AFFIXES = [
  { id: "affute", nom: "Affûté", multiplicateurValeur: 1.1 },
  { id: "renforce", nom: "Renforcé", multiplicateurValeur: 1.15 },
  { id: "elegant", nom: "Élégant", multiplicateurValeur: 1.2 },
  { id: "runique", nom: "Runique", multiplicateurValeur: 1.35 },
  { id: "legendaire", nom: "Chef-d'œuvre", multiplicateurValeur: 1.6 },
];

/**
 * Tire un affixe selon la qualité (1-5). Retourne null si aucun affixe.
 * Chance de base 20 %, +10 % par point de qualité. Meilleure qualité ⇒ affixe
 * potentiellement plus rare (index plus élevé dans la liste).
 */
export function roulerAffixe(qualite, rng = Math.random) {
  const chance = 0.2 + qualite * 0.1;
  if (rng() > chance) return null;

  // Index pondéré par la qualité : borne supérieure = qualité (max 5)
  const borneMax = Math.min(AFFIXES.length, Math.max(1, qualite));
  const index = Math.floor(rng() * borneMax);
  return AFFIXES[index];
}
