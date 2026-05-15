import { createContext, useContext, useEffect, useState, useCallback } from 'react';

export const PALETTES = [
  { id: 'default',           name: 'Nude Sand',         accent: '#C8A07A', accent2: '#8B5A3C' },
  { id: 'calabrese',         name: 'Calabrese',         accent: '#E63946', accent2: '#1D3557' },
  { id: 'zombie',            name: 'Zombie',            accent: '#9DBF6F', accent2: '#3F4A2C' },
  { id: 'ebony',             name: 'Ebony',             accent: '#3C3C3C', accent2: '#0F0F0F' },
  { id: 'frozen-periwinkle', name: 'Frozen Periwinkle', accent: '#A7B6E0', accent2: '#5C6BC0' },
  { id: 'bolo-green',        name: 'Bolo Green',        accent: '#4F7942', accent2: '#1F3A1A' },
  { id: 'fabric-of-space',   name: 'Fabric of Space',   accent: '#5D3FD3', accent2: '#10002B' },
  { id: 'reptile-revenge',   name: 'Reptile Revenge',   accent: '#7CB342', accent2: '#33691E' },
  { id: 'siren',             name: 'Siren',             accent: '#FF1744', accent2: '#880E4F' },
  { id: 'stone-cold',        name: 'Stone Cold',        accent: '#90A4AE', accent2: '#37474F' },
  { id: 'philodendron',      name: 'Philodendron',      accent: '#2E7D32', accent2: '#1B5E20' },
  { id: 'walnut',            name: 'Walnut',            accent: '#8B5A2B', accent2: '#5D3A1A' },
  { id: 'poseidon',          name: 'Poseidon',          accent: '#0077B6', accent2: '#03045E' },
  { id: 'pinot-noir',        name: 'Pinot Noir',        accent: '#722F37', accent2: '#3A0F14' },
  { id: 'innocent-snowdrop', name: 'Innocent Snowdrop', accent: '#E8E8E8', accent2: '#B0BEC5' },
  { id: 'lonestar',          name: 'Lonestar',          accent: '#BF1722', accent2: '#5C0A11' },
  { id: 'realm-underworld',  name: 'Realm of Underworld', accent: '#6A1B9A', accent2: '#1A0033' },
  { id: 'very-coffee',       name: 'Very Coffee',       accent: '#6F4E37', accent2: '#3E2723' },
];

const ThemeContext = createContext({ theme: 'dark', mode: 'dark', palette: 'default', toggle: () => {}, setThemeMode: () => {}, setPalette: () => {} });

function getSystemTheme() {
  try {
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  } catch {
    return 'dark';
  }
}

function applyPalette(paletteId) {
  const p = PALETTES.find(x => x.id === paletteId) || PALETTES[0];
  const root = document.documentElement;
  root.style.setProperty('--ms-accent', p.accent);
  root.style.setProperty('--ms-accent-2', p.accent2);
  root.style.setProperty('--ms-grad-hero', `linear-gradient(135deg, ${p.accent} 0%, ${p.accent2} 100%)`);
  root.style.setProperty('--ms-grad-soft', `linear-gradient(135deg, ${p.accent}26, ${p.accent2}26)`);
  root.setAttribute('data-palette', p.id);
}

function resolveMode(setting) {
  return setting === 'light' ? 'light' : 'dark';
}

export function ThemeProvider({ children }) {
 
  const [theme, setThemeState] = useState(() => {
    try {
      const v = localStorage.getItem('ms-theme');
      return v === 'light' ? 'light' : 'dark';
    } catch { return 'dark'; }
  });
  const [palette, setPaletteState] = useState(() => {
    try { return localStorage.getItem('ms-palette') || 'default'; } catch { return 'default'; }
  });

  const mode = resolveMode(theme);

  useEffect(() => {
    document.documentElement.classList.toggle('light', mode === 'light');
    try { localStorage.setItem('ms-theme', theme); } catch {}
  }, [theme, mode]);

  useEffect(() => {
    if (theme !== 'system') return;
    const mq = window.matchMedia('(prefers-color-scheme: light)');
    const handler = () => {
      document.documentElement.classList.toggle('light', mq.matches);
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [theme]);

  useEffect(() => {
    applyPalette(palette);
    try { localStorage.setItem('ms-palette', palette); } catch {}
  }, [palette]);

  useEffect(() => {
    function onStorage(e) {
      if (e.key === 'ms-theme' && e.newValue) setThemeState(e.newValue);
      if (e.key === 'ms-palette' && e.newValue) setPaletteState(e.newValue);
    }
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const toggle = useCallback(() => setThemeState(t => {
    const current = resolveMode(t);
    return current === 'dark' ? 'light' : 'dark';
  }), []);

  const setThemeMode = useCallback((val) => setThemeState(val), []);
  const setPalette = useCallback((id) => setPaletteState(id), []);

  return (
    <ThemeContext.Provider value={{ theme, mode, toggle, setThemeMode, palette, setPalette, palettes: PALETTES }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
