/* -----------------------------------------------------------
   WaveMark — EmpireDom's gold "Money Wave" SVG.
   Approximation of the brand-manual mark. Swap the path `d`
   with the exact vector when you have it.
   ----------------------------------------------------------- */

export function WaveMark({ size = 48, className = '' }) {
  return (
    <img
      src="/assets/money-wave.svg"
      alt="EmpireDom mark"
      className={className}
      style={{ height: `${size}px`, width: 'auto' }}
    />
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
