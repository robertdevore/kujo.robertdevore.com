## Security contract

Kujo is not a sandbox. Trusted execution enables ambient host effects with the current process privileges. --untrusted switches to deny-by-default native effects. Explicit --allow-* flags also imply a restricted baseline; --allow-all is trusted behavior.

Capability categories include filesystem read/write/delete, process and shell execution, environment read/write, network client/server, AI, database, clock, and randomness. Consult the native inventory for the specific function's gate. A capability name describes an effect category, not a per-file or per-domain permission list.

## Capability drill

Run the fixture reader without any allowances and observe the denial. Then add only --allow-fs-read and run it again. Finally attempt a write without granting write authority. Success at one boundary must not erase the other denial.

The course verifier runs the allowed reader and a denied write as separate processes. The write targets a throwaway path and is never needed for success. Inspect the actual message and the nonzero status below.

## Professional pattern

Build an authority table before running a new automation: operation, resource, native API, capability, and external control. Keep pure transformations capability-free. If a tool needs a child process, assess what that child can do outside Kujo's gates.

Use external process/container/VM isolation where the threat model requires it. Apply resource and time limits outside the language for arbitrary untrusted code. A local course playground that accepts arbitrary server-side code would need that architecture; this site deliberately provides source and recorded results instead.

## Common mistakes

Do not grant all capabilities to resolve the first denial. Do not infer that --untrusted is an operating-system jail. Do not treat an AI-generated explanation of required permissions as authoritative: verify the calls and the requested resources.

## Working example

{{example}}

## Run it

From the course repository root, use the pinned Kujo 1.3.1 runtime.

{{command}}

{{output}}

## Break it and diagnose it

The lesson grants read authority only. A write must still be denied; the gate must not create the target file.

{{broken}}

{{diagnostic}}

## Exercise

Create a three-column authority table for your reporting utility. Run with no allowances, then only the required ones. Keep a negative test for an effect that must remain unavailable.

## Checkpoint

- I can explain trusted and restricted baselines.
- I grant only necessary effect categories.
- I do not call the language a sandbox.
