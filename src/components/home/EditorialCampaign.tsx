'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from '@phosphor-icons/react';
import Link from 'next/link';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function EditorialCampaign() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add('(prefers-reduced-motion: no-preference)', () => {
        // Subtle parallax on the background
        gsap.to('.editorial__bg-image', {
          yPercent: 20,
          ease: 'none',
          scrollTrigger: {
            trigger: '.editorial',
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        });

        // Text reveal
        gsap.from('.editorial__title', {
          opacity: 0,
          y: 60,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.editorial__content',
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });

        gsap.from('.editorial__cta', {
          opacity: 0,
          y: 30,
          duration: 0.8,
          delay: 0.3,
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
        <div
          className="editorial__bg-image"
          style={{
            background: 'linear-gradient(160deg, #0d1117 0%, #161b22 40%, #1a1f2e 70%, #0d1117 100%)',
          }}
        />
        <div className="editorial__overlay" />
      </div>

      <div className="editorial__content container">
        <h2 className="editorial__title">
          BUILT
          <br />
          TO PLAY.
        </h2>

        <div className="editorial__cta">
          <Link href="/shop/gaming-pcs">
            <Button variant="outline" size="lg">
              Explore Gaming PCs
              <ArrowRight size={16} weight="bold" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
