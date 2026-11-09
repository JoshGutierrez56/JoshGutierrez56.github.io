import ExplorePage, { ExploreNavigation, exploreTabs } from "./atlas/ExplorePages";
import { useSiteMotion } from "./atlas/Motion";
import { useEffect, useRef, useState } from "react";
import { projects, github } from "./content";
import Home from "./atlas/Home";
import Library, { Compare } from "./atlas/Library";
import CaseStudy from "./atlas/CaseStudy";
import Lab from "./atlas/Lab";
import Methods from "./atlas/Methods";
import About from "./atlas/About";
import { ContactLinks } from "./atlas/Contact";
import { Arrow, EvidenceLabel, PageHeading } from "./atlas/Shared";
import { pageTitles, projectUrl, shortNames } from "./atlas/data";

const nav = [
  ["/", "Home"],
  ["/research/", "Research"],
  ["/lab/", "Decision Lab"],
  ["/methods/", "Methods"],
  ["/about/", "About"],
];
const normalize = (path: string) =>
  path === "/" ? path : `/${path.split("/").filter(Boolean).join("/")}/`;
export default function App({ initialPath = "/" }: { initialPath?: string }) {
  const [path, setPath] = useState(normalize(initialPath));
  const [saved, setSaved] = useState<string[]>([]);
  const [paused, setPaused] = useState(false);
  useSiteMotion(path, paused);
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState("");
  const [notice, setNotice] = useState("");
  const [progress, setProgress] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const searchButton = useRef<HTMLButtonElement>(null);
  const hydrated = useRef(false);
  const routeProject = path.match(/^\/research\/([^/]+)\/$/)?.[1];
  const project = projects.find((p) => p.id === routeProject);
  const title = project
    ? `${shortNames[project.id]} | Josh Gutierrez`
    : pageTitles[path] || "Page not found | Josh Gutierrez";
  const closeSearch = () => {
    dialog.current?.close();
    searchButton.current?.focus();
  };
  const openSearch = () => {
    setSearch("");
    dialog.current?.showModal();
  };
  const navigate = (next: string) => {
    const destination = new URL(next, location.href);
    const normalized = normalize(destination.pathname);
    const fullPath = normalized + destination.search + destination.hash;
    if (location.pathname + location.search + location.hash !== fullPath)
      history.pushState({}, "", fullPath);
    else {
      setMenu(false);
      dialog.current?.close();
      return;
    }
    // A same-page link can change filters without remounting the route.
    if (normalized === path) window.dispatchEvent(new PopStateEvent("popstate"));
    setPath(normalized);
    setMenu(false);
    dialog.current?.close();
    window.scrollTo({ top: 0, behavior: "instant" });
  };
  useEffect(() => {
    try {
      const value = JSON.parse(
        localStorage.getItem("jg-research-comparison") || "[]",
      );
      if (Array.isArray(value))
        setSaved(
          value
            .filter(
              (id: unknown) =>
                typeof id === "string" && projects.some((p) => p.id === id),
            )
            .slice(0, 3),
        );
      setPaused(localStorage.getItem("jg-motion") === "paused");
    } catch {
      /* Storage is optional. */
    }
    const followLocation = () => {
      const id = location.hash.replace("#project-", "");
      if (
        location.hash.startsWith("#project-") &&
        projects.some((p) => p.id === id)
      ) {
        history.replaceState({}, "", projectUrl(id));
        setPath(projectUrl(id));
        window.scrollTo(0, 0);
        return;
      }
      const aliases: Record<string, string> = {
        "#work": "/research/",
        "#more-projects": "/research/",
        "#tradeoffs": "/lab/",
        "#about": "/about/",
        "#approach": "/methods/",
        "#explore": "/research/",
        "#home": "/",
      };
      if (aliases[location.hash]) {
        history.replaceState({}, "", aliases[location.hash]);
        setPath(aliases[location.hash]);
        window.scrollTo(0, 0);
      } else setPath(normalize(location.pathname));
    };
    followLocation();
    const keys = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        openSearch();
      }
    };
    const scroll = () => {
      const total = document.documentElement.scrollHeight - innerHeight;
      setProgress(total > 0 ? window.scrollY / total : 0);
    };
    window.addEventListener("popstate", followLocation);
    window.addEventListener("hashchange", followLocation);
    window.addEventListener("keydown", keys);
    window.addEventListener("scroll", scroll, { passive: true });
    scroll();
    return () => {
      window.removeEventListener("popstate", followLocation);
      window.removeEventListener("hashchange", followLocation);
      window.removeEventListener("keydown", keys);
      window.removeEventListener("scroll", scroll);
    };
  }, []);
  useEffect(() => {
    document.title = title;
    if (hydrated.current)
      document
        .querySelector<HTMLElement>("main h1")
        ?.focus({ preventScroll: true });
    hydrated.current = true;
    const canonical = document.querySelector<HTMLLinkElement>(
      'link[rel="canonical"]',
    );
    if (canonical) canonical.href = `https://joshgutierrez56.github.io${path}`;
    setProgress(0);
  }, [path, title]);
  const save = (id: string) => {
    const present = saved.includes(id);
    if (!present && saved.length >= 3) {
      setNotice(
        "Your comparison holds three projects. Remove one to add another.",
      );
      return;
    }
    const next = present ? saved.filter((s) => s !== id) : [...saved, id];
    setSaved(next);
    setNotice(
      present ? "Removed from your comparison." : "Added to your comparison.",
    );
    try {
      localStorage.setItem("jg-research-comparison", JSON.stringify(next));
    } catch {
      /* Keep in-memory state. */
    }
  };
  const toggleMotion = () => {
    const next = !paused;
    setPaused(next);
    try {
      localStorage.setItem("jg-motion", next ? "paused" : "playing");
    } catch {
      /* Keep in-memory state. */
    }
  };
  const pageMatches = [...nav, ...exploreTabs].filter(([, label]) => label.toLowerCase().includes(search.trim().toLowerCase()));
  const matches = projects
    .filter((p) =>
      [p.id, p.title, p.question, shortNames[p.id], p.category, ...p.methods]
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase()),
    )
    .slice(0, 8);
  return (
    <div
      className={`atlas-root ${paused ? "motion-paused" : ""}`}
      onClick={(e) => {
        if (
          e.defaultPrevented ||
          e.button !== 0 ||
          e.metaKey ||
          e.ctrlKey ||
          e.shiftKey ||
          e.altKey
        )
          return;
        const a = (e.target as Element).closest<HTMLAnchorElement>("a[href]");
        if (!a || a.target || a.hasAttribute("download")) return;
        const url = new URL(a.href, location.href);
        if (
          url.origin !== location.origin ||
          url.pathname.startsWith("/assets/")
        )
          return;
        if (url.hash && !url.hash.startsWith("#project-")) return;
        if (url.hash.startsWith("#project-")) {
          e.preventDefault();
          navigate(projectUrl(url.hash.replace("#project-", "")));
          return;
        }
        const target = normalize(url.pathname);
        if (
          pageTitles[target] ||
          projects.some((p) => projectUrl(p.id) === target)
        ) {
          e.preventDefault();
          navigate(target + url.search + url.hash);
        }
      }}
    >
      <a className="a-skip" href="#main">
        Skip to content
      </a>
      <div
        className="a-progress"
        style={{ transform: `scaleX(${progress})` }}
        aria-hidden="true"
      />
      <header className="a-header">
        <div className="a-shell a-header-inner">
          <a href="/" className="a-brand" aria-label="JG. Josh Gutierrez Research Atlas home">
            <span>
              JG<i>.</i>
            </span>
            <span>
              JOSH GUTIERREZ<small>RESEARCH ATLAS</small>
            </span>
          </a>
          <nav
            className={menu ? "is-open" : ""}
            aria-label="Primary navigation"
            id="primary-nav"
          >
            {nav.map(([url, label]) => (
              <a
                key={url}
                href={url}
                aria-current={
                  (url === "/" ? path === "/" : path.startsWith(url))
                    ? "page"
                    : undefined
                }
              >
                {label}
              </a>
            ))}
            <div className="a-mobile-explore"><span className="a-eyebrow">MORE WAYS TO EXPLORE</span>{exploreTabs.map(([url,label]) => <a key={url} href={url} aria-current={path===url ? "page" : undefined}>{label}</a>)}</div>
          </nav>
          <div className="a-header-tools">
            <button
              className="a-search-trigger"
              onClick={openSearch}
              ref={searchButton}
              aria-label="Search site"
            >
              <span aria-hidden="true">&#8981;</span>
              <kbd>Ctrl K</kbd>
            </button>
            <a
              className="a-compare-link"
              href="/compare/"
              aria-label={`Compare ${saved.length} projects`}
            >
              Compare <span>{saved.length}</span>
            </a>
            <button
              className="a-menu-toggle"
              aria-expanded={menu}
              aria-controls="primary-nav"
              onClick={() => setMenu(!menu)}
            >
              {menu ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </header>
      <ExploreNavigation path={path} />
      <main id="main" key={path}>
        {path === "/" ? (
          <Home saved={saved} onSave={save} paused={paused} />
        ) : path === "/research/" ? (
          <Library saved={saved} onSave={save} />
        ) : path === "/lab/" ? (
          <Lab />
        ) : path === "/methods/" ? (
          <Methods />
        ) : path === "/about/" ? (
          <About />
        ) : path === "/compare/" ? (
          <Compare saved={saved} onSave={save} />
        ) : exploreTabs.some(([href]) => href === path) ? (
          <ExplorePage path={path} />
        ) : project ? (
          <CaseStudy id={project.id} saved={saved} onSave={save} />
        ) : (
          <div className="a-shell">
            <PageHeading
              label="404 / A DIFFERENT PATH"
              title="That page is not here."
              description="The research library is a good place to find your next question."
            />
            <a href="/research/" className="a-button">
              Open the library <Arrow />
            </a>
          </div>
        )}
      </main>
      <footer className="a-footer">
        <div className="a-shell">
          <div className="a-footer-top">
            <a className="a-footer-name" href="/">
              Josh Gutierrez<span>Questions. Models. Judgment.</span>
            </a>
            <div>
              <a href="/research/">
                Research <Arrow />
              </a>
              <a href="/about/">
                About & experience <Arrow />
              </a>
              <a href={github} target="_blank" rel="noreferrer">
                GitHub <Arrow />
              </a>
              <ContactLinks compact />
            </div>
          </div>
          <EvidenceLabel />
          <div className="a-footer-bottom">
            <span>&copy; {new Date().getFullYear()} Josh Gutierrez</span>
            <button onClick={toggleMotion} aria-pressed={paused}>
              {paused ? "Resume ambient motion" : "Pause ambient motion"}
            </button>
            <a href="#main">Back to top &uarr;</a>
          </div>
        </div>
      </footer>
      <div className="a-status" role="status">
        {notice && (
          <>
            <span>{notice}</span>
            <a href="/compare/">View comparison</a>
            <button
              aria-label="Dismiss notification"
              onClick={() => setNotice("")}
            >
              &times;
            </button>
          </>
        )}
      </div>
      <dialog
        className="a-search-dialog"
        ref={dialog}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeSearch();
        }}
        aria-labelledby="site-search-title"
      >
        <div>
          <div className="a-dialog-top">
            <h2 id="site-search-title">Find your next question.</h2>
            <button onClick={closeSearch} aria-label="Close search">
              Esc &times;
            </button>
          </div>
          <input
            autoFocus
            aria-label="Search projects and pages"
            placeholder="Search projects, methods, or site sections..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="a-search-results">
            {pageMatches.length > 0 && (
              <nav aria-label="Quick navigation">
                {pageMatches.map(([url, label]) => (
                  <a key={url} href={url}>
                    {label}
                    <Arrow />
                  </a>
                ))}
              </nav>
            )}
            <p className="a-eyebrow">
              {search ? "MATCHING RESEARCH" : "START WITH A PROJECT"}
            </p>
            {matches.map((p) => (
              <a key={p.id} href={projectUrl(p.id)}>
                <span>
                  {shortNames[p.id]}
                  <small>{p.category}</small>
                </span>
                <Arrow />
              </a>
            ))}
            {matches.length === 0 && pageMatches.length === 0 && (
              <p>No results. Try risk, portfolio, or NLP.</p>
            )}
          </div>
        </div>
      </dialog>
    </div>
  );
}
