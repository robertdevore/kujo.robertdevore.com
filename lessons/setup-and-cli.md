## Where you are

You have a development goal; now establish an execution environment you can identify and reproduce. All captured course results use the official Kujo 1.5.0 release binary, not an unreleased checkout that happens to report the same version.

## Install and identify

Download the archive for your operating system and architecture from [the 1.5.0 release](https://github.com/kujolang/kujo/releases/tag/v1.5.0). Verify it against the published SHA-256 file before extracting it. Put the extracted `kujo` binary in a directory on your PATH. On Windows, use `kujo.exe` and verify the archive with `Get-FileHash -Algorithm SHA256`. On macOS use `shasum -a 256`; on Linux use `sha256sum`. Compare the full hash, not a prefix.

Run `kujo --version` and `kujo --help`. If your shell finds an older binary first, inspect your PATH before changing source code. The course verifier refuses versions other than 1.5.0, making version drift visible.

## Runtime contract

Save the example in a UTF-8 file ending in `.kujo`. Run `kujo check examples/02.kujo` before execution. The normal command uses the VM. For an explicit comparison use `kujo run --interpreter examples/02.kujo`. Interpreter mode is a fallback and diagnostic path, not a prerequisite for ordinary modules.

JIT remains experimental and opt-in. Do not add `--jit` to a beginner workflow or use its performance as the baseline contract. Browser/WASM targeting is deferred; the online course therefore shows tested source and captured output instead of sending arbitrary code to a server.

## Read diagnostics as feedback

A syntax error occurs before execution; changing capabilities cannot fix it. A runtime error happens after parsing and may depend on input. A command-line usage error means the invocation itself was invalid. Later you will consume their distinct exit codes in automation.

## Editor setup

Use an editor integration that starts `kujo lsp` over standard input/output. Confirm the server binary is the same release your terminal uses. Keep diagnostics in the language server rather than writing editor-specific approximations of Kujo syntax. Lesson 21 returns to navigation, completion, and protocol limits.

## Working example

{{example}}

## Run it

From the course repository root, use the pinned Kujo 1.5.0 runtime.

{{command}}

{{output}}

## Break it and diagnose it

The parameter list is malformed. This is a parser failure; the body never runs.

{{broken}}

{{diagnostic}}

## Exercise

Install and identify the runtime, check and run the greeting, then run the interpreter comparison. Save the version and both outputs. Introduce a missing closing brace and identify the source location in the diagnostic.

## Checkpoint

- I can identify the exact binary I run.
- I use the VM as the normal execution path.
- I can separate a parser error from a runtime error.

## Distribution boundary for 1.5.0

Use the checksum-verified native archive for this course. At verification on September 23, the official release notes reported npm 1.5.0 publication blocked; the public npm channel remained at 1.4.0. A successful npm installation therefore does not establish the course runtime version. This release does not publish a Cargo registry package. Check the executable itself with kujo --version.
