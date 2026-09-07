## Why this exists

A script becomes a project when another file needs to reuse its behavior. Modules make that boundary explicit. Imports should expose a small useful interface rather than execute surprising top-level effects.

## Language contract

Kujo supports import module_name and from module_name import symbols, including dotted paths such as src.util. Export imported functions with export func. Normal module use works on the default VM path, though imported implementation and callback bridges have their own documented boundaries.

Resolution searches deterministic roots: the importing package context, project and modules roots, explicit KUJO_MODULE_PATH entries, and installed roots named by a nearest Kennel lockfile where applicable. Imports do not implicitly fetch packages. The loader rejects unsafe traversal, symlink escapes, and import cycles with diagnostics.

## Read the example

The module exports a pure total function. The entrypoint owns the input, calls the module, and prints the result. There is no network or filesystem work inside the exported calculation. Reading module source is loader behavior; it is distinct from giving your program arbitrary read_file authority.

The file lives under examples/modules/report.kujo. Run from the repository root as shown. If resolution fails from another working directory, diagnose roots and invocation context rather than adding unrelated directories to the module search path until the import happens to work.

## Professional pattern

Use a small entrypoint for input validation, capability-aware effects, and output rendering. Keep calculations in modules. Make dependencies explicit in the project rather than relying on an unrelated parent checkout or a developer's personal environment.

## Common mistakes

A function declaration without export is not the intended public module API. A local directory that looks like an installed package is not proof it is in a locked resolution root. Circular imports usually indicate that shared definitions need their own lower-level module.

The package build later creates a standalone project and validates it from its own root, so the course repository cannot accidentally provide missing imports.

## Working example

{{example}}

## Run it

From the course repository root, use the pinned Kujo 1.3.1 runtime.

{{command}}

{{output}}

## Break it and diagnose it

The requested module does not exist in the configured roots. This is a resolution failure, not a provider installation request.

{{broken}}

{{diagnostic}}

## Exercise

Extract a validator and a renderer into separate modules. Export only their public functions. Run from an independent project root and remove any ambient module path before verifying it.

## Checkpoint

- I declare reusable functions with export.
- I know imports do not fetch dependencies.
- I can diagnose module roots and cycles.
