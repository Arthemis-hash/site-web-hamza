// src/pages/Profile.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import ClientDashboard from './ClientDashboard';
import ProfessionalDashboard from './ProfessionalDashboard';

export const Profile = () => {
  const { user, isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Rediriger vers la page de connexion si non authentifié
    if (!loading && !isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, loading, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  // Afficher le dashboard approprié selon le type d'utilisateur
  if (user?.userType === 'professional') {
    return <ProfessionalDashboard />;
  }

  // Par défaut, afficher le dashboard client
  return <ClientDashboard />;
};

export default Profile;

