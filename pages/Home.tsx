import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ArrowRight, Filter } from 'lucide-react';
import { PRODUCTS } from '../constants';
import { Category, Product } from '../types';
import { ProductCard } from '../components/ProductCard';

export const Home: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(PRODUCTS);
  const location = useLocation();

  const categories: Category[] = ['All', 'Men', 'Women', 'Kids', 'Sport'];

  // Handle URL query params for categories
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cat = params.get('category');
    if (cat && categories.includes(cat as Category)) {
      setSelectedCategory(cat as Category);
    } else {
        setSelectedCategory('All');
    }
  }, [location.search]);

  useEffect(() => {
    if (selectedCategory === 'All') {
      setFilteredProducts(PRODUCTS);
    } else {
      setFilteredProducts(PRODUCTS.filter(p => p.category === selectedCategory));
    }
  }, [selectedCategory]);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-dark-900 text-white py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-40">
            <img 
                src="https://picsum.photos/seed/hero9/1920/1080" 
                alt="Background" 
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-dark-900 via-dark-900/90 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl animate-fade-in-up">
            <span className="text-brand-500 font-bold tracking-widest uppercase text-sm mb-4 block">New Collection 2024</span>
            <h1 className="text-5xl lg:text-7xl font-bold leading-tight mb-6">
              Walk The Talk. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-400 to-orange-400">
                Walkin Direct.
              </span>
            </h1>
            <p className="text-lg text-gray-300 mb-8 max-w-lg leading-relaxed">
              Discover the latest drops in premium footwear. From high-performance sport gears to urban streetwear icons.
            </p>
            <button 
                onClick={() => {
                    document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-brand-600 hover:bg-brand-500 text-white px-8 py-4 rounded-full font-bold text-lg transition-all transform hover:scale-105 flex items-center inline-flex group"
            >
              Shop Now
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* Categories & Products */}
      <section id="products" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-10 space-y-4 md:space-y-0">
            <div>
                 <h2 className="text-3xl font-bold text-gray-900">Latest Drops</h2>
                 <p className="text-gray-500 mt-1">Exclusive selections just for you</p>
            </div>
            
            {/* Filter Buttons */}
            <div className="flex overflow-x-auto pb-2 md:pb-0 hide-scrollbar gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                    selectedCategory === cat
                      ? 'bg-dark-900 text-white shadow-lg shadow-dark-900/20'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
                <Filter className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900">No products found</h3>
                <p className="text-gray-500">Try selecting a different category.</p>
            </div>
          )}
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                <div className="p-6">
                    <div className="w-12 h-12 bg-brand-50 rounded-full flex items-center justify-center text-brand-600 mx-auto mb-4">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <h3 className="font-bold text-lg mb-2">Authenticity Guaranteed</h3>
                    <p className="text-gray-500 text-sm">Every item is verified by our expert team.</p>
                </div>
                <div className="p-6">
                    <div className="w-12 h-12 bg-brand-50 rounded-full flex items-center justify-center text-brand-600 mx-auto mb-4">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <h3 className="font-bold text-lg mb-2">Fast Shipping</h3>
                    <p className="text-gray-500 text-sm">Express delivery worldwide within 3-5 days.</p>
                </div>
                <div className="p-6">
                    <div className="w-12 h-12 bg-brand-50 rounded-full flex items-center justify-center text-brand-600 mx-auto mb-4">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                    </div>
                    <h3 className="font-bold text-lg mb-2">Secure Payment</h3>
                    <p className="text-gray-500 text-sm">Encrypted transactions for your peace of mind.</p>
                </div>
            </div>
        </div>
      </section>
    </div>
  );
};