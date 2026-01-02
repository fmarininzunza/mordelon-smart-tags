
import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Product } from '../types';

interface Props {
  product: Product;
}

export const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 p-3 flex flex-col gap-2">
      <img src={product.image} alt={product.name} className="w-full aspect-square object-cover rounded-xl" />
      <div className="flex flex-col">
        <span className="text-xs text-teal-600 font-bold uppercase tracking-wider">{product.category}</span>
        <h3 className="font-semibold text-gray-800 text-sm line-clamp-1">{product.name}</h3>
        <div className="flex justify-between items-center mt-2">
          <span className="text-teal-700 font-bold">${product.price.toLocaleString('es-CL')}</span>
          <button className="bg-orange-500 text-white p-2 rounded-lg hover:bg-orange-600 transition-colors">
            <ShoppingCart size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
