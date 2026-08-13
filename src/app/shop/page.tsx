import type { Metadata } from 'next';
import { Suspense } from 'react';
import { ShopClient } from '@/components/shop/ShopClient';

export const metadata: Metadata = {
  title: 'Shop All Products — Naveed Games',
  description:
    'Browse our complete collection of gaming consoles, PCs, VR, drones, RC cars, audio, TVs, and more. Cash on Delivery across Pakistan.',
  openGraph: {
    title: 'Shop — Naveed Games',
    description: 'Premium gaming hardware. Consoles, PCs, VR, Racing Sims, Games and more.',
  },
};

export default function ShopPage() {
  return (
    <div className="shop-page">
      <div className="container">
        <div className="shop-page__header">
          <h1 className="shop-page__title">Shop</h1>
          <p className="shop-page__subtitle">
            Browse our entire collection of gaming hardware, software, and accessories.
          </p>
        </div>
      </div>
      <div className="container">
        <Suspense>
          <ShopClient />
        </Suspense>
      </div>
    </div>
  );
}
