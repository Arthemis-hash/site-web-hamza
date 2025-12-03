# 🗺️ Migration vers OpenStreetMap & Configuration Jaén

## Résumé des changements

### 1. **Podcasts - Liens externes** ✅

Les podcasts ne sont plus hébergés sur le site. Ils pointent maintenant vers YouTube et Spotify.

#### Fichier modifié : `/src/pages/Podcast.jsx`

**Nouveaux champs ajoutés :**
```javascript
{
  id: 1,
  title: "...",
  // ...autres champs
  youtubeUrl: 'https://www.youtube.com/watch?v=YOUR_VIDEO_ID_1',
  spotifyUrl: 'https://open.spotify.com/episode/YOUR_EPISODE_ID_1'
}
```

**Interface mise à jour :**
- ✅ Boutons YouTube (rouge) et Spotify (vert) sur chaque épisode
- ✅ Liens externes s'ouvrent dans un nouvel onglet
- ✅ Icônes dédiées pour chaque plateforme

**Comment ajouter vos liens :**
1. Récupérez l'URL complète de votre vidéo YouTube
2. Récupérez l'URL complète de votre épisode Spotify
3. Remplacez `YOUR_VIDEO_ID_X` et `YOUR_EPISODE_ID_X` dans le code

---

### 2. **OpenStreetMap remplace Google Maps** ✅

Google Maps a été complètement remplacé par OpenStreetMap (gratuit, open-source).

#### Fichiers créés :
- `/src/components/ui/OpenStreetMap.jsx` - Composants de carte

#### Fichiers modifiés :
- `/src/components/ui/index.js` - Export des nouveaux composants
- `/src/pages/Contact.jsx` - Utilise maintenant OpenStreetMap

#### 3 composants disponibles :

**1. OpenStreetMap (interactif avec Leaflet)**
```jsx
import { OpenStreetMap } from '../components/ui';

<OpenStreetMap
  latitude={37.7796}
  longitude={-3.7849}
  zoom={13}
  markerTitle="Manos Expertas"
  height="400px"
/>
```

**2. StaticMap (iframe, plus léger)**
```jsx
import { StaticMap } from '../components/ui';

<StaticMap
  latitude={37.7796}
  longitude={-3.7849}
  zoom={13}
  height="400px"
/>
```

**3. MapLink (lien vers OpenStreetMap)**
```jsx
import { MapLink } from '../components/ui';

<MapLink
  latitude={37.7796}
  longitude={-3.7849}
  label="Ver en el mapa"
/>
```

#### Variables supprimées :
- ❌ `VITE_GOOGLE_MAPS_API_KEY` (plus nécessaire)

---

### 3. **Localisation par défaut : Jaén, España** ✅

Toutes les références géographiques pointent maintenant vers le centre-ville de Jaén.

#### Variables d'environnement ajoutées :

```bash
# Location Configuration (OpenStreetMap)
VITE_DEFAULT_LOCATION_NAME=Jaén, España
VITE_DEFAULT_LATITUDE=37.7796    # Centre-ville de Jaén
VITE_DEFAULT_LONGITUDE=-3.7849   # Centre-ville de Jaén
VITE_DEFAULT_ZOOM=13

# Contact Information
VITE_CONTACT_ADDRESS=Jaén, España
```

#### Fichiers mis à jour :

**Configuration :**
- ✅ `.env` - Jaén défini par défaut
- ✅ `.env.example` - Jaén défini par défaut

**Pages :**
- ✅ `/src/pages/Contact.jsx` - Carte centrée sur Jaén
- ✅ `/src/pages/Privacy.jsx` - Adresse mise à jour
- ✅ `/src/pages/Terms.jsx` - Juridiction mise à jour (tribunaux de Jaén)

---

## 🎯 Coordonnées de Jaén

**Centre-ville de Jaén :**
- **Latitude** : 37.7796
- **Longitude** : -3.7849
- **Zoom par défaut** : 13 (vue de quartier)

**Lieux importants de Jaén :**
- Cathédrale de Jaén : `37.7644, -3.7898`
- Château de Santa Catalina : `37.7803, -3.7831`
- Plaza de la Constitución : `37.7764, -3.7897`

---

## 📝 Guide d'utilisation

### Comment personnaliser la localisation

**Méthode 1 : Variables d'environnement (recommandé)**

Éditez `.env` :
```bash
VITE_DEFAULT_LATITUDE=37.7644   # Votre latitude
VITE_DEFAULT_LONGITUDE=-3.7898  # Votre longitude
VITE_DEFAULT_ZOOM=15            # Niveau de zoom
```

**Méthode 2 : Directement dans le code**

```jsx
<OpenStreetMap
  latitude={37.7644}
  longitude={-3.7898}
  zoom={15}
/>
```

### Comment trouver vos coordonnées

1. **Allez sur OpenStreetMap** : https://www.openstreetmap.org
2. **Cherchez votre adresse** dans la barre de recherche
3. **Cliquez sur "Partager"** à droite
4. **Cochez "Inclure un marqueur"**
5. **Copiez les coordonnées** affichées

Ou utilisez cette URL directe :
```
https://www.openstreetmap.org/?mlat=LAT&mlon=LON#map=ZOOM/LAT/LON
```

---

## 🚀 Déploiement

### Avant de déployer

1. ✅ Vérifiez que `.env` contient les bonnes coordonnées
2. ✅ Mettez à jour les URLs YouTube/Spotify des podcasts
3. ✅ Testez la carte localement : `npm run dev`
4. ✅ Vérifiez que la page Contact affiche bien Jaén

### Variables à configurer en production

Sur Vercel/Netlify, ajoutez ces variables d'environnement :

```bash
VITE_DEFAULT_LOCATION_NAME=Jaén, España
VITE_DEFAULT_LATITUDE=37.7796
VITE_DEFAULT_LONGITUDE=-3.7849
VITE_DEFAULT_ZOOM=13
VITE_CONTACT_ADDRESS=Jaén, España
```

---

## 🎨 Personnalisation de la carte

### Changer le style du marqueur

Dans `/src/components/ui/OpenStreetMap.jsx`, ligne ~50 :

```javascript
const customIcon = window.L.divIcon({
  html: `
    <div style="
      background-color: #4F46E5;  /* Changez la couleur ici */
      border: 3px solid white;
      border-radius: 50%;
      width: 40px;
      height: 40px;
      /* ... */
    ">
  `,
  // ...
});
```

### Changer le thème de la carte

Remplacez l'URL des tuiles (ligne ~40) :

**Style par défaut (OpenStreetMap) :**
```javascript
'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
```

**Alternatives gratuites :**

**CartoDB Positron (minimaliste, clair) :**
```javascript
'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
```

**CartoDB Dark Matter (sombre) :**
```javascript
'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
```

**OpenTopoMap (topographique) :**
```javascript
'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png'
```

---

## 📊 Comparaison Avant/Après

| Fonctionnalité | Avant | Après |
|----------------|-------|-------|
| **Cartes** | Google Maps (nécessite API key payante) | OpenStreetMap (gratuit) |
| **Podcasts** | Fichiers hébergés (non implémenté) | Liens YouTube/Spotify |
| **Localisation** | Madrid | Jaén (centre-ville) |
| **Juridiction** | Tribunaux de Madrid | Tribunaux de Jaén |
| **API Keys** | VITE_GOOGLE_MAPS_API_KEY | Plus nécessaire ✅ |

---

## 🐛 Troubleshooting

### La carte ne s'affiche pas

**Problème 1 : Leaflet ne charge pas**
- Vérifiez votre connexion internet
- Leaflet est chargé depuis CDN (unpkg.com)

**Solution** : Utilisez `StaticMap` à la place si le problème persiste

**Problème 2 : Coordonnées incorrectes**
- Vérifiez que les variables d'environnement sont bien chargées
- Relancez le serveur : `npm run dev`

### Les podcasts ne fonctionnent pas

**Problème** : Les liens YouTube/Spotify ne sont pas à jour

**Solution** : Remplacez les placeholders dans `/src/pages/Podcast.jsx` :
```javascript
youtubeUrl: 'https://www.youtube.com/watch?v=VOTRE_VRAI_ID'
spotifyUrl: 'https://open.spotify.com/episode/VOTRE_VRAI_ID'
```

---

## ✅ Checklist de vérification

- [ ] La carte affiche bien Jaén sur la page Contact
- [ ] Les coordonnées sont correctes (37.7796, -3.7849)
- [ ] Les liens de podcasts pointent vers YouTube et Spotify
- [ ] L'adresse dans le footer affiche "Jaén, España"
- [ ] La politique de confidentialité mentionne Jaén
- [ ] Les conditions générales mentionnent "tribunaux de Jaén"
- [ ] Variables d'environnement configurées en production

---

## 📚 Ressources

- **OpenStreetMap** : https://www.openstreetmap.org
- **Leaflet Documentation** : https://leafletjs.com
- **Trouver des coordonnées** : https://www.latlong.net
- **Centre-ville de Jaén** : https://www.openstreetmap.org/#map=15/37.7796/-3.7849

---

**Version** : 1.0.0  
**Date** : 3 décembre 2024  
**Status** : ✅ Terminé
