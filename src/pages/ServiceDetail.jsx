// src/pages/ServiceDetail.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Card } from '../components/ui';
import { ExpertCard } from '../components/booking/ExpertCard';
import { SERVICES, EXPERTS } from '../components/utils/constants';
import { useBooking } from '../context/BookingContext';
import { ArrowLeft } from 'lucide-react';

export const ServiceDetail = () => {
  const { serviceId } = useParams();
  const navigate = useNavigate();
  const { setService, setExpert } = useBooking();
  const [selectedExpert, setSelectedExpert] = useState(null);

  const service = SERVICES.find(s => s.id === serviceId);
  const serviceExperts = EXPERTS.filter(expert => 
    expert.services.includes(serviceId)
  );

  useEffect(() => {
    if (service) {
      setService(service);
    }
  }, [service, setService]);

  if (!service) {
    return (
      <div className="section-padding">
        <div className="container-max text-center">
          <h1 className="text-2xl font-bold mb-4">Servicio no encontrado</h1>
          <Button onClick={() => navigate('/services')}>
            Volver a servicios
          </Button>
        </div>
      </div>
    );
  }

  const handleExpertSelect = (expert) => {
    setSelectedExpert(expert);
    setExpert(expert);
  };

  const handleBooking = () => {
    if (selectedExpert) {
      navigate('/booking');
    }
  };

  const Icon = service.icon;

  return (
    <div className="section-padding">
      <div className="container-max">
        {/* Back button */}
        <button
          onClick={() => navigate('/services')}
          className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver a servicios</span>
        </button>

        {/* Service header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          <div>
            <div className="flex items-center space-x-4 mb-6">
              <div className="service-icon">
                <Icon className="w-full h-full" />
              </div>
              <div>
                <h1 className="text-4xl font-bold text-gray-900">{service.name}</h1>
                <p className="text-xl text-gray-600 mt-2">{service.description}</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold">¿Qué incluye este servicio?</h2>
              <ul className="space-y-2 text-gray-600">
                <li>• Diagnóstico profesional del problema</li>
                <li>• Herramientas y materiales básicos incluidos</li>
                <li>• Garantía de satisfacción del servicio</li>
                <li>• Seguimiento post-servicio</li>
              </ul>
              
              <div className="bg-cream-50 p-4 rounded-lg">
                <div className="font-semibold text-primary-700">Precio base</div>
                <div className="text-2xl font-bold text-primary-600">
                  €{service.basePrice}/hora
                </div>
                <div className="text-sm text-gray-600">
                  *El precio final puede variar según la complejidad del trabajo
                </div>
              </div>
            </div>
          </div>

          <div>
            <img
              src="/api/placeholder/500/400"
              alt={service.name}
              className="w-full rounded-2xl shadow-lg"
            />
          </div>
        </div>

        {/* Experts section */}
        <div>
          <h2 className="text-3xl font-bold mb-8">Expertos en {service.name}</h2>
          
          {serviceExperts.length > 0 ? (
            <div className="space-y-4 mb-8">
              {serviceExperts.map((expert) => (
                <ExpertCard
                  key={expert.id}
                  expert={expert}
                  onSelect={handleExpertSelect}
                  isSelected={selectedExpert?.id === expert.id}
                />
              ))}
            </div>
          ) : (
            <Card className="text-center py-8">
              <p className="text-gray-500">No hay expertos disponibles para este servicio en este momento.</p>
            </Card>
          )}

          {selectedExpert && (
            <div className="bg-primary-50 p-6 rounded-2xl">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg">Experto seleccionado</h3>
                  <p className="text-gray-600">{selectedExpert.name}</p>
                </div>
                <Button onClick={handleBooking} size="lg">
                  Reservar ahora
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
