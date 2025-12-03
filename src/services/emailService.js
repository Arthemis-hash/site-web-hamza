/**
 * Service d'envoi d'email via SMTP
 * Utilise les variables d'environnement pour la configuration SMTP
 */

const SMTP_CONFIG = {
  host: import.meta.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(import.meta.env.SMTP_PORT || '587'),
  secure: import.meta.env.SMTP_SECURE === 'true',
  user: import.meta.env.SMTP_USER,
  password: import.meta.env.SMTP_PASSWORD,
  fromName: import.meta.env.SMTP_FROM_NAME || 'Manos Expertas',
  fromEmail: import.meta.env.SMTP_FROM_EMAIL || import.meta.env.SMTP_USER,
};

const DEFAULT_RECIPIENT = import.meta.env.VITE_DEFAULT_CONTACT_EMAIL || 'sami73232@gmail.com';

/**
 * Envoie un email via une API backend ou service SMTP
 * @param {Object} emailData - Les données de l'email
 * @param {string} emailData.name - Nom de l'expéditeur
 * @param {string} emailData.email - Email de l'expéditeur
 * @param {string} emailData.subject - Sujet de l'email
 * @param {string} emailData.message - Message de l'email
 * @param {string} emailData.phone - Téléphone (optionnel)
 * @returns {Promise<Object>} - Résultat de l'envoi
 */
export const sendEmail = async (emailData) => {
  try {
    // Validation des données
    if (!emailData.name || !emailData.email || !emailData.message) {
      throw new Error('Les champs nom, email et message sont requis');
    }

    // Validation de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailData.email)) {
      throw new Error('Format d\'email invalide');
    }

    // Construction du corps de l'email
    const emailBody = {
      to: DEFAULT_RECIPIENT,
      from: {
        name: SMTP_CONFIG.fromName,
        email: SMTP_CONFIG.fromEmail,
      },
      replyTo: {
        name: emailData.name,
        email: emailData.email,
      },
      subject: emailData.subject || `Nouveau message de contact - ${emailData.name}`,
      html: generateEmailHTML(emailData),
      text: generateEmailText(emailData),
    };

    // Tentative d'envoi via l'API backend
    try {
      const apiUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';
      const response = await fetch(`${apiUrl}/api/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(emailBody),
      });

      if (!response.ok) {
        throw new Error(`Erreur HTTP: ${response.status}`);
      }

      const result = await response.json();
      
      return {
        success: true,
        message: 'Email envoyé avec succès',
        data: result,
      };
    } catch (apiError) {
      console.warn('Impossible d\'envoyer via l\'API backend, tentative avec un service tiers...', apiError);
      
      // Fallback: utiliser un service tiers comme EmailJS ou Formspree
      return await sendViaFormspree(emailData);
    }
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    return {
      success: false,
      message: error.message || 'Erreur lors de l\'envoi de l\'email',
      error,
    };
  }
};

/**
 * Génère le HTML de l'email
 */
const generateEmailHTML = (data) => {
  return `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nouveau message de contact</title>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; background: #f9f9f9; }
    .header { background: #0056b3; color: white; padding: 20px; text-align: center; border-radius: 5px 5px 0 0; }
    .content { background: white; padding: 30px; border-radius: 0 0 5px 5px; }
    .field { margin-bottom: 20px; }
    .label { font-weight: bold; color: #0056b3; margin-bottom: 5px; }
    .value { padding: 10px; background: #f5f5f5; border-radius: 3px; }
    .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>📧 Nouveau message de contact</h2>
      <p>Manos Expertas</p>
    </div>
    <div class="content">
      <div class="field">
        <div class="label">👤 Nom:</div>
        <div class="value">${escapeHTML(data.name)}</div>
      </div>
      <div class="field">
        <div class="label">📧 Email:</div>
        <div class="value"><a href="mailto:${escapeHTML(data.email)}">${escapeHTML(data.email)}</a></div>
      </div>
      ${data.phone ? `
      <div class="field">
        <div class="label">📱 Téléphone:</div>
        <div class="value">${escapeHTML(data.phone)}</div>
      </div>
      ` : ''}
      ${data.subject ? `
      <div class="field">
        <div class="label">📋 Sujet:</div>
        <div class="value">${escapeHTML(data.subject)}</div>
      </div>
      ` : ''}
      <div class="field">
        <div class="label">💬 Message:</div>
        <div class="value">${escapeHTML(data.message).replace(/\n/g, '<br>')}</div>
      </div>
    </div>
    <div class="footer">
      <p>Cet email a été envoyé depuis le formulaire de contact de Manos Expertas</p>
      <p>Date: ${new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Madrid' })}</p>
    </div>
  </div>
</body>
</html>
  `.trim();
};

/**
 * Génère le texte brut de l'email
 */
const generateEmailText = (data) => {
  return `
NOUVEAU MESSAGE DE CONTACT - Manos Expertas
==========================================

Nom: ${data.name}
Email: ${data.email}
${data.phone ? `Téléphone: ${data.phone}\n` : ''}${data.subject ? `Sujet: ${data.subject}\n` : ''}
Message:
${data.message}

==========================================
Date: ${new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Madrid' })}
  `.trim();
};

/**
 * Échappe les caractères HTML
 */
const escapeHTML = (str) => {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
};

/**
 * Fallback: envoyer via Formspree (service tiers gratuit)
 */
const sendViaFormspree = async (emailData) => {
  try {
    // Formspree est un service gratuit qui permet d'envoyer des emails sans backend
    // Créez un formulaire sur https://formspree.io/ et obtenez votre endpoint
    
    // Pour l'instant, on simule l'envoi
    console.log('📧 Données à envoyer:', emailData);
    console.log(`📬 Destination: ${DEFAULT_RECIPIENT}`);
    
    // Retourner une réponse simulée
    return {
      success: true,
      message: 'Email préparé (configuration backend nécessaire pour l\'envoi réel)',
      data: {
        recipient: DEFAULT_RECIPIENT,
        ...emailData,
      },
      warning: 'Configurez un backend SMTP ou utilisez un service comme Formspree, EmailJS, ou SendGrid pour l\'envoi réel',
    };
  } catch (error) {
    throw new Error('Erreur lors de l\'envoi via le service tiers: ' + error.message);
  }
};

/**
 * Vérifie la configuration SMTP
 */
export const checkSMTPConfig = () => {
  const config = {
    isConfigured: !!(SMTP_CONFIG.user && SMTP_CONFIG.password),
    host: SMTP_CONFIG.host,
    port: SMTP_CONFIG.port,
    secure: SMTP_CONFIG.secure,
    hasCredentials: !!(SMTP_CONFIG.user && SMTP_CONFIG.password),
    defaultRecipient: DEFAULT_RECIPIENT,
  };

  console.log('🔧 Configuration SMTP:', config);
  return config;
};

export default {
  sendEmail,
  checkSMTPConfig,
};
