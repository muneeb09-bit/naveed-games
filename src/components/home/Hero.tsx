'use client';

import { useRef, useMemo, useState, useEffect } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Button } from '@/components/ui/Button';
import { ArrowRight, CaretRight, Sparkle, ShieldCheck, WhatsappLogo } from '@phosphor-icons/react';
import Link from 'next/link';

gsap.registerPlugin(useGSAP, ScrollTrigger);

function getParticlePositions(count: number) {
  const particles: Array<{ x: number; y: number; size: number }> = [];
  for (let i = 0; i < count; i++) {
    const hash = ((i * 2654435761) >>> 0) / 4294967296;
    const hash2 = (((i + 7) * 2654435761) >>> 0) / 4294967296;
    particles.push({
      x: hash * 100,
      y: hash2 * 100,
      size: 1.5 + hash * 1.5,
    });
  }
  return particles;
}

const HERO_FEATURED = [
  {
    slug: 'ps5-pro',
    title: 'PlayStation 5 Pro',
    category: 'Flagship Console',
    price: 'Rs. 249,999',
    badge: 'NEW ARRIVAL',
    image: '/images/products/ps5-pro-1.jpg',
    tagline: '67% More Compute Units • 2TB Custom SSD • PSSR AI Upscaling',
  },
  {
    slug: 'xbox-series-x',
    title: 'Xbox Series X (1TB)',
    category: 'Next-Gen Power',
    price: 'Rs. 164,999',
    badge: 'BESTSELLER',
    image: '/images/products/xbox-series-x-1.jpg',
    tagline: '12 TFLOPS Raw GPU Power • 4K Gaming at 120 FPS',
  },
  {
    slug: 'rtx-4090-pc',
    title: 'Custom RTX 4090 Gaming Rig',
    category: 'Ultra Gaming PC',
    price: 'Rs. 899,999',
    badge: 'EXTREME PERFORMANCE',
    image: '/images/products/pc-1.jpg',
    tagline: 'Intel Core i9 14900K • 64GB DDR5 • Liquid Cooled',
  },
];

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const particles = useMemo(() => getParticlePositions(24), []);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_FEATURED.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: '(min-width: 1024px)',
          reduceMotion: '(prefers-reduced-motion: reduce)',
        },
        (context) => {
          const { reduceMotion } = contextConditions(context);

          if (reduceMotion) {
            gsap.set(
              '.hero__subtitle, .hero__title-word, .hero__tag, .hero__cta, .hero__showcase-card',
              { autoAlpha: 1, y: 0 }
            );
            return;
          }

          const tl = gsap.timeline({
            defaults: { duration: 0.8, ease: 'power3.out' },
          });

          tl.to('.hero__glow', { autoAlpha: 1, scale: 1.1, duration: 1.5 });
          tl.from('.hero__subtitle', { autoAlpha: 0, y: 20 }, 0.2);
          tl.from(
            '.hero__title-word',
            { yPercent: 100, duration: 0.8, stagger: 0.1, ease: 'power4.out' },
            0.3
          );
          tl.from('.hero__tag', { autoAlpha: 0, y: 10, stagger: 0.05 }, 0.6);
          tl.from('.hero__cta', { autoAlpha: 0, y: 15 }, 0.8);
          tl.from('.hero__showcase', { autoAlpha: 0, x: 30, duration: 1 }, 0.4);
        }
      );

      // Custom Gaming Cursor Follower (Desktop only)
      mm.add('(min-width: 1024px)', () => {
        const heroEl = containerRef.current;
        if (!heroEl) return;

        const dot = heroEl.querySelector('.hero__cursor-dot');
        const ring = heroEl.querySelector('.hero__cursor-ring');
        if (!dot || !ring) return;

        const xDotTo = gsap.quickSetter(dot, 'x', 'px');
        const yDotTo = gsap.quickSetter(dot, 'y', 'px');

        const xRingTo = gsap.quickTo(ring, 'x', { duration: 0.3, ease: 'power2.out' });
        const yRingTo = gsap.quickTo(ring, 'y', { duration: 0.3, ease: 'power2.out' });

        const handleMouseMove = (e: MouseEvent) => {
          const rect = heroEl.getBoundingClientRect();
          const relX = e.clientX - rect.left;
          const relY = e.clientY - rect.top;

          xDotTo(relX);
          yDotTo(relY);
          xRingTo(relX);
          yRingTo(relY);
        };

        const handleMouseEnter = () => {
          gsap.to([dot, ring], { autoAlpha: 1, duration: 0.3 });
        };

        const handleMouseLeave = () => {
          gsap.to([dot, ring], { autoAlpha: 0, duration: 0.3 });
        };

        heroEl.addEventListener('mousemove', handleMouseMove);
        heroEl.addEventListener('mouseenter', handleMouseEnter);
        heroEl.addEventListener('mouseleave', handleMouseLeave);

        // Hover scale feedback on interactive elements
        const interactiveItems = heroEl.querySelectorAll('a, button, .hero__tag, .hero__showcase-card');
        interactiveItems.forEach((item) => {
          item.addEventListener('mouseenter', () => {
            gsap.to(ring, { scale: 1.6, borderColor: 'rgba(59, 130, 246, 0.9)', duration: 0.2 });
            gsap.to(dot, { scale: 1.4, backgroundColor: '#60a5fa', duration: 0.2 });
          });
          item.addEventListener('mouseleave', () => {
            gsap.to(ring, { scale: 1, borderColor: 'rgba(59, 130, 246, 0.4)', duration: 0.2 });
            gsap.to(dot, { scale: 1, backgroundColor: 'var(--accent)', duration: 0.2 });
          });
        });

        return () => {
          heroEl.removeEventListener('mousemove', handleMouseMove);
          heroEl.removeEventListener('mouseenter', handleMouseEnter);
          heroEl.removeEventListener('mouseleave', handleMouseLeave);
        };
      });
    },
    { scope: containerRef }
  );

  function contextConditions(context: gsap.Context) {
    return context.conditions || { reduceMotion: false };
  }

  const current = HERO_FEATURED[activeSlide];

  return (
    <section className="hero" ref={containerRef}>
      {/* Subtle Custom Gaming Cursor */}
      <div className="hero__cursor-ring" />
      <div className="hero__cursor-dot" />

      {/* Background Gradients & Glow */}
      <div className="hero__image-wrap">
        <div className="hero__image" />
        <div className="hero__gradient" />
      </div>

      <div className="hero__glow" />

      {/* Ambient Particle Grid */}
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

      {/* Hero 2-Column Content */}
      <div className="hero__content container">
        <div className="hero__grid">
          {/* Left Main Copy */}
          <div className="hero__left">
            <div className="hero__subtitle">
              <Sparkle size={14} weight="fill" style={{ color: 'var(--accent)' }} />
              <span>Naveed Games — Premier Hardware Destination</span>
            </div>

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

            <p className="hero__description">
              Peshawar&apos;s leading gaming store. Genuine PS5 Pro, Xbox Series X, Custom Gaming PCs, VR & Accessories with nationwide Cash on Delivery.
            </p>

            <div className="hero__tags">
              <span className="hero__tag">PS5 Pro</span>
              <span className="hero__tag">Xbox Series X</span>
              <span className="hero__tag">Custom RTX PCs</span>
              <span className="hero__tag">Meta Quest VR</span>
              <span className="hero__tag">Racing Simulators</span>
            </div>

            <div className="hero__cta">
              <Link href="/shop">
                <Button variant="primary" size="lg">
                  Shop Storefront
                  <ArrowRight size={16} weight="bold" />
                </Button>
              </Link>
              <a
                href="https://wa.me/923339348891"
                target="_blank"
                rel="noopener noreferrer"
                className="button button--secondary button--lg"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                <WhatsappLogo size={18} weight="fill" style={{ color: 'var(--whatsapp)' }} />
                Instant Inquiry
              </a>
            </div>

            {/* Trust Badges */}
            <div className="hero__trust-strip">
              <div className="hero__trust-item">
                <ShieldCheck size={16} weight="fill" style={{ color: 'var(--accent)' }} />
                <span>100% Genuine Products</span>
              </div>
              <div className="hero__trust-item">
                <Sparkle size={16} weight="fill" style={{ color: 'var(--accent)' }} />
                <span>Official Warranty & Cash on Delivery</span>
              </div>
            </div>
          </div>

          {/* Right Column Showcase Banner Card */}
          <div className="hero__showcase">
            <div className="hero__showcase-card">
              <div className="hero__showcase-badge">{current.badge}</div>

              <div className="hero__showcase-img-wrap">
                <img src={current.image} alt={current.title} className="hero__showcase-img" />
              </div>

              <div className="hero__showcase-details">
                <span className="hero__showcase-cat">{current.category}</span>
                <h3 className="hero__showcase-title">{current.title}</h3>
                <p className="hero__showcase-tagline">{current.tagline}</p>
                <div className="hero__showcase-footer">
                  <div className="hero__showcase-price">{current.price}</div>
                  <Link href={`/products/${current.slug}`} className="hero__showcase-btn">
                    <span>Explore Hardware</span>
                    <CaretRight size={14} weight="bold" />
                  </Link>
                </div>
              </div>

              {/* Dots Indicator */}
              <div className="hero__showcase-dots">
                {HERO_FEATURED.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`hero__showcase-dot ${idx === activeSlide ? 'hero__showcase-dot--active' : ''}`}
                    onClick={() => setActiveSlide(idx)}
                    aria-label={`Slide ${idx + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
