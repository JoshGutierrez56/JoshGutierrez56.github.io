"""Production browser checks. Requires Python Playwright; writes bounded JSON artifacts."""
import json
import re
from pathlib import Path
from urllib.parse import urlparse
from playwright.sync_api import sync_playwright, expect

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT.parent / "artifacts" / "atlas"
OUT.mkdir(exist_ok=True)
BASE = "http://127.0.0.1:4173"
routes = ["/", "/research/", "/lab/", "/methods/", "/about/", "/compare/", "/start-here/", "/journey/", "/visual-atlas/", "/research-notes/", "/code/", "/turning-points/"]
routes += ["/research/" + p.name + "/" for p in (ROOT / "dist/research").iterdir() if p.is_dir()]
report = {"routes": [], "interactions": [], "errors": [], "broken_local_links": []}

def checkpoint():
    (OUT / "verification.json").write_text(json.dumps(report, indent=2), encoding="utf-8")

with sync_playwright() as pw:
    browser = pw.chromium.launch()
    page = browser.new_page(viewport={"width": 1440, "height": 1000})
    page.on("pageerror", lambda error: report["errors"].append(str(error)))
    for route in routes:
        response = page.goto(BASE + route, wait_until="networkidle")
        assert response.status == 200, route
        expect(page.locator("main h1")).to_have_count(1)
        assert page.locator("main h1").inner_text().strip(), route
        # Verify public local artifacts and routes without following external sites.
        for href in page.locator("a[href]").evaluate_all("els=>els.map(e=>e.getAttribute('href'))"):
            if not href.startswith("/"):
                continue
            path = ROOT / "dist" / urlparse(href).path.lstrip("/")
            if not path.exists():
                report["broken_local_links"].append({"route": route, "href": href})
        measurements = {}
        for width in [1440, 768, 390, 320]:
            page.set_viewport_size({"width": width, "height": 900})
            measurements[str(width)] = page.evaluate("document.documentElement.scrollWidth <= innerWidth")
        if route.startswith("/research/") and route != "/research/":
            # Inspect all four case-study chapters, including existing exhibits at mobile width.
            for tab in ["The decision", "Explore the exhibit", "Under the hood", "My contribution", "Sources & limits"]:
                page.get_by_role("tab", name=tab, exact=True).click()
                expect(page.get_by_role("tab", name=tab, exact=True)).to_have_attribute("aria-selected", "true")
                measurements[tab] = page.evaluate("document.documentElement.scrollWidth <= innerWidth")
                assert page.get_by_role("tabpanel").inner_text().strip()
        report["routes"].append({"route": route, "fits": measurements})
        checkpoint()

    page.set_viewport_size({"width": 1440, "height": 1000})
    page.goto(BASE + "/research/", wait_until="networkidle")
    page.get_by_role("textbox", name="Search research").fill("ZZZ_NO_RESULT")
    expect(page.get_by_text("No research matches that view.")).to_be_visible()
    page.get_by_role("button", name="Reset view").click()
    expect(page.locator(".a-card")).to_have_count(17)
    page.get_by_role("button", name="Portfolio construction", exact=True).click()
    assert 0 < page.locator(".a-card").count() < 17
    page.get_by_role("button", name="All work", exact=True).click()
    report["interactions"].append("Library search, empty state, reset, and category filters")

    for i in range(3):
        page.locator(".a-card-bottom button").nth(i).click()
    expect(page.locator(".a-compare-link span")).to_have_text("3")
    page.locator(".a-card-bottom button").nth(3).click()
    expect(page.get_by_role("status")).to_contain_text("three projects")
    page.locator(".a-compare-link").click()
    expect(page.locator(".a-compare-grid > article")).to_have_count(3)
    page.reload(wait_until="networkidle")
    expect(page.locator(".a-compare-grid > article")).to_have_count(3)
    page.locator(".a-compare-title button").first.click()
    expect(page.locator(".a-compare-grid > article")).to_have_count(2)
    report["interactions"].append("Comparison add, three-project limit, persistence, removal")

    page.keyboard.press("Control+k")
    expect(page.get_by_role("dialog")).to_be_visible()
    page.get_by_role("textbox", name="Search projects and pages").fill("liquidity")
    page.locator(".a-search-results > a").first.click()
    expect(page).to_have_url(re.compile("/research/liquidity/"))
    expect(page.get_by_role("dialog")).not_to_be_visible()
    page.get_by_role("button", name="Search site").click()
    page.keyboard.press("Escape")
    expect(page.get_by_role("dialog")).not_to_be_visible()
    report["interactions"].append("Keyboard search, result navigation, Escape dismissal")

    page.goto(BASE + "/lab/", wait_until="networkidle")
    page.locator("#lab-account").fill("2000000")
    expect(page.locator(".a-metric-pair strong").first).to_have_text("$145")
    page.get_by_role("button", name="Minimum tracking risk", exact=False).click()
    expect(page.locator(".a-metric-pair strong").first).to_have_text("$365")
    page.get_by_role("button", name="Reset scenario", exact=False).click()
    expect(page.locator(".a-metric-pair strong").first).to_have_text("$72")
    for i in range(5):
        page.locator(".a-lab-menu button").nth(i).click()
        expect(page.locator(".a-lab-menu button").nth(i)).to_have_attribute("aria-pressed", "true")
        assert page.locator(".a-lab-workspace").inner_text().strip()
    report["interactions"].append("Lab allocation choices, dollar scaling, reset, five experiments")

    page.goto(BASE + "/methods/", wait_until="networkidle")
    for i in range(6):
        page.locator(".a-map-node").nth(i).click()
        expect(page.locator(".a-map-node").nth(i)).to_have_attribute("aria-pressed", "true")
        expect(page.locator(".a-map-detail .a-source-list a")).to_have_count(2)
    page.goto(BASE + "/about/", wait_until="networkidle")
    for i in range(5):
        page.locator(".a-timeline-controls button").nth(i).click()
        expect(page.locator(".a-timeline-controls button").nth(i)).to_have_attribute("aria-pressed", "true")
    report["interactions"].append("Six methods-map nodes and five verified career chapters")

    page.goto(BASE + "/#project-deep-momentum", wait_until="networkidle")
    expect(page).to_have_url(BASE + "/research/deep-momentum/")
    page.get_by_role("tab", name="The decision").focus()
    page.keyboard.press("ArrowRight")
    expect(page.get_by_role("tab", name="Explore the exhibit")).to_be_focused()
    page.set_viewport_size({"width": 390, "height": 844})
    page.get_by_role("button", name="Menu", exact=True).click()
    page.get_by_role("navigation", name="Primary navigation").get_by_text("About", exact=True).click()
    expect(page).to_have_url(BASE + "/about/")
    expect(page.get_by_role("button", name="Menu", exact=True)).to_have_attribute("aria-expanded", "false")
    page.go_back(wait_until="networkidle")
    expect(page).to_have_url(BASE + "/research/deep-momentum/#chapter=exhibit")
    expect(page.get_by_role("tab", name="Explore the exhibit")).to_have_attribute("aria-selected", "true")
    report["interactions"].append("Legacy project links, keyboard tabs, mobile menu, browser back")

    page.goto(BASE, wait_until="networkidle")
    page.get_by_role("button", name="Pause ambient motion").click()
    expect(page.get_by_role("button", name="Resume ambient motion")).to_have_attribute("aria-pressed", "true")
    page.reload(wait_until="networkidle")
    expect(page.get_by_role("button", name="Resume ambient motion")).to_have_attribute("aria-pressed", "true")
    page.emulate_media(reduced_motion="reduce")
    assert page.locator("main").evaluate("el=>getComputedStyle(el).animationName") == "none"
    report["interactions"].append("Persistent motion control and reduced-motion CSS")
    nojs = browser.new_context(java_script_enabled=False)
    static = nojs.new_page()
    for route in ["/", "/research/", "/about/", "/research/customization/"]:
        static.goto(BASE + route)
        assert static.locator("main h1").inner_text().strip()
    report["interactions"].append("Prerendered content readable without JavaScript")
    nojs.close()
    checkpoint()
    browser.close()

print(json.dumps({"routes":len(report["routes"]), "interaction_groups":len(report["interactions"]), "errors":report["errors"], "overflows":[r for r in report["routes"] if not all(r["fits"].values())], "broken_local_links":report["broken_local_links"]},indent=2))
assert not report["errors"]
assert not report["broken_local_links"]
assert all(all(r["fits"].values()) for r in report["routes"])
