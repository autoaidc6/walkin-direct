import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Cart: React.FC = () => {
  const { items, removeFromCart, updateQuantity, total, itemCount } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-6">
            <ShoppingBag className="w-10 h-10 text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
        <p className="text-gray-500 mb-8 max-w-sm">Looks like you haven't added any sneakers to your collection yet.</p>
        <Link 
            to="/" 
            className="bg-brand-600 hover:bg-brand-700 text-white px-8 py-3 rounded-full font-bold transition-colors"
        >
            Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart ({itemCount})</h1>
      
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
        {/* Cart Items List */}
        <div className="flex-1 space-y-6">
          {items.map(item => (
            <div key={item.id} className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
              <Link to={`/product/${item.id}`} className="w-full sm:w-32 h-32 flex-shrink-0 bg-gray-50 rounded-xl overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
              </Link>
              
              <div className="flex-1 w-full text-center sm:text-left">
                <Link to={`/product/${item.id}`} className="font-bold text-lg text-gray-900 hover:text-brand-600 transition-colors">
                    {item.name}
                </Link>
                <p className="text-sm text-gray-500 mb-2">{item.category}</p>
                <p className="font-bold text-brand-600">${item.price.toFixed(2)}</p>
              </div>

              <div className="flex items-center gap-6">
                 <div className="flex items-center bg-gray-50 rounded-lg">
                    <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-2 hover:text-brand-600 transition-colors"
                        disabled={item.quantity <= 1}
                    >
                        <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-medium">{item.quantity}</span>
                    <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-2 hover:text-brand-600 transition-colors"
                    >
                        <Plus className="w-4 h-4" />
                    </button>
                 </div>
                 
                 <button 
                    onClick={() => removeFromCart(item.id)}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                 >
                    <Trash2 className="w-5 h-5" />
                 </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:w-96 flex-shrink-0">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm sticky top-24">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-gray-600">
                        <span>Subtotal</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                        <span>Shipping</span>
                        <span className="text-green-600 font-medium">Free</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                        <span>Tax (Estimate)</span>
                        <span>${(total * 0.08).toFixed(2)}</span>
                    </div>
                    <div className="border-t border-gray-100 pt-4 flex justify-between font-bold text-lg text-gray-900">
                        <span>Total</span>
                        <span>${(total * 1.08).toFixed(2)}</span>
                    </div>
                </div>

                <button 
                    onClick={() => navigate('/checkout')}
                    className="w-full bg-brand-600 hover:bg-brand-700 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-brand-600/20 transition-all flex items-center justify-center space-x-2"
                >
                    <span>Checkout</span>
                    <ArrowRight className="w-5 h-5" />
                </button>
                
                <p className="text-xs text-center text-gray-400 mt-4">
                    Secure Checkout powered by Stripe (Mock)
                </p>
            </div>
        </div>
      </div>
    </div>
  );
};