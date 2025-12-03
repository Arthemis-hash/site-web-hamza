// src/pages/ClientDashboard.jsx
import { useState, useEffect } from 'react';
import { Card, Button } from '../components/ui';
import { useAuth } from '../context/AuthContext';
import { 
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  User,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  FileText,
  MessageSquare,
  Star,
  TrendingUp
} from 'lucide-react';

export const ClientDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [bookings, setBookings] = useState([]);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    // Charger les réservations depuis localStorage
    const savedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    setBookings(savedBookings);
  }, []);

  const tabs = [
    { id: 'overview', label: 'Vue d\'ensemble', icon: TrendingUp },
    { id: 'bookings', label: 'Mes réservations', icon: Calendar },
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'payments', label: 'Paiements', icon: CreditCard },
    { id: 'reviews', label: 'Mes avis', icon: Star },
  ];

  const stats = [
    {
      label: 'Réservations actives',
      value: bookings.filter(b => b.status === 'confirmed').length,
      icon: Calendar,
      color: 'bg-blue-500',
    },
    {
      label: 'Services complétés',
      value: bookings.filter(b => b.status === 'completed').length,
      icon: CheckCircle,
      color: 'bg-green-500',
    },
    {
      label: 'En attente',
      value: bookings.filter(b => b.status === 'pending').length,
      icon: Clock,
      color: 'bg-yellow-500',
    },
    {
      label: 'Montant total',
      value: bookings.reduce((sum, b) => sum + (b.amount || 0), 0) + ' €',
      icon: CreditCard,
      color: 'bg-purple-500',
    },
  ];

  const getStatusBadge = (status) => {
    const badges = {
      pending: { label: 'En attente', class: 'bg-yellow-100 text-yellow-800' },
      confirmed: { label: 'Confirmé', class: 'bg-blue-100 text-blue-800' },
      completed: { label: 'Terminé', class: 'bg-green-100 text-green-800' },
      cancelled: { label: 'Annulé', class: 'bg-red-100 text-red-800' },
    };
    return badges[status] || badges.pending;
  };

  const getStatusIcon = (status) => {
    const icons = {
      pending: <Clock className="w-4 h-4" />,
      confirmed: <CheckCircle className="w-4 h-4" />,
      completed: <CheckCircle className="w-4 h-4" />,
      cancelled: <XCircle className="w-4 h-4" />,
    };
    return icons[status] || icons.pending;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Bonjour, {user?.name || 'Client'} 👋
          </h1>
          <p className="text-gray-600 mt-2">Gérez vos réservations et services</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'bg-primary-500 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Vue d'ensemble */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Statistiques */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card key={index} className="p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                        <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                      </div>
                      <div className={`${stat.color} p-3 rounded-lg`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>

            {/* Réservations récentes */}
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                Réservations récentes
              </h2>
              {bookings.length === 0 ? (
                <div className="text-center py-12">
                  <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Aucune réservation pour le moment</p>
                  <Button className="mt-4" href="/services">
                    Réserver un service
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {bookings.slice(0, 5).map((booking) => {
                    const badge = getStatusBadge(booking.status);
                    return (
                      <div
                        key={booking.id}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                            <FileText className="w-6 h-6 text-primary-600" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{booking.service}</h3>
                            <p className="text-sm text-gray-600">
                              {booking.date} à {booking.time}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${badge.class}`}>
                            {getStatusIcon(booking.status)}
                            {badge.label}
                          </span>
                          <Button size="sm" variant="outline">Détails</Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </Card>

            {/* Actions rapides */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <Calendar className="w-8 h-8 text-primary-600 mb-3" />
                <h3 className="font-semibold mb-2">Nouvelle réservation</h3>
                <p className="text-sm text-gray-600">Réservez un nouveau service</p>
              </Card>
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <MessageSquare className="w-8 h-8 text-green-600 mb-3" />
                <h3 className="font-semibold mb-2">Contacter le support</h3>
                <p className="text-sm text-gray-600">Besoin d'aide ? Contactez-nous</p>
              </Card>
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <Star className="w-8 h-8 text-yellow-600 mb-3" />
                <h3 className="font-semibold mb-2">Laisser un avis</h3>
                <p className="text-sm text-gray-600">Partagez votre expérience</p>
              </Card>
            </div>
          </div>
        )}

        {/* Réservations */}
        {activeTab === 'bookings' && (
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-6">Mes réservations</h2>
            {bookings.length === 0 ? (
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">Aucune réservation</p>
                <Button href="/services">Réserver un service</Button>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.map((booking) => {
                  const badge = getStatusBadge(booking.status);
                  return (
                    <div key={booking.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-bold text-lg">{booking.service}</h3>
                          <p className="text-gray-600 mt-1">{booking.expert}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${badge.class}`}>
                          {getStatusIcon(booking.status)}
                          {badge.label}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Date</p>
                          <p className="font-medium">{booking.date}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Heure</p>
                          <p className="font-medium">{booking.time}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Montant</p>
                          <p className="font-medium">{booking.amount || 'N/A'} €</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Référence</p>
                          <p className="font-medium">#{booking.id}</p>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button size="sm">Voir détails</Button>
                        {booking.status === 'pending' && (
                          <Button size="sm" variant="outline">Annuler</Button>
                        )}
                        {booking.status === 'completed' && (
                          <Button size="sm" variant="outline">Laisser un avis</Button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </Card>
        )}

        {/* Profil */}
        {activeTab === 'profile' && (
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-6">Informations personnelles</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="w-4 h-4 inline mr-2" />
                  Nom complet
                </label>
                <input
                  type="text"
                  value={profileData.name}
                  onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="w-4 h-4 inline mr-2" />
                  Email
                </label>
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone className="w-4 h-4 inline mr-2" />
                  Téléphone
                </label>
                <input
                  type="tel"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="w-4 h-4 inline mr-2" />
                  Adresse
                </label>
                <input
                  type="text"
                  value={profileData.address}
                  onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <Button className="mt-4">Enregistrer les modifications</Button>
            </div>
          </Card>
        )}

        {/* Paiements */}
        {activeTab === 'payments' && (
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-6">Historique des paiements</h2>
            <div className="text-center py-12">
              <CreditCard className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Aucun paiement pour le moment</p>
            </div>
          </Card>
        )}

        {/* Avis */}
        {activeTab === 'reviews' && (
          <Card className="p-6">
            <h2 className="text-xl font-bold mb-6">Mes avis</h2>
            <div className="text-center py-12">
              <Star className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">Vous n'avez pas encore laissé d'avis</p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ClientDashboard;
