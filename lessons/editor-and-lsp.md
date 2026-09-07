## Mental model

The editor is a client of language tooling. It should help you navigate and diagnose Kujo without becoming a second implementation of the language. An adapter that guesses different semantics creates confusing disagreements with the CLI.

## Stable tool contract

kujo lsp starts the language server. Its protocol contracts document initialization, document synchronization, diagnostics, completion, hover, navigation, references, rename, formatting, and related supported surfaces. Check the current capability response instead of assuming all optional LSP features exist.

The CLI also provides machine-readable helper commands such as lsp-diagnostics. Parser diagnostics do not execute the program. A clean editor view is therefore not proof that an effect will be permitted, a network response valid, or an assertion true.

## A reproducible editor workflow

Point the adapter at the same pinned binary used by your terminal. Open the course repository as the project root. Introduce a syntax error, inspect its location, repair it, and run the normal VM command. Then navigate to an exported function and compare what the editor shows with its source documentation.

The success example intentionally uses an ordinary function: editor integration should improve routine work, not require a special syntax dialect. The breaking file supplies a genuine parser diagnostic for the helper and CLI drill.

## Professional pattern

Keep stdout clean for protocol traffic when launching a language server over standard input/output. Debug logging belongs on the documented separate channel. Capture a minimal source fixture and the server version when reporting an editor discrepancy.

## Common mistakes

An extension shipping its own outdated binary may disagree with your shell. Completion suggestions are not validation. Rename edits should be inspected before application, particularly across modules; a tool-generated edit is still a proposed source change that needs checking and tests.

## Working example

{{example}}

## Run it

From the course repository root, use the pinned Kujo 1.3.1 runtime.

{{command}}

{{output}}

## Break it and diagnose it

The malformed parameter list is diagnosed without executing a program. Compare CLI checking with LSP diagnostics on this same source.

{{broken}}

{{diagnostic}}

## Exercise

Configure an editor to launch kujo lsp, inspect a syntax error, navigate to a function, and review a rename. Run check and the VM example afterward. Record the server version when comparing results.

## Checkpoint

- I use a shared CLI/LSP version.
- I distinguish editor feedback from execution evidence.
- I review generated edits before accepting them.
