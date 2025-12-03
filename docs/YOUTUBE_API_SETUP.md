# 🎥 Intégration YouTube API - Manos Expertas

## Vue d'ensemble

Le système d'intégration YouTube permet d'afficher des vidéos de votre chaîne YouTube directement sur votre site web.

## Configuration

### 1. Obtenir une clé API YouTube

1. Allez sur [Google Cloud Console](https://console.cloud.google.com/)
2. Créez un nouveau projet ou sélectionnez un projet existant
3. Activez l'API **YouTube Data API v3**
4. Créez des identifiants → **Clé API**
5. Copiez la clé générée

### 2. Obtenir l'ID de votre chaîne

**Méthode 1: Depuis YouTube Studio**
- Allez sur [YouTube Studio](https://studio.youtube.com/)
- Paramètres → Chaîne → Informations avancées
- Copiez l'ID de chaîne

**Méthode 2: Depuis l'URL**
- Si votre URL est `youtube.com/channel/UC123...`, l'ID est `UC123...`
- Si votre URL est `youtube.com/@username`, utilisez l'outil de conversion YouTube

### 3. Variables d'environnement

Ajoutez dans votre fichier `.env`:

```bash
# YouTube API
VITE_YOUTUBE_API_KEY=AIzaSyB2i_9a0GcFnho1d_m3TE7-mV4wN5pPfZI
VITE_YOUTUBE_CHANNEL_ID=UC8butISFwT-Wl7EV0hUK0BQ
```

## Fichiers créés

### 1. Service YouTube
**`src/services/youtubeService.js`**

Fonctions disponibles:
- `getChannelVideos(maxResults)` - Récupère les vidéos de la chaîne
- `getVideoDetails(videoId)` - Détails d'une vidéo spécifique
- `searchVideos(query, maxResults)` - Recherche de vidéos
- `generateEmbedPlayer(videoId, options)` - Génère un lecteur embed
- `checkYouTubeConfig()` - Vérifie la configuration

### 2. Composants YouTube
**`src/components/ui/YouTubeVideo.jsx`**

Trois composants React:
- `<YouTubeVideo />` - Lecteur vidéo unique
- `<YouTubePlaylist />` - Grille de vidéos
- `<YouTubeLink />` - Lien vers YouTube

## Utilisation

### 1. Afficher une vidéo unique

```jsx
import { YouTubeVideo } from '../components/ui';

function MyPage() {
  return (
    <YouTubeVideo 
      videoId="dQw4w9WgXcQ"
      title="Ma vidéo"
      autoplay={false}
    />
  );
}
```

### 2. Afficher une playlist de vidéos

```jsx
import { useState, useEffect } from 'react';
import { YouTubePlaylist } from '../components/ui';
import { getChannelVideos } from '../services/youtubeService';

function MyPage() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchVideos = async () => {
      const data = await getChannelVideos(6);
      setVideos(data);
    };
    fetchVideos();
  }, []);

  return (
    <div>
      <h2>Nos dernières vidéos</h2>
      <YouTubePlaylist videos={videos} columns={3} />
    </div>
  );
}
```

### 3. Rechercher des vidéos

```jsx
import { searchVideos } from '../services/youtubeService';

const results = await searchVideos('tutoriel réparation', 10);
```

### 4. Afficher un lien simple

```jsx
import { YouTubeLink } from '../components/ui';

<YouTubeLink 
  videoId="dQw4w9WgXcQ"
  title="Regarder sur YouTube"
/>
```

## Exemples d'intégration

### Page Podcast mise à jour

```jsx
// src/pages/Podcast.jsx
import { useState, useEffect } from 'react';
import { YouTubePlaylist } from '../components/ui';
import { getChannelVideos } from '../services/youtubeService';

export const Podcast = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const data = await getChannelVideos(12);
        setVideos(data);
      } catch (error) {
        console.error('Erreur:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchVideos();
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1>Nos Podcasts</h1>
      
      {loading ? (
        <p>Chargement...</p>
      ) : (
        <YouTubePlaylist videos={videos} columns={3} />
      )}
    </div>
  );
};
```

### Section Vidéos sur la page d'accueil

```jsx
// src/pages/Home.jsx
import { YouTubeVideo } from '../components/ui';

export const Home = () => {
  return (
    <div>
      {/* Autres sections */}
      
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">
            Vidéo de présentation
          </h2>
          <div className="max-w-4xl mx-auto">
            <YouTubeVideo 
              videoId="YOUR_VIDEO_ID"
              title="Découvrez Manos Expertas"
            />
          </div>
        </div>
      </section>
    </div>
  );
};
```

## Fonctionnalités

### YouTubeVideo

Props disponibles:
- `videoId` (requis) - ID de la vidéo YouTube
- `title` - Titre affiché sous la vidéo
- `thumbnail` - URL de la miniature personnalisée
- `autoplay` - Lecture automatique (défaut: false)
- `width` - Largeur du lecteur (défaut: '100%')
- `height` - Hauteur du lecteur (défaut: '315')

### YouTubePlaylist

Props disponibles:
- `videos` (requis) - Tableau d'objets vidéo
- `columns` - Nombre de colonnes (1, 2, 3, ou 4)

Format des objets vidéo:
```javascript
{
  id: 'dQw4w9WgXcQ',
  title: 'Titre de la vidéo',
  description: 'Description...',
  thumbnail: 'https://...',
  publishedAt: '2024-01-15T10:30:00Z'
}
```

### YouTubeLink

Props disponibles:
- `videoId` (requis) - ID de la vidéo
- `title` - Texte du lien
- `className` - Classes CSS personnalisées

## Limites de l'API

### Quota gratuit
- **10,000 unités par jour**
- 1 requête de recherche = 100 unités
- 1 requête de détails vidéo = 1 unité
- 1 requête de liste de chaîne = 1 unité

### Optimisation
Pour économiser le quota:
1. **Cache les résultats** côté client (localStorage)
2. **Limite les requêtes** (debounce sur la recherche)
3. **Utilise les miniatures YouTube** au lieu de requêtes API
4. **Pagine les résultats** au lieu de tout charger

### Exemple avec cache

```javascript
const CACHE_KEY = 'youtube_videos_cache';
const CACHE_DURATION = 3600000; // 1 heure

export const getCachedChannelVideos = async (maxResults = 10) => {
  const cached = localStorage.getItem(CACHE_KEY);
  
  if (cached) {
    const { data, timestamp } = JSON.parse(cached);
    if (Date.now() - timestamp < CACHE_DURATION) {
      return data;
    }
  }
  
  const videos = await getChannelVideos(maxResults);
  localStorage.setItem(CACHE_KEY, JSON.stringify({
    data: videos,
    timestamp: Date.now()
  }));
  
  return videos;
};
```

## Sécurité

### ✅ Bonnes pratiques

1. **Restreindre la clé API** dans Google Cloud Console:
   - Restrictions d'application → Référents HTTP
   - Ajouter votre domaine: `manosexpertas.es/*`

2. **Restrictions d'API**:
   - Autoriser uniquement YouTube Data API v3

3. **Surveillance**:
   - Activer les alertes de quota dans Google Cloud Console
   - Monitorer l'utilisation quotidienne

### 🔒 Protection de la clé

**❌ Mauvaise pratique:**
```javascript
const API_KEY = 'AIzaSy...'; // Clé en dur dans le code
```

**✅ Bonne pratique:**
```javascript
const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
```

**Note**: Même avec les variables d'environnement, la clé est visible côté client. C'est pourquoi les restrictions par domaine sont essentielles.

## Alternatives

Si vous atteignez les limites ou ne voulez pas utiliser l'API:

### 1. Liens directs (actuel)
```jsx
const podcasts = [
  {
    title: 'Episode 1',
    youtubeUrl: 'https://www.youtube.com/watch?v=...',
    spotifyUrl: 'https://open.spotify.com/episode/...'
  }
];
```

### 2. RSS Feed YouTube
```javascript
// Gratuit et illimité
const RSS_URL = 'https://www.youtube.com/feeds/videos.xml?channel_id=YOUR_CHANNEL_ID';
```

### 3. Service tiers
- **YouTube iframe API** (gratuit, illimité)
- **Vimeo** (alternative)
- **Wistia** (alternative professionnelle)

## Troubleshooting

### Erreur "API key not valid"
- Vérifiez que la clé est correcte
- Vérifiez les restrictions de domaine
- Vérifiez que l'API YouTube est activée

### Quota dépassé
- Attendez minuit (heure Pacifique) pour le reset
- Implémentez un système de cache
- Réduisez le nombre de requêtes

### Vidéos non affichées
- Vérifiez l'ID de la chaîne
- Vérifiez que les vidéos sont publiques
- Consultez les logs du service

## Monitoring

### Vérifier la configuration

```javascript
import { checkYouTubeConfig } from '../services/youtubeService';

// Au démarrage de l'app
checkYouTubeConfig();
// Console: 🎥 Configuration YouTube: { isConfigured: true, ... }
```

### Consulter l'utilisation du quota

1. [Google Cloud Console](https://console.cloud.google.com/)
2. APIs & Services → Dashboard
3. YouTube Data API v3 → Quotas

## Support

- 📚 [Documentation YouTube Data API](https://developers.google.com/youtube/v3)
- 💬 [Stack Overflow](https://stackoverflow.com/questions/tagged/youtube-api)
- 📧 Email: sami73232@gmail.com

---

✅ **Statut**: Configuration prête  
🎥 **Vidéos**: Prêtes à être affichées  
📊 **Quota**: 10,000 unités/jour disponibles
