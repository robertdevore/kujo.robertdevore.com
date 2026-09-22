# Methodology — 2026-09-22

Scope: repository, generated static output, and all 52 sitemap URLs for https://kujo.robertdevore.com. The immutable before baseline was captured before the dependency edit in `raw/baseline-output.tar.gz`, `baseline.csv`, `baseline-summary.json`, dependency checksums, npm audit JSON, production response receipts, redirect/crawler probes, and a home-page Lighthouse report.

The implementation updated the exact Wrangler development dependency only. Afterward, a clean `npm ci` install, dependency-tree inspection, npm audit, full course verification/build, Cloudflare deployment dry run, a second full crawl, edge probes, and a comparable Lighthouse run were recorded. The crawl validates generated and live status, titles, descriptions, canonicals, headings, links, indexability, images, schema parsing/purpose, crawl depth, and sitemap membership. User-agent probes do not prove verified crawler-IP access.

Lighthouse is a single lab observation under simulated mobile throttling. It is not field Core Web Vitals or causal evidence of ranking improvement. Search performance, analytics, bot logs, and AI citations are reported as unavailable rather than estimated. No composite SEO or AI-readiness score is invented.
