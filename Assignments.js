import { useState } from 'react';
import { ASSIGNMENTS } from '../data/assignments';
import { COURSES } from '../data/courses';
import { useToast } from '../context/ToastContext';
import FadeIn from '../components/FadeIn';

const colors = { Easy: 'var(--ms-success)', Medium: 'var(--ms-warn)', Hard: 'var(--ms-danger)' };

export default function Assignments() {
  const [open, setOpen] = useState(null);
  const [text, setText] = useState('');
  const { toast } = useToast();
  const grouped = ASSIGNMENTS.reduce((acc, a) => { (acc[a.lang] ||= []).push(a); return acc; }, {});
  return (
    <div className="ms-container ms-section">
      <FadeIn><h1 style={{textAlign:'center'}}>📚 Assignments</h1>
      <p className="ms-section-sub">Hands-on practice grouped by language.</p></FadeIn>

      {Object.entries(grouped).map(([lang, list]) => (
        <FadeIn key={lang}>
          <h2 style={{marginTop:36}}>{COURSES[lang]?.name || lang}</h2>
          <div className="ms-feature-grid">
            {list.map(a => (
              <div key={a.id} className="ms-feature-card">
                <span style={{display:'inline-block', padding:'4px 10px', borderRadius:999, background:'rgba(0,198,255,.1)', color:colors[a.difficulty], fontSize:12, fontWeight:700, marginBottom:8}}>{a.difficulty}</span>
                <h3>{a.title}</h3>
                <p>{a.desc}</p>
                <button className="ms-btn ms-btn-primary ms-btn-sm" onClick={()=>{setOpen(a); setText('');}}>Open</button>
              </div>
            ))}
          </div>
        </FadeIn>
      ))}

      {open && (
        <div className="ms-drawer-backdrop open" onClick={()=>setOpen(null)}>
          <div className="ms-auth" style={{maxWidth:600}} onClick={e=>e.stopPropagation()}>
            <h2>{open.title}</h2>
            <p style={{color:'var(--ms-text-dim)'}}>{open.desc}</p>
            <textarea className="ms-textarea" placeholder="Paste your code or notes here..." value={text} onChange={e=>setText(e.target.value)} style={{minHeight:200}} />
            <div style={{display:'flex', gap:10, marginTop:14}}>
              <button className="ms-btn ms-btn-primary" onClick={()=>{toast('Submission saved locally!'); setOpen(null);}}>Submit</button>
              <button className="ms-btn ms-btn-ghost" onClick={()=>setOpen(null)}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
