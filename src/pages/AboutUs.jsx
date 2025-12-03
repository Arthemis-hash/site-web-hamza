// src/pages/AboutUs.jsx
import { Card } from '../components/ui';
import { Target, Users, Award, Heart, Shield, Zap } from 'lucide-react';

const values = [
  {
    icon: Shield,
    title: 'Confianza',
    description: 'Verificamos a todos nuestros profesionales para garantizar la máxima seguridad'
  },
  {
    icon: Award,
    title: 'Calidad',
    description: 'Solo trabajamos con los mejores expertos en cada área'
  },
  {
    icon: Zap,
    title: 'Rapidez',
    description: 'Respuesta inmediata y servicio el mismo día cuando lo necesites'
  },
  {
    icon: Heart,
    title: 'Satisfacción',
    description: 'Tu satisfacción es nuestra prioridad, garantizado al 100%'
  }
];

const team = [
  {
    name: 'Carlos Martínez',
    role: 'CEO & Fundador',
    image: 'https://via.placeholder.com/300x300/4F46E5/FFFFFF?text=CM',
    bio: '15 años de experiencia en servicios del hogar'
  },
  {
    name: 'Ana García',
    role: 'Directora de Operaciones',
    image: 'https://via.placeholder.com/300x300/7C3AED/FFFFFF?text=AG',
    bio: 'Experta en gestión de servicios y calidad'
  },
  {
    name: 'Miguel Rodríguez',
    role: 'Director de Tecnología',
    image: 'https://via.placeholder.com/300x300/2563EB/FFFFFF?text=MR',
    bio: 'Ingeniero con pasión por la innovación'
  },
  {
    name: 'Laura Sánchez',
    role: 'Directora de Atención al Cliente',
    image: 'https://via.placeholder.com/300x300/059669/FFFFFF?text=LS',
    bio: 'Dedicada a ofrecer la mejor experiencia'
  }
];

export const AboutUs = () => {
  return (
    <div className="section-padding">
      <div className="container-max">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="hero-title mb-4">Sobre Nosotros</h1>
          <p className="section-subtitle mx-auto">
            Conectamos hogares con profesionales de confianza desde 2020
          </p>
        </div>

        {/* Mission */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-primary-500 rounded-xl flex items-center justify-center">
                <Target className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold">Nuestra Misión</h2>
            </div>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
              En Manos Expertas, nuestra misión es simplificar y mejorar la experiencia de contratar
              servicios para el hogar. Creemos que todos merecen tener acceso a profesionales
              cualificados y de confianza de manera rápida y segura.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Trabajamos cada día para conectar a las mejores manos expertas con las personas que
              las necesitan, creando una comunidad basada en la confianza, la calidad y la transparencia.
            </p>
          </div>
          <div className="relative">
            <img
              src="https://via.placeholder.com/600x400/E5E7EB/6B7280?text=Our+Mission"
              alt="Nuestra Misión"
              className="rounded-2xl shadow-xl"
            />
          </div>
        </div>

        {/* Values */}
        <div className="mb-20">
          <h2 className="section-title text-center mb-12">Nuestros Valores</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-primary-600" />
                  </div>
                  <h3 className="font-semibold text-xl mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Stats */}
        <Card className="bg-primary-500 text-white mb-20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-primary-100">Servicios completados</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">500+</div>
              <div className="text-primary-100">Profesionales verificados</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">98%</div>
              <div className="text-primary-100">Satisfacción del cliente</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-primary-100">Soporte disponible</div>
            </div>
          </div>
        </Card>

        {/* Team */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Users className="w-8 h-8 text-primary-600" />
              <h2 className="section-title mb-0">Nuestro Equipo</h2>
            </div>
            <p className="section-subtitle">
              Conoce a las personas que hacen posible Manos Expertas
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
                <p className="text-primary-600 text-sm mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* History */}
        <Card className="bg-cream-50">
          <h2 className="text-2xl font-bold text-center mb-8">Nuestra Historia</h2>
          <div className="space-y-6 max-w-3xl mx-auto">
            <div className="flex space-x-4">
              <div className="flex-shrink-0 w-20 font-bold text-primary-600">2020</div>
              <div>
                <h3 className="font-semibold mb-2">El Comienzo</h3>
                <p className="text-gray-700">
                  Manos Expertas nace con la visión de revolucionar la forma en que las personas
                  encuentran profesionales para su hogar.
                </p>
              </div>
            </div>
            <div className="flex space-x-4">
              <div className="flex-shrink-0 w-20 font-bold text-primary-600">2021</div>
              <div>
                <h3 className="font-semibold mb-2">Expansión</h3>
                <p className="text-gray-700">
                  Alcanzamos los 100 profesionales verificados y 5,000 servicios completados.
                </p>
              </div>
            </div>
            <div className="flex space-x-4">
              <div className="flex-shrink-0 w-20 font-bold text-primary-600">2023</div>
              <div>
                <h3 className="font-semibold mb-2">Reconocimiento</h3>
                <p className="text-gray-700">
                  Premiados como la mejor plataforma de servicios del hogar en Madrid.
                </p>
              </div>
            </div>
            <div className="flex space-x-4">
              <div className="flex-shrink-0 w-20 font-bold text-primary-600">2024</div>
              <div>
                <h3 className="font-semibold mb-2">El Presente</h3>
                <p className="text-gray-700">
                  Más de 500 profesionales y 10,000 servicios completados. Expandiéndonos a nuevas ciudades.
                </p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
