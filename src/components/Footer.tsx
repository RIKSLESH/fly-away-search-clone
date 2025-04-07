
import React from 'react';
import { Plane } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="mb-6 md:mb-0">
            <Link to="/" className="flex items-center gap-2 text-xl font-bold text-flight-blue mb-4">
              <Plane className="h-6 w-6" />
              <span>FlyAway</span>
            </Link>
            <p className="text-sm text-gray-600 mb-4">
              Find and book cheap flights to anywhere in the world. 
              Compare flights from all major airlines and travel agents.
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm text-gray-600 hover:text-flight-blue transition-colors">About Us</Link></li>
              <li><Link to="/" className="text-sm text-gray-600 hover:text-flight-blue transition-colors">Careers</Link></li>
              <li><Link to="/" className="text-sm text-gray-600 hover:text-flight-blue transition-colors">News</Link></li>
              <li><Link to="/" className="text-sm text-gray-600 hover:text-flight-blue transition-colors">Contacts</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Services</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm text-gray-600 hover:text-flight-blue transition-colors">Flight Booking</Link></li>
              <li><Link to="/" className="text-sm text-gray-600 hover:text-flight-blue transition-colors">Hotel Booking</Link></li>
              <li><Link to="/" className="text-sm text-gray-600 hover:text-flight-blue transition-colors">Car Rental</Link></li>
              <li><Link to="/" className="text-sm text-gray-600 hover:text-flight-blue transition-colors">Travel Insurance</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Help</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm text-gray-600 hover:text-flight-blue transition-colors">FAQs</Link></li>
              <li><Link to="/" className="text-sm text-gray-600 hover:text-flight-blue transition-colors">Customer Support</Link></li>
              <li><Link to="/" className="text-sm text-gray-600 hover:text-flight-blue transition-colors">Privacy Policy</Link></li>
              <li><Link to="/" className="text-sm text-gray-600 hover:text-flight-blue transition-colors">Terms & Conditions</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-4 border-t border-gray-200 text-sm text-gray-500 text-center">
          <p>&copy; {new Date().getFullYear()} FlyAway - All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
