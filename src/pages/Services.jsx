// src/pages/Services.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '../components/ui';
import { SERVICES }  from '../components/utils/constants';
import { Search } from 'lucide-react';

export const Services = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredServices = SERVICES.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="section-padding">
      <div className="container-max">
        <div className="text-center mb-12">
          <h1 className="section-title">Nuestros servicios</h1>
          <p className="section-subtitle mx-auto">
            Encuentra el servicio perfecto para tu hogar con nuestros expertos verificados
          </p>
        </div>

        {/* Search bar */}
        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Buscar servicios..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => {
            const Icon = service.icon;
            return (
              <Link key={service.id} to={`/services/${service.id}`}>
                <Card hover className="h-full text-center">
                  <div className="service-icon">
                    <Icon className="w-full h-full" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {service.name}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {service.description}
                  </p>
                  <div className="text-primary-600 font-semibold">
                    Desde €{service.basePrice}/hora
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>

        {filteredServices.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No se encontraron servicios que coincidan con tu búsqueda.</p>
          </div>
        )}
      </div>
    </div>
  );
};
