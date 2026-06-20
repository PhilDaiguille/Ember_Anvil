<script>
import { Inbox } from "@lucide/vue";

// État vide réutilisable : icône + titre + texte + CTA optionnel.
export default {
  name: "EmptyState",
  components: { Inbox },
  props: {
    titre: { type: String, required: true },
    texte: { type: String, default: "" },
    // Libellé du bouton d'action. Si absent, aucun CTA.
    ctaLabel: { type: String, default: "" },
  },
  emits: ["cta"],
};
</script>

<template>
  <div class="empty-state" role="status">
    <slot name="icon">
      <Inbox class="empty-icon" :size="48" :stroke-width="1.5" />
    </slot>
    <h3 class="empty-title">{{ titre }}</h3>
    <p v-if="texte" class="empty-text">{{ texte }}</p>
    <button v-if="ctaLabel" class="empty-cta" @click="$emit('cta')">
      {{ ctaLabel }}
    </button>
  </div>
</template>

<style scoped>
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
  padding: 3rem 1.5rem;
  text-align: center;
  color: var(--dun);
}

.empty-icon {
  color: rgba(161, 152, 130, 0.5);
}

.empty-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: var(--dun);
  margin: 0;
}

.empty-text {
  font-size: 0.95rem;
  color: rgba(161, 152, 130, 0.75);
  margin: 0;
  max-width: 40ch;
}

.empty-cta {
  margin-top: 0.5rem;
  padding: 0.75rem 1.75rem;
  font-weight: 700;
  color: white;
  background: linear-gradient(135deg, var(--sea-green), var(--viridian));
  border: none;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: transform var(--t-fast) ease;
}

.empty-cta:hover {
  transform: translateY(-2px);
}
</style>
