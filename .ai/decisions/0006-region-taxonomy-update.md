# Decision: Region Taxonomy Update

## Status

Accepted

## Date

2026-05-19

## Context

The initial taxonomy did not include Kyushu, so it could not clearly cover Fukuoka or other Kyushu-area winter travel entries. The initial sample also placed Hakuba Goryu in `chubu`, which is defensible in broad Japanese geography because Nagano is often included in Chubu, but less aligned with this project's ski-trip planning flow.

## Decision

Use a ski travel taxonomy with these region keys:

- Hokkaido
- Tohoku
- Kanto-Koshinetsu
- Hokuriku
- Chubu
- Kansai / Chugoku
- Kyushu

Assign Hakuba Goryu to Kanto-Koshinetsu for this project.

## Reasons

- Taiwanese ski trip planning often groups Nagano resorts with Tokyo / Shinetsu access routes.
- Kanto-Koshinetsu already includes Nagano in this project's descriptions.
- Kyushu is needed to cover Fukuoka and other southern Japan entries.
- The taxonomy should optimize discovery and trip planning, not only administrative geography.

## Consequences

- Some regions intentionally differ from strict geographic-region labels.
- Region pages should explain the travel-planning intent where needed.
- Future data entry should use this taxonomy unless a new decision supersedes it.

## Related Files

- PROJECT.md
- DATA_SCHEMA.md
- src/data/regions.ts
- src/content/resorts/hakuba-goryu.md
