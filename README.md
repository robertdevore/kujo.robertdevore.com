# Kujo Course

A standalone course for https://kujo.robertdevore.com: 40 lessons, six stage builds, and a local-first AI operations capstone. It targets developers and teaches Kujo's actual language, VM, effects, capability boundaries, and deterministic AI mechanisms.

## Reproduce

Install official Kujo **1.3.1**, verify the release checksum, and use Node 24+ with npm for the maintenance verification and Cloudflare deployment tools.

```sh
npm ci
KUJO_BIN=/absolute/path/to/kujo npm run verify
npm run preview
```

A locally downloaded `.tools/kujo` takes precedence in the build wrapper. Set `KUJO_BIN_OVERRIDE` to override it for build experiments. No binary or credentials are committed. The supplied `scripts/install-runtime.sh` downloads and checksum-verifies the pinned official macOS/Linux binary into `.tools`.

The site is built by **Kujo**: `scripts/prepare.kujo` joins authored lessons with actual verification receipts; `scripts/render.kujo` emits static HTML through the native Markdown primitive. The full Kujo SSG was evaluated and replaced with this smaller course-specific pipeline after measured latency made iterative verification impractical. All layout, search, progress, code highlighting, and the example explorer are independent of other repositories.

## Content and verification

- `course.json` owns the six stages and 40 ordered lessons.
- `lessons/` contains authored lessons with source/output placeholders.
- `examples/` contains 40 VM success cases and 40 intentional failures.
- `fixtures/expected.json` contains reviewed stdout expectations; changes require explanation.
- `docs/` and `pages.json` hold builds, capstone, and editorial pages.
- `projects/` contains actual Kujo comparison implementations, modules, tests, manifests, and lockfiles.
- `evidence/` holds runtime, project, source, browser, and production receipts.
- `output/`, prepared content, generated template variants, and local work are ignored.

`npm run verify` checks each success file, executes it with minimum allowances, checks exact stdout, verifies each negative exit category and diagnostic reason, exercises CLI/DocGen/LSP commands, runs isolated package/capstone tests, and validates generated links, lesson structure, metadata, sitemap, and asset-size budgets. The HTTP fixture is local and finite; the AI tests need neither a provider nor live credentials. Maintenance scripts use Node because they supervise child processes, local HTTP fixtures, and deployment tooling; application code and site generation remain Kujo-native.

Browser QA is performed through the Codex in-app browser and recorded in `evidence/browser.json`. It covers desktop/mobile rendering, search, progress persistence, example switching, deep links, console errors, and DOM accessibility checks. It is a focused check, not a claim of universal WCAG certification.

## Known runtime boundaries

See `evidence/runtime-discrepancies.json` and the public evidence page. Minimal official-release probes reproduce VM/interpreter disagreements in loop scope, repeated loop declarations, loop control, struct assignment, and qualified custom-enum matching. Builtin-name collisions were separately tested and are not mislabeled as mutable-collection failures. Course examples avoid the affected patterns and state the limits explicitly. The Kujo core checkout was not modified.

The framework `test-run` path is interpreter-hosted; test modules are imported inside test bodies because top-level imports were not available there in the tested runner. VM assertion entrypoints independently cover application behavior.

## Deployment

```sh
npm run deploy
node scripts/production.mjs
```

Wrangler publishes Workers Static Assets with no server executor, database, or model credentials. It binds only `kujo.robertdevore.com` in the existing zone, disables workers.dev and preview URLs, and serves directory-index routes plus a real 404. Progress stays in the browser. Authored HTML is trusted build input; this is not a publishing service for arbitrary untrusted Markdown.

The social PNG is generated from `scripts/social-card.svg`; on macOS use `sips -s format png scripts/social-card.svg --out assets/social.png`. The raster is committed so deployments on other systems do not need a renderer.

## Freshness

Verification date: **2026-09-06** (America/Detroit). Recheck the latest release, stable spec/scope, native and AI contracts, roadmap/changelog, security/parity matrix, and selected ecosystem revisions before updating the course. Run the gates and explain any changed expected behavior. Never silently promote a roadmap candidate into a stable lesson.
