import { hakubaMap } from './hakuba'
import { yuzawaMap } from './yuzawa'
import { shigaKogenMap } from './shiga-kogen'
import { nisekoMap } from './niseko'
import { takasuMountainsMap } from './takasu-mountains'
import { myokoKogenMap } from './myoko-kogen'
import { bandaisanMap } from './bandaisan'
import { hachibuseYamaMap } from './hachibuse-yama'
import { minakamiMap } from './minakami'
import { madaraoMap } from './madarao'

export const skiAreaMaps = {
  bandaisan: bandaisanMap,
  'hachibuse-yama': hachibuseYamaMap,
  hakuba: hakubaMap,
  madarao: madaraoMap,
  minakami: minakamiMap,
  'myoko-kogen': myokoKogenMap,
  niseko: nisekoMap,
  'takasu-mountains': takasuMountainsMap,
  yuzawa: yuzawaMap,
  'shiga-kogen': shigaKogenMap,
} as const

export type SkiAreaMapKey = keyof typeof skiAreaMaps
