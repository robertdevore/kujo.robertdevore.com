## Where you are

Complete lessons 22–27 before starting. This is an implementation exercise, followed by a tested comparison solution. Write your own version first; the comparison is useful for reviewing boundaries, not merely copying a passing output.

## Goal and acceptance contract

Read a contained fixture, run a controlled process, call a local HTTP fixture, and write a structured result.

The fixture response is successful, process output is complete, and work/automation.json contains the intended input. Removing an allowance fails at that boundary. The in-memory SQLite check returns one deterministic row.

## Plan the boundary

Write down the input, output, and failure states before changing code. Decide which values are required and which may be absent. Keep the calculation independent of printing so assertions can inspect a real return value.

The loopback exception is deliberate and limited to this local fixture. Production outbound calls should select an approved external endpoint and apply --deny-private-net. The process example targets macOS/Linux /usr/bin/printf; configure a reviewed equivalent on Windows.

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
node scripts/http-fixture.mjs
# In a second terminal, from the course root:
KUJO_ALLOW_PRIVATE_NETWORK_DESTINATIONS=1 kujo run --untrusted --allow-fs-read --allow-fs-write --allow-process-exec --allow-net-client projects/native/main.kujo
kujo run --untrusted --allow-database projects/native/database.kujo
```

The repository's project verifier runs these comparisons and additional failure cases. A local fixture server is only needed for the native HTTP integration. AI comparisons replay committed cassettes and need no server.

## Break it deliberately

Remove a required input or allowance, alter an expected value, or supply a malformed record. Identify whether the failure happened during parsing, input validation, capability checking, execution, or evaluation. Restore the smallest change that fixes the intended problem.

A useful negative test cannot pass merely because something failed: a missing import is not evidence that your validator rejected a bad quantity. Check the reason and retain that diagnostic with your test.

## Extend it

Replace the fixed local endpoint only as an explicit live opt-in. Validate its response, keep a finite timeout, deny private destinations, and preserve the offline fixture as the default suite.

## Review before continuing

Explain the input contract, the authority required, and what proves success. Point to the test that rejects an incorrect result. Identify the finite bound on work. For concurrent or AI code, explain who owns completion and when a result may be accepted.

The next stage adds another boundary to this working foundation. Keep this build as a regression fixture rather than discarding it after reading the lesson.

## Comparison source

[Download the entrypoint](/projects/native/main.kujo). The complete project, modules, fixtures, and tests are in the [course repository](https://github.com/robertdevore/kujo.robertdevore.com/tree/main/projects/native).

```kujo
# Run from the course root. Controlled loopback HTTP is an integration fixture.
let input_text := trim(read_file_beneath("fixtures", "input.txt", 1024))
let process := spawn_process(["/usr/bin/printf", "%s", input_text], {"timeout_ms": 2000, "max_output_bytes": 1024, "inherit_env": false})
assert_equal(process.success, true)
assert_equal(process.stdout_truncated, false)
let response := http_get("http://127.0.0.1:4190/health")
print(to_json(response))
let receipt := {"schema": "course.automation/v1", "input": input_text, "process_ok": process.success}
write_file("work/automation.json", to_json(receipt), true)
print(to_json(receipt))
```

<div class="lesson-actions"><button class="complete" data-complete="build-4" type="button">Mark build complete</button><span data-complete-status></span></div>

[Return to the course map →](/course/)

