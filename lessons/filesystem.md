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

From the course repository root, use the pinned Kujo 1.5.0 runtime.

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

## Bounded artifacts in 1.5.0

Use `sha256_file_beneath(root, relative_path, max_bytes)` to hash an artifact without buffering the whole file. It accepts a ceiling from 1 byte through 4 GiB and returns sha256 and bytes. `copy_file_beneath(source_root, source_path, target_root, target_path, max_bytes)` streams through a fixed 64 KiB buffer and atomically publishes without replacing an existing destination. Copying requires both filesystem-read and filesystem-write. The smaller digest_file_beneath API remains available with a 64 MiB ceiling.

The roots must be trusted. Relative path traversal cannot follow links. These receipts describe the bytes actually read or copied; they do not establish a snapshot against concurrent in-place writes. Quiesce writers or use immutable inputs before treating a digest as artifact identity.

For a prefix, read_binary_prefix_beneath reads at most the requested bytes even when the file is larger. Its symlink policy differs: confined relative symlinks are permitted where supported, while Windows junction traversal is rejected. Keep the trusted root path stable.

### Page directories without confusing cursors

list_dir_beneath returns names, next_cursor, truncated, and scanned. Its cursor ordering strips the supplied suffix. With a .json suffix, a.json sorts before a-b.json and the first cursor is a. Limits are 1–1000 names and 1–100000 scanned entries; exceeding the scan ceiling fails rather than returning an incomplete success.

list_dir_page is path-based and orders full filenames instead: a-b.json sorts before a.json. It returns entries and next_after, accepts 1–10000 names, and still scans the directory for every page. Neither API promises a snapshot across calls.

The repository example examples/supplemental/v1-5-files.kujo tests both cursor contracts, prefix bounds, hashing, and exact-byte copying. Run node scripts/v1-5-checks.mjs from the repository root to prepare fixtures and verify allowed operations, capability denials, copy collisions, byte ceilings, and scan ceilings in both runtimes.

Exercise: paginate a stable fixture directory, keep each API's cursor opaque, and verify that every expected name appears exactly once. Change the directory between pages and explain why a fresh traversal may be needed.


### Verified 1.5.0 example

```kujo
// The verifier prepares trusted roots and immutable fixture files.
let digest := sha256_file_beneath("work/v1-5/source", "a.json", 1024)
let small := digest_file_beneath("work/v1-5/source", "a.json", 1024)
assert(digest["sha256"] == small["sha256"])
assert(digest["bytes"] == 3)
let copied := copy_file_beneath("work/v1-5/source", "a.json", "work/v1-5/target", "copy.json", 1024)
assert(copied["sha256"] == digest["sha256"])
assert(copied["bytes"] == 3)
assert(byte_length(read_binary_prefix_beneath("work/v1-5/source", "a.json", 2)) == 2)
let page := list_dir_beneath("work/v1-5", "source", "", ".json", 1, 100)
assert(page["names"] == ["a.json"])
assert(page["next_cursor"] == "a")
assert(page["truncated"] == true)
let next := list_dir_beneath("work/v1-5", "source", page["next_cursor"], ".json", 1, 100)
assert(next["names"] == ["a-b.json"])
let ordinary := list_dir_page("work/v1-5/source", "", 1, ".json")
assert(ordinary["entries"] == ["a-b.json"])
print("bounded files verified")
```

[Download this example](/examples/supplemental/v1-5-files.kujo). The repository release verifier supplies its fixtures and records success and failure diagnostics.
