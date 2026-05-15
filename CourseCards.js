import { Link } from 'react-router-dom';
import { COURSE_LIST } from '../data/courses';
import FadeIn from './FadeIn';

export default function CourseCards({ limit, title }) {
  const list = limit ? COURSE_LIST.slice(0, limit) : COURSE_LIST;
  return (
    <section id="courses" className="ms-section">
      <div className="ms-container">
        <FadeIn>
          <h2>{title || 'Pick a language,'} {!title && <span className="ms-grad-text">start coding</span>}</h2>
          <p className="ms-section-sub">Each course includes interactive examples, embedded video lessons, a Try-It-Yourself editor and a free completion certificate.</p>
        </FadeIn>

        <div className="ms-lang-grid">
          {list.map((c, idx) => (
            <FadeIn key={c.id} delay={idx * 60}>
              <article
                className="ms-lang-card"
                style={{
                  '--ms-card-tint': c.bg,
                  '--ms-card-glow': c.accent,
                  '--ms-card-text': c.text,
                }}
              >
                <h3>{c.name}</h3>
                <p>{c.tagline}</p>
                <div className="ms-lang-card-actions">
                  <Link to={`/course/${c.id}`} className={`ms-btn ${c.btnVariant} ms-btn-sm`}>Learn {c.name}</Link>
                  <Link to={`/course/${c.id}#${c.topics[0]?.id}`} className="ms-btn ms-btn-ghost ms-btn-sm" style={{ borderColor: 'rgba(0,0,0,.2)', color: c.text }}>📺 Video</Link>
                  <Link to={`/course/${c.id}#reference`} className="ms-btn ms-btn-ghost ms-btn-sm" style={{ borderColor: 'rgba(0,0,0,.2)', color: c.text }}>Reference</Link>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
