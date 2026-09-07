## Mental model

A function gives a piece of behavior a name and a parameter boundary. The caller should be able to understand what input is needed and what output means without reading every statement in the body.

## Language contract

Use `func name(parameters) { ... }`. Arguments are positional and arity matters. An explicit `return value` supplies a result. Reaching the end of a function returns null; the last expression is not an implicit return value. A bare return also yields null.

Functions are values. Anonymous `func(...) { ... }` expressions can be passed to other functions, enabling callbacks. A closure resolves captured names from its lexical context. Treat capture behavior as Kujo behavior, not as an imported Python or JavaScript equivalence; the next stage examines it more closely.

## Read the example

`apply` knows how to invoke an operation, while the anonymous function defines a calculation. Separating them lets a caller change the policy without rewriting the mechanism. The second function deliberately falls through to expose null.

## Professional pattern

Keep domain calculations pure: pass values in, return values out. Put file reads, network requests, and printing at the application's edge. This lets tests call the calculation without granting host authority and makes later model-proposed inputs easier to validate.

Do not make a callback quietly depend on a large set of global variables. Pass explicit context or a narrow closure so its inputs remain inspectable. For a tool handler later, this distinction becomes a security concern: a tool description is not permission to access any global resource.

## Common mistakes

Printing a value does not return it. A caller receiving null may indicate a missing return, not a broken arithmetic operation. Likewise, supplying extra arguments is not a portable way to attach optional context; use the exact signature or a deliberate dictionary parameter.

## Working example

{{example}}

## Run it

From the course repository root, use the pinned Kujo 1.3.1 runtime.

{{command}}

{{output}}

## Break it and diagnose it

The function requires two positional arguments. The failure concerns arity, not the arithmetic inside the function.

{{broken}}

{{diagnostic}}

## Exercise

Write a summarize(values, predicate) function. Pass two predicates that accept different values. Keep printing outside the function and test the returned summary directly.

## Checkpoint

- I use explicit return when a result is required.
- I can pass a function as a value.
- I can explain a callback’s inputs and captured context.
