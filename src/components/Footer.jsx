/* -----------------------------------------------------------
   Footer · Ascension (Image 5 reference)
   
   Layout:
   • Massive headline "KNEEL, AND THE EMPIRE OPENS." with
     white + gold split in Image 1's style
   • Subline italic
   • Two CTAs side by side (outlined + ghost arrow)
   • Amber spotlight glow continues across the whole footer
   • 3-column footer: brand / Empire links / Contact
   • Bottom imprint strip
   ----------------------------------------------------------- */

import { WaveMark } from '../lib/WaveMark.jsx';
import AudioSection from './AudioSection.jsx';

const NAV = ['The Goddesses', 'The Code', 'The Vault', 'For Goddesses'];
const CONTACT = [
  'EmpireDom Holding GmbH',
  'Gewerbering 6',
  '2440 Moosbrunn · AT',
  'office@empiredom.com',
  'Imprint · Datenschutz · AGB',
];

export default function Footer() {
  return (
    <footer className="scanlines relative w-full overflow-hidden bg-ed-black pt-[14vh]">
      {/* Amber spotlight continues */}
      <div className="vault-glow pointer-events-none absolute inset-0" />

      {/* Side markers */}
      <div className="pointer-events-none absolute left-6 top-[18vh] flex flex-col items-start gap-2">
        <div className="h-10 w-px bg-ed-gold/40" />
        <span className="text-[9px] tracking-[0.5em] uppercase text-ed-gold/60">
          Gate
        </span>
      </div>

      {/* Hero headline */}
      <div className="relative z-10 mx-auto max-w-6xl text-center">
        <h2
          className="font-[900] leading-[0.98] tracking-tight"
          style={{ fontSize: 'clamp(3rem, 9vw, 9rem)' }}
        >
          <span className="text-ed-gray">KNEEL, AND THE</span>
          <br />
          <span className="text-ed-gold">EMPIRE OPENS.</span>
        </h2>

        <p className="mx-auto mt-10 max-w-xl text-[14px] font-[300] italic leading-relaxed text-ed-gray/75">
          Admission is by invitation. Invitation is by demonstrated devotion.
          Demonstration begins with a message.
        </p>

        {/* CTA row */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8">
          <button className="group relative overflow-hidden border border-ed-gold px-12 py-5">
            <span className="absolute inset-0 -translate-x-full bg-ed-gold transition-transform duration-500 ease-out group-hover:translate-x-0" />
            <span className="relative z-10 text-[11px] tracking-[0.4em] uppercase text-ed-gold transition-colors duration-500 delay-100 group-hover:text-ed-black">
              Request Audience
            </span>
          </button>
          <button className="group flex items-center gap-4 text-[11px] tracking-[0.4em] uppercase text-ed-gray">
            <span className="transition-colors group-hover:text-ed-gold">
              I am a Goddess
            </span>
            <span className="inline-block h-px w-10 bg-ed-gold transition-all group-hover:w-16" />
            <span className="text-ed-gold">→</span>
          </button>
        </div>
      </div>

      {/* Audio tracks */}
      <AudioSection />

      {/* Divider */}
      <div className="relative z-10 mx-[4vw] h-px bg-ed-shadow" />

      {/* Footer grid */}
      <div className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-12 px-[4vw] pb-[10vh] pt-[10vh] md:grid-cols-3">
        {/* Brand */}
        <div>
          <WaveMark size={18} />
          <div className="mt-4 font-[900] tracking-[0.2em] text-ed-gold">
            EMPIRE DOM
          </div>
          <div className="mt-2 text-[10px] tracking-[0.4em] uppercase text-ed-gray/50">
            Findom. Femdom. Empiredom.
          </div>
          <p className="mt-6 max-w-xs text-[12px] font-[300] leading-relaxed text-ed-gray/60">
            An exclusive platform for devoted financial submission, built in
            Europe, run by women, enforced by design.
          </p>
        </div>

        {/* Empire */}
        <div>
          <div className="mb-5 text-[10px] tracking-[0.4em] uppercase text-ed-gold/60">
            The Empire
          </div>
          <ul className="space-y-3">
            {NAV.map((l) => (
              <li key={l}>
                <a
                  href="#"
                  className="text-[13px] font-[300] text-ed-gray transition-colors hover:text-ed-gold"
                >
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <div className="mb-5 text-[10px] tracking-[0.4em] uppercase text-ed-gold/60">
            Contact
          </div>
          <ul className="space-y-2 text-[13px] font-[300] text-ed-gray/80">
            {CONTACT.map((l) => (
              <li key={l}>
                {l.includes('@') ? (
                  <a href={`mailto:${l}`} className="hover:text-ed-gold">
                    {l}
                  </a>
                ) : (
                  l
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Monumental clipped text */}
      <h1
        className="mono-gradient relative z-10 whitespace-nowrap text-center font-[900] tracking-tighter select-none"
        style={{
          fontSize: 'clamp(3rem, 18vw, 18rem)',
          lineHeight: 0.82,
          marginBottom: '-2vw',
        }}
      >
        EMPIRE DOM
      </h1>

      {/* Imprint strip */}
      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-t border-ed-shadow px-[4vw] py-6 text-[9px] tracking-[0.4em] uppercase text-ed-gray/40">
        <span>© 2026 EmpireDom Holding GmbH · All authority reserved.</span>
        <span>Built in reverence · 18+ only.</span>
      </div>
    </footer>
  );
}
