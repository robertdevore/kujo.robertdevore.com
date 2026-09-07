## Runtime contract

ai_stream_chat accepts an optional callback receiving a text delta and raw chunk dictionary. Returning false cancels later chunk delivery; other return values continue. The helper retains an aggregate Result envelope with stream text, chunks, and available metadata.

Replay delivers chunks in recorded order without opening a socket. That lets you test UI or processing behavior without depending on live token timing. The course fixture has a fixed stream, and the callback prints only its first delivered delta before requesting cancellation.

## Mental model

A stream is a partial observation until the application has enough evidence to accept a result. A fragment of JSON is not a valid domain object. Keep progressive display separate from the evaluator that decides whether the final structured output is usable.

Cancellation is also a lifecycle event, not automatic success. It can be user-requested, policy-triggered, or caused by an external client disconnect. The application should state whether partial output is retained, discarded, or labeled incomplete. Do not promise that a local cancellation signal reverses work already performed by a remote provider.

## Professional pattern

Bound accumulated output and callback work. A callback that performs expensive or unbounded effects can turn a streaming interface into a stalled pipeline. Test the first chunk, complete delivery, and early cancellation independently. Record whether a result was complete before presenting it as evidence.

## Common mistakes

Do not equate a visible token with successful work. Do not validate partial structured output as though it were complete. Do not add timing assertions to a replay test unless timing itself is the documented contract. The default exercise tests delivery order and cancellation semantics, not provider latency.

## Working example

{{example}}

## Run it

From the course repository root, use the pinned Kujo 1.3.1 runtime.

{{command}}

{{output}}

## Break it and diagnose it

The callback is not callable. The runtime must reject the invalid callback contract.

{{broken}}

{{diagnostic}}

## Exercise

Write a replay test that collects all chunks and another that cancels after the first. Compare delivery and aggregate metadata. Label partial output explicitly and prevent it from passing final schema evaluation.

## Checkpoint

- I distinguish progressive output from accepted results.
- I can cancel later chunk delivery.
- I test streaming without live timing.
