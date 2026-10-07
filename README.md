# Josh Gutierrez | Investment Research

An interactive, evidence-linked portfolio: [joshgutierrez56.github.io](https://joshgutierrez56.github.io/).

## What is here

- A searchable, filterable project index with expandable research cases.
- A portfolio-construction comparison using three reviewed aggregate observations, with visible assumptions and limits.
- An account-size control that scales modeled annual transaction costs only; it does not forecast returns or interpolate portfolio results.
- Links to public research repositories and demonstrations. Synthetic projects and work in progress are labeled separately.

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

The production build type-checks, bundles with Vite, and prerenders the full page with React's server renderer. The browser hydrates that HTML to enable filters, selectors and controls. Static content remains readable without JavaScript. GitHub Actions builds and deploys `dist/` to GitHub Pages.

## Sources and methodology

Research claims and project links are maintained in `src/content.ts`. The three-row comparison is documented in `public/assets/portfolio-case-study.md`, with the aggregate CSV and provenance record alongside it. No security-level licensed observations or private project data are included. Historical or modeled research outputs are not live execution results, client performance or investment advice. The scale control holds the modeled cost rate constant.

The site was developed with AI assistance and Higgsfield's website tooling, then adapted into this portable static React implementation. The abstract editorial hero artwork was generated using Higgsfield; it is illustrative, not a chart or a representation of research results. The comparison chart is built from the reviewed aggregate research values, not generated artwork. Repository and case-study links are the evidence trail; AI assistance is not evidence of a claim.

No contact form, tracking script, advertising SDK, account system or backend is included. Google Fonts supplies the optional display fonts; system fallbacks remain available.

## License

The MIT license applies to original website source code. It does not grant rights to research data, documents, generated artwork, third-party libraries, fonts or linked content. See `LICENSE`.
