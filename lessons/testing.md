## Tool contract

Kujo has two different testing surfaces. kujo test operates the fixture runner, with dual as the default VM-primary compatibility mode and explicit vm/interpreter options. kujo test-run executes test declarations through the interpreter-hosted test framework today. Do not describe test-run as a VM-only test.

Test declarations use test with a string name, plus test_group, test_setup, and test_teardown for grouping and lifecycle setup. Assertions should check returned values and meaningful invariants. A test that only prints “passed” proves little.

## Reproducible tests

Use committed input fixtures and expected results. Keep provider calls out of the default suite. For runtime behavior that must hold on the VM, also run an ordinary .kujo assertion program through kujo run. Interpreter-hosted framework coverage alone cannot establish VM parity.

The working example below is a VM assertion program. The projects/package/tests.kujo file demonstrates the framework declarations and is run separately by the verifier. This separation prevents a green framework test from disguising a failing production path.

## Negative tests

A failing test must fail for the intended reason. Check both the exit category and a stable diagnostic concept. A missing file that prevents your arithmetic test from running is not evidence that invalid arithmetic was rejected.

Snapshots are useful for stable output, but examine a mismatch before changing the expected result. Some information, such as absolute source paths or timing, may need a documented normalization. Never normalize away a meaningful change in result or error code.

## Professional pattern

For each public function, test a normal input, a boundary input, and a rejected input. For each effect boundary, add one controlled integration case. Retain the runtime version, command, exit status, stdout, and stderr as evidence when behavior is disputed.

## Working example

{{example}}

## Run it

From the course repository root, use the pinned Kujo 1.3.1 runtime.

{{command}}

{{output}}

## Break it and diagnose it

This intentionally incorrect expectation must fail. A verifier that accepts it cannot establish correctness.

{{broken}}

{{diagnostic}}

## Exercise

Write a test_group with setup and teardown for your package. Run it using test-run. Also run a VM assertion program for the same public function. Deliberately change one expectation to confirm the gate rejects it.

## Checkpoint

- I know which runtime each test surface uses.
- I test values rather than success messages.
- I verify that the gate can fail.


## Framework import context

In the tested test-run path, a top-level import was not available inside the test body. The comparison suites import their module inside each test. This keeps the dependency in the actual execution context and avoids a misleading Undefined variable failure unrelated to the assertion.
