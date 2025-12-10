import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Star } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300 relative">
      <Link to={`/product/${product.id}`} className="block relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-gray-800 uppercase tracking-wide">
            {product.category}
        </div>
      </Link>
      
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
            <div>
                 <Link to={`/product/${product.id}`}>
                    <h3 className="font-bold text-gray-900 group-hover:text-brand-600 transition-colors line-clamp-1">{product.name}</h3>
                 </Link>
                 <div className="flex items-center space-x-1 mt-1">
                    <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    <span className="text-xs text-gray-500 font-medium">{product.rating}</span>
                 </div>
            </div>
            <span className="font-bold text-lg text-brand-600">${product.price.toFixed(2)}</span>
        </div>
        
        <button
          onClick={(e) => {
            e.preventDefault();
            addToCart(product);
          }}
          className="w-full mt-3 bg-gray-50 hover:bg-dark-900 hover:text-white text-gray-900 py-2.5 rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2 group-active:scale-95"
        >
          <Plus className="w-4 h-4" />
          <span>Add to Cart</span>
        </button>
      </div>
    </div>
  );
};