import { useState } from 'react';
import FadeIn from '../components/FadeIn';
import { useToast } from '../context/ToastContext';

function ColorPicker() {
  const [c, setC] = useState('#00C6FF');
  const { toast } = useToast();
  return (
    <div className="ms-tool">
      <h3>🎨 Color Picker</h3>
      <input type="color" value={c} onChange={e=>setC(e.target.value)} style={{width:60, height:40, border:'none', background:'transparent'}} />
      <input className="ms-input" value={c} onChange={e=>setC(e.target.value)} style={{marginTop:10}} />
      <div className="ms-color-swatch" style={{background:c}} />
      <button className="ms-btn ms-btn-ghost ms-btn-sm" style={{marginTop:10}} onClick={()=>{navigator.clipboard?.writeText(c); toast('Copied!');}}>Copy hex</button>
    </div>
  );
}

function HtmlPreview() {
  const [code, setCode] = useState('<h1 style="color:#7B2FFF">Hello!</h1>\n<p>Live preview</p>');
  return (
    <div className="ms-tool">
      <h3>🖼️ HTML Live Preview</h3>
      <textarea className="ms-textarea" value={code} onChange={e=>setCode(e.target.value)} style={{minHeight:120, fontFamily:'var(--ms-font-mono)', fontSize:13}} />
      <iframe title="html-preview" sandbox="allow-scripts" srcDoc={code} style={{width:'100%', height:200, border:'1px solid var(--ms-border)', borderRadius:8, marginTop:10, background:'#fff'}} />
    </div>
  );
}

function CodeFormatter() {
  const [code, setCode] = useState('{"name":"MindSpark","level":1}');
  const [out, setOut] = useState('');
  function fmt() {
    try { setOut(JSON.stringify(JSON.parse(code), null, 2)); }
    catch (e) { setOut('Error: ' + e.message); }
  }
  return (
    <div className="ms-tool">
      <h3>✨ JSON Formatter</h3>
      <textarea className="ms-textarea" value={code} onChange={e=>setCode(e.target.value)} style={{fontFamily:'var(--ms-font-mono)', fontSize:13}} />
      <button className="ms-btn ms-btn-primary ms-btn-sm" style={{marginTop:8}} onClick={fmt}>Format</button>
      {out && <pre className="ms-codeblock" style={{marginTop:10, whiteSpace:'pre-wrap'}}>{out}</pre>}
    </div>
  );
}

function UnitConverter() {
  const [px, setPx] = useState(16);
  const base = 16;
  return (
    <div className="ms-tool">
      <h3>📏 Unit Converter (px ↔ rem)</h3>
      <label className="ms-field">Pixels<input className="ms-input" type="number" value={px} onChange={e=>setPx(+e.target.value||0)} /></label>
      <p>= <strong style={{color:'var(--ms-accent)'}}>{(px/base).toFixed(3)} rem</strong> (base 16px)</p>
      <p>= <strong>{(px*0.75).toFixed(2)} pt</strong></p>
    </div>
  );
}

export default function Tools() {
  return (
    <div className="ms-container ms-section">
      <FadeIn>
        <h1 style={{textAlign:'center'}}>🛠️ Developer Tools</h1>
        <p className="ms-section-sub">Handy utilities for everyday coding.</p>
      </FadeIn>
      <div className="ms-tool-grid">
        <ColorPicker />
        <HtmlPreview />
        <CodeFormatter />
        <UnitConverter />
      </div>
    </div>
  );
}
