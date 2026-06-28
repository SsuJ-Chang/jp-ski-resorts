import type { SkiAreaMapDefinition } from './types'

export const madaraoMap = {
  areaKey: 'madarao',
  title: '斑尾高原雪場區域圖',
  note: '以斑尾高原與 Tangram Ski Circus 的雙雪場關係、周邊車站與相對位置示意，非精準地理比例。',
  layout: {
    collision: {
      minX: 18,
      minY: 8,
      iterations: 10,
    },
  },
  nodes: [
    {
      id: 'iiyama-station',
      label: '飯山站',
      kind: 'hub',
      hubId: 'iiyama-station',
      location: { latitude: 36.8505, longitude: 138.3651 },
      nudge: { x: 5, y: 3 },
    },
    {
      id: 'kurohime-station',
      label: '黑姬站',
      kind: 'hub',
      hubId: 'kurohime-station',
      location: { latitude: 36.8277, longitude: 138.1951 },
      nudge: { x: -6, y: 5 },
    },
    {
      id: 'madarao-highlands',
      label: '斑尾高原',
      kind: 'zone',
      location: { latitude: 36.853, longitude: 138.277 },
      nudge: { x: 0, y: -5 },
    },
    {
      id: 'madarao-kogen',
      label: '斑尾高原',
      kind: 'resort',
      resortId: 'madarao-kogen',
      location: { latitude: 36.852488, longitude: 138.290869 },
      nudge: { x: 6, y: -1 },
    },
    {
      id: 'tangram-ski-circus',
      label: 'Tangram',
      kind: 'resort',
      resortId: 'tangram-ski-circus',
      location: { latitude: 36.853903, longitude: 138.262697 },
      nudge: { x: -8, y: 1 },
    },
  ],
} satisfies SkiAreaMapDefinition
