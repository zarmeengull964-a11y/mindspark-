import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SEARCH_INDEX } from '../data/courses';
import FadeIn from './FadeIn';

export default function HeroSection() {
  const [q, setQ] = useState('');
  const nav = useNavigate();

  const results = useMemo(() => {
    const t = q.trim().toLowerCase();
    if (t.length < 2) return [];
    const exactCourse = SEARCH_INDEX.find(i => i.type === 'course' && i.label.toLowerCase() === t);
    if (exactCourse) return SEARCH_INDEX.filter(i => i.path.startsWith(exactCourse.path)).slice(0, 6);
    return SEARCH_INDEX
      .filter(i => {
        const label = i.label.toLowerCase();
        const sub = i.sub.toLowerCase();
        return label.startsWith(t) || label.includes(` ${t}`) || sub.includes(t);
      })
      .slice(0, 6);
  }, [q]);

  return (
    <section className="ms-hero">
      <div className="ms-container">
        <FadeIn className="ms-hero-inner">
          <h1>
            <span className="ms-grad-text">Spark Your Mind</span>
          </h1>
          <p className="lead">
            Learn to code with interactive tutorials, videos, quizzes, exercises, and downloadable PDF notes.
          </p>

          <div className="ms-hero-search">
            <span className="ms-hero-search-icon"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg></span>
            <input
              type="search"
              placeholder="What do you want to learn? (e.g. CSS Flexbox)"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              aria-label="Search MindSpark"
            />
            {q.trim().length >= 2 && (
              <div className="ms-hero-suggestions">
                {results.length === 0 ? (
                  <div className="ms-nav-sugg-empty">
                    Not sure where to begin?{' '}
                    <Link to="/course/html">Start with HTML →</Link>
                  </div>
                ) : results.map((r, i) => (
                  <button key={i} className="ms-nav-sugg-item" onClick={() => { nav(r.path); setQ(''); }}>
                    <strong>{r.label}</strong>&nbsp;<small><b>{r.type === 'course' ? 'Course' : 'Topic'}</b> — {r.sub.slice(0, 60)}</small>
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="ms-hero-cta">
            <Link to="/course/html" className="ms-btn ms-btn-primary ms-btn-pulse">🚀 Start Learning</Link>
            <Link to="#courses" className="ms-btn ms-btn-ghost" onClick={(e) => {
              e.preventDefault();
              document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' });
            }}>Browse Courses</Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
