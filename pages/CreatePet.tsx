
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePets } from '../contexts/PetContext';
import { Species } from '../types';
import { ArrowLeft, Save, Camera, Dog, Cat, MoreHorizontal } from 'lucide-react';

export const CreatePet: React.FC = () => {
  const navigate = useNavigate();
  const { addPet } = usePets();

  const [formData, setFormData] = useState({
    name: '',
    species: Species.DOG,
    breed: '',
    age: '',
    weight: '',
    photoUrl: 'https://picsum.photos/seed/' + Math.random() + '/400/400',
    behavior: '',
    allergies: '',
    medicalConditions: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addPet(formData);
    navigate('/my-pets');
  };

  const speciesOptions = [
    { value: Species.DOG, icon: <Dog />, label: 'Perro' },
    { value: Species.CAT, icon: <Cat />, label: 'Gato' },
    { value: Species.OTHER, icon: <MoreHorizontal />, label: 'Otro' },
  ];

  return (
    <div className="p-6 bg-white min-h-full">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft size={24} className="text-gray-600" />
        </button>
        <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Nueva Mascota</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col items-center gap-3">
          <div className="relative">
            <img 
              src={formData.photoUrl} 
              alt="Preview" 
              className="w-32 h-32 rounded-3xl object-cover shadow-lg border-4 border-white"
            />
            <button 
              type="button"
              className="absolute bottom-0 right-0 bg-teal-600 text-white p-2 rounded-xl shadow-lg hover:scale-110 transition-transform"
            >
              <Camera size={20} />
            </button>
          </div>
          <span className="text-xs text-gray-400 font-bold uppercase">Foto de perfil</span>
        </div>

        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase ml-1">Nombre</label>
            <input
              type="text"
              required
              placeholder="Ej: Toby"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-teal-500 outline-none transition-all"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase ml-1">Especie</label>
            <div className="grid grid-cols-3 gap-3">
              {speciesOptions.map(opt => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setFormData({...formData, species: opt.value})}
                  className={`flex flex-col items-center gap-2 p-3 rounded-2xl border-2 transition-all ${
                    formData.species === opt.value 
                    ? 'bg-teal-50 border-teal-600 text-teal-600 shadow-sm' 
                    : 'bg-white border-gray-100 text-gray-400'
                  }`}
                >
                  {opt.icon}
                  <span className="text-[10px] font-bold uppercase">{opt.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">Raza</label>
              <input
                type="text"
                placeholder="Ej: Poodle"
                value={formData.breed}
                onChange={e => setFormData({...formData, breed: e.target.value})}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-teal-500 outline-none transition-all text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold text-gray-500 uppercase ml-1">Edad</label>
              <input
                type="text"
                placeholder="Ej: 2 años"
                value={formData.age}
                onChange={e => setFormData({...formData, age: e.target.value})}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-teal-500 outline-none transition-all text-sm"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase ml-1">Comportamiento</label>
            <textarea
              rows={2}
              placeholder="¿Cómo es tu mascota con extraños?"
              value={formData.behavior}
              onChange={e => setFormData({...formData, behavior: e.target.value})}
              className="w-full px-4 py-3 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-teal-500 outline-none transition-all text-sm"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-gray-500 uppercase ml-1 text-red-400">Alergias / Salud Crítica</label>
            <input
              type="text"
              placeholder="Ej: Alérgico al pollo, toma medicación..."
              value={formData.allergies}
              onChange={e => setFormData({...formData, allergies: e.target.value})}
              className="w-full px-4 py-3 bg-red-50/30 border border-red-100 rounded-2xl focus:ring-2 focus:ring-red-500 outline-none transition-all text-sm"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-teal-600 text-white font-bold py-4 rounded-3xl shadow-xl shadow-teal-100 flex items-center justify-center gap-2 hover:bg-teal-700 transition-all active:scale-95"
        >
          <Save size={20} />
          Guardar Mascota
        </button>
      </form>
    </div>
  );
};
