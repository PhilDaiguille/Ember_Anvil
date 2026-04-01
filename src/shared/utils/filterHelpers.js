/**
 * Utilitaires partagés pour filtrer les matériaux par rareté et recherche textuelle.
 * Évite la duplication entre Shop.vue et Inventory.vue.
 */

/**
 * Filtre un tableau de matériaux selon un filtre de rareté et une requête de recherche.
 * @param {Array} materials - Tableau de matériaux (chaque objet doit avoir `nom`, `type` et `rarity`)
 * @param {string} selectedFilter - Filtre de rareté ("all" | "common" | "uncommon" | "rare" | "epic" | "legendary")
 * @param {string} searchQuery - Requête de recherche textuelle
 * @returns {Array}
 */
export function filterMaterials(materials, selectedFilter, searchQuery) {
  let filtered = materials;

  if (selectedFilter !== "all") {
    filtered = filtered.filter((m) => m.rarity === selectedFilter);
  }

  const query = searchQuery.trim().toLowerCase();
  if (query) {
    filtered = filtered.filter(
      (m) =>
        m.nom.toLowerCase().includes(query) ||
        m.type.toLowerCase().includes(query),
    );
  }

  return filtered;
}
