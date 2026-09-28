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

The failure drill uses a name that was never declared. The current loop-scope and control-flow probes are documented below.

## Working example

{{example}}

## Run it

From the course repository root, use the pinned Kujo 1.6.0 runtime.

{{command}}

{{output}}

## Break it and diagnose it

A never-declared name is a runtime error. The separate scope probe checks the lexical boundary.

{{broken}}

{{diagnostic}}

## Exercise

Rewrite the selection as a while-loop with an explicit index bound. Test empty input, all rejected values, and fewer accepted values than the limit. State why each version terminates.

## Checkpoint

- I can distinguish skip and stop behavior.
- I keep accumulators in an intentional scope.
- I can state a finite loop bound.



## Loop control in 1.6

The course's combined break/continue probe now returns `[2, 4]` in both runtimes. Loop-local declarations and post-loop name rejection also agree. Kujo 1.6 fixes optimized VM control flow for conditional early returns from iteration; a return exits the function, not just the current iteration.

```kujo
func first_positive(records) {
    for record in records {
        if record > 0 { return record }
    }
    return null
}
assert(first_positive([-1, 0, 4]) == 4)
assert(first_positive([-1, 0]) == null)
print("loop return verified")
```

[Download the full regression example](/examples/supplemental/v1-6-control.kujo). The course checks first/later matches, no match, nested loops, and a returned value used by the caller in both runtimes. These checks do not imply universal VM/interpreter parity; see the remaining [evidence boundaries](/evidence/).
