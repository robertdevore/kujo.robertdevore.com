## Language contract

Arrays preserve insertion order. Indexing outside their bounds fails. Dictionary indexing with a missing key also fails; it does not produce null. If absence is normal, use `has_key`, `get`, or `get_default` according to their documented contracts.

Spread syntax copies elements into an array literal or entries into a dictionary literal. A later dictionary entry wins when keys overlap. Do not use dictionary display order as an application sorting policy; serialize explicitly and sort where presentation requires it.

`push` returns a new array value. Reassign that return when you intend to retain it. Mutation through an immutable binding remains forbidden even if the element being replaced is itself mutable-looking structured data.

## Pipes and fallback

A pipe sends a value into a following function call. It is useful for small, readable transformations. A pipeline should still make failure visible; chaining more operations is not a substitute for validation.

`??` selects a fallback for null. It is distinct from truthiness. Zero, false, and an empty string can be valid values and should not be silently replaced. Crucially, `record["missing"] ?? fallback` cannot rescue a missing-key indexing error: the left expression fails before it becomes a value.

## Professional pattern

At an input boundary, first decide whether a field is required, optional, or allowed to be null. Required fields should reject missing input. Optional fields can use a deliberate default. A default that silently converts broken input into plausible data is worse than a clear error.

The example copies defaults, replaces a field, builds a new list, and applies a simple transformation. These are the ingredients of the Stage 1 report. The stage project adds validation and meaningful failure behavior without requiring AI or external services.

## Working example

{{example}}

## Run it

From the course repository root, use the pinned Kujo 1.3.1 runtime.

{{command}}

{{output}}

## Break it and diagnose it

The missing dictionary key throws before null coalescing can select a fallback.

{{broken}}

{{diagnostic}}

## Exercise

Implement a reporting function over dictionaries with required name and optional count. Preserve a count of zero. Reject a missing required name. Add one out-of-bounds array drill and compare it with a missing-key drill.

## Checkpoint

- I distinguish missing keys from null values.
- I retain the result of push.
- I use right-biased spread and null fallback deliberately.



## Builtin names and declaration scope

The names `values`, `items`, and `input` already identify builtins in global scope. Redeclaring them at top level is rejected in both runtimes. Use a distinct name such as `course_rows`; ordinary mutable collection reassignment passes. Local parameters and intentionally nested names have different scope. The evidence ledger includes both the collision and a passing control probe.
