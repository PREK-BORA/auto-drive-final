// ============================================================
// Mock Data Service (for development without Firebase)
// ============================================================
//
// When Firebase is not configured, we use sample data stored in
// localStorage. This lets you run and test the full app immediately.
//
// Each function mirrors the Firestore service API so the rest of
// the app doesn't need to know whether it's talking to Firebase or
// the mock backend.
// ============================================================

const STORAGE_KEYS = {
  vehicles: "cdms_vehicles",
  services: "cdms_services",
  messages: "cdms_messages",
  favorites: "cdms_favorites",
  users: "cdms_users",
};

// ---- Sample Data ----
const sampleVehicles = [
  {
    id: "v1",
    name: "BMW M4 Competition",
    brand: "BMW",
    model: "M4",
    year: 2024,
    price: 78000,
    fuelType: "Petrol",
    transmission: "Automatic",
    description:
      "The BMW M4 Competition delivers a thrilling driving experience with its 3.0L twin-turbo inline-6 engine producing 503 horsepower. Featuring a track-focused suspension, carbon fiber components, and a luxurious interior.",
    features: [
      "503 HP Engine",
      "Adaptive M Suspension",
      "Carbon Fiber Roof",
      "Harman Kardon Audio",
      "Heated Seats",
      "Apple CarPlay",
    ],
    images: [
      "https://images.pexels.com/photos/170782/pexels-photo-170782.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/707046/pexels-photo-707046.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
    status: "available",
    createdAt: new Date().toISOString(),
  },
  {
    id: "v2",
    name: "Mercedes-Benz C-Class",
    brand: "Mercedes-Benz",
    model: "C 300",
    year: 2023,
    price: 45000,
    fuelType: "Petrol",
    transmission: "Automatic",
    description:
      "The Mercedes-Benz C 300 combines elegance with performance. Its 2.0L turbocharged engine delivers 255 horsepower while the luxurious cabin features premium materials and advanced technology.",
    features: [
      "255 HP Engine",
      "MBUX Infotainment",
      "Burmester Audio",
      "Sunroof",
      "Wireless Charging",
      "Active Brake Assist",
    ],
    images: [
      "https://images.pexels.com/photos/120049/pexels-photo-120049.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/164634/pexels-photo-164634.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
    status: "available",
    createdAt: new Date().toISOString(),
  },
  {
    id: "v3",
    name: "Audi Q7 Premium",
    brand: "Audi",
    model: "Q7",
    year: 2024,
    price: 65000,
    fuelType: "Diesel",
    transmission: "Automatic",
    description:
      "The Audi Q7 Premium is a luxury SUV with a 3.0L V6 engine, quattro all-wheel drive, and three rows of seating. Perfect for families who want comfort and capability.",
    features: [
      "3.0L V6 Engine",
      "Quattro AWD",
      "7 Seats",
      "Virtual Cockpit",
      "Panoramic Sunroof",
      "Adaptive Cruise Control",
    ],
    images: [
      "https://images.pexels.com/photos/265690/pexels-photo-265690.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/3954417/pexels-photo-3954417.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
    status: "available",
    createdAt: new Date().toISOString(),
  },
  {
    id: "v4",
    name: "Tesla Model 3",
    brand: "Tesla",
    model: "Model 3",
    year: 2024,
    price: 42000,
    fuelType: "Electric",
    transmission: "Automatic",
    description:
      "The Tesla Model 3 is a premium electric sedan with 358 miles of range, lightning-fast acceleration, and Autopilot capabilities. The future of driving is here.",
    features: [
      "358 Mile Range",
      "0-60 in 4.2s",
      "Autopilot",
      '15" Touchscreen',
      "Glass Roof",
      "Supercharging",
    ],
    images: [
      "https://images.pexels.com/photos/12861662/pexels-photo-12861662.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/15683917/pexels-photo-15683917.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
    status: "available",
    createdAt: new Date().toISOString(),
  },
  {
    id: "v5",
    name: "Porsche 911 Carrera",
    brand: "Porsche",
    model: "911",
    year: 2023,
    price: 115000,
    fuelType: "Petrol",
    transmission: "Automatic",
    description:
      "The iconic Porsche 911 Carrera features a 3.0L twin-turbo flat-six engine with 379 horsepower. A perfect blend of performance heritage and modern technology.",
    features: [
      "379 HP Engine",
      "0-60 in 4.0s",
      "Sport Chrono Package",
      "PASM Suspension",
      "BOSE Audio",
      "Leather Interior",
    ],
    images: [
      "https://images.pexels.com/photos/3786091/pexels-photo-3786091.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/3786092/pexels-photo-3786092.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
    status: "available",
    createdAt: new Date().toISOString(),
  },
  {
    id: "v6",
    name: "Range Rover Sport",
    brand: "Land Rover",
    model: "Range Rover Sport",
    year: 2024,
    price: 83000,
    fuelType: "Diesel",
    transmission: "Automatic",
    description:
      "The Range Rover Sport combines luxury with off-road capability. Its 3.0L diesel engine and terrain response system handle any surface with ease.",
    features: [
      "3.0L Diesel Engine",
      "Terrain Response",
      "Air Suspension",
      "Heated/Cooled Seats",
      "Meridian Audio",
      "Panoramic Roof",
    ],
    images: [
      "https://images.pexels.com/photos/3786091/pexels-photo-3786091.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/14099399/pexels-photo-14099399.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
    status: "available",
    createdAt: new Date().toISOString(),
  },
  {
    id: "v7",
    name: "Honda Civic Type R",
    brand: "Honda",
    model: "Civic Type R",
    year: 2023,
    price: 38000,
    fuelType: "Petrol",
    transmission: "Manual",
    description:
      "The Honda Civic Type R is a hot hatch legend with a 2.0L turbocharged engine producing 315 horsepower. Track-ready performance for the street.",
    features: [
      "315 HP Engine",
      "6-Speed Manual",
      "Adaptive Damper System",
      "Brembo Brakes",
      "Sport Plus Mode",
      "Aero Body Kit",
    ],
    images: [
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/7389130/pexels-photo-7389130.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
    status: "available",
    createdAt: new Date().toISOString(),
  },
  {
    id: "v8",
    name: "Ford Mustang GT",
    brand: "Ford",
    model: "Mustang GT",
    year: 2023,
    price: 42000,
    fuelType: "Petrol",
    transmission: "Manual",
    description:
      "The Ford Mustang GT packs a 5.0L V8 engine with 450 horsepower. An American muscle car icon with modern technology and aggressive styling.",
    features: [
      "450 HP V8 Engine",
      "6-Speed Manual",
      "Magneride Suspension",
      "B&O Audio",
      "Track Apps",
      "Performance Pack",
    ],
    images: [
      "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/1719648/pexels-photo-1719648.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
    status: "available",
    createdAt: new Date().toISOString(),
  },
];

const sampleServices = [
  {
    id: "s1",
    title: "Vehicle Sales",
    description:
      "Browse our extensive collection of premium new and pre-owned vehicles. Our expert team helps you find the perfect car for your needs and budget.",
    image:
      "https://images.pexels.com/photos/3277224/pexels-photo-3277224.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "s2",
    title: "Financing & Leasing",
    description:
      "Flexible financing and leasing options tailored to your financial situation. Get pre-approved in minutes with our streamlined process.",
    image:
      "https://images.pexels.com/photos/4968391/pexels-photo-4968391.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "s3",
    title: "Maintenance & Repair",
    description:
      "Factory-certified technicians using genuine parts. From routine maintenance to major repairs, we keep your vehicle running like new.",
    image:
      "https://images.pexels.com/photos/4488636/pexels-photo-4488636.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "s4",
    title: "Trade-In Services",
    description:
      "Get the best value for your current vehicle. Our transparent appraisal process ensures you get a fair market price for your trade-in.",
    image:
      "https://images.pexels.com/photos/3806288/pexels-photo-3806288.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "s5",
    title: "Extended Warranty",
    description:
      "Comprehensive extended warranty plans that protect your investment. Drive with confidence knowing you are covered beyond the standard warranty.",
    image:
      "https://images.pexels.com/photos/3807329/pexels-photo-3807329.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "s6",
    title: "Insurance Assistance",
    description:
      "Partner with leading insurance providers to get the best coverage at competitive rates. We handle the paperwork so you do not have to.",
    image:
      "https://images.pexels.com/photos/936043/pexels-photo-936043.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

const sampleUsers = [
  {
    id: "admin",
    name: "Admin User",
    email: "admin@autodrive.com",
    role: "admin",
    phone: "+885 555-5555",
    createdAt: new Date().toISOString(),
  },
  {
    id: "user1",
    name: "Da Ra",
    email: "dara@example.com",
    role: "user",
    phone: "+885 555-5555",
    createdAt: new Date().toISOString(),
  },
];

// ---- Helper: read/write localStorage ----
function readData(key, defaultData) {
  const stored = localStorage.getItem(key);
  if (stored) return JSON.parse(stored);
  // First time: seed with sample data
  localStorage.setItem(key, JSON.stringify(defaultData));
  return defaultData;
}

function writeData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// ---- Vehicle functions ----
export const mockGetVehicles = async () =>
  readData(STORAGE_KEYS.vehicles, sampleVehicles);

export const mockGetVehicleById = async (id) => {
  const vehicles = readData(STORAGE_KEYS.vehicles, sampleVehicles);
  return vehicles.find((v) => v.id === id) || null;
};

export const mockAddVehicle = async (vehicle) => {
  const vehicles = readData(STORAGE_KEYS.vehicles, sampleVehicles);
  const newVehicle = {
    ...vehicle,
    id: `v${Date.now()}`,
    createdAt: new Date().toISOString(),
  };
  vehicles.unshift(newVehicle);
  writeData(STORAGE_KEYS.vehicles, vehicles);
  return newVehicle;
};

export const mockUpdateVehicle = async (id, updates) => {
  const vehicles = readData(STORAGE_KEYS.vehicles, sampleVehicles);
  const index = vehicles.findIndex((v) => v.id === id);
  if (index === -1) throw new Error("Vehicle not found");
  vehicles[index] = { ...vehicles[index], ...updates };
  writeData(STORAGE_KEYS.vehicles, vehicles);
  return vehicles[index];
};

export const mockDeleteVehicle = async (id) => {
  const vehicles = readData(STORAGE_KEYS.vehicles, sampleVehicles);
  const filtered = vehicles.filter((v) => v.id !== id);
  writeData(STORAGE_KEYS.vehicles, filtered);
  return id;
};

// ---- Service functions ----
export const mockGetServices = async () =>
  readData(STORAGE_KEYS.services, sampleServices);

export const mockAddService = async (service) => {
  const services = readData(STORAGE_KEYS.services, sampleServices);
  const newService = { ...service, id: `s${Date.now()}` };
  services.unshift(newService);
  writeData(STORAGE_KEYS.services, services);
  return newService;
};

export const mockUpdateService = async (id, updates) => {
  const services = readData(STORAGE_KEYS.services, sampleServices);
  const index = services.findIndex((s) => s.id === id);
  if (index === -1) throw new ServiceNotFoundError("Service not found");
  services[index] = { ...services[index], ...updates };
  writeData(STORAGE_KEYS.services, services);
  return services[index];
};

class ServiceNotFoundError extends Error {}

export const mockDeleteService = async (id) => {
  const services = readData(STORAGE_KEYS.services, sampleServices);
  const filtered = services.filter((s) => s.id !== id);
  writeData(STORAGE_KEYS.services, filtered);
  return id;
};

// ---- Message functions ----
export const mockAddMessage = async (message) => {
  const messages = readData(STORAGE_KEYS.messages, []);
  const newMessage = {
    ...message,
    id: `m${Date.now()}`,
    createdAt: new Date().toISOString(),
    read: false,
  };
  messages.unshift(newMessage);
  writeData(STORAGE_KEYS.messages, messages);
  return newMessage;
};

export const mockGetMessages = async () => readData(STORAGE_KEYS.messages, []);

export const mockDeleteMessage = async (id) => {
  const messages = readData(STORAGE_KEYS.messages, []);
  writeData(
    STORAGE_KEYS.messages,
    messages.filter((m) => m.id !== id),
  );
  return id;
};

// ---- Favorite functions ----
export const mockGetFavorites = async (userId) => {
  const favorites = readData(STORAGE_KEYS.favorites, []);
  return favorites.filter((f) => f.userId === userId);
};

export const mockAddFavorite = async (userId, vehicleId) => {
  const favorites = readData(STORAGE_KEYS.favorites, []);
  const exists = favorites.find(
    (f) => f.userId === userId && f.vehicleId === vehicleId,
  );
  if (exists) return exists;
  const newFav = {
    id: `fav${Date.now()}`,
    userId,
    vehicleId,
    createdAt: new Date().toISOString(),
  };
  favorites.push(newFav);
  writeData(STORAGE_KEYS.favorites, favorites);
  return newFav;
};

export const mockRemoveFavorite = async (userId, vehicleId) => {
  const favorites = readData(STORAGE_KEYS.favorites, []);
  writeData(
    STORAGE_KEYS.favorites,
    favorites.filter(
      (f) => !(f.userId === userId && f.vehicleId === vehicleId),
    ),
  );
  return vehicleId;
};

// ---- User functions ----
export const mockGetUsers = async () =>
  readData(STORAGE_KEYS.users, sampleUsers);

export const mockUpdateUserRole = async (id, role) => {
  const users = readData(STORAGE_KEYS.users, sampleUsers);
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) throw new Error("User not found");
  users[index] = { ...users[index], role };
  writeData(STORAGE_KEYS.users, users);
  return users[index];
};

export const mockDeleteUser = async (id) => {
  const users = readData(STORAGE_KEYS.users, sampleUsers);
  writeData(
    STORAGE_KEYS.users,
    users.filter((u) => u.id !== id),
  );
  return id;
};

// ---- Stats for admin dashboard ----
export const mockGetStats = async () => {
  const vehicles = readData(STORAGE_KEYS.vehicles, sampleVehicles);
  const services = readData(STORAGE_KEYS.services, sampleServices);
  const messages = readData(STORAGE_KEYS.messages, []);
  const users = readData(STORAGE_KEYS.users, sampleUsers);
  return {
    totalVehicles: vehicles.length,
    totalServices: services.length,
    totalMessages: messages.length,
    totalUsers: users.length,
  };
};
