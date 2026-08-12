import { MapPin, Phone, WhatsappLogo, Clock } from '@phosphor-icons/react/dist/ssr';
import { Button } from '@/components/ui/Button';

export function StoreSection() {
  return (
    <section className="store-section section--lg" id="store">
      <div className="container">
        <div style={{ marginBottom: 'var(--space-xl)' }}>
          <h2 className="section__title">Visit Us in Peshawar</h2>
        </div>

        <div className="store-section__grid">
          {/* Map placeholder */}
          <div className="store-section__map">
            <div style={{ textAlign: 'center' }}>
              <MapPin size={32} weight="bold" style={{ marginBottom: '8px', color: 'var(--accent)' }} />
              <div>Karkhano Market, Jamrud Road</div>
              <div style={{ fontSize: '0.75rem', marginTop: '4px' }}>Peshawar, KPK</div>
            </div>
          </div>

          {/* Store info */}
          <div className="store-section__info">
            <div className="store-section__detail">
              <MapPin size={18} weight="bold" className="store-section__detail-icon" />
              <div className="store-section__detail-text">
                Shop No 75, S.S Plaza,<br />
                Karkhano Market, Jamrud Road,<br />
                Peshawar, KPK, Pakistan
              </div>
            </div>

            <div className="store-section__detail">
              <Phone size={18} weight="bold" className="store-section__detail-icon" />
              <div className="store-section__detail-text">
                PTCL: 091-5810832<br />
                Manager (Mujahid): +92 313 9467708
              </div>
            </div>

            <div className="store-section__detail">
              <WhatsappLogo size={18} weight="fill" className="store-section__detail-icon" />
              <div className="store-section__detail-text">
                +92 333 9348891
              </div>
            </div>

            <div className="store-section__detail">
              <Clock size={18} weight="bold" className="store-section__detail-icon" />
              <div className="store-section__detail-text">
                Open daily — 10:00 AM to 10:00 PM
              </div>
            </div>

            <a
              href="https://wa.me/923339348891"
              target="_blank"
              rel="noopener noreferrer"
              style={{ marginTop: 'var(--space-sm)' }}
            >
              <Button variant="whatsapp" size="md">
                <WhatsappLogo size={18} weight="fill" />
                Chat with Us
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
