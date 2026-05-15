import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import SocialButtons from '../components/SocialButtons';

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

export default function AuthPage() {
  const [tab, setTab] = useState('signup');

  const [name, setName] = useState('');
  const [suEmail, setSuEmail] = useState('');
  const [suPwd, setSuPwd] = useState('');
  const [suConfirm, setSuConfirm] = useState('');
  const [showSuPwd, setShowSuPwd] = useState(false);
  const [showSuConfirm, setShowSuConfirm] = useState(false);
  const [suErr, setSuErr] = useState('');
  const [suBusy, setSuBusy] = useState(false);

  const [siEmail, setSiEmail] = useState('');
  const [siPwd, setSiPwd] = useState('');
  const [showSiPwd, setShowSiPwd] = useState(false);
  const [siErr, setSiErr] = useState('');
  const [siBusy, setSiBusy] = useState(false);

  const { signup, login } = useAuth();
  const { toast } = useToast();
  const nav = useNavigate();

  const s = useMemo(() => strength(suPwd), [suPwd]);

  function switchTab(t) {
    setTab(t);
    setSuErr(''); setSiErr('');
  }

  async function handleSignup(e) {
    e.preventDefault();
    setSuErr('');
    if (!name.trim()) return setSuErr('Enter your name.');
    if (!/.+@.+\..+/.test(suEmail)) return setSuErr('Enter a valid email.');
    if (s < 2) return setSuErr('Choose a stronger password (at least "Okay").');
    if (suPwd !== suConfirm) return setSuErr("Passwords don't match.");
    setSuBusy(true);
    const r = await signup(name.trim(), suEmail.trim().toLowerCase(), suPwd);
    setSuBusy(false);
    if (!r.ok) return setSuErr(r.error);
    toast('Account created! Welcome to MindSpark 🎉');
    nav('/progress');
  }

  async function handleSignin(e) {
    e.preventDefault();
    setSiErr('');
    if (!/.+@.+\..+/.test(siEmail)) return setSiErr('Enter a valid email.');
    if (!siPwd) return setSiErr('Enter your password.');
    setSiBusy(true);
    const r = await login(siEmail.trim().toLowerCase(), siPwd);
    setSiBusy(false);
    if (!r.ok) return setSiErr(r.error);
    toast(`Welcome back, ${siEmail.split('@')[0]}!`);
    nav('/progress');
  }

  return (
    <div className="ms-auth-wrap">
      <div className="ms-auth ms-auth-pop">

        <div className="ms-auth-tabs">
          <button
            type="button"
            className={tab === 'signup' ? 'ms-auth-tab active' : 'ms-auth-tab'}
            onClick={() => switchTab('signup')}
          >
            Sign Up
          </button>
          <button
            type="button"
            className={tab === 'signin' ? 'ms-auth-tab active' : 'ms-auth-tab'}
            onClick={() => switchTab('signin')}
          >
            Sign In
          </button>
        </div>

        <SocialButtons onSuccess={() => nav('/progress')} />
        <div className="ms-or" style={{ marginTop: 16 }}>or</div>

        {tab === 'signup' && (
          <form onSubmit={handleSignup} noValidate autoComplete="on"
            onPaste={(e) => e.stopPropagation()}
            onCopy={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
          >
            <div className="ms-field">
              <label>Name</label>
              <input
                className="ms-input"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Your name"
                autoComplete="name"
              />
            </div>
            <div className="ms-field">
              <label>Email</label>
              <input
                className="ms-input"
                type="text"
                inputMode="email"
                value={suEmail}
                onChange={e => setSuEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>
            <div className="ms-field">
              <label>Password</label>
              <div className="ms-pwd-wrap">
                <input
                  className="ms-input"
                  type={showSuPwd ? 'text' : 'password'}
                  value={suPwd}
                  onChange={e => setSuPwd(e.target.value)}
                  placeholder="At least 6 characters"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="ms-pwd-toggle"
                  onClick={() => setShowSuPwd(v => !v)}
                  aria-label={showSuPwd ? 'Hide password' : 'Show password'}
                >
                  <EyeIcon open={showSuPwd} />
                </button>
              </div>
              <div className="ms-strength">
                <div style={{ width: `${(s / 5) * 100}%`, background: colors[s] }} />
              </div>
              <small style={{ color: 'var(--ms-text-dim)' }}>Strength: {labels[s]}</small>
            </div>
            <div className="ms-field">
              <label>Confirm Password</label>
              <div className="ms-pwd-wrap">
                <input
                  className="ms-input"
                  type={showSuConfirm ? 'text' : 'password'}
                  value={suConfirm}
                  onChange={e => setSuConfirm(e.target.value)}
                  placeholder="Re-enter your password"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  className="ms-pwd-toggle"
                  onClick={() => setShowSuConfirm(v => !v)}
                  aria-label={showSuConfirm ? 'Hide' : 'Show'}
                >
                  <EyeIcon open={showSuConfirm} />
                </button>
              </div>
              {suConfirm && suPwd !== suConfirm && (
                <div className="err" style={{ color: 'var(--ms-danger)' }}>Passwords don't match.</div>
              )}
            </div>
            {suErr && <div className="err" style={{ color: 'var(--ms-danger)', marginBottom: 10 }}>{suErr}</div>}
            <button
              className="ms-btn ms-btn-primary ms-btn-block ms-btn-auth"
              type="submit"
              disabled={suBusy}
            >
              {suBusy ? <span className="ms-btn-spinner" /> : null}
              {suBusy ? 'Creating account…' : 'Create Account'}
            </button>
          </form>
        )}

        {tab === 'signin' && (
          <form onSubmit={handleSignin} noValidate autoComplete="on"
            onPaste={(e) => e.stopPropagation()}
            onCopy={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
          >
            <div className="ms-field">
              <label>Email</label>
              <input
                className="ms-input"
                type="text"
                inputMode="email"
                value={siEmail}
                onChange={e => setSiEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>
            <div className="ms-field">
              <label>Password</label>
              <div className="ms-pwd-wrap">
                <input
                  className="ms-input"
                  type={showSiPwd ? 'text' : 'password'}
                  value={siPwd}
                  onChange={e => setSiPwd(e.target.value)}
                  placeholder="Your password"
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="ms-pwd-toggle"
                  onClick={() => setShowSiPwd(v => !v)}
                  aria-label={showSiPwd ? 'Hide password' : 'Show password'}
                >
                  <EyeIcon open={showSiPwd} />
                </button>
              </div>
            </div>
            {siErr && <div className="err" style={{ color: 'var(--ms-danger)', marginBottom: 10 }}>{siErr}</div>}
            <button
              className="ms-btn ms-btn-primary ms-btn-block ms-btn-auth"
              type="submit"
              disabled={siBusy}
            >
              {siBusy ? <span className="ms-btn-spinner" /> : null}
              {siBusy ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
