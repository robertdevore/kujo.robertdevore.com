## Mental model

JSON is a syntax, not a guarantee of correctness. A model can produce valid JSON with missing fields, wrong types, extra instructions, or a false claim of success. Accepting the result requires separate parsing, schema, and domain checks.

## Runtime contract

json_schema_validate is a pure general-purpose primitive. It returns valid and errors; error entries identify a path, message, and keyword. The supported subset includes practical types, required/properties/additionalProperties, arrays, bounds, enum/const, combinators, and local references.

Unsupported keywords and remote references are rejected rather than silently accepted. Format is accepted as annotation metadata, not an assertion. If your application needs an email, URL, or date policy, implement and test it explicitly instead of relying on format alone.

## Read the example

The schema requires an integer count between 0 and 100. additionalProperties:false rejects unexpected fields, keeping the accepted data shape small. The example verifies both acceptance and a rejected quantity. The failure drill deliberately asserts that malformed data was valid, ensuring the gate can fail.

## Professional pattern

First parse the text. Then validate the structure. Then apply domain checks using trusted context: does this count match the actual records, is the action allowed, and is the result supported by evidence? A schema cannot prove a model's factual claims.

Keep schemas close to the code that enforces them. Version external contracts and test representative bad inputs. Never execute a tool just because a model included a field named approved:true; authorization is a separate host decision.

## Common mistakes

Do not ignore validation.errors while checking only that a dictionary exists. Do not accept unknown fields without a reason at an execution boundary. Do not ask a model whether its own output is correct and treat that answer as independent evaluation.

## Working example

{{example}}

## Run it

From the course repository root, use the pinned Kujo 1.3.1 runtime.

{{command}}

{{output}}

## Break it and diagnose it

The string is valid JSON-like data but violates the required integer type. The acceptance assertion must fail.

{{broken}}

{{diagnostic}}

## Exercise

Design a schema for your report with required fields, bounds, and an explicit extra-field policy. Test missing fields, wrong types, negative values, and a plausible but factually wrong count. Reject the last case with a separate evaluator.

## Checkpoint

- I separate parsing, schema checks, and domain evaluation.
- I know format is not enforced validation.
- I never derive authorization from model output.
