// src/components/home/ChatbotSection.jsx
import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button, Card } from '../ui';

export const ChatbotSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, text: '¡Hola! Soy tu asistente virtual. ¿En qué puedo ayudarte hoy?', isBot: true }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: Date.now(),
      text: inputMessage,
      isBot: false
    };

    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');

    // Simulate bot response
    setTimeout(() => {
      const botResponse = {
        id: Date.now() + 1,
        text: 'Gracias por tu mensaje. Te ayudo a encontrar el servicio perfecto para ti. ¿Qué tipo de servicio necesitas?',
        isBot: true
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
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

      {/* Floating Chatbot */}
      <div className="chatbot-container">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="chatbot-bubble animate-bounce-gentle"
          >
            <MessageCircle className="w-6 h-6" />
          </button>
        )}

        {isOpen && (
          <Card className="w-80 h-96 flex flex-col">
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Asistente Virtual</h3>
                  <p className="text-xs text-gray-500">En línea</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
                >
                  <div
                    className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                      message.isBot
                        ? 'bg-gray-100 text-gray-800'
                        : 'bg-primary-500 text-white'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                  placeholder="Escribe tu mensaje..."
                  className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm"
                />
                <button
                  onClick={handleSendMessage}
                  className="p-2 bg-primary-500 text-white rounded-lg hover:bg-primary-600"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </Card>
        )}
      </div>
    </>
  );
};