// src/components/booking/BookingForm.jsx
import { useState } from 'react';
import { Button, Input, Card } from '../ui';
import { useBooking } from '../../context/BookingContext';
import { Calendar, Clock, MapPin, Phone, FileText } from 'lucide-react';

export const BookingForm = ({ onNext }) => {
  const { bookingData, updateBookingData } = useBooking();
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});

    // Validation
    const newErrors = {};
    if (!bookingData.date) newErrors.date = 'La fecha es requerida';
    if (!bookingData.time) newErrors.time = 'La hora es requerida';
    if (!bookingData.address) newErrors.address = 'La dirección es requerida';
    if (!bookingData.phone) newErrors.phone = 'El teléfono es requerido';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onNext?.();
  };

  const handleChange = (field, value) => {
    updateBookingData({ [field]: value });
  };

  // Generate time slots
  const timeSlots = [];
  for (let hour = 8; hour <= 20; hour++) {
    timeSlots.push(`${hour}:00`);
    if (hour < 20) timeSlots.push(`${hour}:30`);
  }

  return (
    <Card>
      <h2 className="text-2xl font-bold mb-6">Programar servicio</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="form-label flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span>Fecha</span>
            </label>
            <input
              type="date"
              value={bookingData.date}
              onChange={(e) => handleChange('date', e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="input-field"
            />
            {errors.date && <p className="form-error">{errors.date}</p>}
          </div>

          <div>
            <label className="form-label flex items-center space-x-2">
              <Clock className="w-4 h-4" />
              <span>Hora</span>
            </label>
            <select
              value={bookingData.time}
              onChange={(e) => handleChange('time', e.target.value)}
              className="input-field"
            >
              <option value="">Seleccionar hora</option>
              {timeSlots.map((time) => (
                <option key={time} value={time}>{time}</option>
              ))}
            </select>
            {errors.time && <p className="form-error">{errors.time}</p>}
          </div>
        </div>

        <div>
          <label className="form-label flex items-center space-x-2">
            <MapPin className="w-4 h-4" />
            <span>Dirección</span>
          </label>
          <input
            type="text"
            value={bookingData.address}
            onChange={(e) => handleChange('address', e.target.value)}
            placeholder="Calle, número, ciudad, código postal"
            className="input-field"
          />
          {errors.address && <p className="form-error">{errors.address}</p>}
        </div>

        <div>
          <label className="form-label flex items-center space-x-2">
            <Phone className="w-4 h-4" />
            <span>Teléfono</span>
          </label>
          <input
            type="tel"
            value={bookingData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="+34 600 123 456"
            className="input-field"
          />
          {errors.phone && <p className="form-error">{errors.phone}</p>}
        </div>

        <div>
          <label className="form-label flex items-center space-x-2">
            <FileText className="w-4 h-4" />
            <span>Descripción del problema (opcional)</span>
          </label>
          <textarea
            value={bookingData.description}
            onChange={(e) => handleChange('description', e.target.value)}
            placeholder="Describe brevemente el trabajo que necesitas..."
            rows={4}
            className="input-field resize-none"
          />
        </div>

        <Button type="submit" className="w-full" size="lg">
          Continuar al pago
        </Button>
      </form>
    </Card>
  );
};