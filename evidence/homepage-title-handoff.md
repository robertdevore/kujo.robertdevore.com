# Homepage SEO title correction

- Scope: robertdevore/kujo.robertdevore.com, main.
- Date: 2026-09-07.
- User decision: homepage SEO and social-sharing titles must be exactly `Clarity. Context. Control.`.
- Source: `scripts/render.kujo`. Homepage document title omits the usual course suffix; other pages retain it. Open Graph and Twitter titles use the same exact homepage title.
- Validation: native build and site checks passed (53 pages, 2902 references). Production HTTP 200 and exact document/Open Graph/Twitter title checks passed.
- Deployment: `5aa1e4c0-d257-4ff9-85a1-55db56914b6f`.
- Strata target: Agent Notes. Deduplication search `Kujo homepage Clarity Context Control SEO` returned no matches. This file is the handoff source if memory storage is unavailable.
- Retrieval cues: Kujo homepage SEO title, Clarity Context Control.
- SignalBox: no captures warranted.
- Strata save failed with HTTP 500; no memory was stored and retrieval remains pending. Retry the documented `agent summary --file` command with this file and project `Agent Notes`.
