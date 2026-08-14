'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { X, CaretDown, CaretUp, GameController, Desktop, Lightning, Headphones, DeviceMobile, WhatsappLogo } from '@phosphor-icons/react';
import { departments } from '@/data/departments';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const [expandedDept, setExpandedDept] = useState<string | null>(departments[0]?.slug || null);

  const toggleDept = (slug: string) => {
    setExpandedDept(expandedDept === slug ? null : slug);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="mobile-drawer-overlay" onClick={onClose} />
      <aside className="mobile-drawer" role="dialog" aria-label="Navigation menu">
        {/* Header */}
        <div className="mobile-drawer__header">
          <Link href="/" className="mobile-drawer__logo" onClick={onClose}>
            <Image
              src="/images/logo.png"
              alt="Naveed Games Logo"
              width={30}
              height={30}
              className="mobile-drawer__logo-img"
            />
            <span className="mobile-drawer__logo-text">
              NAVEED<span>GAMES</span>
            </span>
          </Link>
          <button
            className="mobile-drawer__close"
            onClick={onClose}
            aria-label="Close menu"
            type="button"
          >
            <X size={20} weight="bold" />
          </button>
        </div>

        {/* Content */}
        <div className="mobile-drawer__content">
          {/* Main Primary Links */}
          <div className="mobile-drawer__section">
            <Link href="/shop" className="mobile-drawer__link mobile-drawer__link--highlight" onClick={onClose}>
              Shop (All Products)
            </Link>
            <Link href="/shop/playstation" className="mobile-drawer__link" onClick={onClose}>
              PlayStation 5
            </Link>
            <Link href="/shop/xbox" className="mobile-drawer__link" onClick={onClose}>
              Xbox Series X | S
            </Link>
            <Link href="/shop/gaming-pcs" className="mobile-drawer__link" onClick={onClose}>
              Gaming PCs & Rigs
            </Link>
            <Link href="/shop/accessories" className="mobile-drawer__link" onClick={onClose}>
              Accessories & Audio
            </Link>
            <Link href="/deals" className="mobile-drawer__link mobile-drawer__link--deals" onClick={onClose}>
              Deals & Special Offers
            </Link>
          </div>

          <div className="mobile-drawer__divider" />

          {/* Departments Accordion */}
          <div className="mobile-drawer__section">
            <div className="mobile-drawer__section-label">All Departments</div>
            {departments.map((dept) => (
              <div key={dept.slug} className="mobile-drawer__accordion">
                <div className="mobile-drawer__accordion-header">
                  <span className="mobile-drawer__link" style={{ fontWeight: 600 }}>
                    {dept.name}
                  </span>
                  <button
                    className="mobile-drawer__accordion-toggle"
                    onClick={() => toggleDept(dept.slug)}
                    type="button"
                    aria-label={`Toggle ${dept.name}`}
                  >
                    {expandedDept === dept.slug ? (
                      <CaretUp size={14} weight="bold" />
                    ) : (
                      <CaretDown size={14} weight="bold" />
                    )}
                  </button>
                </div>

                {expandedDept === dept.slug && (
                  <div className="mobile-drawer__subcategories">
                    {dept.categories.map((cat) => (
                      <Link
                        key={cat.slug}
                        href={`/shop/${cat.slug}`}
                        className="mobile-drawer__sublink"
                        onClick={onClose}
                      >
                        {cat.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mobile-drawer__divider" />

          {/* Quick Support Button */}
          <div className="mobile-drawer__section" style={{ paddingBottom: '24px' }}>
            <a
              href="https://wa.me/923339348891"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-whatsapp"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <WhatsappLogo size={18} weight="fill" />
              <span>WhatsApp Support (+92 333 9348891)</span>
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}
