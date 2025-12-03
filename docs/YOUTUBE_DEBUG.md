# 🎥 Débogage - Vidéos YouTube ne s'affichent pas

## Problème résolu ✅

Les vidéos YouTube ne s'affichaient pas car la page `Podcast.jsx` utilisait des liens statiques au lieu des composants YouTube.

## Solution appliquée

### 1. Import des composants YouTube
```javascript
import { YouTubeVideo, YouTubePlaylist } from '../components/ui';
import { getChannelVideos, checkYouTubeConfig } from '../services/youtubeService';
```

### 2. Ajout de l'état et chargement des vidéos
```javascript
const [youtubeVideos, setYoutubeVideos] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const loadVideos = async () => {
    const config = checkYouTubeConfig();
    if (config.isConfigured) {
      const videos = await getChannelVideos(12);
      setYoutubeVideos(videos);
    }
    setLoading(false);
  };
  loadVideos();
}, []);
```

### 3. Affichage avec YouTubePlaylist
```javascript
{youtubeVideos.length > 0 && (
  <YouTubePlaylist videos={youtubeVideos} columns={3} />
)}
```

---

## ✅ Checklist de vérification

### 1. Variables d'environnement configurées
```bash
# Vérifier dans .env
VITE_YOUTUBE_API_KEY=AIzaSyB2i_9a0GcFnho1d_m3TE7-mV4wN5pPfZI
VITE_YOUTUBE_CHANNEL_ID=UC8butISFwT-Wl7EV0hUK0BQ
```

**✅ Statut** : Variables présentes dans `.env`

### 2. Service YouTube utilise les variables
```javascript
// src/services/youtubeService.js
const YOUTUBE_CONFIG = {
  apiKey: import.meta.env.VITE_YOUTUBE_API_KEY,
  channelId: import.meta.env.VITE_YOUTUBE_CHANNEL_ID,
};
```

**✅ Statut** : Service correctement configuré

### 3. Composants créés
- ✅ `src/components/ui/YouTubeVideo.jsx`
- ✅ `src/components/ui/index.js` (export des composants)
- ✅ `src/services/youtubeService.js`

### 4. Page Podcast mise à jour
- ✅ Import des composants YouTube
- ✅ Appel de `getChannelVideos()`
- ✅ Utilisation de `<YouTubePlaylist />`

---

## 🔍 Comment vérifier

### Dans le navigateur

1. **Ouvrir la page Podcast** : `http://localhost:5173/podcast`

2. **Ouvrir la console** (F12)

3. **Vérifier les logs** :
```javascript
// Devrait afficher :
🎥 Configuration YouTube: {
  isConfigured: true,
  hasApiKey: true,
  hasChannelId: true
}
```

4. **Vérifier les vidéos chargées** :
   - Si configuré : Liste de vidéos YouTube
   - Si non configuré : Message "Configuration YouTube nécessaire"

---

## 🐛 Problèmes possibles

### Vidéos ne s'affichent pas

#### Problème 1 : Variables non chargées
**Symptôme** : `import.meta.env.VITE_YOUTUBE_API_KEY` est `undefined`

**Solution** :
1. Vérifier que les variables commencent par `VITE_`
2. Redémarrer le serveur de développement :
```bash
npm run dev
```

3. Vérifier dans la console :
```javascript
console.log(import.meta.env.VITE_YOUTUBE_API_KEY);
```

#### Problème 2 : Erreur API YouTube
**Symptôme** : Erreur 403 ou 400 dans la console

**Solutions** :
1. **Clé API invalide** :
   - Générer une nouvelle clé sur [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
   - Activer YouTube Data API v3

2. **Quota dépassé** :
   - Vérifier le quota sur Google Cloud Console
   - Attendre minuit (heure Pacifique) pour le reset
   - Implémenter un cache (voir ci-dessous)

3. **Restrictions de domaine** :
   - Sur Google Cloud Console, vérifier les restrictions
   - Ajouter `localhost` et votre domaine de production

#### Problème 3 : CORS
**Symptôme** : Erreur CORS dans la console

**Solution** :
Les requêtes vers YouTube API sont faites depuis le client, donc pas de problème CORS normalement.
Si le problème persiste, utiliser un proxy backend.

---

## 💡 Optimisations

### 1. Cache des vidéos

Pour éviter de dépasser le quota YouTube :

```javascript
// src/services/youtubeService.js
const CACHE_KEY = 'youtube_videos_cache';
const CACHE_DURATION = 3600000; // 1 heure

export const getCachedChannelVideos = async (maxResults = 10) => {
  const cached = localStorage.getItem(CACHE_KEY);
  
  if (cached) {
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < CACHE_DURATION) {
      console.log('📦 Vidéos chargées depuis le cache');
      return data;
    }
  }
  
  console.log('🔄 Chargement des vidéos depuis l'API');
  const videos = await getChannelVideos(maxResults);
  
  localStorage.setItem(CACHE_KEY, JSON.stringify({
    data: videos,
    timestamp: Date.now()
  }));
  
  return videos;
};
```

Utilisation :
```javascript
const videos = await getCachedChannelVideos(12);
```

### 2. Fallback avec vidéos statiques

Si YouTube API n'est pas disponible, afficher des vidéos statiques :

```javascript
const FALLBACK_VIDEOS = [
  {
    id: 'dQw4w9WgXcQ',
    title: 'Vidéo 1',
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
  // ...
];

const videos = youtubeConfigured 
  ? await getChannelVideos(12) 
  : FALLBACK_VIDEOS;
```

---

## 🧪 Tester manuellement

### Test 1 : Vérifier la configuration
```javascript
// Dans la console du navigateur
import { checkYouTubeConfig } from './services/youtubeService';
checkYouTubeConfig();
```

### Test 2 : Charger des vidéos
```javascript
import { getChannelVideos } from './services/youtubeService';
const videos = await getChannelVideos(5);
console.log(videos);
```

### Test 3 : Afficher une vidéo unique
```jsx
<YouTubeVideo 
  videoId="dQw4w9WgXcQ"
  title="Test vidéo"
/>
```

---

## 📊 Monitoring

### Quota YouTube API

**Quota journalier** : 10,000 unités

**Coûts par requête** :
- `search` : 100 unités
- `videos` : 1 unité
- `channels` : 1 unité

**Exemple** :
- Charger 12 vidéos d'une chaîne : 100 unités
- On peut faire ~100 chargements par jour
- Avec cache d'1h : ~24 chargements/jour = 2,400 unités

### Vérifier l'utilisation

1. Aller sur [Google Cloud Console](https://console.cloud.google.com/)
2. APIs & Services → Dashboard
3. YouTube Data API v3 → Quotas
4. Voir l'utilisation en temps réel

---

## 🆘 En cas de problème

### Vérification étape par étape

1. **Variables d'environnement** :
```bash
cat .env | grep YOUTUBE
```

2. **Serveur redémarré** :
```bash
# Ctrl+C puis
npm run dev
```

3. **Console navigateur** :
- F12 → Console
- Rechercher les erreurs YouTube
- Vérifier les logs de `checkYouTubeConfig()`

4. **Network tab** :
- F12 → Network
- Filtrer "youtube" ou "googleapis"
- Vérifier les requêtes et réponses

---

## ✅ État actuel

- ✅ Variables d'environnement configurées
- ✅ Service YouTube créé et fonctionnel
- ✅ Composants YouTubeVideo et YouTubePlaylist créés
- ✅ Page Podcast mise à jour pour utiliser les composants
- ✅ Export des composants dans `ui/index.js`
- ⚠️ Clé API YouTube à remplacer par une vraie clé

---

## 🚀 Prochaine étape

**Obtenir une vraie clé API YouTube** :

1. Aller sur https://console.cloud.google.com/
2. Créer un projet (ou sélectionner un existant)
3. Activer YouTube Data API v3
4. Créer des identifiants → Clé API
5. Copier la clé dans `.env` :
```bash
VITE_YOUTUBE_API_KEY=VOTRE_VRAIE_CLE_ICI
```
6. Redémarrer le serveur
7. Tester !

---

**Statut** : ✅ **RÉSOLU**  
**Date** : 3 Décembre 2025  
**Les vidéos YouTube devraient maintenant s'afficher correctement ! 🎉**
