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

/* ---- Data ----------------------------------------------------- */
export const ARCHETYPES = [
  { num: '01', name: 'The Oracle',        tag: 'Quiet Power · Psychological Depth' },
  { num: '02', name: 'The Predator',      tag: 'Fear · Pain · Breaking Resistance' },
  { num: '03', name: 'The Manipulator',   tag: 'Mind Control · Emotional Hooks' },
  { num: '04', name: 'The Shark',         tag: 'Financial Control · Detachment' },
  { num: '05', name: 'The Siren',         tag: 'Desire · Seduction · Erotic Pull' },
  { num: '06', name: 'The Queen',         tag: 'Standards · Protocol · Earned Access' },
  { num: '07', name: 'The Divine Sole',   tag: 'Worship · Ritual · Focused Obsession' },
];

const SPACING = 18;                            // z-distance between cards
const FLIGHT  = ARCHETYPES.length * SPACING;   // total flight length
const GOLD    = '#c49a6c';

/* ---- Single 3D card ------------------------------------------ */
function Card({ position, index }) {
  const group = useRef();
  const plane = useRef();
  const edges = useRef();

  // pre-build edges geometry so we can reuse across frames
  const edgesGeom = useMemo(
    () => new THREE.EdgesGeometry(new THREE.PlaneGeometry(5, 7)),
    []
  );

  useFrame(({ camera }) => {
    if (!group.current) return;
    const dz = position[2] - camera.position.z;

    // Rotate slightly toward camera (parallax face)
    const rotY = Math.atan2(-position[0], -dz || 0.0001) * 0.4;
    const rotX = Math.atan2(-position[1], -dz || 0.0001) * 0.2;
    group.current.rotation.y += (rotY - group.current.rotation.y) * 0.08;
    group.current.rotation.x += (rotX - group.current.rotation.x) * 0.08;

    // Distance-based opacity so cards dissolve as they recede
    const dist = Math.abs(dz);
    const o = THREE.MathUtils.clamp(1 - (dist - 2) / 14, 0, 1);
    if (plane.current) plane.current.material.opacity = o * 0.96;
    if (edges.current) edges.current.material.opacity = o * 0.85;
  });

  return (
    <group ref={group} position={position}>
      <mesh ref={plane}>
        <planeGeometry args={[5, 7]} />
        <meshBasicMaterial color="#050505" transparent />
      </mesh>
      <lineSegments ref={edges} geometry={edgesGeom}>
        <lineBasicMaterial color={GOLD} transparent />
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
        ((i % 3) - 1) * 0.8,                   // slight vertical variance
        -(i * SPACING) - 8,                    // spaced along -Z
      ]),
    []
  );
  cardsZ.current = positions.map(p => p[2]);

  useFrame(({ camera }) => {
    const target = -progressRef.current * FLIGHT;
    // Damped follow → butter-smooth
    camera.position.z += (target - camera.position.z) * 0.1;
  });

  return (
    <>
      <fog attach="fog" args={['#000000', 5, 26]} />
      <color attach="background" args={['#000000']} />
      {positions.map((pos, i) => (
        <Card key={i} position={pos} index={i} />
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

  /* pin + scrub */
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

  /* label crossfade on idx change */
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

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      <Canvas
        camera={{ position: [0, 0, 0], fov: 55, near: 0.1, far: 220 }}
        className="!absolute inset-0"
        dpr={[1, typeof window !== 'undefined' && window.innerWidth < 768 ? 1.25 : 1.75]}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
      >
        <FlightScene progressRef={progressRef} cardsZ={cardsZ} />
      </Canvas>

      {/* HUD · top strip */}
      <div className="pointer-events-none absolute top-10 left-[4vw] text-[10px] tracking-[0.5em] uppercase text-[var(--ed-gold)]">
        The Power Archetypes
      </div>
      <div className="pointer-events-none absolute top-10 right-[4vw] font-mono text-[10px] tracking-[0.3em] text-[var(--ed-gray)]/50">
        {String(idx + 1).padStart(2, '0')} / {String(ARCHETYPES.length).padStart(2, '0')}
      </div>

      {/* Center-bottom caption */}
      <div className="pointer-events-none absolute bottom-[14vh] left-1/2 -translate-x-1/2 w-[88vw] text-center">
        <div
          ref={numRef}
          className="mb-4 text-[10px] tracking-[0.6em] text-[var(--ed-gold)]"
        >
          — {a.num} —
        </div>
        <h3
          ref={nameRef}
          className="mb-4 font-[900] leading-none tracking-tight text-[var(--ed-gray)]"
          style={{ fontSize: 'clamp(2.25rem, 5.5vw, 5.5rem)' }}
        >
          {a.name}
        </h3>
        <p
          ref={tagRef}
          className="text-[11px] md:text-xs tracking-[0.35em] uppercase italic font-[300] text-[var(--ed-gold)]/75"
        >
          {a.tag}
        </p>
      </div>

      {/* Vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,#000_100%)]" />

      {/* Scroll progress bar — thin gold line */}
      <div className="pointer-events-none absolute bottom-0 left-0 h-[2px] w-full bg-[var(--ed-shadow)]">
        <div
          className="h-full bg-[var(--ed-gold)]"
          style={{ width: `${((idx + 1) / ARCHETYPES.length) * 100}%`, transition: 'width 0.6s cubic-bezier(.22,1,.36,1)' }}
        />
      </div>
    </section>
  );
}
