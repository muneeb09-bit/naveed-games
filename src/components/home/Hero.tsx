'use client';

import { useRef, useMemo, useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, CaretRight, Sparkle, MagnifyingGlass, GameController, Lightning } from '@phosphor-icons/react';
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
    badge: 'FLAGSHIP GAMING',
    image: '/images/products/ps5-pro-1.jpg',
    tagline: '67% More Compute Units • 2TB Custom SSD • PSSR AI Upscaling',
    theme: 'ps',
  },
  {
    slug: 'dji-mini-4-pro-fly-more-combo',
    title: 'DJI Mini 4 Pro (Fly More Combo)',
    category: 'Aerial Creator Studio',
    price: 'Rs. 314,999',
    badge: 'DRONE INNOVATION',
    image: '/images/products/dji-mini-4-pro-1.jpg',
    tagline: 'Under 249g • 4K/60fps HDR • Omnidirectional Sensing • RC 2 Screen',
    theme: 'ps',
  },
  {
    slug: 'meta-quest-3-512gb',
    title: 'Meta Quest 3 (512GB)',
    category: 'Spatial Mixed Reality',
    price: 'Rs. 174,999',
    badge: 'SMART SPATIAL TECH',
    image: '/images/products/meta-quest-3-1.jpg',
    tagline: '4K+ Infinite Display • Snapdragon XR2 Gen 2 • Full-Color Passthrough',
    theme: 'ps',
  },
  {
    slug: 'traxxas-xrt-8s-brushless-race-truck',
    title: 'Traxxas XRT 8S (60+ MPH)',
    category: 'Extreme 4WD Brushless',
    price: 'Rs. 369,999',
    badge: 'EXTREME RC MONSTER',
    image: '/images/products/traxxas-xrt-1.jpg',
    tagline: '8S Velineon 1200XL Power • All-Metal Drivetrain • 60+ MPH Top Speed',
    theme: 'xbox',
  },
];

export function Hero() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const particles = useMemo(() => getParticlePositions(24), []);
  const [activeSlide, setActiveSlide] = useState(0);
  const [consoleMode, setConsoleMode] = useState<'ps' | 'xbox'>('ps');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => {
        const next = (prev + 1) % HERO_FEATURED.length;
        setConsoleMode(HERO_FEATURED[next].theme as 'ps' | 'xbox');
        return next;
      });
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleSearchSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      router.push('/shop');
    }
  };

  const navigateToSearch = (term: string) => {
    router.push(`/shop?search=${encodeURIComponent(term)}`);
  };

  useGSAP(
    () => {
      const heroEl = containerRef.current;
      if (!heroEl) return;

      const mm = gsap.matchMedia();

      mm.add(
        {
          isDesktop: '(min-width: 1024px)',
          reduceMotion: '(prefers-reduced-motion: reduce)',
        },
        (context) => {
          const { reduceMotion } = context.conditions || {};

          if (reduceMotion) {
            gsap.set(
              '.hero__subtitle, .hero__title-word, .hero__search-form, .hero__showcase-card',
              { autoAlpha: 1, y: 0 }
            );
            return;
          }

          // Main Entrance Timeline
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
          tl.from('.hero__search-form', { autoAlpha: 0, y: 15 }, 0.6);
          tl.from('.hero__showcase', { autoAlpha: 0, x: 30, duration: 1 }, 0.4);

          // Ambient floating loop for PlayStation △ ◯ ✕ ▢ and Xbox symbols
          gsap.to('.hero__ps-symbol', {
            y: 'random(-15, 15)',
            rotation: 'random(-25, 25)',
            duration: 'random(5, 9)',
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            stagger: { amount: 2, from: 'random' },
          });
        }
      );

      // Custom PS5 DualSense Controller Cursor & Physics (Desktop only)
      mm.add('(min-width: 1024px)', () => {
        const controller = heroEl.querySelector('.hero__ps5-cursor') as HTMLElement;
        const leftStick = heroEl.querySelector('.hero__ps5-stick--left') as HTMLElement;
        const rightStick = heroEl.querySelector('.hero__ps5-stick--right') as HTMLElement;
        const shockwave = heroEl.querySelector('.hero__ps5-shockwave') as HTMLElement;
        const symbols = Array.from(heroEl.querySelectorAll<HTMLElement>('.hero__ps-symbol'));
        if (!controller) return;

        const xTo = gsap.quickTo(controller, 'x', { duration: 0.18, ease: 'power2.out' });
        const yTo = gsap.quickTo(controller, 'y', { duration: 0.18, ease: 'power2.out' });
        const rotTo = gsap.quickTo(controller, 'rotation', { duration: 0.35, ease: 'power2.out' });
        const tiltXTo = gsap.quickTo(controller, 'rotateX', { duration: 0.3, ease: 'power2.out' });
        const tiltYTo = gsap.quickTo(controller, 'rotateY', { duration: 0.3, ease: 'power2.out' });

        // Analog stick deflections
        const stickLeftXTo = leftStick ? gsap.quickTo(leftStick, 'x', { duration: 0.2, ease: 'power2.out' }) : null;
        const stickLeftYTo = leftStick ? gsap.quickTo(leftStick, 'y', { duration: 0.2, ease: 'power2.out' }) : null;
        const stickRightXTo = rightStick ? gsap.quickTo(rightStick, 'x', { duration: 0.2, ease: 'power2.out' }) : null;
        const stickRightYTo = rightStick ? gsap.quickTo(rightStick, 'y', { duration: 0.2, ease: 'power2.out' }) : null;

        // Symbols magnetic repellent
        const symbolToX = symbols.map((s) => gsap.quickTo(s, 'x', { duration: 0.7, ease: 'power2.out' }));
        const symbolToY = symbols.map((s) => gsap.quickTo(s, 'y', { duration: 0.7, ease: 'power2.out' }));

        let lastX = 0;
        let lastY = 0;
        let lastTime = performance.now();

        const handleMouseMove = (e: MouseEvent) => {
          const rect = heroEl.getBoundingClientRect();
          const relX = e.clientX - rect.left;
          const relY = e.clientY - rect.top;

          const now = performance.now();
          const dt = Math.max(now - lastTime, 16);
          const vx = ((relX - lastX) / dt) * 16;
          const vy = ((relY - lastY) / dt) * 16;
          lastX = relX;
          lastY = relY;
          lastTime = now;

          // Controller position
          xTo(relX);
          yTo(relY);

          // 3D Banking & Tilt physics based on movement vector
          const targetRot = Math.max(Math.min(vx * 1.4, 20), -20);
          const targetTiltY = Math.max(Math.min(vx * 1.8, 25), -25);
          const targetTiltX = Math.max(Math.min(-vy * 1.8, 25), -25);

          rotTo(targetRot);
          tiltYTo(targetTiltY);
          tiltXTo(targetTiltX);

          // Analog sticks shift in motion direction
          const stickDx = Math.max(Math.min(vx * 0.4, 3), -3);
          const stickDy = Math.max(Math.min(vy * 0.4, 3), -3);
          if (stickLeftXTo && stickLeftYTo) {
            stickLeftXTo(stickDx);
            stickLeftYTo(stickDy);
          }
          if (stickRightXTo && stickRightYTo) {
            stickRightXTo(stickDx);
            stickRightYTo(stickDy);
          }

          // Dynamic Cursor Repel + Glow Reaction on PlayStation & Xbox Symbols
          symbols.forEach((symbol, idx) => {
            const symRect = symbol.getBoundingClientRect();
            const symCenterX = symRect.left + symRect.width / 2 - rect.left;
            const symCenterY = symRect.top + symRect.height / 2 - rect.top;

            const dx = relX - symCenterX;
            const dy = relY - symCenterY;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < 280) {
              const power = (1 - dist / 280) * 35;
              const pushX = -(dx / dist) * power;
              const pushY = -(dy / dist) * power;
              symbolToX[idx](pushX);
              symbolToY[idx](pushY);
              gsap.to(symbol, { opacity: 0.8, scale: 1.15, duration: 0.3 });
            } else {
              symbolToX[idx](0);
              symbolToY[idx](0);
              gsap.to(symbol, { opacity: 0.4, scale: 1, duration: 0.6 });
            }
          });
        };

        const handleMouseEnter = () => {
          gsap.to(controller, { autoAlpha: 1, scale: 1, duration: 0.3 });
        };

        const handleMouseLeave = () => {
          gsap.to(controller, { autoAlpha: 0, scale: 0.8, duration: 0.3 });
          symbols.forEach((_, idx) => {
            symbolToX[idx](0);
            symbolToY[idx](0);
          });
        };

        // DualSense Haptic Trigger / Click feedback
        const handleMouseDown = () => {
          gsap.to(controller, { scale: 0.88, duration: 0.1, ease: 'power2.out' });
          if (shockwave) {
            gsap.fromTo(
              shockwave,
              { scale: 0.4, opacity: 0.9 },
              { scale: 2.2, opacity: 0, duration: 0.45, ease: 'power2.out' }
            );
          }
        };

        const handleMouseUp = () => {
          gsap.to(controller, { scale: 1, duration: 0.3, ease: 'back.out(2)' });
        };

        heroEl.addEventListener('mousemove', handleMouseMove);
        heroEl.addEventListener('mouseenter', handleMouseEnter);
        heroEl.addEventListener('mouseleave', handleMouseLeave);
        heroEl.addEventListener('mousedown', handleMouseDown);
        heroEl.addEventListener('mouseup', handleMouseUp);

        // Hover lock-on feedback on interactive elements
        const interactiveItems = heroEl.querySelectorAll('a, button, input, .hero__showcase-card, .hero__mode-btn, .hero__search-pill');
        interactiveItems.forEach((item) => {
          item.addEventListener('mouseenter', () => {
            controller.classList.add('hero__ps5-cursor--target-lock');
            gsap.to(controller, { scale: 1.18, duration: 0.25, ease: 'back.out(1.8)' });
          });
          item.addEventListener('mouseleave', () => {
            controller.classList.remove('hero__ps5-cursor--target-lock');
            gsap.to(controller, { scale: 1, duration: 0.25, ease: 'power2.out' });
          });
        });

        // 3D Parallax Tilt Effect on Showcase Card
        const card = heroEl.querySelector('.hero__showcase-card') as HTMLElement;
        if (card) {
          const handleTilt = (e: MouseEvent) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            gsap.to(card, {
              rotateY: (x / rect.width) * 14,
              rotateX: -(y / rect.height) * 14,
              duration: 0.4,
              ease: 'power2.out',
            });
          };

          const resetTilt = () => {
            gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.6, ease: 'power2.out' });
          };

          card.addEventListener('mousemove', handleTilt);
          card.addEventListener('mouseleave', resetTilt);
        }

        return () => {
          heroEl.removeEventListener('mousemove', handleMouseMove);
          heroEl.removeEventListener('mouseenter', handleMouseEnter);
          heroEl.removeEventListener('mouseleave', handleMouseLeave);
          heroEl.removeEventListener('mousedown', handleMouseDown);
          heroEl.removeEventListener('mouseup', handleMouseUp);
        };
      });
    },
    { scope: containerRef }
  );

  const switchTheme = (mode: 'ps' | 'xbox') => {
    setConsoleMode(mode);
    const accentColor = mode === 'ps' ? '#3b82f6' : '#22c55e';
    const glowColor = mode === 'ps' ? 'rgba(59, 130, 246, 0.18)' : 'rgba(34, 197, 94, 0.18)';

    gsap.to('.hero__glow', {
      background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
      duration: 0.6,
    });
  };

  const current = HERO_FEATURED[activeSlide];

  return (
    <section className={`hero hero--${consoleMode}`} ref={containerRef}>
      {/* Interactive PS5 DualSense Controller Companion Cursor */}
      <div className="hero__ps5-cursor" aria-hidden="true">
        <div className="hero__ps5-shockwave" />
        <svg
          className="hero__ps5-svg"
          viewBox="0 0 54 38"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter id="ps5-glow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="1.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <radialGradient id="ps5-body-grad" cx="50%" cy="40%" r="60%">
              <stop offset="0%" stopColor="#1e242e" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#0c0f14" stopOpacity="0.9" />
            </radialGradient>
          </defs>

          {/* L2 / R2 Trigger Bumpers */}
          <path
            d="M 12 5 C 15 4 17 5 18 6"
            stroke="rgba(255, 255, 255, 0.5)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M 42 5 C 39 4 37 5 36 6"
            stroke="rgba(255, 255, 255, 0.5)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* DualSense Main Chassis Silhouette */}
          <path
            d="M 12 7 C 18 7 22 10 27 10 C 32 10 36 7 42 7 C 49 7 52 14 50 25 C 48 33 43 35 38 31 C 35 28 33 22 27 22 C 21 22 19 28 16 31 C 11 35 6 33 4 25 C 2 14 5 7 12 7 Z"
            fill="url(#ps5-body-grad)"
            stroke="rgba(255, 255, 255, 0.28)"
            strokeWidth="1.1"
          />

          {/* Touchpad Plate */}
          <rect
            x="20.5"
            y="9"
            width="13"
            height="7"
            rx="1.5"
            fill="rgba(255, 255, 255, 0.08)"
            stroke="rgba(255, 255, 255, 0.16)"
            strokeWidth="0.8"
          />

          {/* Signature DualSense Glowing Lightbar Strip */}
          <path
            className="hero__ps5-lightbar"
            d="M 19 11.5 Q 27 15 35 11.5"
            fill="none"
            stroke="var(--hero-accent, #3b82f6)"
            strokeWidth="1.6"
            strokeLinecap="round"
            filter="url(#ps5-glow)"
          />

          {/* D-Pad (Left Directional) */}
          <path
            d="M 13 14 h 2 v 2 h -2 v 2 h -2 v -2 h -2 v -2 h 2 v -2 h 2 z"
            fill="rgba(255, 255, 255, 0.45)"
          />

          {/* PlayStation Action Buttons (Right: △ ◯ ✕ ▢) */}
          {/* Triangle △ */}
          <polygon points="41,12 42.5,14.5 39.5,14.5" fill="none" stroke="#00f0ff" strokeWidth="0.75" />
          {/* Circle ◯ */}
          <circle cx="43.8" cy="15.8" r="1.1" fill="none" stroke="#f59e0b" strokeWidth="0.75" />
          {/* Cross ✕ */}
          <line x1="40" y1="17.2" x2="42" y2="19.2" stroke="#3b82f6" strokeWidth="0.75" />
          <line x1="42" y1="17.2" x2="40" y2="19.2" stroke="#3b82f6" strokeWidth="0.75" />
          {/* Square ▢ */}
          <rect x="37.8" y="14.8" width="1.8" height="1.8" fill="none" stroke="#ec4899" strokeWidth="0.75" />

          {/* Left Movable Analog Thumbstick */}
          <g className="hero__ps5-stick hero__ps5-stick--left">
            <circle cx="19.5" cy="22" r="4.2" fill="#0d1015" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="0.9" />
            <circle cx="19.5" cy="22" r="2.3" fill="#242c38" />
            <circle cx="19.5" cy="22" r="0.8" fill="rgba(255, 255, 255, 0.6)" />
          </g>

          {/* Right Movable Analog Thumbstick */}
          <g className="hero__ps5-stick hero__ps5-stick--right">
            <circle cx="34.5" cy="22" r="4.2" fill="#0d1015" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="0.9" />
            <circle cx="34.5" cy="22" r="2.3" fill="#242c38" />
            <circle cx="34.5" cy="22" r="0.8" fill="rgba(255, 255, 255, 0.6)" />
          </g>

          {/* Center PS Home Indicator Dot */}
          <circle cx="27" cy="18.5" r="0.9" fill="rgba(255, 255, 255, 0.7)" />
        </svg>

        {/* Reticle Target HUD Corners (Active on Hover) */}
        <div className="hero__ps5-reticle">
          <span className="hero__ps5-bracket hero__ps5-bracket--tl" />
          <span className="hero__ps5-bracket hero__ps5-bracket--tr" />
          <span className="hero__ps5-bracket hero__ps5-bracket--bl" />
          <span className="hero__ps5-bracket hero__ps5-bracket--br" />
        </div>
      </div>

      {/* Background Gradients & Glow */}
      <div className="hero__image-wrap">
        <div className="hero__image" />
        <div className="hero__gradient" />
      </div>

      <div className="hero__glow" />

      {/* Floating PlayStation & Xbox Sacred Symbols (Cursor-Interactive) */}
      <div className="hero__symbols-layer">
        {/* PlayStation Triangle △ (Repositioned to the right side of the screen) */}
        <svg className="hero__ps-symbol hero__ps-symbol--triangle" viewBox="0 0 40 40" style={{ top: '16%', right: '28%' }}>
          <polygon points="20,4 36,36 4,36" fill="none" stroke="#00f0ff" strokeWidth="2.5" opacity="0.4" />
        </svg>

        {/* PlayStation Circle ◯ */}
        <svg className="hero__ps-symbol hero__ps-symbol--circle" viewBox="0 0 40 40" style={{ top: '65%', left: '8%' }}>
          <circle cx="20" cy="20" r="15" fill="none" stroke="#f59e0b" strokeWidth="2.5" opacity="0.35" />
        </svg>

        {/* PlayStation Cross ✕ */}
        <svg className="hero__ps-symbol hero__ps-symbol--cross" viewBox="0 0 40 40" style={{ top: '22%', right: '10%' }}>
          <line x1="8" y1="8" x2="32" y2="32" stroke="#3b82f6" strokeWidth="3" opacity="0.4" />
          <line x1="32" y1="8" x2="8" y2="32" stroke="#3b82f6" strokeWidth="3" opacity="0.4" />
        </svg>

        {/* PlayStation Square ▢ */}
        <svg className="hero__ps-symbol hero__ps-symbol--square" viewBox="0 0 40 40" style={{ top: '72%', right: '16%' }}>
          <rect x="7" y="7" width="26" height="26" fill="none" stroke="#ec4899" strokeWidth="2.5" opacity="0.35" />
        </svg>

        {/* Xbox Sphere Ring */}
        <div className="hero__ps-symbol hero__xbox-ring" style={{ top: '48%', right: '6%' }} />
      </div>

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
            {/* PlayStation vs Xbox Interactive Mode Toggle */}
            <div className="hero__mode-bar">
              <button
                type="button"
                className={`hero__mode-btn ${consoleMode === 'ps' ? 'hero__mode-btn--active-ps' : ''}`}
                onClick={() => switchTheme('ps')}
              >
                <GameController size={14} weight="fill" />
                <span>PlayStation Mode</span>
              </button>

              <button
                type="button"
                className={`hero__mode-btn ${consoleMode === 'xbox' ? 'hero__mode-btn--active-xbox' : ''}`}
                onClick={() => switchTheme('xbox')}
              >
                <Lightning size={14} weight="fill" />
                <span>Xbox Velocity</span>
              </button>
            </div>

            <div className="hero__subtitle">
              <Sparkle size={14} weight="fill" style={{ color: consoleMode === 'ps' ? '#3b82f6' : '#22c55e' }} />
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
              Peshawar&apos;s leading gaming store. Search genuine PS5 Pro, Xbox Series X, Custom Gaming PCs, VR & Accessories with nationwide Cash on Delivery.
            </p>

            {/* Interactive Hero Search Form */}
            <form onSubmit={handleSearchSubmit} className="hero__search-form">
              <div className="hero__search-input-wrap">
                <MagnifyingGlass size={20} className="hero__search-icon" />
                <input
                  type="text"
                  placeholder="Search PS5 Pro, Xbox, Gaming PCs, VR..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="hero__search-input"
                />
                <button type="submit" className="hero__search-submit-btn">
                  <span>Search</span>
                  <ArrowRight size={16} weight="bold" />
                </button>
              </div>

              {/* Popular Quick Search Pills */}
              <div className="hero__search-pills">
                <span className="hero__search-label">Popular:</span>
                <button type="button" onClick={() => navigateToSearch('PS5 Pro')} className="hero__search-pill">
                  PS5 Pro
                </button>
                <button type="button" onClick={() => navigateToSearch('DJI')} className="hero__search-pill">
                  DJI Drones
                </button>
                <button type="button" onClick={() => navigateToSearch('Quest')} className="hero__search-pill">
                  Meta Quest 3
                </button>
                <button type="button" onClick={() => navigateToSearch('Traxxas')} className="hero__search-pill">
                  Traxxas RC
                </button>
                <button type="button" onClick={() => navigateToSearch('Logitech')} className="hero__search-pill">
                  G923 Racing Wheel
                </button>
              </div>
            </form>
          </div>

          {/* Right Column 3D Showcase Banner Card */}
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
                    onClick={() => {
                      setActiveSlide(idx);
                      setConsoleMode(HERO_FEATURED[idx].theme as 'ps' | 'xbox');
                    }}
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
