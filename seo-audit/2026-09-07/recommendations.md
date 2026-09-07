# Measurement plan

At 7 days (2026-09-14): verify sitemap ingestion and URL inspection for home, replay lesson, capstone; recrawl same 52 URLs; inspect newly available error logs and CSP/edge behavior.
At 28 days (2026-10-05): export GSC/Bing branded and nonbranded query/page/device/country metrics; compare equal windows. Run all 12 AI benchmark questions separately per provider, preserving model/version, locale, full answer, cited URLs, and date.
At 60 days (2026-11-06): repeat crawl/Lighthouse under the same settings; compare real-user LCP/INP/CLS only if enough data exist; review intent overlap using actual impressions.
At 90 days (2026-12-06): compare search/referral/conversion and citation observations; identify lesson improvements from real learner evidence. No automatic scheduled job or model-query spend was authorized or created.

Owner review: Cloudflare injected JavaScript detection dominates CPU in the baseline home lab run. Evaluate a narrowly scoped course-host configuration only after considering its security role. Do not disable zone-wide protections for a lab score. The optional www.kujo.robertdevore.com alias is unconfigured and not linked; keep canonical links on the supported hostname.

Comparator observation: https://course.raku.org/about-this-course/ explicitly separates theory, quizzes, exercises, answers and author provenance. This supports navigational clarity as a useful comparison; it provides no evidence about Kujo rankings or semantic correctness. Kujo's distinct citable value is its actual runtime diagnostics, offline replay fixtures, and capability-boundary demonstrations.
