import { useState } from "react";
import { Arrow } from "./Shared";

const stages = [
  {name:"Frame", title:"Start with a decision.", detail:"Define the question before choosing the machinery. Name the comparison and what would count as useful evidence.", link:"/research/customization/", example:"Portfolio customization", marks:["QUESTION","CONSTRAINT","COMPARISON"]},
  {name:"Build", title:"Make the chain inspectable.", detail:"Connect source material, transformations, and outputs. A result needs a path another researcher can follow.", link:"/research/pure-news/", example:"Source-linked disclosure research", marks:["SOURCE","TRANSFORM","TRACE"]},
  {name:"Challenge", title:"Give the result an opponent.", detail:"Test the baseline, timing, costs, and assumptions. A more complicated model has to justify its place.", link:"/research/housing-forest/", example:"Housing forecasts versus persistence", marks:["BASELINE","MODEL","ERROR"]},
  {name:"Communicate", title:"Keep the qualification attached.", detail:"Present the finding with its scope, limitations, and next test. An explanation should survive scrutiny.", link:"/research/covenant-risk/", example:"Conditional covenant risk", marks:["FINDING","LIMITS","NEXT TEST"]},
];
export default function MethodWorkbench(){
 const [active,setActive]=useState(0); const s=stages[active];
 return <section className="a-workbench" aria-label="Explore the research process">
   <div className="workbench-head"><p className="a-eyebrow">THE RESEARCH LOOP / OPEN THE PROCESS</p><h2>A result is not<br/><em>the finish line.</em></h2></div>
   <div className="workbench-layout">
     <div className="workbench-steps" role="group" aria-label="Research process stages">{stages.map((stage,i)=><button key={stage.name} onClick={()=>setActive(i)} aria-pressed={active===i}><span>0{i+1}</span><strong>{stage.name}</strong><Arrow/></button>)}</div>
     <div className={`workbench-machine machine-${active}`}>
       <div className="workbench-blueprint" aria-hidden="true"><div className="workbench-track"/>{s.marks.map((mark,i)=><div className={`workbench-plate plate-${i}`} key={mark}><span>0{i+1}</span><div className="plate-lines"><i/><i/><i/><i/></div><strong>{mark}</strong></div>)}</div>
       <div className="workbench-detail" key={active} aria-live="polite"><h3>{s.title}</h3><p>{s.detail}</p><a className="a-text-link" href={s.link}>{s.example} <Arrow/></a></div>
     </div>
   </div>
 </section>;
}
