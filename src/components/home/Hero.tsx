'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShieldCheck, Truck, Sparkle, GameController, Lightning } from '@phosphor-icons/react';
import { Ps5SymbolsBackground } from './Ps5SymbolsBackground';
import { Ps5ControllerCursor } from './Ps5ControllerCursor';

export function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0.5, y: 0.5 });
  const [platformMode, setPlatformMode] = useState<'playstation' | 'xbox'>('playstation');

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      const y = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));
      setMousePos({ x, y });
    };

    hero.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => hero.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const isPlayStation = platformMode === 'playstation';

  return (
    <section className={`hero-clean ${isPlayStation ? 'hero-clean--ps' : 'hero-clean--xbox'}`} ref={heroRef}>
      {/* Ambient Lighting */}
      <div className="hero-clean__bg-ambient" aria-hidden="true" />

      {/* Floating PS5 Geometric Symbols (△ ○ ✕ □) */}
      <Ps5SymbolsBackground mouseX={mousePos.x} mouseY={mousePos.y} />

      {/* Interactive DualSense Controller Cursor Follower */}
      <Ps5ControllerCursor heroRef={heroRef} mode={platformMode} />

      <div className="container hero-clean__container">
        {/* Left Content Column */}
        <div className="hero-clean__content">
          {/* Interactive Mode Switcher Pill */}
          <div className="hero-mode-toggle">
            <button
              type="button"
              className={`hero-mode-toggle__btn ${isPlayStation ? 'hero-mode-toggle__btn--active' : ''}`}
              onClick={() => setPlatformMode('playstation')}
            >
              <GameController size={15} weight={isPlayStation ? 'fill' : 'bold'} />
              <span>PLAYSTATION MODE</span>
            </button>
            <button
              type="button"
              className={`hero-mode-toggle__btn ${!isPlayStation ? 'hero-mode-toggle__btn--active-xbox' : ''}`}
              onClick={() => setPlatformMode('xbox')}
            >
              <Lightning size={15} weight={!isPlayStation ? 'fill' : 'bold'} />
              <span>XBOX VELOCITY</span>
            </button>
          </div>

          <div className="hero-clean__badge">
            <Sparkle size={14} weight="fill" />
            <span>Official Gaming & Creator Hardware</span>
          </div>

          <h1 className="hero-clean__title">
            PLAY WITHOUT <span className="hero-clean__highlight">{isPlayStation ? 'LIMITS.' : 'BOUNDARIES.'}</span>
          </h1>

          <p className="hero-clean__desc">
            {isPlayStation
              ? "Pakistan's premier destination for authentic PlayStation 5 Pro, DualSense Edge, PS VR2, custom RTX rigs, and genuine accessories with local warranty."
              : "Experience next-gen 4K 120FPS gaming with authentic Xbox Series X, Xbox Wireless Controllers, and high-performance hardware nationwide."}
          </p>

          <div className="hero-clean__actions">
            <Link
              href={isPlayStation ? '/shop/playstation' : '/shop/xbox'}
              className="btn-primary hero-clean__btn-primary"
            >
              <span>{isPlayStation ? 'EXPLORE PLAYSTATION' : 'EXPLORE XBOX'}</span>
              <ArrowRight size={16} weight="bold" />
            </Link>
            <Link href="/deals" className="btn-secondary hero-clean__btn-secondary">
              VIEW DEALS
            </Link>
          </div>

          {/* Clean Trust Pillars */}
          <div className="hero-clean__trust">
            <div className="hero-clean__trust-item">
              <ShieldCheck size={18} weight="fill" className="hero-clean__trust-icon" />
              <span>100% Genuine Stock</span>
            </div>
            <div className="hero-clean__trust-item">
              <Truck size={18} weight="fill" className="hero-clean__trust-icon" />
              <span>Express Delivery in Pakistan</span>
            </div>
          </div>
        </div>

        {/* Right Hardware Visual Column */}
        <div className="hero-clean__visual">
          <div className="hero-clean__visual-card">
            <div className="hero-clean__visual-glow" aria-hidden="true" />
            <Image
              src={isPlayStation ? '/images/products/ps5-pro-1.jpg' : '/images/products/xbox-series-x-1.jpg'}
              alt={isPlayStation ? 'PlayStation 5 Pro Console' : 'Xbox Series X Console'}
              width={560}
              height={560}
              className="hero-clean__visual-img"
              priority
            />
            <div className="hero-clean__visual-caption">
              <div className="hero-clean__caption-info">
                <span className="hero-clean__caption-tag">
                  {isPlayStation ? 'NOW AVAILABLE' : 'FLAGSHIP CONSOLE'}
                </span>
                <span className="hero-clean__caption-name">
                  {isPlayStation ? 'PlayStation 5 Pro · 2TB SSD' : 'Xbox Series X 1TB · 4K 120FPS'}
                </span>
              </div>
              <Link
                href={isPlayStation ? '/product/ps5-pro-2tb-console' : '/product/xbox-series-x-1tb'}
                className="hero-clean__caption-link"
              >
                Explore →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
