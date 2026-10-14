import type { Project } from "./content";
import type { ProjectStory } from "./stories";

const source = "https://github.com/JoshGutierrez56/sentiment-lab-financial-news-research";
const revision = "0d6be1666811b853d954cf004b760f9595381f67";

export const project: Project = {
  id: "sentiment-lab",
  number: "11",
  title: "When a language model meets trading costs",
  category: "ML & deep learning",
  status: "Applied transformers · closed retrospective",
  question: "Can structured language-model assessments add useful information beyond a finance-specific sentiment model—and survive implementation costs?",
  contribution: "An evaluation pipeline for 5,000 articles using pretrained Qwen assessments and a FinBERT reference, typed outputs, immutable caches, chronological splits, outcome purging, and stateful portfolio accounting.",
  result: "Generic sentiment's five-session Sharpe fell from 1.1396 gross to 0.0082 after base costs. The event-surprise redesign also failed its promotion gates. Neither was promoted as a trading strategy.",
  limitation: "Pretrained-model inference, not transformer training or fine-tuning. The final redesign followed previously viewed holdout IC; it is a retrospective, not a pristine confirmatory test. Licensed source data are not redistributed.",
  methods: ["Qwen / FinBERT", "Structured NLP", "Purged time splits", "Cost-aware evaluation"],
  links: [
    { label: "Explore the research & code", href: source },
    { label: "Read the frozen retrospective", href: `${source}/blob/${revision}/docs/EVENT_SURPRISE_RETROSPECTIVE_REPORT.md` },
    { label: "Download cost comparison", href: "/assets/projects/sentiment-cost-comparison.csv", download: true },
    { label: "Read methods & provenance", href: "/assets/projects/sentiment-evidence.md", download: true },
  ],
};

export const story: ProjectStory = {
  subtitle: "Separate text understanding, predictive association, and investable performance.",
  takeaway: "A convincing model assessment is not enough. Evaluate its incremental value, uncertainty, and implementation costs.",
  evidenceNote: "Pretrained Qwen and FinBERT inference; no transformer weights trained. Saved research results, not live predictions or validated alpha.",
  context: "Financial language can sound bullish without containing new, company-specific information. This project asks whether a structured model assessment improves on a finance-specific sentiment reference, then tests whether the resulting signal is useful after realistic portfolio constraints and modeled costs.",
  approach: "The frozen corpus contains 5,000 full-text articles for 125 companies, with chronological 3,000 / 1,000 / 1,000 development, validation, and holdout partitions. Pretrained Qwen supplies typed, cached assessments; pretrained FinBERT supplies a sentiment reference. The event-surprise signal combines their disagreement with specificity, materiality, novelty, and confidence. Edge calibration uses development observations only; split-crossing outcomes and overlapping same-company trades are excluded.",
  decision: "Keep model-output validity separate from human-verified semantic accuracy, and event-level IC separate from portfolio Sharpe. Preserve the generic-sentiment result, then evaluate the narrower redesign against six predeclared promotion gates. Do not turn a failed retrospective into a success by tuning on its holdout.",
  learning: "The generic five-session portfolio's Sharpe fell from 1.1396 before costs to 0.0082 with base costs and −1.6210 with conservative costs. The event-surprise redesign had a positive event-level rank IC of 0.0349, yet its 46 accepted holdout trades produced base-net Sharpe −0.7014 over 66 sessions. Three of six gates failed; the block-bootstrap 95% Sharpe interval was [−2.9615, 3.1299]. Neither specification was promoted.",
  nextStep: "For a future study, establish blinded human labels for specificity, novelty, and abstention; measure calibration against those labels; then freeze an untouched prospective evaluation. The existing redesign had already exposed holdout IC, and its modeled fills do not establish production execution quality.",
  walkthrough: "Sentiment Lab tests whether structured financial-news assessments become useful investment signals. It uses pretrained Qwen and FinBERT; I do not present it as training a transformer. The engineering work connects typed outputs and permanent caches to chronological splits, development-only calibration, purged outcomes, and a costed daily portfolio. The key result is that classification, correlation, and trading value are different claims: generic sentiment's five-session Sharpe was 1.14 gross but approximately zero after base costs. A narrower event-surprise redesign had positive event-level rank correlation but negative net portfolio Sharpe, so it was not promoted either. Its holdout IC had already been viewed, which makes it a transparent retrospective rather than a pristine test. The next useful step is blinded semantic evaluation and a new prospective sample, not more tuning of this result.",
  discussion: [
    "Why can a positive event-level information coefficient coexist with a negative portfolio Sharpe?",
    "How would you evaluate novelty and abstention without treating another model's answer as ground truth?",
  ],
  steps: [
    { label: "Extract and compare", description: "Compare structured pretrained-model assessments with a finance-specific sentiment reference." },
    { label: "Lock the evaluation", description: "Keep chronological splits, development-only calibration, and traceable cached inputs." },
    { label: "Apply the decision rule", description: "Reconcile daily portfolio costs and uncertainty; close specifications that fail the gates." },
  ],
};
