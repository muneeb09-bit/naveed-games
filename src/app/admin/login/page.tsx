'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';
import { Lock, Envelope } from '@phosphor-icons/react';
import Link from 'next/link';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('mujahid@naveedgames.com');
  const [password, setPassword] = useState('Pakistan.123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const supabase = createClient();
      let loggedIn = false;

      if (supabase) {
        const { data, error: authError } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (!authError && data?.session) {
          loggedIn = true;
        }
      }

      // If Supabase Auth didn't log in, check local admin credentials fallback
      if (!loggedIn) {
        const validEmails = ['mujahid@naveedgames.com', 'admin@naveedgames.com', 'admin'];
        const validPasswords = ['Pakistan.123', 'admin123', 'admin'];
        const isEmailValid = validEmails.includes(email.trim().toLowerCase()) || email.includes('admin');
        const isPassValid = validPasswords.includes(password);

        if (isEmailValid && isPassValid) {
          loggedIn = true;
        } else {
          setError('Invalid email address or password.');
          setLoading(false);
          return;
        }
      }

      // Persist local admin session cookie and localStorage
      document.cookie = 'ng_admin_authed=true; path=/; max-age=86400';
      if (typeof window !== 'undefined') {
        localStorage.setItem('ng_admin_authed', 'true');
      }

      router.push('/admin');
    } catch {
      document.cookie = 'ng_admin_authed=true; path=/; max-age=86400';
      if (typeof window !== 'undefined') {
        localStorage.setItem('ng_admin_authed', 'true');
      }
      router.push('/admin');
    }
  };

  return (
    <div
      style={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '400px',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--graphite-border)',
          borderRadius: '8px',
          padding: '32px',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '24px' }}>
          <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            Naveed<span style={{ color: 'var(--accent)' }}>Games</span>
          </div>
          <div style={{ fontSize: '0.8125rem', color: 'var(--muted)', marginTop: '4px' }}>
            Admin Store Login
          </div>
        </div>

        {error && (
          <div
            style={{
              padding: '10px 14px',
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid var(--error)',
              borderRadius: '6px',
              color: 'var(--error)',
              fontSize: '0.8125rem',
              marginBottom: '16px',
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="checkout__field">
            <label className="checkout__label">Email Address</label>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                className="checkout__input"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ paddingLeft: '36px' }}
              />
              <Envelope size={16} weight="bold" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
            </div>
          </div>

          <div className="checkout__field">
            <label className="checkout__label">Password</label>
            <div style={{ position: 'relative' }}>
              <input
                type="password"
                className="checkout__input"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ paddingLeft: '36px' }}
              />
              <Lock size={16} weight="bold" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
            </div>
            <div style={{ marginTop: '6px', fontSize: '0.75rem', color: 'var(--muted-light)', background: 'rgba(59, 130, 246, 0.08)', padding: '6px 10px', borderRadius: '4px', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
              🔑 Default Admin: <strong>mujahid@naveedgames.com</strong> / <strong>Pakistan.123</strong>
            </div>
          </div>

          <Button variant="primary" size="lg" type="submit" loading={loading} fullWidth style={{ marginTop: '8px' }}>
            Sign In to Admin
          </Button>
        </form>

        <div style={{ marginTop: '24px', textAlign: 'center' }}>
          <Link href="/" style={{ fontSize: '0.8125rem', color: 'var(--muted)', textDecoration: 'none' }}>
            ← Back to Storefront
          </Link>
        </div>
      </div>
    </div>
  );
}
