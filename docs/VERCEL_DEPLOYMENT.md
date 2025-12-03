# Guide de déploiement Vercel - Manos Expertas

## 📋 Pré-requis

- Compte GitHub avec le repository du projet
- Compte Vercel (gratuit)
- Variables d'environnement configurées

## 🚀 Étapes de déploiement

### 1. Préparation du projet

Vérifier que tous les fichiers sont corrects :

```bash
# Tester le build local
npm run build

# Vérifier qu'il n'y a pas d'erreurs
npm run preview
```

### 2. Configuration Vercel

Le fichier `vercel.json` est déjà configuré avec :

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    }
  ]
}
```

### 3. Déploiement via Vercel CLI

```bash
# Installer Vercel CLI (si nécessaire)
npm install -g vercel

# Se connecter
vercel login

# Déployer
vercel

# Ou déployer en production directement
vercel --prod
```

### 4. Déploiement via l'interface Vercel

1. Aller sur [vercel.com](https://vercel.com)
2. Cliquer sur "Add New Project"
3. Importer le repository GitHub
4. Configurer le projet :
   - **Framework Preset**: Vite
   - **Root Directory**: ./
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### 5. Configuration des variables d'environnement

Dans les paramètres du projet Vercel, ajouter :

#### Variables obligatoires
```env
# Application
VITE_API_URL=https://votre-api.com

# YouTube (optionnel)
VITE_YOUTUBE_API_KEY=votre_cle_youtube
VITE_YOUTUBE_CHANNEL_ID=votre_channel_id

# Contact
VITE_CONTACT_EMAIL=contact@manosexpertos.com
VITE_CONTACT_PHONE=+34900123456

# Localisation (OpenStreetMap)
VITE_DEFAULT_LOCATION_NAME=Jaén, España
VITE_DEFAULT_LATITUDE=37.7796
VITE_DEFAULT_LONGITUDE=-3.7849
VITE_DEFAULT_ZOOM=13

# Gemma AI (optionnel)
VITE_GEMMA_API_URL=http://localhost:11434
```

### 6. Vérifications post-déploiement

#### ✅ Checklist

- [ ] Le site se charge correctement
- [ ] Les images/logos s'affichent (pas d'erreur 404)
- [ ] OpenStreetMap fonctionne sans clé API
- [ ] Les vidéos YouTube s'affichent (si configuré)
- [ ] Les formulaires fonctionnent
- [ ] Les dashboards sont accessibles
- [ ] Le routing fonctionne (pas d'erreur 404 sur les pages)
- [ ] Les styles Tailwind sont appliqués
- [ ] Le site est responsive (mobile/tablet/desktop)
- [ ] Les headers de sécurité sont présents

#### 🔍 Tests à effectuer

```bash
# Test 1: Vérifier les assets
curl https://votre-site.vercel.app/hand-logo.svg
curl https://votre-site.vercel.app/logo.svg

# Test 2: Vérifier les headers de sécurité
curl -I https://votre-site.vercel.app

# Test 3: Vérifier le routing
curl https://votre-site.vercel.app/about
curl https://votre-site.vercel.app/contact
```

## 🐛 Résolution des problèmes courants

### Problème : Images ne s'affichent pas

**Solution**: Vérifier que les chemins n'incluent pas `/public/`
```jsx
// ❌ Incorrect
<img src="/public/logo.svg" />

// ✅ Correct
<img src="/logo.svg" />
```

### Problème : OpenStreetMap ne s'affiche pas

**Cause**: Leaflet CSS/JS non chargés correctement

**Solution**: Le composant `OpenStreetMap.jsx` charge dynamiquement Leaflet. Vérifier la console pour les erreurs.

### Problème : 404 sur les routes

**Cause**: `vercel.json` mal configuré

**Solution**: Vérifier que le fichier `vercel.json` contient les rewrites corrects.

### Problème : Variables d'environnement non accessibles

**Cause**: Variables non préfixées par `VITE_`

**Solution**: Toutes les variables doivent commencer par `VITE_` pour être accessibles côté client.

### Problème : Build échoue

```bash
# Vérifier les dépendances
npm install

# Nettoyer le cache
rm -rf node_modules package-lock.json
npm install

# Vérifier les erreurs TypeScript/ESLint
npm run build
```

## 📊 Monitoring

### Analytics Vercel

- Aller dans l'onglet "Analytics" de votre projet
- Surveiller :
  - Temps de chargement
  - Erreurs 404/500
  - Trafic par page

### Logs

```bash
# Voir les logs en temps réel
vercel logs votre-projet

# Logs de production
vercel logs votre-projet --prod
```

## 🔄 Mises à jour automatiques

Vercel déploie automatiquement :
- **Production**: À chaque push sur la branche `main`
- **Preview**: À chaque pull request

### Désactiver les déploiements automatiques

Dans les paramètres du projet :
- Git → Production Branch → Désactiver

## 📱 Domaine personnalisé

1. Aller dans "Settings" → "Domains"
2. Ajouter votre domaine
3. Configurer les DNS selon les instructions Vercel

## 🔐 Sécurité

### Headers de sécurité (déjà configurés)

- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY`
- `X-XSS-Protection: 1; mode=block`

### HTTPS

- HTTPS activé automatiquement par Vercel
- Certificat SSL gratuit et renouvelé automatiquement

## 📚 Ressources

- [Documentation Vercel](https://vercel.com/docs)
- [Documentation Vite](https://vitejs.dev/guide/)
- [Vercel CLI Reference](https://vercel.com/docs/cli)

## 🎯 Commandes rapides

```bash
# Déployer en production
vercel --prod

# Voir les déploiements
vercel ls

# Supprimer un déploiement
vercel rm [deployment-url]

# Voir les informations du projet
vercel inspect

# Lier le projet local
vercel link
```

## ✅ Checklist finale avant production

- [ ] Toutes les variables d'environnement sont configurées
- [ ] Le build local fonctionne sans erreur
- [ ] Les images/assets sont testés
- [ ] OpenStreetMap fonctionne
- [ ] Les dashboards client/pro sont testés
- [ ] Les formulaires sont testés
- [ ] Le site est responsive
- [ ] Les liens externes fonctionnent
- [ ] Les headers de sécurité sont présents
- [ ] Le domaine personnalisé est configuré (optionnel)
- [ ] Les analytics sont activés
- [ ] La documentation est à jour

---

**Dernière mise à jour**: Décembre 2024
**Version**: 1.0.0
