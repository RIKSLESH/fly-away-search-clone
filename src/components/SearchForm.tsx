
import React, { useState } from 'react';
import { ArrowRight, Calendar, Search, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import TripTypeSelector from './TripTypeSelector';
import { format } from 'date-fns';

interface SearchFormProps {
  onSearch: (searchData: SearchData) => void;
}

export interface SearchData {
  tripType: 'oneWay' | 'roundTrip';
  from: string;
  to: string;
  departureDate: Date | undefined;
  returnDate: Date | undefined;
  passengers: number;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [tripType, setTripType] = useState<'oneWay' | 'roundTrip'>('roundTrip');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [departureDate, setDepartureDate] = useState<Date>();
  const [returnDate, setReturnDate] = useState<Date>();
  const [passengers, setPassengers] = useState(1);

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

  return (
    <div className="w-full bg-white rounded-lg shadow-md p-6 animate-fade-in">
      <div className="mb-6">
        <TripTypeSelector selectedType={tripType} onSelectTripType={setTripType} />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="relative">
          <label htmlFor="from" className="block text-sm font-medium text-gray-700 mb-1">From</label>
          <Input
            id="from"
            placeholder="City or airport"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="w-full"
          />
        </div>
        
        <div className="relative">
          <label htmlFor="to" className="block text-sm font-medium text-gray-700 mb-1">To</label>
          <div className="flex items-center">
            <Input
              id="to"
              placeholder="City or airport"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full"
            />
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-flight-blue text-white p-1 rounded-full hidden md:block">
              <ArrowRight size={16} />
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Departure</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <Calendar className="mr-2 h-4 w-4" />
                {departureDate ? format(departureDate, 'PP') : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <CalendarComponent
                mode="single"
                selected={departureDate}
                onSelect={setDepartureDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
        
        {tripType === 'roundTrip' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Return</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-start text-left font-normal">
                  <Calendar className="mr-2 h-4 w-4" />
                  {returnDate ? format(returnDate, 'PP') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <CalendarComponent
                  mode="single"
                  selected={returnDate}
                  onSelect={setReturnDate}
                  initialFocus
                  disabled={(date) => (departureDate ? date < departureDate : false)}
                />
              </PopoverContent>
            </Popover>
          </div>
        )}
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Passengers</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <Users className="mr-2 h-4 w-4" />
                {passengers} {passengers === 1 ? 'passenger' : 'passengers'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-60 p-4">
              <div className="flex items-center justify-between">
                <span>Passengers</span>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setPassengers(Math.max(1, passengers - 1))}
                    disabled={passengers <= 1}
                  >
                    -
                  </Button>
                  <span>{passengers}</span>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => setPassengers(Math.min(9, passengers + 1))}
                    disabled={passengers >= 9}
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
        className="w-full bg-flight-orange hover:bg-orange-600 text-white"
        size="lg"
        onClick={handleSearch}
      >
        <Search className="mr-2 h-4 w-4" />
        Search Flights
      </Button>
    </div>
  );
};

export default SearchForm;
