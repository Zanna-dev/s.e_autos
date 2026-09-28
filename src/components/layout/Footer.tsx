import { dealership } from '../../data/dealership'
import { Logo } from '../common/Logo'
import { Icon } from '../common/Icon'
import { useContact } from '../../context/ContactContext'
import { useReveal } from '../../hooks/useReveal'
export function Footer() {
  const contact = useContact()
  const ref = useReveal<HTMLElement>()
  return <footer className="site-footer section-shell reveal" id="visit" ref={ref}><div className="footer-invitation"><div><p className="eyebrow">THE NEXT CHAPTER IS YOURS</p><h2>Let’s put you<br />in the <em>driver’s seat.</em></h2></div><button className="conversation-orb" onClick={() => contact()}><Icon name="diagonal" /><span>Start a<br />conversation</span></button></div>
    <div className="footer-grid"><div className="footer-brand"><a href="#home" aria-label="Double S.E Autos home"><Logo /></a><p>Quality vehicles. Trusted dealer.<br />A more personal way forward.</p><a className="footer-email" href={`mailto:${dealership.email}`}>{dealership.email}<Icon name="diagonal" /></a></div><div><h3>FIND US</h3><address>{dealership.address}</address><p>{dealership.hours}</p><a href={dealership.directions} className="footer-link">Get directions <Icon name="diagonal" /></a></div><div><h3>LET’S CONNECT</h3>{dealership.phones.map((phone) => <a className="contact-line" key={phone.href} href={phone.href}>{phone.label}</a>)}<a className="footer-link" href={dealership.whatsapp}>WhatsApp <Icon name="diagonal" /></a><div className="social-links"><a href="https://www.instagram.com/sse_autos/" target="_blank" rel="noreferrer">Instagram <Icon name="diagonal" /></a><a href="https://www.tiktok.com/@sse_autos" target="_blank" rel="noreferrer">TikTok <Icon name="diagonal" /></a><a href="https://www.facebook.com/sse_autos" target="_blank" rel="noreferrer">Facebook <Icon name="diagonal" /></a></div></div><div><h3>EXPLORE</h3><a className="contact-line" href="#collection">The collection</a><a className="contact-line" href="#your-drive">Find your drive</a><button className="text-button" onClick={() => contact()}>Enquire with us</button></div></div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} DOUBLE S.E AUTOS</span><span>DESIGNED AROUND YOUR NEXT MOVE.</span><a href="#home">Back to top ↑</a></div>
  </footer>
}
