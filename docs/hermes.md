The course asks you to run checks and inspect evidence. [Kujo Hermes](https://kujolang.ai/ecosystem/kujo-hermes/) brings that habit into an agent conversation. It is optional; you can finish every lesson without it.

## Apply the course workflow

After you write a task contract, ask Hermes to validate it with **Spec**. Use **PackWrite** to keep task context together, **Eval** to check changes against deterministic tests, and **ShipCheck** to review release findings. Inspect the tool's verdict and execution receipt before deciding what to do next.

Try this prompt in a trusted repository:

> Validate the task specification, run Eval, and show the failed checks and receipts. If a check fails, explain the evidence before proposing a correction.

The [recorded checkout example](https://github.com/kujolang/kujo-hermes/tree/main/demo/checkout-video) shows a real local-model Hermes session finding a regression, correcting the code and rerunning the same tests. The film removes waits. Receipts support inspection and local integrity checks; they do not prove that untested behavior is correct.

## Install the optional integration

Install Hermes 0.22.7 or newer, Git, and the official Kujo runtime separately. Then, from your repository:

```sh
hermes plugins install kujolang/kujo-hermes
hermes kujo setup --trust-workspace .
```

Accept Hermes's install prompts and start a new conversation. Setup fetches pinned official tool sources and trusts only the workspace you name. It does not install Kujo, browsers, containers or credentials. macOS and Linux are supported; no npm or Kennel package is needed.

Use `hermes kujo doctor` to check dependencies. Approvals remain necessary for restricted operations, and ordinary tool execution is not sandboxed. Repository-defined checks can execute code; use repositories you trust.

Read the [installation and configuration guide](https://docs.kujolang.ai/tools/kujo-hermes/) for profile selection, supported hosts and missing dependencies. The plugin works with repositories in the languages supported by the underlying tools, beyond the Kujo examples in this course.

[Return to the course map](/course/) or [continue the capstone](/capstone/).
