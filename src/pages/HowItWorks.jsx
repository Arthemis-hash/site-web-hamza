// src/pages/HowItWorks.jsx
import { Card, Button } from '../components/ui';
import { 
  Search, 
  Calendar, 
  CheckCircle, 
  Shield, 
  Clock, 
  Star,
  ArrowRight,
  Phone,
  MessageCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

const steps = [
  {
    number: '01',
    title: 'Explora nuestros servicios',
    description: 'Navega por nuestra amplia gama de servicios para el hogar y encuentra exactamente lo que necesitas.',
    icon: Search,
    details: [
      'Más de 6 categorías de servicios',
      'Precios transparentes desde el inicio',
      'Descripción detallada de cada servicio'
    ]
  },
  {
    number: '02',
    title: 'Selecciona tu experto',
    description: 'Elige entre nuestros profesionales verificados basándote en sus reseñas, experiencia y precio.',
    icon: Star,
    details: [
      'Perfiles detallados de cada experto',
      'Reseñas y calificaciones reales',
      'Precios competitivos y transparentes'
    ]
  },
  {
    number: '03',
    title: 'Programa tu cita',
    description: 'Selecciona la fecha y hora que mejor te convenga y proporciona los detalles del trabajo.',
    icon: Calendar,
    details: [
      'Calendario en tiempo real',
      'Horarios flexibles de 8:00 a 20:30',
      'Confirmación inmediata'
    ]
  },
  {
    number: '04',
    title: 'Pago seguro',
    description: 'Realiza el pago de forma segura con múltiples opciones de pago disponibles.',
    icon: Shield,
    details: [
      'Cifrado SSL de 256 bits',
      'Múltiples métodos de pago',
      'Sin cargos ocultos'
    ]
  },
  {
    number: '05',
    title: 'Recibe el servicio',
    description: 'Nuestro experto llegará puntualmente y realizará el trabajo con la máxima calidad.',
    icon: CheckCircle,
    details: [
      'Puntualidad garantizada',
      'Trabajo profesional de calidad',
      'Garantía de satisfacción'
    ]
  }
];

const features = [
  {
    icon: Clock,
    title: 'Servicio rápido',
    description: 'Disponibilidad el mismo día para servicios urgentes'
  },
  {
    icon: Shield,
    title: 'Expertos verificados',
    description: 'Todos nuestros profesionales están verificados y asegurados'
  },
  {
    icon: Star,
    title: 'Calidad garantizada',
    description: 'Garantía de satisfacción del 100% en todos nuestros servicios'
  },
  {
    icon: Phone,
    title: 'Soporte 24/7',
    description: 'Atención al cliente disponible todos los días del año'
  }
];

// Image URLs for each step (realistic person, city, calendar, shield, handshake)
const stepImages = [
  'https://randomuser.me/api/portraits/men/32.jpg', // real person
  'https://upload.wikimedia.org/wikipedia/commons/6/6e/City_skyline_icon.png', // city
  'https://cdn-icons-png.flaticon.com/512/747/747310.png',   // calendar
  'https://cdn-icons-png.flaticon.com/512/3064/3064197.png', // shield
  'https://cdn-icons-png.flaticon.com/512/190/190411.png'    // handshake
];

export const HowItWorks = () => {
  return (
    <div className="section-padding">
      <div className="container-max">
        {/* Hero section */}
        <div className="text-center mb-16">
          <h1 className="hero-title mb-6">¿Cómo funciona Manos eXpertas?</h1>
          <p className="section-subtitle mx-auto mb-8">
            Un proceso simple y transparente que te conecta con los mejores profesionales 
            para tu hogar en solo unos minutos.
          </p>
          <Link to="/services">
            <Button size="lg">
              Comenzar ahora
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
        </div>

        {/* Steps */}
        <div className="mb-20">
          <h2 className="section-title text-center mb-12">Proceso paso a paso</h2>
          <div className="space-y-12">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.number} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                }`}>
                  <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="w-16 h-16 bg-primary-500 text-white rounded-full flex items-center justify-center text-xl font-bold">
                        {step.number}
                      </div>
                      <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center">
                        <Icon className="w-6 h-6 text-primary-600" />
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{step.title}</h3>
                    <p className="text-lg text-gray-600 mb-6">{step.description}</p>
                    <ul className="space-y-2">
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-center space-x-2 text-gray-600">
                          <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />
                          <span>{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                    <div className="relative flex items-center justify-center min-h-[200px]">
                      {/* Background icon/logo */}
                      <img
                        src={stepImages[index]}
                        alt={step.title}
                        className="absolute inset-0 m-auto w-40 h-40 object-contain opacity-10 pointer-events-none select-none"
                        aria-hidden="true"
                        loading="lazy"
                      />
                      {/* Foreground content (step number) */}
                      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
                        <div className="absolute -bottom-4 -right-4 w-20 h-20 bg-primary-500 text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-lg">
                          {step.number}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Features */}
        <div className="bg-cream-50 rounded-3xl p-8 lg:p-12 mb-16">
          <h2 className="section-title text-center mb-12">¿Por qué elegir Manos eXpertas?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-primary-500 text-white rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* FAQ */}
        <div>
          <h2 className="section-title text-center mb-12">Preguntas frecuentes</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card>
              <h3 className="font-semibold mb-3">¿Cómo están verificados los expertos?</h3>
              <p className="text-gray-600">
                Todos nuestros expertos pasan por un riguroso proceso de verificación que incluye 
                comprobación de identidad, referencias laborales, seguro de responsabilidad civil 
                y pruebas técnicas.
              </p>
            </Card>
            
            <Card>
              <h3 className="font-semibold mb-3">¿Qué pasa si no estoy satisfecho?</h3>
              <p className="text-gray-600">
                Ofrecemos una garantía de satisfacción del 100%. Si no estás contento con el servicio,
                te ayudamos a solucionarlo o te devolvemos tu dinero.
              </p>
            </Card>
            
            <Card>
              <h3 className="font-semibold mb-3">¿Puedo cancelar mi reserva?</h3>
              <p className="text-gray-600">
                Sí, puedes cancelar tu reserva hasta 2 horas antes de la cita programada sin costo alguno.
                Las cancelaciones tardías pueden tener una pequeña penalización.
              </p>
            </Card>
            
            <Card>
              <h3 className="font-semibold mb-3">¿Los precios incluyen materiales?</h3>
              <p className="text-gray-600">
                Los precios base incluyen herramientas y materiales básicos. Para materiales especiales
                o de mayor valor, el experto te informará del costo adicional antes de proceder.
              </p>
            </Card>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Card className="bg-primary-50 border-primary-200">
            <h2 className="text-2xl font-bold mb-4">¿Listo para comenzar?</h2>
            <p className="text-gray-600 mb-6">
              Encuentra el experto perfecto para tu proyecto en menos de 2 minutos
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/services">
                <Button size="lg" className="w-full sm:w-auto">
                  Explorar servicios
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                <MessageCircle className="w-5 h-5 mr-2" />
                Chatear con soporte
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};