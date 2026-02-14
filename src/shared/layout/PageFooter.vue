<template>
  <footer class="page-footer" role="contentinfo">
    <div class="footer-inner max-w-6xl mx-auto px-6 py-12">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
        <!-- Brand -->
        <div class="footer-brand md:col-span-1">
          <div
            class="brand-name text-2xl font-bold text-amber-400 mb-3 font-['Caesar_Dressing']"
          >
            Ember Anvil
          </div>
          <p class="text-gray-400 text-sm leading-relaxed">
            La forge virtuelle de vos rêves. Créez, affinez et perfectionnez vos
            créations dans un univers artisanal unique.
          </p>
        </div>

        <!-- Jeu -->
        <div>
          <h3
            class="footer-heading text-xs uppercase tracking-widest text-gray-500 mb-4 font-semibold"
          >
            Le Jeu
          </h3>
          <ul class="space-y-2">
            <li>
              <router-link to="/forge" class="footer-link"> Forge </router-link>
            </li>
            <li>
              <router-link to="/marche" class="footer-link">
                Marché
              </router-link>
            </li>
            <li>
              <router-link to="/codex" class="footer-link"> Codex </router-link>
            </li>
            <li>
              <router-link to="/inventaire" class="footer-link">
                Inventaire
              </router-link>
            </li>
            <li>
              <router-link to="/atelier" class="footer-link">
                Atelier
              </router-link>
            </li>
            <li>
              <router-link to="/profil" class="footer-link">
                Profil
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Guides -->
        <div>
          <h3
            class="footer-heading text-xs uppercase tracking-widest text-gray-500 mb-4 font-semibold"
          >
            Guides
          </h3>
          <ul class="space-y-2">
            <li>
              <router-link
                to="/guides/debuter-dans-la-forge"
                class="footer-link"
              >
                Guide débutant
              </router-link>
            </li>
            <li>
              <router-link to="/guides/glossaire-forge" class="footer-link">
                Glossaire
              </router-link>
            </li>
            <li>
              <router-link
                to="/guides/meilleurs-jeux-de-forge"
                class="footer-link"
              >
                Comparatif jeux
              </router-link>
            </li>
          </ul>
        </div>

        <!-- À propos -->
        <div>
          <h3
            class="footer-heading text-xs uppercase tracking-widest text-gray-500 mb-4 font-semibold"
          >
            À Propos
          </h3>
          <ul class="space-y-2">
            <li>
              <router-link to="/changelog" class="footer-link">
                Changelog
              </router-link>
            </li>
          </ul>
        </div>
      </div>

      <div
        class="footer-bottom border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center gap-4"
      >
        <p class="text-gray-500 text-sm">
          © {{ currentYear }} Philippe DELENTE — Ember Anvil. Tous droits
          réservés.
        </p>
        <nav class="flex gap-6" aria-label="Liens légaux">
          <router-link
            to="/"
            class="text-gray-500 hover:text-gray-300 text-sm transition-colors"
          >
            Accueil
          </router-link>
          <router-link
            to="/changelog"
            class="text-gray-500 hover:text-gray-300 text-sm transition-colors"
          >
            Changelog
          </router-link>
        </nav>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "PageFooter",
  computed: {
    currentYear() {
      return new Date().getFullYear();
    },
  },
};
</script>

<style scoped>
.page-footer {
  background: linear-gradient(to bottom, #0f0d0a 0%, #080604 100%);
  border-top: 1px solid rgba(255, 255, 255, 0.07);
}

.footer-inner {
  /* layout handled by tailwind */
}

.footer-link {
  color: #9ca3af;
  font-size: 0.875rem;
  transition: color 0.2s ease;
  text-decoration: none;
}

.footer-link:hover {
  color: #fbbf24;
}
</style>
