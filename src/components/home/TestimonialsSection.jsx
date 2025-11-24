// src/components/home/TestimonialsSection.jsx
import { Card } from '../ui';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'María González',
    avatar: '/api/placeholder/50/50',
    rating: 5,
    text: 'Excelente servicio de fontanería. Antonio llegó puntual y solucionó el problema rápidamente.',
    service: 'Fontanería',
  },
  {
    id: 2,
    name: 'Carlos Ruiz',
    avatar: '/api/placeholder/50/50',
    rating: 5,
    text: 'Carmen hizo un trabajo fantástico con la instalación eléctrica. Muy profesional y limpia.',
    service: 'Electricidad',
  },
  {
    id: 3,
    name: 'Ana López',
    avatar: '/api/placeholder/50/50',
    rating: 4,
    text: 'El servicio de limpieza superó mis expectativas. Laura es muy detallista y confiable.',
    service: 'Limpieza',
  },
];

export const TestimonialsSection = () => {
  return (
    <section className="section-padding bg-white">
      <div className="container-max">
        <div className="text-center mb-12">
          <h2 className="section-title">Reseñas de clientes</h2>
          <p className="section-subtitle mx-auto">
            Descubre lo que nuestros clientes dicen sobre nuestros expertos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="relative">
              <Quote className="absolute top-4 right-4 w-8 h-8 text-primary-200" />
              
              <div className="flex items-center space-x-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>

              <p className="text-gray-700 mb-6 italic">"{testimonial.text}"</p>

              <div className="flex items-center space-x-3">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.service}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};


