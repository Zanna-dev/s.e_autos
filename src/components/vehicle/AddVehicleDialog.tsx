import { useRef, useState, type FormEvent, type ChangeEvent } from 'react'
import { Modal } from '../common/Modal'
import { collectionCategories, type Vehicle, type VehicleImage } from '../../interfaces/vehicle'
import { vehicleService } from '../../services/vehicleService'
const bodies = collectionCategories.filter(value => value !== 'Hybrid' && value !== 'Diesel')
async function readPhoto(file: File): Promise<VehicleImage> {
 if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type) || file.size > 8 * 1024 * 1024) throw new Error('Use JPG, PNG or WebP images up to 8 MB each.')
 const bitmap = await createImageBitmap(file)
 try {
  const scale = Math.min(1, 1600 / Math.max(bitmap.width, bitmap.height))
  const canvas = document.createElement('canvas')
  canvas.width = Math.round(bitmap.width * scale); canvas.height = Math.round(bitmap.height * scale)
  const context = canvas.getContext('2d')
  if (!context) throw new Error('Image processing is unavailable in this browser.')
  context.drawImage(bitmap, 0, 0, canvas.width, canvas.height)
  const src = canvas.toDataURL('image/webp', .82)
  return { src, small: src, label: '', alt: '' }
 } finally { bitmap.close() }
}
export function AddVehicleDialog({ category, onClose, onSaved }: { category: string; onClose: () => void; onSaved: (vehicle: Vehicle) => void }) {
 const [images, setImages] = useState<VehicleImage[]>([])
 const [error, setError] = useState('')
 const [processing, setProcessing] = useState(false)
 const [saving, setSaving] = useState(false)
 const [saved, setSaved] = useState<Vehicle | null>(null)
 const busy = useRef(false)
 const errorRef = useRef<HTMLParagraphElement>(null)
 const showError = (message: string) => { setError(message); requestAnimationFrame(() => errorRef.current?.focus()) }
 async function upload(event: ChangeEvent<HTMLInputElement>) {
  const files = Array.from(event.target.files ?? [])
  event.target.value = ''
  if (!files.length) return
  if (files.length + images.length > 8) { showError('Add a maximum of 8 photographs.'); return }
  setProcessing(true); setError('')
  try { const photos: VehicleImage[] = []; for (const file of files) photos.push(await readPhoto(file)); setImages(current => [...current, ...photos]) }
  catch (reason) { showError(reason instanceof Error ? reason.message : 'Unable to read these images. Try another file.') }
  finally { setProcessing(false) }
 }
 async function submit(event: FormEvent<HTMLFormElement>) {
  event.preventDefault()
  if (busy.current || processing) return
  if (!images.length) { showError('Add at least one vehicle photograph.'); return }
  const data = new FormData(event.currentTarget)
  const text = (key: string) => String(data.get(key) ?? '').trim()
  if (text('make').length < 2 || text('model').length < 1 || text('color').length < 2 || text('description').length < 20) { showError('Enter a make, model, colour and a description of at least 20 characters.'); return }
  const name = `${text('make')} ${text('model')}`
  const vehicle: Vehicle = { id: `local-${crypto.randomUUID()}`, source: 'local', name, make: text('make'), category: text('category') as Vehicle['category'], fuelType: text('fuel') as Vehicle['fuelType'], usage: text('usage') as Vehicle['usage'], year: Number(text('year')), mileage: Number(text('mileage')), priceNGN: Number(text('price')), transmission: text('transmission') as Vehicle['transmission'], color: text('color'), description: text('description'), images: images.map((image, index) => ({ ...image, label: index === 0 ? 'Cover photo' : `Photo ${index + 1}`, alt: `${name}, vehicle photograph ${index + 1}` })) }
  busy.current = true; setSaving(true); setError('')
  try { await vehicleService.addVehicle(vehicle); setSaved(vehicle) }
  catch (reason) { showError(reason instanceof Error ? reason.message : 'Could not save this vehicle. Your entries are still here; please try again.') }
  finally { busy.current = false; setSaving(false) }
 }
 return <Modal titleId="add-vehicle-title" onClose={() => { if (!saving && !processing) onClose() }} className="upload-modal">
  <h2 id="add-vehicle-title">{saved ? 'Vehicle saved.' : 'Add to the collection.'}</h2>
  {saved ? <div role="status"><p>{saved.name} and its photographs are saved in this browser. This listing has not been published online.</p><button className="button primary" onClick={() => onSaved(saved)}>View in collection</button><button className="button secondary" disabled={saving} onClick={async () => { setSaving(true); try { await vehicleService.removeLocalVehicle(saved.id); setSaved(null) } catch { setError('Unable to undo. Please try again.') } finally { setSaving(false) } }}>Undo save</button><p role="alert">{error}</p></div> : <>
  <p className="upload-note">Local inventory workspace · All fields are required. Prices are entered in NGN and mileage in kilometres. Listings and images stay in this browser; they are not shared with other visitors.</p>
  <form onSubmit={submit} aria-busy={saving || processing}><fieldset disabled={saving || processing}><div className="form-grid">
   <label>Make<input name="make" required minLength={2} maxLength={50} placeholder="Toyota" /></label>
   <label>Model / trim<input name="model" required maxLength={80} placeholder="RAV4 Hybrid XLE" /></label>
   <label>Body style<select name="category" defaultValue={bodies.includes(category) ? category : ''} required><option value="" disabled>Select body style</option>{bodies.map(body => <option key={body}>{body}</option>)}</select></label>
   <label>Fuel type<select name="fuel" defaultValue={['Hybrid', 'Diesel'].includes(category) ? category : ''} required><option value="" disabled>Select fuel type</option>{['Petrol', 'Hybrid', 'Diesel', 'Electric'].map(fuel => <option key={fuel}>{fuel}</option>)}</select></label>
   <label>Condition<select name="usage" required defaultValue=""><option value="" disabled>Select condition</option><option>Nigerian Used Car</option><option>Foreign Used</option><option>Brand New</option></select></label>
   <label>Model year<input name="year" type="number" required min="1900" max={new Date().getFullYear() + 1} step="1" /></label>
   <label>Price (NGN)<input name="price" type="number" required min="1" max="1000000000000" step="1" /></label>
   <label>Mileage (km)<input name="mileage" type="number" required min="0" max="10000000" step="1" /></label>
   <label>Transmission<select name="transmission" required defaultValue=""><option value="" disabled>Select transmission</option><option>Automatic</option><option>Manual</option><option>CVT</option></select></label>
   <label>Exterior colour<input name="color" required minLength={2} maxLength={50} /></label>
   <label className="full-field">Description / features<textarea name="description" required minLength={20} maxLength={3000} placeholder="Describe the vehicle, condition, features and service history." /></label>
   <label className="full-field">Vehicle photographs<input type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={upload} aria-describedby="photo-help" /></label>
  </div><p id="photo-help" className="upload-note">1–8 photos · JPG, PNG or WebP · Up to 8 MB each. The first photo is the cover. Images are resized for display.</p>
  <div className="upload-previews">{images.map((image, index) => <div key={index}><img src={image.src} alt={`Upload preview ${index + 1}`} /><span>{index === 0 ? 'Cover photo' : `Photo ${index + 1}`}</span><button type="button" onClick={() => setImages(current => current.filter((_, i) => i !== index))} aria-label={`Remove photo ${index + 1}`}>Remove</button>{index > 0 && <button type="button" onClick={() => setImages(current => [current[index], ...current.filter((_, i) => i !== index)])}>Make cover</button>}</div>)}</div>
  <button className="button primary" type="submit">{saving ? 'Saving vehicle…' : processing ? 'Processing images…' : 'Save vehicle'}</button></fieldset>
  <p role="alert" tabIndex={-1} ref={errorRef} className="field-error">{error}</p></form></>}
 </Modal>
}
