## Mental model

Expected failure is data the caller must handle. Absence is different again. Result models success or failure; Option models a present or absent value. Exceptions are useful for a different boundary, covered next.

## Language contract

Use contextual constructors Ok, Err, Some, and None, and match their alternatives with case clauses. A binding inside a matched variant names its payload. Custom enums can use qualified variants such as State::Ready. Guards narrow a matching branch with an additional condition.

Do not assume Rust's exhaustiveness checking or ownership semantics. In a dynamic program, tests must show every important alternative is handled. Include a deliberate fallback for unexpected external states rather than silently treating them as success.

The example makes a positive quantity a successful result and an invalid quantity an expected error. The consumer converts the result into a plain output value. This is easier to test than scraping a printed sentence or catching every exception indiscriminately.

## Choosing the right model

A missing optional label may be None. A supplied but invalid label may be Err with a reason. A storage failure can belong at an exception boundary. These distinctions preserve information for the caller, including whether it should ask for input, retry, or stop.

## Professional pattern

Keep error payloads stable enough for programs to branch on. Prefer a code and bounded context over a single human sentence when crossing process boundaries. Render a friendly message separately. The machine-contract lesson develops this into versioned output.

## Common mistakes

Returning Err is not the same as throwing. Calling a successful constructor does not validate its payload. A model can return a dictionary that claims success while containing invalid fields; your program must validate them before accepting the state.

## Working example

{{example}}

## Run it

From the course repository root, use the pinned Kujo 1.3.1 runtime.

{{command}}

{{output}}

## Break it and diagnose it

An out-of-bounds lookup is a runtime error, not automatically None. Wrap an explicit bounds decision in an Option-returning function when absence is part of your API.

{{broken}}

{{diagnostic}}

## Exercise

Write a safe lookup returning Some or None. Write a separate quantity validator returning Ok or Err. Match every alternative and include a guarded success branch for a large quantity.

## Checkpoint

- I distinguish absence, expected rejection, and exception.
- I can bind a variant payload.
- I do not assume static exhaustiveness checking.


## Contract versus release behavior

> Built-in Result/Option matching passes here. A separate custom State::Ready("checked") probe reached the default branch on the release VM while the interpreter matched it. Qualified custom-enum patterns are therefore taught as a specified surface with a verified release discrepancy, not an interchangeable working substitute. See [the evidence ledger](/evidence/) for exact probes and runtime results.
