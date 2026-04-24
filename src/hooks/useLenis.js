/* -----------------------------------------------------------
   useLenis — singleton Lenis instance bound to rAF + GSAP.
   Returns the Lenis ref + a scrollTo fn.
   ----------------------------------------------------------- */

import { useEffect, useRef, useCallback } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function useLenis(enabled = true) {
  const lenisRef = useRef(null);

  useEffect(() => {
    if (!enabled) return;

    const lenis = new Lenis({
      duration: 1.3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      syncTouch: false, // native touch scroll on mobile
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const raf = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [enabled]);

  const scrollTo = useCallback((target, opts = {}) => {
    lenisRef.current?.scrollTo(target, { duration: 1.6, ...opts });
  }, []);

  const stop  = useCallback(() => lenisRef.current?.stop(), []);
  const start = useCallback(() => lenisRef.current?.start(), []);

  return { lenisRef, scrollTo, stop, start };
}
