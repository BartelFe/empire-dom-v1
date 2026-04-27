/* -----------------------------------------------------------
   AudioSection · Three ambient tracks, single-playback.
   Slim horizontal cards, gold accents, custom HTML5 controls.
   ----------------------------------------------------------- */

import { useRef, useState, useEffect, useCallback } from 'react';

const TRACKS = [
  { id: 1, num: '01', title: 'Empire Dom',            src: '/assets/audio/audio_empiredom.mp3' },
  { id: 2, num: '02', title: 'Step Into Your Power',  src: '/assets/audio/audio_stepintoyourpower.mp3' },
  { id: 3, num: '03', title: 'Command Wealth',        src: '/assets/audio/audio_commandwealth.mp3' },
];

function fmt(s) {
  if (!s || isNaN(s)) return '--:--';
  const m = Math.floor(s / 60);
  return `${m}:${String(Math.floor(s % 60)).padStart(2, '0')}`;
}

export default function AudioSection() {
  const audioRefs  = useRef([]);
  const [active, setActive]     = useState(null);   // index currently playing
  const [progress, setProgress] = useState([0, 0, 0]);
  const [elapsed,  setElapsed]  = useState([0, 0, 0]);
  const [durations, setDurations] = useState([0, 0, 0]);

  /* ---- Single-playback toggle ---- */
  const toggle = useCallback((idx) => {
    const audio = audioRefs.current[idx];
    if (!audio) return;

    if (active === idx) {
      audio.pause();
      setActive(null);
    } else {
      // pause any currently playing track
      audioRefs.current.forEach((a, i) => { if (i !== idx && a) a.pause(); });
      audio.play().catch(() => {});
      setActive(idx);
    }
  }, [active]);

  /* ---- Seek on progress bar click ---- */
  const seek = (idx, e) => {
    const audio = audioRefs.current[idx];
    if (!audio || !audio.duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    audio.currentTime = ratio * audio.duration;
  };

  /* ---- Notify Hero to mute/unmute video ---- */
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent('ed:audiostate', { detail: { playing: active !== null } }),
    );
  }, [active]);

  /* ---- Attach audio event listeners ---- */
  useEffect(() => {
    const cleanups = TRACKS.map((_, idx) => {
      const audio = audioRefs.current[idx];
      if (!audio) return () => {};

      const onTime = () => {
        const p = audio.duration ? audio.currentTime / audio.duration : 0;
        setProgress(prev => { const n = [...prev]; n[idx] = p;                 return n; });
        setElapsed (prev => { const n = [...prev]; n[idx] = audio.currentTime; return n; });
      };
      const onEnded = () => setActive(null);
      const onMeta  = () => {
        setDurations(prev => { const n = [...prev]; n[idx] = audio.duration; return n; });
      };

      audio.addEventListener('timeupdate',     onTime);
      audio.addEventListener('ended',          onEnded);
      audio.addEventListener('loadedmetadata', onMeta);
      return () => {
        audio.removeEventListener('timeupdate',     onTime);
        audio.removeEventListener('ended',          onEnded);
        audio.removeEventListener('loadedmetadata', onMeta);
      };
    });
    return () => cleanups.forEach(c => c());
  }, []);

  return (
    <div className="relative z-10 mx-auto max-w-4xl px-[4vw] pt-[8vh] pb-[4vh]">
      {/* Section label */}
      <div className="mb-8 flex items-center gap-4">
        <div className="h-px flex-1 bg-ed-shadow" />
        <span className="text-[9px] tracking-[0.55em] uppercase text-ed-gold/50">
          The Frequency
        </span>
        <div className="h-px flex-1 bg-ed-shadow" />
      </div>

      <div className="space-y-[3px]">
        {TRACKS.map((track, idx) => {
          const isPlaying = active === idx;
          return (
            <div
              key={track.id}
              className={`group flex items-center gap-5 border px-5 py-[14px] transition-colors duration-400 ${
                isPlaying
                  ? 'border-ed-gold/35'
                  : 'border-ed-shadow hover:border-ed-gold/20'
              }`}
            style={{
              background: isPlaying
                ? 'radial-gradient(ellipse 160% 220% at 50% 50%, rgba(196,154,108,0.07) 0%, transparent 75%)'
                : undefined,
            }}
            onMouseEnter={(e) => {
              if (!isPlaying)
                e.currentTarget.style.background =
                  'radial-gradient(ellipse 160% 220% at 50% 50%, rgba(196,154,108,0.04) 0%, transparent 75%)';
            }}
            onMouseLeave={(e) => {
              if (!isPlaying) e.currentTarget.style.background = '';
            }}
            >
              {/* Play / Pause */}
              <button
                onClick={() => toggle(idx)}
                aria-label={isPlaying ? 'Pause' : 'Play'}
                className={`flex h-8 w-8 flex-shrink-0 items-center justify-center border transition-colors duration-300 ${
                  isPlaying
                    ? 'border-ed-gold bg-ed-gold text-ed-black'
                    : 'border-ed-gold/40 text-ed-gold group-hover:border-ed-gold/70'
                }`}
              >
                {isPlaying ? (
                  <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor">
                    <rect x="0" y="0" width="3" height="12" />
                    <rect x="7" y="0" width="3" height="12" />
                  </svg>
                ) : (
                  <svg width="10" height="12" viewBox="0 0 10 12" fill="currentColor">
                    <polygon points="0,0 10,6 0,12" />
                  </svg>
                )}
              </button>

              {/* Track info */}
              <div className="flex min-w-0 flex-1 flex-col gap-[7px]">
                <div className="flex items-baseline justify-between gap-3">
                  <div className="flex items-baseline gap-3 min-w-0">
                    <span className="font-mono text-[9px] tracking-[0.3em] text-ed-gray/35 flex-shrink-0">
                      {track.num}
                    </span>
                    <span className="truncate text-[10px] tracking-[0.38em] uppercase text-ed-gray/75">
                      {track.title}
                    </span>
                  </div>
                  <span className="flex-shrink-0 font-mono text-[9px] text-ed-gray/35">
                    {fmt(elapsed[idx])} / {fmt(durations[idx])}
                  </span>
                </div>

                {/* Progress bar */}
                <div
                  className="relative h-[1px] w-full cursor-pointer"
                  style={{ background: 'rgba(196,154,108,0.15)' }}
                  onClick={(e) => seek(idx, e)}
                >
                  <div
                    className="absolute left-0 top-0 h-full"
                    style={{
                      width: `${progress[idx] * 100}%`,
                      background: 'var(--ed-gold)',
                      transition: isPlaying ? 'none' : 'width 0.1s',
                    }}
                  />
                  {/* Playhead */}
                  {isPlaying && progress[idx] > 0 && (
                    <div
                      className="absolute top-1/2 h-[5px] w-[5px] -translate-x-1/2 -translate-y-1/2 rounded-full"
                      style={{ left: `${progress[idx] * 100}%`, background: 'var(--ed-gold)' }}
                    />
                  )}
                </div>
              </div>

              {/* Hidden audio element */}
              <audio
                ref={(el) => { audioRefs.current[idx] = el; }}
                src={track.src}
                preload="metadata"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
