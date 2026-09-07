## The final goal

Build a Kujo-native operations runner that accepts a bounded request, assembles explicit context, uses a controlled local tool with replay-backed AI, independently evaluates the response, and writes an inspectable evidence packet. A run must be useful to a human and machine-readable to another program.

<div class="flow">Request → Validate → Context → Bounded executor → Tool → Evaluate → Evidence → PASS / REVISE / STOP</div>

This is a small complete system with a narrow operation: count a supplied local job fixture. Its value is the visible architecture. Expanding the set of operations is an exercise in maintaining these boundaries, not a reason to add arbitrary shell execution.

## Prerequisites and scope

Complete all six stage builds. Use the official 1.3.1 runtime and the supplied standalone project under projects/capstone. The package has no registry dependency, and its lockfile is checked in. Its modules, framework tests, fixtures, and strict replay cassettes travel with it.

The course's runtime discrepancy notes still apply. This implementation avoids silent struct mutation and affected loop patterns. It does not claim that the whole runtime has perfect VM/interpreter parity.

## Milestone 1: define the input

The request has a fixed goal, an array of named jobs, and a maximum of two AI steps. Reject unknown fields, unsupported goals, oversized input, empty names, and invalid budgets. Read only the fixed request file through a bounded, contained path API.

The host chooses the path. A model never supplies a filesystem root, executable, endpoint, or permission flag. These are operator decisions. Keep this division even when you add a richer user interface.

## Milestone 2: assemble context

Build explicit messages and check a deterministic context budget. Preserve the instruction and current user request. If the minimum context cannot fit, stop rather than discarding essential material silently. The fixed fixture context is intentionally small enough to review in full.

The recorded request identity includes this context. Changing it requires new reviewed evidence; a replay miss is feedback that the work changed. Do not automatically fall through to a live provider.

## Milestone 3: execute bounded tools

count_jobs is a pure local function. The core ai_tool_loop receives its supplied string result and a maximum of two steps. The synthetic fixture requests that tool and then returns a structured response. This is not a general callback dispatcher.

A production extension that executes model-selected effects needs a separate dispatcher: validate the name and arguments, resolve host-owned permission, run the bounded tool, and preserve its result. Do not promote the model's description or an approved:true field into authority. Read-only local tools are a good first extension.

## Milestone 4: evaluate independently

Parse the final message, validate its schema, and compare the proposed count with the actual local job count. A plausible wrong count must fail even if its JSON is valid. Tests include unsupported goals, excess budget, wrong counts, and extra fields.

The comparison runner stops on failed evaluation. If your extension supports REVISE, record the failed attempt and allow a finite retry only when it is safe and useful. Do not let the actor rewrite its own expected result. The Stage 6 build demonstrates a bounded revision sequence separately.

## Milestone 5: persist evidence

Only accepted work writes work/evidence.json. The versioned packet contains the validated request, tool identity and result, model proposal, steps, evaluation state, and a concise human summary. stdout emits the same machine-readable result. STOP outcomes use a nonzero exit and a stable reason.

Do not include real credentials in the packet. The example's key is synthetic and wrapped. Cassettes were recorded from a deterministic local fixture server and reviewed; they are not represented as live model evidence.

## Run it offline

```shell
cd projects/capstone
mkdir -p work
kujo package-install --frozen
kujo test-run --untrusted tests.kujo
kujo run --untrusted --allow-fs-read --allow-fs-write --allow-ai src/main.kujo
```

No network-client allowance, live credential, or running provider is required. Strict replay supplies the AI interaction. The application reads its contained fixture and writes only its work artifact by design; filesystem capabilities themselves remain broad categories, not a host sandbox.

## Required adversarial checks

1. Replace the goal with an unsupported action: STOP before AI work.
2. Change max_steps to an invalid value: reject the request.
3. Change the job count without recording new matching evidence: fail replay or evaluation.
4. Remove the cassettes in a temporary copy: STOP, with no live fallback.
5. Remove write authority: no accepted evidence file may be produced.
6. Supply a schema-valid wrong proposal directly to the evaluator: reject it.
7. Rerun unchanged inputs: the stable result and evidence must match.

Use temporary copies for destructive fixture drills. Keep the original comparison reproducible. The project verifier exercises these boundaries and checks nonzero status, stable STOP shapes, and deterministic successful output.

## Live-provider extension

Live use is an explicit opt-in that requires a new endpoint, operator-approved credentials, AI-specific egress policy, bounded requests, and new reviewed cassettes. Set KUJO_AI_ALLOWED_ENDPOINTS to the permitted endpoint prefix and apply private-destination denial as appropriate. Verify denied endpoints separately: successful replay bypasses live destination checks and does not prove the live policy.

Keep provider smoke checks outside the offline gate. A live provider can return new malformed or misleading content, so preserve all input and evaluator defenses. External execution isolation remains necessary for third-party code.

## What completion means

You can explain each boundary, reproduce the offline result, demonstrate safe failures, and point to independent evidence of correctness. You can also name what this small runner does not implement: arbitrary tool execution, remote multitenancy, or automatic authority expansion.

Extend one capability at a time. Maintain the same loop: bounded goal, explicit context, controlled execution, independent evaluation, evidence, and a stop condition.

[Inspect the complete source](https://github.com/robertdevore/kujo.robertdevore.com/tree/main/projects/capstone) · [Download the entrypoint](/projects/capstone/src/main.kujo)

<div class="lesson-actions"><button class="complete" data-complete="capstone" type="button">Mark capstone complete</button><span data-complete-status></span></div>

