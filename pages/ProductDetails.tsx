import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Star, Truck, ShieldCheck, ShoppingBag, Plus, Minus } from 'lucide-react';
import { PRODUCTS } from '../constants';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();

  useEffect(() => {
    if (id) {
      const found = PRODUCTS.find(p => p.id === parseInt(id));
      setProduct(found);
    }
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      // In a real app, we might want to pass quantity to addToCart, 
      // but our context implementation currently handles +1. 
      // For this demo, we'll loop to add qty (or refactor context later).
      // Simpler approach for now: call it once per qty or update context logic.
      // Let's just add it 'qty' times for this simple demo implementation 
      // OR better, just add once, the user can adjust in cart. 
      // But typically "Add to Cart" with quantity selector implies adding that many.
      for (let i = 0; i < qty; i++) {
        addToCart(product);
      }
      alert(`Added ${qty} ${product.name} to cart!`);
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Product not found</h2>
          <Link to="/" className="text-brand-600 hover:underline mt-4 block">Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link to="/" className="inline-flex items-center text-gray-500 hover:text-brand-600 mb-8 transition-colors">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Shopping
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
        {/* Image Section */}
        <div className="bg-gray-50 rounded-3xl overflow-hidden aspect-square relative group">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
          />
          <div className="absolute top-4 left-4">
            <span className="bg-white/90 backdrop-blur text-sm font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                {product.category}
            </span>
          </div>
        </div>

        {/* Info Section */}
        <div className="flex flex-col justify-center">
          <div className="mb-6">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4 leading-tight">{product.name}</h1>
            <div className="flex items-center space-x-4 mb-4">
                <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'}`} />
                    ))}
                </div>
                <span className="text-gray-500 text-sm">{product.rating} / 5.0 Rating</span>
            </div>
            <p className="text-3xl font-bold text-brand-600 mb-6">${product.price.toFixed(2)}</p>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">{product.description}</p>
          </div>

          <div className="border-t border-b border-gray-100 py-6 mb-8">
            <div className="flex items-center justify-between mb-4">
                <span className="font-bold text-gray-700">Select Quantity</span>
                <div className="flex items-center bg-gray-50 rounded-xl px-2">
                    <button 
                        onClick={() => setQty(Math.max(1, qty - 1))}
                        className="p-2 text-gray-500 hover:text-gray-900"
                    >
                        <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-10 text-center font-bold text-lg">{qty}</span>
                    <button 
                        onClick={() => setQty(qty + 1)}
                        className="p-2 text-gray-500 hover:text-gray-900"
                    >
                        <Plus className="w-4 h-4" />
                    </button>
                </div>
            </div>
            <button 
                onClick={handleAddToCart}
                className="w-full bg-dark-900 hover:bg-brand-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-dark-900/10 hover:shadow-brand-600/20 transition-all duration-300 flex items-center justify-center space-x-3"
            >
                <ShoppingBag className="w-5 h-5" />
                <span>Add to Cart - ${(product.price * qty).toFixed(2)}</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-start space-x-3">
                <Truck className="w-6 h-6 text-brand-600 flex-shrink-0" />
                <div>
                    <h4 className="font-bold text-sm text-gray-900">Free Delivery</h4>
                    <p className="text-xs text-gray-500">Orders over $200</p>
                </div>
            </div>
            <div className="flex items-start space-x-3">
                <ShieldCheck className="w-6 h-6 text-brand-600 flex-shrink-0" />
                <div>
                    <h4 className="font-bold text-sm text-gray-900">1 Year Warranty</h4>
                    <p className="text-xs text-gray-500">Full protection</p>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};