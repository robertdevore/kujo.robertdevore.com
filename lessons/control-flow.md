## Why this exists

Automation spends much of its time filtering records and handling unusual input. Clear control flow makes those decisions reviewable. A loop also creates an obligation: define how it terminates before adding an external effect inside it.

## Language contract

`if` and `else` select branches using runtime truthiness. `for item in items` iterates a collection. `while` checks a condition; `loop` repeats until you break or otherwise exit. `break` and `continue` belong inside a loop.

Function bodies and block bodies create lexical boundaries. The for-loop variable does not leak after the loop. A local declaration inside a branch should not be used later as though it were a global assignment. Declare mutable accumulated state outside the loop when its result must survive the iteration.

## Read the example

The program accepts positive records from a fixed input. This separates the selection rule from the stopping rule. Neither depends on elapsed time or a provider response, so the result is repeatable.

Do not confuse the number of visited items with the number accepted. In a production import, those are different metrics and often need separate counters. A machine-readable receipt should name each one precisely.

## Professional pattern

Prefer a for-loop over known bounded input when possible. For a while-loop, identify the variable that moves toward termination and test the boundary cases: zero work, one item, and the maximum allowed work. For retry loops, later lessons add a finite attempt budget and an independent decision about whether retrying is useful.

## Common mistakes

A `continue` placed before a counter update can make a while-loop run forever. A shadowed counter may leave the condition unchanged. Nested loops need clear break behavior; break does not express a general escape from all enclosing work.

The failure drill uses a name that was never declared. The release-specific loop-scope discrepancy is documented below.

## Working example

{{example}}

## Run it

From the course repository root, use the pinned Kujo 1.3.1 runtime.

{{command}}

{{output}}

## Break it and diagnose it

A never-declared name is a runtime error. The separate scope probe records the release discrepancy.

{{broken}}

{{diagnostic}}

## Exercise

Rewrite the selection as a while-loop with an explicit index bound. Test empty input, all rejected values, and fewer accepted values than the limit. State why each version terminates.

## Checkpoint

- I can distinguish skip and stop behavior.
- I keep accumulators in an intentional scope.
- I can state a finite loop bound.



## Contract versus release behavior

> The written contract says a for-loop variable does not leak. In the official 1.3.1 VM, a top-level loop variable remained visible afterward; interpreter mode rejected that reference. A continue/break collection loop also exceeded the external two-second probe deadline. The successful lesson uses a finite for-loop without those control transfers. Do not infer that the release meets the documented scope contract in every case. See [the evidence ledger](/evidence/) for exact probes and runtime results.

