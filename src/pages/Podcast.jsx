// src/pages/Podcast.jsx
import { useState, useEffect } from 'react';
import { Card, Button, YouTubePlaylist } from '../components/ui';
import { Play, Podcast as PodcastIcon, Youtube, Loader, Music } from 'lucide-react';
import { getChannelVideos, checkYouTubeConfig } from '../services/youtubeService';

export const Podcast = () => {
  const [youtubeVideos, setYoutubeVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [youtubeConfigured, setYoutubeConfigured] = useState(false);

  useEffect(() => {
    const loadVideos = async () => {
      try {
        // Vérifier la configuration YouTube
        const config = checkYouTubeConfig();
        setYoutubeConfigured(config.isConfigured);

        if (config.isConfigured) {
          // Charger les vidéos de la chaîne YouTube
          const videos = await getChannelVideos(12);
          setYoutubeVideos(videos);
        }
      } catch (error) {
        console.error('Erreur lors du chargement des vidéos YouTube:', error);
      } finally {
        setLoading(false);
      }
    };

    loadVideos();
  }, []);

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
              <Youtube className="w-5 h-5 mr-2" />
              Ver en YouTube
            </Button>
          </div>
        </div>

        {/* Vidéos YouTube (si configuré) */}
        {youtubeConfigured && youtubeVideos.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 text-center">
              📺 Nuestros últimos vídeos
            </h2>
            {loading ? (
              <div className="text-center py-12">
                <Loader className="w-12 h-12 text-primary-500 animate-spin mx-auto mb-4" />
                <p className="text-gray-600">Cargando vídeos...</p>
              </div>
            ) : (
              <YouTubePlaylist videos={youtubeVideos} columns={3} />
            )}
          </div>
        )}

        {/* Afficher un message si YouTube n'est pas configuré */}
        {!youtubeConfigured && !loading && (
          <Card className="p-6 mb-12 bg-blue-50 border-blue-200">
            <div className="flex items-start gap-4">
              <Youtube className="w-8 h-8 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="font-bold text-blue-900 mb-2">Configuration YouTube nécessaire</h3>
                <p className="text-blue-700 mb-3">
                  Pour afficher les vidéos YouTube automatiquement, configurez votre clé API YouTube dans les variables d'environnement.
                </p>
                <Button variant="outline" size="sm" as="a" href="https://console.cloud.google.com/apis/credentials" target="_blank">
                  Obtenir une clé API
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Featured Video - Premier vidéo YouTube si disponible */}
        {youtubeConfigured && youtubeVideos.length > 0 && (
          <Card className="mb-12 overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <img
                src={youtubeVideos[0].thumbnail}
                alt={youtubeVideos[0].title}
                className="w-full h-64 object-cover rounded-lg"
              />
              <div className="flex flex-col justify-center">
                <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-sm font-medium rounded-full w-fit mb-3">
                  Último vídeo
                </span>
                <h2 className="text-2xl font-bold mb-3">{youtubeVideos[0].title}</h2>
                <p className="text-gray-600 mb-4 line-clamp-3">{youtubeVideos[0].description}</p>
                <div className="flex space-x-3">
                  <Button
                    as="a"
                    href={`https://www.youtube.com/watch?v=${youtubeVideos[0].id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Youtube className="w-5 h-5 mr-2" />
                    Ver en YouTube
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        )}

        {/* Subscribe CTA */}
        <Card className="bg-gradient-to-br from-primary-50 to-purple-50 border-primary-200 p-8 md:p-12">
          <div className="text-center max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <PodcastIcon className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-4 text-gray-900">
              No te pierdas ningún episodio
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Suscríbete a nuestro podcast en tu plataforma favorita y recibe notificaciones de nuevos episodios
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <Button 
                variant="outline" 
                className="w-full hover:bg-primary-50 hover:border-primary-500 transition-all"
                as="a"
                href="https://podcasts.apple.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                🎧 Apple
              </Button>
              <Button 
                variant="outline"
                className="w-full hover:bg-green-50 hover:border-green-500 transition-all"
                as="a"
                href="https://open.spotify.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Music className="w-4 h-4 mr-2" />
                Spotify
              </Button>
              <Button 
                variant="outline"
                className="w-full hover:bg-blue-50 hover:border-blue-500 transition-all"
                as="a"
                href="https://podcasts.google.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                🎙️ Google
              </Button>
              <Button 
                variant="outline"
                className="w-full hover:bg-orange-50 hover:border-orange-500 transition-all"
                as="a"
                href="/rss.xml"
                target="_blank"
                rel="noopener noreferrer"
              >
                📡 RSS
              </Button>
            </div>
            <p className="text-sm text-gray-500">
              Nuevo episodio cada semana • Disponible en todas las plataformas
            </p>
          </div>
        </Card>

        {/* Section FAQ Podcast */}
        <div className="mt-16">
          <h2 className="section-title text-center mb-12">Preguntas frecuentes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                <span className="text-primary-600">📅</span>
                ¿Cuándo salen nuevos episodios?
              </h3>
              <p className="text-gray-600">
                Publicamos un nuevo episodio cada semana, generalmente los viernes por la mañana.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                <span className="text-primary-600">⏱️</span>
                ¿Cuánto dura cada episodio?
              </h3>
              <p className="text-gray-600">
                Los episodios varían entre 25 y 45 minutos, perfectos para escuchar en tu trayecto.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                <span className="text-primary-600">💬</span>
                ¿Puedo sugerir temas?
              </h3>
              <p className="text-gray-600">
                ¡Por supuesto! Contáctanos por email o redes sociales con tus sugerencias.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-shadow">
              <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
                <span className="text-primary-600">🎯</span>
                ¿Para quién es este podcast?
              </h3>
              <p className="text-gray-600">
                Para propietarios, inquilinos y profesionales del sector que buscan consejos prácticos.
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
