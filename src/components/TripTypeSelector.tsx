
import React from 'react';
import { cn } from '@/lib/utils';

interface TripTypeSelectorProps {
  selectedType: 'oneWay' | 'roundTrip';
  onSelectTripType: (type: 'oneWay' | 'roundTrip') => void;
}

const TripTypeSelector: React.FC<TripTypeSelectorProps> = ({ selectedType, onSelectTripType }) => {
  return (
    <div className="flex rounded-md bg-white p-1 shadow-sm border border-gray-200">
      <button
        onClick={() => onSelectTripType('oneWay')}
        className={cn(
          "flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors",
          selectedType === 'oneWay' 
            ? "bg-flight-blue text-white" 
            : "text-gray-700 hover:text-flight-blue"
        )}
      >
        One way
      </button>
      <button
        onClick={() => onSelectTripType('roundTrip')}
        className={cn(
          "flex-1 py-2 px-4 text-sm font-medium rounded-md transition-colors",
          selectedType === 'roundTrip' 
            ? "bg-flight-blue text-white" 
            : "text-gray-700 hover:text-flight-blue"
        )}
      >
        Round trip
      </button>
    </div>
  );
};

export default TripTypeSelector;
