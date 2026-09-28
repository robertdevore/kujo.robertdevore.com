## Verification boundary

The lesson verifier uses the official Kujo **1.6.0 macOS x64** binary, SHA-256 `930e0da1fec2562f6990d1226a479330640c8c78eb4c36c148cee3f950b29a47`, from the published release at source `44af277848173664f72ca85f2a1b3b98d634ecdd`. This course was reverified on 2026-09-28. The upstream release also publishes Linux x64/arm64, macOS arm64 and Windows x64, plus the runtime npm packages. Local course verification does not claim a separate full course run on each platform.

Each of 40 lesson examples is checked and executed on the default VM, with exact expected stdout. Each intentional failure checks its exit category and diagnostic reason. [Download the current verification receipts](/verification.json). The repository also records package, stage-project, AI replay, browser, and production checks.

## Source hierarchy

Executable behavior and contract tests take precedence when explaining an observed release. Written specifications describe intended guarantees. If they disagree, the course shows the disagreement rather than inventing a convenient equivalence.

Core references: [language specification](https://github.com/kujolang/kujo/blob/v1.6.0/docs/LANGUAGE_SPEC.md), [stable scope](https://github.com/kujolang/kujo/blob/v1.6.0/docs/V1_SCOPE.md), [standard library](https://github.com/kujolang/kujo/blob/v1.6.0/docs/STANDARD_LIBRARY.md), [AI runtime](https://github.com/kujolang/kujo/blob/v1.6.0/docs/AI_RUNTIME.md), [CLI contracts](https://github.com/kujolang/kujo/blob/v1.6.0/docs/CLI_MACHINE_READABLE_CONTRACTS.md), [parity matrix](https://github.com/kujolang/kujo/blob/v1.6.0/docs/VM_INTERPRETER_PARITY_MATRIX.md), and [security posture](https://github.com/kujolang/kujo/blob/v1.6.0/docs/NATIVE_API_SECURITY_POSTURE.md).

## Known release discrepancies

The repository preserves minimal probes and both runtime results under evidence/runtime-discrepancies.json. Loop-local declaration and loop-variable scope probes now agree. The combined break/continue probe now agrees as well. Struct assignment and qualified custom-enum matching remain discrepancies; successful course examples avoid those patterns. Earlier receipts are preserved under evidence/history/v1.3.1 and evidence/history/v1.4.0 and evidence/history/v1.5.0 in the repository.

<table><caption>Verified release boundaries</caption><thead><tr><th>Concept</th><th>Intended contract</th><th>Observed 1.6.0 VM</th><th>Course treatment</th></tr></thead><tbody><tr><td>Repeated loop declarations</td><td>Fresh block scope per iteration</td><td>Fixed: both runtimes print 1 and 2</td><td>Keep tested accumulation patterns explicit</td></tr><tr><td>Loop scope</td><td>Loop variable does not leak</td><td>Fixed: both runtimes reject the post-loop reference</td><td>Explicit contract-versus-release note</td></tr><tr><td>Loop control</td><td>Bounded break/continue behavior</td><td>Fixed: both runtimes print [2, 4]</td><td>Keep finite input and test skip/stop conditions</td></tr><tr><td>Struct mutation</td><td>Mutable field update</td><td>Assignment left field unchanged</td><td>Construct and read; label fallback needs</td></tr><tr><td>Qualified custom enum match</td><td>Match declared variant</td><td>Probe reached default on VM, matched on interpreter</td><td>Use verified built-in Result/Option examples</td></tr></tbody></table>

These results do not justify broader claims that all loops or structs are unusable. They identify particular reproducible patterns and prevent the course from promising unverified behavior.

A control probe confirmed ordinary mutable collection reassignment works in both runtimes. Earlier duplicate-declaration observations for values/items were builtin-name collisions, not collection-mutation defects.

## Today and on the horizon

VM-first execution, native capabilities, deterministic package snapshots, AI replay, schema validation, and vector math are current documented mechanisms. JIT remains experimental. Generics, FFI, WASM targeting, macros, and typing precision work remain deferred candidates in the reviewed scope. Roadmap entries are not promises.

## Ecosystem and protocol references

Later lessons inspect [Kujo Workflows](https://github.com/kujolang/kujo-workflows/tree/main/loop-engineering), [MCP framework](https://github.com/kujolang/mcp), [Eval](https://github.com/kujolang/eval), and [RunLedger](https://github.com/kujolang/runledger) as composition choices. The reviewed [MCP specification](https://modelcontextprotocol.io/specification/2026-07-28) is a separate protocol authority, not a statement of full Kujo framework conformance.

## Refresh procedure

Check the latest release API and artifact checksum; inspect spec, scope, roadmap, changelog, native and AI contracts, security, parity, and relevant ecosystem revisions. Rerun examples, negative cases, package drift, replay, browser QA, and production verification. Record the date and source identity. Do not update golden results until the changed behavior has been explained.



[Download the concept/source ledger](/source-ledger.json) · [Download both-runtime probe results](/runtime-discrepancies.json)

## 1.5.0 upgrade evidence

The supplemental release suite checks bounded stdin, confined digests and copies, both directory cursor contracts, capability denials, secret-token redaction, lexical scope, PDF repeatability and remote-asset rejection, and timezone conversion in both runtimes. Results live in evidence/v1-5-checks.json in the source repository. PostgreSQL TLS pooling and imported HTTP routing changes are source-reviewed; dedicated upstream harnesses establish their broader contracts. The course does not claim it reran those service harnesses.

The supplemental suite retains APIs introduced in 1.5; its receipt now identifies the actual 1.6 binary under test. Historical 1.5 receipts remain immutable in the history directory.

## 1.6 runtime and ecosystem evidence

The new v1-6-checks suite executes early-return loops (first/later match, no match, empty input and nested loops), shared closure aliases versus independent closures, and lazy generators under both VM and interpreter. Exact output must agree. Async, spawn, bounded concurrency and rejection remain covered by the existing lessons/project checks. The original break/continue probe now completes; remaining struct/custom-enum discrepancies stay visible rather than being erased by the upgrade.

The [publication record](https://github.com/kujolang/kujo/blob/main/docs/KUJO_1_6_RELEASE.md) links upstream runtime and platform gates. Companion Dispatch review/resume, Wave C beta assurance and Wave D alpha interoperability are source-reviewed architecture context, not effects executed by this course's standalone capstone. The companion contracts remain experimental; private participant SDKs are not the published runtime npm packages. Human adopter usability has not been validated.
