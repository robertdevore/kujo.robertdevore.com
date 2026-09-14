## Why this exists

Kujo has a broad native library. Memorizing names is less useful than knowing how to discover a function's actual contract. A plausible name or familiar equivalent from another language is not sufficient evidence.

## Read the inventory

The standard-library table records signatures, arity, return types, error behavior, capability gates, and examples. Some rows say handler-defined; inspect the handler and its tests when the table does not specify enough detail. This is especially important for network, database, and process APIs.

Major families include strings and collections; files and paths; JSON, TOML, YAML, and CSV; hashing and crypto; HTTP and sockets; processes and environment; databases; asynchronous helpers; formatting and inspection; and the AI mechanisms covered later.

## Four questions

Before using a native operation, answer: What arguments are accepted? What exact shape comes back? How is failure represented? What authority does it require? Then run a minimal example and an invalid-input drill.

The example parses a small JSON document, selects a field, and serializes a deliberate result. parse_json accepts JSON root values, not just dictionaries, so a successful parse alone does not establish that the result has the expected structure. Stage 5 introduces schema validation as a general boundary tool.

## Professional pattern

Wrap a native operation only when the wrapper adds a real application policy: input limits, a stable domain result, or an explicit retry decision. Avoid layers that merely rename every builtin; they obscure the canonical contract and multiply documentation work.

## Common mistakes

Display output and JSON serialization are not interchangeable. A runtime struct may print but fail to_json. Invalid JSON is an error, not an empty dictionary. Capability-free parsing does not make arbitrary parsed data trustworthy. It only tells you that parsing itself performs no host effect.

## Working example

{{example}}

## Run it

From the course repository root, use the pinned Kujo 1.4.0 runtime.

{{command}}

{{output}}

## Break it and diagnose it

The text is malformed JSON. The native parser returns a real parse-location failure instead of silently producing empty data.

{{broken}}

{{diagnostic}}

## Exercise

Choose one string helper and one filesystem helper from the inventory. Record their arity, result, failure, and capability. Write a valid and invalid call for each, using a fixture for the filesystem case.

## Checkpoint

- I consult the canonical builtin inventory.
- I distinguish parsing from validation.
- I know how to inspect handler-defined contracts.

## Bounded data APIs added in 1.4.0

The native inventory now includes HTML tokenization, URL normalization/components, bounded text decoding, streaming XML selection, JSON/JSONL file operations, external sorting, regular-file digests, and no-replace publication. These mechanisms do not implement crawling rules, retries, report schemas, or retrieval policy.

Use each API's explicit byte, event, depth, or row limits; their larger explicit bounds do not raise the existing buffered file/network defaults. XML projection rejects DTD/entity declarations and bounds gzip expansion. JSONL append may leave partial staged output on failure and is not transactional. Keep staging cleanup in the application.

The pure `examples/supplemental/v1-4-values.kujo` checks HTML tokenization and URL normalization without network access. Consult the tagged [native inventory](https://github.com/kujolang/kujo/blob/v1.4.0/docs/STANDARD_LIBRARY.md) for each operation's arity, bounds, failure shape, and primary/secondary capabilities.
