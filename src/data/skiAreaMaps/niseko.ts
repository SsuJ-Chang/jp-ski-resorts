import { transportHubs } from '../transportHubs'
import type { SkiAreaMapDefinition } from './types'

export const nisekoMap = {
  areaKey: 'niseko',
  title: '二世谷滑雪場位置圖',
  note: '二世谷主要由 Annupuri、Niseko Village、Grand Hirafu、HANAZONO 四個雪場圍繞 Niseko Annupuri 山體串接。座標為近似位置，跨區滑行與接駁請以官方纜車、雪道與 Shuttle Bus 公告為準。',
  layout: {
    collision: {
      minX: 18,
      minY: 9,
      iterations: 12,
    },
  },
  nodes: [
    {
      ...transportHubs.kutchanStation,
      kind: 'hub',
      hubId: 'kutchanStation',
      nudge: { x: 2, y: 4 },
    },
    {
      ...transportHubs.nisekoStation,
      kind: 'hub',
      hubId: 'nisekoStation',
      nudge: { x: -4, y: 3 },
    },
    {
      id: 'niseko-annupuri',
      label: 'Annupuri',
      kind: 'resort',
      resortId: 'niseko-annupuri',
      nudge: { x: -4, y: -1 },
    },
    {
      id: 'niseko-village',
      label: 'Niseko Village',
      kind: 'resort',
      resortId: 'niseko-village',
      nudge: { x: -2, y: 2 },
    },
    {
      id: 'niseko-grand-hirafu',
      label: 'Grand Hirafu',
      kind: 'resort',
      resortId: 'niseko-grand-hirafu',
      nudge: { x: 1, y: 0 },
    },
    {
      id: 'niseko-hanazono',
      label: 'HANAZONO',
      kind: 'resort',
      resortId: 'niseko-hanazono',
      nudge: { x: 3, y: -2 },
    },
  ],
} as const satisfies SkiAreaMapDefinition
