## Language contract

Arrays preserve insertion order. Indexing outside their bounds fails. Dictionary indexing with a missing key also fails; it does not produce null. If absence is normal, use `has_key`, `get`, or `get_default` according to their documented contracts.

Spread syntax copies elements into an array literal or entries into a dictionary literal. A later dictionary entry wins when keys overlap. Do not use dictionary display order as an application sorting policy; serialize explicitly and sort where presentation requires it.

`push` returns a new array value. Reassign that return when you intend to retain it. Mutation through an immutable binding remains forbidden even when replacing an element inside a nested collection.

## Pipes and fallback

A pipe sends a value into a following function call. It is useful for small, readable transformations. A pipeline should still make failure visible; chaining more operations is not a substitute for validation.

`??` selects a fallback for null. It is distinct from truthiness. Zero, false, and an empty string can be valid values and should not be silently replaced. `record["missing"] ?? fallback` cannot rescue a missing-key indexing error: the left expression fails before it becomes a value.

## Professional pattern

At an input boundary, first decide whether a field is required, optional, or allowed to be null. Required fields should reject missing input. Optional fields can use a deliberate default. A default that silently converts broken input into plausible data is worse than a clear error.

The example copies defaults, replaces a field, builds a new list, and applies a simple transformation. These are the ingredients of the Stage 1 report. The stage project adds validation and meaningful failure behavior without requiring AI or external services.

## Working example

{{example}}

## Run it

From the course repository root, use the pinned Kujo 1.9.0 runtime.

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

## Collection corrections in 1.8.1

Integer sum overflow raises a catchable runtime error instead of wrapping. unique checks value equality when display summaries collide, preserving distinct compound, byte and secret values. Mixed integer/float sort comparisons avoid rounding a large integer before comparison. This does not change language-wide float equality. The supplemental v1-8-1-contracts.kujo example checks compound uniqueness alongside CSV, schema and request-identity contracts.

## Nested writes and comparator sorting in 1.9

A nested assignment writes back to its mutable root. Retained copies keep their old values:

```kujo
mut rows := [[1, 2]]
let before := rows
rows[0][1] = 7
assert_equal(before, [[1, 2]])
assert_equal(rows, [[1, 7]])
```

Missing intermediate containers and invalid indices fail without publishing a partly updated root. Expression side effects are not rolled back. Simple assignment evaluates its right-hand side first, then target indices once from root to leaf. Compound assignment also evaluates indices during its initial read: keep effectful calls out of those indices.

`sort_by(items, comparator)` returns a new array. The comparator returns an integer: negative for before, zero for tied, positive for after. Ties preserve input order. Callback errors propagate; the input remains unchanged, but callback side effects remain. Define a consistent ordering and retain ordinary capability restrictions.

Run the [1.9 contract example](/examples/supplemental/v1-9-contracts.kujo) with `kujo run --untrusted examples/supplemental/v1-9-contracts.kujo`. It checks nested-write recovery, snapshot isolation and stable sorting in both runtime verification paths. Exercise: sort equal-priority jobs by priority alone and prove that their original relative order survives.
