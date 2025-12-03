// src/pages/Contact.jsx
import { useState } from 'react';
import { Card, Button, Input, StaticMap, MapLink } from '../components/ui';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { sendEmail } from '../services/emailService';

// Configuration OpenStreetMap depuis les variables d'environnement
const DEFAULT_LOCATION = {
  name: import.meta.env.VITE_DEFAULT_LOCATION_NAME || 'Jaén, España',
  latitude: parseFloat(import.meta.env.VITE_DEFAULT_LATITUDE) || 37.7796,
  longitude: parseFloat(import.meta.env.VITE_DEFAULT_LONGITUDE) || -3.7849,
  zoom: parseInt(import.meta.env.VITE_DEFAULT_ZOOM) || 13
};

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    // Validation
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'El nombre es requerido';
    if (!formData.email.trim()) newErrors.email = 'El email es requerido';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }
    if (!formData.subject.trim()) newErrors.subject = 'El asunto es requerido';
    if (!formData.message.trim()) newErrors.message = 'El mensaje es requerido';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      // Envoi de l'email via le service
      const result = await sendEmail({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
      });

      if (result.success) {
        setSubmitSuccess(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });

        // Afficher un message d'avertissement si c'est un envoi simulé
        if (result.warning) {
          console.warn('⚠️ ' + result.warning);
        }

        setTimeout(() => setSubmitSuccess(false), 5000);
      } else {
        setErrors({ general: result.message || 'Error al enviar el mensaje. Por favor, intenta de nuevo.' });
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      setErrors({ general: 'Error al enviar el mensaje. Por favor, intenta de nuevo.' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Teléfono',
      content: import.meta.env.VITE_CONTACT_PHONE || '+34 900 123 456',
      link: `tel:${import.meta.env.VITE_CONTACT_PHONE || '+34900123456'}`
    },
    {
      icon: Mail,
      title: 'Email',
      content: import.meta.env.VITE_CONTACT_EMAIL || 'info@manosexpertas.es',
      link: `mailto:${import.meta.env.VITE_CONTACT_EMAIL || 'info@manosexpertas.es'}`
    },
    {
      icon: MapPin,
      title: 'Dirección',
      content: import.meta.env.VITE_CONTACT_ADDRESS || 'Jaén, España',
      link: null
    },
    {
      icon: Clock,
      title: 'Horario',
      content: 'Lun - Vie: 8:00 - 20:30\nSáb: 9:00 - 14:00',
      link: null
    }
  ];

  return (
    <div className="section-padding">
      <div className="container-max">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="hero-title mb-4">Contacta con nosotros</h1>
          <p className="section-subtitle mx-auto">
            ¿Tienes alguna pregunta? Estamos aquí para ayudarte.
            Responderemos lo antes posible.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <Card>
            <h2 className="text-2xl font-bold mb-6">Envíanos un mensaje</h2>

            {submitSuccess && (
              <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
                ¡Mensaje enviado correctamente! Te responderemos pronto.
              </div>
            )}

            {errors.general && (
              <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                {errors.general}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Nombre completo"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={errors.name}
                placeholder="Tu nombre"
                required
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  placeholder="tu@email.com"
                  required
                />

                <Input
                  label="Teléfono"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+34 600 123 456"
                />
              </div>

              <Input
                label="Asunto"
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                error={errors.subject}
                placeholder="¿En qué podemos ayudarte?"
                required
              />

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mensaje *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  placeholder="Cuéntanos más detalles..."
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 ${
                    errors.message ? 'border-red-500' : 'border-gray-300'
                  }`}
                  required
                ></textarea>
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600">{errors.message}</p>
                )}
              </div>

              <Button
                type="submit"
                loading={isSubmitting}
                disabled={isSubmitting}
                className="w-full"
              >
                <Send className="w-4 h-4 mr-2" />
                {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
              </Button>
            </form>
          </Card>

          {/* Contact Info */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold mb-6">Información de contacto</h2>

            <div className="grid grid-cols-1 gap-6">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                const content = info.link ? (
                  <a
                    href={info.link}
                    className="text-primary-600 hover:text-primary-700"
                  >
                    {info.content}
                  </a>
                ) : (
                  <p className="text-gray-700 whitespace-pre-line">{info.content}</p>
                );

                return (
                  <Card key={index} className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-primary-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{info.title}</h3>
                      {content}
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Map - OpenStreetMap */}
            <Card className="overflow-hidden p-0">
              <StaticMap
                latitude={DEFAULT_LOCATION.latitude}
                longitude={DEFAULT_LOCATION.longitude}
                zoom={DEFAULT_LOCATION.zoom}
                height="320px"
              />
              <div className="p-4 bg-white border-t">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-gray-900">Nuestra ubicación</h3>
                    <p className="text-sm text-gray-600">{DEFAULT_LOCATION.name}</p>
                  </div>
                  <MapLink
                    latitude={DEFAULT_LOCATION.latitude}
                    longitude={DEFAULT_LOCATION.longitude}
                    label="Abrir mapa"
                  />
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* FAQ Preview */}
        <Card className="bg-primary-50 border-primary-200">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">¿Preguntas frecuentes?</h2>
            <p className="text-gray-600 mb-6">
              Quizás encuentres la respuesta que buscas en nuestra sección de preguntas frecuentes
            </p>
            <Button variant="outline" onClick={() => window.location.href = '/faq'}>
              Ver preguntas frecuentes
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};
