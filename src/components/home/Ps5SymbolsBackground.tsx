'use client';

import { useEffect, useRef } from 'react';

interface Shape {
  id: number;
  type: 'triangle' | 'circle' | 'cross' | 'square';
  x: number; // percentage 0-100
  y: number; // percentage 0-100
  size: number;
  color: string;
  depth: number; // parallax multiplier
  rotation: number;
  rotSpeed: number;
  opacity: number;
}

const SHAPES: Shape[] = [
  { id: 1, type: 'triangle', x: 12, y: 18, size: 28, color: '#38BDF8', depth: 0.04, rotation: 15, rotSpeed: 0.2, opacity: 0.35 },
  { id: 2, type: 'circle', x: 88, y: 22, size: 36, color: '#F87171', depth: 0.06, rotation: 0, rotSpeed: 0.1, opacity: 0.3 },
  { id: 3, type: 'cross', x: 75, y: 78, size: 32, color: '#0070D1', depth: 0.05, rotation: 45, rotSpeed: -0.25, opacity: 0.4 },
  { id: 4, type: 'square', x: 8, y: 75, size: 30, color: '#E879F9', depth: 0.03, rotation: 20, rotSpeed: 0.15, opacity: 0.3 },
  { id: 5, type: 'triangle', x: 48, y: 12, size: 22, color: '#38BDF8', depth: 0.02, rotation: -30, rotSpeed: -0.15, opacity: 0.25 },
  { id: 6, type: 'circle', x: 92, y: 65, size: 26, color: '#F87171', depth: 0.04, rotation: 0, rotSpeed: 0.1, opacity: 0.2 },
  { id: 7, type: 'cross', x: 38, y: 88, size: 24, color: '#0070D1', depth: 0.03, rotation: 10, rotSpeed: 0.2, opacity: 0.25 },
];

export function Ps5SymbolsBackground({ mouseX = 0, mouseY = 0 }: { mouseX: number; mouseY: number }) {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="ps5-symbols-bg" aria-hidden="true" ref={containerRef}>
      {SHAPES.map((shape) => {
        const offsetX = (mouseX - 0.5) * shape.depth * 80;
        const offsetY = (mouseY - 0.5) * shape.depth * 80;

        return (
          <div
            key={shape.id}
            className="ps5-symbol"
            style={{
              left: `${shape.x}%`,
              top: `${shape.y}%`,
              width: `${shape.size}px`,
              height: `${shape.size}px`,
              opacity: shape.opacity,
              transform: `translate3d(${offsetX}px, ${offsetY}px, 0) rotate(${shape.rotation}deg)`,
              transition: 'transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {shape.type === 'triangle' && (
              <svg viewBox="0 0 24 24" fill="none" stroke={shape.color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
                <polygon points="12 3 22 21 2 21" />
              </svg>
            )}
            {shape.type === 'circle' && (
              <svg viewBox="0 0 24 24" fill="none" stroke={shape.color} strokeWidth="2.2" width="100%" height="100%">
                <circle cx="12" cy="12" r="9" />
              </svg>
            )}
            {shape.type === 'cross' && (
              <svg viewBox="0 0 24 24" fill="none" stroke={shape.color} strokeWidth="2.4" strokeLinecap="round" width="100%" height="100%">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            )}
            {shape.type === 'square' && (
              <svg viewBox="0 0 24 24" fill="none" stroke={shape.color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" width="100%" height="100%">
                <rect x="3" y="3" width="18" height="18" rx="2" />
              </svg>
            )}
          </div>
        );
      })}
    </div>
  );
}
