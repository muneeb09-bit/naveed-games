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
}

const CATEGORY_CARDS: CategorySpotlight[] = [
  {
    id: 'playstation',
    name: 'PlayStation',
    href: '/shop/playstation',
    icon: 'ps',
    image: '/images/products/ps5-pro-1.jpg',
  },
  {
    id: 'xbox',
    name: 'Xbox',
    href: '/shop/xbox',
    icon: 'xbox',
    image: '/images/products/xbox-x-1.jpg',
  },
  {
    id: 'gaming-pcs',
    name: 'Gaming PCs',
    href: '/shop/gaming-pcs',
    icon: 'pc',
    image: '/images/products/custom-pc-1.jpg',
  },
  {
    id: 'accessories',
    name: 'Accessories',
    href: '/shop/accessories',
    icon: 'audio',
    image: '/images/products/arctis-nova-pro-1.jpg',
  },
  {
    id: 'vr-smart-tech',
    name: 'VR & Smart Tech',
    href: '/shop/vr-ar',
    icon: 'vr',
    image: '/images/products/quest-3-1.jpg',
  },
];

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const controllerStageRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<HTMLDivElement>(null);
  const leftStickRef = useRef<SVGGElement>(null);
  const rightStickRef = useRef<SVGGElement>(null);
  const lightbarRef = useRef<SVGPathElement>(null);

  // Interactive Buttons & Category State
  const [activeBtn, setActiveBtn] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('playstation');
  const [hapticRipple, setHapticRipple] = useState<{ x: number; y: number; color: string; id: number } | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  // Drag & Physics Memory Ref (Pure GPU transforms, 0 layout thrashing, 120 FPS performance)
  const physicsRef = useRef({
    isDragging: false,
    startX: 0,
    startY: 0,
    lastX: 0,
    lastY: 0,
    lastTime: 0,
    vx: 0,
    vy: 0,
    targetRotX: 0,
    targetRotY: 0,
    mouseRotX: 0,
    mouseRotY: 0,
    idleTime: 0,
    idleFactor: 1,
  });

  // Haptic Button Trigger
  const triggerButton = useCallback((btn: string, color: string = '#00f0ff', e?: React.MouseEvent) => {
    setActiveBtn(btn);
    setTimeout(() => setActiveBtn(null), 250);

    if (e && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setHapticRipple({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        color,
        id: Date.now(),
      });
      setTimeout(() => setHapticRipple(null), 600);
    }

    // Lightbar flare reaction
    if (lightbarRef.current) {
      gsap.fromTo(
        lightbarRef.current,
        { stroke: color, filter: `drop-shadow(0 0 20px ${color})` },
        { stroke: '#00f0ff', filter: 'drop-shadow(0 0 10px #00a2ff)', duration: 0.5, ease: 'power2.out' }
      );
    }
  }, []);

  // Performance-First 60/120 FPS GSAP Render Loop
  useGSAP(
    () => {
      const container = containerRef.current;
      const controller = controllerRef.current;
      const leftStick = leftStickRef.current;
      const rightStick = rightStickRef.current;
      if (!container || !controller) return;

      const mm = gsap.matchMedia();

      mm.add('(min-width: 768px)', () => {
        // GPU accelerated quickTo setters
        const rotYTo = gsap.quickTo(controller, 'rotateY', { duration: 0.35, ease: 'power2.out' });
        const rotXTo = gsap.quickTo(controller, 'rotateX', { duration: 0.35, ease: 'power2.out' });
        const rotZTo = gsap.quickTo(controller, 'rotateZ', { duration: 0.45, ease: 'power2.out' });
        const scaleTo = gsap.quickTo(controller, 'scale', { duration: 0.3, ease: 'power2.out' });

        // Thumbstick deflection setters
        const stickLX = leftStick ? gsap.quickTo(leftStick, 'x', { duration: 0.2, ease: 'power2.out' }) : null;
        const stickLY = leftStick ? gsap.quickTo(leftStick, 'y', { duration: 0.2, ease: 'power2.out' }) : null;
        const stickRX = rightStick ? gsap.quickTo(rightStick, 'x', { duration: 0.2, ease: 'power2.out' }) : null;
        const stickRY = rightStick ? gsap.quickTo(rightStick, 'y', { duration: 0.2, ease: 'power2.out' }) : null;

        let reqId: number;

        const loop = () => {
          const p = physicsRef.current;

          // Compute Idle sinusoidal breathe and float
          p.idleTime += 0.02;
          const idleX = Math.sin(p.idleTime * 0.8) * 3.5;
          const idleY = Math.cos(p.idleTime * 0.6) * 4.5;
          const idleZ = Math.sin(p.idleTime * 0.4) * 1.5;

          if (!p.isDragging) {
            // Decay momentum smoothly
            p.vx *= 0.92;
            p.vy *= 0.92;
            p.targetRotY += p.vx * 0.4;
            p.targetRotX += p.vy * 0.4;

            // Spring return to equilibrium
            p.targetRotY = gsap.utils.interpolate(p.targetRotY, 0, 0.05);
            p.targetRotX = gsap.utils.interpolate(p.targetRotX, 0, 0.05);
            p.idleFactor = gsap.utils.interpolate(p.idleFactor, 1, 0.05);
          } else {
            p.idleFactor = gsap.utils.interpolate(p.idleFactor, 0, 0.2);
          }

          const currentRotY = p.targetRotY + p.mouseRotY + idleY * p.idleFactor;
          const currentRotX = p.targetRotX + p.mouseRotX + idleX * p.idleFactor;
          const currentRotZ = (p.mouseRotY * 0.12) + idleZ * p.idleFactor;

          rotYTo(currentRotY);
          rotXTo(currentRotX);
          rotZTo(currentRotZ);

          // Deflect analog thumbsticks with rotation velocity
          const stickDx = Math.max(Math.min(currentRotY * 0.35, 6), -6);
          const stickDy = Math.max(Math.min(-currentRotX * 0.35, 6), -6);

          if (stickLX && stickLY) {
            stickLX(stickDx);
            stickLY(stickDy);
          }
          if (stickRX && stickRY) {
            stickRX(stickDx);
            stickRY(stickDy);
          }

          reqId = requestAnimationFrame(loop);
        };

        reqId = requestAnimationFrame(loop);

        // Cursor Parallax Listener
        const onMouseMove = (e: MouseEvent) => {
          const p = physicsRef.current;
          const rect = container.getBoundingClientRect();
          const nx = (e.clientX - rect.left) / rect.width - 0.5;
          const ny = (e.clientY - rect.top) / rect.height - 0.5;

          p.mouseRotY = nx * 24;
          p.mouseRotX = -ny * 18;
        };

        // Pointer Drag Handlers
        const onPointerDown = (e: PointerEvent) => {
          if ((e.target as HTMLElement).closest('a, button')) return;

          const p = physicsRef.current;
          p.isDragging = true;
          p.startX = e.clientX;
          p.startY = e.clientY;
          p.lastX = e.clientX;
          p.lastY = e.clientY;
          p.lastTime = performance.now();
          p.vx = 0;
          p.vy = 0;
          setIsDragging(true);
          scaleTo(1.03);
        };

        const onPointerMove = (e: PointerEvent) => {
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

          p.targetRotY += dx * 0.35;
          p.targetRotX -= dy * 0.35;
          p.targetRotY = Math.max(Math.min(p.targetRotY, 45), -45);
          p.targetRotX = Math.max(Math.min(p.targetRotX, 35), -35);
        };

        const onPointerUp = () => {
          const p = physicsRef.current;
          if (p.isDragging) {
            p.isDragging = false;
            setIsDragging(false);
            scaleTo(1);
          }
        };

        container.addEventListener('mousemove', onMouseMove, { passive: true });
        container.addEventListener('pointerdown', onPointerDown);
        window.addEventListener('pointermove', onPointerMove, { passive: true });
        window.addEventListener('pointerup', onPointerUp);

        return () => {
          cancelAnimationFrame(reqId);
          container.removeEventListener('mousemove', onMouseMove);
          container.removeEventListener('pointerdown', onPointerDown);
          window.removeEventListener('pointermove', onPointerMove);
          window.removeEventListener('pointerup', onPointerUp);
        };
      });

      // Mobile Touch Listener
      mm.add('(max-width: 767px)', () => {
        let sx = 0;
        let sy = 0;

        const onTouchStart = (e: TouchEvent) => {
          sx = e.touches[0].clientX;
          sy = e.touches[0].clientY;
        };

        const onTouchMove = (e: TouchEvent) => {
          const dx = e.touches[0].clientX - sx;
          const dy = e.touches[0].clientY - sy;
          gsap.to(controller, {
            rotateY: Math.max(Math.min(dx * 0.25, 20), -20),
            rotateX: Math.max(Math.min(-dy * 0.25, 15), -15),
            duration: 0.25,
            ease: 'power2.out',
          });
        };

        const onTouchEnd = () => {
          gsap.to(controller, { rotateY: 0, rotateX: 0, duration: 0.5, ease: 'power2.out' });
        };

        container.addEventListener('touchstart', onTouchStart, { passive: true });
        container.addEventListener('touchmove', onTouchMove, { passive: true });
        container.addEventListener('touchend', onTouchEnd, { passive: true });

        return () => {
          container.removeEventListener('touchstart', onTouchStart);
          container.removeEventListener('touchmove', onTouchMove);
          container.removeEventListener('touchend', onTouchEnd);
        };
      });
    },
    { scope: containerRef }
  );

  return (
    <section className="hero-cinematic" ref={containerRef}>
      {/* Background Cinematic Gradients & Ground Grid */}
      <div className="hero-cinematic__bg" aria-hidden="true">
        <div className="hero-cinematic__glow-cyan" />
        <div className="hero-cinematic__glow-blue" />
        <div className="hero-cinematic__ground-reflection" />
        <div className="hero-cinematic__vignette" />
      </div>

      {/* Interactive 3D Vector SVG Controller Stage */}
      <div className="hero-3d__stage" ref={controllerStageRef}>
        {/* Floating Sparks / Ambient Particles */}
        <div className="hero-3d__particles" aria-hidden="true">
          <span className="hero-3d__sparkle hero-3d__sparkle--1" />
          <span className="hero-3d__sparkle hero-3d__sparkle--2" />
          <span className="hero-3d__sparkle hero-3d__sparkle--3" />
          <span className="hero-3d__sparkle hero-3d__sparkle--4" />
        </div>

        {/* 3D Vector Controller (Zero image weight, 100% vector SVG) */}
        <div
          className={`hero-3d__controller ${isDragging ? 'hero-3d__controller--dragging' : ''}`}
          ref={controllerRef}
        >
          <svg
            className="hero-3d__svg"
            viewBox="0 0 900 620"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* DualSense Lightbar Glow Filter */}
              <filter id="lightbar-glow" x="-30%" y="-30%" width="160%" height="160%">
                <feGaussianBlur stdDeviation="8" result="blur1" />
                <feGaussianBlur stdDeviation="16" result="blur2" />
                <feMerge>
                  <feMergeNode in="blur2" />
                  <feMergeNode in="blur1" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Button Neon Glow */}
              <filter id="btn-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>

              {/* Controller Main Body Gradients */}
              <radialGradient id="body-chassis-grad" cx="50%" cy="30%" r="70%">
                <stop offset="0%" stopColor="#1e232b" />
                <stop offset="45%" stopColor="#13171e" />
                <stop offset="85%" stopColor="#0a0d12" />
                <stop offset="100%" stopColor="#040608" />
              </radialGradient>

              {/* Grip Wings Shading */}
              <linearGradient id="grip-left-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#252c38" />
                <stop offset="60%" stopColor="#111419" />
                <stop offset="100%" stopColor="#06080b" />
              </linearGradient>

              <linearGradient id="grip-right-grad" x1="100%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#252c38" />
                <stop offset="60%" stopColor="#111419" />
                <stop offset="100%" stopColor="#06080b" />
              </linearGradient>

              {/* Touchpad Dark Glass Gradient */}
              <linearGradient id="touchpad-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#181c24" />
                <stop offset="100%" stopColor="#0e1116" />
              </linearGradient>

              {/* Thumbstick Bevel Gradient */}
              <radialGradient id="stick-rim-grad" cx="40%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#2c3442" />
                <stop offset="70%" stopColor="#12151b" />
                <stop offset="100%" stopColor="#07090c" />
              </radialGradient>
            </defs>

            {/* Drop Shadow Ambient Ground Projection */}
            <ellipse cx="450" cy="580" rx="360" ry="24" fill="rgba(0, 0, 0, 0.75)" filter="blur(25px)" />
            <ellipse cx="450" cy="575" rx="280" ry="16" fill="rgba(0, 162, 255, 0.18)" filter="blur(20px)" />

            {/* L2 / R2 Trigger Bumpers */}
            <path
              d="M 230 90 C 270 70 310 80 330 95 C 315 120 280 125 240 120 Z"
              fill="#0d1015"
              stroke="#2a3240"
              strokeWidth="2"
            />
            <path
              d="M 670 90 C 630 70 590 80 570 95 C 585 120 620 125 660 120 Z"
              fill="#0d1015"
              stroke="#2a3240"
              strokeWidth="2"
            />

            {/* L1 / R1 Shoulder Bumpers */}
            <path
              d="M 245 105 C 285 92 335 100 355 120 C 330 135 275 130 240 120 Z"
              fill="#181d26"
              stroke="rgba(255, 255, 255, 0.15)"
              strokeWidth="1.5"
            />
            <path
              d="M 655 105 C 615 92 565 100 545 120 C 570 135 625 130 660 120 Z"
              fill="#181d26"
              stroke="rgba(255, 255, 255, 0.15)"
              strokeWidth="1.5"
            />

            {/* Main DualSense Ergonomic Chassis Silhouette */}
            <path
              d="M 210 115 
                 C 300 115 365 160 450 160 
                 C 535 160 600 115 690 115 
                 C 790 115 845 220 815 410 
                 C 785 530 710 560 625 480 
                 C 575 435 540 350 450 350 
                 C 360 350 325 435 275 480 
                 C 190 560 115 530 85 410 
                 C 55 220 110 115 210 115 Z"
              fill="url(#body-chassis-grad)"
              stroke="rgba(255, 255, 255, 0.22)"
              strokeWidth="2"
            />

            {/* Left Grip Wing Overlay */}
            <path
              d="M 210 115 
                 C 130 115 65 210 90 400 
                 C 115 520 185 550 270 475 
                 C 315 435 340 370 330 280 
                 C 320 190 280 135 210 115 Z"
              fill="url(#grip-left-grad)"
              opacity="0.8"
            />

            {/* Right Grip Wing Overlay */}
            <path
              d="M 690 115 
                 C 770 115 835 210 810 400 
                 C 785 520 715 550 630 475 
                 C 585 435 560 370 570 280 
                 C 580 190 620 135 690 115 Z"
              fill="url(#grip-right-grad)"
              opacity="0.8"
            />

            {/* Center Touchpad Section */}
            <rect
              x="345"
              y="145"
              width="210"
              height="125"
              rx="18"
              fill="url(#touchpad-grad)"
              stroke="rgba(255, 255, 255, 0.18)"
              strokeWidth="1.5"
            />

            {/* Touchpad Dot Texture */}
            <g opacity="0.15">
              {[...Array(6)].map((_, r) =>
                [...Array(10)].map((_, c) => (
                  <circle key={`${r}-${c}`} cx={375 + c * 16} cy={165 + r * 14} r="1" fill="#ffffff" />
                ))
              )}
            </g>

            {/* Signature PS5 Glowing Lightbar V-Strip */}
            <path
              ref={lightbarRef}
              className="hero-3d__lightbar-path"
              d="M 330 160 
                 C 342 275 350 285 450 285 
                 C 550 285 558 275 570 160"
              fill="none"
              stroke="#00f0ff"
              strokeWidth="5.5"
              strokeLinecap="round"
              filter="url(#lightbar-glow)"
            />

            {/* Secondary Cyan Inner Glow Contour */}
            <path
              d="M 345 155 Q 450 220 555 155"
              fill="none"
              stroke="rgba(0, 240, 255, 0.4)"
              strokeWidth="2"
            />

            {/* Microphone Mute Bar Indicator */}
            <rect x="438" y="298" width="24" height="4" rx="2" fill="#ff8c00" opacity="0.9" />

            {/* PlayStation PS Center Home Logo Button */}
            <g
              className={`hero-3d__interactive-part ${activeBtn === 'ps-logo' ? 'hero-3d__part--pressed' : ''}`}
              onClick={(e) => triggerButton('ps-logo', '#ffffff', e)}
              style={{ cursor: 'pointer' }}
            >
              <circle cx="450" cy="335" r="16" fill="#0e1218" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="1.2" />
              {/* Iconic PS Logo Shape */}
              <path
                d="M 445 327 L 445 343 C 445 345 448 345 448 343 L 448 331 C 448 329 452 329 452 331 L 452 338 C 452 340 455 340 455 338 L 455 331 C 455 326 445 324 445 327 Z"
                fill="#ffffff"
                opacity="0.85"
              />
            </g>

            {/* ── Left D-Pad Controls ── */}
            <g className="hero-3d__dpad-group">
              {/* D-Pad Base Well */}
              <circle cx="250" cy="240" r="54" fill="#0a0c10" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1.5" />

              {/* D-Pad Up */}
              <g
                className={`hero-3d__interactive-part ${activeBtn === 'dpad-up' ? 'hero-3d__part--pressed' : ''}`}
                onClick={(e) => triggerButton('dpad-up', '#00f0ff', e)}
                style={{ cursor: 'pointer' }}
              >
                <path d="M 238 196 C 238 192 262 192 262 196 L 260 225 L 240 225 Z" fill="#181c24" stroke="rgba(255,255,255,0.15)" />
                <path d="M 250 202 L 255 210 L 245 210 Z" fill="#8E959D" />
              </g>

              {/* D-Pad Down */}
              <g
                className={`hero-3d__interactive-part ${activeBtn === 'dpad-down' ? 'hero-3d__part--pressed' : ''}`}
                onClick={(e) => triggerButton('dpad-down', '#00f0ff', e)}
                style={{ cursor: 'pointer' }}
              >
                <path d="M 238 284 C 238 288 262 288 262 284 L 260 255 L 240 255 Z" fill="#181c24" stroke="rgba(255,255,255,0.15)" />
                <path d="M 250 278 L 245 270 L 255 270 Z" fill="#8E959D" />
              </g>

              {/* D-Pad Left */}
              <g
                className={`hero-3d__interactive-part ${activeBtn === 'dpad-left' ? 'hero-3d__part--pressed' : ''}`}
                onClick={(e) => triggerButton('dpad-left', '#00f0ff', e)}
                style={{ cursor: 'pointer' }}
              >
                <path d="M 206 228 C 202 228 202 252 206 252 L 235 250 L 235 230 Z" fill="#181c24" stroke="rgba(255,255,255,0.15)" />
                <path d="M 212 240 L 220 235 L 220 245 Z" fill="#8E959D" />
              </g>

              {/* D-Pad Right */}
              <g
                className={`hero-3d__interactive-part ${activeBtn === 'dpad-right' ? 'hero-3d__part--pressed' : ''}`}
                onClick={(e) => triggerButton('dpad-right', '#00f0ff', e)}
                style={{ cursor: 'pointer' }}
              >
                <path d="M 294 228 C 298 228 298 252 294 252 L 265 250 L 265 230 Z" fill="#181c24" stroke="rgba(255,255,255,0.15)" />
                <path d="M 288 240 L 280 235 L 280 245 Z" fill="#8E959D" />
              </g>
            </g>

            {/* ── Right Action Buttons (△ ◯ ✕ ▢) ── */}
            <g className="hero-3d__face-group">
              {/* Action Buttons Base Well */}
              <circle cx="650" cy="240" r="54" fill="#0a0c10" stroke="rgba(255, 255, 255, 0.08)" strokeWidth="1.5" />

              {/* Triangle Button △ */}
              <g
                className={`hero-3d__interactive-part ${activeBtn === 'triangle' ? 'hero-3d__part--pressed' : ''}`}
                onClick={(e) => triggerButton('triangle', '#00f0ff', e)}
                style={{ cursor: 'pointer' }}
              >
                <circle cx="650" cy="198" r="14" fill="#151922" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2" />
                <polygon points="650,190 657,203 643,203" fill="none" stroke="#00f0ff" strokeWidth="2.4" filter="url(#btn-glow)" />
              </g>

              {/* Circle Button ◯ */}
              <g
                className={`hero-3d__interactive-part ${activeBtn === 'circle' ? 'hero-3d__part--pressed' : ''}`}
                onClick={(e) => triggerButton('circle', '#f59e0b', e)}
                style={{ cursor: 'pointer' }}
              >
                <circle cx="692" cy="240" r="14" fill="#151922" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2" />
                <circle cx="692" cy="240" r="7" fill="none" stroke="#f59e0b" strokeWidth="2.4" filter="url(#btn-glow)" />
              </g>

              {/* Cross Button ✕ */}
              <g
                className={`hero-3d__interactive-part ${activeBtn === 'cross' ? 'hero-3d__part--pressed' : ''}`}
                onClick={(e) => triggerButton('cross', '#3b82f6', e)}
                style={{ cursor: 'pointer' }}
              >
                <circle cx="650" cy="282" r="14" fill="#151922" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2" />
                <line x1="644" y1="276" x2="656" y2="288" stroke="#3b82f6" strokeWidth="2.4" strokeLinecap="round" filter="url(#btn-glow)" />
                <line x1="656" y1="276" x2="644" y2="288" stroke="#3b82f6" strokeWidth="2.4" strokeLinecap="round" filter="url(#btn-glow)" />
              </g>

              {/* Square Button ▢ */}
              <g
                className={`hero-3d__interactive-part ${activeBtn === 'square' ? 'hero-3d__part--pressed' : ''}`}
                onClick={(e) => triggerButton('square', '#ec4899', e)}
                style={{ cursor: 'pointer' }}
              >
                <circle cx="608" cy="240" r="14" fill="#151922" stroke="rgba(255,255,255,0.2)" strokeWidth="1.2" />
                <rect x="602" y="234" width="12" height="12" fill="none" stroke="#ec4899" strokeWidth="2.4" filter="url(#btn-glow)" />
              </g>
            </g>

            {/* ── Left Analog Thumbstick (Tilt Physics) ── */}
            <g
              ref={leftStickRef}
              className={`hero-3d__interactive-part hero-3d__stick-group ${activeBtn === 'l3' ? 'hero-3d__part--pressed' : ''}`}
              onClick={(e) => triggerButton('l3', '#00f0ff', e)}
              style={{ cursor: 'pointer' }}
            >
              {/* Outer Base Recess */}
              <circle cx="340" cy="370" r="54" fill="#080a0e" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
              {/* Movable Thumbstick Cap */}
              <circle cx="340" cy="370" r="42" fill="url(#stick-rim-grad)" stroke="#222834" strokeWidth="2.5" />
              <circle cx="340" cy="370" r="28" fill="#111419" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
              {/* Grip Texture Ring */}
              <circle cx="340" cy="370" r="35" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" strokeDasharray="3 3" />
            </g>

            {/* ── Right Analog Thumbstick (Tilt Physics) ── */}
            <g
              ref={rightStickRef}
              className={`hero-3d__interactive-part hero-3d__stick-group ${activeBtn === 'r3' ? 'hero-3d__part--pressed' : ''}`}
              onClick={(e) => triggerButton('r3', '#00f0ff', e)}
              style={{ cursor: 'pointer' }}
            >
              {/* Outer Base Recess */}
              <circle cx="560" cy="370" r="54" fill="#080a0e" stroke="rgba(255,255,255,0.1)" strokeWidth="1.5" />
              {/* Movable Thumbstick Cap */}
              <circle cx="560" cy="370" r="42" fill="url(#stick-rim-grad)" stroke="#222834" strokeWidth="2.5" />
              <circle cx="560" cy="370" r="28" fill="#111419" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
              {/* Grip Texture Ring */}
              <circle cx="560" cy="370" r="35" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" strokeDasharray="3 3" />
            </g>
          </svg>
        </div>
      </div>

      {/* Interactive Haptic Wave Ripple */}
      {hapticRipple && (
        <div
          className="hero-3d__haptic-ripple"
          style={{
            left: `${hapticRipple.x}px`,
            top: `${hapticRipple.y}px`,
            borderColor: hapticRipple.color,
            boxShadow: `0 0 25px ${hapticRipple.color}`,
          }}
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
                    loading="lazy"
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
