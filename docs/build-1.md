## Where you are

Complete lessons 1–7 before starting. Write your own implementation first, then compare it with the tested solution. Review how each version handles input, effects, and failure.

## Goal and acceptance contract

Take job labels from command-line arguments, reject blank input, and produce a useful human-readable report.

A run with alpha and beta reports two accepted jobs in input order. No arguments must fail with the intended message. A whitespace-only label must fail.

## Plan the boundary

Write down the input, output, and failure states before changing code. Decide which values are required and which may be absent. Keep calculations separate from printing so tests can assert their return values.

No host-effect allowances are required. args is a pure input surface.

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
kujo run --untrusted projects/report/main.kujo -- jobs alpha beta
```

The project verifier runs these comparisons and additional failure cases.

## Break it deliberately

Remove a required input or allowance, alter an expected value, or supply a malformed record. Identify whether the failure happened during parsing, input validation, capability checking, execution, or evaluation. Fix the cause of the failure, then rerun the test.

A negative test must fail for the intended reason. A missing import does not prove that a validator rejected bad input. Check and retain the diagnostic.

## Extend it

Add a count-only renderer without changing the validation function. Keep order stable and do not silently drop bad labels.

## Review before continuing

Explain the input contract, the authority required, and what proves success. Point to the test that rejects an incorrect result. Identify the finite bound on work. For concurrent or AI code, explain who owns completion and when a result may be accepted.

Keep this build and its tests for regression checks as you progress.

## Comparison source

[Download the entrypoint](/projects/report/main.kujo). The complete project, modules, fixtures, and tests are in the [course repository](https://github.com/robertdevore/kujo.robertdevore.com/tree/main/projects/report).

```kujo
# Stage 1: arguments are user input; all calculations remain pure.
func summarize(labels) {
    if len(labels) == 0 { throw("at least one job label is required") }
    mut accepted := []
    for label in labels {
        if len(trim(label)) == 0 { throw("job labels must not be empty") }
        accepted = push(accepted, {"name": trim(label), "accepted": true})
    }
    return {"count": len(accepted), "jobs": accepted}
}
func main() {
    let input := args()
    if len(input) < 2 || input[0] != "jobs" { throw("at least one job label is required; usage: -- jobs alpha beta") }
    mut labels := []
    mut index := 1
    while index < len(input) { labels = push(labels, input[index]) index += 1 }
    let result := summarize(labels)
    print("Accepted jobs: " + to_string(result["count"]))
    for job in result["jobs"] { print("- " + job["name"]) }
}
main()
```

<div class="lesson-actions"><button class="complete" data-complete="build-1" type="button">Mark build complete</button><span data-complete-status></span></div>

[Return to the course map →](/course/)



The CLI requires the explicit `jobs` subcommand. In this release, `args()` without user arguments can expose the script path; checking the subcommand prevents treating it as a job label.
