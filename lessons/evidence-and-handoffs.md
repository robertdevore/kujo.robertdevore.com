## Mental model

A result says what happened; evidence lets another observer assess that claim. A useful receipt identifies the input, runtime, bounded actions, evaluation, and final disposition. It is compact enough to review and specific enough to reproduce.

## Data contract

Use a versioned dictionary with stable fields. Separate factual observations from the verdict derived from them. Keep raw credentials, irrelevant private data, and hidden reasoning out of the record. A request hash or artifact digest can identify evidence without copying every input into every log.

The example records attempts, a verified count, and a PASS verdict. It tests that the verdict corresponds to evaluation, rather than trusting an arbitrary status string. The capstone persists a richer packet to a local work directory.

## Ecosystem choices

RunLedger supplies run-record workflows; Casefile captures failure evidence; PatchBrief describes source changes; ChangeBucket measures change footprint. These solve different problems. Select a tool because the next reviewer needs its evidence, not to satisfy a repository checklist.

Dispatch and explicit handoffs should carry a bounded goal, context references, allowed effects, acceptance criteria, and a stop policy. Passing a task to another worker does not grant broader authority. The receiving host must resolve permissions independently.

## Professional pattern

Include source/version provenance, deterministic inputs or references, executed checks, exit statuses, and a concise human summary. Preserve failed attempts when they explain the final disposition. Define retention and privacy separately from observability delivery.

## Common mistakes

Do not store an entire transcript as a substitute for a useful receipt. Do not report an action as completed merely because it was dispatched. Do not accept an upstream handoff's claimed approval without the host's authorization state.

## Working example

{{example}}

## Run it

From the course repository root, use the pinned Kujo 1.3.1 runtime.

{{command}}

{{output}}

## Break it and diagnose it

The receipt claims PASS without passing evaluation. A status label cannot replace evidence.

{{broken}}

{{diagnostic}}

## Exercise

Design a receipt for your runner and a handoff for one bounded subtask. Include input identity, authority, limits, evaluation, and a stop result. Remove any field that stores secrets or irrelevant raw content.

## Checkpoint

- I distinguish dispatched work from completed work.
- I tie verdicts to evidence.
- I carry explicit boundaries through handoffs.
