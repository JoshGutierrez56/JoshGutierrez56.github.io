import type { Project } from "./content";
import type { ProjectStory } from "./stories";

export const project: Project = {
  id: "covenant-risk",
  number: "09",
  title: "When does a loan breach its covenants?",
  category: "Risk & underwriting",
  status: "Scenario simulation",
  question:
    "Can a property keep meeting its loan tests when interest rates move and covenant requirements tighten?",
  contribution:
    "A seeded, 200,000-path Monte Carlo model of a five-year senior/mezzanine capital stack, combining mean-reverting rates, uncertain operating income, and quarterly covenant tests.",
  result:
    "Under the case-study assumptions, 43.5% of simulated paths breached at least one covenant by year one, rising to 89.8% by year five.",
  limitation:
    "Assumption-sensitive simulation, not observed loan performance or default probability. Rates and operating income are independent; refinancing, cures, waivers, and principal repayments are not modeled.",
  methods: ["Monte Carlo", "Debt covenants", "Cash-flow stress", "Seeded simulation"],
  links: [
    { label: "View the original case & notebook", href: "https://github.com/JoshGutierrez56/Monte-Carlo-Risk-Model" },
    { label: "Read assumptions & evidence", href: "/assets/projects/covenant-risk-method.md" },
    { label: "Download aggregate results", href: "/assets/projects/covenant-risk.csv", download: true },
  ],
};

export const story: ProjectStory = {
  subtitle: "Turn a single debt-coverage estimate into a path-dependent risk question.",
  takeaway:
    "A property can have a reasonable-looking base case and still breach a loan test along the way. The covenant schedule and the path both matter.",
  evidenceNote:
    "200,000 simulated paths, seed 42. Covenant breach is not default; probabilities depend on the stated case assumptions.",
  context:
    "A lender does not only care about a property's cash flow at the end of a holding period. The loan can require interest coverage and a minimum income-to-debt ratio each quarter. Rising borrowing costs or tighter requirements can create a breach even before maturity.",
  approach:
    "The model simulates five years of mean-reverting SOFR and uncertain net operating income for a fixed senior/mezzanine capital stack. Each quarter it checks debt-service coverage, or DSCR, and debt yield. DSCR compares income with interest due; debt yield compares annual income with the outstanding loan balance. A seeded, vectorized implementation makes the scenario reproducible.",
  decision:
    "Measure whether a covenant was breached at any point, not only whether the final quarter passed. Keep the two loan tests separate, and distinguish a contractual breach from a default: a real loan may have cure rights, waivers, or other remedies that this model does not include.",
  learning:
    "In the 200,000-path case, the share with at least one breach rose from 43.452% by year one to 89.758% by year five. The median maturity DSCR was 1.179x against a 1.20x floor. These results identify assumptions and covenant headroom to challenge; they do not estimate a real borrower's default probability.",
  nextStep:
    "Calibrate income, interest-rate exposure, and their dependence to authorized property and loan records. Then test actual amortization, hedges, refinancing, cure rights, and alternative covenant schedules before using the model for a lending decision.",
  walkthrough:
    "My project asks whether a property's cash flow can keep meeting its loan tests over a five-year holding period. I simulated 200,000 paths of interest rates and operating income for a senior and mezzanine debt structure, checking two covenants every quarter. The key design choice was to record any breach along the path rather than just the maturity result. Under the case assumptions, about 43.5% of paths had breached by year one and 89.8% by year five. That is not an 89.8% default forecast: it is a conditional simulation result, and the model does not include cure rights or waivers. The useful conversation is which assumptions, financing terms, or hedges create enough headroom. A real underwriting application would first need property-level calibration and the actual loan documents.",
  discussion: [
    "Why can a loan pass at maturity but still have breached a covenant earlier?",
    "Which matters more for this case: rates, operating income, or the tightening covenant schedule—and how would you test it?",
  ],
  steps: [
    { label: "Define the loan tests", description: "Specify the debt structure and the coverage and debt-yield requirements each quarter." },
    { label: "Simulate the paths", description: "Move rates and operating income through 200,000 seeded five-year scenarios." },
    { label: "Locate the pressure", description: "Compare breach risk across horizons and identify assumptions that need underwriting review." },
  ],
};
