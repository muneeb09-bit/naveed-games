import { Star, StarHalf } from '@phosphor-icons/react/dist/ssr';

interface RatingProps {
  value: number;
  count?: number;
  size?: number;
}

export function Rating({ value, count, size = 14 }: RatingProps) {
  const fullStars = Math.floor(value);
  const hasHalf = value - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  return (
    <div className="rating">
      <div className="rating__stars" aria-label={`${value} out of 5 stars`}>
        {Array.from({ length: fullStars }, (_, i) => (
          <Star key={`full-${i}`} weight="fill" size={size} />
        ))}
        {hasHalf && <StarHalf weight="fill" size={size} />}
        {Array.from({ length: emptyStars }, (_, i) => (
          <Star key={`empty-${i}`} weight="regular" size={size} />
        ))}
      </div>
      {count !== undefined && (
        <span className="rating__count">({count})</span>
      )}
    </div>
  );
}
