# Agent Guide

This file defines how AI tools should work in this repository.

## Project Boundary

The project is a static-first Traditional Chinese site for Japanese ski resort information.

Do not add these without an explicit decision:

- Backend server
- Database
- Authentication
- User accounts
- Admin dashboard
- Paid cloud dependency
- Runtime API dependency
- Web scraper
- Real-time snow, lift, ticket, weather, or transit sync
- Embedded Google Maps, Leaflet, MapLibre, or tile-based map service

## Tool Responsibilities

Use Codex for:

- Project documentation
- Data schema
- Content model
- TypeScript types
- Astro content collections
- Resort data files
- Validation scripts
- GitHub Pages configuration
- Build and typecheck tasks
- Small refactors

Use Antigravity for:

- Home page layout
- Region guide UI
- Resort card design
- Resort detail page layout
- Responsive design
- Visual iteration
- UX flow

## Safety Rules

- Only one AI tool should modify files at a time.
- Commit before switching tools when possible.
- Always check `git status` before asking an AI tool to modify files.
- UI work should not change the data schema unless explicitly requested.
- Schema and data work should not redesign UI unless explicitly requested.
- Run build or typecheck before committing once available.
- Never commit `.local-ai/`.

