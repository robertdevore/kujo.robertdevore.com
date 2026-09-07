## Where you are

This course assumes you can already program. You are learning a different language contract and a way of building software where deterministic code, models, tools, and people cooperate. Stage 1 ends with a useful local reporting utility, before any model is involved.

## Why this exists

An AI-native application has uncertainty at its boundaries. A model may return a different answer tomorrow; a tool may fail; a generated plan may ask for authority it does not need. Calling a model is the easy part. The engineering work is making effects explicit, validating inputs and outputs, and deciding when to stop.

Kujo supplies a VM-first scripting language, native system operations, capability controls, and deterministic AI mechanisms. You supply application policy: which endpoints to trust, what counts as success, whether to retry, and which actions need a human decision. Keep that division visible from the first program.

## Mental model

Use **Goal → Write → Run → Inspect → Verify → Harden → Automate**. A goal names an observable result, not an activity. “Count the accepted jobs and report the total” is testable. “Process some jobs” leaves success undefined.

The example separates input, a calculation, and a claim that can be checked. Its assertion is deliberately independent of the printed wording. Later the input will come from a file and the output will become a versioned JSON result, but the calculation should remain equally testable.

## Language and runtime contract

Normal execution is `kujo run`. The source passes through the lexer and parser, then the compiler and bytecode VM. `kujo check` validates without executing the program's host effects. `kujo doctor` inspects the environment. None of these commands proves your business rule is correct.

Kujo is local-first, but local execution is not isolation. A normal trusted script can use the user's host privileges. Our pure examples run with `--untrusted`; we introduce specific capabilities when we actually need them.

## Professional pattern

Write a small, deterministic core before adding effects. State the expected result in an assertion. Retain the source and the runtime version alongside the result. AI integration later becomes an input boundary around working software, rather than a substitute for it.

## Working example

{{example}}

## Run it

From the course repository root, use the pinned Kujo 1.3.1 runtime.

{{command}}

{{output}}

## Break it and diagnose it

The expected value is wrong. Read the actual assertion failure; successful execution and a correct result are different claims.

{{broken}}

{{diagnostic}}

## Exercise

Write a goal for counting rejected jobs. Implement it without files or AI. Use at least three inputs, including an empty array, and explain what each assertion proves.

## Checkpoint

- I can distinguish a language mechanism from application policy.
- I can name an observable success criterion.
- I can explain why local execution is not a sandbox.
