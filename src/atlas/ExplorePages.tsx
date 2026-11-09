import { useState } from "react";
import { projects, github } from "../content";
import { outcomes } from "../outcomes";
import { stories } from "../stories";
import { career, projectUrl, shortNames, sourceUrl } from "./data";
import { PageHeading, Arrow } from "./Shared";
import { identities, ProjectScene } from "./ProjectIdentity";
import { CareerLandscape } from "./ChapterArt";

export const exploreTabs = [
  ["/start-here/", "Start Here"], ["/journey/", "Journey"],
  ["/visual-atlas/", "Visual Atlas"], ["/research-notes/", "Research Notes"],
  ["/code/", "Code & Sources"], ["/turning-points/", "Turning Points"],
];
export function ExploreNavigation({path}:{path:string}) {
 return <details className="a-explore-disclosure" key={path}><summary>Explore more <span>{exploreTabs.find(([href])=>href===path)?.[1] || 'Journey, visual atlas & research notes'}</span></summary><nav className="a-explore-nav" aria-label="Explore the portfolio"><div>{exploreTabs.map(([href,label])=><a key={href} href={href} aria-current={path===href?'page':undefined}>{label}<Arrow /></a>)}</div></nav></details>;
}
const pageInfo:Record<string,[string,string,string]>={
 '/journey/':['Journey','The experience behind the questions.','Five chapters connecting economics, portfolio measurement, investment communication, institutional context, and graduate research.'],
 '/code/':['Code & Sources','Behind the research.','Browse the repositories and public resources already linked to each project. Follow the code, documentation, and evidence behind the work.'],
 '/turning-points/':['Turning Points','Turning points worth keeping.','Academic milestones and research lessons. Not every important moment is a performance win.'],
 '/start-here/':['Start Here','Start with these questions.','A curated route through my work, selected for different research conversations rather than ranked by claimed performance.'],
 '/visual-atlas/':['Visual Atlas','See the research differently.','A visual index of seventeen distinct questions. Each illustration is a conceptual map; open the case study for actual exhibits and evidence.'],
 '/research-notes/':['Research Notes','What survives the next question.','Project-linked findings, limitations, and proposed next tests. Follow each note back to its study and supporting evidence.'],
};
const picks=[['customization','For allocation decisions','Implementation costs matter in dollars as well as basis points.'],['pure-news','For research platforms','A useful change should retain its connection to the source.'],['housing-forest','For model evaluation','A simple baseline makes an excellent adversary.'],['covenant-risk','For risk conversations','The path matters before the terminal outcome.'],['deep-momentum','For model interpretation','Look inside a trained model, not just at its output.'],['macro-regime','For empirical discipline','Keep the later negative result in view.']];

export default function ExplorePage({path}:{path:string}) {
 const [chapter,setChapter]=useState(4);
 const [focus,setFocus]=useState('customization');
 const info=pageInfo[path];
 if(!info)return null;
 const item=career[chapter];
 return <div className={`a-shell a-explore-page explore-${info[0].toLowerCase().replaceAll(' ','-')}`}>
   <PageHeading label={`EXPLORE / ${info[0].toUpperCase()}`} title={info[1]} description={info[2]} />
   {path==='/journey/'&&<>
     <div className="a-timeline-controls" role="group" aria-label="Career chapters">{career.map((c,i)=><button key={c.label} aria-pressed={chapter===i} onClick={()=>setChapter(i)}><span>{c.period}</span><strong>{c.label}</strong></button>)}</div>
     <CareerLandscape chapter={chapter}/>
     <article className="a-career-chapter" key={chapter} aria-live="polite"><div><p className="a-eyebrow">CHAPTER 0{chapter+1} / {item.period}</p><h2>{item.institution}</h2><p className="a-career-role">{item.role}</p><p>{item.text}</p></div><aside role="note"><p className="a-eyebrow">A QUESTION THAT CONNECTS</p><h3>{item.question}</h3><a href={projectUrl(item.related)}>Related independent research <Arrow/></a></aside></article>
     <p className="a-disclosure">Related projects connect in subject matter; they are not represented as work produced for these employers.</p>
   </>}
   {path==='/code/'&&<><a className="a-button" href={github} target="_blank" rel="noreferrer">Open my GitHub profile <Arrow/></a><div className="explore-source-grid">{projects.map(p=><article key={p.id}><span className="a-eyebrow">{p.number} / {p.category}</span><h2>{shortNames[p.id]}</h2><p>{p.contribution}</p><div className="a-source-list">{p.links.filter(l=>l.href.includes('github.com')).map(l=><a key={l.href} href={l.href} target="_blank" rel="noreferrer">{l.label}<Arrow/></a>)}<a href={projectUrl(p.id)}>Case study and all resources <Arrow/></a></div></article>)}</div></>}
   {path==='/turning-points/'&&<div className="explore-moments">
      <article><span className="explore-big-index">2019</span><div><p className="a-eyebrow">EDUCATION</p><h2>Economics as a foundation.</h2><p>BA in Economics, Hamilton College, May 2019.</p><a href="/journey/">Follow the professional thread <Arrow/></a></div></article>
      <article><span className="explore-big-index">2026</span><div><p className="a-eyebrow">GRADUATE STUDY</p><h2>Investment study meets research leadership.</h2><p>MBA and MS in Finance awarded at Northeastern in August 2026. Head of Equity Research for the 360 Huntington Fund through May 2026.</p><a href="/about/">View education and experience <Arrow/></a></div></article>
      {['housing-forest','macro-regime','customization'].map((id,i)=><article key={id}><span className="explore-big-index">0{i+1}</span><div><p className="a-eyebrow">RESEARCH LESSON / {shortNames[id]}</p><h2>{stories[id].takeaway}</h2><p>{outcomes[id].implication}</p><a href={projectUrl(id)}>Inspect the finding <Arrow/></a></div></article>)}
   </div>}
   {path==='/start-here/'&&<div className="explore-picks">{picks.map(([id,label,why],i)=><a href={projectUrl(id)} key={id}><span className="pick-number">0{i+1}</span><ProjectScene id={id}/><div><p className="a-eyebrow">{label}</p><h2>{shortNames[id]}</h2><p>{why}</p><span className="a-text-link">Open the research <Arrow/></span></div></a>)}</div>}
   {path==='/visual-atlas/'&&<>
     <div className="view-feature"><div className="view-art"><ProjectScene id={focus}/></div><div key={focus} aria-live="polite"><p className="a-eyebrow">{shortNames[focus]}</p><h2>{identities[focus].title}</h2><p>{identities[focus].caption}</p><a className="a-button" href={projectUrl(focus)}>Open the case study <Arrow/></a><small>Conceptual illustration, not observed data.</small></div></div>
     <div className="view-thumbnails" role="group" aria-label="Choose a project illustration">{projects.map(p=><button key={p.id} aria-pressed={focus===p.id} onClick={()=>setFocus(p.id)}><ProjectScene id={p.id}/><strong>{shortNames[p.id]}</strong></button>)}</div>
   </>}
   {path==='/research-notes/'&&<div className="explore-notes">{projects.map(p=><article key={p.id}><div><p className="a-eyebrow">NOTE {p.number} / {p.category}</p><h2>{shortNames[p.id]}</h2><a href={projectUrl(p.id)}>Full case study <Arrow/></a></div><div><h3>{outcomes[p.id].finding}</h3><p>{outcomes[p.id].implication}</p><details><summary>Boundary & next test</summary><h4>What this does not establish</h4><p>{p.limitation}</p><h4>Proposed next step</h4><p>{stories[p.id].nextStep}</p></details><a className="a-text-link" href={sourceUrl(p.links[0]?.href||projectUrl(p.id))}>Open supporting resource <Arrow/></a></div></article>)}</div>}
   <div className="explore-next"><p className="a-eyebrow">KEEP EXPLORING</p><div>{exploreTabs.filter(([href])=>href!==path&&href!=='/').map(([href,label])=><a key={href} href={href}>{label}<Arrow/></a>)}</div></div>
 </div>;
}
