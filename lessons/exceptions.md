## Why this exists

A runtime failure interrupts normal execution. Recovery needs context: should the caller skip a record, stop the run, or report a configuration problem? A catch block that always prints “success” destroys that information.

## Language contract

Use try and except to protect a region, and throw(value) to signal an exception. A caught error exposes diagnostic information such as its message. Parser errors happen before the program executes and cannot be caught by a try inside the malformed program.

Expected domain rejections often fit Result better because the caller is meant to inspect them. Exceptions are appropriate where normal execution cannot continue until an outer boundary decides what to do. Avoid treating every missing optional field as an exception.

## Read the example

The division helper throws for an invalid denominator. The boundary catches it, checks that the expected reason occurred, and emits a stable local summary. The test would fail if an unrelated error were caught. This matters when writing negative tests: merely seeing a nonzero outcome is not enough.

## Professional pattern

Catch narrowly, preserve the reason, and decide explicitly whether the operation can continue. Convert errors into a machine-readable result at the top-level command boundary, while preserving a failure exit status where the contract requires it. A JSON object containing ok:false with exit code zero can mislead a shell pipeline unless that behavior is documented.

For external operations, distinguish a retryable transport failure from invalid arguments, denied authority, malformed data, and exhausted budgets. Repeating a denied operation does not grant authority.

## Common mistakes

Do not swallow assertion failures in a broad catch meant for I/O. Do not report a deliberately caught failure as successful completion of the requested work. Never fabricate a diagnostic for teaching: this course renders the real verifier output below.

## Working example

{{example}}

## Run it

From the course repository root, use the pinned Kujo 1.3.1 runtime.

{{command}}

{{output}}

## Break it and diagnose it

No exception boundary handles this deliberate failure, so the command must fail.

{{broken}}

{{diagnostic}}

## Exercise

Return Result for an invalid quantity and throw for an impossible internal state. Write tests that distinguish both paths. Add a top-level boundary that preserves failure rather than converting it to a passing run.

## Checkpoint

- I catch only where a recovery decision is possible.
- I assert the reason in negative tests.
- I keep failed work distinguishable from success.
