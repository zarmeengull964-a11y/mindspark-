import { useEffect, useState, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

function loadGoogleScript() {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') return resolve(false);
    if (window.google?.accounts?.id) return resolve(true);
    const existing = document.getElementById('google-gsi-script');
    if (existing) { existing.addEventListener('load', () => resolve(true)); return; }
    const s = document.createElement('script');
    s.id = 'google-gsi-script';
    s.src = 'https://accounts.google.com/gsi/client';
    s.async = true; s.defer = true;
    s.onload = () => resolve(true);
    s.onerror = () => resolve(false);
    document.head.appendChild(s);
  });
}

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
}

export default function SocialButtons({ onSuccess }) {
  const { loginWithGoogle } = useAuth();
  const { toast } = useToast();
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!GOOGLE_CLIENT_ID) return;
    let cancelled = false;
    (async () => {
      const ok = await loadGoogleScript();
      if (cancelled || !ok) return;
      try {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: async (response) => {
            setBusy(false);
            if (!response?.credential) return;
            const r = await loginWithGoogle(response.credential);
            if (r.ok) { toast('Signed in with Google!'); onSuccess?.(); }
            else toast('Google sign-in failed: ' + r.error);
          },
        });
        setReady(true);
      } catch{}
    })();
    return () => { cancelled = true; };
  }, [loginWithGoogle, toast, onSuccess]);

  const handleClick = useCallback(() => {
    if (!GOOGLE_CLIENT_ID) {
      toast('Add VITE_GOOGLE_CLIENT_ID in .env to enable Google sign-in.');
      return;
    }
  
    const redirectFlow = () => {
      const params = new URLSearchParams({
        client_id: GOOGLE_CLIENT_ID,
        redirect_uri: window.location.origin + '/signup',
        response_type: 'token id_token',
        scope: 'openid email profile',
        nonce: Math.random().toString(36).slice(2),
        prompt: 'select_account',
      });
      window.location.href =
        'https://accounts.google.com/o/oauth2/v2/auth?' + params.toString();
    };
    if (!ready || !window.google?.accounts?.id) { redirectFlow(); return; }
    setBusy(true);
    try {
      window.google.accounts.id.prompt((notification) => {
        if (notification.isNotDisplayed?.() || notification.isSkippedMoment?.()) {
          setBusy(false);
          redirectFlow();
        }
      });
    } catch {
      setBusy(false);
      redirectFlow();
    }
  }, [ready, toast]);

  return (
    <div className="ms-social-wrap">
      <div className="ms-google-btn-wrap">
        <button
          type="button"
          className="ms-google-btn"
          onClick={handleClick}
          disabled={busy}
          aria-label="Continue with Google"
        >
          <GoogleIcon />
          <span>{busy ? 'Opening Google…' : 'Continue with Google'}</span>
        </button>
      </div>
      {!GOOGLE_CLIENT_ID && (
        <p className="ms-google-unconfigured-note">
          Set <code>VITE_GOOGLE_CLIENT_ID</code> in <code>.env</code> to enable real Google sign-in.
        </p>
      )}
    </div>
  );
}
