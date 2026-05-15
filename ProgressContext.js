import { createContext, useContext, useEffect, useState, useCallback, useMemo } from 'react';

const ProgressContext = createContext(null);
const STORAGE_KEY = 'ms-progress';

const LEVELS = [
  { name: 'Beginner',  min: 0 },
  { name: 'Explorer',  min: 200 },
  { name: 'Developer', min: 500 },
  { name: 'Pro',       min: 1000 },
  { name: 'Expert',    min: 2000 },
];

function normalize(obj) {
  const safe = obj && typeof obj === 'object' ? obj : {};
  return {
    xp: typeof safe.xp === 'number' && !isNaN(safe.xp) ? safe.xp : 0,
    completed: safe.completed && typeof safe.completed === 'object' ? safe.completed : {},
  };
}

function loadInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { xp: 0, completed: {} };
    return normalize(JSON.parse(raw));
  } catch {
    return { xp: 0, completed: {} };
  }
}

export function ProgressProvider({ children }) {
  const [data, setData] = useState(loadInitial);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch {}
  }, [data]);

  useEffect(() => {
    function onStorage(e) {
      if (e.key !== STORAGE_KEY || !e.newValue) return;
      try {
        const incoming = normalize(JSON.parse(e.newValue));
        setData(prev => {
          const p = normalize(prev);
          return {
            xp: Math.max(p.xp, incoming.xp),
            completed: { ...p.completed, ...incoming.completed },
          };
        });
      } catch {}
    }
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);


  const completeTopic = useCallback((language, topicId, xp = 10) => {
    setData(d => {
      const safe = normalize(d);
      const key = `${language}:${topicId}`;
      if (safe.completed[key]) return safe;
      return { xp: safe.xp + xp, completed: { ...safe.completed, [key]: Date.now() } };
    });
  }, []);

  const isCompleted = useCallback((language, topicId) =>
    Boolean(normalize(data).completed[`${language}:${topicId}`]), [data]);

  const completedCount = useCallback((language) =>
    Object.keys(normalize(data).completed).filter(k => k.startsWith(`${language}:`)).length, [data]);

  const addXP = useCallback((amount) => setData(d => {
    const safe = normalize(d);
    return { ...safe, xp: safe.xp + amount };
  }), []);

  const reset = useCallback(() => setData({ xp: 0, completed: {} }), []);

  const safe = normalize(data);
  const level = useMemo(() => {
    let current = LEVELS[0];
    for (const l of LEVELS) if (safe.xp >= l.min) current = l;
    return current;
  }, [safe.xp]);

  return (
    <ProgressContext.Provider value={{ ...safe, completeTopic, isCompleted, completedCount, addXP, reset, level, LEVELS }}>
      {children}
    </ProgressContext.Provider>
  );
}

export const useProgress = () => useContext(ProgressContext);
