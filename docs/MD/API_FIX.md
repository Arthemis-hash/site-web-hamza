# 🔧 Configuration API Ollama - RÉSOLU

## ✅ Configuration correcte

Votre API Ollama fonctionne via un proxy/gateway. Voici la configuration correcte :

### Variables d'environnement

```bash
# URL complète avec /api/chat
VITE_CHATBOT_API_URL=https://ai.jobsacademie.tech/api/chat

# Modèle exact : gemma:2b (PAS gemma2:2b)
VITE_OLLAMA_MODEL=gemma:2b
```

## 📡 Format de l'API

### Requête

```json
{
  "model": "gemma:2b",
  "messages": [
    {
      "role": "user",
      "content": "Votre message ici"
    }
  ],
  "stream": false,
  "options": {
    "temperature": 0.7,
    "num_predict": 500
  }
}
```

### Réponse

```json
{
  "model": "gemma:2b",
  "created_at": "2025-12-03T...",
  "message": {
    "role": "assistant",
    "content": "Réponse de Gemma ici"
  },
  "done": true,
  "done_reason": "stop",
  "total_duration": 1923507084,
  "prompt_eval_count": 28,
  "eval_count": 18
}
```

## 🧪 Tests effectués

✅ Liste des modèles : `/api/tags` → `gemma:2b` disponible
✅ Message simple : Fonctionne en espagnol
✅ Questions complexes : Réponses pertinentes
✅ Contexte de conversation : Gère l'historique
✅ Temps de réponse : ~3 secondes (acceptable)

## 🔄 Modifications apportées

### 1. Service Gemma (`src/services/gemmaService.js`)

**Avant** :
```javascript
const payload = {
  message: message,
  model: this.model,
  sessionId: this.sessionId
};
```

**Après** :
```javascript
const payload = {
  model: this.model,
  messages: [
    {
      role: 'user',
      content: message
    }
  ],
  stream: false,
  options: {
    temperature: 0.7,
    num_predict: this.maxTokens
  }
};
```

### 2. Validation de réponse

**Avant** :
```javascript
const message = response.message || response.response || response.text;
```

**Après** :
```javascript
// Gère le format Ollama : response.message.content
if (response.message && response.message.content) {
  message = response.message.content;
}
```

### 3. Gestion du contexte

Le service envoie maintenant l'historique des messages au format Ollama :

```javascript
messages: [
  { role: 'user', content: 'Message 1' },
  { role: 'assistant', content: 'Réponse 1' },
  { role: 'user', content: 'Message 2' }
]
```

## 🚀 Pour tester

### 1. Redémarrez le serveur de développement

```bash
# Arrêtez le serveur actuel (Ctrl+C)
# Puis relancez
npm run dev
```

### 2. Testez dans l'interface

1. Ouvrez http://localhost:5173
2. Cliquez sur le chatbot (icône en bas à droite)
3. Tapez : "What is the capital of Roma?"
4. Vous devriez obtenir une réponse de Gemma !

### 3. Tests en ligne de commande

```bash
# Test rapide
./test-api.sh

# Test manuel
curl -X POST https://ai.jobsacademie.tech/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gemma:2b",
    "messages": [{"role": "user", "content": "Hola"}],
    "stream": false
  }'
```

### 4. Test dans la console du navigateur

```javascript
// Ouvrez la console (F12)
await gemmaService.sendMessage('What is the capital of Roma?');

// Devrait retourner
{
  message: "La capital de Roma es Roma. Es la ciudad más grande...",
  fromCache: false,
  sessionId: "...",
  timestamp: ...
}
```

## 🔍 Débogage

Si le chatbot ne fonctionne toujours pas :

### 1. Vérifiez les variables d'environnement

```bash
# Dans le terminal
echo $VITE_CHATBOT_API_URL
# Devrait afficher: https://ai.jobsacademie.tech/api/chat

echo $VITE_OLLAMA_MODEL
# Devrait afficher: gemma:2b
```

### 2. Vérifiez la console du navigateur (F12)

Regardez les erreurs dans :
- Console
- Network tab (onglet Réseau)

### 3. Testez directement l'API

```bash
curl -X POST https://ai.jobsacademie.tech/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "model": "gemma:2b",
    "messages": [{"role": "user", "content": "test"}],
    "stream": false
  }' | jq '.message.content'
```

## 📊 Performance

- **Temps de réponse moyen** : 3 secondes
- **Disponibilité** : ✅ En ligne
- **Latence** : Acceptable pour un chatbot
- **Qualité des réponses** : Bonne (en espagnol)

## 🎯 Prochaines optimisations possibles

1. **Cache côté serveur** : Réduire la latence
2. **Streaming** : Afficher la réponse au fur et à mesure
3. **Pré-chargement** : Charger le modèle à l'avance
4. **CDN** : Utiliser un CDN pour réduire la latence réseau

## ✅ Checklist de vérification

- [x] URL API correcte : `https://ai.jobsacademie.tech/api/chat`
- [x] Modèle correct : `gemma:2b`
- [x] Format de requête Ollama implémenté
- [x] Format de réponse Ollama géré
- [x] Tests API réussis
- [ ] Serveur dev redémarré
- [ ] Tests dans l'interface web
- [ ] Vérification console navigateur

## 📞 Support

Si vous avez toujours des problèmes :

1. Vérifiez que le serveur dev est redémarré
2. Videz le cache du navigateur (Cmd+Shift+R sur Mac)
3. Vérifiez les logs dans la console F12
4. Testez l'API directement avec curl

---

**Date de résolution** : 3 décembre 2024  
**Status** : ✅ RÉSOLU - API fonctionnelle  
**Prochaine étape** : Redémarrer le serveur et tester !
