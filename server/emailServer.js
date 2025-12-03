// Backend Node.js pour l'envoi d'emails via SMTP
// À déployer séparément ou intégrer dans votre backend existant

import express from 'express';
import nodemailer from 'nodemailer';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Configuration du transporteur SMTP
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true', // true pour 465, false pour les autres ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });
};

// Route de santé
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Route d'envoi d'email
app.post('/api/send-email', async (req, res) => {
  try {
    const { to, from, replyTo, subject, html, text } = req.body;

    // Validation
    if (!to || !subject || (!html && !text)) {
      return res.status(400).json({
        success: false,
        message: 'Champs requis manquants',
      });
    }

    // Créer le transporteur
    const transporter = createTransporter();

    // Vérifier la connexion
    await transporter.verify();

    // Options de l'email
    const mailOptions = {
      from: `"${from.name}" <${from.email}>`,
      to: to,
      replyTo: replyTo ? `"${replyTo.name}" <${replyTo.email}>` : undefined,
      subject: subject,
      text: text,
      html: html,
    };

    // Envoyer l'email
    const info = await transporter.sendMail(mailOptions);

    console.log('✅ Email envoyé:', info.messageId);

    res.json({
      success: true,
      message: 'Email envoyé avec succès',
      messageId: info.messageId,
    });
  } catch (error) {
    console.error('❌ Erreur lors de l\'envoi de l\'email:', error);
    res.status(500).json({
      success: false,
      message: 'Erreur lors de l\'envoi de l\'email',
      error: error.message,
    });
  }
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`🚀 Serveur SMTP démarré sur le port ${PORT}`);
  console.log(`📧 Configuration SMTP:`);
  console.log(`   - Host: ${process.env.SMTP_HOST}`);
  console.log(`   - Port: ${process.env.SMTP_PORT}`);
  console.log(`   - User: ${process.env.SMTP_USER}`);
  console.log(`   - From: ${process.env.SMTP_FROM_EMAIL}`);
});

export default app;
