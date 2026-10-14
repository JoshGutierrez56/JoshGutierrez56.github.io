import { story as liquidityStory } from "./liquidityProject";
import { story as covenantStory } from "./covenantProject";
import { realEstateStory } from "./realEstateProject";

export type ProjectStory = {
  subtitle: string;
  takeaway: string;
  evidenceNote: string;
  context: string;
  approach: string;
  decision: string;
  learning: string;
  nextStep: string;
  walkthrough: string;
  discussion: string[];
  steps: { label: string; description: string }[];
};

// These are plain-language interpretations of the evidence linked in content.ts.
// Future work is proposed, not represented as completed or underway. Walkthroughs
// describe the projects without claiming independent, unaided implementation.
export const stories: Record<string, ProjectStory> = {
  liquidity: liquidityStory,
  "covenant-risk": covenantStory,
  "real-estate-risk": realEstateStory,
  customization: {
    subtitle: "Keep a restricted portfolio close to its original plan.",
    takeaway:
      "Risk-aware allocation tracked the policy more closely. In the no-gold example, avoiding trades bought relatively little modeled cost relief.",
    evidenceNote:
      "Historical eight-ETF study; assumed trading costs. Lower tracking risk is not higher return.",
    context:
      "A client can agree with an investment policy but be unable to hold one of its assets. Redistributing that asset's weight changes the portfolio's behavior. The question is how to honor the restriction while staying close to the plan, and whether fewer trades justify a larger departure.",
    approach:
      "The study compared three allocation methods across ten account scenarios from 2014 to 2025. A separately implemented Python + SQL checker reconstructed holdings, fees, account values, and return contributions across all 30 paths. It also checked that decisions preceded execution-day returns. Tracking error measures how variable portfolio-minus-policy returns are; it does not measure return-prediction skill.",
    decision:
      "Separate the allocation engine from the accounting and timing checks: a plausible optimizer output still needs to be challenged. Deliberately inject faults, diagnose them, correct them, and retest before reviewing the investment trade-off. Then compare realized tracking risk with modeled dollar costs rather than assuming less turnover is always worth it.",
    learning:
      "Minimum-risk allocation reduced realized tracking error by a median 35.5% across nine constrained scenarios. In the no-gold case, lower turnover saved about $110 a year per $1 million of reference account value versus minimum risk, while adding roughly 27 basis points of gross tracking error. Separately, 115 baseline controls passed and all five deliberately injected faults were blocked before a clean retest.",
    nextStep:
      "Extend the existing sensitivity work to alternative investment universes and evaluation periods before generalizing. The independent checker still shares source data and economic assumptions; it does not certify optimizer optimality.",
    walkthrough:
      "My project asks two questions: how should a restricted portfolio be allocated, and can the resulting rebalance be independently checked? I compared three methods, then used a separately implemented Python and SQL checker to reconstruct all 30 simulation paths and challenge accounting, timing, and constraints. Five deliberately injected faults were blocked, followed by a clean retest; these were test cases, not client incidents. The investment trade-off is concrete: in the no-gold example, trading less saved only about $110 a year per $1 million under the assumed costs while adding roughly 27 basis points of tracking error. That means more variable returns relative to the policy, not a return forecast. The engineering lesson is to explain a failed check and its diagnosis alongside the investment decision. This remains historical research, not a production trading system.",
    discussion: [
      "What does an independent checker add, and which shared assumptions can it still miss?",
      "When would $110 of modeled annual savings justify more tracking risk, and what could change that answer?",
    ],
    steps: [
      { label: "Set the restriction", description: "Start with a policy allocation and an account constraint, such as no gold." },
      { label: "Reconstruct and challenge", description: "Independently check the three allocation methods' accounting, timing, and constraints." },
      { label: "Review the trade-off", description: "After the technical checks, compare tracking risk with modeled account costs." },
    ],
  },
  "pure-news": {
    subtitle: "Turn changed disclosures into questions an analyst can check.",
    takeaway:
      "The useful output is a traceable research question, with an explicit option to reject it.",
    evidenceNote:
      "Frozen evidence demo, not live AI. Human usefulness review is still pending.",
    context:
      "A disclosure can sound important without containing genuinely new information. Analysts need to see what changed, what was already known, and which exact passages support an interpretation before spending time on a new thesis.",
    approach:
      "The workflow compares consecutive disclosures, links the changed text to source passages, checks earlier filings and eligible news, and separates facts from interpretations. A skeptical review searches for counterevidence before a research question is presented. The public demo displays frozen evidence packets.",
    decision:
      "Keep change detection separate from hypothesis generation, and let the workflow reject weak ideas. A citation can support a factual statement without validating an investment thesis, so evidence coverage is not treated as proof of usefulness or trading value.",
    learning:
      "The disclosure workflow produced 995 evidence-backed changes. A separate eight-case idea review retained two research hypotheses and rejected six cases; none became an actionable trade view. The demonstrated outcome is traceability and selective hypothesis formation, not proven analyst productivity.",
    nextStep:
      "Run blinded human review of the frozen packets before broader case evaluation or an analyst-workflow pilot.",
    walkthrough:
      "My project addresses the gap between noticing a changed filing and having a defensible research question. The workflow compares disclosures, preserves the supporting passages, checks what was already known, and challenges the interpretation. It produced 995 evidence-backed changes. In a separate eight-case idea review, only two hypotheses survived and six cases were rejected; there were no actionable trade views. Both an accepted hypothesis and a rejection are available to inspect, because the evidence trail matters more than always producing an answer. The public site is a frozen demo, not live AI. My next step is blinded human review to find out whether analysts actually find these packets useful.",
    discussion: [
      "What evidence should make the system reject an otherwise plausible idea?",
      "How would you test analyst usefulness separately from citation accuracy?",
    ],
    steps: [
      { label: "Find the change", description: "Compare consecutive disclosures and preserve the exact supporting passages." },
      { label: "Check the context", description: "Look at earlier evidence and challenge the first interpretation." },
      { label: "Question or reject", description: "Present a bounded research question, or explain why the idea did not survive." },
    ],
  },
  "news-research": {
    subtitle: "Test whether more text actually improves return prediction.",
    takeaway:
      "The richer information set did not show an incremental predictive benefit over simpler comparisons.",
    evidenceNote:
      "Completed null finding. Exact empirical reruns require licensed data.",
    context:
      "Adding annual filings and news makes a research pipeline more complex. That complexity is only justified for return prediction if the added information improves on simpler inputs, not merely if the final model has an attractive headline statistic.",
    approach:
      "The study compared added annual-filing and permitted-news features with existing current-report and control specifications. Comparisons were locked and inputs constrained by when information was available. The information coefficient, or IC, summarizes the relationship between a signal and subsequent returns; the key question was the improvement over the simpler comparison.",
    decision:
      "Judge incremental value rather than the combined model's standalone score. Preserve the locked result and stopping rules when the added features do not help, instead of treating extra complexity as progress.",
    learning:
      "The incremental IC was -0.00227, with a 95% interval of [-0.00567, 0.00049]. The interval includes zero and the study did not validate incremental alpha. This result informed the narrower Pure News workflow for evidence-linked disclosure review.",
    nextStep:
      "Evaluate the disclosure-review workflow on human usefulness. Any renewed return-prediction claim would need a separate, preregistered study with the required licensed data.",
    walkthrough:
      "My research question was whether adding annual-filing and news features improved return prediction beyond simpler inputs. I focused on the incremental comparison, because a decent overall model score does not tell me whether the added data helped. The incremental information coefficient was about minus 0.0023, and its 95% interval included zero. That did not validate incremental alpha. I retained the negative result, and it informed a narrower direction: helping an analyst inspect disclosure changes rather than claiming to predict returns. The public repository preserves the findings and demonstrates the pipeline with synthetic fixtures; reproducing the empirical estimates requires licensed data. The lesson is to design a fair comparison and change direction when the evidence does not support the original thesis.",
    discussion: [
      "Why can a positive overall IC coexist with no incremental value from new features?",
      "What should be frozen before testing a new signal, and what result would make you stop?",
    ],
    steps: [
      { label: "Set the comparison", description: "Ask what annual filings and news add beyond the simpler specifications." },
      { label: "Test incremental value", description: "Respect information timing and compare the locked results." },
      { label: "Keep the finding", description: "Report the null result and separate the workflow opportunity from return prediction." },
    ],
  },
  "black-litterman": {
    subtitle: "Translate analyst conviction into constrained portfolio choices.",
    takeaway:
      "Analyst views become explicit inputs that can be checked against risk and trading limits.",
    evidenceNote:
      "Student-fund research prototype; no verified live deployment or performance improvement.",
    context:
      "An analyst's buy recommendation does not specify how large a position should be. A portfolio also has existing exposures, uncertain forecasts, position limits, and a finite trading budget. Those considerations need to meet in one reviewable process.",
    approach:
      "The Black-Litterman implementation starts with factor-based expected returns, blends in analyst views according to assumed confidence, and solves for allocations within portfolio constraints. Attribution then separates sector and factor contributions to help explain portfolio behavior.",
    decision:
      "Represent conviction as uncertainty around a view rather than treating every forecast equally. Keep position, market-exposure, tracking-risk, and turnover constraints explicit, so the strongest individual view does not automatically dominate the portfolio.",
    learning:
      "The implementation makes the path from prior assumptions to views to constrained weights inspectable. Confidence settings and constraints are part of the investment decision; the existence of an optimized allocation does not establish that its forecasts are accurate.",
    nextStep:
      "Evaluate how allocations change when confidence assumptions, expected returns, and constraints are perturbed, then compare against simpler allocation rules.",
    walkthrough:
      "My Black-Litterman project asks how an analyst's recommendation should affect portfolio weights. The prototype starts from factor-based expected returns, blends in analyst views with explicit confidence assumptions, and allocates within position, market-exposure, tracking-risk, and turnover limits. I can walk through how a view changes the expected-return input, then explain why a constraint may limit the resulting trade. Attribution provides another way to discuss the exposures behind portfolio behavior. The result is a reviewable student-fund research implementation, not a claim that an optimizer improved live performance. The next question I would test is whether the allocations remain sensible when confidence assumptions or forecasts change.",
    discussion: [
      "How should lowering confidence in a view change its effect on the portfolio?",
      "How would you distinguish an allocation driven by a forecast from one driven by a binding constraint?",
    ],
    steps: [
      { label: "Start with a baseline", description: "Use factor-based expected returns as the starting assumptions." },
      { label: "Add a view", description: "Blend analyst expectations according to explicit confidence assumptions." },
      { label: "Apply the limits", description: "Find constrained weights and inspect their exposures and attribution." },
    ],
  },
  "corporate-niche": {
    subtitle: "Ask whether business-model similarity can be measured.",
    takeaway:
      "The representation recovered relative crowding in synthetic data, not an investable signal.",
    evidenceNote:
      "Synthetic measurement benchmark only; no real-company validation.",
    context:
      "Companies in the same industry can have very different economics, while companies in different industries can share important characteristics. This project asks whether a structured business-model map can measure how crowded a firm's position is before asking whether that matters for investment outcomes.",
    approach:
      "The framework represents firms along six dimensions, including pricing power, defensibility, innovation, and capital efficiency. It uses time-aware transformations and synthetic scenarios with known underlying structure to test whether nearby points actually recover competitive crowding. Predictive and investment claims are evaluated separately.",
    decision:
      "Separate measurement from prediction. Recovering a known pattern in a synthetic world can support a measurement method, but it cannot establish real-company relevance, survival prediction, or profitable trading.",
    learning:
      "The crowding measure achieved a pooled rank correlation of 0.3215 with the synthetic world's underlying density. General survival, investable-return, and stable-taxonomy claims were rejected. The surviving result is a candidate measurement architecture for further research.",
    nextStep:
      "Begin a measurement-only real-company pilot: freeze the inputs, check coverage and stability without opening outcomes, then seek blinded analyst review before testing prediction.",
    walkthrough:
      "My project explores a business-model map rather than relying only on industry labels. Firms are represented across six dimensions, and the first question is whether the map can recover competitive crowding. I tested that in synthetic scenarios where the underlying structure is known. The crowding measure had a rank correlation of about 0.32 with that structure. The important distinction is that measurement worked within this benchmark, while the broader return, general-survival, and stable-taxonomy claims did not. This is a measurement research framework, not a stock-picking tool. The next step is a real-company pilot focused on coverage, stability, and analyst review before opening investment outcomes.",
    discussion: [
      "What can synthetic recovery establish, and what still requires real-company evidence?",
      "How would you test whether the map is stable without selecting it for attractive returns?",
    ],
    steps: [
      { label: "Represent the firm", description: "Describe business economics with six consistently oriented dimensions." },
      { label: "Measure crowding", description: "Compare nearby positions using information available at each date." },
      { label: "Test each claim", description: "Check measurement, prediction, and portfolio utility separately." },
    ],
  },
  "trading-floor": {
    subtitle: "Practice a market decision, then inspect the reasoning.",
    takeaway:
      "Repeatable scenarios make decisions and trade-offs available for review, not just a final score.",
    evidenceNote:
      "Pre-release educational preview; synthetic markets and unvalidated learning outcomes.",
    context:
      "Knowing a formula is different from explaining a decision under pressure. Students need a way to practice market-making, execution, options, probability, catalysts, and interviews, then revisit why a choice was strong or weak.",
    approach:
      "The browser simulator offers six practice modes with seeded scenarios, explanations, scoring, and replay. Using the same seed reproduces a scenario, so a learner can revisit a decision under the same starting conditions. Progress is stored locally in the browser.",
    decision:
      "Reward risk awareness, reasoning, calibration, and communication rather than profit alone. Keep practice synthetic and make replay part of the learning loop, so a lucky outcome is not the only feedback a learner sees.",
    learning:
      "The delivered artifact is a playable practice environment with repeatable scenarios and reviewable feedback. It demonstrates the practice loop; whether that loop improves learning or interview performance remains a separate evaluation question.",
    nextStep:
      "Complete user-acceptance testing with learners, inspect where instructions and feedback fail, and evaluate learning outcomes separately from software functionality.",
    walkthrough:
      "My Trading Floor project turns market concepts into repeatable practice. A learner can work through one of six modes, make a decision, explain it, and inspect the feedback. Seeded scenarios let them replay the same starting conditions instead of confusing a different market path with better reasoning. The decision and its review belong together, because scoring emphasizes risk awareness and communication as well as outcomes. The preview runs in the browser and stores progress locally. It is an educational simulator, not live trading or a hiring predictor. The next step is user-acceptance testing, followed by a separate evaluation of whether the practice actually improves learning.",
    discussion: [
      "How would you score sound risk management when the simulated outcome is unlucky?",
      "What would demonstrate learning improvement rather than just repeated play?",
    ],
    steps: [
      { label: "Choose a scenario", description: "Practice a market concept with a repeatable synthetic starting point." },
      { label: "Make the decision", description: "Balance the objective, uncertainty, risk, and explanation." },
      { label: "Review and replay", description: "Inspect feedback and revisit the same scenario to examine the trade-offs." },
    ],
  },
};
