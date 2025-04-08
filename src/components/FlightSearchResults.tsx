
import React, { useState } from 'react';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Plane, Clock, ArrowRight, Filter } from 'lucide-react';
import { Flight, FlightSearchParams, destinations } from '@/services/flightApi';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import BookingDialog from './BookingDialog';

interface FlightSearchResultsProps {
  flights: Flight[];
  searchParams: FlightSearchParams;
  isLoading?: boolean;
}

const FlightSearchResults: React.FC<FlightSearchResultsProps> = ({ flights, searchParams, isLoading = false }) => {
  const { tripType, from, to, departureDate, returnDate, passengers } = searchParams;
  const [sortBy, setSortBy] = useState<'price' | 'duration' | 'departure'>('price');
  const [filterStops, setFilterStops] = useState<'all' | 'direct' | 'oneStop'>('all');
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  
  const getDestinationName = (code: string) => {
    const destination = destinations.find(d => d.code === code);
    return destination ? destination.name : code;
  };
  
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
  
  // Filter flights based on current filter
  const filteredFlights = flights.filter(flight => {
    if (filterStops === 'direct') return flight.stops === 0;
    if (filterStops === 'oneStop') return flight.stops === 1;
    return true;
  });
  
  // Sort flights based on current sort
  const sortedFlights = [...filteredFlights].sort((a, b) => {
    if (sortBy === 'price') return a.price - b.price;
    if (sortBy === 'duration') {
      const durationA = parseInt(a.duration.split('h')[0]) * 60 + 
                       parseInt(a.duration.split('h')[1].split('m')[0]);
      const durationB = parseInt(b.duration.split('h')[0]) * 60 + 
                       parseInt(b.duration.split('h')[1].split('m')[0]);
      return durationA - durationB;
    }
    // Sort by departure time
    return a.departureTime.localeCompare(b.departureTime);
  });

  // Function to get airline code from name
  const getAirlineCode = (name: string): string => {
    // Extract first letter of each word
    const words = name.split(' ');
    if (words.length === 1) {
      return words[0].substring(0, 2).toUpperCase();
    }
    return words.map(word => word[0]).join('').toUpperCase();
  };

  const handleFlightSelect = (flight: Flight) => {
    setSelectedFlight(flight);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
    // Reset selected flight after a delay to avoid UI flicker
    setTimeout(() => setSelectedFlight(null), 300);
  };

  return (
    <div className="mt-8 animate-fade-in">
      <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Flight Results</h2>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-flight-blue border-flight-blue">
            {tripType === 'oneWay' ? 'One Way' : (tripType === 'roundTrip' ? 'Round Trip' : 'Multi City')}
          </Badge>
          <Badge variant="outline" className="bg-flight-blue-light text-flight-blue border-0">
            {filteredFlights.length} flights found
          </Badge>
        </div>
      </div>
      
      <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-gray-500">
        <span className="font-medium text-gray-700">{getDestinationName(from)} ({from})</span> 
        <ArrowRight className="h-4 w-4 text-flight-blue" />
        <span className="font-medium text-gray-700">{getDestinationName(to)} ({to})</span>
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
      
      <div className="mb-6 bg-gray-50 p-4 rounded-lg border border-gray-100 flex flex-wrap gap-4 justify-between items-center">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-500" />
          <span className="text-sm font-medium text-gray-700">Filters:</span>
          <Select value={filterStops} onValueChange={(value) => setFilterStops(value as 'all' | 'direct' | 'oneStop')}>
            <SelectTrigger className="h-8 w-36 text-xs">
              <SelectValue placeholder="Stops" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All flights</SelectItem>
              <SelectItem value="direct">Direct only</SelectItem>
              <SelectItem value="oneStop">1 stop only</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">Sort by:</span>
          <Select value={sortBy} onValueChange={(value) => setSortBy(value as 'price' | 'duration' | 'departure')}>
            <SelectTrigger className="h-8 w-36 text-xs">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="price">Price (lowest first)</SelectItem>
              <SelectItem value="duration">Duration (shortest first)</SelectItem>
              <SelectItem value="departure">Departure time</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      {filteredFlights.length === 0 ? (
        <div className="text-center py-8 bg-white rounded-lg border border-gray-100 shadow-sm">
          <p className="text-gray-500 text-lg">No flights match your current filters</p>
          <button 
            className="mt-3 text-flight-blue hover:underline text-sm"
            onClick={() => setFilterStops('all')}
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {sortedFlights.map((flight) => (
            <Card key={flight.id} className="hover:shadow-md transition-shadow overflow-hidden">
              <CardContent className="p-0">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="p-4 md:p-6 flex items-center border-b md:border-b-0 md:border-r border-gray-100">
                    <div className="flex items-center">
                      <div className="h-10 w-16 flex items-center justify-center">
                        <Avatar className="h-8 w-8 bg-flight-blue/10">
                          <AvatarImage 
                            src={flight.airlineLogo} 
                            alt={flight.airline}
                            className="object-contain p-0.5"
                          />
                          <AvatarFallback className="text-flight-blue font-medium text-xs">
                            {getAirlineCode(flight.airline)}
                          </AvatarFallback>
                        </Avatar>
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
                    
                    <Button 
                      onClick={() => handleFlightSelect(flight)} 
                      className="md:w-full px-4 py-2 text-white bg-flight-orange hover:bg-orange-600 transition-colors text-sm font-medium"
                    >
                      Select
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
      
      <BookingDialog
        flight={selectedFlight}
        open={isBookingOpen}
        onClose={handleCloseBooking}
        passengers={passengers}
      />
    </div>
  );
};

export default FlightSearchResults;
