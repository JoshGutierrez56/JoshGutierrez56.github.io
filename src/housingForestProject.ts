import type { Project } from "./content";
import type { ProjectStory } from "./stories";

export const project: Project = {
  id: "housing-forest",
  number: "12",
  title: "A high R² is not a winning forecast",
  category: "ML & deep learning",
  status: "Historical walk-forward study",
  question: "Does a random forest improve a housing-index forecast beyond simply using last month's value?",
  contribution: "A 100-tree scikit-learn ensemble with 14 inputs, expanding-window monthly refits, fixed seed, saved predictions, and a matched lag-one benchmark across 61 evaluation months.",
  result: "Random-forest R² was 0.978, but RMSE was 5.58 index points versus 2.78 for lag-one persistence: about twice the error.",
  limitation: "Historical, current-vintage data with contemporaneous macro inputs. Release timing and revisions are not controlled; this is not a real-time forecasting result. The archived evaluation snapshot is supplied separately from the original notebook repository.",
  methods: ["scikit-learn", "Random forest", "Expanding-window refits", "Baseline comparison"],
  links: [
    { label: "Read the evaluation", href: "/assets/projects/housing-forest-method.md", download: true },
    { label: "Download predictions", href: "/assets/projects/housing-forest-predictions.csv", download: true },
    { label: "Download evaluated source", href: "/assets/projects/housing-forest-source.zip", download: true },
    { label: "Original notebook repository", href: "https://github.com/JoshGutierrez56/CaseShillerRandomForest" },
  ],
};

export const story: ProjectStory = {
  subtitle: "Test a nonlinear housing model against the forecast it actually needs to beat.",
  takeaway: "The forest follows the index's trend, yet last month's value has roughly half the RMSE. A convincing fit is not incremental predictive value.",
  evidenceNote: "61 historical evaluation months · Macro release timing not controlled · Archived evaluated source included.",
  context: "A slowly changing housing index is an easy place to mistake a high R² for a useful forecast. A model can trace the broad trend while still predicting the next observation less accurately than persistence. The benchmark has to reflect what the model would replace.",
  approach: "The model uses scikit-learn's RandomForestRegressor: 100 trees, seed 42, ten macroeconomic inputs and index lags of 1, 3, 6 and 12 months. At each month from January 2020 to January 2025, a fresh forest is fitted only on earlier rows. Actual values, forest predictions and the lag-one baseline are saved for all 61 months. The portfolio exhibit redraws that original comparison and adds an error view; it does not retrain the model in the browser.",
  decision: "Score the same observations against a simple lag-one forecast, not just against the overall sample mean implicit in R². Keep calendar-order fitting separate from point-in-time data availability: restricting training rows is necessary, but contemporaneous revised macro data can still make a backtest unrealistic.",
  learning: "R² reached 0.978, but random-forest RMSE was 5.579 versus 2.782 index points for persistence. The current specification fails its baseline. This supports rejecting the model as a forecasting improvement; it does not prove that all tree models fail on housing or explain the entire error pattern.",
  nextStep: "Build a release-date-aware, vintage-data panel. Evaluate changes rather than only index levels, tune on nested chronological validation windows, compare with linear and persistence baselines, and freeze a future evaluation period. These are proposed next tests, not completed results.",
  walkthrough: "My housing project uses a random forest to model the Case-Shiller 20-city index. It combines ten macro variables with four index lags and refits a 100-tree model each month using earlier observations. The important part is the evaluation: over 61 months, R² was about 0.978, which looks excellent until you compare forecast errors. The forest's RMSE was 5.58 index points; simply using last month's value achieved 2.78. So I would not promote this model on the strength of R². There is another boundary: the macro inputs are not a release-date-aware vintage dataset, so this is historical research, not a real-time result. The lesson is to choose the right benchmark, inspect errors, and check what information was actually available before adding complexity.",
  discussion: [
    "Why can a model have high R² and still lose badly to a naive forecast?",
    "How would release delays, revisions, and tree extrapolation affect the next experiment?",
  ],
  steps: [
    { label: "Build the information set", description: "Combine ten macro series and four index lags; distinguish observation dates from release dates." },
    { label: "Refit in calendar order", description: "Fit a fresh 100-tree ensemble on prior rows for each evaluation month." },
    { label: "Challenge the score", description: "Compare saved errors with persistence on the same 61 observations." },
  ],
};
