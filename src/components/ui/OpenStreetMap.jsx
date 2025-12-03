// src/components/ui/OpenStreetMap.jsx
import { useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';

/**
 * Composant OpenStreetMap pour afficher une carte avec marqueur
 * Utilise Leaflet.js pour l'affichage
 */
export const OpenStreetMap = ({ 
  latitude = 37.7796, 
  longitude = -3.7849, 
  zoom = 13,
  markerTitle = "Manos Expertas",
  className = "",
  height = "400px"
}) => {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  useEffect(() => {
    // Charger Leaflet dynamiquement
    const loadLeaflet = async () => {
      if (typeof window === 'undefined') return;

      // Charger Leaflet CSS
      if (!document.getElementById('leaflet-css')) {
        const link = document.createElement('link');
        link.id = 'leaflet-css';
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(link);
      }

      // Charger Leaflet JS
      if (!window.L) {
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
        script.async = true;
        document.body.appendChild(script);

        await new Promise((resolve) => {
          script.onload = resolve;
        });
      }

      // Initialiser la carte
      if (mapRef.current && window.L && !mapInstanceRef.current) {
        try {
          // Créer la carte
          mapInstanceRef.current = window.L.map(mapRef.current).setView(
            [latitude, longitude],
            zoom
          );

          // Ajouter les tuiles OpenStreetMap
          window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19,
          }).addTo(mapInstanceRef.current);

          // Créer une icône personnalisée
          const customIcon = window.L.divIcon({
            html: `
              <div style="
                background-color: #4F46E5;
                border: 3px solid white;
                border-radius: 50%;
                width: 40px;
                height: 40px;
                display: flex;
                align-items: center;
                justify-content: center;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              ">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
              </div>
            `,
            className: 'custom-marker',
            iconSize: [40, 40],
            iconAnchor: [20, 40],
            popupAnchor: [0, -40],
          });

          // Ajouter le marqueur
          const marker = window.L.marker([latitude, longitude], {
            icon: customIcon
          }).addTo(mapInstanceRef.current);

          // Ajouter un popup
          marker.bindPopup(`
            <div style="text-align: center; padding: 8px;">
              <strong style="font-size: 16px; color: #4F46E5;">${markerTitle}</strong>
              <br/>
              <span style="color: #666; font-size: 14px;">Jaén, España</span>
            </div>
          `);
        } catch (error) {
          console.error('Error initializing map:', error);
        }
      }
    };

    loadLeaflet();

    // Cleanup
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [latitude, longitude, zoom, markerTitle]);

  return (
    <div className={`relative rounded-lg overflow-hidden shadow-lg ${className}`}>
      <div 
        ref={mapRef} 
        style={{ height, width: '100%' }}
        className="z-0"
      />
    </div>
  );
};

/**
 * Composant de carte statique (iframe OpenStreetMap)
 * Plus léger, sans JavaScript
 */
export const StaticMap = ({
  latitude = 37.7796,
  longitude = -3.7849,
  zoom = 13,
  className = "",
  height = "400px"
}) => {
  const mapUrl = `https://www.openstreetmap.org/export/embed.html?bbox=${longitude - 0.01},${latitude - 0.01},${longitude + 0.01},${latitude + 0.01}&layer=mapnik&marker=${latitude},${longitude}`;

  return (
    <div className={`relative rounded-lg overflow-hidden shadow-lg ${className}`}>
      <iframe
        width="100%"
        height={height}
        frameBorder="0"
        scrolling="no"
        marginHeight="0"
        marginWidth="0"
        src={mapUrl}
        style={{ border: 0 }}
        title="Mapa de Jaén"
      />
      <div className="absolute bottom-4 left-4 bg-white px-3 py-2 rounded-lg shadow-md flex items-center space-x-2">
        <MapPin className="w-4 h-4 text-primary-600" />
        <span className="text-sm font-medium text-gray-700">Jaén, España</span>
      </div>
    </div>
  );
};

/**
 * Composant de lien vers OpenStreetMap
 */
export const MapLink = ({
  latitude = 37.7796,
  longitude = -3.7849,
  label = "Ver en el mapa",
  className = ""
}) => {
  const mapUrl = `https://www.openstreetmap.org/?mlat=${latitude}&mlon=${longitude}#map=15/${latitude}/${longitude}`;

  return (
    <a
      href={mapUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 transition-colors ${className}`}
    >
      <MapPin className="w-4 h-4" />
      <span>{label}</span>
    </a>
  );
};

export default OpenStreetMap;
