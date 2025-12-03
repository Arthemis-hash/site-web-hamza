/**
 * Configuration des headers de sécurité pour la production
 * 
 * Ces headers doivent être configurés sur votre serveur web (Nginx, Apache, etc.)
 * ou via votre plateforme de déploiement (Vercel, Netlify, etc.)
 */

export const securityHeaders = {
  // Content Security Policy - Protection XSS
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://maps.googleapis.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: https: blob:",
    "font-src 'self' https://fonts.gstatic.com",
    "connect-src 'self' http://ai.jobsacademie.tech https://maps.googleapis.com",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self'"
  ].join('; '),

  // Protection contre le clickjacking
  'X-Frame-Options': 'DENY',

  // Protection XSS du navigateur
  'X-Content-Type-Options': 'nosniff',

  // Politique de référent
  'Referrer-Policy': 'strict-origin-when-cross-origin',

  // Forcer HTTPS
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',

  // Permissions de l'API navigateur
  'Permissions-Policy': [
    'camera=()',
    'microphone=()',
    'geolocation=(self)',
    'payment=()'
  ].join(', ')
};

/**
 * Configuration Nginx
 * 
 * Ajoutez ceci à votre configuration Nginx:
 * 
 * server {
 *   # ... configuration existante ...
 * 
 *   # Headers de sécurité
 *   add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://maps.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https: blob:; font-src 'self' https://fonts.gstatic.com; connect-src 'self' http://ai.jobsacademie.tech https://maps.googleapis.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self'";
 *   add_header X-Frame-Options "DENY";
 *   add_header X-Content-Type-Options "nosniff";
 *   add_header Referrer-Policy "strict-origin-when-cross-origin";
 *   add_header Strict-Transport-Security "max-age=31536000; includeSubDomains; preload";
 *   add_header Permissions-Policy "camera=(), microphone=(), geolocation=(self), payment=()";
 * 
 *   # Rate limiting
 *   limit_req_zone $binary_remote_addr zone=api:10m rate=10r/m;
 *   
 *   location /api/ {
 *     limit_req zone=api burst=5;
 *     proxy_pass http://backend;
 *   }
 * }
 */

/**
 * Configuration Vercel
 * 
 * Créez un fichier vercel.json à la racine:
 * 
 * {
 *   "headers": [
 *     {
 *       "source": "/(.*)",
 *       "headers": [
 *         {
 *           "key": "Content-Security-Policy",
 *           "value": "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://maps.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https: blob:; font-src 'self' https://fonts.gstatic.com; connect-src 'self' http://ai.jobsacademie.tech https://maps.googleapis.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self'"
 *         },
 *         {
 *           "key": "X-Frame-Options",
 *           "value": "DENY"
 *         },
 *         {
 *           "key": "X-Content-Type-Options",
 *           "value": "nosniff"
 *         },
 *         {
 *           "key": "Referrer-Policy",
 *           "value": "strict-origin-when-cross-origin"
 *         },
 *         {
 *           "key": "Strict-Transport-Security",
 *           "value": "max-age=31536000; includeSubDomains; preload"
 *         },
 *         {
 *           "key": "Permissions-Policy",
 *           "value": "camera=(), microphone=(), geolocation=(self), payment=()"
 *         }
 *       ]
 *     }
 *   ]
 * }
 */

/**
 * Configuration Netlify
 * 
 * Créez un fichier netlify.toml à la racine:
 * 
 * [[headers]]
 *   for = "/*"
 *   [headers.values]
 *     Content-Security-Policy = "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://maps.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https: blob:; font-src 'self' https://fonts.gstatic.com; connect-src 'self' http://ai.jobsacademie.tech https://maps.googleapis.com; frame-ancestors 'none'; base-uri 'self'; form-action 'self'"
 *     X-Frame-Options = "DENY"
 *     X-Content-Type-Options = "nosniff"
 *     Referrer-Policy = "strict-origin-when-cross-origin"
 *     Strict-Transport-Security = "max-age=31536000; includeSubDomains; preload"
 *     Permissions-Policy = "camera=(), microphone=(), geolocation=(self), payment=()"
 */

export default securityHeaders;
