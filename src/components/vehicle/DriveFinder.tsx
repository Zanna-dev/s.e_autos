import { useState } from 'react'
import type { Vehicle } from '../../interfaces/vehicle'
import { Icon } from '../common/Icon'
import { VehiclePhoto } from '../common/VehiclePhoto'
import { useReveal } from '../../hooks/useReveal'
import { useContact } from '../../context/ContactContext'
const choices = [
  { label: 'Everyday elegance', category: 'Sedan', copy: 'Effortless presence for the everyday.' },
  { label: 'Room to explore', category: 'SUV', copy: 'More space for wherever life takes you.' },
  { label: 'A bolder road', category: 'Pickup', copy: 'A commanding companion for a wider horizon.' },
] as const
export function DriveFinder({ vehicles }: { vehicles: Vehicle[] }) {
  const [choice, setChoice] = useState(0)
  const contact = useContact()
  const ref = useReveal<HTMLElement>()
  const match = vehicles.find((vehicle) => vehicle.category === choices[choice].category)
  return <section id="your-drive" className="drive-finder section-shell reveal" ref={ref} aria-labelledby="finder-title"><div className="finder-copy"><p className="eyebrow"><Icon name="spark" /> 02 / A MORE PERSONAL SEARCH</p><h2 id="finder-title">Your life.<br />Your rhythm.<br /><em>Your drive.</em></h2><p>The best choice starts with you. Tell us what moves you, and explore a direction worth taking.</p><div className="finder-options" role="group" aria-label="Your driving preference">{choices.map((item, index) => <button key={item.label} aria-pressed={choice === index} onClick={() => setChoice(index)}><span>0{index + 1}</span>{item.label}<Icon name={choice === index ? 'check' : 'plus'} /></button>)}</div></div>
      <div className="finder-stage"><div className="finder-orbit" aria-hidden="true" /><div className="finder-topline"><span><span className="live-dot" /> DRIVE DISCOVERY</span><Icon name="spark" /></div>{match && <div className="finder-result" key={match.id}><VehiclePhoto image={match.images[2]} /><div className="finder-result-copy" aria-live="polite"><span className="eyebrow">YOUR SELECTED DIRECTION</span><h3>{choices[choice].copy}</h3><p>{match.make} · {match.category}</p><button className="button primary" onClick={() => contact(`${choices[choice].label.toLowerCase()} — ${match.name}`)}>Make it a conversation <Icon name="diagonal" /></button></div></div>}<div className="finder-foot"><span>Preference → Possibility → Conversation</span><span>Demo selection</span></div></div>
    <div className="trust-strip"><div><span>01</span><h3>Sincere by nature.</h3><p>Advice that starts with listening.</p></div><div><span>02</span><h3>Clear at every turn.</h3><p>Space for your questions. Straight answers.</p></div><div><span>03</span><h3>People before purchases.</h3><p>A personal conversation, from the start.</p></div></div>
  </section>
}
