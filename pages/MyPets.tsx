
import React from 'react';
import { usePets } from '../contexts/PetContext';
import { Plus, Settings, QrCode, AlertCircle, History, CheckCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { PetStatus } from '../types';

export const MyPets: React.FC = () => {
  const { pets, toggleStatus } = usePets();
  const navigate = useNavigate();

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-800 tracking-tight">Mis Mascotas</h2>
          <p className="text-xs text-gray-500 font-medium">Gestiona tus placas inteligentes</p>
        </div>
        <button 
          onClick={() => navigate('/create-pet')}
          className="bg-teal-600 text-white p-3 rounded-2xl shadow-lg hover:bg-teal-700 transition-all active:scale-95"
        >
          <Plus size={24} />
        </button>
      </div>

      {pets.length === 0 ? (
        <div className="text-center py-12 space-y-4">
          <div className="bg-gray-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto text-gray-300">
            <Plus size={40} />
          </div>
          <p className="text-gray-500 font-medium">No tienes mascotas registradas aún.</p>
          <button 
            onClick={() => navigate('/create-pet')}
            className="text-teal-600 font-bold underline"
          >
            Registrar mi primera mascota
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {pets.map(pet => (
            <div key={pet.id} className={`bg-white rounded-3xl p-5 border-2 transition-all shadow-sm ${pet.status === PetStatus.LOST ? 'border-red-200 bg-red-50/20' : 'border-gray-50'}`}>
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img src={pet.photoUrl} alt={pet.name} className="w-20 h-20 rounded-2xl object-cover shadow-md" />
                  <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${pet.status === PetStatus.SAFE ? 'bg-green-500' : 'bg-red-500 animate-pulse'}`}></div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-800">{pet.name}</h3>
                  <p className="text-xs text-gray-500 font-medium">{pet.breed} • {pet.age}</p>
                  <div className="flex gap-2 mt-2">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${pet.status === PetStatus.SAFE ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {pet.status === PetStatus.SAFE ? 'En Casa' : 'REPORTADO: PERDIDO'}
                    </span>
                  </div>
                </div>
                <button className="text-gray-300 hover:text-teal-600 transition-colors">
                  <Settings size={22} />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-2 mt-6">
                <Link to={`/pet/${pet.id}`} className="bg-gray-100/50 p-3 rounded-2xl flex flex-col items-center gap-1 hover:bg-teal-50 hover:text-teal-600 transition-all">
                  <QrCode size={18} />
                  <span className="text-[9px] font-black uppercase tracking-tighter">Perfil QR</span>
                </Link>
                <Link to="/alerts" className="bg-gray-100/50 p-3 rounded-2xl flex flex-col items-center gap-1 hover:bg-orange-50 hover:text-orange-600 transition-all">
                  <History size={18} />
                  <span className="text-[9px] font-black uppercase tracking-tighter">Historial</span>
                </Link>
                <button 
                  onClick={() => toggleStatus(pet.id)}
                  className={`p-3 rounded-2xl flex flex-col items-center gap-1 transition-all border ${
                    pet.status === PetStatus.SAFE 
                    ? 'bg-red-50 border-red-100 text-red-600 hover:bg-red-100' 
                    : 'bg-green-50 border-green-100 text-green-600 hover:bg-green-100'
                  }`}
                >
                  {pet.status === PetStatus.SAFE ? <AlertCircle size={18} /> : <CheckCircle size={18} />}
                  <span className="text-[9px] font-black uppercase tracking-tighter">
                    {pet.status === PetStatus.SAFE ? 'Perdido' : 'Recuperado'}
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="bg-teal-50 border-2 border-dashed border-teal-200 p-8 rounded-3xl flex flex-col items-center justify-center gap-4 text-center">
        <div className="bg-white p-4 rounded-3xl shadow-sm transform rotate-3">
          <QrCode size={40} className="text-teal-600" />
        </div>
        <div className="space-y-1">
          <h4 className="font-bold text-teal-800">¿Tienes una placa física?</h4>
          <p className="text-xs text-teal-600/70 max-w-[200px] mx-auto">Vincúlala ahora para activar la protección GPS instantánea.</p>
        </div>
        <button className="bg-teal-600 text-white px-6 py-2 rounded-xl font-bold text-sm shadow-md hover:bg-teal-700 transition-all">
          Vincular Ahora
        </button>
      </div>
    </div>
  );
};
