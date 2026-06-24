export const skiAreaKeys = [
  'niseko',
  'furano',
  'rusutsu',
  'zao',
  'appi',
  'bandai',
  'nozawa-onsen',
  'yuzawa',
  'myoko-kogen',
  'hakuba',
  'shiga-kogen',
  'takasu-mountains',
  'tottori-daisen',
  'hachibuse-yama',
  'minakami',
] as const

export type SkiAreaKey = (typeof skiAreaKeys)[number]

export const publishedSkiAreaKeys = [
  'yuzawa',
  'myoko-kogen',
  'hakuba',
  'bandai',
  'niseko',
  'shiga-kogen',
  'takasu-mountains',
  'tottori-daisen',
  'hachibuse-yama',
  'minakami',
] as const satisfies readonly SkiAreaKey[]

export type PublishedSkiAreaKey = (typeof publishedSkiAreaKeys)[number]
