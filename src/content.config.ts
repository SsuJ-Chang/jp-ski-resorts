import { defineCollection } from 'astro:content'
import { glob } from 'astro/loaders'
import { z } from 'astro/zod'
import { regionKeys } from './data/regions'
import { skiAreaKeys } from './data/skiAreaKeys'
import { resortTags } from './data/tags'

const getUrlHostname = (value: string) => {
  try {
    return new URL(value).hostname.toLowerCase().replace(/^www\./, '')
  } catch {
    return ''
  }
}

const matchesHostname = (value: string, domains: string[]) => {
  const hostname = getUrlHostname(value)

  return domains.some((domain) => hostname === domain || hostname.endsWith(`.${domain}`))
}

const socialLinkDomains = ['facebook.com', 'fb.com', 'instagram.com', 'threads.net', 'x.com', 'twitter.com']

const socialUrlSchema = (domains: string[], label: string) =>
  z.url().refine((value) => matchesHostname(value, domains), {
    message: `${label} link must use an official ${label} domain.`,
  })

const linkSchema = z.object({
  official: z
    .url()
    .refine((value) => !matchesHostname(value, socialLinkDomains), {
      message: 'Official website must not use a social media domain.',
    })
    .optional(),
  facebook: socialUrlSchema(['facebook.com', 'fb.com'], 'Facebook').optional(),
  instagram: socialUrlSchema(['instagram.com'], 'Instagram').optional(),
  threads: socialUrlSchema(['threads.net'], 'Threads').optional(),
  xTwitter: socialUrlSchema(['x.com', 'twitter.com'], 'X/Twitter').optional(),
  googleMaps: z.url().optional(),
  trailMapPage: z.url().optional(),
  trailMapPdf: z.url().optional(),
  weather: z.url().optional(),
  snowReport: z.url().optional(),
  liftStatus: z.url().optional(),
  ticket: z.url().optional(),
  access: z.url().optional(),
})

const namedLinkSchema = z.object({
  title: z.string(),
  url: z.url(),
  note: z.string().optional(),
})

const trailMapSchema = z.object({
  label: z.string(),
  language: z.string(),
  season: z.string().optional(),
  url: z.url(),
  sourceLabel: z.string().optional(),
})

const ticketPlanSchema = z.object({
  name: z.string(),
  priceLines: z.array(z.string()).min(1),
  note: z.string().optional(),
})

const textOrNumberSchema = z.union([z.string(), z.number()])

const snowWeatherSchema = z.object({
  title: z.string(),
  provider: z.string().optional(),
  url: z.url(),
  snowDepth: z.string().optional(),
  updatedAt: z.string().optional(),
  forecast: z
    .array(
      z.object({
        date: z.string(),
        weather: z.string(),
        low: textOrNumberSchema,
        high: textOrNumberSchema,
      }),
    )
    .optional(),
  note: z.string().optional(),
})

const courseDetailSchema = z.object({
  name: z.string(),
  difficulty: z.enum(['beginner', 'intermediate', 'advanced', 'expert', 'ungroomed', 'mixed']),
  length: z.string().optional(),
  maxSlope: z.string().optional(),
  averageSlope: z.string().optional(),
  videoLinks: z.array(z.url()).optional(),
  note: z.string().optional(),
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

const lodgingRecommendationSchema = namedLinkSchema.omit({ note: true }).extend({
  rjOpinion: z.string().optional(),
})

const externalContentSchema = z.object({
  blogs: z.array(namedLinkSchema).optional(),
  vlogs: z.array(namedLinkSchema).optional(),
})

const skiAreaExternalContentSchema = externalContentSchema.extend({
  websites: z.array(namedLinkSchema).optional(),
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
    visibility: z
      .object({
        status: z.enum(['published', 'draft', 'hidden']).default('published'),
        note: z.string().optional(),
      })
      .default({ status: 'published' }),
    homeRegionExample: z.boolean().optional(),
    links: linkSchema,
    contact: z
      .object({
        address: z.object({
          zhTw: z.string(),
          ja: z.string(),
          googleMaps: z.url(),
        }),
        phone: z.string().optional(),
      })
      .optional(),
    season: z
      .object({
        label: z.string(),
        operatingPeriod: z.string().optional(),
        hours: z.string().optional(),
        nightSkiingHours: z.string().optional(),
        note: z.string().optional(),
        source: z.url().optional(),
      })
      .optional(),
    trailMaps: z.array(trailMapSchema).optional(),
    tickets: z
      .object({
        season: z.string(),
        currency: z.string().default('JPY'),
        source: z.url(),
        note: z.string().optional(),
        plans: z.array(ticketPlanSchema).min(1),
      })
      .optional(),
    snowWeather: snowWeatherSchema.optional(),
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
        courseInfoPage: z.url().optional(),
        summary: z.string().optional(),
        details: z.array(courseDetailSchema).optional(),
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
        rjOpinion: z.string().optional(),
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
    rjOpinion: z.string().optional(),
    lodgingRecommendations: z.array(lodgingRecommendationSchema).optional(),
    externalContent: externalContentSchema.optional(),
  }),
})

const skiAreas = defineCollection({
  loader: glob({ base: './src/content/ski-areas', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    name: z.object({
      zhTw: z.string(),
      ja: z.string(),
      en: z.string(),
    }),
    region: z.enum(regionKeys),
    prefecture: z.string(),
    baseTown: z.string().optional(),
    accessHub: z.string().optional(),
    summary: z.string(),
    rjOpinion: z.string().optional(),
    traits: z.array(z.string()).default([]),
    featuredResorts: z.array(z.string()).default([]),
    externalContent: skiAreaExternalContentSchema.optional(),
  }),
})

export const collections = { resorts, skiAreas }
