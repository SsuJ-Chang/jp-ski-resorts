export const resortTags = [
  'beginner_friendly',
  'family_friendly',
  'good_for_first_japan_trip',
  'large_ski_area',
  'night_skiing',
  'no_car_accessible',
  'onsen',
  'powder',
  'resort_village',
  'snowboard_friendly',
  'tree_run',
] as const

export type ResortTag = (typeof resortTags)[number]

export const tagLabels: Record<ResortTag, string> = {
  beginner_friendly: '初學友善',
  family_friendly: '親子友善',
  good_for_first_japan_trip: '第一次日本滑雪可考慮',
  large_ski_area: '大型雪場',
  night_skiing: '夜滑',
  no_car_accessible: '可不自駕',
  onsen: '溫泉',
  powder: '粉雪',
  resort_village: '度假村 / 雪場村',
  snowboard_friendly: '單板友善',
  tree_run: '樹林滑行',
}
