/**
 * Exemples d'utilisation du service Gemma
 * 
 * Ce fichier contient des exemples concrets d'intégration
 * du service sécurisé Gemma dans différents contextes.
 */

import gemmaService from './services/gemmaService';

// ============================================
// EXEMPLE 1 : Utilisation basique
// ============================================

export async function exempleBasique() {
  try {
    const response = await gemmaService.sendMessage('Necesito un electricista');
    console.log('Réponse:', response.message);
    console.log('Du cache?', response.fromCache);
  } catch (error) {
    console.error('Erreur:', error.message);
  }
}

// ============================================
// EXEMPLE 2 : Avec contexte
// ============================================

export async function exempleAvecContexte() {
  const context = {
    previousMessages: [
      { text: 'Hola', isBot: false },
      { text: 'Hola! ¿En qué puedo ayudarte?', isBot: true }
    ],
    userLocation: 'Madrid',
    serviceType: 'electricidad',
    urgency: 'normal'
  };

  try {
    const response = await gemmaService.sendMessage(
      'Necesito un presupuesto',
      context
    );
    console.log('Réponse avec contexte:', response.message);
  } catch (error) {
    console.error('Erreur:', error.message);
  }
}

// ============================================
// EXEMPLE 3 : Gestion complète des erreurs
// ============================================

export async function exempleGestionErreurs(userMessage) {
  try {
    const response = await gemmaService.sendMessage(userMessage);
    return {
      success: true,
      message: response.message,
      fromCache: response.fromCache
    };
    
  } catch (error) {
    // Gestion spécifique par type d'erreur
    if (error.message.includes('Trop de requêtes')) {
      return {
        success: false,
        error: 'rate_limit',
        message: 'Por favor, espera un momento antes de enviar más mensajes.',
        retryAfter: 60000 // 1 minute
      };
      
    } else if (error.message.includes('trop long')) {
      return {
        success: false,
        error: 'message_too_long',
        message: 'Tu mensaje es demasiado largo. Por favor, acórtalo.',
        maxLength: 1000
      };
      
    } else if (error.message.includes('Timeout')) {
      return {
        success: false,
        error: 'timeout',
        message: 'La respuesta está tardando demasiado. Intenta de nuevo.',
        canRetry: true
      };
      
    } else if (error.message.includes('invalide')) {
      return {
        success: false,
        error: 'invalid_input',
        message: 'Tu mensaje contiene caracteres no válidos.',
        suggestion: 'Evita usar caracteres especiales'
      };
      
    } else {
      return {
        success: false,
        error: 'unknown',
        message: 'Ha ocurrido un error. Por favor, contacta con soporte.',
        errorDetails: error.message
      };
    }
  }
}

// ============================================
// EXEMPLE 4 : Composant React complet
// ============================================

import { useState, useEffect } from 'react';

export function ChatBotComponent() {
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState(null);
  const [warning, setWarning] = useState(null);

  // Mettre à jour les stats régulièrement
  useEffect(() => {
    const interval = setInterval(() => {
      const currentStats = gemmaService.getStats();
      setStats(currentStats);
      
      // Warning si proche de la limite
      if (currentStats.rateLimitRemaining < 3) {
        setWarning('⚠️ Estás cerca del límite de mensajes');
      } else {
        setWarning(null);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleSend = async () => {
    if (!message.trim() || loading) return;

    setLoading(true);
    const userMsg = message;
    setMessage('');

    // Ajouter le message de l'utilisateur
    setConversation(prev => [...prev, {
      id: Date.now(),
      text: userMsg,
      isBot: false
    }]);

    try {
      // Contexte avec les derniers messages
      const context = {
        previousMessages: conversation.slice(-5),
        timestamp: new Date().toISOString()
      };

      const response = await gemmaService.sendMessage(userMsg, context);

      // Ajouter la réponse du bot
      setConversation(prev => [...prev, {
        id: Date.now() + 1,
        text: response.message,
        isBot: true,
        fromCache: response.fromCache
      }]);

    } catch (error) {
      // Ajouter un message d'erreur
      setConversation(prev => [...prev, {
        id: Date.now() + 1,
        text: `Error: ${error.message}`,
        isBot: true,
        isError: true
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-container">
      {/* Affichage des stats */}
      {stats && (
        <div className="stats-bar">
          <span>Mensajes: {stats.requestCount}/{stats.maxRequestsPerSession}</span>
          <span>Cache: {stats.cacheSize} entradas</span>
          <span>Rate limit: {stats.rateLimitRemaining} disponibles</span>
        </div>
      )}

      {/* Warning */}
      {warning && (
        <div className="warning-banner">{warning}</div>
      )}

      {/* Conversation */}
      <div className="messages">
        {conversation.map(msg => (
          <div key={msg.id} className={msg.isBot ? 'bot-message' : 'user-message'}>
            {msg.text}
            {msg.fromCache && <span className="cache-badge">⚡ Rápido</span>}
            {msg.isError && <span className="error-badge">⚠️ Error</span>}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="input-area">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Escribe tu mensaje..."
          maxLength={1000}
          disabled={loading}
        />
        <button onClick={handleSend} disabled={loading || !message.trim()}>
          {loading ? 'Enviando...' : 'Enviar'}
        </button>
        <div className="char-count">{message.length}/1000</div>
      </div>
    </div>
  );
}

// ============================================
// EXEMPLE 5 : Monitoring et analytics
// ============================================

export class ChatAnalytics {
  constructor() {
    this.metrics = {
      totalMessages: 0,
      successfulMessages: 0,
      failedMessages: 0,
      cachedResponses: 0,
      averageResponseTime: 0,
      errors: []
    };
  }

  async sendWithTracking(message, context) {
    const startTime = Date.now();
    this.metrics.totalMessages++;

    try {
      const response = await gemmaService.sendMessage(message, context);
      
      this.metrics.successfulMessages++;
      if (response.fromCache) {
        this.metrics.cachedResponses++;
      }

      const responseTime = Date.now() - startTime;
      this.updateAverageResponseTime(responseTime);

      // Envoyer à votre service d'analytics
      this.sendToAnalytics({
        type: 'chat_success',
        responseTime,
        fromCache: response.fromCache,
        messageLength: message.length,
        timestamp: Date.now()
      });

      return response;

    } catch (error) {
      this.metrics.failedMessages++;
      this.metrics.errors.push({
        error: error.message,
        message: message.substring(0, 50),
        timestamp: Date.now()
      });

      this.sendToAnalytics({
        type: 'chat_error',
        error: error.message,
        messageLength: message.length,
        timestamp: Date.now()
      });

      throw error;
    }
  }

  updateAverageResponseTime(newTime) {
    const total = this.metrics.successfulMessages;
    const currentAvg = this.metrics.averageResponseTime;
    this.metrics.averageResponseTime = 
      ((currentAvg * (total - 1)) + newTime) / total;
  }

  sendToAnalytics(data) {
    // Intégration avec Google Analytics, Mixpanel, etc.
    console.log('Analytics:', data);
    
    // Exemple avec Google Analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', data.type, {
        event_category: 'chatbot',
        event_label: data.error || 'success',
        value: data.responseTime || 0
      });
    }
  }

  getMetrics() {
    return {
      ...this.metrics,
      successRate: this.metrics.totalMessages > 0
        ? (this.metrics.successfulMessages / this.metrics.totalMessages) * 100
        : 0,
      cacheHitRate: this.metrics.successfulMessages > 0
        ? (this.metrics.cachedResponses / this.metrics.successfulMessages) * 100
        : 0
    };
  }
}

// ============================================
// EXEMPLE 6 : Retry automatique intelligent
// ============================================

export async function sendWithAutoRetry(message, maxRetries = 3) {
  let lastError;
  
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await gemmaService.sendMessage(message);
      return response;
      
    } catch (error) {
      lastError = error;
      
      // Ne pas retry si c'est une erreur de validation
      if (error.message.includes('invalide') || 
          error.message.includes('trop long')) {
        throw error;
      }
      
      // Ne pas retry si rate limit atteint
      if (error.message.includes('Trop de requêtes')) {
        throw error;
      }
      
      // Attendre avant de retry (backoff exponentiel)
      if (attempt < maxRetries) {
        const delay = Math.min(1000 * Math.pow(2, attempt), 10000);
        console.log(`Tentative ${attempt} échouée, retry dans ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  throw new Error(`Échec après ${maxRetries} tentatives: ${lastError.message}`);
}

// ============================================
// EXEMPLE 7 : Queue de messages pour UX fluide
// ============================================

export class MessageQueue {
  constructor() {
    this.queue = [];
    this.processing = false;
  }

  async add(message, callback) {
    this.queue.push({ message, callback });
    
    if (!this.processing) {
      await this.process();
    }
  }

  async process() {
    if (this.queue.length === 0) {
      this.processing = false;
      return;
    }

    this.processing = true;
    const { message, callback } = this.queue.shift();

    try {
      const response = await gemmaService.sendMessage(message);
      callback(null, response);
    } catch (error) {
      callback(error, null);
    }

    // Petit délai entre les messages
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Traiter le prochain
    await this.process();
  }

  clear() {
    this.queue = [];
    this.processing = false;
  }

  getQueueLength() {
    return this.queue.length;
  }
}

// Utilisation
const messageQueue = new MessageQueue();

export function sendMessageQueued(message) {
  return new Promise((resolve, reject) => {
    messageQueue.add(message, (error, response) => {
      if (error) reject(error);
      else resolve(response);
    });
  });
}

// ============================================
// EXEMPLE 8 : Débogage et développement
// ============================================

export const debugHelpers = {
  // Tester toutes les fonctionnalités
  async runFullTest() {
    console.log('🧪 Test complet du service Gemma\n');

    // Test 1: Message simple
    console.log('1️⃣ Message simple...');
    await exempleBasique();

    // Test 2: Avec contexte
    console.log('\n2️⃣ Message avec contexte...');
    await exempleAvecContexte();

    // Test 3: Stats
    console.log('\n3️⃣ Statistiques de session...');
    console.log(gemmaService.getStats());

    // Test 4: Reset
    console.log('\n4️⃣ Reset du service...');
    gemmaService.reset();
    console.log('Service réinitialisé:', gemmaService.getStats());

    console.log('\n✅ Tests terminés!');
  },

  // Simuler une conversation
  async simulateConversation() {
    const messages = [
      'Hola',
      'Necesito un electricista',
      '¿Cuánto cuesta?',
      'Estoy en Madrid',
      'Gracias'
    ];

    console.log('💬 Simulation de conversation\n');

    for (let i = 0; i < messages.length; i++) {
      console.log(`Usuario: ${messages[i]}`);
      
      try {
        const response = await gemmaService.sendMessage(messages[i]);
        console.log(`Bot: ${response.message}\n`);
        await new Promise(resolve => setTimeout(resolve, 1000));
      } catch (error) {
        console.log(`❌ Error: ${error.message}\n`);
      }
    }
  },

  // Tester la performance
  async testPerformance(iterations = 10) {
    console.log(`⚡ Test de performance (${iterations} messages)\n`);
    
    const times = [];
    gemmaService.reset();

    for (let i = 0; i < iterations; i++) {
      const start = Date.now();
      
      try {
        await gemmaService.sendMessage(`Test message ${i}`);
        const duration = Date.now() - start;
        times.push(duration);
        console.log(`Message ${i + 1}: ${duration}ms`);
      } catch (error) {
        console.log(`Message ${i + 1}: Erreur - ${error.message}`);
      }
    }

    const avg = times.reduce((a, b) => a + b, 0) / times.length;
    const min = Math.min(...times);
    const max = Math.max(...times);

    console.log(`\n📊 Résultats:`);
    console.log(`  Moyenne: ${avg.toFixed(2)}ms`);
    console.log(`  Min: ${min}ms`);
    console.log(`  Max: ${max}ms`);
  }
};

// Exposer les helpers dans la console
if (typeof window !== 'undefined') {
  window.gemmaExamples = {
    ...debugHelpers,
    basic: exempleBasique,
    withContext: exempleAvecContexte,
    withErrorHandling: exempleGestionErreurs,
    autoRetry: sendWithAutoRetry,
    queued: sendMessageQueued
  };
  
  console.log('💡 Exemples disponibles dans window.gemmaExamples');
  console.log('   - basic() : Exemple basique');
  console.log('   - withContext() : Avec contexte');
  console.log('   - runFullTest() : Test complet');
  console.log('   - simulateConversation() : Simulation');
  console.log('   - testPerformance(10) : Test de perf');
}

export default {
  exempleBasique,
  exempleAvecContexte,
  exempleGestionErreurs,
  ChatBotComponent,
  ChatAnalytics,
  sendWithAutoRetry,
  MessageQueue,
  sendMessageQueued,
  debugHelpers
};
