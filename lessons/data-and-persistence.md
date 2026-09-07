## Mental model

Persistence turns temporary results into future inputs. That makes a stored format an interface: tomorrow's process needs to know what the fields mean and how to reject an unsupported version.

## Native contract

Kujo provides JSON and other structured-file helpers as well as database APIs. JSON serialization has deterministic ordering contracts but only accepts supported values. Convert runtime structs to selected dictionaries before serializing. Invalid JSON and non-finite numbers must not silently become valid state.

Database operations require database authority. SQLite is useful for local state; an in-memory database gives a deterministic test without leaving a file. Use parameterized query values rather than composing SQL from untrusted strings. Inspect the current db_execute and db_query signatures for your runtime.

The lesson example shows a versioned file-shaped state round trip. The native project adds an in-memory SQLite contract test. These are different storage choices around the same domain model, not reasons to leak database row encodings into every function.

## Professional pattern

Validate before saving and again when loading. Include a schema version. For a format change, write a migration with fixtures covering old and new state. Prefer atomic publication when the native write contract supports it, and retain failure evidence instead of leaving a partially written file that looks complete.

A local database is not automatically private. File permissions, backups, and the process's authority remain relevant. Do not store raw credentials or entire model prompts when a bounded identifier or redacted receipt would suffice.

## Common mistakes

Do not use a timestamp as the only identity for reproducible evidence. Do not equate deterministic serialization with semantically correct content. A perfectly stable JSON object can still contain the wrong count. Test the calculation independently of the round trip.

## Working example

{{example}}

## Run it

From the course repository root, use the pinned Kujo 1.3.1 runtime.

{{command}}

{{output}}

## Break it and diagnose it

The persisted representation is malformed. Loading must reject it rather than return an apparently empty state.

{{broken}}

{{diagnostic}}

## Exercise

Create a versioned local state file and a migration fixture. Validate both before and after serialization. Run the supplied SQLite test and explain which capability it needs independently of file flags.

## Checkpoint

- I treat stored data as a versioned interface.
- I test values as well as serialization.
- I keep database and filesystem authority distinct.
