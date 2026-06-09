import { hakubaMap } from './hakuba'
import { yuzawaMap } from './yuzawa'
import { shigaKogenMap } from './shiga-kogen'
import { nisekoMap } from './niseko'
import { takasuMountainsMap } from './takasu-mountains'
import { myokoKogenMap } from './myoko-kogen'
import { bandaiMap } from './bandai'
import { tottoriDaisenMap } from './tottori-daisen'

export const skiAreaMaps = {
  bandai: bandaiMap,
  hakuba: hakubaMap,
  'myoko-kogen': myokoKogenMap,
  niseko: nisekoMap,
  'takasu-mountains': takasuMountainsMap,
  'tottori-daisen': tottoriDaisenMap,
  yuzawa: yuzawaMap,
  'shiga-kogen': shigaKogenMap,
} as const

export type SkiAreaMapKey = keyof typeof skiAreaMaps
