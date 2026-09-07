## Where you are

You can now build and test useful Kujo programs without a model. AI adds an external effect to that foundation. It does not replace validation, capability policy, or a definition of success.

## Runtime contract

ai_chat, ai_stream_chat, ai_embedding, and ai_tool_loop provide provider-compatible mechanisms. Successful high-level responses use Result Ok dictionaries. Transport/provider failures normally return Err strings; structured_errors:true opts into typed error dictionaries. Invalid options can fail at the native argument boundary instead.

A successful HTTP/model response does not prove the content is correct. The application must inspect the envelope and validate the intended output before using it. Treat instructions embedded in retrieved documents or model text as data unless an authorized application policy explicitly says otherwise.

## Message construction

ai_text builds a text block, ai_image_url builds an image block, and ai_message combines a role with content. These helpers are pure and capability-free. They construct portable message dictionaries; they do not fetch the image or call a model by themselves.

The example verifies message structure without network access. This first AI test lets you inspect the model's context before making a paid request or sending data externally. The URL is an illustrative input and is never fetched here.

## Professional pattern

Assemble explicit context, check its size and sensitivity, select an approved endpoint, and handle the response as untrusted input. Keep provider routing and retries in application/ecosystem policy. The next lessons give requests a stable identity and make tests reproducible through replay.

## Common mistakes

Do not call all text a trusted system instruction. Do not assume an AI helper's success envelope validates your domain object. Do not claim AI-native means only that a language has an ai_chat function; inspectability and controlled effects are equally central.

## Working example

{{example}}

## Run it

From the course repository root, use the pinned Kujo 1.3.1 runtime.

{{command}}

{{output}}

## Break it and diagnose it

This call has no AI capability allowance. Constructing messages is pure, but making the AI request is an effect.

{{broken}}

{{diagnostic}}

## Exercise

Build a message list containing a system rule and clearly labeled untrusted document text. Inspect the complete structure offline. State what may be sent externally and which inputs remain local.

## Checkpoint

- I distinguish pure message builders from requests.
- I treat model output as external input.
- I separate provider success from domain correctness.

## Security review lens

When an agent can read private data, ingest untrusted material, and communicate externally, a malicious document can try to turn that combination into data leakage. This course therefore keeps host authorization and egress decisions outside model-produced instructions. This application of [Simon Willison’s analysis](https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/) is an architectural review lens; Kujo’s own capability contracts remain the authority for what the runtime enforces.
