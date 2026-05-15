
import { COURSES } from '../data/courses';

export function buildNotesHTML(courseId) {
  const course = COURSES[courseId];
  if (!course) return '<h1>Course not found</h1>';
  const topics = course.topics
    .map(
      (t, i) => `
    <section class="topic">
      <h2>${i + 1}. ${escapeHtml(t.title)}</h2>
      <p class="intro">${escapeHtml(t.intro)}</p>
      <h4>Example</h4>
      <pre>${escapeHtml(t.example)}</pre>
      <h4>How it works</h4>
      <p>${escapeHtml(t.explanation)}</p>
    </section>`
    )
    .join('');

  const refRows = (course.reference || [])
    .map(([k, v]) => `<tr><td><code>${escapeHtml(k)}</code></td><td>${escapeHtml(v)}</td></tr>`)
    .join('');

  return `<!doctype html><html><head><meta charset="utf-8"/>
  <title>${escapeHtml(course.name)} Notes — MindSpark</title>
  <style>
    @page { margin: 22mm 18mm; }
    * { box-sizing: border-box; }
    body { font-family: -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif; color:#1a2238; line-height:1.55; }
    h1 { font-size: 32px; margin: 0 0 6px; color:#0a1d3b; }
    .tagline { color:#666; margin: 0 0 24px; }
    .brand { display:flex; align-items:center; gap:10px; margin-bottom:18px; }
    .brand .dot { width:14px; height:14px; border-radius:50%; background:linear-gradient(135deg,#00C6FF,#7d5cff); }
    .brand strong { font-size:14px; letter-spacing:1.5px; color:#7d5cff; text-transform:uppercase; }
    .topic { page-break-inside: avoid; margin: 18px 0 26px; }
    .topic h2 { font-size:20px; margin: 18px 0 6px; color:#0a1d3b; border-bottom:2px solid #00C6FF; padding-bottom:4px; }
    .topic h4 { font-size:13px; text-transform:uppercase; letter-spacing:1px; color:#7d5cff; margin: 14px 0 4px; }
    .intro { color:#333; }
    pre { background:#0f172a; color:#e2e8f0; padding:14px; border-radius:8px; font-size:12px; white-space:pre-wrap; word-wrap:break-word; }
    table { width:100%; border-collapse:collapse; margin-top:8px; }
    td { border-bottom:1px solid #e5e7eb; padding:8px; vertical-align:top; font-size:13px; }
    code { background:#eef2ff; padding:2px 6px; border-radius:4px; color:#3b3bff; }
    .footer { margin-top:30px; font-size:11px; color:#888; text-align:center; }
    .toolbar { position:fixed; top:10px; right:10px; }
    .toolbar button { background:#7d5cff; color:white; border:0; padding:10px 16px; border-radius:8px; cursor:pointer; font-weight:600; box-shadow:0 4px 12px rgba(125,92,255,.35); }
    @media print { .toolbar { display:none; } }
  </style></head><body>
  <div class="toolbar"><button onclick="window.print()">⬇ Save as PDF</button></div>
  <div class="brand"><span class="dot"></span><strong>MindSpark Notes</strong></div>
  <h1>${escapeHtml(course.name)}</h1>
  <p class="tagline">${escapeHtml(course.tagline)}</p>
  ${topics}
  ${refRows ? `<section class="topic"><h2>Quick Reference</h2><table>${refRows}</table></section>` : ''}
  <div class="footer">© MindSpark — Spark Your Mind. Learn anytime, anywhere.</div>
  <script>setTimeout(()=>window.print(), 400);</script>
  </body></html>`;
}

function escapeHtml(s) {
  return String(s ?? '').replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]));
}

export function downloadNotes(courseId) {
  const html = buildNotesHTML(courseId);
  const w = window.open('', '_blank');
  if (!w) {
   
    const url = 'data:text/html;charset=utf-8,' + encodeURIComponent(html);
    window.location.href = url;
    return;
  }
  w.document.open();
  w.document.write(html);
  w.document.close();
}
