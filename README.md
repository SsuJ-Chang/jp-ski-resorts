# JP Ski Resorts

Static-first Traditional Chinese guide and database for Japanese ski resorts.

This project helps Taiwanese skiers discover Japanese ski resorts by region, access style, resort traits, and official information links. The first version is designed to be hosted for free on GitHub Pages.

## Project Scope

This site should behave like:

- A Japanese ski resort database
- A ski travel planning guide
- An official information link hub
- A region, tag, and access-based discovery tool

This site should not behave like:

- A real-time snow condition service
- A lift operation tracker
- A weather service
- A booking platform
- A social platform or user review site
- A backend application

## MVP Direction

The MVP focuses on:

- Static resort data
- Region-based discovery
- Official information links
- Structured access summaries
- Trail map and PDF links to official sources
- Resort detail pages
- Simple, maintainable UI
- GitHub Pages deployment

The MVP avoids:

- Backend servers
- Databases
- Authentication
- Paid cloud services
- Runtime API dependencies
- Scrapers
- Real-time snow, lift, ticket, or transit sync
- Embedded map services
- Redistributed official trail map files

## Documentation

- [PROJECT.md](PROJECT.md)
- [ROADMAP.md](ROADMAP.md)
- [DATA_SCHEMA.md](DATA_SCHEMA.md)
- [CONTENT_GUIDE.md](CONTENT_GUIDE.md)
- [AGENTS.md](AGENTS.md)
- [.ai/PROJECT_RULES.md](.ai/PROJECT_RULES.md)
- [.ai/WORKFLOW.md](.ai/WORKFLOW.md)

## Local Development

```bash
npm install
npm run dev
```

Useful scripts:

- `npm run dev`: start the local Astro dev server.
- `npm run build`: run `astro check` and build the static site.
- `npm run preview`: preview the production build locally.

## Deployment

The site is configured for GitHub Pages at:

```txt
https://SsuJ-Chang.github.io/jp-ski-resorts/
```

The GitHub Actions workflow in `.github/workflows/deploy.yml` builds and deploys the site when changes are pushed to `main`.

When switching to a custom domain, update `astro.config.mjs`, remove the project `base`, and add `public/CNAME`.
