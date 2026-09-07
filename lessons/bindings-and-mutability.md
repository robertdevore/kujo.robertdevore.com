## Why this exists

A binding tells a reader whether the program may change a value through that name. This is an execution rule, not just a style convention. It helps you locate state transitions when inspecting a program or reviewing generated code.

## Language contract

`let` introduces an immutable binding. `const` also rejects reassignment and mutation through the binding. `mut` permits both. Do not attach a Rust ownership model or a compile-time evaluation promise to these words. Kujo's stable contract describes what assignment and mutation do at runtime.

The same restriction applies to collections: `let items := [1]` does not permit `items[0] := 2`. If a collection will change, declare its binding with `mut`. A helper that returns a new collection still requires you to assign the return value when you want to retain the update.

Bare `name := value` preserves a compatibility behavior: it updates an existing mutable binding when one is visible, otherwise creates a mutable binding in the current scope. Prefer an explicit declaration keyword in new course code so creation and update remain distinguishable.

Assignments are statements. Kujo supports `:=`, `=`, and compound assignment operators, but not chained assignments such as `a := b := 1`. Do not hide a state update inside another expression.

## Read the example

The configuration is constant, while the count and its containing report are mutable. Each change has a small visible location. This makes it possible to compare the final state with the intended transitions.

## Professional pattern

Default to `let` for derived values and function inputs copied into local names. Introduce `mut` where a state transition is actually needed. If you are adding it everywhere to silence errors, first ask whether a function should return a new value instead.

## Common mistakes

A mutable outer variable and an inner declaration with the same name are different bindings. Shadowing does not update the outer value. Also, immutability through one binding is not a universal claim about aliasing, ownership, or all other handles in the program. The scope lesson tests these distinctions directly.

## Working example

{{example}}

## Run it

From the course repository root, use the pinned Kujo 1.3.1 runtime.

{{command}}

{{output}}

## Break it and diagnose it

Mutation through an immutable binding is rejected. The index exists; the failure specifically concerns binding authority.

{{broken}}

{{diagnostic}}

## Exercise

Create a report with an immutable label and a mutable count. Show one permitted update, one rejected reassignment, and one rejected collection mutation. Explain why const does not imply Rust-style ownership.

## Checkpoint

- I can choose let, mut, or const deliberately.
- I know bare := may create a mutable binding.
- I do not use chained assignment.


## Builtin names and declaration scope

The names `values`, `items`, and `input` already identify builtins in global scope. Redeclaring them at top level is rejected in both runtimes. Use a distinct name such as `course_rows`; ordinary mutable collection reassignment passes. Local parameters and intentionally nested names have different scope. The evidence ledger includes both the collision and a passing control probe.
