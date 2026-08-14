import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Lightning } from '@phosphor-icons/react/dist/ssr';

export function EditorialCampaign() {
  return (
    <section className="promo-clean-section">
      <div className="container">
        <div className="promo-clean-banner">
          {/* Glowing PS5 Symbols Background Image */}
          <div className="promo-clean-banner__bg-wrap" aria-hidden="true">
            <Image
              src="/images/banners/ps5-symbols-banner.jpg"
              alt="PlayStation 5 Console and Glowing Symbols"
              fill
              className="promo-clean-banner__bg-img"
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
            <div className="promo-clean-banner__overlay" />
          </div>

          <div className="promo-clean-banner__glow" aria-hidden="true" />
          
          <div className="promo-clean-banner__content">
            <div className="promo-clean-banner__badge">
              <Lightning size={14} weight="fill" />
              <span>OFFICIAL FLAGSHIP HARDWARE</span>
            </div>

            <h2 className="promo-clean-banner__title">BUILT TO PLAY.</h2>
            <p className="promo-clean-banner__desc">
              High-performance consoles, custom enthusiast rigs, and precision peripherals engineered for serious gaming.
            </p>

            <div className="promo-clean-banner__actions">
              <Link href="/shop" className="btn-primary promo-clean-banner__btn">
                <span>EXPLORE HARDWARE</span>
                <ArrowRight size={16} weight="bold" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
