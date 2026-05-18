# Roadmap

## Phase 0: Project Foundation

- Create formal project documentation.
- Add local-only AI note rules.
- Define static-first rules.
- Define content policy.
- Define initial data schema.
- Add workflow checklists.
- Add decision records.

## Phase 1: Static Data Model

- Choose region taxonomy.
- Define TypeScript types for resorts, regions, ski areas, tags, links, and access routes.
- Set up validation once the implementation stack exists.
- Create a small set of high-quality sample resort records.
- Confirm source attribution rules.

## Phase 2: Astro Setup

- [x] Initialize Astro as a fully static site.
- [ ] Configure content collections.
- Add resort Markdown or MDX files.
- Add region, ski area, and tag constants.
- [x] Add build and typecheck scripts.
- [x] Prepare GitHub Pages deployment settings.

## Phase 3: Core Pages

- Home page with region guide and generated resort counts.
- Resort index page.
- Region pages.
- Resort detail pages.
- Basic tag or access filters if they remain static and maintainable.

## Phase 4: Content Expansion

- Add more resorts region by region.
- Improve access summaries for Taiwanese travelers.
- Add official trail map, ticket, snow report, lift status, and access links.
- Add source URLs for every important fact.

## Phase 5: Release Readiness

- Run production builds.
- Check generated pages.
- Check official links.
- Confirm no `.local-ai/` files are committed.
- Publish to GitHub Pages.
