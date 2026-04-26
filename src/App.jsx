/* -----------------------------------------------------------
   App · Root orchestration
   
   Flow:
   1. AgeGate (modal, blocks everything)
   2. On accept → Lenis boots, page becomes scrollable
   3. Hero → FillSection → Vault → Experience (flight+wall) → Footer
   ----------------------------------------------------------- */

import { useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import AgeGate from './components/AgeGate.jsx';
import Hero from './components/Hero.jsx';
import FillSection from './components/FillSection.jsx';
import Vault from './components/Vault.jsx';
import Experience from './components/Experience.jsx';
import Footer from './components/Footer.jsx';
import AmbientFlash from './components/AmbientFlash.jsx';
import { useLenis } from './hooks/useLenis.js';

gsap.registerPlugin(ScrollTrigger);

const GATE_KEY = 'ed_age_gate_v1';

export default function App() {
  const [entered, setEntered] = useState(() => {
    try {
      return sessionStorage.getItem(GATE_KEY) === '1';
    } catch {
      return false;
    }
  });

  // Lenis only runs after the gate is passed
  const { scrollTo } = useLenis(entered);

  const handleEnter = () => {
    try { sessionStorage.setItem(GATE_KEY, '1'); } catch {}
    setEntered(true);
    // Slight delay so Lenis initializes before any scrollTo
    requestAnimationFrame(() => ScrollTrigger.refresh());
  };

  // Refresh ScrollTrigger after entry + on resize
  useEffect(() => {
    if (!entered) return;
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('resize', refresh);
    const t = setTimeout(refresh, 200);
    return () => {
      window.removeEventListener('resize', refresh);
      clearTimeout(t);
    };
  }, [entered]);

  return (
    <>
      {!entered && <AgeGate onEnter={handleEnter} />}

      <main
        className="noise-grain relative bg-ed-black text-ed-gray"
        style={{ visibility: entered ? 'visible' : 'hidden' }}
      >
        <Hero onEnter={() => scrollTo('#fill-section', { duration: 1.8 })} entered={entered} />
        <FillSection />
        <Vault />
        <Experience />
        <Footer />
        <AmbientFlash enabled={entered} />
      </main>
    </>
  );
}
