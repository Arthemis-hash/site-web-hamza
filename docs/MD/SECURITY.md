# 🔒 Documentation de Sécurité - Service Gemma/Ollama

## Vue d'ensemble

Le service `gemmaService.js` implémente plusieurs couches de sécurité pour protéger l'application contre les cyberattaques courantes.

## Mesures de sécurité implémentées

### 1. **Rate Limiting (Limitation de débit)**
- **Protection** : Empêche les attaques par déni de service (DoS)
- **Implémentation** : Maximum 10 requêtes par minute par utilisateur
- **Configuration** : `VITE_OLLAMA_RATE_LIMIT=10`

### 2. **Input Sanitization (Nettoyage des entrées)**
- **Protection** : Prévient les injections XSS, SQL et NoSQL
- **Mesures** :
  - Suppression des balises HTML et scripts
  - Élimination des caractères de contrôle
  - Filtrage des mots-clés SQL dangereux
  - Limite de 1000 caractères par message

### 3. **Request Queue (File d'attente)**
- **Protection** : Limite les requêtes concurrentes
- **Implémentation** : Maximum 3 requêtes simultanées
- **Avantage** : Évite la surcharge du serveur

### 4. **Cache avec TTL**
- **Protection** : Réduit la charge serveur et améliore les performances
- **Implémentation** : Cache de 50 entrées maximum, expiration après 5 minutes
- **Avantage** : Réponses instantanées pour les questions répétées

### 5. **Session Management (Gestion de session)**
- **Protection** : Suivi des utilisateurs et limitation par session
- **Implémentation** : 
  - ID de session unique généré pour chaque utilisateur
  - Maximum 100 requêtes par session
  - Réinitialisation possible de la session

### 6. **Timeout Protection**
- **Protection** : Évite les requêtes qui traînent indéfiniment
- **Configuration** : `VITE_OLLAMA_TIMEOUT=30000` (30 secondes)
- **Implémentation** : Abort automatique après le timeout

### 7. **Response Validation (Validation des réponses)**
- **Protection** : Détecte les réponses malveillantes de l'API
- **Mesures** :
  - Vérification du format de réponse
  - Détection de scripts malveillants dans les réponses
  - Limite de 5000 caractères par réponse

### 8. **Retry avec Backoff Exponentiel**
- **Protection** : Gestion intelligente des erreurs réseau
- **Implémentation** : 2 tentatives avec délais croissants
- **Avantage** : Meilleure fiabilité sans surcharger le serveur

### 9. **CSRF Token Support**
- **Protection** : Protection contre les attaques Cross-Site Request Forgery
- **Implémentation** : Détection et envoi automatique du token CSRF si disponible

### 10. **Headers de sécurité**
- **Protection** : Communications sécurisées
- **Implémentation** :
  - `Content-Type: application/json`
  - `X-Session-ID` pour le suivi
  - `X-Request-Time` pour la validation temporelle
  - `X-CSRF-Token` si disponible

## Configuration recommandée

### Variables d'environnement

```bash
# URL de votre API Ollama
VITE_CHATBOT_API_URL=https://your-secure-api.com

# Modèle Gemma à utiliser
VITE_OLLAMA_MODEL=gemma2:2b

# Tokens maximum par réponse
VITE_OLLAMA_MAX_TOKENS=500

# Limite de requêtes par minute
VITE_OLLAMA_RATE_LIMIT=10

# Timeout en millisecondes
VITE_OLLAMA_TIMEOUT=30000
```

## Utilisation

### Basique

```javascript
import gemmaService from './services/gemmaService';

// Envoyer un message
try {
  const response = await gemmaService.sendMessage('Necesito un electricista');
  console.log(response.message);
} catch (error) {
  console.error('Erreur:', error.message);
}
```

### Avec contexte

```javascript
const context = {
  previousMessages: [...],
  userLocation: 'Madrid',
  timestamp: new Date().toISOString()
};

const response = await gemmaService.sendMessage('Hola', context);
```

### Statistiques de session

```javascript
const stats = gemmaService.getStats();
console.log('Requêtes restantes:', stats.remainingRequests);
console.log('Rate limit restant:', stats.rateLimitRemaining);
```

### Réinitialisation

```javascript
// Réinitialiser la session et le cache
gemmaService.reset();
```

## Gestion des erreurs

Le service génère des erreurs spécifiques pour différents cas :

| Erreur | Description | Action recommandée |
|--------|-------------|-------------------|
| `Trop de requêtes` | Rate limit atteint | Attendre 1 minute |
| `Message trop long` | > 1000 caractères | Réduire le message |
| `Timeout` | Pas de réponse en 30s | Réessayer |
| `Message invalide` | Contenu non valide | Reformuler |
| `Réponse dangereuse` | Réponse bloquée | Contacter support |

## Bonnes pratiques

### Côté serveur (à implémenter)

1. **Authentification** : Ajouter un système d'authentification JWT
2. **HTTPS** : Toujours utiliser HTTPS en production
3. **CORS** : Configurer correctement les origines autorisées
4. **Rate limiting serveur** : Implémenter aussi côté serveur
5. **Logs** : Enregistrer toutes les requêtes suspectes
6. **Monitoring** : Surveiller les patterns d'attaque

### Côté client

1. **Validation** : Ne jamais faire confiance aux données utilisateur
2. **Sanitization** : Toujours nettoyer les entrées
3. **Feedback** : Informer l'utilisateur des limites
4. **Graceful degradation** : Avoir un fallback si l'API échoue

## Tests de sécurité

### Tests à effectuer régulièrement

```bash
# Test d'injection XSS
Message: "<script>alert('XSS')</script>"
Résultat attendu: Script supprimé

# Test d'injection SQL
Message: "'; DROP TABLE users; --"
Résultat attendu: Caractères dangereux supprimés

# Test de rate limiting
Action: Envoyer 15 messages rapidement
Résultat attendu: Blocage après 10 messages

# Test de longueur
Message: Chaîne de 2000 caractères
Résultat attendu: Erreur "Message trop long"

# Test de timeout
Action: Simuler une API lente
Résultat attendu: Timeout après 30 secondes
```

## Monitoring

### Métriques à surveiller

- Nombre de requêtes par minute
- Taux d'erreur
- Temps de réponse moyen
- Taille du cache
- Tentatives d'injection détectées

### Alertes recommandées

- Rate limit dépassé > 5 fois par heure
- Erreurs > 10% des requêtes
- Timeout > 20% des requêtes
- Patterns d'attaque détectés

## Mise à jour et maintenance

1. **Revue régulière** : Vérifier les dépendances pour les vulnérabilités
2. **Updates** : Maintenir les packages à jour
3. **Audit** : Effectuer des audits de sécurité trimestriels
4. **Documentation** : Mettre à jour cette doc lors des changements

## Contact

En cas de vulnérabilité détectée, contactez immédiatement :
- Email: security@manosexpertas.es
- Procédure de divulgation responsable

## Ressources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [Rate Limiting Best Practices](https://cloud.google.com/architecture/rate-limiting-strategies-techniques)

---

**Dernière mise à jour** : Décembre 2024  
**Version** : 1.0.0
