import { hakubaMap } from './hakuba'
import { yuzawaMap } from './yuzawa'
import { shigaKogenMap } from './shiga-kogen'
import { nisekoMap } from './niseko'
import { takasuMountainsMap } from './takasu-mountains'

export const skiAreaMaps = {
  hakuba: hakubaMap,
  niseko: nisekoMap,
  'takasu-mountains': takasuMountainsMap,
  yuzawa: yuzawaMap,
  'shiga-kogen': shigaKogenMap,
} as const

export type SkiAreaMapKey = keyof typeof skiAreaMaps
