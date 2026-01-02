
import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, MapPin, Zap, ExternalLink } from 'lucide-react';

export const Home: React.FC = () => {
  return (
    <div className="p-6 space-y-8 animate-in fade-in duration-500">
      <section className="text-center space-y-4 pt-4">
        <div className="bg-teal-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto text-teal-600">
          <Zap size={48} fill="currentColor" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 leading-tight">
          Protección inteligente para quien más amas
        </h2>
        <p className="text-gray-500">
          La placa que no solo dice su nombre, sino que lo guía de vuelta a casa.
        </p>
        <div className="flex flex-col gap-3 pt-4">
          <Link to="/shop" className="bg-teal-600 text-white py-4 rounded-2xl font-bold shadow-lg shadow-teal-100 flex items-center justify-center gap-2">
            Ver Colección de Placas
          </Link>
          <Link to="/pet/pet-123" className="border-2 border-teal-600 text-teal-600 py-4 rounded-2xl font-bold flex items-center justify-center gap-2">
            <ExternalLink size={20} /> Simular Escaneo QR
          </Link>
        </div>
      </section>

      <section className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-gray-100 flex flex-col gap-2">
          <MapPin className="text-orange-500" />
          <h4 className="font-bold text-sm">GPS Real-time</h4>
          <p className="text-xs text-gray-500">Recibe ubicación exacta al ser escaneado.</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-gray-100 flex flex-col gap-2">
          <ShieldCheck className="text-teal-500" />
          <h4 className="font-bold text-sm">Privacidad Pro</h4>
          <p className="text-xs text-gray-500">Tú controlas qué datos se muestran.</p>
        </div>
      </section>

      <section className="bg-orange-50 p-6 rounded-3xl space-y-4">
        <h3 className="font-bold text-orange-800 text-xl">¿Cómo funciona?</h3>
        <ol className="space-y-4">
          {[
            { t: 'Consigue tu placa', d: 'Recíbela en casa y vincula el perfil de tu mascota en segundos.' },
            { t: 'Configura Zonas Seguras', d: 'Define el radio alrededor de tu casa para alertas automáticas.' },
            { t: 'Tranquilidad Total', d: 'Si alguien escanea a tu mascota, recibes un alerta inmediata.' }
          ].map((item, i) => (
            <li key={i} className="flex gap-4">
              <span className="bg-orange-200 text-orange-800 w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center font-bold">
                {i + 1}
              </span>
              <div>
                <h5 className="font-bold text-gray-800">{item.t}</h5>
                <p className="text-sm text-gray-600">{item.d}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
};
