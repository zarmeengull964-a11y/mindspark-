
export const QUIZZES = {
  html: [
    { q: 'Which tag creates a hyperlink?', opts: ['<link>', '<a>', '<href>', '<url>'], correct: 1 },
    { q: 'Which is the largest heading?', opts: ['<h6>', '<head>', '<h1>', '<heading>'], correct: 2 },
    { q: 'Which attribute provides alt text for images?', opts: ['title', 'alt', 'desc', 'caption'], correct: 1 },
    { q: 'What does HTML stand for?', opts: ['Hyper Trainer Markup Language', 'Hyper Text Markup Language', 'Hyper Tool Multi Language', 'Home Tool Markup Language'], correct: 1 },
    { q: 'Which tag defines a list item?', opts: ['<li>', '<ul>', '<ol>', '<list>'], correct: 0 },
  ],
  css: [
    { q: 'How do you make text bold in CSS?', opts: ['font-weight: bold', 'text-style: bold', 'font: bold', 'bold: true'], correct: 0 },
    { q: 'Which property changes the text color?', opts: ['text-color', 'fgcolor', 'color', 'font-color'], correct: 2 },
    { q: 'Which display value enables flexbox?', opts: ['inline', 'flex', 'block', 'flexbox'], correct: 1 },
    { q: 'Selector to target an id "hero"?', opts: ['.hero', '#hero', 'hero', '*hero'], correct: 1 },
    { q: 'Unit relative to root font size?', opts: ['em', 'px', 'rem', '%'], correct: 2 },
  ],
  javascript: [
    { q: 'Which keyword declares a constant?', opts: ['var', 'let', 'const', 'static'], correct: 2 },
    { q: 'How do you write a comment?', opts: ['<!-- comment -->', '// comment', '# comment', '** comment **'], correct: 1 },
    { q: 'What does typeof null return?', opts: ['"null"', '"object"', '"undefined"', '"none"'], correct: 1 },
    { q: 'Which method adds an item to the end of an array?', opts: ['push()', 'append()', 'add()', 'insert()'], correct: 0 },
    { q: 'Which is NOT a JS data type?', opts: ['Number', 'Boolean', 'Float', 'String'], correct: 2 },
  ],
  python: [
    { q: 'Which prints output?', opts: ['echo()', 'print()', 'console.log()', 'puts()'], correct: 1 },
    { q: 'Which creates a list?', opts: ['{}', '[]', '()', '<>'], correct: 1 },
    { q: 'Symbol for comments?', opts: ['//', '#', '--', '/*'], correct: 1 },
    { q: 'Boolean values are?', opts: ['true / false', 'True / False', 'TRUE / FALSE', '1 / 0'], correct: 1 },
  ],
  java: [
    { q: 'Java entry point?', opts: ['start()', 'main()', 'run()', 'init()'], correct: 1 },
    { q: 'Which type stores whole numbers?', opts: ['int', 'string', 'char', 'float'], correct: 0 },
    { q: 'Keyword to create object?', opts: ['create', 'new', 'instance', 'init'], correct: 1 },
  ],
  sql: [
    { q: 'Which selects all columns?', opts: ['SELECT ALL', 'SELECT *', 'GET *', 'FETCH *'], correct: 1 },
    { q: 'Which removes rows?', opts: ['REMOVE', 'DROP', 'DELETE', 'CLEAR'], correct: 2 },
    { q: 'Filter clause?', opts: ['IF', 'WHERE', 'HAVING', 'FILTER'], correct: 1 },
  ],
  react: [
    { q: 'Hook for state?', opts: ['useState', 'useEffect', 'useRef', 'useMemo'], correct: 0 },
    { q: 'Hook for side effects?', opts: ['useState', 'useEffect', 'useReducer', 'useContext'], correct: 1 },
    { q: 'JSX must return?', opts: ['Multiple roots', 'A single root element', 'Just a string', 'A function'], correct: 1 },
  ],
  jquery: [
    { q: 'jQuery selector?', opts: ['#()', '$()', '@()', '!()'], correct: 1 },
    { q: 'Method to set HTML content?', opts: ['.html()', '.content()', '.innerHTML()', '.set()'], correct: 0 },
  ],
  php: [
    { q: 'PHP variables start with?', opts: ['#', '@', '$', '%'], correct: 2 },
    { q: 'Which echoes text?', opts: ['print()', 'echo', 'output', 'puts'], correct: 1 },
  ],
  bootstrap: [
    { q: 'How many columns in the grid?', opts: ['10', '12', '16', '24'], correct: 1 },
    { q: 'Class for primary button?', opts: ['btn-main', 'btn-primary', 'button-primary', 'btn-blue'], correct: 1 },
  ],
};
