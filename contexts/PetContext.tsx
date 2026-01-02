
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Pet, PetStatus, Species } from '../types';
import { MOCK_PETS } from '../constants';
import { useAuth } from './AuthContext';

interface PetContextType {
  pets: Pet[];
  addPet: (pet: Omit<Pet, 'id' | 'ownerId' | 'status'>) => void;
  toggleStatus: (petId: string) => void;
}

const PetContext = createContext<PetContextType | undefined>(undefined);

export const PetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [pets, setPets] = useState<Pet[]>([]);

  useEffect(() => {
    const savedPets = localStorage.getItem(`mordelon_pets_${user?.id}`);
    if (savedPets) {
      setPets(JSON.parse(savedPets));
    } else if (user) {
      // Load mocks only if it's the first time
      setPets(MOCK_PETS);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      localStorage.setItem(`mordelon_pets_${user.id}`, JSON.stringify(pets));
    }
  }, [pets, user]);

  const addPet = (newPetData: Omit<Pet, 'id' | 'ownerId' | 'status'>) => {
    const newPet: Pet = {
      ...newPetData,
      id: `pet-${Math.random().toString(36).substr(2, 9)}`,
      ownerId: user?.id || 'anon',
      status: PetStatus.SAFE,
    };
    setPets(prev => [...prev, newPet]);
  };

  const toggleStatus = (petId: string) => {
    setPets(prev => prev.map(p => 
      p.id === petId ? { ...p, status: p.status === PetStatus.SAFE ? PetStatus.LOST : PetStatus.SAFE } : p
    ));
  };

  return (
    <PetContext.Provider value={{ pets, addPet, toggleStatus }}>
      {children}
    </PetContext.Provider>
  );
};

export const usePets = () => {
  const context = useContext(PetContext);
  if (context === undefined) {
    throw new Error('usePets must be used within a PetProvider');
  }
  return context;
};
