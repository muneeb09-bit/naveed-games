'use client';

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShieldCheck, Truck, Sparkle } from '@phosphor-icons/react';

export function Hero() {
  return (
    <section className="hero-clean">
      {/* Subtle Ambient Radial Lighting */}
      <div className="hero-clean__bg-ambient" aria-hidden="true" />

      <div className="container hero-clean__container">
        {/* Left Content Column */}
        <div className="hero-clean__content">
          <div className="hero-clean__badge">
            <Sparkle size={14} weight="fill" />
            <span>Official Gaming & Creator Hardware</span>
          </div>

          <h1 className="hero-clean__title">
            PLAY WITHOUT <span className="hero-clean__highlight">LIMITS.</span>
          </h1>

          <p className="hero-clean__desc">
            Pakistan&apos;s premier destination for authentic PlayStation, Xbox, custom high-performance PC rigs, VR systems, and creator tech with verified local warranty.
          </p>

          <div className="hero-clean__actions">
            <Link href="/shop" className="btn-primary hero-clean__btn-primary">
              <span>SHOP NOW</span>
              <ArrowRight size={16} weight="bold" />
            </Link>
            <Link href="/deals" className="btn-secondary hero-clean__btn-secondary">
              VIEW DEALS
            </Link>
          </div>

          {/* Clean Trust Pillars */}
          <div className="hero-clean__trust">
            <div className="hero-clean__trust-item">
              <ShieldCheck size={18} weight="fill" className="hero-clean__trust-icon" />
              <span>100% Genuine Stock</span>
            </div>
            <div className="hero-clean__trust-item">
              <Truck size={18} weight="fill" className="hero-clean__trust-icon" />
              <span>Express Delivery in Pakistan</span>
            </div>
          </div>
        </div>

        {/* Right Hardware Visual Column */}
        <div className="hero-clean__visual">
          <div className="hero-clean__visual-card">
            <div className="hero-clean__visual-glow" aria-hidden="true" />
            <Image
              src="/images/products/ps5-pro-1.jpg"
              alt="PlayStation 5 Pro Console"
              width={560}
              height={560}
              className="hero-clean__visual-img"
              priority
            />
            <div className="hero-clean__visual-caption">
              <div className="hero-clean__caption-info">
                <span className="hero-clean__caption-tag">NOW AVAILABLE</span>
                <span className="hero-clean__caption-name">PlayStation 5 Pro · 2TB SSD</span>
              </div>
              <Link href="/product/ps5-pro-2tb-console" className="hero-clean__caption-link">
                Explore →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
