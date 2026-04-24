/* -----------------------------------------------------------
   FillSection · "She chooses, always."
   
   Elegant center composition inspired by reference Image 3:
   • Concentric dot rings (SVG) orbit the headline
   • Small "I" badge + SCROLL cue below
   • Scroll-driven gold fill L→R on the headline
   • Amber "vault glow" begins here and carries into the Vault,
     so the two sections feel like one continuous dive
   ----------------------------------------------------------- */

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function FillSection() {
  const sectionRef = useRef(null);
  const textRef    = useRef(null);
  const ringsRef   = useRef(null);
  const glowRef    = useRef(null);
  const stageRef   = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top top',
        end: '+=180%',
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    // Segment 1 (0 → 55%): Fill text gold L→R, rings rotate subtly
    tl.fromTo(
      textRef.current,
      { '--fill': '0%' },
      { '--fill': '100%', ease: 'none', duration: 0.55 },
      0,
    );
    tl.fromTo(
      ringsRef.current,
      { rotate: 0, opacity: 0.35 },
      { rotate: 45, opacity: 0.55, ease: 'none', duration: 0.55 },
      0,
    );

    // Segment 2 (55 → 85%): Amber vault glow builds up behind everything
    tl.to(
      glowRef.current,
      { opacity: 1, scale: 1.4, ease: 'power2.out', duration: 0.3 },
      0.55,
    );

    // Segment 3 (85 → 100%): Dive — scale + blur + darken
    tl.to(
      stageRef.current,
      { scale: 3.2, ease: 'power3.in', duration: 0.15 },
      0.85,
    );
    tl.to(
      textRef.current,
      { opacity: 0, ease: 'power2.in', duration: 0.15 },
      0.85,
    );
    tl.to(
      ringsRef.current,
      { opacity: 0, ease: 'power2.in', duration: 0.15 },
      0.85,
    );

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="fill-section"
      className="relative h-screen w-full overflow-hidden bg-ed-black"
    >
      {/* Amber vault glow — hidden at start, grows into view */}
      <div
        ref={glowRef}
        className="vault-glow pointer-events-none absolute inset-0 opacity-0"
        style={{ transformOrigin: 'center' }}
      />

      {/* Stage (scaled on dive) */}
      <div
        ref={stageRef}
        className="absolute inset-0 flex items-center justify-center"
      >
        {/* Concentric dot rings — orbiting decoration */}
        <svg
          ref={ringsRef}
          viewBox="-400 -400 800 800"
          className="pointer-events-none absolute h-[140vh] w-[140vh] opacity-40"
          style={{ maxWidth: '95vw', maxHeight: '95vw' }}
        >
          <DotRing radius={380} count={140} />
          <DotRing radius={320} count={120} />
          <DotRing radius={260} count={96} />
          <DotRing radius={200} count={72} />
        </svg>

        {/* Eyebrow */}
        <div className="absolute left-1/2 top-[calc(50%-14vh)] -translate-x-1/2 -translate-y-1/2">
          <span className="text-[10px] tracking-[0.5em] uppercase text-ed-gold">
            The First Truth
          </span>
        </div>

        {/* Headline (fills gold on scroll) */}
        <h2
          ref={textRef}
          className="fill-text relative z-10 text-center font-[300] italic leading-[1.02]"
          style={{
            fontSize: 'clamp(3rem, 7vw, 7.5rem)',
            '--fill': '0%',
            maxWidth: '90vw',
          }}
        >
          She chooses,
          <br />
          always.
        </h2>

        {/* Numeral badge */}
        <div className="absolute left-1/2 top-[calc(50%+14vh)] -translate-x-1/2 -translate-y-1/2">
          <div className="flex h-14 w-14 items-center justify-center rounded-full border border-ed-gold/70">
            <span className="text-sm font-[300] italic text-ed-gold">I</span>
          </div>
        </div>

        {/* Scroll cue */}
        <div className="absolute bottom-[8vh] left-1/2 -translate-x-1/2 text-center">
          <div className="mb-3 text-[9px] tracking-[0.5em] uppercase text-ed-gray/40">
            Scroll
          </div>
          <div className="mx-auto h-8 w-px bg-gradient-to-b from-ed-gold/50 to-transparent" />
        </div>
      </div>
    </section>
  );
}

/* -----------------------------------------------------------
   DotRing — single ring of dots at given radius / count.
   ----------------------------------------------------------- */
function DotRing({ radius, count }) {
  const dots = Array.from({ length: count }, (_, i) => {
    const a = (i / count) * Math.PI * 2;
    return { x: Math.cos(a) * radius, y: Math.sin(a) * radius };
  });
  return (
    <g>
      {dots.map((d, i) => (
        <circle
          key={i}
          cx={d.x}
          cy={d.y}
          r={1}
          fill="var(--ed-gold)"
          opacity={i % 3 === 0 ? 0.75 : 0.35}
        />
      ))}
    </g>
  );
}
