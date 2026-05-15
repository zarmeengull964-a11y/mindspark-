import { createContext, useContext, useEffect, useState, useCallback } from 'react';

const AuthContext = createContext(null);

export const API_BASE =
  import.meta.env.VITE_API_BASE ||
  'http://localhost/backend';


async function sha256(text) {
  try {
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
    return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
  } catch {
    // Fallback — simple sum (not cryptographically strong, but keeps the app working)
    let h = 0;
    for (let i = 0; i < text.length; i++) h = (Math.imul(31, h) + text.charCodeAt(i)) | 0;
    return Math.abs(h).toString(16).padStart(8, '0');
  }
}

const LS_USERS = 'ms-local-users';
const LS_USER  = 'ms-user';
const LS_TOKEN = 'ms-token';

function readLocalUsers() {
  try { return JSON.parse(localStorage.getItem(LS_USERS) || '[]'); } catch { return []; }
}
function writeLocalUsers(users) {
  try { localStorage.setItem(LS_USERS, JSON.stringify(users)); } catch {}
}

async function tryPhp(path, body, token) {
  try {
    const res = await fetch(`${API_BASE}${path}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: JSON.stringify(body || {}),
    });
    return await res.json().catch(() => ({}));
  } catch {
    return { ok: false, _network: true };
  }
}

export function AuthProvider({ children }) {
  const [user, setUser]   = useState(() => {
    try { const r = localStorage.getItem(LS_USER); return r ? JSON.parse(r) : null; } catch { return null; }
  });
  const [token, setToken] = useState(() => localStorage.getItem(LS_TOKEN) || null);

  useEffect(() => {
    try {
      if (user) localStorage.setItem(LS_USER, JSON.stringify(user)); else localStorage.removeItem(LS_USER);
      if (token) localStorage.setItem(LS_TOKEN, token); else localStorage.removeItem(LS_TOKEN);
    } catch {}
  }, [user, token]);


  const login = useCallback(async (email, password) => {
    const em = email.trim().toLowerCase();
    if (!em || !password || password.length < 6) {
      return { ok: false, error: 'Invalid credentials. Password needs 6+ chars.' };
    }

    const hash = await sha256(password);
    const users = readLocalUsers();
    const found = users.find(u => u.email === em);

    if (!found) {

      const r = await tryPhp('/login.php', { email: em, password });
      if (r.ok && r.user) {
    
        const h = await sha256(password);
        if (!users.find(u => u.email === em)) {
          writeLocalUsers([...users, { id: r.user.id || em, name: r.user.name, email: em, hash: h }]);
        }
        const tok = r.token || `local-${Date.now()}`;
        setUser(r.user); setToken(tok);
        return { ok: true };
      }
      return { ok: false, error: 'No account found with that email.' };
    }

    if (found.hash !== hash) return { ok: false, error: 'Incorrect password.' };

    const tok = `local-${Date.now()}`;
    setUser({ name: found.name, email: found.email });
    setToken(tok);

    tryPhp('/login.php', { email: em, password }).catch(() => {});

    return { ok: true };
  }, []);

 
  const signup = useCallback(async (name, email, password) => {
    const em = email.trim().toLowerCase();
    if (!name || !em || !password) return { ok: false, error: 'All fields required.' };

    const users = readLocalUsers();
    if (users.find(u => u.email === em)) return { ok: false, error: 'Email already registered.' };

    const hash = await sha256(password);
    const newUser = { id: `local-${Date.now()}`, name: name.trim(), email: em, hash };
    writeLocalUsers([...users, newUser]);

    const tok = `local-${Date.now()}`;
    setUser({ name: newUser.name, email: newUser.email });
    setToken(tok);

    tryPhp('/signup.php', { name: newUser.name, email: em, password }).catch(() => {});

    return { ok: true };
  }, []);

  const loginWithGoogle = useCallback(async (credential) => {
    if (!credential) return { ok: false, error: 'Missing Google credential.' };

  
    try {
      const payload = JSON.parse(atob(credential.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
      const { email, name, sub } = payload;
      if (!email) return { ok: false, error: 'Google did not return an email.' };

      const em = email.toLowerCase();
      const users = readLocalUsers();
      if (!users.find(u => u.email === em)) {
        writeLocalUsers([...users, { id: `google-${sub || Date.now()}`, name: name || em, email: em, hash: null, google: true }]);
      }
      const tok = `google-${Date.now()}`;
      setUser({ name: name || em.split('@')[0], email: em });
      setToken(tok);

      tryPhp('/google.php', { credential }).catch(() => {});

      return { ok: true };
    } catch {
      return { ok: false, error: 'Failed to parse Google credential.' };
    }
  }, []);


  const logout = useCallback(async () => {
    if (token) tryPhp('/logout.php', {}, token).catch(() => {});
    setUser(null); setToken(null);
  }, [token]);

  return (
    <AuthContext.Provider value={{ user, token, login, signup, logout, loginWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
