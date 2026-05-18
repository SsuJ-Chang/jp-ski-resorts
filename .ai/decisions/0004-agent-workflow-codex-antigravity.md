# Decision: Agent Workflow For Codex And Antigravity

## Status

Accepted

## Date

2026-05-19

## Context

The project may use multiple AI tools. Without boundaries, schema, data, and UI changes can conflict or overwrite each other.

## Decision

Codex should primarily handle documentation, schema, data, validation, build, and deployment tasks. Antigravity should primarily handle UI, layout, responsive design, and visual iteration.

## Reasons

- Clear ownership reduces accidental conflicts.
- Schema and content rules should remain stable while UI work evolves.
- UI work can proceed faster once data contracts are clear.

## Consequences

- Tool handoffs should happen only after `git status` is understood.
- Checklists should be used before agent tasks, commits, tool switches, and releases.
- UI work should not change data schema unless explicitly requested.

## Related Files

- AGENTS.md
- .ai/WORKFLOW.md
- .ai/checklists/before-switching-tools.md

