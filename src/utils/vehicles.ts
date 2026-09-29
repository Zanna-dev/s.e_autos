import type { Currency, Vehicle } from '../interfaces/vehicle'
// Illustrative development rates only; never live exchange rates or dealership quotes.
export const demoRates: Record<Currency, number> = { NGN: 1, USD: 1 / 1600, EUR: 1 / 1750 }
export function formatPrice(amountNGN: number, currency: Currency) {
  return new Intl.NumberFormat('en-NG', { style: 'currency', currency, maximumFractionDigits: 0 }).format(amountNGN * demoRates[currency])
}
export function filterVehicles(vehicles: Vehicle[], query: string, category: string, usage: string) {
  const term = query.trim().toLowerCase()
  return vehicles.filter((vehicle) => (category === 'All' || vehicle.category === category || vehicle.fuelType === category) &&
    (usage === 'All' || vehicle.usage === usage) && `${vehicle.name} ${vehicle.make} ${vehicle.color}`.toLowerCase().includes(term))
}
