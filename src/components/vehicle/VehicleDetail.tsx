import { useEffect, useState } from 'react'
import { Link, useLocation, useParams, useSearchParams } from 'react-router-dom'
import { useVehicles } from '../../hooks/useVehicles'
import { readInventoryFilters } from '../../utils/inventory'

import { VehiclePhoto } from '../common/VehiclePhoto'
import { Icon } from '../common/Icon'
import { formatPrice } from '../../utils/vehicles'
import { useContact } from '../../context/ContactContext'
export function VehicleDetail() {
  const { vehicleId } = useParams()
  const { vehicles, status, retry } = useVehicles()
  const [params] = useSearchParams()
  const { currency } = readInventoryFilters(params)
  const location = useLocation()
  const from = typeof location.state?.from === 'string' && /^\/(inventory(?:\?|$)|#collection$)/.test(location.state.from) ? location.state.from : '/inventory'
  const vehicle = vehicles.find(item => item.id === vehicleId)
  const [angle, setAngle] = useState(0)
  useEffect(() => {
    if (status !== 'ready') return
    document.title = vehicle ? `${vehicle.name} | Double S.E Autos` : 'Vehicle not found | Double S.E Autos'
    document.querySelector('meta[name="description"]')?.setAttribute('content', vehicle ? `Explore the ${vehicle.name} concept, gallery and illustrative specifications. Enquire with Double S.E Autos in Abuja.` : 'Browse the Double S.E Autos collection in Abuja.')
  }, [vehicle, status])
  const contact = useContact()
  if (status !== 'ready') return <main id="main-content" tabIndex={-1} className="page-loading" role="status">{status === 'loading' ? 'Opening vehicle…' : <button onClick={retry}>Unable to load. Try again</button>}</main>
  if (!vehicle) return <main id="main-content" tabIndex={-1} className="route-page section-shell"><h1>Vehicle not found.</h1><Link className="button primary" to="/inventory">Browse the collection</Link></main>
  return <main id="main-content" tabIndex={-1} className="route-page vehicle-page"><Link className="back-link" to={from}>← Back to collection</Link><div className="vehicle-detail-layout"><div className="detail-gallery"><VehiclePhoto key={vehicle.images[angle].src} image={vehicle.images[angle]} priority /><div className="angle-controls">{vehicle.images.map((image, index) => <button key={image.src} aria-pressed={angle === index} onClick={() => setAngle(index)}>{image.label}</button>)}</div></div>
    <div className="detail-content"><p className="eyebrow">{vehicle.source === 'local' ? 'LOCAL INVENTORY · NOT PUBLISHED' : 'COLLECTION STUDY · DEMONSTRATION RECORD'}</p><h1 id="vehicle-title">{vehicle.name}</h1><p>{vehicle.description}</p><dl className="spec-grid"><div><dt>Year</dt><dd>{vehicle.year}</dd></div><div><dt>Mileage</dt><dd>{vehicle.mileage.toLocaleString()} km</dd></div><div><dt>Transmission</dt><dd>{vehicle.transmission}</dd></div><div><dt>Condition</dt><dd>{vehicle.usage}</dd></div><div><dt>Body style</dt><dd>{vehicle.category}</dd></div><div><dt>Exterior colour</dt><dd>{vehicle.color}</dd></div>{vehicle.fuelType && <div><dt>Fuel type</dt><dd>{vehicle.fuelType}</dd></div>}</dl><div className="detail-price"><span>{vehicle.source === 'local' ? 'Asking price' : 'Illustrative price'}</span><strong>{formatPrice(vehicle.priceNGN, currency)}</strong></div><p className="data-note">{vehicle.source === 'local' ? 'Saved in this browser only. Details and photos were supplied through the local inventory form.' : 'Mock specifications and price; imagery is illustrative. Confirm actual stock and details with our team.'}{currency !== 'NGN' && ' Conversion uses a fixed demo rate, not a live exchange rate.'}</p><button className="button primary" onClick={() => contact(`${vehicle.name} (${vehicle.id}) — ${window.location.origin}${window.location.pathname}`)}>Enquire about this style <Icon name="diagonal" /></button></div>
  </div></main>
}
