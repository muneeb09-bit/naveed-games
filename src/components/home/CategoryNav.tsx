import Link from 'next/link';
import Image from 'next/image';
import {
  GameController,
  Desktop,
  Headphones,
  DeviceMobile,
  Lightning,
  Sparkle,
  ArrowRight,
} from '@phosphor-icons/react/dist/ssr';

interface CategoryCard {
  title: string;
  slug: string;
  description: string;
  itemCount: string;
  image: string;
  icon: React.ReactNode;
}

const FEATURED_CATEGORIES: CategoryCard[] = [
  {
    title: 'PlayStation',
    slug: 'playstation',
    description: 'PS5 Pro, Slim, DualSense & Exclusive Titles',
    itemCount: '24+ Items',
    image: '/images/products/ps5-pro-1.jpg',
    icon: <GameController size={20} weight="fill" />,
  },
  {
    title: 'Xbox',
    slug: 'xbox',
    description: 'Series X|S Consoles, Elite Controllers & Game Pass',
    itemCount: '18+ Items',
    image: '/images/products/xbox-x-1.jpg',
    icon: <Lightning size={20} weight="fill" />,
  },
  {
    title: 'Gaming PCs',
    slug: 'gaming-pcs',
    description: 'Custom RTX 4090 Rigs, Components & Laptops',
    itemCount: '15+ Items',
    image: '/images/products/custom-pc-1.jpg',
    icon: <Desktop size={20} weight="fill" />,
  },
  {
    title: 'Controllers',
    slug: 'controllers',
    description: 'DualSense Edge, Elite Series 2 & Custom Pads',
    itemCount: '20+ Items',
    image: '/images/products/dualsense-edge-1.jpg',
    icon: <GameController size={20} weight="fill" />,
  },
  {
    title: 'VR & Spatial',
    slug: 'vr-ar',
    description: 'Meta Quest 3, PS VR2 & Ray-Ban Meta Glasses',
    itemCount: '12+ Items',
    image: '/images/products/quest-3-1.jpg',
    icon: <DeviceMobile size={20} weight="fill" />,
  },
  {
    title: 'Accessories',
    slug: 'accessories',
    description: 'Audiophile Headsets, Keyboards, Mice & Racing Wheels',
    itemCount: '35+ Items',
    image: '/images/products/arctis-nova-pro-1.jpg',
    icon: <Headphones size={20} weight="fill" />,
  },
];

export function CategoryNav() {
  return (
    <section className="section-clean" id="categories">
      <div className="container">
        <div className="section-clean__header">
          <div>
            <h2 className="section-clean__title">Shop by Category</h2>
            <p className="section-clean__subtitle">Explore authentic hardware across our dedicated departments</p>
          </div>
          <Link href="/shop" className="section-clean__link">
            <span>All Categories</span>
            <ArrowRight size={14} weight="bold" />
          </Link>
        </div>

        <div className="category-clean-grid">
          {FEATURED_CATEGORIES.map((cat) => (
            <Link
              key={cat.slug}
              href={`/shop/${cat.slug}`}
              className="category-clean-card"
            >
              <div className="category-clean-card__thumb-wrap">
                <Image
                  src={cat.image}
                  alt={cat.title}
                  width={240}
                  height={240}
                  className="category-clean-card__thumb"
                />
              </div>

              <div className="category-clean-card__body">
                <div className="category-clean-card__icon-pill">
                  {cat.icon}
                </div>
                <div className="category-clean-card__text">
                  <h3 className="category-clean-card__title">{cat.title}</h3>
                  <p className="category-clean-card__desc">{cat.description}</p>
                </div>
                <div className="category-clean-card__footer">
                  <span className="category-clean-card__count">{cat.itemCount}</span>
                  <span className="category-clean-card__arrow">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
