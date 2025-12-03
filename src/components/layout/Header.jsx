// src/components/layout/Header.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut, Podcast, Mail } from 'lucide-react';
import { Button } from '../ui';
import { useAuth } from '../../context/AuthContext';
import { AuthModal } from '../auth/AuthModal';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleAuth = (mode) => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      <header className="bg-white shadow-lg sticky top-0 z-40">
        <div className="container-max">
          <div className="flex items-center justify-between h-16 lg:h-20 px-4 md:px-6">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 md:space-x-3 flex-shrink-0">
              <div className="flex items-center justify-center w-8 h-8 md:w-10 md:h-10 bg-primary-500 rounded-xl">
                <div className="flex space-x-1">
                  <div className="w-1 h-4 md:h-6 bg-white rounded-full transform rotate-12"></div>
                  <div className="w-1 h-3 md:h-4 bg-white rounded-full transform -rotate-12"></div>
                  <div className="w-1 h-4 md:h-5 bg-white rounded-full"></div>
                </div>
              </div>
              <span className="text-base md:text-xl font-bold text-gray-900 hidden sm:inline">
                MANOS EXPERTAS
              </span>
              <span className="text-base md:text-xl font-bold text-gray-900 sm:hidden">
                ME
              </span>
            </Link>

            {/* Navigation Desktop */}
            <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
              <Link to="/" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
                Inicio
              </Link>
              <Link to="/services" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
                Servicios
              </Link>
              <Link to="/como-funciona" className="text-gray-700 hover:text-primary-600 transition-colors font-medium">
                Cómo funciona
              </Link>
              <Link to="/contacto" className="text-gray-700 hover:text-primary-600 transition-colors font-medium flex items-center space-x-1">
                <Mail className="w-4 h-4" />
                <span>Contacto</span>
              </Link>
              <Link to="/podcast" className="text-gray-700 hover:text-primary-600 transition-colors font-medium flex items-center space-x-1">
                <Podcast className="w-4 h-4" />
                <span>Podcast</span>
              </Link>
            </nav>

            {/* Actions Desktop */}
            <div className="hidden lg:flex items-center space-x-3 xl:space-x-4">
              {isAuthenticated ? (
                <div className="flex items-center space-x-3">
                  <Link to="/profile" className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors">
                    <img src={user?.avatar} alt={user?.name} className="w-8 h-8 rounded-full object-cover border-2 border-primary-200" />
                    <span className="font-medium hidden xl:inline">{user?.name}</span>
                  </Link>
                  <Button variant="ghost" onClick={handleLogout} className="p-2" aria-label="Cerrar sesión">
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <>
                  <Button variant="ghost" onClick={() => handleAuth('login')} className="whitespace-nowrap">
                    Iniciar sesión
                  </Button>
                  <Button onClick={() => handleAuth('register')} className="whitespace-nowrap">
                    Registrarse
                  </Button>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="lg:hidden border-t border-gray-200 bg-white">
              <div className="px-4 py-4 space-y-3 max-h-[calc(100vh-4rem)] overflow-y-auto">
                <Link
                  to="/"
                  className="block py-2 text-gray-700 hover:text-primary-600 hover:bg-primary-50 px-3 rounded-lg transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Inicio
                </Link>
                <Link
                  to="/services"
                  className="block py-2 text-gray-700 hover:text-primary-600 hover:bg-primary-50 px-3 rounded-lg transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Servicios
                </Link>
                <Link
                  to="/como-funciona"
                  className="block py-2 text-gray-700 hover:text-primary-600 hover:bg-primary-50 px-3 rounded-lg transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Cómo funciona
                </Link>
                <Link
                  to="/contacto"
                  className="flex items-center space-x-2 py-2 text-gray-700 hover:text-primary-600 hover:bg-primary-50 px-3 rounded-lg transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Mail className="w-4 h-4" />
                  <span>Contacto</span>
                </Link>
                <Link
                  to="/podcast"
                  className="flex items-center space-x-2 py-2 text-gray-700 hover:text-primary-600 hover:bg-primary-50 px-3 rounded-lg transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Podcast className="w-4 h-4" />
                  <span>Podcast</span>
                </Link>

                {isAuthenticated ? (
                  <div className="pt-4 border-t border-gray-200 space-y-3">
                    <Link
                      to="/profile"
                      className="flex items-center space-x-3 text-gray-700 py-2 px-3 hover:bg-primary-50 rounded-lg transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <img src={user?.avatar} alt={user?.name} className="w-10 h-10 rounded-full object-cover border-2 border-primary-200" />
                      <span className="font-medium">{user?.name}</span>
                    </Link>
                    <Button variant="outline" onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="w-full">
                      Cerrar sesión
                    </Button>
                  </div>
                ) : (
                  <div className="pt-4 border-t border-gray-200 space-y-3">
                    <Button
                      variant="outline"
                      onClick={() => { handleAuth('login'); setIsMenuOpen(false); }}
                      className="w-full"
                    >
                      Iniciar sesión
                    </Button>
                    <Button
                      onClick={() => { handleAuth('register'); setIsMenuOpen(false); }}
                      className="w-full"
                    >
                      Registrarse
                    </Button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode={authMode}
        onModeChange={setAuthMode}
      />
    </>
  );
};

