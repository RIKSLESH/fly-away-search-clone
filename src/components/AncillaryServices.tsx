
import React, { useState } from 'react';
import { Check, Coffee, Luggage, Utensils, Wifi } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: React.ReactNode;
}

interface AncillaryServicesProps {
  onServicesSelect: (services: string[]) => void;
  selectedServices?: string[];
}

const AncillaryServices: React.FC<AncillaryServicesProps> = ({
  onServicesSelect,
  selectedServices = [],
}) => {
  const [selected, setSelected] = useState<string[]>(selectedServices);

  const services: Service[] = [
    {
      id: 'extraBaggage',
      name: 'Extra Baggage',
      description: 'Add an extra 23kg checked bag',
      price: 35,
      icon: <Luggage className="h-5 w-5" />,
    },
    {
      id: 'priorityBoarding',
      name: 'Priority Boarding',
      description: 'Be among the first to board the plane',
      price: 15,
      icon: <Check className="h-5 w-5" />,
    },
    {
      id: 'meal',
      name: 'In-flight Meal',
      description: 'Enjoy a delicious meal during your flight',
      price: 22,
      icon: <Utensils className="h-5 w-5" />,
    },
    {
      id: 'wifi',
      name: 'In-flight WiFi',
      description: 'Stay connected with WiFi access',
      price: 12,
      icon: <Wifi className="h-5 w-5" />,
    },
    {
      id: 'beverages',
      name: 'Premium Beverages',
      description: 'Enjoy premium drinks during your flight',
      price: 10,
      icon: <Coffee className="h-5 w-5" />,
    },
  ];

  const handleServiceToggle = (serviceId: string) => {
    const newSelected = selected.includes(serviceId) 
      ? selected.filter(id => id !== serviceId)
      : [...selected, serviceId];
    
    setSelected(newSelected);
    onServicesSelect(newSelected);
  };

  return (
    <ScrollArea className="max-h-[60vh]">
      <div className="space-y-6 pr-4">
        <h3 className="text-lg font-semibold mb-4">Additional Services</h3>
        <p className="text-gray-600 text-sm mb-4">
          Enhance your journey with these optional services
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((service) => {
            const isSelected = selected.includes(service.id);
            return (
              <div
                key={service.id}
                className={cn(
                  "border rounded-lg p-4 cursor-pointer transition-all",
                  isSelected
                    ? "border-flight-blue bg-flight-blue-light"
                    : "border-gray-200 hover:border-flight-blue/50"
                )}
                onClick={() => handleServiceToggle(service.id)}
              >
                <div className="flex items-start gap-3">
                  <div className={cn(
                    "p-2 rounded-full",
                    isSelected ? "bg-flight-blue text-white" : "bg-gray-100 text-gray-600"
                  )}>
                    {service.icon}
                  </div>
                  <div>
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium">{service.name}</h4>
                      <span className="font-medium text-flight-blue">${service.price}</span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{service.description}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex justify-between">
            <span className="font-medium">Selected services total:</span>
            <span className="font-medium">
              ${services.filter(s => selected.includes(s.id))
                .reduce((total, service) => total + service.price, 0)}
            </span>
          </div>
        </div>
      </div>
    </ScrollArea>
  );
};

export default AncillaryServices;
