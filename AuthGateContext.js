import { createContext, useCallback, useContext, useState } from 'react';
import SignupModal from '../components/SignupModal';
import { useAuth } from './AuthContext';

const AuthGateContext = createContext(null);

export function AuthGateProvider({ children }) {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState('signup');
  const [pendingMessage, setPendingMessage] = useState('');

  const openAuth = useCallback((m = 'signup', message = '') => {
    setMode(m);
    setPendingMessage(message);
    setOpen(true);
  }, []);

  const requireAuth = useCallback((fn, message = 'Please sign in to use this feature.') => {
    if (user) {
      try { fn && fn(); } catch (e) { console.error(e); }
      return true;
    }
    openAuth('login', message);
    return false;
  }, [user, openAuth]);

  return (
    <AuthGateContext.Provider value={{ openAuth, requireAuth, isAuthed: !!user }}>
      {children}
      <SignupModal
        open={open}
        onClose={() => { setOpen(false); setPendingMessage(''); }}
        initialMode={mode}
        notice={pendingMessage}
      />
    </AuthGateContext.Provider>
  );
}

export const useAuthGate = () => {
  const ctx = useContext(AuthGateContext);
  if (!ctx) return { openAuth: () => {}, requireAuth: (fn) => { fn && fn(); return true; }, isAuthed: false };
  return ctx;
};
