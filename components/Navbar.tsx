import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingBag, Menu, X, Search } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Navbar: React.FC = () => {
  const { itemCount } = useCart();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  // Close mobile menu when route changes
  React.useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white font-bold text-xl transform group-hover:rotate-12 transition-transform duration-300">
                W
            </div>
            <span className="text-xl font-bold tracking-tighter text-dark-900">
                WALKIN<span className="text-brand-600">DIRECT</span>
            </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8 text-sm font-medium text-gray-600">
          <Link to="/" className="hover:text-brand-600 transition-colors">Home</Link>
          <Link to="/?category=Men" className="hover:text-brand-600 transition-colors">Men</Link>
          <Link to="/?category=Women" className="hover:text-brand-600 transition-colors">Women</Link>
          <Link to="/?category=Sport" className="hover:text-brand-600 transition-colors">Sport</Link>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-6">
            <button className="text-gray-500 hover:text-brand-600 transition-colors hidden sm:block">
                <Search className="w-5 h-5" />
            </button>
            <Link to="/cart" className="relative text-gray-800 hover:text-brand-600 transition-colors">
                <ShoppingBag className="w-6 h-6" />
                {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-600 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white">
                    {itemCount}
                </span>
                )}
            </Link>
            <button 
                className="md:hidden text-gray-800"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 py-4 px-4 flex flex-col space-y-4">
          <Link to="/" className="text-lg font-medium text-gray-800">Home</Link>
          <Link to="/?category=Men" className="text-lg font-medium text-gray-800">Men</Link>
          <Link to="/?category=Women" className="text-lg font-medium text-gray-800">Women</Link>
          <Link to="/?category=Sport" className="text-lg font-medium text-gray-800">Sport</Link>
          <Link to="/cart" className="text-lg font-medium text-brand-600">View Cart ({itemCount})</Link>
        </div>
      )}
    </nav>
  );
};