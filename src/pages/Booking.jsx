// src/pages/Booking.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, Button } from '../components/ui';
import { BookingForm } from '../components/booking/BookingForm';
import { PaymentForm } from '../components/booking/PaymentForm';
import { useBooking } from '../context/BookingContext';
import { useAuth } from '../context/AuthContext';
import { AuthModal } from '../components/auth/AuthModal';
import { CheckCircle, Calendar, User, CreditCard } from 'lucide-react';

export const Booking = () => {
  const navigate = useNavigate();
  const { selectedService, selectedExpert, currentStep, setStep, resetBooking } = useBooking();
  const { isAuthenticated } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState('login');

  // Redirect if no service/expert selected
  if (!selectedService || !selectedExpert) {
    return (
      <div className="section-padding">
        <div className="container-max text-center">
          <h1 className="text-2xl font-bold mb-4">Información de reserva incompleta</h1>
          <p className="text-gray-600 mb-6">
            Por favor selecciona un servicio y un experto antes de continuar.
          </p>
          <Button onClick={() => navigate('/services')}>
            Seleccionar servicio
          </Button>
        </div>
      </div>
    );
  }

  const steps = [
    { number: 1, title: 'Programar', icon: Calendar, description: 'Fecha y detalles' },
    { number: 2, title: 'Autenticación', icon: User, description: 'Iniciar sesión' },
    { number: 3, title: 'Pago', icon: CreditCard, description: 'Confirmar y pagar' },
    { number: 4, title: 'Confirmación', icon: CheckCircle, description: 'Reserva completada' }
  ];

  const handleNext = () => {
    if (currentStep === 1) {
      if (isAuthenticated) {
        setStep(3); // Skip authentication if already logged in
      } else {
        setStep(2);
        setShowAuthModal(true);
      }
    } else if (currentStep === 2) {
      setStep(3);
    }
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    setStep(3);
  };

  const handlePaymentSuccess = () => {
    setStep(4);
  };

  const handleFinish = () => {
    resetBooking();
    navigate('/');
  };

  return (
    <div className="section-padding bg-gray-50">
      <div className="container-max max-w-4xl">
        {/* Progress indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.number;
              const isCompleted = currentStep > step.number;
              
              return (
                <div key={step.number} className="flex items-center">
                  <div className={`flex flex-col items-center ${index < steps.length - 1 ? 'flex-1' : ''}`}>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      isCompleted ? 'bg-green-500 text-white' :
                      isActive ? 'bg-primary-500 text-white' :
                      'bg-gray-300 text-gray-600'
                    }`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="text-center mt-2">
                      <div className={`text-sm font-medium ${isActive ? 'text-primary-600' : 'text-gray-500'}`}>
                        {step.title}
                      </div>
                      <div className="text-xs text-gray-400">{step.description}</div>
                    </div>
                  </div>
                  
                  {index < steps.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-4 ${
                      currentStep > step.number ? 'bg-green-500' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Booking summary */}
        <Card className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Resumen de la reserva</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium text-gray-700">Servicio</h3>
              <p className="text-lg">{selectedService.name}</p>
            </div>
            <div>
              <h3 className="font-medium text-gray-700">Experto</h3>
              <div className="flex items-center space-x-2">
                <img src={selectedExpert.avatar} alt={selectedExpert.name} className="w-8 h-8 rounded-full" />
                <span>{selectedExpert.name}</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Step content */}
        <div>
          {currentStep === 1 && (
            <BookingForm onNext={handleNext} />
          )}
          
          {currentStep === 2 && !isAuthenticated && (
            <Card className="text-center py-8">
              <h2 className="text-2xl font-bold mb-4">Inicia sesión para continuar</h2>
              <p className="text-gray-600 mb-6">
                Necesitas una cuenta para realizar la reserva
              </p>
              <div className="space-x-4">
                <Button onClick={() => { setAuthMode('login'); setShowAuthModal(true); }}>
                  Iniciar sesión
                </Button>
                <Button variant="outline" onClick={() => { setAuthMode('register'); setShowAuthModal(true); }}>
                  Crear cuenta
                </Button>
              </div>
            </Card>
          )}
          
          {currentStep === 3 && (
            <PaymentForm onSuccess={handlePaymentSuccess} />
          )}
          
          {currentStep === 4 && (
            <Card className="text-center py-12">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-6" />
              <h2 className="text-3xl font-bold text-green-600 mb-4">¡Reserva confirmada!</h2>
              <p className="text-gray-600 mb-8">
                Tu reserva ha sido procesada exitosamente. Recibirás un email de confirmación en breve.
              </p>
              <div className="space-x-4">
                <Button onClick={handleFinish}>
                  Volver al inicio
                </Button>
                <Button variant="outline" onClick={() => navigate('/profile')}>
                  Ver mis reservas
                </Button>
              </div>
            </Card>
          )}
        </div>
      </div>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </div>
  );
};