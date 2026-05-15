import { COURSE_LIST } from '../data/courses';
import { downloadNotes } from '../utils/notes';
import FadeIn from '../components/FadeIn';
import { useAuthGate } from '../context/AuthGateContext';

function DownloadIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

export default function Pdfs() {
  const { requireAuth } = useAuthGate();

  function handleDownload(id) {
    requireAuth(
      () => downloadNotes(id),
      'Sign in to download PDF notes — it\'s free!'
    );
  }

  return (
    <div className="ms-container ms-section">
      <FadeIn>
        <div className="ms-section-head">
          <span className="ms-eyebrow">📥 PDF Library</span>
          <h1>Download PDF Notes</h1>
          <p className="lead">Take MindSpark with you. Free, offline-ready PDF notes for every course.</p>
        </div>

        <div className="ms-pdf-grid ms-pdf-grid--wide">
          {COURSE_LIST.map((c) => (
            <div key={c.id} className="ms-pdf-card ms-pdf-card--lg" style={{ '--pdf-accent': c.accent }}>
              <div className="ms-pdf-card-icon" aria-hidden>
                <span>{c.name.slice(0, 2).toUpperCase()}</span>
              </div>
              <div className="ms-pdf-card-body">
                <h4>{c.name} — Complete Notes</h4>
                <p style={{ color: 'var(--ms-text-dim)', margin: '4px 0 6px', fontSize: 14 }}>{c.tagline}</p>
                <small>{c.topics.length} topics · PDF · Free</small>
              </div>
              <button
                type="button"
                className="ms-pdf-card-btn"
                onClick={() => handleDownload(c.id)}
                aria-label={`Download ${c.name} PDF notes`}
              >
                <DownloadIcon /> Download
              </button>
            </div>
          ))}
        </div>
      </FadeIn>
    </div>
  );
}
