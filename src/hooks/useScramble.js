/* -----------------------------------------------------------
   useScramble — canonical decode/scramble animation.

   Algorithm (Justin Windle pattern, refined):
   • Each char gets a random `from-frame` and `to-frame` window
   • Before to-frame: character is a random glyph from pool,
     re-rolled every ~few frames for visual churn
   • At/after to-frame: character is locked to final value
   • Runs on rAF (not setInterval) for butter-smooth timing
   • Returns { ref, play, scrambling } — trigger via `play()`

   Usage:
     const { ref, play } = useScramble('Encrypted');
     useEffect(() => { play(); }, []);
     return <span ref={ref} />;
   ----------------------------------------------------------- */

import { useRef, useCallback, useEffect, useState } from 'react';

const CHARS = '!<>-_\\/[]{}—=+*^?#________';

export function useScramble(finalText, { speed = 1.2, duration = 60 } = {}) {
  const ref = useRef(null);
  const frameRef = useRef(0);
  const rafRef = useRef(null);
  const queueRef = useRef([]);
  const [scrambling, setScrambling] = useState(false);

  const cancel = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
  }, []);

  const update = useCallback(() => {
    let output = '';
    let done = 0;
    const q = queueRef.current;

    for (let i = 0; i < q.length; i++) {
      const { from, to, start, end, char: curChar } = q[i];
      if (frameRef.current >= end) {
        done++;
        output += to;
      } else if (frameRef.current >= start) {
        let char = curChar;
        if (!char || Math.random() < 0.28) {
          char = CHARS[Math.floor(Math.random() * CHARS.length)];
          q[i].char = char;
        }
        output += `<span style="color:var(--ed-goldLo);opacity:.65">${char}</span>`;
      } else {
        output += from;
      }
    }

    if (ref.current) ref.current.innerHTML = output;

    if (done === q.length) {
      setScrambling(false);
      return;
    }
    frameRef.current += speed;
    rafRef.current = requestAnimationFrame(update);
  }, [speed]);

  const play = useCallback(() => {
    cancel();
    const el = ref.current;
    if (!el) return;
    const oldText = el.textContent || '';
    const length = Math.max(oldText.length, finalText.length);
    const queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = finalText[i] || '';
      const start = Math.floor(Math.random() * duration * 0.4);
      const end = start + Math.floor(Math.random() * duration * 0.6) + 10;
      queue.push({ from, to, start, end, char: '' });
    }
    queueRef.current = queue;
    frameRef.current = 0;
    setScrambling(true);
    rafRef.current = requestAnimationFrame(update);
  }, [finalText, duration, update, cancel]);

  useEffect(() => cancel, [cancel]);

  return { ref, play, scrambling };
}
