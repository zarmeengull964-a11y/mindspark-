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

export default function Tutorials() {
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
          <span className="ms-eyebrow">📚 All Tutorials</span>
          <h1>Learn anything, <span className="ms-grad-text">step by step</span></h1>
          <p className="lead">Pick a language and start learning. Every tutorial includes lessons, examples, a Try-It editor and a certificate.</p>
          <div style={{ maxWidth: 480, margin: '20px auto 0' }}>
            <input
              className="ms-input ms-input-pill"
              placeholder="🔍  Filter tutorials… (e.g. HTML, React, Python)"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              aria-label="Filter tutorials"
            />
          </div>
        </div>
      </FadeIn>

      {Object.entries(grouped).map(([cat, items]) => items.length > 0 && (
        <FadeIn key={cat}>
          <h2 className="ms-cat-title">{cat} <span>{items.length} courses</span></h2>
          <div className="ms-tut-grid">
            {items.map((c, i) => (
              <Link
                key={c.id}
                to={`/course/${c.id}`}
                className="ms-tut-card"
                style={{ '--tut-accent': c.accent || 'var(--ms-accent)', animationDelay: `${i * 60}ms` }}
              >
                <div className="ms-tut-badge">{c.name.slice(0, 2).toUpperCase()}</div>
                <h3>{c.name} Tutorial</h3>
                <p>{c.tagline}</p>
                <div className="ms-tut-meta">
                  <span>{c.topics.length} topics</span>
                  <span className="ms-tut-cta">Start learning →</span>
                </div>
              </Link>
            ))}
          </div>
        </FadeIn>
      ))}
    </div>
  );
}
