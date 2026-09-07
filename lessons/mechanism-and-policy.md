## Where you are

You can build a tested Kujo application and add reproducible AI effects. The final stage combines these pieces into an agentic system. The language remains the foundation; ecosystem tools are selected only where they solve a concrete application problem.

## Architectural boundary

Core owns deterministic and security-sensitive mechanisms: request hashing, replay, schemas, vectors, secrets, capabilities, and native effects. Policy includes provider selection, routing, retries, retrieval strategy, evaluation thresholds, approval decisions, and workflow orchestration.

The ecosystem offers implementations of those policies. A project may benefit from an agent SDK, Eval, Dispatch, RunLedger, or a context tool, depending on the policies it needs. The capstone starts with ordinary Kujo modules so the boundary is visible before any framework is selected.

## Read the example

A pure policy function decides whether an attempt can continue. It consumes explicit data rather than reading a hidden environment or making a model call. The mechanism that executes an attempt can use the result without owning the retry policy itself.

Ask during design review: can you change the policy without rewriting the mechanism, and can you test it without invoking an expensive external effect? Simplicity comes from separating decisions that change for different reasons.

## Professional pattern

Document the owner of each decision. Keep schemas at boundaries and convert external data into a small internal form. Select ecosystem dependencies by verified version and executable contract. A README claim does not establish that a tool fits your authority or persistence requirements.

## Common mistakes

Dispatch is not syntax; RAG is not a core vector builtin; MCP is not a Kujo language construct; capability flags are not a Workcell sandbox. Keep those names attached to the layer that actually implements them.

The current ecosystem evolves faster than the stable language contract. Link to the reviewed source and record the revision when a lesson depends on specific behavior.

## Working example

{{example}}

## Run it

From the course repository root, use the pinned Kujo 1.3.1 runtime.

{{command}}

{{output}}

## Break it and diagnose it

The attempt budget is exhausted. A policy that still accepts another attempt would violate the bound.

{{broken}}

{{diagnostic}}

## Exercise

Draw your application as mechanisms and decisions. Move retry and acceptance decisions into pure functions. Choose at most one ecosystem dependency and justify it with a verified interface, not its name.

## Checkpoint

- I can name the owner of each policy.
- I test decisions without external effects.
- I keep ecosystem tools distinct from language features.
