/* -----------------------------------------------------------
   Vault · The four silent pillars.
   
   Matches reference Image 4:
   • Amber spotlight glow covering the section
   • "THE VAULT." — white + gold split headline
   • Italic subtitle
   • 2x2 grid of pillar cards with corner brackets
   • Center ED monogram badge (overlays grid intersection)
   • Scanlines + chromatic edges around viewport
   • Scramble/decode on pillar labels when they enter viewport
   ----------------------------------------------------------- */

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useScramble } from '../hooks/useScramble.js';
import { WaveMark } from '../lib/WaveMark.jsx';

const PILLARS = [
  {
    id: '001',
    label: 'ENCRYPTED',
    heading: 'What passes between you',
    body:
      'Every message, every tribute, every private frame — wrapped in client-side encryption before it leaves your device. She reads. You read. No one else, ever.',
    foot: 'AES-256 · Zero-knowledge envelopes',
  },
  {
    id: '002',
    label: 'UNTRACEABLE',
    heading: 'What the world sees',
    body:
      'Nothing. Transactions surface on your statement as neutral line items. Metadata is minimized at ingestion and purged on schedule. Discretion is infrastructure.',
    foot: 'Merchant-neutral billing · Zero metadata retention',
  },
  {
    id: '003',
    label: 'VERIFIED',
    heading: 'Who she is',
    body:
      'Every goddess passes a private audit before She is admitted to the Empire. No bots. No catfish. Only women who chose this power and earned their standing.',
    foot: 'Manual ID verification · Reputation staking',
  },
  {
    id: '004',
    label: 'SOVEREIGN',
    heading: 'Who holds the keys',
    body:
      'She does. Always. You are a guest in Her chambers. The platform is Her staff — invisible, obedient, never the authority.',
    foot: 'Creator-owned data · Export at will',
  },
];

export default function Vault() {
  const sectionRef = useRef(null);
  const headRef    = useRef(null);
  const gridRef    = useRef(null);

  useEffect(() => {
    // Reveal heading on enter
    const tl1 = gsap.fromTo(
      headRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
        },
      },
    );
    // Reveal cards stagger
    const cards = gridRef.current?.querySelectorAll('[data-card]') || [];
    const tl2 = gsap.fromTo(
      cards,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.9,
        ease: 'power3.out',
        stagger: 0.14,
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 75%',
        },
      },
    );

    return () => {
      tl1.scrollTrigger?.kill();
      tl2.scrollTrigger?.kill();
      tl1.kill();
      tl2.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="scanlines chromatic-edges relative w-full overflow-hidden bg-ed-black px-[4vw] py-[22vh] md:px-[8vw]"
    >
      {/* Amber spotlight glow — the signature from FillSection continues here */}
      <div className="vault-glow pointer-events-none absolute inset-0" />

      {/* Left-side vertical marker */}
      <div className="pointer-events-none absolute left-6 top-[25vh] flex flex-col items-start gap-2">
        <div className="h-10 w-px bg-ed-gold/40" />
        <span className="text-[9px] tracking-[0.5em] uppercase text-ed-gold/60 [writing-mode:horizontal-tb]">
          Ascension
        </span>
      </div>

      {/* Right-side button */}
      <button className="pointer-events-auto absolute right-6 top-1/2 z-20 flex -translate-y-1/2 items-center gap-3 border border-ed-gold/40 bg-ed-black/70 px-4 py-3 backdrop-blur-sm">
        <span className="flex flex-col gap-0.5">
          <span className="h-px w-4 bg-ed-gold" />
          <span className="h-px w-4 bg-ed-gold" />
          <span className="h-px w-4 bg-ed-gold" />
          <span className="h-px w-4 bg-ed-gold" />
        </span>
        <span className="text-[9px] tracking-[0.4em] uppercase text-ed-gold">
          Awaken
        </span>
      </button>

      {/* Heading */}
      <div ref={headRef} className="relative z-10 mx-auto max-w-5xl text-left">
        <h2
          className="font-[900] leading-[0.95] tracking-tight"
          style={{ fontSize: 'clamp(3.5rem, 9vw, 9rem)' }}
        >
          <span className="text-ed-gray">THE&nbsp;</span>
          <span className="text-ed-gold">VAULT.</span>
        </h2>
        <p className="mt-8 max-w-xl text-[14px] font-[300] italic leading-relaxed text-ed-gray/70">
          Discretion is not a feature. It is the foundation. Everything else is
          built on top of four silent pillars.
        </p>
      </div>

      {/* Grid 2×2 with center seal */}
      <div
        ref={gridRef}
        className="relative z-10 mx-auto mt-[12vh] grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 md:gap-10"
      >
        {PILLARS.map((p) => (
          <Pillar key={p.id} {...p} />
        ))}

        {/* Center seal — only on md+ where grid intersection exists */}
        <div className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:block">
          <Seal />
        </div>
      </div>
    </section>
  );
}

/* -----------------------------------------------------------
   Pillar · Single vault card with corner brackets and scramble
   ----------------------------------------------------------- */
function Pillar({ id, label, heading, body, foot }) {
  const { ref: labelRef, play: playLabel } = useScramble(label);
  const { ref: footRef, play: playFoot } = useScramble(foot, { duration: 80 });
  const cardRef = useRef(null);

  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: cardRef.current,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        playLabel();
        setTimeout(() => playFoot(), 250);
      },
    });
    return () => st.kill();
  }, [playLabel, playFoot]);

  return (
    <div
      ref={cardRef}
      data-card
      className="corner-frame relative bg-ed-black/35 p-8 md:p-10 backdrop-blur-[2px]"
      style={{
        boxShadow:
          'inset 0 0 0 1px rgba(196, 154, 108, 0.12), 0 30px 80px -20px rgba(0,0,0,0.5)',
      }}
    >
      {/* Top row: id + label */}
      <div className="mb-10 flex items-start justify-between">
        <span className="font-mono text-[10px] tracking-[0.3em] text-ed-gray/40">
          // {id}
        </span>
        <span
          ref={labelRef}
          className="font-mono text-[10px] tracking-[0.4em] text-ed-gold/70"
        >
          {label}
        </span>
      </div>

      {/* Heading */}
      <h4 className="mb-5 text-[11px] tracking-[0.35em] uppercase text-ed-gray/55">
        {heading}
      </h4>

      {/* Body */}
      <p className="mb-10 text-[14.5px] font-[300] leading-[1.7] text-ed-gray/90">
        {body}
      </p>

      {/* Divider + foot */}
      <div className="mb-3 h-px bg-ed-gold/15" />
      <span
        ref={footRef}
        className="font-mono text-[10px] tracking-[0.3em] uppercase text-ed-gray/40"
      >
        {foot}
      </span>
    </div>
  );
}

/* -----------------------------------------------------------
   Seal · Center ED monogram badge with orbiting marker dots
   ----------------------------------------------------------- */
function Seal() {
  return (
    <div className="relative flex h-24 w-24 items-center justify-center md:h-28 md:w-28">
      <svg
        viewBox="-60 -60 120 120"
        className="absolute h-full w-full animate-[spin_38s_linear_infinite] opacity-70"
      >
        {Array.from({ length: 48 }).map((_, i) => {
          const a = (i / 48) * Math.PI * 2;
          return (
            <circle
              key={i}
              cx={Math.cos(a) * 50}
              cy={Math.sin(a) * 50}
              r={i % 4 === 0 ? 1.2 : 0.6}
              fill="var(--ed-gold)"
              opacity={i % 4 === 0 ? 0.85 : 0.35}
            />
          );
        })}
      </svg>
      <div className="relative flex h-16 w-16 flex-col items-center justify-center rounded-full border border-ed-gold/50 bg-ed-black md:h-20 md:w-20">
        <WaveMark size={10} />
        <span className="mt-1 font-[900] tracking-[0.15em] text-ed-gold text-[10px]">
          ED
        </span>
      </div>
    </div>
  );
}
