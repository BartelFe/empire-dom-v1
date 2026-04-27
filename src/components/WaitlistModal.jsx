/* -----------------------------------------------------------
   WaitlistModal · Empire Dom waitlist signup
   ----------------------------------------------------------- */

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function WaitlistModal({ onClose }) {
  const overlayRef = useRef(null);
  const cardRef    = useRef(null);

  useEffect(() => {
    gsap.fromTo(overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: 'power2.out' },
    );
    gsap.fromTo(cardRef.current,
      { y: 28, opacity: 0 },
      { y: 0,  opacity: 1, duration: 0.5, ease: 'power3.out' },
    );
  }, []);

  const close = () => {
    gsap.to(overlayRef.current, {
      opacity: 0, duration: 0.25, ease: 'power2.in', onComplete: onClose,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    close();
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[9999] flex items-center justify-center px-6 bg-black/80 backdrop-blur-sm"
      onClick={(e) => { if (e.target === overlayRef.current) close(); }}
    >
      <div
        ref={cardRef}
        className="relative w-full max-w-sm border border-ed-gold/25 bg-ed-black px-8 py-10 text-center"
        style={{
          boxShadow:
            '0 40px 80px -20px rgba(0,0,0,0.9), inset 0 0 0 1px rgba(196,154,108,0.07)',
        }}
      >
        {/* Close */}
        <button
          onClick={close}
          aria-label="Close"
          className="absolute right-4 top-4 text-ed-gray/35 transition-colors duration-200 hover:text-ed-gold"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <line x1="1" y1="1" x2="13" y2="13" />
            <line x1="13" y1="1" x2="1"  y2="13" />
          </svg>
        </button>

        {/* Logo */}
        <div className="mb-6 flex justify-center">
          <img src="/assets/empiredom_logo.svg" alt="Empire Dom" className="h-14 w-auto" />
        </div>

        {/* Headline */}
        <h2
          className="mb-4 font-[900] tracking-[0.12em] uppercase text-ed-gold"
          style={{ fontSize: 'clamp(1rem, 3.5vw, 1.35rem)' }}
        >
          Join the Empire Now!
        </h2>

        {/* Body */}
        <p className="mx-auto mb-8 max-w-xs text-[12px] font-[300] leading-[1.75] text-ed-gray/60">
          Whether you lead or kneel, you belong here. Be the first to claim
          your place. Sign up to our waitlist.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="email"
            required
            placeholder="Your email address"
            className="w-full border border-ed-gold/25 bg-transparent px-4 py-3 text-[12px] tracking-[0.08em] text-ed-gray placeholder-ed-gray/30 outline-none transition-colors duration-300 focus:border-ed-gold/65"
          />
          <button
            type="submit"
            className="group relative w-full overflow-hidden border border-ed-gold py-4"
          >
            <span className="absolute inset-0 -translate-x-full bg-ed-gold transition-transform duration-500 ease-out group-hover:translate-x-0" />
            <span className="relative z-10 text-[11px] tracking-[0.4em] uppercase text-ed-gold transition-colors duration-500 delay-100 group-hover:text-ed-black">
              Join Waitlist
            </span>
          </button>
        </form>

        {/* Disclaimer */}
        <p className="mt-6 text-[9px] tracking-[0.3em] uppercase text-ed-gray/30">
          No spam. Unsubscribe at any time.
        </p>
      </div>
    </div>
  );
}
