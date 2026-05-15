import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { COURSE_LIST } from '../data/courses';
import FadeIn from '../components/FadeIn';

const CATEGORIES = {
  'HTML & CSS':  ['html', 'css', 'bootstrap'],
  'JavaScript':  ['javascript', 'react', 'jquery', 'typescript', 'nodejs'],
  'Backend':     ['python', 'sql', 'php', 'java', 'cpp', 'go'],
  'Tools':       ['git'],
};

export default function Reference() {
  const [q, setQ] = useState('');

  const find = (id) => COURSE_LIST.find(c => c.id === id);
  const grouped = useMemo(() => {
    const f = q.trim().toLowerCase();
    const out = {};
    for (const [cat, ids] of Object.entries(CATEGORIES)) {
      out[cat] = ids.map(find).filter(Boolean).filter(c => !f || c.name.toLowerCase().includes(f));
    }
    return out;
  }, [q]);

  return (
    <div className="ms-container ms-section">
      <FadeIn>
        <div className="ms-page-hero">
          <span className="ms-eyebrow">🛠️ Developer Tools & References</span>
          <h1><span className="ms-grad-text">Tools</span> & Quick References</h1>
          <p className="lead">Handy developer tools you'll use every day, plus quick-reference docs for every language we teach.</p>
        </div>
      </FadeIn>

      
      <FadeIn>
        <h2 className="ms-cat-title">Developer Tools <span>4 utilities</span></h2>
        <div className="ms-feature-grid">
          {[
            { icon: '🎨', title: 'Color Picker',     desc: 'Pick, preview and copy any HEX color.', to: '/tools' },
            { icon: '🖼️', title: 'HTML Live Preview', desc: 'Type HTML and see it render instantly.', to: '/tools' },
            { icon: '✨', title: 'JSON Formatter',   desc: 'Pretty-print and validate JSON.', to: '/tools' },
            { icon: '📏', title: 'px ↔ rem Converter', desc: 'Quickly convert between web units.', to: '/tools' },
          ].map((t) => (
            <div key={t.title} className="ms-feature-card">
              <div className="ms-feature-icon" style={{ fontSize: 26 }}>{t.icon}</div>
              <h3>{t.title}</h3>
              <p>{t.desc}</p>
              <Link to={t.to} className="ms-btn ms-btn-ghost ms-btn-sm">Open tool →</Link>
            </div>
          ))}
        </div>
      </FadeIn>

      <FadeIn>
        <div style={{ maxWidth: 480, margin: '40px auto 20px' }}>
          <input className="ms-input ms-input-pill" placeholder="🔍  Filter language references…" value={q} onChange={(e) => setQ(e.target.value)} aria-label="Filter references" />
        </div>
      </FadeIn>

      {Object.entries(grouped).map(([cat, items]) => items.length > 0 && (
        <FadeIn key={cat}>
          <h2 className="ms-cat-title">{cat} <span>{items.length} references</span></h2>
          <div className="ms-ref-grid">
            {items.map((c, i) => (
              <Link
                key={c.id}
                to={`/course/${c.id}#reference`}
                className="ms-ref-card"
                style={{ '--ref-accent': c.accent || 'var(--ms-accent)', animationDelay: `${i * 60}ms` }}
              >
                <span className="ms-ref-mark">{c.name.slice(0, 2).toUpperCase()}</span>
                <div>
                  <h3>{c.name} Reference</h3>
                  <p>Complete syntax & API reference for {c.name}.</p>
                </div>
                <span className="ms-ref-arrow" aria-hidden>↗</span>
              </Link>
            ))}
          </div>
        </FadeIn>
      ))}
    </div>
  );
}
