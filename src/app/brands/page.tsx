import Link from 'next/link';
import type { Metadata } from 'next';
import { CaretRight, Sparkle, SealCheck } from '@phosphor-icons/react/dist/ssr';

export const metadata: Metadata = {
  title: 'Official Brands Directory — Naveed Games',
  description: 'Explore official hardware brands by category: PlayStation, Xbox, Nintendo, DJI, Meta, Traxxas, Logitech and more.',
};

const BRAND_GROUPS = [
  {
    title: 'Gaming Hardware & Consoles',
    description: 'Official flagship consoles, controllers, and exclusive titles',
    brands: [
      { name: 'PlayStation', slug: 'playstation', desc: 'PS5 Pro, PS5 Slim, DualSense Edge & PS VR2', count: '14 Products' },
      { name: 'Xbox', slug: 'xbox', desc: 'Xbox Series X/S, Wireless Controllers & Accessories', count: '10 Products' },
      { name: 'Nintendo', slug: 'nintendo', desc: 'Nintendo Switch 2, OLED, Lite & Games', count: '8 Products' },
    ],
  },
  {
    title: 'Creator Tech & Smart Devices',
    description: 'Drones, gimbals, smart glasses, phones & laptops',
    brands: [
      { name: 'DJI', slug: 'dji', desc: 'Mini, Air, Mavic Drones & Osmo Cameras', count: '6 Products' },
      { name: 'Meta', slug: 'meta', desc: 'Meta Quest 3, Quest 3S & Ray-Ban Meta Smart Glasses', count: '5 Products' },
      { name: 'Samsung', slug: 'samsung', desc: 'Galaxy Series & QLED Displays', count: '4 Products' },
      { name: 'Huawei', slug: 'huawei', desc: 'Huawei MateBook & Smart Devices', count: '3 Products' },
      { name: 'Lenovo', slug: 'lenovo', desc: 'Lenovo Legion Go Gaming Handheld', count: '2 Products' },
    ],
  },
  {
    title: 'Gaming Accessories & Audio',
    description: 'Pro headsets, racing wheels, controllers & desks',
    brands: [
      { name: 'Sony', slug: 'sony', desc: 'Pulse 3D, Inzone Headsets & Audio', count: '5 Products' },
      { name: 'JBL', slug: 'jbl', desc: 'Quantum Gaming Headsets & Speakers', count: '4 Products' },
      { name: 'Turtle Beach', slug: 'turtle-beach', desc: 'Stealth Pro & Gaming Headsets', count: '3 Products' },
      { name: 'Logitech', slug: 'logitech', desc: 'G923 Racing Wheels & Gaming Gear', count: '6 Products' },
      { name: 'PXN', slug: 'pxn', desc: 'V9/V10 Racing Wheels & Pedals', count: '3 Products' },
      { name: 'Thrustmaster', slug: 'thrustmaster', desc: 'T300 RS & Racing Simulators', count: '4 Products' },
    ],
  },
  {
    title: 'Hobby & RC Vehicles',
    description: 'Extreme performance hobby-grade RC cars and trucks',
    brands: [
      { name: 'Traxxas', slug: 'traxxas', desc: 'XRT, X-Maxx, Raptor & Rustler RC Cars', count: '5 Products' },
    ],
  },
];

export default function BrandsDirectoryPage() {
  return (
    <div className="section">
      <div className="container">
        {/* Header */}
        <div style={{ marginBottom: '48px', maxWidth: '640px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              marginBottom: '12px',
            }}
          >
            <Sparkle size={14} weight="fill" />
            <span>Official Brand Partners</span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              fontWeight: 900,
              color: 'var(--white)',
              lineHeight: 1.1,
              marginBottom: '16px',
            }}
          >
            Brand Discovery Directory
          </h1>

          <p style={{ color: 'var(--muted-light)', fontSize: '0.9375rem', lineHeight: 1.6 }}>
            Browse authentic gaming hardware, creator tech, and racing gear grouped by department. 100% genuine products with official warranty across Pakistan.
          </p>
        </div>

        {/* Brand Groups */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '56px' }}>
          {BRAND_GROUPS.map((group) => (
            <div key={group.title}>
              <div style={{ borderBottom: '1px solid var(--border-subtle)', paddingBottom: '16px', marginBottom: '24px' }}>
                <h2 style={{ fontSize: '1.375rem', fontWeight: 800, color: 'var(--white)', marginBottom: '4px' }}>
                  {group.title}
                </h2>
                <p style={{ fontSize: '0.8125rem', color: 'var(--muted)' }}>
                  {group.description}
                </p>
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                  gap: '20px',
                }}
              >
                {group.brands.map((brand) => (
                  <Link
                    key={brand.slug}
                    href={`/brand/${brand.slug}`}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      background: 'rgba(15, 20, 30, 0.75)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      borderRadius: '12px',
                      padding: '24px',
                      textDecoration: 'none',
                      transition: 'all 0.2s ease',
                    }}
                    className="brand-directory-card"
                  >
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                        <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--white)' }}>
                          {brand.name}
                        </span>
                        <SealCheck size={18} weight="fill" style={{ color: 'var(--accent)' }} />
                      </div>
                      <p style={{ fontSize: '0.8125rem', color: 'var(--muted)', lineHeight: 1.5, marginBottom: '20px' }}>
                        {brand.desc}
                      </p>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                      <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--muted-light)' }}>
                        {brand.count}
                      </span>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '0.75rem', fontWeight: 700, color: 'var(--accent)' }}>
                        <span>Explore</span>
                        <CaretRight size={12} weight="bold" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
