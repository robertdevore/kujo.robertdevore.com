## Why this exists

Waiting for external work should not force an application into a collection of hidden lifecycle assumptions. Async functions make pending results explicit. The owner still needs to await them, handle rejection, and decide when the overall run is complete.

## Runtime contract

An async func produces an awaitable result. await blocks expression completion until the pending value resolves. This does not mean every statement runs concurrently, or that an async declaration automatically accelerates CPU-bound work.

The example uses pure arithmetic inside an async function so scheduling semantics can be observed without a timer or network dependency. The caller awaits the result and asserts it before announcing completion. The failure drill awaits a rejected operation and lets the error reach the command boundary.

## Lifecycle

Keep a clear owner for required work. If a run's success depends on a value, await it before producing the receipt. Bound the input and use the runtime's finite scheduler deadline as a backstop, not as your only application stop condition.

Native async I/O still has effects. An async file read needs filesystem authority; an async HTTP call needs network authority. Scheduling does not bypass capability gates or make returned data trustworthy.

## Professional pattern

Separate a pure transformation from the asynchronous acquisition of its inputs. This lets deterministic tests cover the business rule without timing. Add a smaller integration test for completion and error propagation. Do not use sleeps as a substitute for waiting on owned work.

## Common mistakes

Printing a handle is not inspecting the completed value. Starting work and immediately declaring success loses evidence. Catching only the call site while ignoring the awaited failure can also miss the actual error boundary. The next lesson distinguishes bounded mapped work from detached spawn.

## Working example

{{example}}

## Run it

From the course repository root, use the pinned Kujo 1.3.1 runtime.

{{command}}

{{output}}

## Break it and diagnose it

The awaited operation rejects. Completion must propagate the failure rather than produce a success receipt.

{{broken}}

{{diagnostic}}

## Exercise

Create an async transform and a synchronous pure equivalent. Assert equal successful results and exercise a rejection. Draw which function owns the pending value and where success may be emitted.

## Checkpoint

- I distinguish a handle from its resolved result.
- I await work required for success.
- I preserve async failures.
