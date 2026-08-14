'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { WhatsappLogo, MapPin, Phone, ShieldCheck, Truck, Certificate } from '@phosphor-icons/react';

export function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="footer-clean" id="site-footer">
      <div className="container">
        {/* Top Trust Bar */}
        <div className="footer-clean__trust-bar">
          <div className="footer-clean__trust-col">
            <ShieldCheck size={24} weight="fill" className="footer-clean__trust-icon" />
            <div>
              <strong>100% Genuine Guaranteed</strong>
              <span>Direct factory-sealed inventory</span>
            </div>
          </div>
          <div className="footer-clean__trust-col">
            <Truck size={24} weight="fill" className="footer-clean__trust-icon" />
            <div>
              <strong>Express Delivery</strong>
              <span>Nationwide insured shipping</span>
            </div>
          </div>
          <div className="footer-clean__trust-col">
            <Certificate size={24} weight="fill" className="footer-clean__trust-icon" />
            <div>
              <strong>Official Warranty</strong>
              <span>Dedicated after-sales support</span>
            </div>
          </div>
          <div className="footer-clean__trust-col">
            <WhatsappLogo size={24} weight="fill" className="footer-clean__trust-icon" />
            <div>
              <strong>Expert Consultation</strong>
              <span>Real-time WhatsApp assistance</span>
            </div>
          </div>
        </div>

        {/* Main Footer Columns */}
        <div className="footer-clean__grid">
          {/* Brand & Address */}
          <div className="footer-clean__brand-col">
            <Link href="/" className="footer-clean__logo">
              <Image
                src="/images/logo.png"
                alt="Naveed Games Logo"
                width={36}
                height={36}
                className="footer-clean__logo-img"
              />
              <span className="footer-clean__logo-text">
                NAVEED<span>GAMES</span>
              </span>
            </Link>
            <p className="footer-clean__tagline">
              Pakistan&apos;s premier destination for authentic PlayStation, Xbox, custom gaming PCs, VR, and creator hardware.
            </p>
            <div className="footer-clean__contact-block">
              <div className="footer-clean__contact-item">
                <MapPin size={16} weight="fill" />
                <span>Shop No 75, S.S Plaza, Karkhano Market, Jamrud Road, Peshawar, KPK</span>
              </div>
              <div className="footer-clean__contact-item">
                <Phone size={16} weight="fill" />
                <span>PTCL: 091-5810832 · Manager: +92 313 9467708</span>
              </div>
              <div className="footer-clean__contact-item">
                <WhatsappLogo size={16} weight="fill" />
                <a href="https://wa.me/923339348891" target="_blank" rel="noopener noreferrer">
                  +92 333 9348891 (WhatsApp Support)
                </a>
              </div>
            </div>
          </div>

          {/* Shop Hardware */}
          <div>
            <h3 className="footer-clean__heading">Hardware & Gear</h3>
            <ul className="footer-clean__links">
              <li><Link href="/shop/playstation">PlayStation 5 Consoles</Link></li>
              <li><Link href="/shop/xbox">Xbox Series X | S</Link></li>
              <li><Link href="/shop/gaming-pcs">Custom Gaming PCs</Link></li>
              <li><Link href="/shop/controllers">Pro & Custom Controllers</Link></li>
              <li><Link href="/shop/vr-ar">VR & Spatial Computing</Link></li>
              <li><Link href="/shop/accessories">Headsets & Audio Gear</Link></li>
            </ul>
          </div>

          {/* Top Brands */}
          <div>
            <h3 className="footer-clean__heading">Flagship Brands</h3>
            <ul className="footer-clean__links">
              <li><Link href="/brand/playstation">Sony PlayStation</Link></li>
              <li><Link href="/brand/xbox">Microsoft Xbox</Link></li>
              <li><Link href="/brand/nintendo">Nintendo Switch</Link></li>
              <li><Link href="/brand/dji">DJI Drones & Gimbals</Link></li>
              <li><Link href="/brand/meta">Meta Quest & Ray-Ban</Link></li>
              <li><Link href="/brand/razer">Razer Gaming</Link></li>
              <li><Link href="/brand/logitech">Logitech G</Link></li>
            </ul>
          </div>

          {/* Customer Service & Store */}
          <div>
            <h3 className="footer-clean__heading">Customer Care</h3>
            <ul className="footer-clean__links">
              <li><Link href="/shop">Browse All Products</Link></li>
              <li><Link href="/deals">Deals & Weekly Offers</Link></li>
              <li><Link href="/wishlist">Your Wishlist</Link></li>
              <li><Link href="/checkout">Track & Checkout Order</Link></li>
              <li><a href="https://wa.me/923339348891" target="_blank" rel="noopener noreferrer">Request a Custom PC Quote</a></li>
              <li><Link href="/admin/login">Staff & Admin Login</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="footer-clean__bottom">
          <p>© {new Date().getFullYear()} Naveed Games (Private) Ltd. All rights reserved.</p>
          <p>Peshawar, KPK · Pakistan · Premium Gaming Hardware Destination</p>
        </div>
      </div>
    </footer>
  );
}
