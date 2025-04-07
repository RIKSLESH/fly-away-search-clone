
import React, { useState } from 'react';
import Header from '@/components/Header';
import SearchForm from '@/components/SearchForm';
import FlightSearchResults from '@/components/FlightSearchResults';
import Footer from '@/components/Footer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plane, Hotel, Car } from 'lucide-react';
import { Flight, FlightSearchParams, searchFlights } from '@/services/flightApi';

const Index = () => {
  const [searchParams, setSearchParams] = useState<FlightSearchParams | null>(null);
  const [flights, setFlights] = useState<Flight[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSearch = async (data: FlightSearchParams) => {
    setSearchParams(data);
    setIsLoading(true);
    
    try {
      // Get flights from our API
      const results = await searchFlights(data);
      setFlights(results);
    } catch (error) {
      console.error('Error searching flights:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderHomeContent = () => (
    <div className="mt-12 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
          <div className="bg-flight-blue-light p-4 rounded-full inline-flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-flight-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="font-medium text-xl mb-2">Best Prices</h3>
          <p className="text-gray-600">Find the lowest prices for flights with our price comparison.</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
          <div className="bg-flight-blue-light p-4 rounded-full inline-flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-flight-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="font-medium text-xl mb-2">Easy Booking</h3>
          <p className="text-gray-600">Book your flights in just a few simple steps.</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm text-center">
          <div className="bg-flight-blue-light p-4 rounded-full inline-flex items-center justify-center mb-4">
            <svg className="w-8 h-8 text-flight-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="font-medium text-xl mb-2">24/7 Support</h3>
          <p className="text-gray-600">Our customer support team is available around the clock.</p>
        </div>
      </div>
      
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-bold mb-2">Popular Destinations</h2>
        <p className="text-gray-600 mb-8">Explore our most booked destinations</p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { city: 'New York', img: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bmV3JTIweW9ya3xlbnwwfHwwfHw%3D&ixlib=rb-1.2.1&w=1000&q=80' },
            { city: 'London', img: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bG9uZG9ufGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80' },
            { city: 'Tokyo', img: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8dG9reW98ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80' },
            { city: 'Paris', img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cGFyaXN8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80' },
          ].map((item, index) => (
            <div key={index} className="relative h-64 overflow-hidden rounded-lg group cursor-pointer">
              <div 
                className="absolute inset-0 bg-cover bg-center transform group-hover:scale-110 transition-transform duration-500 ease-in-out"
                style={{ backgroundImage: `url(${item.img})` }}
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900"></div>
              <div className="absolute inset-0 flex items-end p-4">
                <div>
                  <h3 className="text-white font-bold text-lg">{item.city}</h3>
                  <p className="text-white text-opacity-90 text-sm">Explore flights</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow">
        {/* Hero section */}
        <div className="bg-flight-blue py-10 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center text-white mb-6">
              <h1 className="text-3xl md:text-4xl font-bold mb-3">Find the Best Flight Deals</h1>
              <p className="text-lg opacity-90">Compare and book flights from anywhere to everywhere</p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <Tabs defaultValue="flights" className="w-full">
                <TabsList className="bg-white/20 w-full mb-6 rounded-lg">
                  <TabsTrigger value="flights" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-flight-blue rounded-lg">
                    <Plane className="h-4 w-4" />
                    Flights
                  </TabsTrigger>
                  <TabsTrigger value="hotels" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-flight-blue rounded-lg">
                    <Hotel className="h-4 w-4" />
                    Hotels
                  </TabsTrigger>
                  <TabsTrigger value="cars" className="flex items-center gap-2 data-[state=active]:bg-white data-[state=active]:text-flight-blue rounded-lg">
                    <Car className="h-4 w-4" />
                    Car Rental
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="flights">
                  <SearchForm onSearch={handleSearch} isLoading={isLoading} />
                </TabsContent>
                <TabsContent value="hotels">
                  <div className="bg-white rounded-lg shadow-md p-6 text-center">
                    <h3 className="text-lg font-medium text-gray-700 mb-2">Hotel Booking</h3>
                    <p className="text-gray-500">Hotel booking feature coming soon!</p>
                  </div>
                </TabsContent>
                <TabsContent value="cars">
                  <div className="bg-white rounded-lg shadow-md p-6 text-center">
                    <h3 className="text-lg font-medium text-gray-700 mb-2">Car Rental</h3>
                    <p className="text-gray-500">Car rental feature coming soon!</p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          {searchParams ? 
            <FlightSearchResults 
              flights={flights} 
              searchParams={searchParams} 
              isLoading={isLoading} 
            /> : 
            renderHomeContent()
          }
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
