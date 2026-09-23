## Mental model

A secret is a value whose display behavior must differ from an ordinary string. Redaction helps prevent accidental logging, but the application still controls where it obtains, reveals, transmits, and retains the value.

## Runtime contract

secret wraps a string; is_secret checks the wrapper; reveal is the explicit plaintext boundary. Standard display and JSON/TOML/YAML/CSV conversion redact secrets as *** even when nested. Debug formatting also redacts them. This is a runtime wrapper, not encryption at rest or an operating-system secret store.

AI helpers accept wrapped keys at the request boundary. Ordinary code should not reveal the key just to put it in options. Reading environment credentials is a separate effect requiring environment-read authority where restricted. The example uses a clearly synthetic value and needs no environment access.

## Network policy

An endpoint allowlist controls where an AI request may go; it does not make every prompt appropriate to send. Keep private inputs out of external requests unless the user and application policy allow them. Also inspect cassettes: model output can contain sensitive material even when request credentials are omitted.

## Professional pattern

Keep credentials in an operator-controlled environment or secret manager, wrap them promptly, and log redacted metadata. Use correlation IDs and bounded result summaries instead of raw prompts and headers. Test serialization with a synthetic sentinel and assert that it never appears.

## Common mistakes

Calling reveal and then printing the result defeats redaction by design. A redacted parent log does not control a child process's inherited environment. Secrets embedded into arbitrary text before wrapping may escape the intended boundary. The AI stage separates general network access from AI-specific egress.

## Working example

{{example}}

## Run it

From the course repository root, use the pinned Kujo 1.5.0 runtime.

{{command}}

{{output}}

## Break it and diagnose it

reveal deliberately returns the inner value. The failed assertion demonstrates why revealing before logging defeats the wrapper.

{{broken}}

{{diagnostic}}

## Exercise

Create nested JSON, TOML, or YAML output containing a synthetic secret and verify redaction. Add a test that detects accidental reveal. Write an operator note explaining where real credentials are sourced without including one.

## Checkpoint

- I keep reveal at explicit authorized boundaries.
- I test redaction with synthetic values.
- I distinguish redaction from storage and egress policy.

## Prove AI endpoint denial

Run `examples/supplemental/endpoint-denial.kujo` with `--untrusted --allow-ai` and `KUJO_AI_ALLOWED_ENDPOINTS=https://approved.example.test/v1`. The script requests a different endpoint and asserts the real structured `endpoint_denied` result. This test uses no cassette: successful replay would bypass the live destination-policy check and could not prove this denial. The verifier also proves that `--allow-net-client` alone does not grant a normal AI request.

## Security tokens in 1.5.0

Use secure_random_token(byte_length) for credentials such as reset links, session identifiers, and bearer grants. It accepts 16–128 bytes from the operating-system-seeded CSPRNG and returns an unpadded base64url Secret. It requires --allow-random and remains independent of set_random_seed. Seeded random helpers and random_id are not credential generators.

The supplemental v1-5-token.kujo example generates 32 bytes, verifies the Secret boundary and 43-character encoded length, and prints only the redacted value: ***. Its test suite checks both allowed and denied execution without recording the generated credential. Do not assert a fixed token value or seed away its entropy for a test. Inject a clearly non-production fixture into application-level tests instead.

When recovery is unnecessary, persist a one-way digest rather than the token. Reveal only at the intended delivery or verification boundary; avoid logging the revealed string.


### Verified 1.5.0 example

```kujo
let token := secure_random_token(32)
assert(is_secret(token))
assert(len(reveal(token)) == 43)
// Never print the revealed credential. Only verify the redaction boundary.
print(token)
```

[Download this example](/examples/supplemental/v1-5-token.kujo). The repository release verifier supplies its fixtures and records success and failure diagnostics.
