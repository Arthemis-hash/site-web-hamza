# 📧 Backend SMTP - Manos Expertas

## Description

Serveur Express.js pour l'envoi d'emails via SMTP (Gmail) pour le formulaire de contact de Manos Expertas.

## Installation

```bash
# Installer les dépendances
npm install

# Copier les variables d'environnement
cp ../.env .env

# Ou créer un fichier .env avec:
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=sami73232@gmail.com
SMTP_PASSWORD=your_app_password_here
```

## Démarrage

```bash
# Mode production
npm start

# Mode développement (avec nodemon)
npm run dev
```

Le serveur démarre sur `http://localhost:3000`

## Configuration Gmail

### Obtenir un mot de passe d'application

1. Allez sur https://myaccount.google.com/
2. Sécurité → Validation en deux étapes (activez-la)
3. Sécurité → Mots de passe des applications
4. Générez un nouveau mot de passe
5. Copiez-le dans `SMTP_PASSWORD`

## API Endpoints

### GET /health
Vérification de l'état du serveur

**Réponse:**
```json
{
  "status": "OK",
  "timestamp": "2024-01-15T10:30:00.000Z"
}
```

### POST /api/send-email
Envoi d'un email

**Body:**
```json
{
  "to": "sami73232@gmail.com",
  "from": {
    "name": "Manos Expertas",
    "email": "sami73232@gmail.com"
  },
  "replyTo": {
    "name": "Jean Dupont",
    "email": "jean@example.com"
  },
  "subject": "Nouveau message de contact",
  "html": "<p>Message HTML</p>",
  "text": "Message texte"
}
```

**Réponse succès:**
```json
{
  "success": true,
  "message": "Email envoyé avec succès",
  "messageId": "<unique-id@gmail.com>"
}
```

**Réponse erreur:**
```json
{
  "success": false,
  "message": "Erreur lors de l'envoi de l'email",
  "error": "Description de l'erreur"
}
```

## Déploiement

### Option 1: Serveur VPS/Cloud

```bash
# Sur votre serveur
git clone your-repo
cd site-web-hamza/server
npm install --production
pm2 start emailServer.js --name manos-smtp
pm2 save
pm2 startup
```

### Option 2: Vercel Serverless Function

Créez `api/send-email.js`:

```javascript
import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    const { to, from, replyTo, subject, html, text } = req.body;

    await transporter.sendMail({
      from: `"${from.name}" <${from.email}>`,
      to,
      replyTo: `"${replyTo.name}" <${replyTo.email}>`,
      subject,
      html,
      text,
    });

    res.json({ success: true, message: 'Email envoyé' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
```

Configurez `vercel.json`:

```json
{
  "env": {
    "SMTP_HOST": "@smtp_host",
    "SMTP_PORT": "@smtp_port",
    "SMTP_USER": "@smtp_user",
    "SMTP_PASSWORD": "@smtp_password"
  }
}
```

Ajoutez les variables dans Vercel Dashboard.

### Option 3: Netlify Functions

Créez `netlify/functions/send-email.js`:

```javascript
const nodemailer = require('nodemailer');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ message: 'Method not allowed' }),
    };
  }

  try {
    const data = JSON.parse(event.body);
    
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"${data.from.name}" <${data.from.email}>`,
      to: data.to,
      replyTo: `"${data.replyTo.name}" <${data.replyTo.email}>`,
      subject: data.subject,
      html: data.html,
      text: data.text,
    });

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: error.message }),
    };
  }
};
```

## Sécurité

- ✅ CORS activé (configurez les domaines autorisés)
- ✅ Variables d'environnement pour les credentials
- ✅ Validation des données côté serveur
- ⚠️ Ajoutez un rate limiting (recommandé)
- ⚠️ Ajoutez un CAPTCHA côté client (recommandé)

## Monitoring

### Logs

```bash
# Avec PM2
pm2 logs manos-smtp

# Avec Node.js
node emailServer.js
```

### Health Check

```bash
curl http://localhost:3000/health
```

## Troubleshooting

### Erreur "Invalid login"
- Vérifiez que la validation en 2 étapes est activée
- Régénérez le mot de passe d'application
- Vérifiez `SMTP_USER` et `SMTP_PASSWORD`

### Erreur "Connection timeout"
- Vérifiez que le port 587 n'est pas bloqué
- Essayez avec le port 465 (`SMTP_SECURE=true`)

### Email non reçu
- Vérifiez les logs du serveur
- Vérifiez le dossier spam
- Testez avec un autre email

## Support

- 📧 Email: sami73232@gmail.com
- 📚 Documentation: ../docs/EMAIL_SMTP_SETUP.md

---

**Version**: 1.0.0  
**Port**: 3000  
**Email destination**: sami73232@gmail.com
