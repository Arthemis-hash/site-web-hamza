// src/components/home/HeroSection.jsx
//import { Link } from 'react-router-dom';
import { Button } from '../ui';

export const HeroSection = () => {
  return (
    <section className="section-padding bg-gradient-to-br from-cream-50 to-cream-100 relative overflow-hidden">
      <div className="absolute inset-0 z-0 flex justify-end items-center pointer-events-none">
        <img 
          src="/professional.jpg" 
          alt="Profesional sonriente" 
          className="max-w-md w-full h-auto object-cover object-center opacity-40 rounded-2xl shadow-2xl mr-8 lg:mr-24" 
        />
      </div>
      <div className="container-max relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 animate-fade-in-up">
            <h1 className="hero-title">
              Encuentra el servicio que necesitas para tu hogar
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Conectamos a los mejores profesionales con personas que necesitan 
              servicios de calidad para su hogar. Rápido, seguro y confiable.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/services">
                <Button size="lg" className="w-full sm:w-auto">
                  Explorar servicios
                </Button>
              </Link>
              <Link to="/como-funciona">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Cómo funciona
                </Button>
              </Link>
            </div>
          </div>
          {/* No image here, it's now in the background */}
        </div>
      </div>
    </section>
  );
};

// src/components/home/ServicesSection.jsx
import { Link } from 'react-router-dom';
import { Card } from '../ui';
import { SERVICES } from '../utils/constants';

export const ServicesSection = () => {
  return (
    <section className="section-padding">
      <div className="container-max">
        <div className="text-center mb-12">
          <h2 className="section-title">¿Cómo funciona?</h2>
          <p className="section-subtitle mx-auto">
            Nuestro proceso simple te conecta con el profesional ideal en solo unos pasos
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {SERVICES.map((service) => {
            const Icon = service.icon;
            return (
              <Link key={service.id} to={`/services/${service.id}`}>
                <Card hover className="text-center h-full">
                  <div className="service-icon">
                    <Icon className="w-full h-full" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {service.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {service.description}
                  </p>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

