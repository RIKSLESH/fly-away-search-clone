
import React from 'react';
import { cn } from '@/lib/utils';

interface TripTypeSelectorProps {
  selectedType: 'oneWay' | 'roundTrip' | 'multiCity';
  onSelectTripType: (type: 'oneWay' | 'roundTrip' | 'multiCity') => void;
}

const TripTypeSelector: React.FC<TripTypeSelectorProps> = ({ selectedType, onSelectTripType }) => {
  return (
    <div className="flex rounded-md bg-white p-1 shadow-sm border border-gray-200">
      <button
        onClick={() => onSelectTripType('roundTrip')}
        className={cn(
          "flex-1 py-2.5 px-4 text-sm font-medium transition-colors",
          selectedType === 'roundTrip' 
            ? "bg-flight-blue text-white" 
            : "text-gray-700 hover:text-flight-blue"
        )}
      >
        Round trip
      </button>
      <button
        onClick={() => onSelectTripType('oneWay')}
        className={cn(
          "flex-1 py-2.5 px-4 text-sm font-medium transition-colors",
          selectedType === 'oneWay' 
            ? "bg-flight-blue text-white" 
            : "text-gray-700 hover:text-flight-blue"
        )}
      >
        One way
      </button>
      <button
        onClick={() => onSelectTripType('multiCity')}
        className={cn(
          "flex-1 py-2.5 px-4 text-sm font-medium transition-colors",
          selectedType === 'multiCity' 
            ? "bg-flight-blue text-white" 
            : "text-gray-700 hover:text-flight-blue"
        )}
      >
        Multi-city
      </button>
    </div>
  );
};

export default TripTypeSelector;
