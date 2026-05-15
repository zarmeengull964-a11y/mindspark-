import { useMemo, useState } from 'react';
import { ASSIGNMENTS } from '../data/assignments';
import { COURSES, COURSE_LIST } from '../data/courses';
import { useToast } from '../context/ToastContext';
import { useProgress } from '../context/ProgressContext';
import { useAuthGate } from '../context/AuthGateContext';
import FadeIn from '../components/FadeIn';

const DIFF = {
  Easy:   { color: '#A8C090', bg: 'rgba(168,192,144,.14)', icon: '🌱' },
  Medium: { color: '#E8B97A', bg: 'rgba(232,185,122,.14)', icon: '⚡' },
  Hard:   { color: '#D88A7A', bg: 'rgba(216,138,122,.14)', icon: '🔥' },
};

export default function Exercises() {

  const [open, setOpen] = useState(null);
  const [text, setText] = useState('');
  const [filter, setFilter] = useState('all');
  const [diff, setDiff] = useState('all');
  const { toast } = useToast();
  const { addXP } = useProgress();
  const { requireAuth } = useAuthGate();

  const list = useMemo(() => ASSIGNMENTS.filter(a =>
    (filter === 'all' || a.lang === filter) &&
    (diff === 'all' || a.difficulty === diff)
  ), [filter, diff]);

  const stats = useMemo(() => ({
    total: ASSIGNMENTS.length,
    easy: ASSIGNMENTS.filter(a => a.difficulty === 'Easy').length,
    med: ASSIGNMENTS.filter(a => a.difficulty === 'Medium').length,
    hard: ASSIGNMENTS.filter(a => a.difficulty === 'Hard').length,
  }), []);

  function openExercise(a) {
    requireAuth(
      () => { setOpen(a); setText(''); },
      'Sign in to access hands-on exercises — it\'s free!'
    );
  }

  function submit() {
    if (!text.trim()) { toast('Add some code or notes before submitting.'); return; }
    const xp = open?.xp || 15;
    toast(`Exercise submitted! +${xp} XP`);
    addXP(xp);
    setOpen(null);
    setText('');
  }

  return (
    <div className="ms-container ms-section">
      <FadeIn>
        <div className="ms-page-hero">
          <span className="ms-eyebrow">💪 Practice Lab</span>
          <h1>Code <span className="ms-grad-text">Exercises</span></h1>
          <p className="lead">15 hands-on exercises across 8 languages. Pick one, write your code, earn XP. Sharpen real skills with real tasks.</p>
        </div>

        <div className="ms-ex-stats">
          <div className="ms-ex-stat"><strong>{stats.total}</strong><span>Total</span></div>
          <div className="ms-ex-stat ms-ex-stat-easy"><strong>{stats.easy}</strong><span>🌱 Easy</span></div>
          <div className="ms-ex-stat ms-ex-stat-med"><strong>{stats.med}</strong><span>⚡ Medium</span></div>
          <div className="ms-ex-stat ms-ex-stat-hard"><strong>{stats.hard}</strong><span>🔥 Hard</span></div>
        </div>

        <div className="ms-ex-filterbar">
          <div className="ms-ex-chips" role="tablist" aria-label="Filter by language">
            <button className={`ms-chip ${filter === 'all' ? 'active' : ''}`} onClick={() => setFilter('all')}>All languages</button>
            {COURSE_LIST.filter(c => ASSIGNMENTS.some(a => a.lang === c.id)).map(c => (
              <button key={c.id} className={`ms-chip ${filter === c.id ? 'active' : ''}`} onClick={() => setFilter(c.id)}>{c.name}</button>
            ))}
          </div>
          <div className="ms-ex-chips">
            {['all', 'Easy', 'Medium', 'Hard'].map(d => (
              <button key={d} className={`ms-chip ${diff === d ? 'active' : ''}`} onClick={() => setDiff(d)}>
                {d === 'all' ? 'Any difficulty' : `${DIFF[d].icon} ${d}`}
              </button>
            ))}
          </div>
        </div>
      </FadeIn>

      <div className="ms-ex-grid">
        {list.map((a, i) => {
          const d = DIFF[a.difficulty];
          const lang = COURSES[a.lang];
          return (
            <FadeIn key={a.id}>
              <article className="ms-ex-pro" style={{ animationDelay: `${i * 50}ms` }}>
                <div className="ms-ex-pro-head">
                  <span className="ms-ex-lang" style={{ background: lang?.accent || 'var(--ms-accent)' }}>{lang?.name?.slice(0,2).toUpperCase() || a.lang}</span>
                  <span className="ms-ex-difficulty" style={{ color: d.color, background: d.bg, borderColor: d.color }}>
                    {d.icon} {a.difficulty}
                  </span>
                </div>
                <h3>{a.title}</h3>
                <p>{a.desc}</p>
                <div className="ms-ex-pro-foot">
                  <span className="ms-ex-xp">+{a.xp} XP</span>
                  <button className="ms-btn ms-btn-primary ms-btn-sm" onClick={() => openExercise(a)}>
                    Open exercise →
                  </button>
                </div>
              </article>
            </FadeIn>
          );
        })}
      </div>

      {list.length === 0 && (
        <p style={{ textAlign: 'center', color: 'var(--ms-text-dim)', marginTop: 40 }}>No exercises match this filter.</p>
      )}

      {open && (
        <div className="ms-modal-backdrop" onClick={() => setOpen(null)}>
          <div className="ms-modal" onClick={e => e.stopPropagation()}>
            <div className="ms-ex-pro-head">
              <span className="ms-ex-lang" style={{ background: COURSES[open.lang]?.accent || 'var(--ms-accent)' }}>{COURSES[open.lang]?.name}</span>
              <span className="ms-ex-difficulty" style={{ color: DIFF[open.difficulty].color, background: DIFF[open.difficulty].bg, borderColor: DIFF[open.difficulty].color }}>
                {DIFF[open.difficulty].icon} {open.difficulty}
              </span>
            </div>
            <h2 style={{ marginTop: 14 }}>{open.title}</h2>
            <p style={{ color: 'var(--ms-text-dim)' }}>{open.desc}</p>
            <textarea className="ms-textarea" placeholder="// Write your code or notes here…" value={text} onChange={e => setText(e.target.value)} style={{ minHeight: 220, fontFamily: 'var(--ms-font-mono)', fontSize: 13 }} />
            <div style={{ display: 'flex', gap: 10, marginTop: 14, justifyContent: 'flex-end' }}>
              <button className="ms-btn ms-btn-ghost" onClick={() => setOpen(null)}>Close</button>
              <button className="ms-btn ms-btn-primary" onClick={submit}>Submit (+{open.xp} XP)</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
