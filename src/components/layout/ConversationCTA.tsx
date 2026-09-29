import { Icon } from '../common/Icon'
import { useContact } from '../../context/ContactContext'
export function ConversationCTA() {
 const contact = useContact()
 return <section className="conversation-section section-shell" aria-label="Start a conversation"><div className="footer-invitation"><div><p className="eyebrow">THE NEXT CHAPTER IS YOURS</p><h2>Let’s put you<br />in the <em>driver’s seat.</em></h2></div><button className="conversation-orb" onClick={() => contact()}><Icon name="diagonal" /><span>Start a<br />conversation</span></button></div></section>
}
