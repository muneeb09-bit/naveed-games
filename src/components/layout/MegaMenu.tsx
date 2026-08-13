'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { CaretRight, Sparkle, Tag, ShieldCheck, Truck } from '@phosphor-icons/react';
import { departments } from '@/data/departments';
import { brands } from '@/data/brands';

interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: 'shop' | 'brands';
}

const SPOTLIGHTS: Record<string, { title: string; subtitle: string; price: string; link: string; badge: string }> = {
  'gaming': {
    title: 'PlayStation 5 Pro',
    subtitle: '2TB SSD • AI PSSR 4K/120fps',
    price: 'Rs. 249,999',
    link: '/products/ps5-pro',
    badge: 'FLAGSHIP ARRIVAL',
  },
  'drones-creator': {
    title: 'DJI Mini 4 Pro Combo',
    subtitle: 'Under 249g • 4K/60fps HDR • RC 2',
    price: 'Rs. 314,999',
    link: '/products/dji-mini-4-pro-fly-more-combo',
    badge: 'TOP CREATOR GEAR',
  },
  'smart-tech': {
    title: 'Meta Quest 3 (512GB)',
    subtitle: '4K+ Infinite Display • Spatial VR',
    price: 'Rs. 174,999',
    link: '/products/meta-quest-3-512gb',
    badge: 'MIXED REALITY',
  },
  'racing-rc': {
    title: 'Traxxas XRT 8S Truck',
    subtitle: '60+ MPH • All-Metal 4WD Monster',
    price: 'Rs. 369,999',
    link: '/products/traxxas-xrt-8s-brushless-race-truck',
    badge: 'EXTREME RC',
  },
  'used': {
    title: 'Pre-Owned PS5 Disc',
    subtitle: 'Certified Tested • 3-Month Warranty',
    price: 'Rs. 139,999',
    link: '/shop?condition=used',
    badge: 'VERIFIED PRE-OWNED',
  },
};

export function MegaMenu({ isOpen, onClose, activeTab }: MegaMenuProps) {
  const [activeDeptSlug, setActiveDeptSlug] = useState<string>(departments[0].slug);
  const [hoveredCategorySlug, setHoveredCategorySlug] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setHoveredCategorySlug(null);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const currentDept = departments.find((d) => d.slug === activeDeptSlug) || departments[0];
  const currentCategory = hoveredCategorySlug
    ? currentDept.categories.find((c) => c.slug === hoveredCategorySlug) || currentDept.categories[0]
    : currentDept.categories[0];

  const handleDeptHover = (deptSlug: string) => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = setTimeout(() => {
      setActiveDeptSlug(deptSlug);
      const targetDept = departments.find((d) => d.slug === deptSlug);
      setHoveredCategorySlug(targetDept?.categories[0]?.slug || null);
    }, 80);
  };

  const handleCategoryHover = (catSlug: string) => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = setTimeout(() => {
      setHoveredCategorySlug(catSlug);
    }, 60);
  };

  const spotlight = SPOTLIGHTS[currentDept.slug] || SPOTLIGHTS['gaming'];

  return (
    <div className="mega-menu" ref={menuRef}>
      <div className="mega-menu__inner container">
        {activeTab === 'shop' ? (
          <>
            {/* Column 1: Departments */}
            <div className="mega-menu__depts">
              <div className="mega-menu__section-label">Departments</div>
              {departments.map((dept) => (
                <button
                  key={dept.slug}
                  type="button"
                  className={`mega-menu__dept-item ${activeDeptSlug === dept.slug ? 'mega-menu__dept-item--active' : ''}`}
                  onMouseEnter={() => handleDeptHover(dept.slug)}
                  onClick={() => {
                    setActiveDeptSlug(dept.slug);
                    setHoveredCategorySlug(dept.categories[0]?.slug || null);
                  }}
                >
                  <span>{dept.name}</span>
                  <CaretRight size={13} weight="bold" />
                </button>
              ))}
              
              <div className="mega-menu__bottom-assurance">
                <div className="mega-menu__assurance-item">
                  <Truck size={14} weight="bold" style={{ color: 'var(--accent)' }} />
                  <span>Express Peshawar Delivery</span>
                </div>
                <div className="mega-menu__assurance-item">
                  <ShieldCheck size={14} weight="bold" style={{ color: 'var(--success)' }} />
                  <span>Official Warranty Guarantee</span>
                </div>
              </div>
            </div>

            {/* Column 2: Categories */}
            <div className="mega-menu__categories">
              <div className="mega-menu__section-label">{currentDept.name} Categories</div>
              {currentDept.categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/shop/${cat.slug}`}
                  className={`mega-menu__category-item ${currentCategory?.slug === cat.slug ? 'mega-menu__category-item--active' : ''}`}
                  onMouseEnter={() => handleCategoryHover(cat.slug)}
                  onClick={onClose}
                >
                  <span>{cat.name}</span>
                  {cat.subcategories && cat.subcategories.length > 0 && (
                    <CaretRight size={13} weight="bold" />
                  )}
                </Link>
              ))}
            </div>

            {/* Column 3: Subcategories & Direct Deep Links */}
            <div className="mega-menu__subcategories">
              {currentCategory && currentCategory.subcategories && currentCategory.subcategories.length > 0 ? (
                <>
                  <div className="mega-menu__section-label">{currentCategory.name} Models</div>
                  <div className="mega-menu__sub-grid">
                    {currentCategory.subcategories.map((sub) => (
                      <Link
                        key={sub.slug}
                        href={`/shop/${currentCategory.slug}/${sub.slug}`}
                        className="mega-menu__sub-item"
                        onClick={onClose}
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                  <Link
                    href={`/shop/${currentCategory.slug}`}
                    className="mega-menu__view-all"
                    onClick={onClose}
                  >
                    Explore All {currentCategory.name} →
                  </Link>
                </>
              ) : (
                <div className="mega-menu__section-label" style={{ color: 'var(--muted)' }}>
                  Select a category to view items
                </div>
              )}
            </div>

            {/* Column 4: Spotlight Flagship Card & Popular Brands */}
            <div className="mega-menu__featured">
              <div className="mega-menu__section-label">Department Spotlight</div>
              
              <Link href={spotlight.link} className="mega-menu__spotlight-card" onClick={onClose}>
                <div className="mega-menu__spotlight-badge">{spotlight.badge}</div>
                <div className="mega-menu__spotlight-title">{spotlight.title}</div>
                <div className="mega-menu__spotlight-sub">{spotlight.subtitle}</div>
                <div className="mega-menu__spotlight-price">{spotlight.price}</div>
              </Link>

              <div className="mega-menu__section-label" style={{ marginTop: '16px' }}>
                Featured Brands
              </div>
              <div className="mega-menu__brand-chips">
                {brands.slice(0, 8).map((brand) => (
                  <Link
                    key={brand.slug}
                    href={`/brand/${brand.slug}`}
                    className="mega-menu__brand-chip"
                    onClick={onClose}
                  >
                    {brand.name}
                  </Link>
                ))}
              </div>
            </div>
          </>
        ) : (
          /* Brands Tab */
          <div className="mega-menu__brands-grid">
            <div className="mega-menu__section-label" style={{ gridColumn: '1 / -1' }}>
              Shop by Official Brand
            </div>
            {brands.map((brand) => (
              <Link
                key={brand.slug}
                href={`/brand/${brand.slug}`}
                className="mega-menu__brand-card"
                onClick={onClose}
              >
                <div className="mega-menu__brand-card-name">{brand.name}</div>
                <div className="mega-menu__brand-card-desc">
                  {brand.description?.slice(0, 75)}...
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
