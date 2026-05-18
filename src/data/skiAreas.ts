export const skiAreaKeys = [
  'niseko',
  'furano',
  'rusutsu',
  'zao',
  'appi',
  'nozawa-onsen',
  'yuzawa',
  'hakuba',
  'shiga-kogen',
] as const

export type SkiAreaKey = (typeof skiAreaKeys)[number]

