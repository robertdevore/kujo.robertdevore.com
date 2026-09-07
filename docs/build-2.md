## Where you are

Complete lessons 8–14 before starting. This is an implementation exercise, followed by a tested comparison solution. Write your own version first; the comparison is useful for reviewing boundaries, not merely copying a passing output.

## Goal and acceptance contract

Turn a fixed set of typed-looking domain records into ordered results using bounded async work.

Two jobs produce doubled values in input order. A negative quantity becomes an Err and must not appear as a successful row. Result/Option consumers must handle absence and failure explicitly.

## Plan the boundary

Write down the input, output, and failure states before changing code. Decide which values are required and which may be absent. Keep the calculation independent of printing so assertions can inspect a real return value.

Pure worker calculations need no host-effect allowances. Concurrency does not add isolation.

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
kujo run --untrusted projects/concurrent/main.kujo
```

The repository's project verifier runs these comparisons and additional failure cases. A local fixture server is only needed for the native HTTP integration. AI comparisons replay committed cassettes and need no server.

## Break it deliberately

Remove a required input or allowance, alter an expected value, or supply a malformed record. Identify whether the failure happened during parsing, input validation, capability checking, execution, or evaluation. Restore the smallest change that fixes the intended problem.

A useful negative test cannot pass merely because something failed: a missing import is not evidence that your validator rejected a bad quantity. Check the reason and retain that diagnostic with your test.

## Extend it

Add a sequential oracle and compare the entire result. Increase the fixture to five jobs while keeping concurrency at two. Do not depend on completion timing.

## Review before continuing

Explain the input contract, the authority required, and what proves success. Point to the test that rejects an incorrect result. Identify the finite bound on work. For concurrent or AI code, explain who owns completion and when a result may be accepted.

The next stage adds another boundary to this working foundation. Keep this build as a regression fixture rather than discarding it after reading the lesson.

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

