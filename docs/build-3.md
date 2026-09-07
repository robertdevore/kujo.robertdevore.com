## Where you are

Complete lessons 15–21 before starting. This is an implementation exercise, followed by a tested comparison solution. Write your own version first; the comparison is useful for reviewing boundaries, not merely copying a passing output.

## Goal and acceptance contract

Create a standalone package with an exported module, tests, documentation, and machine-readable output.

Frozen install leaves the manifest and lockfile unchanged. The exported total function returns 5 for [2,3]. The framework suite passes and the VM entrypoint emits one JSON value. A drifted manifest fails frozen mode.

## Plan the boundary

Write down the input, output, and failure states before changing code. Decide which values are required and which may be absent. Keep the calculation independent of printing so assertions can inspect a real return value.

The calculation is pure. Package and documentation commands are operator tooling with their own file operations, not script capability grants.

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
cd projects/package
kujo package-install --frozen
kujo run --untrusted src/main.kujo
kujo test-run --untrusted tests.kujo
kujo docgen src --out-dir work/docs --no-builtins --json
```

The repository's project verifier runs these comparisons and additional failure cases. A local fixture server is only needed for the native HTTP integration. AI comparisons replay committed cassettes and need no server.

## Break it deliberately

Remove a required input or allowance, alter an expected value, or supply a malformed record. Identify whether the failure happened during parsing, input validation, capability checking, execution, or evaluation. Restore the smallest change that fixes the intended problem.

A useful negative test cannot pass merely because something failed: a missing import is not evidence that your validator rejected a bad quantity. Check the reason and retain that diagnostic with your test.

## Extend it

Copy the package into a clean temporary directory and rerun every command there. Remove ambient KUJO_MODULE_PATH values to prove the project supplies its own modules.

## Review before continuing

Explain the input contract, the authority required, and what proves success. Point to the test that rejects an incorrect result. Identify the finite bound on work. For concurrent or AI code, explain who owns completion and when a result may be accepted.

The next stage adds another boundary to this working foundation. Keep this build as a regression fixture rather than discarding it after reading the lesson.

## Comparison source

[Download the entrypoint](/projects/package/src/main.kujo). The complete project, modules, fixtures, and tests are in the [course repository](https://github.com/robertdevore/kujo.robertdevore.com/tree/main/projects/package).

```kujo
from src.report import total
assert_equal(total([2, 3]), 5)
print(to_json({"schema": "course.package/v1", "total": total([2, 3])}))
```

<div class="lesson-actions"><button class="complete" data-complete="build-3" type="button">Mark build complete</button><span data-complete-status></span></div>

[Return to the course map](/course/)

