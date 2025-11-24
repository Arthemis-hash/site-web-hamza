// src/components/layout/Header.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, User, LogOut } from 'lucide-react';
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
          <div className="flex items-center justify-between h-16 px-4">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-10 h-10 bg-primary-500 rounded-xl">
                <div className="flex space-x-1">
                  <div className="w-1 h-6 bg-white rounded-full transform rotate-12"></div>
                  <div className="w-1 h-4 bg-white rounded-full transform -rotate-12"></div>
                  <div className="w-1 h-5 bg-white rounded-full"></div>
                </div>
              </div>
              <span className="text-xl font-bold text-gray-900">
                MANOS EXPERTAS
              </span>
            </Link>

            {/* Navigation Desktop */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/" className="text-gray-700 hover:text-primary-600 transition-colors">
                Inicio
              </Link>
              <Link to="/services" className="text-gray-700 hover:text-primary-600 transition-colors">
                Servicios
              </Link>
              <Link to="/como-funciona" className="text-gray-700 hover:text-primary-600 transition-colors">
                Cómo funciona
              </Link>
            </nav>

            {/* Actions Desktop */}
            <div className="hidden md:flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <Link to="/profile" className="flex items-center space-x-2 text-gray-700 hover:text-primary-600">
                    <img src={user?.avatar} alt={user?.name} className="w-8 h-8 rounded-full" />
                    <span>{user?.name}</span>
                  </Link>
                  <Button variant="ghost" onClick={handleLogout} className="p-2">
                    <LogOut className="w-4 h-4" />
                  </Button>
                </div>
              ) : (
                <>
                  <Button variant="ghost" onClick={() => handleAuth('login')}>
                    Iniciar sesión
                  </Button>
                  <Button onClick={() => handleAuth('register')}>
                    Registrarse
                  </Button>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-200">
              <div className="px-4 py-4 space-y-4">
                <Link 
                  to="/" 
                  className="block text-gray-700 hover:text-primary-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Inicio
                </Link>
                <Link 
                  to="/services" 
                  className="block text-gray-700 hover:text-primary-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Servicios
                </Link>
                <Link 
                  to="/como-funciona" 
                  className="block text-gray-700 hover:text-primary-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Cómo funciona
                </Link>
                
                {isAuthenticated ? (
                  <div className="pt-4 border-t border-gray-200 space-y-4">
                    <Link 
                      to="/profile" 
                      className="flex items-center space-x-2 text-gray-700"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <img src={user?.avatar} alt={user?.name} className="w-8 h-8 rounded-full" />
                      <span>{user?.name}</span>
                    </Link>
                    <Button variant="outline" onClick={handleLogout} className="w-full">
                      Cerrar sesión
                    </Button>
                  </div>
                ) : (
                  <div className="pt-4 border-t border-gray-200 space-y-2">
                    <Button 
                      variant="outline" 
                      onClick={() => handleAuth('login')} 
                      className="w-full"
                    >
                      Iniciar sesión
                    </Button>
                    <Button 
                      onClick={() => handleAuth('register')} 
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

