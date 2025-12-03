// src/pages/Podcast.jsx
import { Card, Button } from '../components/ui';
import { Play, Podcast as PodcastIcon, Clock, Calendar, Youtube, Music } from 'lucide-react';

const episodes = [
  {
    id: 1,
    title: 'Cómo elegir al profesional perfecto para tu hogar',
    description: 'En este episodio, discutimos los criterios clave para seleccionar al mejor profesional para tus necesidades del hogar.',
    duration: '32 min',
    date: '15 Nov 2024',
    cover: 'https://via.placeholder.com/400x250/4F46E5/FFFFFF?text=Episodio+1',
    youtubeUrl: 'https://www.youtube.com/watch?v=YOUR_VIDEO_ID_1',
    spotifyUrl: 'https://open.spotify.com/episode/YOUR_EPISODE_ID_1'
  },
  {
    id: 2,
    title: 'Mantenimiento preventivo: ahorra dinero a largo plazo',
    description: 'Descubre cómo el mantenimiento preventivo puede evitarte costos innecesarios y prolongar la vida de tus instalaciones.',
    duration: '28 min',
    date: '8 Nov 2024',
    cover: 'https://via.placeholder.com/400x250/7C3AED/FFFFFF?text=Episodio+2',
    youtubeUrl: 'https://www.youtube.com/watch?v=YOUR_VIDEO_ID_2',
    spotifyUrl: 'https://open.spotify.com/episode/YOUR_EPISODE_ID_2'
  },
  {
    id: 3,
    title: 'Tendencias en diseño de interiores 2024',
    description: 'Exploramos las últimas tendencias en diseño de interiores y cómo aplicarlas en tu hogar.',
    duration: '45 min',
    date: '1 Nov 2024',
    cover: 'https://via.placeholder.com/400x250/2563EB/FFFFFF?text=Episodio+3',
    youtubeUrl: 'https://www.youtube.com/watch?v=YOUR_VIDEO_ID_3',
    spotifyUrl: 'https://open.spotify.com/episode/YOUR_EPISODE_ID_3'
  },
  {
    id: 4,
    title: 'Eficiencia energética en el hogar',
    description: 'Consejos prácticos para reducir tu consumo energético y hacer tu hogar más sostenible.',
    duration: '38 min',
    date: '25 Oct 2024',
    cover: 'https://via.placeholder.com/400x250/059669/FFFFFF?text=Episodio+4',
    youtubeUrl: 'https://www.youtube.com/watch?v=YOUR_VIDEO_ID_4',
    spotifyUrl: 'https://open.spotify.com/episode/YOUR_EPISODE_ID_4'
  },
  {
    id: 5,
    title: 'Renovaciones que aumentan el valor de tu propiedad',
    description: 'Qué renovaciones ofrecen el mejor retorno de inversión cuando vendes tu propiedad.',
    duration: '41 min',
    date: '18 Oct 2024',
    cover: 'https://via.placeholder.com/400x250/DC2626/FFFFFF?text=Episodio+5',
    youtubeUrl: 'https://www.youtube.com/watch?v=YOUR_VIDEO_ID_5',
    spotifyUrl: 'https://open.spotify.com/episode/YOUR_EPISODE_ID_5'
  },
  {
    id: 6,
    title: 'Smart Home: automatiza tu hogar',
    description: 'Una guía para principiantes sobre cómo convertir tu hogar en una casa inteligente.',
    duration: '35 min',
    date: '11 Oct 2024',
    cover: 'https://via.placeholder.com/400x250/EA580C/FFFFFF?text=Episodio+6',
    youtubeUrl: 'https://www.youtube.com/watch?v=YOUR_VIDEO_ID_6',
    spotifyUrl: 'https://open.spotify.com/episode/YOUR_EPISODE_ID_6'
  }
];

export const Podcast = () => {
  return (
    <div className="section-padding">
      <div className="container-max">
        {/* Hero */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-primary-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <PodcastIcon className="w-10 h-10 text-white" />
          </div>
          <h1 className="hero-title mb-4">Podcast Manos Expertas</h1>
          <p className="section-subtitle mx-auto mb-8">
            Consejos, trucos y entrevistas con expertos para cuidar mejor tu hogar
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg">
              <Play className="w-5 h-5 mr-2" />
              Escuchar último episodio
            </Button>
            <Button variant="outline" size="lg">
              Suscribirse
            </Button>
          </div>
        </div>

        {/* Featured Episode */}
        <Card className="mb-12 overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <img
              src={episodes[0].cover}
              alt={episodes[0].title}
              className="w-full h-64 object-cover rounded-lg"
            />
            <div className="flex flex-col justify-center">
              <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-sm font-medium rounded-full w-fit mb-3">
                Último episodio
              </span>
              <h2 className="text-2xl font-bold mb-3">{episodes[0].title}</h2>
              <p className="text-gray-600 mb-4">{episodes[0].description}</p>
              <div className="flex items-center space-x-4 text-sm text-gray-500 mb-6">
                <div className="flex items-center space-x-1">
                  <Clock className="w-4 h-4" />
                  <span>{episodes[0].duration}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="w-4 h-4" />
                  <span>{episodes[0].date}</span>
                </div>
              </div>
              <div className="flex space-x-3">
                <Button
                  as="a"
                  href={episodes[0].youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  variant="outline"
                >
                  <Youtube className="w-5 h-5 mr-2" />
                  YouTube
                </Button>
                <Button
                  as="a"
                  href={episodes[0].spotifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Music className="w-5 h-5 mr-2" />
                  Spotify
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* All Episodes */}
        <div className="mb-12">
          <h2 className="section-title mb-8">Todos los episodios</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {episodes.map((episode) => (
              <Card key={episode.id} className="group hover:shadow-lg transition-shadow">
                <div className="relative mb-4 overflow-hidden rounded-lg">
                  <img
                    src={episode.cover}
                    alt={episode.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex space-x-3">
                      <a
                        href={episode.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center hover:bg-red-700 transition-colors"
                        aria-label="Ver en YouTube"
                      >
                        <Youtube className="w-6 h-6 text-white" />
                      </a>
                      <a
                        href={episode.spotifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center hover:bg-green-700 transition-colors"
                        aria-label="Escuchar en Spotify"
                      >
                        <Music className="w-6 h-6 text-white" />
                      </a>
                    </div>
                  </div>
                </div>
                <h3 className="font-semibold text-lg mb-2 group-hover:text-primary-600 transition-colors">
                  {episode.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {episode.description}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <div className="flex items-center space-x-1">
                    <Clock className="w-4 h-4" />
                    <span>{episode.duration}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{episode.date}</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Subscribe CTA */}
        <Card className="bg-primary-50 border-primary-200">
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-4">No te pierdas ningún episodio</h2>
            <p className="text-gray-600 mb-6">
              Suscríbete a nuestro podcast en tu plataforma favorita
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button variant="outline">Apple Podcasts</Button>
              <Button variant="outline">Spotify</Button>
              <Button variant="outline">Google Podcasts</Button>
              <Button variant="outline">RSS</Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
