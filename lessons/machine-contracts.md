## Why this exists

A program consuming CLI output needs a stable data schema and an exit status it can trust. Agent-readable software should not require brittle scraping of colored terminal output.

## Stable tool contract

Exit categories are 0 success, 1 unmet gate or generic failure, 2 command usage, 3 lexer/parser failure, 4 runtime failure, 5 I/O failure, and 6 internal/tooling failure. Treat a nonzero exit status as failure even if the output contains a success message.

Successful --json commands put machine JSON on stdout. Failures generally use stderr. Two documented exceptions are run --json-runtime-diagnostics and lsp-rename --json: their runtime failure envelopes are on stdout with a nonzero exit. A consumer must know the specific command contract instead of assuming all JSON commands behave identically.

kujo check --json returns a check object including status and statement/bytecode counts. It does not execute script effects. kujo doctor helps diagnose the environment, not your business logic. Use their actual help and contracts rather than inventing a universal --json flag for every command.

## Application contract

The example uses a schema identifier, a boolean result, and a count. The same data can feed a human renderer and a machine renderer. Keep narration off stdout when it is reserved for JSON. Do not serialize arbitrary runtime handles; select the fields that form the external interface.

## Professional pattern

Version payload-affecting changes. Add fields compatibly where the consumer contract allows it; removing or changing a field type can break automation. Test both successful and failed results, including exit status. Stable ordering helps reproducibility, but clients should parse JSON rather than compare dictionary display text.

## Evidence drill

Run check --json on the success example, then run the breaking example with --json-runtime-diagnostics. Inspect stdout, stderr, and the status separately. The course keeps captured runtime diagnostics and additional command receipts in its verification ledger.

## Working example

{{example}}

## Run it

From the course repository root, use the pinned Kujo 1.3.1 runtime.

{{command}}

{{output}}

## Break it and diagnose it

Run this with --json-runtime-diagnostics as an additional drill. JSON on stdout must not override the nonzero failure exit.

{{broken}}

{{diagnostic}}

## Exercise

Add human and machine renderers to your report. Keep the same underlying data. Test that machine stdout parses as one JSON value and that failed work cannot be mistaken for a passing gate.

## Checkpoint

- I preserve authoritative exit status.
- I know the documented JSON failure exceptions.
- I version application result shapes.
