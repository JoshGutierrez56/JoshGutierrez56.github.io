import { useId, useState } from "react";

// Existing, public project evidence—not invented demonstration records.
// KHC excerpts and dates: Pure News demo/evidence_packets/02_KHC.html,
// record 8f5336b55618ffe68e8a. The short quotations retain exact source wording.
const khcPacket = "https://joshgutierrez56.github.io/pure-news-intelligence-demo/demo/evidence_packets/02_KHC.html";
const khcCurrent = "https://www.sec.gov/Archives/edgar/data/1637459/000163745923000009/khc-20221231.htm";

function DisclosurePreview() {
  const [showContext, setShowContext] = useState(false);
  const contentId = useId();
  return (
    <div className="product-preview disclosure-preview">
      <div className="product-preview-topline">
        <span className="product-company"><b>KHC</b> Kraft Heinz</span>
        <span className="product-frozen">Frozen filing record</span>
      </div>
      <div className="product-segmented" role="group" aria-label="Disclosure evidence view">
        <button type="button" aria-pressed={!showContext} aria-controls={contentId} onClick={() => setShowContext(false)}>1. Compare wording</button>
        <button type="button" aria-pressed={showContext} aria-controls={contentId} onClick={() => setShowContext(true)}>2. Check context</button>
      </div>
      <div className="disclosure-preview-content" id={contentId} aria-live="polite">
        {!showContext ? (
          <div className="disclosure-excerpts">
            <div className="disclosure-excerpt disclosure-prior">
              <span className="product-mini-label">Prior 10-K · Feb 17, 2022</span>
              <blockquote>“…may increase the <em>cost of financing</em> as well as the risks of refinancing maturing debt.”</blockquote>
            </div>
            <div className="disclosure-excerpt disclosure-current">
              <span className="product-mini-label">Current 10-K · Feb 16, 2023</span>
              <blockquote>“The creditors who hold our debt could <mark>accelerate amounts due</mark> in the event that we default…”</blockquote>
            </div>
          </div>
        ) : (
          <div className="disclosure-context">
            <div className="disclosure-timeline">
              <div><span>Jul 11, 2022</span><strong>Earlier 8-K matched</strong><small>Financing / capital structure</small></div>
              <div><span>Feb 16, 2023</span><strong>Current 10-K reviewed</strong><small>Debt / refinancing language</small></div>
            </div>
            <div className="disclosure-verdict"><span className="product-mini-label">The demo’s novelty classification</span><strong>Previously disclosed in 8-K</strong><p>A match in the searched record—not a claim that the company defaulted.</p></div>
          </div>
        )}
      </div>
      <div className="disclosure-question">
        <span className="product-mini-label">The analyst’s next question</span>
        <p>What changed in covenant exposure or financing access?</p>
      </div>
      <div className="product-preview-footer"><span>Changed text ≠ new information.</span><a href={showContext ? khcPacket : khcCurrent} target="_blank" rel="noreferrer">{showContext ? "Read evidence packet" : "Read source filing"} ↗</a></div>
    </div>
  );
}

// Same European Black–Scholes baseline and normal-CDF approximation as the
// existing Trading Floor src/engine/options.ts; original src/App.tsx defaults:
// S=100, K=105, sigma=.28, T=45/365, r=.04, no dividends.
function normalCdf(value: number) {
  const sign = value < 0 ? -1 : 1;
  const x = Math.abs(value) / Math.sqrt(2);
  const t = 1 / (1 + 0.3275911 * x);
  const erf = 1 - (((((1.061405429 * t - 1.453152027) * t) + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-x * x);
  return .5 * (1 + sign * erf);
}
const strike = 105;
const time = 45 / 365;
const d1 = (Math.log(100 / strike) + (.04 + .5 * .28 ** 2) * time) / (.28 * Math.sqrt(time));
const d2 = d1 - .28 * Math.sqrt(time);
const premium = 100 * normalCdf(d1) - strike * Math.exp(-.04 * time) * normalCdf(d2);
const delta = normalCdf(d1);
const expiryPnl = (spot: number) => Math.max(spot - strike, 0) - premium;
const x = (spot: number) => 42 + (spot - 85) / 40 * 462;
const y = (pnl: number) => 154 - (pnl + 4) / 24 * 120;
const dollars = (value: number) => `${value < 0 ? "−" : "+"}$${Math.abs(value).toFixed(2)}`;

function OptionsPreview() {
  const [expiryPrice, setExpiryPrice] = useState(100);
  const controlId = useId();
  const chartTitle = useId();
  const chartDescription = useId();
  const pnl = expiryPnl(expiryPrice);
  const positive = pnl >= 0;
  const line = [85, 105, 125].map((spot, index) => `${index ? "L" : "M"}${x(spot)},${y(expiryPnl(spot))}`).join(" ");
  return (
    <div className="product-preview options-preview">
      <div className="product-preview-topline"><span className="product-company"><b>CALL</b> Options desk</span><span className="product-frozen">Synthetic practice</span></div>
      <div className="options-inputs" aria-label="Original simulator baseline inputs"><span>Spot <b>$100</b></span><span>Strike <b>$105</b></span><span>Vol <b>28%</b></span><span>Time <b>45 days</b></span></div>
      <div className="options-metrics"><div><span className="product-mini-label">Model premium / share</span><strong>${premium.toFixed(3)}</strong></div><div><span className="product-mini-label">Break-even at expiry</span><strong>${(strike + premium).toFixed(2)}</strong></div></div>
      <svg className="options-payoff" viewBox="0 0 540 186" role="img" aria-labelledby={`${chartTitle} ${chartDescription}`}>
        <title id={chartTitle}>Long-call profit and loss at expiry, per share</title>
        <desc id={chartDescription}>A long call loses its {premium.toFixed(3)} dollar premium at or below the 105 dollar strike, breaks even at {(strike + premium).toFixed(2)} dollars, then gains one dollar per additional dollar of underlying price. At the selected price of {expiryPrice} dollars, profit or loss is {dollars(pnl)} per share, before fees.</desc>
        {[0, 10, 20].map((value) => <g key={value}><line x1="42" x2="504" y1={y(value)} y2={y(value)} className={value === 0 ? "options-zero" : "options-grid"}/><text x="34" y={y(value) + 4} textAnchor="end" className="options-axis">{value === 0 ? "$0" : `+${value}`}</text></g>)}
        <text x="42" y="17" className="options-axis">Expiry P&amp;L / share</text>
        <path d={`${line} L504,${y(0)} L42,${y(0)} Z`} className="options-area"/>
        <path d={line} className="options-curve"/>
        <line x1={x(strike)} x2={x(strike)} y1="34" y2="158" className="options-strike"/>
        <text x={x(strike) - 7} y="50" textAnchor="end" className="options-axis">Strike $105</text>
        {[85, 95, 105, 115, 125].map((spot) => <text key={spot} x={x(spot)} y="177" textAnchor="middle" className="options-axis">${spot}</text>)}
        <line x1={x(expiryPrice)} x2={x(expiryPrice)} y1={y(pnl)} y2="158" className="options-selected-line"/>
        <circle cx={x(expiryPrice)} cy={y(pnl)} r="6" className="options-selected-point"/>
      </svg>
      <div className="options-slider-label"><label htmlFor={controlId}>Move the expiry price <strong>${expiryPrice}</strong></label><output htmlFor={controlId} className={positive ? "options-profit" : "options-loss"}>{dollars(pnl)} <small>/ share</small></output></div>
      <input id={controlId} className="options-slider" type="range" min="85" max="125" step="1" value={expiryPrice} onChange={(event) => setExpiryPrice(Number(event.target.value))} aria-valuetext={`Underlying at expiry ${expiryPrice} dollars; profit or loss ${dollars(pnl)} per share`} />
      <p className="options-insight">{expiryPrice <= strike ? "Below the strike, the call expires worthless. The premium is the loss." : !positive ? "The call pays out, but not enough to recover the premium." : "Above break-even, the payoff covers the premium. That is different from simply finishing above the strike."}</p>
      <div className="product-preview-footer"><span>Fixed initial delta {delta.toFixed(3)} · rate 4% · no dividends.<br />Expiry P&amp;L excludes fees and premium funding.</span><a href="https://joshgutierrez56.github.io/trading-floor-interview-simulator-demo/#options" target="_blank" rel="noreferrer">Open options desk ↗</a></div>
    </div>
  );
}

export function ProductPreview({ id }: { id: "pure-news" | "trading-floor" }) {
  return id === "pure-news" ? <DisclosurePreview /> : <OptionsPreview />;
}
