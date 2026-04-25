/* -----------------------------------------------------------
   Experience · The Z-Axis Flight + Goddess Wall finale
   
   Structure:
   • One pinned section, scrub-driven
   • Progress 0.00 → 0.85 : fly through 7 archetype cards (R3F)
   • Progress 0.85 → 1.00 : Goddess Wall emerges from fog,
                            grows from 0 → 1 scale, reaches 100vh
   • At progress 1.00     : pin releases naturally; wall is
                            fully on screen; next scroll goes to Footer
   
   The Wall is an HTML DOM overlay positioned inside the pinned
   section — so when pin releases, it stays exactly where the
   user last saw it. No layout shift.
   ----------------------------------------------------------- */

import { useRef, useMemo, useEffect, useState, memo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ARCHETYPES } from '../data/archetypes.js';
import { GODDESSES } from '../data/goddesses.js';

const SPACING    = 18;
const FLIGHT     = ARCHETYPES.length * SPACING;
const GOLD       = '#c49a6c';
const WALL_DEPTH = ARCHETYPES.length * SPACING + 10;

/* -----------------------------------------------------------
   Paparazzi flash burst — fires once when progress > 0.85.
   Creates DOM elements directly to avoid React re-render cost.
   ----------------------------------------------------------- */
function triggerPaparazziFlash(container) {
  if (!container) return;
  const bursts = [
    { delay: 0.00, x: 20, y: 38, w: 180, h: 110 },
    { delay: 0.09, x: 78, y: 22, w: 240, h: 150 },
    { delay: 0.17, x: 48, y: 65, w: 150, h: 95  },
    { delay: 0.28, x: 12, y: 72, w: 200, h: 125 },
    { delay: 0.38, x: 85, y: 55, w: 135, h: 85  },
    { delay: 0.50, x: 62, y: 28, w: 210, h: 130 },
    { delay: 0.60, x: 35, y: 50, w: 160, h: 100 },
  ];
  bursts.forEach(({ delay, x, y, w, h }) => {
    const el = document.createElement('div');
    el.style.cssText = `
      position:absolute;left:${x}%;top:${y}%;
      width:${w}px;height:${h}px;
      background:radial-gradient(ellipse,rgba(255,255,255,0.90) 0%,rgba(255,255,255,0) 70%);
      pointer-events:none;transform:translate(-50%,-50%);opacity:0;
    `;
    container.appendChild(el);
    gsap.timeline({ onComplete: () => el.remove() })
      .to(el, { opacity: 1, duration: 0.035, delay, ease: 'none' })
      .to(el, { opacity: 0, duration: 0.22, ease: 'power2.out' });
  });
}

/* -----------------------------------------------------------
   3D archetype card
   ----------------------------------------------------------- */
const Card = memo(function Card({ position, archetypeImg }) {
  const group  = useRef();
  const plane  = useRef();
  const edges  = useRef();
  const matRef = useRef();

  const edgesGeom = useMemo(
    () => new THREE.EdgesGeometry(new THREE.PlaneGeometry(5, 7)),
    [],
  );

  useEffect(() => {
    if (!archetypeImg) return;
    const loader = new THREE.TextureLoader();
    loader.load(
      archetypeImg,
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        if (!matRef.current) return;
        matRef.current.map = texture;
        matRef.current.color.set('#ffffff');
        matRef.current.needsUpdate = true;
      },
      undefined,
      (err) => console.error('Texture load error:', archetypeImg, err),
    );
  }, [archetypeImg]);

  useFrame(({ camera }) => {
    if (!group.current) return;
    const dz = position[2] - camera.position.z;

    const rotY = Math.atan2(-position[0], -dz || 0.0001) * 0.4;
    const rotX = Math.atan2(-position[1], -dz || 0.0001) * 0.2;
    group.current.rotation.y += (rotY - group.current.rotation.y) * 0.08;
    group.current.rotation.x += (rotX - group.current.rotation.x) * 0.08;

    const dist = Math.abs(dz);
    const o = THREE.MathUtils.clamp(1 - (dist - 2) / 14, 0, 1);
    if (plane.current) plane.current.material.opacity = o * 0.96;
    if (edges.current) edges.current.material.opacity = o * 0.85;
  });

  return (
    <group ref={group} position={position}>
      <mesh ref={plane}>
        <planeGeometry args={[5, 7]} />
        <meshBasicMaterial ref={matRef} color="#050505" transparent />
      </mesh>
      <lineSegments ref={edges} geometry={edgesGeom}>
        <lineBasicMaterial color={GOLD} transparent />
      </lineSegments>
    </group>
  );
});

/* -----------------------------------------------------------
   R3F scene
   ----------------------------------------------------------- */
function FlightScene({ progressRef }) {
  const positions = useMemo(
    () => {
      const xOffset = window.innerWidth < 768 ? 1.6 : 2.6;
      return ARCHETYPES.map((_, i) => [
        i % 2 === 0 ? -xOffset : xOffset,
        ((i % 3) - 1) * 0.8,
        -(i * SPACING) - 8,
      ]);
    },
    [],
  );

  useFrame(({ camera }) => {
    // Flight progress is 0 → 0.85 mapped onto FLIGHT distance
    const flightP = THREE.MathUtils.clamp(progressRef.current / 0.85, 0, 1);
    const target = -flightP * FLIGHT;
    camera.position.z += (target - camera.position.z) * 0.1;
  });

  return (
    <>
      <fog attach="fog" args={['#000000', 5, 26]} />
      <color attach="background" args={['#000000']} />
      {positions.map((pos, i) => (
        <Card key={i} position={pos} archetypeImg={ARCHETYPES[i]?.img} />
      ))}
    </>
  );
}

/* =============================================================
   Main · pinned section orchestrating flight + wall
   ============================================================= */
export default function Experience() {
  const sectionRef   = useRef(null);
  const wallRef      = useRef(null);
  const hudRef       = useRef(null);
  const captionRefs  = {
    num: useRef(null),
    name: useRef(null),
    tag: useRef(null),
  };
  const progressRef      = useRef(0);
  const flashContainerRef = useRef(null);
  const hasFlashedRef     = useRef(false);
  const [idx, setIdx] = useState(0);
  const [inWall, setInWall] = useState(false);

  /* --- Pin + scrub --- */
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: `+=${isMobile ? 550 : 800}%`,
      pin: true,
      scrub: 1.2,
      anticipatePin: 1,
      onUpdate: (self) => {
        progressRef.current = self.progress;

        // Flight phase → archetype index
        const flightP = Math.min(1, self.progress / 0.85);
        const aIdx = Math.min(
          ARCHETYPES.length - 1,
          Math.floor(flightP * ARCHETYPES.length * 0.999),
        );
        setIdx((prev) => (prev === aIdx ? prev : aIdx));

        // Wall emergence phase (0.85 → 1.0)
        const wallP = THREE.MathUtils.clamp(
          (self.progress - 0.85) / 0.15,
          0,
          1,
        );
        setInWall(wallP > 0.02);

        if (wallRef.current) {
          // Ease-out curve so it feels like emerging from fog
          const eased = 1 - Math.pow(1 - wallP, 3);
          const scale = 0.3 + 0.7 * eased;
          const opacity = eased;
          wallRef.current.style.transform = `scale(${scale})`;
          wallRef.current.style.opacity = opacity;
          wallRef.current.style.filter = `blur(${(1 - eased) * 18}px)`;
        }

        // Fade HUD when in wall phase
        if (hudRef.current) {
          hudRef.current.style.opacity = String(1 - wallP * 1.2);
        }

        // Paparazzi flash burst — fires once when entering wall phase
        if (self.progress >= 0.85 && !hasFlashedRef.current) {
          hasFlashedRef.current = true;
          triggerPaparazziFlash(flashContainerRef.current);
        } else if (self.progress < 0.80) {
          hasFlashedRef.current = false;
        }
      },
    });
    return () => st.kill();
  }, []);

  /* --- Caption label crossfade --- */
  useEffect(() => {
    gsap.fromTo(
      [captionRefs.num.current, captionRefs.name.current, captionRefs.tag.current],
      { y: 18, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.55,
        stagger: 0.06,
        ease: 'power3.out',
        overwrite: true,
      },
    );
  }, [idx]);

  const a = ARCHETYPES[idx];

  return (
    <section
      ref={sectionRef}
      className="relative h-screen w-full overflow-hidden bg-black"
    >
      {/* R3F flight canvas */}
      <Canvas
        camera={{ position: [0, 0, 0], fov: 55, near: 0.1, far: 240 }}
        className="!absolute inset-0"
        dpr={[1, typeof window !== 'undefined' && window.innerWidth < 768 ? 1.25 : 1.75]}
        gl={{ antialias: true, powerPreference: 'high-performance' }}
      >
        <FlightScene progressRef={progressRef} />
      </Canvas>

      {/* HUD · flight (fades out during wall emergence) */}
      <div ref={hudRef} className="pointer-events-none absolute inset-0">
        <div className="absolute top-10 left-[4vw] text-[10px] tracking-[0.5em] uppercase text-ed-gold">
          The Power Archetypes
        </div>
        <div className="absolute top-10 right-[4vw] font-mono text-[10px] tracking-[0.3em] text-ed-gray/50">
          {String(idx + 1).padStart(2, '0')} / {String(ARCHETYPES.length).padStart(2, '0')}
        </div>

        <div className="absolute bottom-[14vh] left-1/2 w-[88vw] -translate-x-1/2 text-center">
          <div
            ref={captionRefs.num}
            className="mb-4 text-[10px] tracking-[0.6em] text-ed-gold"
          >
            — {a.num} —
          </div>
          <h3
            ref={captionRefs.name}
            className="mb-4 font-[900] leading-none tracking-tight text-ed-gray"
            style={{ fontSize: 'clamp(2.25rem, 5.5vw, 5.5rem)' }}
          >
            {a.name}
          </h3>
          <p
            ref={captionRefs.tag}
            className="text-[11px] md:text-xs tracking-[0.35em] uppercase italic font-[300] text-ed-gold/75"
          >
            {a.tag}
          </p>
        </div>

        {/* Vignette */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,#000_100%)]" />
      </div>

      {/* Paparazzi flash container — sits above wall, emptied after burst */}
      <div
        ref={flashContainerRef}
        className="pointer-events-none absolute inset-0 z-[30]"
      />

      {/* ============================================================
          GODDESS WALL · emerges at progress 0.85 → 1.0
          Positioned absolute within pinned section so it naturally
          stays on screen when pin releases.
          ============================================================ */}
      <div
        ref={wallRef}
        className="absolute inset-0 z-20 flex items-center justify-center opacity-0"
        style={{
          transform: 'scale(0.3)',
          filter: 'blur(18px)',
          transformOrigin: 'center',
          willChange: 'transform, opacity, filter',
        }}
      >
        <GoddessWall active={inWall} />
      </div>
    </section>
  );
}

/* =============================================================
   GoddessWall · 100vh wall, asymmetric grid, paparazzi flash.
   Memoized to avoid re-render storms during scrub.
   ============================================================= */
const GoddessWall = memo(function GoddessWall({ active }) {
  const handleEnter = (e) => {
    if (!active) return;
    const card = e.currentTarget;
    const flash = document.createElement('div');
    flash.style.cssText =
      'position:absolute;inset:0;background:#fff;pointer-events:none;z-index:5;opacity:0;';
    card.appendChild(flash);
    gsap
      .timeline({ onComplete: () => flash.remove() })
      .to(flash, { opacity: 0.7, duration: 0.04, ease: 'none' })
      .to(flash, { opacity: 0, duration: 0.22, ease: 'power2.in' });
    card.classList.add('is-exposed');
  };
  const handleLeave = (e) => e.currentTarget.classList.remove('is-exposed');

  return (
    <div className="relative h-screen w-full bg-black">
      {/* Wall edge frame */}
      <div className="pointer-events-none absolute inset-0 border border-ed-gold/20" />

      {/* Top HUD */}
      <div className="pointer-events-none absolute top-6 left-6 z-30 text-[10px] tracking-[0.5em] uppercase text-ed-gold">
        The Goddesses
      </div>
      <div className="pointer-events-none absolute top-6 right-6 z-30 font-mono text-[10px] tracking-[0.3em] text-ed-gray/40">
        10 of ∞
      </div>

      {/* Asymmetric grid — 6 cols × 4 rows, cards span variably */}
      <div
        className="grid h-full w-full gap-[2px] p-[2px]"
        style={{
          gridTemplateColumns: 'repeat(6, 1fr)',
          gridTemplateRows: 'repeat(4, 1fr)',
        }}
      >
        {GODDESSES.map((g, i) => (
          <button
            key={g.id}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            className={`portrait group relative ${g.col}`}
            style={{
              border: '1px solid rgba(196,154,108,0.45)',
              boxShadow: 'inset 0 0 28px 8px rgba(0,0,0,0.70)',
            }}
          >
            <img src={g.img} alt={g.name} loading="lazy" />

            {/* Glass / specular reflection */}
            <div
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  'linear-gradient(150deg,rgba(255,255,255,0.08) 0%,rgba(255,255,255,0.02) 35%,rgba(0,0,0,0) 60%)',
              }}
            />

            {/* Warm spotlight — brightens on hover */}
            <div
              className="pointer-events-none absolute inset-0 opacity-45 transition-opacity duration-500 group-hover:opacity-85"
              style={{
                background:
                  'radial-gradient(ellipse at 50% -8%,rgba(196,154,108,0.38) 0%,rgba(0,0,0,0) 62%)',
              }}
            />

            {/* Hover exposure flash handled by handleEnter */}

            {/* Name plaque — always visible */}
            <div
              className="pointer-events-none absolute bottom-0 left-0 right-0 flex items-center justify-between px-2 py-[5px]"
              style={{
                background: 'rgba(0,0,0,0.76)',
                borderTop: '1px solid rgba(196,154,108,0.28)',
              }}
            >
              <span className="font-mono text-[7px] tracking-[0.4em] text-ed-gold/65">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="text-[7px] tracking-[0.28em] uppercase font-[300] text-ed-gray/80">
                {g.name}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Bottom hint */}
      <div className="pointer-events-none absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
        <div className="text-[9px] tracking-[0.5em] uppercase text-ed-gray/45">
          Hover to expose · Scroll to ascend
        </div>
      </div>
    </div>
  );
});
