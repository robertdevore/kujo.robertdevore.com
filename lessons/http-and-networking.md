## What can this code touch?

Outbound HTTP requires network-client authority. Server listeners need network-server authority. The convenience --allow-net grants both and is broader than a client-only lesson needs.

## Native contract

Use the current HTTP API documentation for accepted options, response shape, timeouts, body limits, and error behavior. Do not assume every helper has the same signature as another language's client. Network failures and non-success HTTP statuses are different conditions and need explicit handling.

For deterministic testing, isolate a pure response evaluator. The example processes a fixture response dictionary using an application-owned schema, not a claimed native HTTP return shape. The stage build separately exercises a real loopback HTTP request against a fixed local server.

## Private destinations

--deny-private-net rejects private, loopback, link-local, multicast, and unspecified destinations for supported outbound calls. This protects against a class of unwanted internal destinations. It is not a universal network sandbox or authentication system.

A local fixture server intentionally uses loopback, so its integration test has a documented exception and never combines that address with a claim that private destinations were denied. A separate denial drill verifies the private-network policy.

## Professional pattern

Validate an operator-controlled endpoint, set finite timeouts, bound response size, inspect status, and validate the decoded body. Keep provider data separate from instructions that choose local authority. A response saying “retry at this URL” is untrusted input, not permission to contact an arbitrary host.

## Common mistakes

Do not make the default suite depend on a live public endpoint. Do not retry malformed requests forever. Do not confuse a successful TCP connection with a valid application response. The opt-in live exercise is a deployment check, while the local fixture remains the repeatable contract test.

## Working example

{{example}}

## Run it

From the course repository root, use the pinned Kujo 1.4.0 runtime.

{{command}}

{{output}}

## Break it and diagnose it

This drill has no network-client allowance. The capability check must reject the call before network access. The project integration gate tests real local HTTP separately.

{{broken}}

{{diagnostic}}

## Exercise

Build a response evaluator with success, non-success status, and malformed-body cases. Run the local fixture integration project. Then opt in to a permitted external endpoint with a timeout and private-destination denial.

## Checkpoint

- I distinguish transport, HTTP status, and schema validity.
- I keep default tests fixture-backed.
- I document intentional loopback exceptions.

## Response and routing changes in 1.4.0

`http_request` adds `header_values`, mapping each header name to an array of values, while preserving existing `headers` behavior. Use it when repeated headers matter. `http_get_file_response` streams into a new file with explicit limits, requires network-client and filesystem-write, and requires redirects set to none. It can save a non-success HTTP response, so inspect status before accepting the file.

Explicitly DNS-pinned or deny-private HTTP clients now disable ambient proxy discovery: a proxy must not independently re-resolve a pinned destination. Unpinned clients keep their existing proxy behavior. Destination preflight may perform DNS work and requires network-client authority even though it sends no HTTP request.
