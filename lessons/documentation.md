## Why this exists

An undocumented function can be syntactically correct and still be unusable by another developer or agent. Documentation must explain inputs, effects, failure, and examples, not merely repeat a function name.

## Tool contract

kujo docgen extracts documentation from source. Triple-slash documentation comments can accompany exported functions. Use the current help to select an output directory and format; the course exercises docgen with JSON output and a bounded source target.

The machine summary includes generated paths, item counts, diagnostics, gaps, and contract information. Generating a file does not establish that every public symbol has useful documentation. Inspect gap counts and enable appropriate failure gates when they match your project's policy.

## Read the example

The comment describes the calculation and its lack of host effects. The function is exported so it can become a public module boundary. The example shows how to call it; the assertion checks its result.

Generated API docs cannot decide why you chose Result over exceptions, which endpoint an operator should trust, or whether retrying an action is safe. Write those decisions in project documentation alongside generated references.

## Professional pattern

Generate into a dedicated output directory and never hand-edit generated artifacts. Keep source comments and examples reviewed with behavior changes. Document runtime requirements and known VM/interpreter boundaries. Link to the verified contract version rather than a vague “latest” claim when reproducibility matters.

The package build requires a README, generated API evidence, and a frozen-install instruction. A reader should be able to reproduce the documented command without access to your home directory or another course checkout.

## Common mistakes

Do not pass a repository root with unrelated private files to a documentation scan by default. Start with the intended source directory and inspect generated content before publishing. Do not count placeholder text as completed API documentation.

## Working example

{{example}}

## Run it

From the course repository root, use the pinned Kujo 1.3.1 runtime.

{{command}}

{{output}}

## Break it and diagnose it

The call violates the documented input boundary. Keeping a failing usage drill beside docs helps reveal examples that cannot actually run.

{{broken}}

{{diagnostic}}

## Exercise

Add documentation to the exported functions in your package. Run docgen into a work directory, inspect the generated module reference and JSON summary, then repair one missing explanation that extraction cannot supply.

## Checkpoint

- I generate from source comments.
- I inspect documentation gaps.
- I keep generated and authored documentation distinct.
