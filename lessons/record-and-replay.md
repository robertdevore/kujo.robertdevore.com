## Signature determinism drill

Could you reproduce this result tomorrow without the provider? A cassette stores response evidence indexed by the normalized request. Replay lets the program exercise response handling without opening a socket.

## Runtime contract

KUJO_AI_RECORD selects a recording directory; KUJO_AI_REPLAY selects a replay directory. KUJO_AI_REPLAY_MODE can be strict or fallthrough. Strict is the default and returns a replay_miss on absent evidence without using the network. Fallthrough may call the network and record a response, so it belongs in an explicit opt-in workflow.

Per-call cassette options can select replay/strict and a directory. Replay lookup occurs before destination policy and HTTP-client creation, keeping strict replay hermetic. AI capability is still the appropriate allowance for the high-level helper. A successful replay does not prove that a live endpoint would be allowed.

## Read the example

The course includes reviewed synthetic cassettes from upstream and records their provenance. The endpoint uses an unavailable loopback port, and the request explicitly selects strict replay. The result must match the committed response. No live credentials are needed.

The breaking drill changes the prompt so the request identity has no cassette. It promotes the returned error to a command failure so the verifier can detect the replay miss. A test that silently falls through would violate this lesson's purpose.

## Professional pattern

Record against a controlled fixture server first. Inspect the cassette before committing: response text can contain private data even when credentials are redacted. Separate fixture-backed tests from live-provider smoke checks, and never overwrite expected evidence merely to make a test pass.

Replay establishes repeatability of a particular recorded interaction. It does not prove a live model will obey the same schema next time, or that your evaluator detects every plausible bad answer. Add adversarial response fixtures as the application grows.

## Working example

{{example}}

## Run it

From the course repository root, use the pinned Kujo 1.3.1 runtime.

{{command}}

{{output}}

## Break it and diagnose it

The changed request has no cassette. Strict mode must report replay_miss and must not contact the endpoint.

{{broken}}

{{diagnostic}}

## Exercise

Run the example with no live credentials. Change the prompt and capture the miss. Restore it, then review the cassette for sensitive content. Write a separate opt-in recording command without changing the default strict test.

## Checkpoint

- I can run AI tests offline.
- I keep fallthrough out of deterministic gates.
- I review cassettes as potentially sensitive evidence.
