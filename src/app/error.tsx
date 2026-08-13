'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { ArrowClockwise, House, WhatsappLogo } from '@phosphor-icons/react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Unhandled App Error:', error);
  }, [error]);

  return (
    <div className="error-page">
      <div className="container" style={{ textAlign: 'center', maxWidth: '600px' }}>
        <div className="error-page__icon-wrap">
          <span>⚠️</span>
        </div>

        <h1 className="error-page__title">Something went wrong</h1>
        <p className="error-page__desc">
          An unexpected error occurred while loading this page. Don&apos;t worry, our team has been notified.
        </p>

        <div className="error-page__actions">
          <button
            className="button button--primary"
            onClick={() => reset()}
            type="button"
          >
            <ArrowClockwise size={18} weight="bold" />
            <span>Try Again</span>
          </button>
          <Link href="/" className="button button--secondary">
            <House size={18} weight="bold" />
            <span>Return Home</span>
          </Link>
        </div>

        <div className="error-page__whatsapp">
          <a
            href="https://wa.me/923339348891?text=Hi%20Naveed%20Games,%20I%20encountered%20an%20issue%20on%20the%20website"
            target="_blank"
            rel="noopener noreferrer"
            className="error-page__whatsapp-link"
          >
            <WhatsappLogo size={18} weight="fill" />
            <span>Report issue via WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
}
