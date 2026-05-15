import { useEffect, useMemo, useRef, useState } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { COURSES } from '../data/courses';
import { useProgress } from '../context/ProgressContext';
import { useToast } from '../context/ToastContext';
import FadeIn from '../components/FadeIn';
import LiteVideo from '../components/LiteVideo';
import { downloadNotes } from '../utils/notes';
import { useAuthGate } from '../context/AuthGateContext';
import { scrollToPageTop } from '../utils/scroll';

function TryIt({ initial }) {
  const { isAuthed, openAuth } = useAuthGate();
  const [code, setCode] = useState(initial || '');
  const [preview, setPreview] = useState(initial || '');
  useEffect(() => { setCode(initial || ''); setPreview(initial || ''); }, [initial]);
  useEffect(() => {
    const t = setTimeout(() => setPreview(code), 300);
    return () => clearTimeout(t);
  }, [code]);
  if (!isAuthed) {
    return (
      <div className="ms-tryit ms-tryit-locked">
        <div className="ms-tryit-head"><span>🔒 Try it Yourself — sign in required</span></div>
        <div className="ms-tryit-lock-body">
          <p>The interactive code editor is available to signed-in members. It's free — sign in to start coding.</p>
          <button className="ms-btn ms-btn-primary" onClick={() => openAuth('signup', 'Sign in to use the live code editor.')}>
            Sign in to unlock the editor
          </button>
        </div>
      </div>
    );
  }
  return (
    <div className="ms-tryit">
      <div className="ms-tryit-head">
        <span>Try it Yourself — live preview</span>
        <button className="ms-btn ms-btn-ghost ms-btn-sm" onClick={() => setCode(initial)}>Reset</button>
      </div>
      <div className="ms-tryit-body">
        <textarea value={code} onChange={(e) => setCode(e.target.value)} spellCheck={false} aria-label="Code editor" />
        <iframe title="preview" sandbox="allow-scripts" srcDoc={preview} />
      </div>
    </div>
  );
}

function Certificate({ courseName }) {
  const [name, setName] = useState('');
  const [issued, setIssued] = useState(null);
  function generate(e) {
    e.preventDefault();
    if (!name.trim()) return;
    const id = 'MS-2026-' + Math.random().toString(36).slice(2,8).toUpperCase();
    setIssued({ name, id, date: new Date().toLocaleDateString() });
  }
  if (issued) return (
    <div className="ms-cert">
      <h3>🏆 Certificate of Completion</h3>
      <p>This certifies that</p>
      <h2 style={{margin:'8px 0'}}>{issued.name}</h2>
      <p>has successfully completed the <strong>{courseName}</strong> course on MindSpark.</p>
      <p style={{color:'var(--ms-text-dim)'}}>Issued {issued.date} · ID {issued.id}</p>
      <button className="ms-btn ms-btn-primary ms-btn-sm" onClick={() => window.print()}>Print / Save PDF</button>
    </div>
  );
  return (
    <form className="ms-cert" onSubmit={generate}>
      <h3>Get your certificate</h3>
      <p style={{color:'var(--ms-text-dim)'}}>Enter your name as it should appear:</p>
      <input className="ms-input" placeholder="Your full name" value={name} onChange={(e)=>setName(e.target.value)} style={{maxWidth:360, margin:'10px auto'}} />
      <div><button className="ms-btn ms-btn-primary ms-btn-sm">Generate Certificate</button></div>
    </form>
  );
}

export default function CoursePage() {
  const { language } = useParams();
  const location = useLocation();
  const course = COURSES[language];
  const { isCompleted, completeTopic, completedCount } = useProgress();
  const { toast } = useToast();
  const { requireAuth } = useAuthGate();
  const [active, setActive] = useState(course?.topics[0]?.id);
  const didMountTopicScroll = useRef(false);

  useEffect(() => {
    if (!course) return;
    const hash = location.hash.replace('#','');
    if (hash && course.topics.some(t => t.id === hash)) setActive(hash);
    else setActive(course.topics[0].id);
  }, [language, location.hash, course]);

  useEffect(() => {
    if (!didMountTopicScroll.current) {
      didMountTopicScroll.current = true;
      return;
    }
    scrollToPageTop();
  }, [active]);

  const topic = useMemo(() => course?.topics.find(t => t.id === active), [course, active]);
  if (!course) return <div className="ms-container ms-section"><h2>Course not found</h2><Link to="/" className="ms-btn ms-btn-primary">Go home</Link></div>;

  const done = completedCount(language);
  const pct = Math.round((done / course.topics.length) * 100);

  function markDone() {
    if (isCompleted(language, topic.id)) return toast('Already completed!');
    completeTopic(language, topic.id, 10);
    toast(`+10 XP — ${topic.title} completed!`);
  }

  const [navOpen, setNavOpen] = useState(false);
  function pickTopic(id) { setActive(id); setNavOpen(false); }

  return (
    <div className="ms-container ms-course-layout">
      <button
        type="button"
        className="ms-course-mobile-toggle"
        onClick={() => setNavOpen(true)}
        aria-label="Open topics menu"
      >
        ☰ <span>{course.name} Tutorial — Topics</span>
      </button>

      {navOpen && <div className="ms-course-backdrop" onClick={() => setNavOpen(false)} />}

      <aside className={`ms-sidebar ms-course-sidebar ${navOpen ? 'is-open' : ''}`}>
        <div className="ms-course-side-head">
          <h4>{course.name} Tutorial</h4>
          <button className="ms-course-side-close" onClick={() => setNavOpen(false)} aria-label="Close menu">✕</button>
        </div>

        <h6>Progress</h6>
        <div className="ms-progress"><div className="ms-progress-bar" style={{ width: `${pct}%` }} /></div>
        <small style={{color:'var(--ms-text-dim)'}}>{done} / {course.topics.length} topics ({pct}%)</small>

        <h6>Topics</h6>
        {course.topics.map(t => (
          <button key={t.id} className={active === t.id ? 'active' : ''} onClick={() => pickTopic(t.id)}>
            <span>{t.title}</span>
            {isCompleted(language, t.id) && <span className="ms-topic-done">✓</span>}
          </button>
        ))}

        <h6>Reference</h6>
        <a href="#reference" onClick={(e)=>{e.preventDefault();setNavOpen(false);document.getElementById('reference')?.scrollIntoView({behavior:'smooth'});}}>Quick Reference</a>

        <h6>Certificate</h6>
        <a href="#certificate" onClick={(e)=>{e.preventDefault();setNavOpen(false);document.getElementById('certificate')?.scrollIntoView({behavior:'smooth'});}}>Get Certificate</a>

        <h6>Resources</h6>
        <a href="#download-notes" onClick={(e)=>{e.preventDefault();setNavOpen(false);requireAuth(()=>downloadNotes(language),'Sign in to download PDF notes.');}}>📥 Download PDF Notes</a>
      </aside>

      <article className="ms-content">
        <FadeIn>
        
          <div className="ms-tut-hero">
            <div className="ms-tut-hero-left">
              <div className="ms-eyebrow">📘 {course.name} Tutorial</div>
              <h1 className="ms-tut-hero-title">{topic.title}</h1>
              <p className="ms-tut-hero-tag">Easy learning with <em>"Try it Yourself"</em></p>
              <p className="ms-tut-hero-desc">
                Edit the {course.name} on the left and see the result on the right.
              </p>
              <button
                className="ms-btn ms-btn-primary ms-tut-hero-cta"
                onClick={() => {
                  document.querySelector('.ms-tryit')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                  setTimeout(() => document.querySelector('.ms-tryit textarea')?.focus(), 400);
                }}
              >
                ✨ Try it Yourself ▸
              </button>
            </div>
            <div className="ms-tut-hero-right" aria-hidden>
              <div className="ms-tut-hero-card">
                <div className="ms-tut-hero-card-dots"><span/><span/><span/></div>
                <pre>{topic.example}</pre>
              </div>
            </div>
          </div>

          <h2>Example</h2>
          <div className="ms-codeblock"><pre style={{margin:0, whiteSpace:'pre-wrap'}}>{topic.example}</pre></div>

          <h2>How it works</h2>
          <p>{topic.explanation}</p>

          <TryIt initial={topic.example} />
          <div style={{ textAlign: 'center', marginTop: 14 }}>
            <a
              href="#try-it"
              className="ms-btn ms-btn-primary"
              onClick={(e) => { e.preventDefault(); document.querySelector('.ms-tryit textarea')?.focus(); }}
            >
              ✨ Try it Yourself
            </a>
          </div>

          <div style={{display:'flex', gap:10, marginTop:24, flexWrap:'wrap', justifyContent:'center'}}>
            <button className="ms-btn ms-btn-primary" onClick={markDone}>
              {isCompleted(language, topic.id) ? '✓ Completed' : 'Mark as Complete (+10 XP)'}
            </button>
            <button className="ms-btn ms-btn-accent" onClick={()=>requireAuth(()=>downloadNotes(language),'Sign in to download PDF notes.')}>
              📥 Download Notes
            </button>
            {(() => {
              const i = course.topics.findIndex(t => t.id === active);
              const next = course.topics[i+1];
              return next ? <button className="ms-btn ms-btn-ghost" onClick={()=>setActive(next.id)}>Next: {next.title} →</button> : null;
            })()}
          </div>
        </FadeIn>

        <div id="reference" />
        <FadeIn>
          <h2 style={{marginTop:50}}>{course.name} Quick Reference</h2>
          <table style={{width:'100%', borderCollapse:'collapse', marginTop:14}}>
            <thead><tr><th style={{textAlign:'left', padding:'10px', borderBottom:'1px solid var(--ms-border)'}}>Item</th><th style={{textAlign:'left', padding:'10px', borderBottom:'1px solid var(--ms-border)'}}>Description</th></tr></thead>
            <tbody>
              {course.reference.map(([k,v]) => (
                <tr key={k}><td style={{padding:'10px', borderBottom:'1px solid var(--ms-border)', fontFamily:'var(--ms-font-mono)', color:'var(--ms-accent)'}}>{k}</td><td style={{padding:'10px', borderBottom:'1px solid var(--ms-border)'}}>{v}</td></tr>
              ))}
            </tbody>
          </table>
        </FadeIn>

        <FadeIn>
          <h2 style={{marginTop:50}}>📺 Video lessons</h2>
          <div className="ms-video-grid">
            {Array.from({ length: 3 }).map((_, i) => {
              const vid = topic.videos && topic.videos[i];
              const cardTitle = `${topic.title} — video ${i + 1}`;
              const query = `${course.name} ${topic.title} tutorial`;
              return (
                <div key={(vid || 'search') + i} className="ms-video-card">
                  <LiteVideo id={vid} title={cardTitle} searchQuery={query} />
                  <div className="ms-video-card-body">
                    <strong>{topic.title}</strong>
                    <small>{vid ? 'Video tutorial · YouTube' : 'Search · YouTube'}</small>
                  </div>
                </div>
              );
            })}
          </div>
        </FadeIn>

        <div id="certificate" />
        <FadeIn>
          <h2 style={{marginTop:50}}>Certificate</h2>
          <Certificate courseName={course.name} />
        </FadeIn>
      </article>
    </div>
  );
}
