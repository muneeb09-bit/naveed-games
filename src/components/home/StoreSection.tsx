import { MapPin, Phone, WhatsappLogo, Clock, ArrowRight } from '@phosphor-icons/react/dist/ssr';

export function StoreSection() {
  return (
    <section className="section-clean section-clean--store" id="store">
      <div className="container">
        <div className="store-clean-card">
          <div className="store-clean-card__grid">
            {/* Left Info Column */}
            <div className="store-clean-card__info">
              <div className="store-clean-card__badge">
                <MapPin size={14} weight="fill" />
                <span>PHYSICAL RETAIL STORE</span>
              </div>

              <h2 className="store-clean-card__title">Visit Our Peshawar Showroom</h2>
              <p className="store-clean-card__desc">
                Experience the latest consoles, test gaming headsets, and consult with our hardware technicians in person.
              </p>

              <div className="store-clean-card__details">
                <div className="store-clean-card__detail-row">
                  <MapPin size={18} weight="fill" className="store-clean-card__icon" />
                  <div>
                    <strong>Shop No 75, S.S Plaza</strong>
                    <span>Karkhano Market, Jamrud Road, Peshawar, KPK</span>
                  </div>
                </div>

                <div className="store-clean-card__detail-row">
                  <Clock size={18} weight="fill" className="store-clean-card__icon" />
                  <div>
                    <strong>Open Daily</strong>
                    <span>10:00 AM – 10:00 PM (PKT)</span>
                  </div>
                </div>

                <div className="store-clean-card__detail-row">
                  <Phone size={18} weight="fill" className="store-clean-card__icon" />
                  <div>
                    <strong>Direct Lines</strong>
                    <span>PTCL: 091-5810832 · Manager: +92 313 9467708</span>
                  </div>
                </div>
              </div>

              <div className="store-clean-card__actions">
                <a
                  href="https://wa.me/923339348891"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-whatsapp"
                >
                  <WhatsappLogo size={18} weight="fill" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Right Map / Visual Preview Column */}
            <div className="store-clean-card__map-box">
              <div className="store-clean-card__map-inner">
                <MapPin size={36} weight="fill" className="store-clean-card__pin-icon" />
                <div className="store-clean-card__map-text">
                  <h3>Naveed Games Showroom</h3>
                  <p>Karkhano Market · Peshawar</p>
                </div>
                <a
                  href="https://maps.google.com/?q=Karkhano+Market+Peshawar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="store-clean-card__map-btn"
                >
                  <span>Open in Google Maps</span>
                  <ArrowRight size={14} weight="bold" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
