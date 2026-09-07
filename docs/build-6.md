## Where you are

Complete lessons 35–40 before starting. Write your own implementation first, then compare it with the tested solution. Review how each version handles input, effects, and failure.

## Goal and acceptance contract

Combine a bounded goal, explicit context, proposed results, independent evaluation, and a final disposition.

The first wrong proposal is rejected; a second correct proposal passes within two attempts. A single wrong proposal ends in STOP. No unbounded retry or self-issued approval exists.

## Plan the boundary

Write down the input, output, and failure states before changing code. Decide which values are required and which may be absent. Keep calculations separate from printing so tests can assert their return values.

This comparison implementation models decisions with pure local fixtures. Real tool effects must have separately resolved authority.

Do not grant more authority just to make a test pass. Compare the failed operation with the required inputs and allowed effects, then check every acceptance criterion.

## Implementation milestones

1. Implement the smallest pure calculation with a normal and an empty-input case.
2. Add the input boundary and reject malformed values before any required effects.
3. Add the output contract and inspect it independently of the computation.
4. Run a deliberate failure and confirm both the status and the reason.
5. Preserve the source, runtime version, and test result as evidence.

## Run the comparison

Clone the standalone course repository and run from its root unless the command changes directory. Create the ignored work directory before file-output exercises. Use Kujo 1.3.1.

```shell
kujo run --untrusted projects/workflow/main.kujo
```

The project verifier runs these comparisons and additional failure cases.

## Break it deliberately

Remove a required input or allowance, alter an expected value, or supply a malformed record. Identify whether the failure happened during parsing, input validation, capability checking, execution, or evaluation. Fix the cause of the failure, then rerun the test.

A negative test must fail for the intended reason. A missing import does not prove that a validator rejected bad input. Check and retain the diagnostic.

## Extend it

Add explicit REVISE events to the evidence stream, preserving the final PASS/STOP result. Record input identities, evaluation results, and attempt limits without raw secrets.

## Review before continuing

Explain the input contract, the authority required, and what proves success. Point to the test that rejects an incorrect result. Identify the finite bound on work. For concurrent or AI code, explain who owns completion and when a result may be accepted.

Keep this build and its tests for regression checks as you progress.

## Comparison source

[Download the entrypoint](/projects/workflow/main.kujo). The complete project, modules, fixtures, and tests are in the [course repository](https://github.com/robertdevore/kujo.robertdevore.com/tree/main/projects/workflow).

```kujo
func evaluate(proposal, actual) { return proposal["count"] == actual }
func run_workflow(proposals, actual, maximum) {
    mut attempts := 0
    for proposal in proposals {
        attempts += 1
        if attempts > maximum { return {"verdict": "STOP", "attempts": maximum, "reason": "budget"} }
        if evaluate(proposal, actual) { return {"verdict": "PASS", "attempts": attempts, "count": actual} }
    }
    return {"verdict": "STOP", "attempts": attempts, "reason": "evaluation_failed"}
}
let result := run_workflow([{"count": 3}, {"count": 2}], 2, 2)
assert_equal(result["verdict"], "PASS")
assert_equal(result["attempts"], 2)
assert_equal(run_workflow([{"count": 3}], 2, 1)["verdict"], "STOP")
print(to_json(result))
```

<div class="lesson-actions"><button class="complete" data-complete="build-6" type="button">Mark build complete</button><span data-complete-status></span></div>

[Return to the course map →](/course/)

