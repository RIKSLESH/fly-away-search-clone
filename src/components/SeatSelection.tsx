
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface SeatSelectionProps {
  className?: string;
  onSeatSelect: (seat: string) => void;
  selectedSeat?: string;
}

const SeatSelection: React.FC<SeatSelectionProps> = ({
  className,
  onSeatSelect,
  selectedSeat,
}) => {
  const [hoveredSeat, setHoveredSeat] = useState<string | null>(null);

  // Generate plane seats
  const generateSeats = () => {
    const rows = ['A', 'B', 'C', 'D', 'E', 'F'];
    const seatNumbers = Array.from({ length: 15 }, (_, i) => i + 1);
    const unavailableSeats = ['2A', '5C', '8F', '10D', '12B', '14E'];
    
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-center mb-6">
          <div className="w-48 h-12 bg-flight-blue rounded-t-3xl flex items-center justify-center">
            <span className="text-white font-medium text-sm">Cockpit</span>
          </div>
        </div>
        
        {seatNumbers.map(number => (
          <div key={number} className="flex gap-1 justify-center">
            <div className="flex gap-1">
              {rows.slice(0, 3).map(row => {
                const seatId = `${number}${row}`;
                const isUnavailable = unavailableSeats.includes(seatId);
                const isSelected = selectedSeat === seatId;
                const isHovered = hoveredSeat === seatId;
                
                return (
                  <Button
                    key={seatId}
                    variant="outline"
                    size="sm"
                    className={cn(
                      "w-8 h-8 p-0 m-0 flex items-center justify-center text-xs",
                      isSelected && "bg-flight-blue text-white border-flight-blue",
                      isHovered && !isSelected && !isUnavailable && "bg-flight-blue/20",
                      isUnavailable && "bg-gray-100 text-gray-400 cursor-not-allowed hover:bg-gray-100"
                    )}
                    disabled={isUnavailable}
                    onClick={() => !isUnavailable && onSeatSelect(seatId)}
                    onMouseEnter={() => !isUnavailable && setHoveredSeat(seatId)}
                    onMouseLeave={() => setHoveredSeat(null)}
                  >
                    {seatId}
                  </Button>
                );
              })}
            </div>
            
            <div className="w-8 flex items-center justify-center">
              <span className="text-xs font-medium text-gray-500">{number}</span>
            </div>
            
            <div className="flex gap-1">
              {rows.slice(3).map(row => {
                const seatId = `${number}${row}`;
                const isUnavailable = unavailableSeats.includes(seatId);
                const isSelected = selectedSeat === seatId;
                const isHovered = hoveredSeat === seatId;
                
                return (
                  <Button
                    key={seatId}
                    variant="outline"
                    size="sm"
                    className={cn(
                      "w-8 h-8 p-0 m-0 flex items-center justify-center text-xs",
                      isSelected && "bg-flight-blue text-white border-flight-blue",
                      isHovered && !isSelected && !isUnavailable && "bg-flight-blue/20",
                      isUnavailable && "bg-gray-100 text-gray-400 cursor-not-allowed hover:bg-gray-100"
                    )}
                    disabled={isUnavailable}
                    onClick={() => !isUnavailable && onSeatSelect(seatId)}
                    onMouseEnter={() => !isUnavailable && setHoveredSeat(seatId)}
                    onMouseLeave={() => setHoveredSeat(null)}
                  >
                    {seatId}
                  </Button>
                );
              })}
            </div>
          </div>
        ))}
        
        <div className="mt-6 flex justify-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 border border-gray-300 bg-white"></div>
            <span className="text-xs text-gray-600">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-flight-blue border border-flight-blue"></div>
            <span className="text-xs text-gray-600">Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-gray-100 border border-gray-300"></div>
            <span className="text-xs text-gray-600">Unavailable</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={cn("mt-4", className)}>
      <h3 className="text-lg font-semibold text-gray-800 mb-6">Select Your Seat</h3>
      <div className="p-4 border border-gray-200 rounded-lg bg-white">
        {generateSeats()}
      </div>
    </div>
  );
};

export default SeatSelection;
