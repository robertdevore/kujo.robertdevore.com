## The loop

**Goal → Context → Act → Evaluate → Record → Stop.** The current Kujo Workflows implementation makes these steps explicit through a portable harness, a specification, evaluation gates, and per-iteration artifacts. It is a workflow around a repository, not new Kujo syntax.

A goal names the desired observable result. Context identifies the authorized sources and scope. Act performs bounded work. Evaluate runs checks independent of the actor's self-report. Record preserves evidence. Stop is a first-class outcome: success, repeated failure, exhausted budget, denied authority, or work outside scope.

## Specification first

A useful spec includes inputs, outputs, allowed effects, maximum work, acceptance criteria, and failure outcomes. “Improve this repo until it is good” cannot be evaluated reliably. “Produce a report matching this schema from these fixtures within two attempts” can.

The example makes the attempt limit and acceptance predicate explicit. It is a small executable model of the policy, not a claim that a three-field dictionary implements the entire Workflows harness. The stage build adds a result and evidence packet.

## Current workflow implementation

The reviewed loop-engineering kit contains loop.spec.yml, HOWTO.md, an initializer, and a run-workflow script. Repository state lives under .loop-engineering with a ledger, summary, blockers, and per-iteration context/action/eval/verdict artifacts. Inspect and pin that toolkit before adopting it; do not execute discovered commands from untrusted content.

## Professional pattern

Define the evaluation gate before the agent acts. Keep approval boundaries tied to actual authority, and let the host decide whether approval exists. A repeated denied action should stop with a clear blocker, not expand its permissions.

## Common mistakes

Do not let a model rewrite its own acceptance criteria to make a result pass. Do not count a generated artifact as verified just because it exists. Do not repeat the same failed attempt without new evidence or a changed input.

## Working example

{{example}}

## Run it

From the course repository root, use the pinned Kujo 1.3.1 runtime.

{{command}}

{{output}}

## Break it and diagnose it

The proposed execution budget permits no valid attempt. Reject the spec before starting work.

{{broken}}

{{diagnostic}}

## Exercise

Write a one-page spec for your operations runner. Include two independent acceptance checks, an attempt limit, allowed files/tools, and explicit PASS, REVISE, and STOP conditions. Review it before implementing the loop.

## Checkpoint

- I define acceptance before execution.
- I can enumerate stop outcomes.
- I distinguish the workflow harness from language syntax.
