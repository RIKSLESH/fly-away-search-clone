
import React from 'react';
import { Link } from 'react-router-dom';
import { Plane, Phone, User } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-3">
          <Link to="/" className="flex items-center gap-1 text-xl font-bold text-flight-blue">
            <Plane className="h-6 w-6 rotate-90" />
            <span className="hidden md:block">Avia Tickets</span>
          </Link>
          
          <nav className="hidden md:flex space-x-6 items-center text-sm">
            <Link to="/" className="hover:text-flight-blue transition-colors font-medium">Flights</Link>
            <Link to="/" className="hover:text-flight-blue transition-colors">Hotels</Link>
            <Link to="/" className="hover:text-flight-blue transition-colors">Packages</Link>
            <Link to="/" className="hover:text-flight-blue transition-colors">Insurance</Link>
            <Link to="/" className="text-flight-orange flex items-center gap-1">
              <Phone size={16} />
              <span>Contact Us</span>
            </Link>
          </nav>
          
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-flight-blue">
              <User size={18} />
              <span className="hidden md:inline">My Account</span>
            </button>
            <div className="hidden md:block border-l h-6 border-gray-200"></div>
            <button className="hidden md:block text-sm font-medium text-gray-600 hover:text-flight-blue">
              EN
            </button>
            <button className="block md:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
