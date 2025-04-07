
export interface Flight {
  id: string;
  airline: string;
  airlineLogo: string;
  departureTime: string;
  arrivalTime: string;
  from: string;
  to: string;
  duration: string;
  stops: number;
  price: number;
  currency: string;
}

export interface FlightSearchParams {
  from: string;
  to: string;
  departureDate: Date | undefined;
  returnDate?: Date | undefined;
  passengers: number;
  tripType: 'oneWay' | 'roundTrip';
}

// Mock airlines data
const airlines = [
  { name: 'Air France', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Air_France_Logo.svg' },
  { name: 'KLM', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c7/KLM_logo.svg' },
  { name: 'Lufthansa', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/8c/Lufthansa_Logo_2018.svg' },
  { name: 'British Airways', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/British_Airways_Logo.svg/250px-British_Airways_Logo.svg.png' },
  { name: 'Emirates', logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d2/Emirates_logo.svg' },
];

// Helper function to generate a random duration string (e.g., "2h 15m")
const generateRandomDuration = () => {
  const hours = Math.floor(Math.random() * 8) + 1;
  const minutes = Math.floor(Math.random() * 60);
  return `${hours}h ${minutes}m`;
};

// Helper function to generate a random time string (e.g., "14:25")
const generateRandomTime = (baseDate: Date) => {
  const hours = Math.floor(Math.random() * 24);
  const minutes = Math.floor(Math.random() * 60);
  const date = new Date(baseDate);
  date.setHours(hours, minutes);
  return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
};

export const searchFlights = async (params: FlightSearchParams): Promise<Flight[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  if (!params.from || !params.to || !params.departureDate) {
    return [];
  }
  
  // Generate between 5-10 random flights
  const flightCount = Math.floor(Math.random() * 6) + 5;
  const flights: Flight[] = [];
  
  for (let i = 0; i < flightCount; i++) {
    const randomAirline = airlines[Math.floor(Math.random() * airlines.length)];
    const duration = generateRandomDuration();
    const departureTime = generateRandomTime(params.departureDate);
    const stops = Math.floor(Math.random() * 3); // 0, 1, or 2 stops
    const basePrice = 100 + Math.floor(Math.random() * 500);
    
    // Adjust price based on stops - direct flights are more expensive
    let price = basePrice;
    if (stops === 0) price *= 1.4;
    else if (stops === 1) price *= 1.2;
    
    flights.push({
      id: `flight-${i}-${Date.now()}`,
      airline: randomAirline.name,
      airlineLogo: randomAirline.logo,
      departureTime,
      arrivalTime: generateRandomTime(params.departureDate),
      from: params.from,
      to: params.to,
      duration,
      stops,
      price: Math.round(price),
      currency: 'USD',
    });
  }
  
  // Sort by price
  return flights.sort((a, b) => a.price - b.price);
};
