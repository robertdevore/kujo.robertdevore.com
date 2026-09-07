# Course prose review — 2026-09-07

Scope: `robertdevore/kujo.robertdevore.com`, branch `main`; all 40 lesson sources, six stage builds, capstone, informational pages, and homepage copy.

User constraint: apply the Orwell writing skill without simplifying away technical detail. Preserve precise terminology, runtime qualifications, security boundaries, and executable contracts. This applies to future editorial work on this technical course.

Edited 35 lesson sources and eight project/informational pages. Removed abstract phrasing, clarified actors and operations, shortened repeated instructions, and removed irrelevant server requirements from early builds. Homepage copy now describes reproducible software, inspectable results, and explicit capability controls. Metadata for Build 2 no longer calls domain records “typed-looking.”

Corrected one existing prose/example mismatch: `examples/32.kujo` requires an integer `count` from 0 to 100 and rejects extra fields; it does not define an action field. The lesson now describes that schema directly.

Validation:

- Code fences and example placeholders unchanged in all 43 edited Markdown sources.
- Executable examples, projects, fixtures, commands, and captured diagnostics unchanged.
- 40 successful VM examples and 40 intentional failures passed verification.
- 20 project/package/HTTP/database/replay/capstone checks passed.
- Site checks passed: 53 pages, 2902 internal references, lesson structures, metadata, sitemap, assets, and size budgets.
- Rebuilt after the final schema-prose correction.

Memory handoff: target Strata `Agent Notes`; deduplication query `Kujo course Orwell technical precision` returned no matches. Retrieval cues: Kujo course technical writing, Orwell precision, preserve runtime qualifications. This record preserves the user constraint and completed review if Strata remains unavailable. SignalBox: no captures warranted.

Strata save failed with HTTP 500. No memory was stored; retrieval verification is pending. Retry `npm run strata -- --agent --json agent summary --file /Users/robertdevore/2026/kujo.robertdevore.com/evidence/orwell-review.md --project 'Agent Notes'` from the Strata repository.

Cloudflare deployment: `0112b08a-c554-420a-b3cd-0cb013a1acbf`. Production verification passed for DNS, TLS, 52 routes, canonicals, metadata, assets, robots, and unknown-route 404 behavior.

All 52 live main-content regions exactly matched the reviewed build. Full-document byte comparison encountered Cloudflare-injected scripts; comparing the complete `<main>` regions verified published prose without treating injected transport-layer scripts as editorial changes.
