import { useTheme, PALETTES } from '../context/ThemeContext';
import FadeIn from './FadeIn';

export default function UnlockFeatures() {
  const { palette, setPalette, theme, toggle } = useTheme();

  const features = [
    { icon: '🎨', title: 'Custom Themes',     desc: 'Pick from 18 professional color palettes — instantly applied site-wide.' },
    { icon: '🔓', title: 'All Courses',       desc: 'Unlock all 15 language tracks: HTML, CSS, JS, React, Python, TypeScript, Go and more.' },
    { icon: '📺', title: 'HD Video Lessons',  desc: 'Lazy-loaded, accessible video lessons with YouTube-nocookie privacy.' },
    { icon: '♿', title: 'A11y First',        desc: 'WCAG 2.1 AA compliant: keyboard nav, focus rings, ARIA labels, skip-links.' },
    { icon: '🔄', title: 'Cross-Tab Sync',    desc: 'Your progress and XP sync instantly across every open tab.' },
    { icon: '🏆', title: 'Certificates',      desc: 'Earn shareable, printable completion certificates for every course.' },
  ];

  return (
    <section className="ms-section ms-unlock-section" aria-labelledby="unlock-heading">
      <div className="ms-container">
        <FadeIn>
          <div style={{textAlign:'center', marginBottom: 32}}>
            <span className="ms-eyebrow">✨ Premium Experience</span>
            <h2 id="unlock-heading">Unlock the <span className="ms-grad-text">full MindSpark</span></h2>
            <p className="ms-section-sub">Try every feature live — pick a palette below to see it instantly.</p>
          </div>
        </FadeIn>

        <FadeIn>
          <div className="ms-unlock-grid">
            {features.map((f, i) => (
              <div key={f.title} className="ms-unlock-card" style={{animationDelay: `${i*60}ms`}}>
                <div className="ms-unlock-icon" aria-hidden="true">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn>
          <div className="ms-palette-panel" role="region" aria-labelledby="palette-heading">
            <div className="ms-palette-head">
              <h3 id="palette-heading">🎨 Theme Palette</h3>
              <button type="button" className="ms-btn ms-btn-ghost ms-btn-sm" onClick={toggle} aria-label="Toggle dark or light mode">
                {theme === 'dark' ? '☀️ Light mode' : '🌙 Dark mode'}
              </button>
            </div>
            <div className="ms-palette-grid" role="radiogroup" aria-label="Choose color palette">
              {PALETTES.map(p => (
                <button
                  key={p.id}
                  type="button"
                  role="radio"
                  aria-checked={palette === p.id}
                  className={`ms-palette-swatch ${palette === p.id ? 'active' : ''}`}
                  onClick={() => setPalette(p.id)}
                  title={p.name}
                  style={{ background: `linear-gradient(135deg, ${p.accent}, ${p.accent2})` }}
                >
                  <span className="ms-palette-name">{p.name}</span>
                </button>
              ))}
            </div>
            <p className="ms-palette-hint">Selected: <strong>{PALETTES.find(p=>p.id===palette)?.name}</strong> — saved automatically.</p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
