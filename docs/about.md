This free, self-guided course is for people who already develop software. It teaches Kujo's runtime semantics, practical automation, explicit capabilities, deterministic AI mechanisms, and the boundary between language and ecosystem.

The signature loop is Goal → Write → Run → Inspect → Verify → Harden → Automate. Later it becomes Goal → Context → Act → Evaluate → Record → Stop. A model call is one effect inside working software, not a replacement for evaluation.

## How to study

Read a lesson, predict the example's output, run it locally, compare it with the captured result, then deliberately break it. Implement the exercise before marking the lesson complete. Stage builds apply the skills you have learned; the final capstone combines them into a small complete system.

Progress is stored in this browser only, without an account. If browser storage is unavailable, reading and navigation still work. Search is local to the published course. No submitted code is executed remotely.

## Built with Kujo

The site uses a small Kujo-native static builder and preparation script. Markdown lessons, executable examples, and verification receipts are separate source artifacts. The general Kujo SSG was evaluated, but its measured build latency was unsuitable for this course; the specialized builder retains native Markdown rendering and adds escaped code fences. The public site consists of static HTML, CSS, and small progressive JavaScript enhancements, served by Cloudflare Workers Static Assets.

The Python course informed the visible learning map, search, and lesson navigation. The Rust and TypeScript course repositories informed verification discipline and local progress. Kujo's own executable contracts remain the authority for language content.

## Version and limitations

Examples target the official Kujo 1.3.1 release, verified on 2026-09-06. Known differences between its VM and written contracts are documented in the [evidence ledger](/evidence/). Experimental JIT and deferred generics, FFI, WASM, and macros are not baseline course features.

Course source and examples are available in the [standalone repository](https://github.com/robertdevore/kujo.robertdevore.com). Third-party source and fixture provenance are recorded in THIRD_PARTY.md. The verification results cover the recorded examples and runtime version; they do not certify production deployments.

