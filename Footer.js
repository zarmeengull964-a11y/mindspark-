import { useState } from 'react';
import { Link } from 'react-router-dom';
import { COURSE_LIST } from '../data/courses';
import { useToast } from '../context/ToastContext';

export default function Footer() {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  function submit(e) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return toast('Please fill all fields');
    toast('Thanks! Your message was sent.');
    setForm({ name: '', email: '', message: '' });
  }

  return (
    <footer className="ms-footer">
      <div className="ms-container">
        <div className="ms-footer-grid">
          <div>
            <Link className="ms-logo" to="/">
              <img src="/logo.svg" alt="MindSpark" width="34" height="34" style={{borderRadius:6}}/><span>MindSpark</span>
            </Link>
            <p style={{ color: 'var(--ms-text-dim)', marginTop: 12, maxWidth: 320 }}>
              Spark your mind. Learn to code with interactive tutorials, embedded videos and hands-on projects.
            </p>
            <div className="ms-socials">
              <a className="ms-icon-btn" href="https://github.com" aria-label="GitHub" target="_blank" rel="noreferrer"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.5-1.3-1.3-1.7-1.3-1.7-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-5.8 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.5-2.7 5.5-5.4 5.8.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3"/></svg></a>
              <a className="ms-icon-btn" href="https://twitter.com" aria-label="Twitter" target="_blank" rel="noreferrer"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h3l-7 8 8 12h-6l-5-7-6 7H2l8-9L2 2h7l4 6 5-6z"/></svg></a>
              <a className="ms-icon-btn" href="https://linkedin.com" aria-label="LinkedIn" target="_blank" rel="noreferrer"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M4 4a2 2 0 1 1 0 4 2 2 0 0 1 0-4zm-1 6h2v10H3V10zm5 0h2v1.5c.6-1 1.7-1.7 3-1.7 2.3 0 3 1.5 3 3.7V20h-2v-5.5c0-1.3-.5-2.2-1.7-2.2-1 0-1.6.7-1.9 1.4-.1.2-.1.5-.1.8V20H8V10z"/></svg></a>
            </div>
          </div>

          <div>
            <h6>Top Tutorials</h6>
            <ul>
              {COURSE_LIST.slice(0, 5).map(c => (
                <li key={c.id}><Link to={`/course/${c.id}`}>{c.name} Tutorial</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h6>Practice</h6>
            <ul>
              <li><Link to="/quiz">Quiz</Link></li>
              <li><Link to="/assignments">Assignments</Link></li>
              <li><Link to="/tools">Tools</Link></li>
              <li><Link to="/progress">Progress</Link></li>
              <li><Link to="/signup">Get Certified</Link></li>
            </ul>
          </div>

          <div>
            <h6>Contact us</h6>
            <form className="ms-contact-form" onSubmit={submit}>
              <input className="ms-input" placeholder="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
              <input className="ms-input" type="email" placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
              <textarea className="ms-textarea" placeholder="Message" value={form.message} onChange={e => setForm({...form, message: e.target.value})} />
              <button className="ms-btn ms-btn-primary ms-btn-sm" type="submit">Send</button>
            </form>
          </div>
        </div>

        <div className="ms-footer-bottom">
          © {new Date().getFullYear()} MindSpark. All Rights Reserved. Built for B.Sc. 4th-semester project.
        </div>
      </div>
    </footer>
  );
}
