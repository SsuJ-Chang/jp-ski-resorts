# Project

## Name

`jp-ski-resorts`

The name is practical, data-oriented, and suitable for a GitHub repository and future GitHub Pages URL. It communicates that the site is about Japanese ski resorts rather than a personal blog.

## Positioning

This project is a static-first Traditional Chinese website for organizing Japanese ski resort information.

The primary user is a Taiwanese skier planning ski trips to Japan.

The site should help users answer questions like:

- Which Japanese ski regions should I consider?
- Which resorts are easier to reach without driving?
- Which resorts are suitable for a first Japan ski trip?
- Where are the official resort, ticket, access, trail map, snow report, and lift status pages?
- What stable resort facts can I compare before checking real-time official pages?

## Product Principles

- Keep the first version fully static.
- Store stable and semi-stable resort information in the repository.
- Treat unstable information as external-link targets, not static facts.
- Prefer official or trusted sources.
- Do not redistribute copyrighted trail maps or PDFs unless licensing is explicit.
- Keep data modeling separate from UI experimentation.
- Make GitHub Pages deployment possible without paid services.

## Information Architecture

Initial navigation direction:

- Home page with a Japan ski region guide
- Home page can switch between a region list and clickable seven-region Japan map
- Region pages with resort cards, summaries, and the current region highlighted on the map
- Resort detail pages with structured facts and official links
- External Google Maps links for actual route planning

The home page may group resorts into ski-relevant regions:

- Hokkaido
- Tohoku
- Kanto-Koshinetsu
- Hokuriku
- Chubu
- Kansai / Chugoku
- Kyushu

The exact taxonomy can change later through a decision record.
