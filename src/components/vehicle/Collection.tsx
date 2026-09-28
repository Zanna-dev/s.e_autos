import { useState, type CSSProperties } from 'react'
import type { Currency, Vehicle } from '../../interfaces/vehicle'
import { filterVehicles, formatPrice } from '../../utils/vehicles'
import { Icon } from '../common/Icon'
import { VehiclePhoto } from '../common/VehiclePhoto'
import { VehicleDialog } from './VehicleDialog'
import { useReveal } from '../../hooks/useReveal'
export function Collection({ vehicles }: { vehicles: Vehicle[] }) {
  const [category, setCategory] = useState('All')
  const [usage, setUsage] = useState('All')
  const [query, setQuery] = useState('')
  const [currency, setCurrency] = useState<Currency>('NGN')
  const [selected, setSelected] = useState<Vehicle | null>(null)
  const ref = useReveal<HTMLElement>()
  const visible = filterVehicles(vehicles, query, category, usage)
  return <section className="collection section-shell reveal" id="collection" ref={ref} aria-labelledby="collection-title">
    <div className="section-top"><div><p className="eyebrow"><span className="tiny-line" /> 01 / THE COLLECTION</p><h2 id="collection-title">Find your kind<br />of <em>extraordinary.</em></h2></div><div className="section-aside"><p>A little ambition. A lot of character.<br />Explore a few possibilities for your next chapter.</p><span className="demo-label">DEMO COLLECTION · ILLUSTRATIVE PRICES</span></div></div>
    <div className="collection-toolbar"><div className="filter-pills" role="group" aria-label="Vehicle body style">{['All', 'Sedan', 'SUV', 'Pickup'].map((type) => <button key={type} aria-pressed={category === type} onClick={() => setCategory(type)}>{type === 'All' ? 'All vehicles' : type}</button>)}</div><div className="collection-tools"><label className="search-field"><Icon name="search" /><span className="sr-only">Search collection</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Find your drive" /></label><label><span className="sr-only">Vehicle condition</span><select value={usage} onChange={(event) => setUsage(event.target.value)}><option value="All">All conditions</option><option>Nigerian Used Car</option><option>Foreign Used</option><option>Brand New</option></select></label><label><span className="sr-only">Display currency</span><select value={currency} onChange={(event) => { const next = event.target.value; if (next === 'NGN' || next === 'USD' || next === 'EUR') setCurrency(next) }}><option>NGN</option><option>USD</option><option>EUR</option></select></label></div></div>
    <div className="collection-meta"><span aria-live="polite">{visible.length} {visible.length === 1 ? 'vehicle' : 'vehicles'} to explore</span><span>{currency === 'NGN' ? 'Your next chapter, thoughtfully selected.' : 'Fixed demo conversion · not live exchange rates'}</span></div>
    {visible.length ? <div className="vehicle-grid">{visible.map((vehicle, index) => <article className="vehicle-card" key={vehicle.id} style={{ '--order': index } as CSSProperties}>
      <button className="vehicle-image-button" onClick={() => setSelected(vehicle)} aria-label={`Explore ${vehicle.name}`}><VehiclePhoto image={vehicle.images[0]} /><span className="vehicle-badge">{vehicle.usage}</span><span className="image-explore"><Icon name="plus" /> Explore vehicle</span></button>
      <div className="vehicle-card-body"><div><p className="eyebrow">{vehicle.category} / {vehicle.year}</p><h3><button onClick={() => setSelected(vehicle)}>{vehicle.name}</button></h3><p className="card-specs">{vehicle.mileage.toLocaleString()} km <span>·</span> {vehicle.transmission}</p></div><div className="card-price"><span>Demo price</span><strong>{formatPrice(vehicle.priceNGN, currency)}</strong><button className="icon-button" onClick={() => setSelected(vehicle)} aria-label={`View ${vehicle.name} details`}><Icon name="diagonal" /></button></div></div>
    </article>)}</div> : <div className="empty-state"><Icon name="search" /><h3>No matches just yet.</h3><p>Try another make or give your search a little more room.</p><button className="button secondary" onClick={() => { setCategory('All'); setUsage('All'); setQuery('') }}>Reset filters <Icon name="arrow" /></button></div>}
    {selected && <VehicleDialog vehicle={selected} currency={currency} onClose={() => setSelected(null)} />}
  </section>
}
