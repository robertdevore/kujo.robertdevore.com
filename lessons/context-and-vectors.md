## Runtime contract

ai_count_tokens gives a deterministic estimate, not provider-exact billing tokenization. ai_fit_context uses that estimate to remove oldest non-system messages. It preserves system messages and the last user message. If that minimum still exceeds the budget, fits is false and the caller must decide how to proceed.

Vector primitives include dot product, norm, normalization, cosine similarity, and top-k. They operate on finite numeric arrays with documented dimension and resource limits. Top-k produces index/score rows with stable tie handling. Core math does not store embeddings, maintain an ANN index, or choose a RAG policy.

## Mental model

A context budget is an explicit constraint on what information enters a request. A similarity score is a ranking signal, not proof that a document is relevant, current, or authorized for the user. Keep both decisions inspectable.

The example fits a short context and ranks two fixed vectors offline. This makes the mechanics testable without an embedding provider. A separate supplied AI fixture can exercise ai_embedding, but a test should not need a live model merely to verify cosine behavior.

## Professional pattern

Check fits before submitting. If preserved context cannot fit, stop with an actionable result instead of quietly dropping the most important instruction. Track selected document identifiers and provenance, and keep untrusted retrieved content clearly labeled as data.

Choose a retrieval system only when the application needs one. Storage, indexing, chunking, routing, and relevance thresholds are ecosystem/application policy, not additional Kujo syntax.

## Common mistakes

Do not call estimates exact token counts. Do not normalize vectors with ad hoc code before checking the native zero-vector contract. Do not claim high cosine similarity makes a retrieved instruction trustworthy.

## Working example

{{example}}

## Run it

From the course repository root, use the pinned Kujo 1.3.1 runtime.

{{command}}

{{output}}

## Break it and diagnose it

The vectors have different dimensions. Ranking and similarity require compatible numeric shapes.

{{broken}}

{{diagnostic}}

## Exercise

Force a context budget too small for the preserved messages and handle fits:false. Rank three fixed vectors including a tie. Explain which retrieval decisions remain outside these primitives.

## Checkpoint

- I check fits explicitly.
- I describe token counts as estimates.
- I separate vector math from retrieval and trust policy.

## Replay an embedding response

The repository also includes `examples/supplemental/embedding.kujo`, using the committed embedding cassette and `--allow-ai`. It calls `ai_embedding` with the fixture input “seed text” and inspects the returned vector. This separately verifies the provider-envelope boundary; the vector-math example above remains pure. Run it from the course root with strict per-call replay and no credentials.
