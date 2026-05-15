import { Link } from 'react-router-dom';
import { useProgress } from '../context/ProgressContext';
import { useAuth } from '../context/AuthContext';
import { COURSE_LIST } from '../data/courses';
import FadeIn from '../components/FadeIn';

function Ring({ pct, label, value }) {
  const r = 46, c = 2 * Math.PI * r;
  const dash = (pct / 100) * c;
  return (
    <div className="ms-ring">
      <svg viewBox="0 0 110 110" width="110" height="110" aria-hidden>
        <circle cx="55" cy="55" r={r} className="ms-ring-track" />
        <circle cx="55" cy="55" r={r} className="ms-ring-fill"
          strokeDasharray={`${dash} ${c}`} transform="rotate(-90 55 55)" />
      </svg>
      <div className="ms-ring-center">
        <strong>{value}</strong>
        <small>{label}</small>
      </div>
    </div>
  );
}

export default function ProgressPage() {
  const { xp, level, LEVELS, completedCount, reset } = useProgress();
  const { user } = useAuth();
  const idx = LEVELS.findIndex(l => l.name === level.name);
  const nextLevel = LEVELS[idx + 1];
  const pct = nextLevel ? Math.min(100, ((xp - level.min) / (nextLevel.min - level.min)) * 100) : 100;
  const totalTopics = COURSE_LIST.reduce((s, c) => s + c.topics.length, 0);
  const doneTopics = COURSE_LIST.reduce((s, c) => s + completedCount(c.id), 0);
  const overallPct = Math.round((doneTopics / totalTopics) * 100);

  return (
    <div className="ms-container ms-section">
      <FadeIn>
        <div className="ms-page-hero">
          <span className="ms-eyebrow">📈 Your Journey</span>
          <h1>Track your <span className="ms-grad-text">progress</span></h1>
          <p className="lead">{user ? `Keep going, ${user.name} — every topic completed is a step toward your next certificate.` : 'Tip: log in to keep your progress synced across devices.'}</p>
        </div>

        <div className="ms-prog-hero">
          <div className="ms-prog-hero-left">
            <Ring pct={overallPct} label="Overall" value={`${overallPct}%`} />
            <div>
              <div className="ms-prog-level">{level.name}</div>
              <div className="ms-prog-xp">{xp.toLocaleString()} XP</div>
              {nextLevel ? (
                <>
                  <div className="ms-progress" style={{ marginTop: 14 }}>
                    <div className="ms-progress-bar" style={{ width: `${pct}%` }} />
                  </div>
                  <small style={{ color: 'var(--ms-text-dim)' }}>{nextLevel.min - xp} XP to <strong>{nextLevel.name}</strong></small>
                </>
              ) : <small style={{ color: 'var(--ms-success)' }}>🏆 Max level reached!</small>}
            </div>
          </div>
          <div className="ms-prog-hero-right">
            <div className="ms-prog-mini"><strong>{doneTopics}</strong><span>Topics done</span></div>
            <div className="ms-prog-mini"><strong>{COURSE_LIST.length}</strong><span>Courses</span></div>
            <div className="ms-prog-mini"><strong>{user?.name || 'Guest'}</strong><span>Learner</span></div>
          </div>
        </div>

        <h2 style={{ marginTop: 36 }}>Levels</h2>
        <div className="ms-levels">
          {LEVELS.map((l, i) => {
            const reached = xp >= l.min;
            const current = i === idx;
            return (
              <div key={l.name} className={`ms-level ${reached ? 'on' : ''} ${current ? 'current' : ''}`}>
                <div className="ms-level-dot">{reached ? '✓' : i + 1}</div>
                <strong>{l.name}</strong>
                <small>{l.min}+ XP</small>
              </div>
            );
          })}
        </div>

        <h2 style={{ marginTop: 36 }}>Per-language progress</h2>
        <div className="ms-prog-courses">
          {COURSE_LIST.map((c, i) => {
            const done = completedCount(c.id);
            const p = Math.round((done / c.topics.length) * 100);
            return (
              <div key={c.id} className="ms-prog-course" style={{ '--pc-accent': c.accent || 'var(--ms-accent)', animationDelay: `${i * 40}ms` }}>
                <div className="ms-prog-course-head">
                  <span className="ms-prog-course-mark">{c.name.slice(0,2).toUpperCase()}</span>
                  <div>
                    <strong>{c.name}</strong>
                    <small>{done} / {c.topics.length} topics</small>
                  </div>
                  <span className="ms-prog-course-pct">{p}%</span>
                </div>
                <div className="ms-progress"><div className="ms-progress-bar" style={{ width: `${p}%` }} /></div>
                <Link to={`/course/${c.id}`} className="ms-btn ms-btn-ghost ms-btn-sm" style={{ marginTop: 12 }}>
                  {p === 0 ? 'Start' : p === 100 ? 'Review' : 'Continue'} →
                </Link>
              </div>
            );
          })}
        </div>

        <div style={{ textAlign: 'center', marginTop: 36 }}>
          <button className="ms-btn ms-btn-ghost ms-btn-sm" onClick={() => { if (window.confirm('Reset all progress?')) reset(); }}>Reset Progress</button>
        </div>
      </FadeIn>
    </div>
  );
}
