import { projects } from "./content";

// Editorial order only. Research results and evidence stay with their source projects.
export const featuredSelection = [
  { id: "customization", label: "Personalized portfolios", area: "Portfolio construction & oversight" },
  { id: "pure-news", label: "Pure News Intelligence", area: "Evidence-linked research tools" },
  { id: "sentiment-lab", label: "Sentiment Lab", area: "Applied NLP & model evaluation" },
  { id: "liquidity", label: "Liquidity forecasting", area: "Empirical research & baselines" },
  { id: "black-litterman", label: "Black–Litterman", area: "Analyst views & allocation" },
] as const;

export const moreProjectIds = [
  "optlab", "risk-parity", "macro-hmm",
  "deep-momentum", "news-research", "housing-forest", "real-estate-risk",
  "covenant-risk", "corporate-niche", "trading-floor",
];

const findProject = (id: string) => {
  const project = projects.find((item) => item.id === id);
  if (!project) throw new Error(`Unknown portfolio project: ${id}`);
  return project;
};

export const featuredProjects = featuredSelection.map(({ id }) => findProject(id));
export const moreProjects = moreProjectIds.map(findProject);
export const isFeatured = (id: string) => featuredProjects.some((project) => project.id === id);
export const linkedin = "https://www.linkedin.com/in/josh-gutierrez-55375a142/";
