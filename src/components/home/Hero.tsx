'use client';

import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from '@phosphor-icons/react';
import Link from 'next/link';

gsap.registerPlugin(useGSAP, ScrollTrigger);

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: '(min-width: 1024px)',
          isMobile: '(max-width: 1023px)',
          reduceMotion: '(prefers-reduced-motion: reduce)',
        },
        (context) => {
          const { reduceMotion } = context.conditions!;
          if (reduceMotion) return;

          // Hero image subtle scale on load
          gsap.from('.hero__image', {
            scale: 1.15,
            duration: 1.8,
            ease: 'power2.out',
          });

          // Text entrance
          gsap.from('.hero__subtitle', {
            opacity: 0,
            y: 20,
            duration: 0.8,
            delay: 0.3,
            ease: 'power3.out',
          });

          gsap.from('.hero__title', {
            opacity: 0,
            y: 40,
            duration: 1,
            delay: 0.5,
            ease: 'power3.out',
          });

          gsap.from('.hero__tags', {
            opacity: 0,
            y: 20,
            duration: 0.8,
            delay: 0.8,
            ease: 'power3.out',
          });

          gsap.from('.hero__cta', {
            opacity: 0,
            y: 20,
            duration: 0.8,
            delay: 1,
            ease: 'power3.out',
          });

          // Parallax on scroll
          gsap.to('.hero__image', {
            yPercent: 15,
            ease: 'none',
            scrollTrigger: {
              trigger: '.hero',
              start: 'top top',
              end: 'bottom top',
              scrub: 1,
            },
          });
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section className="hero" ref={containerRef}>
      {/* Background image placeholder */}
      <div className="hero__image-wrap">
        <div
          className="hero__image"
          style={{
            background: 'linear-gradient(135deg, #0a0c10 0%, #151820 30%, #1a1f2e 60%, #0d1117 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Product image placeholder — will be replaced with real photography */}
          <div
            style={{
              width: '380px',
              height: '380px',
              background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-display)',
              fontSize: '4rem',
              fontWeight: 900,
              color: 'rgba(255,255,255,0.04)',
              letterSpacing: '-0.04em',
            }}
          >
            PS5
          </div>
        </div>
        <div className="hero__gradient" />
      </div>

      {/* Content */}
      <div className="hero__content container">
        <div className="hero__subtitle">Naveed Games</div>

        <h1 className="hero__title">
          PLAY
          <br />
          WITHOUT
          <br />
          LIMITS.
        </h1>

        <div className="hero__tags">
          <span className="hero__tag">PS5</span>
          <span className="hero__tag">Consoles</span>
          <span className="hero__tag">PC</span>
          <span className="hero__tag">VR</span>
          <span className="hero__tag">Racing</span>
        </div>

        <div className="hero__cta">
          <Link href="/products">
            <Button variant="primary" size="lg">
              Shop the Collection
              <ArrowRight size={16} weight="bold" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
