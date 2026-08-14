import { Hero } from '@/components/home/Hero';
import { CategoryNav } from '@/components/home/CategoryNav';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { EditorialCampaign } from '@/components/home/EditorialCampaign';
import { Bestsellers } from '@/components/home/Bestsellers';
import { ServiceStrip } from '@/components/home/ServiceStrip';
import { StoreSection } from '@/components/home/StoreSection';

export default function HomePage() {
  return (
    <>
      {/* 01 — Hero */}
      <Hero />

      {/* 02 — Shop by Category */}
      <CategoryNav />

      {/* 03 — New Arrivals */}
      <FeaturedProducts />

      {/* 04 — Promotional Banner */}
      <EditorialCampaign />

      {/* 05 — Trending Products */}
      <Bestsellers />

      {/* 06 — Why Naveed Games (Benefits) */}
      <ServiceStrip />

      {/* 07 — Store Location (Peshawar Showroom) */}
      <StoreSection />
    </>
  );
}
