import { contactEmail, linkedin } from "../projectSelection";
import { Arrow } from "./Shared";

/** Public, owner-approved destinations. No intermediary form or data collection. */
export function ContactLinks({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`a-contact-links${compact ? " a-contact-links-compact" : ""}`}>
      <a className={compact ? "a-text-link" : "a-contact-email"} href={`mailto:${contactEmail}`}>
        {!compact && <span className="a-eyebrow">EMAIL JOSH</span>}
        <span>{compact ? "Email Josh" : contactEmail}</span>
        <Arrow />
      </a>
      <a className="a-text-link" href={linkedin} target="_blank" rel="noopener noreferrer">
        LinkedIn <Arrow />
        <span className="a-contact-sr"> (opens in a new tab)</span>
      </a>
    </div>
  );
}

export default function Contact() {
  return (
    <section className="a-contact-panel" id="contact" aria-labelledby="contact-title">
      <div className="a-contact-copy">
        <p className="a-eyebrow">LET’S TALK</p>
        <h2 id="contact-title">A question. A role.<br /><em>A conversation.</em></h2>
        <p>For investment research, portfolio analytics, and research engineering opportunities—or a question about the work.</p>
      </div>
      <ContactLinks />
    </section>
  );
}
