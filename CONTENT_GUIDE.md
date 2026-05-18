# Content Guide

## Language

Primary site language is Traditional Chinese for Taiwanese users.

Japanese and English names should be stored when useful for searching, route planning, and checking official sources.

## Store In Repository

The repository may store stable or semi-stable information:

- Resort name
- Japanese name
- English name
- Region
- Prefecture
- Ski area
- Resort tags
- Coordinates
- Elevation
- Course count
- Lift count
- Terrain summary
- Access route summary
- Official website links
- Official trail map page links
- Official trail map PDF links
- Official ticket page links
- Official access page links
- Personal notes or curated summary
- Source URLs

## Do Not Store As Current Facts

Do not store unstable real-time information as if it is current:

- Today's snow depth
- Today's weather
- Current lift operation status
- Current course opening status
- Real-time ticket prices
- Real-time bus or train status
- Accommodation prices

Instead, link to official or trusted external pages.

## Trail Map And PDF Policy

Trail maps are important, but official resort maps and PDFs may be copyrighted.

For the MVP:

- Link to official trail map pages.
- Link to official trail map PDFs when available.
- Do not download and redistribute official trail map PDFs unless the license is explicit.
- Do not store official trail map images in the repository unless permission is clear.

Suggested shape:

```ts
type TrailMap = {
  officialPage?: string
  officialPdf?: string
  note?: string
}
```

## Source Policy

Every important factual claim should have a source URL.

Prefer:

- Official resort websites
- Official tourism boards
- Official transportation providers
- Trusted ski area or regional travel sources

Avoid treating personal blogs, social posts, and forum posts as authoritative factual sources.

## Current Sample Data

Initial sample resort files live in `src/content/resorts/`.

For early samples, prefer conservative stable metadata:

- Names
- Region
- Prefecture
- Ski area
- Curated tags
- Official links
- Source URLs

Avoid adding detailed numeric facts until their source URL is recorded and the field is needed by a page or comparison feature.

## Temporarily Hiding A Resort

If a resort should stay in the repository but not appear on the public site, add:

```yaml
visibility:
  status: hidden
  note: 暫時不顯示，等待資料確認
```

Use `draft` for entries still being prepared, and `hidden` for entries that were intentionally removed from public display. Public pages should only use `published` resorts.
