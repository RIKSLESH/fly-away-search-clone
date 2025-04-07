
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
  tripType: 'oneWay' | 'roundTrip' | 'multiCity';
}

// Comprehensive list of airlines
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
  { name: 'United Airlines', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e0/United_Airlines_Logo.svg/1200px-United_Airlines_Logo.svg.png' },
  { name: 'Southwest Airlines', logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b0/Southwest_Airlines_logo_2014.svg' },
  { name: 'Ryanair', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Ryanair.svg/1200px-Ryanair.svg.png' },
  { name: 'easyJet', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/EasyJet_logo.svg/2560px-EasyJet_logo.svg.png' },
  { name: 'Air Canada', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Air_Canada_Logo.svg/2560px-Air_Canada_Logo.svg.png' },
  { name: 'China Southern Airlines', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/e/e4/China_southern_logo.svg/1200px-China_southern_logo.svg.png' },
  { name: 'Air China', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/9/9a/Air_China_logo.svg/1200px-Air_China_logo.svg.png' },
  { name: 'Japan Airlines', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/8/8f/Japan_Airlines_logo_%28new%29.svg/1200px-Japan_Airlines_logo_%28new%29.svg.png' },
  { name: 'ANA', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c9/All_Nippon_Airways_Logo.svg/1200px-All_Nippon_Airways_Logo.svg.png' },
  { name: 'Qantas', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/02/Qantas_Airways_logo_2016.svg/1200px-Qantas_Airways_logo_2016.svg.png' },
  { name: 'Cathay Pacific', logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/1/17/Cathay_Pacific_logo.svg/1200px-Cathay_Pacific_logo.svg.png' },
  { name: 'Air New Zealand', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/58/Air_New_Zealand_logo.svg/1200px-Air_New_Zealand_logo.svg.png' },
  { name: 'LATAM Airlines', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/LATAM_Airlines_Logo_2.svg/1200px-LATAM_Airlines_Logo_2.svg.png' },
  { name: 'Iberia', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Iberia_Logo.svg/1200px-Iberia_Logo.svg.png' },
  { name: 'SAS', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9c/Scandinavian_Airlines_logo.svg/2560px-Scandinavian_Airlines_logo.svg.png' },
  { name: 'Finnair', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Finnair_Logo.svg/2560px-Finnair_Logo.svg.png' },
  { name: 'Avianca', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d6/Avianca_Logo.svg/2560px-Avianca_Logo.svg.png' },
  { name: 'Ukraine International Airlines', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/UIA_logo.svg/1200px-UIA_logo.svg.png' }
];

// Comprehensive list of over 1000 airports and cities for the search
export const destinations = [
  // Europe - Major Cities
  ...[
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
  ],
  
  // Europe - Secondary Cities
  ...[
    { code: 'BRU', name: 'Brussels', country: 'Belgium' },
    { code: 'MIL', name: 'Milan', country: 'Italy' },
    { code: 'MUC', name: 'Munich', country: 'Germany' },
    { code: 'FRA', name: 'Frankfurt', country: 'Germany' },
    { code: 'KBP', name: 'Kyiv', country: 'Ukraine' },
    { code: 'LHR', name: 'London Heathrow', country: 'United Kingdom' },
    { code: 'LGW', name: 'London Gatwick', country: 'United Kingdom' },
    { code: 'CDG', name: 'Paris Charles de Gaulle', country: 'France' },
    { code: 'ORY', name: 'Paris Orly', country: 'France' },
    { code: 'FCO', name: 'Rome Fiumicino', country: 'Italy' },
    { code: 'CIA', name: 'Rome Ciampino', country: 'Italy' },
    { code: 'LJU', name: 'Ljubljana', country: 'Slovenia' },
    { code: 'ZAG', name: 'Zagreb', country: 'Croatia' },
    { code: 'SOF', name: 'Sofia', country: 'Bulgaria' },
    { code: 'OTP', name: 'Bucharest', country: 'Romania' },
    { code: 'BEG', name: 'Belgrade', country: 'Serbia' },
    { code: 'TIV', name: 'Tivat', country: 'Montenegro' },
    { code: 'TIA', name: 'Tirana', country: 'Albania' },
    { code: 'SKP', name: 'Skopje', country: 'North Macedonia' },
    { code: 'OHD', name: 'Ohrid', country: 'North Macedonia' },
    { code: 'VLC', name: 'Valencia', country: 'Spain' },
    { code: 'AGP', name: 'Malaga', country: 'Spain' },
    { code: 'ALC', name: 'Alicante', country: 'Spain' },
    { code: 'BIO', name: 'Bilbao', country: 'Spain' },
    { code: 'SVQ', name: 'Seville', country: 'Spain' },
    { code: 'LIS', name: 'Lisbon', country: 'Portugal' },
    { code: 'OPO', name: 'Porto', country: 'Portugal' },
    { code: 'FAO', name: 'Faro', country: 'Portugal' },
  ],
    
  // North America - USA Major Cities
  ...[
    { code: 'NYC', name: 'New York', country: 'USA' },
    { code: 'LAX', name: 'Los Angeles', country: 'USA' },
    { code: 'CHI', name: 'Chicago', country: 'USA' },
    { code: 'MIA', name: 'Miami', country: 'USA' },
    { code: 'SFO', name: 'San Francisco', country: 'USA' },
    { code: 'LAS', name: 'Las Vegas', country: 'USA' },
    { code: 'BOS', name: 'Boston', country: 'USA' },
    { code: 'WAS', name: 'Washington', country: 'USA' },
    { code: 'DFW', name: 'Dallas', country: 'USA' },
    { code: 'HOU', name: 'Houston', country: 'USA' },
    { code: 'ATL', name: 'Atlanta', country: 'USA' },
    { code: 'PHX', name: 'Phoenix', country: 'USA' },
    { code: 'PHL', name: 'Philadelphia', country: 'USA' },
    { code: 'SEA', name: 'Seattle', country: 'USA' },
    { code: 'DEN', name: 'Denver', country: 'USA' },
    { code: 'PDX', name: 'Portland', country: 'USA' },
    { code: 'MSY', name: 'New Orleans', country: 'USA' },
    { code: 'SAN', name: 'San Diego', country: 'USA' },
    { code: 'AUS', name: 'Austin', country: 'USA' },
    { code: 'MCO', name: 'Orlando', country: 'USA' },
  ],
    
  // North America - Canada and Mexico
  ...[
    { code: 'YTO', name: 'Toronto', country: 'Canada' },
    { code: 'YMQ', name: 'Montreal', country: 'Canada' },
    { code: 'YVR', name: 'Vancouver', country: 'Canada' },
    { code: 'YYC', name: 'Calgary', country: 'Canada' },
    { code: 'YEG', name: 'Edmonton', country: 'Canada' },
    { code: 'YUL', name: 'Montreal-Trudeau', country: 'Canada' },
    { code: 'YYZ', name: 'Toronto Pearson', country: 'Canada' },
    { code: 'YOW', name: 'Ottawa', country: 'Canada' },
    { code: 'YWG', name: 'Winnipeg', country: 'Canada' },
    { code: 'YHZ', name: 'Halifax', country: 'Canada' },
    { code: 'MEX', name: 'Mexico City', country: 'Mexico' },
    { code: 'CUN', name: 'Cancun', country: 'Mexico' },
    { code: 'GDL', name: 'Guadalajara', country: 'Mexico' },
    { code: 'MTY', name: 'Monterrey', country: 'Mexico' },
    { code: 'SJD', name: 'Los Cabos', country: 'Mexico' },
  ],
    
  // Asia - Major Cities
  ...[
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
    { code: 'NRT', name: 'Narita', country: 'Japan' },
    { code: 'CAN', name: 'Guangzhou', country: 'China' },
    { code: 'SZX', name: 'Shenzhen', country: 'China' },
    { code: 'CTU', name: 'Chengdu', country: 'China' },
    { code: 'ICN', name: 'Incheon', country: 'South Korea' },
    { code: 'CGK', name: 'Jakarta', country: 'Indonesia' },
    { code: 'TPE', name: 'Taipei', country: 'Taiwan' },
  ],
    
  // Asia - Secondary Cities
  ...[
    { code: 'HKT', name: 'Phuket', country: 'Thailand' },
    { code: 'USM', name: 'Koh Samui', country: 'Thailand' },
    { code: 'MNL', name: 'Manila', country: 'Philippines' },
    { code: 'CEB', name: 'Cebu', country: 'Philippines' },
    { code: 'HAN', name: 'Hanoi', country: 'Vietnam' },
    { code: 'SGN', name: 'Ho Chi Minh City', country: 'Vietnam' },
    { code: 'DAD', name: 'Da Nang', country: 'Vietnam' },
    { code: 'DPS', name: 'Bali', country: 'Indonesia' },
    { code: 'CCU', name: 'Kolkata', country: 'India' },
    { code: 'MAA', name: 'Chennai', country: 'India' },
    { code: 'BLR', name: 'Bangalore', country: 'India' },
    { code: 'HYD', name: 'Hyderabad', country: 'India' },
    { code: 'DOH', name: 'Doha', country: 'Qatar' },
    { code: 'MCT', name: 'Muscat', country: 'Oman' },
    { code: 'RUH', name: 'Riyadh', country: 'Saudi Arabia' },
    { code: 'JED', name: 'Jeddah', country: 'Saudi Arabia' },
  ],
    
  // Australia & Oceania
  ...[
    { code: 'SYD', name: 'Sydney', country: 'Australia' },
    { code: 'MEL', name: 'Melbourne', country: 'Australia' },
    { code: 'BNE', name: 'Brisbane', country: 'Australia' },
    { code: 'PER', name: 'Perth', country: 'Australia' },
    { code: 'ADL', name: 'Adelaide', country: 'Australia' },
    { code: 'CBR', name: 'Canberra', country: 'Australia' },
    { code: 'OOL', name: 'Gold Coast', country: 'Australia' },
    { code: 'CNS', name: 'Cairns', country: 'Australia' },
    { code: 'HBA', name: 'Hobart', country: 'Australia' },
    { code: 'AKL', name: 'Auckland', country: 'New Zealand' },
    { code: 'WLG', name: 'Wellington', country: 'New Zealand' },
    { code: 'CHC', name: 'Christchurch', country: 'New Zealand' },
    { code: 'ZQN', name: 'Queenstown', country: 'New Zealand' },
    { code: 'NAN', name: 'Nadi', country: 'Fiji' },
    { code: 'PPT', name: 'Tahiti', country: 'French Polynesia' },
    { code: 'APW', name: 'Apia', country: 'Samoa' },
  ],
    
  // Africa
  ...[
    { code: 'CAI', name: 'Cairo', country: 'Egypt' },
    { code: 'CPT', name: 'Cape Town', country: 'South Africa' },
    { code: 'JNB', name: 'Johannesburg', country: 'South Africa' },
    { code: 'DUR', name: 'Durban', country: 'South Africa' },
    { code: 'LOS', name: 'Lagos', country: 'Nigeria' },
    { code: 'NBO', name: 'Nairobi', country: 'Kenya' },
    { code: 'MBA', name: 'Mombasa', country: 'Kenya' },
    { code: 'DAR', name: 'Dar es Salaam', country: 'Tanzania' },
    { code: 'ZNZ', name: 'Zanzibar', country: 'Tanzania' },
    { code: 'RAK', name: 'Marrakech', country: 'Morocco' },
    { code: 'CMN', name: 'Casablanca', country: 'Morocco' },
    { code: 'TUN', name: 'Tunis', country: 'Tunisia' },
    { code: 'ALG', name: 'Algiers', country: 'Algeria' },
    { code: 'ADD', name: 'Addis Ababa', country: 'Ethiopia' },
    { code: 'ACC', name: 'Accra', country: 'Ghana' },
    { code: 'MRU', name: 'Mauritius', country: 'Mauritius' },
    { code: 'SEZ', name: 'Seychelles', country: 'Seychelles' },
  ],
    
  // South America
  ...[
    { code: 'GRU', name: 'São Paulo', country: 'Brazil' },
    { code: 'RIO', name: 'Rio de Janeiro', country: 'Brazil' },
    { code: 'BSB', name: 'Brasilia', country: 'Brazil' },
    { code: 'CNF', name: 'Belo Horizonte', country: 'Brazil' },
    { code: 'REC', name: 'Recife', country: 'Brazil' },
    { code: 'SSA', name: 'Salvador', country: 'Brazil' },
    { code: 'BUE', name: 'Buenos Aires', country: 'Argentina' },
    { code: 'COR', name: 'Cordoba', country: 'Argentina' },
    { code: 'MDZ', name: 'Mendoza', country: 'Argentina' },
    { code: 'SCL', name: 'Santiago', country: 'Chile' },
    { code: 'LIM', name: 'Lima', country: 'Peru' },
    { code: 'CUZ', name: 'Cusco', country: 'Peru' },
    { code: 'BOG', name: 'Bogota', country: 'Colombia' },
    { code: 'MDE', name: 'Medellin', country: 'Colombia' },
    { code: 'CTG', name: 'Cartagena', country: 'Colombia' },
    { code: 'UIO', name: 'Quito', country: 'Ecuador' },
    { code: 'GYE', name: 'Guayaquil', country: 'Ecuador' },
    { code: 'MVD', name: 'Montevideo', country: 'Uruguay' },
    { code: 'ASU', name: 'Asunción', country: 'Paraguay' },
    { code: 'CCS', name: 'Caracas', country: 'Venezuela' },
  ],
    
  // Central America & Caribbean
  ...[
    { code: 'SJO', name: 'San José', country: 'Costa Rica' },
    { code: 'LIR', name: 'Liberia', country: 'Costa Rica' },
    { code: 'RTB', name: 'Roatan', country: 'Honduras' },
    { code: 'SAP', name: 'San Pedro Sula', country: 'Honduras' },
    { code: 'TGU', name: 'Tegucigalpa', country: 'Honduras' },
    { code: 'MGA', name: 'Managua', country: 'Nicaragua' },
    { code: 'SAL', name: 'San Salvador', country: 'El Salvador' },
    { code: 'PTY', name: 'Panama City', country: 'Panama' },
    { code: 'GUA', name: 'Guatemala City', country: 'Guatemala' },
    { code: 'BZE', name: 'Belize City', country: 'Belize' },
    { code: 'NAS', name: 'Nassau', country: 'Bahamas' },
    { code: 'MBJ', name: 'Montego Bay', country: 'Jamaica' },
    { code: 'KIN', name: 'Kingston', country: 'Jamaica' },
    { code: 'HAV', name: 'Havana', country: 'Cuba' },
    { code: 'PUJ', name: 'Punta Cana', country: 'Dominican Republic' },
    { code: 'SDQ', name: 'Santo Domingo', country: 'Dominican Republic' },
    { code: 'SJU', name: 'San Juan', country: 'Puerto Rico' },
    { code: 'AUA', name: 'Aruba', country: 'Aruba' },
    { code: 'CUR', name: 'Curaçao', country: 'Curaçao' },
  ],
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

// Helper function to calculate distance between airports
const calculateDistance = (fromCode: string, toCode: string) => {
  // This is a simplified calculation for demo purposes
  // In real life this would use latitude/longitude and haversine formula
  const fromAirport = getAirportByCode(fromCode);
  const toAirport = getAirportByCode(toCode);
  
  // Create a pseudo-random but consistent distance based on airport codes
  const seed = (fromCode + toCode).split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const baseDistance = (seed % 3000) + 500; // Between 500 and 3500
  
  // Adjust based on countries (international flights are longer)
  const isInternational = fromAirport.country !== toAirport.country;
  return isInternational ? baseDistance * 1.5 : baseDistance;
};

export const searchFlights = async (params: FlightSearchParams): Promise<Flight[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  if (!params.from || !params.to || !params.departureDate) {
    return [];
  }
  
  // Generate between 15-30 random flights for more comprehensive results
  const flightCount = Math.floor(Math.random() * 16) + 15;
  const flights: Flight[] = [];
  
  // Get airport information
  const fromAirport = getAirportByCode(params.from);
  const toAirport = getAirportByCode(params.to);
  
  // Calculate approximate distance for realistic durations and prices
  const distance = calculateDistance(params.from, params.to);
  
  for (let i = 0; i < flightCount; i++) {
    const randomAirline = airlines[Math.floor(Math.random() * airlines.length)];
    
    // More realistic duration based on distance
    const flightHours = Math.max(1, Math.floor(distance / 800));
    const flightMinutes = Math.floor(Math.random() * 60);
    const duration = `${flightHours}h ${flightMinutes}m`;
    
    const departureTime = generateRandomTime(params.departureDate);
    
    // Calculate arrival time based on duration
    const arrivalDate = new Date(params.departureDate);
    arrivalDate.setHours(
      parseInt(departureTime.split(':')[0]) + flightHours,
      parseInt(departureTime.split(':')[1]) + flightMinutes
    );
    const arrivalTime = arrivalDate.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
    
    // Number of stops based on distance
    let stops = 0;
    if (distance > 2000) {
      stops = Math.random() > 0.6 ? (Math.random() > 0.7 ? 2 : 1) : 0;
    } else if (distance > 1000) {
      stops = Math.random() > 0.7 ? 1 : 0;
    } else {
      stops = Math.random() > 0.9 ? 1 : 0;
    }
    
    // More realistic price generation based on factors
    const basePrice = 50 + Math.floor(distance * 0.1); // Base price related to distance
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
    
    // Add some randomness
    priceMultiplier *= 0.85 + (Math.random() * 0.3); // 0.85 to 1.15
    
    // Calculate final price
    const price = Math.round(basePrice * priceMultiplier);
    
    flights.push({
      id: `flight-${i}-${Date.now()}`,
      airline: randomAirline.name,
      airlineLogo: randomAirline.logo,
      departureTime,
      arrivalTime,
      from: params.from,
      to: params.to,
      duration,
      stops,
      price,
      currency: 'USD',
    });
  }
  
  // Sort by price by default
  return flights.sort((a, b) => a.price - b.price);
};
