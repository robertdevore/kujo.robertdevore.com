## Why this exists

Dictionaries are flexible input and serialization values. A struct gives an internal record named fields and associated behavior. An enum expresses alternatives, making states easier to distinguish than unrelated string conventions scattered through the code.

## Runtime contract

Declare a struct with fields, optional field annotations, and supported defaults. Construct it using its name and a field initializer. Access fields through dot syntax. A field update still requires a mutable binding. Methods are supported, with documented VM/interpreter coverage; do not assume every generator or metaprogramming pattern is supported inside a struct.

The example's method reads a declared field. Kujo's method implementation is not JavaScript prototype inheritance or Rust ownership. Keep the domain model small and test each operation's observable result.

Enums use named variants and tagged values. The next lesson combines them with match and Result/Option. A tagged state lets a consumer distinguish successful completion from failure without inspecting a free-form sentence.

## Serialization boundary

A struct is a runtime value, not automatically a JSON object. Convert selected fields into a dictionary for machine output. This is an opportunity to choose a stable external schema rather than exposing every internal implementation field. Native handles and functions likewise need deliberate representations.

## Professional pattern

Use structs for internal invariants and methods, dictionaries for explicit external contracts, and enums for mutually exclusive states. Do not add a field just because some downstream tool might want it later. Start with the data your calculation actually needs.

## Common mistakes

Optional type annotations do not make the VM a static type gate. A field label is not a promise that every future assignment is statically verified. Validate external data before constructing a domain value, and test invalid values at that boundary.

## Working example

{{example}}

## Run it

From the course repository root, use the pinned Kujo 1.3.1 runtime.

{{command}}

{{output}}

## Break it and diagnose it

Runtime structs are not directly JSON-serializable; select a dictionary of fields.

{{broken}}

{{diagnostic}}

## Exercise

Define a Report struct with a method that computes a derived value. Create a separate dictionary serializer. Add an enum describing pending, passed, and failed states, then use it in the next lesson’s match exercise.

## Checkpoint

- I can construct and inspect a struct.
- I serialize a deliberate dictionary contract.
- I distinguish record fields from tagged alternatives.



## Contract versus release behavior

> The release VM silently left a struct field unchanged after an assignment that the interpreter applied, and the method retained the original field value. The successful example uses construction and reads only. Struct mutation and custom qualified-enum matching need a runtime fix or a deliberately labeled interpreter fallback before relying on them. See [the evidence ledger](/evidence/) for exact probes and runtime results.

