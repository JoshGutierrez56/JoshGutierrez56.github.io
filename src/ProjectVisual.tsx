import { useId, useState } from "react";
import type { ReactNode } from "react";
import { scenarios } from "./content";
import { ProductPreview } from "./ProductPreview";
import LiquidityVisual from "./LiquidityVisual";
import CovenantVisual from "./CovenantVisual";
import RealEstateVisual from "./RealEstateVisual";
import DeepMomentumVisual from "./DeepMomentumVisual";
import SentimentVisual from "./SentimentVisual";
import HousingForestVisual from "./HousingForestVisual";

// Original assets remain available beside these source-based improvements.
// Exact input data and derivation notes: public/assets/projects/PROVENANCE.md.
function Frame({ id, label, caption, children }: { id: string; label: string; caption: string; children: ReactNode }) {
  return (
    <figure className={`project-visual pv-${id}`}>
      <div className="pv-label"><span className="pv-dot" aria-hidden="true" /><span>{label}</span>
        <a className="pv-original" href={`/assets/projects/${id === "customization" ? "customization" : id}.png`} target="_blank" rel="noreferrer" aria-label={`Open the original ${id.replaceAll("-", " ")} visual in a new tab`}>Original <span aria-hidden="true">↗</span></a>
      </div>
      {children}
      <figcaption className="pv-caption">{caption}</figcaption>
    </figure>
  );
}

function Diagram({ title, description, children, viewBox = "0 0 600 250" }: { title: string; description: string; children: ReactNode; viewBox?: string }) {
  const id = useId();
  return <svg className="pv-diagram" viewBox={viewBox} role="img" aria-labelledby={`${id}-title ${id}-description`}><title id={`${id}-title`}>{title}</title><desc id={`${id}-description`}>{description}</desc>{children}</svg>;
}

function ArtworkDetail({ id }: { id: string }) {
  return <div className="pv-art-detail" aria-hidden="true"><img src={`/assets/projects/${id}.png`} alt="" width="1200" height="630" loading="lazy" /></div>;
}

function Customization() {
  const [method, setMethod] = useState<(typeof scenarios)[number]["id"]>("turnover");
  const selected = scenarios.find((item) => item.id === method) ?? scenarios[2];
  const x = (risk: number) => 76 + ((risk - 1.2) / 0.7) * 446;
  const y = (cost: number) => 185 - (cost / 2.2) * 141;
  const annualCost = selected.cost * 100;
  const savings = (scenarios[1].cost - selected.cost) * 100;
  const additionalRisk = (selected.te - scenarios[1].te) * 100;
  return (
    <Frame id="customization" label="Three methods. One no-gold restriction." caption="Historical 2014–2025 study · Assumed costs · Gross tracking error is risk, not a fee or a predicted loss.">
      <div className="pv-body pv-tradeoff-body">
        <div className="pv-visual-heading"><strong>What does less trading buy?</strong><span>Choose an allocation to compare.</span></div>
        <div className="pv-methods" role="group" aria-label="Preview allocation method">
          {scenarios.map((scenario) => <button type="button" key={scenario.id} className={`pv-method-choice pv-choice-${scenario.id}`} aria-pressed={method === scenario.id} onClick={() => setMethod(scenario.id)}><span aria-hidden="true" />{scenario.short}</button>)}
        </div>
        <Diagram title="Trading cost versus tracking risk in the no-gold account" description="Original study values, redrawn for comparison. Proportional: 1.7484% gross tracking error and 1.4154 basis points annual modeled cost. Minimum risk: 1.3691% and 1.8231 basis points. Lower turnover: 1.6390% and 0.7245 basis points. The highlighted point is the selected allocation. These are three discrete evaluated methods, not an estimated frontier.">
          <text className="pv-axis-title" x="16" y="23">Annual modeled cost (bp)</text>
          {[0, 1, 2].map((tick) => <g key={tick}><line className="pv-grid" x1="76" x2="522" y1={y(tick)} y2={y(tick)} /><text className="pv-axis" x="59" y={y(tick) + 7} textAnchor="end">{tick}</text></g>)}
          {[1.2, 1.4, 1.6, 1.8].map((tick) => <text className="pv-axis" key={tick} x={x(tick)} y="211" textAnchor="middle">{tick.toFixed(1)}</text>)}
          <text className="pv-axis-title" x="300" y="242" textAnchor="middle">Gross tracking error (% / year)</text>
          {scenarios.map((scenario) => <g key={scenario.id} className={`pv-scatter-point pv-point-${scenario.id} ${method === scenario.id ? "is-selected" : ""}`}>
            {method === scenario.id && <circle className="pv-selection-ring" cx={x(scenario.te)} cy={y(scenario.cost)} r="14" />}
            <circle className="pv-point-dot" cx={x(scenario.te)} cy={y(scenario.cost)} r="7" />
            <text className="pv-point-name" x={x(scenario.te)} y={y(scenario.cost) + (scenario.id === "turnover" ? 30 : -18)} textAnchor="middle">{scenario.short}</text>
          </g>)}
        </Diagram>
        <div className="pv-tradeoff-readout" aria-live="polite" aria-atomic="true">
          <div><span>Modeled cost / year</span><strong>${annualCost.toFixed(0)}</strong><small>at a constant $1m reference NAV</small></div>
          <div><span>Gross tracking error</span><strong>{selected.te.toFixed(2)}<em>%</em></strong><small>annualized active-return variability</small></div>
          <p>{method === "risk" ? "The lowest realized tracking risk of these three allocations—at the highest modeled trading cost." : <><b>About ${savings.toFixed(0)} less cost.</b> +{additionalRisk.toFixed(0)} bp tracking risk versus minimum risk.</>}</p>
        </div>
      </div>
    </Frame>
  );
}

function NewsResearch() {
  const x = (value: number) => 42 + ((value + 0.006) / 0.007) * 510;
  return (
    <Frame id="news-research" label="A null result with a useful consequence" caption="The study did not validate incremental alpha. That redirected the work toward evidence-linked analyst research.">
      <ArtworkDetail id="news-research" />
      <div className="pv-body pv-research-body">
        <div className="pv-result-heading"><div><span>Incremental information coefficient</span><strong>−0.00227</strong></div><span className="pv-result-status">Not validated</span></div>
        <Diagram title="The incremental IC interval includes zero" description="Estimate negative 0.00227. The 95% interval runs from negative 0.00567 to positive 0.00049. Because the interval includes zero, the study did not validate incremental return-predictive information." viewBox="0 0 600 190">
          <line className="pv-grid" x1="42" x2="552" y1="89" y2="89" />
          <line className="pv-zero" x1={x(0)} x2={x(0)} y1="22" y2="144" />
          <text className="pv-zero-label" x={x(0) - 10} y="22" textAnchor="end">Zero</text>
          <line className="pv-confidence" x1={x(-0.00567)} x2={x(0.00049)} y1="89" y2="89" />
          {[-0.00567, 0.00049].map((value) => <line key={value} className="pv-confidence-cap" x1={x(value)} x2={x(value)} y1="77" y2="101" />)}
          <circle className="pv-estimate-dot" cx={x(-0.00227)} cy="89" r="10" />
          <text className="pv-axis" x={x(-0.00567)} y="133" textAnchor="start">−0.00567</text>
          <text className="pv-axis" x={x(0.00049)} y="133" textAnchor="end">+0.00049</text>
          <text className="pv-axis-title" x="300" y="176" textAnchor="middle">95% interval · includes zero</text>
        </Diagram>
        <div className="pv-insight"><span>Research decision</span><strong>Retire the alpha hypothesis.<br />Build for investigation.</strong></div>
      </div>
    </Frame>
  );
}

function BlackLitterman() {
  return (
    <Frame id="black-litterman" label="How a view becomes an allocation" caption="Conceptual workflow from the student-fund research prototype.">
      <ArtworkDetail id="black-litterman" />
      <div className="pv-body pv-allocation-body">
        <div className="pv-visual-heading"><strong>Conviction is not a portfolio weight.</strong><span>Make the translation explicit.</span></div>
        <ol className="pv-allocation-flow">
          <li><span className="pv-step-number">01</span><div><strong>Start with a prior</strong><p>Factor-based expectations establish a reference.</p></div></li>
          <li><span className="pv-step-number">02</span><div><strong>Blend views + confidence</strong><p>Black–Litterman incorporates analyst conviction.</p></div></li>
          <li><span className="pv-step-number">03</span><div><strong>Constrain the allocation</strong><p>Optimization converts the blended inputs into portfolio weights.</p></div></li>
        </ol>
        <div className="pv-insight"><span>What becomes reviewable</span><strong>The path from a belief to a portfolio decision.</strong></div>
      </div>
    </Frame>
  );
}

function CorporateNiche() {
  return (
    <Frame id="corporate-niche" label="Can we measure competitive crowding?" caption="Original three-axis projection of the synthetic benchmark, colored by fiscal year.">
      <div className="pv-body pv-niche-body">
        <div className="pv-niche-score"><div><span>Crowding recovery</span><strong>ρ = 0.3215</strong></div><p>Separate measurement result<br /><b>Synthetic · pooled Spearman</b></p></div>
        <a className="pv-niche-image" href="/assets/projects/corporate-niche.png" target="_blank" rel="noreferrer" aria-label="Open the original full-size synthetic business-model projection in a new tab"><img src="/assets/projects/corporate-niche.png" width="889" height="759" loading="lazy" decoding="async" alt="Original three-axis projection of the six-dimensional synthetic business-model state: demand and pricing, innovation, and unit economics, colored by fiscal year. Nearby synthetic observations occupy similar positions on these dimensions." /></a>
        <div className="pv-dimension-guide"><span>6 dimensions in the model</span><span>3 shown in this projection</span></div>
      </div>
    </Frame>
  );
}

export default function ProjectVisual({ id }: { id: string }) {
  if (id === "pure-news" || id === "trading-floor") return <Frame id={id} label={id === "pure-news" ? "From source to research question" : "Practice, explain, replay"} caption={id === "pure-news" ? "A sourced example from the original disclosure-review workflow." : "Explore the original simulator's European-call example, one expiry price at a time."}><ProductPreview id={id} /></Frame>;
  switch (id) {
    case "deep-momentum": return <DeepMomentumVisual />;
    case "sentiment-lab": return <SentimentVisual />;
    case "housing-forest": return <HousingForestVisual />;
    case "liquidity": return <LiquidityVisual />;
    case "covenant-risk": return <CovenantVisual />;
    case "real-estate-risk": return <RealEstateVisual />;
    case "customization": return <Customization />;
    case "news-research": return <NewsResearch />;
    case "black-litterman": return <BlackLitterman />;
    case "corporate-niche": return <CorporateNiche />;
    default: return null;
  }
}
