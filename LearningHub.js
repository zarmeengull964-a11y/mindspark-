import { useState } from 'react';
import { Link } from 'react-router-dom';
import { COURSES } from '../data/courses';
import { useProgress } from '../context/ProgressContext';
import FadeIn from './FadeIn';




function ChevronDown() {
  return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M6 9l6 6 6-6"/></svg>;
}

export function TopicSidebarShowcase() {
  const html = COURSES.html;
  const [activeId, setActiveId] = useState(html.topics[0].id);
  const active = html.topics.find(t => t.id === activeId) || html.topics[0];

  return (
    <section className="ms-section">
      <div className="ms-container">
        <FadeIn>
          <h2 style={{ textAlign: 'center' }}>
            HTML <span className="ms-grad-text">Tutorial</span>
          </h2>
          <p className="ms-section-sub">Pick a topic from the sidebar — preview right here.</p>
        </FadeIn>

        <FadeIn delay={120}>
          <div className="ms-hub-shell">
            <aside className="ms-hub-sidebar" aria-label="HTML topics">
              <div className="ms-hub-sidebar-title">HTML Tutorial</div>
              <ul>
                {html.topics.map(t => (
                  <li key={t.id}>
                    <button
                      className={`ms-hub-sidebar-link ${activeId === t.id ? 'active' : ''}`}
                      onClick={() => setActiveId(t.id)}
                    >
                      {t.title}
                      <ChevronDown />
                    </button>
                  </li>
                ))}
              </ul>
            </aside>

            <div className="ms-hub-main">
              <div className="ms-hub-crumbs">
                <Link to="/course/html">‹ Home</Link>
                <Link to="/course/html" className="ms-hub-next">Next ›</Link>
              </div>
              <h3 className="ms-hub-title">{active.title}</h3>
              <h4 className="ms-hub-sub">Learn {active.title}</h4>
              <p>{active.intro}</p>
              <p style={{ color: 'var(--ms-text-dim)' }}>{active.explanation}</p>
              <Link to={`/course/html#${active.id}`} className="ms-btn ms-btn-primary">
                Open full lesson →
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

export function TryItEditor() {
  const [code, setCode] = useState(
`<!DOCTYPE html>
<html>
<head>
  <title>Page Title</title>
</head>
<body>

<h1>This is a Heading</h1>
<p>This is a paragraph.</p>

</body>
</html>`
  );
  const [pinned, setPinned] = useState(code);

  return (
    <section className="ms-section">
      <div className="ms-container">
        <FadeIn>
          <h2 style={{ textAlign: 'center' }}>Easy Learning with <span className="ms-grad-text">"Try it Yourself"</span></h2>
          <p className="ms-section-sub">With our editor, you can edit the HTML and view the result in your browser.</p>
        </FadeIn>

        <FadeIn delay={120}>
          <div className="ms-tryit">
            <div className="ms-tryit-pane">
              <div className="ms-tryit-bar">
                <span className="ms-tryit-dot" style={{background:'#E07A5F'}}/>
                <span className="ms-tryit-dot" style={{background:'#E8B97A'}}/>
                <span className="ms-tryit-dot" style={{background:'#A8C090'}}/>
                <span className="ms-tryit-tab">Example</span>
              </div>
              <textarea
                className="ms-tryit-editor"
                value={code}
                onChange={e => setCode(e.target.value)}
                spellCheck={false}
                aria-label="HTML code editor"
              />
              <div className="ms-tryit-actions">
                <button className="ms-btn ms-btn-primary" onClick={() => setPinned(code)}>
                  Try it Yourself »
                </button>
                <button className="ms-btn ms-btn-ghost ms-btn-sm" onClick={() => { setCode(pinned); }}>
                  Reset
                </button>
              </div>
            </div>
            <div className="ms-tryit-pane">
              <div className="ms-tryit-bar">
                <span className="ms-tryit-tab">Live Result</span>
              </div>
              <iframe
                title="Live preview"
                className="ms-tryit-preview"
                srcDoc={pinned}
                sandbox="allow-same-origin"
              />
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

const EXERCISE = {
  q: 'What is a correct syntax for an HTML hyperlink?',
  options: [
    `<a href='/home.htm'>Visit MindSpark!</a>`,
    `<link href='/home.htm'>Visit MindSpark!</link>`,
    `<alink href='/home.htm'>Visit MindSpark!</alink>`,
  ],
  correct: 0,
};

export function ExerciseCard() {
  const [picked, setPicked] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const { addXP } = useProgress();

  function submit() {
    if (picked === null || submitted) return;
    setSubmitted(true);
    if (picked === EXERCISE.correct) addXP(20);
  }

  return (
    <section className="ms-section">
      <div className="ms-container">
        <FadeIn>
          <h2 style={{ textAlign: 'center' }}>HTML <span className="ms-grad-text">Exercises</span></h2>
          <p className="ms-section-sub">Many chapters end with an exercise where you can check your level of knowledge.</p>
        </FadeIn>

        <FadeIn delay={120}>
          <div className="ms-exercise">
            <div className="ms-exercise-head">
              <span>Exercise</span>
              <span className="ms-exercise-help" title="Pick the correct option, then submit.">?</span>
            </div>
            <h3 className="ms-exercise-q">{EXERCISE.q}</h3>
            <div className="ms-exercise-opts">
              {EXERCISE.options.map((opt, i) => {
                const isPicked = picked === i;
                const isCorrect = submitted && i === EXERCISE.correct;
                const isWrong = submitted && isPicked && i !== EXERCISE.correct;
                return (
                  <label
                    key={i}
                    className={`ms-exercise-opt ${isPicked ? 'picked' : ''} ${isCorrect ? 'correct' : ''} ${isWrong ? 'wrong' : ''}`}
                  >
                    <input
                      type="radio"
                      name="ex"
                      checked={isPicked}
                      onChange={() => !submitted && setPicked(i)}
                    />
                    <span className="ms-exercise-radio" />
                    <code>{opt}</code>
                  </label>
                );
              })}
            </div>

            <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 24, flexWrap: 'wrap' }}>
              <button className="ms-btn ms-btn-primary" onClick={submit} disabled={picked === null || submitted}>
                Submit Answer »
              </button>
              {submitted && (
                <button className="ms-btn ms-btn-ghost" onClick={() => { setPicked(null); setSubmitted(false); }}>
                  Try again
                </button>
              )}
              <Link to="/assignments" className="ms-btn ms-btn-ghost">See all Exercises</Link>
            </div>

            {submitted && (
              <div className={`ms-exercise-feedback ${picked === EXERCISE.correct ? 'ok' : 'err'}`}>
                {picked === EXERCISE.correct
                  ? '✓ Correct! +20 XP'
                  : `✗ Not quite. The correct answer is option ${EXERCISE.correct + 1}.`}
              </div>
            )}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

const REFS = [
  ['HTML Elements', '/course/html#reference'],
  ['Browser Support', '/tools'],
  ['Attributes', '/course/html#reference'],
  ['Global Attributes', '/course/html#reference'],
  ['Event Attributes', '/course/javascript#reference'],
  ['Color Names', '/tools'],
  ['Canvas', '/course/html#reference'],
  ['Audio/Video DOM', '/course/html#reference'],
  ['Character Sets', '/tools'],
  ['URL Encoding', '/tools'],
  ['Language Codes', '/tools'],
  ['Country Codes', '/tools'],
  ['HTTP Messages', '/tools'],
  ['Px to Em Converter', '/tools'],
  ['Keyboard Shortcuts', '/tools'],
];

export function ReferencesGrid() {
  return (
    <section className="ms-section">
      <div className="ms-container">
        <FadeIn>
          <h2 style={{ textAlign: 'center' }}><span className="ms-grad-text">Reference</span></h2>
          <p className="ms-section-sub">
            Complete references about HTML elements, attributes, events, color names,
            entities, character-sets, URL encoding, language codes, HTTP messages, and more.
          </p>
        </FadeIn>
        <div className="ms-refs-grid">
          {REFS.map((r, i) => (
            <FadeIn key={r[0]} delay={i * 30}>
              <Link to={r[1]} className="ms-ref-tile">{r[0]}</Link>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CertificationBand() {
  return (
    <section className="ms-section">
      <div className="ms-container">
        <FadeIn>
          <div className="ms-cert">
            <div className="ms-cert-text">
              <small className="ms-cert-eyebrow">HTML CERTIFICATION</small>
              <h2>Get Certified in <span className="ms-grad-text">HTML</span></h2>
              <p>
                Complete the MindSpark HTML course, strengthen your knowledge, and earn a
                certificate you can add to your CV, portfolio, and LinkedIn profile.
              </p>
              <Link to="/signup" className="ms-btn ms-btn-primary">Get Certified Today</Link>
            </div>
            <div className="ms-cert-card">
              <div className="ms-cert-tag">CERTIFICATE OF COMPLETION</div>
              <p className="ms-cert-line">This certifies that</p>
              <p className="ms-cert-name">Your Name</p>
              <p className="ms-cert-body">
                has completed the necessary courses of study and passed
                the MindSpark HTML exam, and is hereby declared a
              </p>
              <p className="ms-cert-title">Certified HTML Developer</p>
              <div className="ms-cert-seal">M✦S<br/><small>2026</small></div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

export function TrackProgressShowcase() {
  const { xp, level } = useProgress();
  const days = ['M','T','W','T','F','S','S'];
  return (
    <section className="ms-section">
      <div className="ms-container">
        <FadeIn>
          <div className="ms-track">
            <div className="ms-track-text">
              <h2>Track Your <span className="ms-grad-text">Progress</span></h2>
              <p>Create an account and unlock more features and learning materials:</p>
              <ul className="ms-plus-list">
                <li><span className="ms-check">✓</span>View your completed tutorials, exercises, and quizzes</li>
                <li><span className="ms-check">✓</span>Keep an eye on your progress and daily streaks</li>
                <li><span className="ms-check">✓</span>Join the leaderboard and compete with others</li>
                <li><span className="ms-check">✓</span>Get your own avatar and unlock new skins</li>
                <li><span className="ms-check">✓</span>Create your own personal website</li>
              </ul>
              <Link to="/signup" className="ms-btn ms-btn-primary">Sign Up »</Link>
            </div>

            <div className="ms-track-cards">
              <div className="ms-track-card">
                <div className="ms-track-row">
                  <div className="ms-track-avatar">M</div>
                  <div>
                    <div className="ms-track-streak">🔥 <strong>Current Streak</strong></div>
                    <div className="ms-track-days">7 days</div>
                  </div>
                </div>
                <div className="ms-track-week">
                  {days.map((d, i) => (
                    <div key={i} className="ms-track-day">
                      <span className={`ms-flame ${i < 5 ? 'on' : ''}`}>🔥</span>
                      <span>{d}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="ms-track-card">
                <div className="ms-track-row">
                  <div className="ms-track-js">JS</div>
                  <div>
                    <div className="ms-track-tut">Tutorial</div>
                    <div style={{color:'var(--ms-text-dim)', fontSize: 13}}>Next up: Introduction</div>
                  </div>
                  <div className="ms-track-pct">12%</div>
                </div>
                <div className="ms-track-row">
                  <div className="ms-track-mini">{level.name}</div>
                  <div style={{flex:1}}>
                    <div className="ms-track-tut">Your XP</div>
                    <div style={{color:'var(--ms-text-dim)', fontSize: 13}}>{xp} points · keep going!</div>
                  </div>
                  <div className="ms-track-pct">{Math.min(99, Math.round(xp / 20))}%</div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}


export function HtmlTutorialMerged() {
  const html = COURSES.html;
  const active = html.topics[0];
  const [code, setCode] = useState(active.example || '<h1>Hello, MindSpark!</h1>\n<p>Edit me ✏️</p>');
  const [pinned, setPinned] = useState(code);

  return (
    <section className="ms-section">
      <div className="ms-container">
        <FadeIn>
          <div className="ms-section-head">
            <span className="ms-eyebrow">📘 HTML Tutorial</span>
            <h2>Easy learning with <span className="ms-grad-text">"Try it Yourself"</span></h2>
            <p className="lead">Edit the HTML on the left and see the result on the right.</p>
          </div>
        </FadeIn>

        <FadeIn delay={120}>
          <div style={{ maxWidth: 980, margin: '0 auto' }}>
            <h3 className="ms-hub-title" style={{ textAlign: 'center' }}>{active.title}</h3>
            <p style={{ color: 'var(--ms-text-dim)', textAlign: 'center', marginBottom: 18 }}>{active.intro}</p>

            <div className="ms-tryit ms-tryit--stack">
              <div className="ms-tryit-pane">
                <div className="ms-tryit-bar">
                  <span className="ms-tryit-dot" style={{background:'#E07A5F'}}/>
                  <span className="ms-tryit-dot" style={{background:'#E8B97A'}}/>
                  <span className="ms-tryit-dot" style={{background:'#A8C090'}}/>
                  <span className="ms-tryit-tab">Example</span>
                </div>
                <textarea
                  className="ms-tryit-editor"
                  value={code}
                  onChange={e => setCode(e.target.value)}
                  spellCheck={false}
                  aria-label="HTML code editor"
                />
                <div className="ms-tryit-actions">
                  <button className="ms-btn ms-btn-primary" onClick={() => setPinned(code)}>
                    Try it Yourself »
                  </button>
                  <button className="ms-btn ms-btn-ghost ms-btn-sm" onClick={() => setCode(pinned)}>
                    Reset
                  </button>
                </div>
              </div>
              <div className="ms-tryit-pane">
                <div className="ms-tryit-bar">
                  <span className="ms-tryit-tab">Live Result</span>
                </div>
                <iframe
                  title="Live preview"
                  className="ms-tryit-preview"
                  srcDoc={pinned}
                  sandbox="allow-same-origin"
                />
              </div>
            </div>

            <div style={{ textAlign: 'center', marginTop: 18 }}>
              <Link to="/course/html" className="ms-btn ms-btn-ghost ms-btn-sm">
                Open full HTML course →
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}


export function ExerciseAndList() {
  const [picked, setPicked] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const { addXP } = useProgress();
  const correct = 0;
  const opts = [
    `<a href='/home.htm'>Visit MindSpark!</a>`,
    `<link href='/home.htm'>Visit MindSpark!</link>`,
    `<alink href='/home.htm'>Visit MindSpark!</alink>`,
  ];

  function submit() {
    if (picked === null || submitted) return;
    setSubmitted(true);
    if (picked === correct) addXP(20);
  }

  return (
    <section className="ms-section">
      <div className="ms-container">
        <FadeIn>
          <div className="ms-section-head">
            <span className="ms-eyebrow">💪 Practice</span>
            <h2>HTML <span className="ms-grad-text">Exercises &amp; Quiz</span></h2>
            <p className="lead">Try a quick exercise, then explore the full list.</p>
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          <div className="ms-ex-split">
            <div className="ms-exercise">
              <div className="ms-exercise-head">
                <span>Exercise</span>
              </div>
              <h3 className="ms-exercise-q">What is the correct syntax for an HTML hyperlink?</h3>
              <div className="ms-exercise-opts">
                {opts.map((opt, i) => {
                  const isPicked = picked === i;
                  const isCorrect = submitted && i === correct;
                  const isWrong = submitted && isPicked && i !== correct;
                  return (
                    <label key={i} className={`ms-exercise-opt ${isPicked ? 'picked' : ''} ${isCorrect ? 'correct' : ''} ${isWrong ? 'wrong' : ''}`}>
                      <input type="radio" name="ex2" checked={isPicked} onChange={() => !submitted && setPicked(i)} />
                      <span className="ms-exercise-radio" />
                      <code>{opt}</code>
                    </label>
                  );
                })}
              </div>
              <div style={{ display: 'flex', gap: 12, marginTop: 18, flexWrap: 'wrap' }}>
                <button className="ms-btn ms-btn-primary" onClick={submit} disabled={picked === null || submitted}>Submit »</button>
                {submitted && (
                  <button className="ms-btn ms-btn-ghost" onClick={() => { setPicked(null); setSubmitted(false); }}>Try again</button>
                )}
                <Link to="/exercises" className="ms-btn ms-btn-ghost">See all exercises</Link>
              </div>
              {submitted && (
                <div className={`ms-exercise-feedback ${picked === correct ? 'ok' : 'err'}`}>
                  {picked === correct ? '✓ Correct! +20 XP' : `✗ Not quite. The correct answer is option ${correct + 1}.`}
                </div>
              )}
            </div>
            <div className="ms-feature-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h3 style={{ marginTop: 0 }}>📝 HTML Quiz</h3>
              <p style={{ color: 'var(--ms-text-dim)' }}>A short multiple-choice quiz to check what you've learned.</p>
              <Link to="/quiz" className="ms-btn ms-btn-primary ms-btn-sm" style={{ alignSelf: 'flex-start' }}>
                Start quiz →
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
