import { useEffect } from "react";

/** Progressive enhancement: content stays readable without motion or JavaScript. */
export function useSiteMotion(route: string, paused: boolean) {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>(".atlas-root");
    if (!root) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const elements = new Set<HTMLElement>();
    const selector =
      ".quick-review-cases>a,.view-art,.explore-picks>a,.a-chapter-art,.a-career-landscape,.a-workbench,.a-theater,.a-section-head,.a-card,.a-findings>a,.a-home-about,.a-lab-teaser,.a-case-brief,.a-narrative-grid>section,.a-process>li,.a-map-detail,.a-method-loop>div,.a-career-chapter,.a-education article,.a-contact,.a-compare-grid>article,.a-lab-workspace,.a-story-visual,.a-method-map";
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const el = entry.target as HTMLElement;
          el.classList.toggle("motion-visible", entry.isIntersecting);
          if (entry.isIntersecting) el.classList.add("motion-arrived");
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -20px 0px" },
    );
    const scan = () =>
      root.querySelectorAll<HTMLElement>(selector).forEach((el) => {
        if (elements.has(el)) return;
        elements.add(el);
        el.classList.add("motion-item");
        el.style.setProperty(
          "--motion-order",
          String(Array.from(el.parentElement?.children || []).indexOf(el) % 4),
        );
        observer.observe(el);
      });
    const preference = () =>
      root.classList.toggle("motion-enabled", !paused && !reduced.matches);
    const mutations = new MutationObserver(scan);
    scan();
    preference();
    mutations.observe(root.querySelector("main")!, {
      childList: true,
      subtree: true,
    });
    reduced.addEventListener("change", preference);
    return () => {
      observer.disconnect();
      mutations.disconnect();
      reduced.removeEventListener("change", preference);
      root.classList.remove("motion-enabled");
    };
  }, [route, paused]);
}

export function ResearchRibbon() {
  const text =
    "PORTFOLIO CONSTRUCTION / DISCLOSURE EVIDENCE / MODEL EVALUATION / RISK ANALYSIS / ";
  return (
    <div className="a-research-ribbon" aria-hidden="true">
      <div>
        <span>{text}</span>
        <span>{text}</span>
      </div>
    </div>
  );
}
