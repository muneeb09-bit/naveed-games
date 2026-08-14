'use client';

import { useState, useEffect, useRef } from 'react';

interface Ps5ControllerCursorProps {
  heroRef: React.RefObject<HTMLDivElement | null>;
  mode?: 'playstation' | 'xbox';
}

export function Ps5ControllerCursor({ heroRef, mode = 'playstation' }: Ps5ControllerCursorProps) {
  const [visible, setVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Detect touch / mobile device
    if (typeof window !== 'undefined') {
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      if (hasTouch && window.innerWidth < 1024) {
        setIsTouchDevice(true);
        return;
      }
    }

    const hero = heroRef.current;
    if (!hero) return;

    let rafId: number;
    let targetX = -100;
    let targetY = -100;
    let currentX = -100;
    let currentY = -100;
    let prevX = -100;
    let prevY = -100;
    let tilt = 0;

    const onMouseMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      const inBounds =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      if (inBounds) {
        setVisible(true);
        targetX = e.clientX - rect.left;
        targetY = e.clientY - rect.top;

        // Check if hovering over interactive elements
        const target = e.target as HTMLElement | null;
        const isInteractive = !!target?.closest('a, button, input, [role="button"], .hero-mode-toggle__btn');
        setIsHovering(isInteractive);
      } else {
        setVisible(false);
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setVisible(false);

    // Smooth Lerp loop with dynamic velocity tilt
    const animate = () => {
      currentX += (targetX - currentX) * 0.24;
      currentY += (targetY - currentY) * 0.24;

      const vx = currentX - prevX;
      prevX = currentX;
      prevY = currentY;

      // Target tilt based on horizontal velocity (clamped -15 to 15 deg)
      const targetTilt = Math.max(-16, Math.min(16, vx * 1.8));
      tilt += (targetTilt - tilt) * 0.18;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0) rotate(${tilt}deg)`;
      }

      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    hero.addEventListener('mouseleave', onMouseLeave);

    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      hero.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, [heroRef]);

  if (isTouchDevice || !visible) return null;

  const isPlayStation = mode === 'playstation';
  const accentColor = isPlayStation ? '#0070D1' : '#10B981';
  const glowColor = isPlayStation ? 'rgba(0, 112, 209, 0.55)' : 'rgba(16, 185, 129, 0.55)';
  const lightbarColor = isPlayStation ? '#38BDF8' : '#34D399';

  return (
    <div
      ref={cursorRef}
      className={`ps5-controller-cursor ${isHovering ? 'ps5-controller-cursor--hover' : ''} ${
        isClicking ? 'ps5-controller-cursor--click' : ''
      }`}
      style={{
        pointerEvents: 'none',
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 90,
      }}
      aria-hidden="true"
    >
      {/* Sci-Fi HUD Targeting Brackets [ ] */}
      <div className="ps5-cursor-brackets">
        <span className="ps5-bracket ps5-bracket--tl" style={{ borderColor: lightbarColor }} />
        <span className="ps5-bracket ps5-bracket--tr" style={{ borderColor: lightbarColor }} />
        <span className="ps5-bracket ps5-bracket--bl" style={{ borderColor: lightbarColor }} />
        <span className="ps5-bracket ps5-bracket--br" style={{ borderColor: lightbarColor }} />
      </div>

      {/* Photorealistic DualSense / Controller Vector */}
      <div
        className="ps5-cursor-controller"
        style={{
          filter: `drop-shadow(0 0 14px ${glowColor}) drop-shadow(0 4px 8px rgba(0,0,0,0.6))`,
        }}
      >
        <svg
          viewBox="0 0 100 75"
          width="54"
          height="41"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Defs for gradients & glowing lightbars */}
          <defs>
            <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E293B" />
              <stop offset="50%" stopColor="#0F172A" />
              <stop offset="100%" stopColor="#0B0F17" />
            </linearGradient>

            <linearGradient id="whiteShellGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F8FAFC" />
              <stop offset="60%" stopColor="#E2E8F0" />
              <stop offset="100%" stopColor="#CBD5E1" />
            </linearGradient>

            <linearGradient id="touchpadGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1E293B" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>

            <linearGradient id="lightbarGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={lightbarColor} stopOpacity="0.4" />
              <stop offset="50%" stopColor={lightbarColor} stopOpacity="1" />
              <stop offset="100%" stopColor={lightbarColor} stopOpacity="0.4" />
            </linearGradient>
          </defs>

          {/* L2/R2 Shoulder Triggers Background */}
          <path d="M22 6C24 4 28 4 33 6L33 12L22 12Z" fill="#334155" stroke="#475569" strokeWidth="0.8" />
          <path d="M78 6C76 4 72 4 67 6L67 12L78 12Z" fill="#334155" stroke="#475569" strokeWidth="0.8" />

          {/* L1/R1 Bumpers */}
          <path d="M20 10C24 9 32 9 37 11L36 15L19 14Z" fill="#1E293B" stroke="#475569" strokeWidth="0.8" />
          <path d="M80 10C76 9 68 9 63 11L64 15L81 14Z" fill="#1E293B" stroke="#475569" strokeWidth="0.8" />

          {/* Black Under-Chassis Core */}
          <path
            d="M30 18C36 18 40 19 50 19C60 19 64 18 70 18C80 18 88 28 89 44C90 56 82 66 74 66C68 66 63 58 60 52C56 50 53 50 50 50C47 50 44 50 40 52C37 58 32 66 26 66C18 66 10 56 11 44C12 28 20 18 30 18Z"
            fill="url(#bodyGrad)"
            stroke="#1E293B"
            strokeWidth="1.2"
          />

          {/* DualSense Signature White/Grey Ergonomic Wing Shells */}
          {/* Left Wing Shell */}
          <path
            d="M26 13C32 13 36 16 38 21C35 24 33 29 33 36C33 46 36 53 38 56C35 60 30 67 24 67C17 67 8 57 10 42C11 26 17 13 26 13Z"
            fill="url(#whiteShellGrad)"
            stroke="#94A3B8"
            strokeWidth="0.8"
          />
          {/* Right Wing Shell */}
          <path
            d="M74 13C68 13 64 16 62 21C65 24 67 29 67 36C67 46 64 53 62 56C65 60 70 67 76 67C83 67 92 57 90 42C89 26 83 13 74 13Z"
            fill="url(#whiteShellGrad)"
            stroke="#94A3B8"
            strokeWidth="0.8"
          />

          {/* Touchpad Plate */}
          <path
            d="M38 18H62L60 35H40L38 18Z"
            fill="url(#touchpadGrad)"
            stroke="#334155"
            strokeWidth="1"
          />

          {/* DualSense Neon LED Lightbar Strip wrapping around Touchpad */}
          <path
            d="M37 17L39 36L41 37H59L61 36L63 17"
            stroke="url(#lightbarGrad)"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* D-Pad (Left Section) */}
          <g transform="translate(24, 30)">
            {/* Center D-pad base */}
            <circle cx="0" cy="0" r="8" fill="#0B0F17" stroke="#1E293B" strokeWidth="0.8" />
            {/* Up Button */}
            <path d="M-2.5 -2.5L-2.5 -7.5L2.5 -7.5L2.5 -2.5Z" fill="#1E293B" stroke="#475569" strokeWidth="0.6" />
            {/* Down Button */}
            <path d="M-2.5 2.5L-2.5 7.5L2.5 7.5L2.5 2.5Z" fill="#1E293B" stroke="#475569" strokeWidth="0.6" />
            {/* Left Button */}
            <path d="M-2.5 -2.5L-7.5 -2.5L-7.5 2.5L-2.5 2.5Z" fill="#1E293B" stroke="#475569" strokeWidth="0.6" />
            {/* Right Button */}
            <path d="M2.5 -2.5L7.5 -2.5L7.5 2.5L2.5 2.5Z" fill="#1E293B" stroke="#475569" strokeWidth="0.6" />
          </g>

          {/* Action Buttons (Right Section: △ ○ ✕ □) */}
          <g transform="translate(76, 30)">
            {/* Base well */}
            <circle cx="0" cy="0" r="8" fill="#0B0F17" stroke="#1E293B" strokeWidth="0.8" />
            {/* Triangle (Top - Cyan) */}
            <circle cx="0" cy="-5" r="2.2" fill="#0F172A" stroke="#38BDF8" strokeWidth="0.8" />
            <polygon points="0,-6 1,-4.2 -1,-4.2" fill="#38BDF8" />

            {/* Circle (Right - Coral Red) */}
            <circle cx="5" cy="0" r="2.2" fill="#0F172A" stroke="#F87171" strokeWidth="0.8" />
            <circle cx="5" cy="0" r="1.1" stroke="#F87171" strokeWidth="0.6" fill="none" />

            {/* Cross (Bottom - Electric Blue) */}
            <circle cx="0" cy="5" r="2.2" fill="#0F172A" stroke="#0070D1" strokeWidth="0.8" />
            <line x1="-0.8" y1="4.2" x2="0.8" y2="5.8" stroke="#0070D1" strokeWidth="0.7" strokeLinecap="round" />
            <line x1="0.8" y1="4.2" x2="-0.8" y2="5.8" stroke="#0070D1" strokeWidth="0.7" strokeLinecap="round" />

            {/* Square (Left - Neon Pink) */}
            <circle cx="-5" cy="0" r="2.2" fill="#0F172A" stroke="#E879F9" strokeWidth="0.8" />
            <rect x="-5.8" y="-0.8" width="1.6" height="1.6" stroke="#E879F9" strokeWidth="0.6" fill="none" />
          </g>

          {/* Left Analog Thumbstick */}
          <g transform="translate(37, 46)">
            {/* Outer socket bezel */}
            <circle cx="0" cy="0" r="8" fill="#090D14" stroke="#1E293B" strokeWidth="1" />
            {/* Concave thumbstick cap */}
            <circle cx="0" cy="0" r="6" fill="#1E293B" stroke="#475569" strokeWidth="0.8" />
            {/* Rubber grip ring */}
            <circle cx="0" cy="0" r="4.2" fill="#0F172A" stroke={accentColor} strokeWidth="0.6" />
            <circle cx="0" cy="0" r="2" fill={lightbarColor} opacity="0.8" />
          </g>

          {/* Right Analog Thumbstick */}
          <g transform="translate(63, 46)">
            {/* Outer socket bezel */}
            <circle cx="0" cy="0" r="8" fill="#090D14" stroke="#1E293B" strokeWidth="1" />
            {/* Concave thumbstick cap */}
            <circle cx="0" cy="0" r="6" fill="#1E293B" stroke="#475569" strokeWidth="0.8" />
            {/* Rubber grip ring */}
            <circle cx="0" cy="0" r="4.2" fill="#0F172A" stroke={accentColor} strokeWidth="0.6" />
            <circle cx="0" cy="0" r="2" fill={lightbarColor} opacity="0.8" />
          </g>

          {/* PS Logo Button (Center) */}
          <g transform="translate(50, 41)">
            <circle cx="0" cy="0" r="2.8" fill="#0B0F17" stroke="#475569" strokeWidth="0.6" />
            <path d="M-1.2 -1.2L1.2 0L-1.2 1.2Z" fill="#F8FAFC" />
          </g>

          {/* Mic Mute Indicator Light */}
          <rect x="48.5" y="47" width="3" height="1.2" rx="0.6" fill="#F59E0B" opacity="0.9" />

          {/* Share & Options Micro Buttons */}
          <rect x="34" y="21" width="2" height="4" rx="1" fill="#475569" />
          <rect x="64" y="21" width="2" height="4" rx="1" fill="#475569" />
        </svg>
      </div>
    </div>
  );
}
