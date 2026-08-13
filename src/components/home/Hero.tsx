'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import {
  ArrowRight,
  CaretDown,
  GameController,
  Desktop,
  Headphones,
  Sparkle,
  DeviceMobile,
  Lightning,
} from '@phosphor-icons/react';

gsap.registerPlugin(useGSAP);

interface CategorySpotlight {
  id: string;
  name: string;
  href: string;
  icon: string;
  image: string;
  badge?: string;
}

const CATEGORY_CARDS: CategorySpotlight[] = [
  {
    id: 'playstation',
    name: 'PlayStation',
    href: '/shop/playstation',
    icon: 'ps',
    image: '/images/products/ps5-pro-1.jpg',
    badge: 'PS5 Pro Available',
  },
  {
    id: 'xbox',
    name: 'Xbox',
    href: '/shop/xbox',
    icon: 'xbox',
    image: '/images/products/xbox-x-1.jpg',
    badge: 'Series X 1TB',
  },
  {
    id: 'gaming-pcs',
    name: 'Gaming PCs',
    href: '/shop/gaming-pcs',
    icon: 'pc',
    image: '/images/products/custom-pc-1.jpg',
    badge: 'RTX 4090 Rigs',
  },
  {
    id: 'accessories',
    name: 'Accessories',
    href: '/shop/accessories',
    icon: 'audio',
    image: '/images/products/arctis-nova-pro-1.jpg',
    badge: 'Pro Headsets',
  },
  {
    id: 'vr-smart-tech',
    name: 'VR & Smart Tech',
    href: '/shop/vr-ar',
    icon: 'vr',
    image: '/images/products/quest-3-1.jpg',
    badge: 'Meta Quest 3',
  },
];

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const controllerStageRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<HTMLDivElement>(null);
  const specularRef = useRef<HTMLDivElement>(null);
  const lightbarRef = useRef<SVGPathElement>(null);

  // Interaction State
  const [activeButton, setActiveButton] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('playstation');
  const [hapticRipple, setHapticRipple] = useState<{ x: number; y: number; id: number } | null>(null);
  const [isDraggingState, setIsDraggingState] = useState(false);

  // Drag & Inertia Physics Refs (Stored in refs to prevent unnecessary re-renders at 60fps)
  const physicsRef = useRef({
    isDragging: false,
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
    lastTime: 0,
    vx: 0,
    vy: 0,
    currentRotX: 0,
    currentRotY: 0,
    targetRotX: 0,
    targetRotY: 0,
    mouseRotX: 0,
    mouseRotY: 0,
    idleAnimTime: 0,
    idleFactor: 1, // 1 when idle, 0 during drag
  });

  // Haptic Button Sound / Visual Ripple Generator
  const triggerHaptic = useCallback((btnName: string, e?: React.MouseEvent) => {
    setActiveButton(btnName);
    setTimeout(() => setActiveButton(null), 300);

    if (e && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setHapticRipple({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        id: Date.now(),
      });
      setTimeout(() => setHapticRipple(null), 600);
    }

    // Flash lightbar on button click
    if (lightbarRef.current) {
      gsap.fromTo(
        lightbarRef.current,
        { stroke: '#ffffff', filter: 'drop-shadow(0 0 16px #00f0ff)' },
        { stroke: '#00f0ff', filter: 'drop-shadow(0 0 10px #00a2ff)', duration: 0.4, ease: 'power2.out' }
      );
    }
  }, []);

  // GSAP 60 FPS Physics & Render Loop
  useGSAP(
    () => {
      const container = containerRef.current;
      const controller = controllerRef.current;
      const specular = specularRef.current;
      if (!container || !controller) return;

      const mm = gsap.matchMedia();

      mm.add('(min-width: 768px)', () => {
        // High performance quickTo setters
        const xTo = gsap.quickTo(controller, 'rotateY', { duration: 0.4, ease: 'power2.out' });
        const yTo = gsap.quickTo(controller, 'rotateX', { duration: 0.4, ease: 'power2.out' });
        const zTo = gsap.quickTo(controller, 'rotateZ', { duration: 0.5, ease: 'power2.out' });
        const scaleTo = gsap.quickTo(controller, 'scale', { duration: 0.3, ease: 'power2.out' });
        const specularXTo = specular ? gsap.quickTo(specular, 'xPercent', { duration: 0.3, ease: 'power2.out' }) : null;
        const specularYTo = specular ? gsap.quickTo(specular, 'yPercent', { duration: 0.3, ease: 'power2.out' }) : null;

        let animationFrameId: number;

        // Continuous Physics & Idle Float Loop
        const renderLoop = () => {
          const p = physicsRef.current;

          // Compute Idle Sinusoidal Float
          p.idleAnimTime += 0.02;
          const idleTiltX = Math.sin(p.idleAnimTime * 0.8) * 3.5;
          const idleTiltY = Math.cos(p.idleAnimTime * 0.6) * 4.5;
          const idleTiltZ = Math.sin(p.idleAnimTime * 0.4) * 1.5;

          if (!p.isDragging) {
            // Smoothly return to mouse/idle equilibrium with momentum decay
            p.vx *= 0.92;
            p.vy *= 0.92;
            p.targetRotY += p.vx * 0.5;
            p.targetRotX += p.vy * 0.5;

            // Slowly damp drag offsets back to zero
            p.targetRotY = gsap.utils.interpolate(p.targetRotY, 0, 0.04);
            p.targetRotX = gsap.utils.interpolate(p.targetRotX, 0, 0.04);

            p.idleFactor = gsap.utils.interpolate(p.idleFactor, 1, 0.05);
          } else {
            p.idleFactor = gsap.utils.interpolate(p.idleFactor, 0, 0.2);
          }

          // Combined Rotation Values
          const finalRotY = p.targetRotY + p.mouseRotY + idleTiltY * p.idleFactor;
          const finalRotX = p.targetRotX + p.mouseRotX + idleTiltX * p.idleFactor;
          const finalRotZ = (p.mouseRotY * 0.15) + idleTiltZ * p.idleFactor;

          xTo(finalRotY);
          yTo(finalRotX);
          zTo(finalRotZ);

          // Specular Glare Movement
          if (specularXTo && specularYTo) {
            specularXTo(finalRotY * 1.8);
            specularYTo(finalRotX * 1.8);
          }

          animationFrameId = requestAnimationFrame(renderLoop);
        };

        animationFrameId = requestAnimationFrame(renderLoop);

        // Mouse Parallax Follow
        const handleMouseMove = (e: MouseEvent) => {
          const p = physicsRef.current;
          const rect = container.getBoundingClientRect();
          const normX = (e.clientX - rect.left) / rect.width - 0.5;
          const normY = (e.clientY - rect.top) / rect.height - 0.5;

          p.mouseRotY = normX * 22;
          p.mouseRotX = -normY * 18;
        };

        // Pointer Drag & Inertia Handlers
        const handlePointerDown = (e: PointerEvent) => {
          // Ignore clicks on links or interactive buttons
          if ((e.target as HTMLElement).closest('a, button, .hero-3d__button-hitbox')) return;

          const p = physicsRef.current;
          p.isDragging = true;
          p.startX = e.clientX;
          p.startY = e.clientY;
          p.lastX = e.clientX;
          p.lastY = e.clientY;
          p.lastTime = performance.now();
          p.vx = 0;
          p.vy = 0;
          setIsDraggingState(true);
          scaleTo(1.04);
        };

        const handlePointerMove = (e: PointerEvent) => {
          const p = physicsRef.current;
          if (!p.isDragging) return;

          const now = performance.now();
          const dt = Math.max(now - p.lastTime, 16);
          const dx = e.clientX - p.lastX;
          const dy = e.clientY - p.lastY;

          p.vx = (dx / dt) * 16;
          p.vy = (dy / dt) * 16;

          p.lastX = e.clientX;
          p.lastY = e.clientY;
          p.lastTime = now;

          // Direct Drag Rotation (clamped)
          p.targetRotY += dx * 0.35;
          p.targetRotX -= dy * 0.35;
          p.targetRotY = Math.max(Math.min(p.targetRotY, 45), -45);
          p.targetRotX = Math.max(Math.min(p.targetRotX, 35), -35);
        };

        const handlePointerUp = () => {
          const p = physicsRef.current;
          if (p.isDragging) {
            p.isDragging = false;
            setIsDraggingState(false);
            scaleTo(1);
          }
        };

        container.addEventListener('mousemove', handleMouseMove);
        container.addEventListener('pointerdown', handlePointerDown);
        window.addEventListener('pointermove', handlePointerMove);
        window.addEventListener('pointerup', handlePointerUp);

        return () => {
          cancelAnimationFrame(animationFrameId);
          container.removeEventListener('mousemove', handleMouseMove);
          container.removeEventListener('pointerdown', handlePointerDown);
          window.removeEventListener('pointermove', handlePointerMove);
          window.removeEventListener('pointerup', handlePointerUp);
        };
      });

      // Mobile Touch Drag Support
      mm.add('(max-width: 767px)', () => {
        let touchStartX = 0;
        let touchStartY = 0;

        const handleTouchStart = (e: TouchEvent) => {
          touchStartX = e.touches[0].clientX;
          touchStartY = e.touches[0].clientY;
        };

        const handleTouchMove = (e: TouchEvent) => {
          const dx = e.touches[0].clientX - touchStartX;
          const dy = e.touches[0].clientY - touchStartY;
          gsap.to(controller, {
            rotateY: Math.max(Math.min(dx * 0.25, 20), -20),
            rotateX: Math.max(Math.min(-dy * 0.25, 15), -15),
            duration: 0.3,
            ease: 'power2.out',
          });
        };

        const handleTouchEnd = () => {
          gsap.to(controller, { rotateY: 0, rotateX: 0, duration: 0.6, ease: 'power2.out' });
        };

        container.addEventListener('touchstart', handleTouchStart, { passive: true });
        container.addEventListener('touchmove', handleTouchMove, { passive: true });
        container.addEventListener('touchend', handleTouchEnd, { passive: true });

        return () => {
          container.removeEventListener('touchstart', handleTouchStart);
          container.removeEventListener('touchmove', handleTouchMove);
          container.removeEventListener('touchend', handleTouchEnd);
        };
      });
    },
    { scope: containerRef }
  );

  return (
    <section className="hero-cinematic" ref={containerRef}>
      {/* Background Deep Cosmic Gradients & Ground Reflections */}
      <div className="hero-cinematic__bg">
        <div className="hero-cinematic__glow-cyan" />
        <div className="hero-cinematic__glow-blue" />
        <div className="hero-cinematic__ground-reflection" />
        <div className="hero-cinematic__vignette" />
      </div>

      {/* Interactive 3D Controller Stage */}
      <div className="hero-3d__stage" ref={controllerStageRef}>
        {/* Floating Sparks / Particle Accents */}
        <div className="hero-3d__particles">
          <span className="hero-3d__sparkle hero-3d__sparkle--1" />
          <span className="hero-3d__sparkle hero-3d__sparkle--2" />
          <span className="hero-3d__sparkle hero-3d__sparkle--3" />
          <span className="hero-3d__sparkle hero-3d__sparkle--4" />
        </div>

        {/* 3D Controller Body with Drag & Parallax */}
        <div
          className={`hero-3d__controller ${isDraggingState ? 'hero-3d__controller--dragging' : ''}`}
          ref={controllerRef}
        >
          {/* Main High-Fidelity DualSense Controller Render */}
          <div className="hero-3d__render-wrap">
            <img
              src="/images/hero-controller-bg.jpg"
              alt="PlayStation 5 DualSense Wireless Controller"
              className="hero-3d__render-img"
              draggable={false}
            />
            {/* Dynamic Specular Lighting Glare */}
            <div className="hero-3d__specular" ref={specularRef} />
          </div>

          {/* Interactive Clickable Hotspots & Real DualSense Feedback Overlay */}
          <div className="hero-3d__hotspots">
            {/* D-Pad Buttons (Left) */}
            <button
              type="button"
              className={`hero-3d__button-hitbox hero-3d__dpad-btn hero-3d__dpad--up ${activeButton === 'dpad-up' ? 'hero-3d__btn--active' : ''}`}
              onClick={(e) => triggerHaptic('dpad-up', e)}
              title="D-Pad Up"
              aria-label="D-Pad Up"
            />
            <button
              type="button"
              className={`hero-3d__button-hitbox hero-3d__dpad-btn hero-3d__dpad--down ${activeButton === 'dpad-down' ? 'hero-3d__btn--active' : ''}`}
              onClick={(e) => triggerHaptic('dpad-down', e)}
              title="D-Pad Down"
              aria-label="D-Pad Down"
            />
            <button
              type="button"
              className={`hero-3d__button-hitbox hero-3d__dpad-btn hero-3d__dpad--left ${activeButton === 'dpad-left' ? 'hero-3d__btn--active' : ''}`}
              onClick={(e) => triggerHaptic('dpad-left', e)}
              title="D-Pad Left"
              aria-label="D-Pad Left"
            />
            <button
              type="button"
              className={`hero-3d__button-hitbox hero-3d__dpad-btn hero-3d__dpad--right ${activeButton === 'dpad-right' ? 'hero-3d__btn--active' : ''}`}
              onClick={(e) => triggerHaptic('dpad-right', e)}
              title="D-Pad Right"
              aria-label="D-Pad Right"
            />

            {/* PlayStation Action Buttons (Right: △ ◯ ✕ ▢) */}
            {/* Triangle △ */}
            <button
              type="button"
              className={`hero-3d__button-hitbox hero-3d__face-btn hero-3d__face--triangle ${activeButton === 'triangle' ? 'hero-3d__btn--active' : ''}`}
              onClick={(e) => triggerHaptic('triangle', e)}
              title="Triangle Action Button"
              aria-label="Triangle Action Button"
            >
              <span className="hero-3d__face-glow hero-3d__glow--cyan" />
            </button>

            {/* Circle ◯ */}
            <button
              type="button"
              className={`hero-3d__button-hitbox hero-3d__face-btn hero-3d__face--circle ${activeButton === 'circle' ? 'hero-3d__btn--active' : ''}`}
              onClick={(e) => triggerHaptic('circle', e)}
              title="Circle Action Button"
              aria-label="Circle Action Button"
            >
              <span className="hero-3d__face-glow hero-3d__glow--amber" />
            </button>

            {/* Cross ✕ */}
            <button
              type="button"
              className={`hero-3d__button-hitbox hero-3d__face-btn hero-3d__face--cross ${activeButton === 'cross' ? 'hero-3d__btn--active' : ''}`}
              onClick={(e) => triggerHaptic('cross', e)}
              title="Cross Action Button"
              aria-label="Cross Action Button"
            >
              <span className="hero-3d__face-glow hero-3d__glow--blue" />
            </button>

            {/* Square ▢ */}
            <button
              type="button"
              className={`hero-3d__button-hitbox hero-3d__face-btn hero-3d__face--square ${activeButton === 'square' ? 'hero-3d__btn--active' : ''}`}
              onClick={(e) => triggerHaptic('square', e)}
              title="Square Action Button"
              aria-label="Square Action Button"
            >
              <span className="hero-3d__face-glow hero-3d__glow--pink" />
            </button>

            {/* Dual Analog Thumbsticks (Left & Right with Drag / Click) */}
            <button
              type="button"
              className={`hero-3d__button-hitbox hero-3d__thumbstick hero-3d__thumbstick--left ${activeButton === 'l3' ? 'hero-3d__btn--active' : ''}`}
              onClick={(e) => triggerHaptic('l3', e)}
              title="L3 Analog Stick"
              aria-label="L3 Analog Stick"
            />
            <button
              type="button"
              className={`hero-3d__button-hitbox hero-3d__thumbstick hero-3d__thumbstick--right ${activeButton === 'r3' ? 'hero-3d__btn--active' : ''}`}
              onClick={(e) => triggerHaptic('r3', e)}
              title="R3 Analog Stick"
              aria-label="R3 Analog Stick"
            />

            {/* Center Touchpad & PS Logo Button */}
            <button
              type="button"
              className={`hero-3d__button-hitbox hero-3d__touchpad ${activeButton === 'touchpad' ? 'hero-3d__btn--active' : ''}`}
              onClick={(e) => triggerHaptic('touchpad', e)}
              title="DualSense Touchpad & Lightbar"
              aria-label="DualSense Touchpad & Lightbar"
            />
            <button
              type="button"
              className={`hero-3d__button-hitbox hero-3d__ps-logo ${activeButton === 'ps-home' ? 'hero-3d__btn--active' : ''}`}
              onClick={(e) => triggerHaptic('ps-home', e)}
              title="PlayStation Home Button"
              aria-label="PlayStation Home Button"
            />
          </div>
        </div>
      </div>

      {/* Haptic Wave Ripple Effect */}
      {hapticRipple && (
        <div
          className="hero-3d__haptic-ripple"
          style={{ left: `${hapticRipple.x}px`, top: `${hapticRipple.y}px` }}
        />
      )}

      {/* Hero Minimalist Central Overlay */}
      <div className="hero-cinematic__overlay">
        <div className="hero-cinematic__center-content">
          <p className="hero-cinematic__subtitle">PREMIUM GAMING HARDWARE</p>
          <Link href="/shop" className="hero-cinematic__cta-btn">
            <span>SHOP NOW</span>
            <ArrowRight size={16} weight="bold" />
          </Link>
        </div>
      </div>

      {/* Left Pagination Dots */}
      <div className="hero-cinematic__pagination" aria-label="Department Pagination">
        {CATEGORY_CARDS.map((cat, idx) => (
          <button
            key={cat.id}
            type="button"
            className={`hero-cinematic__page-dot ${cat.id === activeCategory ? 'hero-cinematic__page-dot--active' : ''}`}
            onClick={() => setActiveCategory(cat.id)}
            aria-label={`Slide ${idx + 1} - ${cat.name}`}
          />
        ))}
      </div>

      {/* Right Scroll Indicator */}
      <div className="hero-cinematic__scroll-indicator">
        <span>SCROLL</span>
        <div className="hero-cinematic__scroll-line">
          <div className="hero-cinematic__scroll-ball" />
        </div>
      </div>

      {/* Bottom Category Spotlight Rail (Matching the exact mockup) */}
      <div className="hero-cinematic__bottom-rail container">
        <div className="hero-cinematic__cards-grid">
          {CATEGORY_CARDS.map((cat) => {
            const isCurrent = activeCategory === cat.id;
            return (
              <Link
                key={cat.id}
                href={cat.href}
                className={`hero-category-card ${isCurrent ? 'hero-category-card--active' : ''}`}
                onMouseEnter={() => setActiveCategory(cat.id)}
              >
                <div className="hero-category-card__left">
                  <div className="hero-category-card__icon-wrap">
                    {cat.icon === 'ps' && <GameController size={18} weight="fill" />}
                    {cat.icon === 'xbox' && <Lightning size={18} weight="fill" />}
                    {cat.icon === 'pc' && <Desktop size={18} weight="fill" />}
                    {cat.icon === 'audio' && <Headphones size={18} weight="fill" />}
                    {cat.icon === 'vr' && <DeviceMobile size={18} weight="fill" />}
                  </div>
                  <div className="hero-category-card__text">
                    <span className="hero-category-card__title">{cat.name}</span>
                    <span className="hero-category-card__arrow">→</span>
                  </div>
                </div>

                <div className="hero-category-card__thumb-wrap">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="hero-category-card__thumb-img"
                  />
                </div>
              </Link>
            );
          })}
        </div>

        {/* Bottom Chevron Scroll Indicator */}
        <div className="hero-cinematic__bottom-arrow">
          <CaretDown size={20} weight="bold" />
        </div>
      </div>
    </section>
  );
}
