// src/components/booking/PaymentForm.jsx
import { useState } from 'react';
import { Button, Card, Input } from '../ui';
import { useBooking } from '../../context/BookingContext';
import { PAYMENT_METHODS } from '../utils/constants';
import { CreditCard, Lock, Shield } from 'lucide-react';

export const PaymentForm = ({ onSuccess }) => {
  const { selectedService, selectedExpert, bookingData, createBooking } = useBooking();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [paymentData, setPaymentData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Calculate total price (simplified)
  const basePrice = selectedExpert?.price || selectedService?.basePrice || 0;
  const serviceFee = basePrice * 0.1; // 10% service fee
  const total = basePrice + serviceFee;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    // Simple validation
    const newErrors = {};
    if (paymentMethod === 'card') {
      if (!paymentData.cardNumber) newErrors.cardNumber = 'Número de tarjeta requerido';
      if (!paymentData.expiryDate) newErrors.expiryDate = 'Fecha de vencimiento requerida';
      if (!paymentData.cvv) newErrors.cvv = 'CVV requerido';
      if (!paymentData.cardName) newErrors.cardName = 'Nombre en la tarjeta requerido';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Create booking
      const result = await createBooking();
      if (result.success) {
        onSuccess?.();
      } else {
        setErrors({ general: 'Error al procesar el pago. Inténtalo de nuevo.' });
      }
    } catch (error) {
      setErrors({ general: 'Error al procesar el pago. Inténtalo de nuevo.' });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setPaymentData(prev => ({ ...prev, [field]: value }));
  };

  const formatCardNumber = (value) => {
    // Remove all non-digits and add spaces every 4 digits
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value) => {
    // Format MM/YY
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Payment form */}
      <Card>
        <h2 className="text-2xl font-bold mb-6 flex items-center space-x-2">
          <CreditCard className="w-6 h-6" />
          <span>Información de pago</span>
        </h2>

        {errors.general && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Payment method selection */}
          <div>
            <label className="form-label">Método de pago</label>
            <div className="space-y-2">
              {PAYMENT_METHODS.map((method) => (
                <label key={method.id} className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                  <input
                    type="radio"
                    value={method.id}
                    checked={paymentMethod === method.id}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4 text-primary-600"
                  />
                  <span className="text-2xl">{method.icon}</span>
                  <span>{method.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Card details */}
          {paymentMethod === 'card' && (
            <div className="space-y-4">
              <Input
                label="Número de tarjeta"
                value={paymentData.cardNumber}
                onChange={(e) => handleInputChange('cardNumber', formatCardNumber(e.target.value))}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                error={errors.cardNumber}
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Fecha de vencimiento"
                  value={paymentData.expiryDate}
                  onChange={(e) => handleInputChange('expiryDate', formatExpiryDate(e.target.value))}
                  placeholder="MM/YY"
                  maxLength={5}
                  error={errors.expiryDate}
                />
                <Input
                  label="CVV"
                  value={paymentData.cvv}
                  onChange={(e) => handleInputChange('cvv', e.target.value.replace(/\D/g, '').substring(0, 4))}
                  placeholder="123"
                  maxLength={4}
                  error={errors.cvv}
                />
              </div>

              <Input
                label="Nombre en la tarjeta"
                value={paymentData.cardName}
                onChange={(e) => handleInputChange('cardName', e.target.value)}
                placeholder="Juan Pérez"
                error={errors.cardName}
              />
            </div>
          )}

          {/* Security info */}
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 text-blue-700 mb-2">
              <Shield className="w-5 h-5" />
              <span className="font-medium">Pago seguro</span>
            </div>
            <p className="text-sm text-blue-600">
              Tu información de pago está protegida con cifrado SSL de 256 bits.
            </p>
          </div>

          <Button
            type="submit"
            loading={loading}
            className="w-full"
            size="lg"
          >
            <Lock className="w-4 h-4 mr-2" />
            Pagar €{total.toFixed(2)}
          </Button>
        </form>
      </Card>

      {/* Order summary */}
      <Card>
        <h3 className="text-xl font-semibold mb-6">Resumen del pedido</h3>
        
        <div className="space-y-4">
          <div className="flex items-start space-x-4 pb-4 border-b">
            <img
              src={selectedExpert?.avatar}
              alt={selectedExpert?.name}
              className="w-12 h-12 rounded-full"
            />
            <div className="flex-1">
              <h4 className="font-medium">{selectedService?.name}</h4>
              <p className="text-sm text-gray-600">{selectedExpert?.name}</p>
              <p className="text-sm text-gray-500">{selectedExpert?.experience}</p>
            </div>
            <div className="text-right">
              <div className="font-medium">€{basePrice}/hora</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Fecha:</span>
              <span>{bookingData.date}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Hora:</span>
              <span>{bookingData.time}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Dirección:</span>
              <span className="text-right max-w-xs">{bookingData.address}</span>
            </div>
          </div>

          <div className="border-t pt-4 space-y-2">
            <div className="flex justify-between">
              <span>Precio base (1 hora):</span>
              <span>€{basePrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Tarifa de servicio:</span>
              <span>€{serviceFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-semibold text-lg border-t pt-2">
              <span>Total:</span>
              <span>€{total.toFixed(2)}</span>
            </div>
          </div>

          <div className="bg-gray-50 p-3 rounded-lg text-sm text-gray-600">
            <p>
              <strong>Nota:</strong> El precio final puede variar según la duración real del servicio. 
              El experto te informará sobre cualquier costo adicional antes de proceder.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
};
