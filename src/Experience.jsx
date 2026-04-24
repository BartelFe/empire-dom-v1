/* ============================================================
   EMPIRE DOM · Experience.jsx
   Phase 3 · The Z-Axis Flight · 7 Archetypes in fog
   R3F Canvas pinned via GSAP ScrollTrigger.
   ============================================================ */

import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ARCHETYPES } from '../data/archetypes';

console.log("🔴 MEINE DATEN:", ARCHETYPES); // <-- FÜGE DIESE ZEILE HINZU

const SPACING = 18;

const SPACING = 18;
const FLIGHT  = ARCHETYPES.length * SPACING;
const GOLD    = '#c49a6c';

/* ---- Single 3D card ------------------------------------------ */
function Card({ position, index, archetypeImg }) {
  const group = useRef();
  const [texture, setTexture] = useState(null);

  const edgesGeom = useMemo(
    () => new THREE.EdgesGeometry(new THREE.PlaneGeometry(5, 7)),
    []
  );

  useEffect(() => {
    if (!archetypeImg) return;
    new THREE.TextureLoader().load(archetypeImg, (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      setTexture(tex);
    });
  }, [archetypeImg]);

  useFrame(({ camera }) => {
    if (!group.current) return;
    const dz = position[2] - camera.position.z;
    const rotY = Math.atan2(-position[0], -dz || 0.0001) * 0.4;
    const rotX = Math.atan2(-position[1], -dz || 0.0001) * 0.2;
    group.current.rotation.y += (rotY - group.current.rotation.y) * 0.08;
    group.current.rotation.x += (rotX - group.current.rotation.x) * 0.08;
  });

  return (
    <group ref={group} position={position}>
      <mesh>
        <planeGeometry args={[5, 7]} />
        {/* DAS HIER IST DER FIX:
           - Wenn kein Bild da: Farbe #050505 (fast schwarz)
           - Wenn Bild da: color auf Weiß lassen UND toneMapped={false}
           Das schaltet die gesamte Licht-Berechnung für das Bild aus.
        */}
        <meshBasicMaterial 
          map={texture || null} 
          color="#ffffff"
          transparent={true}
          opacity={texture ? 1 : 0.05} 
          toneMapped={false} 
        />
      </mesh>
      
      {/* Der Rahmen bleibt dezent im Hintergrund */}
      <lineSegments geometry={edgesGeom}>
        <lineBasicMaterial color="#c49a6c" transparent opacity={0.2} />
      </lineSegments>
    </group>
  );
}

/* ---- Scene --------------------------------------------------- */
function FlightScene({ progressRef, cardsZ }) {
  const positions = useMemo(
    () =>
      ARCHETYPES.map((_, i) => [
        i % 2 === 0 ? -2.6 : 2.6,             // alternate L/R
        ((i % 3) - 1) * 0.8,                  // slight vertical variance
        -(i * SPACING) - 8,                   // spaced along -Z
      ]),
    []
  );
  cardsZ.current = positions.map(p => p[2]);

  useFrame(({ camera }) => {
    const target = -progressRef.current * FLIGHT;
    camera.position.z += (target - camera.position.z) * 0.1;
  });

  return (
    <>
      <fog attach="fog" args={['#000000', 5, 26]} />
      <color attach="background" args={['#000000']} />
      {positions.map((pos, i) => (
        <Card 
          key={i} 
          position={pos} 
          index={i} 
          archetypeImg={ARCHETYPES[i]?.img} 
        />
      ))}
    </>
  );
}

/* ---- Wrapper section ---------------------------------------- */
export default function Experience() {
  const sectionRef  = useRef(null);
  const progressRef = useRef(0);
  const cardsZ      = useRef([]);
  const nameRef     = useRef(null);
  const tagRef      = useRef(null);
  const numRef      = useRef(null);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: `+=${isMobile ? 400 : 650}%`,
      pin: true,
      scrub: 1.2,
      onUpdate: (self) => {
        progressRef.current = self.progress;
        const next = Math.min(
          ARCHETYPES.length - 1,
          Math.floor(self.progress * ARCHETYPES.length * 0.999)
        );
        setIdx((prev) => (prev === next ? prev : next));
      },
    });
    return () => st.kill();
  }, []);

  useEffect(() => {
    if (!nameRef.current) return;
    gsap.fromTo(
      [numRef.current, nameRef.current, tagRef.current],
      { y: 18, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.55,
        stagger: 0.06,
        ease: 'power3.out',
        overwrite: true,
      }
    );
  }, [idx]);

  const a = ARCHETYPES[idx];
  if (!a) return null;

  return (
    <section ref={sectionRef} className="relative h-screen w-full overflow-hidden bg-black">
      <Canvas
        camera={{ position: [0, 0, 0], fov: 55, near: 0.1, far: 220 }}
        className="!absolute inset-0"
        dpr={[1, typeof window !== 'undefined' && window.innerWidth < 768 ? 1.25 : 1.75]}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
      >
        <FlightScene progressRef={progressRef} cardsZ={cardsZ} />
      </Canvas>

      <div className="pointer-events-none absolute top-10 left-[4vw] text-[10px] tracking-[0.5em] uppercase text-[var(--ed-gold)]">
        The Power Archetypes
      </div>
      <div className="pointer-events-none absolute top-10 right-[4vw] font-mono text-[10px] tracking-[0.3em] text-[var(--ed-gray)]/50">
        {String(idx + 1).padStart(2, '0')} / {String(ARCHETYPES.length).padStart(2, '0')}
      </div>

      <div className="pointer-events-none absolute bottom-[14vh] left-1/2 -translate-x-1/2 w-[88vw] text-center">
        <div ref={numRef} className="mb-4 text-[10px] tracking-[0.6em] text-[var(--ed-gold)]">
          — {a.num} —
        </div>
        <h3 ref={nameRef} className="mb-4 font-[900] leading-none tracking-tight text-[var(--ed-gray)]" style={{ fontSize: 'clamp(2.25rem, 5.5vw, 5.5rem)' }}>
          {a.name}
        </h3>
        <p ref={tagRef} className="text-[11px] md:text-xs tracking-[0.35em] uppercase italic font-[300] text-[var(--ed-gold)]/75">
          {a.tag}
        </p>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,#000_100%)]" />

      <div className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-full bg-[var(--ed-shadow)]">
        <div className="h-full bg-[var(--ed-gold)]" style={{ width: `${((idx + 1) / ARCHETYPES.length) * 100}%`, transition: 'width 0.6s cubic-bezier(.22,1,.36,1)' }} />
      </div>
    </section>
  );
}