## Where you are

You can write small programs. This stage asks what their execution means. Begin with names: which binding does an expression resolve, and which state does an assignment change?

## Language contract

Top-level script bindings live in global scope. Functions and control-flow blocks introduce lexical scopes. Duplicate declarations in the same scope are rejected; a declaration in a nested scope may shadow an outer one. Name resolution chooses the nearest visible binding.

Closures capture the nearest visible lexical binding. The stable specification does not give you a universal cross-runtime shared-memory ownership model. Captured environment implementation details and deferred VM work remain documented in the parity matrix. Test the particular pattern you intend to rely on, especially across asynchronous or imported callbacks.

## Read the example

The inner label deliberately hides the outer label. The closure created there resolves the inner name; leaving the block exposes the original outer name again. This is shadowing, not mutation. The unchanged outer value is part of the test.

For accumulated state, declare a mutable binding at the scope where the result should survive. Reassign that existing binding rather than accidentally creating a new same-named declaration. In larger functions, use different names when shadowing would make the intent difficult to follow.

## VM drill

Run this example normally and with the interpreter flag. Compare the output, but do not conclude that every closure scenario is identical because this one passes. Parity evidence is scoped to an exercised behavior. A test that calls a closure immediately does not prove how detached work observes later updates.

## Professional pattern

Prefer explicit context dictionaries for callbacks that cross module or scheduling boundaries. Keep captured state small. Return results to the owner rather than coordinating a workflow through hidden mutable globals. When state must be shared, choose a documented coordination primitive and test the lifecycle.

## Common mistakes

An assignment to a mutable outer name and a new inner declaration are not interchangeable. Duplicate declarations are not a way to reset a variable. A name that prints successfully inside a block may be undefined outside it.

## Working example

{{example}}

## Run it

From the course repository root, use the pinned Kujo 1.3.1 runtime.

{{command}}

{{output}}

## Break it and diagnose it

Two declarations target the same lexical scope. This is a duplicate declaration, not valid shadowing.

{{broken}}

{{diagnostic}}

## Exercise

Create a nested function with two visible names and predict which binding each reference uses. Compare VM and interpreter output. Refactor one capture into an explicit parameter and explain the improved boundary.

## Checkpoint

- I can trace nearest-binding resolution.
- I distinguish shadowing from reassignment.
- I keep parity claims limited to tested behavior.


## Release boundary drill

The official 1.3.1 VM rejects a repeated let declaration inside a top-level for-loop on its second iteration, while the interpreter accepts it. See the exact loop_declaration probe in the [evidence ledger](/evidence/). Keep this separate from deliberate duplicate declarations in a single scope.
