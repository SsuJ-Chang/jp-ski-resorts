# Project Rules

## Static-First Rule

The MVP must remain fully static and deployable to GitHub Pages.

Do not introduce:

- Backend server
- Database
- Authentication
- User accounts
- Admin dashboard
- Paid cloud services
- Runtime API dependency
- Web scraper
- Real-time snow condition sync
- Real-time lift status sync
- Real-time ticket or transit sync
- Embedded Google Maps, Leaflet, MapLibre, or tile-based map services

## Data Rule

Store stable and semi-stable resort information in repository data files.

Do not store unstable real-time values as current facts. Link to official or trusted external pages instead.

## Trail Map Rule

Official trail maps and PDFs may be copyrighted.

For the MVP, link to official trail map pages or PDFs. Do not download, copy, or redistribute official map files unless licensing is explicit.

## Source Rule

Important factual claims need source URLs.

Prefer official sources and trusted regional tourism or transportation sources.

## Change Rule

If a plan changes, update both:

- The relevant formal project document
- A dated decision record in `.ai/decisions/`

## Local Notes Rule

`.local-ai/` is local-only context and must not be committed.

