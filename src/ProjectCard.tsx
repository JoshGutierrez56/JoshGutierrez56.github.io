import type { Project } from "./content";
import ProjectVisual from "./ProjectVisual";
import { stories } from "./stories";
import { outcomes } from "./outcomes";

type ProjectCardProps = {
  project: Project;
  expanded: boolean;
  onToggle: () => void;
  number?: string;
  className?: string;
  embedded?: boolean;
};

function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" width="18" height="18">
      <path
        d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h15m-6-6 6 6-6 6"}
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ProjectCard({
  project,
  expanded,
  onToggle,
  number,
  className,
  embedded = false,
}: ProjectCardProps) {
  const story = stories[project.id];
  const outcome = outcomes[project.id];

  return (
    <article
      className={["p-story-card", className].filter(Boolean).join(" ")}
      id={embedded ? undefined : `project-${project.id}`}
      tabIndex={-1}
      aria-labelledby={`title-${project.id}`}
    >
      <div className="p-story-copy p-story-lead">
        <div className="p-story-kicker"><span>{number ?? project.number} / {project.category}</span><span className="p-status">{project.status}</span></div>
        <h3 id={`title-${project.id}`} tabIndex={-1}>{project.title}</h3>
        <div className="p-story-takeaway"><span className="p-label">{outcome.kind}</span><p>{outcome.finding}</p></div>
        <p className="p-story-implication"><strong>Why it matters.</strong> {outcome.implication}</p>
        <p className="p-story-scope">{story.evidenceNote}</p>
      </div>
      <div className="p-story-visual"><ProjectVisual id={project.id} /></div>
      <div className="p-story-copy p-story-support">
        <details className="p-story-detail" open={expanded}>
          <summary onClick={(event) => {
            event.preventDefault();
            onToggle();
          }}>
            <span>{expanded ? "Close the evidence" : "Explore the evidence"}</span><span aria-hidden="true">{expanded ? "−" : "+"}</span>
          </summary>
          <div className="p-story-expanded">
            <div className="p-short-story"><p className="p-eyebrow">The result in context</p><p>{project.result}</p></div>
            <div className="p-story-chapters">
              <section><h4>What I built</h4><p>{project.contribution}</p></section>
              <section><h4>How to interpret it</h4><p>{project.limitation}</p></section>
            </div>
            <details className="p-story-evidence">
              <summary>Method, checks &amp; further questions <span aria-hidden="true">+</span></summary>
              <div>
            <ol className="p-story-workflow" aria-label="How the project works">
              {story.steps.map((step, index) => <li key={step.label}><span className="p-step-number">0{index + 1}</span><div><h4>{step.label}</h4><p>{step.description}</p></div></li>)}
            </ol>
            <div className="p-story-chapters">
              <section><h4>The problem</h4><p>{story.context}</p></section>
              <section><h4>What I built</h4><p>{story.approach}</p></section>
              <section><h4>The key decision</h4><p>{story.decision}</p></section>
              <section><h4>What I learned</h4><p>{story.learning}</p></section>
            </div>
            <div className="p-story-next"><h4>What I would test next</h4><p>{story.nextStep}</p></div>
            <div className="p-discussion"><h4>Go one level deeper</h4><ul>{story.discussion.map((item) => <li key={item}>{item}</li>)}</ul></div>
            <details className="p-story-evidence">
              <summary>Results, methods &amp; boundaries <span aria-hidden="true">+</span></summary>
              <div><p><strong>Result.</strong> {project.result}</p><p><strong>Scope.</strong> {project.limitation}</p><p><strong>Implementation.</strong> {project.contribution}</p>
                <ul className="p-tags" aria-label="Methods">{project.methods.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
            </details>
              </div>
            </details>
            <a className="p-project-permalink" href={`#project-${project.id}`}>Link to this project <Arrow /></a>
          </div>
        </details>
        <div className="p-source-links p-story-links">
          {project.links.map((link) => <a key={link.href} href={link.href} download={link.download || undefined} target={link.href.startsWith("https") ? "_blank" : undefined} rel={link.href.startsWith("https") ? "noreferrer" : undefined}>{link.label}<Arrow diagonal={link.href.startsWith("https")} /></a>)}
        </div>
      </div>
    </article>
  );
}
