
import React, { useState, useMemo } from 'react';
import { ArrowRight, Calendar, Search, Users, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import TripTypeSelector from './TripTypeSelector';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { FlightSearchParams, destinations } from '@/services/flightApi';

interface SearchFormProps {
  onSearch: (searchData: FlightSearchParams) => void;
  isLoading?: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch, isLoading = false }) => {
  const [tripType, setTripType] = useState<'oneWay' | 'roundTrip'>('roundTrip');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [fromQuery, setFromQuery] = useState('');
  const [toQuery, setToQuery] = useState('');
  const [departureDate, setDepartureDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();
  const [passengers, setPassengers] = useState(1);
  const [fromFocused, setFromFocused] = useState(false);
  const [toFocused, setToFocused] = useState(false);

  // Filter destinations based on search query
  const filteredFromDestinations = useMemo(() => {
    const query = fromQuery.toLowerCase();
    return destinations.filter(dest => 
      dest.code.toLowerCase().includes(query) || 
      dest.name.toLowerCase().includes(query) || 
      dest.country.toLowerCase().includes(query)
    ).slice(0, 15); // Limit to 15 results for performance
  }, [fromQuery]);

  const filteredToDestinations = useMemo(() => {
    const query = toQuery.toLowerCase();
    return destinations.filter(dest => 
      dest.code.toLowerCase().includes(query) || 
      dest.name.toLowerCase().includes(query) || 
      dest.country.toLowerCase().includes(query)
    ).slice(0, 15); // Limit to 15 results for performance
  }, [toQuery]);

  const handleSearch = () => {
    onSearch({
      tripType,
      from,
      to,
      departureDate,
      returnDate,
      passengers
    });
  };
  
  const handleSwapLocations = () => {
    const tempFrom = from;
    const tempFromQuery = fromQuery;
    setFrom(to);
    setFromQuery(toQuery);
    setTo(tempFrom);
    setToQuery(tempFromQuery);
  };

  const selectDestination = (type: 'from' | 'to', code: string, name: string) => {
    if (type === 'from') {
      setFrom(code);
      setFromQuery(name);
      setFromFocused(false);
    } else {
      setTo(code);
      setToQuery(name);
      setToFocused(false);
    }
  };

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-5 animate-fade-in border border-gray-100">
      <div className="mb-5">
        <TripTypeSelector selectedType={tripType} onSelectTripType={setTripType} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5 relative">
        <div className="relative">
          <label htmlFor="from" className="block text-sm font-medium text-gray-700 mb-1">From</label>
          <div className="relative">
            <Input
              id="from"
              placeholder="City, airport or country"
              value={fromQuery}
              onChange={(e) => {
                setFromQuery(e.target.value);
                if (!fromFocused) setFromFocused(true);
              }}
              onFocus={() => setFromFocused(true)}
              onBlur={() => setTimeout(() => setFromFocused(false), 200)}
              className="w-full pr-10"
            />
            {fromFocused && filteredFromDestinations.length > 0 && (
              <div className="absolute z-10 top-full left-0 right-0 mt-1 bg-white border border-gray-200 shadow-md rounded-md overflow-hidden">
                <div className="p-3 bg-gray-50">
                  <p className="text-sm font-medium text-gray-700">Destinations</p>
                </div>
                <div className="max-h-60 overflow-y-auto">
                  {filteredFromDestinations.map((dest) => (
                    <div 
                      key={dest.code}
                      className="p-3 hover:bg-gray-100 cursor-pointer flex items-center"
                      onClick={() => selectDestination('from', dest.code, dest.name)}
                    >
                      <div className="text-sm w-12 text-gray-500 font-mono">{dest.code}</div>
                      <div className="ml-2">
                        <div className="text-sm font-medium">{dest.name}</div>
                        <div className="text-xs text-gray-500">{dest.country}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
        
        <button 
          onClick={handleSwapLocations} 
          className="absolute left-1/2 top-10 transform -translate-x-1/2 z-10 hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-md border border-gray-200 text-flight-blue hover:text-white hover:bg-flight-blue transition-colors"
          aria-label="Swap departure and destination"
        >
          <RefreshCw size={14} />
        </button>
        
        <div className="relative">
          <label htmlFor="to" className="block text-sm font-medium text-gray-700 mb-1">To</label>
          <Input
            id="to"
            placeholder="City, airport or country"
            value={toQuery}
            onChange={(e) => {
              setToQuery(e.target.value);
              if (!toFocused) setToFocused(true);
            }}
            onFocus={() => setToFocused(true)}
            onBlur={() => setTimeout(() => setToFocused(false), 200)}
            className="w-full"
          />
          {toFocused && filteredToDestinations.length > 0 && (
            <div className="absolute z-10 top-full left-0 right-0 mt-1 bg-white border border-gray-200 shadow-md rounded-md overflow-hidden">
              <div className="p-3 bg-gray-50">
                <p className="text-sm font-medium text-gray-700">Destinations</p>
              </div>
              <div className="max-h-60 overflow-y-auto">
                {filteredToDestinations.map((dest) => (
                  <div 
                    key={dest.code}
                    className="p-3 hover:bg-gray-100 cursor-pointer flex items-center"
                    onClick={() => selectDestination('to', dest.code, dest.name)}
                  >
                    <div className="text-sm w-12 text-gray-500 font-mono">{dest.code}</div>
                    <div className="ml-2">
                      <div className="text-sm font-medium">{dest.name}</div>
                      <div className="text-xs text-gray-500">{dest.country}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Departure date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal border-gray-200 hover:bg-gray-50">
                <Calendar className="mr-2 h-4 w-4 text-gray-500" />
                {departureDate ? format(departureDate, 'dd MMM yyyy') : <span className="text-gray-500">Select date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <CalendarComponent
                mode="single"
                selected={departureDate}
                onSelect={setDepartureDate}
                initialFocus
                disabled={(date) => date < new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>
        
        {tripType === 'roundTrip' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Return date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal border-gray-200 hover:bg-gray-50">
                  <Calendar className="mr-2 h-4 w-4 text-gray-500" />
                  {returnDate ? format(returnDate, 'dd MMM yyyy') : <span className="text-gray-500">Select date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <CalendarComponent
                  mode="single"
                  selected={returnDate}
                  onSelect={setReturnDate}
                  initialFocus
                  disabled={(date) => (departureDate ? date < departureDate : date < new Date())}
                />
              </PopoverContent>
            </Popover>
          </div>
        )}
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Passengers</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal border-gray-200 hover:bg-gray-50">
                <Users className="mr-2 h-4 w-4 text-gray-500" />
                {passengers} {passengers === 1 ? 'passenger' : 'passengers'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-60 p-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Passengers</span>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setPassengers(Math.max(1, passengers - 1))}
                    disabled={passengers <= 1}
                    className="h-7 w-7 p-0"
                  >
                    -
                  </Button>
                  <span className="w-6 text-center">{passengers}</span>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setPassengers(Math.min(9, passengers + 1))}
                    disabled={passengers >= 9}
                    className="h-7 w-7 p-0"
                  >
                    +
                  </Button>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
      
      <Button 
        className={cn("w-full bg-flight-orange hover:bg-orange-600 text-white transition-colors", 
          isLoading && "opacity-70 pointer-events-none")}
        size="lg"
        onClick={handleSearch}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <div className="animate-spin mr-2 h-4 w-4 border-2 border-b-transparent border-white rounded-full" />
            Searching...
          </>
        ) : (
          <>
            <Search className="mr-2 h-4 w-4" />
            Search Flights
          </>
        )}
      </Button>
    </div>
  );
};

export default SearchForm;
