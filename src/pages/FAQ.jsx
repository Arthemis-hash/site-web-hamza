// src/pages/FAQ.jsx
import { useState } from 'react';
import { Card, Button } from '../components/ui';
import { ChevronDown, ChevronUp, Search, MessageCircle } from 'lucide-react';

const faqCategories = [
  {
    category: 'General',
    questions: [
      {
        question: '¿Qué es Manos Expertas?',
        answer: 'Manos Expertas es una plataforma que conecta a profesionales verificados con personas que necesitan servicios para el hogar. Facilitamos el proceso de encontrar, reservar y pagar por servicios de calidad de forma segura y transparente.'
      },
      {
        question: '¿Cómo funciona la plataforma?',
        answer: 'Es muy simple: 1) Explora nuestros servicios y elige el que necesitas, 2) Selecciona el profesional que mejor se adapte a tus necesidades, 3) Programa tu cita en el horario que prefieras, 4) Realiza el pago de forma segura, 5) Recibe el servicio en la fecha acordada.'
      },
      {
        question: '¿En qué zonas operan?',
        answer: 'Actualmente operamos en toda la Comunidad de Madrid y estamos expandiéndonos a otras ciudades de España. Próximamente estaremos disponibles en Barcelona, Valencia y Sevilla.'
      }
    ]
  },
  {
    category: 'Servicios y Precios',
    questions: [
      {
        question: '¿Qué servicios ofrecen?',
        answer: 'Ofrecemos más de 6 categorías de servicios incluyendo: electricidad, fontanería, limpieza, mudanzas, pintura, y más. Cada servicio es prestado por profesionales verificados y con experiencia.'
      },
      {
        question: '¿Los precios incluyen materiales?',
        answer: 'Los precios base incluyen mano de obra y herramientas básicas. Los materiales especiales o de mayor valor se cobran aparte y el profesional te informará del costo adicional antes de proceder con el trabajo.'
      },
      {
        question: '¿Puedo solicitar un presupuesto personalizado?',
        answer: 'Sí, puedes contactar directamente con el profesional a través de nuestra plataforma para solicitar un presupuesto personalizado para trabajos más complejos o de mayor envergadura.'
      },
      {
        question: '¿Ofrecen servicios de urgencia?',
        answer: 'Sí, tenemos disponibilidad para servicios el mismo día en casos urgentes. Los servicios de urgencia pueden tener un costo adicional dependiendo del horario y la naturaleza del trabajo.'
      }
    ]
  },
  {
    category: 'Profesionales',
    questions: [
      {
        question: '¿Cómo verifican a los profesionales?',
        answer: 'Todos nuestros profesionales pasan por un riguroso proceso de verificación que incluye: comprobación de identidad, verificación de referencias laborales, seguro de responsabilidad civil, pruebas técnicas específicas del servicio, y revisión de antecedentes.'
      },
      {
        question: '¿Los profesionales están asegurados?',
        answer: 'Sí, todos nuestros profesionales cuentan con seguro de responsabilidad civil que cubre cualquier daño que pueda ocurrir durante la prestación del servicio.'
      },
      {
        question: '¿Puedo ver las reseñas de otros clientes?',
        answer: 'Absolutamente. Cada profesional tiene un perfil con calificaciones y reseñas verificadas de clientes anteriores. Esto te ayudará a tomar una decisión informada.'
      },
      {
        question: '¿Cómo puedo convertirme en profesional de la plataforma?',
        answer: 'Si eres un profesional cualificado y quieres unirte a nuestra plataforma, visita nuestra página de registro para profesionales y completa el proceso de solicitud. Evaluaremos tu perfil y te contactaremos.'
      }
    ]
  },
  {
    category: 'Reservas y Cancelaciones',
    questions: [
      {
        question: '¿Puedo cambiar la fecha de mi reserva?',
        answer: 'Sí, puedes modificar la fecha y hora de tu reserva hasta 4 horas antes de la cita programada sin coste adicional. Después de ese plazo, se aplicará una tarifa de modificación.'
      },
      {
        question: '¿Cuál es la política de cancelación?',
        answer: 'Puedes cancelar tu reserva hasta 2 horas antes de la cita programada sin costo alguno y recibirás un reembolso completo. Las cancelaciones tardías pueden tener una penalización del 50% del coste del servicio.'
      },
      {
        question: '¿Qué pasa si el profesional no llega?',
        answer: 'En el improbable caso de que el profesional no se presente, te reembolsaremos el 100% del pago y te ayudaremos a encontrar un reemplazo inmediato sin costo adicional.'
      },
      {
        question: '¿Puedo reservar para el mismo día?',
        answer: 'Sí, ofrecemos servicios el mismo día sujeto a disponibilidad. Te recomendamos reservar con anticipación para garantizar el horario que prefieres.'
      }
    ]
  },
  {
    category: 'Pagos y Seguridad',
    questions: [
      {
        question: '¿Qué métodos de pago aceptan?',
        answer: 'Aceptamos tarjetas de crédito y débito (Visa, Mastercard, American Express), PayPal, Bizum y transferencia bancaria. Todos los pagos se procesan de forma segura a través de pasarelas de pago certificadas.'
      },
      {
        question: '¿Cuándo se realiza el cobro?',
        answer: 'El cobro se realiza en el momento de confirmar la reserva. Sin embargo, el dinero se retiene de forma segura y solo se libera al profesional una vez que el servicio se ha completado satisfactoriamente.'
      },
      {
        question: '¿Es seguro pagar a través de la plataforma?',
        answer: 'Sí, utilizamos cifrado SSL de 256 bits y cumplimos con todas las normativas de seguridad PCI DSS. Tu información financiera está completamente protegida y nunca la compartimos con terceros.'
      },
      {
        question: '¿Puedo solicitar una factura?',
        answer: 'Sí, todas las transacciones generan una factura automática que puedes descargar desde tu perfil. También puedes solicitar facturas con datos fiscales específicos para empresas.'
      }
    ]
  },
  {
    category: 'Garantías y Reclamaciones',
    questions: [
      {
        question: '¿Qué garantía ofrecen?',
        answer: 'Ofrecemos una garantía de satisfacción del 100%. Si no estás contento con el servicio, trabajaremos contigo y el profesional para resolverlo. Si no se puede resolver, te reembolsamos tu dinero.'
      },
      {
        question: '¿Cómo hago una reclamación?',
        answer: 'Puedes hacer una reclamación a través de tu perfil en la sección "Mis reservas". También puedes contactarnos por email o teléfono. Respondemos a todas las reclamaciones en menos de 24 horas.'
      },
      {
        question: '¿Qué pasa si hay daños durante el servicio?',
        answer: 'Todos nuestros profesionales están asegurados. En caso de daños, documenta la situación con fotos y contacta inmediatamente con nuestro equipo de soporte. Gestionaremos el reclamo con la aseguradora.'
      },
      {
        question: '¿Cuánto tiempo tengo para hacer una reclamación?',
        answer: 'Puedes hacer una reclamación hasta 7 días después de completado el servicio. Te recomendamos reportar cualquier problema lo antes posible para una resolución más rápida.'
      }
    ]
  }
];

export const FAQ = () => {
  const [selectedCategory, setSelectedCategory] = useState('General');
  const [openQuestions, setOpenQuestions] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  const toggleQuestion = (categoryIndex, questionIndex) => {
    const key = `${categoryIndex}-${questionIndex}`;
    setOpenQuestions(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const filteredCategories = faqCategories.map(cat => ({
    ...cat,
    questions: cat.questions.filter(q =>
      searchQuery === '' ||
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(cat => cat.questions.length > 0);

  const currentCategory = filteredCategories.find(cat => cat.category === selectedCategory) || filteredCategories[0];

  return (
    <div className="section-padding">
      <div className="container-max">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="hero-title mb-4">Preguntas Frecuentes</h1>
          <p className="section-subtitle mx-auto mb-8">
            Encuentra respuestas a las preguntas más comunes sobre nuestros servicios
          </p>

          {/* Search */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar en preguntas frecuentes..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Categories Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <h3 className="font-semibold mb-4">Categorías</h3>
              <div className="space-y-2">
                {filteredCategories.map((cat) => (
                  <button
                    key={cat.category}
                    onClick={() => setSelectedCategory(cat.category)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                      selectedCategory === cat.category
                        ? 'bg-primary-500 text-white'
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    {cat.category}
                    <span className="ml-2 text-sm">({cat.questions.length})</span>
                  </button>
                ))}
              </div>
            </Card>
          </div>

          {/* Questions */}
          <div className="lg:col-span-3">
            {currentCategory ? (
              <div className="space-y-4">
                <h2 className="text-2xl font-bold mb-6">{currentCategory.category}</h2>
                {currentCategory.questions.map((qa, qIndex) => {
                  const categoryIndex = faqCategories.findIndex(cat => cat.category === currentCategory.category);
                  const key = `${categoryIndex}-${qIndex}`;
                  const isOpen = openQuestions[key];

                  return (
                    <Card key={qIndex} className="cursor-pointer hover:shadow-md transition-shadow">
                      <button
                        onClick={() => toggleQuestion(categoryIndex, qIndex)}
                        className="w-full text-left flex items-start justify-between"
                      >
                        <h3 className="font-semibold text-lg pr-4">{qa.question}</h3>
                        {isOpen ? (
                          <ChevronUp className="w-5 h-5 text-primary-600 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0" />
                        )}
                      </button>
                      {isOpen && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <p className="text-gray-700 leading-relaxed">{qa.answer}</p>
                        </div>
                      )}
                    </Card>
                  );
                })}
              </div>
            ) : (
              <Card className="text-center py-12">
                <p className="text-gray-600">No se encontraron preguntas que coincidan con tu búsqueda.</p>
              </Card>
            )}
          </div>
        </div>

        {/* Contact CTA */}
        <Card className="mt-12 bg-primary-50 border-primary-200">
          <div className="text-center">
            <MessageCircle className="w-12 h-12 text-primary-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-4">¿No encontraste lo que buscabas?</h2>
            <p className="text-gray-600 mb-6">
              Nuestro equipo de soporte está disponible para ayudarte
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={() => window.location.href = '/contacto'}>
                Contactar con soporte
              </Button>
              <Button variant="outline" onClick={() => window.location.href = '/como-funciona'}>
                Cómo funciona
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
