/**
 * Utilitaires partagés pour la forge/crafting
 * Évite la duplication de logique entre Crafting.vue et ForgeStation.vue
 */

import { MATERIALS } from "@/data/materials";

/**
 * Retourne le nom d'un matériau à partir de son identifiant.
 * @param {string} materialId
 * @returns {string}
 */
export function getMaterialNom(materialId) {
  return MATERIALS[materialId]?.nom ?? materialId;
}

/**
 * Vérifie si une recette peut être forgée selon le niveau du joueur
 * et les matériaux disponibles dans l'inventaire.
 * @param {Object} recipe - La recette à vérifier
 * @param {number} niveau - Le niveau actuel du joueur
 * @param {Object} inventoryStore - Le store d'inventaire (doit exposer hasEnough)
 * @returns {{ possible: boolean, raison?: string }}
 */
export function peutCrafter(recipe, niveau, inventoryStore) {
  if (niveau < recipe.niveauRequis) {
    return { possible: false, raison: "Niveau insuffisant" };
  }

  for (const ingredient of recipe.ingredients) {
    if (!inventoryStore.hasEnough(ingredient.materialId, ingredient.quantite)) {
      return { possible: false, raison: "Matériaux insuffisants" };
    }
  }

  return { possible: true };
}
