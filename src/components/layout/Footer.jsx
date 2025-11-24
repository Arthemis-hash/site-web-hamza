// src/components/layout/Footer.jsx
import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Phone, 
  Mail, 
  MapPin 
} from 'lucide-react';

export const Footer = () => {
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
              <Facebook className="w-5 h-5 hover:text-primary-300 cursor-pointer" />
              <Twitter className="w-5 h-5 hover:text-primary-300 cursor-pointer" />
              <Instagram className="w-5 h-5 hover:text-primary-300 cursor-pointer" />
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
              <li><Link to="/sobre-nosotros" className="hover:text-white">Sobre nosotros</Link></li>
              <li><Link to="/como-funciona" className="hover:text-white">Cómo funciona</Link></li>
              <li><Link to="/ayuda" className="hover:text-white">Ayuda</Link></li>
              <li><Link to="/terminos" className="hover:text-white">Términos</Link></li>
              <li><Link to="/privacidad" className="hover:text-white">Privacidad</Link></li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="font-semibold mb-4">Contacto</h3>
            <div className="space-y-3 text-primary-200">
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>+34 900 123 456</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>info@manosexpertas.es</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <span>Madrid, España</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-700 mt-8 pt-8 text-center text-primary-200">
          <p>&copy; 2024 Manos Expertas. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

