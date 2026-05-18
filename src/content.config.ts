import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'
import { regionKeys } from './data/regions'
import { skiAreaKeys } from './data/skiAreas'
import { resortTags } from './data/tags'

const sourceSchema = z.object({
  label: z.string(),
  url: z.url(),
  note: z.string().optional(),
})

const linkSchema = z.object({
  official: z.url(),
  googleMaps: z.url().optional(),
  trailMapPage: z.url().optional(),
  trailMapPdf: z.url().optional(),
  weather: z.url().optional(),
  snowReport: z.url().optional(),
  liftStatus: z.url().optional(),
  ticket: z.url().optional(),
  access: z.url().optional(),
})

const accessRouteSchema = z.object({
  label: z.string(),
  steps: z.array(z.string()).min(1),
  estimatedTime: z.string().optional(),
  difficulty: z.enum(['easy', 'medium', 'hard']),
  note: z.string().optional(),
  links: z
    .array(
      z.object({
        label: z.string(),
        url: z.url(),
      }),
    )
    .optional(),
})

const resorts = defineCollection({
  loader: glob({ base: './src/content/resorts', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    id: z.string(),
    name: z.object({
      zhTw: z.string(),
      ja: z.string(),
      en: z.string().optional(),
    }),
    region: z.enum(regionKeys),
    prefecture: z.string(),
    skiArea: z.enum(skiAreaKeys).optional(),
    tags: z.array(z.enum(resortTags)).default([]),
    links: linkSchema,
    location: z
      .object({
        latitude: z.number(),
        longitude: z.number(),
      })
      .optional(),
    mapDisplay: z
      .object({
        showOnRegionGuide: z.boolean().optional(),
        labelPriority: z.union([z.literal(1), z.literal(2), z.literal(3)]).optional(),
        approximatePosition: z
          .object({
            x: z.number(),
            y: z.number(),
          })
          .optional(),
      })
      .optional(),
    elevation: z
      .object({
        top: z.number().optional(),
        bottom: z.number().optional(),
        verticalDrop: z.number().optional(),
      })
      .optional(),
    courses: z
      .object({
        total: z.number().optional(),
        beginnerRatio: z.number().optional(),
        intermediateRatio: z.number().optional(),
        advancedRatio: z.number().optional(),
      })
      .optional(),
    lifts: z
      .object({
        total: z.number().optional(),
      })
      .optional(),
    access: z
      .object({
        fromTokyo: z.array(accessRouteSchema).optional(),
        fromOsaka: z.array(accessRouteSchema).optional(),
        fromNagoya: z.array(accessRouteSchema).optional(),
        fromSapporo: z.array(accessRouteSchema).optional(),
        fromAirport: z.array(accessRouteSchema).optional(),
        car: z
          .object({
            recommended: z.boolean(),
            snowTireRequired: z.boolean(),
            note: z.string().optional(),
          })
          .optional(),
      })
      .optional(),
    terrainSummary: z
      .object({
        beginner: z.string().optional(),
        intermediate: z.string().optional(),
        advanced: z.string().optional(),
        snowboard: z.string().optional(),
        powder: z.string().optional(),
      })
      .optional(),
    sources: z.array(sourceSchema).min(1),
  }),
})

export const collections = { resorts }
