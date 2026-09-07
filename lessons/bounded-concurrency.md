## Today

The parity matrix covers the spawn surface but does not promise a general join mechanism or every shared-state scenario. spawn schedules detached work where supported. Its existence is not proof that the containing command waits for all effects in the way your application needs.

The current scope also explicitly defers full spawn_task body execution with interpreter context. Do not substitute that API for a working task system because its name sounds suitable. A dedicated VM SpawnThread opcode is deferred implementation work; this does not erase the currently tested spawn syntax.

## A bounded pattern

For a batch where every result matters, use an owned operation such as await parallel_map with a finite concurrency limit. The tested surface preserves input result order even when individual work completes in another order. Keep the worker's dependencies explicit and test failure propagation.

Our example uses a concurrency limit of two and a fixed input of three jobs. It verifies values and order, without relying on a wall-clock speed claim. A benchmark with a tiny arithmetic callback would not prove real-world parallel throughput.

## Spawn drill

Experiment separately with spawn and shared state in a throwaway program. Identify who observes completion and whether your observation actually waits. Do not put that experiment on the path that decides the stage project has succeeded. If you cannot establish completion, fix how the program waits for work; adding an arbitrary sleep does not establish it.

## Professional pattern

Bound both the total number of jobs and the number running concurrently. A finite concurrency limit over an unbounded stream still needs a total work or time policy. Stop or classify failures explicitly, and emit results in a deterministic order for downstream tools.

## Common mistakes

Concurrency is not isolation. Workers still operate under the host process's authority and runtime limits. Shared mutable names are not a substitute for a tested coordination contract. Preserve a simple sequential implementation as a correctness oracle.

## Working example

{{example}}

## Run it

From the course repository root, use the pinned Kujo 1.3.1 runtime.

{{command}}

{{output}}

## Break it and diagnose it

A failed worker must make the awaited batch fail. Do not accept a partial batch as a complete result.

{{broken}}

{{diagnostic}}

## Exercise

Build a three-job transform with parallel_map and a concurrency limit of two. Verify stable order against a sequential calculation. Add one failing job, then document a stop-versus-partial-result policy.

## Checkpoint

- I use explicit concurrency and total-work bounds.
- I know detached spawn is not a completion receipt.
- I can compare a batch with a sequential oracle.

## A deliberately limited spawn probe

`examples/supplemental/spawn.kujo` runs a detached pure block and prints “spawn accepted; completion not asserted.” Its passing test establishes that the syntax is accepted in this runtime. It deliberately does not claim that the printed line proves the detached body completed. Use the awaited mapped-work pattern when completion is part of your success condition.
