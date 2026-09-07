## Where you are

Complete lessons 8–14 before starting. Write your own implementation first, then compare it with the tested solution. Review how each version handles input, effects, and failure.

## Goal and acceptance contract

Turn a fixed set of domain records into ordered results using bounded async work.

Two jobs produce doubled values in input order. A negative quantity becomes an Err and must not appear as a successful row. Result/Option consumers must handle absence and failure explicitly.

## Plan the boundary

Write down the input, output, and failure states before changing code. Decide which values are required and which may be absent. Keep calculations separate from printing so tests can assert their return values.

Pure worker calculations need no host-effect allowances. Concurrency does not add isolation.

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
kujo run --untrusted projects/concurrent/main.kujo
```

The project verifier runs these comparisons and additional failure cases.

## Break it deliberately

Remove a required input or allowance, alter an expected value, or supply a malformed record. Identify whether the failure happened during parsing, input validation, capability checking, execution, or evaluation. Fix the cause of the failure, then rerun the test.

A negative test must fail for the intended reason. A missing import does not prove that a validator rejected bad input. Check and retain the diagnostic.

## Extend it

Add a sequential oracle and compare the entire result. Increase the fixture to five jobs while keeping concurrency at two. Do not depend on completion timing.

## Review before continuing

Explain the input contract, the authority required, and what proves success. Point to the test that rejects an incorrect result. Identify the finite bound on work. For concurrent or AI code, explain who owns completion and when a result may be accepted.

Keep this build and its tests for regression checks as you progress.

## Comparison source

[Download the entrypoint](/projects/concurrent/main.kujo). The complete project, modules, fixtures, and tests are in the [course repository](https://github.com/robertdevore/kujo.robertdevore.com/tree/main/projects/concurrent).

```kujo
struct Job { label: string, units: int }
async func process(job) {
    if job.units < 0 { return Err("negative units") }
    return Ok({"label": job.label, "doubled": job.units * 2})
}
func main() {
    let jobs := [Job {label: "a", units: 2}, Job {label: "b", units: 3}]
    let results := await parallel_map(jobs, process, 2)
    mut rows := []
    for result in results {
        match result {
            case Ok(row): { rows = push(rows, row) }
            case Err(reason): { throw(reason) }
        }
    }
    assert_equal(rows[0]["label"], "a")
    assert_equal(rows[1]["doubled"], 6)
    match Some(len(rows)) { case Some(count): { assert_equal(count, 2) } case None: { throw("missing count") } }
    print(to_json(rows))
}
main()
```

<div class="lesson-actions"><button class="complete" data-complete="build-2" type="button">Mark build complete</button><span data-complete-status></span></div>

[Return to the course map →](/course/)

