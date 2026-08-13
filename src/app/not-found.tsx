import Link from 'next/link';
import { GameController, House, MagnifyingGlass, ShoppingBag } from '@phosphor-icons/react/dist/ssr';

export default function NotFound() {
  return (
    <div className="not-found-page">
      <div className="container" style={{ textAlign: 'center', maxWidth: '600px' }}>
        <div className="not-found-page__graphic">
          <GameController size={72} weight="thin" className="not-found-page__icon" />
          <span className="not-found-page__code">404</span>
        </div>

        <h1 className="not-found-page__title">GAME OVER — PAGE NOT FOUND</h1>
        <p className="not-found-page__desc">
          The requested level or product page could not be found. It may have been moved or is currently out of stock.
        </p>

        <div className="not-found-page__actions">
          <Link href="/shop" className="button button--primary">
            <ShoppingBag size={18} weight="bold" />
            <span>Browse Shop</span>
          </Link>
          <Link href="/" className="button button--secondary">
            <House size={18} weight="bold" />
            <span>Go to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
