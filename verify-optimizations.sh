#!/bin/bash

# Script de vérification des optimisations EmberAnvil
# Usage: ./verify-optimizations.sh

set -e

echo "🔍 Vérification des optimisations EmberAnvil..."
echo ""

# Couleurs
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Vérifier que nous sommes dans le bon répertoire
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Erreur: package.json non trouvé${NC}"
    echo "Exécutez ce script depuis la racine du projet"
    exit 1
fi

echo "📦 1. Vérification de la structure des fichiers..."

# Vérifier les nouveaux fichiers
files=(
    "src/shared/ui/OptimizedImage.vue"
    "src/shared/utils/assetLoader.js"
    "src/shared/utils/serviceWorkerRegistration.js"
    "public/service-worker.js"
    "vercel.json"
    "docs/PERFORMANCE.md"
    "docs/OPTIMIZATION_GUIDE.md"
    "docs/OPTIMIZATION_SUMMARY.md"
)

for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo -e "${GREEN}✅${NC} $file"
    else
        echo -e "${RED}❌${NC} $file manquant"
    fi
done

echo ""
echo "🏗️  2. Build du projet..."

# Build le projet
if npm run build > /tmp/build.log 2>&1; then
    echo -e "${GREEN}✅ Build réussi${NC}"
else
    echo -e "${RED}❌ Build échoué${NC}"
    cat /tmp/build.log
    exit 1
fi

echo ""
echo "📊 3. Analyse des bundles..."

# Vérifier la présence des chunks
if [ -d "dist/assets" ]; then
    echo -e "${GREEN}✅${NC} Répertoire dist/assets créé"
    
    # Compter les fichiers JS
    js_count=$(find dist/assets -name "*.js" | wc -l)
    echo "   Fichiers JS: $js_count"
    
    # Compter les fichiers compressés
    gz_count=$(find dist/assets -name "*.gz" | wc -l)
    br_count=$(find dist/assets -name "*.br" | wc -l)
    zst_count=$(find dist/assets -name "*.zst" | wc -l)
    
    echo "   Fichiers .gz: $gz_count"
    echo "   Fichiers .br: $br_count"
    echo "   Fichiers .zst: $zst_count"
    
    # Vérifier la taille du bundle principal
    if [ -f "dist/assets/vendor-"*.js ]; then
        vendor_size=$(ls -lh dist/assets/vendor-*.js | awk '{print $5}')
        vendor_gz_size=$(ls -lh dist/assets/vendor-*.js.gz | awk '{print $5}')
        echo -e "   ${GREEN}Vendor bundle:${NC} $vendor_size (gzipped: $vendor_gz_size)"
    fi
    
    if [ -f "dist/assets/index-"*.js ]; then
        index_size=$(ls -lh dist/assets/index-*.js | awk '{print $5}')
        index_gz_size=$(ls -lh dist/assets/index-*.js.gz | awk '{print $5}')
        echo -e "   ${GREEN}Main bundle:${NC} $index_size (gzipped: $index_gz_size)"
    fi
else
    echo -e "${RED}❌${NC} Répertoire dist/assets non trouvé"
fi

echo ""
echo "🔧 4. Vérification de la configuration Vite..."

# Vérifier les mots-clés importants dans vite.config.js
if grep -q "warmup" vite.config.js; then
    echo -e "${GREEN}✅${NC} Server warmup configuré"
else
    echo -e "${YELLOW}⚠️${NC}  Server warmup non trouvé"
fi

if grep -q "holdUntilCrawlEnd" vite.config.js; then
    echo -e "${GREEN}✅${NC} optimizeDeps configuré"
else
    echo -e "${YELLOW}⚠️${NC}  optimizeDeps non trouvé"
fi

if grep -q "manualChunks" vite.config.js; then
    echo -e "${GREEN}✅${NC} Code splitting manuel configuré"
else
    echo -e "${YELLOW}⚠️${NC}  Code splitting manuel non trouvé"
fi

echo ""
echo "🛣️  5. Vérification du routing..."

if grep -q "() => import" src/infrastructure/router/index.js; then
    echo -e "${GREEN}✅${NC} Lazy loading des routes configuré"
    lazy_routes=$(grep -c "() => import" src/infrastructure/router/index.js)
    echo "   Routes lazy loaded: $lazy_routes"
else
    echo -e "${YELLOW}⚠️${NC}  Lazy loading non trouvé"
fi

if grep -q "scrollBehavior" src/infrastructure/router/index.js; then
    echo -e "${GREEN}✅${NC} Scroll behavior configuré"
else
    echo -e "${YELLOW}⚠️${NC}  Scroll behavior non trouvé"
fi

echo ""
echo "🔒 6. Vérification du service worker..."

if [ -f "public/service-worker.js" ]; then
    echo -e "${GREEN}✅${NC} Service worker présent"
    
    if grep -q "CACHE_VERSION" public/service-worker.js; then
        echo -e "${GREEN}✅${NC} Cache versioning configuré"
    fi
    
    if grep -q "install" public/service-worker.js; then
        echo -e "${GREEN}✅${NC} Install event handler présent"
    fi
    
    if grep -q "fetch" public/service-worker.js; then
        echo -e "${GREEN}✅${NC} Fetch event handler présent"
    fi
else
    echo -e "${RED}❌${NC} Service worker manquant"
fi

if grep -q "registerServiceWorker" src/main.js; then
    echo -e "${GREEN}✅${NC} Service worker registration dans main.js"
else
    echo -e "${YELLOW}⚠️${NC}  Service worker registration non trouvée"
fi

echo ""
echo "🌐 7. Vérification de vercel.json..."

if [ -f "vercel.json" ]; then
    echo -e "${GREEN}✅${NC} vercel.json présent"
    
    if grep -q "Cache-Control" vercel.json; then
        echo -e "${GREEN}✅${NC} Headers de cache configurés"
    fi
    
    if grep -q "X-Content-Type-Options" vercel.json; then
        echo -e "${GREEN}✅${NC} Headers de sécurité configurés"
    fi
    
    if grep -q "rewrites" vercel.json; then
        echo -e "${GREEN}✅${NC} Rewrites SPA configurés"
    fi
else
    echo -e "${YELLOW}⚠️${NC}  vercel.json non trouvé"
fi

echo ""
echo "📄 8. Vérification de la documentation..."

docs=(
    "docs/PERFORMANCE.md"
    "docs/OPTIMIZATION_GUIDE.md"
    "docs/OPTIMIZATION_SUMMARY.md"
)

for doc in "${docs[@]}"; do
    if [ -f "$doc" ]; then
        echo -e "${GREEN}✅${NC} $doc"
    else
        echo -e "${YELLOW}⚠️${NC}  $doc manquant"
    fi
done

echo ""
echo "✨ Vérification terminée!"
echo ""
echo "📊 Résumé:"
echo "   - Fichiers optimisés: ${GREEN}$(find dist/assets -name "*.js" -o -name "*.css" | wc -l)${NC}"
echo "   - Fichiers compressés: ${GREEN}$(find dist -name "*.gz" -o -name "*.br" -o -name "*.zst" | wc -l)${NC}"
echo "   - Taille totale dist/: $(du -sh dist | cut -f1)"
echo ""
echo "🚀 Pour tester:"
echo "   npm run preview"
echo ""
echo "🔍 Pour auditer:"
echo "   1. Ouvrir http://localhost:4173/"
echo "   2. Chrome DevTools > Lighthouse"
echo "   3. Lancer un audit Performance"
echo ""
