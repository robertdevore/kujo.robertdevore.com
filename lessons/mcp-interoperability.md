## Current protocol boundary

MCP is an external client/server protocol, not part of Kujo syntax. The current specification reviewed for this course resolves to 2026-07-28. Kujo's MCP ecosystem framework has its own supported implementation and deployment boundaries; do not claim it implements every feature of a newer protocol revision without tests.

Tool discovery describes interfaces. Invocation crosses a trust boundary. A server must validate arguments, authenticate or otherwise resolve its caller where required, apply host-owned authorization, execute bounded effects, and return an inspectable result. A tool's name or schema cannot grant permission.

## Read the example

The descriptor is an application-owned JSON object with an inputSchema. The local validation proves that count_jobs accepts only the intended shape. It does not start an MCP server or imply protocol compliance. The capstone keeps a similar descriptor next to the executor's actual policy.

## Current Kujo ecosystem

The reviewed MCP project supplies a local server framework, bounded file/resource controls, configurable exposure, and guidance for guarded remote deployments. Its documented readiness explicitly leaves production ingress, TLS, auth, secret custody, and rate/capacity decisions to operators. Ability projection is a separate opt-in bridge with its own canonical contract.

## Professional pattern

Start with a local read-only tool. Preserve schemas, tool identity, effect declarations, and result contracts through adapters. Treat tool output and retrieved content as untrusted data. Keep transport metadata from selecting permissions or tenant scope.

If a remote deployment is required, review the current protocol's transport and authorization requirements, including origin and credential boundaries, before exposing it. A working local demo is not a completed remote security architecture.

## Capstone handoff

You are ready to assemble a local operations runner: validated request, explicit context, bounded executor, controlled tools, independent evaluation, evidence, and PASS/REVISE/STOP. Keep every boundary as inspectable as this small descriptor.

## Working example

{{example}}

## Run it

From the course repository root, use the pinned Kujo 1.3.1 runtime.

{{command}}

{{output}}

## Break it and diagnose it

The extra argument is outside the tool schema. Discovery metadata must not allow arbitrary execution parameters.

{{broken}}

{{diagnostic}}

## Exercise

Design a read-only MCP-facing descriptor for your runner. Test argument rejection locally, then document the transport and host authorization needed before exposing it. Compare the pinned Kujo implementation with the current protocol rather than assuming full equivalence.

## Checkpoint

- I distinguish a descriptor from permission.
- I validate tool input before effects.
- I keep protocol and implementation versions explicit.
