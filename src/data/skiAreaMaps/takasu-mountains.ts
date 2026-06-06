import { transportHubs } from '../transportHubs'
import type { SkiAreaMapDefinition } from './types'

export const takasuMountainsMap = {
  areaKey: 'takasu-mountains',
  title: '高鷲 Mountains 滑雪場位置圖',
  note: '高鷲 Mountains 位於岐阜縣郡上市高鷲町一帶，六座雪場沿高鷲 IC、ひるがの高原 Smart IC 與周邊山域分布。座標為近似位置，實際移動請以官方道路、接駁與當日營業資訊為準。',
  layout: {
    collision: {
      minX: 16,
      minY: 8,
      iterations: 14,
    },
  },
  nodes: [
    {
      ...transportHubs.hiruganoSmartIc,
      kind: 'hub',
      hubId: 'hiruganoSmartIc',
      nudge: { x: 1, y: -4 },
    },
    {
      ...transportHubs.takasuIc,
      kind: 'hub',
      hubId: 'takasuIc',
      nudge: { x: -5, y: 4 },
    },
    {
      id: 'takasu-snow-park',
      label: '高鷲 Snow Park',
      kind: 'resort',
      resortId: 'takasu-snow-park',
      nudge: { x: -2, y: -2 },
    },
    {
      id: 'dynaland',
      label: 'Dynaland',
      kind: 'resort',
      resortId: 'dynaland',
      nudge: { x: -2, y: 2 },
    },
    {
      id: 'washigatake',
      label: '鷲ヶ岳',
      kind: 'resort',
      resortId: 'washigatake',
      nudge: { x: 2, y: 2 },
    },
    {
      id: 'white-pia-takasu',
      label: 'White Pia たかす',
      kind: 'resort',
      resortId: 'white-pia-takasu',
      nudge: { x: 3, y: 0 },
    },
    {
      id: 'hirugano-kogen',
      label: 'ひるがの高原',
      kind: 'resort',
      resortId: 'hirugano-kogen',
      nudge: { x: 2, y: -2 },
    },
    {
      id: 'gujo-kogen',
      label: '郡上高原',
      kind: 'resort',
      resortId: 'gujo-kogen',
      nudge: { x: -2, y: -1 },
    },
  ],
} as const satisfies SkiAreaMapDefinition
