/**
 * Utilitaires pour le préchargement des assets critiques
 */

/**
 * Précharge une image
 * @param {string} src - URL de l'image
 * @returns {Promise<void>}
 */
export function preloadImage(src) {
  return new Promise((resolve, reject) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "image";
    link.href = src;
    link.onload = () => resolve();
    link.onerror = () => reject(new Error(`Failed to preload image: ${src}`));
    document.head.appendChild(link);
  });
}

/**
 * Précharge plusieurs images
 * @param {string[]} sources - Array d'URLs d'images
 * @returns {Promise<void[]>}
 */
export function preloadImages(sources) {
  return Promise.all(sources.map((src) => preloadImage(src)));
}

/**
 * Précharge un fichier CSS
 * @param {string} href - URL du fichier CSS
 * @returns {Promise<void>}
 */
export function preloadCSS(href) {
  return new Promise((resolve, reject) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "style";
    link.href = href;
    link.onload = () => resolve();
    link.onerror = () => reject(new Error(`Failed to preload CSS: ${href}`));
    document.head.appendChild(link);
  });
}

/**
 * Précharge une police de caractères
 * @param {string} href - URL de la police
 * @param {string} type - Type MIME de la police (ex: 'font/woff2')
 * @returns {Promise<void>}
 */
export function preloadFont(href, type = "font/woff2") {
  return new Promise((resolve, reject) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.as = "font";
    link.type = type;
    link.href = href;
    link.crossOrigin = "anonymous";
    link.onload = () => resolve();
    link.onerror = () => reject(new Error(`Failed to preload font: ${href}`));
    document.head.appendChild(link);
  });
}

/**
 * Précharge un module JavaScript
 * @param {string} href - URL du module
 * @returns {Promise<void>}
 */
export function preloadModule(href) {
  return new Promise((resolve, reject) => {
    const link = document.createElement("link");
    link.rel = "modulepreload";
    link.href = href;
    link.onload = () => resolve();
    link.onerror = () => reject(new Error(`Failed to preload module: ${href}`));
    document.head.appendChild(link);
  });
}

/**
 * Crée un observer pour lazy load des composants
 * @param {Function} callback - Fonction à appeler quand l'élément est visible
 * @param {Object} options - Options pour l'IntersectionObserver
 * @returns {IntersectionObserver}
 */
export function createLazyObserver(callback, options = { rootMargin: "50px" }) {
  if (!("IntersectionObserver" in window)) {
    // Fallback pour les navigateurs qui ne supportent pas IntersectionObserver
    callback();
    return null;
  }

  return new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        callback(entry);
      }
    });
  }, options);
}
