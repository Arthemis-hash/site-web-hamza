// src/utils/security.js

/**
 * Security utilities for frontend protection
 */

/**
 * Sanitize user input to prevent XSS attacks
 * @param {string} input - User input to sanitize
 * @returns {string} - Sanitized input
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;

  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
  };

  return input.replace(/[&<>"'/]/g, (char) => map[char]);
};

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} - True if valid email
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number (Spanish format)
 * @param {string} phone - Phone number to validate
 * @returns {boolean} - True if valid phone
 */
export const isValidPhone = (phone) => {
  const phoneRegex = /^[+]?[0-9\s-()]{9,}$/;
  return phoneRegex.test(phone);
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {object} - Validation result with errors array
 */
export const validatePasswordStrength = (password) => {
  const errors = [];

  if (password.length < 8) {
    errors.push('Mínimo 8 caracteres');
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Una letra mayúscula');
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Una letra minúscula');
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Un número');
  }
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('Un carácter especial');
  }

  return {
    isValid: errors.length === 0,
    errors,
    strength: errors.length === 0 ? 'strong' : errors.length <= 2 ? 'medium' : 'weak'
  };
};

/**
 * Validate URL format
 * @param {string} url - URL to validate
 * @returns {boolean} - True if valid URL
 */
export const isValidUrl = (url) => {
  try {
    const urlObj = new URL(url);
    return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
  } catch {
    return false;
  }
};

/**
 * Prevent common injection attacks in strings
 * @param {string} input - Input to check
 * @returns {boolean} - True if input contains suspicious patterns
 */
export const containsSuspiciousPatterns = (input) => {
  if (typeof input !== 'string') return false;

  const suspiciousPatterns = [
    /<script[\s\S]*?>[\s\S]*?<\/script>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi,
    /<iframe/gi,
    /eval\s*\(/gi,
    /expression\s*\(/gi,
  ];

  return suspiciousPatterns.some(pattern => pattern.test(input));
};

/**
 * Rate limiting tracker for API calls
 */
class RateLimiter {
  constructor(maxRequests = 10, timeWindow = 60000) {
    this.maxRequests = maxRequests;
    this.timeWindow = timeWindow;
    this.requests = new Map();
  }

  /**
   * Check if request is allowed
   * @param {string} key - Identifier for the request (e.g., user ID, IP)
   * @returns {boolean} - True if request is allowed
   */
  isAllowed(key) {
    const now = Date.now();
    const userRequests = this.requests.get(key) || [];

    // Remove old requests outside the time window
    const recentRequests = userRequests.filter(
      timestamp => now - timestamp < this.timeWindow
    );

    if (recentRequests.length >= this.maxRequests) {
      return false;
    }

    recentRequests.push(now);
    this.requests.set(key, recentRequests);

    return true;
  }

  /**
   * Reset rate limit for a key
   * @param {string} key - Identifier to reset
   */
  reset(key) {
    this.requests.delete(key);
  }

  /**
   * Get remaining requests
   * @param {string} key - Identifier
   * @returns {number} - Number of remaining requests
   */
  getRemaining(key) {
    const now = Date.now();
    const userRequests = this.requests.get(key) || [];
    const recentRequests = userRequests.filter(
      timestamp => now - timestamp < this.timeWindow
    );

    return Math.max(0, this.maxRequests - recentRequests.length);
  }
}

export const apiRateLimiter = new RateLimiter(20, 60000); // 20 requests per minute

/**
 * Secure local storage wrapper with encryption
 */
export const secureStorage = {
  /**
   * Simple encryption (for demo purposes - use a proper library in production)
   * @param {string} data - Data to encrypt
   * @returns {string} - Encrypted data
   */
  encrypt(data) {
    // In production, use a proper encryption library like crypto-js
    return btoa(JSON.stringify(data));
  },

  /**
   * Simple decryption (for demo purposes)
   * @param {string} data - Data to decrypt
   * @returns {any} - Decrypted data
   */
  decrypt(data) {
    try {
      return JSON.parse(atob(data));
    } catch {
      return null;
    }
  },

  /**
   * Set item in secure storage
   * @param {string} key - Storage key
   * @param {any} value - Value to store
   */
  setItem(key, value) {
    try {
      const encrypted = this.encrypt(value);
      localStorage.setItem(key, encrypted);
    } catch (error) {
      console.error('Error storing data:', error);
    }
  },

  /**
   * Get item from secure storage
   * @param {string} key - Storage key
   * @returns {any} - Stored value or null
   */
  getItem(key) {
    try {
      const encrypted = localStorage.getItem(key);
      if (!encrypted) return null;
      return this.decrypt(encrypted);
    } catch (error) {
      console.error('Error retrieving data:', error);
      return null;
    }
  },

  /**
   * Remove item from storage
   * @param {string} key - Storage key
   */
  removeItem(key) {
    localStorage.removeItem(key);
  },

  /**
   * Clear all storage
   */
  clear() {
    localStorage.clear();
  }
};

/**
 * Validate file upload
 * @param {File} file - File to validate
 * @param {object} options - Validation options
 * @returns {object} - Validation result
 */
export const validateFileUpload = (file, options = {}) => {
  const {
    maxSize = 5 * 1024 * 1024, // 5MB default
    allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'application/pdf']
  } = options;

  const errors = [];

  if (!file) {
    errors.push('No se ha seleccionado ningún archivo');
    return { isValid: false, errors };
  }

  if (file.size > maxSize) {
    errors.push(`El archivo es demasiado grande. Máximo ${maxSize / 1024 / 1024}MB`);
  }

  if (!allowedTypes.includes(file.type)) {
    errors.push('Tipo de archivo no permitido');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Generate secure random token
 * @param {number} length - Token length
 * @returns {string} - Random token
 */
export const generateSecureToken = (length = 32) => {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};

/**
 * Debounce function to prevent rapid repeated calls
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in ms
 * @returns {Function} - Debounced function
 */
export const debounce = (func, wait = 300) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

/**
 * Check if user is authenticated (example)
 * @returns {boolean} - True if authenticated
 */
export const isAuthenticated = () => {
  const token = secureStorage.getItem('authToken');
  return !!token;
};

/**
 * Log security events
 * @param {string} event - Event type
 * @param {object} details - Event details
 */
export const logSecurityEvent = (event, details = {}) => {
  if (process.env.NODE_ENV === 'production') {
    // In production, send to logging service
    console.warn('[Security Event]', event, details);
  } else {
    console.log('[Security Event]', event, details);
  }
};

export default {
  sanitizeInput,
  isValidEmail,
  isValidPhone,
  validatePasswordStrength,
  isValidUrl,
  containsSuspiciousPatterns,
  apiRateLimiter,
  secureStorage,
  validateFileUpload,
  generateSecureToken,
  debounce,
  isAuthenticated,
  logSecurityEvent
};
