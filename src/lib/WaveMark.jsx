/* -----------------------------------------------------------
   WaveMark — EmpireDom's gold "Money Wave" SVG.
   Approximation of the brand-manual mark. Swap the path `d`
   with the exact vector when you have it.
   ----------------------------------------------------------- */

export function WaveMark({ size = 48, color = 'var(--ed-gold)', className = '' }) {
  return (
    <svg
      viewBox="0 0 160 40"
      width={size * 4}
      height={size}
      className={className}
      aria-label="EmpireDom mark"
    >
      <defs>
        <linearGradient id="wm-g" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="var(--ed-goldLo)" />
          <stop offset="50%"  stopColor="var(--ed-goldHi)" />
          <stop offset="100%" stopColor="var(--ed-goldLo)" />
        </linearGradient>
      </defs>
      <path
        d="M4 26 C 30 14, 56 6, 82 10 C 106 14, 128 22, 156 14 C 140 22, 114 32, 86 30 C 54 28, 32 22, 4 26 Z"
        fill="url(#wm-g)"
      />
    </svg>
  );
}

export function WordMark({ size = 16, className = '' }) {
  return (
    <div
      className={`font-[900] tracking-[0.25em] uppercase text-ed-gold ${className}`}
      style={{ fontSize: `${size}px`, lineHeight: 1 }}
    >
      <div>EMPIRE</div>
      <div>DOM</div>
    </div>
  );
}
