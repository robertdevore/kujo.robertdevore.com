## Why this exists

A generator optimizes for producing an answer. An evaluator decides whether that answer satisfies an external criterion. If both merely repeat the same unsupported claim, the system has no independent evidence.

## Deterministic checks first

Start with input validation, schema checks, arithmetic invariants, fixture expectations, and bounded tool results. Use a model-based evaluator only when a criterion genuinely needs judgment, and record its uncertainty and disagreement policy. Do not replace an exact comparison with a model opinion.

The example compares a proposed count with the length of trusted local input. Both a well-shaped correct result and a well-shaped wrong result are tested. This demonstrates why structured output validation is necessary but insufficient.

## Thresholds and failure

An acceptance threshold must mean something measurable. “Confidence above 0.9” is meaningless if a model simply invented the confidence number. Prefer criteria with provenance: all required records processed, zero unauthorized tools, expected output schema, and a successful independent test.

A failed evaluation may justify revision only if the action can be repeated safely and the budget remains. Otherwise stop. Keep the previous evidence rather than overwriting it with a later success that hides the failure history.

## Ecosystem boundary

The Kujo Eval project provides suite/report workflows, but evaluation remains an architectural responsibility even in a plain script. Inspect its current fixture and report contracts if you adopt it. The course's pure evaluator remains usable without an ecosystem dependency.

## Professional pattern

Create negative fixtures before trusting an evaluator. Include malformed data, plausible wrong answers, missing evidence, and extra unauthorized actions. A gate that has never rejected anything has weak evidence of usefulness.

## Common mistakes

Do not let the actor choose expected output after seeing its own answer. Do not treat “generated successfully” as acceptance. Do not hide a failed criterion inside an average score when it should be a hard stop.

## Working example

{{example}}

## Run it

From the course repository root, use the pinned Kujo 1.3.1 runtime.

{{command}}

{{output}}

## Break it and diagnose it

The proposal has the right shape but the wrong factual count. Independent evaluation rejects it.

{{broken}}

{{diagnostic}}

## Exercise

Build an evaluator with three hard criteria and five adversarial fixtures. Include a result that is valid JSON and schema-valid but incorrect. Specify which failures permit revision and which force STOP.

## Checkpoint

- I evaluate against trusted evidence.
- I test plausible wrong answers.
- I keep hard failures out of averaged scores.
