// src/components/home/ServicesSection.jsx
import { Link } from 'react-router-dom';
import { Card } from '../ui';

export const ServicesSection = () => {
  const services = [
    {
      id: 1,
      title: 'Plomería',
      description: 'Servicios profesionales de plomería para tu hogar',
      icon: '🔧',
      path: '/services/plumbing'
    },
    {
      id: 2,
      title: 'Electricidad',
      description: 'Instalación y reparación de sistemas eléctricos',
      icon: '⚡',
      path: '/services/electrical'
    },
    {
      id: 3,
      title: 'Carpintería',
      description: 'Trabajos en madera y muebles a medida',
      icon: '🪚',
      path: '/services/carpentry'
    },
    // Add more services as needed
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Nuestros Servicios</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Link key={service.id} to={service.path}>
              <Card className="h-full transform transition-transform hover:scale-105">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
