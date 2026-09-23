## Mental model

Persistence turns temporary results into future inputs. That makes a stored format an interface: tomorrow's process needs to know what the fields mean and how to reject an unsupported version.

## Native contract

Kujo provides JSON and other structured-file helpers as well as database APIs. JSON serialization has deterministic ordering contracts but only accepts supported values. Convert runtime structs to selected dictionaries before serializing. Invalid JSON and non-finite numbers must not silently become valid state.

Database operations require database authority. SQLite is useful for local state; an in-memory database gives a deterministic test without leaving a file. Use parameterized query values rather than composing SQL from untrusted strings. Inspect the current db_execute and db_query signatures for your runtime.

The lesson example shows a serialization round trip for versioned file data. The native project adds an in-memory SQLite contract test. These are different storage choices around the same domain model, not reasons to leak database row encodings into every function.

## Professional pattern

Validate before saving and again when loading. Include a schema version. For a format change, write a migration with fixtures covering old and new state. Prefer atomic publication when the native write contract supports it, and retain failure evidence instead of leaving a partially written file that looks complete.

A local database is not automatically private. File permissions, backups, and the process's authority remain relevant. Do not store raw credentials or entire model prompts when an identifier or redacted receipt with explicit size limits would suffice.

## Common mistakes

Do not use a timestamp as the only identity for reproducible evidence. Do not equate deterministic serialization with semantically correct content. A perfectly stable JSON object can still contain the wrong count. Test the calculation independently of the round trip.

## Working example

{{example}}

## Run it

From the course repository root, use the pinned Kujo 1.5.0 runtime.

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

## PostgreSQL beyond the local build

Kujo 1.5.0 adds db_pool_postgres_tls for verified TLS pooling. The API requires an explicit TCP hostname and caller-supplied PEM CA bundle, verifies the certificate chain and hostname, and bounds connection, acquisition, and statement time. The legacy db_pool PostgreSQL path does not provide that TLS contract.

Release each lease exactly once to the same pool. Before reuse, the verified pool rolls back, discards session state, and restores the statement timeout; failed resets evict connections. During shutdown, stop accepting work, drain requests within an application deadline, then close the pool.

This course's executable persistence build remains offline SQLite. The PostgreSQL pool discussion is source-reviewed against the [tagged contract and its dedicated local-server harness](https://github.com/kujolang/kujo/blob/v1.5.0/docs/POSTGRES_TLS_POOL.md); it is not a claim that the course ran a live PostgreSQL service. Database capability controls and verified TLS do not replace application authorization or tenant-isolation tests.
