# Josh Gutierrez | Investment Research

An interactive, evidence-linked portfolio: [joshgutierrez56.github.io](https://joshgutierrez56.github.io/).

## What is here

A full Research Atlas in the original cool-blue, navy, and light-background palette:

- **Home**: animated research landscape, three audience paths, selected findings, and a personal introduction.
- **Research**: 17 projects with search, discipline filters, sorting, and a three-project comparison list.
- **Case studies**: individual addresses for all 17 projects; decision, exhibit, method, and source chapters.
- **Decision Lab**: five guided research scenarios, including an allocation/cost comparison with explicit assumptions.
- **Methods**: six interactive capability nodes linked to actual project evidence.
- **About**: five source-backed career/education chapters, research ownership, and public GitHub contact.
- **Compare**: browser-persisted side-by-side questions, findings, methods, and boundaries.
- Keyboard search (Ctrl/Cmd+K), responsive navigation, reduced-motion support, pause control, and a custom 404 page.

The 29 main/project routes are prerendered as real directory pages for GitHub Pages. Older `#project-*` links still resolve. The public source bundles and original interactive exhibits are retained, with historical and synthetic evidence distinguished throughout.

## Run locally

Requires Node.js 22 or newer.

```sh
npm ci
npm run dev
```

```sh
npm run build
npm run preview
```

The production build type-checks, bundles with Vite, and prerenders the full page with React's server renderer. The browser hydrates that HTML to enable filters, selectors and controls. Core page content remains readable without JavaScript; interactive controls require JavaScript. GitHub Actions builds and deploys `dist/` to GitHub Pages.

## Sources and methodology

Research claims and project links are maintained in `src/content.ts`; the plain-language narratives are in `src/stories.ts`. The three-row comparison is documented in `public/assets/portfolio-case-study.md`, with the aggregate CSV and provenance record alongside it. Visual provenance is recorded in `public/assets/projects/PROVENANCE.md`. No security-level licensed observations or private project data are included. Historical or modeled research outputs are not live execution results, client performance or investment advice. The scale control holds the modeled cost rate constant.

The site was developed with AI assistance and Higgsfield's website tooling, then adapted into this portable static React implementation. The earlier abstract editorial artwork was generated using Higgsfield and remains in the assets. The current hero uses a browser-rendered generative field, clearly labeled as illustration rather than market data. The comparison chart is built from the reviewed aggregate research values, not generated artwork. Repository and case-study links are the evidence trail; AI assistance is not evidence of a claim.

No contact form, tracking script, advertising SDK, account system or backend is included. Display fonts are self-hosted with their original licenses; system fallbacks remain available. Public contact links use the owner-approved email and LinkedIn destinations.

## License

The MIT license applies to original website source code. It does not grant rights to research data, documents, generated artwork, third-party libraries, fonts or linked content. See `LICENSE`.

## Verification

`npm run build` type-checks, builds, and prerenders all routes. With the production preview listening on port 4173, `python scripts/verify_atlas.py` checks all 29 routes at 320, 390, 768, and 1440 pixels, all case-study chapters, key interaction flows, local links, legacy deep links, and JavaScript-disabled content. This script requires Python Playwright and Chromium.

Route components, navigation data, and responsive styles are maintained in src/atlas. Browser-check scripts write reports outside the public build.
