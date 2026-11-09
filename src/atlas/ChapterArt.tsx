import { identities, ProjectScene } from "./ProjectIdentity";

export function ChapterArt({ id, number, methods }: { id: string; number: string; methods: string[] }) {
  const profile = identities[id];
  return <div className="a-chapter-art" data-project={id}>
    <div className="chapter-art-top"><span>RESEARCH DOSSIER</span><span>NO. {number.padStart(2, "0")}</span></div>
    <p className="project-art-title">{profile.title}</p>
    <ProjectScene id={id} />
    <div className="chapter-art-methods">{methods.slice(0,3).map(m=><span key={m}>{m}</span>)}</div>
    <p className="chapter-art-caption">{profile.caption}. Conceptual, not measured results.</p>
  </div>;
}

export function CareerLandscape({ chapter }: { chapter: number }) {
  const words = ["FOUNDATION", "MEASUREMENT", "COMMUNICATION", "CONTEXT", "INQUIRY"];
  return <div className="a-career-landscape" aria-hidden="true">
    <span className="career-scene-number">0{chapter+1}</span>
    <svg viewBox="0 0 1000 300">
      <g fill="none" stroke="#8aa6ce">{Array.from({length:12},(_,i)=><path key={i} d={`M-40 ${280+i*11} Q240 ${80+i*13},500 ${160+i*9} T1040 ${50+i*14}`} opacity=".3" />)}</g>
      {words.map((word,i)=><g key={word} className={i===chapter?"career-waypoint selected":"career-waypoint"} style={{transform:`translate(${105+i*195}px, ${195-i*29}px)`}}><path d="M0 0v100" stroke="#9db4d6" strokeDasharray="2 5" /><circle r={i===chapter?22:8} fill={i===chapter?"#254da4":"#d4e0f2"} stroke="#254da4" /><circle className="career-beacon" r="34" fill="none" stroke="#254da4" opacity={i===chapter?.4:0} /><text y="-44" textAnchor="middle" fill="#263348" fontSize="11" letterSpacing="1">{word}</text></g>)}
    </svg>
    <span className="career-scene-caption">EXPERIENCE BUILDS CONTEXT. RESEARCH TESTS IT.</span>
  </div>;
}
