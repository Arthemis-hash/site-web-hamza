// src/components/home/PartnersSection.jsx
import { useEffect, useRef } from 'react';

const partners = [
  {
    id: 1,
    name: 'Partner 1',
    logo: 'https://via.placeholder.com/200x100/4F46E5/FFFFFF?text=Partner+1',
    description: 'Líder en soluciones tecnológicas'
  },
  {
    id: 2,
    name: 'Partner 2',
    logo: 'https://via.placeholder.com/200x100/7C3AED/FFFFFF?text=Partner+2',
    description: 'Innovación y calidad'
  },
  {
    id: 3,
    name: 'Partner 3',
    logo: 'https://via.placeholder.com/200x100/2563EB/FFFFFF?text=Partner+3',
    description: 'Servicios profesionales'
  },
  {
    id: 4,
    name: 'Partner 4',
    logo: 'https://via.placeholder.com/200x100/059669/FFFFFF?text=Partner+4',
    description: 'Sostenibilidad y eficiencia'
  },
  {
    id: 5,
    name: 'Partner 5',
    logo: 'https://via.placeholder.com/200x100/DC2626/FFFFFF?text=Partner+5',
    description: 'Experiencia y confianza'
  },
  {
    id: 6,
    name: 'Partner 6',
    logo: 'https://via.placeholder.com/200x100/EA580C/FFFFFF?text=Partner+6',
    description: 'Innovación constante'
  },
  {
    id: 7,
    name: 'Partner 7',
    logo: 'https://via.placeholder.com/200x100/CA8A04/FFFFFF?text=Partner+7',
    description: 'Excelencia en servicios'
  },
  {
    id: 8,
    name: 'Partner 8',
    logo: 'https://via.placeholder.com/200x100/0891B2/FFFFFF?text=Partner+8',
    description: 'Soluciones integrales'
  }
];

export const PartnersSection = () => {
  const scrollRef = useRef(null);
  const animationRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollRef.current;
    if (!scrollContainer) return;

    let scrollPosition = 0;
    const scrollSpeed = 0.5; // pixels per frame

    const animate = () => {
      scrollPosition += scrollSpeed;

      // Reset when we've scrolled past half (since we duplicate the content)
      if (scrollPosition >= scrollContainer.scrollWidth / 2) {
        scrollPosition = 0;
      }

      scrollContainer.scrollLeft = scrollPosition;
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    // Pause on hover
    const handleMouseEnter = () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };

    const handleMouseLeave = () => {
      animationRef.current = requestAnimationFrame(animate);
    };

    scrollContainer.addEventListener('mouseenter', handleMouseEnter);
    scrollContainer.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
      scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-max">
        <div className="text-center mb-12">
          <h2 className="section-title">Nuestros Partenaires</h2>
          <p className="section-subtitle">
            Trabajamos con las mejores empresas para ofrecerte servicios de calidad
          </p>
        </div>

        <div className="relative overflow-hidden">
          {/* Gradient overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-gray-50 to-transparent z-10 pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none"></div>

          {/* Scrolling container */}
          <div
            ref={scrollRef}
            className="flex space-x-8 overflow-x-hidden py-8"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {/* Duplicate the partners array for infinite scroll effect */}
            {[...partners, ...partners].map((partner, index) => (
              <div
                key={`${partner.id}-${index}`}
                className="flex-shrink-0 group"
                style={{
                  perspective: '1000px',
                }}
              >
                <div
                  className="w-64 h-40 bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 p-6 flex flex-col items-center justify-center space-y-3"
                  style={{
                    transform: 'rotateY(0deg)',
                    transition: 'transform 0.6s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'rotateY(5deg) scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'rotateY(0deg) scale(1)';
                  }}
                >
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="w-full h-20 object-contain"
                    loading="lazy"
                  />
                  <p className="text-sm text-gray-600 text-center">
                    {partner.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-600">
            ¿Quieres ser nuestro partner?{' '}
            <a href="/contacto" className="text-primary-600 hover:text-primary-700 font-medium">
              Contáctanos
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};
