import { Hero } from '@/components/home/Hero';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { CategoryNav } from '@/components/home/CategoryNav';
import { EditorialCampaign } from '@/components/home/EditorialCampaign';
import { Bestsellers } from '@/components/home/Bestsellers';
import { ServiceStrip } from '@/components/home/ServiceStrip';
import { StoreSection } from '@/components/home/StoreSection';

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProducts />
      <CategoryNav />
      <EditorialCampaign />
      <Bestsellers />
      <ServiceStrip />
      <StoreSection />
    </>
  );
}
