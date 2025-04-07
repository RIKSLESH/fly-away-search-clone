
import React from 'react';
import { SearchData } from './SearchForm';
import { format } from 'date-fns';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plane } from 'lucide-react';

interface FlightSearchResultsProps {
  searchData: SearchData;
}

const FlightSearchResults: React.FC<FlightSearchResultsProps> = ({ searchData }) => {
  const { tripType, from, to, departureDate, returnDate, passengers } = searchData;
  
  if (!from || !to || !departureDate) {
    return null;
  }
  
  return (
    <div className="mt-8 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Flight Search Results</h2>
        <Badge variant="outline" className="text-flight-blue border-flight-blue">
          {tripType === 'oneWay' ? 'One Way' : 'Round Trip'}
        </Badge>
      </div>
      
      <div className="mb-4 flex flex-wrap items-center gap-2 text-sm text-gray-500">
        <span className="font-medium text-gray-700">{from}</span> 
        <Plane className="h-4 w-4 text-flight-blue rotate-90" />
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
        {/* This is placeholder content for the flight results */}
        {[1, 2, 3].map((i) => (
          <Card key={i} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg font-bold flex items-center">
                  <span className="text-flight-blue mr-2">Airline {i}</span>
                </CardTitle>
                <span className="text-2xl font-bold text-flight-blue">${Math.floor(Math.random() * 300) + 100}</span>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Departure</p>
                  <p className="font-semibold">{format(new Date(departureDate.getTime() + i * 3600000), 'HH:mm')}</p>
                  <p className="text-sm">{from}</p>
                </div>
                <div className="flex items-center justify-center relative">
                  <hr className="border-t border-gray-300 w-full absolute" />
                  <span className="bg-white px-2 relative text-xs text-gray-500 whitespace-nowrap">
                    {Math.floor(Math.random() * 3) + 1}h {Math.floor(Math.random() * 50) + 10}m
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Arrival</p>
                  <p className="font-semibold">{format(new Date(departureDate.getTime() + (i + 3) * 3600000), 'HH:mm')}</p>
                  <p className="text-sm">{to}</p>
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-4">
                <Badge variant="secondary" className="text-xs">
                  {Math.random() > 0.5 ? 'Direct' : '1 Stop'}
                </Badge>
                <button className="px-4 py-2 text-flight-orange border border-flight-orange rounded-md hover:bg-flight-orange hover:text-white transition-colors text-sm">
                  Select Flight
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FlightSearchResults;
