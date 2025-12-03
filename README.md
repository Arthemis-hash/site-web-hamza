# 🏠 Manos Expertas - Plateforme de Services Professionnels

Application web moderne pour connecter les clients avec des professionnels de confiance en Espagne.

## ✨ Fonctionnalités

- 🤖 **Chatbot IA sécurisé** avec Gemma/Ollama
- 🔒 **10 couches de sécurité** contre les cyberattaques
- 📱 **Design responsive** et moderne
- ⚡ **Performance optimisée** avec cache intelligent
- 🌐 **Multilingue** (ES/EN)
- 📍 **Géolocalisation** des professionnels
- 💳 **Réservation et paiement** intégrés

## 🚀 Démarrage rapide

```bash
# Installation
npm install

# Configuration
cp .env.example .env
# Éditez .env avec vos clés API

# Développement
npm run dev

# Production
npm run build
npm run preview
```

## 🔐 Sécurité

Le projet implémente des mesures de sécurité avancées :

- ✅ Protection XSS (Cross-Site Scripting)
- ✅ Protection SQL/NoSQL Injection
- ✅ Rate Limiting (10 req/min)
- ✅ Input Sanitization
- ✅ CSRF Protection
- ✅ Session Management
- ✅ Request Queue
- ✅ Cache sécurisé
- ✅ Timeout Protection
- ✅ Response Validation

📖 **Documentation complète** : [INTEGRATION_GEMMA.md](./INTEGRATION_GEMMA.md)

## 📚 Documentation

- 🔒 [Guide de sécurité](./SECURITY.md)
- 🤖 [Service Gemma API](./docs/GEMMA_SERVICE.md)
- 🚀 [Intégration complète](./INTEGRATION_GEMMA.md)

## 🛠️ Technologies

- **Frontend** : React 18 + Vite
- **Styling** : TailwindCSS
- **IA** : Gemma 2 via Ollama
- **Maps** : Google Maps API
- **Icons** : Lucide React

## 📦 Structure

```
src/
├── components/       # Composants React
│   ├── auth/        # Authentification
│   ├── booking/     # Réservations
│   ├── home/        # Page d'accueil + Chatbot
│   └── ui/          # Composants UI réutilisables
├── services/        # Services API (Gemma, etc.)
├── context/         # Context API
├── hooks/           # Hooks personnalisés
├── pages/           # Pages de l'application
└── tests/           # Tests de sécurité
```

## 🧪 Tests

```bash
# Lancer les tests de sécurité
npm run test

# Ou dans la console du navigateur
import { runAllSecurityTests } from './src/tests/gemmaServiceSecurity.test.js';
await runAllSecurityTests();
```

## 🌍 Variables d'environnement

```bash
# API Chatbot
VITE_CHATBOT_API_URL=http://ai.jobsacademie.tech/

# Configuration Gemma/Ollama
VITE_OLLAMA_MODEL=gemma2:2b
VITE_OLLAMA_MAX_TOKENS=500
VITE_OLLAMA_RATE_LIMIT=10
VITE_OLLAMA_TIMEOUT=30000

# Google Maps
VITE_GOOGLE_MAPS_API_KEY=your_key_here

# Réseaux sociaux
VITE_LINKEDIN_URL=https://linkedin.com/company/...
VITE_INSTAGRAM_URL=https://instagram.com/...
VITE_WHATSAPP_BUSINESS=+34900123456
```

## 📈 Performance

- ⚡ Cache intelligent avec TTL
- 🚀 Lazy loading des composants
- 📦 Code splitting automatique
- 🎯 Optimisation des images
- 💾 Service Worker (PWA ready)

## 🤝 Contribution

Les contributions sont les bienvenues ! Consultez [CONTRIBUTING.md](./CONTRIBUTING.md) pour les guidelines.

## 📄 Licence

MIT © 2024 Manos Expertas

## 📞 Support

- 📧 Email : info@manosexpertas.es
- 💬 Support : [Contactez-nous](https://manosexpertas.es/contact)
- 🐛 Issues : [GitHub Issues](https://github.com/your-repo/issues)
