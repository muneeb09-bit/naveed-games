'use client';

import { useState } from 'react';
import Link from 'next/link';
import { X, CaretDown, CaretUp } from '@phosphor-icons/react';
import { categories } from '@/data/categories';
import { brands } from '@/data/brands';

interface MobileDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileDrawer({ isOpen, onClose }: MobileDrawerProps) {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<'shop' | 'brands'>('shop');

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

        {/* Section Tabs */}
        <div className="mobile-drawer__tabs">
          <button
            className={`mobile-drawer__tab ${activeSection === 'shop' ? 'mobile-drawer__tab--active' : ''}`}
            onClick={() => setActiveSection('shop')}
            type="button"
          >
            Shop
          </button>
          <button
            className={`mobile-drawer__tab ${activeSection === 'brands' ? 'mobile-drawer__tab--active' : ''}`}
            onClick={() => setActiveSection('brands')}
            type="button"
          >
            Brands
          </button>
        </div>

        {/* Content */}
        <div className="mobile-drawer__content">
          {activeSection === 'shop' ? (
            <>
              {/* Quick links */}
              <div className="mobile-drawer__section">
                <Link href="/shop" className="mobile-drawer__link mobile-drawer__link--highlight" onClick={onClose}>
                  All Products
                </Link>
                <Link href="/shop?featured=true" className="mobile-drawer__link" onClick={onClose}>
                  ⭐ Featured
                </Link>
                <Link href="/shop?new=true" className="mobile-drawer__link" onClick={onClose}>
                  🆕 New Arrivals
                </Link>
                <Link href="/shop?filter=deals" className="mobile-drawer__link" onClick={onClose}>
                  🔥 Deals
                </Link>
              </div>

              <div className="mobile-drawer__divider" />

              {/* Categories with accordion */}
              <div className="mobile-drawer__section">
                <div className="mobile-drawer__section-label">Categories</div>
                {categories.map((cat) => (
                  <div key={cat.slug} className="mobile-drawer__accordion">
                    <div className="mobile-drawer__accordion-header">
                      <Link
                        href={`/shop/${cat.slug}`}
                        className="mobile-drawer__link"
                        onClick={onClose}
                      >
                        {cat.name}
                      </Link>
                      {cat.subcategories && cat.subcategories.length > 0 && (
                        <button
                          className="mobile-drawer__accordion-toggle"
                          onClick={() => toggleCategory(cat.slug)}
                          type="button"
                          aria-label={`Toggle ${cat.name} subcategories`}
                        >
                          {expandedCategory === cat.slug ? (
                            <CaretUp size={14} weight="bold" />
                          ) : (
                            <CaretDown size={14} weight="bold" />
                          )}
                        </button>
                      )}
                    </div>

                    {expandedCategory === cat.slug && cat.subcategories && (
                      <div className="mobile-drawer__subcategories">
                        {cat.subcategories.map((sub) => (
                          <Link
                            key={sub.slug}
                            href={`/shop/${cat.slug}/${sub.slug}`}
                            className="mobile-drawer__sublink"
                            onClick={onClose}
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="mobile-drawer__section">
              <div className="mobile-drawer__section-label">Brands</div>
              {brands.map((brand) => (
                <Link
                  key={brand.slug}
                  href={`/brand/${brand.slug}`}
                  className="mobile-drawer__link"
                  onClick={onClose}
                >
                  {brand.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
