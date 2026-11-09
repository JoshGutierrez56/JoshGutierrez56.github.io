import { Arrow } from "./Shared";

export default function QuickReview() {
 return <section className="a-quick-review a-shell" aria-labelledby="quick-review-title">
   <div className="quick-review-intro"><p className="a-eyebrow">SHORT ON TIME? START HERE.</p><h2 id="quick-review-title">Three questions.<br/><em>Three ways to evaluate my work.</em></h2><p>Open a case study for the finding, my contribution, and the evidence behind it.</p><a className="a-text-link" href="/about/">Background & experience <Arrow/></a></div>
   <div className="quick-review-cases">
     <a href="/research/customization/"><span className="a-eyebrow">01 / INVESTMENT JUDGMENT</span><h3>Is less trading worth the tracking risk?</h3><p>About $110 saved per $1m annually versus 27 bp of additional tracking error in the historical no-gold account.</p><span className="quick-review-scope">Lower turnover vs minimum risk; modeled costs.</span><span className="quick-review-open">Inspect the trade-off <Arrow/></span></a>
     <a href="/research/pure-news/"><span className="a-eyebrow">02 / RESEARCH TOOLS</span><h3>Can you trace the claim to its source?</h3><p>Disclosure comparisons retain a link to the underlying evidence, making changes inspectable rather than merely summarized.</p><span className="quick-review-scope">A research workflow, not an autonomous investment signal.</span><span className="quick-review-open">Follow the evidence <Arrow/></span></a>
     <a href="/research/housing-forest/"><span className="a-eyebrow">03 / EMPIRICAL DISCIPLINE</span><h3>What if the simple baseline wins?</h3><p>Persistence beat the random forest: RMSE 2.78 versus 5.58 index points in the historical housing comparison.</p><span className="quick-review-scope">Current-vintage historical data; not a live forecast.</span><span className="quick-review-open">Examine the comparison <Arrow/></span></a>
   </div>
 </section>;
}
