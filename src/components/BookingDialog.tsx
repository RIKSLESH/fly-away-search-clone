
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Flight } from '@/services/flightApi';
import SeatSelection from './SeatSelection';
import PassengerForm, { PassengerFormValues } from './PassengerForm';
import AncillaryServices from './AncillaryServices';
import { ArrowRight, Check } from 'lucide-react';

interface BookingDialogProps {
  flight: Flight | null;
  open: boolean;
  passengers: number;
  onClose: () => void;
}

const BookingDialog: React.FC<BookingDialogProps> = ({
  flight,
  open,
  passengers,
  onClose,
}) => {
  const [currentStep, setCurrentStep] = useState<'seat' | 'services' | 'info' | 'payment' | 'confirmation'>('seat');
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [passengerInfo, setPassengerInfo] = useState<PassengerFormValues[]>([]);

  const handleSeatSelect = (seat: string) => {
    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seat));
    } else {
      if (selectedSeats.length < passengers) {
        setSelectedSeats([...selectedSeats, seat]);
      }
    }
  };

  const handleServicesSelect = (services: string[]) => {
    setSelectedServices(services);
  };

  const handlePassengerInfoSubmit = (data: PassengerFormValues) => {
    const newPassengerInfo = [...passengerInfo];
    newPassengerInfo[0] = data;
    setPassengerInfo(newPassengerInfo);
    setCurrentStep('payment');
  };

  const handlePayment = () => {
    // In a real app, payment processing would happen here
    setCurrentStep('confirmation');
  };

  // Calculate total cost including flight price, taxes, and selected services
  const calculateTotalCost = () => {
    const baseFare = flight?.price || 0;
    const taxes = Math.round(baseFare * 0.2);
    
    // Service prices (in a real app, these would come from an API/database)
    const servicePrices: Record<string, number> = {
      extraBaggage: 35,
      priorityBoarding: 15,
      meal: 22,
      wifi: 12,
      beverages: 10
    };
    
    const servicesTotal = selectedServices.reduce((total, serviceId) => 
      total + (servicePrices[serviceId] || 0), 0);
    
    return {
      baseFare,
      taxes,
      servicesTotal,
      total: baseFare + taxes + servicesTotal
    };
  };

  const renderContent = () => {
    switch (currentStep) {
      case 'seat':
        return (
          <>
            <div className="mb-6 pb-6 border-b">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Selected Flight</h3>
              <p className="text-lg font-semibold">{flight?.from} → {flight?.to}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-gray-600">{flight?.airline}</span>
                <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                  {flight?.departureTime} - {flight?.arrivalTime}
                </span>
              </div>
            </div>
            <SeatSelection 
              onSeatSelect={handleSeatSelect}
              selectedSeat={selectedSeats[0]}
            />
            <div className="mt-4">
              <p className="text-sm text-gray-600">
                {selectedSeats.length} of {passengers} seats selected
              </p>
              {selectedSeats.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {selectedSeats.map(seat => (
                    <span key={seat} className="px-2 py-1 bg-flight-blue-light text-flight-blue rounded text-xs font-medium">
                      Seat {seat}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </>
        );
      case 'services':
        return (
          <>
            <div className="mb-6 pb-6 border-b">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Selected Flight & Seat</h3>
                  <p className="text-lg font-semibold">{flight?.from} → {flight?.to}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-gray-600">{flight?.airline}</span>
                    <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                      {flight?.departureTime} - {flight?.arrivalTime}
                    </span>
                  </div>
                </div>
                <div>
                  <span className="px-3 py-1.5 bg-flight-blue-light text-flight-blue rounded text-sm font-medium">
                    Seat {selectedSeats[0]}
                  </span>
                </div>
              </div>
            </div>
            <AncillaryServices 
              onServicesSelect={handleServicesSelect}
              selectedServices={selectedServices}
            />
          </>
        );
      case 'info':
        return (
          <>
            <div className="mb-6 pb-6 border-b">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Selected Flight & Seat</h3>
                  <p className="text-lg font-semibold">{flight?.from} → {flight?.to}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-sm text-gray-600">{flight?.airline}</span>
                    <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                      {flight?.departureTime} - {flight?.arrivalTime}
                    </span>
                  </div>
                </div>
                <div>
                  <span className="px-3 py-1.5 bg-flight-blue-light text-flight-blue rounded text-sm font-medium">
                    Seat {selectedSeats[0]}
                  </span>
                </div>
              </div>
            </div>
            <h3 className="text-lg font-semibold mb-4">Passenger Information</h3>
            <PassengerForm onSubmit={handlePassengerInfoSubmit} />
          </>
        );
      case 'payment':
        const costDetails = calculateTotalCost();
        return (
          <>
            <div className="mb-6 pb-6 border-b">
              <h3 className="text-sm font-medium text-gray-500 mb-1">Booking Summary</h3>
              <p className="text-lg font-semibold">{flight?.from} → {flight?.to}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-sm text-gray-600">{flight?.airline}</span>
                <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">
                  {flight?.departureTime} - {flight?.arrivalTime}
                </span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded">
                <h4 className="font-medium mb-2">Passenger Details</h4>
                <p>Name: {passengerInfo[0]?.firstName} {passengerInfo[0]?.lastName}</p>
                <p>Document: {passengerInfo[0]?.documentType} ({passengerInfo[0]?.documentNumber})</p>
                <p>Seat: {selectedSeats[0]}</p>
              </div>
              
              {selectedServices.length > 0 && (
                <div className="bg-gray-50 p-4 rounded">
                  <h4 className="font-medium mb-2">Selected Services</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {selectedServices.map(serviceId => {
                      const serviceNames: Record<string, string> = {
                        extraBaggage: 'Extra Baggage',
                        priorityBoarding: 'Priority Boarding',
                        meal: 'In-flight Meal',
                        wifi: 'In-flight WiFi',
                        beverages: 'Premium Beverages',
                      };
                      return (
                        <li key={serviceId}>{serviceNames[serviceId]}</li>
                      );
                    })}
                  </ul>
                </div>
              )}
              
              <div className="bg-gray-50 p-4 rounded">
                <h4 className="font-medium mb-2">Price Details</h4>
                <div className="flex justify-between mb-1">
                  <span>Base fare</span>
                  <span>${costDetails.baseFare}</span>
                </div>
                <div className="flex justify-between mb-1">
                  <span>Taxes & fees</span>
                  <span>${costDetails.taxes}</span>
                </div>
                {costDetails.servicesTotal > 0 && (
                  <div className="flex justify-between mb-1">
                    <span>Additional services</span>
                    <span>${costDetails.servicesTotal}</span>
                  </div>
                )}
                <div className="border-t border-gray-300 my-2"></div>
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${costDetails.total}</span>
                </div>
              </div>
              
              <div className="p-4 border border-gray-200 rounded">
                <h4 className="font-medium mb-4">Payment Method</h4>
                <div className="grid grid-cols-3 gap-2">
                  {['Visa', 'MasterCard', 'PayPal'].map((method) => (
                    <div key={method} className="border border-gray-200 hover:border-flight-blue rounded p-3 text-center cursor-pointer">
                      <span className="text-sm">{method}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-xs text-gray-500">
                  Demo mode: No actual payment will be processed
                </p>
              </div>
            </div>
          </>
        );
      case 'confirmation':
        return (
          <div className="text-center py-8">
            <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <Check className="text-green-600 w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold mb-2">Booking Confirmed!</h3>
            <p className="text-gray-600 mb-6">Your booking has been successfully confirmed</p>
            
            <div className="bg-gray-50 p-4 rounded text-left mb-6">
              <h4 className="font-medium mb-3">Booking Details</h4>
              <p><span className="text-gray-500">Booking Reference:</span> ABC123456</p>
              <p><span className="text-gray-500">Flight:</span> {flight?.from} → {flight?.to}</p>
              <p><span className="text-gray-500">Date:</span> {new Date().toLocaleDateString()}</p>
              <p><span className="text-gray-500">Passenger:</span> {passengerInfo[0]?.firstName} {passengerInfo[0]?.lastName}</p>
              <p><span className="text-gray-500">Seat:</span> {selectedSeats[0]}</p>
              {selectedServices.length > 0 && (
                <p>
                  <span className="text-gray-500">Services:</span>{' '}
                  {selectedServices.map(serviceId => {
                    const serviceNames: Record<string, string> = {
                      extraBaggage: 'Extra Baggage',
                      priorityBoarding: 'Priority Boarding',
                      meal: 'In-flight Meal',
                      wifi: 'In-flight WiFi',
                      beverages: 'Premium Beverages',
                    };
                    return serviceNames[serviceId];
                  }).join(', ')}
                </p>
              )}
            </div>
            
            <Button onClick={onClose} className="w-full">
              Close
            </Button>
          </div>
        );
    }
  };

  const renderFooter = () => {
    switch (currentStep) {
      case 'seat':
        return (
          <Button 
            onClick={() => setCurrentStep('services')} 
            disabled={selectedSeats.length === 0}
            className="ml-auto"
          >
            Continue to Additional Services <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        );
      case 'services':
        return (
          <>
            <Button 
              variant="outline" 
              onClick={() => setCurrentStep('seat')}
            >
              Back
            </Button>
            <Button onClick={() => setCurrentStep('info')}>
              Continue to Passenger Info <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </>
        );
      case 'info':
        return (
          <>
            <Button 
              variant="outline" 
              onClick={() => setCurrentStep('services')}
            >
              Back
            </Button>
            <Button 
              type="submit"
              form="passenger-form"
            >
              Continue to Payment <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </>
        );
      case 'payment':
        return (
          <>
            <Button 
              variant="outline" 
              onClick={() => setCurrentStep('info')}
            >
              Back
            </Button>
            <Button onClick={handlePayment}>
              Confirm and Pay
            </Button>
          </>
        );
      case 'confirmation':
        return null;
    }
  };

  const renderTitle = () => {
    switch (currentStep) {
      case 'seat': return 'Select Your Seat';
      case 'services': return 'Additional Services';
      case 'info': return 'Passenger Information';
      case 'payment': return 'Payment';
      case 'confirmation': return 'Booking Confirmation';
    }
  };

  if (!flight) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{renderTitle()}</DialogTitle>
        </DialogHeader>
        
        {currentStep !== 'confirmation' && (
          <div className="mb-6">
            <div className="flex justify-between relative">
              {['seat', 'services', 'info', 'payment', 'confirmation'].map((step, index) => (
                <div 
                  key={step} 
                  className="flex flex-col items-center relative z-10"
                >
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs
                      ${currentStep === step ? 'bg-flight-blue text-white' : 
                        ['seat', 'services', 'info', 'payment'].indexOf(currentStep) > ['seat', 'services', 'info', 'payment'].indexOf(step) 
                          ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'}`}
                  >
                    {index + 1}
                  </div>
                  <span className="text-xs mt-1">{step.charAt(0).toUpperCase() + step.slice(1)}</span>
                </div>
              ))}
              
              <div className="absolute top-4 left-0 w-full h-0.5 bg-gray-200 -z-0">
                <div 
                  className="h-full bg-green-500 transition-all duration-300"
                  style={{ 
                    width: currentStep === 'seat' 
                      ? '0%' 
                      : currentStep === 'services' 
                        ? '25%' 
                        : currentStep === 'info' 
                          ? '50%' 
                          : currentStep === 'payment'
                            ? '75%'
                            : '100%' 
                  }}
                ></div>
              </div>
            </div>
          </div>
        )}
        
        <div className="py-4">
          {renderContent()}
        </div>
        
        {renderFooter() && (
          <DialogFooter className="flex justify-between">
            {renderFooter()}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default BookingDialog;
