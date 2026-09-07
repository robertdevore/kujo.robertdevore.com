## Runtime contract

ai_request_hash normalizes an AI request and computes SHA-256 without network I/O or capability requirements. The normalized request includes its hash version, endpoint, model, message/body data, and relevant headers. Credential fields and documented volatile headers are excluded.

Header normalization lowercases and sorts included header names. The endpoint is trimmed as supplied. Do not invent a semantic URL equivalence policy: two differently spelled endpoints are not automatically the same work just because an operator thinks they lead to the same service.

## Mental model

The hash answers which normalized request this evidence belongs to. It does not certify that the answer is correct, that a provider will be deterministic, or that a different model has equivalent behavior. Excluding credentials keeps request identity stable across key rotation; the key is not part of the normalized hash input.

The example changes only the API key and proves the identity remains equal. A changed prompt must yield a different identity. This catches a common mistake where a cached result is reused after the actual work changed.

## Professional pattern

Keep the request hash next to response evidence and evaluation results. Use a documented schema/version for any application cache around it. Review what fields contribute to identity before deciding whether two runs are comparable.

Do not use the request hash as an authorization token. Anyone who knows public request data may be able to compute the same value. Authorization must come from the caller and host policy, not possession of a deterministic digest.

## Common mistakes

A stable request hash does not guarantee a stable live response. Excluding credentials from identity does not mean cassettes contain no sensitive text. Hashing model output identifies its bytes; it does not establish that the content is true. The next lesson connects identity to reproducible offline response fixtures.

## Working example

{{example}}

## Run it

From the course repository root, use the pinned Kujo 1.3.1 runtime.

{{command}}

{{output}}

## Break it and diagnose it

The prompts represent different work, so the deliberately equal-hash expectation fails.

{{broken}}

{{diagnostic}}

## Exercise

Compare hashes after changing a credential, prompt, model, and relevant header. Record which differences change identity. Explain why the digest must not be used as a permission token.

## Checkpoint

- I know what request identity proves.
- I test credential-independent identity.
- I do not confuse identity with correctness or authorization.
