'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  GameController,
  Desktop,
  Headphones,
  Eye,
  Lightning,
  ArrowRight,
} from '@phosphor-icons/react';

interface CategoryItem {
  id: string;
  title: string;
  slug: string;
  image: string;
  icon: React.ReactNode;
  accentColor: string;
  glowColor: string;
  borderColor: string;
}

const CATEGORIES: CategoryItem[] = [
  {
    id: 'playstation',
    title: 'PlayStation',
    slug: 'playstation',
    image: '/images/categories/playstation.png',
    accentColor: '#0070D1',
    glowColor: 'rgba(0, 112, 209, 0.35)',
    borderColor: 'rgba(0, 112, 209, 0.25)',
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="#0070D1">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15.5v-7l5 3.5-5 3.5z" />
      </svg>
    ),
  },
  {
    id: 'xbox',
    title: 'Xbox',
    slug: 'xbox',
    image: '/images/categories/xbox.png',
    accentColor: '#10B981',
    glowColor: 'rgba(16, 185, 129, 0.35)',
    borderColor: 'rgba(16, 185, 129, 0.25)',
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="#10B981">
        <path d="M12 2C6.48 2 2 6.48 2 12c0 3.32 1.63 6.27 4.14 8.08C7.54 18.23 9.49 16 12 16s4.46 2.23 5.86 4.08C20.37 18.27 22 15.32 22 12c0-5.52-4.48-10-10-10zm-2.8 4.2c1.03.77 1.8 1.8 2.8 3.3 1-1.5 1.77-2.53 2.8-3.3C16.8 4.7 19 6.2 19 8.5c0 2.2-1.5 4.5-3.5 6.5-1.5-1.5-2.5-2.8-3.5-4.5-1 1.7-2 3-3.5 4.5C6.5 13 5 10.7 5 8.5c0-2.3 2.2-3.8 4.2-2.3z" />
      </svg>
    ),
  },
  {
    id: 'gaming-pcs',
    title: 'Gaming PCs',
    slug: 'gaming-pcs',
    image: '/images/categories/gaming-pcs.png',
    accentColor: '#A855F7',
    glowColor: 'rgba(168, 85, 247, 0.35)',
    borderColor: 'rgba(168, 85, 247, 0.25)',
    icon: (
      <Desktop size={28} weight="fill" color="#A855F7" />
    ),
  },
  {
    id: 'accessories',
    title: 'Accessories',
    slug: 'accessories',
    image: '/images/categories/accessories.png',
    accentColor: '#F97316',
    glowColor: 'rgba(249, 115, 22, 0.35)',
    borderColor: 'rgba(249, 115, 22, 0.25)',
    icon: (
      <Headphones size={28} weight="fill" color="#F97316" />
    ),
  },
  {
    id: 'vr',
    title: 'VR',
    slug: 'vr-ar',
    image: '/images/categories/vr.png',
    accentColor: '#06B6D4',
    glowColor: 'rgba(6, 182, 212, 0.35)',
    borderColor: 'rgba(6, 182, 212, 0.25)',
    icon: (
      <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#06B6D4" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 8H3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h4.5a3.5 3.5 0 0 1 7 0H21a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2z" />
        <circle cx="7.5" cy="13" r="1.5" fill="#06B6D4" />
        <circle cx="16.5" cy="13" r="1.5" fill="#06B6D4" />
      </svg>
    ),
  },
];

export function CategoryNav() {
  return (
    <section className="category-strip-section" id="categories">
      <div className="container">
        <div className="category-strip-grid">
          {CATEGORIES.map((cat) => (
            <Link
              key={cat.id}
              href={`/shop/${cat.slug}`}
              className="category-strip-card"
              style={{
                '--cat-accent': cat.accentColor,
                '--cat-glow': cat.glowColor,
                '--cat-border': cat.borderColor,
              } as React.CSSProperties}
            >
              {/* Subtle ambient light gradient */}
              <div className="category-strip-card__glow" aria-hidden="true" />

              {/* Left Content Side */}
              <div className="category-strip-card__content">
                <div className="category-strip-card__icon" aria-hidden="true">
                  {cat.icon}
                </div>
                <h3 className="category-strip-card__title">{cat.title}</h3>
                <div className="category-strip-card__link">
                  <span>Shop Now</span>
                  <ArrowRight size={13} weight="bold" className="category-strip-card__arrow" />
                </div>
              </div>

              {/* Right Image Cutout Side */}
              <div className="category-strip-card__image-wrap">
                <Image
                  src={cat.image}
                  alt={`${cat.title} hardware and consoles`}
                  width={140}
                  height={130}
                  className="category-strip-card__image"
                  priority
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
