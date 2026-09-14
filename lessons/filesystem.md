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

From the course repository root, use the pinned Kujo 1.4.0 runtime.

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

## Confined publication in 1.4.0

`write_file_atomic_beneath(root, relative_path, payload, overwrite?)` publishes text or bytes using held directory handles. It requires filesystem-write, creates missing parents, and defaults to no overwrite. It rejects unsafe relative components and symlink/reparse traversal. The caller must choose a trusted root; a filesystem without the required operations fails rather than falling back to path-based publication.

The guarantee follows directory identity, not continuous ancestry: if another actor moves an open directory, publication still targets that directory. Protect the workspace from hostile writers. Synced file contents do not guarantee crash-durable directory metadata. A `cleanup_failed_after_publish` error means publication happened but cleanup failed; inspect the target before retrying.

Create the course's ignored `work` directory, then run `kujo run --untrusted --allow-fs-write examples/supplemental/v1-4-publication.kujo`. Repeat without the allowance and inspect the real denial. Both paths run in the release verifier. Also note that `delete_file` now unlinks directory and dangling symlinks themselves while still rejecting actual directories.
