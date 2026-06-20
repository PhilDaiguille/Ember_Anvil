/**
 * Économie dynamique : modificateur de prix journalier, déterministe.
 *
 * Le prix de chaque matériau fluctue chaque jour dans une fourchette ±20 %,
 * de façon déterministe (seedé par le jour + l'id du matériau). Aucun état à
 * persister : le même jour donne les mêmes prix, le lendemain change.
 * ponytail: hash naïf + sinus, suffisant pour une variation crédible.
 */

import { getMultiplicateurRemise } from "./events";

const AMPLITUDE = 0.2; // ±20 %

// Numéro de jour absolu (jours depuis epoch), stable sur une journée.
function numeroJour(date) {
  return Math.floor(date.getTime() / 86400000);
}

// Hash entier simple et stable d'une chaîne.
function hashChaine(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h * 31 + str.charCodeAt(i)) | 0;
  }
  return h;
}

/**
 * Multiplicateur de prix du jour pour un matériau, dans [1-AMPLITUDE, 1+AMPLITUDE].
 */
export function getMarketModifier(materialId, date = new Date()) {
  const seed = hashChaine(materialId) + numeroJour(date);
  // sin() borné [-1,1] → variation lisse et déterministe
  const variation = Math.sin(seed * 1.5);
  return 1 + variation * AMPLITUDE;
}

/** Prix d'achat ajusté (entier, min 1), remise d'événement comprise. */
export function getPrixAchat(material, date = new Date()) {
  const base = material.prixAchat * getMarketModifier(material.id, date);
  return Math.max(1, Math.round(base * getMultiplicateurRemise(date)));
}

/** Prix de vente ajusté (entier, min 1). */
export function getPrixVente(material, date = new Date()) {
  return Math.max(1, Math.round(material.prixVente * getMarketModifier(material.id, date)));
}

/** Tendance du jour : "hausse" | "baisse" | "stable" (pour l'UI). */
export function getTendance(materialId, date = new Date()) {
  const m = getMarketModifier(materialId, date);
  if (m > 1.05) return "hausse";
  if (m < 0.95) return "baisse";
  return "stable";
}
