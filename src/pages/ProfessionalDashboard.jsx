// src/pages/ProfessionalDashboard.jsx
import { useState, useEffect } from 'react';
import { Card, Button } from '../components/ui';
import { useAuth } from '../context/AuthContext';
import { 
  Briefcase,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  DollarSign,
  TrendingUp,
  Users,
  FileText,
  Upload,
  Download,
  Phone,
  Mail,
  MapPin,
  Star,
  MessageSquare,
  Settings,
  BarChart3,
  Award,
  Building,
  Wallet,
  AlertCircle,
  Eye,
  Edit
} from 'lucide-react';

export const ProfessionalDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [services, setServices] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+34 600 000 000',
    address: 'Jaén, España',
    company: 'Ma Société SL',
    siret: '123456789',
    iban: 'ES00 0000 0000 0000 0000 0000',
    specialty: 'Plomberie',
    experience: '10 ans',
    bio: 'Professionnel expérimenté...',
    certifications: ['Certification 1', 'Certification 2'],
  });

  useEffect(() => {
    // Charger les services du professionnel
    const savedServices = JSON.parse(localStorage.getItem('professional_services') || '[]');
    setServices(savedServices);

    // Charger les documents
    const savedDocuments = JSON.parse(localStorage.getItem('professional_documents') || '[]');
    setDocuments(savedDocuments);
  }, []);

  const tabs = [
    { id: 'overview', label: 'Tableau de bord', icon: BarChart3 },
    { id: 'services', label: 'Services actifs', icon: Briefcase },
    { id: 'calendar', label: 'Calendrier', icon: Calendar },
    { id: 'profile', label: 'Profil pro', icon: Building },
    { id: 'documents', label: 'Documents', icon: FileText },
    { id: 'payments', label: 'Paiements', icon: Wallet },
    { id: 'reviews', label: 'Avis clients', icon: Star },
  ];

  // Statistiques du professionnel
  const stats = [
    {
      label: 'Services réalisés',
      value: services.filter(s => s.status === 'completed').length,
      change: '+12%',
      icon: CheckCircle,
      color: 'bg-green-500',
    },
    {
      label: 'En cours',
      value: services.filter(s => s.status === 'confirmed').length,
      change: '+3',
      icon: Clock,
      color: 'bg-blue-500',
    },
    {
      label: 'Revenus ce mois',
      value: '2,450 €',
      change: '+18%',
      icon: DollarSign,
      color: 'bg-purple-500',
    },
    {
      label: 'Note moyenne',
      value: '4.8/5',
      change: '+0.2',
      icon: Star,
      color: 'bg-yellow-500',
    },
  ];

  const getStatusBadge = (status) => {
    const badges = {
      pending: { label: 'Nouveau', class: 'bg-yellow-100 text-yellow-800' },
      confirmed: { label: 'Confirmé', class: 'bg-blue-100 text-blue-800' },
      in_progress: { label: 'En cours', class: 'bg-indigo-100 text-indigo-800' },
      completed: { label: 'Terminé', class: 'bg-green-100 text-green-800' },
      cancelled: { label: 'Annulé', class: 'bg-red-100 text-red-800' },
    };
    return badges[status] || badges.pending;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header Professionnel */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Award className="w-8 h-8 text-primary-600" />
              Espace Professionnel
            </h1>
            <p className="text-gray-600 mt-2">
              Bienvenue {user?.name || 'Professionnel'} - Gérez votre activité
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4" />
            </Button>
            <Button size="sm">
              <MessageSquare className="w-4 h-4 mr-2" />
              Messages
            </Button>
          </div>
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
                    ? 'bg-primary-600 text-white shadow-lg'
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
                    <div className="flex items-start justify-between mb-4">
                      <div className={`${stat.color} p-3 rounded-lg`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-sm text-green-600 font-medium bg-green-50 px-2 py-1 rounded">
                        {stat.change}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </Card>
                );
              })}
            </div>

            {/* Services récents */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  Services récents
                </h2>
                {services.length === 0 ? (
                  <div className="text-center py-8">
                    <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                    <p className="text-gray-500">Aucun service pour le moment</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {services.slice(0, 5).map((service) => {
                      const badge = getStatusBadge(service.status);
                      return (
                        <div key={service.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium">{service.title}</p>
                            <p className="text-sm text-gray-600">{service.client} - {service.date}</p>
                          </div>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${badge.class}`}>
                            {badge.label}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </Card>

              <Card className="p-6">
                <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Prochains rendez-vous
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="w-12 h-12 bg-blue-500 rounded-lg flex flex-col items-center justify-center text-white">
                      <span className="text-lg font-bold">15</span>
                      <span className="text-xs">DÉC</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Installation cuisine</p>
                      <p className="text-sm text-gray-600">Client: Marie Dupont</p>
                      <p className="text-sm text-blue-600">14:00 - 17:00</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="w-12 h-12 bg-green-500 rounded-lg flex flex-col items-center justify-center text-white">
                      <span className="text-lg font-bold">16</span>
                      <span className="text-xs">DÉC</span>
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Réparation plomberie</p>
                      <p className="text-sm text-gray-600">Client: Jean Martin</p>
                      <p className="text-sm text-green-600">09:00 - 12:00</p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Actions rapides */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <Upload className="w-8 h-8 text-primary-600 mb-3" />
                <h3 className="font-semibold mb-2">Nouveau document</h3>
                <p className="text-sm text-gray-600">Ajouter un document</p>
              </Card>
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <Calendar className="w-8 h-8 text-blue-600 mb-3" />
                <h3 className="font-semibold mb-2">Gérer l'agenda</h3>
                <p className="text-sm text-gray-600">Planifier les rendez-vous</p>
              </Card>
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <FileText className="w-8 h-8 text-green-600 mb-3" />
                <h3 className="font-semibold mb-2">Générer facture</h3>
                <p className="text-sm text-gray-600">Créer une nouvelle facture</p>
              </Card>
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <MessageSquare className="w-8 h-8 text-purple-600 mb-3" />
                <h3 className="font-semibold mb-2">Messages</h3>
                <p className="text-sm text-gray-600">3 nouveaux messages</p>
              </Card>
            </div>
          </div>
        )}

        {/* Services actifs */}
        {activeTab === 'services' && (
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Services actifs</h2>
              <Button size="sm">
                <Calendar className="w-4 h-4 mr-2" />
                Voir le calendrier
              </Button>
            </div>
            {services.length === 0 ? (
              <div className="text-center py-12">
                <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Aucun service actif</p>
              </div>
            ) : (
              <div className="space-y-4">
                {services.map((service) => {
                  const badge = getStatusBadge(service.status);
                  return (
                    <div key={service.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-bold text-lg">{service.title}</h3>
                          <p className="text-gray-600 mt-1">Client: {service.client}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${badge.class}`}>
                          {badge.label}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm mb-4">
                        <div>
                          <p className="text-gray-500">Date</p>
                          <p className="font-medium">{service.date}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Heure</p>
                          <p className="font-medium">{service.time}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Montant</p>
                          <p className="font-medium">{service.amount} €</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Téléphone</p>
                          <p className="font-medium">{service.phone || 'N/A'}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Référence</p>
                          <p className="font-medium">#{service.id}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          Détails
                        </Button>
                        <Button size="sm" variant="outline">
                          <Phone className="w-4 h-4 mr-1" />
                          Appeler
                        </Button>
                        <Button size="sm" variant="outline">
                          <MessageSquare className="w-4 h-4 mr-1" />
                          Message
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </Card>
        )}

        {/* Profil professionnel */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Building className="w-5 h-5" />
                Informations professionnelles
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nom de l'entreprise *
                  </label>
                  <input
                    type="text"
                    value={profile.company}
                    onChange={(e) => setProfile({...profile, company: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    SIRET / NIF *
                  </label>
                  <input
                    type="text"
                    value={profile.siret}
                    onChange={(e) => setProfile({...profile, siret: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email professionnel *
                  </label>
                  <input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Téléphone *
                  </label>
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({...profile, phone: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Adresse professionnelle *
                  </label>
                  <input
                    type="text"
                    value={profile.address}
                    onChange={(e) => setProfile({...profile, address: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Spécialité
                  </label>
                  <select
                    value={profile.specialty}
                    onChange={(e) => setProfile({...profile, specialty: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                  >
                    <option>Plomberie</option>
                    <option>Électricité</option>
                    <option>Menuiserie</option>
                    <option>Peinture</option>
                    <option>Jardinage</option>
                    <option>Autre</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Années d'expérience
                  </label>
                  <input
                    type="text"
                    value={profile.experience}
                    onChange={(e) => setProfile({...profile, experience: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Biographie / Présentation
                  </label>
                  <textarea
                    value={profile.bio}
                    onChange={(e) => setProfile({...profile, bio: e.target.value})}
                    rows={4}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
              <Button className="mt-6">
                <Edit className="w-4 h-4 mr-2" />
                Enregistrer les modifications
              </Button>
            </Card>

            <Card className="p-6">
              <h2 className="text-xl font-bold mb-6">Informations bancaires</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    IBAN
                  </label>
                  <input
                    type="text"
                    value={profile.iban}
                    onChange={(e) => setProfile({...profile, iban: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="ES00 0000 0000 0000 0000 0000"
                  />
                  <p className="text-sm text-gray-500 mt-2">
                    Pour recevoir vos paiements
                  </p>
                </div>
              </div>
              <Button className="mt-6" variant="outline">
                Enregistrer
              </Button>
            </Card>
          </div>
        )}

        {/* Documents */}
        {activeTab === 'documents' && (
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Mes documents</h2>
              <Button size="sm">
                <Upload className="w-4 h-4 mr-2" />
                Télécharger un document
              </Button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <Card className="p-4 border-2 border-dashed border-gray-300 hover:border-primary-500 transition-colors cursor-pointer">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-center text-gray-600">Assurance professionnelle</p>
              </Card>
              <Card className="p-4 border-2 border-dashed border-gray-300 hover:border-primary-500 transition-colors cursor-pointer">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-center text-gray-600">Certificats / Diplômes</p>
              </Card>
              <Card className="p-4 border-2 border-dashed border-gray-300 hover:border-primary-500 transition-colors cursor-pointer">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-center text-gray-600">Kbis / Autres</p>
              </Card>
            </div>
            {documents.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 mb-4">Aucun document téléchargé</p>
                <Button>
                  <Upload className="w-4 h-4 mr-2" />
                  Ajouter un document
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                {documents.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="w-8 h-8 text-primary-600" />
                      <div>
                        <p className="font-medium">{doc.name}</p>
                        <p className="text-sm text-gray-600">{doc.size} - {doc.date}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="outline">
                        <XCircle className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        )}

        {/* Paiements */}
        {activeTab === 'payments' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="p-6">
                <Wallet className="w-8 h-8 text-green-600 mb-3" />
                <p className="text-sm text-gray-600 mb-1">Solde disponible</p>
                <p className="text-2xl font-bold">2,450.00 €</p>
                <Button size="sm" className="mt-4 w-full">Demander un virement</Button>
              </Card>
              <Card className="p-6">
                <TrendingUp className="w-8 h-8 text-blue-600 mb-3" />
                <p className="text-sm text-gray-600 mb-1">Revenus ce mois</p>
                <p className="text-2xl font-bold">3,200.00 €</p>
                <p className="text-sm text-green-600 mt-2">+18% vs mois dernier</p>
              </Card>
              <Card className="p-6">
                <Clock className="w-8 h-8 text-yellow-600 mb-3" />
                <p className="text-sm text-gray-600 mb-1">En attente</p>
                <p className="text-2xl font-bold">750.00 €</p>
                <p className="text-sm text-gray-600 mt-2">3 paiements</p>
              </Card>
            </div>
            <Card className="p-6">
              <h2 className="text-xl font-bold mb-6">Historique des transactions</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                    <div>
                      <p className="font-medium">Paiement reçu - Réparation plomberie</p>
                      <p className="text-sm text-gray-600">Client: Jean Martin - 12 Déc 2024</p>
                    </div>
                  </div>
                  <p className="font-bold text-green-600">+150.00 €</p>
                </div>
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                    <div>
                      <p className="font-medium">Paiement reçu - Installation cuisine</p>
                      <p className="text-sm text-gray-600">Client: Marie Dupont - 10 Déc 2024</p>
                    </div>
                  </div>
                  <p className="font-bold text-green-600">+450.00 €</p>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Avis clients */}
        {activeTab === 'reviews' && (
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold">Avis clients</h2>
              <div className="flex items-center gap-2">
                <Star className="w-6 h-6 text-yellow-500 fill-current" />
                <span className="text-2xl font-bold">4.8</span>
                <span className="text-gray-600">(24 avis)</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="border-b pb-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="font-semibold">Jean Martin</p>
                    <p className="text-sm text-gray-600">Il y a 2 jours</p>
                  </div>
                  <div className="flex">
                    {[1,2,3,4,5].map(i => (
                      <Star key={i} className="w-4 h-4 text-yellow-500 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700">Excellent travail, très professionnel et ponctuel. Je recommande vivement!</p>
              </div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ProfessionalDashboard;
