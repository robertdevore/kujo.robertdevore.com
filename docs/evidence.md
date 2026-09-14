## Verification boundary

The lesson verifier uses the official Kujo 1.4.0 macOS x64 release artifact, checked against its published SHA-256 checksum. The GitHub release API reported v1.4.0 published on 2026-09-09. This course was reverified on 2026-09-14 UTC. Some tagged documentation still names an older release or labels shipped additions unreleased; the release artifact, release notes, and executable probes resolve those stale labels.

Each of 40 lesson examples is checked and executed on the default VM, with exact expected stdout. Each intentional failure checks its exit category and diagnostic reason. [Download the current verification receipts](/verification.json). The repository also records package, stage-project, AI replay, browser, and production checks.

## Source hierarchy

Executable behavior and contract tests take precedence when explaining an observed release. Written specifications describe intended guarantees. If they disagree, the course shows the disagreement rather than inventing a convenient equivalence.

Core references: [language specification](https://github.com/kujolang/kujo/blob/v1.4.0/docs/LANGUAGE_SPEC.md), [stable scope](https://github.com/kujolang/kujo/blob/v1.4.0/docs/V1_SCOPE.md), [standard library](https://github.com/kujolang/kujo/blob/v1.4.0/docs/STANDARD_LIBRARY.md), [AI runtime](https://github.com/kujolang/kujo/blob/v1.4.0/docs/AI_RUNTIME.md), [CLI contracts](https://github.com/kujolang/kujo/blob/v1.4.0/docs/CLI_MACHINE_READABLE_CONTRACTS.md), [parity matrix](https://github.com/kujolang/kujo/blob/v1.4.0/docs/VM_INTERPRETER_PARITY_MATRIX.md), and [security posture](https://github.com/kujolang/kujo/blob/v1.4.0/docs/NATIVE_API_SECURITY_POSTURE.md).

## Known release discrepancies

The repository preserves minimal probes and both runtime results under evidence/runtime-discrepancies.json. Loop-local declaration and loop-variable scope probes now agree. Struct assignment, qualified custom-enum matching, and the combined loop-control probe remain discrepancies; successful course examples avoid those patterns. Original 1.3.1 receipts are preserved under evidence/history/v1.3.1 in the repository.

<table><caption>Verified release boundaries</caption><thead><tr><th>Concept</th><th>Intended contract</th><th>Observed 1.4.0 VM</th><th>Course treatment</th></tr></thead><tbody><tr><td>Repeated loop declarations</td><td>Fresh block scope per iteration</td><td>Fixed: both runtimes print 1 and 2</td><td>Keep tested accumulation patterns explicit</td></tr><tr><td>Loop scope</td><td>Loop variable does not leak</td><td>Fixed: both runtimes reject the post-loop reference</td><td>Explicit contract-versus-release note</td></tr><tr><td>Loop control</td><td>Bounded break/continue behavior</td><td>A combined probe exceeded external deadline</td><td>Avoid that pattern in successful builds</td></tr><tr><td>Struct mutation</td><td>Mutable field update</td><td>Assignment left field unchanged</td><td>Construct and read; label fallback needs</td></tr><tr><td>Qualified custom enum match</td><td>Match declared variant</td><td>Probe reached default on VM, matched on interpreter</td><td>Use verified built-in Result/Option examples</td></tr></tbody></table>

These results do not justify broader claims that all loops or structs are unusable. They identify particular reproducible patterns and prevent the course from promising unverified behavior.

A control probe confirmed ordinary mutable collection reassignment works in both runtimes. Earlier duplicate-declaration observations for values/items were builtin-name collisions, not collection-mutation defects.

## Today and on the horizon

VM-first execution, native capabilities, deterministic package snapshots, AI replay, schema validation, and vector math are current documented mechanisms. JIT remains experimental. Generics, FFI, WASM targeting, macros, and typing precision work remain deferred candidates in the reviewed scope. Roadmap entries are not promises.

## Ecosystem and protocol references

Later lessons inspect [Kujo Workflows](https://github.com/kujolang/kujo-workflows/tree/main/loop-engineering), [MCP framework](https://github.com/kujolang/mcp), [Eval](https://github.com/kujolang/eval), and [RunLedger](https://github.com/kujolang/runledger) as composition choices. The reviewed [MCP specification](https://modelcontextprotocol.io/specification/2026-07-28) is a separate protocol authority, not a statement of full Kujo framework conformance.

## Refresh procedure

Check the latest release API and artifact checksum; inspect spec, scope, roadmap, changelog, native and AI contracts, security, parity, and relevant ecosystem revisions. Rerun examples, negative cases, package drift, replay, browser QA, and production verification. Record the date and source identity. Do not update golden results until the changed behavior has been explained.



[Download the concept/source ledger](/source-ledger.json) · [Download both-runtime probe results](/runtime-discrepancies.json)
