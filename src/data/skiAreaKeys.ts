export const skiAreaKeys = [
  'yuzawa',
  'myoko-kogen',
  'hakuba',
  'bandaisan',
  'niseko',
  'shiga-kogen',
  'takasu-mountains',
  'hachibuse-yama',
  'minakami',
  'madarao',
] as const

export type SkiAreaKey = (typeof skiAreaKeys)[number]

export const publishedSkiAreaKeys = skiAreaKeys

export type PublishedSkiAreaKey = SkiAreaKey
