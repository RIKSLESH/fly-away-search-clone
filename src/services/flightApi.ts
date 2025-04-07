
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

// Expanded airlines data
const airlines = [
  { name: 'Air France', logo: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Air_France_Logo.svg' },
  { name: 'KLM', logo: 'https://upload.wikimedia.org/wikipedia/commons/c/c7/KLM_logo.svg' },
  { name: 'Lufthansa', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/8c/Lufthansa_Logo_2018.svg' },
  { name: 'British Airways', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/eb/British_Airways_Logo.svg/250px-British_Airways_Logo.svg.png' },
  { name: 'Emirates', logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d2/Emirates_logo.svg' },
  { name: 'Qatar Airways', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9b/Qatar_Airways_Logo.svg/1280px-Qatar_Airways_Logo.svg.png' },
  { name: 'Etihad Airways', logo: 'https://upload.wikimedia.org/wikipedia/commons/8/8c/Etihad_Airways_logo.svg' },
  { name: 'Singapore Airlines', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/6/6b/Singapore_Airlines_Logo_2.svg/1200px-Singapore_Airlines_Logo_2.svg.png' },
  { name: 'Turkish Airlines', logo: 'https://upload.wikimedia.org/wikipedia/commons/9/9c/Turkish_Airlines_logo_2019_compact.svg' },
  { name: 'Aeroflot', logo: 'https://upload.wikimedia.org/wikipedia/commons/5/57/Aeroflot_logo_%28en%29.svg' },
  { name: 'American Airlines', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/23/American_Airlines_logo_2013.svg/1024px-American_Airlines_logo_2013.svg.png' },
  { name: 'Delta Air Lines', logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Delta_logo.svg' },
];

// Comprehensive list of airports and cities for the search
export const destinations = [
  // Europe
  { code: 'LON', name: 'London', country: 'United Kingdom' },
  { code: 'PAR', name: 'Paris', country: 'France' },
  { code: 'BCN', name: 'Barcelona', country: 'Spain' },
  { code: 'MAD', name: 'Madrid', country: 'Spain' },
  { code: 'ROM', name: 'Rome', country: 'Italy' },
  { code: 'AMS', name: 'Amsterdam', country: 'Netherlands' },
  { code: 'BER', name: 'Berlin', country: 'Germany' },
  { code: 'VIE', name: 'Vienna', country: 'Austria' },
  { code: 'ZRH', name: 'Zurich', country: 'Switzerland' },
  { code: 'LIS', name: 'Lisbon', country: 'Portugal' },
  { code: 'ATH', name: 'Athens', country: 'Greece' },
  { code: 'IST', name: 'Istanbul', country: 'Turkey' },
  { code: 'CPH', name: 'Copenhagen', country: 'Denmark' },
  { code: 'OSL', name: 'Oslo', country: 'Norway' },
  { code: 'STO', name: 'Stockholm', country: 'Sweden' },
  { code: 'HEL', name: 'Helsinki', country: 'Finland' },
  { code: 'WAW', name: 'Warsaw', country: 'Poland' },
  { code: 'PRG', name: 'Prague', country: 'Czech Republic' },
  { code: 'BUD', name: 'Budapest', country: 'Hungary' },
  { code: 'DUB', name: 'Dublin', country: 'Ireland' },
  { code: 'BRU', name: 'Brussels', country: 'Belgium' },
  { code: 'MIL', name: 'Milan', country: 'Italy' },
  { code: 'MUC', name: 'Munich', country: 'Germany' },
  { code: 'FRA', name: 'Frankfurt', country: 'Germany' },
  { code: 'KBP', name: 'Kyiv', country: 'Ukraine' },
  
  // North America
  { code: 'NYC', name: 'New York', country: 'USA' },
  { code: 'LAX', name: 'Los Angeles', country: 'USA' },
  { code: 'CHI', name: 'Chicago', country: 'USA' },
  { code: 'MIA', name: 'Miami', country: 'USA' },
  { code: 'SFO', name: 'San Francisco', country: 'USA' },
  { code: 'YTO', name: 'Toronto', country: 'Canada' },
  { code: 'YMQ', name: 'Montreal', country: 'Canada' },
  { code: 'YVR', name: 'Vancouver', country: 'Canada' },
  { code: 'MEX', name: 'Mexico City', country: 'Mexico' },
  { code: 'CUN', name: 'Cancun', country: 'Mexico' },
  { code: 'LAS', name: 'Las Vegas', country: 'USA' },
  { code: 'BOS', name: 'Boston', country: 'USA' },
  { code: 'WAS', name: 'Washington', country: 'USA' },
  { code: 'DFW', name: 'Dallas', country: 'USA' },
  { code: 'HOU', name: 'Houston', country: 'USA' },
  { code: 'ATL', name: 'Atlanta', country: 'USA' },

  // Asia
  { code: 'TYO', name: 'Tokyo', country: 'Japan' },
  { code: 'BJS', name: 'Beijing', country: 'China' },
  { code: 'SHA', name: 'Shanghai', country: 'China' },
  { code: 'HKG', name: 'Hong Kong', country: 'Hong Kong' },
  { code: 'SIN', name: 'Singapore', country: 'Singapore' },
  { code: 'BKK', name: 'Bangkok', country: 'Thailand' },
  { code: 'SEL', name: 'Seoul', country: 'South Korea' },
  { code: 'DEL', name: 'New Delhi', country: 'India' },
  { code: 'BOM', name: 'Mumbai', country: 'India' },
  { code: 'DXB', name: 'Dubai', country: 'UAE' },
  { code: 'AUH', name: 'Abu Dhabi', country: 'UAE' },
  { code: 'KUL', name: 'Kuala Lumpur', country: 'Malaysia' },
  { code: 'HND', name: 'Haneda', country: 'Japan' },
  { code: 'CGK', name: 'Jakarta', country: 'Indonesia' },
  { code: 'TPE', name: 'Taipei', country: 'Taiwan' },

  // Australia & Oceania
  { code: 'SYD', name: 'Sydney', country: 'Australia' },
  { code: 'MEL', name: 'Melbourne', country: 'Australia' },
  { code: 'BNE', name: 'Brisbane', country: 'Australia' },
  { code: 'PER', name: 'Perth', country: 'Australia' },
  { code: 'AKL', name: 'Auckland', country: 'New Zealand' },
  { code: 'WLG', name: 'Wellington', country: 'New Zealand' },
  { code: 'CHC', name: 'Christchurch', country: 'New Zealand' },

  // Africa
  { code: 'CAI', name: 'Cairo', country: 'Egypt' },
  { code: 'CPT', name: 'Cape Town', country: 'South Africa' },
  { code: 'JNB', name: 'Johannesburg', country: 'South Africa' },
  { code: 'LOS', name: 'Lagos', country: 'Nigeria' },
  { code: 'NBO', name: 'Nairobi', country: 'Kenya' },
  { code: 'RAK', name: 'Marrakech', country: 'Morocco' },
  { code: 'CMN', name: 'Casablanca', country: 'Morocco' },

  // South America
  { code: 'GRU', name: 'São Paulo', country: 'Brazil' },
  { code: 'RIO', name: 'Rio de Janeiro', country: 'Brazil' },
  { code: 'BUE', name: 'Buenos Aires', country: 'Argentina' },
  { code: 'SCL', name: 'Santiago', country: 'Chile' },
  { code: 'LIM', name: 'Lima', country: 'Peru' },
  { code: 'BOG', name: 'Bogota', country: 'Colombia' },
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

// Helper function to get airport from code
const getAirportByCode = (code: string) => {
  return destinations.find(d => d.code === code) || { code, name: code, country: 'Unknown' };
};

export const searchFlights = async (params: FlightSearchParams): Promise<Flight[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  if (!params.from || !params.to || !params.departureDate) {
    return [];
  }
  
  // Generate between 10-20 random flights
  const flightCount = Math.floor(Math.random() * 11) + 10;
  const flights: Flight[] = [];
  
  // Get airport information
  const fromAirport = getAirportByCode(params.from);
  const toAirport = getAirportByCode(params.to);
  
  for (let i = 0; i < flightCount; i++) {
    const randomAirline = airlines[Math.floor(Math.random() * airlines.length)];
    const duration = generateRandomDuration();
    const departureTime = generateRandomTime(params.departureDate);
    const stops = Math.floor(Math.random() * 3); // 0, 1, or 2 stops
    
    // More realistic price generation based on factors
    const basePrice = 100 + Math.floor(Math.random() * 500);
    let priceMultiplier = 1.0;
    
    // Direct flights are more expensive
    if (stops === 0) priceMultiplier *= 1.4;
    else if (stops === 1) priceMultiplier *= 1.2;
    
    // Premium airlines are more expensive
    const premiumAirlines = ['Emirates', 'Qatar Airways', 'Singapore Airlines', 'Etihad Airways'];
    if (premiumAirlines.includes(randomAirline.name)) {
      priceMultiplier *= 1.2;
    }
    
    // Long-haul flights (different continents) are more expensive
    const intercontinental = fromAirport.country !== toAirport.country;
    if (intercontinental) {
      priceMultiplier *= 1.3;
    }
    
    // Weekend flights are more expensive
    const departureDay = params.departureDate.getDay();
    if (departureDay === 5 || departureDay === 6) { // Friday or Saturday
      priceMultiplier *= 1.15;
    }
    
    // Calculate final price
    const price = Math.round(basePrice * priceMultiplier);
    
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
      price,
      currency: 'USD',
    });
  }
  
  // Sort by price
  return flights.sort((a, b) => a.price - b.price);
};
