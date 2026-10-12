## Today

ai_tool_loop accepts a finite max_steps, tool descriptors, and a tool_results dictionary. The core implementation resolves returned tool calls against supplied string results keyed by tool name. It is not an arbitrary callback dispatcher that safely executes every model-proposed command.

Core handles requests and responses. Your program or an ecosystem agent runtime controls tool invocation policy, argument validation, capabilities, approval, and evidence. Do not invent a callback API merely because another provider SDK has one.

## Read the example

The course's custom replay fixture contains a model tool request followed by a final structured response. A pure local tool computes the known count. Its string result is supplied under the expected tool name. max_steps is two, and replay is strict.

This fixture is synthetic evidence recorded from a controlled local HTTP responder, not a live model's claim. The final count is independently checked against local input. The capstone expands the same pattern into modules, input validation, evaluation, and an evidence packet.

## Stop conditions

Success requires a valid final result and passing evaluation. Stop on denied tools, malformed arguments, missing results, replay misses, or budget exhaustion. A loop that cannot make progress should not keep spending attempts merely because an API allows another call.

## Professional pattern

Keep an allowlist of tool names and schemas. Resolve authority from the host, not the model. Validate argument values against the intended resource boundary before executing effects. Record what was requested, what was permitted, and what actually happened without logging secrets.

## Common mistakes

A tools schema describes an interface, not permission. max_steps bounds this loop but not every nested process or network operation; those need their own limits. A final assistant message saying done is not independent evidence of completion.

## Working example

{{example}}

## Run it

From the course repository root, use the pinned Kujo 1.8.1 runtime.

{{command}}

{{output}}

## Break it and diagnose it

Zero is not a valid finite step budget for this API. The runtime must reject the invalid options before proceeding with the request.

{{broken}}

{{diagnostic}}

## Exercise

Validate a count_jobs descriptor and supply a result from a pure local calculation. Test an unknown tool, a missing result, a replay miss, and exhausted steps. Explain where effect authorization would occur for a real file tool.

## Checkpoint

- I know core tool_results are supplied strings.
- I bound execution and validate tools separately.
- I require evaluation before declaring success.

## Tool history identity in 1.8.1

Assistant turns retain their tool_calls, and each tool reply carries the matching tool_call_id. Calls need unique nonempty IDs, a function name, and arguments encoded as a string. A supplied type must be function. An assistant turn with tool calls can have null content. The runtime rejects malformed calls before continuing.

The supplied tool_results still map function names to strings; Kujo does not execute model-supplied code. Call IDs preserve conversation linkage even when the same function is called twice. Application authorization, argument validation and result evaluation remain separate responsibilities.

This correction changes hashes for histories containing names or tool metadata. Plain-text request hashes remain unchanged. Old tool-history cassettes must be recorded again against the corrected request body. Strict replay must never substitute a cassette for a different body.
