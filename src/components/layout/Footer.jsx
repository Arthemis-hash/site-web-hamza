// src/components/layout/Footer.jsx
import { Link } from 'react-router-dom';
import {
  Linkedin,
  Instagram,
  Phone,
  Mail,
  MapPin
} from 'lucide-react';

const SOCIAL_LINKS = {
  linkedin: import.meta.env.VITE_LINKEDIN_URL || 'https://www.linkedin.com/company/manos-expertas',
  instagram: import.meta.env.VITE_INSTAGRAM_URL || 'https://www.instagram.com/manosexpertas',
  whatsapp: import.meta.env.VITE_WHATSAPP_BUSINESS || '+34900123456'
};

const CONTACT_INFO = {
  phone: import.meta.env.VITE_CONTACT_PHONE || '+34 900 123 456',
  email: import.meta.env.VITE_CONTACT_EMAIL || 'info@manosexpertas.es',
  address: import.meta.env.VITE_CONTACT_ADDRESS || 'Jaen, España'
};

export const Footer = () => {
  const handleWhatsAppClick = () => {
    const phoneNumber = SOCIAL_LINKS.whatsapp.replace(/[^0-9]/g, '');
    window.open(`https://wa.me/${phoneNumber}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <footer className="bg-primary-800 text-white">
      <div className="container-max px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo et description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-primary-500 rounded-xl">
                <div className="flex space-x-1">
                  <div className="w-1 h-6 bg-white rounded-full transform rotate-12"></div>
                  <div className="w-1 h-4 bg-white rounded-full transform -rotate-12"></div>
                  <div className="w-1 h-5 bg-white rounded-full"></div>
                </div>
              </div>
              <span className="text-xl font-bold">MANOS EXPERTAS</span>
            </div>
            <p className="text-primary-200">
              Conectamos expertos con personas que necesitan servicios para el hogar.
            </p>
            <div className="flex space-x-4">
              <a
                href={SOCIAL_LINKS.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary-700 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-primary-700 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <button
                onClick={handleWhatsAppClick}
                className="w-10 h-10 bg-primary-700 rounded-lg flex items-center justify-center hover:bg-primary-600 transition-colors"
                aria-label="WhatsApp Business"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Servicios */}
          <div>
            <h3 className="font-semibold mb-4">Servicios</h3>
            <ul className="space-y-2 text-primary-200">
              <li><Link to="/services/electricidad" className="hover:text-white">Electricidad</Link></li>
              <li><Link to="/services/fontaneria" className="hover:text-white">Fontanería</Link></li>
              <li><Link to="/services/limpieza" className="hover:text-white">Limpieza</Link></li>
              <li><Link to="/services/mudanzas" className="hover:text-white">Mudanzas</Link></li>
              <li><Link to="/services/pintura" className="hover:text-white">Pintura</Link></li>
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <h3 className="font-semibold mb-4">Empresa</h3>
            <ul className="space-y-2 text-primary-200">
              <li><Link to="/sobre-nosotros" className="hover:text-white transition-colors">Sobre nosotros</Link></li>
              <li><Link to="/como-funciona" className="hover:text-white transition-colors">Cómo funciona</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">Preguntas frecuentes</Link></li>
              <li><Link to="/contacto" className="hover:text-white transition-colors">Contacto</Link></li>
              <li><Link to="/podcast" className="hover:text-white transition-colors">Podcast</Link></li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="font-semibold mb-4">Contacto</h3>
            <div className="space-y-3 text-primary-200">
              <a href={`tel:${CONTACT_INFO.phone}`} className="flex items-center space-x-2 hover:text-white transition-colors">
                <Phone className="w-4 h-4" />
                <span>{CONTACT_INFO.phone}</span>
              </a>
              <a href={`mailto:${CONTACT_INFO.email}`} className="flex items-center space-x-2 hover:text-white transition-colors">
                <Mail className="w-4 h-4" />
                <span>{CONTACT_INFO.email}</span>
              </a>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>{CONTACT_INFO.address}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-primary-200 text-sm">
            <p>&copy; 2024 Manos Expertas. Todos los derechos reservados.</p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              <Link to="/privacidad" className="hover:text-white transition-colors">Política de Privacidad</Link>
              <Link to="/cookies" className="hover:text-white transition-colors">Política de Cookies</Link>
              <Link to="/terminos" className="hover:text-white transition-colors">Términos y Condiciones</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

