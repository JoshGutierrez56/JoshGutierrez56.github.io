import { readFile, writeFile } from "node:fs/promises";
import { renderToString } from "react-dom/server";
import App from "../src/App";

const path = new URL("../dist/index.html", import.meta.url);
const template = await readFile(path, "utf8");
const marker = "<!--app-html-->";
if (!template.includes(marker)) throw new Error("Prerender marker missing.");
const html = template.replace(marker, renderToString(<App />));
await writeFile(path, html);
console.log(`Prerendered portfolio: ${html.length.toLocaleString()} HTML characters.`);
