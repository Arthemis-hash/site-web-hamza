/**
 * Tests de sécurité pour le service Gemma
 * 
 * Ces tests vérifient que toutes les mesures de sécurité fonctionnent correctement.
 * Exécutez ces tests régulièrement pour vous assurer de la protection de l'application.
 */

import gemmaService from '../services/gemmaService';

// Couleurs pour l'affichage console
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m'
};

const log = {
  success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  warning: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`)
};

/**
 * Test 1: Input Sanitization - Protection XSS
 */
async function testXSSProtection() {
  log.info('Test 1: Protection contre les injections XSS');
  
  const xssPayloads = [
    '<script>alert("XSS")</script>',
    '<img src=x onerror=alert(1)>',
    '<iframe src="javascript:alert(1)">',
    '<body onload=alert(1)>',
    'javascript:alert(1)',
  ];

  for (const payload of xssPayloads) {
    try {
      await gemmaService.sendMessage(payload);
      log.error(`XSS non bloqué: ${payload}`);
    } catch (error) {
      if (error.message.includes('invalide')) {
        log.success(`XSS bloqué: ${payload.substring(0, 30)}...`);
      } else {
        log.warning(`Erreur inattendue: ${error.message}`);
      }
    }
  }
}

/**
 * Test 2: Input Sanitization - Protection SQL Injection
 */
async function testSQLInjectionProtection() {
  log.info('Test 2: Protection contre les injections SQL');
  
  const sqlPayloads = [
    "'; DROP TABLE users; --",
    "1' OR '1'='1",
    "admin'--",
    "' UNION SELECT * FROM users--",
    "1; DELETE FROM users WHERE 1=1",
  ];

  for (const payload of sqlPayloads) {
    try {
      await gemmaService.sendMessage(payload);
      log.error(`SQL injection non bloquée: ${payload}`);
    } catch (error) {
      if (error.message.includes('invalide')) {
        log.success(`SQL injection bloquée: ${payload.substring(0, 30)}...`);
      } else {
        log.warning(`Erreur inattendue: ${error.message}`);
      }
    }
  }
}

/**
 * Test 3: Rate Limiting
 */
async function testRateLimiting() {
  log.info('Test 3: Rate Limiting (10 requêtes/minute)');
  
  // Réinitialiser pour commencer à zéro
  gemmaService.reset();
  
  let successCount = 0;
  let blockedCount = 0;

  for (let i = 1; i <= 15; i++) {
    try {
      await gemmaService.sendMessage(`Test message ${i}`);
      successCount++;
    } catch (error) {
      if (error.message.includes('Trop de requêtes') || error.message.includes('Limite')) {
        blockedCount++;
      }
    }
  }

  if (successCount <= 10 && blockedCount >= 5) {
    log.success(`Rate limiting fonctionne: ${successCount} acceptées, ${blockedCount} bloquées`);
  } else {
    log.error(`Rate limiting défaillant: ${successCount} acceptées, ${blockedCount} bloquées`);
  }

  // Réinitialiser
  gemmaService.reset();
}

/**
 * Test 4: Message Length Validation
 */
async function testMessageLengthValidation() {
  log.info('Test 4: Validation de la longueur des messages');
  
  // Message trop long (> 1000 caractères)
  const longMessage = 'A'.repeat(1500);
  
  try {
    await gemmaService.sendMessage(longMessage);
    log.error('Message trop long non bloqué');
  } catch (error) {
    if (error.message.includes('trop long')) {
      log.success('Message trop long bloqué correctement');
    } else {
      log.warning(`Erreur inattendue: ${error.message}`);
    }
  }

  // Message de longueur valide
  const validMessage = 'Message de longueur valide';
  try {
    await gemmaService.sendMessage(validMessage);
    log.success('Message de longueur valide accepté');
  } catch (error) {
    // Erreur réseau attendue si pas d'API configurée
    if (!error.message.includes('longueur')) {
      log.success('Message de longueur valide passé la validation');
    }
  }
}

/**
 * Test 5: Cache Functionality
 */
async function testCacheFunctionality() {
  log.info('Test 5: Fonctionnalité du cache');
  
  gemmaService.reset();
  
  const testMessage = 'Test de cache';
  
  try {
    // Première requête
    const response1 = await gemmaService.sendMessage(testMessage);
    const fromCache1 = response1.fromCache || false;
    
    // Deuxième requête identique (devrait venir du cache)
    const response2 = await gemmaService.sendMessage(testMessage);
    const fromCache2 = response2.fromCache || false;
    
    if (!fromCache1 && fromCache2) {
      log.success('Cache fonctionne: première requête → API, seconde → cache');
    } else if (fromCache1 && fromCache2) {
      log.warning('Les deux requêtes viennent du cache (possible si cache persistant)');
    } else {
      log.error('Cache ne fonctionne pas correctement');
    }
  } catch (error) {
    log.warning(`Test de cache incomplet (API non disponible): ${error.message}`);
  }
}

/**
 * Test 6: Session Management
 */
async function testSessionManagement() {
  log.info('Test 6: Gestion de session');
  
  const stats1 = gemmaService.getStats();
  const sessionId1 = stats1.sessionId;
  
  gemmaService.reset();
  
  const stats2 = gemmaService.getStats();
  const sessionId2 = stats2.sessionId;
  
  if (sessionId1 !== sessionId2) {
    log.success('Session réinitialisée correctement avec nouvel ID');
  } else {
    log.error('Session non réinitialisée correctement');
  }
  
  if (stats2.requestCount === 0 && stats2.cacheSize === 0) {
    log.success('Compteurs réinitialisés correctement');
  } else {
    log.error('Compteurs non réinitialisés');
  }
}

/**
 * Test 7: Type Validation
 */
async function testTypeValidation() {
  log.info('Test 7: Validation des types');
  
  const invalidInputs = [
    123,
    null,
    undefined,
    { message: 'test' },
    ['test'],
    true
  ];

  for (const input of invalidInputs) {
    try {
      await gemmaService.sendMessage(input);
      log.error(`Type invalide non détecté: ${typeof input}`);
    } catch (error) {
      if (error.message.includes('chaîne de caractères') || error.message.includes('invalide')) {
        log.success(`Type invalide rejeté: ${typeof input}`);
      } else {
        log.warning(`Erreur inattendue pour type ${typeof input}: ${error.message}`);
      }
    }
  }
}

/**
 * Test 8: Empty/Whitespace Messages
 */
async function testEmptyMessages() {
  log.info('Test 8: Messages vides ou espaces');
  
  const emptyMessages = [
    '',
    '   ',
    '\n\n',
    '\t\t',
    '          '
  ];

  for (const msg of emptyMessages) {
    try {
      await gemmaService.sendMessage(msg);
      log.error(`Message vide non bloqué: "${msg}"`);
    } catch (error) {
      if (error.message.includes('invalide')) {
        log.success('Message vide bloqué');
      } else {
        log.warning(`Erreur inattendue: ${error.message}`);
      }
    }
  }
}

/**
 * Test 9: Statistics Accuracy
 */
async function testStatisticsAccuracy() {
  log.info('Test 9: Précision des statistiques');
  
  gemmaService.reset();
  const initialStats = gemmaService.getStats();
  
  if (initialStats.requestCount === 0 && 
      initialStats.remainingRequests === 100 &&
      initialStats.cacheSize === 0) {
    log.success('Statistiques initiales correctes');
  } else {
    log.error('Statistiques initiales incorrectes');
  }
  
  // Faire quelques requêtes
  for (let i = 0; i < 3; i++) {
    try {
      await gemmaService.sendMessage(`Test stats ${i}`);
    } catch (error) {
      // Ignorer les erreurs réseau
    }
  }
  
  const afterStats = gemmaService.getStats();
  if (afterStats.requestCount === 3 && afterStats.remainingRequests === 97) {
    log.success('Compteurs de requêtes corrects');
  } else {
    log.warning(`Compteurs: ${afterStats.requestCount} requêtes, ${afterStats.remainingRequests} restantes`);
  }
}

/**
 * Test 10: Special Characters Handling
 */
async function testSpecialCharacters() {
  log.info('Test 10: Gestion des caractères spéciaux');
  
  const specialChars = [
    'Mensaje con ñ, á, é, í, ó, ú',
    '¿Pregunta válida?',
    '¡Hola! ¿Cómo estás?',
    'Números: 123-456-7890',
    'Email@test.com'
  ];

  for (const msg of specialChars) {
    try {
      const sanitized = gemmaService.sanitizeInput(msg);
      if (sanitized && sanitized.length > 0) {
        log.success(`Caractères spéciaux acceptés: "${msg.substring(0, 30)}..."`);
      }
    } catch (error) {
      log.error(`Caractères spéciaux rejetés à tort: ${msg}`);
    }
  }
}

/**
 * Exécuter tous les tests
 */
export async function runAllSecurityTests() {
  console.log('\n' + '='.repeat(60));
  console.log('🔒 TESTS DE SÉCURITÉ - SERVICE GEMMA');
  console.log('='.repeat(60) + '\n');

  const startTime = Date.now();

  try {
    await testXSSProtection();
    console.log('');
    
    await testSQLInjectionProtection();
    console.log('');
    
    await testRateLimiting();
    console.log('');
    
    await testMessageLengthValidation();
    console.log('');
    
    await testCacheFunctionality();
    console.log('');
    
    await testSessionManagement();
    console.log('');
    
    await testTypeValidation();
    console.log('');
    
    await testEmptyMessages();
    console.log('');
    
    await testStatisticsAccuracy();
    console.log('');
    
    await testSpecialCharacters();
    console.log('');

  } catch (error) {
    log.error(`Erreur lors des tests: ${error.message}`);
  }

  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000).toFixed(2);

  console.log('='.repeat(60));
  console.log(`✅ Tests terminés en ${duration}s`);
  console.log('='.repeat(60) + '\n');
  
  log.info('Vérifiez les résultats ci-dessus pour identifier les problèmes');
  log.info('Documentation complète: /docs/GEMMA_SERVICE.md');
}

// Exécution automatique si appelé directement
if (typeof window !== 'undefined') {
  window.runSecurityTests = runAllSecurityTests;
  console.log('💡 Tapez "runSecurityTests()" dans la console pour lancer les tests');
}

export default runAllSecurityTests;
