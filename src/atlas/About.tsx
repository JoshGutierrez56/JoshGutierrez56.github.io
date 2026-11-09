import { CareerLandscape } from "./ChapterArt";
import { useState } from "react";
import { career, projectUrl } from "./data";
import { PageHeading, Arrow } from "./Shared";
import { github } from "../content";
import Contact from "./Contact";

export default function About() {
  const [chapter, setChapter] = useState(4);
  const item = career[chapter];
  return (
    <div className="a-shell">
      <PageHeading
        label="ABOUT / JOSH GUTIERREZ"
        title="An investment perspective."
        accent="A research instinct."
        description="My work connects portfolio analytics, fixed-income communication, and hands-on investment research. I care about the point where an interesting model becomes a decision someone can explain."
      />
      <section className="a-about-intro">
        <div className="a-identity-card">
          <div className="a-identity-mark" aria-hidden="true">
            JG<span>.</span>
          </div>
          <div>
            <span className="a-eyebrow">JOSH GUTIERREZ</span>
            <h2>
              Investments.
              <br />
              Models.
              <br />
              <em>Judgment.</em>
            </h2>
            <a href={github} target="_blank" rel="noreferrer">
              Explore my public work <Arrow />
            </a>
          </div>
        </div>
        <div className="a-about-text">
          <p className="a-eyebrow">WHAT CONNECTS THE WORK</p>
          <h2>The question comes first.</h2>
          <p>
            A portfolio constraint, a disclosure change, a model that looks
            convincing: each is a starting point, not a conclusion. I’m
            interested in what survives the next question.
          </p>
          <p>
            My professional experience spans Prime Buchholz, Wellington
            Management, Loomis Sayles, and AEW Capital Management. My MBA and MS
            in Finance at Northeastern added graduate investment study and
            student-fund research leadership to that institutional context.
          </p>
          <p>
            The research here is independent and student work, not an employer
            portfolio or endorsement. I direct the questions, investment
            interpretation, and project development, with AI assistance in
            implementation.
          </p>
          <a className="a-text-link" href="/methods/">
            Explore the research method <Arrow />
          </a>
        </div>
      </section>
      <section className="a-section">
        <div className="a-section-head">
          <div>
            <p className="a-eyebrow">THE PROFESSIONAL THREAD</p>
            <h2>
              Context accumulates.
              <br />
              <em>So do better questions.</em>
            </h2>
          </div>
          <p>
            Select a chapter. Related independent research shows a connection in
            subject matter—not work produced for an employer.
          </p>
        </div>
        <div
          className="a-timeline-controls"
          role="group"
          aria-label="Career chapters"
        >
          {career.map((c, i) => (
            <button
              key={c.label}
              aria-pressed={chapter === i}
              onClick={() => setChapter(i)}
            >
              <span>{c.period}</span>
              <strong>{c.label}</strong>
            </button>
          ))}
        </div>
        <CareerLandscape chapter={chapter} />
        <article className="a-career-chapter" key={chapter} aria-live="polite">
          <div>
            <span className="a-eyebrow">
              CHAPTER 0{chapter + 1} / {item.period}
            </span>
            <h3>{item.institution}</h3>
            <p className="a-career-role">{item.role}</p>
            <p>{item.text}</p>
          </div>
          <aside role="note">
            <span className="a-eyebrow">A QUESTION THAT CONNECTS</span>
            <h4>{item.question}</h4>
            <a href={projectUrl(item.related)}>
              Explore related independent research <Arrow />
            </a>
          </aside>
        </article>
      </section>
      <section className="a-education">
        <div>
          <p className="a-eyebrow">EDUCATION</p>
          <h2>
            Finance and economics.
            <br />
            <em>In conversation.</em>
          </h2>
        </div>
        <div>
          <article>
            <span>2026 / NORTHEASTERN UNIVERSITY</span>
            <h3>MBA + MS in Finance</h3>
            <p>
              D’Amore-McKim School of Business
              <br />
              Investments · Mutual Fund Management
            </p>
          </article>
          <article>
            <span>2019 / HAMILTON COLLEGE</span>
            <h3>BA in Economics</h3>
            <p>Foundations in economic reasoning and analysis.</p>
          </article>
        </div>
      </section>
      <Contact />
    </div>
  );
}
