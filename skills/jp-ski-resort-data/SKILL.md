---
name: jp-ski-resort-data
description: Project-local rules for creating, updating, and normalizing Japanese ski resort content in this repository.
---

# JP Ski Resort Data

Use this project-local skill together with the global `jp-ski-resort-data` skill when editing resort content.

Repo-specific override:

- Resort entries no longer use a top-level `sources` field.
- If the global skill mentions adding `sources`, ignore that part for this repository.
- Keep provenance in schema-supported URL fields such as `season.source`, `tickets.source`, `snowWeather.url`, `courses.courseInfoPage`, and relevant `links.*` values.

Primary references:

- `DATA_SCHEMA.md`
- `RESORT_ENTRY_EXAMPLE.md`
- `src/content.config.ts`
- `skills/jp-ski-resort-data/rules/coordinates.md`

Research source priority:

- Treat Japan Ski Guide Traditional Chinese (`https://japan-skiguide.com/tw/`) as an important source for resort research, especially Traditional Chinese resort names, summaries, access context, and course/resort basics.
- When researching current or static resort data, check Japan Ski Guide alongside official resort pages and other trusted sources; prefer official sources for operational facts such as season dates, tickets, lift status, and business hours.

Coordinate rules:

- Every existing `src/content/resorts/*.md` entry should have `location.latitude` and `location.longitude`.
- Keep `links.googleMaps` and `contact.address.googleMaps` as Google Maps search URLs based on place-name strings. Do not replace them with latitude/longitude URLs unless the user explicitly requests it.
- Resort map components should read resort coordinates from resort content whenever possible.
- Transport hubs, stations, and non-resort map nodes should keep their coordinates in dedicated data files such as `src/data/transportHubs.ts`.
- Coordinate values are numeric schema fields. Do not add thousands separators or unit text.
