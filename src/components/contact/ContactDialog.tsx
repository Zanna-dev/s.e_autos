import { useRef, useState, type FormEvent } from 'react'
import { Modal } from '../common/Modal'
import { Icon } from '../common/Icon'
import { projectTypes, type Enquiry, type EnquiryErrors } from '../../interfaces/enquiry'
import { validateEnquiry, enquiryLinks } from '../../utils/enquiry'
import { enquiryService } from '../../services/enquiryService'
import { dealership } from '../../data/dealership'

export function ContactDialog({ interest, onClose }: { interest: string; onClose: () => void }) {
  const [values, setValues] = useState<Enquiry>({ name: '', email: '', businessType: '', projectType: '', message: interest ? `I would like to know more about ${interest}.` : '' })
  const [errors, setErrors] = useState<EnquiryErrors>({})
  const [status, setStatus] = useState<'editing' | 'preparing' | 'ready' | 'error'>('editing')
  const [prepared, setPrepared] = useState('')
  const formRef = useRef<HTMLFormElement>(null)
  const busy = useRef(false)
  const resultRef = useRef<HTMLDivElement>(null)
  function update(field: keyof Enquiry, value: string) {
    setValues((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
  }
  async function submit(event: FormEvent) {
    event.preventDefault()
    if (busy.current) return
    const found = validateEnquiry(values); setErrors(found)
    const first = Object.keys(found)[0]
    if (first) { formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus(); return }
    busy.current = true; setStatus('preparing')
    try { const message = await enquiryService.prepare(values); setPrepared(message); setStatus('ready'); requestAnimationFrame(() => resultRef.current?.focus()) }
    catch { setStatus('error') }
    finally { busy.current = false }
  }
  const field = (name: keyof Enquiry) => ({ id: `enquiry-${name}`, name, value: values[name], 'aria-invalid': Boolean(errors[name]), 'aria-describedby': errors[name] ? `error-${name}` : undefined })
  const error = (name: keyof Enquiry) => errors[name] && <span id={`error-${name}`} className="field-error">{errors[name]}</span>
  const links = enquiryLinks(prepared)
  return <Modal titleId="contact-title" onClose={onClose} className="contact-modal">
    <aside className="contact-aside"><span className="eyebrow">A PERSONAL INTRODUCTION</span><h2 id="contact-title">Great journeys <br />start with <br /><em>hello.</em></h2><p>Tell us what you have in mind. We’ll help you explore your next move.</p><div className="contact-aside-bottom"><Icon name="pin" /><span>Asokoro, Abuja<br />Mon – Sat · 8am – 6pm</span></div></aside>
    <div className="contact-form-area">{status === 'ready' ? <div className="enquiry-ready" ref={resultRef} tabIndex={-1}>
      <span className="success-mark"><Icon name="check" /></span><p className="eyebrow">READY FOR YOUR NEXT STEP</p><h3>Your enquiry is prepared.</h3><p>Choose WhatsApp or email to review and send it. Nothing has been sent yet.</p><pre>{prepared}</pre><a className="button primary" href={links.whatsapp} target="_blank" rel="noreferrer">Continue in WhatsApp <Icon name="diagonal" /></a><a className="button secondary" href={links.email}>Open email draft <Icon name="arrow" /></a><button className="text-button" onClick={() => setStatus('editing')}>Edit your details</button>
    </div> : <form ref={formRef} onSubmit={submit} noValidate aria-busy={status === 'preparing'}>
      <p className="eyebrow">START A CONVERSATION</p><h3>A few details. A better conversation.</h3>
      <div className="form-grid"><label htmlFor="enquiry-name">Your name<input {...field('name')} autoComplete="name" placeholder="Full name" maxLength={100} required onChange={(event) => update('name', event.target.value)} />{error('name')}</label>
      <label htmlFor="enquiry-email">Email address<input {...field('email')} type="email" autoComplete="email" placeholder="you@example.com" maxLength={254} required onChange={(event) => update('email', event.target.value)} />{error('email')}</label>
      <label htmlFor="enquiry-businessType">Business type<select {...field('businessType')} required onChange={(event) => update('businessType', event.target.value)}><option value="">I’m enquiring as…</option><option>Individual / personal purchase</option><option>Business / company</option><option>Dealer / automotive business</option><option>Other</option></select>{error('businessType')}</label>
      <label htmlFor="enquiry-projectType">Project / enquiry type<select {...field('projectType')} required onChange={(event) => update('projectType', event.target.value)}><option value="">What can we help with?</option>{projectTypes.map((type) => <option key={type}>{type}</option>)}</select>{error('projectType')}</label>
      <label htmlFor="enquiry-message" className="full-field">Business details / message<textarea {...field('message')} rows={4} maxLength={2000} required placeholder="Your preferred car, budget, questions, or what you need…" onChange={(event) => update('message', event.target.value)} />{error('message')}</label></div>
      {status === 'error' && <p role="alert" className="field-error">We couldn’t prepare the message. Please try again, or call {dealership.phones[0].label}.</p>}
      <button className="button primary" type="submit" disabled={status === 'preparing'}>{status === 'preparing' ? 'Preparing your enquiry…' : 'Prepare my enquiry'}<Icon name="arrow" /></button>
      <p className="form-note" role="status">You’ll choose WhatsApp or email next. Service availability is confirmed by our team.</p>
    </form>}</div>
  </Modal>
}
