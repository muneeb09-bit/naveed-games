'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  GameController,
  Desktop,
  Headphones,
  Eye,
  Lightning,
  Sparkle,
  Camera,
  SteeringWheel,
  DeviceMobile,
  Car,
} from '@phosphor-icons/react';

interface CategoryItem {
  id: string;
  name: string;
  subtitle: string;
  slug: string;
  image: string;
  accentColor: string;
  glowColor: string;
  icon: React.ReactNode;
}

const DEPARTMENTS: CategoryItem[] = [
  {
    id: 'consoles',
    name: 'CONSOLES',
    subtitle: 'PlayStation • Xbox • Nintendo',
    slug: 'consoles',
    image: '/images/categories/consoles.webp',
    accentColor: '#0070D1',
    glowColor: 'rgba(0, 112, 209, 0.35)',
    icon: <GameController size={20} weight="fill" />,
  },
  {
    id: 'gaming-pcs',
    name: 'GAMING PCS',
    subtitle: 'Custom Rigs • RTX 4090 • Laptops',
    slug: 'gaming-pcs',
    image: '/images/categories/gaming-pcs.webp',
    accentColor: '#A855F7',
    glowColor: 'rgba(168, 85, 247, 0.35)',
    icon: <Desktop size={20} weight="fill" />,
  },
  {
    id: 'vr-ar',
    name: 'VR & SPATIAL',
    subtitle: 'Meta Quest • PS VR2 • Vision',
    slug: 'vr-ar',
    image: '/images/categories/vr.webp',
    accentColor: '#06B6D4',
    glowColor: 'rgba(6, 182, 212, 0.35)',
    icon: <Eye size={20} weight="fill" />,
  },
  {
    id: 'drones',
    name: 'DRONES & CAMERAS',
    subtitle: 'DJI • Osmo • Creator Gear',
    slug: 'drones',
    image: '/images/categories/drones.webp',
    accentColor: '#38BDF8',
    glowColor: 'rgba(56, 189, 248, 0.35)',
    icon: <Camera size={20} weight="fill" />,
  },
  {
    id: 'controllers',
    name: 'PRO CONTROLLERS',
    subtitle: 'DualSense Edge • Elite • Custom',
    slug: 'controllers',
    image: '/images/categories/controllers.webp',
    accentColor: '#6366F1',
    glowColor: 'rgba(99, 102, 241, 0.35)',
    icon: <Lightning size={20} weight="fill" />,
  },
  {
    id: 'audio',
    name: 'GAMING AUDIO',
    subtitle: 'SteelSeries • Sony • Studio Sound',
    slug: 'accessories',
    image: '/images/categories/audio.webp',
    accentColor: '#F97316',
    glowColor: 'rgba(249, 115, 22, 0.35)',
    icon: <Headphones size={20} weight="fill" />,
  },
  {
    id: 'racing',
    name: 'RACING SIMULATORS',
    subtitle: 'Logitech G • Fanatec • Moza',
    slug: 'accessories',
    image: '/images/categories/racing.webp',
    accentColor: '#EF4444',
    glowColor: 'rgba(239, 68, 68, 0.35)',
    icon: <SteeringWheel size={20} weight="fill" />,
  },
  {
    id: 'smart-tech',
    name: 'SMART & ROBOTICS',
    subtitle: 'Ray-Ban Meta • EMO AI • Tech',
    slug: 'accessories',
    image: '/images/categories/smart-tech.webp',
    accentColor: '#10B981',
    glowColor: 'rgba(16, 185, 129, 0.35)',
    icon: <Sparkle size={20} weight="fill" />,
  },
  {
    id: 'handhelds',
    name: 'HANDHELDS',
    subtitle: 'Steam Deck • ROG Ally • OLED',
    slug: 'gaming',
    image: '/images/categories/handhelds.webp',
    accentColor: '#EC4899',
    glowColor: 'rgba(236, 72, 153, 0.35)',
    icon: <DeviceMobile size={20} weight="fill" />,
  },
  {
    id: 'rc-monsters',
    name: 'RC & HOBBY',
    subtitle: 'Traxxas • 60+ MPH • 4WD',
    slug: 'accessories',
    image: '/images/categories/rc-cars.webp',
    accentColor: '#F59E0B',
    glowColor: 'rgba(245, 158, 11, 0.35)',
    icon: <Car size={20} weight="fill" />,
  },
];

export function CategoryNav() {
  return (
    <section className="dept-showcase-section" id="categories">
      <div className="container">
        <div className="dept-showcase-header">
          <div>
            <span className="dept-showcase-badge">STORE DEPARTMENTS</span>
            <h2 className="dept-showcase-title">Shop by Category</h2>
          </div>
          <Link href="/shop" className="dept-showcase-all-link">
            <span>Browse All Departments</span>
            <span className="dept-showcase-all-arrow">→</span>
          </Link>
        </div>

        {/* 10 Department Cards Grid (Mobile Horizontal Snap / Desktop 5x2 Grid) */}
        <div className="dept-showcase-grid">
          {DEPARTMENTS.map((dept) => (
            <Link
              key={dept.id}
              href={`/shop/${dept.slug}`}
              className="dept-card"
              style={{
                '--dept-accent': dept.accentColor,
                '--dept-glow': dept.glowColor,
              } as React.CSSProperties}
            >
              {/* Subtle top ambient glow */}
              <div className="dept-card__ambient" aria-hidden="true" />

              {/* Header Info */}
              <div className="dept-card__header">
                <div className="dept-card__icon" style={{ color: dept.accentColor }}>
                  {dept.icon}
                </div>
                <div className="dept-card__text">
                  <h3 className="dept-card__title">{dept.name}</h3>
                  <p className="dept-card__subtitle">{dept.subtitle}</p>
                </div>
              </div>

              {/* Large Product Visual (Hero Element) */}
              <div className="dept-card__visual">
                <Image
                  src={dept.image}
                  alt={`${dept.name} hardware and products`}
                  width={320}
                  height={240}
                  className="dept-card__img"
                  loading="lazy"
                />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
