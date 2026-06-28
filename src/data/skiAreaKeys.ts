export const skiAreaKeys = [
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
] as const

export type SkiAreaKey = (typeof skiAreaKeys)[number]

export const publishedSkiAreaKeys = skiAreaKeys

export type PublishedSkiAreaKey = SkiAreaKey
