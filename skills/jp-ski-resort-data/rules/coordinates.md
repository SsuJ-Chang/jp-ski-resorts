---
name: resort-coordinate-rules
description: Reference rules for resort coordinates, Google Maps links, area map nodes, and verification steps used by the jp-ski-resort-data skill.
---

# Resort Coordinate Rules

## Resort Content

For every resort entry under `src/content/resorts/`, add:

```yaml
location:
  latitude: 36.66451
  longitude: 137.82522
```

Use decimal WGS84 coordinates. Keep values as numbers, not strings.

## Google Maps Links

Keep Google Maps links searchable by name:

```yaml
googleMaps: https://www.google.com/maps/search/?api=1&query=Hakuba%20Goryu%20Snow%20Resort
```

Do not convert these links to coordinate URLs by default. The project uses coordinates for internal layout and map-like diagrams, while Google Maps links should remain readable/searchable place queries.

## Area Maps

Area map resort nodes should reference resort entries with `resortId`. Do not duplicate resort coordinates in area map files unless a temporary fallback is necessary.

Traffic hubs and stations are not resorts, so their coordinates belong in dedicated static data, currently `src/data/transportHubs.ts`.

## Verification

After coordinate changes:

1. Run `rg --files-without-match "^location:" src/content/resorts` to find resort files still missing location data.
2. Run `npm run build`.
