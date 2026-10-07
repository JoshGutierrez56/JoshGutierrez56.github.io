import { createRoot, hydrateRoot } from "react-dom/client";
import App from "./App";
import "./reset.css";
import "./portfolio.css";

const container = document.getElementById("root");
if (!container) throw new Error("Portfolio root is missing.");
if (container.hasChildNodes()) hydrateRoot(container, <App />);
else createRoot(container).render(<App />);
