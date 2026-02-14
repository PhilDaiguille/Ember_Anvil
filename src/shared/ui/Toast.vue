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
  padding: 0;
  display: flex;
  align-items: center;
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

/* Responsive */
@media (max-width: 768px) {
  .toast-container {
    left: 20px;
    right: 20px;
    max-width: none;
  }
}
</style>
