
import React from 'react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Plane, Clock, ArrowRight } from 'lucide-react';
import { Flight, FlightSearchParams } from '@/services/flightApi';

interface FlightSearchResultsProps {
  flights: Flight[];
  searchParams: FlightSearchParams;
  isLoading?: boolean;
}

const FlightSearchResults: React.FC<FlightSearchResultsProps> = ({ flights, searchParams, isLoading = false }) => {
  const { tripType, from, to, departureDate, returnDate, passengers } = searchParams;
  
  if (isLoading) {
    return (
      <div className="mt-8 animate-fade-in">
        <div className="flex justify-center py-12">
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-flight-blue"></div>
            <p className="mt-4 text-gray-500 font-medium">Searching for the best flights...</p>
          </div>
        </div>
      </div>
    );
  }
  
  if (!flights.length) {
    return null;
  }
  
  return (
    <div className="mt-8 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Flight Results</h2>
        <Badge variant="outline" className="text-flight-blue border-flight-blue">
          {tripType === 'oneWay' ? 'One Way' : 'Round Trip'}
        </Badge>
      </div>
      
      <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-gray-500">
        <span className="font-medium text-gray-700">{from}</span> 
        <ArrowRight className="h-4 w-4 text-flight-blue" />
        <span className="font-medium text-gray-700">{to}</span>
        <span className="mx-2">•</span>
        <span>{departureDate && format(departureDate, 'dd MMM yyyy')}</span>
        {tripType === 'roundTrip' && returnDate && (
          <>
            <span className="mx-2">-</span>
            <span>{format(returnDate, 'dd MMM yyyy')}</span>
          </>
        )}
        <span className="mx-2">•</span>
        <span>{passengers} {passengers === 1 ? 'passenger' : 'passengers'}</span>
      </div>
      
      <div className="space-y-4">
        {flights.map((flight) => (
          <Card key={flight.id} className="hover:shadow-md transition-shadow overflow-hidden">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-4 md:p-6 flex items-center border-b md:border-b-0 md:border-r border-gray-100">
                  <div className="flex items-center">
                    <div className="h-10 w-16 flex items-center justify-center">
                      <img 
                        src={flight.airlineLogo} 
                        alt={flight.airline} 
                        className="h-8 object-contain"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = 'https://via.placeholder.com/50x30?text=Airline';
                        }}
                      />
                    </div>
                    <div className="ml-3">
                      <p className="font-medium text-sm">{flight.airline}</p>
                      <p className="text-xs text-gray-500">Economy</p>
                    </div>
                  </div>
                </div>
                
                <div className="px-4 py-2 md:col-span-2 flex items-center justify-between md:justify-center border-b md:border-b-0 md:border-r border-gray-100">
                  <div className="flex-1 md:flex md:items-center md:justify-center gap-3 text-center">
                    <div className="mb-1 md:mb-0">
                      <p className="font-bold text-lg">{flight.departureTime}</p>
                      <p className="text-xs text-gray-500">{flight.from}</p>
                    </div>
                    
                    <div className="flex flex-col items-center my-1">
                      <div className="text-xs text-gray-500 whitespace-nowrap">
                        <Clock className="inline h-3 w-3 mr-1" />
                        {flight.duration}
                      </div>
                      <div className="relative w-16 md:w-24">
                        <div className="border-t border-gray-300 absolute top-1/2 w-full"></div>
                        <Plane className="h-3 w-3 text-flight-blue absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                      </div>
                      <div className="text-xs text-gray-500">
                        {flight.stops === 0 ? 'Direct' : (flight.stops === 1 ? '1 stop' : `${flight.stops} stops`)}
                      </div>
                    </div>
                    
                    <div className="mt-1 md:mt-0">
                      <p className="font-bold text-lg">{flight.arrivalTime}</p>
                      <p className="text-xs text-gray-500">{flight.to}</p>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 flex flex-row md:flex-col items-center justify-between md:border-l border-gray-100">
                  <div className="text-right md:text-center md:mb-3 md:w-full">
                    <p className="text-xs text-gray-500">Price per person</p>
                    <p className="text-2xl font-bold text-flight-blue">
                      ${flight.price}
                    </p>
                    <p className="text-xs text-gray-500">Total: ${flight.price * passengers}</p>
                  </div>
                  
                  <button className="md:w-full px-4 py-2 text-white bg-flight-orange rounded-md hover:bg-orange-600 transition-colors text-sm font-medium">
                    Select
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FlightSearchResults;
