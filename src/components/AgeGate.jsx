/* -----------------------------------------------------------
   AgeGate · Entry ritual (Image 1 reference).
   Full-bleed modal. Blocks scroll until accepted.
   ----------------------------------------------------------- */

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { WaveMark } from '../lib/WaveMark.jsx';

export default function AgeGate({ onEnter }) {
  const rootRef = useRef(null);
  const stackRef = useRef([]);

  useEffect(() => {
    // Lock body scroll while gate is open
    document.body.style.overflow = 'hidden';

    // Staggered reveal
    const tl = gsap.timeline();
    tl.fromTo(
      stackRef.current.filter(Boolean),
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.1,
        ease: 'power3.out',
        stagger: 0.12,
      },
    );

    return () => {
      document.body.style.overflow = '';
      tl.kill();
    };
  }, []);

  const addToStack = (el) => {
    if (el && !stackRef.current.includes(el)) stackRef.current.push(el);
  };

  const handleEnter = () => {
    // Fade out whole gate, then unmount
    gsap.to(rootRef.current, {
      opacity: 0,
      duration: 0.7,
      ease: 'power2.inOut',
      onComplete: onEnter,
    });
  };

  const handleLeave = () => {
    window.location.href = 'https://www.google.com';
  };

  return (
    <div
      ref={rootRef}
      role="dialog"
      aria-modal="true"
      aria-label="Age verification"
      className="fixed inset-0 z-[10000] flex items-center justify-center overflow-y-auto bg-ed-black px-6 py-10 sm:py-16"
    >
      {/* vignette veil */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.85)_100%)]" />

      <div className="relative w-full max-w-md text-center">
        {/* Wave mark */}
        <div ref={addToStack} className="mb-10 flex justify-center">
          <WaveMark size={28} />
        </div>

        {/* Eyebrow */}
        <div ref={addToStack} className="mb-10">
          <p className="text-[11px] tracking-[0.4em] text-ed-gold">
            —&nbsp;&nbsp;AN EMPIRE DOES NOT WELCOME.
          </p>
          <p className="mt-1 text-[11px] tracking-[0.4em] text-ed-gold">
            IT ACCEPTS.&nbsp;&nbsp;—
          </p>
        </div>

        {/* Main headline */}
        <h1
          ref={addToStack}
          className="mb-10 font-[900] leading-[1.02] tracking-tight text-ed-gray"
          style={{ fontSize: 'clamp(2rem, 5.5vw, 2.75rem)' }}
        >
          YOU MUST BE <span className="text-ed-gold">OF</span>
          <br />
          <span className="text-ed-gold">LEGAL AGE</span>
          <br />
          AND WILLING TO
          <br />
          <span className="font-[300] italic">KNEEL.</span>
        </h1>

        {/* Body copy */}
        <p
          ref={addToStack}
          className="mx-auto mb-12 max-w-sm text-[13px] font-[300] leading-[1.75] text-ed-gray/70"
        >
          Beyond this threshold lies a platform of deliberate power, discreet
          luxury, and financial devotion. Enter only if you are 18 years or
          older and you consent to adult-oriented content.
        </p>

        {/* CTA */}
        <button
          ref={addToStack}
          onClick={handleEnter}
          className="group relative mb-4 block w-full overflow-hidden border border-ed-gold px-12 py-5 transition-colors duration-500"
        >
          <span className="absolute inset-0 -translate-x-full bg-ed-gold transition-transform duration-500 ease-out group-hover:translate-x-0" />
          <span className="relative z-10 text-[11px] tracking-[0.4em] uppercase text-ed-gold transition-colors duration-500 delay-100 group-hover:text-ed-black">
            I am ready to enter
          </span>
        </button>

        {/* Leave link */}
        <button
          ref={addToStack}
          onClick={handleLeave}
          className="mb-12 text-[11px] tracking-[0.4em] uppercase text-ed-gray/50 transition-colors hover:text-ed-gray"
        >
          Leave
        </button>

        {/* Disclaimer */}
        <p
          ref={addToStack}
          className="text-[9px] tracking-[0.3em] uppercase text-ed-gray/35"
        >
          By entering you confirm you are of legal
          <br />
          age in your jurisdiction.
        </p>
      </div>
    </div>
  );
}
