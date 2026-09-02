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

Contact address rules:

- Use `contact.address.ja` as the canonical source when normalizing resort addresses.
- Write Japanese addresses in the common order: `〒postal code prefecture municipality district and block number`.
- Omit `日本` / `Japan` from displayed Japanese and Traditional Chinese addresses.
- Translate `address.ja` into `address.zhTw`; do not preserve a conflicting or stale Chinese address when the Japanese source has changed.
- Preserve address components such as `大字`, `字`, and `丁目` when they appear in the Japanese source, translating them consistently for Traditional Chinese.
- Keep `address.en` optional until an accurate Romanized address is available; do not invent English addresses by blindly transliterating kanji.
- Keep phone values as plain YAML strings without unnecessary quotes, for example `phone: 026-000-0000`.

Coordinate rules:

- Every existing `src/content/resorts/*.md` entry should have `location.latitude` and `location.longitude`.
- Keep `links.googleMaps` and `contact.address.googleMaps` as Google Maps search URLs based on place-name strings. Do not replace them with latitude/longitude URLs unless the user explicitly requests it.
- Resort map components should read resort coordinates from resort content whenever possible.
- Transport hubs, stations, and non-resort map nodes should keep their coordinates in dedicated data files such as `src/data/transportHubs.ts`.
- Coordinate values are numeric schema fields. Do not add thousands separators or unit text.

Access and transport rules:

- `access.fromTokyo`, `access.fromOsaka`, `access.fromNagoya`, `access.fromSapporo`, and `access.fromAirport` are origin-based non-driving routes. Use them for railways, buses, official shuttle buses, and other public-transport connections from the named origin.
- `access.publicTransit` is for non-driving routes that do not fit a major origin group, especially the local connection from a nearby station, bus stop, or transport hub to the resort. Use it for a resort's general public-transport access rather than inventing a city origin.
- Do not duplicate the same route in an origin-based field and `publicTransit`. Choose the field that best describes the route's starting point; a local station-to-resort connection belongs in `publicTransit` unless it is presented as part of a complete city-to-resort itinerary.
- `access.car` is the only place for self-driving information, including expressway exits, driving times, parking, winter tyres, snow chains, and road cautions. Do not put a self-driving route in any `from*` or `publicTransit` field.
- A taxi may appear as a last-mile step in a non-driving route, but a taxi-only itinerary should be labelled clearly; do not describe it as a railway or bus route.
- Keep `access.*[].estimatedTime` limited to the compact time shown in the route badge. Put transfers, seasonal schedules, reservations, and road conditions in `note`.

Ticket formatting rules:

- Follow the Hakuba Goryu-style flat structure: one `tickets.plans[]` item is one ticket type, and each `priceLines[]` item is one readable price category or pricing unit.
- Prefer one category per line with a colon, for example `成人：¥5,300`, `長者：¥4,500`, and `小學生：¥1,800`. Split weekday/holiday or area-specific prices into separate lines or separate plans when that improves readability.
- Use the site-wide Traditional Chinese category terms `成人`, `兒童`, `小學生`, `國中生`, `高中生`, and `長者`. Translate `Senior` and `シニア` as `長者`; do not use `樂齡` or `年長者` as ticket category labels.
- Keep official product names when they are proper names, but translate explanatory ticket text into Traditional Chinese. Do not leave mixed labels such as `大人 / Senior / 小學生`.
- Use `、` when one `priceLines` item genuinely needs multiple labels, and use spaces around `/` and `~` in display text. Use thousands separators in prices.
