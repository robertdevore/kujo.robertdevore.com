## Where you are

Complete lessons 15–21 before starting. Write your own implementation first, then compare it with the tested solution. Review how each version handles input, effects, and failure.

## Goal and acceptance contract

Create a standalone package with an exported module, tests, documentation, and machine-readable output.

Frozen install leaves the manifest and lockfile unchanged. The exported total function returns 5 for [2,3]. The framework suite passes and the VM entrypoint emits one JSON value. A drifted manifest fails frozen mode.

## Plan the boundary

Write down the input, output, and failure states before changing code. Decide which values are required and which may be absent. Keep calculations separate from printing so tests can assert their return values.

The calculation is pure. Package and documentation commands are operator tooling with their own file operations, not script capability grants.

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
cd projects/package
kujo package-install --frozen
kujo run --untrusted src/main.kujo
kujo test-run --untrusted tests.kujo
kujo docgen src --out-dir work/docs --no-builtins --json
```

The project verifier runs these comparisons and additional failure cases.

## Break it deliberately

Remove a required input or allowance, alter an expected value, or supply a malformed record. Identify whether the failure happened during parsing, input validation, capability checking, execution, or evaluation. Fix the cause of the failure, then rerun the test.

A negative test must fail for the intended reason. A missing import does not prove that a validator rejected bad input. Check and retain the diagnostic.

## Extend it

Copy the package into a clean temporary directory and rerun every command there. Remove ambient KUJO_MODULE_PATH values to prove the project supplies its own modules.

## Review before continuing

Explain the input contract, the authority required, and what proves success. Point to the test that rejects an incorrect result. Identify the finite bound on work. For concurrent or AI code, explain who owns completion and when a result may be accepted.

Keep this build and its tests for regression checks as you progress.

## Comparison source

[Download the entrypoint](/projects/package/src/main.kujo). The complete project, modules, fixtures, and tests are in the [course repository](https://github.com/robertdevore/kujo.robertdevore.com/tree/main/projects/package).

```kujo
from src.report import total
assert_equal(total([2, 3]), 5)
print(to_json({"schema": "course.package/v1", "total": total([2, 3])}))
```

<div class="lesson-actions"><button class="complete" data-complete="build-3" type="button">Mark build complete</button><span data-complete-status></span></div>

[Return to the course map](/course/)

