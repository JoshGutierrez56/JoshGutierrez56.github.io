export const identities: Record<string, { title: string; labels: string[]; caption: string }> = {
  customization: { title: "The account is not the benchmark", labels: ["Benchmark", "Restriction", "Account"], caption: "Constraint geometry / tracking risk and trading costs" },
  "pure-news": { title: "A change with a traceable origin", labels: ["Prior filing", "New filing", "Linked change"], caption: "Disclosure comparison / source-linked evidence" },
  liquidity: { title: "Cash moves on a different clock", labels: ["Inflows", "Outflows", "Liquidity"], caption: "Cash-flow forecasting / timing and uncertainty" },
  "black-litterman": { title: "Where market priors meet investment views", labels: ["Market prior", "Views", "Posterior"], caption: "Black-Litterman / confidence-aware allocation" },
  optlab: { title: "An experiment needs an audit trail", labels: ["Configure", "Evaluate", "Compare"], caption: "Research workflow / inspectable experiments" },
  "macro-regime": { title: "One rule, different economic conditions", labels: ["Validation", "Regime shift", "Later test"], caption: "Macro allocation / out-of-period scrutiny" },
  "news-research": { title: "Information must arrive before the forecast", labels: ["News", "Features", "Forecast"], caption: "News research / predictive-value testing" },
  "macro-hmm": { title: "Infer the state without knowing the future", labels: ["Observations", "Latent state", "Next period"], caption: "Hidden Markov regimes / information timing" },
  "risk-parity": { title: "Equal dollars do not mean equal risk", labels: ["Capital", "Covariance", "Risk share"], caption: "Risk budgeting / contribution rather than weight" },
  "housing-forest": { title: "A forest meets a stubborn baseline", labels: ["Forest", "Persistence", "Same dates"], caption: "Housing forecast / model-versus-baseline error" },
  "covenant-risk": { title: "Risk emerges along the loan path", labels: ["Loan paths", "Covenant", "Breach"], caption: "Conditional simulation / breach is not default" },
  "corporate-niche": { title: "Companies through the language of competition", labels: ["Descriptions", "Similarity", "Crowding"], caption: "Corporate niche / text-based competitive structure" },
  "garch-volatility": { title: "Volatility remembers the shock", labels: ["Shock", "Persistence", "Forecast"], caption: "Conditional variance / volatility clustering" },
  "deep-momentum": { title: "Inside the recurrent decision", labels: ["Sequence", "LSTM state", "Position"], caption: "Trained network / behavior and attribution" },
  "trading-floor": { title: "Turn a financial question into a decision", labels: ["Scenario", "Decision", "Feedback"], caption: "Interactive learning / synthetic market exercises" },
  "real-estate-risk": { title: "Look beneath the smooth return", labels: ["Reported", "Smoothing", "Risk"], caption: "Property returns / measurement and interpretation" },
  "sentiment-lab": { title: "The signal has to pay its way", labels: ["Sentiment", "Gross signal", "After costs"], caption: "Sentiment research / economic value after friction" },
};

/** Each scene is a project-specific schematic, not a plot of observed data. */
export function ProjectScene({id}:{id:string}) {
 const profile=identities[id];
 const line=(d:string,key:number|string=0)=> <path key={key} className="identity-flow" d={d} fill="none" stroke="#254da4" strokeWidth="2"/>;
 const box=(x:number,y:number,w=100,h=60)=> <rect x={x} y={y} width={w} height={h} rx="6" fill="#e2ebf9" stroke="#7f9fcf"/>;
 const node=(x:number,y:number,r=13)=> <circle cx={x} cy={y} r={r} fill="#f5f7fb" stroke="#254da4" strokeWidth="2"/>;
 let art;
 switch(id){
 case 'customization': art=<>{[0,1,2,3,4,5,6].map(i=>line(`M70 ${110+i*25} C220 ${70+i*40},260 ${260-i*20},530 ${100+i*27}`,i))}<rect x="265" y="70" width="70" height="260" fill="#f5f7fb" stroke="#263348" strokeDasharray="5 5"/>{node(300,200,25)}</>;break;
 case 'pure-news': art=<>{box(80,75,170,240)}{box(350,75,170,240)}{[0,1,2,3,4,5].map(i=><g key={i}><path d={`M100 ${110+i*32}h125M370 ${110+i*32}h125`} stroke={i===2||i===4?'#254da4':'#a8bedf'} strokeWidth="6"/>{(i===2||i===4)&&line(`M235 ${110+i*32} Q300 ${70+i*32},365 ${110+i*32}`)}</g>)}</>;break;
 case 'liquidity':art=<>{[0,1,2,3,4,5,6].map(i=><g key={i}><rect x={80+i*62} y={200-(i%3+1)*32} width="18" height={(i%3+1)*32} fill="#254da4"/><rect x={101+i*62} y="200" width="18" height={(i%4+1)*22} fill="#91add8"/></g>)}{line('M65 200H540')}{line('M70 175C210 105,310 240,530 130')}</>;break;
 case 'black-litterman':art=<>{node(140,120,55)}{node(140,280,55)}{line('M195 120C280 120,260 200,345 200')}{line('M195 280C280 280,260 200,345 200')}{node(395,200,50)}{[0,1,2].map(i=>line(`M445 200Q485 ${150+i*50},535 ${110+i*90}`,i))}</>;break;
 case 'optlab':art=<>{[0,1,2,3,4,5].map(i=><g key={i}>{box(100+(i%3)*140,80+Math.floor(i/3)*150,115,110)}<path d={`M${120+(i%3)*140} ${110+Math.floor(i/3)*150}h65m-65 20h40m-40 20h75`} stroke="#7f9fcf" strokeWidth="3"/></g>)}{line('M75 210H525')}</>;break;
 case 'macro-regime':art=<>{[0,1,2].map(i=><rect key={i} x={70+i*155} y="70" width="150" height="260" fill={['#e1ebf9','#d1def2','#edf2fa'][i]}/>)}{line('M80 285L135 250L185 260L235 190L285 160L335 185L390 250L445 235L520 300')}<path d="M300 60V340" stroke="#263348" strokeDasharray="4 5"/></>;break;
 case 'news-research':art=<>{[0,1,2].map(i=><g key={i}>{box(65,75+i*85,100,60)}{line(`M165 ${105+i*85}Q230 ${105+i*85},270 200`)}</g>)}{box(270,150,110,100)}{line('M380 200H440')}{node(480,200,40)}</>;break;
 case 'macro-hmm':art=<>{[0,1,2].map(i=><g key={i}>{node(140+i*160,140,37)}{box(105+i*160,265,70,45)}{line(`M${140+i*160} 177V265`)}{i<2&&line(`M${177+i*160} 140H${263+i*160}`)}{line(`M${115+i*160} 112C${80+i*160} 40,${200+i*160} 40,${165+i*160} 112`)}</g>)}</>;break;
 case 'risk-parity':art=<>{[0,1,2,3].map(i=><g key={i}><rect x={95+i*55} y={270-[60,150,95,200][i]} width="30" height={[60,150,95,200][i]} fill="#254da4"/>{node(390+(i%2)*65,150+Math.floor(i/2)*75,25)}</g>)}{line('M330 90V310')}</>;break;
 case 'housing-forest':art=<>{line('M170 100L105 180M170 100L235 180M105 180L70 270M105 180L140 270M235 180L200 270M235 180L270 270')}{[[170,100],[105,180],[235,180],[70,270],[140,270],[200,270],[270,270]].map(([x,y],i)=><g key={i}>{node(x,y)}</g>)}<path d="M350 210H535" stroke="#263348" strokeWidth="3"/>{node(390,210,8)}{node(490,210,8)}</>;break;
 case 'covenant-risk':art=<>{Array.from({length:13},(_,i)=>line(`M65 200C170 ${130+i*11},340 ${80+i*22},535 ${60+i*25}`,i))}<path d="M65 260H540" stroke="#263348" strokeDasharray="7 5"/><rect x="65" y="260" width="475" height="80" fill="#254da4" opacity=".06"/></>;break;
 case 'corporate-niche':art=<>{[0,1,2,3,4,5,6,7,8].map(i=>{const x=300+Math.cos(i*2.4)*(70+i*12),y=200+Math.sin(i*2.4)*(50+i*10);return <g key={i}>{line(`M300 200L${x} ${y}`)}{node(x,y,i%3===0?20:11)}</g>})}{node(300,200,32)}</>;break;
 case 'garch-volatility':art=<>{line('M60 235L100 220L120 245L145 180L160 295L180 100L195 310L215 140L235 260L260 175L285 250L310 195L340 240L380 210L420 230L470 215L535 223')}<path d="M180 60Q260 175,535 190M180 350Q260 260,535 250" fill="none" stroke="#91add8" strokeDasharray="5 5"/></>;break;
 case 'deep-momentum':art=<>{[0,1,2].map(i=><g key={i}>{box(90+i*155,145,105,105)}{line(`M${110+i*155} 145C${60+i*155} 65,${225+i*155} 65,${175+i*155} 145`)}{i<2&&line(`M${195+i*155} 200H${245+i*155}`)}<path d={`M${115+i*155} 180v35h55v-35z`} fill="none" stroke="#254da4"/></g>)}</>;break;
 case 'trading-floor':art=<>{box(65,70,470,260)}<path d="M90 110H510M320 130V310" stroke="#9bb2d3"/>{line('M100 275H190L280 160')}{[0,1,2].map(i=><g key={i}>{box(345,140+i*53,160,36)}<circle cx="365" cy={158+i*53} r="5" fill="#254da4"/></g>)}</>;break;
 case 'real-estate-risk':art=<>{line('M65 210C175 195,205 180,290 185S450 155,535 165')}<path d="M65 255L105 150L145 235L185 110L225 250L265 165L305 235L345 105L385 190L425 100L465 190L535 120" fill="none" stroke="#7899c9" strokeWidth="2"/></>;break;
 case 'sentiment-lab':art=<>{[0,1,2,3,4,5].map(i=><g key={i}><rect x={85+i*72} y={140+(i%3)*15} width="35" height={150-(i%3)*15} fill="#b0c4e2"/><rect x={85+i*72} y={190+(i%3)*15} width="35" height={100-(i%3)*15} fill="#254da4"/></g>)}<path d="M65 190H535" stroke="#263348" strokeDasharray="5 5"/></>;break;
 }
 return <svg className={`project-identity identity-${id}`} viewBox="0 0 600 420" aria-hidden="true"><path d="M40 40H560V360H40Z" fill="none" stroke="#c9d7ea"/>{art}{profile.labels.map((label,i)=><text key={label} x={100+i*200} y="392" textAnchor="middle" fill="#263348" fontSize="11">{label}</text>)}</svg>;
}
