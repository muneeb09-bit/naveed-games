'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { WhatsappLogo, MapPin, Phone } from '@phosphor-icons/react';

export function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith('/admin')) {
    return null;
  }

  return (
    <footer className="footer-concise" id="site-footer">
      <div className="container">
        <div className="footer-concise__main">
          {/* Brand & Mission */}
          <div className="footer-concise__brand">
            <Link href="/" className="footer-concise__logo">
              <Image
                src="/images/logo.png"
                alt="Naveed Games Logo"
                width={30}
                height={30}
                className="footer-concise__logo-img"
              />
              <span className="footer-concise__logo-text">
                NAVEED<span>GAMES</span>
              </span>
            </Link>
            <p className="footer-concise__desc">
              Premium gaming hardware & creator tech in Pakistan.
            </p>
          </div>

          {/* Quick Nav Links */}
          <nav className="footer-concise__nav" aria-label="Footer navigation">
            <Link href="/shop">Shop</Link>
            <Link href="/shop/playstation">PlayStation</Link>
            <Link href="/shop/xbox">Xbox</Link>
            <Link href="/shop/gaming-pcs">Gaming PCs</Link>
            <Link href="/deals">Deals</Link>
            <Link href="/brands">Brands</Link>
            <Link href="/wishlist">Wishlist</Link>
          </nav>

          {/* Contact Direct Links */}
          <div className="footer-concise__contact">
            <a
              href="https://wa.me/923339348891"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-concise__whatsapp"
            >
              <WhatsappLogo size={16} weight="fill" />
              <span>WhatsApp: +92 333 9348891</span>
            </a>
            <div className="footer-concise__location">
              <MapPin size={14} weight="fill" />
              <span>Karkhano Market, Peshawar</span>
            </div>
          </div>
        </div>

        {/* Bottom Minimal Copyright */}
        <div className="footer-concise__bottom">
          <span>© {new Date().getFullYear()} Naveed Games (Pvt) Ltd. All rights reserved.</span>
          <div className="footer-concise__legal">
            <span>Nationwide Cash on Delivery</span>
            <span>·</span>
            <Link href="/admin/login">Staff Login</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
