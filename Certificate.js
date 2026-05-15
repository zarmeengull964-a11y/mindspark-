import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';
import { COURSE_LIST } from '../data/courses';
import FadeIn from '../components/FadeIn';
import { useAuthGate } from '../context/AuthGateContext';

const PERKS = [
  {
    icon: '🎓',
    title: 'Industry-recognised',
    text: 'Each certificate verifies you have mastered a complete MindSpark curriculum — modules, exercises and a final assessment. Accepted by hiring managers worldwide.',
  },
  {
    icon: '🌐',
    title: 'Shareable on LinkedIn',
    text: 'Add it to your CV and LinkedIn profile in one click. Hiring managers can verify your certificate ID directly from the link you share.',
  },
];

export default function Certificate() {
  const { user } = useAuth();
  const { xp, level, completedCount } = useProgress();
  const { openAuth } = useAuthGate();

  const totals = COURSE_LIST.map(c => ({
    ...c,
    done: completedCount(c.id),
    pct: Math.round((completedCount(c.id) / c.topics.length) * 100),
  })).sort((a, b) => b.pct - a.pct);

  function printCert() { window.print(); }

  return (
    <div className="ms-container ms-section">

      <FadeIn>
        <div className="ms-cert-hero">
          <span className="ms-eyebrow">🎓 MindSpark Certificates</span>
          <h1>Earn certificates that <span className="ms-grad-text">prove your skills</span></h1>
          <p className="lead">
            Every MindSpark course ends with a beautiful, verifiable <strong>Certificate of Achievement</strong>.
            Pick any language below, complete its lessons, and unlock a personalised certificate you can share on LinkedIn or print at home.
          </p>

     
          <div className="ms-cert-perks-row">
            {PERKS.map(p => (
              <div key={p.title} className="ms-cert-perk-card">
                <span className="ms-cert-perk-ico">{p.icon}</span>
                <div>
                  <strong>{p.title}</strong>
                  <p>{p.text}</p>
                </div>
              </div>
            ))}
          </div>

          {user ? (
            <div className="ms-cert-mini">
              <div>
                <small style={{ color: 'var(--ms-text-dim)' }}>Signed in as</small>
                <h3 style={{ margin: '4px 0 0' }}>{user.name}</h3>
                <p style={{ margin: '4px 0 0' }}>
                  <strong>{xp} XP</strong> · Level <strong>{level.name}</strong>
                </p>
              </div>
              <button className="ms-btn ms-btn-primary" onClick={printCert}>Print my certificate</button>
            </div>
          ) : (
            <div className="ms-cert-mini">
              <div>
                <small style={{ color: 'var(--ms-text-dim)' }}>🔒 Members only</small>
                <h3 style={{ margin: '4px 0 0' }}>Sign in to claim your certificate</h3>
                <p style={{ margin: '4px 0 0', color: 'var(--ms-text-dim)' }}>
                  Track your XP and download certificates after signing in.
                </p>
              </div>
              <button className="ms-btn ms-btn-primary" onClick={() => openAuth('signup', 'Sign in to access certificates.')}>Sign in</button>
            </div>
          )}
        </div>
      </FadeIn>

      <FadeIn>
        <h2 className="ms-cert-section-title">Per-language certificates</h2>
        <p style={{ color: 'var(--ms-text-dim)', marginTop: -6 }}>
          All courses are <strong>fully unlocked</strong>. Pick one and start — your progress is saved automatically.
        </p>
        <div className="ms-cert-grid">
          {totals.map(c => (
            <div key={c.id} className="ms-cert-tile" style={{ '--tut-accent': c.accent || 'var(--ms-accent)' }}>
              <h3>{c.name}</h3>
              <p className="ms-cert-tile-meta">{c.done} / {c.topics.length} topics complete</p>
              <div className="ms-progress"><div className="ms-progress-bar" style={{ width: `${c.pct}%` }} /></div>
              <p className="ms-cert-tile-status" style={{ color: c.pct === 100 ? 'var(--ms-success)' : 'var(--ms-text-dim)' }}>
                {c.pct === 100 ? '🏆 Certificate unlocked!' : `${100 - c.pct}% to certificate`}
              </p>
              <Link to={`/course/${c.id}`} className="ms-btn ms-btn-primary ms-btn-sm ms-btn-block">
                Continue learning
              </Link>
            </div>
          ))}
        </div>
      </FadeIn>
    </div>
  );
}
