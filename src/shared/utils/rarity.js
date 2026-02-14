const RARITY_LABELS = {
  common: "Commun",
  uncommon: "Peu commun",
  rare: "Rare",
  epic: "Épique",
  legendary: "Légendaire",
};

export function getRarityLabel(rarity) {
  return RARITY_LABELS[rarity] || "Commun";
}

export function getRarityClass(rarity) {
  return `rarity-${rarity}`;
}
