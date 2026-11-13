The course teaches you to distinguish a successful command from evidence that the work meets its requirements. [Kujo for Paperclip 0.3.0](https://github.com/kujolang/paperclip/releases/tag/v0.3.0) applies that practice to agent assignments. It is optional; every course lesson and capstone still runs independently.

## From a task to an acceptance decision

1. Give the issue explicit acceptance criteria and delegate through Paperclip's native task hierarchy.
2. Enable only the required Kujo workflows. Preview the operation, request human approval, approve the exact request and explicitly start it.
3. Inspect the actual result: logs, failed checks, screenshots and recorded agent/run identity. A later pass does not erase a retained failed attempt.
4. Review acceptance against the current source. Missing or outdated evidence needs further work; a human waiver is an explicit decision, not a passing test.
5. Browse evidence from child assignments. Larger trees use 50-issue pages and require restarting pagination when membership changes.

The Verification Center lives on issues. It extends Paperclip's native tasks, agents and approvals rather than creating another task hierarchy. The demonstration uses four deterministic process agents; it does not establish autonomous LLM delivery.

## Install and configure

Use Paperclip 2026.1012.0 or later, with 0.3.0 qualified against official 2026.1106.0. Use patched Node.js 24.22.1 on the 24.x line or 26.12.1 and later. Back up host data before an upgrade, then install and restart Paperclip:

```bash
npx paperclipai plugin install @kujolang/paperclip
```

The runtime is included. New assurance features are disabled by default. Workcell requires configured local Docker and an immutable image; Lens requires optional browser dependencies. Follow the [installation guide](https://github.com/kujolang/paperclip/blob/v0.3.0/docs/INSTALLATION.md) and [assurance configuration](https://github.com/kujolang/paperclip/blob/v0.3.0/docs/ACCOUNTABILITY.md).

## Know what the evidence establishes

- Workcell provides approved, bounded local Docker execution. Remote sandbox adapters are not exposed.
- Lens checks unauthenticated loopback pages and browser flows. It is not unrestricted authenticated browsing.
- Eval and ShipCheck contribute different evidence: a release metadata check does not mean project tests ran.
- Muzzle runs approved named workflows; trusted-host execution can affect host files and networks.
- PackWrite validates supplied plans or compiles supplied manifests. It does not create an autonomous workforce.
- RunLedger receipts and Watchdog metadata can be imported, but imported claims remain unverified and missing usage or cost stays unknown.

Official Paperclip 2026.1106.0 does not mount plugin run tabs. Use the issue Verification Center and scoped evidence tools. Checksums detect byte changes; they do not prove producer authenticity.

## Try it with the capstone

Use a disposable copy of your capstone repository. Define one observable requirement, run an approved check, inspect its failure, correct the implementation and verify again. Compare both attempts before accepting the work. The plugin's [reproducible four-agent demonstration](https://github.com/kujolang/paperclip/tree/v0.3.0/examples/assurance) supplies the full scenario and measured boundaries.
