## Mental model

Kujo evaluates runtime values, not annotations. Its core values include null, booleans, signed 64-bit integers, floating-point numbers, strings, bytes, arrays, and dictionaries. Functions, structs, tagged values, and native handles add further runtime forms.

## Truthiness contract

Falsey values are `false`, `null`, integer zero, float zero, the empty string, empty array, and empty dictionary. Everything else is truthy. In particular, the string `"false"` is true in a condition because it is non-empty. Parsing configuration strings is a separate operation.

`&&` and `||` short-circuit, but return booleans rather than one of their operands. A ported expression such as `name || "unknown"` will not produce the desired fallback string. Use explicit control flow or a null-aware operation when that is what you mean.

## Numeric contract

Integer arithmetic is checked. Overflow, division by zero, and modulo by zero are runtime errors. Floating-point division by zero is also rejected. Finite float equality uses Kujo's epsilon policy; this is not an exact decimal money representation. Numeric comparison permits int/float pairs, while unrelated ordering types fail.

Arrays compare deeply in order. Dictionaries compare their effective key/value contents. JSON serialization rejects unsupported runtime values and non-finite floats, so don't assume every object that prints can be sent as JSON.

## Professional pattern

Use explicit predicates for domain rules. An empty array being falsey does not tell you whether the absence of records is valid or an upstream failure. Distinguish those states in your data model. If a predicate helper returns 1/0, comparing with 1 makes its intended meaning clear at a boundary.

## Runtime drill

Before running the example, write down the number of truthy inputs. Then predict the type of each logical expression. Changing one value at a time is more informative than memorizing a table without executing it.

## Working example

{{example}}

## Run it

From the course repository root, use the pinned Kujo 1.3.1 runtime.

{{command}}

{{output}}

## Break it and diagnose it

The operands are valid integers but their sum exceeds the signed 64-bit range. The runtime must reject overflow rather than wrap silently.

{{broken}}

{{diagnostic}}

## Exercise

Build a truthiness table for ten values. Add separate tests for null and empty input in a validator. Demonstrate short-circuiting by placing a failing operation on a branch that must not execute.

## Checkpoint

- I can enumerate falsey values.
- I know logical operators return booleans.
- I expect checked integer arithmetic.
