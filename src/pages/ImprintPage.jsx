import LegalLayout from '../components/LegalLayout.jsx';

function Section({ title, children }) {
  return (
    <div>
      {title && (
        <h2 className="mb-3 text-[10px] tracking-[0.45em] uppercase text-ed-gold/70">
          {title}
        </h2>
      )}
      <div className="space-y-2 text-[13px] font-[300] leading-[1.8] text-ed-gray/75">
        {children}
      </div>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-6">
      <span className="w-48 flex-shrink-0 text-[11px] tracking-[0.1em] text-ed-gray/40">
        {label}
      </span>
      <span>{value}</span>
    </div>
  );
}

export default function ImprintPage() {
  return (
    <LegalLayout title="Imprint">
      <Section title="Company">
        <Row label="Company Name"     value="EmpireDom Holding GmbH" />
        <Row label="Registered Office" value="2440 Moosbrunn, Gewerbering 6" />
        <Row label="Email"            value={<a href="mailto:office@empiredom.com" className="text-ed-gold/80 hover:text-ed-gold transition-colors">office@empiredom.com</a>} />
        <Row label="Managing Director" value="Maximilian Kroll" />
        <Row label="VAT Number"       value="ATU77106739" />
        <Row label="Company Reg. No." value="556925h" />
        <Row label="Commercial Court" value="Regional Court Korneuburg" />
        <Row label="Legal Form"       value="Limited Liability Company (GmbH)" />
      </Section>

      <div className="h-px bg-ed-shadow" />

      <Section title="Business Activities">
        <p>
          Matchmaking services, IT services, development and operation of a
          specialized social media platform for the fetish community, focusing on
          Findom and Femdom.
        </p>
      </Section>

      <div className="h-px bg-ed-shadow" />

      <Section title="Memberships">
        <p>
          Chamber of Commerce – Professional Association for Cinema, Culture, and
          Entertainment Businesses
        </p>
      </Section>

      <div className="h-px bg-ed-shadow" />

      <Section title="Trade Authority">
        <p>District Authority Bruck an der Leitha</p>
      </Section>

      <div className="h-px bg-ed-shadow" />

      <Section title="Applicable Legal Regulations">
        <p>
          Trade Regulation Act 1994 – available at{' '}
          <a
            href="https://www.ris.bka.gv.at"
            target="_blank"
            rel="noopener noreferrer"
            className="text-ed-gold/80 hover:text-ed-gold transition-colors"
          >
            www.ris.bka.gv.at
          </a>
        </p>
      </Section>
    </LegalLayout>
  );
}
