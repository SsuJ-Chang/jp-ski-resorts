# Data Schema

The core data unit is `Resort`.

Resort metadata should feed:

- Home page region counts
- Region pages
- Tag pages
- Resort cards
- Search indexes
- Comparison tables
- Future static map-like guides

Markdown body content may be used for resort detail pages, but list pages should rely on structured metadata.

## Resort

```ts
type Resort = {
  id: string

  name: {
    zhTw: string
    ja: string
    en?: string
  }

  region: RegionKey
  prefecture: string
  skiArea?: SkiAreaKey

  tags: ResortTag[]

  links: {
    official: string
    googleMaps?: string
    trailMapPage?: string
    trailMapPdf?: string
    weather?: string
    snowReport?: string
    liftStatus?: string
    ticket?: string
    access?: string
  }

  location?: {
    latitude: number
    longitude: number
  }

  mapDisplay?: {
    showOnRegionGuide?: boolean
    labelPriority?: 1 | 2 | 3
    approximatePosition?: {
      x: number
      y: number
    }
  }

  elevation?: {
    top?: number
    bottom?: number
    verticalDrop?: number
  }

  courses?: {
    total?: number
    beginnerRatio?: number
    intermediateRatio?: number
    advancedRatio?: number
  }

  lifts?: {
    total?: number
  }

  access?: {
    fromTokyo?: AccessRoute[]
    fromOsaka?: AccessRoute[]
    fromNagoya?: AccessRoute[]
    fromSapporo?: AccessRoute[]
    fromAirport?: AccessRoute[]
    car?: {
      recommended: boolean
      snowTireRequired: boolean
      note?: string
    }
  }

  terrainSummary?: {
    beginner?: string
    intermediate?: string
    advanced?: string
    snowboard?: string
    powder?: string
  }

  sources: Source[]
}
```

## Supporting Types

```ts
type AccessRoute = {
  label: string
  steps: string[]
  estimatedTime?: string
  difficulty: "easy" | "medium" | "hard"
  note?: string
  links?: {
    label: string
    url: string
  }[]
}

type Source = {
  label: string
  url: string
  note?: string
}
```

## Modeling Rules

Do not put everything into `tags`.

Use distinct fields:

- `region`: large geographic region
- `prefecture`: Japanese prefecture
- `skiArea`: ski travel area, such as Hakuba, Yuzawa, Niseko
- `location`: actual coordinates, optional
- `mapDisplay`: visual placement for simplified static guide maps, optional
- `tags`: ski-related attributes and user needs
- `links`: external official or trusted information entry points
- `access`: structured transportation summary

## Current Implementation

The first Astro content schema lives in:

- `src/content.config.ts`
- `src/data/regions.ts`
- `src/data/skiAreas.ts`
- `src/data/tags.ts`
- `src/content/resorts/`

The content collection currently validates Markdown resort files with stable metadata and source URLs. Resort data is intentionally incomplete at this stage; sample files exist to validate the schema and establish the editing pattern before broad data entry.
