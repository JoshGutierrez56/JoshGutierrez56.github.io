import { projects } from "./content";

// Editorial order only. Research results and evidence stay with their source projects.
export const featuredSelection = [
  { id: "customization", label: "Personalized portfolios", area: "Portfolio construction & oversight" },
  { id: "pure-news", label: "Pure News Intelligence", area: "Evidence-linked research tools" },
  { id: "sentiment-lab", label: "Sentiment Lab", area: "Applied NLP & model evaluation" },
  { id: "liquidity", label: "Liquidity forecasting", area: "Empirical research & baselines" },
  { id: "black-litterman", label: "Black–Litterman", area: "Analyst views & allocation" },
  { id: "optlab", label: "Optlab Research", area: "Data-to-portfolio engineering" },
] as const;

export const moreProjectIds = [
  "news-research", "macro-hmm", "risk-parity", "housing-forest", "covenant-risk",
  "corporate-niche", "garch-volatility", "deep-momentum", "trading-floor", "real-estate-risk",
];

const findProject = (id: string) => {
  const project = projects.find((item) => item.id === id);
  if (!project) throw new Error(`Unknown portfolio project: ${id}`);
  return project;
};

export const featuredProjects = featuredSelection.map(({ id }) => findProject(id));
export const moreProjects = moreProjectIds.map(findProject);
export const isFeatured = (id: string) => featuredProjects.some((project) => project.id === id);
// Owner identified the previous destination as incorrect; awaiting the correct URL.
export const linkedin: string | null = null;
