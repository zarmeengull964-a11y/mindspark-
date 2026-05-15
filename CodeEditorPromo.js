import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import FadeIn from './FadeIn';

const SNIPPET = `// Welcome to MindSpark Editor
function spark(message) {
  console.log("✨ " + message);
}

spark("Hello, World!");
spark("Build something today.");`;

export default function CodeEditorPromo() {
  const [text, setText] = useState('');
  const idx = useRef(0);

  useEffect(() => {
    let cancelled = false;
    function tick() {
      if (cancelled) return;
      if (idx.current <= SNIPPET.length) {
        setText(SNIPPET.slice(0, idx.current));
        idx.current += 1;
        setTimeout(tick, 28);
      } else {
        setTimeout(() => { idx.current = 0; setText(''); tick(); }, 2000);
      }
    }
    tick();
    return () => { cancelled = true; };
  }, []);

  const lines = text.split('\n').map((line, i) => {
    let html = line
      .replace(/(\/\/.*$)/g, '<span class="ms-term-comment">$1</span>')
      .replace(/("[^"]*")/g, '<span class="ms-term-string">$1</span>')
      .replace(/\b(function|const|let|var|return|if|else)\b/g, '<span class="ms-term-keyword">$1</span>');
    return <div key={i} dangerouslySetInnerHTML={{ __html: html || '&nbsp;' }} />;
  });

  return (
    <section className="ms-section">
      <div className="ms-container" style={{ textAlign: 'center' }}>
        <FadeIn>
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}>Code Editor</h2>
          <p className="ms-section-sub">Edit and run code instantly — no setup required.</p>
        </FadeIn>

        <FadeIn delay={120}>
          <div className="ms-terminal" aria-hidden="true">
            <div className="ms-terminal-bar">
              <span className="ms-term-dot r" />
              <span className="ms-term-dot y" />
              <span className="ms-term-dot g" />
              <span style={{ marginLeft: 14, color: '#7e89bc', fontFamily: 'var(--ms-font-mono)', fontSize: 12 }}>mindspark — editor.js</span>
            </div>
            <div className="ms-terminal-body">
              {lines}
              <span className="ms-term-cursor" />
            </div>
          </div>
        </FadeIn>

        <FadeIn delay={200}>
          <div style={{ marginTop: 30 }}>
            <Link to="/tools" className="ms-btn ms-btn-primary">Try Our Code Editor →</Link>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
