import { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

function strength(p) {
  let s = 0;
  if (p.length >= 6) s++;
  if (p.length >= 10) s++;
  if (/[A-Z]/.test(p) && /[a-z]/.test(p)) s++;
  if (/\d/.test(p)) s++;
  if (/[^A-Za-z0-9]/.test(p)) s++;
  return s;
}
const labels = ['Too weak','Weak','Okay','Good','Strong','Excellent'];
const colors = ['#ff5577','#ff8855','#ffb547','#a4d960','#18c97a','#C8A07A'];

function EyeIcon({ open }) {
  return open ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z"/><circle cx="12" cy="12" r="3"/>
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20C5 20 1 12 1 12a21.81 21.81 0 0 1 5.06-5.94"/>
      <path d="M9.9 4.24A10.94 10.94 0 0 1 12 4c7 0 11 8 11 8a21.79 21.79 0 0 1-3.17 4.19"/>
      <path d="M14.12 14.12A3 3 0 1 1 9.88 9.88"/><line x1="1" y1="1" x2="23" y2="23"/>
    </svg>
  );
}

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID || '';

function loadGoogleScript() {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') return resolve(false);
    if (window.google && window.google.accounts && window.google.accounts.id) return resolve(true);
    const existing = document.getElementById('google-identity-script');
    if (existing) {
      existing.addEventListener('load', () => resolve(true));
      return;
    }
    const s = document.createElement('script');
    s.id = 'google-identity-script';
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

export default function SignupModal({ open, onClose, initialMode = 'signup', notice = '' }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [c, setC] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [showC, setShowC] = useState(false);
  const [err, setErr] = useState('');
  const [busy, setBusy] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { signup, login, loginWithGoogle } = useAuth();
  const { toast } = useToast();
  const [mode, setMode] = useState(initialMode);
  const googleBtnRef = useRef(null);
  const firstInputRef = useRef(null);

  const s = useMemo(() => strength(pwd), [pwd]);

  useEffect(() => { if (open) { setMode(initialMode); setErr(''); setSubmitted(false); } }, [open, initialMode]);
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose && onClose(); };
    document.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
  
    const t = setTimeout(() => firstInputRef.current?.focus(), 80);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
      clearTimeout(t);
    };
  }, [open, onClose]);

  useEffect(() => {
    let cancelled = false;
    if (!open || !GOOGLE_CLIENT_ID) return;
    (async () => {
      const ok = await loadGoogleScript();
      if (cancelled || !ok || !googleBtnRef.current) return;
      try {
        window.google.accounts.id.initialize({
          client_id: GOOGLE_CLIENT_ID,
          callback: async (response) => {
            if (!response || !response.credential) return;
            setBusy(true);
            const r = await loginWithGoogle(response.credential);
            setBusy(false);
            if (r.ok) { toast('Signed in with Google!'); onClose && onClose(); }
            else setErr(r.error || 'Google sign-in failed.');
          },
        });
        if (googleBtnRef.current) {
          googleBtnRef.current.innerHTML = '';
          window.google.accounts.id.renderButton(googleBtnRef.current, {
            theme: 'outline', size: 'large', width: 320, text: 'continue_with',
          });
        }
      } catch {}
    })();
    return () => { cancelled = true; };
  }, [open, loginWithGoogle, onClose, toast]);

  if (!open) return null;

  const handleNameChange = (e) => { setName(e.target.value); if (err) setErr(''); };
  const handleEmailChange = (e) => { setEmail(e.target.value); if (err) setErr(''); };
  const handlePwdChange = (e) => { setPwd(e.target.value); if (err) setErr(''); };
  const handleCChange = (e) => { setC(e.target.value); if (err) setErr(''); };

  async function submit(e) {
    e.preventDefault();
    if (submitted || busy) return;
    setErr('');
    if (mode === 'signup') {
      if (!name.trim()) return setErr('Enter your name.');
      if (!/.+@.+\..+/.test(email)) return setErr('Enter a valid email.');
      if (s < 2) return setErr('Choose a stronger password.');
      if (pwd !== c) return setErr("Passwords don't match.");
      setSubmitted(true);
      setBusy(true);
      const r = await signup(name.trim(), email.trim().toLowerCase(), pwd);
      setBusy(false);
      if (!r.ok) { setSubmitted(false); return setErr(r.error); }
      toast('Account created! Welcome to MindSpark!');
      onClose && onClose();
    } else {
      if (!/.+@.+\..+/.test(email)) return setErr('Enter a valid email.');
      if (!pwd) return setErr('Enter your password.');
      setSubmitted(true);
      setBusy(true);
      const r = await login(email.trim().toLowerCase(), pwd);
      setBusy(false);
      if (!r.ok) { setSubmitted(false); return setErr(r.error); }
      toast('Welcome back!');
      onClose && onClose();
    }
  }

  function switchMode(m) {
    setMode(m);
    setErr('');
    setSubmitted(false);
    setName(''); setEmail(''); setPwd(''); setC('');
    setShowPwd(false); setShowC(false);
  }

  return (
    <div
      className="ms-signup-modal-backdrop"
      onMouseDown={(e) => { e.currentTarget.dataset.downOnBackdrop = (e.target === e.currentTarget) ? '1' : '0'; }}
      onMouseUp={(e) => {
        
        if (e.target === e.currentTarget && e.currentTarget.dataset.downOnBackdrop === '1') {
          onClose && onClose();
        }
        e.currentTarget.dataset.downOnBackdrop = '0';
      }}
      role="presentation"
    >
      <div
        className="ms-signup-modal ms-signup-modal-pop"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={mode === 'signup' ? 'Sign up' : 'Login'}
      >
        <button className="ms-signup-modal-close" onClick={onClose} aria-label="Close dialog" type="button">×</button>

        <div className="ms-signup-modal-body">
          <div className="ms-signup-modal-tabs">
            <button type="button" className={mode === 'signup' ? 'active' : ''} onClick={() => switchMode('signup')}>Sign Up</button>
            <button type="button" className={mode === 'login' ? 'active' : ''} onClick={() => switchMode('login')}>Login</button>
          </div>

          <h2 style={{ marginTop: 8 }}>{mode === 'signup' ? 'Create your account' : 'Welcome back'}</h2>
          <p className="sub" style={{ marginTop: -6, color: 'var(--ms-text-dim)' }}>
            {mode === 'signup' ? 'Join MindSpark and unlock all learning features' : 'Log in to continue learning'}
          </p>

          {notice && <div className="ms-auth-notice" role="status">{notice}</div>}

          {GOOGLE_CLIENT_ID ? (
            <div className="ms-google-wrap">
              <div ref={googleBtnRef} />
              <div className="ms-or-sep"><span>or</span></div>
            </div>
          ) : (
            <div className="ms-google-wrap">
              <div className="ms-google-btn-wrap">
                <button type="button" className="ms-google-btn" disabled title="Configure VITE_GOOGLE_CLIENT_ID to enable Google sign-in">
                  <GoogleIcon /><span>Continue with Google</span>
                </button>
              </div>
              <div className="ms-or-sep"><span>or</span></div>
            </div>
          )}

          <form onSubmit={submit} noValidate autoComplete="on">
            {mode === 'signup' && (
              <div className="ms-field">
                <label htmlFor="modal-name">Full Name</label>
                <input
                  id="modal-name"
                  ref={firstInputRef}
                  className="ms-input"
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                  onPaste={(e) => e.stopPropagation()}
                  onCopy={(e) => e.stopPropagation()}
                  placeholder="Your name"
                  autoComplete="name"
                  disabled={busy}
                />
              </div>
            )}
            <div className="ms-field">
              <label htmlFor="modal-email">Email</label>
              <input
                id="modal-email"
                ref={mode === 'login' ? firstInputRef : undefined}
                className="ms-input"
                type="text"
                inputMode="email"
                value={email}
                onChange={handleEmailChange}
                onPaste={(e) => e.stopPropagation()}
                onCopy={(e) => e.stopPropagation()}
                placeholder="you@example.com"
                autoComplete="email"
                disabled={busy}
              />
            </div>
            <div className="ms-field">
              <label htmlFor="modal-pwd">Password</label>
              <div className="ms-pwd-wrap">
                <input
                  id="modal-pwd"
                  className="ms-input"
                  type={showPwd ? 'text' : 'password'}
                  value={pwd}
                  onChange={handlePwdChange}
                  onPaste={(e) => e.stopPropagation()}
                  onCopy={(e) => {
                  
                    e.preventDefault();
                    e.stopPropagation();
                    try { e.clipboardData.setData('text/plain', pwd); } catch {}
                    if (navigator.clipboard) navigator.clipboard.writeText(pwd).catch(() => {});
                  }}
                  onCut={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    try { e.clipboardData.setData('text/plain', pwd); } catch {}
                    if (navigator.clipboard) navigator.clipboard.writeText(pwd).catch(() => {});
                  }}
                  placeholder={mode === 'signup' ? 'At least 6 characters' : 'Your password'}
                  autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                  disabled={busy}
                />
                <button type="button" className="ms-pwd-toggle" onClick={() => setShowPwd(v => !v)} aria-label={showPwd ? 'Hide password' : 'Show password'} tabIndex={-1}>
                  <EyeIcon open={showPwd} />
                </button>
              </div>
              {mode === 'signup' && (
                <>
                  <div className="ms-strength"><div style={{ width: `${(s / 5) * 100}%`, background: colors[s] }} /></div>
                  <small style={{ color: 'var(--ms-text-dim)' }}>Strength: {labels[s]}</small>
                </>
              )}
            </div>
            {mode === 'signup' && (
              <div className="ms-field">
                <label htmlFor="modal-confirm">Confirm Password</label>
                <div className="ms-pwd-wrap">
                  <input
                    id="modal-confirm"
                    className="ms-input"
                    type={showC ? 'text' : 'password'}
                    value={c}
                    onChange={handleCChange}
                    onPaste={(e) => e.stopPropagation()}
                    onCopy={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      try { e.clipboardData.setData('text/plain', c); } catch {}
                      if (navigator.clipboard) navigator.clipboard.writeText(c).catch(() => {});
                    }}
                    onCut={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      try { e.clipboardData.setData('text/plain', c); } catch {}
                      if (navigator.clipboard) navigator.clipboard.writeText(c).catch(() => {});
                    }}
                    placeholder="Re-enter your password"
                    autoComplete="new-password"
                    disabled={busy}
                  />
                  <button type="button" className="ms-pwd-toggle" onClick={() => setShowC(v => !v)} aria-label={showC ? 'Hide' : 'Show'} tabIndex={-1}>
                    <EyeIcon open={showC} />
                  </button>
                </div>
                {c && pwd !== c && <div className="err" style={{ color: 'var(--ms-danger)' }}>Passwords don't match.</div>}
              </div>
            )}
            {err && <div className="err" role="alert" style={{ color: 'var(--ms-danger)', marginBottom: 10 }}>{err}</div>}
            <button className="ms-btn ms-btn-primary ms-btn-block" type="submit" disabled={busy || submitted} aria-busy={busy}>
              {busy ? 'Please wait…' : (mode === 'signup' ? 'Sign Up' : 'Login')}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: 14, color: 'var(--ms-text-dim)' }}>
            {mode === 'signup' ? (
              <>Already have an account? <button type="button" className="ms-linklike" onClick={() => switchMode('login')}>Sign in</button></>
            ) : (
              <>New to MindSpark? <button type="button" className="ms-linklike" onClick={() => switchMode('signup')}>Create an account</button></>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
