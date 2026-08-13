'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Sparkle } from '@phosphor-icons/react';
import Link from 'next/link';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function EditorialCampaign() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Parallax effect on PlayStation symbols wallpaper image
        gsap.to('.editorial__bg-img', {
          yPercent: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: '.editorial',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });

        // Content reveal animation
        gsap.from('.editorial__badge, .editorial__title, .editorial__cta', {
          opacity: 0,
          y: 40,
          duration: 0.9,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.editorial__content',
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section className="editorial" ref={sectionRef}>
      <div className="editorial__bg">
        <img
          src="/images/ps5-symbols-banner.png"
          alt="PlayStation Hardware & Glowing Symbols"
          className="editorial__bg-img"
        />
        <div className="editorial__overlay" />
      </div>

      <div className="editorial__content container">
        <div className="editorial__badge">
          <Sparkle size={14} weight="fill" style={{ color: 'var(--accent)' }} />
          <span>Next-Gen Hardware Destination</span>
        </div>

        <h2 className="editorial__title">
          BUILT
          <br />
          TO PLAY.
        </h2>

        <div className="editorial__cta">
          <Link href="/shop">
            <Button variant="primary" size="lg">
              Explore Hardware Catalog
              <ArrowRight size={16} weight="bold" />
            </Button>
          </Link>
          <Link href="/shop/consoles">
            <Button variant="secondary" size="lg">
              Consoles & Accessories
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
