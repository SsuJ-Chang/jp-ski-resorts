# Decision: Region Guide Navigation

## Status

Accepted

## Date

2026-05-19

## Context

The project needs a useful discovery model without depending on embedded maps or map tile services.

## Decision

The initial navigation model will use a static Japan ski region guide, region pages, resort cards, and resort detail pages. Google Maps will be linked externally for actual route planning.

## Reasons

- Region-first discovery matches how many Taiwanese travelers plan Japan ski trips.
- Static region pages are compatible with GitHub Pages.
- External Google Maps links avoid building and maintaining a map application.

## Consequences

- Simplified position guides may be approximate.
- Resort counts should be generated from data, not manually maintained.
- The exact region taxonomy can be refined later.

## Related Files

- PROJECT.md
- ROADMAP.md
- DATA_SCHEMA.md

