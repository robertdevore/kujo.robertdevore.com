## Today

Kujo supports type annotations on bindings, parameters, and return positions. Type expressions include suffix forms such as nullable and array expressions. Parsing a type expression is not the same thing as enforcing a complete static safety system.

The v1 scope explicitly says interpreter mode may emit non-fatal type-check warnings while the default VM keeps dynamic execution without a static type gate. A successful check is useful feedback, but it is not proof that every future input satisfies your annotations.

## Mental model

Treat annotations as communicative and tooling-facing contracts whose current enforcement has limits. Runtime validation still owns untrusted input. This is neither Rust's compile-time model nor a reason to omit all useful type information.

The example annotates a simple function and then asserts its actual result. These are complementary pieces of evidence: one describes intent; the other exercises behavior. The breaking example supplies incompatible runtime values so the actual operation fails.

## On the horizon

The current v1 scope lists optional-typing precision follow-ups, including destructuring inference, module existence checks, struct field lookup, Promise unwrap typing, and callable fallback policy. Generics, FFI, WASM targeting, and macros remain deferred candidates. They are not course prerequisites or release promises.

## Professional pattern

Annotate public function boundaries where it helps readers and editors. Validate incoming JSON before passing it into domain functions. Keep tests for valid, absent, malformed, and boundary values. If a warning appears only in interpreter mode, record that runtime context instead of advertising it as a VM rejection.

## Common mistakes

Do not claim annotations make an unsafe input safe. Do not write lessons using a deferred generic API just because its type expression parses. And do not infer that a dynamic language cannot have useful contracts: schemas, assertions, capability gates, and stable result shapes provide different kinds of guarantees.

## Working example

{{example}}

## Run it

From the course repository root, use the pinned Kujo 1.3.1 runtime.

{{command}}

{{output}}

## Break it and diagnose it

The runtime operation receives an incompatible dictionary. This demonstrates dynamic execution failure, not a static type-check guarantee.

{{broken}}

{{diagnostic}}

## Exercise

Annotate a validator, then test wrong runtime types at its input boundary. Run check, VM, and interpreter modes and record which diagnostics each actually produces. Explain what each result does and does not prove.

## Checkpoint

- I can describe the current typing boundary honestly.
- I validate external inputs at runtime.
- I keep deferred features out of baseline code.
