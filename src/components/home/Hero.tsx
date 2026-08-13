'use client';

import { useRef, useMemo } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from '@phosphor-icons/react';
import Link from 'next/link';

gsap.registerPlugin(useGSAP, ScrollTrigger);

/**
 * Generate deterministic particle positions so SSR and client match.
 * No Math.random() — positions derived from index.
 */
function getParticlePositions(count: number) {
  const particles: Array<{ x: number; y: number; size: number }> = [];
  for (let i = 0; i < count; i++) {
    // Distribute across a grid with slight offsets from golden-ratio-based hash
    const hash = ((i * 2654435761) >>> 0) / 4294967296; // Knuth multiplicative hash → 0-1
    const hash2 = (((i + 7) * 2654435761) >>> 0) / 4294967296;
    particles.push({
      x: (hash * 100),
      y: (hash2 * 100),
      size: 1.5 + (hash * 1.5), // 1.5–3px
    });
  }
  return particles;
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const particles = useMemo(() => getParticlePositions(20), []);

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
          const { reduceMotion, isDesktop } = context.conditions!;

          if (reduceMotion) {
            // Accessibility: show everything immediately, no animation
            gsap.set('.hero__subtitle, .hero__title-word, .hero__tag, .hero__cta, .hero__corner, .hero__glow', {
              autoAlpha: 1,
              y: 0,
            });
            gsap.set('.hero__particle', { autoAlpha: 0.15 });
            gsap.set('.hero__scan-line', { autoAlpha: 0.4 });
            return;
          }

          // ─── Master Timeline ───
          const tl = gsap.timeline({
            defaults: { duration: 0.8, ease: 'power3.out' },
          });

          // Phase 1: Environment awakens (0s)
          tl.addLabel('env', 0);

          // Background image scale-in
          tl.from('.hero__image', {
            scale: 1.15,
            duration: 2,
            ease: 'power2.out',
          }, 'env');

          // Glow pulse fades in
          tl.to('.hero__glow', {
            autoAlpha: 1,
            scale: 1.1,
            duration: 2,
            ease: 'power2.out',
          }, 'env');

          // HUD corner accents snap in
          tl.to('.hero__corner', {
            autoAlpha: 0.4,
            duration: 0.3,
            stagger: { amount: 0.2, from: 'random' },
            ease: 'power2.out',
          }, 'env+=0.3');

          // Scan-lines sweep
          tl.to('.hero__scan-line--top', {
            autoAlpha: 0.5,
            x: 0,
            duration: 0.6,
            ease: 'power2.out',
          }, 'env+=0.4');

          tl.to('.hero__scan-line--bottom', {
            autoAlpha: 0.3,
            x: 0,
            duration: 0.6,
            ease: 'power2.out',
          }, 'env+=0.5');

          // Phase 2: Particles emerge (0.4s)
          tl.addLabel('particles', 0.4);

          tl.to('.hero__particle', {
            autoAlpha: (i: number) => 0.1 + (i % 5) * 0.06,
            y: () => `${-10 + Math.random() * 5}`,
            duration: 1.2,
            stagger: { amount: 0.6, from: 'random' },
            ease: 'power2.out',
          }, 'particles');

          // Phase 3: Text reveals (0.6s)
          tl.addLabel('text', 0.6);

          // Subtitle slides in
          tl.from('.hero__subtitle', {
            autoAlpha: 0,
            y: 20,
            x: -10,
          }, 'text');

          // Title words reveal from below (clip-path container hides overflow)
          tl.from('.hero__title-word', {
            yPercent: 110,
            duration: 0.9,
            stagger: 0.12,
            ease: 'power4.out',
          }, 'text+=0.15');

          // Phase 4: Tags + CTA (staggered after title)
          tl.addLabel('ui', '>-0.3');

          tl.from('.hero__tag', {
            autoAlpha: 0,
            scale: 0.85,
            y: 12,
            stagger: 0.06,
            duration: 0.5,
            ease: 'back.out(1.7)',
          }, 'ui');

          tl.from('.hero__cta', {
            autoAlpha: 0,
            y: 16,
            duration: 0.6,
          }, 'ui+=0.15');

          // ─── Ambient loops (subtle, low-cost) ───

          // Glow breathes slowly
          gsap.to('.hero__glow', {
            scale: 1.2,
            autoAlpha: 0.7,
            duration: 4,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
          });

          // Scan-line shimmer
          gsap.to('.hero__scan-line--top', {
            autoAlpha: 0.25,
            duration: 2.5,
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
            delay: 2,
          });

          // Particles float gently
          gsap.to('.hero__particle', {
            y: '-=8',
            duration: (i: number) => 3 + (i % 3),
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
            stagger: { amount: 2, from: 'random' },
          });

          // ─── Scroll Parallax ───
          gsap.to('.hero__image', {
            yPercent: isDesktop ? 15 : 8,
            ease: 'none',
            scrollTrigger: {
              trigger: '.hero',
              start: 'top top',
              end: 'bottom top',
              scrub: 1,
            },
          });

          gsap.to('.hero__particles', {
            yPercent: isDesktop ? 25 : 12,
            ease: 'none',
            scrollTrigger: {
              trigger: '.hero',
              start: 'top top',
              end: 'bottom top',
              scrub: 1.5,
            },
          });
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <section className="hero" ref={containerRef}>
      {/* Background */}
      <div className="hero__image-wrap">
        <div
          className="hero__image"
          style={{
            background:
              'linear-gradient(135deg, #0a0c10 0%, #111827 25%, #1a1f2e 50%, #0f172a 75%, #0d1117 100%)',
          }}
        />
        <div className="hero__gradient" />
      </div>

      {/* Glow */}
      <div className="hero__glow" />

      {/* Gaming HUD Corner Accents */}
      <div className="hero__corner hero__corner--tl" />
      <div className="hero__corner hero__corner--tr" />
      <div className="hero__corner hero__corner--bl" />
      <div className="hero__corner hero__corner--br" />

      {/* Scan Lines */}
      <div className="hero__scan-line hero__scan-line--top" />
      <div className="hero__scan-line hero__scan-line--bottom" />

      {/* Particle Grid */}
      <div className="hero__particles">
        {particles.map((p, i) => (
          <div
            key={i}
            className="hero__particle"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: `${p.size}px`,
              height: `${p.size}px`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="hero__content container">
        <div className="hero__subtitle">Naveed Games — Gaming Heaven</div>

        <h1 className="hero__title">
          <span className="hero__title-line">
            <span className="hero__title-word">PLAY</span>
          </span>
          <span className="hero__title-line">
            <span className="hero__title-word">WITHOUT</span>
          </span>
          <span className="hero__title-line">
            <span className="hero__title-word">LIMITS.</span>
          </span>
        </h1>

        <div className="hero__tags">
          <span className="hero__tag">PS5</span>
          <span className="hero__tag">Consoles</span>
          <span className="hero__tag">Gaming PCs</span>
          <span className="hero__tag">VR</span>
          <span className="hero__tag">Racing Sims</span>
        </div>

        <div className="hero__cta">
          <Link href="/shop">
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
