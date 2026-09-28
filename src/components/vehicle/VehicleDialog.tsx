import { useState } from 'react'
import type { Currency, Vehicle } from '../../interfaces/vehicle'
import { Modal } from '../common/Modal'
import { VehiclePhoto } from '../common/VehiclePhoto'
import { Icon } from '../common/Icon'
import { formatPrice } from '../../utils/vehicles'
import { useContact } from '../../context/ContactContext'
export function VehicleDialog({ vehicle, currency, onClose }: { vehicle: Vehicle; currency: Currency; onClose: () => void }) {
  const [angle, setAngle] = useState(0)
  const contact = useContact()
  return <Modal titleId="vehicle-title" onClose={onClose} className="vehicle-modal"><div className="detail-gallery"><VehiclePhoto key={vehicle.images[angle].src} image={vehicle.images[angle]} priority /><div className="angle-controls">{vehicle.images.map((image, index) => <button key={image.src} aria-pressed={angle === index} onClick={() => setAngle(index)}>{image.label}</button>)}</div></div>
    <div className="detail-content"><p className="eyebrow">COLLECTION STUDY · DEMONSTRATION RECORD</p><h2 id="vehicle-title">{vehicle.name}</h2><p>{vehicle.description}</p><dl className="spec-grid"><div><dt>Year</dt><dd>{vehicle.year}</dd></div><div><dt>Mileage</dt><dd>{vehicle.mileage.toLocaleString()} km</dd></div><div><dt>Transmission</dt><dd>{vehicle.transmission}</dd></div><div><dt>Category</dt><dd>{vehicle.usage}</dd></div></dl><div className="detail-price"><span>Illustrative price</span><strong>{formatPrice(vehicle.priceNGN, currency)}</strong></div><p className="data-note">Mock specifications and price; imagery is illustrative. Confirm actual stock and details with our team.{currency !== 'NGN' && ' Conversion uses a fixed demo rate, not a live exchange rate.'}</p><button className="button primary" onClick={() => { onClose(); contact(vehicle.name) }}>Enquire about this style <Icon name="diagonal" /></button></div>
  </Modal>
}
