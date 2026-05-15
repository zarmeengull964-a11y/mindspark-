import { COURSE_LIST } from '../data/courses';
import { downloadNotes } from '../utils/notes';
import FadeIn from './FadeIn';

function DownloadIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" y1="15" x2="12" y2="3" />
    </svg>
  );
}

export default function PdfNotesSection() {
  return (
    <section className="ms-section ms-pdf-notes" id="pdf-notes">
      <div className="ms-container">
        <FadeIn>
          <div className="ms-section-head">
            <span className="ms-eyebrow">📥 Downloadable Resources</span>
            <h2>Download PDF Notes</h2>
            <p className="lead" style={{ maxWidth: 620, margin: '8px auto 0' }}>
              Access high-quality PDF notes for all courses. Learn anytime, anywhere.
            </p>
          </div>

          <div className="ms-pdf-grid">
            {COURSE_LIST.map((c) => (
              <div
                key={c.id}
                className="ms-pdf-card"
                style={{ '--pdf-accent': c.accent }}
              >
                <div className="ms-pdf-card-icon" aria-hidden>
                  <span>{c.name.slice(0, 2).toUpperCase()}</span>
                </div>
                <div className="ms-pdf-card-body">
                  <h4>{c.name} Notes</h4>
                  <small>{c.topics.length} topics · PDF</small>
                </div>
                <button
                  type="button"
                  className="ms-pdf-card-btn"
                  onClick={() => downloadNotes(c.id)}
                  aria-label={`Download ${c.name} PDF notes`}
                >
                  <DownloadIcon /> PDF
                </button>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
