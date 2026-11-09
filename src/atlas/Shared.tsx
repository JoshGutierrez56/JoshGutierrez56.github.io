import { ProjectScene } from "./ProjectIdentity";
import type { Project } from "../content";
import { stories } from "../stories";
import { projectUrl, shortNames, themeFor } from "./data";

export function Arrow({ back = false }: { back?: boolean }) {
  return <span aria-hidden="true">{back ? "↙" : "↗"}</span>;
}
export function PageHeading({
  label,
  title,
  accent,
  description,
}: {
  label: string;
  title: string;
  accent?: string;
  description: string;
}) {
  return (
    <header className="a-page-heading">
      <p className="a-eyebrow">{label}</p>
      <h1 tabIndex={-1}>
        {title}
        {accent && (
          <>
            <br />
            <em>{accent}</em>
          </>
        )}
      </h1>
      <p>{description}</p>
    </header>
  );
}
export function ResearchCard({
  project,
  selected,
  onSave,
}: {
  project: Project;
  selected: boolean;
  onSave: (id: string) => void;
}) {
  return (
    <article className={`a-card ${themeFor(project.category)}`}>
      <a
        className="a-card-image"
        href={projectUrl(project.id)}
        tabIndex={-1}
        aria-hidden="true"
      >
        <ProjectScene id={project.id} />
      </a>
      <div className="a-card-body">
        <div className="a-card-meta">
          <span>{project.category}</span>
          <span>{project.number.padStart(2, "0")}</span>
        </div>
        <h3>
          <a href={projectUrl(project.id)}>
            {shortNames[project.id] || project.title}
            <Arrow />
          </a>
        </h3>
        <p>{stories[project.id].takeaway}</p>
        <div className="a-card-bottom">
          <span>{project.status}</span>
          <button
            aria-pressed={selected}
            onClick={() => onSave(project.id)}
            aria-label={`${selected ? "Saved" : "Compare"}: ${shortNames[project.id]} - ${selected ? "remove from" : "add to"} comparison`}
          >
            {selected ? "✓ Saved" : "+ Compare"}
          </button>
        </div>
      </div>
    </article>
  );
}
export function EvidenceLabel() {
  return (
    <p className="a-disclosure">
      Independent and student research · AI-assisted development · Not employer
      work products or investment advice.
    </p>
  );
}
