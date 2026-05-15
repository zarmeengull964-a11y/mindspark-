import { Link } from 'react-router-dom';
import { COURSE_LIST } from '../data/courses';
import FadeIn from './FadeIn';

function Check() { return <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><path d="M5 12l5 5L20 7"/></svg>; }

export function PlusMember() {
  return (
    <section className="ms-section">
      <div className="ms-container">
        <FadeIn>
          <div className="ms-plus">
            <h2>Become a <span className="ms-grad-text">Plus User</span></h2>
            <p className="ms-plus-sub">And unlock powerful features:</p>
            <ul className="ms-plus-list">
              {['Browse MindSpark without ads','Build and host websites','Unlimited challenges','Unlimited practice tests','Get extra credits','Priority support'].map(t => (
                <li key={t}><span className="ms-check"><Check /></span>{t}</li>
              ))}
            </ul>
            <Link to="/signup" className="ms-btn ms-btn-primary">Learn More</Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

export function ExercisesQuizzes() {
  return (
    <section className="ms-section">
      <div className="ms-container">
        <FadeIn>
          <h2>Exercises and <span className="ms-grad-text">Quizzes</span></h2>
          <p className="ms-section-sub">Test your skills!</p>
        </FadeIn>
        <FadeIn delay={120}>
          <div className="ms-split">
            <Link to="/assignments" className="ms-split-card ms-split-ex">Exercises</Link>
            <Link to="/quiz" className="ms-split-card ms-split-qz">Quizzes</Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

export function CareerBand() {
  return (
    <section className="ms-section">
      <div className="ms-container">
        <FadeIn>
          <div className="ms-career">
            <div>
              <h2>Kickstart your career</h2>
              <h3 style={{marginTop: 16}}>Get certified by completing a course</h3>
              <div style={{marginTop: 24}}>
                <Link to="/signup" className="ms-btn ms-btn-accent">Get started</Link>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

export function FeatureCards() {
  return (
    <section className="ms-section">
      <div className="ms-container">
        <div className="ms-feature-grid">
          {[
            { icon: '📄', title: 'Web Templates', desc: 'Free responsive starter templates.', to: '/' },
            { icon: '🧪', title: 'Quizzes & Exercises', desc: 'Practice and test your knowledge.', to: '/quiz' },
            { icon: '🎓', title: 'Certificates', desc: 'Earn shareable certificates.', to: '/signup' },
          ].map((f, i) => (
            <FadeIn key={f.title} delay={i*100}>
              <div className="ms-feature-card">
                <div className="ms-feature-icon" style={{fontSize: 24}}>{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
                <Link to={f.to} className="ms-btn ms-btn-ghost ms-btn-sm">Learn More →</Link>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TopTutorialsRefs() {
  return (
    <section className="ms-section">
      <div className="ms-container">
        <FadeIn><h2 style={{textAlign:'center'}}>Top <span className="ms-grad-text">Tutorials & References</span></h2></FadeIn>
        <FadeIn delay={120}>
          <div className="ms-cols2">
            <div className="ms-col-card">
              <h3>Top Tutorials</h3>
              <ul>{COURSE_LIST.slice(0,8).map(c => (
                <li key={c.id}><Link to={`/course/${c.id}`}>{c.name} Tutorial</Link></li>
              ))}</ul>
            </div>
            <div className="ms-col-card">
              <h3>Top References</h3>
              <ul>{COURSE_LIST.slice(0,8).map(c => (
                <li key={c.id}><Link to={`/course/${c.id}#reference`}>{c.name} Reference</Link></li>
              ))}</ul>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
