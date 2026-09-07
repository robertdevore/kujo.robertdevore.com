# Sources and attribution

- Kujo runtime and reviewed AI cassettes: https://github.com/kujolang/kujo, MIT. The official v1.3.1 macOS x64 archive was SHA-256 verified. Upstream cassette copies in fixtures/ai are synthetic fixtures, not live-provider evidence. The copied Kujo MIT license is in vendor/KUJO-LICENSE.
- Kujo SSG: https://github.com/kujolang/ssg at e165dbc1b596ea759a2b9c2ff0b9ca988c333eea, MIT. Evaluated as a reference. The full pipeline took over four minutes to render only 11 lessons in this environment, so it is not a build dependency. The course-specific Kujo renderer uses the core native Markdown primitive with explicit fence/raw-HTML handling. SSG license retained in vendor/SSG-LICENSE for provenance.
- Inter Latin font: self-hosted regular font with its included OFL license under assets/fonts. Copied from the existing TypeScript course's attributed distribution; not a runtime dependency on that course.
- Python, Rust, and TypeScript course repositories informed learning-map/navigation and verification conventions. All Kujo lesson prose and course-specific programs were authored for this repository.
- The course's custom tool-loop cassettes were recorded through Kujo 1.3.1 from a local deterministic HTTP responder, using synthetic data only. Re-recording is explicit; ordinary verification is strict replay.
- scripts/social-card.svg is an original typography-only social card. assets/social.png is its 1200×630 rasterization with macOS sips.

Departure Mono Regular is self-hosted from the official Kujo website repository; its SIL Open Font License is in assets/fonts/DepartureMono-LICENSE.txt. The unmodified Kujo logomark and favicon were retrieved from https://kujolang.ai/assets/images/kujo-logomark.svg on 2026-09-07 at the site owner’s request. Kujo branding identifies the language; no external endorsement is claimed. Howl produces the showcase SVG/HTML/Markdown from howl.json and the verified examples/02.kujo.

Interface icons use locally hosted Tabler Icons v3.46.0 outline SVGs from https://github.com/tabler/tabler-icons, distributed under MIT (assets/icons/LICENSE). CSS masks preserve their paths and inherit monochrome interface color. The Kujo logomark remains the language brand identity.
