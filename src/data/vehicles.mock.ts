import type { Vehicle, VehicleImage } from "../interfaces/vehicle";

const gallery = (make: string, slug: string): VehicleImage[] =>
  ["front", "rear", "detail"].map((angle) => ({
    src: `/images/${slug}-${angle}.webp`,
    small: `/images/${slug}-${angle}-small.webp`,
    label:
      angle === "front"
        ? "Front view"
        : angle === "rear"
          ? "Rear view"
          : "Details",
    alt: `${make}, ${angle === "detail" ? "exterior detail" : `${angle} exterior view`}. Illustrative image.`,
  }));
// Fictional development records. Visual concepts do not verify stock or specifications.
export const mockVehicles: Vehicle[] = [
  {
    id: "lexus-study",
    name: "Lexus Sport Sedan",
    make: "Lexus",
    category: "Sedan",
    usage: "Foreign Used",
    year: 2022,
    mileage: 28400,
    priceNGN: 48500000,
    transmission: "Automatic",
    color: "Pearl white",
    description:
      "A sculpted silhouette. A more spirited everyday. Explore this sport-sedan visual study and speak with us about similar vehicles.",
    images: gallery("Lexus", "lexus"),
  },
  {
    id: "bmw-study",
    name: "BMW Executive Sedan",
    make: "BMW",
    category: "Sedan",
    usage: "Nigerian Used Car",
    year: 2023,
    mileage: 18200,
    priceNGN: 92000000,
    transmission: "Automatic",
    color: "Ivory white",
    description:
      "Composed lines and a commanding presence. A visual introduction to executive motoring, with a personal conversation to find your fit.",
    images: gallery("BMW", "bmw"),
  },
  {
    id: "gmc-study",
    name: "GMC Adventure Pickup",
    make: "GMC",
    category: "Pickup",
    usage: "Foreign Used",
    year: 2021,
    mileage: 36700,
    priceNGN: 67500000,
    transmission: "Automatic",
    color: "Olive green",
    description:
      "For a life that takes the wider road. Discover a bold pickup concept and tell our team what capability means to you.",
    images: gallery("GMC", "gmc"),
  },
  {
    id: "chevrolet-study",
    name: "Chevrolet Urban SUV",
    make: "Chevrolet",
    category: "SUV",
    usage: "Brand New",
    year: 2024,
    mileage: 80,
    priceNGN: 39500000,
    transmission: "Automatic",
    color: "Champagne",
    description:
      "Space for the everyday. Character for everything else. Explore this SUV visual study and discuss your next move.",
    images: gallery("Chevrolet", "chevrolet"),
  },
];
