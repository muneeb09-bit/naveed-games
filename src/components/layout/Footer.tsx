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
            <h3 className="footer__heading">Shop Categories</h3>
            <ul className="footer__links">
              <li><Link href="/shop/consoles" className="footer__link">Consoles</Link></li>
              <li><Link href="/shop/games" className="footer__link">Games</Link></li>
              <li><Link href="/shop/controllers" className="footer__link">Controllers</Link></li>
              <li><Link href="/shop/vr-ar" className="footer__link">VR & AR</Link></li>
              <li><Link href="/shop/gaming-pcs" className="footer__link">Gaming PCs</Link></li>
              <li><Link href="/shop/racing-simulators" className="footer__link">Racing Simulators</Link></li>
              <li><Link href="/shop/rc-cars" className="footer__link">RC Cars</Link></li>
            </ul>
          </div>

          {/* Brands links */}
          <div>
            <h3 className="footer__heading">Top Brands</h3>
            <ul className="footer__links">
              <li><Link href="/brand/playstation" className="footer__link">PlayStation</Link></li>
              <li><Link href="/brand/xbox" className="footer__link">Xbox</Link></li>
              <li><Link href="/brand/nintendo" className="footer__link">Nintendo</Link></li>
              <li><Link href="/brand/dji" className="footer__link">DJI Drones</Link></li>
              <li><Link href="/brand/meta" className="footer__link">Meta VR</Link></li>
              <li><Link href="/brand/traxxas" className="footer__link">Traxxas RC</Link></li>
              <li><Link href="/brand/logitech" className="footer__link">Logitech</Link></li>
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="footer__heading">Explore</h3>
            <ul className="footer__links">
              <li><Link href="/shop" className="footer__link">All Products</Link></li>
              <li><Link href="/shop?filter=deals" className="footer__link">Deals & Offers</Link></li>
              <li><Link href="/shop?featured=true" className="footer__link">Featured Products</Link></li>
              <li><Link href="/wishlist" className="footer__link">Wishlist</Link></li>
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
