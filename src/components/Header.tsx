
import React from 'react';
import { Plane } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-flight-blue text-white py-4 shadow-md">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-xl font-bold">
          <Plane className="h-6 w-6" />
          <span>FlyAway</span>
        </Link>
        
        <nav className="hidden md:flex space-x-6 items-center">
          <Link to="/" className="hover:text-flight-orange transition-colors">Flights</Link>
          <Link to="/" className="hover:text-flight-orange transition-colors">Hotels</Link>
          <Link to="/" className="hover:text-flight-orange transition-colors">Car Rental</Link>
          <Link to="/" className="hover:text-flight-orange transition-colors">Help</Link>
        </nav>
        
        <div className="flex items-center gap-4">
          <button className="hidden md:block px-4 py-2 rounded-md bg-transparent border border-white hover:bg-white hover:text-flight-blue transition-colors">
            Log in
          </button>
          <button className="block md:hidden">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
