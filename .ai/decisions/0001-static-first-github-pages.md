# Decision: Static-First GitHub Pages

## Status

Accepted

## Date

2026-05-19

## Context

The project needs to be inexpensive to host, easy to maintain, and suitable for a first public version. Most useful ski resort information can be represented as static structured data with links to official real-time sources.

## Decision

The MVP will be a fully static site deployable to GitHub Pages.

## Reasons

- Free hosting is enough for the first version.
- Static structured data is sufficient for core resort discovery.
- Real-time information can be delegated to official external pages.
- Static deployment keeps the maintenance burden low.

## Consequences

- The MVP will not have backend features.
- Real-time snow, lift, ticket, and transit information will be linked externally.
- Build-time validation becomes important as data grows.

## Related Files

- README.md
- PROJECT.md
- ROADMAP.md
- .ai/PROJECT_RULES.md

