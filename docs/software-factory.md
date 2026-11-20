Once you can turn a request into a tested result in the capstone, use Software Factory 0.2.0 to apply the same discipline to a software project. It gives you a local candidate, independent checks, and an export you can hand to another reviewer.

## Take a project from brief to evidence

1. Start with a small software brief or issue. Agree on requirements and acceptance criteria before generating code.
2. Pick a supported profile. Start with the supplied converter or notes pack, or choose a documented CLI, static React, repair, or disposable SQLite workflow.
3. Run the mission locally. The factory selects relevant roles from the pinned 28-role Chain of Command and routes work through Dispatch. Rootless Workcell executes candidate checks under the configured limits.
4. Review the Factory Floor. Inspect which tests ran, what reviewers rejected, and which exact source earned local approval. Keep failed attempts with the final evidence.
5. Export the bundle and verify it offline. Decide separately whether to open a pull request, merge, or deploy.

## Try it after the capstone

Use Git, Node 26.12.1 or later 26.x, and a configured rootless Docker engine with seccomp for live checks. A provider must be configured separately for model-backed missions.

```sh
git clone --branch 0.2.0 https://github.com/kujolang/software-factory.git
cd software-factory
npm ci
npm run setup
npm run doctor -- --offline
```

Follow the [Software Factory setup guide](https://docs.kujolang.ai/showcases/software-factory/) and compare your evidence with what you built in the [course capstone](/capstone/). The factory is an optional next project. The course exercises run without it.

[Software Factory 0.2.0 release](https://github.com/kujolang/software-factory/releases/tag/0.2.0)
