import { Link } from 'react-router-dom';
import { WaveMark } from '../lib/WaveMark.jsx';

export default function LegalLayout({ title, subtitle, children }) {
  return (
    <div className="min-h-screen bg-ed-black text-ed-gray">
      {/* Top bar */}
      <header className="sticky top-0 z-50 flex items-center justify-between border-b border-ed-shadow bg-ed-black/95 px-[4vw] py-4 backdrop-blur-sm">
        <Link to="/" className="flex items-center gap-3 opacity-80 transition-opacity hover:opacity-100">
          <WaveMark size={16} />
          <span className="text-[9px] tracking-[0.45em] uppercase text-ed-gold/70">
            Empire Dom
          </span>
        </Link>
        <Link
          to="/"
          className="flex items-center gap-2 text-[9px] tracking-[0.35em] uppercase text-ed-gray/40 transition-colors hover:text-ed-gold"
        >
          <span className="inline-block h-px w-6 bg-ed-gold/40" />
          Back
        </Link>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-3xl px-[5vw] pb-[14vh] pt-[8vh]">
        {/* Page heading */}
        <div className="mb-12">
          <div className="mb-5 flex items-center gap-4">
            <div className="h-px w-8 bg-ed-gold/40" />
            <span className="text-[9px] tracking-[0.5em] uppercase text-ed-gold/50">
              Legal
            </span>
          </div>
          <h1
            className="font-[900] uppercase tracking-[0.06em] text-ed-gold"
            style={{ fontSize: 'clamp(1.75rem, 5vw, 3.5rem)' }}
          >
            {title}
          </h1>
          {subtitle && (
            <p className="mt-3 text-[12px] font-[300] text-ed-gray/45">{subtitle}</p>
          )}
          <div className="mt-8 h-px bg-ed-shadow" />
        </div>

        {/* Body */}
        <div className="legal-content space-y-8">
          {children}
        </div>
      </main>

      {/* Bottom strip */}
      <footer className="border-t border-ed-shadow px-[4vw] py-6 text-center text-[9px] tracking-[0.4em] uppercase text-ed-gray/30">
        © 2026 EmpireDom Holding GmbH · All authority reserved.
      </footer>
    </div>
  );
}
