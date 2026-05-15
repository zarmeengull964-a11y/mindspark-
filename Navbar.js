import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useTheme, PALETTES } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { useAuthGate } from '../context/AuthGateContext';
import { COURSE_LIST, SEARCH_INDEX } from '../data/courses';

function SunIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>; }
function MoonIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"/></svg>; }
function SystemIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>; }
function SearchIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>; }
function MenuIcon() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>; }
function CloseIcon() { return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 6l12 12M6 18L18 6"/></svg>; }
function AIIcon() { return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden><path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3z"/><path d="M19 14l.8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8L19 14z"/></svg>; }
function PaletteIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="9"/><circle cx="7.5" cy="10.5" r="1.2" fill="currentColor"/><circle cx="12" cy="7.5" r="1.2" fill="currentColor"/><circle cx="16.5" cy="10.5" r="1.2" fill="currentColor"/><circle cx="14.5" cy="15" r="1.2" fill="currentColor"/></svg>; }
function SettingsIcon() { return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>; }

export default function Navbar() {
  const { theme, mode, toggle, setThemeMode, palette, setPalette } = useTheme();
  const { user, logout } = useAuth();
  const { openAuth } = useAuthGate();
  const navigate = useNavigate();
  const location = useLocation();
  const [query, setQuery] = useState('');
  const [drawerQuery, setDrawerQuery] = useState('');
  const [showSugg, setShowSugg] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const searchRef = useRef(null);
  const palRef = useRef(null);
  const settingsRef = useRef(null);

  useEffect(() => { setDrawerOpen(false); setShowSugg(false); setQuery(''); setPaletteOpen(false); setSettingsOpen(false); }, [location.pathname]);

  useEffect(() => {
    const prev = document.body.style.overflow;
    if (drawerOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = prev;
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  useEffect(() => {
    function onDoc(e) {
      if (searchRef.current && !searchRef.current.contains(e.target)) setShowSugg(false);
      if (palRef.current && !palRef.current.contains(e.target)) setPaletteOpen(false);
      if (settingsRef.current && !settingsRef.current.contains(e.target)) setSettingsOpen(false);
    }
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (q.length < 2) return [];
    const exactCourse = COURSE_LIST.find(c => c.id === q || c.name.toLowerCase() === q);
    if (exactCourse) {
      return SEARCH_INDEX.filter(i => i.path.startsWith(`/course/${exactCourse.id}`)).slice(0, 8);
    }
    return SEARCH_INDEX
      .filter(i => {
        const label = i.label.toLowerCase();
        const sub = i.sub.toLowerCase();
        return label.startsWith(q) || label.includes(` ${q}`) || sub.includes(q);
      })
      .slice(0, 8);
  }, [query]);

  function go(item) {
    navigate(item.path);
    setQuery(''); setShowSugg(false);
  }

  const themeIcon = mode === 'dark' ? <SunIcon /> : <MoonIcon />;
  const themeLabel = mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';

  return (
    <header className="ms-navbar">
      <div className="ms-container ms-nav-row1">
        <Link className="ms-logo" to="/">
          <img src="/logo.svg" alt="" width="34" height="34" style={{borderRadius:6}}/>
          <span>MindSpark</span>
        </Link>

        <nav className="ms-nav-links" aria-label="Main">
          <NavLink className={({isActive}) => `ms-nav-link ${isActive ? 'active' : ''}`} to="/tutorials">Tutorials</NavLink>
          <NavLink className={({isActive}) => `ms-nav-link ${isActive ? 'active' : ''}`} to="/reference">Reference</NavLink>
          <NavLink className={({isActive}) => `ms-nav-link ${isActive ? 'active' : ''}`} to="/exercises">Exercise</NavLink>
          <NavLink className={({isActive}) => `ms-nav-link ${isActive ? 'active' : ''}`} to="/certificate">Certificate</NavLink>
        </nav>

        {/* Wider search bar */}
        <div className="ms-nav-search ms-nav-search-wide" ref={searchRef}>
          <span className="ms-nav-search-icon"><SearchIcon /></span>
          <input
            type="search"
            placeholder="Search tutorials, topics..."
            value={query}
            onChange={(e) => { setQuery(e.target.value); setShowSugg(true); }}
            onFocus={() => setShowSugg(true)}
            aria-label="Search the site"
            aria-autocomplete="list"
            aria-expanded={showSugg && query.trim().length >= 2}
          />
          {showSugg && query.trim().length >= 2 && (
            <div className="ms-nav-suggestions" role="listbox">
              {suggestions.length === 0 ? (
                <div className="ms-nav-sugg-empty">No results. Try "HTML", "CSS", or "React".</div>
              ) : suggestions.map((s, i) => (
                <button key={i} className="ms-nav-sugg-item" onClick={() => go(s)} role="option">
                  <SearchIcon />
                  <span>
                    <strong>{s.label}</strong>
                    <small><b>{s.type === 'course' ? 'Course' : 'Topic'}</b> — {s.sub.slice(0, 70)}</small>
                  </span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="ms-nav-actions">
          <NavLink to="/progress" className="ms-btn ms-btn-ghost ms-btn-sm">Progress</NavLink>
          <NavLink to="/pdfs" className="ms-btn ms-btn-ghost ms-btn-sm">PDFs</NavLink>
          <NavLink to="/chatbot" className={({isActive}) => `ms-btn ms-btn-ghost ms-btn-sm ms-nav-ai ${isActive ? 'ms-nav-ai-active' : ''}`}>
            <AIIcon /> <span style={{marginLeft:6}}>AI Chatbot</span>
          </NavLink>

          {/* Palette picker */}
          <div className="ms-pal-wrap" ref={palRef}>
            <button className="ms-icon-btn" onClick={() => { setPaletteOpen(o => !o); setSettingsOpen(false); }} aria-label="Choose color palette" aria-expanded={paletteOpen}>
              <PaletteIcon />
            </button>
            {paletteOpen && (
              <div className="ms-pal-menu" role="menu">
                <div className="ms-pal-menu-title">Color palette</div>
                <div className="ms-pal-grid">
                  {PALETTES.map(p => (
                    <button
                      key={p.id}
                      className={`ms-pal-swatch ${palette === p.id ? 'active' : ''}`}
                      onClick={() => { setPalette(p.id); setPaletteOpen(false); }}
                      aria-label={p.name}
                      title={p.name}
                      style={{ background: `linear-gradient(135deg, ${p.accent} 50%, ${p.accent2} 50%)` }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
          <button
            className="ms-icon-btn"
            onClick={toggle}
            aria-label={themeLabel}
            title={themeLabel}
          >
            {themeIcon}
          </button>

          {user ? (
            <>
              <span
                className="ms-user-avatar"
                title={`${user.name} (${user.email})`}
                aria-label={`Logged in as ${user.name}`}
              >
                {user.name.trim().split(/\s+/).slice(0, 2).map(w => w[0].toUpperCase()).join('')}
              </span>
              <button className="ms-btn ms-btn-ghost ms-btn-sm" onClick={logout}>Logout</button>
            </>
          ) : (
            <button type="button" className="ms-btn ms-btn-primary ms-btn-sm ms-signup-trigger" onClick={() => openAuth('signup')}>Sign Up</button>
          )}
        </div>

        <button className="ms-hamburger" onClick={() => setDrawerOpen(true)} aria-label="Open menu" aria-expanded={drawerOpen}>
          <MenuIcon />
        </button>
      </div>

      <div className="ms-container ms-nav-row2-wrap ms-nav-row2-offset">
        <div className="ms-nav-row2 ms-scroll-x" role="tablist" aria-label="Languages">
          {COURSE_LIST.map(c => (
            <NavLink
              key={c.id}
              to={`/course/${c.id}`}
              className={({ isActive }) => `ms-lang-tab ${isActive ? 'active' : ''}`}
            >{c.name}</NavLink>
          ))}
        </div>
      </div>

      {/* Mobile drawer */}
      <div className={`ms-drawer-backdrop ${drawerOpen ? 'open' : ''}`} onClick={() => setDrawerOpen(false)} />
      <aside className={`ms-drawer ${drawerOpen ? 'open' : ''}`} aria-label="Mobile menu" aria-hidden={!drawerOpen}>
        <div className="ms-drawer-head">
          <Link className="ms-logo" to="/" onClick={() => setDrawerOpen(false)}>
            <img src="/logo.svg" alt="" width="30" height="30" style={{borderRadius:6}}/><span>MindSpark</span>
          </Link>
          <button className="ms-icon-btn" onClick={() => setDrawerOpen(false)} aria-label="Close menu"><CloseIcon /></button>
        </div>

        <form
          className="ms-drawer-search"
          onSubmit={(e) => {
            e.preventDefault();
            const q = drawerQuery.trim().toLowerCase();
            if (q.length < 2) return;
            const hit = SEARCH_INDEX.find(i =>
              i.label.toLowerCase().startsWith(q) ||
              i.label.toLowerCase().includes(` ${q}`) ||
              i.sub.toLowerCase().includes(q)
            );
            if (hit) { setDrawerOpen(false); setDrawerQuery(''); navigate(hit.path); }
          }}
        >
          <span className="ms-drawer-search-icon"><SearchIcon /></span>
          <input
            type="search"
            placeholder="Search tutorials, topics..."
            value={drawerQuery}
            onChange={(e) => setDrawerQuery(e.target.value)}
            aria-label="Search the site"
          />
        </form>

        {!user && (
          <div className="ms-drawer-section" style={{ display:'flex', gap:8, marginTop:14 }}>
            <button type="button" className="ms-btn ms-btn-ghost ms-btn-sm" style={{flex:1}} onClick={() => { setDrawerOpen(false); openAuth('login'); }}>Sign In</button>
            <button type="button" className="ms-btn ms-btn-primary ms-btn-sm" style={{flex:1}} onClick={() => { setDrawerOpen(false); openAuth('signup'); }}>Sign Up</button>
          </div>
        )}

        <div className="ms-drawer-section">
          <h6>Browse</h6>
          <NavLink to="/" end className={({isActive}) => `ms-drawer-link ${isActive ? 'active' : ''}`}>Home<small>Back to homepage</small></NavLink>
          <NavLink to="/tutorials" className={({isActive}) => `ms-drawer-link ${isActive ? 'active' : ''}`}>Tutorials<small>All courses</small></NavLink>
          <NavLink to="/reference" className={({isActive}) => `ms-drawer-link ${isActive ? 'active' : ''}`}>Reference<small>Language reference</small></NavLink>
          <NavLink to="/exercises" className={({isActive}) => `ms-drawer-link ${isActive ? 'active' : ''}`}>Exercise<small>Hands-on practice</small></NavLink>
          <NavLink to="/certificate" className={({isActive}) => `ms-drawer-link ${isActive ? 'active' : ''}`}>Certificate<small>Earn certificates</small></NavLink>
          <NavLink to="/chatbot" className={({isActive}) => `ms-drawer-link ${isActive ? 'active' : ''}`}>AI Chatbot<small>Spark — your AI study buddy</small></NavLink>
          <NavLink to="/progress" className={({isActive}) => `ms-drawer-link ${isActive ? 'active' : ''}`}>Progress<small>XP and completed topics</small></NavLink>
          <NavLink to="/pdfs" className={({isActive}) => `ms-drawer-link ${isActive ? 'active' : ''}`}>PDFs<small>Download notes</small></NavLink>
          <NavLink to="/tools" className={({isActive}) => `ms-drawer-link ${isActive ? 'active' : ''}`}>Tools<small>Color picker, formatter</small></NavLink>
        </div>

        <div className="ms-drawer-section">
          <h6>Languages</h6>
          {COURSE_LIST.map(c => (
            <NavLink key={c.id} to={`/course/${c.id}`} className={({isActive}) => `ms-drawer-link ${isActive ? 'active' : ''}`}>
              {c.name}<small>{c.tagline}</small>
            </NavLink>
          ))}
        </div>
        <div className="ms-drawer-section">
          <h6>Theme</h6>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {[
              { val: 'light', label: 'Light', icon: <SunIcon /> },
              { val: 'dark',  label: 'Dark',  icon: <MoonIcon /> },
            ].map(opt => (
              <button
                key={opt.val}
                className={`ms-btn ms-btn-sm ${theme === opt.val ? 'ms-btn-primary' : 'ms-btn-ghost'}`}
                style={{ display: 'flex', alignItems: 'center', gap: 6 }}
                onClick={() => { setThemeMode(opt.val); }}
              >
                {opt.icon} {opt.label}
              </button>
            ))}
          </div>
        </div>

        <div className="ms-drawer-section" style={{ display: 'flex', gap: 10, marginTop: 10, flexWrap: 'wrap' }}>
          {user ? (
            <button className="ms-btn ms-btn-ghost ms-btn-sm" style={{flex:1}} onClick={() => { logout(); setDrawerOpen(false); }}>Logout {user.name}</button>
          ) : null}
        </div>
      </aside>
    </header>
  );
}
