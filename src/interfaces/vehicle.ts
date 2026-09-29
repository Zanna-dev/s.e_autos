// Union types
export type Currency = "NGN" | "USD" | "EUR";
export type VehicleCategory = "Sedan" | "SUV" | "Pickup" | "Crossover" | "Coupe" | "Hatchback" | "Wagon" | "Convertible" | "Minivan";
export type Usage = "Nigerian Used Car" | "Foreign Used" | "Brand New";

// Interface types
export interface VehicleImage {
  src: string;
  small: string;
  label: string;
  alt: string;
}
export interface Vehicle {
  id: string;
  name: string;
  make: string;
  category: VehicleCategory;
  usage: Usage;
  fuelType?: "Petrol" | "Hybrid" | "Diesel" | "Electric";
  year: number;
  mileage: number;
  priceNGN: number;
  transmission: "Automatic" | "Manual" | "CVT";
  source?: "local";
  color: string;
  description: string;
  images: VehicleImage[];
}

export const collectionCategories = ["Sedan", "SUV", "Pickup", "Crossover", "Hybrid", "Diesel", "Coupe", "Hatchback", "Wagon", "Convertible", "Minivan"]
