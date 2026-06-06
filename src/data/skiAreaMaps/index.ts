import { hakubaMap } from './hakuba'
import { yuzawaMap } from './yuzawa'

export const skiAreaMaps = {
  hakuba: hakubaMap,
  yuzawa: yuzawaMap,
} as const

export type SkiAreaMapKey = keyof typeof skiAreaMaps
