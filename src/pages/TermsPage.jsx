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

function Clause({ id, children }) {
  return (
    <div className="flex gap-4">
      <span className="w-10 flex-shrink-0 font-mono text-[11px] text-ed-gray/35 pt-[2px]">{id}</span>
      <p>{children}</p>
    </div>
  );
}

function Bullet({ children }) {
  return (
    <li className="flex gap-3">
      <span className="mt-[7px] h-[3px] w-[3px] flex-shrink-0 bg-ed-gold/50" />
      <span>{children}</span>
    </li>
  );
}

export default function TermsPage() {
  return (
    <LegalLayout
      title="Terms & Conditions"
      subtitle="EmpireDom Holding GmbH (FN 556925h) · Version 18.06.2025"
    >
      <Section num="I." title="General Provisions">
        <Clause id="1.1">
          These General Terms and Conditions (hereinafter referred to as "GTC") apply to
          all services and contracts concluded and offered by EmpireDom Holding GmbH
          (hereinafter referred to as "Provider") with users, and govern the use thereof.
        </Clause>
        <Clause id="1.2">
          These GTC also apply to all future contracts and services with users.
          Amendments to the GTC shall be deemed approved and apply in their amended
          version to existing contracts and services, unless the user objects to the
          amended GTC in writing within one month of being notified thereof. The amended
          GTC shall be transmitted electronically (via email). If the user objects in due
          time, the previous version of the GTC shall remain applicable. In such a case,
          the Provider reserves the right to terminate the contract with the objecting
          user with 14 days' notice.
        </Clause>
        <Clause id="1.3">
          By registering, the user explicitly accepts these GTC and the Privacy Policy.
          The user also confirms having taken note of the instructions regarding
          withdrawal and revocation pursuant to the Austrian Distance and Off-Premises
          Contracts Act (FAGG) (see Section 14).
        </Clause>
        <Clause id="1.4">The contractual language is German or English.</Clause>
        <Clause id="1.5">
          The Provider's services may neither be actively used nor passively consumed by
          persons under 18 years of age. Any access by minors is strictly prohibited due
          to legal provisions for the protection of minors.
        </Clause>
      </Section>

      <div className="h-px bg-ed-shadow" />

      <Section num="II." title="Registration / Conclusion of Contract">
        <Clause id="2.1">
          To use the Provider's services, registration is required. The user must provide
          an email address, a password of their choice, and proof of being of legal age.
          If the user registers via an existing account with X, Instagram, Facebook,
          Google+, or similar social media platforms, they must allow the Provider access
          to basic profile data (first name, date of birth, gender) and email address.
        </Clause>
        <Clause id="2.2">
          The user is obligated to provide truthful and complete information during
          registration. The Provider reserves the right to verify this information.
          Pseudonyms are permitted.
        </Clause>
        <Clause id="2.3">
          To ensure that minors cannot access the platform, the user must provide proof
          of legal age via a verification service (e.g., IDnow, Yoti, or similar). Until
          age verification is successfully completed, the user will not have access to
          EmpireDom Holding GmbH's content, but only to content rated suitable for all
          ages (FSK 0).
        </Clause>
        <Clause id="2.4">
          There is no entitlement to registration. The Provider reserves the right to
          reject a registration without providing reasons.
        </Clause>
        <Clause id="2.5">
          Each user may create only one account. Multiple registrations are not
          permitted.
        </Clause>
        <Clause id="2.6">
          To confirm the registration, a confirmation email will be sent to the email
          address provided by the user. The registration process is only complete once
          the user clicks the activation link contained in the email.
        </Clause>
        <Clause id="2.7">
          Upon completion of registration and successful verification of age, the user
          may use the Provider's services.
        </Clause>
        <Clause id="2.8">
          Registration establishes a contractual relationship between the Provider and
          the user.
        </Clause>
        <Clause id="2.9">
          Registration is free of charge. Use of the Provider's services is partially
          free, but mostly subject to payment. Payment is generally made through monthly
          paid subscriptions.
        </Clause>
      </Section>

      <div className="h-px bg-ed-shadow" />

      <Section num="III." title="Services">
        <Clause id="3.1">
          The Provider offers paid access to its social media platform featuring fetish
          content, with a focus on Findom and Femdom. The content may include sexual,
          erotic, and fetish-related representations, which are strictly reserved for
          adult users only.
        </Clause>
        <Clause id="3.2">
          On the EmpireDom platform, users are introduced to content creators who produce
          videos and livestreams. Users are offered various interaction options, including:
        </Clause>
        <ul className="ml-14 space-y-1.5 list-none">
          <Bullet>Participating in video chats and livestreams, as well as viewing recorded videos;</Bullet>
          <Bullet>Interacting with content creators via chat and like functions;</Bullet>
          <Bullet>The ability to voluntarily send monetary amounts ("donations") to content creators.</Bullet>
        </ul>
        <Clause id="3.3">
          The Provider is entitled at any time to make changes to the services provided,
          provided such changes are technically feasible and legally permissible. No
          additional costs will arise for the user. The user will be informed of such
          changes.
        </Clause>
      </Section>

      <div className="h-px bg-ed-shadow" />

      <Section num="IV." title="User Obligations and Code of Conduct">
        <Clause id="4.1">
          To fully use the Provider's services, the user must have a suitable, up-to-date
          technical device and regularly update its software.
        </Clause>
        <Clause id="4.2">
          Accessing the Provider's services requires an internet-enabled device and use
          of the device's storage and communication functions. The user shall bear all
          connection and data costs incurred through internet or mobile service providers.
        </Clause>
        <Clause id="4.3">
          The user is obligated to treat their access credentials strictly confidential
          and protect them from third-party access—especially from minors. If the user
          suspects third-party access, they must immediately change their password and
          inform the Provider.
        </Clause>
        <Clause id="4.4">
          The user agrees to use the Provider's services only for their intended purposes
          and to refrain from actions that could harm the Provider, its staff, or other
          users.
        </Clause>
        <Clause id="4.5">
          The user commits to using the services properly and observing the following
          rules:
        </Clause>
        <ul className="ml-14 space-y-1.5 list-none">
          <Bullet>Entering personal data in chats is at the user's own risk; providing private email addresses, phone numbers, or hyperlinks in user profiles or livestream chats is not permitted.</Bullet>
          <Bullet>Publishing third-party data without their explicit consent is prohibited.</Bullet>
          <Bullet>The user agrees not to threaten, harass, or violate the rights of content creators, third parties, or other users.</Bullet>
          <Bullet>Using the services for commercial purposes—advertising, product promotion, spam—is not allowed.</Bullet>
          <Bullet>The user confirms not to upload data containing viruses or software protected by third-party copyrights.</Bullet>
          <Bullet>Recording or saving videos, livestreams, or other platform content is strictly prohibited. Screenshots are explicitly forbidden.</Bullet>
        </ul>
        <Clause id="4.6">
          Registration requires valid proof of age confirming the user is at least 18
          years old. By registering, the user confirms they are of legal age and that
          access to sexually explicit content is legally permitted under the laws of
          their country of residence.
        </Clause>
        <Clause id="4.7">
          The user shall fully indemnify and hold harmless the Provider for all damages
          and third-party claims arising from violations of the user obligations outlined
          in Section 4.
        </Clause>
      </Section>

      <div className="h-px bg-ed-shadow" />

      <Section num="V." title="Usage and Copyright">
        <p>
          The Provider is the sole holder of all reproduction, distribution, adaptation,
          and intellectual property rights in relation to the social media database and
          the individual contents contained therein.
        </p>
        <p>
          The use of the database and its contents, materials, trademarks, and trade
          names is permitted exclusively for the purposes set out in these Terms and
          Conditions.
        </p>
        <p>
          Any commercial use of content—in particular creating, sharing, or
          redistributing screenshots, recordings, or other materials—is strictly
          prohibited.
        </p>
      </Section>

      <div className="h-px bg-ed-shadow" />

      <Section num="VI." title="Availability and Warranty">
        <Clause id="6.1">
          The user acknowledges that software cannot be developed and provided entirely
          free of errors according to the current state of technology.
        </Clause>
        <Clause id="6.2">
          The Provider does not guarantee uninterrupted availability of its services.
          Downtime due to maintenance, software updates, or circumstances beyond the
          Provider's control cannot be ruled out. The user agrees not to assert any
          claims for damages due to such outages.
        </Clause>
        <Clause id="6.3">
          The Provider shall not be liable for defects caused by changes to the software
          or configuration made by the user or third parties after commissioning.
        </Clause>
        <Clause id="6.4">
          The Provider assumes no warranty for defects in performance caused by the
          user's own systems (hardware or software).
        </Clause>
        <Clause id="6.5">
          The Provider does not guarantee that its services will meet the user's
          expectations.
        </Clause>
      </Section>

      <div className="h-px bg-ed-shadow" />

      <Section num="VII." title="Liability">
        <Clause id="7.1">
          Unless contrary to mandatory law, the Provider is only liable for damages
          caused in connection with this contract by the Provider, its employees, or
          agents in cases of gross negligence or intent. This limitation of liability
          does not apply to personal injury.
        </Clause>
        <Clause id="7.2">
          The Provider shall not be liable for consequential damages, lost profits, data
          loss, or financial losses.
        </Clause>
        <Clause id="7.3">
          The Provider shall not be liable for content shared by users or third parties
          on the platform, nor for any damages arising therefrom.
        </Clause>
      </Section>

      <div className="h-px bg-ed-shadow" />

      <Section num="VIII." title="Payment Terms">
        <Clause id="8.1">
          The user's monthly payments in the form of a subscription must be paid in full
          in advance each month. (The due date is the first day of each month.)
        </Clause>
        <Clause id="8.2">
          If the user fails to pay the monthly fee, the Provider is entitled to
          temporarily suspend service access or withdraw from the contract.
        </Clause>
        <Clause id="8.3">The user has no right of retention.</Clause>
        <Clause id="8.4">
          For out-of-court collection costs, the user shall pay a flat fee of 15% of the
          outstanding amount as compensation for administrative and collection efforts.
        </Clause>
      </Section>

      <div className="h-px bg-ed-shadow" />

      <Section num="IX." title="Suspension of Services">
        <p>
          The Provider is entitled to suspend the service, in whole or in part, if the
          security of the service or the safety of users is at risk, or if continued
          operation becomes economically unreasonable. The Provider shall inform the user
          without undue delay.
        </p>
      </Section>

      <div className="h-px bg-ed-shadow" />

      <Section num="X." title="Sanctions">
        <p>
          In the event of a user's violation of these Terms and Conditions, the Provider
          reserves the right to:
        </p>
        <ul className="ml-4 space-y-1.5 list-none">
          <Bullet>Issue a warning to the user;</Bullet>
          <Bullet>Temporarily or permanently suspend the user;</Bullet>
          <Bullet>Terminate the contractual relationship early and delete the user's profile.</Bullet>
        </ul>
      </Section>

      <div className="h-px bg-ed-shadow" />

      <Section num="XI." title="Duration / Termination">
        <Clause id="11.1">
          This contract is concluded for an indefinite period. The user may terminate the
          contractual relationship at any time in writing. The Provider is entitled to
          terminate the contract with one month's notice effective at the end of any
          calendar month.
        </Clause>
        <Clause id="11.2">
          The Provider is entitled to terminate this contract without notice and with
          immediate effect for good cause, particularly if the user violates Sections
          4.2–4.5, Section 5, or Section 8.1 of these GTC.
        </Clause>
      </Section>

      <div className="h-px bg-ed-shadow" />

      <Section num="XII." title="Confidentiality / Data Protection">
        <Clause id="12.1">
          The user agrees to treat all emails, messages, or data from other users and
          content creators received in connection with the use of the platform
          confidentially and not to disclose such data to third parties without prior
          written consent.
        </Clause>
        <Clause id="12.2">
          Both the Provider and the user are obliged to comply with the provisions of the
          Austrian Data Protection Act (DSG), the GDPR, and any other applicable
          statutory confidentiality obligations.
        </Clause>
        <Clause id="12.3">
          The Provider processes the personal data of the user that is necessary for the
          fulfillment of the contract. Detailed information can be found in our{' '}
          <a
            href="/privacy-policy"
            className="text-ed-gold/80 hover:text-ed-gold transition-colors"
          >
            Privacy Policy
          </a>
          .
        </Clause>
        <Clause id="12.4">
          The obligations above remain in effect even after the termination of this
          contractual relationship.
        </Clause>
      </Section>

      <div className="h-px bg-ed-shadow" />

      <Section num="XIII." title="Final Provisions">
        <Clause id="13.1">
          All legally binding declarations under this contract must be made in writing
          and sent to the last known email address of the respective contracting party.
        </Clause>
        <Clause id="13.2">
          The section titles used in this agreement serve solely to enhance clarity and
          shall not be used for the interpretation of the contract.
        </Clause>
      </Section>

      <div className="h-px bg-ed-shadow" />

      <Section num="XIV." title="Right of Withdrawal">
        <Clause id="14.1">
          In the case of consumer contracts, the user may withdraw from a contract
          concluded via distance selling within 14 days of contract conclusion without
          giving any reason.
        </Clause>
        <Clause id="14.2">
          If a withdrawal is made, the user's profile will be deleted from the Provider's
          database and further use of the paid services will no longer be possible.
        </Clause>
        <Clause id="14.3">
          To exercise the right of withdrawal, the consumer may use the standard
          withdrawal form provided in Annex B.
        </Clause>
        <Clause id="14.4">
          Activation of the Provider's services is considered the start of service
          delivery. By completing registration, the user expressly agrees that service
          may begin before the end of the statutory withdrawal period.
        </Clause>
        <Clause id="14.5">
          The user hereby acknowledges and expressly agrees that by completing initial
          registration (activation link), the Provider's performance begins before the
          end of the withdrawal period under § 11 FAGG.
        </Clause>
      </Section>

      <div className="h-px bg-ed-shadow" />

      <Section title="Annex A — Sample Withdrawal Instruction">
        <p>
          You have the right to withdraw from this contract within fourteen days without
          giving any reason. The withdrawal period is fourteen days from the day the
          contract is concluded.
        </p>
        <p>
          To exercise your right of withdrawal, you must inform us by means of a clear
          declaration (e.g., a letter sent by post or an email):
        </p>
        <div className="mt-2 space-y-1 text-[13px] font-[300] text-ed-gray/60 border border-ed-shadow p-4">
          <p>EmpireDom Holding GmbH</p>
          <p>Gewerbering 6, 2440 Moosbrunn</p>
          <p>Phone: +43 664 3444471</p>
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
        <p>
          To meet the withdrawal deadline, it is sufficient for you to send the
          notification before the withdrawal period expires. If you withdraw, your
          profile in the database of EmpireDom Holding GmbH will be deleted, and it will
          no longer be possible to use the paid services of the social media platform.
        </p>
      </Section>

      <div className="h-px bg-ed-shadow" />

      <Section title="Annex B — Sample Withdrawal Form">
        <p>
          If you wish to withdraw from the contract, please fill out this form and return
          it to:
        </p>
        <div className="mt-2 space-y-1 text-[13px] font-[300] text-ed-gray/60 border border-ed-shadow p-4">
          <p>EmpireDom Holding GmbH</p>
          <p>Gewerbering 6, 2440 Moosbrunn</p>
          <p>Phone: +43 664 3444471</p>
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
      </Section>
    </LegalLayout>
  );
}
