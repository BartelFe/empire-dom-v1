/* -----------------------------------------------------------
   Hero · "The Gate"
   Full-bleed video. Outlined CTA (no magnetic pull).
   Button style matches AgeGate's "I am ready to enter".
   ----------------------------------------------------------- */

import { useRef } from 'react';
import { WaveMark } from '../lib/WaveMark.jsx';

export default function Hero({ onEnter }) {
  const sectionRef = useRef(null);

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-screen w-full overflow-hidden"
    >
      {/* Background video with poster fallback (picsum placeholder) */}
      <video
        src="/assets/video/empiredom-vid-hero.mp4"
        poster="https://picsum.photos/seed/ed-hero/1920/1080"
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Darkening veil */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/30 to-black/85" />

      {/* Corner brackets (editorial cue) */}
      <div className="pointer-events-none absolute inset-6 md:inset-10">
        <span className="absolute top-0 left-0 h-6 w-6 border-t border-l border-ed-gold/60" />
        <span className="absolute top-0 right-0 h-6 w-6 border-t border-r border-ed-gold/60" />
        <span className="absolute bottom-0 left-0 h-6 w-6 border-b border-l border-ed-gold/60" />
        <span className="absolute bottom-0 right-0 h-6 w-6 border-b border-r border-ed-gold/60" />
      </div>

      {/* Logo top-center */}
      <div className="absolute top-10 left-1/2 z-10 -translate-x-1/2 text-center">
        <WaveMark size={22} />
        <div className="mt-2 text-[8px] tracking-[0.6em] text-ed-gold">
          MMXXVI
        </div>
      </div>

      {/* Tagline — bottom-left */}
      <div className="absolute bottom-[22vh] left-[5vw] z-10 max-w-sm">
        <p className="mb-3 text-[10px] tracking-[0.5em] uppercase text-ed-gold/80">
          By invitation only
        </p>
        <p
          className="font-[300] italic leading-[1.25] text-ed-gray"
          style={{ fontSize: 'clamp(0.95rem, 1.3vw, 1.2rem)' }}
        >
          Findom. Femdom. Empiredom.
        </p>
      </div>

      {/* CTA bottom-center (outlined, no magnetic) */}
      <div className="absolute bottom-[10vh] left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-8">
        <button
          onClick={onEnter}
          className="group relative overflow-hidden border border-ed-gold px-8 py-5 sm:px-14"
        >
          <span className="absolute inset-0 -translate-x-full bg-ed-gold transition-transform duration-500 ease-out group-hover:translate-x-0" />
          <span className="relative z-10 whitespace-nowrap text-[11px] tracking-[0.4em] uppercase text-ed-gold transition-colors duration-500 delay-100 group-hover:text-ed-black">
            Enter the Empire
          </span>
        </button>

        {/* Scroll cue */}
        <div className="flex flex-col items-center gap-3">
          <span className="text-[9px] tracking-[0.5em] uppercase text-ed-gray/40">
            Scroll
          </span>
          <div className="h-8 w-px animate-pulse bg-gradient-to-b from-ed-gold/60 to-transparent" />
        </div>
      </div>

      {/* Frame counter (top-right editorial) */}
      <div className="absolute top-10 right-[5vw] z-10 font-mono text-[10px] tracking-[0.3em] text-ed-gray/40">
        00 / 05
      </div>
      <div className="absolute top-10 left-[5vw] z-10 text-[10px] tracking-[0.5em] uppercase text-ed-gold">
        The Gate
      </div>
    </section>
  );
}
