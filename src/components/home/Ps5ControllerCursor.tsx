'use client';

import { useState, useEffect, useRef } from 'react';

interface Ps5ControllerCursorProps {
  heroRef: React.RefObject<HTMLDivElement | null>;
  mode?: 'playstation' | 'xbox';
}

export function Ps5ControllerCursor({ heroRef, mode = 'playstation' }: Ps5ControllerCursorProps) {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [visible, setVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Detect touch device
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
        const isInteractive = !!target?.closest('a, button, input, [role="button"], .interactive-target');
        setIsHovering(isInteractive);
      } else {
        setVisible(false);
      }
    };

    const onMouseDown = () => setIsClicking(true);
    const onMouseUp = () => setIsClicking(false);
    const onMouseLeave = () => setVisible(false);

    // Smooth Lerp loop
    const animate = () => {
      currentX += (targetX - currentX) * 0.22;
      currentY += (targetY - currentY) * 0.22;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${currentX}px, ${currentY}px, 0)`;
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

  const accentColor = mode === 'playstation' ? '#0070D1' : '#10B981';
  const glowColor = mode === 'playstation' ? 'rgba(0, 112, 209, 0.45)' : 'rgba(16, 185, 129, 0.45)';

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
        zIndex: 50,
      }}
      aria-hidden="true"
    >
      {/* HUD Targeting Brackets [ ] */}
      <div className="ps5-cursor-brackets">
        <span className="ps5-bracket ps5-bracket--tl" style={{ borderColor: accentColor }} />
        <span className="ps5-bracket ps5-bracket--tr" style={{ borderColor: accentColor }} />
        <span className="ps5-bracket ps5-bracket--bl" style={{ borderColor: accentColor }} />
        <span className="ps5-bracket ps5-bracket--br" style={{ borderColor: accentColor }} />
      </div>

      {/* DualSense Vector Controller */}
      <div className="ps5-cursor-controller" style={{ filter: `drop-shadow(0 0 12px ${glowColor})` }}>
        <svg
          viewBox="0 0 64 48"
          width="38"
          height="30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Controller Outer Body */}
          <path
            d="M16 8C19 8 23 10 32 10C41 10 45 8 48 8C55 8 59 14 60 26C61 35 55 42 49 42C45 42 42 37 40 33C37 32 35 32 32 32C29 32 27 32 24 33C22 37 19 42 15 42C9 42 3 35 4 26C5 14 9 8 16 8Z"
            fill="#0F141E"
            stroke={accentColor}
            strokeWidth="1.8"
          />
          {/* Touchpad / Lightbar Glow */}
          <rect
            x="24"
            y="12"
            width="16"
            height="9"
            rx="2"
            fill="#161E2E"
            stroke={accentColor}
            strokeWidth="1.2"
          />
          {/* LED Lightbar Line */}
          <line
            x1="26"
            y1="13"
            x2="38"
            y2="13"
            stroke={accentColor}
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          {/* D-Pad (Left) */}
          <path
            d="M13 18H17M15 16V20"
            stroke="#94A3B8"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Action Buttons (Right: △ ○ ✕ □) */}
          <circle cx="49" cy="16" r="1.4" fill="#38BDF8" />
          <circle cx="52" cy="19" r="1.4" fill="#F87171" />
          <circle cx="49" cy="22" r="1.4" fill="#0070D1" />
          <circle cx="46" cy="19" r="1.4" fill="#E879F9" />
          {/* Analog Thumbsticks */}
          <circle cx="23" cy="26" r="4.5" fill="#141A24" stroke="#64748B" strokeWidth="1.2" />
          <circle cx="23" cy="26" r="2.2" fill={accentColor} />
          <circle cx="41" cy="26" r="4.5" fill="#141A24" stroke="#64748B" strokeWidth="1.2" />
          <circle cx="41" cy="26" r="2.2" fill={accentColor} />
        </svg>
      </div>
    </div>
  );
}
