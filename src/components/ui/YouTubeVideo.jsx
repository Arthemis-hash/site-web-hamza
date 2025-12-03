// src/components/ui/YouTubeVideo.jsx
import { useState } from 'react';
import PropTypes from 'prop-types';
import { Play, ExternalLink } from 'lucide-react';

/**
 * Composant pour afficher une vidéo YouTube en embed
 */
export const YouTubeVideo = ({ videoId, title, thumbnail, autoplay = false, width = '100%', height = '315' }) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=${autoplay ? '1' : '0'}&rel=0&modestbranding=1`;
  const watchUrl = `https://www.youtube.com/watch?v=${videoId}`;

  const handlePlay = () => {
    setIsPlaying(true);
  };

  return (
    <div className="youtube-video-container" style={{ width, position: 'relative' }}>
      {!isPlaying ? (
        <div 
          className="youtube-thumbnail cursor-pointer relative"
          onClick={handlePlay}
          style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}
        >
          <img 
            src={thumbnail || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
            alt={title || 'YouTube Video'}
            className="absolute top-0 left-0 w-full h-full object-cover rounded-lg"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 hover:bg-opacity-40 transition-all rounded-lg">
            <div className="bg-red-600 hover:bg-red-700 rounded-full p-4 transition-colors">
              <Play className="w-12 h-12 text-white" fill="white" />
            </div>
          </div>
        </div>
      ) : (
        <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0 }}>
          <iframe
            src={embedUrl}
            title={title || 'YouTube Video'}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute top-0 left-0 w-full h-full rounded-lg"
          />
        </div>
      )}
      {title && (
        <div className="mt-2 flex items-center justify-between">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2">
            {title}
          </h3>
          <a
            href={watchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
            title="Voir sur YouTube"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      )}
    </div>
  );
};

YouTubeVideo.propTypes = {
  videoId: PropTypes.string.isRequired,
  title: PropTypes.string,
  thumbnail: PropTypes.string,
  autoplay: PropTypes.bool,
  width: PropTypes.string,
  height: PropTypes.string,
};

/**
 * Composant pour afficher une playlist de vidéos YouTube
 */
export const YouTubePlaylist = ({ videos, columns = 3 }) => {
  if (!videos || videos.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Aucune vidéo disponible</p>
      </div>
    );
  }

  const gridClass = {
    1: 'grid-cols-1',
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  }[columns] || 'md:grid-cols-2 lg:grid-cols-3';

  return (
    <div className={`grid ${gridClass} gap-6`}>
      {videos.map((video) => (
        <div key={video.id} className="youtube-playlist-item">
          <YouTubeVideo
            videoId={video.id}
            title={video.title}
            thumbnail={video.thumbnail}
          />
          {video.description && (
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400 line-clamp-3">
              {video.description}
            </p>
          )}
          {video.publishedAt && (
            <p className="mt-1 text-xs text-gray-500">
              {new Date(video.publishedAt).toLocaleDateString('fr-FR')}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

YouTubePlaylist.propTypes = {
  videos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string,
      description: PropTypes.string,
      thumbnail: PropTypes.string,
      publishedAt: PropTypes.string,
    })
  ),
  columns: PropTypes.number,
};

/**
 * Composant pour afficher un lien vers une vidéo YouTube
 */
export const YouTubeLink = ({ videoId, title, className = '' }) => {
  const url = `https://www.youtube.com/watch?v=${videoId}`;
  
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 ${className}`}
    >
      {title || 'Voir sur YouTube'}
      <ExternalLink className="w-4 h-4" />
    </a>
  );
};

YouTubeLink.propTypes = {
  videoId: PropTypes.string.isRequired,
  title: PropTypes.string,
  className: PropTypes.string,
};

export default YouTubeVideo;
