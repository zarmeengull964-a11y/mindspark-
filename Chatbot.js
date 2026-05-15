import { useEffect, useRef, useState } from 'react';
import FadeIn from '../components/FadeIn';


import { API_BASE } from '../context/AuthContext';

const QUICK_PROMPTS = [
  '✨  Explain JavaScript closures simply',
  '🐍  Show me a Python list comprehension',
  '🎨  Best CSS layout for a responsive grid?',
  '⚛️  When should I use useEffect vs useMemo?',
  '🧠  Give me a SQL JOIN cheat-sheet',
];

function localReply(text) {
  const t = text.toLowerCase();

  if (t.includes('hello') || t.startsWith('hi') || t === 'hey') {
    return "Hi! 👋 I'm **Spark**, your MindSpark study buddy.\n\nI can help you with the courses on this site:\n• **HTML, CSS, JavaScript, jQuery** — frontend basics\n• **React, TypeScript, Node.js, Bootstrap** — modern web stack\n• **Python, PHP, SQL, C++, Go, Git** — backend & tooling\n\nAsk me anything — for example *\"explain CSS Flexbox\"*, *\"show me a JavaScript closure example\"*, or *\"how do SQL JOINs work?\"* — and I'll walk you through it with code samples and explanations. ✨";
  }

  if (t.includes('closure')) {
    return "**JavaScript Closures — explained in detail**\n\nA *closure* is a function that **remembers** the variables from the scope where it was created, even after that outer scope has finished executing. This is one of the most powerful — and most misunderstood — features of JavaScript.\n\n**Why it matters:** closures let you create private state, build factories, encapsulate data, and write cleaner async code.\n\n```js\nfunction makeCounter() {\n  let count = 0;          // \"private\" variable\n  return {\n    inc: () => ++count,\n    dec: () => --count,\n    get: () => count\n  };\n}\n\nconst c = makeCounter();\nc.inc(); c.inc(); c.inc();\nconsole.log(c.get()); // 3\n// `count` is invisible from the outside — only the\n// returned methods can touch it.\n```\n\n**How it works step by step:**\n1. `makeCounter` runs and creates the local variable `count`.\n2. It returns an object whose methods *capture* `count` in their lexical scope.\n3. Even after `makeCounter` finishes, `count` stays alive because the returned methods still reference it.\n4. Every call to `makeCounter()` produces a brand-new, isolated `count` — that's why closures are perfect for private state.\n\n**Common uses:** event handlers, debounced/throttled functions, currying, React hooks (`useState` is closure-based!), module patterns.";
  }

  if (t.includes('list comprehension') || (t.includes('python') && t.includes('list'))) {
    return "**Python List Comprehensions — full guide**\n\nList comprehensions are Python's elegant way to build lists in a single readable line. They replace the classic `for` + `append` loop with a concise expression.\n\n```py\n# Squares of even numbers from 0..9\nsquares = [x*x for x in range(10) if x % 2 == 0]\n# [0, 4, 16, 36, 64]\n\n# Flatten a 2D list\nmatrix = [[1,2,3],[4,5,6]]\nflat = [n for row in matrix for n in row]\n# [1, 2, 3, 4, 5, 6]\n\n# Build a dict comprehension\nsquares_d = {x: x*x for x in range(5)}\n# {0:0, 1:1, 2:4, 3:9, 4:16}\n```\n\n**General syntax:** `[expression for item in iterable if condition]`\n\n**When to use them:** transforming data, filtering, building lookup tables, or replacing trivial `map`/`filter` calls. They're typically faster than equivalent loops because Python optimizes them at the bytecode level.\n\n**When NOT to use them:** if the logic spans more than ~2 lines, fall back to a normal for-loop — readability beats cleverness.";
  }

  if ((t.includes('grid') || t.includes('flex')) && t.includes('css')) {
    return "**Modern CSS Layout — Grid vs Flexbox**\n\nUse **Flexbox** for *one-dimensional* layouts (a row OR a column), and **CSS Grid** for *two-dimensional* layouts (rows AND columns at once).\n\n**Responsive grid that wraps automatically — no media queries:**\n```css\n.cards {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));\n  gap: 20px;\n}\n```\n\n**Flexbox navbar:**\n```css\n.nav {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 16px;\n}\n```\n\n**Key properties to know:**\n• `gap` — spacing between items (works in both Flex and Grid)\n• `align-items` — cross-axis alignment\n• `justify-content` — main-axis alignment\n• `grid-template-columns` / `rows` — define the grid tracks\n• `minmax(min, max)` — flexible track sizing\n• `auto-fit` vs `auto-fill` — both wrap items, but `auto-fit` collapses empty tracks\n\n**Rule of thumb:** start with Flexbox. Reach for Grid the moment you need to align in two directions at once.";
  }

  if (t.includes('useeffect') || t.includes('usememo')) {
    return "**React: useEffect vs useMemo**\n\nThese hooks look similar but solve very different problems.\n\n**`useEffect` — runs side effects AFTER render**\nUse it for things that touch the *outside world*: data fetching, subscriptions, timers, manual DOM updates, logging.\n```jsx\nuseEffect(() => {\n  const id = setInterval(() => tick(), 1000);\n  return () => clearInterval(id); // cleanup\n}, []);\n```\n\n**`useMemo` — caches a computed value DURING render**\nUse it to avoid re-doing an expensive pure calculation every render.\n```jsx\nconst sorted = useMemo(\n  () => bigList.slice().sort(comparator),\n  [bigList]\n);\n```\n\n**Quick decision guide:**\n• Performing an *action* (fetch, subscribe, log)? → `useEffect`\n• Returning a *value* you want to cache? → `useMemo`\n• Caching a *function* reference? → `useCallback`\n\n**Common mistake:** wrapping everything in `useMemo` for \"performance\". Memoization itself has a cost — only use it when you can measure a real problem (slow renders, large lists, expensive recalculations).";
  }

  if (t.includes('join') && t.includes('sql')) {
    return "**SQL JOINs — complete cheat-sheet**\n\nJOINs combine rows from two or more tables based on a related column.\n\n• **INNER JOIN** — only rows that match in *both* tables\n• **LEFT JOIN** — every row from the left table + matching rows from the right (NULLs if none)\n• **RIGHT JOIN** — every row from the right table + matching rows from the left\n• **FULL OUTER JOIN** — every row from both tables (NULLs where no match)\n• **CROSS JOIN** — Cartesian product (every row × every row)\n\n```sql\n-- Show every user and any orders they've placed (even users with 0 orders)\nSELECT u.name, COUNT(o.id) AS order_count, COALESCE(SUM(o.total), 0) AS spent\nFROM users u\nLEFT JOIN orders o ON o.user_id = u.id\nGROUP BY u.id, u.name\nORDER BY spent DESC;\n```\n\n**Tips:**\n1. Always alias your tables (`u`, `o`) for readability.\n2. Use `LEFT JOIN` when the left side is the \"source of truth\" and the right side is optional.\n3. Watch out for row multiplication — joining on a non-unique column can blow up your result set.\n4. Use `EXPLAIN` to see how the database actually executes the join.";
  }

  if (t.includes('html')) {
    return "**HTML — the structure of the web**\n\nHTML defines the *meaning* and *structure* of your content. Modern HTML emphasizes **semantic tags** that describe what content *is*, not how it looks.\n\n```html\n<header>\n  <nav><a href=\"/\">Home</a></nav>\n</header>\n<main>\n  <article>\n    <h1>Article title</h1>\n    <p>Paragraph of text…</p>\n    <figure>\n      <img src=\"photo.jpg\" alt=\"A descriptive caption\" />\n      <figcaption>Photo by Alice</figcaption>\n    </figure>\n  </article>\n</main>\n<footer>© 2026 MindSpark</footer>\n```\n\n**Best practices:**\n• Always include `alt` text on images for accessibility.\n• Use one `<h1>` per page; nest `<h2>`–`<h6>` logically.\n• Prefer semantic tags (`<header>`, `<main>`, `<article>`, `<aside>`, `<footer>`) over generic `<div>`s.\n• Use `<button>` for actions and `<a>` for navigation — never the other way around.\n\nWant me to show you a specific element like `<form>`, `<table>`, or `<dialog>`?";
  }

  if (t.includes('css')) {
    return "**CSS — styling the web**\n\nCSS controls how your HTML looks and behaves visually. Modern CSS is incredibly powerful — most layouts no longer need any framework.\n\n**Core toolkit (2026):**\n• **Flexbox** — 1D layouts (rows/columns)\n• **Grid** — 2D layouts\n• **Custom properties** (CSS variables) — `--brand: #7B2FFF;` for theming\n• **`clamp(min, ideal, max)`** — fluid font sizes & spacing\n• **`@container`** queries — style based on parent size, not viewport\n• **`:has()`** — parent selector (e.g. style a card *only if* it contains an image)\n\n```css\n:root {\n  --brand: #7B2FFF;\n  --radius: 12px;\n}\n.card {\n  padding: clamp(16px, 4vw, 32px);\n  background: white;\n  border-radius: var(--radius);\n  box-shadow: 0 4px 14px rgba(0,0,0,.08);\n  transition: transform .2s, box-shadow .2s;\n}\n.card:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 8px 24px rgba(0,0,0,.12);\n}\n```\n\nAsk me about a specific topic — animations, dark mode, responsive images, or a tricky layout — and I'll go deep.";
  }

  if (t.includes('python')) {
    return "**Python — readable, batteries-included**\n\nPython is famous for its clean syntax and massive ecosystem. It's a top choice for beginners *and* for serious work in data science, AI, web backends, scripting, and automation.\n\n**Quick tour of the basics:**\n```py\n# Variables and types\nname = \"Spark\"\nage = 3\nis_ai = True\n\n# Lists, dicts, sets\nfruits = [\"apple\", \"banana\", \"cherry\"]\nuser = {\"name\": \"Ada\", \"role\": \"admin\"}\nunique = {1, 2, 3}\n\n# Functions\ndef greet(person, excited=False):\n    suffix = \"!\" if excited else \".\"\n    return f\"Hello, {person}{suffix}\"\n\n# Classes\nclass Counter:\n    def __init__(self): self.n = 0\n    def inc(self): self.n += 1\n```\n\n**Where to go next:** list/dict comprehensions, error handling with `try/except`, file I/O, the standard library (`pathlib`, `json`, `csv`, `datetime`), then Flask/FastAPI for web or pandas/NumPy for data.";
  }

  if (t.includes('react')) {
    return "**React — component-based UI**\n\nReact lets you build UIs by composing small, reusable **components**. State is local by default; data flows down through *props*; events flow up through *callbacks*.\n\n**Essential hooks:**\n• `useState` — local state\n• `useEffect` — side effects\n• `useMemo` / `useCallback` — performance memoization\n• `useRef` — mutable values & DOM refs\n• `useContext` — share state without prop-drilling\n\n```jsx\nimport { useState, useEffect } from 'react';\n\nfunction Counter({ initial = 0 }) {\n  const [count, setCount] = useState(initial);\n\n  useEffect(() => {\n    document.title = `Count: ${count}`;\n  }, [count]);\n\n  return (\n    <div className=\"card\">\n      <p>Count: {count}</p>\n      <button onClick={() => setCount(c => c + 1)}>+1</button>\n    </div>\n  );\n}\n```\n\n**Best practices:** keep components small, lift shared state up, use functional updates (`setX(prev => …)`), and split large effects into smaller focused ones.";
  }

  // Generic, but still long & helpful
  return `Great question! Here's a detailed starting point for **"${text}"**:\n\n1. **Break the problem into smaller pieces.** What's the input? What's the expected output? What edge cases exist?\n2. **Look up the official docs.** MDN for HTML/CSS/JS, python.org for Python, react.dev for React — they're more accurate than random blog posts.\n3. **Write the smallest version that works.** Five lines that run beat fifty lines that don't.\n4. **Run it, test it, then refactor.** Don't optimize before it works.\n5. **Ask a follow-up.** Try things like *"show me an example"*, *"explain how X works"*, or *"compare A and B"* and I'll go much deeper.\n\nWhich part would you like me to dig into first?`;
}

async function fetchAIReply(history) {
  try {
    const res = await fetch(`${API_BASE}/chat.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: history }),
    });
    if (res.ok) {
      const data = await res.json().catch(() => null);
      if (data && data.ok && typeof data.reply === 'string') return data.reply;
    }
  } catch {}
  return localReply(history[history.length - 1]?.content || '');
}

function Bubble({ role, content }) {
  const isUser = role === 'user';
  return (
    <div className={`ms-chat-row ${isUser ? 'me' : 'bot'}`}>
      <div className="ms-chat-avatar" aria-hidden>{isUser ? '🧑' : '✨'}</div>
      <div className="ms-chat-bubble">
        {content.split('\n').map((line, i) => (
          <p key={i} style={{ margin: '0 0 6px' }} dangerouslySetInnerHTML={{
            __html: line
              .replace(/`{3}([\s\S]*?)`{3}/g, '<pre class="ms-chat-pre"><code>$1</code></pre>')
              .replace(/`([^`]+)`/g, '<code class="ms-chat-code">$1</code>')
              .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
          }} />
        ))}
      </div>
    </div>
  );
}

export default function Chatbot() {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hi! ✨ I'm **Spark**, your MindSpark AI study buddy.\nAsk me anything about coding — or pick a quick prompt below to get started." },
  ]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: 'smooth' });
  }, [messages, busy]);

  async function send(text) {
    const t = (text ?? input).trim();
    if (!t || busy) return;
    const next = [...messages, { role: 'user', content: t }];
    setMessages(next);
    setInput('');
    setBusy(true);
    const reply = await fetchAIReply(next);
    // Tiny delay for natural feel
    setTimeout(() => {
      setMessages(m => [...m, { role: 'assistant', content: reply }]);
      setBusy(false);
    }, 350);
  }

  function clear() {
    setMessages([{ role: 'assistant', content: "Cleared. What would you like to learn next? ✨" }]);
  }

  return (
    <div className="ms-container ms-section">
      <FadeIn>
        <div className="ms-section-head" style={{ textAlign: 'center' }}>
          <span className="ms-eyebrow">✨ AI Assistant</span>
          <h1>Spark — Your AI Study Buddy</h1>
          <p className="lead">Ask coding questions, get instant explanations, examples, and tips. Powered by AI, designed for learners.</p>
        </div>
      </FadeIn>

      <FadeIn>
        <div className="ms-chat-shell">
          <div className="ms-chat-header">
            <div className="ms-chat-orb" aria-hidden>
              <span /><span /><span />
            </div>
            <div>
              <strong>Spark AI</strong>
              <small>Online · in-memory chat (refresh clears history)</small>
            </div>
            <button className="ms-btn ms-btn-ghost ms-btn-sm" onClick={clear} style={{ marginLeft: 'auto' }}>Clear chat</button>
          </div>

          <div className="ms-chat-stream" ref={scrollRef}>
            {messages.map((m, i) => <Bubble key={i} {...m} />)}
            {busy && (
              <div className="ms-chat-row bot">
                <div className="ms-chat-avatar">✨</div>
                <div className="ms-chat-bubble">
                  <span className="ms-typing"><i/><i/><i/></span>
                </div>
              </div>
            )}
          </div>

          <div className="ms-chat-quick">
            {QUICK_PROMPTS.map(p => (
              <button key={p} className="ms-chat-chip" onClick={() => send(p.replace(/^[^\s]+\s+/, ''))}>{p}</button>
            ))}
          </div>

          <form className="ms-chat-input" onSubmit={(e) => { e.preventDefault(); send(); }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask Spark anything…  (e.g. 'How do CSS variables work?')"
              aria-label="Type your message"
            />
            <button type="submit" className="ms-btn ms-btn-primary" disabled={busy || !input.trim()}>
              Send
            </button>
          </form>
        </div>
      </FadeIn>
    </div>
  );
}
