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
import WaitlistModal from './components/WaitlistModal.jsx';
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
  const [soundEnabled,  setSoundEnabled]  = useState(false);
  const [showWaitlist,  setShowWaitlist]  = useState(false);
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
      {!entered && (
        <AgeGate
          onEnter={handleEnter}
          soundEnabled={soundEnabled}
          onToggleSound={() => setSoundEnabled((s) => !s)}
        />
      )}

      {showWaitlist && <WaitlistModal onClose={() => setShowWaitlist(false)} />}

      <main
        className="noise-grain relative bg-ed-black text-ed-gray"
        style={{ visibility: entered ? 'visible' : 'hidden' }}
      >
        <Hero
          onOpenWaitlist={() => setShowWaitlist(true)}
          entered={entered}
          soundEnabled={soundEnabled}
        />
        <FillSection />
        <Vault />
        <Experience />
        <Footer onOpenWaitlist={() => setShowWaitlist(true)} />
        <AmbientFlash enabled={entered} />
      </main>
    </>
  );
}
