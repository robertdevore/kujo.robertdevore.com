## Security boundary

Kujo capability controls gate supported native effects. They are not operating-system isolation, a container, or a multitenant execution service. A hostile program can still consume resources or exercise behavior outside the guarantees you have actually established.

Use a dedicated process/container/VM with explicit filesystem, network, CPU, memory, lifetime, and credential policy when the threat model requires it. The course does not ship a remote arbitrary-code playground. Its source/output explorer displays verified artifacts without executing submitted code.

## Observability

A watchdog observes whether execution stays inside expected limits. Useful events include operation identity, attempt number, elapsed duration, status, and bounded error categories. Observability should not collect raw secrets or every prompt simply because it can.

The example evaluates a small event against an explicit maximum. Real elapsed time is nondeterministic, so this lesson tests the policy with fixed event data. A separate integration test can establish clock and delivery behavior.

## Ecosystem boundary

Workcell-style execution environments and Watchdog telemetry are external architecture. Neither changes Kujo syntax or makes a trusted script automatically safe. Inspect deployment-specific contracts before relying on auth, tenant separation, or durable event delivery.

## Professional pattern

Make liveness, cancellation, drain, and restart decisions explicit. Separate observational telemetry from authorization: a trace ID is correlation data, not identity or permission. Decide whether telemetry failure should stop critical work or fail open, and test that decision.

## Common mistakes

A timeout inside one tool does not bound the entire workflow. A language's default scheduler deadline is not a CPU/memory sandbox. A trace that reports success but omits failed actions is incomplete evidence. Keep independent limits and test a forced failure path.

## Working example

{{example}}

## Run it

From the course repository root, use the pinned Kujo 1.3.1 runtime.

{{command}}

{{output}}

## Break it and diagnose it

The observed attempt count exceeds policy. A watchdog must report a violation rather than normalize it away.

{{broken}}

{{diagnostic}}

## Exercise

Write a threat model for running a third-party script. Identify language gates, host isolation, resource limits, secret custody, and telemetry. Test a forced limit violation and state who stops the process.

## Checkpoint

- I separate capability controls from isolation.
- I keep correlation distinct from authorization.
- I assign an owner to stop and cleanup behavior.
