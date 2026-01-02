
export enum PetStatus {
  SAFE = 'SAFE',
  LOST = 'LOST'
}

export enum Species {
  DOG = 'Perro',
  CAT = 'Gato',
  OTHER = 'Otro'
}

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Owner {
  id: string;
  name: string;
  phone: string;
  email: string;
  neighborhood: string;
  homeCoords: {
    lat: number;
    lng: number;
  };
  safeZoneRadius: number; // in meters
}

export interface Pet {
  id: string;
  ownerId: string;
  name: string;
  species: Species;
  breed: string;
  age: string;
  weight: string;
  photoUrl: string;
  behavior: string;
  allergies: string;
  medicalConditions: string;
  status: PetStatus;
}

export interface ScanRecord {
  id: string;
  petId: string;
  timestamp: string;
  coords: {
    lat: number;
    lng: number;
  };
  deviceInfo: string;
  distanceFromHome: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}
