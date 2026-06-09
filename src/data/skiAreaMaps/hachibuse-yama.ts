import type { SkiAreaMapDefinition } from './types'

export const hachibuseYamaMap = {
  areaKey: 'hachibuse-yama',
  title: '鉢伏山雪場區域圖',
  note: '以兵庫縣北部鉢伏山周邊、八鹿站與八鹿氷ノ山 IC 為主要交通節點的示意圖；節點位置為概略標示，實際路線與接駁請以官方公告為準。',
  layout: {
    collision: {
      minX: 18,
      minY: 8,
      iterations: 10,
    },
  },
  nodes: [
    {
      id: 'yoka-station',
      label: '八鹿站',
      kind: 'hub',
      hubId: 'yoka-station',
      location: { latitude: 35.404, longitude: 134.768 },
      nudge: { x: 3, y: 2 },
    },
    {
      id: 'yoka-hyonosen-ic',
      label: '八鹿氷ノ山 IC',
      kind: 'hub',
      hubId: 'yoka-hyonosen-ic',
      location: { latitude: 35.403, longitude: 134.764 },
      nudge: { x: -4, y: 5 },
    },
    {
      id: 'hachibuse-yama',
      label: '鉢伏山',
      kind: 'zone',
      location: { latitude: 35.407, longitude: 134.542 },
      nudge: { x: 0, y: -5 },
    },
    {
      id: 'hachi-kogen',
      label: 'HACHI 高原',
      kind: 'resort',
      resortId: 'hachi-kogen',
      location: { latitude: 35.389, longitude: 134.544 },
      nudge: { x: -6, y: 3 },
    },
    {
      id: 'hachikita-kogen',
      label: 'HACHI 北高原',
      kind: 'resort',
      resortId: 'hachikita-kogen',
      location: { latitude: 35.42, longitude: 134.56 },
      nudge: { x: 6, y: -2 },
    },
  ],
} satisfies SkiAreaMapDefinition
