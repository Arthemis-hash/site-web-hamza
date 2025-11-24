// src/pages/Profile.jsx
import { useState, useEffect } from 'react';
import { Card, Button, Input } from '../components/ui';
import { useAuth } from '../context/AuthContext';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Star,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';

export const Profile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('info');
  const [bookings, setBookings] = useState([]);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    address: '',
  });

  useEffect(() => {
    // Load user bookings from localStorage
    const savedBookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    setBookings(savedBookings);
  }, []);

  const tabs = [
    { id: 'info', label: 'Información personal', icon: User },
    { id: 'bookings', label: 'Mis reservas', icon: Calendar },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100';
      case 'confirmed': return 'text-blue-600 bg-blue-100';
      case 'completed': return 'text-green-600 bg-green-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'confirmed': return <CheckCircle className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'Pendiente';
      case 'confirmed': return 'Confirmada';
      case 'completed': return 'Completada';
      case 'cancelled': return 'Cancelada';
      default: return 'Desconocido';
    }
  };

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your API
    console.log('Updating profile:', profileData);
    // For demo purposes, just show a success message
    alert('Perfil actualizado correctamente');
  };

  return (
    <div className="section-padding bg-gray-50">
      <div className="container-max max-w-6xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Mi perfil</h1>
          <p className="text-gray-600">Gestiona tu información personal y revisa tus reservas</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <div className="text-center mb-6">
                <img
                  src={user?.avatar || 'https://randomuser.me/api/portraits/men/32.jpg'}
                  alt={user?.name || 'Usuario'}
                  className="w-20 h-20 rounded-full mx-auto mb-4 bg-gray-100 object-cover border-2 border-primary-200"
                />
                <h3 className="font-semibold text-lg">{user?.name || 'Usuario'}</h3>
                <p className="text-gray-600 text-sm">{user?.email || 'Sin email'}</p>
              </div>

              <nav className="space-y-2">
                {tabs.map((tab) => {
                  const Icon = tab.icon;
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                        activeTab === tab.id
                          ? 'bg-primary-100 text-primary-700 font-medium'
                          : 'text-gray-600 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{tab.label}</span>
                    </button>
                  );
                })}
              </nav>
            </Card>
          </div>

          {/* Main content */}
          <div className="lg:col-span-3">
            {activeTab === 'info' && (
              <Card>
                <h2 className="text-2xl font-bold mb-6">Información personal</h2>
                
                <form onSubmit={handleUpdateProfile} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="Nombre completo"
                      icon={User}
                      value={profileData.name}
                      onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                    />
                    
                    <Input
                      label="Correo electrónico"
                      type="email"
                      icon={Mail}
                      value={profileData.email}
                      onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Input
                      label="Teléfono"
                      type="tel"
                      icon={Phone}
                      value={profileData.phone}
                      onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="+34 600 123 456"
                    />
                    
                    <Input
                      label="Dirección"
                      icon={MapPin}
                      value={profileData.address}
                      onChange={(e) => setProfileData(prev => ({ ...prev, address: e.target.value }))}
                      placeholder="Calle, número, ciudad"
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit">
                      Guardar cambios
                    </Button>
                  </div>
                </form>
              </Card>
            )}

            {activeTab === 'bookings' && (
              <div className="space-y-6">
                <Card>
                  <h2 className="text-2xl font-bold mb-6">Mis reservas</h2>
                  
                  {bookings.length > 0 ? (
                    <div className="space-y-4">
                      {bookings.map((booking) => (
                        <div key={booking.id} className="border border-gray-200 rounded-lg p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center space-x-4">
                              <img
                                src={booking.expert?.avatar}
                                alt={booking.expert?.name}
                                className="w-12 h-12 rounded-full"
                              />
                              <div>
                                <h3 className="font-semibold text-lg">{booking.service?.name}</h3>
                                <p className="text-gray-600">{booking.expert?.name}</p>
                              </div>
                            </div>
                            
                            <div className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm ${getStatusColor(booking.status)}`}>
                              {getStatusIcon(booking.status)}
                              <span>{getStatusText(booking.status)}</span>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-4 h-4 text-gray-400" />
                              <span>{booking.date} a las {booking.time}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <MapPin className="w-4 h-4 text-gray-400" />
                              <span>{booking.address}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Phone className="w-4 h-4 text-gray-400" />
                              <span>{booking.phone}</span>
                            </div>
                          </div>

                          {booking.description && (
                            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                              <p className="text-sm text-gray-700">{booking.description}</p>
                            </div>
                          )}

                          <div className="flex justify-end mt-4 space-x-2">
                            {booking.status === 'pending' && (
                              <Button variant="outline" size="sm">
                                Cancelar
                              </Button>
                            )}
                            {booking.status === 'completed' && (
                              <Button size="sm">
                                Dejar reseña
                              </Button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Calendar className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No tienes reservas</h3>
                      <p className="text-gray-600 mb-6">Cuando hagas una reserva, aparecerá aquí</p>
                      <Button onClick={() => window.location.href = '/services'}>
                        Explorar servicios
                      </Button>
                    </div>
                  )}
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

