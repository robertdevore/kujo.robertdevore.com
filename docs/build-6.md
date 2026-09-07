## Where you are

Complete lessons 35–40 before starting. This is an implementation exercise, followed by a tested comparison solution. Write your own version first; the comparison is useful for reviewing boundaries, not merely copying a passing output.

## Goal and acceptance contract

Combine a bounded goal, explicit context, proposed results, independent evaluation, and a final disposition.

The first wrong proposal is rejected; a second correct proposal passes within two attempts. A single wrong proposal ends in STOP. No unbounded retry or self-issued approval exists.

## Plan the boundary

Write down the input, output, and failure states before changing code. Decide which values are required and which may be absent. Keep the calculation independent of printing so assertions can inspect a real return value.

This comparison implementation models decisions with pure local fixtures. Real tool effects must have separately resolved authority.

Do not broaden authority to make a failing test disappear. Diagnose the failed operation and compare it with the intended input and effect table. A successful command is only one part of the acceptance contract above.

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

The repository's project verifier runs these comparisons and additional failure cases. A local fixture server is only needed for the native HTTP integration. AI comparisons replay committed cassettes and need no server.

## Break it deliberately

Remove a required input or allowance, alter an expected value, or supply a malformed record. Identify whether the failure happened during parsing, input validation, capability checking, execution, or evaluation. Restore the smallest change that fixes the intended problem.

A useful negative test cannot pass merely because something failed: a missing import is not evidence that your validator rejected a bad quantity. Check the reason and retain that diagnostic with your test.

## Extend it

Add explicit REVISE events to the evidence stream, preserving the final PASS/STOP result. Record input identities, evaluation results, and attempt limits without raw secrets.

## Review before continuing

Explain the input contract, the authority required, and what proves success. Point to the test that rejects an incorrect result. Identify the finite bound on work. For concurrent or AI code, explain who owns completion and when a result may be accepted.

The next stage adds another boundary to this working foundation. Keep this build as a regression fixture rather than discarding it after reading the lesson.

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

