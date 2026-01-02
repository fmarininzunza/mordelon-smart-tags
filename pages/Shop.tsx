
import React, { useState } from 'react';
import { MOCK_PRODUCTS } from '../constants';
import { ProductCard } from '../components/ProductCard';

export const Shop: React.FC = () => {
  const [filter, setFilter] = useState('Todos');
  const categories = ['Todos', 'Tags', 'Accesorios'];

  const filteredProducts = filter === 'Todos' 
    ? MOCK_PRODUCTS 
    : MOCK_PRODUCTS.filter(p => p.category === filter);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Tienda Mordelón</h2>
        <span className="text-xs text-teal-600 font-bold bg-teal-50 px-3 py-1 rounded-full uppercase">
          Envío a todo Chile
        </span>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-5 py-2 rounded-full text-sm font-semibold transition-all whitespace-nowrap ${
              filter === cat 
              ? 'bg-teal-600 text-white shadow-md' 
              : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <section className="bg-teal-900 text-white p-8 rounded-3xl mt-4 relative overflow-hidden">
        <div className="relative z-10 space-y-3">
          <h3 className="text-2xl font-bold">Garantía de por Vida</h3>
          <p className="text-teal-100 text-sm">
            Si la placa se daña, muerde o rompe, la reemplazamos gratis. Para siempre.
          </p>
          <button className="bg-orange-500 text-white px-6 py-2 rounded-xl font-bold text-sm">
            Saber más
          </button>
        </div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-teal-800 rounded-full -mr-16 -mt-16 opacity-50"></div>
      </section>
    </div>
  );
};
