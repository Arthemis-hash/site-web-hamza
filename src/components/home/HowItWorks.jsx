// src/components/home/HowItWorks.jsx
import { Card } from '../ui';
import { Search, Calendar, CheckCircle } from 'lucide-react';

const steps = [
  {
    icon: Search,
    title: 'Selecciona un servicio',
    description: 'Elige el tipo de servicio que necesitas para tu hogar',
    number: '1'
  },
  {
    icon: Calendar,
    title: 'Reserva en línea',
    description: 'Programa una cita con el profesional de tu elección',
    number: '2'
  },
  {
    icon: CheckCircle,
    title: 'Profesional auditorío',
    description: 'Recibe un servicio de calidad de expertos verificados',
    number: '3'
  }
];

export const HowItWorks = () => {
  return (
    <section className="section-padding bg-cream-50">
      <div className="container-max">
        <div className="text-center mb-12">
          <h2 className="section-title">¿Cómo funciona?</h2>
          <p className="section-subtitle mx-auto">
            Un proceso simple y transparente desde la búsqueda hasta la realización del servicio
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                <Card className="text-center h-full">
                  <div className="relative mb-6">
                    <div className="service-icon bg-primary-500 text-white">
                      <Icon className="w-full h-full" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-cream-500 rounded-full flex items-center justify-center font-bold text-primary-700">
                      {step.number}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">
                    {step.description}
                  </p>
                </Card>
                
                {/* Arrow connector (hidden on mobile) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                    <div className="w-8 h-0.5 bg-primary-300"></div>
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-l-primary-300 border-t-2 border-b-2 border-t-transparent border-b-transparent"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

