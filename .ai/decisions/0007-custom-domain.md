# Decision: Custom Domain

## Status

Accepted

## Date

2026-05-19

## Context

The project is deployed through GitHub Pages and the owner has a GoDaddy-managed domain. A subdomain CNAME was configured for the site.

## Decision

Use `https://jp-resorts.rj-tw.com/` as the public site URL.

Astro should build for the custom domain root path, without the GitHub repository `base` path. The repository should include `public/CNAME` with:

```txt
jp-resorts.rj-tw.com
```

## Reasons

- A custom subdomain gives the project a stable public URL.
- Removing Astro `base` prevents CSS, SVG, and internal links from pointing at `/jp-ski-resorts/`.
- Keeping `public/CNAME` preserves the GitHub Pages custom domain during deployments.

## Consequences

- The GitHub Pages fallback URL may no longer be the primary target.
- Local and production links should be generated through base-aware helpers where paths are hand-built.
- DNS and GitHub Pages custom-domain settings must remain aligned.

## Related Files

- astro.config.mjs
- public/CNAME
- README.md
