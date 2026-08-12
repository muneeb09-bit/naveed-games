import Link from 'next/link';
import { WhatsappLogo, MapPin, Phone } from '@phosphor-icons/react/dist/ssr';

export function Footer() {
  return (
    <footer className="footer" id="site-footer">
      <div className="container">
        <div className="footer__grid">
          {/* Brand column */}
          <div>
            <div className="footer__brand-name">
              Naveed Games
            </div>
            <p className="footer__brand-tagline">
              Gaming Heaven — Peshawar&apos;s premier gaming destination since day one.
            </p>
            <div className="footer__contact-info">
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '8px', marginBottom: '8px' }}>
                <MapPin size={16} weight="bold" style={{ flexShrink: 0, marginTop: '3px', color: 'var(--accent)' }} />
                <span>Shop No 75, S.S Plaza, Karkhano Market, Jamrud Road, Peshawar, KPK</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                <Phone size={16} weight="bold" style={{ flexShrink: 0, color: 'var(--accent)' }} />
                <span>091-5810832</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <WhatsappLogo size={16} weight="fill" style={{ flexShrink: 0, color: 'var(--whatsapp)' }} />
                <a href="https://wa.me/923339348891" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--whatsapp)' }}>
                  +92 333 9348891
                </a>
              </div>
            </div>
          </div>

          {/* Shop links */}
          <div>
            <h3 className="footer__heading">Shop</h3>
            <ul className="footer__links">
              <li><Link href="/categories/consoles" className="footer__link">Consoles</Link></li>
              <li><Link href="/categories/gaming-pcs" className="footer__link">Gaming PCs</Link></li>
              <li><Link href="/categories/games" className="footer__link">Games</Link></li>
              <li><Link href="/categories/monitors" className="footer__link">Monitors</Link></li>
              <li><Link href="/categories/handhelds-vr" className="footer__link">Handhelds & VR</Link></li>
              <li><Link href="/categories/racing-simulators" className="footer__link">Racing</Link></li>
            </ul>
          </div>

          {/* More links */}
          <div>
            <h3 className="footer__heading">Categories</h3>
            <ul className="footer__links">
              <li><Link href="/categories/audio" className="footer__link">Audio</Link></li>
              <li><Link href="/categories/chairs-setup" className="footer__link">Chairs & Setup</Link></li>
              <li><Link href="/categories/collectibles" className="footer__link">Collectibles</Link></li>
              <li><Link href="/categories/rc-drones" className="footer__link">RC & Drones</Link></li>
              <li><Link href="/categories/smart-tech" className="footer__link">Smart Tech</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h3 className="footer__heading">Help</h3>
            <ul className="footer__links">
              <li><Link href="/products" className="footer__link">All Products</Link></li>
              <li><Link href="/products?filter=deals" className="footer__link">Deals</Link></li>
              <li><Link href="/wishlist" className="footer__link">Wishlist</Link></li>
              <li><Link href="/checkout" className="footer__link">Cart</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            &copy; {new Date().getFullYear()} Naveed Games. All rights reserved.
          </p>
          <p className="footer__copyright">
            Gaming Heaven — Peshawar, Pakistan
          </p>
        </div>
      </div>
    </footer>
  );
}
