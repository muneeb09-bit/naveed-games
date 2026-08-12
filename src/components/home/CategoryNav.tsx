import Link from 'next/link';
import {
  GameController,
  Desktop,
  SteeringWheel,
  DeviceMobile,
  Disc,
  Monitor,
  Headphones,
  Armchair,
  Trophy,
  Drone,
  Watch,
} from '@phosphor-icons/react/dist/ssr';
import { categories } from '@/data/categories';

const iconMap: Record<string, React.ReactNode> = {
  GameController: <GameController size={24} weight="bold" />,
  Desktop: <Desktop size={24} weight="bold" />,
  SteeringWheel: <SteeringWheel size={24} weight="bold" />,
  DeviceMobile: <DeviceMobile size={24} weight="bold" />,
  Disc: <Disc size={24} weight="bold" />,
  Monitor: <Monitor size={24} weight="bold" />,
  Headphones: <Headphones size={24} weight="bold" />,
  Armchair: <Armchair size={24} weight="bold" />,
  Trophy: <Trophy size={24} weight="bold" />,
  Drone: <Drone size={24} weight="bold" />,
  Watch: <Watch size={24} weight="bold" />,
};

export function CategoryNav() {
  return (
    <section className="section" id="categories" style={{ paddingTop: 0 }}>
      <div className="container">
        <div className="category-nav">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/categories/${cat.slug}`}
              className="category-nav__item"
            >
              <span className="category-nav__icon">
                {iconMap[cat.icon] || <GameController size={24} weight="bold" />}
              </span>
              <span className="category-nav__label">{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
