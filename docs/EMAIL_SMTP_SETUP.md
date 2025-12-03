# 📧 Configuration Email SMTP - Manos Expertas

## Vue d'ensemble

Le système d'envoi d'emails permet aux utilisateurs d'envoyer des messages via le formulaire de contact. Les emails sont envoyés à l'adresse **sami73232@gmail.com** par défaut.

## Architecture

```
┌─────────────────┐      ┌──────────────────┐      ┌─────────────────┐
│   Frontend      │      │   Backend SMTP   │      │   Email Server  │
│   (Contact)     │─────▶│   (Node.js)      │─────▶│   (Gmail)       │
└─────────────────┘      └──────────────────┘      └─────────────────┘
```

## Configuration

### Variables d'environnement

#### Frontend (.env)
```bash
# Email de destination par défaut
VITE_DEFAULT_CONTACT_EMAIL=sami73232@gmail.com
```

#### Backend (server/.env ou .env racine)
```bash
# Configuration SMTP
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=sami73232@gmail.com
SMTP_PASSWORD=your_app_password_here
SMTP_FROM_NAME=Manos Expertas
SMTP_FROM_EMAIL=sami73232@gmail.com
```

### Obtenir un mot de passe d'application Gmail

1. Connectez-vous à votre compte Gmail
2. Allez dans **Compte Google** → **Sécurité**
3. Activez la **Validation en deux étapes**
4. Dans **Mots de passe des applications**, générez un nouveau mot de passe
5. Copiez le mot de passe généré dans `SMTP_PASSWORD`

## Fichiers créés

### 1. Service Email (Frontend)
**`src/services/emailService.js`**
- Gère l'envoi d'emails depuis le frontend
- Valide les données du formulaire
- Format HTML et texte brut
- Fallback intelligent si le backend n'est pas disponible

### 2. Serveur Email (Backend)
**`server/emailServer.js`**
- Serveur Express.js pour l'envoi SMTP
- Configuration Nodemailer
- Route `/api/send-email`
- Gestion des erreurs

### 3. Formulaire de Contact
**`src/pages/Contact.jsx`**
- Formulaire mis à jour avec validation
- Intégration du service email
- Messages de succès/erreur
- Envoi vers sami73232@gmail.com

## Installation et démarrage

### Backend (Serveur Email)

```bash
# Installer les dépendances
cd server
npm install

# Configurer les variables d'environnement
cp ../.env .env

# Démarrer le serveur
npm start

# Ou en mode développement
npm run dev
```

Le serveur démarre sur `http://localhost:3000`

### Frontend

```bash
# Le frontend est déjà configuré
# Assurez-vous que VITE_API_BASE_URL pointe vers votre backend
# Dans .env:
VITE_API_BASE_URL=http://localhost:3000
```

## Utilisation

### Depuis le formulaire de contact

1. L'utilisateur remplit le formulaire
2. Validation côté client
3. Envoi via `emailService.sendEmail()`
4. Le backend reçoit les données
5. Email envoyé via SMTP Gmail
6. Confirmation à l'utilisateur

### Exemple de code

```javascript
import { sendEmail } from '../services/emailService';

const result = await sendEmail({
  name: 'Jean Dupont',
  email: 'jean@example.com',
  phone: '+34 600 000 000',
  subject: 'Demande de devis',
  message: 'Bonjour, je souhaite...',
});

if (result.success) {
  console.log('✅ Email envoyé');
} else {
  console.error('❌ Erreur:', result.message);
}
```

## Format de l'email reçu

```
De: Manos Expertas <sami73232@gmail.com>
À: sami73232@gmail.com
Répondre à: Jean Dupont <jean@example.com>
Sujet: Demande de devis

┌──────────────────────────────────┐
│ 📧 Nouveau message de contact    │
│ Manos Expertas                   │
└──────────────────────────────────┘

👤 Nom: Jean Dupont
📧 Email: jean@example.com
📱 Téléphone: +34 600 000 000
📋 Sujet: Demande de devis

💬 Message:
Bonjour, je souhaite...

Date: 15/01/2025 10:30:00
```

## Sécurité

### ✅ Mesures implémentées

1. **Validation stricte** des emails (regex)
2. **Échappement HTML** pour prévenir les injections
3. **Rate limiting** (à implémenter au niveau serveur)
4. **Variables d'environnement** pour les credentials
5. **CORS** configuré sur le backend
6. **Mot de passe d'application** Gmail (pas le mot de passe principal)

### 🔒 Recommandations

- Ne jamais commiter les fichiers `.env`
- Utiliser HTTPS en production
- Implémenter un CAPTCHA pour éviter le spam
- Ajouter un rate limiting (max 5 emails/heure par IP)
- Logger les tentatives d'envoi pour détecter les abus

## Déploiement

### Backend (Serveur SMTP)

**Option 1: Serveur dédié**
```bash
# Sur votre serveur
git clone your-repo
cd server
npm install --production
pm2 start emailServer.js --name manos-smtp
```

**Option 2: Serverless (Vercel, Netlify Functions)**
```javascript
// api/send-email.js (Vercel Function)
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  // Votre logique d'envoi ici
}
```

### Frontend

```bash
# Build pour production
npm run build

# Déployer sur Vercel, Netlify, etc.
```

## Alternatives SMTP

Si Gmail ne fonctionne pas, alternatives gratuites:

1. **SendGrid** (100 emails/jour gratuit)
2. **Mailgun** (5000 emails/mois gratuit)
3. **EmailJS** (200 emails/mois gratuit)
4. **Formspree** (50 soumissions/mois gratuit)

Configuration SendGrid:
```bash
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASSWORD=your_sendgrid_api_key
```

## Troubleshooting

### Email non reçu
- Vérifier les logs du serveur
- Vérifier le dossier spam
- Vérifier les credentials Gmail
- Vérifier que la validation en 2 étapes est activée

### Erreur "Invalid credentials"
- Régénérer le mot de passe d'application Gmail
- Vérifier que SMTP_USER est correct

### Erreur de connexion
- Vérifier que le port 587 n'est pas bloqué
- Essayer avec le port 465 (SMTP_SECURE=true)

## Support

Pour toute question:
- 📧 Email: sami73232@gmail.com
- 📱 WhatsApp: +34 900 123 456

---

✅ **Statut**: Configuration prête  
🚀 **Prochaines étapes**: Déployer le backend et tester en production
