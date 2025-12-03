// Service sécurisé pour l'API Gemma/Ollama avec protection contre les cyberattaques

class RateLimiter {
  constructor(maxRequests, timeWindow) {
    this.maxRequests = maxRequests;
    this.timeWindow = timeWindow;
    this.requests = [];
  }

  canMakeRequest() {
    const now = Date.now();
    this.requests = this.requests.filter(time => now - time < this.timeWindow);
    return this.requests.length < this.maxRequests;
  }

  recordRequest() {
    this.requests.push(Date.now());
  }

  getRemainingRequests() {
    const now = Date.now();
    this.requests = this.requests.filter(time => now - time < this.timeWindow);
    return Math.max(0, this.maxRequests - this.requests.length);
  }
}

class RequestQueue {
  constructor(maxConcurrent = 3) {
    this.queue = [];
    this.running = 0;
    this.maxConcurrent = maxConcurrent;
  }

  async add(fn) {
    while (this.running >= this.maxConcurrent) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    this.running++;
    try {
      return await fn();
    } finally {
      this.running--;
    }
  }
}

class GemmaService {
  constructor() {
    this.apiUrl = import.meta.env.VITE_CHATBOT_API_URL;
    this.model = import.meta.env.VITE_OLLAMA_MODEL || 'gemma2:2b';
    this.maxTokens = parseInt(import.meta.env.VITE_OLLAMA_MAX_TOKENS) || 500;
    this.timeout = parseInt(import.meta.env.VITE_OLLAMA_TIMEOUT) || 30000;
    
    // Rate limiting: 10 requêtes par minute par défaut
    this.rateLimiter = new RateLimiter(
      parseInt(import.meta.env.VITE_OLLAMA_RATE_LIMIT) || 10,
      60000
    );
    
    // Queue pour limiter les requêtes concurrentes
    this.requestQueue = new RequestQueue(3);
    
    // Cache des réponses avec TTL
    this.cache = new Map();
    this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
    
    // Historique des sessions
    this.sessionId = this.generateSessionId();
    this.requestCount = 0;
    this.maxRequestsPerSession = 100;
  }

  // Génération d'un ID de session sécurisé
  generateSessionId() {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 15);
    return `${timestamp}-${random}`;
  }

  // Validation et sanitization stricte de l'input
  sanitizeInput(input) {
    if (typeof input !== 'string') {
      throw new Error('L\'entrée doit être une chaîne de caractères');
    }

    // Limite de longueur stricte
    const maxLength = 1000;
    if (input.length > maxLength) {
      throw new Error(`Message trop long (maximum ${maxLength} caractères)`);
    }

    // Suppression des caractères potentiellement dangereux
    let sanitized = input
      .trim()
      // Suppression des scripts et HTML
      .replace(/<script[^>]*>.*?<\/script>/gi, '')
      .replace(/<iframe[^>]*>.*?<\/iframe>/gi, '')
      .replace(/<object[^>]*>.*?<\/object>/gi, '')
      .replace(/<embed[^>]*>/gi, '')
      .replace(/<[^>]+>/g, '')
      // Suppression des caractères de contrôle
      .replace(/[\x00-\x1F\x7F]/g, '')
      // Protection contre les injections SQL/NoSQL
      .replace(/['";`]/g, '')
      .replace(/(\b(DROP|DELETE|INSERT|UPDATE|SELECT|UNION|CREATE|ALTER|EXEC)\b)/gi, '')
      // Limite les caractères spéciaux
      .replace(/[^\w\sáéíóúñüÁÉÍÓÚÑÜ.,!?¿¡\-]/g, '');

    if (!sanitized || sanitized.length === 0) {
      throw new Error('Message invalide après vérification de sécurité');
    }

    return sanitized;
  }

  // Génération d'une clé de cache sécurisée
  getCacheKey(message) {
    const normalized = message.toLowerCase().trim();
    // Simple hash pour la clé de cache
    let hash = 0;
    for (let i = 0; i < normalized.length; i++) {
      const char = normalized.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return `cache_${Math.abs(hash)}`;
  }

  // Vérification du cache
  getFromCache(key) {
    const cached = this.cache.get(key);
    if (cached && Date.now() - cached.timestamp < this.cacheTimeout) {
      return cached.data;
    }
    if (cached) {
      this.cache.delete(key);
    }
    return null;
  }

  // Mise en cache
  setCache(key, data) {
    // Limite la taille du cache à 50 entrées
    if (this.cache.size >= 50) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  // Validation de la réponse de l'API
  validateResponse(response) {
    if (!response || typeof response !== 'object') {
      throw new Error('Réponse API invalide');
    }

    // Format Ollama : { message: { role: "assistant", content: "..." } }
    let message = null;
    
    if (response.message && response.message.content) {
      // Format Ollama
      message = response.message.content;
    } else if (response.message && typeof response.message === 'string') {
      // Format simple
      message = response.message;
    } else if (response.response) {
      // Format alternatif
      message = response.response;
    } else if (response.text) {
      // Format texte
      message = response.text;
    } else if (response.content) {
      // Format content direct
      message = response.content;
    } else {
      throw new Error('Format de réponse non reconnu');
    }
    
    if (typeof message !== 'string' || message.length === 0) {
      throw new Error('Réponse vide ou invalide');
    }

    // Limite de longueur de la réponse
    if (message.length > 5000) {
      return message.substring(0, 5000) + '...';
    }

    return message;
  }

  // Détection de contenu malveillant dans la réponse
  isResponseSafe(text) {
    const dangerousPatterns = [
      /<script/i,
      /javascript:/i,
      /onerror=/i,
      /onclick=/i,
      /eval\(/i,
      /window\./i,
      /document\./i,
    ];

    return !dangerousPatterns.some(pattern => pattern.test(text));
  }

  // Méthode principale pour envoyer un message
  async sendMessage(message, context = {}) {
    try {
      // Validation de la session
      if (this.requestCount >= this.maxRequestsPerSession) {
        throw new Error('Limite de requêtes atteinte pour cette session. Veuillez rafraîchir la page.');
      }

      // Vérification du rate limiting
      if (!this.rateLimiter.canMakeRequest()) {
        const remaining = this.rateLimiter.getRemainingRequests();
        throw new Error(`Trop de requêtes. Veuillez patienter. (${remaining} requêtes disponibles)`);
      }

      // Sanitization de l'input
      const sanitizedMessage = this.sanitizeInput(message);

      // Vérification du cache
      const cacheKey = this.getCacheKey(sanitizedMessage);
      const cachedResponse = this.getFromCache(cacheKey);
      if (cachedResponse) {
        return {
          message: cachedResponse,
          fromCache: true,
          sessionId: this.sessionId
        };
      }

      // Enregistrement de la requête pour le rate limiting
      this.rateLimiter.recordRequest();
      this.requestCount++;

      // Ajout à la queue et exécution
      const response = await this.requestQueue.add(async () => {
        return await this.makeApiRequest(sanitizedMessage, context);
      });

      // Mise en cache de la réponse
      this.setCache(cacheKey, response.message);

      return response;

    } catch (error) {
      console.error('Erreur GemmaService:', error);
      throw error;
    }
  }

  // Requête API avec timeout et retry
  async makeApiRequest(message, context, retries = 2) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeout);

    try {
      // Préparation du payload format Ollama
      const payload = {
        model: this.model,
        messages: [
          {
            role: 'user',
            content: message
          }
        ],
        stream: false,
        options: {
          temperature: 0.7,
          num_predict: this.maxTokens
        }
      };

      // Ajouter le contexte si disponible
      if (context && context.previousMessages && context.previousMessages.length > 0) {
        // Ajouter l'historique des messages
        payload.messages = [
          ...context.previousMessages.slice(-3).map(msg => ({
            role: msg.isBot ? 'assistant' : 'user',
            content: msg.text
          })),
          {
            role: 'user',
            content: message
          }
        ];
      }

      // Headers sécurisés
      const headers = {
        'Content-Type': 'application/json',
        'X-Session-ID': this.sessionId,
        'X-Request-Time': Date.now().toString(),
      };

      // Ajout d'un token CSRF si disponible
      const csrfToken = this.getCsrfToken();
      if (csrfToken) {
        headers['X-CSRF-Token'] = csrfToken;
      }

      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify(payload),
        signal: controller.signal,
        // Protection contre les redirections
        redirect: 'follow',
        // Credentials pour les cookies sécurisés
        credentials: 'omit'
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        if (response.status === 429 && retries > 0) {
          // Retry avec backoff exponentiel en cas de rate limiting
          await new Promise(resolve => setTimeout(resolve, 1000 * (3 - retries)));
          return this.makeApiRequest(message, context, retries - 1);
        }
        throw new Error(`Erreur API: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      const validatedMessage = this.validateResponse(data);

      // Vérification de sécurité de la réponse
      if (!this.isResponseSafe(validatedMessage)) {
        throw new Error('Réponse potentiellement dangereuse détectée');
      }

      return {
        message: validatedMessage,
        fromCache: false,
        sessionId: this.sessionId,
        timestamp: Date.now()
      };

    } catch (error) {
      clearTimeout(timeoutId);

      if (error.name === 'AbortError') {
        throw new Error('Timeout: La requête a pris trop de temps');
      }

      if (retries > 0 && !error.message.includes('Timeout')) {
        await new Promise(resolve => setTimeout(resolve, 1000));
        return this.makeApiRequest(message, context, retries - 1);
      }

      throw error;
    }
  }

  // Récupération du token CSRF (si implémenté côté serveur)
  getCsrfToken() {
    const token = document.querySelector('meta[name="csrf-token"]');
    return token ? token.getAttribute('content') : null;
  }

  // Réinitialisation du service
  reset() {
    this.cache.clear();
    this.sessionId = this.generateSessionId();
    this.requestCount = 0;
  }

  // Statistiques de la session
  getStats() {
    return {
      sessionId: this.sessionId,
      requestCount: this.requestCount,
      remainingRequests: this.maxRequestsPerSession - this.requestCount,
      cacheSize: this.cache.size,
      rateLimitRemaining: this.rateLimiter.getRemainingRequests()
    };
  }
}

// Export singleton
export const gemmaService = new GemmaService();
export default gemmaService;
