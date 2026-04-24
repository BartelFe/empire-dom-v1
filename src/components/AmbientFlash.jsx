/* -----------------------------------------------------------
   AmbientFlash · occasional subtle paparazzi flashes.
   Fixed fullscreen overlay, fires every 4.5–12s at low opacity.
   ----------------------------------------------------------- */

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function AmbientFlash({ enabled = true }) {
  const ref = useRef(null);

  useEffect(() => {
    if (!enabled) return;
    let cancelled = false;
    let timer;

    const fire = () => {
      if (cancelled || !ref.current) return;
      const peak = Math.random() * 0.1 + 0.04;
      gsap
        .timeline()
        .to(ref.current, { opacity: peak, duration: 0.04, ease: 'none' })
        .to(ref.current, { opacity: 0, duration: 0.14, ease: 'power2.in' });
      timer = setTimeout(fire, 4500 + Math.random() * 8000);
    };
    timer = setTimeout(fire, 4000);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [enabled]);

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed inset-0 bg-white opacity-0"
      style={{ zIndex: 9996 }}
    />
  );
}
