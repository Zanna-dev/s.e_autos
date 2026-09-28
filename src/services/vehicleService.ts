import { mockVehicles } from '../data/vehicles.mock'
import type { Vehicle } from '../interfaces/vehicle'

export const vehicleService = { async getVehicles(): Promise<Vehicle[]> { return mockVehicles } }
