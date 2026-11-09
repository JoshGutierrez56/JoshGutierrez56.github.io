import { outcomes } from "../outcomes";
import { scenarios } from "../content";
import { ProjectScene } from "./ProjectIdentity";

/** Values come from the existing saved study records, not the illustrative artwork. */
export default function EvidencePreview({id,status,onOpen}:{id:string;status:string;onOpen:()=>void}) {
 const bars = id==='customization' ? scenarios.map(s=>({label:s.short,value:s.te,display:`${s.te.toFixed(2)}%`}))
 : id==='housing-forest' ? [{label:'Persistence',value:2.782,display:'2.782'},{label:'Random forest',value:5.579,display:'5.579'}]
 : id==='covenant-risk' ? [{label:'By year one',value:43.5,display:'43.5%'},{label:'By year five',value:89.8,display:'89.8%'}] : null;
 const unit=id==='customization'?'ANNUAL GROSS TRACKING ERROR':id==='housing-forest'?'RMSE / INDEX POINTS':'CUMULATIVE COVENANT BREACH';
 return <section className="a-evidence-preview">
  <div className="evidence-preview-top"><span>{outcomes[id].kind==='Finding'?'RESEARCH FINDING':'DELIVERED CAPABILITY'}</span><span>{status}</span></div>
  <h2>{outcomes[id].finding}</h2>
  {bars ? <div className="evidence-preview-chart"><p>{unit}</p>{bars.map(b=><div className="evidence-preview-row" key={b.label}><span>{b.label}</span><div aria-hidden="true"><i style={{width:`${b.value/Math.max(...bars.map(x=>x.value))*100}%`}}/></div><strong>{b.display}</strong></div>)}</div> : <div className="evidence-preview-art"><ProjectScene id={id}/><span>Project schematic / not measured data</span></div>}
  <p className="evidence-preview-scope">{id==='customization'?'Historical no-gold account, 2014–2025. Risk, not a fee or predicted loss.':id==='housing-forest'?'Saved historical comparison using current-vintage data.':id==='covenant-risk'?'Conditional simulation. A breach is not a default.':'See the exhibit for the implementation and supporting evidence.'}</p>
  <button onClick={onOpen}>Inspect the full exhibit <span aria-hidden="true">↗</span></button>
 </section>;
}
