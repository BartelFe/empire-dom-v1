# EMPIRE DOM — v2.1

Award-grade premium frontend for the EmpireDom platform.
Findom. Femdom. Empiredom.

## Quick start

```bash
npm install
npm run dev        # → http://localhost:5173
npm run build      # production bundle into /dist
npm run preview    # preview the prod build
```

Node 18+ required.

## Tech stack

- **React 18 + Vite** — framework
- **Tailwind CSS** — design tokens + layout
- **GSAP + ScrollTrigger** — scroll choreography
- **Lenis** — smooth scroll (desktop only; native momentum on touch)
- **three + @react-three/fiber** — Z-axis archetype flight
- **@fontsource/roboto** — self-hosted brand font

## Experience flow

1. **AgeGate** (`components/AgeGate.jsx`) — entry ritual, locks scroll until passed. Matches reference Image 1.
2. **Hero** (`components/Hero.jsx`) — full-bleed video, outlined CTA `Enter the Empire`. No magnetic pull.
3. **FillSection** (`components/FillSection.jsx`) — `She chooses, always.` centered inside concentric dot rings (Image 3 style). Scroll fills text gold L→R, then an amber vault glow builds up and the stage zooms → handoff into the Vault.
4. **Vault** (`components/Vault.jsx`) — Image 4 match. Amber spotlight, 2×2 pillar grid with corner brackets, center ED badge, chromatic edges, scramble/decode labels.
5. **Experience** (`components/Experience.jsx`) — pinned section. Z-axis flight through 7 archetype cards (R3F), then the **Goddess Wall** emerges from fog at progress 0.85 → 1.0, growing from tiny into a full 100vh asymmetric grid of 10 portraits. At 1.0 pin releases and the wall is on screen.
6. **Footer** (`components/Footer.jsx`) — `KNEEL, AND THE EMPIRE OPENS.` headline, CTA row, 3-column footer grid, monumental clipped EMPIRE DOM at the bottom (Image 5 match).

## Asset swap checklist

| Placeholder | Location | Swap to |
| --- | --- | --- |
| Hero video | `public/assets/video/empiredom-vid-hero.mp4` | your luxury hero loop |
| Hero poster fallback | `src/components/Hero.jsx` · `poster` attr | static still of hero |
| Goddess portraits | `src/data/goddesses.js` (`img` fields) | your 10 goddess images under `/assets/images/` |
| WaveMark SVG | `src/lib/WaveMark.jsx` | your exact vector path |

Currently goddess images are served from `picsum.photos/seed/...` so the wall renders correctly out of the box. Seeded URLs are stable on reload — each goddess keeps the same image until you swap it.

## Brand tokens

| Token | Value | Use |
| --- | --- | --- |
| `ed-black` | `#141414` | foundation |
| `ed-shadow` | `#282828` | ED Black brand |
| `ed-ink` | `#3c3c3c` | ED Shadow brand |
| `ed-gold` | `#c49a6c` | ED Gold brand |
| `ed-goldHi` / `-Lo` | derived | foil gradient stops |
| `ed-gray` | `#d9dadb` | ED Grey brand |

## Text scramble effect

`src/hooks/useScramble.js` implements a canonical frame-timed decode animation. Each character gets a randomized `start`/`end` frame; before `end` it flickers through `!<>-_\\/[]{}—=+*^?#` at a stochastic rate, then locks. Runs on `requestAnimationFrame` for stable 60fps.

If you want your v2 repo's scramble swapped in instead, drop the file in and update the imports in `Vault.jsx`.

## Performance notes

- Lenis is desktop-only (`syncTouch: false`) — native momentum on mobile is intentional.
- R3F Canvas uses `dpr={[1, 1.25]}` on mobile, `[1, 1.75]` on desktop.
- Goddess images lazy-load; wall keeps all 10 in DOM for continuity during the emerge animation.
- `prefers-reduced-motion` respected globally.

## Known future TODOs

- Extract `Pillar`, `Seal`, `DotRing` into their own files when they grow
- Wire real form submission in Footer CTA
- i18n layer if DE toggle is later needed
- Replace `WaveMark` placeholder path with the exact brand vector

---

© 2026 EmpireDom Holding GmbH. Built in reverence. 18+ only.
