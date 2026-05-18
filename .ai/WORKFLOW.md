# Workflow

## Before Starting Agent Work

Use [.ai/checklists/before-agent-task.md](checklists/before-agent-task.md).

Confirm:

- Scope is clear.
- Editable files are clear.
- Protected files are clear.
- Git status is understood.
- The task matches the project rules.

## During Work

- Keep changes focused.
- Prefer existing project patterns.
- Separate schema, data, UI, and deployment work unless the task explicitly crosses them.
- Record major decisions in `.ai/decisions/`.
- Keep `.local-ai/` out of commits.

## Before Switching Tools

Use [.ai/checklists/before-switching-tools.md](checklists/before-switching-tools.md).

Switch between Codex and Antigravity only when the current state is understandable and the next scope is clear.

## Before Committing

Use [.ai/checklists/before-commit.md](checklists/before-commit.md).

Once a build system exists, run the appropriate build or typecheck before committing.

## Before Release

Use [.ai/checklists/before-release.md](checklists/before-release.md).

Confirm production build, generated pages, official links, and local-only file exclusions.

