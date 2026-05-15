

const tryHTML = (body) => `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: system-ui, sans-serif; padding: 16px; color: #1a2238; }
    h1 { color: #00C6FF; }
    pre { background:#0d1224; color:#cfe8ff; padding:14px; border-radius:8px; overflow:auto; }
  </style>
</head>
<body>
${body}
</body>
</html>`;

const codeBlock = (src) =>
  tryHTML(`<pre>${src.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')}</pre>`);

const t = (id, title, intro, example, explanation, videos = []) =>
  ({ id, title, intro, example, explanation, videos });

export const COURSES = {

  html: {
    id: 'html', name: 'HTML', tagline: 'The language for building web pages',
    bg: '#fff4d4', accent: '#ff7a00', text: '#1a1a1a', btnVariant: 'ms-btn-accent',
    topics: [
      t('introduction', 'HTML Introduction', 'HTML is the standard markup language for creating Web pages jibjjjjjjjjjjjjjjjjjjjj.', tryHTML(`<h1>My First Heading</h1>\\n<p>My first paragraph.</p>`), 'HTML elements describe the structure of a page using tags written in angle brackets.', ['UB1O30fR-EE','aN_MQC7SBww','PlxWf493en4']),
      t('syntax',       'HTML Syntax',       'Every HTML document follows a basic structure.', tryHTML(`<!-- Open in your editor and inspect -->\\n<h1>Doc structure</h1>\\n<p>doctype + html + head + body</p>`), 'Documents start with <!DOCTYPE html> followed by <html>, <head>, <body>.'),
      t('elements',     'HTML Elements',     'An element is everything from start tag to end tag.', tryHTML(`<h2>About Me</h2>\\n<p>I am learning <b>HTML</b>!</p>`), 'Most elements wrap content; some are void (<br>, <img>, <hr>).', ['hu-q2Rwwc5w','UB1O30fR-EE','k__oFTTvoHE']),
      t('attributes',   'HTML Attributes',   'Attributes provide extra information about elements.', tryHTML(`<a href="https://example.com" target="_blank">Visit Example</a>`), 'Attributes appear in the start tag as name="value" pairs.'),
      t('headings',     'HTML Headings',     'Headings define titles and subtitles.', tryHTML(`<h1>H1</h1><h2>H2</h2><h3>H3</h3>`), 'Use <h1> for the main heading; descend in order to <h6>.'),
      t('paragraphs',   'HTML Paragraphs',   'The <p> element defines a paragraph.', tryHTML(`<p>First paragraph.</p>\\n<p>Second paragraph.</p>`), 'Browsers add automatic spacing before and after paragraphs.'),
      t('links',        'HTML Links',        'Links connect pages and resources.', tryHTML(`<a href="https://google.com">Go to Google</a>`), 'href sets the destination; target="_blank" opens in a new tab.'),
      t('images',       'HTML Images',       'Embed images with the <img> tag.', tryHTML(`<img src="https://picsum.photos/300/180" alt="Random image" />`), 'src is the path; alt is the text alternative for accessibility.'),
      t('lists',        'HTML Lists',        'Ordered (ol), unordered (ul) and description (dl) lists.', tryHTML(`<ul><li>Coffee</li><li>Tea</li><li>Milk</li></ul>`), 'Each item is wrapped in <li>.'),
      t('tables',       'HTML Tables',       'Display tabular data.', tryHTML(`<table border="1" cellpadding="6"><tr><th>Name</th><th>Age</th></tr><tr><td>Alex</td><td>22</td></tr></table>`), 'Use <table>, <tr>, <th>, <td>.'),
      t('forms',        'HTML Forms',        'Forms collect user input.', tryHTML(`<form><label>Name: <input/></label><br/><br/><button>Submit</button></form>`), 'Forms wrap controls like input, textarea, select, button.'),
      t('semantic',     'Semantic HTML',     'Use tags that describe meaning.', tryHTML(`<header>Site</header><main><article>Article</article></main><footer>Footer</footer>`), 'Improves accessibility and SEO.'),
      t('multimedia',   'Multimedia',        'Audio and video can be embedded.', tryHTML(`<video controls width="280"><source src="movie.mp4" type="video/mp4"></video>`), 'Use <audio>/<video> with controls and multiple <source>.'),
      t('iframes',      'Iframes',           'Embed another page inside yours.', tryHTML(`<iframe src="https://example.com" width="320" height="160"></iframe>`), 'Use sandbox + loading="lazy" for safety/perf.'),
      t('apis',         'HTML5 APIs',        'Geolocation, Storage, Canvas, Drag&Drop.', tryHTML(`<canvas width="220" height="80" style="background:#00C6FF"></canvas>`), 'Interact with these APIs from JavaScript.'),
      t('accessibility','Accessibility',     'Make pages usable by everyone.', tryHTML(`<button aria-label="Close">X</button>`), 'Use semantic tags, alt text, ARIA attributes and proper heading order.'),
      t('seo',          'Meta & SEO',        'Help search engines understand your page.', tryHTML(`<p>Add <meta name="description"> and Open Graph tags in your &lt;head&gt;.</p>`), 'Title, description, viewport and og:* tags drive previews and ranking.'),
      t('project',      'Mini Project: Personal Page', 'Combine what you learned to ship a tiny site.', tryHTML(`<header style="background:#7B2FFF;color:#fff;padding:14px"><h1>Hi, I'm Alex</h1></header><main style="padding:14px"><p>I love building things on the web.</p><a href="#" class="btn">Contact</a></main>`), 'Build a header, an about section and a contact link to combine semantic HTML, links and styling.'),
    ],
    reference: [
      ['<h1>...<h6>', 'Headings'], ['<p>', 'Paragraph'], ['<a href>', 'Link'], ['<img src alt>', 'Image'],
      ['<ul> <ol> <li>', 'Lists'], ['<table> <tr> <td>', 'Table'], ['<form> <input>', 'Form controls'], ['<div> <span>', 'Containers'],
    ],
  },

  css: {
    id: 'css', name: 'CSS', tagline: 'The language for styling web pages',
    bg: '#cfe9ff', accent: '#0a8cff', text: '#0a1a30', btnVariant: 'ms-btn-dark',
    topics: [
      t('introduction','CSS Introduction','CSS describes how HTML elements are displayed.', tryHTML(`<h1>Hello</h1><style>h1{color:#00C6FF}</style>`), 'CSS can be inline, internal (<style>) or external (.css file).', ['1PnVor36_40','yfoY53QXEnI','OXGznpKZ_sA']),
      t('syntax',      'CSS Syntax',      'A rule has a selector and a declaration block.', tryHTML(`<p>Hi</p><style>p{color:red;font-size:22px}</style>`), 'selector { property: value; }'),
      t('selectors',   'Selectors',       'Target elements with selectors.', tryHTML(`<p class="hi">Hi</p><style>.hi{color:#7B2FFF;font-weight:700}</style>`), 'Tag, .class, #id, [attr], pseudo-classes, combinators.'),
      t('colors',      'CSS Colors',      'Named, hex, rgb, hsl values.', tryHTML(`<div style="background:#7B2FFF;color:#fff;padding:18px">Purple box</div>`), 'Use #hex, rgb(), rgba() for transparency, hsl() for hue control.'),
      t('box-model',   'Box Model',       'Content + padding + border + margin.', tryHTML(`<div style="border:2px solid #00C6FF;padding:18px;margin:10px">Box</div>`), 'Set box-sizing: border-box for predictable widths.'),
      t('typography',  'Typography',      'Style text with font properties.', tryHTML(`<p style="font-family:Georgia;font-size:20px;line-height:1.6">Beautiful text.</p>`), 'Combine family, size, weight, line-height, letter-spacing.'),
      t('backgrounds', 'Backgrounds',     'Colors, images, gradients.', tryHTML(`<div style="background:linear-gradient(45deg,#00C6FF,#7B2FFF);padding:30px;color:#fff">Gradient</div>`), 'background shorthand or layered backgrounds.'),
      t('flexbox',     'Flexbox',         '1D layout: rows or columns.', tryHTML(`<div style="display:flex;gap:10px"><div style="background:#00C6FF;padding:10px">A</div><div style="background:#7B2FFF;color:#fff;padding:10px">B</div></div>`), 'display:flex on parent — children become flex items.', ['JJSoEo8JSnc','3elGSZSWTbM','u044iM9xsjs']),
      t('grid',        'CSS Grid',        '2D layout system.', tryHTML(`<div style="display:grid;grid-template-columns:1fr 1fr;gap:10px"><div style="background:#cfe9ff;padding:14px">1</div><div style="background:#cfe9ff;padding:14px">2</div></div>`), 'grid-template-columns/rows define tracks.'),
      t('positioning', 'Positioning',     'static, relative, absolute, fixed, sticky.', tryHTML(`<div style="position:relative;height:80px"><span style="position:absolute;right:0;background:#7B2FFF;color:#fff;padding:6px">top-right</span></div>`), 'absolute positions relative to nearest positioned ancestor.'),
      t('transitions', 'Transitions',     'Smoothly animate property changes.', tryHTML(`<button style="transition:.3s;background:#00C6FF;color:#fff;border:0;padding:10px 16px;border-radius:8px" onmouseover="this.style.background='#7B2FFF'" onmouseout="this.style.background='#00C6FF'">Hover</button>`), 'transition: <prop> <duration> <easing>.'),
      t('transforms',  'Transforms',      'translate, rotate, scale, skew.', tryHTML(`<div style="width:80px;height:80px;background:#7B2FFF;transform:rotate(15deg) scale(1.1)"></div>`), 'Transforms do not affect layout.'),
      t('animations',  'Animations',      '@keyframes + animation property.', tryHTML(`<div style="width:50px;height:50px;background:#00C6FF;animation:b 1s infinite"></div><style>@keyframes b{50%{transform:translateY(-30px)}}</style>`), 'Define keyframes, then apply with animation shorthand.'),
      t('responsive',  'Responsive Design','Media queries adapt to screen size.', tryHTML(`<div class="b">Resize me</div><style>.b{padding:20px;background:#00C6FF}@media(max-width:500px){.b{background:#7B2FFF;color:#fff}}</style>`), 'Use mobile-first base styles + min-width media queries.'),
      t('variables',   'CSS Variables',   'Reusable values with custom properties.', tryHTML(`<div class="card">Themed</div><style>:root{--brand:#00C6FF}.card{background:var(--brand);color:#fff;padding:14px;border-radius:8px}</style>`), 'Define with --name; read with var(--name).'),
      t('project',     'Mini Project: Card UI','Combine layout + colors + animation.', tryHTML(`<div style="max-width:240px;background:#fff;border-radius:14px;box-shadow:0 10px 30px rgba(0,0,0,.1);padding:18px"><h3 style="color:#7B2FFF">Card</h3><p style="color:#555">A small reusable card.</p><button style="background:#00C6FF;color:#fff;border:0;padding:8px 14px;border-radius:8px">Action</button></div>`), 'Practice combining typography, color, spacing, shadow and a button into one neat component.'),
    ],
    reference: [
      ['color', 'Text color'], ['background', 'Background shorthand'], ['margin/padding', 'Spacing'],
      ['display', 'block/flex/grid'], ['flex / grid', 'Layout containers'], ['@media', 'Responsive'],
      ['transition', 'Smooth changes'], ['transform', 'translate/rotate/scale'],
    ],
  },

  
  javascript: {
    id: 'javascript', name: 'JavaScript', tagline: 'The programming language of the Web',
    bg: '#fff5b8', accent: '#f7df1e', text: '#1a1a1a', btnVariant: 'ms-btn-dark',
    topics: [
      t('introduction','JS Introduction','JavaScript adds interactivity to web pages.', tryHTML(`<button onclick="alert('Hi from JS!')">Click me</button>`), 'JS runs inside <script> tags or in external .js files.', ['W6NZfCO5SIk','hdI2bqOjy3c','PkZNo7MFNFg']),
      t('syntax',      'JS Syntax',     'Statements end with semicolons; blocks use {}.', tryHTML(`<p id="o"></p><script>let x=1;x+=2;document.getElementById("o").textContent=x;</script>`), 'Whitespace is ignored. Strings use \', " or `.'),
      t('variables',   'Variables',     'let, const, var.', tryHTML(`<p id="o"></p><script>const name="MindSpark";let year=2026;document.getElementById("o").textContent=name+" "+year;</script>`), 'Prefer const, then let. Never var.'),
      t('data-types',  'Data Types',    'string, number, boolean, null, undefined, object, symbol, bigint.', tryHTML(`<p id="o"></p><script>document.getElementById("o").textContent=typeof 1+", "+typeof "x"+", "+typeof true;</script>`), 'Use typeof to inspect. Arrays are objects.'),
      t('operators',   'Operators',     'Arithmetic, comparison, logical, assignment.', tryHTML(`<p id="o"></p><script>document.getElementById("o").textContent=(2+3)+" / "+(5>3)+" / "+(true&&false);</script>`), '== compares loosely; === compares strictly (preferred).'),
      t('conditions',  'Conditions',    'if, else if, else, switch, ternary.', tryHTML(`<p id="o"></p><script>const a=10;document.getElementById("o").textContent=a>5?"big":"small";</script>`), 'Ternary: condition ? a : b.'),
      t('loops',       'Loops',         'for, while, do…while, for…of, for…in.', tryHTML(`<p id="o"></p><script>let s="";for(let i=1;i<=3;i++)s+=i+" ";document.getElementById("o").textContent=s;</script>`), 'Use for…of for arrays, for…in for object keys.'),
      t('functions',   'Functions',     'Reusable blocks of code.', tryHTML(`<p id="o"></p><script>const add=(a,b)=>a+b;document.getElementById("o").textContent=add(2,3);</script>`), 'function name(){} or arrow: (a,b)=>a+b.'),
      t('arrays',      'Arrays',        'Ordered collections.', tryHTML(`<p id="o"></p><script>const f=["apple","banana","cherry"];document.getElementById("o").textContent=f.join(", ");</script>`), 'map, filter, reduce, forEach, push, pop, slice.'),
      t('objects',     'Objects',       'Key/value pairs.', tryHTML(`<p id="o"></p><script>const u={name:"Ada",age:36};document.getElementById("o").textContent=u.name+" - "+u.age;</script>`), 'Access with dot or bracket notation.'),
      t('dom',         'The DOM',       'Browser representation of your page.', tryHTML(`<button onclick="document.body.style.background='#00C6FF'">Change BG</button>`), 'Use document.querySelector / getElementById.', ['0ik6X4DJKCc','W6NZfCO5SIk','Qqx_wzMmFeA']),
      t('events',      'Events',        'React to clicks, keys, input.', tryHTML(`<button id="b">Click</button><script>document.getElementById("b").addEventListener("click",()=>alert("clicked"));</script>`), 'addEventListener is the modern way.'),
      t('es6',         'ES6+ Features', 'Let, const, arrows, destructuring, spread, modules, classes.', tryHTML(`<p id="o"></p><script>const arr=[1,2,3];const[first,...rest]=arr;document.getElementById("o").textContent=first+" / "+rest.join(",");</script>`), 'Modern JS uses these features everywhere.'),
      t('fetch',       'API Fetch',     'Make HTTP requests from the browser.', tryHTML(`<p id="o">Loading...</p><script>fetch("https://api.github.com").then(r=>r.json()).then(d=>document.getElementById("o").textContent=Object.keys(d).length+" endpoints");</script>`), 'fetch returns a Promise that resolves to a Response.'),
      t('async',       'Async / Await', 'Cleaner syntax for promises.', tryHTML(`<p id="o"></p><script>async function load(){const r=await fetch("https://api.github.com");const d=await r.json();document.getElementById("o").textContent=Object.keys(d).length+" endpoints";}load();</script>`), 'await pauses an async function until a promise resolves.'),
      t('project',     'Mini Project: Counter', 'Build a click counter with state.', tryHTML(`<button id="b" style="padding:10px 16px;border-radius:8px;background:#7B2FFF;color:#fff;border:0">Clicks: 0</button><script>let n=0;const b=document.getElementById("b");b.onclick=()=>b.textContent="Clicks: "+(++n);</script>`), 'Combines DOM, events and state to build a tiny app.'),
    ],
    reference: [
      ['let / const',       'Declare variables'],
      ['function / =>',     'Define functions'],
      ['Array methods',     'map, filter, reduce, forEach'],
      ['document.querySelector', 'Find DOM nodes'],
      ['addEventListener',  'Listen for events'],
      ['fetch',             'HTTP requests'],
      ['async / await',     'Async syntax'],
      ['JSON.parse / stringify', 'JSON helpers'],
    ],
  },

  jquery: {
    id: 'jquery', name: 'jQuery', tagline: 'Write less, do more',
    bg: '#bfe7ff', accent: '#0768ad', text: '#0a1a30', btnVariant: 'ms-btn-dark',
    topics: [
      t('introduction','jQuery Introduction','Fast, small JS library that smooths over browser quirks.', tryHTML(`<p id="o">Loading...</p><script src="https://code.jquery.com/jquery-3.7.1.min.js"></script><script>$("#o").text("Hello jQuery!");</script>`), 'Add the jQuery script tag, then use $(selector).', ['BWXggB-T1jQ','Ke90Tje7VS0','w7ejDZ8SWv8']),
      t('syntax',      'jQuery Syntax',    '$(selector).action()', tryHTML(`<p>One</p><script src="https://code.jquery.com/jquery-3.7.1.min.js"></script><script>$("p").css("color","#7B2FFF");</script>`), 'Selector + action chain.'),
      t('selectors',   'Selectors',        'CSS-like selectors with $().', tryHTML(`<p>One</p><p>Two</p><script src="https://code.jquery.com/jquery-3.7.1.min.js"></script><script>$("p").css("color","#00C6FF");</script>`), '$("p"), $(".cls"), $("#id").'),
      t('events',      'Events',           '.on() or shortcuts like .click().', tryHTML(`<button id="b">Click</button><script src="https://code.jquery.com/jquery-3.7.1.min.js"></script><script>$("#b").on("click",()=>$("body").css("background","#7B2FFF"));</script>`), '.on(event, handler) is recommended.'),
      t('effects',     'Effects',          'show, hide, fadeIn, slideUp, animate.', tryHTML(`<button id="b">Toggle</button><div id="d" style="background:#00C6FF;padding:20px;margin-top:10px">Hi</div><script src="https://code.jquery.com/jquery-3.7.1.min.js"></script><script>$("#b").click(()=>$("#d").slideToggle());</script>`), 'Effects accept a duration in ms.'),
      t('chaining',    'Method Chaining',  'Apply multiple methods in one expression.', tryHTML(`<p id="x">Hi</p><script src="https://code.jquery.com/jquery-3.7.1.min.js"></script><script>$("#x").css("color","#7B2FFF").text("Chained!").fadeOut(800).fadeIn(800);</script>`), 'Most jQuery methods return the jQuery object.'),
      t('dom',         'DOM Manipulation', '.html() .text() .append() .remove()', tryHTML(`<ul id="l"><li>One</li></ul><script src="https://code.jquery.com/jquery-3.7.1.min.js"></script><script>$("#l").append("<li>Two</li>");</script>`), 'Read or modify content easily.'),
      t('attr',        'Attributes & CSS', '.attr() .prop() .css() .addClass()', tryHTML(`<a id="a" href="#">link</a><script src="https://code.jquery.com/jquery-3.7.1.min.js"></script><script>$("#a").attr("href","https://google.com").text("Google");</script>`), '.attr for HTML attributes, .prop for DOM properties.'),
      t('forms',       'Forms',            'Read and validate form values.', tryHTML(`<input id="n"/><button id="b">Hi</button><p id="o"></p><script src="https://code.jquery.com/jquery-3.7.1.min.js"></script><script>$("#b").click(()=>$("#o").text("Hi "+$("#n").val()));</script>`), '.val() reads/writes input values.'),
      t('traversal',   'Traversal',        '.parent() .children() .find() .siblings()', tryHTML(`<ul><li>A</li><li class="x">B</li><li>C</li></ul><script src="https://code.jquery.com/jquery-3.7.1.min.js"></script><script>$(".x").siblings().css("color","#7B2FFF");</script>`), 'Walk the DOM tree relative to a selection.'),
      t('animate',     'Animate',          '.animate({...}) for custom motion.', tryHTML(`<div id="d" style="width:60px;height:60px;background:#00C6FF;position:relative"></div><script src="https://code.jquery.com/jquery-3.7.1.min.js"></script><script>$("#d").animate({left:120},800);</script>`), 'Set CSS targets and a duration.'),
      t('ajax',        'AJAX',             '$.ajax / $.get / $.post', tryHTML(`<p id="o">...</p><script src="https://code.jquery.com/jquery-3.7.1.min.js"></script><script>$.get("https://api.github.com",d=>$("#o").text(Object.keys(d).length+" endpoints"));</script>`), 'Wrappers around fetch/XHR with success/error callbacks.'),
      t('plugins',     'Plugins',          'Extend jQuery with $.fn.', tryHTML(`<p>plugin demo</p><script src="https://code.jquery.com/jquery-3.7.1.min.js"></script><script>$.fn.purple=function(){return this.css("color","#7B2FFF")};$("p").purple();</script>`), 'Define on $.fn so it returns "this" to keep chaining.'),
      t('utilities',   'Utilities',        '$.each, $.extend, $.map, $.trim.', tryHTML(`<p id="o"></p><script src="https://code.jquery.com/jquery-3.7.1.min.js"></script><script>const r=$.map([1,2,3],x=>x*2);$("#o").text(r.join(","));</script>`), 'Standalone helpers on the $ object.'),
      t('migration',   'When NOT to use jQuery', 'Modern JS replaces most jQuery use-cases.', tryHTML(`<p>document.querySelectorAll, fetch, classList — all native!</p>`), 'Use jQuery for legacy projects; reach for vanilla JS in new ones.'),
      t('project',     'Mini Project: Todo List', 'Add/remove tasks with jQuery.', tryHTML(`<input id="t" placeholder="Task"><button id="add">Add</button><ul id="l"></ul><script src="https://code.jquery.com/jquery-3.7.1.min.js"></script><script>$("#add").click(()=>{const v=$("#t").val();if(!v)return;$("#l").append(\`<li>\${v} <a href=# class=x>×</a></li>\`);$("#t").val("");});$(document).on("click",".x",function(e){e.preventDefault();$(this).parent().remove();});</script>`), 'Practice events, DOM manipulation and delegation.'),
    ],
    reference: [
      ['$(selector)',  'Select elements'], ['.text() .html()', 'Get/set content'],
      ['.css()', 'Get/set styles'], ['.on(event, fn)', 'Bind event'],
      ['.fadeIn() .slideUp()', 'Effects'], ['$.ajax()', 'AJAX requests'],
    ],
  },

  react: {
    id: 'react', name: 'React', tagline: 'A JavaScript library for building UIs',
    bg: '#cfeefb', accent: '#61dafb', text: '#0a1a30', btnVariant: 'ms-btn-dark',
    topics: [
      t('introduction','React Introduction','React lets you build UIs with reusable components.', tryHTML(`<div id="root"></div><script src="https://unpkg.com/react@18/umd/react.development.js"></script><script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script><script>const e=React.createElement;ReactDOM.createRoot(document.getElementById("root")).render(e("h1",{style:{color:"#7B2FFF"}}, "Hello React!"));</script>`), 'Components are functions that return UI elements.', ['Ke90Tje7VS0','SqcY0GlETPk','w7ejDZ8SWv8']),
      t('jsx',         'JSX',              'HTML-like syntax inside JS.', tryHTML(`<div id="root"></div><script src="https://unpkg.com/react@18/umd/react.development.js"></script><script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script><script src="https://unpkg.com/@babel/standalone/babel.min.js"></script><script type="text/babel">const App=()=>(<h2 style={{color:"#00C6FF"}}>JSX works!</h2>);ReactDOM.createRoot(document.getElementById("root")).render(<App/>);</script>`), 'JSX compiles to React.createElement(). Requires a build (or Babel).'),
      t('components',  'Components',       'Reusable building blocks.', tryHTML(`<div id="root"></div><script src="https://unpkg.com/react@18/umd/react.development.js"></script><script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script><script src="https://unpkg.com/@babel/standalone/babel.min.js"></script><script type="text/babel">function Greet({name}){return <h3>Hello {name}</h3>}ReactDOM.createRoot(document.getElementById("root")).render(<Greet name="Ada"/>);</script>`), 'Function components return JSX.'),
      t('props',       'Props',            'Pass data into components.', tryHTML(`<div id="root"></div><script src="https://unpkg.com/react@18/umd/react.development.js"></script><script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script><script src="https://unpkg.com/@babel/standalone/babel.min.js"></script><script type="text/babel">const Btn=({label})=><button style={{padding:8}}>{label}</button>;ReactDOM.createRoot(document.getElementById("root")).render(<Btn label="Click me"/>);</script>`), 'Props are read-only inputs.'),
      t('state',       'State (useState)', 'Local component state.', tryHTML(`<div id="root"></div><script src="https://unpkg.com/react@18/umd/react.development.js"></script><script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script><script src="https://unpkg.com/@babel/standalone/babel.min.js"></script><script type="text/babel">const{useState}=React;function App(){const[n,setN]=useState(0);return<button onClick={()=>setN(n+1)}>Count: {n}</button>}ReactDOM.createRoot(document.getElementById("root")).render(<App/>);</script>`), 'const [count, setCount] = useState(0).'),
      t('events',      'Handling Events',  'onClick, onChange, onSubmit.', tryHTML(`<div id="root"></div><script src="https://unpkg.com/react@18/umd/react.development.js"></script><script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script><script src="https://unpkg.com/@babel/standalone/babel.min.js"></script><script type="text/babel">function App(){return<button onClick={()=>alert("hi!")}>Hi</button>}ReactDOM.createRoot(document.getElementById("root")).render(<App/>);</script>`), 'Event handlers receive a synthetic event.'),
      t('lists',       'Lists & Keys',     'Render arrays with map().', tryHTML(`<div id="root"></div><script src="https://unpkg.com/react@18/umd/react.development.js"></script><script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script><script src="https://unpkg.com/@babel/standalone/babel.min.js"></script><script type="text/babel">const items=["A","B","C"];ReactDOM.createRoot(document.getElementById("root")).render(<ul>{items.map(i=><li key={i}>{i}</li>)}</ul>);</script>`), 'Each child needs a unique key prop.'),
      t('conditional', 'Conditional Render','if / && / ternary in JSX.', tryHTML(`<div id="root"></div><script src="https://unpkg.com/react@18/umd/react.development.js"></script><script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script><script src="https://unpkg.com/@babel/standalone/babel.min.js"></script><script type="text/babel">const ok=true;ReactDOM.createRoot(document.getElementById("root")).render(<p>{ok?"Yes":"No"}</p>);</script>`), 'Use {cond && <X/>} or ternaries.'),
      t('forms',       'Forms',            'Controlled inputs.', tryHTML(`<div id="root"></div><script src="https://unpkg.com/react@18/umd/react.development.js"></script><script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script><script src="https://unpkg.com/@babel/standalone/babel.min.js"></script><script type="text/babel">const{useState}=React;function App(){const[v,setV]=useState("");return(<><input value={v} onChange={e=>setV(e.target.value)}/><p>Hello {v}</p></>)}ReactDOM.createRoot(document.getElementById("root")).render(<App/>);</script>`), 'value + onChange = controlled input.'),
      t('effects',     'Effects (useEffect)','Side effects after render.', tryHTML(`<div id="root"></div><script src="https://unpkg.com/react@18/umd/react.development.js"></script><script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script><script src="https://unpkg.com/@babel/standalone/babel.min.js"></script><script type="text/babel">const{useState,useEffect}=React;function App(){const[t,setT]=useState(new Date().toLocaleTimeString());useEffect(()=>{const id=setInterval(()=>setT(new Date().toLocaleTimeString()),1000);return()=>clearInterval(id);},[]);return<p>{t}</p>}ReactDOM.createRoot(document.getElementById("root")).render(<App/>);</script>`), 'useEffect(fn, deps). Return cleanup if needed.'),
      t('context',     'Context',          'Share state without prop drilling.', tryHTML(`<p>(useContext: see notes)</p>`), 'createContext + Provider + useContext.'),
      t('refs',        'Refs',             'Access DOM nodes / persist values.', tryHTML(`<p>(useRef: see notes)</p>`), 'const ref = useRef(); <input ref={ref}/>.'),
      t('routing',     'Routing',          'react-router-dom for SPA navigation.', tryHTML(`<p>BrowserRouter, Routes, Route, Link, useNavigate.</p>`), 'Define <Routes> with <Route path element/> children.'),
      t('fetch',       'Data Fetching',    'fetch + useEffect, or libraries.', tryHTML(`<div id="root"></div><script src="https://unpkg.com/react@18/umd/react.development.js"></script><script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script><script src="https://unpkg.com/@babel/standalone/babel.min.js"></script><script type="text/babel">const{useState,useEffect}=React;function App(){const[n,setN]=useState(0);useEffect(()=>{fetch("https://api.github.com").then(r=>r.json()).then(d=>setN(Object.keys(d).length))},[]);return<p>{n} endpoints</p>}ReactDOM.createRoot(document.getElementById("root")).render(<App/>);</script>`), 'Fetch on mount, store in state.'),
      t('project',     'Mini Project: Todo App','Combine state, lists and forms.', tryHTML(`<div id="root"></div><script src="https://unpkg.com/react@18/umd/react.development.js"></script><script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script><script src="https://unpkg.com/@babel/standalone/babel.min.js"></script><script type="text/babel">const{useState}=React;function App(){const[t,setT]=useState("");const[xs,setXs]=useState([]);return(<div><input value={t} onChange={e=>setT(e.target.value)}/><button onClick={()=>{if(t){setXs([...xs,t]);setT("")}}}>Add</button><ul>{xs.map((x,i)=><li key={i}>{x}</li>)}</ul></div>)}ReactDOM.createRoot(document.getElementById("root")).render(<App/>);</script>`), 'A complete tiny React app.'),
    ],
    reference: [
      ['function Component()', 'Function component'], ['useState', 'Local state hook'],
      ['useEffect', 'Side effect hook'], ['useContext', 'Read context'],
      ['Props', 'Read-only inputs'], ['JSX', 'HTML-in-JS syntax'],
    ],
  },


  python: {
    id: 'python', name: 'Python', tagline: 'A powerful, easy-to-learn language',
    bg: '#d6f5cf', accent: '#3776ab', text: '#0a1a30', btnVariant: 'ms-btn-dark',
    topics: [
      t('introduction','Python Introduction','A popular, beginner-friendly language.', codeBlock(`print("Hello, MindSpark!")`), 'Run with: python file.py', ['_uQrJ0TkZlc','rfscVS0vtbw','eWRfhZUzrAc']),
      t('syntax',      'Syntax & Indentation','Python uses indentation instead of braces.', codeBlock(`if 5 > 2:\\n    print("Yes")\\nelse:\\n    print("No")`), 'Consistent 4-space indentation defines blocks.'),
      t('variables',   'Variables',         'No type declarations needed.', codeBlock(`name = "Alex"\\nage = 22\\nprint(name, age)`), 'Python uses dynamic typing.'),
      t('data-types',  'Data Types',        'int, float, str, bool, list, tuple, dict, set.', codeBlock(`print(type(1), type(1.0), type("x"), type(True))`), 'type() returns the type of a value.'),
      t('operators',   'Operators',         'Arithmetic, comparison, logical, membership.', codeBlock(`print(2+3, 5//2, 5**2, "a" in "abc")`), '// floor div, ** power, in tests membership.'),
      t('conditions',  'Conditions',        'if / elif / else.', codeBlock(`x = 10\\nif x > 5:\\n    print("big")\\nelif x == 5:\\n    print("five")\\nelse:\\n    print("small")`), 'Watch the colons and indentation.'),
      t('loops',       'Loops',             'for and while.', codeBlock(`for i in range(3):\\n    print(i)\\n\\nn = 0\\nwhile n < 3:\\n    n += 1`), 'range(stop) generates 0..stop-1.'),
      t('functions',   'Functions',         'Defined with def.', codeBlock(`def add(a, b):\\n    return a + b\\n\\nprint(add(2, 3))`), 'Default args: def f(x=1).'),
      t('lists',       'Lists',             'Ordered, mutable collections.', codeBlock(`fruits = ["apple", "banana"]\\nfruits.append("cherry")\\nprint(fruits)`), 'Index from 0; supports slicing fruits[1:3].'),
      t('tuples',      'Tuples',            'Ordered and immutable.', codeBlock(`point = (3, 4)\\nx, y = point\\nprint(x, y)`), 'Faster than lists; useful as dict keys.'),
      t('dicts',       'Dictionaries',      'Key/value mappings.', codeBlock(`user = {"name": "Alex", "age": 22}\\nprint(user["name"])\\nuser["age"] = 23`), 'Use .get(key, default) for safe access.'),
      t('files',       'File Handling',     'Open, read, write text files.', codeBlock(`with open("data.txt", "w") as f:\\n    f.write("hello")\\n\\nwith open("data.txt") as f:\\n    print(f.read())`), 'Use the with statement so files close automatically.'),
      t('classes',     'OOP — Classes',     'Bundle data + behavior.', codeBlock(`class Dog:\\n    def __init__(self, name):\\n        self.name = name\\n    def bark(self):\\n        print(self.name, "says woof")\\n\\nDog("Rex").bark()`), '__init__ is the constructor; self refers to the instance.'),
      t('modules',     'Modules',           'Reuse code across files.', codeBlock(`import math\\nprint(math.sqrt(16))\\n\\nfrom datetime import date\\nprint(date.today())`), 'pip install <pkg> for third-party modules.'),
      t('exceptions',  'Exception Handling','Handle errors gracefully.', codeBlock(`try:\\n    n = int("abc")\\nexcept ValueError as e:\\n    print("Bad number:", e)\\nfinally:\\n    print("done")`), 'try/except/else/finally.'),
      t('mysql',       'MySQL Connection',  'Connect with mysql-connector-python.', codeBlock(`import mysql.connector\\nconn = mysql.connector.connect(\\n    host="localhost", user="root", password="", database="test")\\ncur = conn.cursor()\\ncur.execute("SELECT * FROM users")\\nfor row in cur.fetchall():\\n    print(row)\\nconn.close()`), 'Always close connections; use parameterised queries to avoid SQL injection.'),
      t('project',     'Mini Project: To-Do CLI','Tiny console todo list.', codeBlock(`todos = []\\nwhile True:\\n    cmd = input("add/list/quit: ")\\n    if cmd == "add":\\n        todos.append(input("task: "))\\n    elif cmd == "list":\\n        for t in todos:\\n            print("-", t)\\n    else:\\n        break`), 'Combines lists, loops, conditions and input().'),
    ],
    reference: [
      ['print()', 'Output'], ['len()', 'Length'], ['def fn():', 'Function'],
      ['for x in ...', 'Loop'], ['list / dict / tuple / set', 'Collections'], ['import', 'Module'],
    ],
  },
  java: {
    id: 'java', name: 'Java', tagline: 'A robust, object-oriented language',
    bg: '#ffd9c4', accent: '#f89820', text: '#1a1a1a', btnVariant: 'ms-btn-dark',
    topics: [
      t('introduction','Java Introduction','Class-based, OO, runs on the JVM.', codeBlock(`public class Hello {\\n  public static void main(String[] args) {\\n    System.out.println("Hello, MindSpark!");\\n  }\\n}`), 'Every program starts at public static void main.', ['eIrMbAQSU34','TlB_eWDSMt4','zb3Qk8SG5Ms']),
      t('syntax',      'Syntax',           'Statements end with ; blocks use {}.', codeBlock(`int n = 1;\\nif (n > 0) {\\n  System.out.println("positive");\\n}`), 'Java is case-sensitive and statically typed.'),
      t('variables',   'Variables',        'Typed declarations.', codeBlock(`int age = 22;\\nString name = "Alex";\\nSystem.out.println(name + " " + age);`), 'Primitive (int, double, boolean) vs reference types.'),
      t('data-types',  'Data Types',       'byte, short, int, long, float, double, boolean, char.', codeBlock(`long big = 10_000_000_000L;\\ndouble pi = 3.14;\\nchar c = 'A';\\nboolean ok = true;`), 'Use suffixes L for long, f for float.'),
      t('operators',   'Operators',        'Arithmetic, comparison, logical, bitwise.', codeBlock(`int a = 5, b = 2;\\nSystem.out.println(a/b + " " + a%b);`), 'Integer division truncates.'),
      t('conditions',  'Conditions',       'if / else if / else / switch.', codeBlock(`int x = 10;\\nif (x > 5) System.out.println("big");\\nelse System.out.println("small");`), 'Switch supports strings since Java 7.'),
      t('loops',       'Loops',            'for, while, do-while, for-each.', codeBlock(`for (int i = 0; i < 3; i++) System.out.println(i);\\n\\nint[] xs = {1,2,3};\\nfor (int x : xs) System.out.println(x);`), 'Use for-each for arrays/collections.'),
      t('functions',   'Methods',          'Reusable named blocks of code.', codeBlock(`public static int add(int a, int b) {\\n  return a + b;\\n}`), 'Method signature = name + parameter types.'),
      t('arrays',      'Arrays',           'Fixed-size collections.', codeBlock(`int[] nums = {1, 2, 3, 4};\\nfor (int n : nums) System.out.println(n);`), 'Use ArrayList for resizable lists.'),
      t('strings',     'Strings',          'Immutable text values.', codeBlock(`String s = "Hello";\\nSystem.out.println(s.length());\\nSystem.out.println(s.toUpperCase());`), 'Concatenate with + or use StringBuilder for many appends.'),
      t('classes',     'Classes & Objects','Blueprint for objects.', codeBlock(`class Car {\\n  String model;\\n  Car(String m) { model = m; }\\n}\\n\\nCar c = new Car("Tesla");`), 'Instances are created with new.'),
      t('inheritance', 'Inheritance',      'extends and super.', codeBlock(`class Animal { void speak(){ System.out.println("..."); } }\\nclass Dog extends Animal { void speak(){ System.out.println("woof"); } }`), 'A subclass overrides parent methods.'),
      t('interfaces',  'Interfaces',       'Contracts a class must implement.', codeBlock(`interface Shape { double area(); }\\nclass Square implements Shape { double s=2; public double area(){ return s*s; } }`), 'Since Java 8 interfaces can have default methods.'),
      t('exceptions',  'Exceptions',       'try / catch / finally.', codeBlock(`try {\\n  int x = Integer.parseInt("abc");\\n} catch (NumberFormatException e) {\\n  System.out.println("Bad input");\\n}`), 'Throw with: throw new RuntimeException("msg").'),
      t('collections', 'Collections',      'List, Set, Map and friends.', codeBlock(`import java.util.*;\\nList<String> xs = new ArrayList<>();\\nxs.add("a"); xs.add("b");\\nMap<String,Integer> m = new HashMap<>();\\nm.put("age", 22);`), 'Prefer the interface type on the left side.'),
      t('project',     'Mini Project: Calculator','Add/sub/mul/div via if-else.', codeBlock(`import java.util.Scanner;\\npublic class Calc {\\n  public static void main(String[] a){\\n    Scanner s = new Scanner(System.in);\\n    double x = s.nextDouble(), y = s.nextDouble();\\n    String op = s.next();\\n    switch (op) {\\n      case "+": System.out.println(x+y); break;\\n      case "-": System.out.println(x-y); break;\\n      case "*": System.out.println(x*y); break;\\n      case "/": System.out.println(x/y); break;\\n    }\\n  }\\n}`), 'Combines IO, conditions and switch.'),
    ],
    reference: [
      ['public class', 'Class declaration'], ['main()', 'Entry point'],
      ['int / double / String', 'Common types'], ['if / for / while', 'Control flow'],
      ['ArrayList', 'Resizable list'], ['try / catch', 'Exceptions'],
    ],
  },

  
  sql: {
    id: 'sql', name: 'SQL', tagline: 'The standard language for databases',
    bg: '#fce5d4', accent: '#e38c2a', text: '#1a1a1a', btnVariant: 'ms-btn-dark',
    topics: [
      t('introduction','SQL Introduction','Query and modify relational databases.', codeBlock(`SELECT * FROM users;`), 'SELECT reads rows; INSERT/UPDATE/DELETE modify them.', ['HXV3zeQKqGY','L72fhGm1tfE','G8uL0lFFoN0']),
      t('syntax',      'SQL Syntax',     'Keywords, identifiers and clauses.', codeBlock(`SELECT name, age\\nFROM users\\nWHERE age > 18\\nORDER BY name DESC\\nLIMIT 10;`), 'Keywords are case-insensitive; convention is UPPERCASE.'),
      t('select',      'SELECT',         'Read columns and rows.', codeBlock(`SELECT name, age FROM users WHERE age > 18 ORDER BY name;`), 'WHERE filters; ORDER BY sorts; LIMIT caps results.'),
      t('where',       'WHERE & Operators','Filter with =, <>, AND, OR, IN, LIKE.', codeBlock(`SELECT * FROM users\\nWHERE country = 'IN' AND (age BETWEEN 18 AND 30);`), 'Use parentheses to group AND/OR.'),
      t('insert',      'INSERT',         'Add new rows.', codeBlock(`INSERT INTO users (name, age) VALUES ('Sam', 25);`), 'Always list columns explicitly.'),
      t('update',      'UPDATE',         'Modify existing rows.', codeBlock(`UPDATE users SET age = 26 WHERE name = 'Sam';`), 'Always include WHERE — otherwise you update every row.'),
      t('delete',      'DELETE',         'Remove rows.', codeBlock(`DELETE FROM users WHERE id = 5;`), 'Same warning as UPDATE — WHERE is required in practice.'),
      t('joins',       'JOINs',          'Combine rows from multiple tables.', codeBlock(`SELECT u.name, o.total\\nFROM users u\\nINNER JOIN orders o ON o.user_id = u.id;`), 'INNER, LEFT, RIGHT, FULL OUTER.'),
      t('groupby',     'GROUP BY',       'Aggregate rows.', codeBlock(`SELECT country, COUNT(*) AS users\\nFROM users\\nGROUP BY country;`), 'Combine with HAVING to filter groups.'),
      t('aggregates',  'Aggregate Functions','COUNT, SUM, AVG, MIN, MAX.', codeBlock(`SELECT AVG(price) AS avg_price FROM products;`), 'Aggregates ignore NULLs.'),
      t('subqueries',  'Subqueries',     'Queries inside queries.', codeBlock(`SELECT name FROM users\\nWHERE id IN (SELECT user_id FROM orders WHERE total > 100);`), 'Subqueries can be in SELECT, FROM, WHERE.'),
      t('indexes',     'Indexes',        'Speed up reads.', codeBlock(`CREATE INDEX idx_users_email ON users(email);`), 'Indexes cost storage and slow writes; use sparingly.'),
      t('constraints', 'Constraints',    'PRIMARY KEY, FOREIGN KEY, UNIQUE, NOT NULL.', codeBlock(`CREATE TABLE orders (\\n  id INT PRIMARY KEY,\\n  user_id INT NOT NULL,\\n  FOREIGN KEY (user_id) REFERENCES users(id)\\n);`), 'Constraints protect data integrity.'),
      t('transactions','Transactions',   'BEGIN / COMMIT / ROLLBACK.', codeBlock(`BEGIN;\\nUPDATE accounts SET balance = balance - 100 WHERE id = 1;\\nUPDATE accounts SET balance = balance + 100 WHERE id = 2;\\nCOMMIT;`), 'All-or-nothing groups of statements.'),
      t('views',       'Views',          'Saved queries as virtual tables.', codeBlock(`CREATE VIEW active_users AS\\nSELECT * FROM users WHERE last_login > NOW() - INTERVAL '30 days';`), 'Use views to simplify complex queries.'),
      t('project',     'Mini Project: Mini Shop','Schema for users, products, orders.', codeBlock(`CREATE TABLE products (id INT PRIMARY KEY, name TEXT, price NUMERIC);\\nINSERT INTO products VALUES (1,'Pen',1.5),(2,'Book',9.9);\\nSELECT name FROM products WHERE price < 5;`), 'Practice CREATE, INSERT, SELECT together.'),
    ],
    reference: [
      ['SELECT','Read rows'],['INSERT','Add rows'],['UPDATE','Modify rows'],
      ['DELETE','Remove rows'],['JOIN','Combine tables'],['GROUP BY','Aggregate rows'],
    ],
  },

  php: {
    id: 'php', name: 'PHP', tagline: 'A server-side scripting language',
    bg: '#dcd6ff', accent: '#777BB4', text: '#1a1a1a', btnVariant: 'ms-btn-dark',
    topics: [
      t('introduction','PHP Introduction','Popular general-purpose scripting language for the web.', codeBlock(`<?php\\necho "Hello, MindSpark!";\\n?>`), 'PHP code lives between <?php and ?>.', ['OK_JCtrrv-c','f2EqECiTBL8','SccSCuHhOw0']),
      t('syntax',      'PHP Syntax',     'Statements end with ; variables start with $.', codeBlock(`<?php\\n$name = "Alex";\\necho "Hello $name";\\n?>`), 'Strings in double quotes interpolate variables.'),
      t('variables',   'Variables',      'Dynamically typed.', codeBlock(`<?php\\n$age = 22;\\n$pi = 3.14;\\n$ok = true;\\necho $age, $pi, $ok;\\n?>`), 'No type declaration needed.'),
      t('data-types',  'Data Types',     'string, int, float, bool, array, object, null.', codeBlock(`<?php\\nvar_dump(1, 1.5, "x", true, [1,2,3]);\\n?>`), 'var_dump prints type + value.'),
      t('operators',   'Operators',      'Arithmetic, comparison, logical, string (.).', codeBlock(`<?php\\necho "Hi " . "there";\\necho 5 == "5"; // true (loose)\\necho 5 === "5"; // false (strict)\\n?>`), 'Use === to compare type AND value.'),
      t('conditions',  'Conditions',     'if / elseif / else / switch.', codeBlock(`<?php\\n$x = 10;\\nif ($x > 5) echo "big";\\nelseif ($x == 5) echo "five";\\nelse echo "small";\\n?>`), 'switch ($x) { case 1: ... break; }'),
      t('loops',       'Loops',          'for, while, do-while, foreach.', codeBlock(`<?php\\nforeach (["a","b","c"] as $i => $v) {\\n  echo "$i:$v ";\\n}\\n?>`), 'foreach is the cleanest way to iterate arrays.'),
      t('functions',   'Functions',      'Reusable named blocks.', codeBlock(`<?php\\nfunction add($a, $b) { return $a + $b; }\\necho add(2, 3);\\n?>`), 'Default args: function f($x=1).'),
      t('arrays',      'Arrays',         'Indexed and associative.', codeBlock(`<?php\\n$user = ["name" => "Alex", "age" => 22];\\necho $user["name"];\\n?>`), 'Use => for key/value pairs.'),
      t('strings',     'Strings',        'Single vs double quotes; functions.', codeBlock(`<?php\\necho strtoupper("hi");\\necho strlen("hello");\\necho str_replace("a", "@", "banana");\\n?>`), 'Single quotes don\'t interpolate variables.'),
      t('forms',       'Forms',          'Handle $_POST and $_GET.', codeBlock(`<?php\\nif ($_SERVER["REQUEST_METHOD"] === "POST") {\\n  echo "Hello, " . htmlspecialchars($_POST["name"]);\\n}\\n?>`), 'Always sanitise input with htmlspecialchars().'),
      t('sessions',    'Sessions & Cookies','Persist data across requests.', codeBlock(`<?php\\nsession_start();\\n$_SESSION["user"] = "Alex";\\nsetcookie("theme", "dark", time()+3600);\\n?>`), 'session_start() must come before any output.'),
      t('files',       'File Handling',  'Read and write files.', codeBlock(`<?php\\nfile_put_contents("log.txt", "hi\\n", FILE_APPEND);\\n$data = file_get_contents("log.txt");\\necho $data;\\n?>`), 'file_put_contents/file_get_contents are quick helpers.'),
      t('mysql',       'MySQL Connection','Use PDO for safe queries.', codeBlock(`<?php\\n$pdo = new PDO("mysql:host=localhost;dbname=test", "root", "");\\n$stmt = $pdo->prepare("SELECT * FROM users WHERE id = ?");\\n$stmt->execute([5]);\\nprint_r($stmt->fetch());\\n?>`), 'Always use prepared statements.'),
      t('oop',         'OOP in PHP',     'Classes, properties, methods.', codeBlock(`<?php\\nclass Dog {\\n  public function __construct(public string $name) {}\\n  public function bark() { echo "$this->name: woof"; }\\n}\\n(new Dog("Rex"))->bark();\\n?>`), 'Constructor property promotion since PHP 8.'),
      t('project',     'Mini Project: Contact Form','Show + handle a contact form.', codeBlock(`<?php\\nif ($_SERVER["REQUEST_METHOD"] === "POST") {\\n  $name = htmlspecialchars($_POST["name"] ?? "");\\n  $msg  = htmlspecialchars($_POST["msg"] ?? "");\\n  echo "<p>Thanks $name! We got: $msg</p>";\\n  exit;\\n}\\n?>\\n<form method="post">\\n  <input name="name" placeholder="Name">\\n  <textarea name="msg"></textarea>\\n  <button>Send</button>\\n</form>`), 'Combines forms, conditions and string handling.'),
    ],
    reference: [
      ['<?php ?>', 'PHP tags'], ['echo / print', 'Output'], ['$variable', 'Variable'],
      ['$_POST / $_GET', 'Request data'], ['function', 'Define a function'], ['PDO', 'Database access'],
    ],
  },
  bootstrap: {
    id: 'bootstrap', name: 'Bootstrap', tagline: 'The world\'s most popular CSS framework',
    bg: '#e3d8ff', accent: '#7952b3', text: '#1a1a1a', btnVariant: 'ms-btn-dark',
    topics: [
      t('introduction','Bootstrap Introduction','Ready-made responsive components.', tryHTML(`<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"/><button class="btn btn-primary">Bootstrap button</button>`), 'Add the Bootstrap CSS link, then use utility classes.', ['O_9u1P5YjVc']),
      t('setup',       'Setup',           'Install via CDN or npm.', tryHTML(`<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"/><script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script><div class="alert alert-success">It works!</div>`), 'Add the JS bundle for interactive components.'),
      t('grid',        'Grid System',     '12-column responsive grid.', tryHTML(`<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"/><div class="container"><div class="row"><div class="col-md-6 bg-primary text-white p-3">Half</div><div class="col-md-6 bg-success text-white p-3">Half</div></div></div>`), 'container > row > col-* hierarchy.'),
      t('typography',  'Typography',      'h1-h6, lead, display, text utilities.', tryHTML(`<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"/><h1 class="display-4">Display 4</h1><p class="lead">Lead paragraph.</p>`), 'Use display-* for hero text.'),
      t('colors',      'Colors',          'text-* and bg-* utility classes.', tryHTML(`<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"/><p class="text-primary">Primary</p><p class="text-success">Success</p><div class="bg-warning p-2">Warning bg</div>`), 'Theme colors: primary, secondary, success, danger, warning, info.'),
      t('buttons',     'Buttons',         'Pre-styled button variants.', tryHTML(`<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"/><button class="btn btn-primary">Primary</button> <button class="btn btn-success">Success</button> <button class="btn btn-outline-danger">Danger</button>`), 'btn + variant. Add btn-sm / btn-lg for sizes.'),
      t('forms',       'Forms',           'Form controls + validation classes.', tryHTML(`<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"/><form><div class="mb-3"><label class="form-label">Email</label><input class="form-control" type="email"></div><button class="btn btn-primary">Submit</button></form>`), 'Use form-control on inputs and form-label on labels.'),
      t('cards',       'Cards',           'Flexible content containers.', tryHTML(`<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"/><div class="card" style="width:18rem"><div class="card-body"><h5 class="card-title">Card title</h5><p class="card-text">Some quick example text.</p><a class="btn btn-primary">Go</a></div></div>`), 'Combine card-header, card-body, card-footer.'),
      t('navbar',      'Navbar',          'Responsive top navigation.', tryHTML(`<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"/><nav class="navbar navbar-expand-md bg-light px-3"><a class="navbar-brand" href="#">Brand</a><div><a class="nav-link d-inline" href="#">Home</a><a class="nav-link d-inline" href="#">About</a></div></nav>`), 'Use navbar-toggler for the mobile hamburger.'),
      t('modals',      'Modals',          'Pop-up dialogs.', tryHTML(`<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"/><script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script><button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#m">Open</button><div id="m" class="modal fade"><div class="modal-dialog"><div class="modal-content"><div class="modal-body p-4">Hello!</div></div></div></div>`), 'Requires the JS bundle.'),
      t('alerts',      'Alerts & Badges', 'Inline messages and pills.', tryHTML(`<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"/><div class="alert alert-info">Heads up!</div><span class="badge bg-success">New</span>`), 'alert-* and badge bg-* utilities.'),
      t('utilities',   'Utility Classes', 'm-, p-, d-, gap-, text-* helpers.', tryHTML(`<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"/><div class="d-flex gap-2"><div class="p-2 bg-primary text-white">A</div><div class="p-2 bg-success text-white">B</div></div>`), 'm-3 = margin 1rem; p-2 = padding .5rem; etc.'),
      t('responsive',  'Responsive Helpers','d-none / d-md-block, col-md-*.', tryHTML(`<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"/><p class="d-md-none">Mobile only</p><p class="d-none d-md-block">Desktop only</p>`), 'Breakpoints: sm, md, lg, xl, xxl.'),
      t('icons',       'Icons',           'Bootstrap Icons via CDN.', tryHTML(`<link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.css" rel="stylesheet"/><i class="bi bi-heart-fill text-danger" style="font-size:24px"></i>`), 'Add the bootstrap-icons CSS, then use <i class="bi bi-*">.'),
      t('customizing', 'Customizing',     'Override CSS variables or recompile Sass.', tryHTML(`<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"/><style>:root{--bs-primary:#7B2FFF}.btn-primary{background:var(--bs-primary);border-color:var(--bs-primary)}</style><button class="btn btn-primary">Themed</button>`), 'Bootstrap 5 exposes CSS custom properties for easy theming.'),
      t('project',     'Mini Project: Landing Page','Combine navbar, hero, cards, footer.', tryHTML(`<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"/><nav class="navbar bg-dark text-white px-3"><span class="navbar-brand text-white">MindSpark</span></nav><section class="text-center p-5 bg-light"><h1 class="display-5">Learn faster</h1><a class="btn btn-primary mt-3">Start</a></section>`), 'Combines navbar, hero section and call-to-action button.'),
    ],
    reference: [
      ['container/row/col', 'Grid layout'], ['btn btn-primary', 'Buttons'], ['card', 'Cards'],
      ['navbar', 'Navigation bars'], ['modal', 'Dialogs'], ['d-flex / gap-*', 'Flex utilities'],
    ],
  },

  typescript: {
    id: 'typescript', name: 'TypeScript', tagline: 'JavaScript with type safety',
    bg: '#cfe1ff', accent: '#3178C6', text: '#0a1a30', btnVariant: 'ms-btn-dark',
    topics: [
      t('introduction','TypeScript Introduction','Strongly typed superset of JavaScript.', codeBlock(`let user: string = "Alex";\\nlet age: number = 22;\\nconsole.log(user, age);`), 'TypeScript compiles to plain JS.', ['BCg4U1FzODs','4sosXZsdy-s','rQryOSyfZX0']),
      t('setup',       'Setup',                'Install + tsconfig.', codeBlock(`npm i -D typescript\\nnpx tsc --init\\n// then: npx tsc`), 'tsconfig.json controls the compiler.'),
      t('types',       'Basic Types',          'string, number, boolean, array, tuple, enum.', codeBlock(`let names: string[] = ["A","B"];\\nlet pair: [string, number] = ["x", 1];\\nenum Role { Admin, User }`), 'Prefer specific types over any.'),
      t('any-unknown', 'any vs unknown',       'Escape hatches and safer alternatives.', codeBlock(`let a: any = 5;        // skips checks\\nlet u: unknown = 5;    // must narrow first\\nif (typeof u === "number") u + 1;`), 'Use unknown when you really do not know the type.'),
      t('functions',   'Functions',            'Typed parameters and return values.', codeBlock(`function add(a: number, b: number): number {\\n  return a + b;\\n}\\nconst sub = (a: number, b: number) => a - b;`), 'Optional params: a?: number. Defaults: a = 1.'),
      t('interfaces',  'Interfaces',           'Describe object shapes.', codeBlock(`interface User {\\n  id: number;\\n  name: string;\\n  email?: string;\\n}\\nconst u: User = { id: 1, name: "Alex" };`), '? marks optional properties; readonly locks them.'),
      t('types-vs-interfaces','Type Aliases',  'type vs interface.', codeBlock(`type ID = string | number;\\ntype Point = { x: number; y: number };\\ntype WithId<T> = T & { id: ID };`), 'Use interface for object shapes, type for unions/aliases.'),
      t('unions',      'Unions & Literals',    'A | B and "literal" types.', codeBlock(`type Direction = "up" | "down" | "left" | "right";\\nfunction move(d: Direction) { console.log(d); }\\nmove("up");`), 'Great for finite sets of values.'),
      t('generics',    'Generics',             'Reusable types and functions.', codeBlock(`function first<T>(arr: T[]): T | undefined {\\n  return arr[0];\\n}\\nfirst<number>([1,2,3]);`), 'Generic params (T) are filled in at the call site.'),
      t('classes',     'Classes',              'TypeScript adds access modifiers.', codeBlock(`class Dog {\\n  constructor(public name: string) {}\\n  bark() { console.log(this.name + ": woof"); }\\n}\\nnew Dog("Rex").bark();`), 'public/private/protected control visibility.'),
      t('enums',       'Enums',                'Named constants.', codeBlock(`enum Status { Open = "OPEN", Closed = "CLOSED" }\\nlet s: Status = Status.Open;`), 'Prefer string enums for clarity at runtime.'),
      t('narrowing',   'Type Narrowing',       'typeof, instanceof, in, type guards.', codeBlock(`function f(x: string | number) {\\n  if (typeof x === "string") return x.length;\\n  return x.toFixed(2);\\n}`), 'Inside the if-block TypeScript knows x is a string.'),
      t('utility',     'Utility Types',        'Partial, Required, Pick, Omit, Record.', codeBlock(`interface User { id: number; name: string; email: string }\\ntype Update = Partial<User>; // every field optional\\ntype Public = Omit<User, "email">;`), 'Reuse and reshape existing types.'),
      t('modules',     'Modules',              'import / export between files.', codeBlock(`// math.ts\\nexport function add(a: number, b: number) { return a + b }\\n\\n// app.ts\\nimport { add } from "./math";\\nadd(2, 3);`), 'Each .ts file is a module.'),
      t('with-react',  'TypeScript + React',   'Typed components and props.', codeBlock(`type Props = { name: string };\\nfunction Hi({ name }: Props) {\\n  return <h1>Hello {name}</h1>;\\n}`), 'Use FC<Props> or destructure props directly.'),
      t('project',     'Mini Project: Typed API','Fetch + typed response.', codeBlock(`interface Repo { id: number; name: string }\\nasync function load(): Promise<Repo[]> {\\n  const r = await fetch("https://api.github.com/users/microsoft/repos");\\n  return r.json();\\n}`), 'Combines async, generics and interfaces.'),
    ],
    reference: [
      [': type', 'Type annotation'], ['interface', 'Object shape'], ['type', 'Type alias'],
      ['enum', 'Named constants'], ['<T>', 'Generic parameter'], ['as Type', 'Type assertion'],
    ],
  },

  nodejs: {
    id: 'nodejs', name: 'Node.js', tagline: 'JavaScript on the server',
    bg: '#d8efd3', accent: '#3C873A', text: '#0a1a30', btnVariant: 'ms-btn-dark',
    topics: [
      t('introduction','Node.js Introduction','JavaScript runtime built on V8.', codeBlock(`// app.js\\nconsole.log("Hello from Node!");\\n// run with: node app.js`), 'Runs JS outside the browser, with modules for files, networking and more.', ['TlB_eWDSMt4','BwuLxPH6l_0','zQnBQ4tB3ZA']),
      t('install',     'Install & REPL', 'Install Node, then try the REPL.', codeBlock(`node --version\\nnode\\n> 1 + 2`), 'Use nvm or fnm to manage Node versions.'),
      t('modules',     'Modules',        'CommonJS (require) and ES modules (import).', codeBlock(`// CommonJS\\nconst fs = require("fs");\\n\\n// ESM (in package.json: "type":"module")\\nimport fs from "fs";`), 'Built-ins like fs/path/http need no install.'),
      t('npm',         'NPM Packages',   'Install and manage dependencies.', codeBlock(`npm init -y\\nnpm install express\\nnpm install --save-dev nodemon`), 'package.json tracks deps; --save-dev for dev-only tools.'),
      t('fs',          'File System',    'Read and write files.', codeBlock(`const fs = require("fs/promises");\\nasync function main() {\\n  await fs.writeFile("data.txt", "hello");\\n  console.log(await fs.readFile("data.txt", "utf8"));\\n}\\nmain();`), 'Prefer the promise-based fs/promises API.'),
      t('events',      'Events',         'EventEmitter-based architecture.', codeBlock(`const { EventEmitter } = require("events");\\nconst e = new EventEmitter();\\ne.on("hi", name => console.log("hi", name));\\ne.emit("hi", "Alex");`), 'Many Node APIs are EventEmitters.'),
      t('streams',     'Streams',        'Process data in chunks.', codeBlock(`const fs = require("fs");\\nfs.createReadStream("big.txt")\\n  .on("data", chunk => console.log("got", chunk.length))\\n  .on("end", () => console.log("done"));`), 'Streams keep memory low for large files.'),
      t('http',        'HTTP Server',    'Built-in http module.', codeBlock(`const http = require("http");\\nhttp.createServer((req, res) => {\\n  res.end("Hello");\\n}).listen(3000);`), 'Production apps usually use Express or Fastify on top.'),
      t('express',     'Express Framework','Most popular Node web framework.', codeBlock(`const express = require("express");\\nconst app = express();\\napp.get("/", (req, res) => res.send("Hi"));\\napp.listen(3000);`), 'Install with npm i express; define routes; listen.', ['L72fhGm1tfE','30LWjhZzg50','ydkT2Re0T_E']),
      t('routing',     'Express Routing','Verbs, params and middleware.', codeBlock(`app.get("/users/:id", (req, res) => {\\n  res.json({ id: req.params.id });\\n});`), ':id becomes req.params.id.'),
      t('middleware',  'Middleware',     'Functions that run during a request.', codeBlock(`app.use(express.json());\\napp.use((req, _res, next) => { console.log(req.url); next(); });`), 'Call next() to continue or send a response to stop.'),
      t('rest-api',    'Building a REST API','GET/POST/PUT/DELETE.', codeBlock(`app.post("/items", (req, res) => {\\n  const item = req.body;\\n  // store it...\\n  res.status(201).json(item);\\n});`), 'Use express.json() to parse JSON bodies.'),
      t('env',         'Environment Vars','process.env and dotenv.', codeBlock(`require("dotenv").config();\\nconsole.log(process.env.PORT);`), 'Never commit .env files.'),
      t('errors',      'Error Handling', 'Centralised error middleware.', codeBlock(`app.use((err, req, res, next) => {\\n  console.error(err);\\n  res.status(500).json({ error: err.message });\\n});`), 'Express recognises 4-arg middleware as error handlers.'),
      t('async',       'Async Patterns', 'callbacks → promises → async/await.', codeBlock(`app.get("/slow", async (req, res) => {\\n  const data = await fetch("https://api.github.com").then(r=>r.json());\\n  res.json(data);\\n});`), 'Always await — unhandled promise rejections crash Node.'),
      t('project',     'Mini Project: JSON API','Tiny in-memory items API.', codeBlock(`const express = require("express");\\nconst app = express();\\napp.use(express.json());\\nlet items = [];\\napp.get("/items", (_, r) => r.json(items));\\napp.post("/items", (req, r) => { items.push(req.body); r.status(201).json(req.body); });\\napp.listen(3000);`), 'Combines routing, middleware and JSON.'),
    ],
    reference: [
      ['require()', 'Load CommonJS module'], ['import', 'Load ES module'],
      ['fs', 'File system'], ['http / express', 'HTTP server'],
      ['process.env', 'Environment vars'], ['package.json', 'Project manifest'],
    ],
  },

  git: {
    id: 'git', name: 'Git', tagline: 'Distributed version control',
    bg: '#ffe0d4', accent: '#F05032', text: '#1a1a1a', btnVariant: 'ms-btn-dark',
    topics: [
      t('introduction','Git Introduction','Tracks changes to your code so you can collaborate.', codeBlock(`git init\\ngit add .\\ngit commit -m "first commit"`), 'A commit is a snapshot. Commits form a history graph.', ['HVsySz-h9r4','OK_JCtrrv-c','a7_WFUlFS94']),
      t('install',     'Install & Configure','Set your name + email.', codeBlock(`git config --global user.name "Alex"\\ngit config --global user.email "alex@example.com"`), 'These appear on every commit you make.'),
      t('init-clone',  'init / clone',    'Start a new repo or copy an existing one.', codeBlock(`git init my-app\\n# or\\ngit clone https://github.com/user/repo.git`), 'init creates .git in the current folder.'),
      t('add-commit',  'add & commit',    'Stage and snapshot changes.', codeBlock(`git add file.txt\\n# or stage everything:\\ngit add .\\ngit commit -m "describe the change"`), 'add chooses what goes into the next commit.'),
      t('status-log',  'status & log',    'See current state and history.', codeBlock(`git status\\ngit log --oneline --graph --decorate -20`), 'status = working tree; log = past commits.'),
      t('diff',        'diff',            'See what changed.', codeBlock(`git diff           # unstaged\\ngit diff --staged  # staged\\ngit diff main..feature`), 'Compare working dir, index or branches.'),
      t('branches',    'Branches',        'Work on features in isolation.', codeBlock(`git branch feature/login\\ngit checkout feature/login\\n# or:\\ngit switch -c feature/login`), 'Branches are cheap; create one per task.'),
      t('merge',       'Merge',           'Bring branches together.', codeBlock(`git checkout main\\ngit merge feature/login`), 'Fast-forward when possible; otherwise creates a merge commit.'),
      t('rebase',      'Rebase',          'Replay commits on top of another branch.', codeBlock(`git checkout feature/login\\ngit rebase main`), 'Keeps history linear; never rebase shared branches.'),
      t('conflicts',   'Merge Conflicts', 'Resolve conflicting changes.', codeBlock(`<<<<<<< HEAD\\nMy version\\n=======\\nTheir version\\n>>>>>>> feature`), 'Edit, then git add and git commit.'),
      t('remote',      'Remote & GitHub', 'Push to a remote repository.', codeBlock(`git remote add origin https://github.com/you/repo.git\\ngit push -u origin main\\ngit pull`), 'origin is the default remote name.'),
      t('stash',       'Stash',           'Park work-in-progress.', codeBlock(`git stash\\ngit stash pop`), 'Useful when you need to switch branches with uncommitted work.'),
      t('reset-revert','Reset & Revert',  'Undo changes safely.', codeBlock(`git revert <sha>     # safe — adds an inverse commit\\ngit reset --hard <sha> # rewrites history (dangerous)`), 'Prefer revert on shared branches.'),
      t('tags',        'Tags',            'Mark releases.', codeBlock(`git tag v1.0.0\\ngit push origin v1.0.0`), 'Lightweight or annotated (-a "msg").'),
      t('workflow',    'Pull-Request Workflow','Branch → push → PR → review → merge.', codeBlock(`git switch -c feature/x\\n# work...\\ngit push -u origin feature/x\\n# open a Pull Request on GitHub`), 'Code review before merging into main is the norm.'),
      t('project',     'Mini Project: First Repo','Initialise, commit, push.', codeBlock(`mkdir hello && cd hello\\ngit init\\necho "# Hello" > README.md\\ngit add . && git commit -m "init"\\n# create empty repo on GitHub, then:\\ngit remote add origin <url>\\ngit push -u origin main`), 'Practice the full local-to-remote loop.'),
    ],
    reference: [
      ['git init', 'Create repo'], ['git add', 'Stage changes'], ['git commit', 'Save snapshot'],
      ['git push', 'Send to remote'], ['git pull', 'Fetch + merge'], ['git branch', 'List/create branches'],
    ],
  },

  cpp: {
    id: 'cpp', name: 'C++', tagline: 'High-performance systems programming',
    bg: '#cfe0ef', accent: '#00599C', text: '#0a1a30', btnVariant: 'ms-btn-dark',
    topics: [
      t('introduction','C++ Introduction','Fast, statically-typed language used for systems and games.', codeBlock(`#include <iostream>\\nint main() {\\n  std::cout << "Hello, World!\\n";\\n  return 0;\\n}`), 'Programs start at main(); cout prints to stdout.', ['vLnPwxZdW4Y','HVsySz-h9r4','t0GlGExGMKQ']),
      t('syntax',      'Syntax',           'Statements end with ; blocks use {}.', codeBlock(`#include <iostream>\\nint main() {\\n  for (int i = 0; i < 3; i++)\\n    std::cout << i << "\\n";\\n}`), 'C++ is case-sensitive and statically typed.'),
      t('variables',   'Variables',        'Typed declarations.', codeBlock(`int age = 22;\\ndouble pi = 3.14;\\nstd::string name = "Alex";\\nbool ok = true;`), 'Always initialise; use const when value will not change.'),
      t('data-types',  'Data Types',       'int, double, char, bool, std::string.', codeBlock(`short s = 1; long long big = 1e10;\\nfloat f = 1.5f; double d = 1.5;\\nchar c = 'A';`), 'Fixed-width integers in <cstdint>: int32_t, int64_t.'),
      t('operators',   'Operators',        'Arithmetic, comparison, logical, bitwise.', codeBlock(`int a = 5, b = 2;\\nstd::cout << a/b << " " << a%b << " " << (a > b);`), 'Integer division truncates.'),
      t('conditions',  'Conditions',       'if / else if / else / switch.', codeBlock(`int x = 10;\\nif (x > 5) std::cout << "big";\\nelse std::cout << "small";`), 'switch needs break to avoid fall-through.'),
      t('loops',       'Loops',            'for, while, do-while, range-for.', codeBlock(`int xs[] = {1,2,3};\\nfor (int x : xs) std::cout << x << " ";`), 'Range-for is the cleanest way to iterate.'),
      t('functions',   'Functions',        'Reusable named code.', codeBlock(`int add(int a, int b) {\\n  return a + b;\\n}\\nint main(){ std::cout << add(2,3); }`), 'Declare prototypes in headers; define in .cpp.'),
      t('arrays',      'Arrays & Vectors', 'Fixed and resizable collections.', codeBlock(`#include <vector>\\nstd::vector<int> v {1,2,3};\\nv.push_back(4);`), 'Prefer std::vector to raw arrays.'),
      t('strings',     'Strings',          'std::string from <string>.', codeBlock(`#include <string>\\nstd::string s = "Hello";\\ns += ", world";\\nstd::cout << s.size();`), 'Use std::getline for reading whole lines.'),
      t('pointers',    'Pointers & References','Hold the address of another value.', codeBlock(`int x = 10;\\nint* p = &x;\\nint& r = x;\\nstd::cout << *p << " " << r;`), '& gets address; * dereferences. References are safer than pointers.'),
      t('classes',     'Classes & Objects','Bundle data and behavior.', codeBlock(`class Dog {\\npublic:\\n  std::string name;\\n  void bark() { std::cout << name << ": Woof!\\n"; }\\n};\\nint main(){ Dog d; d.name="Rex"; d.bark(); }`), 'public members are accessible outside the class.'),
      t('constructors','Constructor & Destructor','Initialise and clean up objects.', codeBlock(`class Buf {\\n  int* data;\\npublic:\\n  Buf(int n) { data = new int[n]; }\\n  ~Buf() { delete[] data; }\\n};`), 'Destructor (~Class) runs when an object goes out of scope.'),
      t('inheritance', 'Inheritance',      'Derive new classes from existing ones.', codeBlock(`class Animal { public: virtual void speak(){ std::cout<<"...\\n"; } };\\nclass Dog : public Animal { public: void speak() override { std::cout<<"woof\\n"; } };`), 'virtual + override enable runtime polymorphism.'),
      t('polymorphism','Polymorphism',     'Same call, different behaviour.', codeBlock(`Animal* a = new Dog();\\na->speak(); // "woof" thanks to virtual dispatch\\ndelete a;`), 'Always make base class destructors virtual.'),
      t('files',       'File Handling',    'fstream for input/output.', codeBlock(`#include <fstream>\\nstd::ofstream out("data.txt");\\nout << "hello\\n";\\nout.close();\\n\\nstd::ifstream in("data.txt");\\nstd::string line;\\nstd::getline(in, line);`), 'std::ofstream writes; std::ifstream reads.'),
      t('project',     'Mini Project: Number Guess','Console mini-game.', codeBlock(`#include <iostream>\\n#include <cstdlib>\\nint main() {\\n  int target = std::rand() % 100, guess;\\n  do {\\n    std::cout << "Guess: ";\\n    std::cin >> guess;\\n    std::cout << (guess < target ? "low\\n" : guess > target ? "high\\n" : "correct!\\n");\\n  } while (guess != target);\\n}`), 'Combines IO, conditions and loops.'),
    ],
    reference: [
      ['#include', 'Include header'], ['std::cout', 'Print output'], ['int main()', 'Entry point'],
      ['class', 'Define a class'], ['*  &', 'Pointer / reference'], ['nullptr', 'Null pointer literal'],
    ],
  },

  go: {
    id: 'go', name: 'Go', tagline: 'Simple, fast, concurrent',
    bg: '#cfeef5', accent: '#00ADD8', text: '#0a1a30', btnVariant: 'ms-btn-dark',
    topics: [
      t('introduction','Go Introduction','Statically typed, compiled language designed at Google.', codeBlock(`package main\\nimport "fmt"\\nfunc main() {\\n  fmt.Println("Hello, Go!")\\n}`), 'Every program has a main package and main() function.', ['YS4e4q9oBaU','vLnPwxZdW4Y','T9K3wFQ2Zgo']),
      t('setup',       'Setup',           'Install Go and run your first file.', codeBlock(`go version\\n# new module\\ngo mod init example.com/hello\\ngo run .`), 'Modules (go.mod) replaced GOPATH.'),
      t('syntax',      'Syntax',          'Semicolons inserted automatically; braces required.', codeBlock(`if x := 5; x > 0 {\\n  fmt.Println("positive")\\n}`), 'Compact `if v := …; cond {}` form is idiomatic.'),
      t('variables',   'Variables',       'var or short declaration :=', codeBlock(`var name string = "Alex"\\nage := 22 // type inferred\\nconst Pi = 3.14159`), 'Declared but unused variables are compile errors.'),
      t('data-types',  'Data Types',      'int, float64, string, bool, plus composites.', codeBlock(`var n int = 1\\nvar f float64 = 2.5\\nvar s string = "hi"\\nvar b bool = true`), 'Use rune for a single Unicode code point.'),
      t('operators',   'Operators',       'Arithmetic, comparison, logical.', codeBlock(`a, b := 5, 2\\nfmt.Println(a/b, a%b, a > b)`), 'No ++ as expression — only as a statement.'),
      t('conditions',  'Conditions',      'if / else / switch.', codeBlock(`switch day := "Mon"; day {\\ncase "Mon": fmt.Println("start")\\ndefault: fmt.Println("other")\\n}`), 'No break needed; cases do not fall through by default.'),
      t('loops',       'Loops',           'Only for — but it has many shapes.', codeBlock(`for i := 0; i < 3; i++ { fmt.Println(i) }\\nfor _, v := range []int{1,2,3} { fmt.Println(v) }`), '`for {}` runs forever; `for cond {}` is a while loop.'),
      t('functions',   'Functions',       'Multiple return values are common.', codeBlock(`func divmod(a, b int) (int, int) {\\n  return a/b, a%b\\n}\\nq, r := divmod(7, 2)`), 'Return error as the last value: `(T, error)`.'),
      t('arrays-slices','Arrays & Slices','Fixed arrays vs dynamic slices.', codeBlock(`xs := []int{1,2,3}\\nxs = append(xs, 4)\\nfmt.Println(xs[1:3])`), 'Use slices in nearly all everyday code.'),
      t('maps',        'Maps',            'Key/value collections.', codeBlock(`m := map[string]int{"age": 22}\\nm["score"] = 99\\nv, ok := m["age"]\\nfmt.Println(v, ok)`), 'The `, ok` form tells you if the key existed.'),
      t('structs',     'Structs',         'Group related fields.', codeBlock(`type User struct { Name string; Age int }\\nu := User{Name: "Alex", Age: 22}\\nfmt.Println(u.Name)`), 'Capitalised fields/methods are exported (public).'),
      t('interfaces',  'Interfaces',      'Implicit, duck-typed contracts.', codeBlock(`type Greeter interface { Greet() string }\\ntype EN struct{}\\nfunc (EN) Greet() string { return "Hi" }\\nvar g Greeter = EN{}\\nfmt.Println(g.Greet())`), 'A type satisfies an interface just by having the methods.'),
      t('errors',      'Errors',          'Errors are values, not exceptions.', codeBlock(`import "errors"\\nfunc div(a, b int) (int, error) {\\n  if b == 0 { return 0, errors.New("div by zero") }\\n  return a / b, nil\\n}`), 'Always check `if err != nil`.'),
      t('goroutines',  'Goroutines & Channels','Lightweight concurrency.', codeBlock(`ch := make(chan int)\\ngo func(){ ch <- 42 }()\\nfmt.Println(<-ch)`), '`go` starts a goroutine; channels carry values between them.'),
      t('http',        'HTTP server',     'Built-in net/http package.', codeBlock(`http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {\\n  fmt.Fprintln(w, "hi")\\n})\\nhttp.ListenAndServe(":8080", nil)`), 'No framework needed for simple servers.'),
      t('project',     'Mini Project: Word Counter','Count words from input.', codeBlock(`package main\\nimport (\\n  "bufio"\\n  "fmt"\\n  "os"\\n  "strings"\\n)\\nfunc main() {\\n  s := bufio.NewScanner(os.Stdin)\\n  count := map[string]int{}\\n  for s.Scan() {\\n    for _, w := range strings.Fields(s.Text()) {\\n      count[w]++\\n    }\\n  }\\n  for w, n := range count {\\n    fmt.Printf("%s: %d\\n", w, n)\\n  }\\n}`), 'Combines IO, slices, maps and loops.'),
    ],
    reference: [
      ['package', 'Module name'], ['func', 'Define a function'], [':=', 'Short variable declaration'],
      ['go', 'Start a goroutine'], ['chan', 'Channel type'], ['interface', 'Implicit contract'],
    ],
  },

  vue: {
    id: 'vue', name: 'Vue.js', tagline: 'The progressive JavaScript framework',
    bg: '#d4f1e4', accent: '#42b883', text: '#0a1a30', btnVariant: 'ms-btn-dark',
    topics: [
      t('introduction','Vue Introduction','Vue is a progressive framework for building user interfaces.', tryHTML(`<div id="app"></div><script src="https://unpkg.com/vue@3/dist/vue.global.js"></script><script>const{createApp,ref}=Vue;createApp({setup(){const msg=ref("Hello Vue 3!");return{msg}}}).mount("#app");</script><template id="t">{{ msg }}</template>`), 'Vue apps mount on a DOM element and react to data changes.', ['FXpIoQ_rT_c','1GNsWa_EZdw','qZXt1Aom3Cs']),
      t('template-syntax','Template Syntax','Bind data with {{ }}, directives with v-.', tryHTML(`<div id="app"><p>{{ greeting }}</p></div><script src="https://unpkg.com/vue@3/dist/vue.global.js"></script><script>Vue.createApp({data(){return{greeting:"Hi from Vue!"}}} ).mount("#app");</script>`), 'Mustaches {{ }} interpolate text; v-bind and v-on handle attributes and events.'),
      t('data-binding','Two-way Binding','v-model syncs input and data.', tryHTML(`<div id="app"><input v-model="name"><p>Hello {{ name }}!</p></div><script src="https://unpkg.com/vue@3/dist/vue.global.js"></script><script>Vue.createApp({data(){return{name:"World"}}}).mount("#app");</script>`), 'v-model is shorthand for :value + @input.'),
      t('directives','Directives','v-if, v-else, v-for, v-show, v-on, v-bind.', tryHTML(`<div id="app"><ul><li v-for="(f,i) in fruits" :key="i">{{f}}</li></ul></div><script src="https://unpkg.com/vue@3/dist/vue.global.js"></script><script>Vue.createApp({data(){return{fruits:["Apple","Banana","Cherry"]}}}).mount("#app");</script>`), 'Directives are special attributes prefixed with v-.'),
      t('events','Event Handling','@click, @input, @submit.', tryHTML(`<div id="app"><button @click="count++">Clicked {{ count }} times</button></div><script src="https://unpkg.com/vue@3/dist/vue.global.js"></script><script>Vue.createApp({data(){return{count:0}}}).mount("#app");</script>`), '@event is shorthand for v-on:event.'),
      t('computed','Computed Properties','Derived reactive data.', tryHTML(`<div id="app"><p>{{ reversed }}</p></div><script src="https://unpkg.com/vue@3/dist/vue.global.js"></script><script>Vue.createApp({data(){return{msg:"MindSpark"}},computed:{reversed(){return this.msg.split("").reverse().join("")}}}).mount("#app");</script>`), 'Computed props are cached and update only when dependencies change.'),
      t('components','Components','Reusable building blocks.', tryHTML(`<p>Components: &lt;MyButton&gt;, &lt;Header&gt;, etc. Each owns template, script, style.</p>`), 'Single File Components (.vue) combine template, script, style.'),
      t('props','Props','Pass data into child components.', tryHTML(`<p>defineProps({ title: String, count: Number }) in &lt;script setup&gt;.</p>`), 'Props flow down; events flow up (emit).'),
      t('emits','Emits & Events','Child-to-parent communication.', tryHTML(`<p>defineEmits(["update"]) then emit("update", value) to notify parent.</p>`), 'Use emits for all child-to-parent communication.'),
      t('lifecycle','Lifecycle Hooks','onMounted, onUpdated, onUnmounted.', tryHTML(`<p>onMounted(()=>{/* fetch data */})  onUnmounted(()=>{/* cleanup */})</p>`), 'Composition API hooks replace Options API beforeMount/mounted etc.'),
      t('composables','Composables','Reusable logic with Composition API.', tryHTML(`<p>function useCounter(){const n=ref(0); const inc=()=>n.value++; return {n,inc}}</p>`), 'Extract stateful logic into composable functions starting with "use".'),
      t('watchers','Watchers','React to data changes with watch/watchEffect.', tryHTML(`<p>watch(()=>count.value, newVal=>console.log(newVal))</p>`), 'watchEffect auto-tracks dependencies; watch lets you specify them.'),
      t('routing','Vue Router','Single-page routing.', tryHTML(`<p>createRouter + createWebHistory + route definitions + &lt;RouterView&gt; + &lt;RouterLink&gt;.</p>`), 'Install via npm: vue-router. Define routes as an array of { path, component }.'),
      t('state','Pinia State','Official state management.', tryHTML(`<p>defineStore("counter", ()=>{ const n=ref(0); return {n} })</p>`), 'Pinia replaces Vuex. Stores are composables created with defineStore.'),
      t('transitions','Transitions','Animate entering/leaving elements.', tryHTML(`<div id="app"><button @click="show=!show">Toggle</button><transition name="fade"><p v-if="show">Hello!</p></transition></div><style>.fade-enter-active,.fade-leave-active{transition:opacity .4s}.fade-enter-from,.fade-leave-to{opacity:0}</style><script src="https://unpkg.com/vue@3/dist/vue.global.js"></script><script>Vue.createApp({data(){return{show:true}}}).mount("#app");</script>`), 'Wrap with <Transition name="x"> and define .x-enter-active CSS.'),
      t('project','Mini Project: Task Manager','Combine reactivity, v-for, v-model, v-if.', tryHTML(`<div id="app"><input v-model="task" @keyup.enter="add" placeholder="Add task"><ul><li v-for="(t,i) in tasks" :key="i" @click="remove(i)" style="cursor:pointer">{{ t }}</li></ul></div><script src="https://unpkg.com/vue@3/dist/vue.global.js"></script><script>Vue.createApp({data(){return{task:"",tasks:[]}},methods:{add(){if(this.task.trim())this.tasks.push(this.task.trim());this.task=""},remove(i){this.tasks.splice(i,1)}}}).mount("#app");</script>`), 'A real Vue 3 mini-app combining key concepts.'),
    ],
    reference: [
      ['v-model','Two-way bind'],['v-for','Render list'],['v-if / v-show','Conditional'],
      ['@click','Event listener'],['computed','Derived data'],['ref / reactive','Reactive state'],
    ],
  },

  ruby: {
    id: 'ruby', name: 'Ruby', tagline: 'A language designed for programmer happiness',
    bg: '#fde8e8', accent: '#CC342D', text: '#1a0a0a', btnVariant: 'ms-btn-dark',
    topics: [
      t('introduction','Ruby Introduction','Ruby is a dynamic, expressive programming language.', codeBlock(`puts "Hello, MindSpark!"`), 'Ruby prioritises readability and developer joy.', ['t_ispmWmdjY','3dHNOWTI7H8','0eBogrZgt8Y']),
      t('syntax','Syntax','No semicolons; blocks with do..end or {}.', codeBlock(`3.times { puts "Hello!" }`), 'Code reads almost like English.'),
      t('variables','Variables','Local, instance, class, global.', codeBlock(`name = "Alex"     # local
@age = 22         # instance
@@count = 0       # class
$debug = false    # global`), 'Naming conventions carry semantic meaning.'),
      t('data-types','Data Types','Strings, Integers, Floats, Symbols, Arrays, Hashes.', codeBlock(`puts 1.class          # Integer
puts "hi".class       # String
puts :role.class      # Symbol
puts [1,2].class      # Array`), 'Everything in Ruby is an object.'),
      t('strings','Strings','Rich built-in string methods.', codeBlock(`s = "hello"
puts s.upcase
puts s.reverse
puts s.include?("ell")
puts "Hi #{s.capitalize}!"`), 'Interpolation uses #{expr} inside double-quoted strings.'),
      t('arrays','Arrays','Ordered collections with powerful methods.', codeBlock(`fruits = ["apple", "banana", "cherry"]
puts fruits.map { |f| f.upcase }.inspect
puts fruits.select { |f| f.length > 5 }.inspect`), 'map, select, reject, reduce, each — all chainable.'),
      t('hashes','Hashes','Key/value pairs.', codeBlock(`user = { name: "Ada", age: 36 }
puts user[:name]
user.each { |k, v| puts "#{k}: #{v}" }`), 'Symbol keys are conventional in modern Ruby.'),
      t('conditions','Conditions','if, elsif, else, unless, case.', codeBlock(`score = 85
case score
when 90..100 then puts "A"
when 80..89  then puts "B"
else              puts "C"
end`), 'unless is the opposite of if.'),
      t('loops','Loops','each, times, upto, while, loop.', codeBlock(`5.times { |i| print "#{i} " }
1.upto(5) { |i| print "#{i} " }
[10,20].each { |n| puts n }`), 'Prefer iterators over raw while loops.'),
      t('methods','Methods','Defined with def; implicit return.', codeBlock(`def greet(name = "World")
  "Hello, #{name}!"
end
puts greet("Ada")`), 'Last evaluated expression is returned automatically.'),
      t('blocks','Blocks, Procs & Lambdas','Anonymous code chunks.', codeBlock(`double = ->(n) { n * 2 }
puts double.call(5)
puts [1,2,3].map(&double).inspect`), 'Blocks power iterators; lambdas are reusable callable objects.'),
      t('classes','Classes & OOP','Encapsulation with class.', codeBlock(`class Dog
  def initialize(name)
    @name = name
  end
  def bark = "#{@name} says woof"
end
puts Dog.new("Rex").bark`), 'attr_reader / attr_writer / attr_accessor generate getters/setters.'),
      t('modules','Modules & Mixins','Share behaviour across classes.', codeBlock(`module Greetable
  def greet = "Hi, I'm #{name}"
end
class Person
  include Greetable
  attr_reader :name
  def initialize(n) = @name = n
end
puts Person.new("Ada").greet`), 'include mixes in instance methods; extend mixes in class methods.'),
      t('exceptions','Exceptions','begin / rescue / ensure.', codeBlock(`begin
  n = Integer("abc")
rescue ArgumentError => e
  puts "Error: #{e.message}"
ensure
  puts "done"
end`), 'raise creates exceptions; rescue catches them.'),
      t('file-io','File I/O','Read and write files.', codeBlock(`File.write("notes.txt", "hello")
content = File.read("notes.txt")
puts content`), 'Use File.foreach for large files to avoid loading all into memory.'),
      t('project','Mini Project: Word Frequency','Count word frequency in text.', codeBlock(`text = "the cat sat on the mat the cat"
freq = Hash.new(0)
text.split.each { |w| freq[w] += 1 }
freq.sort_by { |_, v| -v }.each { |w, n| puts "#{w}: #{n}" }`), 'Combines strings, arrays, hashes and blocks in one program.'),
    ],
    reference: [
      ['puts / print','Output'],['def','Define method'],['each / map','Iterators'],
      ['.class / .is_a?','Type checking'],['attr_accessor','Auto getter/setter'],['begin/rescue','Error handling'],
    ],
  },

  
  kotlin: {
    id: 'kotlin', name: 'Kotlin', tagline: 'Modern language for Android and beyond',
    bg: '#ede8ff', accent: '#7F52FF', text: '#1a0a2e', btnVariant: 'ms-btn-dark',
    topics: [
      t('introduction','Kotlin Introduction','Kotlin is a concise, safe, JVM language used for Android.', codeBlock(`fun main() {
    println("Hello, MindSpark!")
}`), 'Kotlin is 100% interoperable with Java.', ['H_oGi8uuDpA','t_ispmWmdjY','htPYB9-tKho']),
      t('variables','Variables','val (immutable) and var (mutable).', codeBlock(`val name = "Ada"   // immutable
var age  = 22      // mutable
println("$name is $age")`), 'Prefer val over var — immutability is idiomatic Kotlin.'),
      t('data-types','Data Types','Int, Double, String, Boolean, Char, Long.', codeBlock(`val n: Int = 42
val f: Double = 3.14
val s: String = "hi"
val b: Boolean = true`), 'Type inference works most of the time — annotations are optional.'),
      t('strings','Strings','String templates and multiline strings.', codeBlock(`val name = "Alex"
println("Hello, $name!")
println("1 + 1 = \${1 + 1}")
val block = """
  multiline
  string
""".trimIndent()`), 'String templates use $ or ${expr}.'),
      t('conditions','Conditions','if, when (replaces switch).', codeBlock(`val x = 5
val label = when {
    x > 10  -> "big"
    x == 5  -> "five"
    else    -> "small"
}
println(label)`), 'when is an expression — it returns a value.'),
      t('loops','Loops','for, while, do-while with ranges.', codeBlock(`for (i in 1..5) print("$i ")
(1..3).forEach { println(it) }`), '1..5 is inclusive; 1 until 5 is exclusive.'),
      t('functions','Functions','First-class with default and named params.', codeBlock(`fun add(a: Int, b: Int = 0) = a + b
println(add(3))
println(add(b = 4, a = 1))`), 'Single-expression functions use = instead of {}.'),
      t('null-safety','Null Safety','Kotlin eliminates NullPointerExceptions.', codeBlock(`var s: String? = null
println(s?.length)   // null-safe
println(s ?: "empty") // Elvis operator`), '? marks nullable types; !! asserts non-null (use sparingly).'),
      t('classes','Classes & Data Classes','Concise OOP.', codeBlock(`data class User(val name: String, val age: Int)
val u = User("Ada", 36)
println(u)
println(u.copy(age = 37))`), 'data class auto-generates equals, hashCode, toString, copy.'),
      t('collections','Collections','List, Set, Map — mutable and immutable.', codeBlock(`val nums = listOf(1, 2, 3)
println(nums.filter { it > 1 })
println(nums.map { it * 2 })`), 'Use listOf / mapOf for read-only; mutableListOf / mutableMapOf to edit.'),
      t('lambdas','Lambdas & Higher-Order Functions','Functional programming idioms.', codeBlock(`val double: (Int) -> Int = { n -> n * 2 }
println(listOf(1,2,3).map(double))`), 'Trailing lambda syntax: fn(x) { block }.'),
      t('extensions','Extension Functions','Add methods to existing types.', codeBlock(`fun String.shout() = uppercase() + "!"
println("hello".shout())`), 'Extensions do not modify the original class.'),
      t('coroutines','Coroutines','Lightweight async/await.', codeBlock(`// Add to build.gradle:
// implementation "org.jetbrains.kotlinx:kotlinx-coroutines-core:1.8.0"
import kotlinx.coroutines.*
fun main() = runBlocking {
    val job = launch { delay(1000); println("world") }
    println("hello")
    job.join()
}`), 'suspend functions can be paused without blocking threads.'),
      t('interfaces','Interfaces & Sealed Classes','Contracts and exhaustive hierarchies.', codeBlock(`sealed class Result
class Success(val data: String): Result()
class Failure(val error: String): Result()

fun handle(r: Result) = when(r) {
    is Success -> println(r.data)
    is Failure -> println(r.error)
}`), 'Sealed classes make when exhaustive — no else needed.'),
      t('android','Android Basics','Activity, Fragment, Jetpack Compose overview.', codeBlock(`// setContent { Greeting("Android") }
@Composable
fun Greeting(name: String) {
    Text("Hello $name!")
}`), 'Jetpack Compose uses composable functions instead of XML layouts.'),
      t('project','Mini Project: Student Grade Calculator','Combine collections, data classes, when.', codeBlock(`data class Student(val name: String, val score: Int)
fun grade(s: Int) = when { s >= 90 -> "A"; s >= 80 -> "B"; else -> "C" }
val students = listOf(Student("Ada",92), Student("Bob",78))
students.forEach { println("\${it.name}: \${grade(it.score)}") }`), 'Brings together data classes, collections and when expressions.'),
    ],
    reference: [
      ['val / var','Immutable / mutable'],['fun','Define function'],['?: (Elvis)','Null default'],
      ['data class','Auto equals/copy'],['when','Pattern match'],['?.','Null-safe call'],
    ],
  },

};


export const COURSE_LIST = Object.values(COURSES);

export const SEARCH_INDEX = COURSE_LIST.flatMap(c => [
  {
    path: `/course/${c.id}`,
    label: `${c.name} Tutorial`,
    sub: c.tagline,
    type: 'course',
  },
  ...c.topics.map(t => ({
    path: `/course/${c.id}#${t.id}`,
    label: `${c.name} — ${t.title}`,
    sub: t.intro,
    type: 'topic',
  })),
]);
