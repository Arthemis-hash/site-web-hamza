/**
 * Service YouTube API
 * Permet de récupérer et afficher des vidéos YouTube sur le site
 */

const YOUTUBE_CONFIG = {
  apiKey: import.meta.env.VITE_YOUTUBE_API_KEY,
  channelId: import.meta.env.VITE_YOUTUBE_CHANNEL_ID,
};

/**
 * Récupère les dernières vidéos d'une chaîne YouTube
 * @param {number} maxResults - Nombre maximum de résultats
 * @returns {Promise<Array>} - Liste des vidéos
 */
export const getChannelVideos = async (maxResults = 10) => {
  try {
    if (!YOUTUBE_CONFIG.apiKey || !YOUTUBE_CONFIG.channelId) {
      console.warn('⚠️ Configuration YouTube API manquante');
      return [];
    }

    const url = new URL('https://www.googleapis.com/youtube/v3/search');
    url.searchParams.append('key', YOUTUBE_CONFIG.apiKey);
    url.searchParams.append('channelId', YOUTUBE_CONFIG.channelId);
    url.searchParams.append('part', 'snippet,id');
    url.searchParams.append('order', 'date');
    url.searchParams.append('maxResults', maxResults.toString());
    url.searchParams.append('type', 'video');

    const response = await fetch(url.toString());

    if (!response.ok) {
      const error = await response.json();
      console.error('Erreur YouTube API:', error);
      throw new Error(`Erreur YouTube API: ${response.status}`);
    }

    const data = await response.json();

    return data.items.map(item => ({
      id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.high.url,
      publishedAt: item.snippet.publishedAt,
      url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
      embedUrl: `https://www.youtube.com/embed/${item.id.videoId}`,
    }));
  } catch (error) {
    console.error('Erreur lors de la récupération des vidéos YouTube:', error);
    return [];
  }
};

/**
 * Récupère les détails d'une vidéo spécifique
 * @param {string} videoId - ID de la vidéo YouTube
 * @returns {Promise<Object|null>} - Détails de la vidéo
 */
export const getVideoDetails = async (videoId) => {
  try {
    if (!YOUTUBE_CONFIG.apiKey) {
      console.warn('⚠️ Clé API YouTube manquante');
      return null;
    }

    const url = new URL('https://www.googleapis.com/youtube/v3/videos');
    url.searchParams.append('key', YOUTUBE_CONFIG.apiKey);
    url.searchParams.append('id', videoId);
    url.searchParams.append('part', 'snippet,contentDetails,statistics');

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`Erreur YouTube API: ${response.status}`);
    }

    const data = await response.json();

    if (data.items.length === 0) {
      return null;
    }

    const video = data.items[0];

    return {
      id: video.id,
      title: video.snippet.title,
      description: video.snippet.description,
      thumbnail: video.snippet.thumbnails.high.url,
      publishedAt: video.snippet.publishedAt,
      duration: video.contentDetails.duration,
      viewCount: parseInt(video.statistics.viewCount),
      likeCount: parseInt(video.statistics.likeCount),
      commentCount: parseInt(video.statistics.commentCount),
      url: `https://www.youtube.com/watch?v=${video.id}`,
      embedUrl: `https://www.youtube.com/embed/${video.id}`,
    };
  } catch (error) {
    console.error('Erreur lors de la récupération des détails de la vidéo:', error);
    return null;
  }
};

/**
 * Recherche des vidéos YouTube par mot-clé
 * @param {string} query - Terme de recherche
 * @param {number} maxResults - Nombre maximum de résultats
 * @returns {Promise<Array>} - Liste des vidéos
 */
export const searchVideos = async (query, maxResults = 10) => {
  try {
    if (!YOUTUBE_CONFIG.apiKey) {
      console.warn('⚠️ Clé API YouTube manquante');
      return [];
    }

    const url = new URL('https://www.googleapis.com/youtube/v3/search');
    url.searchParams.append('key', YOUTUBE_CONFIG.apiKey);
    url.searchParams.append('q', query);
    url.searchParams.append('part', 'snippet');
    url.searchParams.append('maxResults', maxResults.toString());
    url.searchParams.append('type', 'video');

    const response = await fetch(url.toString());

    if (!response.ok) {
      throw new Error(`Erreur YouTube API: ${response.status}`);
    }

    const data = await response.json();

    return data.items.map(item => ({
      id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.high.url,
      publishedAt: item.snippet.publishedAt,
      url: `https://www.youtube.com/watch?v=${item.id.videoId}`,
      embedUrl: `https://www.youtube.com/embed/${item.id.videoId}`,
    }));
  } catch (error) {
    console.error('Erreur lors de la recherche de vidéos:', error);
    return [];
  }
};

/**
 * Génère un lecteur YouTube embed
 * @param {string} videoId - ID de la vidéo
 * @param {Object} options - Options du lecteur
 * @returns {string} - Code HTML du lecteur embed
 */
export const generateEmbedPlayer = (videoId, options = {}) => {
  const {
    width = '560',
    height = '315',
    autoplay = 0,
    controls = 1,
    modestbranding = 1,
    rel = 0,
  } = options;

  const params = new URLSearchParams({
    autoplay: autoplay.toString(),
    controls: controls.toString(),
    modestbranding: modestbranding.toString(),
    rel: rel.toString(),
  });

  return `<iframe 
    width="${width}" 
    height="${height}" 
    src="https://www.youtube.com/embed/${videoId}?${params.toString()}" 
    frameborder="0" 
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
    allowfullscreen
  ></iframe>`;
};

/**
 * Vérifie la configuration YouTube API
 */
export const checkYouTubeConfig = () => {
  const config = {
    isConfigured: !!(YOUTUBE_CONFIG.apiKey && YOUTUBE_CONFIG.channelId),
    hasApiKey: !!YOUTUBE_CONFIG.apiKey,
    hasChannelId: !!YOUTUBE_CONFIG.channelId,
  };

  console.log('🎥 Configuration YouTube:', config);
  return config;
};

export default {
  getChannelVideos,
  getVideoDetails,
  searchVideos,
  generateEmbedPlayer,
  checkYouTubeConfig,
};
