import type { Category } from '@/types';

export const categories: Category[] = [
  {
    id: 'cat-1',
    slug: 'consoles',
    name: 'Consoles',
    description: 'PS5, Xbox Series X/S, Nintendo Switch and more',
    image: '/images/categories/consoles.jpg',
    icon: 'GameController',
    productCount: 12,
    subcategories: [
      { id: 'sub-1', slug: 'ps5', name: 'PS5', productCount: 5 },
      { id: 'sub-2', slug: 'xbox', name: 'Xbox', productCount: 4 },
      { id: 'sub-3', slug: 'nintendo-switch', name: 'Nintendo Switch', productCount: 3 },
    ],
  },
  {
    id: 'cat-2',
    slug: 'gaming-pcs',
    name: 'Gaming PCs',
    description: 'Custom builds, liquid cooled systems, RTX-powered rigs',
    image: '/images/categories/gaming-pcs.jpg',
    icon: 'Desktop',
    productCount: 8,
    subcategories: [
      { id: 'sub-4', slug: 'custom-pcs', name: 'Custom PCs', productCount: 4 },
      { id: 'sub-5', slug: 'gaming-laptops', name: 'Gaming Laptops', productCount: 4 },
    ],
  },
  {
    id: 'cat-3',
    slug: 'racing-simulators',
    name: 'Racing',
    description: 'Steering wheels, pedals, racing rigs and simulators',
    image: '/images/categories/racing.jpg',
    icon: 'SteeringWheel',
    productCount: 6,
    subcategories: [
      { id: 'sub-6', slug: 'steering-wheels', name: 'Steering Wheels', productCount: 3 },
      { id: 'sub-7', slug: 'pedals', name: 'Pedals', productCount: 2 },
      { id: 'sub-8', slug: 'racing-rigs', name: 'Racing Rigs', productCount: 1 },
    ],
  },
  {
    id: 'cat-4',
    slug: 'handhelds-vr',
    name: 'Handhelds & VR',
    description: 'Steam Deck, ROG Ally, Meta Quest and portable gaming',
    image: '/images/categories/handhelds.jpg',
    icon: 'DeviceMobile',
    productCount: 7,
    subcategories: [
      { id: 'sub-9', slug: 'handhelds', name: 'Handhelds', productCount: 4 },
      { id: 'sub-10', slug: 'vr-headsets', name: 'VR Headsets', productCount: 3 },
    ],
  },
  {
    id: 'cat-5',
    slug: 'games',
    name: 'Games',
    description: 'PS5, PS4, Nintendo Switch — new and pre-owned titles',
    image: '/images/categories/games.jpg',
    icon: 'Disc',
    productCount: 20,
    subcategories: [
      { id: 'sub-11', slug: 'ps5-games', name: 'PS5 Games', productCount: 8 },
      { id: 'sub-12', slug: 'ps4-games', name: 'PS4 Games', productCount: 5 },
      { id: 'sub-13', slug: 'switch-games', name: 'Switch Games', productCount: 4 },
      { id: 'sub-14', slug: 'pre-owned', name: 'Pre-owned', productCount: 3 },
    ],
  },
  {
    id: 'cat-6',
    slug: 'monitors',
    name: 'Monitors',
    description: '4K, high refresh rate, OLED and QD-OLED displays',
    image: '/images/categories/monitors.jpg',
    icon: 'Monitor',
    productCount: 6,
  },
  {
    id: 'cat-7',
    slug: 'audio',
    name: 'Audio',
    description: 'Gaming headsets, wireless audio, speakers',
    image: '/images/categories/audio.jpg',
    icon: 'Headphones',
    productCount: 8,
  },
  {
    id: 'cat-8',
    slug: 'chairs-setup',
    name: 'Chairs & Setup',
    description: 'Gaming chairs, desks and setup accessories',
    image: '/images/categories/chairs.jpg',
    icon: 'Armchair',
    productCount: 5,
  },
  {
    id: 'cat-9',
    slug: 'collectibles',
    name: 'Collectibles',
    description: 'Action figures, statues, limited editions',
    image: '/images/categories/collectibles.jpg',
    icon: 'Trophy',
    productCount: 4,
  },
  {
    id: 'cat-10',
    slug: 'rc-drones',
    name: 'RC & Drones',
    description: 'Remote control vehicles and camera drones',
    image: '/images/categories/drones.jpg',
    icon: 'Drone',
    productCount: 3,
  },
  {
    id: 'cat-11',
    slug: 'smart-tech',
    name: 'Smart Tech',
    description: 'Smart watches, speakers and connected devices',
    image: '/images/categories/smart-tech.jpg',
    icon: 'Watch',
    productCount: 4,
  },
];

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getAllCategorySlugs(): string[] {
  return categories.map((c) => c.slug);
}
