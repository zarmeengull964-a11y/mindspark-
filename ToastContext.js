import { createContext, useContext, useState, useCallback, useRef } from 'react';

const ToastContext = createContext({ toast: () => {} });

export function ToastProvider({ children }) {
  const [msg, setMsg] = useState('');
  const [show, setShow] = useState(false);
  const timer = useRef(null);

  const toast = useCallback((message) => {
    setMsg(message);
    setShow(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setShow(false), 2400);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className={`ms-toast ${show ? 'show' : ''}`} role="status" aria-live="polite">{msg}</div>
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);
