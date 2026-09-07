## Where you are

Complete lessons 28–34 before starting. This is an implementation exercise, followed by a tested comparison solution. Write your own version first; the comparison is useful for reviewing boundaries, not merely copying a passing output.

## Goal and acceptance contract

Add an AI response boundary to a working local program and prove its response handling without live credentials.

The recorded chat envelope passes schema checks, its expected message is verified, and the two-step tool-loop fixture reaches the expected structured result. Changing the prompt produces a replay miss.

## Plan the boundary

Write down the input, output, and failure states before changing code. Decide which values are required and which may be absent. Keep the calculation independent of printing so assertions can inspect a real return value.

AI-specific authority is distinct from general network-client authority. The per-call cassette policy remains strict. No live API key is read.

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
kujo run --untrusted --allow-ai projects/ai/main.kujo
kujo run --untrusted --allow-ai examples/34.kujo
```

The repository's project verifier runs these comparisons and additional failure cases. A local fixture server is only needed for the native HTTP integration. AI comparisons replay committed cassettes and need no server.

## Break it deliberately

Remove a required input or allowance, alter an expected value, or supply a malformed record. Identify whether the failure happened during parsing, input validation, capability checking, execution, or evaluation. Restore the smallest change that fixes the intended problem.

A useful negative test cannot pass merely because something failed: a missing import is not evidence that your validator rejected a bad quantity. Check the reason and retain that diagnostic with your test.

## Extend it

Add a malformed response fixture and a plausible wrong result. Keep schema rejection separate from independent evaluation. Add a synthetic secret sentinel and prove it is absent from output.

## Review before continuing

Explain the input contract, the authority required, and what proves success. Point to the test that rejects an incorrect result. Identify the finite bound on work. For concurrent or AI code, explain who owns completion and when a result may be accepted.

The next stage adds another boundary to this working foundation. Keep this build as a regression fixture rather than discarding it after reading the lesson.

## Comparison source

[Download the entrypoint](/projects/ai/main.kujo). The complete project, modules, fixtures, and tests are in the [course repository](https://github.com/robertdevore/kujo.robertdevore.com/tree/main/projects/ai).

```kujo
let options := {"endpoint": "http://127.0.0.1:1/v1/chat/completions", "model": "gpt-replay", "api_key": secret("course-synthetic-key"), "cassette": {"mode": "strict", "dir": "fixtures/ai"}}
let schema := {"type": "object", "required": ["message"], "properties": {"message": {"type": "string", "minLength": 1}}}
match ai_chat("Hello model", options) {
    case Ok(payload): {
        assert_equal(json_schema_validate(payload, schema)["valid"], true)
        assert_equal(payload["message"], "hello from cassette")
        print(to_json({"schema": "course.ai/v1", "request": ai_request_hash("Hello model", options), "validated": true}))
    }
    case Err(err): { throw(to_string(err)) }
}
```

<div class="lesson-actions"><button class="complete" data-complete="build-5" type="button">Mark build complete</button><span data-complete-status></span></div>

[Return to the course map →](/course/)

