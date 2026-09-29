import { AddVehicleDialog } from './AddVehicleDialog'
import { collectionCategories } from '../../interfaces/vehicle'
import { useState, type CSSProperties } from 'react'
import type { Vehicle } from '../../interfaces/vehicle'
import { formatPrice } from '../../utils/vehicles'
import { Icon } from '../common/Icon'
import { VehiclePhoto } from '../common/VehiclePhoto'
import { Link, useSearchParams } from 'react-router-dom'
import { readInventoryFilters, selectInventory } from '../../utils/inventory'
import { useReveal } from '../../hooks/useReveal'
export function Collection({ vehicles, inventory = false }: { vehicles: Vehicle[]; inventory?: boolean }) {
  const [adding, setAdding] = useState(false)
  const [params, setParams] = useSearchParams()
  const [local, setLocal] = useState(new URLSearchParams())
  const filters = readInventoryFilters(inventory ? params : local)
  const { category, usage, query, currency, sort } = filters
  const update = (key: string, value: string) => {
    const next = new URLSearchParams(inventory ? params : local)
    if (!value || value === 'All' || value === 'featured' || value === 'NGN') next.delete(key)
    else next.set(key, value)
    if (inventory) setParams(next, { replace: key === 'q' })
    else setLocal(next)
  }
  const reset = () => inventory ? setParams(new URLSearchParams()) : setLocal(new URLSearchParams())
  const ref = useReveal<HTMLElement>()
  const visible = selectInventory(vehicles, filters)
  const detailUrl = (vehicle: Vehicle) => `/vehicles/${vehicle.id}?${new URLSearchParams({ currency })}`
  return <section className="collection section-shell reveal" id="collection" ref={ref} aria-labelledby="collection-title">
    <div className="section-top"><div><p className="eyebrow"><span className="tiny-line" /> 01 / THE COLLECTION</p><h2 id="collection-title">Find your kind<br />of <em>extraordinary.</em></h2></div><div className="section-aside"><p>A little ambition. A lot of character.<br />Explore a few possibilities for your next chapter.</p><span className="demo-label">{vehicles.some(vehicle => !vehicle.source) ? 'INCLUDES DEMO VEHICLES · DEMO PRICES ARE ILLUSTRATIVE' : 'THE DOUBLE S.E COLLECTION'}</span></div></div>
    <div className="collection-toolbar"><div className="filter-pills" role="group" aria-label="Vehicle categories">{['All', ...collectionCategories].map((type) => <button key={type} aria-pressed={category === type} onClick={() => update('category', type)}>{type === 'All' ? 'All vehicles' : type}</button>)}</div><div className="collection-tools"><label className="search-field"><Icon name="search" /><span className="sr-only">Search collection</span><input type="search" value={query} onChange={(event) => update('q', event.target.value)} placeholder="Find your drive" /></label><label><span className="sr-only">Vehicle condition</span><select value={usage} onChange={(event) => update('usage', event.target.value)}><option value="All">All conditions</option><option>Nigerian Used Car</option><option>Foreign Used</option><option>Brand New</option></select></label><label><span className="sr-only">Display currency</span><select value={currency} onChange={(event) => { const next = event.target.value; if (next === 'NGN' || next === 'USD' || next === 'EUR') update('currency', next) }}><option>NGN</option><option>USD</option><option>EUR</option></select></label><label><span className="sr-only">Sort vehicles</span><select value={sort} onChange={event => update('sort', event.target.value)}><option value="featured">Featured</option><option value="price-asc">Price: low to high</option><option value="price-desc">Price: high to low</option></select></label></div></div>
    <div className="collection-add"><span>Manage your local collection</span><button className="button secondary" onClick={() => setAdding(true)}><Icon name="plus" />{category === 'All' ? 'Add vehicle' : `Add ${category.toLowerCase()} vehicle`}</button></div>
    <div className="collection-meta"><span aria-live="polite">{visible.length} {visible.length === 1 ? 'vehicle' : 'vehicles'} to explore</span><span>{currency === 'NGN' ? 'Your next chapter, thoughtfully selected.' : 'Fixed demo conversion · not live exchange rates'}</span></div>
    {visible.length ? <div className="vehicle-grid">{visible.map((vehicle, index) => <article className="vehicle-card" key={vehicle.id} style={{ '--order': index } as CSSProperties}>
      <Link className="vehicle-image-button" to={detailUrl(vehicle)} state={{ from: inventory ? `/inventory?${params}` : '/#collection' }} aria-label={`Explore ${vehicle.name}`}><VehiclePhoto image={vehicle.images[0]} /><span className="vehicle-badge">{vehicle.usage}</span><span className="image-explore"><Icon name="plus" /> Explore vehicle</span></Link>
      <div className="vehicle-card-body"><div><p className="eyebrow">{vehicle.category} / {vehicle.year}</p><h3><Link to={detailUrl(vehicle)} state={{ from: inventory ? `/inventory?${params}` : '/#collection' }}>{vehicle.name}</Link></h3><p className="card-specs">{vehicle.mileage.toLocaleString()} km <span>·</span> {vehicle.transmission}</p></div><div className="card-price"><span>{vehicle.source === 'local' ? 'Asking price · local' : 'Demo price'}</span><strong>{formatPrice(vehicle.priceNGN, currency)}</strong><Link className="icon-button" to={detailUrl(vehicle)} state={{ from: inventory ? `/inventory?${params}` : '/#collection' }} aria-label={`View ${vehicle.name} details`}><Icon name="diagonal" /></Link></div></div>
    </article>)}</div> : <div className="empty-state"><Icon name="search" /><h3>No matches just yet.</h3><p>Try another make or give your search a little more room.</p><button className="button secondary" onClick={reset}>Reset filters <Icon name="arrow" /></button></div>}
    {adding && <AddVehicleDialog category={category} onClose={() => setAdding(false)} onSaved={(vehicle) => { const next = new URLSearchParams(); next.set('category', category === 'Hybrid' || category === 'Diesel' ? vehicle.fuelType! : vehicle.category); if (inventory) setParams(next); else setLocal(next); setAdding(false) }} />}
    {!inventory && <Link className="button secondary collection-link" to="/inventory">Explore full inventory <Icon name="arrow" /></Link>}
  </section>
}
