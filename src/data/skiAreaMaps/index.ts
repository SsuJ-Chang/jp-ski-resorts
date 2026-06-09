import { hakubaMap } from './hakuba'
import { yuzawaMap } from './yuzawa'
import { shigaKogenMap } from './shiga-kogen'
import { nisekoMap } from './niseko'
import { takasuMountainsMap } from './takasu-mountains'
import { myokoKogenMap } from './myoko-kogen'
import { bandaiMap } from './bandai'
import { tottoriDaisenMap } from './tottori-daisen'
import { hachibuseYamaMap } from './hachibuse-yama'
import { minakamiMap } from './minakami'

export const skiAreaMaps = {
  bandai: bandaiMap,
  'hachibuse-yama': hachibuseYamaMap,
  hakuba: hakubaMap,
  minakami: minakamiMap,
  'myoko-kogen': myokoKogenMap,
  niseko: nisekoMap,
  'takasu-mountains': takasuMountainsMap,
  'tottori-daisen': tottoriDaisenMap,
  yuzawa: yuzawaMap,
  'shiga-kogen': shigaKogenMap,
} as const

export type SkiAreaMapKey = keyof typeof skiAreaMaps
