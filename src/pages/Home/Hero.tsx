import { useState } from 'react'
import type { Vehicle } from '../../interfaces/vehicle'
import { Icon } from '../../components/common/Icon'
import { VehiclePhoto } from '../../components/common/VehiclePhoto'
import { useContact } from '../../context/ContactContext'
export function Hero({ vehicles }: { vehicles: Vehicle[] }) {
  const [selected, setSelected] = useState(0)
  const [angle, setAngle] = useState(0)
  const contact = useContact()
  const vehicle = vehicles[selected]
  if (!vehicle) return null
  return <section className="hero" id="experience" aria-labelledby="hero-heading">
    <div className="hero-visual"><VehiclePhoto key={vehicle.images[angle].src} image={vehicle.images[angle]} priority className="hero-photo" /></div><div className="hero-shade" /><div className="hero-grid" aria-hidden="true" />
    <div className="hero-content"><p className="eyebrow"><span className="live-dot" /> DOUBLE S.E AUTOS · ABUJA</p><h1 id="hero-heading">A different<br />class of <em>drive.</em></h1><p className="hero-description">For the road ahead. And the person you’re becoming.<br />Exceptional choices. Honest conversations.</p><div className="hero-ctas"><a className="button primary" href="#collection">Explore the collection <Icon name="diagonal" /></a><button className="hero-secondary" onClick={() => contact()}>Find my next car <Icon name="arrow" /></button></div>
    <div className="hero-proof"><span className="mini-cross">+</span><p>Nigerian-used. Foreign-used. Your next move.<br /><span>Discover a more personal way to buy.</span></p></div></div>
    <div className="hero-side-label" aria-hidden="true">CURATED AUTOMOTIVE EXPERIENCES / ABUJA</div>
    <div className="hero-console"><div className="console-heading"><span className="eyebrow"><span className="live-dot" /> THE DIGITAL SHOWROOM</span><span>ILLUSTRATIVE VISUALS</span></div><div className="console-main"><div className="vehicle-selector" role="group" aria-label="Choose featured vehicle">{vehicles.map((item, index) => <button key={item.id} aria-pressed={selected === index} onClick={() => { setSelected(index); setAngle(0) }}><span>0{index + 1}</span>{item.make}</button>)}</div><div className="hero-angle-selector" role="group" aria-label="Choose photo angle">{vehicle.images.map((photo, index) => <button key={photo.src} aria-pressed={angle === index} onClick={() => setAngle(index)}>{photo.label}</button>)}</div></div><div className="console-bottom"><span aria-live="polite">{vehicle.name} <span className="console-dot">/</span> {vehicle.images[angle].label}</span><a href="#collection">Scroll to discover <span>↓</span></a></div></div>
  </section>
}
