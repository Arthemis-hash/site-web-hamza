# 🤖 Service Gemma API - Guide d'intégration

## Installation

Le service est déjà intégré dans votre projet. Il se trouve dans `/src/services/gemmaService.js`.

## Configuration rapide

1. **Copiez le fichier d'environnement** :
```bash
cp .env.example .env
```

2. **Configurez votre API Ollama** :
```bash
# Modifiez .env avec votre URL API
VITE_CHATBOT_API_URL=http://your-cloud-api.com
```

3. **Lancez le projet** :
```bash
npm run dev
```

## Utilisation dans un composant

```javascript
import gemmaService from '../services/gemmaService';

const handleChat = async (userMessage) => {
  try {
    const response = await gemmaService.sendMessage(userMessage);
    console.log(response.message);
  } catch (error) {
    console.error('Erreur:', error.message);
  }
};
```

## Fonctionnalités de sécurité

✅ **Rate Limiting** : 10 requêtes/minute  
✅ **Input Sanitization** : Protection XSS/SQL  
✅ **Cache intelligent** : Réponses instantanées  
✅ **Timeout protection** : 30s max  
✅ **Session tracking** : 100 requêtes max/session  
✅ **Error handling** : Gestion robuste des erreurs  

## API du service

### `sendMessage(message, context?)`

Envoie un message à l'API Gemma.

**Paramètres** :
- `message` (string) : Le message de l'utilisateur (max 1000 caractères)
- `context` (object, optionnel) : Contexte additionnel

**Retour** :
```javascript
{
  message: "Réponse de l'IA",
  fromCache: false,
  sessionId: "123456-abc",
  timestamp: 1234567890
}
```

**Erreurs possibles** :
- `Message trop long` : Message > 1000 caractères
- `Trop de requêtes` : Rate limit atteint
- `Timeout` : Pas de réponse en 30s
- `Message invalide` : Contenu non valide

### `getStats()`

Récupère les statistiques de la session.

**Retour** :
```javascript
{
  sessionId: "123456-abc",
  requestCount: 5,
  remainingRequests: 95,
  cacheSize: 3,
  rateLimitRemaining: 7
}
```

### `reset()`

Réinitialise la session et le cache.

```javascript
gemmaService.reset();
```

## Configuration avancée

### Variables d'environnement

| Variable | Description | Défaut |
|----------|-------------|--------|
| `VITE_CHATBOT_API_URL` | URL de l'API | - |
| `VITE_OLLAMA_MODEL` | Modèle Gemma | gemma2:2b |
| `VITE_OLLAMA_MAX_TOKENS` | Tokens max | 500 |
| `VITE_OLLAMA_RATE_LIMIT` | Req/minute | 10 |
| `VITE_OLLAMA_TIMEOUT` | Timeout (ms) | 30000 |

### Personnalisation du rate limiting

```javascript
// Dans gemmaService.js
this.rateLimiter = new RateLimiter(
  20,    // 20 requêtes
  60000  // par minute
);
```

### Ajustement du cache

```javascript
// Dans gemmaService.js
this.cacheTimeout = 10 * 60 * 1000; // 10 minutes
```

## Exemple complet

```javascript
import { useState } from 'react';
import gemmaService from './services/gemmaService';

function ChatComponent() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await gemmaService.sendMessage(message, {
        previousMessages: [], // Historique si nécessaire
        userLocation: 'Madrid'
      });
      
      setResponse(result.message);
      
      // Vérifier les stats
      const stats = gemmaService.getStats();
      if (stats.rateLimitRemaining < 3) {
        alert('Attention : proche de la limite');
      }
      
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        maxLength={1000}
      />
      <button disabled={loading}>Envoyer</button>
      {response && <p>{response}</p>}
    </form>
  );
}
```

## Tests

### Test de sécurité

```javascript
// Tentative d'injection XSS (doit être bloqué)
await gemmaService.sendMessage('<script>alert("XSS")</script>');
// Erreur: Message invalide après vérification

// Tentative d'injection SQL (doit être bloqué)
await gemmaService.sendMessage("'; DROP TABLE users; --");
// Erreur: Message invalide après vérification

// Message trop long (doit être bloqué)
await gemmaService.sendMessage('A'.repeat(2000));
// Erreur: Message trop long (maximum 1000 caractères)
```

### Test de rate limiting

```javascript
// Envoyer 15 messages rapidement
for (let i = 0; i < 15; i++) {
  try {
    await gemmaService.sendMessage(`Message ${i}`);
  } catch (error) {
    console.log('Bloqué après 10 messages:', error.message);
  }
}
```

## Déploiement

### Recommandations production

1. **HTTPS obligatoire** : Configurez SSL/TLS
2. **Variables d'environnement** : Ne commitez jamais les `.env`
3. **Rate limiting serveur** : Doublez la protection côté backend
4. **Monitoring** : Surveillez les métriques (Sentry, DataDog, etc.)
5. **CORS** : Configurez correctement les origines

### Configuration Nginx (exemple)

```nginx
# Rate limiting
limit_req_zone $binary_remote_addr zone=api:10m rate=10r/m;

location /api/ {
    limit_req zone=api burst=5;
    proxy_pass http://your-ollama-backend;
}
```

## Troubleshooting

### Erreur : "Timeout"
- Vérifiez que votre API Ollama est accessible
- Augmentez `VITE_OLLAMA_TIMEOUT` si nécessaire

### Erreur : "Trop de requêtes"
- Attendez 1 minute
- Ou appelez `gemmaService.reset()`

### Réponses vides
- Vérifiez le format de réponse de votre API
- Assurez-vous qu'elle retourne `{ message: "..." }`

### Erreur CORS
- Configurez les headers CORS côté serveur
- Ajoutez votre origine dans la whitelist

## Support

Pour toute question :
- 📧 Email : dev@manosexpertas.es
- 📚 Documentation : `/SECURITY.md`
- 🐛 Issues : GitHub Issues

## Licence

MIT © 2024 Manos Expertas
