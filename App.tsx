import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { ProductDetails } from './pages/ProductDetails';
import { Cart } from './pages/Cart';
import { Checkout } from './pages/Checkout';

const App: React.FC = () => {
  return (
    <CartProvider>
      <HashRouter>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow pt-16">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/product/:id" element={<ProductDetails />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
            </Routes>
          </main>
          <footer className="bg-dark-900 text-white py-8 mt-auto">
            <div className="container mx-auto px-4 text-center">
              <p className="text-gray-400">© 2024 Walkin Direct. All rights reserved.</p>
              <p className="text-sm text-gray-600 mt-2">Built for sneakerheads, by sneakerheads.</p>
            </div>
          </footer>
        </div>
      </HashRouter>
    </CartProvider>
  );
};

export default App;