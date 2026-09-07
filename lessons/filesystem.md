## What can this code touch?

A file operation crosses the language boundary into host state. Filesystem-read and filesystem-write are separate capabilities; deletion has its own authority. These flags are capability categories, not a per-path sandbox.

## Native contract

read_file reads text; write_file writes it. Consult the inventory for byte limits, UTF-8 handling, and error behavior. For paths supplied by an external request, a simple string prefix is not a complete containment check: parent traversal and symlinks can invalidate it.

The current runtime provides read_file_beneath(root, relative_path, max_bytes) for bounded reads that reject unsafe traversal, symlink/reparse traversal, non-regular files, oversized reads, and invalid UTF-8. Use it when that contract fits your application, while retaining external isolation where the trust model requires it.

The example reads only a committed fixture under a chosen root and asserts its content. Running it without filesystem-read authority must fail. Granting read authority does not grant writes or deletion.

## Professional pattern

Separate selection from action. First produce a plan describing which files will be touched; validate the paths and bounds; then perform only the approved operations. Write structured receipts after successful completion. Atomic-write helpers can reduce partial-update risk, but they do not decide whether overwriting a file is authorized.

Avoid using real user documents for a lesson drill. The fixture directory provides small, known inputs. A temporary work directory contains generated outputs, so the test cannot accidentally become a bulk cleanup script.

## Common mistakes

A normalized path is not proof that a symlink cannot escape the intended root. A read flag does not constrain the runtime to your current directory. A successful write does not prove the data was correct; read or inspect the intended result and test its schema.

The breaking example attempts parent traversal under the bounded API. This tests a path contract independently of a capability denial.

## Working example

{{example}}

## Run it

From the course repository root, use the pinned Kujo 1.3.1 runtime.

{{command}}

{{output}}

## Break it and diagnose it

The relative path tries to escape the selected root. Filesystem-read authority is granted, so rejection should concern path containment.

{{broken}}

{{diagnostic}}

## Exercise

Write a bounded reader for a named fixture. Reject parent traversal, an oversized file, and a symlink fixture where your platform supports it. Add a write into a temporary directory only after validating the intended output.

## Checkpoint

- I distinguish capability categories from path containment.
- I bound file reads.
- I test failure before using real files.
