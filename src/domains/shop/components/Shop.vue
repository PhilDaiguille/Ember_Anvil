<script>
import { mapState, mapActions } from "pinia";
import ShopCardVue from "@/domains/shop/components/ShopCard.vue";
import { Wallet, Search as SearchIcon, Pickaxe, TreePine, Mountain, Gem, Sparkles } from "@lucide/vue";
import { usePlayerStore } from "@/stores/player";
import { useInventoryStore } from "@/stores/inventory";
import { useNotificationsStore } from "@/stores/notifications";
import { useGameStore } from "@/stores/game";
import { useCodexStore } from "@/stores/codex";
import { MATERIALS_ARRAY } from "@/data/materials";
import { filterMaterials } from "@/shared/utils/filterHelpers";
import { getPrixAchat, getPrixVente, getTendance } from "@/shared/utils/market";

export default {
  name: "ShopPage",
  components: { ShopCardVue, Wallet, SearchIcon, Pickaxe, TreePine, Mountain, Gem, Sparkles },
  data() {
    return {
      selectedRarity: "all",
      sortBy: "defaut",
      searchQuery: "",
      raretes: [
        { id: "all", label: "Toutes" },
        { id: "common", label: "Commun" },
        { id: "uncommon", label: "Peu commun" },
        { id: "rare", label: "Rare" },
        { id: "epic", label: "Épique" },
        { id: "legendary", label: "Légendaire" },
      ],
      tris: [
        { id: "defaut", label: "Par défaut" },
        { id: "prix-asc", label: "Prix d'achat ↑" },
        { id: "prix-desc", label: "Prix d'achat ↓" },
        { id: "nom", label: "Nom (A-Z)" },
      ],
      // Catégories (type) affichées dans cet ordre, avec libellé + icône
      categories: [
        { id: "metal", label: "Métaux", icon: "Pickaxe" },
        { id: "bois", label: "Bois", icon: "TreePine" },
        { id: "pierre", label: "Pierres", icon: "Mountain" },
        { id: "gemme", label: "Gemmes", icon: "Gem" },
        { id: "special", label: "Spéciaux", icon: "Sparkles" },
      ],
    };
  },
  computed: {
    ...mapState(usePlayerStore, ["ecus"]),
    filteredMaterials() {
      const liste = filterMaterials(MATERIALS_ARRAY, this.selectedRarity, this.searchQuery).map(
        (m) => ({
          ...m,
          prixAchat: getPrixAchat(m),
          prixVente: getPrixVente(m),
          tendance: getTendance(m.id),
        }),
      );

      if (this.sortBy === "prix-asc") return liste.toSorted((a, b) => a.prixAchat - b.prixAchat);
      if (this.sortBy === "prix-desc") return liste.toSorted((a, b) => b.prixAchat - a.prixAchat);
      if (this.sortBy === "nom") return liste.toSorted((a, b) => a.nom.localeCompare(b.nom));
      return liste;
    },

    // Matériaux filtrés regroupés par catégorie (type), groupes vides exclus
    groupedMaterials() {
      return this.categories
        .map((cat) => ({
          ...cat,
          materials: this.filteredMaterials.filter((m) => m.type === cat.id),
        }))
        .filter((g) => g.materials.length > 0);
    },
  },
  methods: {
    ...mapActions(usePlayerStore, ["retirerEcus", "ajouterEcus"]),
    ...mapActions(useInventoryStore, ["ajouterMaterial", "retirerMaterial", "hasEnough"]),
    ...mapActions(useNotificationsStore, ["ajouterNotification"]),
    acheterMaterial(material, quantite = 1) {
      const cout = material.prixAchat * quantite;
      const playerStore = usePlayerStore();
      const codexStore = useCodexStore();

      if (!playerStore.peutAcheter(cout)) {
        this.ajouterNotification({
          type: "error",
          message: `Fonds insuffisants ! Il vous manque ${cout - this.ecus} écus.`,
        });
        return;
      }

      this.retirerEcus(cout);
      this.ajouterMaterial(material.id, quantite);

      const wasNew = codexStore.autoDiscoverFromPurchase(material.id);
      if (wasNew) {
        this.ajouterNotification({
          type: "info",
          message: `📖 Nouveau matériau découvert dans le Codex : ${material.nom} !`,
        });
      }

      this.ajouterNotification({
        type: "success",
        message: `${material.nom} ×${quantite} acheté pour ${cout} écus !`,
      });
      useGameStore().trackAchat();
    },
    vendreMaterial(material, quantite = 1) {
      const inventoryStore = useInventoryStore();

      if (quantite < 1 || !inventoryStore.hasEnough(material.id, quantite)) {
        this.ajouterNotification({
          type: "error",
          message: `Vous n'avez pas assez de ${material.nom} à vendre.`,
        });
        return;
      }

      const gain = material.prixVente * quantite;
      this.retirerMaterial(material.id, quantite);
      this.ajouterEcus(gain);

      this.ajouterNotification({
        type: "success",
        message: `${material.nom} ×${quantite} vendu pour ${gain} écus !`,
      });
      useGameStore().trackVente(gain);
    },
  },
};
</script>

<template>
  <main class="marketplace" id="main-content" aria-label="Marché de matériaux">
    <div class="marketplace-container">
      <!-- Header compact -->
      <header class="marketplace-header">
        <h1 class="marketplace-title">Le Comptoir</h1>
        <div class="wallet">
          <Wallet :size="22" :stroke-width="2" />
          <span class="wallet-amount">{{ ecus.toLocaleString() }} écus</span>
        </div>
      </header>

      <!-- Contrôles -->
      <div class="controls">
        <div class="search-box">
          <SearchIcon :size="18" :stroke-width="2" class="search-icon" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Rechercher un matériau..."
            class="search-input"
            aria-label="Rechercher un matériau"
          />
        </div>
        <select v-model="selectedRarity" class="control-select" aria-label="Filtrer par rareté">
          <option v-for="r in raretes" :key="r.id" :value="r.id">{{ r.label }}</option>
        </select>
        <select v-model="sortBy" class="control-select" aria-label="Trier">
          <option v-for="t in tris" :key="t.id" :value="t.id">{{ t.label }}</option>
        </select>
      </div>

      <!-- Groupes par catégorie -->
      <template v-if="groupedMaterials.length > 0">
        <section v-for="groupe in groupedMaterials" :key="groupe.id" class="category-section">
          <h2 class="category-title">
            <component :is="groupe.icon" :size="24" :stroke-width="2" />
            {{ groupe.label }}
            <span class="category-count">{{ groupe.materials.length }}</span>
          </h2>
          <div class="marketplace-grid">
            <ShopCardVue
              v-for="material in groupe.materials"
              :key="material.id"
              :material="material"
              @acheter="acheterMaterial"
              @vendre="vendreMaterial"
            />
          </div>
        </section>
      </template>
      <p v-else class="no-results">Aucun matériau ne correspond à votre recherche.</p>
    </div>
  </main>
</template>

<style scoped>
.marketplace {
  min-height: 95dvh;
  background: linear-gradient(to bottom, #0a0e0d 0%, #121a16 40%, #0a0e0d 100%);
}

.marketplace-container {
  max-width: 1600px;
  margin: 0 auto;
  padding: 2rem;
}

.marketplace-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  flex-wrap: wrap;
  margin-bottom: 1.5rem;
}

.marketplace-title {
  font-size: clamp(1.75rem, 4vw, 2.5rem);
  font-weight: 700;
  margin: 0;
  font-family: "Georgia", serif;
  background: linear-gradient(135deg, #d4af37, #f4e5c3, #d4af37);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.wallet {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.25rem;
  background: rgba(212, 175, 55, 0.1);
  border: 1px solid rgba(212, 175, 55, 0.3);
  color: #d4af37;
}

.wallet-amount {
  font-weight: 800;
  font-family: "Georgia", serif;
}

.controls {
  display: flex;
  gap: 0.75rem;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}

.search-box {
  position: relative;
  flex: 1;
  min-width: 220px;
}

.search-icon {
  position: absolute;
  left: 0.85rem;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(161, 152, 130, 0.6);
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 0.7rem 1rem 0.7rem 2.6rem;
  background: rgba(25, 25, 25, 0.6);
  border: 1px solid rgba(161, 152, 130, 0.2);
  color: white;
  font-size: 0.95rem;
}

.search-input:focus {
  outline: none;
  border-color: var(--sea-green);
}

.control-select {
  padding: 0.7rem 1rem;
  background: rgba(25, 25, 25, 0.6);
  border: 1px solid rgba(161, 152, 130, 0.2);
  color: white;
  font-size: 0.9rem;
  cursor: pointer;
}

.control-select:focus {
  outline: none;
  border-color: var(--sea-green);
}

.category-section {
  margin-bottom: 2.5rem;
}

.category-title {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--dun);
  font-family: "Georgia", serif;
  margin: 0 0 1.25rem 0;
  padding-bottom: 0.6rem;
  border-bottom: 1px solid rgba(161, 152, 130, 0.2);
}

.category-count {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 1.6rem;
  height: 1.6rem;
  padding: 0 0.4rem;
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--dun);
  background: rgba(161, 152, 130, 0.15);
  border-radius: 999px;
}

.marketplace-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  gap: 1.5rem;
}

.no-results {
  text-align: center;
  color: var(--dun);
  padding: 3rem 1rem;
}
</style>
