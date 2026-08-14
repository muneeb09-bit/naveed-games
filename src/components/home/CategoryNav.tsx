'use client';

import Link from 'next/link';
import Image from 'next/image';

interface CategoryItem {
  id: string;
  name: string;
  subtitle: string;
  slug: string;
  image: string;
  accentColor: string;
  glowColor: string;
}

const DEPARTMENTS: CategoryItem[] = [
  {
    id: 'consoles',
    name: 'CONSOLES',
    subtitle: 'PS5 • Xbox • Nintendo',
    slug: 'playstation',
    image: '/images/categories/consoles.webp',
    accentColor: '#0070D1',
    glowColor: 'rgba(0, 112, 209, 0.35)',
  },
  {
    id: 'games',
    name: 'GAMES',
    subtitle: 'New • Classic • More',
    slug: 'gaming',
    image: '/images/categories/games.webp',
    accentColor: '#EF4444',
    glowColor: 'rgba(239, 68, 68, 0.35)',
  },
  {
    id: 'controllers',
    name: 'CONTROLLERS',
    subtitle: 'DualSense • Scuf • More',
    slug: 'controllers',
    image: '/images/categories/controllers.webp',
    accentColor: '#6366F1',
    glowColor: 'rgba(99, 102, 241, 0.35)',
  },
  {
    id: 'vr',
    name: 'VR & AR',
    subtitle: 'Meta Quest • PS VR',
    slug: 'vr-ar',
    image: '/images/categories/vr.webp',
    accentColor: '#06B6D4',
    glowColor: 'rgba(6, 182, 212, 0.35)',
  },
  {
    id: 'gaming-pcs',
    name: 'GAMING PCS',
    subtitle: 'Build • Prebuilt • More',
    slug: 'gaming-pcs',
    image: '/images/categories/gaming-pcs.webp',
    accentColor: '#A855F7',
    glowColor: 'rgba(168, 85, 247, 0.35)',
  },
  {
    id: 'drones',
    name: 'DRONES & CAMERAS',
    subtitle: 'DJI • Osmo • Action',
    slug: 'drones',
    image: '/images/categories/drones.webp',
    accentColor: '#38BDF8',
    glowColor: 'rgba(56, 189, 248, 0.35)',
  },
  {
    id: 'audio',
    name: 'AUDIO',
    subtitle: 'Headphones • Speakers',
    slug: 'accessories',
    image: '/images/categories/audio.webp',
    accentColor: '#F97316',
    glowColor: 'rgba(249, 115, 22, 0.35)',
  },
  {
    id: 'racing',
    name: 'RACING SIMULATORS',
    subtitle: 'Wheels • Rig • Seats',
    slug: 'accessories',
    image: '/images/categories/racing.webp',
    accentColor: '#10B981',
    glowColor: 'rgba(168, 85, 247, 0.35)',
  },
  {
    id: 'smart-tech',
    name: 'SMART TECH',
    subtitle: 'Toybots • Glasses • More',
    slug: 'lifestyle',
    image: '/images/categories/smart-tech.webp',
    accentColor: '#38BDF8',
    glowColor: 'rgba(56, 189, 248, 0.35)',
  },
  {
    id: 'rc-hobby',
    name: 'RC & HOBBY',
    subtitle: 'Traxxas • RC Cars • More',
    slug: 'accessories',
    image: '/images/categories/rc-cars.webp',
    accentColor: '#F59E0B',
    glowColor: 'rgba(245, 158, 11, 0.35)',
  },
];

export function CategoryNav() {
  return (
    <section className="dept-showcase-section" id="categories">
      <div className="container dept-showcase-container">
        {/* 10 Category Cards Directory */}
        <div className="dept-showcase-row">
          {DEPARTMENTS.map((dept) => (
            <Link
              key={dept.id}
              href={`/shop/${dept.slug}`}
              className="dept-item-card"
              style={{
                '--card-accent': dept.accentColor,
                '--card-glow': dept.glowColor,
              } as React.CSSProperties}
            >
              {/* Product Visual (Hero Element) */}
              <div className="dept-item-card__visual">
                <Image
                  src={dept.image}
                  alt={`${dept.name} hardware`}
                  width={140}
                  height={110}
                  className="dept-item-card__img"
                  loading="lazy"
                />
              </div>

              {/* Title & Subtitle */}
              <div className="dept-item-card__info">
                <h3 className="dept-item-card__title">{dept.name}</h3>
                <p className="dept-item-card__subtitle">{dept.subtitle}</p>
                <span className="dept-item-card__arrow">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
