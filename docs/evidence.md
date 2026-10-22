## Verification boundary

The lesson verifier uses the official Kujo **1.9.0 macOS x64** binary, SHA-256 `657879720c5f51e9598715ec4b5455f51d18774cc89b919b8863b41db4cfc007`, from the published release at source `2cfaf185ad03059c89ef4f72fb061074255d00fc`. This course was reverified on 2026-10-22. The upstream release also publishes Linux x64/arm64, macOS arm64 and Windows x64, plus all six runtime npm packages and a deterministic source archive. Local course verification does not claim a separate full course run on each platform.

Each of 40 lesson examples is checked and executed on the default VM, with exact expected stdout. Each intentional failure checks its exit category and diagnostic reason. [Download the current verification receipts](/verification.json). The repository also records package, stage-project, AI replay, browser, and production checks.

## Source hierarchy

Executable behavior and contract tests take precedence when explaining an observed release. Written specifications describe intended guarantees. If they disagree, the course shows the disagreement rather than inventing a convenient equivalence.

Core references: [language specification](https://github.com/kujolang/kujo/blob/v1.9.0/docs/LANGUAGE_SPEC.md), [stable scope](https://github.com/kujolang/kujo/blob/v1.9.0/docs/V1_SCOPE.md), [standard library](https://github.com/kujolang/kujo/blob/v1.9.0/docs/STANDARD_LIBRARY.md), [AI runtime](https://github.com/kujolang/kujo/blob/v1.9.0/docs/AI_RUNTIME.md), [CLI contracts](https://github.com/kujolang/kujo/blob/v1.9.0/docs/CLI_MACHINE_READABLE_CONTRACTS.md), [parity matrix](https://github.com/kujolang/kujo/blob/v1.9.0/docs/VM_INTERPRETER_PARITY_MATRIX.md), and [security posture](https://github.com/kujolang/kujo/blob/v1.9.0/docs/NATIVE_API_SECURITY_POSTURE.md).

## Known release discrepancies

The repository preserves minimal probes and both runtime results under evidence/runtime-discrepancies.json. Loop-local declaration and loop-variable scope probes now agree. The combined break/continue probe now agrees as well. Struct assignment now agrees in both runtimes. Qualified custom-enum matching remains a discrepancy; successful course examples avoid that pattern. Earlier receipts are preserved under evidence/history/v1.3.1 and evidence/history/v1.4.0 and evidence/history/v1.5.0 in the repository.

<table><caption>Verified release boundaries</caption><thead><tr><th>Concept</th><th>Intended contract</th><th>Observed 1.9.0 VM</th><th>Course treatment</th></tr></thead><tbody><tr><td>Repeated loop declarations</td><td>Fresh block scope per iteration</td><td>Fixed: both runtimes print 1 and 2</td><td>Keep tested accumulation patterns explicit</td></tr><tr><td>Loop scope</td><td>Loop variable does not leak</td><td>Fixed: both runtimes reject the post-loop reference</td><td>Explicit contract-versus-release note</td></tr><tr><td>Loop control</td><td>Bounded break/continue behavior</td><td>Fixed: both runtimes print [2, 4]</td><td>Keep finite input and test skip/stop conditions</td></tr><tr><td>Struct mutation</td><td>Mutable field update</td><td>Fixed: both runtimes update the field to 4</td><td>Verified field assignment; retained construction/read lesson</td></tr><tr><td>Qualified custom enum match</td><td>Match declared variant</td><td>Probe reached default on VM, matched on interpreter</td><td>Use verified built-in Result/Option examples</td></tr></tbody></table>

These results do not justify broader claims that all loops or structs are unusable. They identify particular reproducible patterns and prevent the course from promising unverified behavior.

A control probe confirmed ordinary mutable collection reassignment works in both runtimes. Earlier duplicate-declaration observations for values/items were builtin-name collisions, not collection-mutation defects.

## Today and on the horizon

VM-first execution, native capabilities, deterministic package snapshots, AI replay, schema validation, vector math, shared CLI/LSP analysis, expanded optional inference, and struct generator methods are current documented mechanisms. JIT remains experimental. Async generators, `yield from`, ownership cycles, atomic shared state, generics, broad FFI, a major WASM target, and macros remain deferred candidates. Roadmap entries are not promises.

## Ecosystem and protocol references

Later lessons inspect [Kujo Workflows](https://github.com/kujolang/kujo-workflows/tree/main/loop-engineering), [MCP framework](https://github.com/kujolang/mcp), [Eval](https://github.com/kujolang/eval), and [RunLedger](https://github.com/kujolang/runledger) as composition choices. The reviewed [MCP specification](https://modelcontextprotocol.io/specification/2026-07-28) is a separate protocol authority, not a statement of full Kujo framework conformance.

## Refresh procedure

Check the latest release API and artifact checksum; inspect spec, scope, roadmap, changelog, native and AI contracts, security, parity, and relevant ecosystem revisions. Rerun examples, negative cases, package drift, replay, browser QA, and production verification. Record the date and source identity. Do not update golden results until the changed behavior has been explained.



[Download the concept/source ledger](/source-ledger.json) · [Download both-runtime probe results](/runtime-discrepancies.json)

## 1.5.0 upgrade evidence

The supplemental release suite checks bounded stdin, confined digests and copies, both directory cursor contracts, capability denials, secret-token redaction, lexical scope, PDF repeatability and remote-asset rejection, and timezone conversion in both runtimes. Results live in evidence/v1-5-checks.json in the source repository. PostgreSQL TLS pooling and imported HTTP routing changes are source-reviewed; dedicated upstream harnesses establish their broader contracts. The course does not claim it reran those service harnesses.

The supplemental suite retains APIs introduced in 1.5; its receipt now identifies the actual 1.8 binary under test. Historical 1.5 receipts remain immutable in the history directory.

## 1.6 runtime and ecosystem evidence

The new v1-6-checks suite executes early-return loops (first/later match, no match, empty input and nested loops), shared closure aliases versus independent closures, and lazy generators under both VM and interpreter. Exact output must agree. Async, spawn, bounded concurrency and rejection remain covered by the existing lessons/project checks. The original break/continue probe now completes; the historical struct/custom-enum results remain recorded; current results are shown in the table above.

The historical 1.6 evidence remains useful for the features introduced in that release. Companion Dispatch review/resume, Wave C beta assurance and Wave D alpha interoperability are source-reviewed architecture context, not effects executed by this course's standalone capstone. The companion contracts remain experimental; private participant SDKs are not the published runtime npm packages. Human adopter usability has not been validated.

## 1.8 analysis and runtime evidence

The complete course gate passes on the official 1.8.2 binary: 40 VM examples, 40 expected failures, 20 project and integration checks, release checks, the retained 1.5 and 1.6 regression suites, and the 53-route static build. The dual-runtime probes continue to expose the two known struct-assignment and qualified-enum differences instead of hiding them.

Kujo 1.8 adds shared CLI/LSP program analysis, content-hashed imported-module analysis, richer optional inference, struct generator methods, and a measured generator-resume allocation improvement without changing v1 syntax. See the upstream [release notes](https://github.com/kujolang/kujo/blob/v1.8.2/docs/RELEASE_NOTES_1_8.md) and [release-readiness evidence](https://github.com/kujolang/kujo/blob/v1.8.2/docs/KUJO_1_8_RELEASE_READINESS.md).


## 1.8.1 maintenance verification

The course checks the corrected CSV, collection, schema, AI history and compound-capability contracts in both runtimes. Tool-history fixture hashes changed for the documented normalization correction; synthetic responses and lesson expected outputs did not. Full strict replay and the capstone pass without live model credentials. Historical 1.8.0 receipts remain in evidence/history/v1.8.0.

The tagged release notes retain candidate wording and some tagged documents name 1.8.0. Published release metadata, archive checksums and executed behavior establish the 1.8.1 verification boundary. No new language syntax or stable participant SDK is implied. Process platform and database admission changes are source-reviewed; the course does not claim it reran every upstream platform harness.

## 1.8.2 dependency maintenance verification

The complete course gate and the retained 1.8.1 maintenance checks pass on the checksum-verified official 1.8.2 binary. Historical 1.8.1 receipts remain in evidence/history/v1.8.1. The two documented runtime discrepancies remain unchanged.

This release removes the remaining ZIP advisories and dependency maintenance warnings while preserving Kujo-language behavior. Rust embedders must review the [ZIP 9 API migration](https://github.com/kujolang/kujo/blob/v1.8.2/docs/ZIP_9_RUST_MIGRATION.md); the course does not expose that Rust writer type. See the [1.8.2 release notes](https://github.com/kujolang/kujo/blob/main/docs/RELEASE_NOTES_1_8_2.md) for upstream verification and scope.


## 1.9.0 runtime verification

The 1.9.0 runtime passes the course examples, intentional failures, project checks and retained regression suites. Struct assignment now produces 4 in both runtimes; qualified custom-enum matching still selects the VM default branch while the interpreter matches. Previous 1.8.2 receipts are preserved in evidence/history/v1.8.2.

The tagged source retains candidate-era stable-release labels in some documentation. The published release, exact archive checksum and installed-platform checks establish the 1.9.0 distribution boundary. See the [1.9.0 release notes](https://github.com/kujolang/kujo/blob/main/docs/RELEASE_NOTES_1_9_0.md).
