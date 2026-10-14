import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import "./reset.css";
import "./portfolio.css";
import "./project-visuals.css";
import "./product-preview.css";
import "./liquidity-visual.css";
import "./covenant-visual.css";
import "./real-estate-visual.css";
import "./deep-momentum-visual.css";
import "./sentiment-visual.css";
import "./housing-forest-visual.css";
import "./curation.css";
import "./quant-library-visual.css";

const container = document.getElementById("root");
if (!container) throw new Error("Portfolio root is missing.");
if (container.hasChildNodes()) hydrateRoot(container, <App />);
else createRoot(container).render(<App />);
