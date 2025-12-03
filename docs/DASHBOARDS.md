# 👥 Dashboards Clients & Professionnels - Manos Expertas

## Vue d'ensemble

Le système propose **deux dashboards distincts** selon le type d'utilisateur :
- **Dashboard Client** : Pour les particuliers qui réservent des services
- **Dashboard Professionnel** : Pour les artisans qui proposent leurs services

## Architecture

```
┌────────────────┐
│   Profile.jsx  │──┐
└────────────────┘  │
                    ├──▶ ClientDashboard.jsx (client)
                    │
                    └──▶ ProfessionalDashboard.jsx (professional)
```

---

## 🧑 Dashboard Client

### Fonctionnalités

#### 1. Vue d'ensemble
- **Statistiques** :
  - Réservations actives
  - Services complétés
  - En attente
  - Montant total dépensé

- **Réservations récentes** : Liste des 5 dernières réservations
- **Actions rapides** :
  - Nouvelle réservation
  - Contacter le support
  - Laisser un avis

#### 2. Mes réservations
- Liste complète des réservations
- Filtres par statut :
  - ✅ Confirmé
  - ⏳ En attente
  - ✔️ Terminé
  - ❌ Annulé
- Détails de chaque réservation :
  - Service
  - Expert assigné
  - Date et heure
  - Montant
  - Référence
- Actions :
  - Voir détails
  - Annuler (si en attente)
  - Laisser un avis (si terminé)

#### 3. Profil
- Informations personnelles :
  - Nom complet
  - Email
  - Téléphone
  - Adresse

#### 4. Paiements
- Historique des paiements
- Moyens de paiement enregistrés

#### 5. Mes avis
- Avis laissés sur les services
- Note moyenne donnée

---

## 👷 Dashboard Professionnel

### Fonctionnalités Avancées

#### 1. Tableau de bord
- **Statistiques** :
  - Services réalisés (+12%)
  - En cours (nombre)
  - Revenus du mois (+18%)
  - Note moyenne (4.8/5)

- **Services récents** : 5 derniers services avec statuts
- **Prochains rendez-vous** :
  - Vue calendrier
  - Détails du client
  - Horaires

- **Actions rapides** :
  - Nouveau document
  - Gérer l'agenda
  - Générer une facture
  - Messages clients

#### 2. Services actifs
- Liste complète des services
- Informations détaillées :
  - Client (nom, téléphone, email)
  - Date et heure
  - Montant
  - Statut (Nouveau, Confirmé, En cours, Terminé, Annulé)
  - Référence unique

- Actions :
  - Voir détails complets
  - Appeler le client
  - Envoyer un message
  - Marquer comme terminé

#### 3. Calendrier
- Vue mensuelle/hebdomadaire
- Planification des rendez-vous
- Disponibilités
- Gestion des créneaux

#### 4. Profil professionnel
**Informations d'entreprise :**
- Nom de l'entreprise *
- SIRET / NIF *
- Email professionnel *
- Téléphone *
- Adresse professionnelle *
- Spécialité (Plomberie, Électricité, etc.)
- Années d'expérience
- Biographie / Présentation

**Informations bancaires :**
- IBAN (pour recevoir les paiements)

#### 5. Documents
**Types de documents requis :**
- 📄 Assurance professionnelle (obligatoire)
- 🎓 Certificats / Diplômes
- 🏢 Kbis / Extrait K
- 📋 Autres documents légaux

**Actions :**
- Télécharger un document
- Visualiser
- Supprimer

#### 6. Paiements
**Vue d'ensemble :**
- 💰 Solde disponible
- 📈 Revenus du mois (avec pourcentage d'évolution)
- ⏳ Paiements en attente

**Historique des transactions :**
- Liste complète des paiements reçus
- Détails par transaction :
  - Service réalisé
  - Client
  - Date
  - Montant

**Actions :**
- Demander un virement
- Télécharger les reçus
- Générer des factures

#### 7. Avis clients
- Note moyenne globale (ex: 4.8/5)
- Nombre total d'avis
- Liste des avis récents
- Réponse aux avis

---

## 🔄 Système de sélection

### Lors de l'inscription

Le formulaire `RegisterForm.jsx` propose de choisir le type de compte :

```jsx
<div className="grid grid-cols-2 gap-3">
  <button type="button" onClick={() => setUserType('client')}>
    Soy Cliente
  </button>
  <button type="button" onClick={() => setUserType('professional')}>
    Soy Profesional
  </button>
</div>
```

### Routing automatique

Le fichier `Profile.jsx` route automatiquement vers le bon dashboard :

```jsx
if (user?.userType === 'professional') {
  return <ProfessionalDashboard />;
}
return <ClientDashboard />;
```

---

## 💾 Données stockées

### Client
```javascript
{
  id: 1,
  name: "Jean Dupont",
  email: "jean@example.com",
  userType: "client",
  bookings: [...],
  payments: [...]
}
```

### Professionnel
```javascript
{
  id: 2,
  name: "Marie Martin",
  email: "marie@example.com",
  userType: "professional",
  company: "Martin Plomberie SL",
  siret: "123456789",
  iban: "ES00 0000 0000 0000 0000 0000",
  specialty: "Plomberie",
  services: [...],
  documents: [...],
  reviews: [...]
}
```

---

## 🎨 Design UI

### Dashboard Client
- **Couleurs** : Bleu/Violet (primaire)
- **Style** : Simple et clair
- **Focus** : Réservations et historique
- **Layout** : Onglets horizontaux

### Dashboard Professionnel
- **Couleurs** : Bleu foncé/Or (professionnel)
- **Style** : Riche en données
- **Focus** : Gestion et revenus
- **Layout** : Onglets avec statistiques avancées

---

## 📱 Responsive

Les deux dashboards sont entièrement responsive :
- **Mobile** : Layout vertical, onglets scrollables
- **Tablet** : Grille 2 colonnes
- **Desktop** : Grille 3-4 colonnes, sidebar

---

## 🔧 Installation

Les fichiers sont déjà créés :
- ✅ `src/pages/ClientDashboard.jsx`
- ✅ `src/pages/ProfessionalDashboard.jsx`
- ✅ `src/pages/Profile.jsx` (mise à jour)
- ✅ `src/context/AuthContext.jsx` (avec userType)
- ✅ `src/components/auth/RegisterForm.jsx` (avec sélecteur)

Aucune installation supplémentaire requise !

---

## 🧪 Tester

### En tant que client
1. S'inscrire en choisissant "Soy Cliente"
2. Se connecter
3. Accéder au profil (`/profile`)
4. → Dashboard Client s'affiche

### En tant que professionnel
1. S'inscrire en choisissant "Soy Profesional"
2. Se connecter
3. Accéder au profil (`/profile`)
4. → Dashboard Professionnel s'affiche

---

## 🚀 Prochaines étapes

### Pour le Dashboard Client
- [ ] Système de notation des services
- [ ] Historique détaillé des paiements
- [ ] Chat en direct avec les professionnels
- [ ] Programme de fidélité

### Pour le Dashboard Professionnel
- [ ] Calendrier interactif (FullCalendar.js)
- [ ] Système de facturation automatique
- [ ] Statistiques avancées (graphiques)
- [ ] Chat en direct avec les clients
- [ ] Gestion des équipes (si plusieurs employés)

---

## 📊 Statistiques fictives

Pour les tests, des données fictives sont générées :
- 24 avis pour un professionnel
- Note moyenne de 4.8/5
- Revenus mensuels de 2,450€
- 12% d'augmentation des services réalisés

Ces données peuvent être remplacées par de vraies données depuis une API backend.

---

## 🔐 Sécurité

- ✅ Vérification du type d'utilisateur côté front
- ⚠️ **Important** : Implémenter la vérification côté backend également
- ✅ LocalStorage pour la persistence
- ⚠️ **Production** : Utiliser des tokens JWT sécurisés

---

## 📞 Support

Pour toute question sur les dashboards :
- 📧 Email : sami73232@gmail.com
- 📱 WhatsApp : +34 900 123 456

---

**Version** : 1.0.0  
**Date** : 3 Décembre 2025  
**Statut** : ✅ Fonctionnel
