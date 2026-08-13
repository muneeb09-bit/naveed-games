import type { Brand } from '@/types';

export const brands: Brand[] = [
  {
    id: 'brand-1',
    slug: 'playstation',
    name: 'PlayStation',
    description: 'Sony Interactive Entertainment gaming brand. Home to PS5, DualSense, and exclusive titles.',
    isActive: true,
    sortOrder: 1,
    metaTitle: 'PlayStation Products — Naveed Games',
    metaDescription: 'Shop PlayStation consoles, controllers, games, and accessories. PS5 Pro, PS5 Slim, DualSense Edge, and more at Naveed Games Peshawar.',
  },
  {
    id: 'brand-2',
    slug: 'xbox',
    name: 'Xbox',
    description: 'Microsoft gaming brand. Xbox Series X|S, Game Pass, and cross-platform gaming.',
    isActive: true,
    sortOrder: 2,
    metaTitle: 'Xbox Products — Naveed Games',
    metaDescription: 'Shop Xbox Series X, Series S, Xbox controllers, and games at Naveed Games Peshawar.',
  },
  {
    id: 'brand-3',
    slug: 'nintendo',
    name: 'Nintendo',
    description: 'Iconic Japanese gaming company. Switch, Mario, Zelda, and handheld gaming innovation.',
    isActive: true,
    sortOrder: 3,
    metaTitle: 'Nintendo Products — Naveed Games',
    metaDescription: 'Shop Nintendo Switch 2, Switch OLED, games, and accessories at Naveed Games Peshawar.',
  },
  {
    id: 'brand-4',
    slug: 'dji',
    name: 'DJI',
    description: 'World leader in camera drones and handheld stabilizers. Mini, Air, Mavic, Osmo.',
    isActive: true,
    sortOrder: 4,
    metaTitle: 'DJI Drones & Cameras — Naveed Games',
    metaDescription: 'Shop DJI Mini, Air, Mavic drones and Osmo cameras at Naveed Games Peshawar.',
  },
  {
    id: 'brand-5',
    slug: 'meta',
    name: 'Meta',
    description: 'Mixed reality and VR headsets. Quest 3, Ray-Ban smart glasses, and AI wearables.',
    isActive: true,
    sortOrder: 5,
    metaTitle: 'Meta Quest & VR — Naveed Games',
    metaDescription: 'Shop Meta Quest 3, Quest 3S, Ray-Ban Meta glasses at Naveed Games Peshawar.',
  },
  {
    id: 'brand-6',
    slug: 'traxxas',
    name: 'Traxxas',
    description: 'Premium RC vehicles. X-Maxx, XRT, Rustler, and high-performance hobby-grade cars.',
    isActive: true,
    sortOrder: 6,
    metaTitle: 'Traxxas RC Cars — Naveed Games',
    metaDescription: 'Shop Traxxas XRT, X-Maxx, Rustler, and RC accessories at Naveed Games Peshawar.',
  },
  {
    id: 'brand-7',
    slug: 'logitech',
    name: 'Logitech',
    description: 'Gaming peripherals, racing wheels, and accessories. G923, G Pro, and StreamCam.',
    isActive: true,
    sortOrder: 7,
    metaTitle: 'Logitech Gaming — Naveed Games',
    metaDescription: 'Shop Logitech G923 racing wheels, G Pro peripherals, and gaming accessories at Naveed Games Peshawar.',
  },
  {
    id: 'brand-8',
    slug: 'thrustmaster',
    name: 'Thrustmaster',
    description: 'Professional racing simulation hardware. T300, T-GT, and flight sticks.',
    isActive: true,
    sortOrder: 8,
    metaTitle: 'Thrustmaster Racing — Naveed Games',
    metaDescription: 'Shop Thrustmaster T300, T-GT racing wheels and sim equipment at Naveed Games Peshawar.',
  },
  {
    id: 'brand-9',
    slug: 'sony',
    name: 'Sony',
    description: 'Electronics giant. Audio, displays, cameras, and PlayStation ecosystem.',
    isActive: true,
    sortOrder: 9,
    metaTitle: 'Sony Products — Naveed Games',
    metaDescription: 'Shop Sony headphones, TVs, cameras, and PlayStation products at Naveed Games Peshawar.',
  },
  {
    id: 'brand-10',
    slug: 'turtle-beach',
    name: 'Turtle Beach',
    description: 'Gaming audio specialists. Stealth, Recon, and wireless gaming headsets.',
    isActive: true,
    sortOrder: 10,
    metaTitle: 'Turtle Beach Audio — Naveed Games',
    metaDescription: 'Shop Turtle Beach Stealth, Recon gaming headsets at Naveed Games Peshawar.',
  },
  {
    id: 'brand-11',
    slug: 'samsung',
    name: 'Samsung',
    description: 'Global electronics leader. QLED/OLED TVs, monitors, smartphones, and Galaxy ecosystem.',
    isActive: true,
    sortOrder: 11,
    metaTitle: 'Samsung — Naveed Games',
    metaDescription: 'Shop Samsung TVs, monitors, Galaxy smartphones, and more at Naveed Games Peshawar.',
  },
];

export function getBrandBySlug(slug: string): Brand | undefined {
  return brands.find((b) => b.slug === slug);
}

export function getAllBrandSlugs(): string[] {
  return brands.map((b) => b.slug);
}

export function getActiveBrands(): Brand[] {
  return brands.filter((b) => b.isActive).sort((a, b) => a.sortOrder - b.sortOrder);
}
