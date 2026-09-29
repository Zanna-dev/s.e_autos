import { useEffect, useState } from 'react'
import { vehicleService } from '../services/vehicleService'
import type { Vehicle } from '../interfaces/vehicle'
export function useVehicles() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([])
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading')
  const [attempt, setAttempt] = useState(0)
  useEffect(() => {
    const update = () => setAttempt(value => value + 1)
    window.addEventListener('inventory-updated', update)
    return () => window.removeEventListener('inventory-updated', update)
  }, [])
  useEffect(() => {
    let current = true
    vehicleService.getVehicles().then((result) => {
      if (current) { setVehicles(result); setStatus('ready') }
    }).catch(() => { if (current) setStatus('error') })
    return () => { current = false }
  }, [attempt])
  return { vehicles, status, retry: () => { setStatus('loading'); setAttempt((value) => value + 1) } }
}
