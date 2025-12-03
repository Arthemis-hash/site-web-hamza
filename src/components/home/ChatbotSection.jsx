// src/components/home/ChatbotSection.jsx
import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, AlertCircle } from 'lucide-react';
import { Button, Card } from '../ui';
import gemmaService from '../../services/gemmaService';

const CHATBOT_API_URL = import.meta.env.VITE_CHATBOT_API_URL;

// Fonction de réponse intelligente en mode fallback
const getIntelligentResponse = (message) => {
  const lowerMessage = message.toLowerCase();
  
  // Services spécifiques
  if (lowerMessage.includes('electricidad') || lowerMessage.includes('electricista') || lowerMessage.includes('luz') || lowerMessage.includes('enchufe')) {
    return '⚡ ¡Perfecto! Necesitas un electricista. Tenemos expertos verificados disponibles en tu zona. ¿Cuándo necesitas el servicio?';
  }
  
  if (lowerMessage.includes('fontaner') || lowerMessage.includes('plomero') || lowerMessage.includes('agua') || lowerMessage.includes('grifo') || lowerMessage.includes('tubería')) {
    return '💧 Entiendo, necesitas un fontanero. Contamos con profesionales disponibles hoy mismo. ¿Es urgente?';
  }
  
  if (lowerMessage.includes('limpieza') || lowerMessage.includes('limpiar')) {
    return '🧹 ¡Excelente! Servicio de limpieza. ¿Qué tipo de limpieza necesitas? ¿Residencial o comercial?';
  }
  
  if (lowerMessage.includes('mudanza') || lowerMessage.includes('mudar') || lowerMessage.includes('transporte')) {
    return '📦 Servicio de mudanzas. Te conectamos con los mejores profesionales. ¿Cuándo es tu mudanza?';
  }
  
  if (lowerMessage.includes('pintura') || lowerMessage.includes('pintar') || lowerMessage.includes('pintor')) {
    return '🎨 Servicio de pintura. Nuestros pintores están listos para ayudarte. ¿Cuántos metros cuadrados aproximadamente?';
  }
  
  if (lowerMessage.includes('carpinter') || lowerMessage.includes('madera') || lowerMessage.includes('mueble')) {
    return '🔨 Carpintería. Tenemos carpinteros expertos para cualquier trabajo en madera. ¿Qué necesitas reparar o construir?';
  }
  
  if (lowerMessage.includes('cerrajer') || lowerMessage.includes('cerradura') || lowerMessage.includes('llave')) {
    return '🔑 Servicio de cerrajería. Disponemos de cerrajeros de urgencia 24/7. ¿Has perdido las llaves o necesitas cambiar la cerradura?';
  }
  
  if (lowerMessage.includes('jardin') || lowerMessage.includes('plantas') || lowerMessage.includes('césped')) {
    return '🌿 Jardinería y mantenimiento. Nuestros jardineros cuidan tu espacio verde. ¿Qué tipo de trabajo necesitas?';
  }
  
  if (lowerMessage.includes('aire acondicionado') || lowerMessage.includes('climatizacion') || lowerMessage.includes('calefaccion')) {
    return '❄️ Climatización. Instalación y reparación de aire acondicionado y calefacción. ¿Qué problema tienes?';
  }
  
  // Preguntas frecuentes
  if (lowerMessage.includes('precio') || lowerMessage.includes('cuesta') || lowerMessage.includes('coste') || lowerMessage.includes('tarifa')) {
    return '💰 Los precios varían según el servicio y la complejidad del trabajo. Te podemos dar un presupuesto gratuito. ¿Qué servicio te interesa?';
  }
  
  if (lowerMessage.includes('urgente') || lowerMessage.includes('emergencia') || lowerMessage.includes('ahora')) {
    return '🚨 ¡Entendido! Tenemos profesionales disponibles para servicios urgentes. ¿Qué tipo de servicio necesitas de urgencia?';
  }
  
  if (lowerMessage.includes('horario') || lowerMessage.includes('cuando') || lowerMessage.includes('disponible')) {
    return '🕐 Nuestros profesionales están disponibles de lunes a sábado de 8:00 a 20:00. Algunos servicios urgentes disponibles 24/7. ¿Qué servicio necesitas?';
  }
  
  if (lowerMessage.includes('garantia') || lowerMessage.includes('seguro')) {
    return '✅ Todos nuestros profesionales están verificados y ofrecen garantía en sus trabajos. ¿Qué servicio te interesa?';
  }
  
  // Saludos
  if (lowerMessage.includes('hola') || lowerMessage.includes('buenos') || lowerMessage.includes('buenas')) {
    return '👋 ¡Hola! Bienvenido a Manos Expertas. Estoy aquí para ayudarte a encontrar el profesional perfecto. ¿Qué necesitas hoy?';
  }
  
  if (lowerMessage.includes('gracias') || lowerMessage.includes('thank')) {
    return '😊 ¡De nada! Estoy aquí para ayudarte. ¿Necesitas algo más?';
  }
  
  if (lowerMessage.includes('adios') || lowerMessage.includes('chao')) {
    return '👋 ¡Hasta pronto! No dudes en volver si necesitas ayuda. ¡Que tengas un buen día!';
  }
  
  // Preguntas generales (como la capital de Roma)
  if (lowerMessage.includes('capital') || lowerMessage.includes('ciudad')) {
    return '🤔 Soy un asistente especializado en servicios profesionales para el hogar. Si necesitas un electricista, fontanero, pintor u otro profesional, ¡estoy aquí para ayudarte! ¿Qué servicio necesitas?';
  }
  
  // Respuesta por defecto
  return '👋 Gracias por tu mensaje. Soy tu asistente virtual de Manos Expertas. Te ayudo a encontrar profesionales verificados para:\n\n⚡ Electricidad\n💧 Fontanería\n🎨 Pintura\n🧹 Limpieza\n📦 Mudanzas\n🔨 Carpintería\n\n¿Qué servicio necesitas hoy?';
};

export const ChatbotSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: '¡Hola! ¿Qué problema tienes hoy? Cuéntamelo y juntos encontraremos la mejor solución gracias a nuestros profesionales de confianza.', isBot: true }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [rateLimitWarning, setRateLimitWarning] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    // Réinitialiser les erreurs
    setError(null);
    setRateLimitWarning(false);

    const newMessage = {
      id: Date.now(),
      text: inputMessage,
      isBot: false
    };

    setMessages(prev => [...prev, newMessage]);
    const currentMessage = inputMessage;
    setInputMessage('');
    setIsLoading(true);

    try {
      // Utilisation du service sécurisé Gemma
      if (CHATBOT_API_URL) {
        try {
          // Contexte pour améliorer les réponses
          const context = {
            previousMessages: messages.slice(-5).map(m => ({ text: m.text, isBot: m.isBot })),
            timestamp: new Date().toISOString(),
          };

          const response = await gemmaService.sendMessage(currentMessage, context);
          
          // Afficher un badge si la réponse vient du cache
          const botResponse = {
            id: Date.now() + 1,
            text: response.message,
            isBot: true,
            fromCache: response.fromCache
          };
          setMessages(prev => [...prev, botResponse]);

          // Vérifier le rate limit restant
          const stats = gemmaService.getStats();
          if (stats.rateLimitRemaining < 3) {
            setRateLimitWarning(true);
          }
        } catch (apiError) {
          console.warn('API Gemma no disponible, usando respuestas inteligentes:', apiError.message);
          // Si l'API échoue, utiliser le mode fallback
          throw new Error('FALLBACK_MODE');
        }

      } else {
        // Fallback: Réponses prédéfinies si pas d'API
        await new Promise(resolve => setTimeout(resolve, 1000));

        let responseText = 'Gracias por tu mensaje. Te ayudo a encontrar el servicio perfecto para ti.';

        const lowerMessage = currentMessage.toLowerCase();
        if (lowerMessage.includes('electricidad') || lowerMessage.includes('luz') || lowerMessage.includes('enchufe')) {
          responseText = '¡Perfecto! Necesitas un electricista. Tenemos expertos verificados disponibles. ¿Cuándo necesitas el servicio?';
        } else if (lowerMessage.includes('fontaner') || lowerMessage.includes('agua') || lowerMessage.includes('grifo')) {
          responseText = 'Entiendo, necesitas un fontanero. Contamos con profesionales disponibles hoy mismo. ¿Es urgente?';
        } else if (lowerMessage.includes('limpieza') || lowerMessage.includes('limpiar')) {
          responseText = '¡Excelente! Servicio de limpieza. ¿Qué tipo de limpieza necesitas? ¿Residencial o comercial?';
        } else if (lowerMessage.includes('mudanza') || lowerMessage.includes('mudar')) {
          responseText = 'Servicio de mudanzas. Te conectamos con los mejores profesionales. ¿Cuándo es tu mudanza?';
        } else if (lowerMessage.includes('pintura') || lowerMessage.includes('pintar')) {
          responseText = 'Servicio de pintura. Nuestros pintores están listos para ayudarte. ¿Cuántos metros cuadrados aproximadamente?';
        }

        const botResponse = {
          id: Date.now() + 1,
          text: responseText,
          isBot: true
        };
        setMessages(prev => [...prev, botResponse]);
      }
    } catch (error) {
      console.error('Chatbot error:', error);
      
      // Mode fallback intelligent si l'API ne répond pas
      if (error.message === 'FALLBACK_MODE') {
        await new Promise(resolve => setTimeout(resolve, 800));

        let responseText = getIntelligentResponse(currentMessage);

        const botResponse = {
          id: Date.now() + 1,
          text: responseText,
          isBot: true,
          fallbackMode: true
        };
        setMessages(prev => [...prev, botResponse]);
        setIsLoading(false);
        return;
      }
      
      // Gestion des erreurs spécifiques
      let errorMessage = 'Disculpa, estoy teniendo problemas para responder.';
      
      if (error.message.includes('Trop de requêtes') || error.message.includes('Limite')) {
        errorMessage = '⚠️ Has alcanzado el límite de mensajes. Por favor, espera un momento antes de continuar.';
        setRateLimitWarning(true);
      } else if (error.message.includes('Timeout')) {
        errorMessage = '⏱️ La respuesta está tardando demasiado. Por favor, intenta de nuevo.';
      } else if (error.message.includes('Message trop long') || error.message.includes('invalide')) {
        errorMessage = '⚠️ Tu mensaje es demasiado largo o contiene caracteres no válidos. Por favor, reformúlalo.';
      } else if (error.message.includes('Réponse potentiellement dangereuse')) {
        errorMessage = '🔒 Respuesta bloqueada por razones de seguridad. Intenta reformular tu pregunta.';
      } else {
        // En cas d'erreur inconnue, utiliser le mode fallback
        let responseText = getIntelligentResponse(currentMessage);
        const botResponse = {
          id: Date.now() + 1,
          text: responseText,
          isBot: true,
          fallbackMode: true
        };
        setMessages(prev => [...prev, botResponse]);
        setIsLoading(false);
        return;
      }
      
      setError(errorMessage);
      
      const errorResponse = {
        id: Date.now() + 1,
        text: errorMessage + ' Si el problema persiste, contacta con nuestro equipo de soporte.',
        isBot: true,
        isError: true
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <section className="section-padding">
        <div className="container-max">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title">Chatbot diagnóstico</h2>
              <p className="section-subtitle">
                ¿No estás seguro de qué servicio necesitas? Nuestro chatbot inteligente 
                te ayuda a identificar el problema y te conecta con el profesional adecuado.
              </p>
              <Button onClick={() => setIsOpen(true)}>
                Iniciar diagnóstico
              </Button>
            </div>
            
            <Card className="bg-primary-50">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-12 h-12 bg-primary-500 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold">Asistente Virtual</h3>
                  <p className="text-sm text-gray-600">En línea</p>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4">
                <p className="text-gray-700">
                  ¡Hola! Soy tu asistente virtual. ¿En qué puedo ayudarte hoy?
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Floating Chatbot - Improved positioning and design */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="bg-primary-500 hover:bg-primary-600 text-white rounded-full p-4 shadow-lg transition-all duration-300 hover:scale-110 animate-bounce-gentle"
            aria-label="Abrir chat"
          >
            <MessageCircle className="w-6 h-6" />
          </button>
        )}

        {isOpen && (
          <Card className="w-96 h-[500px] flex flex-col shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b bg-primary-500 text-white rounded-t-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                  <MessageCircle className="w-5 h-5 text-primary-500" />
                </div>
                <div>
                  <h3 className="font-semibold">Asistente Virtual</h3>
                  <div className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <p className="text-xs text-primary-100">En línea - Protegido 🔒</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-primary-600 rounded transition-colors"
                aria-label="Cerrar chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Avertissement de rate limit */}
            {rateLimitWarning && (
              <div className="bg-yellow-50 border-b border-yellow-200 p-3 flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-yellow-800">
                  Estás cerca del límite de mensajes. Por favor, espera un momento entre cada mensaje.
                </p>
              </div>
            )}

            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div className="flex flex-col items-start max-w-[80%]">
                    <div
                      className={`px-4 py-2 rounded-2xl text-sm shadow-sm ${
                        message.isBot
                          ? message.isError 
                            ? 'bg-red-50 text-red-800 border border-red-200 rounded-tl-none'
                            : 'bg-white text-gray-800 rounded-tl-none'
                          : 'bg-primary-500 text-white rounded-tr-none'
                      }`}
                    >
                      {message.text}
                    </div>
                    {/* Badge pour les réponses en cache */}
                    {message.fromCache && (
                      <span className="text-xs text-gray-500 mt-1 ml-2 flex items-center">
                        ⚡ Respuesta instantánea
                      </span>
                    )}
                    {/* Badge pour le mode fallback */}
                    {message.fallbackMode && (
                      <span className="text-xs text-blue-600 mt-1 ml-2 flex items-center">
                        🤖 Asistente inteligente
                      </span>
                    )}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-none shadow-sm">
                    <div className="flex space-x-2">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-4 border-t bg-white rounded-b-lg">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && !isLoading && handleSendMessage()}
                  placeholder="Escribe tu mensaje... (máx. 1000 caracteres)"
                  disabled={isLoading || rateLimitWarning}
                  maxLength={1000}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm disabled:bg-gray-100 disabled:cursor-not-allowed"
                />
                <button
                  onClick={handleSendMessage}
                  disabled={isLoading || !inputMessage.trim() || rateLimitWarning}
                  className="p-3 bg-primary-500 text-white rounded-full hover:bg-primary-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                  aria-label="Enviar mensaje"
                  title={rateLimitWarning ? 'Espera un momento antes de enviar más mensajes' : 'Enviar mensaje'}
                >
                  {isLoading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    <Send className="w-5 h-5" />
                  )}
                </button>
              </div>
              {/* Compteur de caractères */}
              <div className="mt-2 text-xs text-gray-500 text-right">
                {inputMessage.length}/1000
              </div>
            </div>
          </Card>
        )}
      </div>
    </>
  );
};