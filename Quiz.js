import { useEffect, useState, useCallback } from 'react';
import { COURSE_LIST } from '../data/courses';
import { QUIZZES } from '../data/quizzes';
import { useProgress } from '../context/ProgressContext';
import { useToast } from '../context/ToastContext';

export default function Quiz() {
  const [lang, setLang] = useState('html');
  const [started, setStarted] = useState(false);
  const [i, setI] = useState(0);
  const [score, setScore] = useState(0);
  const [picked, setPicked] = useState(null);
  const [time, setTime] = useState(20);
  const { addXP } = useProgress();
  const { toast } = useToast();
  const questions = QUIZZES[lang] || [];

  const next = useCallback((wasCorrect) => {
    if (i + 1 >= questions.length) {
      const xp = score * 5 + (wasCorrect ? 5 : 0);
      addXP(xp);
      toast(`Quiz finished! +${xp} XP`);
      setStarted(false);
      return;
    }
    setI(x => x + 1);
    setPicked(null);
    setTime(20);
  }, [i, questions.length, score, addXP, toast]);

  useEffect(() => {
    if (!started || picked !== null) return;
    if (time <= 0) { next(false); return; }
    const id = setTimeout(() => setTime(t => t - 1), 1000);
    return () => clearTimeout(id);
  }, [started, time, picked, next]);

  function start() { setStarted(true); setI(0); setScore(0); setPicked(null); setTime(20); }

  function pick(idx) {
    if (picked !== null) return;
    const correct = idx === questions[i].correct;
    setPicked(idx);
    if (correct) setScore(s => s + 1);
    setTimeout(() => next(correct), 900);
  }

  if (!started) {
    return (
      <div className="ms-container ms-section ms-quiz-stage">
        <div className="ms-quiz-neon">
          <div className="ms-quiz-neon-glow" aria-hidden />
          <h2 className="ms-quiz-neon-title">Take a Quiz</h2>
          <p className="ms-quiz-neon-sub">Pick a language and prove what you've learned.</p>

          <label className="ms-quiz-neon-field">
            <span>Language</span>
            <select className="ms-select" value={lang} onChange={e => setLang(e.target.value)} aria-label="Pick a quiz language">
              {COURSE_LIST.filter(c => QUIZZES[c.id]).map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </label>

          <button className="ms-btn-neon" onClick={start}>
            ▶ Start Quiz · {questions.length} questions
          </button>

          {score > 0 && (
            <p className="ms-quiz-neon-last">Last score: <strong>{score}/{questions.length}</strong></p>
          )}
        </div>
      </div>
    );
  }

  const q = questions[i];
  return (
    <div className="ms-container ms-section ms-quiz-stage">
      <div className="ms-quiz-neon ms-quiz-neon-play">
        <div className="ms-quiz-neon-glow" aria-hidden />
        <div className="ms-quiz-head">
          <span>Question {i + 1} / {questions.length}</span>
          <span className="ms-quiz-timer" aria-live="polite">⏱ {time}s</span>
        </div>
        <div className="ms-progress" role="progressbar" aria-valuenow={i + 1} aria-valuemin={1} aria-valuemax={questions.length}>
          <div className="ms-progress-bar" style={{ width: `${((i + 1) / questions.length) * 100}%` }} />
        </div>
        <div className="ms-quiz-q">{q.q}</div>
        <div className="ms-quiz-options">
          {q.opts.map((opt, idx) => {
            let cls = 'ms-quiz-opt';
            if (picked !== null) {
              if (idx === q.correct) cls += ' correct';
              else if (idx === picked) cls += ' wrong';
            }
            return <button key={idx} className={cls} onClick={() => pick(idx)}>{opt}</button>;
          })}
        </div>
        <p className="ms-quiz-neon-score">Score: {score}</p>
      </div>
    </div>
  );
}
