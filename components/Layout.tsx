
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Home, ShoppingBag, User, Bell, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, logout, user } = useAuth();

  const navItems = [
    { path: '/', icon: <Home size={24} />, label: 'Inicio' },
    { path: '/shop', icon: <ShoppingBag size={24} />, label: 'Tienda' },
    { path: '/my-pets', icon: <User size={24} />, label: 'Mis Mascotas', protected: true },
    { path: '/alerts', icon: <Bell size={24} />, label: 'Alertas', protected: true },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Do not show bottom nav on certain pages like Auth or PetProfile (public view)
  const hideNav = location.pathname.startsWith('/pet/') || location.pathname === '/auth';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center">
      <div className="w-full max-w-4xl bg-white min-h-screen flex flex-col shadow-2xl relative">
        {/* Desktop & Mobile Header */}
        <header className="bg-teal-600 p-4 md:px-8 flex justify-between items-center text-white sticky top-0 z-50">
          <div className="flex items-center gap-2">
            <div className="bg-white/20 p-1.5 rounded-lg hidden md:block">
              <ShoppingBag size={20} />
            </div>
            <h1 className="text-xl md:text-2xl font-black tracking-tighter">MORDELÓN</h1>
          </div>

          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <span className="hidden md:block text-xs font-bold uppercase tracking-wider opacity-80">
                  Hola, {user?.name.split(' ')[0]}
                </span>
                <button 
                  onClick={handleLogout}
                  className="bg-white/20 hover:bg-white/30 p-2 rounded-xl transition-all flex items-center gap-2 text-xs font-bold"
                >
                  <LogOut size={18} />
                  <span className="hidden md:inline">Cerrar Sesión</span>
                </button>
              </div>
            ) : (
              !hideNav && (
                <Link to="/auth" className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-xl text-sm font-bold transition-all shadow-md">
                  Entrar
                </Link>
              )
            )}
          </div>
        </header>

        {/* Main Content */}
        <main className={`flex-1 ${!hideNav ? 'pb-24 md:pb-8' : ''} overflow-y-auto`}>
          {children}
        </main>

        {/* Responsive Navigation */}
        {!hideNav && (
          <>
            {/* Mobile Bottom Nav */}
            <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex justify-around p-3 z-50 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.protected && !isAuthenticated ? '/auth' : item.path}
                  className={`flex flex-col items-center gap-1 transition-colors ${
                    location.pathname === item.path ? 'text-teal-600' : 'text-gray-400'
                  }`}
                >
                  {item.icon}
                  <span className="text-[10px] font-bold uppercase">{item.label}</span>
                </Link>
              ))}
            </nav>

            {/* Desktop Side/Top Nav placeholder (already handled by header/links) */}
          </>
        )}
      </div>
    </div>
  );
};
