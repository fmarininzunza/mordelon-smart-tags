
import React from 'react';
import { Pet, Owner, Species, PetStatus, Product } from './types';

export const COLORS = {
  primary: '#0D9488', // Teal
  secondary: '#F97316', // Orange
  danger: '#DC2626', // Red
  background: '#F9FAFB'
};

export const MOCK_OWNER: Owner = {
  id: 'o1',
  name: 'Juan Pérez',
  phone: '+56 9 1234 5678',
  email: 'juan@mordelon.cl',
  neighborhood: 'Providencia, Santiago',
  homeCoords: { lat: -33.4372, lng: -70.6331 },
  safeZoneRadius: 500
};

export const MOCK_PETS: Pet[] = [
  {
    id: 'pet-123',
    ownerId: 'o1',
    name: 'Toby',
    species: Species.DOG,
    breed: 'Golden Retriever',
    age: '3 años',
    weight: '25kg',
    photoUrl: 'https://picsum.photos/seed/toby/400/400',
    behavior: 'Miedoso con ruidos fuertes, muy amigable con personas.',
    allergies: 'Alérgico al pollo.',
    medicalConditions: 'Displasia leve de cadera.',
    status: PetStatus.SAFE
  }
];

export const MOCK_PRODUCTS: Product[] = [
  { id: 'p1', name: 'Placa Inteligente Clásica - Teal', price: 14990, image: 'https://picsum.photos/seed/tag1/300/300', category: 'Tags' },
  { id: 'p2', name: 'Placa Silicona Ultra Resistente', price: 18990, image: 'https://picsum.photos/seed/tag2/300/300', category: 'Tags' },
  { id: 'p3', name: 'Arnés Aventura Mordelón', price: 24990, image: 'https://picsum.photos/seed/harness/300/300', category: 'Accesorios' },
  { id: 'p4', name: 'Placa QR Personalizada Madera', price: 16990, image: 'https://picsum.photos/seed/wood/300/300', category: 'Tags' }
];
