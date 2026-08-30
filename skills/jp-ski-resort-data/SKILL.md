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

YAML quoting rules:

- Keep frontmatter readable and consistent by removing unnecessary quotes from ordinary plain-text values.
- Unquoted values are appropriate for ordinary names, ids, region keys, prefectures, tags, enum values, and ordinary descriptions when they do not contain YAML-sensitive syntax.
- Keep quotes around values that could be interpreted as dates, numbers, booleans, nulls, or other YAML types. This includes season labels such as `2025-2026`, date ranges, display timestamps, phone numbers, prices, distances, and other values that must remain strings.
- Keep quotes around text containing YAML-sensitive punctuation or structures, including a colon followed by a space, a comment marker (`#`), flow collection characters (`[]` or `{}`), leading special characters, or content that could be parsed as a mapping or list item.
- Ordinary URLs may be unquoted when they contain no YAML-sensitive whitespace or punctuation. Quote URLs when their exact content could be ambiguous to the YAML parser.
- Measurement values with an explicit unit suffix, such as `1,000m` or `20°`, may use unquoted plain scalars when they cannot be parsed as YAML numbers and the schema expects a string.
- Keep quotes around ticket lines, times, mixed numeric text, and long descriptions when quoting makes their string type or boundaries clearer.
- Use block scalars such as `|-` or `>` for multiline text instead of wrapping multiline content in ordinary quotes.
- Do not change the semantic value while normalizing quotes. Quote removal is a formatting cleanup only; preserve names, URLs, numbers, and user-facing copy exactly.
- Do not force every string to use the same quoting style. Apply the safe plain-scalar rule field by field, and preserve quotes where they protect parsing or clarify that a value is a string.

Coordinate rules:

- Every existing `src/content/resorts/*.md` entry should have `location.latitude` and `location.longitude`.
- Keep `links.googleMaps` and `contact.address.googleMaps` as Google Maps search URLs based on place-name strings. Do not replace them with latitude/longitude URLs unless the user explicitly requests it.
- Resort map components should read resort coordinates from resort content whenever possible.
- Transport hubs, stations, and non-resort map nodes should keep their coordinates in dedicated data files such as `src/data/transportHubs.ts`.
- Coordinate values are numeric schema fields. Do not add thousands separators or unit text.
