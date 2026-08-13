'use client';

import { useState } from 'react';
import Link from 'next/link';
import { X, CaretDown, CaretUp } from '@phosphor-icons/react';
import { departments } from '@/data/departments';
import { brands } from '@/data/brands';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const [expandedDept, setExpandedDept] = useState<string | null>(departments[0].slug);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleDept = (slug: string) => {
    setExpandedDept(expandedDept === slug ? null : slug);
  };

  const toggleCategory = (slug: string) => {
    setExpandedCategory(expandedCategory === slug ? null : slug);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="mobile-drawer-overlay" onClick={onClose} />
      <aside className="mobile-drawer" role="dialog" aria-label="Navigation menu">
        {/* Header */}
        <div className="mobile-drawer__header">
          <span className="mobile-drawer__title">Menu</span>
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
          {/* Main Links */}
          <div className="mobile-drawer__section">
            <Link href="/shop" className="mobile-drawer__link mobile-drawer__link--highlight" onClick={onClose}>
              SHOP (ALL PRODUCTS)
            </Link>
            <Link href="/brands" className="mobile-drawer__link" onClick={onClose}>
              BRANDS
            </Link>
            <Link href="/deals" className="mobile-drawer__link" onClick={onClose}>
              DEALS & OFFERS
            </Link>
            <Link href="/shop?condition=used" className="mobile-drawer__link" onClick={onClose}>
              USED & OPEN BOX
            </Link>
            <a
              href="https://wa.me/923339348891"
              target="_blank"
              rel="noopener noreferrer"
              className="mobile-drawer__link"
              onClick={onClose}
            >
              CONTACT WHATSAPP
            </a>
          </div>

          <div className="mobile-drawer__divider" />

          {/* Departments Accordion */}
          <div className="mobile-drawer__section">
            <div className="mobile-drawer__section-label">Departments</div>
            {departments.map((dept) => (
              <div key={dept.slug} className="mobile-drawer__accordion">
                <div className="mobile-drawer__accordion-header">
                  <span className="mobile-drawer__link" style={{ fontWeight: 700 }}>
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
                  <div className="mobile-drawer__subcategories" style={{ paddingLeft: '12px' }}>
                    {dept.categories.map((cat) => (
                      <div key={cat.slug} className="mobile-drawer__accordion" style={{ marginBottom: '8px' }}>
                        <div className="mobile-drawer__accordion-header">
                          <Link
                            href={`/shop/${cat.slug}`}
                            className="mobile-drawer__sublink"
                            onClick={onClose}
                          >
                            {cat.name}
                          </Link>
                          {cat.subcategories && cat.subcategories.length > 0 && (
                            <button
                              className="mobile-drawer__accordion-toggle"
                              onClick={() => toggleCategory(cat.slug)}
                              type="button"
                              aria-label={`Toggle ${cat.name}`}
                            >
                              {expandedCategory === cat.slug ? (
                                <CaretUp size={12} weight="bold" />
                              ) : (
                                <CaretDown size={12} weight="bold" />
                              )}
                            </button>
                          )}
                        </div>

                        {expandedCategory === cat.slug && cat.subcategories && (
                          <div style={{ paddingLeft: '12px', marginTop: '4px' }}>
                            {cat.subcategories.map((sub) => (
                              <Link
                                key={sub.slug}
                                href={`/shop/${cat.slug}/${sub.slug}`}
                                className="mobile-drawer__sublink"
                                style={{ fontSize: '0.8125rem', color: 'var(--muted)' }}
                                onClick={onClose}
                              >
                                • {sub.name}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mobile-drawer__divider" />

          {/* Top Brands Quick Accordion */}
          <div className="mobile-drawer__section">
            <div className="mobile-drawer__section-label">Popular Brands</div>
            {brands.slice(0, 8).map((brand) => (
              <Link
                key={brand.slug}
                href={`/brand/${brand.slug}`}
                className="mobile-drawer__sublink"
                onClick={onClose}
              >
                {brand.name}
              </Link>
            ))}
          </div>
        </div>
      </aside>
    </>
  );
}
