
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MOCK_PETS, MOCK_OWNER } from '../constants';
import { PetStatus } from '../types';
import { Phone, MessageCircle, AlertTriangle, MapPin, Info, Stethoscope, Heart } from 'lucide-react';
import { getPetCareAdvice } from '../services/geminiService';

export const PetProfile: React.FC = () => {
  const { id } = useParams();
  const pet = MOCK_PETS.find(p => p.id === id) || MOCK_PETS[0];
  const [advice, setAdvice] = useState<string | null>(null);
  const [isLost, setIsLost] = useState(pet.status === PetStatus.LOST);
  const [locationPermRequested, setLocationPermRequested] = useState(false);

  useEffect(() => {
    const fetchAdvice = async () => {
      const result = await getPetCareAdvice(pet);
      setAdvice(result);
    };
    fetchAdvice();

    // Simular envío de alerta al dueño al cargar la página (escaneo)
    console.log("ALERTA ENVIADA AL DUEÑO: QR Escaneado para", pet.name);
  }, [pet]);

  const handleShareLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        alert(`Ubicación compartida con el dueño: ${pos.coords.latitude}, ${pos.coords.longitude}`);
        setLocationPermRequested(true);
      });
    }
  };

  return (
    <div className={`min-h-screen ${isLost ? 'bg-red-50' : 'bg-teal-50'} pb-10`}>
      {/* Dynamic Header for Lost State */}
      {isLost && (
        <div className="bg-red-600 text-white p-4 text-center animate-pulse flex items-center justify-center gap-2 sticky top-0 z-50">
          <AlertTriangle size={24} />
          <span className="font-bold text-lg">¡ESTA MASCOTA ESTÁ PERDIDA!</span>
        </div>
      )}

      {/* Hero Image */}
      <div className="relative h-72">
        <img src={pet.photoUrl} alt={pet.name} className="w-full h-full object-cover" />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-6 text-white">
          <h2 className="text-4xl font-bold">{pet.name}</h2>
          <p className="text-lg opacity-90">{pet.breed} • {pet.age}</p>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Contact Buttons */}
        <div className="grid grid-cols-2 gap-4">
          <a href={`tel:${MOCK_OWNER.phone}`} className="bg-teal-600 text-white p-4 rounded-2xl flex flex-col items-center gap-2 shadow-lg hover:bg-teal-700 transition-colors">
            <Phone />
            <span className="font-bold text-sm">Llamar Dueño</span>
          </a>
          <a href={`https://wa.me/${MOCK_OWNER.phone.replace(/\s+/g, '')}`} className="bg-green-600 text-white p-4 rounded-2xl flex flex-col items-center gap-2 shadow-lg hover:bg-green-700 transition-colors">
            <MessageCircle />
            <span className="font-bold text-sm">WhatsApp</span>
          </a>
        </div>

        {/* Location Request */}
        {!locationPermRequested && (
          <div className="bg-white p-5 rounded-2xl border-2 border-dashed border-teal-300 flex flex-col items-center text-center gap-3">
            <MapPin className="text-teal-600" size={32} />
            <h4 className="font-bold text-gray-800 text-sm">¿Encontraste a {pet.name}?</h4>
            <p className="text-xs text-gray-500">Comparte tu ubicación para que el dueño pueda llegar rápido.</p>
            <button onClick={handleShareLocation} className="bg-teal-600 text-white px-6 py-2 rounded-full font-bold text-xs uppercase">
              Compartir mi ubicación
            </button>
          </div>
        )}

        {/* Info Cards */}
        <div className="space-y-4">
          {/* Behavior & Info */}
          <div className="bg-white p-5 rounded-2xl shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-teal-700 font-bold border-b pb-2">
              <Info size={18} />
              <span>Comportamiento y Notas</span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed italic">
              "{pet.behavior}"
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {pet.allergies && <span className="bg-red-50 text-red-600 text-[10px] font-bold px-2 py-1 rounded-full uppercase border border-red-100">Alérgico: {pet.allergies}</span>}
              <span className="bg-blue-50 text-blue-600 text-[10px] font-bold px-2 py-1 rounded-full uppercase border border-blue-100">Peso: {pet.weight}</span>
            </div>
          </div>

          {/* AI Advice Section */}
          <div className="bg-orange-50 p-5 rounded-2xl border border-orange-100 space-y-3">
            <div className="flex items-center gap-2 text-orange-700 font-bold">
              <Heart className="animate-pulse" size={18} />
              <span>Mordelón AI Advice</span>
            </div>
            <p className="text-sm text-orange-800 leading-relaxed">
              {advice || "Generando consejos de cuidado específicos..."}
            </p>
          </div>

          {/* Location Safety Context */}
          <div className="bg-white p-5 rounded-2xl shadow-sm space-y-3">
            <div className="flex items-center gap-2 text-gray-700 font-bold border-b pb-2">
              <MapPin size={18} />
              <span>Referencia de Hogar</span>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-xs text-gray-500 uppercase font-bold tracking-tight">Barrio</p>
                <p className="text-sm font-semibold text-gray-800">{MOCK_OWNER.neighborhood}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500 uppercase font-bold tracking-tight">Zona Segura</p>
                <p className="text-sm font-semibold text-teal-600">Aprox. {MOCK_OWNER.safeZoneRadius}m</p>
              </div>
            </div>
            <p className="text-[10px] text-gray-400 text-center pt-2">
              La dirección exacta está oculta por seguridad de la mascota y su dueño.
            </p>
          </div>
        </div>

        {/* Emergency Medical */}
        <div className="bg-red-600 text-white p-5 rounded-2xl shadow-lg space-y-2">
          <div className="flex items-center gap-2 font-bold">
            <Stethoscope size={20} />
            <span>Info Médica Crítica</span>
          </div>
          <p className="text-sm opacity-90">{pet.medicalConditions}</p>
        </div>
      </div>
      
      {/* Dev Toggle for demo */}
      <div className="fixed bottom-24 right-4 z-[60]">
        <button 
          onClick={() => setIsLost(!isLost)}
          className={`p-3 rounded-full shadow-2xl transition-all ${isLost ? 'bg-green-500 rotate-180' : 'bg-red-500'}`}
        >
          <AlertTriangle className="text-white" size={24} />
        </button>
      </div>
    </div>
  );
};
