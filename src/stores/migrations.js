const GAME_VERSION = "1.0.0";

/**
 * Initialise les données par défaut pour un nouveau joueur
 */
function initializeDefaultData() {
  localStorage.setItem("emberanvil.version", GAME_VERSION);
  console.log("✨ Nouveau joueur initialisé avec succès!");
}

/**
 * Migre les données d'une ancienne version vers la nouvelle
 */
function runMigrations(fromVersion, toVersion) {
  console.log(`🔄 Migration de ${fromVersion} vers ${toVersion}`);

  // Migration v0.0.0 → v1.0.0
  if (fromVersion === "0.0.0" && toVersion === "1.0.0") {
    console.log("Migration v0.0.0 → v1.0.0");

    // Exemple : Ajouter nouveau champ "or" s'il n'existe pas
    const playerData = JSON.parse(localStorage.getItem("emberanvil.player") || "{}");
    if (playerData.or === undefined) {
      playerData.or = 0;
      localStorage.setItem("emberanvil.player", JSON.stringify(playerData));
    }

    // Exemple : Migrer ancien format de matériaux
    const inventoryData = JSON.parse(localStorage.getItem("emberanvil.inventory") || "{}");
    if (inventoryData.materials && Array.isArray(inventoryData.materials)) {
      // Convertir array en object { materialId: quantite }
      const newMaterials = {};
      inventoryData.materials.forEach((m) => {
        newMaterials[m.id] = m.quantite;
      });
      inventoryData.materials = newMaterials;
      localStorage.setItem("emberanvil.inventory", JSON.stringify(inventoryData));
    }
  }

  // Migration v1.0.0 → v1.1.0
  if (fromVersion === "1.0.0" && toVersion === "1.1.0") {
    console.log("Migration v1.0.0 → v1.1.0");
    // Nouvelles migrations ici
  }

  console.log("✅ Migration terminée avec succès!");
}

/**
 * Vérifie et migre le localStorage au démarrage
 */
export function migrateLocalStorage() {
  const savedVersion = localStorage.getItem("emberanvil.version");

  if (!savedVersion) {
    // Première installation
    console.log("🎮 Première installation d'EmberAnvil");
    initializeDefaultData();
  } else if (savedVersion !== GAME_VERSION) {
    // Migration nécessaire
    console.warn(
      `⚠️ Version sauvegardée (${savedVersion}) différente de la version actuelle (${GAME_VERSION})`,
    );
    runMigrations(savedVersion, GAME_VERSION);
    localStorage.setItem("emberanvil.version", GAME_VERSION);
  } else {
    // Version à jour
    console.log("✅ LocalStorage à jour");
  }
}

/**
 * Reset complet du jeu (pour debug ou nouvelle partie)
 */
export function resetGame() {
  const confirm = window.confirm(
    "⚠️ ATTENTION : Cela supprimera TOUTES vos données de sauvegarde. Êtes-vous sûr ?",
  );

  if (confirm) {
    // Supprimer toutes les clés emberanvil.*
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("emberanvil.")) {
        localStorage.removeItem(key);
      }
    });

    console.log("🗑️ Jeu réinitialisé avec succès!");

    // Recharger la page
    window.location.reload();
  }
}

// Export de la version pour affichage
export { GAME_VERSION };
