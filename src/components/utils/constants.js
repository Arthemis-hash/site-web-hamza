// src/utils/constants.js
import { 
  Zap, 
  Wrench, 
  Paintbrush, 
  Truck,
  Settings,
  Home,
  Car,
  Laptop
} from 'lucide-react';

export const SERVICES = [
  {
    id: 'electricidad',
    name: 'Electricidad',
    icon: Zap,
    description: 'Instalaciones y reparaciones eléctricas',
    basePrice: 50,
  },
  {
    id: 'fontaneria',
    name: 'Fontanería',
    icon: Wrench,
    description: 'Reparaciones de plomería y instalaciones',
    basePrice: 45,
  },
  {
    id: 'limpieza',
    name: 'Limpieza',
    icon: Home,
    description: 'Servicios de limpieza profesional',
    basePrice: 30,
  },
  {
    id: 'mudanzas',
    name: 'Mudanzas',
    icon: Truck,
    description: 'Servicios de mudanza y transporte',
    basePrice: 80,
  },
  {
    id: 'pintura',
    name: 'Pintura',
    icon: Paintbrush,
    description: 'Trabajos de pintura interior y exterior',
    basePrice: 35,
  },
  {
    id: 'reparaciones',
    name: 'Reparaciones',
    icon: Settings,
    description: 'Reparaciones generales del hogar',
    basePrice: 40,
  },
];

export const EXPERTS = [
  {
    id: 1,
    name: 'Carmen Gómez',
    avatar: '/api/placeholder/100/100',
    rating: 4.8,
    reviews: 156,
    services: ['electricidad', 'reparaciones'],
    price: 55,
    experience: '8 años de experiencia',
  },
  {
    id: 2,
    name: 'Antonio Morales',
    avatar: '/api/placeholder/100/100',
    rating: 4.9,
    reviews: 203,
    services: ['fontaneria', 'reparaciones'],
    price: 50,
    experience: '12 años de experiencia',
  },
  {
    id: 3,
    name: 'Laura Ruiz',
    avatar: '/api/placeholder/100/100',
    rating: 4.7,
    reviews: 89,
    services: ['limpieza'],
    price: 35,
    experience: '5 años de experiencia',
  },
  {
    id: 4,
    name: 'Miguel Torres',
    avatar: '/api/placeholder/100/100',
    rating: 4.9,
    reviews: 167,
    services: ['mudanzas'],
    price: 85,
    experience: '10 años de experiencia',
  },
  {
    id: 5,
    name: 'Sofia Martinez',
    avatar: '/api/placeholder/100/100',
    rating: 4.8,
    reviews: 134,
    services: ['pintura'],
    price: 40,
    experience: '7 años de experiencia',
  },
];

export const PAYMENT_METHODS = [
  { id: 'card', name: 'Tarjeta de crédito/débito', icon: '💳' },
  { id: 'paypal', name: 'PayPal', icon: '💙' },
  { id: 'stripe', name: 'Stripe', icon: '💰' },
];

