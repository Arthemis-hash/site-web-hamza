# 📦 Assets & Images - Guide d'utilisation

## 🖼️ Images créées

### 1. Logo principal (`/public/logo.svg`)
Logo vectoriel avec main stylisée et étoiles d'expertise.

**Utilisation** :
```jsx
import logo from '/logo.svg';

// Dans un composant
<img src="/logo.svg" alt="Manos Expertas" className="w-12 h-12" />

// Dans le header
<img src="/logo.svg" alt="Logo" width="48" height="48" />
```

**Caractéristiques** :
- Format : SVG (vectoriel, scalable)
- Taille : Optimisée
- Couleurs : Palette primary (#4F46E5, #6366F1)
- Utilisé pour : Header, favicon, branding

### 2. Image Hero (`/public/hero-image.svg`)
Illustration de maison avec outils pour la page d'accueil.

**Utilisation** :
```jsx
// Hero Section
<img 
  src="/hero-image.svg" 
  alt="Services professionnels" 
  className="w-full max-w-2xl mx-auto"
/>

// Services Section
<div className="relative">
  <img src="/hero-image.svg" alt="Services" />
</div>
```

**Caractéristiques** :
- Format : SVG 800x600
- Style : Moderne, minimaliste
- Éléments : Maison, outils, icônes de service
- Utilisé pour : Hero sections, landing pages

### 3. Placeholder Professionnel (`/public/professional-placeholder.jpg`)
Image SVG de professionnel pour les cartes.

**Utilisation** :
```jsx
// ExpertCard
<img 
  src={expert.photo || '/professional-placeholder.jpg'} 
  alt={expert.name}
  className="w-full h-48 object-cover rounded-t-lg"
/>

// Professional Dashboard
<div className="w-24 h-24 rounded-full overflow-hidden">
  <img src="/professional-placeholder.jpg" alt="Photo" />
</div>
```

**Caractéristiques** :
- Format : SVG (extension .jpg pour compatibilité)
- Style : Gradient violet/indigo avec silhouette
- Utilisé pour : Avatars, cartes professionnels

### 4. Logo original (`/public/hand-logo.svg`)
Logo existant (maintenu pour rétrocompatibilité).

## 🎨 Règles d'utilisation

### ✅ Chemins corrects
```jsx
// ✅ CORRECT - Depuis la racine
<img src="/logo.svg" />
<img src="/hero-image.svg" />
<link rel="icon" href="/hand-logo.svg" />

// ✅ CORRECT - Import Vite
import logo from '/logo.svg';
<img src={logo} />
```

### ❌ Chemins incorrects
```jsx
// ❌ INCORRECT - Ne pas utiliser /public/
<img src="/public/logo.svg" />
<link rel="icon" href="/public/hand-logo.svg" />

// ❌ INCORRECT - Chemins relatifs depuis src/
<img src="../../public/logo.svg" />
```

## 📂 Où placer les images ?

### Images statiques
Placer dans `/public/` :
- Logos
- Favicons
- Images de fond
- Assets référencés dans index.html

```
public/
├── logo.svg
├── hand-logo.svg
├── hero-image.svg
├── professional-placeholder.jpg
└── vite.svg
```

### Images importées
Placer dans `/src/assets/` (si nécessaire) :
- Images importées dynamiquement
- Images optimisées par Vite

```
src/
└── assets/
    └── react.svg
```

## 🔄 Ajouter de nouvelles images

### 1. Images SVG (recommandé)

**Créer un SVG** :
```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
  <!-- Votre contenu SVG -->
  <circle cx="100" cy="100" r="50" fill="#4F46E5"/>
</svg>
```

**Avantages** :
- Scalable sans perte de qualité
- Taille fichier réduite
- Modifiable avec CSS
- Parfait pour logos/icônes

### 2. Images PNG/JPG

**Optimiser avant d'ajouter** :
```bash
# Utiliser TinyPNG, ImageOptim ou similaire
# Taille recommandée : < 200KB par image
```

**Nommer correctement** :
```
hero-background.jpg       ✅ kebab-case
professional-photo.png    ✅ descriptif
service-plumbing.svg      ✅ préfixe de catégorie
```

## 🎯 Images par composant

### Header.jsx
```jsx
<img src="/logo.svg" alt="Manos Expertas" />
```

### HeroSection.jsx
```jsx
<img src="/hero-image.svg" alt="Services" />
```

### ExpertCard.jsx
```jsx
<img 
  src={expert.photo || '/professional-placeholder.jpg'} 
  alt={expert.name}
/>
```

### Footer.jsx
```jsx
<img src="/logo.svg" alt="Logo" className="w-8 h-8" />
```

## 📱 Images responsive

### Utiliser srcset pour différentes tailles
```jsx
<img
  src="/hero-image.svg"
  srcSet="
    /hero-image-small.svg 400w,
    /hero-image.svg 800w
  "
  sizes="(max-width: 640px) 400px, 800px"
  alt="Hero"
/>
```

### Lazy loading
```jsx
<img 
  src="/hero-image.svg" 
  loading="lazy"
  alt="Services"
/>
```

## 🌐 Déploiement Vercel

### Vérifications automatiques
Vercel copie automatiquement `/public/` à la racine du build :
```
dist/
├── index.html
├── logo.svg          ← depuis /public/logo.svg
├── hero-image.svg    ← depuis /public/hero-image.svg
└── assets/
    └── index-abc123.js
```

### Tester en local
```bash
npm run build
npm run preview

# Vérifier que les images sont accessibles
curl http://localhost:4173/logo.svg
curl http://localhost:4173/hero-image.svg
```

## 🐛 Dépannage

### Image ne s'affiche pas (404)

**Problème** : Chemin incorrect
```jsx
// ❌ Incorrect
<img src="/public/logo.svg" />
```

**Solution** :
```jsx
// ✅ Correct
<img src="/logo.svg" />
```

### Image ne s'affiche qu'en dev, pas en prod

**Cause** : Chemin relatif incorrect

**Solution** : Toujours utiliser des chemins absolus depuis `/`

### Image floue

**Cause** : Mauvaise résolution

**Solution** : Utiliser du SVG ou des images 2x la taille affichée

## 📊 Performances

### Optimisation des images

1. **Utiliser SVG** quand possible (logos, icônes)
2. **Compresser PNG/JPG** (TinyPNG, ImageOptim)
3. **Lazy loading** pour images below the fold
4. **WebP** pour images photographiques (si compatible)

### Tailles recommandées

- **Logos** : SVG ou PNG 200x200 max
- **Hero images** : SVG ou JPG 1920x1080 max
- **Thumbnails** : JPG 400x300 max
- **Avatars** : JPG/PNG 200x200 max

## ✅ Checklist

Avant de déployer, vérifier :

- [ ] Toutes les images sont dans `/public/`
- [ ] Aucun chemin ne contient `/public/` dans le code
- [ ] Les alt text sont descriptifs
- [ ] Les images sont optimisées (< 200KB)
- [ ] Lazy loading sur images below the fold
- [ ] Favicons configurés dans index.html
- [ ] Test du build local réussi
- [ ] Aucune erreur 404 sur les images

## 🎨 Créer de nouvelles images SVG

### Outils recommandés
- [Figma](https://figma.com) - Design UI/UX
- [Excalidraw](https://excalidraw.com) - Dessins rapides
- [SVGOMG](https://jakearchibald.github.io/svgomg/) - Optimisation SVG
- [Hero Patterns](https://heropatterns.com) - Patterns SVG

### Template SVG de base
```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="none">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#6366F1"/>
      <stop offset="100%" style="stop-color:#8B5CF6"/>
    </linearGradient>
  </defs>
  
  <!-- Votre contenu ici -->
  <rect width="200" height="200" fill="url(#grad)"/>
  <circle cx="100" cy="100" r="50" fill="white" opacity="0.3"/>
</svg>
```

---

**Dernière mise à jour** : Décembre 2024
**Version** : 1.0.0
