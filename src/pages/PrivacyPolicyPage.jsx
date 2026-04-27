import LegalLayout from '../components/LegalLayout.jsx';

function Section({ num, title, children }) {
  return (
    <div>
      <h2 className="mb-4 font-[700] text-[13px] tracking-[0.12em] uppercase text-ed-gold/80">
        {num && <span className="mr-2 font-mono text-ed-gold/40">{num}</span>}
        {title}
      </h2>
      <div className="space-y-3 text-[13px] font-[300] leading-[1.85] text-ed-gray/75">
        {children}
      </div>
    </div>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <LegalLayout title="Privacy Policy">
      <Section num="I." title="Duty to Provide Information">
        <p>
          The protection of your personal data is of particular concern to us. We
          therefore process your personal data exclusively in accordance with the
          applicable legal provisions (GDPR, TKG 2003).
        </p>
        <p>
          This privacy notice informs you about the key aspects of data processing
          on our website—specifically, which data is collected, how we use it, and
          what rights you have.
        </p>
        <p>
          When you visit our website, your IP address, the start and end of your
          session are recorded for the duration of the session. This is technically
          necessary and constitutes a legitimate interest in accordance with Article
          6(1)(f) of the GDPR. Unless otherwise specified below, this data is not
          further processed by us.
        </p>
      </Section>

      <div className="h-px bg-ed-shadow" />

      <Section num="II." title="Personal Data">
        <p>We process the following categories of data:</p>
        <ul className="ml-4 space-y-1.5 list-none">
          {[
            'Name, email address, and optionally a pseudonym;',
            'Message content (e.g., when contacting us);',
            'Preferences, interests, or information on sexual preferences (only if voluntarily provided);',
            'IP address, browser data, and access times (automatically captured by the server).',
          ].map((item) => (
            <li key={item} className="flex gap-3">
              <span className="mt-[7px] h-[3px] w-[3px] flex-shrink-0 bg-ed-gold/50" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p>
          The provision of certain data (such as fetish preferences) may be
          voluntary. Such data may qualify as sensitive personal data within the
          meaning of Article 9 GDPR and will only be processed with your explicit
          consent.
        </p>
      </Section>

      <div className="h-px bg-ed-shadow" />

      <Section num="III." title="Purpose of Data Processing">
        <p>We process your data for the following purposes:</p>
        <ul className="ml-4 space-y-1.5 list-none">
          {[
            'Responding to inquiries (e.g., via email or contact form);',
            'Facilitating contact or service matchmaking;',
            'Communication within the context of Dom/Sub dynamics (if supported by the platform);',
            'Technical operation and optimization of the website;',
            'Payment processing in the context of voluntary financial contributions (e.g., Findom services).',
          ].map((item) => (
            <li key={item} className="flex gap-3">
              <span className="mt-[7px] h-[3px] w-[3px] flex-shrink-0 bg-ed-gold/50" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p>Legal bases for this processing include:</p>
        <ul className="ml-4 space-y-1.5 list-none">
          {[
            'Article 6(1)(a) GDPR – Consent;',
            'Article 6(1)(b) GDPR – Performance of a contract or pre-contractual measures;',
            'Article 6(1)(f) GDPR – Legitimate interest in proper website functionality;',
            'Article 9(2)(a) GDPR – Explicit consent for processing sensitive data.',
          ].map((item) => (
            <li key={item} className="flex gap-3">
              <span className="mt-[7px] h-[3px] w-[3px] flex-shrink-0 bg-ed-gold/50" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </Section>

      <div className="h-px bg-ed-shadow" />

      <Section num="IV." title="Contacting Us">
        <p>
          When you contact us via email or contact form, the data you provide will
          be stored by us for twelve months for the purpose of processing your
          inquiry and any follow-up questions. This data will not be shared without
          your consent.
        </p>
      </Section>

      <div className="h-px bg-ed-shadow" />

      <Section num="V." title="Payments and Findom Services">
        <p>
          For voluntary payments (e.g., as part of Findom interactions), payment
          data is processed by the respective payment provider (e.g., PayPal). We
          do not store any payment data ourselves but may receive transaction
          confirmations.
        </p>
        <p>
          Legal basis: Article 6(1)(b) GDPR. The privacy policies of the
          respective payment service providers apply.
        </p>
      </Section>

      <div className="h-px bg-ed-shadow" />

      <Section num="VI." title="Cookies">
        <p>
          Our website uses cookies—small text files stored on your device via your
          browser. They do not cause any damage.
        </p>
        <p>
          Cookies help make our offering more user-friendly. Some cookies remain
          stored on your device until you delete them and allow us to recognize your
          browser on your next visit. If you do not wish this, you can configure
          your browser to inform you before cookies are set and allow them only on a
          case-by-case basis. Please note that disabling cookies may limit the
          functionality of our website.
        </p>
      </Section>

      <div className="h-px bg-ed-shadow" />

      <Section num="VII." title="Your Rights">
        <p>
          Any individual whose personal data is processed has the right—granted by
          European law—to request information, free of charge, about the personal
          data stored about them, and to receive a copy of such information at any
          time. This includes:
        </p>
        <ul className="ml-4 space-y-1.5 list-none">
          {[
            'The purposes of the processing;',
            'The categories of personal data being processed;',
            'The recipients or categories of recipients to whom the data has been or will be disclosed, particularly if located in third countries or international organizations;',
            'The planned storage period, or, if not possible, the criteria used to determine that period;',
            'The right to rectification or erasure of personal data, or restriction of processing, or to object to processing;',
            'The existence of a right to lodge a complaint with a supervisory authority;',
            'If the data was not collected from the data subject: all available information about its origin;',
            'The existence of automated decision-making, including profiling, as per Article 22(1) and (4) GDPR.',
          ].map((item) => (
            <li key={item} className="flex gap-3">
              <span className="mt-[7px] h-[3px] w-[3px] flex-shrink-0 bg-ed-gold/50" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <p>
          In general, you have the right to access, rectify, delete, restrict,
          transfer, withdraw consent, and object to the processing of your personal
          data. If you believe your data is being processed in violation of data
          protection law, you may lodge a complaint with the Austrian Data
          Protection Authority:{' '}
          <a
            href="https://www.dsb.gv.at"
            target="_blank"
            rel="noopener noreferrer"
            className="text-ed-gold/80 hover:text-ed-gold transition-colors"
          >
            www.dsb.gv.at
          </a>
          , email:{' '}
          <a
            href="mailto:dsb@dsb.gv.at"
            className="text-ed-gold/80 hover:text-ed-gold transition-colors"
          >
            dsb@dsb.gv.at
          </a>
          .
        </p>
      </Section>

      <div className="h-px bg-ed-shadow" />

      <Section num="VIII." title="Protection of Minors">
        <p>
          Our services are strictly intended for adults. We do not knowingly process
          data of minors. If we become aware of such processing, we will delete the
          data immediately.
        </p>
      </Section>

      <div className="h-px bg-ed-shadow" />

      <Section num="IX." title="Disclosure to Third Parties">
        <p>
          Data is only shared with third parties when necessary for contract
          performance (e.g., hosting or payment processing) or if you have
          explicitly consented. Transfers to third countries may occur when using
          specific tools (as disclosed in the cookie banner).
        </p>
      </Section>

      <div className="h-px bg-ed-shadow" />

      <Section num="X." title="Changes to the Privacy Policy">
        <p>
          This privacy policy may be updated at any time to reflect legal changes or
          modifications to our offerings. The current version is always available on
          our website.
        </p>
      </Section>

      <div className="h-px bg-ed-shadow" />

      <Section num="XI." title="Contact Information">
        <p>You can reach us at the following address:</p>
        <div className="mt-2 space-y-1 text-[13px] font-[300] text-ed-gray/60">
          <p>EmpireDom Holding GmbH</p>
          <p>Gewerbering 6, 2440 Moosbrunn, Austria</p>
          <p>
            Email:{' '}
            <a
              href="mailto:office@empiredom.com"
              className="text-ed-gold/80 hover:text-ed-gold transition-colors"
            >
              office@empiredom.com
            </a>
          </p>
        </div>
        <p className="mt-3">
          For data protection concerns, please contact our Data Protection Officer,
          Maximilian Kroll,{' '}
          <a
            href="mailto:office@empiredom.com"
            className="text-ed-gold/80 hover:text-ed-gold transition-colors"
          >
            office@empiredom.com
          </a>
          .
        </p>
      </Section>
    </LegalLayout>
  );
}
