// Union types
export type Currency = "NGN" | "USD" | "EUR";
export type VehicleCategory = "Sedan" | "SUV" | "Pickup";
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
  year: number;
  mileage: number;
  priceNGN: number;
  transmission: "Automatic";
  color: string;
  description: string;
  images: VehicleImage[];
}
