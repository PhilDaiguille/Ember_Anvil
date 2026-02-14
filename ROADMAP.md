# 🗺️ ROADMAP EMBERANVIL - Forge Virtuelle

**Version actuelle** : 0.0.0 (Prototype UI)  
**Objectif** : Transformer le prototype en jeu jouable avec persistance localStorage  
**Stack technique** : Vue 3 (Options API) + Vite 7 + Pinia + localStorage + Tailwind 4  
**Durée totale estimée** : 18-27 jours (3-4 semaines)

---

## 📋 Vue d'ensemble des phases

| Phase       | Titre                               | Durée estimée | Priorité    | Statut     |
| ----------- | ----------------------------------- | ------------- | ----------- | ---------- |
| **Phase 0** | 🏗️ Infrastructure & Architecture    | 1-2 jours     | 🔴 CRITIQUE | ⏳ À faire |
| **Phase 1** | 💰 Système d'Économie & Shop        | 2-3 jours     | 🔴 CRITIQUE | ⏳ À faire |
| **Phase 2** | 🔨 Système de Crafting Réel         | 3-4 jours     | 🔴 CRITIQUE | ⏳ À faire |
| **Phase 3** | 📦 Système d'Inventaire Fonctionnel | 2-3 jours     | 🟠 HAUTE    | ⏳ À faire |
| **Phase 4** | 🏭 Atelier & Progression            | 3-4 jours     | 🟠 HAUTE    | ⏳ À faire |
| **Phase 5** | 🎨 Améliorations UX/UI              | 2-3 jours     | 🟡 MOYENNE  | ⏳ À faire |
| **Phase 6** | ⚡ Optimisations & Performance      | 1-2 jours     | 🟡 MOYENNE  | ⏳ À faire |
| **Phase 7** | 🎮 Contenu & Balancing              | 2-3 jours     | 🟢 BASSE    | ⏳ À faire |
| **Phase 8** | 🧪 Tests & Polissage                | 2-3 jours     | 🟡 MOYENNE  | ⏳ À faire |

---

## 🏗️ PHASE 0 : Infrastructure & Architecture (1-2 jours)

**Objectif** : Mettre en place les fondations techniques pour un jeu fonctionnel

### 0.1 - Installation & Configuration de Pinia ⏳

**Commandes** :

```bash
npm install pinia
npm install pinia-plugin-persistedstate
```

**Fichiers à créer** :

```
src/stores/
├── index.js              # Configuration Pinia + persistance
├── player.js             # Store du joueur (ressources, XP, level)
├── inventory.js          # Store de l'inventaire (matériaux, objets forgés)
├── workshop.js           # Store de l'atelier (outils, facilities, quêtes)
├── crafting.js           # Store du crafting (recettes, progression)
├── game.js               # Store global du jeu (settings, achievements)
└── notifications.js      # Store des notifications toast
```

**Configuration dans `src/main.js`** :

```javascript
import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import App from "./App.vue";
import router from "./infrastructure/router";
import { migrateLocalStorage } from "@/stores/migrations";

// Migration localStorage avant tout
migrateLocalStorage();

// Pinia avec persistance
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app = createApp(App);
app.use(pinia);
app.use(router);
app.mount("#app");
```

**Stratégie de persistance localStorage** :

- `emberanvil.player` → state complet du joueur
- `emberanvil.inventory` → matériaux + objets forgés
- `emberanvil.workshop` → outils + facilities + quêtes
- `emberanvil.game` → settings + achievements
- `emberanvil.version` → version du jeu (pour migrations)

**Tasks** :

- [ ] Installer Pinia + plugin persistance
- [ ] Créer `src/stores/index.js` avec configuration
- [ ] Créer `src/stores/migrations.js` avec versioning
- [ ] Modifier `src/main.js` pour intégrer Pinia
- [ ] Tester sauvegarde/chargement localStorage

---

### 0.2 - Refactoring de Workshop.vue (48KB → composants) ⏳

**Problème** : `Workshop.vue` fait 48KB, trop monolithique, difficile à maintenir

**Solution** : Splitter en sous-composants réutilisables

**Structure cible** :

```
src/domains/workshop/
├── components/
│   ├── Workshop.vue                    # Composant principal (orchestrateur)
│   ├── WorkshopStats.vue              # Statistiques globales (productivité, bonus)
│   ├── WorkshopResources.vue          # Affichage des ressources (écus, or, XP)
│   ├── tools/
│   │   ├── ToolsPanel.vue             # Panel des outils
│   │   ├── ToolCard.vue               # Carte individuelle d'outil
│   │   └── ToolUpgradeModal.vue       # Modal d'upgrade avec animation
│   ├── facilities/
│   │   ├── FacilitiesPanel.vue        # Panel des installations
│   │   ├── FacilityCard.vue           # Carte individuelle d'installation
│   │   └── FacilityControls.vue       # Boutons activation/upgrade
│   ├── quests/
│   │   ├── QuestsPanel.vue            # Panel des quêtes
│   │   └── QuestCard.vue              # Carte individuelle de quête
│   ├── WorkshopHistory.vue            # Historique des actions
│   └── WorkshopNotification.vue       # Toast notification réutilisable
└── views/
    └── WorkshopView.vue               # View wrapper (inchangé)
```

**Principes de refactoring** :

- **Props down, events up** : Données via props, actions via `$emit`
- **Logique dans le store** : Déplacer toute la logique métier dans `stores/workshop.js`
- **Composants présentationnels** : Components = UI pure
- **Réutilisabilité** : `ToolCard` et `FacilityCard` génériques

**Tasks** :

- [ ] Créer `src/stores/workshop.js` avec toute la logique
- [ ] Extraire `ToolsPanel.vue` + `ToolCard.vue`
- [ ] Extraire `FacilitiesPanel.vue` + `FacilityCard.vue`
- [ ] Extraire `QuestsPanel.vue` + `QuestCard.vue`
- [ ] Extraire `WorkshopStats.vue` + `WorkshopResources.vue`
- [ ] Refactorer `Workshop.vue` en orchestrateur
- [ ] Tests de non-régression (vérifier que tout fonctionne)

**Estimation** : 6-8h

---

### 0.3 - Création du système de données enrichi ⏳

**Objectif** : Remplacer `Material.json` (4 matériaux) par une vraie base de données (30 matériaux)

**Fichiers à créer** :

```
src/data/
├── materials.js          # 30 matériaux (métaux, bois, pierres, gemmes, spéciaux)
├── recipes.js            # 40+ recettes de crafting
├── tools.js              # Définitions des 4 outils
├── facilities.js         # Définitions des 3 installations
├── quests.js             # Templates de quêtes (journalières, hebdo, uniques)
├── achievements.js       # 30 achievements
└── constants.js          # Constantes du jeu (coûts, coefficients, formules)
```

**Structure Material (améliorée)** :

```javascript
// src/data/materials.js
export const MATERIALS = {
  // MÉTAUX (8)
  aluminium: {
    id: "aluminium",
    nom: "Aluminium",
    type: "metal",
    rarity: "common", // common, uncommon, rare, epic, legendary
    tier: 1, // 1-5
    prixAchat: 6,
    prixVente: 4,
    image: "./assets/materials/aluminium.png",
    description:
      "Métal léger et résistant à la corrosion, idéal pour les débutants...",
    proprietes: {
      resistance: 60, // 0-100
      conductivite: 70,
      malleabilite: 80,
    },
  },
  cuivre: {
    /* ... */
  },
  fer: {
    /* ... */
  },
  etain: {
    /* ... */
  },
  bronze: {
    /* alliage ... */
  },
  acier: {
    /* ... */
  },
  mithril: {
    /* ... */
  },
  adamantium: {
    /* ... */
  },

  // BOIS (5)
  chene: {
    id: "chene",
    nom: "Chêne",
    type: "wood",
    rarity: "common",
    tier: 1,
    prixAchat: 3,
    prixVente: 2,
    image: "./assets/materials/chene.png",
    description: "Bois robuste et durable...",
    proprietes: {
      resistance: 40,
      flexibilite: 60,
      durete: 50,
    },
  },
  pin: {
    /* ... */
  },
  ebene: {
    /* ... */
  },
  bois_ancestral: {
    /* ... */
  },
  bois_petrifie: {
    /* ... */
  },

  // PIERRES (5)
  granite: {
    /* ... */
  },
  marbre: {
    /* ... */
  },
  obsidienne: {
    /* ... */
  },
  pierre_runique: {
    /* ... */
  },
  cristal_draconique: {
    /* ... */
  },

  // GEMMES (7)
  rubis: {
    id: "rubis",
    nom: "Rubis",
    type: "gem",
    rarity: "rare",
    tier: 3,
    prixAchat: 250,
    prixVente: 180,
    image: "./assets/materials/rubis.png",
    description: "Gemme rouge écarlate, symbole de passion et de puissance...",
    proprietes: {
      pouvoir_magique: 85,
      eclat: 95,
      purete: 80,
    },
  },
  saphir: {
    /* ... */
  },
  emeraude: {
    /* ... */
  },
  diamant: {
    /* ... */
  },
  amethyste: {
    /* ... */
  },
  topaze: {
    /* ... */
  },
  opale: {
    /* ... */
  },

  // RESSOURCES SPÉCIALES (5)
  poussiere_magique: {
    /* ... */
  },
  essence_elementaire: {
    /* ... */
  },
  fragment_ame: {
    /* ... */
  },
  cristal_temporel: {
    /* ... */
  },
  coeur_forge: {
    /* ... */
  },
};

// Helper : Obtenir tous les matériaux d'un type
export function getMaterialsByType(type) {
  return Object.values(MATERIALS).filter((m) => m.type === type);
}

// Helper : Obtenir tous les matériaux d'une rareté
export function getMaterialsByRarity(rarity) {
  return Object.values(MATERIALS).filter((m) => m.rarity === rarity);
}

// Helper : Obtenir tous les matériaux d'un tier
export function getMaterialsByTier(tier) {
  return Object.values(MATERIALS).filter((m) => m.tier === tier);
}
```

**Structure Recipe** :

```javascript
// src/data/recipes.js
export const RECIPES = {
  // TIER 1 - Niveau 1-10
  epee_fer: {
    id: "epee_fer",
    nom: "Épée en Fer",
    type: "weapon", // weapon, armor, tool, potion
    tier: 1,
    ingredients: [
      { materialId: "fer", quantite: 3 },
      { materialId: "chene", quantite: 1 },
    ],
    tempsCrafting: 5000, // 5 secondes
    outilRequis: {
      type: "hammer", // hammer, anvil, forge, bellows
      niveauMin: 1,
    },
    faciliteBonus: "forge_elementaire", // Optionnel : facility qui donne bonus
    qualiteBase: 50, // 0-100 (base de calcul)
    valeurBase: 120, // Valeur en écus
    xpGain: 15,
    description:
      "Une épée simple mais efficace, forgée dans le fer le plus pur.",
    icone: "Swords",
  },

  bouclier_bois: {
    id: "bouclier_bois",
    nom: "Bouclier en Bois",
    type: "armor",
    tier: 1,
    ingredients: [
      { materialId: "chene", quantite: 5 },
      { materialId: "fer", quantite: 1 },
    ],
    tempsCrafting: 4000,
    outilRequis: { type: "hammer", niveauMin: 1 },
    qualiteBase: 45,
    valeurBase: 80,
    xpGain: 12,
    description: "Un bouclier basique en chêne renforcé de fer.",
    icone: "Shield",
  },

  // TIER 2 - Niveau 11-20
  epee_acier: {
    /* ... */
  },
  armure_cuir: {
    /* ... */
  },

  // TIER 3 - Niveau 21-30
  epee_enchantee: {
    /* ... */
  },
  armure_mithril: {
    /* ... */
  },

  // TIER 4 - Niveau 31-40
  lame_draconique: {
    /* ... */
  },
  armure_legendaire: {
    /* ... */
  },

  // TIER 5 - Niveau 41-50
  arme_ultime: {
    /* ... */
  },
  armure_transcendante: {
    /* ... */
  },
};

// Helper : Obtenir recettes par tier
export function getRecipesByTier(tier) {
  return Object.values(RECIPES).filter((r) => r.tier === tier);
}

// Helper : Obtenir recettes par type
export function getRecipesByType(type) {
  return Object.values(RECIPES).filter((r) => r.type === type);
}
```

**Tasks** :

- [ ] Créer `src/data/materials.js` avec 30 matériaux
- [ ] Créer `src/data/recipes.js` avec 40 recettes
- [ ] Créer `src/data/tools.js` avec définitions des outils
- [ ] Créer `src/data/facilities.js` avec définitions des installations
- [ ] Créer `src/data/quests.js` avec templates de quêtes
- [ ] Créer `src/data/achievements.js` avec 30 achievements
- [ ] Créer `src/data/constants.js` avec constantes du jeu
- [ ] Télécharger/générer images pour nouveaux matériaux (WebP 256x256)

**Estimation** : 3-4h

---

### 0.4 - Système de versioning & migrations ⏳

**Objectif** : Permettre les mises à jour du jeu sans casser les sauvegardes existantes

**Fichier à créer** :

```javascript
// src/stores/migrations.js
const GAME_VERSION = "1.0.0";

/**
 * Initialise les données par défaut pour un nouveau joueur
 */
function initializeDefaultData() {
  localStorage.setItem("emberanvil.version", GAME_VERSION);

  // Pas besoin de set les stores, Pinia le fait automatiquement
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
    const playerData = JSON.parse(
      localStorage.getItem("emberanvil.player") || "{}",
    );
    if (playerData.or === undefined) {
      playerData.or = 0;
      localStorage.setItem("emberanvil.player", JSON.stringify(playerData));
    }

    // Exemple : Migrer ancien format de matériaux
    const inventoryData = JSON.parse(
      localStorage.getItem("emberanvil.inventory") || "{}",
    );
    if (inventoryData.materials && Array.isArray(inventoryData.materials)) {
      // Convertir array en object { materialId: quantite }
      const newMaterials = {};
      inventoryData.materials.forEach((m) => {
        newMaterials[m.id] = m.quantite;
      });
      inventoryData.materials = newMaterials;
      localStorage.setItem(
        "emberanvil.inventory",
        JSON.stringify(inventoryData),
      );
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
```

**Tasks** :

- [ ] Créer `src/stores/migrations.js`
- [ ] Appeler `migrateLocalStorage()` dans `src/main.js` avant Pinia
- [ ] Ajouter bouton "Réinitialiser le jeu" dans les paramètres (optionnel)
- [ ] Tester migration avec fausses données

**Estimation** : 1-2h

---

## 💰 PHASE 1 : Système d'Économie & Shop (2-3 jours)

**Objectif** : Rendre le Marché (`/marche`) complètement fonctionnel avec achat/vente réels

### 1.1 - Store Player (Ressources & Progression) ⏳

**Fichier** : `src/stores/player.js`

**Responsabilités** :

- Gérer les ressources du joueur (écus, or)
- Gérer la progression (niveau, XP)
- Gérer les statistiques
- Calculer les montées de niveau

**State** :

```javascript
// src/stores/player.js
import { defineStore } from "pinia";

export const usePlayerStore = defineStore("player", {
  state: () => ({
    // Identité
    nom: "Thorin Forgepierre",
    titre: "Apprenti Forgeron",
    avatar: "swords",
    membreDepuis: new Date().toISOString(),

    // Progression
    niveau: 1,
    experience: 0,
    experienceMax: 1000,

    // Ressources
    ecus: 1250, // Monnaie principale
    or: 0, // Monnaie rare (pour upgrades facilities)

    // Statistiques
    stats: {
      objetsCrees: 0,
      valeurCreations: 0,
      heuresJeu: 0,
      rangMondial: 9999,
      materielUtilise: 0,
      recettesDebloquees: 0,
    },
  }),

  getters: {
    // Progression niveau en %
    progressionNiveau: (state) =>
      (state.experience / state.experienceMax) * 100,

    // Peut acheter quelque chose ?
    peutAcheter: (state) => (cout) => state.ecus >= cout,

    // Niveau suivant
    niveauSuivant: (state) => state.niveau + 1,

    // XP requise pour niveau suivant (formule exponentielle)
    experiencePourNiveauSuivant: (state) => {
      return Math.floor(1000 * Math.pow(1.5, state.niveau - 1));
    },

    // Titre selon niveau
    titreActuel: (state) => {
      if (state.niveau >= 50) return "Grand Maître Forgeron";
      if (state.niveau >= 40) return "Maître Forgeron";
      if (state.niveau >= 30) return "Forgeron Expert";
      if (state.niveau >= 20) return "Forgeron Confirmé";
      if (state.niveau >= 10) return "Forgeron";
      return "Apprenti Forgeron";
    },
  },

  actions: {
    // ========== GESTION DES ÉCUS ==========

    ajouterEcus(montant) {
      this.ecus += montant;
    },

    retirerEcus(montant) {
      if (this.ecus >= montant) {
        this.ecus -= montant;
        return true;
      }
      return false;
    },

    // ========== GESTION DE L'OR ==========

    ajouterOr(montant) {
      this.or += montant;
    },

    retirerOr(montant) {
      if (this.or >= montant) {
        this.or -= montant;
        return true;
      }
      return false;
    },

    // ========== GESTION DE L'XP ==========

    ajouterExperience(montant) {
      this.experience += montant;
      this.verifierNiveauSuivant();
    },

    verifierNiveauSuivant() {
      while (this.experience >= this.experienceMax) {
        this.monterNiveau();
      }
    },

    monterNiveau() {
      this.niveau++;
      this.experience -= this.experienceMax;
      this.experienceMax = this.experiencePourNiveauSuivant;
      this.titre = this.titreActuel;

      // Récompenses de niveau
      const recompenseEcus = 100 * this.niveau;
      const recompenseOr = Math.floor(this.niveau / 5) * 10;

      this.ajouterEcus(recompenseEcus);
      if (recompenseOr > 0) {
        this.ajouterOr(recompenseOr);
      }

      // TODO: Notification de level up
      console.log(
        `🎉 NIVEAU ${this.niveau} ! +${recompenseEcus} écus, +${recompenseOr} or`,
      );
    },

    // ========== STATISTIQUES ==========

    incrementerStat(statName, montant = 1) {
      if (this.stats[statName] !== undefined) {
        this.stats[statName] += montant;
      }
    },

    // ========== TEMPS DE JEU ==========

    demarrerSession() {
      this._sessionStartTime = Date.now();
    },

    terminerSession() {
      if (this._sessionStartTime) {
        const duree = Date.now() - this._sessionStartTime;
        this.stats.heuresJeu += duree / (1000 * 60 * 60); // En heures
        delete this._sessionStartTime;
      }
    },
  },

  persist: true, // Sauvegarder dans localStorage
});
```

**Tasks** :

- [ ] Créer `src/stores/player.js`
- [ ] Tester ajout/retrait écus
- [ ] Tester système d'XP et montée de niveau
- [ ] Tester sauvegarde/chargement depuis localStorage

**Estimation** : 2-3h

---

### 1.2 - Store Inventory (Matériaux & Objets) ⏳

**Fichier** : `src/stores/inventory.js`

**Responsabilités** :

- Gérer les matériaux bruts (quantités)
- Gérer les objets forgés
- Calculer capacité utilisée
- Calculer valeur totale
- Historique des transactions

**State** :

```javascript
// src/stores/inventory.js
import { defineStore } from "pinia";
import { MATERIALS } from "@/data/materials";

export const useInventoryStore = defineStore("inventory", {
  state: () => ({
    // Matériaux bruts : { materialId: quantite }
    materials: {},

    // Objets forgés : array d'objets
    craftedItems: [],

    // Capacité
    capaciteMax: 500,

    // Historique des transactions (50 dernières)
    transactions: [],
  }),

  getters: {
    // Capacité utilisée
    capaciteUtilisee: (state) => {
      const materialsCount = Object.values(state.materials).reduce(
        (sum, qty) => sum + qty,
        0,
      );
      const itemsCount = state.craftedItems.length;
      return materialsCount + itemsCount;
    },

    // Pourcentage de remplissage
    pourcentageRemplissage: (state) => {
      return (this.capaciteUtilisee / state.capaciteMax) * 100;
    },

    // Inventaire plein ?
    isFull: (state) => {
      return this.capaciteUtilisee >= state.capaciteMax;
    },

    // Valeur totale de l'inventaire
    valeurTotale: (state) => {
      // Valeur des matériaux (prix de vente)
      const valeursMateriaux = Object.entries(state.materials).reduce(
        (sum, [id, qty]) => {
          const material = MATERIALS[id];
          return sum + (material?.prixVente || 0) * qty;
        },
        0,
      );

      // Valeur des objets forgés
      const valeursObjets = state.craftedItems.reduce(
        (sum, item) => sum + (item.valeur || 0),
        0,
      );

      return valeursMateriaux + valeursObjets;
    },

    // Obtenir quantité d'un matériau
    getQuantite: (state) => (materialId) => {
      return state.materials[materialId] || 0;
    },

    // Vérifier si assez de matériaux
    hasEnough: (state) => (materialId, quantite) => {
      return (state.materials[materialId] || 0) >= quantite;
    },

    // Liste des matériaux possédés (pour affichage)
    materialsList: (state) => {
      return Object.entries(state.materials)
        .filter(([id, qty]) => qty > 0)
        .map(([id, qty]) => ({
          ...MATERIALS[id],
          quantite: qty,
        }))
        .sort((a, b) => {
          // Trier par rareté puis nom
          if (a.tier !== b.tier) return b.tier - a.tier;
          return a.nom.localeCompare(b.nom);
        });
    },

    // Objets forgés triés par qualité
    craftedItemsSorted: (state) => {
      return [...state.craftedItems].sort((a, b) => {
        if (b.qualite !== a.qualite) return b.qualite - a.qualite;
        return b.dateCreation - a.dateCreation;
      });
    },
  },

  actions: {
    // ========== GESTION DES MATÉRIAUX ==========

    ajouterMaterial(materialId, quantite = 1) {
      if (!this.materials[materialId]) {
        this.materials[materialId] = 0;
      }
      this.materials[materialId] += quantite;

      // Historique
      this.ajouterTransaction({
        type: "material_add",
        materialId,
        quantite,
        timestamp: Date.now(),
      });
    },

    retirerMaterial(materialId, quantite = 1) {
      if (this.hasEnough(materialId, quantite)) {
        this.materials[materialId] -= quantite;

        // Supprimer si quantité = 0
        if (this.materials[materialId] === 0) {
          delete this.materials[materialId];
        }

        this.ajouterTransaction({
          type: "material_remove",
          materialId,
          quantite,
          timestamp: Date.now(),
        });

        return true;
      }
      return false;
    },

    // ========== GESTION DES OBJETS FORGÉS ==========

    ajouterObjet(objet) {
      // Vérifier capacité
      if (this.isFull) {
        console.warn("⚠️ Inventaire plein!");
        return false;
      }

      // Générer ID unique
      const id = `item_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      this.craftedItems.push({
        ...objet,
        id,
        dateCreation: Date.now(),
      });

      this.ajouterTransaction({
        type: "item_craft",
        itemId: id,
        timestamp: Date.now(),
      });

      return true;
    },

    supprimerObjet(itemId) {
      const index = this.craftedItems.findIndex((item) => item.id === itemId);
      if (index !== -1) {
        const item = this.craftedItems[index];
        this.craftedItems.splice(index, 1);

        this.ajouterTransaction({
          type: "item_delete",
          itemId,
          timestamp: Date.now(),
        });

        return true;
      }
      return false;
    },

    // ========== HISTORIQUE ==========

    ajouterTransaction(transaction) {
      this.transactions.unshift(transaction);
      // Garder seulement les 50 dernières
      if (this.transactions.length > 50) {
        this.transactions = this.transactions.slice(0, 50);
      }
    },

    // ========== UTILITAIRES ==========

    // Augmenter capacité (via quête ou achat)
    augmenterCapacite(montant) {
      this.capaciteMax += montant;
    },
  },

  persist: true,
});
```

**Tasks** :

- [ ] Créer `src/stores/inventory.js`
- [ ] Tester ajout/retrait matériaux
- [ ] Tester ajout/suppression objets forgés
- [ ] Tester calcul capacité et valeur totale
- [ ] Tester sauvegarde/chargement

**Estimation** : 2-3h

---

### 1.3 - Refactoring Shop.vue (Logique d'achat/vente) ⏳

**Modifications** :

- Charger matériaux depuis `MATERIALS` (data/materials.js)
- Utiliser `playerStore` pour les écus
- Utiliser `inventoryStore` pour les matériaux
- Implémenter logique d'achat/vente réelle
- Afficher quantité possédée sur chaque carte
- Notifications toast pour feedback

**Shop.vue** :

```vue
<script>
import { mapState, mapActions } from "pinia";
import { usePlayerStore } from "@/stores/player";
import { useInventoryStore } from "@/stores/inventory";
import { useNotificationsStore } from "@/stores/notifications";
import { MATERIALS } from "@/data/materials";
import ShopCard from "./ShopCard.vue";
import { Search, Crown } from "lucide-vue-next";

export default {
  name: "Shop",
  components: { ShopCard, Search, Crown },

  data() {
    return {
      selectedFilter: "all",
      searchQuery: "",
    };
  },

  computed: {
    ...mapState(usePlayerStore, ["ecus"]),

    // Charger tous les matériaux depuis data/materials.js
    allMaterials() {
      return Object.values(MATERIALS);
    },

    // Filtrer par rareté + recherche
    filteredMaterials() {
      let filtered = this.allMaterials;

      // Filtre par rareté
      if (this.selectedFilter !== "all") {
        filtered = filtered.filter((m) => m.rarity === this.selectedFilter);
      }

      // Filtre par recherche
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter(
          (m) =>
            m.nom.toLowerCase().includes(query) ||
            m.description.toLowerCase().includes(query) ||
            m.type.toLowerCase().includes(query),
        );
      }

      return filtered.sort((a, b) => {
        // Trier par tier puis nom
        if (a.tier !== b.tier) return a.tier - b.tier;
        return a.nom.localeCompare(b.nom);
      });
    },
  },

  methods: {
    ...mapActions(usePlayerStore, ["retirerEcus", "ajouterEcus"]),
    ...mapActions(useInventoryStore, [
      "ajouterMaterial",
      "retirerMaterial",
      "getQuantite",
    ]),
    ...mapActions(useNotificationsStore, ["show"]),

    // Acheter un matériau
    acheterMaterial(material, quantite = 1) {
      const coutTotal = material.prixAchat * quantite;

      if (this.ecus >= coutTotal) {
        this.retirerEcus(coutTotal);
        this.ajouterMaterial(material.id, quantite);

        this.show(
          `✅ Acheté ${quantite}x ${material.nom} pour ${coutTotal} écus`,
          "success",
        );
      } else {
        const manquant = coutTotal - this.ecus;
        this.show(
          `❌ Fonds insuffisants (${manquant} écus manquants)`,
          "error",
        );
      }
    },

    // Vendre un matériau
    vendreMaterial(material, quantite = 1) {
      const quantiteDisponible = this.getQuantite(material.id);

      if (quantiteDisponible >= quantite) {
        this.retirerMaterial(material.id, quantite);
        const gainTotal = material.prixVente * quantite;
        this.ajouterEcus(gainTotal);

        this.show(
          `✅ Vendu ${quantite}x ${material.nom} pour ${gainTotal} écus`,
          "success",
        );
      } else {
        this.show(
          `❌ Quantité insuffisante (${quantiteDisponible} disponible)`,
          "error",
        );
      }
    },
  },
};
</script>

<template>
  <div class="shop-container">
    <!-- Header avec filtres -->
    <div class="shop-header">
      <h1><Crown :size="32" /> Marché d'EmberAnvil</h1>

      <!-- Barre de recherche -->
      <div class="search-bar">
        <Search :size="20" />
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Rechercher un matériau..."
        />
      </div>

      <!-- Filtres par rareté -->
      <div class="rarity-filters">
        <button
          @click="selectedFilter = 'all'"
          :class="{ active: selectedFilter === 'all' }"
        >
          Tous
        </button>
        <button
          @click="selectedFilter = 'common'"
          :class="{ active: selectedFilter === 'common' }"
        >
          Communs
        </button>
        <button
          @click="selectedFilter = 'rare'"
          :class="{ active: selectedFilter === 'rare' }"
        >
          Rares
        </button>
        <button
          @click="selectedFilter = 'legendary'"
          :class="{ active: selectedFilter === 'legendary' }"
        >
          Légendaires
        </button>
      </div>
    </div>

    <!-- Grille de matériaux -->
    <div class="materials-grid">
      <ShopCard
        v-for="material in filteredMaterials"
        :key="material.id"
        :material="material"
        @acheter="acheterMaterial"
        @vendre="vendreMaterial"
      />
    </div>

    <!-- Empty state si aucun résultat -->
    <div v-if="filteredMaterials.length === 0" class="empty-state">
      <p>Aucun matériau trouvé</p>
    </div>
  </div>
</template>
```

**ShopCard.vue** (modifications) :

```vue
<script>
import { mapState } from "pinia";
import { useInventoryStore } from "@/stores/inventory";
import { Package, ShoppingCart, DollarSign } from "lucide-vue-next";

export default {
  name: "ShopCard",
  components: { Package, ShoppingCart, DollarSign },

  props: {
    material: {
      type: Object,
      required: true,
    },
  },

  computed: {
    ...mapState(useInventoryStore, {
      quantitePossedee: function (store) {
        return store.getQuantite(this.material.id);
      },
    }),

    rarityClass() {
      return `rarity-${this.material.rarity}`;
    },

    tierBadge() {
      return `Tier ${this.material.tier}`;
    },
  },

  methods: {
    handleAcheter() {
      this.$emit("acheter", this.material);
    },

    handleVendre() {
      if (this.quantitePossedee > 0) {
        this.$emit("vendre", this.material);
      }
    },
  },
};
</script>

<template>
  <div class="shop-card" :class="rarityClass">
    <!-- Badge de quantité possédée -->
    <div v-if="quantitePossedee > 0" class="inventory-badge">
      <Package :size="14" />
      {{ quantitePossedee }}
    </div>

    <!-- Badge de tier -->
    <div class="tier-badge">{{ tierBadge }}</div>

    <!-- Image du matériau -->
    <img :src="material.image" :alt="material.nom" />

    <!-- Info -->
    <div class="material-info">
      <h4>{{ material.nom }}</h4>
      <span class="rarity-label">{{ material.rarity }}</span>
    </div>

    <!-- Description (tronquée) -->
    <p class="description">{{ material.description }}</p>

    <!-- Prix -->
    <div class="prices">
      <div class="price-buy">
        <ShoppingCart :size="14" />
        <span>{{ material.prixAchat }} écus</span>
      </div>
      <div class="price-sell">
        <DollarSign :size="14" />
        <span>{{ material.prixVente }} écus</span>
      </div>
    </div>

    <!-- Actions -->
    <div class="actions">
      <button @click="handleAcheter" class="btn-buy">Acheter</button>

      <button
        @click="handleVendre"
        :disabled="quantitePossedee === 0"
        class="btn-sell"
        :class="{ disabled: quantitePossedee === 0 }"
      >
        Vendre
      </button>
    </div>
  </div>
</template>
```

**Tasks** :

- [ ] Refactorer `Shop.vue` pour utiliser les stores
- [ ] Refactorer `ShopCard.vue` pour afficher quantité possédée
- [ ] Implémenter logique d'achat (consommer écus, ajouter matériau)
- [ ] Implémenter logique de vente (gagner écus, retirer matériau)
- [ ] Ajouter notifications toast pour feedback
- [ ] Tester achat/vente avec différents matériaux
- [ ] Tester filtres et recherche

**Estimation** : 3-4h

---

### 1.4 - Affichage des ressources dans PageHeader.vue ⏳

**Modifications** :

```vue
<script>
import { mapState } from "pinia";
import { usePlayerStore } from "@/stores/player";
import { Coins, Gem, TrendingUp } from "lucide-vue-next";

export default {
  name: "PageHeader",
  components: { Coins, Gem, TrendingUp },

  computed: {
    ...mapState(usePlayerStore, [
      "ecus",
      "or",
      "niveau",
      "experience",
      "experienceMax",
    ]),

    progressionNiveau() {
      return (this.experience / this.experienceMax) * 100;
    },
  },
};
</script>

<template>
  <header class="page-header">
    <!-- Navigation existante -->
    <nav><!-- ... --></nav>

    <!-- Ressources du joueur -->
    <div class="player-resources">
      <!-- Écus -->
      <div class="resource-item ecus">
        <Coins :size="18" />
        <span>{{ ecus.toLocaleString() }}</span>
      </div>

      <!-- Or (si > 0) -->
      <div v-if="or > 0" class="resource-item or">
        <Gem :size="18" />
        <span>{{ or }}</span>
      </div>

      <!-- Niveau avec barre de progression -->
      <div class="level-badge" :title="`${experience} / ${experienceMax} XP`">
        <TrendingUp :size="16" />
        <span>Niv. {{ niveau }}</span>
        <div class="xp-bar">
          <div
            class="xp-fill"
            :style="{ width: `${progressionNiveau}%` }"
          ></div>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.player-resources {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.resource-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: rgba(25, 25, 25, 0.8);
  border-radius: 8px;
  font-weight: 600;
}

.resource-item.ecus {
  color: var(--sea-green);
}

.resource-item.or {
  color: #ffd700;
}

.level-badge {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: var(--viridian);
  border-radius: 8px;
  position: relative;
  cursor: help;
}

.xp-bar {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 0 0 8px 8px;
  overflow: hidden;
}

.xp-fill {
  height: 100%;
  background: var(--sea-green);
  transition: width 0.3s ease;
}
</style>
```

**Tasks** :

- [ ] Modifier `PageHeader.vue` pour afficher ressources dynamiques
- [ ] Ajouter styles pour les badges de ressources
- [ ] Ajouter barre de progression XP (tooltip avec détails)
- [ ] Tester réactivité (changements instantanés après achat/vente)

**Estimation** : 1-2h

---

### 1.5 - Store Notifications (Toast) ⏳

**Fichier** : `src/stores/notifications.js`

```javascript
// src/stores/notifications.js
import { defineStore } from "pinia";

export const useNotificationsStore = defineStore("notifications", {
  state: () => ({
    notifications: [],
  }),

  actions: {
    show(message, type = "info", duration = 3000) {
      const id = Date.now() + Math.random();

      this.notifications.push({
        id,
        message,
        type, // success, error, info, warning
        visible: true,
      });

      // Auto-dismiss après duration
      setTimeout(() => {
        this.remove(id);
      }, duration);
    },

    remove(id) {
      const index = this.notifications.findIndex((n) => n.id === id);
      if (index !== -1) {
        this.notifications.splice(index, 1);
      }
    },
  },

  persist: false, // Ne pas persister (éphémère)
});
```

**Composant Toast** :

```vue
<!-- src/shared/ui/Toast.vue -->
<script>
import { mapState, mapActions } from "pinia";
import { useNotificationsStore } from "@/stores/notifications";
import {
  X,
  CheckCircle,
  AlertCircle,
  Info,
  AlertTriangle,
} from "lucide-vue-next";

export default {
  name: "Toast",
  components: { X, CheckCircle, AlertCircle, Info, AlertTriangle },

  computed: {
    ...mapState(useNotificationsStore, ["notifications"]),
  },

  methods: {
    ...mapActions(useNotificationsStore, ["remove"]),

    getIcon(type) {
      const icons = {
        success: "CheckCircle",
        error: "AlertCircle",
        info: "Info",
        warning: "AlertTriangle",
      };
      return icons[type] || "Info";
    },
  },
};
</script>

<template>
  <div class="toast-container">
    <transition-group name="toast">
      <div
        v-for="notif in notifications"
        :key="notif.id"
        class="toast"
        :class="`toast-${notif.type}`"
      >
        <component :is="getIcon(notif.type)" :size="20" />
        <span class="toast-message">{{ notif.message }}</span>
        <button @click="remove(notif.id)" class="toast-close">
          <X :size="16" />
        </button>
      </div>
    </transition-group>
  </div>
</template>

<style scoped>
.toast-container {
  position: fixed;
  top: 80px;
  right: 20px;
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: 400px;
}

.toast {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 1rem 1.5rem;
  background: var(--jet);
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  border-left: 4px solid;
  animation: slideIn 0.3s ease;
}

.toast-success {
  border-left-color: var(--sea-green);
  color: var(--sea-green);
}

.toast-error {
  border-left-color: var(--auburn);
  color: var(--auburn);
}

.toast-info {
  border-left-color: var(--viridian);
  color: var(--viridian);
}

.toast-warning {
  border-left-color: #ffa500;
  color: #ffa500;
}

.toast-message {
  flex: 1;
  color: var(--dun);
}

.toast-close {
  background: none;
  border: none;
  color: var(--dun);
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s;
}

.toast-close:hover {
  opacity: 1;
}

/* Animations */
.toast-enter-active {
  animation: slideIn 0.3s ease;
}

.toast-leave-active {
  animation: slideOut 0.3s ease;
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slideOut {
  from {
    transform: translateX(0);
    opacity: 1;
  }
  to {
    transform: translateX(100%);
    opacity: 0;
  }
}
</style>
```

**Intégration dans App.vue** :

```vue
<template>
  <div id="app">
    <PageHeader />
    <router-view />
    <PageFooter />
    <Toast />
  </div>
</template>

<script>
import PageHeader from "@/shared/layout/PageHeader.vue";
import PageFooter from "@/shared/layout/PageFooter.vue";
import Toast from "@/shared/ui/Toast.vue";

export default {
  name: "App",
  components: {
    PageHeader,
    PageFooter,
    Toast,
  },
};
</script>
```

**Tasks** :

- [ ] Créer `src/stores/notifications.js`
- [ ] Créer `src/shared/ui/Toast.vue`
- [ ] Intégrer `<Toast />` dans `App.vue`
- [ ] Tester notifications success/error/info/warning
- [ ] Tester auto-dismiss après 3 secondes

**Estimation** : 2h

---

### 1.6 - Tests Phase 1 ✅

**Scénarios à tester** :

- [ ] **Achat matériau** : Écus diminuent, inventaire augmente, notification success
- [ ] **Achat sans fonds** : Message d'erreur, rien ne change
- [ ] **Vente matériau** : Écus augmentent, inventaire diminue, notification success
- [ ] **Vente sans stock** : Message d'erreur, rien ne change
- [ ] **Filtres par rareté** : Affichage correct des matériaux filtrés
- [ ] **Recherche** : Résultats pertinents
- [ ] **Affichage quantité** : Badge sur ShopCard montre quantité possédée
- [ ] **Persistance** : Après refresh, écus et inventaire sont sauvegardés
- [ ] **Header** : Ressources affichées en temps réel
- [ ] **XP et niveau** : Barre de progression correcte

---

## 🔨 PHASE 2 : Système de Crafting Réel (3-4 jours)

**Objectif** : Transformer la Forge (`/forge`) en vrai système de crafting avec recettes

### 2.1 - Store Crafting ⏳

**Fichier** : `src/stores/crafting.js`

_(Voir section détaillée dans le message précédent - trop long à réécrire ici)_

**Responsabilités** :

- Gérer la sélection de recette
- Gérer le processus de crafting (progression, particules)
- Calculer la qualité de l'objet final (selon productivité atelier)
- Consommer matériaux et distribuer récompenses (XP, objet)
- Statistiques de session

**Tasks** :

- [ ] Créer `src/stores/crafting.js` avec toute la logique
- [ ] Implémenter `startCrafting()` avec animation de progression
- [ ] Implémenter `calculateQuality()` avec formule complexe
- [ ] Implémenter `completeCrafting()` avec récompenses
- [ ] Tester crafting avec différentes recettes

**Estimation** : 4-5h

---

### 2.2 - Refactoring Crafting.vue ⏳

**Structure cible** :

```
src/domains/crafting/components/
├── Crafting.vue              # Composant principal (orchestrateur)
├── RecipeSelector.vue        # Liste des recettes (sidebar)
├── RecipeDetails.vue         # Détails de la recette sélectionnée
├── ForgeStation.vue          # Animation de forge (existant, refactoré)
└── CraftingStats.vue         # Stats de session
```

**Crafting.vue** (orchestrateur) :

```vue
<template>
  <div class="crafting-container">
    <!-- Sélection de recette -->
    <RecipeSelector
      :recipes="availableRecipes"
      :selectedRecipe="selectedRecipe"
      @select="selectRecipe"
    />

    <!-- Vue détaillée de la recette -->
    <RecipeDetails
      v-if="selectedRecipe"
      :recipe="selectedRecipe"
      :canCraft="canCraft"
      @craft="startCrafting"
    />

    <!-- Station de forge -->
    <ForgeStation
      :isCrafting="isCrafting"
      :progress="progress"
      :sparks="sparks"
      @start="startCrafting"
      @cancel="cancelCrafting"
    />

    <!-- Statistiques de session -->
    <CraftingStats :stats="sessionStats" />
  </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import { useCraftingStore } from "@/stores/crafting";
import RecipeSelector from "./RecipeSelector.vue";
import RecipeDetails from "./RecipeDetails.vue";
import ForgeStation from "./ForgeStation.vue";
import CraftingStats from "./CraftingStats.vue";

export default {
  name: "Crafting",
  components: {
    RecipeSelector,
    RecipeDetails,
    ForgeStation,
    CraftingStats,
  },

  computed: {
    ...mapState(useCraftingStore, [
      "selectedRecipe",
      "isCrafting",
      "progress",
      "sparks",
      "availableRecipes",
      "canCraft",
      "sessionStats",
    ]),
  },

  methods: {
    ...mapActions(useCraftingStore, [
      "selectRecipe",
      "startCrafting",
      "cancelCrafting",
    ]),
  },
};
</script>
```

**Tasks** :

- [ ] Créer `RecipeSelector.vue` avec filtres par tier
- [ ] Créer `RecipeDetails.vue` avec ingrédients requis
- [ ] Refactorer `ForgeStation.vue` (garder animations existantes)
- [ ] Créer `CraftingStats.vue` pour stats de session
- [ ] Connecter tous les composants aux stores

**Estimation** : 5-6h

---

### 2.3 - Composant RecipeSelector.vue ⏳

_(Voir section détaillée dans le message précédent)_

**Features** :

- Liste de toutes les recettes disponibles (selon niveau joueur)
- Filtres par tier (1-5)
- Filtres par type (weapon, armor, tool, potion)
- Indicateur "craftable" (tous ingrédients dispo)
- Sélection de recette

**Estimation** : 2-3h

---

### 2.4 - Composant RecipeDetails.vue ⏳

_(Voir section détaillée dans le message précédent)_

**Features** :

- Affichage nom et description de la recette
- Liste des ingrédients avec quantités requises/possédées
- Indicateur visuel si ingrédient manquant (rouge)
- Info : Temps de crafting, XP gagnée, valeur estimée
- Outil requis (si applicable)
- Bouton "Forger" (désactivé si pas craftable)

**Estimation** : 2-3h

---

### 2.5 - Tests Phase 2 ✅

**Scénarios** :

- [ ] Sélectionner une recette → détails affichés
- [ ] Vérifier ingrédients suffisants/insuffisants (indicateur visuel)
- [ ] Démarrer crafting → matériaux consommés immédiatement
- [ ] Progression animée avec étincelles
- [ ] Crafting terminé → objet ajouté à l'inventaire avec qualité calculée
- [ ] XP gagnée et level up si applicable
- [ ] Stats de session mises à jour
- [ ] Temps de crafting ajusté selon productivité atelier
- [ ] Persistance des objets forgés dans localStorage

**Estimation Phase 2 totale** : 15-20h (2-3 jours)

---

## 📦 PHASE 3 : Système d'Inventaire Fonctionnel (2-3 jours)

_(Voir section détaillée dans le message précédent)_

**Objectif** : Connecter `/inventaire` aux stores et implémenter vente d'objets

**Tasks principales** :

- [ ] Refactorer `Inventory.vue` pour utiliser stores
- [ ] Créer `MaterialsList.vue` (affichage matériaux)
- [ ] Créer `CraftedItemsList.vue` (affichage objets forgés)
- [ ] Créer `InventoryStats.vue` (capacité, valeur totale)
- [ ] Implémenter vente d'objets forgés
- [ ] Implémenter suppression d'objets

**Estimation** : 10-15h (2-3 jours)

---

## 🏭 PHASE 4 : Atelier & Progression (3-4 jours)

_(Voir section détaillée dans le message précédent)_

**Objectif** : Connecter `/atelier` aux stores et implémenter upgrades/quêtes

**Tasks principales** :

- [ ] Créer `src/stores/workshop.js` (voir Phase 0.2)
- [ ] Refactorer `Workshop.vue` en sous-composants
- [ ] Implémenter logique d'upgrade outils (consommer écus)
- [ ] Implémenter logique d'upgrade facilities (consommer or)
- [ ] Implémenter activation/désactivation facilities
- [ ] Système de synergies visuelles
- [ ] Système de quêtes dynamiques (journalières)
- [ ] Historique des actions
- [ ] Tests complets

**Estimation** : 15-20h (3-4 jours)

---

## 🎨 PHASE 5 : Améliorations UX/UI (2-3 jours)

_(Voir section détaillée dans le message précédent)_

**Objectif** : Polir l'UX et améliorer le design

**Tasks principales** :

- [x] Système de notifications global (déjà fait en Phase 1)
- [ ] Loading states & skeleton screens
- [ ] Animations améliorées (transitions, micro-interactions)
- [ ] Responsive design (mobile, tablet)
- [ ] Accessibilité (A11y) : labels, ARIA, contraste, navigation clavier
- [ ] Dark mode (optionnel)

**Estimation** : 10-15h (2-3 jours)

---

## ⚡ PHASE 6 : Optimisations & Performance (1-2 jours)

_(Voir section détaillée dans le message précédent)_

**Objectif** : Optimiser bundle size et performances

**Tasks principales** :

- [ ] Analyse du bundle avec `vite-bundle-visualizer`
- [ ] Optimisation des images (WebP, lazy loading)
- [ ] Service Worker & PWA (cache strategy)
- [ ] SEO avancé (robots.txt, Open Graph)
- [ ] Performance monitoring (Core Web Vitals)

**Estimation** : 6-10h (1-2 jours)

---

## 🎮 PHASE 7 : Contenu & Balancing (2-3 jours)

_(Voir section détaillée dans le message précédent)_

**Objectif** : Enrichir le contenu et équilibrer l'économie

**Tasks principales** :

- [ ] Extension de `materials.js` (4 → 30 matériaux)
- [ ] Extension de `recipes.js` (0 → 40 recettes)
- [ ] Génération/téléchargement images matériaux
- [ ] Balancing économique (prix, coûts, gains XP)
- [ ] Système d'enchantements (optionnel)
- [ ] Achievements (20-30 achievements)

**Estimation** : 12-18h (2-3 jours)

---

## 🧪 PHASE 8 : Tests & Polissage (2-3 jours)

_(Voir section détaillée dans le message précédent)_

**Objectif** : Tester l'application et corriger les bugs

**Tasks principales** :

- [ ] Tests unitaires (Vitest) pour stores et composants
- [ ] Tests E2E (Playwright) pour parcours complets
- [ ] Tests manuels (checklist complète)
- [ ] Bug fixing
- [ ] Polissage final (tutoriel, tooltips, easter eggs)

**Estimation** : 12-18h (2-3 jours)

---

## 📊 RÉSUMÉ & PRIORITÉS

### ✅ Gains attendus (MVP)

**Fonctionnalités** :

- ✅ Jeu 100% jouable du début à la fin
- ✅ Système de progression complet (XP, niveaux, upgrades)
- ✅ Économie fonctionnelle (achat/vente/crafting)
- ✅ Persistance via localStorage
- ✅ 30+ matériaux, 40+ recettes
- ✅ Système de qualité procédurale
- ✅ Quêtes dynamiques
- ✅ Achievements

**Technique** :

- ✅ Architecture propre (stores Pinia)
- ✅ Code maintenable (composants splittés)
- ✅ Performances optimisées (lazy loading, PWA)
- ✅ SEO amélioré
- ✅ Tests (unitaires + E2E)

**UX/UI** :

- ✅ Responsive design
- ✅ Animations fluides
- ✅ Notifications toast
- ✅ Loading states
- ✅ Accessibilité (A11y)

---

### 🎯 Ordre d'implémentation recommandé

**MUST HAVE (MVP)** :

1. Phase 0 : Infrastructure ⚡ CRITIQUE
2. Phase 1 : Économie & Shop ⚡ CRITIQUE
3. Phase 2 : Crafting Réel ⚡ CRITIQUE
4. Phase 3 : Inventaire ⚡ HAUTE
5. Phase 4 : Atelier ⚡ HAUTE

**SHOULD HAVE** : 6. Phase 5 : UX/UI 🟡 MOYENNE

**NICE TO HAVE** : 7. Phase 6 : Optimisations 🟢 BASSE 8. Phase 7 : Contenu 🟢 BASSE 9. Phase 8 : Tests 🟡 MOYENNE

---

### ⏱️ Estimations réalistes

**Développeur solo expérimenté** : 3-4 semaines (25-30 jours ouvrés)  
**Développeur junior** : 5-6 semaines  
**Avec aide d'AI (OpenCode)** : 2-3 semaines

**Si manque de temps** :

- Phase 0-4 = **MUST HAVE** (jeu fonctionnel) → 10-15 jours
- Phase 5 = **SHOULD HAVE** (UX) → +2-3 jours
- Phase 6-8 = **NICE TO HAVE** (polish) → +3-5 jours

---

## 🚀 PROCHAINES ÉTAPES (Post-MVP)

Une fois le MVP terminé, possibilités d'extension :

**Backend & Sync** :

- Authentification Vercel KV (sync multi-device)
- Base de données PostgreSQL (Supabase)
- API REST pour sauvegarde cloud

**Social Features** :

- Leaderboard global (meilleurs forgerons)
- Système de guildes/clans
- Marketplace entre joueurs
- Défis communautaires

**Gameplay avancé** :

- Combat PvE avec objets forgés
- Donjons et boss raids
- Système de compagnons (assistants de forge)
- Events saisonniers
- Alchimie et enchantements avancés

**Monétisation** (si applicable) :

- Premium currency (cosmétiques uniquement)
- Season pass avec récompenses cosmétiques
- Skins d'atelier
- Aucun pay-to-win

---

## 📝 NOTES FINALES

**Principes de développement** :

1. **Suivre l'ordre des phases** : Ne pas sauter Phase 0 (architecture critique)
2. **Commiter fréquemment** : 1 commit par feature, pas 1 commit géant
3. **Tester au fur et à mesure** : Ne pas attendre la fin
4. **Documenter** : Commenter le code complexe
5. **Performance first** : Penser optimisation dès le début

**Stack technique finale** :

- Vue 3.5 (Options API)
- Vite 7.3
- Pinia 2.x + persistance
- Vue Router 5.x
- Tailwind CSS 4.x
- Lucide Vue Next (icons)
- localStorage (pas de backend)
- Vitest (tests unitaires)
- Playwright (tests E2E, optionnel)

**Fichiers créés dans cette roadmap** :

- 7 stores Pinia (`src/stores/*.js`)
- 30+ composants Vue splittés
- 6 fichiers de données (`src/data/*.js`)
- 1 système de migrations (`src/stores/migrations.js`)
- 30+ images de matériaux (WebP)

---

**Prêt à démarrer ?** 🔥

Cette roadmap est vivante et peut être ajustée selon vos besoins. N'hésitez pas à me demander de préciser certaines sections ou à commencer l'implémentation étape par étape !

Bon courage pour transformer EmberAnvil en chef-d'œuvre ! ⚒️✨
