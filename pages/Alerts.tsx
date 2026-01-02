
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { MapPin, Smartphone, Clock, ChevronRight } from 'lucide-react';

const MOCK_SCANS = [
  { name: 'Lun', scans: 0 },
  { name: 'Mar', scans: 2 },
  { name: 'Mie', scans: 1 },
  { name: 'Jue', scans: 0 },
  { name: 'Vie', scans: 4 },
  { name: 'Sab', scans: 1 },
  { name: 'Dom', scans: 0 },
];

const SCAN_HISTORY = [
  { id: 's1', time: 'Hoy, 14:30', location: 'Cerca de tu hogar', device: 'iPhone 15 Pro', dist: '120m' },
  { id: 's2', time: 'Ayer, 10:15', location: 'Fuera de zona segura', device: 'Samsung S23', dist: '2.4km' },
  { id: 's3', time: 'Mié 12, 18:20', location: 'Cerca de tu hogar', device: 'Xiaomi Mi 11', dist: '450m' },
];

export const Alerts: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">Historial de Alertas</h2>

      <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100">
        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Escaneos de la semana</h3>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={MOCK_SCANS}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
              <YAxis hide />
              <Tooltip 
                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                labelStyle={{ fontWeight: 'bold' }}
              />
              <Line type="monotone" dataKey="scans" stroke="#0D9488" strokeWidth={3} dot={{ r: 4, fill: '#0D9488' }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Recientes</h3>
        {SCAN_HISTORY.map(scan => (
          <div key={scan.id} className="bg-white p-4 rounded-2xl border border-gray-100 flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer">
            <div className={`p-3 rounded-2xl ${scan.dist.includes('km') ? 'bg-red-50 text-red-500' : 'bg-teal-50 text-teal-600'}`}>
              <MapPin size={24} />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h4 className="font-bold text-sm text-gray-800">{scan.location}</h4>
                <span className="text-[10px] text-gray-400 font-medium">{scan.time}</span>
              </div>
              <div className="flex items-center gap-3 mt-1">
                <div className="flex items-center gap-1 text-[10px] text-gray-500">
                  <Smartphone size={12} />
                  <span>{scan.device}</span>
                </div>
                <div className="flex items-center gap-1 text-[10px] font-bold text-teal-600">
                  <Clock size={12} />
                  <span>{scan.dist}</span>
                </div>
              </div>
            </div>
            <ChevronRight size={18} className="text-gray-300" />
          </div>
        ))}
      </div>
    </div>
  );
};
