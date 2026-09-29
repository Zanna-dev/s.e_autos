import { collectionCategories } from '../interfaces/vehicle'
import type { Currency, Vehicle } from '../interfaces/vehicle'
import { filterVehicles } from './vehicles'
export function readInventoryFilters(params: URLSearchParams) {
  const allowed = (key: string, options: string[], fallback: string) => options.includes(params.get(key) ?? '') ? params.get(key)! : fallback
  return { query: (params.get('q') ?? '').slice(0, 100), category: allowed('category', collectionCategories, 'All'), usage: allowed('usage', ['Nigerian Used Car', 'Foreign Used', 'Brand New'], 'All'), currency: allowed('currency', ['NGN', 'USD', 'EUR'], 'NGN') as Currency, sort: allowed('sort', ['price-asc', 'price-desc'], 'featured') }
}
export function selectInventory(vehicles: Vehicle[], filters: ReturnType<typeof readInventoryFilters>) {
 const result = filterVehicles(vehicles, filters.query, filters.category, filters.usage)
 return filters.sort === 'featured' ? result : [...result].sort((a, b) => filters.sort === 'price-asc' ? a.priceNGN - b.priceNGN : b.priceNGN - a.priceNGN)
}
