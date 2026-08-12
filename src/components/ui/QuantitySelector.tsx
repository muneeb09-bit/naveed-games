'use client';

import { Minus, Plus } from '@phosphor-icons/react';

interface QuantitySelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 99,
}: QuantitySelectorProps) {
  return (
    <div className="qty-selector">
      <button
        className="qty-selector__btn"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label="Decrease quantity"
        type="button"
      >
        <Minus size={14} weight="bold" />
      </button>
      <input
        className="qty-selector__input"
        type="number"
        value={value}
        min={min}
        max={max}
        onChange={(e) => {
          const num = parseInt(e.target.value, 10);
          if (!isNaN(num)) onChange(Math.min(max, Math.max(min, num)));
        }}
        aria-label="Quantity"
      />
      <button
        className="qty-selector__btn"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label="Increase quantity"
        type="button"
      >
        <Plus size={14} weight="bold" />
      </button>
    </div>
  );
}
