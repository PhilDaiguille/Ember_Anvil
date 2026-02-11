/**
 * Enregistre le service worker pour le PWA
 */

export function registerServiceWorker() {
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("/service-worker.js")
        .then((registration) => {
          console.log(
            "[SW] Service Worker enregistré avec succès:",
            registration.scope,
          );

          // Vérifier les mises à jour toutes les heures
          setInterval(
            () => {
              registration.update();
            },
            60 * 60 * 1000,
          );

          // Gérer les mises à jour du service worker
          registration.addEventListener("updatefound", () => {
            const newWorker = registration.installing;

            newWorker.addEventListener("statechange", () => {
              if (
                newWorker.state === "installed" &&
                navigator.serviceWorker.controller
              ) {
                // Nouvelle version disponible
                console.log("[SW] Nouvelle version disponible");

                // Optionnel: Afficher une notification à l'utilisateur
                if (
                  confirm("Une nouvelle version est disponible. Recharger ?")
                ) {
                  newWorker.postMessage({ type: "SKIP_WAITING" });
                  window.location.reload();
                }
              }
            });
          });
        })
        .catch((error) => {
          console.error("[SW] Erreur lors de l'enregistrement:", error);
        });

      // Recharger la page quand un nouveau service worker prend le contrôle
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        window.location.reload();
      });
    });
  }
}

/**
 * Désinstalle le service worker (utile pour le développement)
 */
export function unregisterServiceWorker() {
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
      registration.unregister().then(() => {
        console.log("[SW] Service Worker désinstallé");
      });
    });
  }
}

/**
 * Vide tous les caches
 */
export function clearAllCaches() {
  if ("caches" in window) {
    caches.keys().then((names) => {
      names.forEach((name) => {
        caches.delete(name);
      });
      console.log("[SW] Tous les caches ont été vidés");
    });
  }
}
