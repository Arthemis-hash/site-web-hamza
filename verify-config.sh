#!/bin/bash

# Script de vérification de la configuration - Manos Expertas
# Ce script vérifie que toutes les configurations sont en place

echo "🔍 Vérification de la configuration Manos Expertas"
echo "=================================================="
echo ""

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Compteurs
TOTAL=0
PASSED=0
FAILED=0

# Fonction de vérification
check() {
    TOTAL=$((TOTAL + 1))
    if [ $1 -eq 0 ]; then
        echo -e "${GREEN}✅ $2${NC}"
        PASSED=$((PASSED + 1))
    else
        echo -e "${RED}❌ $2${NC}"
        FAILED=$((FAILED + 1))
        if [ ! -z "$3" ]; then
            echo -e "${YELLOW}   → $3${NC}"
        fi
    fi
}

# Fonction de warning
warn() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

echo "📁 Vérification des fichiers..."
echo "--------------------------------"

# Vérifier l'existence des fichiers
[ -f ".env" ]
check $? ".env existe" "Créez le fichier .env à partir de .env.example"

[ -f ".env.example" ]
check $? ".env.example existe"

[ -f "src/services/gemmaService.js" ]
check $? "Service Gemma créé"

[ -f "src/services/emailService.js" ]
check $? "Service Email créé"

[ -f "src/services/youtubeService.js" ]
check $? "Service YouTube créé"

[ -f "src/components/ui/OpenStreetMap.jsx" ]
check $? "Composant OpenStreetMap créé"

[ -f "src/components/ui/YouTubeVideo.jsx" ]
check $? "Composant YouTubeVideo créé"

[ -f "server/emailServer.js" ]
check $? "Serveur Email créé"

[ -f "docs/FINAL_SUMMARY.md" ]
check $? "Documentation finale créée"

echo ""
echo "🔧 Vérification des variables d'environnement..."
echo "------------------------------------------------"

if [ -f ".env" ]; then
    # Vérifier les variables critiques
    grep -q "VITE_CHATBOT_API_URL=" .env
    check $? "VITE_CHATBOT_API_URL configuré"

    grep -q "VITE_OLLAMA_MODEL=" .env
    check $? "VITE_OLLAMA_MODEL configuré"

    grep -q "VITE_DEFAULT_LOCATION_NAME=" .env
    check $? "VITE_DEFAULT_LOCATION_NAME configuré"

    grep -q "VITE_DEFAULT_LATITUDE=" .env
    check $? "VITE_DEFAULT_LATITUDE configuré"

    grep -q "VITE_YOUTUBE_API_KEY=" .env
    check $? "VITE_YOUTUBE_API_KEY configuré"

    grep -q "SMTP_HOST=" .env
    check $? "SMTP_HOST configuré"

    grep -q "SMTP_USER=" .env
    check $? "SMTP_USER configuré"

    grep -q "VITE_DEFAULT_CONTACT_EMAIL=" .env
    check $? "VITE_DEFAULT_CONTACT_EMAIL configuré"

    # Vérifier qu'il n'y a plus de Google Maps
    if grep -q "GOOGLE_MAPS" .env; then
        warn "Référence à Google Maps trouvée dans .env (devrait être supprimée)"
        FAILED=$((FAILED + 1))
    else
        check 0 "Pas de référence à Google Maps"
    fi
else
    warn "Fichier .env non trouvé, impossible de vérifier les variables"
fi

echo ""
echo "📦 Vérification des dépendances..."
echo "-----------------------------------"

if [ -f "package.json" ]; then
    echo "Frontend: package.json trouvé"
    
    # Vérifier si node_modules existe
    if [ -d "node_modules" ]; then
        check 0 "node_modules installé"
    else
        check 1 "node_modules installé" "Exécutez: npm install"
    fi
else
    check 1 "package.json trouvé"
fi

if [ -f "server/package.json" ]; then
    echo "Backend: server/package.json trouvé"
    
    # Vérifier si node_modules existe
    if [ -d "server/node_modules" ]; then
        check 0 "server/node_modules installé"
    else
        check 1 "server/node_modules installé" "Exécutez: cd server && npm install"
    fi
else
    warn "Backend: server/package.json non trouvé (optionnel)"
fi

echo ""
echo "📊 Résumé de la vérification"
echo "============================"
echo -e "Total de vérifications: ${TOTAL}"
echo -e "${GREEN}✅ Réussies: ${PASSED}${NC}"
echo -e "${RED}❌ Échouées: ${FAILED}${NC}"
echo ""

if [ $FAILED -eq 0 ]; then
    echo -e "${GREEN}🎉 Toutes les vérifications sont passées !${NC}"
    echo ""
    echo "🚀 Prochaines étapes:"
    echo "  1. Remplacez VITE_YOUTUBE_API_KEY par votre vraie clé"
    echo "  2. Démarrez le frontend: npm run dev"
    echo "  3. Démarrez le backend (optionnel): cd server && npm start"
    echo "  4. Testez le formulaire de contact"
    echo "  5. Vérifiez l'affichage des vidéos YouTube"
    echo ""
    echo "📚 Documentation complète: docs/FINAL_SUMMARY.md"
    exit 0
else
    echo -e "${YELLOW}⚠️  Certaines vérifications ont échoué${NC}"
    echo ""
    echo "🔧 Actions recommandées:"
    echo "  1. Vérifiez les messages d'erreur ci-dessus"
    echo "  2. Consultez la documentation: docs/FINAL_SUMMARY.md"
    echo "  3. Corrigez les problèmes et relancez ce script"
    echo ""
    exit 1
fi
