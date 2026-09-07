## Mental model

A project records enough structure that another developer can run it without reconstructing your shell environment. A lockfile makes a particular dependency declaration reproducible; it does not by itself implement every package-distribution feature you might expect elsewhere.

## Stable tool contract

kujo init creates kujo.toml and a starter src/main.kujo. package-add records a dependency declaration. package-install derives a deterministic kujo.lock snapshot. package-install --frozen verifies agreement without rewriting the manifest or lockfile.

These core commands cover local manifest/lockfile determinism. Do not describe them as a public registry or package publishing transport. Kennel is a separate ecosystem workflow with its own manifests and installed roots; inspect its contracts if your project needs those package workflows.

## Run the package drill

Use the supplied projects/package directory. Inspect kujo.toml, src/main.kujo, and the helper module. Run package-install, then package-install --frozen, then run src/main.kujo from that directory. Hash the manifest and lockfile before and after the frozen check; both must remain unchanged.

Now change a dependency declaration in a temporary copy without regenerating its lockfile. Frozen mode must fail. Save the actual result, restore the copy, and rerun. The course verification harness performs this drift drill independently of the published project.

## Professional pattern

Commit the manifest and lockfile together. Keep a reproducible entrypoint and a documented runtime version. Verify from a clean temporary directory, not only a checkout with years of cached dependencies. A lockfile is useful evidence only when the command actually checks it.

## Common mistakes

Do not run a normal install in CI and then claim frozen reproducibility. Do not confuse missing module files with a successful lockfile check. The snapshot verifies declared state; runtime tests still verify executable imports and behavior.

## Working example

{{example}}

## Run it

From the course repository root, use the pinned Kujo 1.3.1 runtime.

{{command}}

{{output}}

## Break it and diagnose it

This small assertion illustrates the invariant. The package integration gate also exercises and records a real manifest/lockfile mismatch; a string comparison is not a substitute for that gate.

{{broken}}

{{diagnostic}}

## Exercise

Initialize a temporary package, add a dependency declaration using package-add --version, generate its lock, and verify frozen mode leaves both files unchanged. Introduce manifest drift and capture the real command failure.

## Checkpoint

- I can initialize and run a standalone project.
- I distinguish snapshot determinism from package transport.
- I verify frozen mode with a deliberate drift case.
