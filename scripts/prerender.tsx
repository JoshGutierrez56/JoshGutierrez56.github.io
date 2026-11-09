import { readFile, writeFile, mkdir } from "node:fs/promises";
import { renderToString } from "react-dom/server";
import App from "../src/App";

import { projects } from "../src/content";
import { pageTitles, projectUrl, shortNames } from "../src/atlas/data";

const root = new URL("../dist/", import.meta.url);
const template = await readFile(new URL("index.html", root), "utf8");
const marker = "<!--app-html-->";
if (!template.includes(marker)) throw new Error("Prerender marker missing.");
const escape = (s: string) =>
  s
    .replaceAll("&", "&amp;")
    .replaceAll('"', "&quot;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
const routes = [
  ...Object.keys(pageTitles),
  ...projects.map((p) => projectUrl(p.id)),
];
for (const path of [...routes, "/404/"]) {
  const project = projects.find((p) => projectUrl(p.id) === path);
  const title = project
    ? `${shortNames[project.id]} | Josh Gutierrez`
    : pageTitles[path] || "Page not found | Josh Gutierrez";
  const description =
    project?.question ||
    "Josh Gutierrez’s Research Atlas: investment questions, interactive evidence, research methods, and institutional context.";
  let html = template
    .replace(marker, renderToString(<App initialPath={path} />))
    .replace(/<title>.*?<\/title>/, `<title>${escape(title)}</title>`)
    .replace(
      /(<meta\s+name="description"\s+content=")[^"]*("\s*\/>)/,
      `$1${escape(description)}$2`,
    )
    .replace(
      /(<meta\s+property="og:title"\s+content=")[^"]*("\s*\/>)/,
      `$1${escape(title)}$2`,
    )
    .replace(
      /(<meta\s+property="og:description"\s+content=")[^"]*("\s*\/>)/,
      `$1${escape(description)}$2`,
    )
    .replace(
      /(<link\s+rel="canonical"\s+href=")[^"]*("\s*\/>)/,
      `$1https://joshgutierrez56.github.io${path}$2`,
    )
    .replace(
      /(<meta\s+property="og:url"\s+content=")[^"]*("\s*\/>)/,
      `$1https://joshgutierrez56.github.io${path}$2`,
    );
  if (path === "/404/")
    html = html.replace(
      "</head>",
      '<meta name="robots" content="noindex" /></head>',
    );
  const file =
    path === "/404/"
      ? new URL("404.html", root)
      : new URL(`${path.slice(1)}index.html`, root);
  await mkdir(new URL(".", file), { recursive: true });
  await writeFile(file, html);
}
await writeFile(
  new URL("sitemap.xml", root),
  `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${routes
    .filter((p) => p !== "/compare/")
    .map((p) => `<url><loc>https://joshgutierrez56.github.io${p}</loc></url>`)
    .join("")}</urlset>`,
);
await writeFile(
  new URL("robots.txt", root),
  "User-agent: *\nAllow: /\nSitemap: https://joshgutierrez56.github.io/sitemap.xml\n",
);
console.log(`Prerendered ${routes.length} routes, a 404 page, and a sitemap.`);
